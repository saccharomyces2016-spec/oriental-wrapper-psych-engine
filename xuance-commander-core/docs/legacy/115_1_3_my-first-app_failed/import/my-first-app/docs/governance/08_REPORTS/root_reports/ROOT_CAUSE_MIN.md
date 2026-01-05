# Root Cause Analysis (Minimal)

**Date**: 2024  
**Role**: Debug Lead  
**Scope**: Round1 錯誤視窗 + 舊題目 + R3 卡住

---

## [1] Console Error Stack 對應

### Error 1: Round1 點擊跳錯誤視窗

**錯誤位置**:
- **檔案**: `src/views/03_Resonance.vue:444`
- **函式**: `selectToken()` → Round1 分支
- **錯誤訊息**: `[round1] invalid canonical domain id ${canonical}`
- **觸發條件**: `canonicalizeDomainId(t.domain)` 返回的值不符合正則 `/^(domain_yuan|domain_cai|domain_shen|domain_ye|domain_jia|domain_ju|domain_xin|domain_ming)$/`

**錯誤處理**:
- **檔案**: `src/views/03_Resonance.vue:457-462`
- **函式**: `selectToken()` catch 區塊
- **動作**: `console.error('[R1] click failed', err)` + `alert('發生錯誤，請重試')`

**根本原因**:
- `getDomainAnchors()` 返回的 `t.domain` 可能已經是 canonical 格式（如 `domain_cai`），但 `canonicalizeDomainId()` 可能返回不同的值，或 `t.domain` 本身格式不正確

### Error 2: domainCanonicalMap.js 的錯誤

**錯誤位置**:
- **檔案**: `src/core/ontology/domainCanonicalMap.js:78,82`
- **函式**: `canonicalizeDomainId()`
- **錯誤訊息**: 
  - `[domain canonicalize] empty domain key` (line 78)
  - `[domain canonicalize] unknown domain key "${input}"` (line 82)

**觸發條件**: 
- `input` 為空或不在 `LEGACY_TO_CANONICAL` 映射表中

---

## [2] Round1→Round2 資料源追蹤

### 實際資料源（新系統）

**Round2 資料來源**:
- **檔案**: `src/core/choiceEngine.js:27-46`
- **函式**: `getRound2Options(domainKey)`
- **資料檔案**: `src/core/ontology/round2FourSymbol.v1.json` (import at line 2)
- **流程**:
  1. `canonicalizeDomainId(domainKey)` 轉換 domain
  2. 從 `round2FourSymbol.domains` 陣列中找匹配的 `domain_id`
  3. 返回該 domain 的 `options` 陣列

**Round1 資料來源**:
- **檔案**: `src/core/choiceEngine.js:10-25`
- **函式**: `getDomainAnchors()`
- **資料檔案**: `src/core/ontology/round1Domains.v1.json` (import at line 1)
- **流程**:
  1. 讀取 `round1Domains.items`
  2. 每個 item 透過 `canonicalizeDomainId()` 轉換 `domain_id`
  3. 返回格式化的 anchors

### 是否仍讀 Legacy？

**❌ 不再使用 Legacy ContentDB**:
- `src/core/choiceEngine.js` 已移除 `CONTENT_MAP` import
- Round2 改用 `round2FourSymbol.v1.json`
- Round3 改用 `round3Ipsative.v2.json`

**⚠️ 但可能有殘留**:
- `src/core/content/index.js` 仍存在 `CONTENT_MAP`，但 `choiceEngine.js` 已不使用
- 其他檔案可能仍 import `ContentDB_*.js`，但不在 Round1→Round2 路徑上

---

## [3] R3 Completion Gate

### 完成條件

**檔案**: `src/views/03_Resonance.vue:506-512`
**函式**: `confirmRound3()`
**條件**:
```javascript
const ready =
  round3Answers.value.length >= round3QuestionList.value.length &&
  round3Answers.value.every(r => r?.selected_option && r?.rejected_option)
```

**問題**: 此函式**從未被調用**

### 實際觸發機制

**檔案**: `src/views/03_Resonance.vue:596-632`
**函式**: `handleRound3Pick()`
**自動前進邏輯** (line 626-631):
```javascript
if (round3Index.value < qs.length - 1) {
  round3Index.value += 1
  showRound3Question(round3Index.value)
} else {
  setTimeout(() => transitionToRound(4), 350)  // ⚠️ 自動前進
}
```

**問題**:
1. `confirmRound3()` 存在但未被調用
2. `showRound3Confirm` 是 `false` (line 383)，所以按鈕不會顯示
3. 自動前進依賴 `round3Index.value === qs.length - 1`，但如果 `round3Answers` 沒有正確累積，可能卡住

### 為什麼選完 3 題沒有進 R4？

**可能原因**:
1. `round3Index.value` 沒有正確遞增
2. `qs.length` 計算錯誤（可能為 0 或 undefined）
3. `setTimeout` 的 350ms 延遲後，`transitionToRound(4)` 可能拋錯但沒有被 catch
4. `round3Answers` 沒有正確累積，導致後續邏輯失敗

---

## [4] 最小修補清單

### Fix 1: Round1 錯誤視窗

**檔案**: `src/views/03_Resonance.vue:437-445`
**要點**:
- 移除重複的 `canonicalizeDomainId()` 調用（`t.domain` 可能已經是 canonical）
- 或改為：如果 `t.domain` 已經是 canonical 格式，直接使用；否則才 canonicalize
- 移除 `allowed` 正則檢查（因為 `canonicalizeDomainId()` 已經會 throw）

### Fix 2: R3 自動前進失敗

**檔案**: `src/views/03_Resonance.vue:626-631`
**要點**:
- 確保 `qs.length` 不為 0
- 在 `setTimeout` 前檢查 `round3Answers` 是否完整
- 如果 `transitionToRound(4)` 可能拋錯，加上 try-catch
- 或改為：當 `round3Answers.length === qs.length` 時才自動前進

### Fix 3: R3 完成按鈕（可選）

**檔案**: `src/views/03_Resonance.vue:383,506-512,107-114`
**要點**:
- 將 `showRound3Confirm` 改為 computed，當 `round3Answers.length === round3QuestionList.value.length` 時為 `true`
- 按鈕的 `@click` 綁定到 `confirmRound3()`
- 按鈕的 `:disabled` 綁定到 `!ready`（使用 `confirmRound3()` 的 ready 條件）

### Fix 4: 錯誤處理增強

**檔案**: `src/views/03_Resonance.vue:457-462,558-566`
**要點**:
- 在 `transitionToRound()` 的 catch 中，確保 `isThinking.value = false`
- 在 `handleRound3Pick()` 的 `setTimeout` 中，加上 try-catch 包住 `transitionToRound(4)`

---

## 總結

### Root Cause 1: Round1 錯誤視窗
- **原因**: `canonicalizeDomainId()` 可能返回不符合預期格式的值，或 `t.domain` 本身格式錯誤
- **修補**: 移除重複 canonicalize，或改為條件檢查

### Root Cause 2: 部分仍走舊題目
- **原因**: ❌ 已確認不再使用 legacy ContentDB，Round2 改用 `round2FourSymbol.v1.json`
- **修補**: 無需修補（已遷移）

### Root Cause 3: R3 選完卡住
- **原因**: `handleRound3Pick()` 的自動前進邏輯可能失敗（`qs.length` 為 0 或 `transitionToRound(4)` 拋錯）
- **修補**: 增強條件檢查與錯誤處理，或啟用 `confirmRound3()` 按鈕作為備選












