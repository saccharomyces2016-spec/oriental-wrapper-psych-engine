# Root Cause Analysis - Round1 Issues

**Date**: 2024  
**Role**: Debug Lead  
**Scope**: Round1 顯示文字 + 點擊卡住問題

---

## [1] Round1 顯示文字的資料鏈路追蹤

### 資料來源鏈路

**1. 初始資料來源**
- **檔案**: `src/core/choiceEngine.js:6-17`
- **函式**: `getDomainAnchors()`
- **資料結構**: 返回陣列，每個元素包含 `{ id, domain, label, desc }`
- **關鍵欄位**: `domain` 值為英文 key（如 `'money'`, `'relationship'`, `'career'` 等）

**2. 顯示位置**
- **檔案**: `src/views/03_Resonance.vue:74`
- **模板**: `{{ isRound1 ? displayDomainLabel(t.domain) : t.label }}`
- **邏輯**: Round1 時使用 `displayDomainLabel(t.domain)`，否則使用 `t.label`

**3. displayDomainLabel 函式**
- **檔案**: `src/views/03_Resonance.vue:342-345`
```javascript
function displayDomainLabel(domain) {
  const disp = resolveDomainDisplay(domain)
  return disp.char || domain
}
```
- **問題點**: 如果 `resolveDomainDisplay` 返回的 `disp.char` 為空或 undefined，會回退到原始 `domain`（英文）

**4. resolveDomainDisplay 函式**
- **檔案**: `src/core/ui/domainDisplayMap.ts:28-31`
- **邏輯順序**:
  1. 先查 `FINALIZED_MAP`（key 格式：`domain_yuan`, `domain_cai` 等）
  2. 再查 `LEGACY_MAP`（key 格式：`relationship`, `money` 等）
  3. 都找不到則返回 `{ char: id || '' }`

**5. LEGACY_MAP 映射表**
- **檔案**: `src/core/ui/domainDisplayMap.ts:17-26`
```typescript
const LEGACY_MAP: Record<string, DomainDisplay> = {
  relationship: { char: '緣' },
  money: { char: '財' },
  health: { char: '身' },
  career: { char: '業' },
  family: { char: '家' },
  self: { char: '心' },
  study: { char: '局' },
  social: { char: '命' }
}
```

### Root Cause 1: 顯示英文的原因

**問題定位**:
- `getDomainAnchors()` 返回的 `domain` 值與 `LEGACY_MAP` 的 key 應該能匹配
- 但實際顯示為英文，可能原因：
  1. **大小寫問題**: `resolveDomainDisplay` 在第 29 行做了 `toLowerCase()`，但 `LEGACY_MAP` 的 key 都是小寫，理論上應該匹配
  2. **回退邏輯問題**: 如果 `disp.char` 為空字串 `''`，`disp.char || domain` 會回退到 `domain`（英文）
  3. **實際檢查**: 需要確認 `resolveDomainDisplay('money')` 是否真的返回 `{ char: '財' }`

**證據鏈**:
```
getDomainAnchors() 
  → t.domain = 'money' (英文)
  → displayDomainLabel('money')
  → resolveDomainDisplay('money')
  → LEGACY_MAP['money'] = { char: '財' } ✓
  → disp.char = '財'
  → return '財' || 'money' = '財' ✓
```

**但實際顯示為英文，可能原因**:
- `resolveDomainDisplay` 可能返回了 `{ char: '' }` 或 `{ char: undefined }`
- 或者 `displayDomainLabel` 的邏輯有問題

**優先順序**:
1. `resolveDomainDisplay(domain)` → `LEGACY_MAP[domain]?.char`
2. 如果找不到 → `{ char: domain }`（會顯示英文）

---

## [2] Round1 點擊後的流程追蹤

### 點擊 Handler

**1. 點擊事件綁定**
- **檔案**: `src/views/03_Resonance.vue:69`
- **模板**: `@click="selectToken(t)"`

**2. selectToken 函式（Round1 分支）**
- **檔案**: `src/views/03_Resonance.vue:414-437`
- **關鍵流程**:
```javascript
async function selectToken(t) {
  if (isThinking.value) return  // 防止重複點擊
  if (isDisabled(t)) return

  if (isRound1.value) {
    console.log('[R1] click start', t.domain)
    try {
      selectedDomain.value = t.domain  // 設定選中的 domain
      round2Answers.value = {}
      await withTimeout(transitionToRound(2), 8000, 'transitionToRound')  // ⚠️ 關鍵 await
      return
    } catch (err) {
      console.error('[R1] click failed', err)
      alert('發生錯誤，請重試')
      isThinking.value = false
      return
    }
  }
  // ...
}
```

**3. transitionToRound 函式**
- **檔案**: `src/views/03_Resonance.vue:476-515`
- **關鍵流程**:
```javascript
async function transitionToRound(next) {
  isThinking.value = true  // ⚠️ 設定 loading 狀態
  console.log('[R1] transition start', { next, domain: selectedDomain.value })
  try {
    await sleep(180)  // 等待 180ms

    round.value = next  // 切換到 Round 2

    if (round.value === 2) {
      const opts = getRoundOptions(selectedDomain.value, 2)  // ⚠️ 獲取 Round2 選項
      console.log('[R1] before distribute round2', { len: Array.isArray(opts) ? opts.length : 0 })
      distributeStars(opts)  // 分佈星星
    }

    // ... Round3, Round4 處理

    await nextTick()  // 等待 Vue 更新
    layoutKey.value += 1
    await nextTick()
    requestAnimationFrame(() => {  // ⚠️ 關鍵：在下一幀清除 loading
      layoutKey.value += 1
      isThinking.value = false  // 清除 loading 狀態
    })
  } catch (err) {
    console.error('[R1] transitionToRound failed', err)
    throw err
  } finally {
    // Safety: if requestAnimationFrame path didn't run, ensure flag clears
    setTimeout(() => { isThinking.value = false }, 500)  // 安全網：500ms 後強制清除
  }
}
```

**4. getRoundOptions 函式**
- **檔案**: `src/core/choiceEngine.js:20-27`
- **邏輯**:
```javascript
export function getRoundOptions(domainKey, round) {
  const db = CONTENT_MAP?.[domainKey]  // 從 CONTENT_MAP 取得資料
  if (!db) return []  // ⚠️ 如果找不到 domain，返回空陣列

  if (round === 2) return Array.isArray(db.round2) ? db.round2 : []
  if (round === 3) return Array.isArray(db.round3) ? db.round3 : []
  return []
}
```

**5. CONTENT_MAP 資料來源**
- **檔案**: `src/core/content/index.js:59-66`
- **支援的 domain**: `money`, `relationship`, `career`, `health`, `family`, `self`
- **不支援**: `study`, `social`（這兩個 domain 不在 CONTENT_MAP 中）

### Root Cause 2: 點擊卡住的原因

**最可能卡住的 await**:
1. **`await withTimeout(transitionToRound(2), 8000, 'transitionToRound')`** (line 426)
   - 如果 `transitionToRound(2)` 內部有未 resolve/reject 的 promise，會卡住
   - 但 `transitionToRound` 內部沒有其他 await（除了 `sleep(180)` 和 `nextTick()`）

2. **`requestAnimationFrame` 回調未執行** (line 503-506)
   - 如果瀏覽器 tab 被切換或頁面不可見，`requestAnimationFrame` 可能不會執行
   - 導致 `isThinking.value = false` 永遠不會被設定，畫面永遠顯示 loading

3. **`getRoundOptions` 返回空陣列** (line 485)
   - 如果 `selectedDomain.value` 是 `'study'` 或 `'social'`，`CONTENT_MAP[domainKey]` 會是 `undefined`
   - `getRoundOptions` 返回 `[]`，`distributeStars([])` 會執行但沒有星星顯示
   - 但這不會導致卡住，只是沒有選項

**實際卡住點分析**:
- `transitionToRound` 函式在 `finally` 中有安全網：`setTimeout(() => { isThinking.value = false }, 500)`
- 但這個安全網在 500ms 後才會執行，如果 `requestAnimationFrame` 正常執行，應該在下一幀就清除
- **最可能的原因**: `requestAnimationFrame` 回調因為某些原因（tab 切換、頁面不可見、瀏覽器優化）沒有執行，導致 `isThinking.value` 永遠是 `true`

**證據**:
- `isThinking.value = true` 在 line 477 設定
- `isThinking.value = false` 只在兩個地方設定：
  1. `requestAnimationFrame` 回調中 (line 505)
  2. `finally` 中的 `setTimeout` (line 513)
- 如果 `requestAnimationFrame` 不執行，只能靠 `setTimeout` 的 500ms 安全網

---

## [3] 最小復現紀錄

### 目前已有的 Logs

**Round1 點擊流程**:
```
[R1] click start <domain>
[R1] before step: setDomain
[R1] after step: setDomain
[R1] before step: transitionToRound
[R1] transition start { next: 2, domain: <domain> }
[R1] before distribute round2 { len: <number> }
[R1] after step: transitionToRound
```

### 建議手動檢查

**1. DevTools Console**:
- 檢查是否有 `[R1] transition start` 但沒有後續 logs
- 檢查是否有 `[R1] transitionToRound failed` 錯誤
- 檢查是否有 `[withTimeout] transitionToRound timed out after 8000ms` 錯誤

**2. DevTools Network**:
- 檢查是否有 pending 的 network 請求（應該沒有，因為沒有 fetch）

**3. DevTools Promise**:
- 在 Console 執行：`Promise.allSettled([...])` 檢查是否有 pending promise
- 檢查 `isThinking.value` 的值：在 Console 執行 `$vm.isThinking`（如果 Vue DevTools 可用）

**4. 最小加 Log 的 Patch（建議但先不套）**:
```javascript
// 在 transitionToRound 函式中
async function transitionToRound(next) {
  isThinking.value = true
  console.log('[R1] transition start', { next, domain: selectedDomain.value })
  const rafId = performance.now()  // 記錄開始時間
  try {
    await sleep(180)
    round.value = next
    if (round.value === 2) {
      const opts = getRoundOptions(selectedDomain.value, 2)
      console.log('[R1] getRoundOptions result', { domain: selectedDomain.value, optsLength: opts.length, opts })
      distributeStars(opts)
    }
    await nextTick()
    layoutKey.value += 1
    await nextTick()
    console.log('[R1] before requestAnimationFrame', { timestamp: performance.now() - rafId })
    requestAnimationFrame(() => {
      console.log('[R1] requestAnimationFrame callback executed', { timestamp: performance.now() - rafId })
      layoutKey.value += 1
      isThinking.value = false
      console.log('[R1] isThinking cleared')
    })
  } catch (err) {
    console.error('[R1] transitionToRound failed', err)
    throw err
  } finally {
    setTimeout(() => {
      if (isThinking.value) {
        console.warn('[R1] safety net triggered - isThinking still true after 500ms')
        isThinking.value = false
      }
    }, 500)
  }
}
```

---

## [4] 直接修補方案

### Fix 1: Round1 顯示中文

**問題**: `displayDomainLabel` 可能沒有正確返回中文

**修補方案**:
- **檔案**: `src/views/03_Resonance.vue:342-345`
- **修改**:
```javascript
function displayDomainLabel(domain) {
  const disp = resolveDomainDisplay(domain)
  // 確保返回中文，如果沒有則使用 DOMAIN_LABEL_ZH 作為備選
  if (disp.char && disp.char !== domain) {
    return disp.char
  }
  // 備選方案：使用 DOMAIN_LABEL_ZH
  const canonical = canonicalizeDomainKey(domain)
  return DOMAIN_LABEL_ZH[canonical] || domain
}
```

**或更簡單的方案**（如果確認 LEGACY_MAP 有對應）:
```javascript
function displayDomainLabel(domain) {
  const disp = resolveDomainDisplay(domain)
  // 如果 disp.char 是空字串或等於 domain（英文），使用備選
  if (!disp.char || disp.char === domain) {
    const canonical = canonicalizeDomainKey(domain)
    return DOMAIN_LABEL_ZH[canonical] || domain
  }
  return disp.char
}
```

### Fix 2: Round1 點擊卡住

**問題**: `requestAnimationFrame` 可能不執行，導致 `isThinking` 永遠是 `true`

**修補方案**:
- **檔案**: `src/views/03_Resonance.vue:476-515`
- **修改**:
```javascript
async function transitionToRound(next) {
  isThinking.value = true
  console.log('[R1] transition start', { next, domain: selectedDomain.value })
  try {
    await sleep(180)

    round.value = next

    if (round.value === 2) {
      const opts = getRoundOptions(selectedDomain.value, 2)
      console.log('[R1] before distribute round2', { len: Array.isArray(opts) ? opts.length : 0 })
      distributeStars(opts)
    }

    if (round.value === 3) {
      const opts = getRoundOptions(selectedDomain.value, 3)
      console.log('[R1] before distribute round3', { len: Array.isArray(opts) ? opts.length : 0 })
      distributeStars(opts)
    }

    if (round.value >= 4) {
      showAnchorOptions()
    }

    await nextTick()
    layoutKey.value += 1
    await nextTick()
    
    // 改進：使用雙重保險
    let cleared = false
    const clearThinking = () => {
      if (!cleared) {
        cleared = true
        isThinking.value = false
        console.log('[R1] isThinking cleared')
      }
    }
    
    requestAnimationFrame(() => {
      layoutKey.value += 1
      clearThinking()
    })
    
    // 安全網：如果 requestAnimationFrame 不執行，100ms 後強制清除
    setTimeout(clearThinking, 100)
  } catch (err) {
    console.error('[R1] transitionToRound failed', err)
    if (err?.stack) console.error(err.stack)
    isThinking.value = false  // 確保錯誤時也清除
    throw err
  }
}
```

**或更保守的方案**（移除 `requestAnimationFrame` 的依賴）:
```javascript
async function transitionToRound(next) {
  isThinking.value = true
  console.log('[R1] transition start', { next, domain: selectedDomain.value })
  try {
    await sleep(180)

    round.value = next

    if (round.value === 2) {
      const opts = getRoundOptions(selectedDomain.value, 2)
      console.log('[R1] before distribute round2', { len: Array.isArray(opts) ? opts.length : 0 })
      distributeStars(opts)
    }

    if (round.value === 3) {
      const opts = getRoundOptions(selectedDomain.value, 3)
      console.log('[R1] before distribute round3', { len: Array.isArray(opts) ? opts.length : 0 })
      distributeStars(opts)
    }

    if (round.value >= 4) {
      showAnchorOptions()
    }

    await nextTick()
    layoutKey.value += 1
    await nextTick()
    layoutKey.value += 1
    
    // 直接清除，不依賴 requestAnimationFrame
    isThinking.value = false
  } catch (err) {
    console.error('[R1] transitionToRound failed', err)
    if (err?.stack) console.error(err.stack)
    isThinking.value = false
    throw err
  }
}
```

---

## 總結

### Root Cause 1: Round1 顯示英文
- **原因**: `displayDomainLabel` 可能因為 `resolveDomainDisplay` 返回空字串而回退到原始 `domain`（英文）
- **修補**: 使用 `DOMAIN_LABEL_ZH` 作為備選方案

### Root Cause 2: Round1 點擊卡住
- **原因**: `requestAnimationFrame` 回調可能不執行，導致 `isThinking.value` 永遠是 `true`，畫面永遠顯示 loading
- **修補**: 移除對 `requestAnimationFrame` 的依賴，或增加更短的安全網（100ms 而非 500ms）

### 檔案修改清單
1. `src/views/03_Resonance.vue:342-345` - `displayDomainLabel` 函式
2. `src/views/03_Resonance.vue:476-515` - `transitionToRound` 函式

### 測試建議
1. 測試所有 8 個 domain（money, relationship, career, health, family, self, study, social）
2. 確認 Round1 顯示中文單字（財/緣/業/身/家/心/局/命）
3. 確認點擊後不會卡住，loading 狀態會正確清除
4. 測試 tab 切換後再回來的情況














