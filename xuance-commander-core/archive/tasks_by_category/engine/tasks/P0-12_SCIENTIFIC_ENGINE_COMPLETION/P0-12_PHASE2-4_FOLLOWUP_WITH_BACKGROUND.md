# P0-12 階段二-4 追問包（含完整背景資料）

**建立日期**：2026-01-12  
**追問對象**：P0-12 階段二-4 最終結案報告（整合增補權威版）  
**追問原因**：部分內容不符合任務包要求，需要補充  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）

---

## 一、追問摘要

根據嚴格審核，報告的部分內容符合要求，但以下關鍵部分需要補充：

1. ❌ **buildGuidance.js 決策邏輯分析不完整**：缺少具體的決策流程、優先級邏輯、Fallback 機制說明
2. ❌ **guidancePrinciples 邏輯提取不完整**：僅有高層次分類，缺少具體原則到決策規則的映射
3. ❌ **缺少實際的規則文件產出**：僅有 JSON Schema 範例，缺少完整的規則文件（Markdown 或 JSON）
4. ❌ **驗證機制不完整**：僅有檢查清單，缺少具體的驗證邏輯說明
5. ❌ **規則應用指南不完整**：缺少具體的使用方法說明和應用場景範例

---

## 二、符合要求的部分（可寫入文本）

以下部分已經通過審核，可以直接寫入文本：

1. ✅ **呈現規則與邏輯映射（1.1-1.3）**：完整的 Risk Level → Band → L2/L3 Narratives 映射表
2. ✅ **系統決策流程（高層次，2.1）**：高層次的流程圖（正確，但需要補充詳細分析）
3. ✅ **AI 約束（3.1）**：完整的 AI 約束說明
4. ✅ **Legacy 資料處置（5）**：說明 Legacy 資料的處置方式

---

## 三、需要補充的部分（詳細要求）

### 3.1 buildGuidance.js 決策邏輯分析（核心要求）

#### 3.1.1 背景資料

**檔案位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/buildGuidance.js`

**檔案資訊**：
- 檔案類型：JavaScript
- 檔案大小：12,135 bytes
- 檔案行數：356 行
- 關鍵函數數量：17 個

**核心函數列表**：
1. `buildGuidance`（主函數，Line 13）
2. `buildRecommendationsByTheme`（Line 97）
3. `buildRecommendationsFromPrinciples`（Line 122）
4. `actionsFromTemplates`（Line 164）
5. `pickActionTemplates`（Line 185）
6. `buildChainsByTheme`（Line 207）
7. `pickRecommendationsFromDomain`（Line 235）
8. `pickChainsFromArray`（Line 255）
9. `deriveAgeFromBirth`（Line 278）
10. `toAgeBand`（Line 292）
11. `applyResultLexicon`（Line 313）
12. `mapRecommendation`（Line 319）
13. `mapChain`（Line 332）

#### 3.1.2 需要補充的內容

**1. buildGuidance 主函數的決策流程**

需要詳細說明：
- 輸入參數的處理邏輯（birth、resonance、psych、insights）
- 優先級邏輯：byTheme → byDomain（Fallback）
- Recommendations 生成的決策流程：buildRecommendationsFromPrinciples → buildRecommendationsByTheme → pickRecommendationsFromDomain
- Chains 生成的決策流程：buildChainsByTheme → pickChainsFromArray
- Warnings 生成的邏輯（基於 riskThemeIds 集合）
- 輸出結構的組裝邏輯

**參考程式碼片段**（buildGuidance.js 主函數核心邏輯）：
```javascript
// 優先級邏輯
const recsByPrinciples = buildRecommendationsFromPrinciples(mtHits, ageBand)
const recsByTheme = recsByPrinciples.length ? recsByPrinciples : buildRecommendationsByTheme(themeKeys)
const chainsByTheme = buildChainsByTheme(themeKeys)

// Fallback 邏輯
const recsByDomain = pickRecommendationsFromDomain(domainCfg, topElements)
const chainsByDomain = pickChainsFromArray(domainKey, topElements)

// 最終輸出：優先母題，沒有才回退到 domain
const recommendations = recsByTheme.length ? recsByTheme : recsByDomain
const chains = chainsByTheme.length ? chainsByTheme : chainsByDomain

// Warnings 生成邏輯
const riskThemeIds = new Set(['chronic_depletion', 'chronic_alertness', 'unprocessed_loss'])
if (mtHits.some(h => riskThemeIds.has(h.themeId))) {
  warnings.push('若出現持續失眠、極端疲勞、或身體強烈警訊，請尋求專業協助。')
}
```

**需要說明**：
- 這個優先級邏輯如何轉換為 Stage 4 的決策規則？
- Fallback 機制在 Stage 4 中如何實現？
- Warnings 生成邏輯如何轉換為 Stage 4 的規則？

**2. buildRecommendationsFromPrinciples 的決策邏輯**

需要詳細說明：
- 如何根據 themeHits 和 ageBand 生成建議
- 如何選擇 themeHits（排序、切片邏輯）
- 如何將 principles 轉換為 actions（使用 actionsFromTemplates）
- 如何選擇 actionTemplates（使用 pickActionTemplates）

**參考程式碼片段**：
```javascript
function buildRecommendationsFromPrinciples(themeHits, ageBand) {
  // 選擇 top 2 themeHits（按 score 排序）
  const picked = [...themeHits]
    .filter(x => x?.themeId)
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 2)

  // 根據 themeId 取得 principles
  const principles = principlesMap.get(hit.themeId) || []
  
  // 根據 themeId 和 ageBand 選擇 actionTemplates
  const tpl = pickActionTemplates(hit.themeId, ageBand)
  
  // 將 principles 轉換為 actions
  const actions = principles.flatMap((pr, idx) => actionsFromTemplates(pr, tpl, idx))
}
```

**需要說明**：
- 這個邏輯如何轉換為 Stage 4 的決策規則？
- themeHits 的選擇邏輯在 Stage 4 中如何實現？
- principles 到 actions 的轉換邏輯在 Stage 4 中如何實現？

**3. pickActionTemplates 的決策邏輯**

需要詳細說明：
- 如何根據 themeId 選擇 actionTemplates
- 如何根據 ageBand 選擇對應的模板（ageBands → base）
- Age Band 的選擇邏輯（deriveAgeFromBirth → toAgeBand）

**參考程式碼片段**：
```javascript
function pickActionTemplates(themeId, ageBand) {
  // 根據 themeId 找到對應的 item
  const found = items.find(i => i.motherThemeId === themeId)
  
  // 根據 ageBand 選擇對應的模板
  const byBand = ageBand && bands[ageBand] ? bands[ageBand] : bands.any || null
  
  // 優先使用 ageBand 對應的模板，否則使用 base
  if (byBand) {
    return {
      today: Array.isArray(byBand.today) && byBand.today.length ? byBand.today : base.today || [],
      week: Array.isArray(byBand.week) && byBand.week.length ? byBand.week : base.week || []
    }
  }
  
  return { today: base.today || [], week: base.week || [] }
}
```

**Age Band 分類邏輯**：
```javascript
function toAgeBand(age) {
  if (age <= 12) return '0-12'
  if (age <= 18) return '13-18'
  if (age <= 25) return '19-25'
  if (age <= 35) return '26-35'
  if (age <= 45) return '36-45'
  if (age <= 60) return '46-60'
  if (age <= 80) return '61-80'
  return '81-100'
}
```

**需要說明**：
- Age Band 選擇邏輯在 Stage 4 中如何實現？
- 是否需要保留 Age Band 的邏輯？如果需要，如何轉換？
- 如果不需要，如何簡化？

**4. 優先級和 Fallback 機制的轉換**

需要詳細說明：
- byTheme 優先邏輯如何轉換為 Stage 4 的決策規則？
- byDomain Fallback 邏輯在 Stage 4 中如何實現？
- 如何確保 Stage 4 的決策規則與 Legacy 系統的邏輯一致？

#### 3.1.3 預期產出

1. **buildGuidance.js 決策邏輯分析文件**（Markdown）：
   - 主函數決策流程詳細說明
   - 關鍵函數決策邏輯詳細說明
   - 優先級和 Fallback 機制說明
   - Age Band 選擇邏輯說明
   - Warnings 生成邏輯說明
   - 轉換為 Stage 4 決策規則的說明

2. **決策邏輯流程圖或文字說明**：
   - 完整的決策流程圖（可選）
   - 或詳細的文字說明

---

### 3.2 guidancePrinciples 邏輯提取（核心要求）

#### 3.2.1 背景資料

**檔案位置**：`docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/ontology/guidancePrinciples.v1.json`

**檔案結構**：
- 頂層結構：object（dict）
- 包含 `items` 陣列，每個 item 包含：
  - `motherThemeId`：string（10 個不同的 ID）
  - `principles`：array（每個 4 條原則）

**完整的 guidancePrinciples 內容**（共 10 個 motherThemeId，每個 4 條原則）：

1. **chronic_depletion**：
   - "reduce load to protect core energy"
   - "restore recovery signals and follow them"
   - "reclaim boundaries on time and output"
   - "schedule predictable recovery blocks"

2. **loss_of_agency**：
   - "surface real options before saying yes"
   - "practice small renegotiations"
   - "track and celebrate self-directed choices"
   - "set default pauses before commitments"

3. **hyper_responsibility**：
   - "redistribute load and co-own outcomes"
   - "allow shared imperfection"
   - "set stop rules for what is mine vs theirs"
   - "ask for support before overload"

4. **fear_based_stability**：
   - "run safe experiments with guardrails"
   - "clarify worst-case and cushions"
   - "stack small wins toward change"
   - "separate real risk from imagined collapse"

5. **identity_diffusion**：
   - "name what matters before deciding"
   - "test-fit choices against values"
   - "record moments that feel like me"
   - "reduce decisions driven only by others"

6. **suppressed_needs**：
   - "voice small needs early"
   - "set minimum self-care that does not move"
   - "practice clean asks instead of hints"
   - "create opt-out rules when capacity is low"

7. **chronic_alertness**：
   - "scan once, then settle the body"
   - "plant safety cues in daily spaces"
   - "schedule off-alert windows"
   - "practice flexible responses to change"

8. **unprocessed_loss**：
   - "create gentle rituals for what was lost"
   - "set short windows to feel without flooding"
   - "share one thread of the story with someone safe"
   - "notice when old loss is steering new choices"

9. **meaning_vacuum**：
   - "anchor daily tasks to a small why"
   - "swap one hollow task for a meaningful one"
   - "track moments that feel worthwhile"
   - "name a near-term outcome that matters"

10. **self_erosion**：
    - "restate personal preferences out loud"
    - "limit compromises that drain identity"
    - "take one decision that trusts your own read"
    - "protect energy from default yes-es"

**在 buildGuidance.js 中的使用**：
- principles 通過 `actionsFromTemplates` 轉換為 actions
- 使用 `{{principle}}` 作為模板變數
- 與 `guidanceActionTemplates` 結合使用

#### 3.2.2 需要補充的內容

**1. 所有原則的完整提取**

需要：
- 列出所有 10 個 motherThemeId 的原則
- 說明每個原則的具體內容
- 說明原則的語境（英文，需要轉換為玄學語境）

**2. 原則到決策規則的映射**

需要說明：
- 每個原則如何轉換為決策規則？
- 原則的適用條件是什麼？
- 原則的決策邏輯是什麼？
- 原則如何與 Stage 4 的規則對應？

**3. 原則分類的詳細說明**

報告中提到的四個分類：
- Safety-First
- No Escalation
- Conservation of Qi
- Non-Coercive Guidance

需要說明：
- 每個分類的具體含義
- 每個原則屬於哪個分類
- 分類如何影響決策

**4. 原則到玄學語境的轉換**

需要說明：
- 如何將英文原則轉換為玄學語境？
- 是否需要轉換？如果需要，如何轉換？
- 如果不需要，如何在 Stage 4 中使用？

#### 3.2.3 預期產出

1. **guidancePrinciples 完整提取文件**（Markdown 或 JSON）：
   - 所有 10 個 motherThemeId 的原則清單
   - 每個原則的具體內容
   - 原則的分類說明
   - 原則到決策規則的映射

2. **原則轉換說明文件**（Markdown）：
   - 原則到玄學語境的轉換邏輯
   - 原則到 Stage 4 決策規則的轉換邏輯
   - 原則的適用條件和決策邏輯

---

### 3.3 完整的規則文件產出

#### 3.3.1 背景資料

根據任務包要求，需要建立「呈現規則文件」，包含：
- 規則的結構定義
- 所有提取的規則（格式：Markdown 或 JSON）
- 規則的適用條件和邏輯說明

報告中僅有規則映射表（1.1-1.3）和 JSON Schema 範例（4.1-4.2），但沒有提供完整的規則文件。

#### 3.3.2 需要補充的內容

**1. 完整的規則文件**

需要提供一個完整的規則文件（Markdown 或 JSON 格式），包含：

**規則結構定義**：
- 規則的 ID、名稱、描述
- 規則的類型（L2/L3 規則、L4 規則、介入邊界規則等）
- 規則的適用層級（L1、L2、L3、L4）
- 規則的適用條件（Risk Level、Band 等）

**所有提取的規則**：
- L2/L3 敘事觸發規則（從 1.1 節）
- L4 風險阻斷規則（從 1.2 節）
- L4 介入邊界規則（從 1.3 節）
- buildGuidance.js 決策規則（需要從 buildGuidance.js 分析中提取）
- guidancePrinciples 決策規則（需要從 guidancePrinciples 提取中生成）

**規則的適用條件和邏輯說明**：
- 每個規則的觸發條件
- 每個規則的邏輯說明
- 每個規則的應用場景

**2. 規則分類和組織**

需要按照以下方式分類和組織：
- 按照規則類型分類（L2/L3 規則、L4 規則、介入邊界規則等）
- 按照適用層級分類（L1、L2、L3、L4）
- 按照風險等級分類（Low、Mid、High）

#### 3.3.3 預期產出

1. **完整的規則文件**（Markdown 或 JSON）：
   - 規則結構定義
   - 所有提取的規則（完整的清單）
   - 規則的適用條件和邏輯說明
   - 規則分類和組織

2. **規則索引文件**（可選，Markdown）：
   - 規則的索引表
   - 規則的快速查找指南

---

### 3.4 驗證機制的詳細說明

#### 3.4.1 背景資料

報告中僅有檢查清單（3.2 節）：
- Risk Consistency
- Vocabulary Check
- Action Integrity
- Hexagram Fidelity

但缺少具體的驗證邏輯說明。

#### 3.4.2 需要補充的內容

**1. 驗證邏輯的詳細說明**

需要說明每個檢查項目的具體驗證邏輯：

**Risk Consistency**：
- 如何檢查風險等級的一致性？
- 檢查的標準是什麼？
- 檢查的方法和工具是什麼？

**Vocabulary Check**：
- 如何檢查禁用詞？
- 如何檢查必用詞？
- 檢查的標準和工具是什麼？

**Action Integrity**：
- 如何檢查建議的完整性？
- 如何檢查建議數量是否符合規則？
- 檢查的標準是什麼？

**Hexagram Fidelity**：
- 如何檢查卦象的一致性？
- 如何檢查卦象 ID 的正確性？
- 檢查的標準是什麼？

**2. 驗證流程**

需要說明：
- 驗證的流程和步驟
- 驗證的時機（何時驗證：生成前、生成後、還是兩者都要？）
- 驗證的責任（誰來驗證：系統自動驗證、人工驗證、還是兩者結合？）

**3. 驗證範例**

需要提供：
- 驗證的範例（通過的情況）
- 驗證失敗的範例（失敗的情況）
- 如何處理驗證失敗（錯誤處理、重試邏輯等）

#### 3.4.3 預期產出

1. **驗證機制說明文件**（Markdown）：
   - 驗證邏輯的詳細說明
   - 驗證流程說明
   - 驗證範例
   - 驗證工具和方法

---

### 3.5 規則應用指南的詳細說明

#### 3.5.1 背景資料

報告中僅有 AI 約束（3.1 節），但缺少規則的應用場景說明和使用方法說明。

#### 3.5.2 需要補充的內容

**1. 規則的應用場景說明**

需要說明：
- 每個規則在什麼場景下使用？
- 如何判斷規則的適用條件？
- 規則的觸發條件是什麼？
- 不同場景下的規則應用範例

**2. 規則的使用方法說明**

需要說明：
- 如何使用規則？
- 規則的輸入輸出是什麼？
- 規則的組合方式是什麼？
- 規則的優先級和衝突處理

**3. 規則應用範例**

需要提供：
- 規則應用的範例（不同場景）
- 規則組合應用的範例
- 規則衝突處理的範例

#### 3.5.3 預期產出

1. **規則應用指南文件**（Markdown）：
   - 規則的應用場景說明
   - 規則的使用方法說明
   - 規則應用範例
   - 規則組合和衝突處理

---

### 3.6 整合報告的詳細說明

#### 3.6.1 背景資料

報告中僅有執行摘要（0 節）、Legacy 資料處置（5 節）、自我檢視紀錄（6 節），但缺少提取過程說明、規則轉換記錄、驗證結果。

#### 3.6.2 需要補充的內容

**1. 提取過程說明**

需要說明：
- 如何提取規則（提取的步驟）
- 提取的工具和方法
- 提取的難點和解決方案

**2. 規則轉換記錄**

需要說明：
- 如何將 Legacy 規則轉換為 Stage 4 規則？
- 轉換的邏輯是什麼？
- 轉換的範例（具體的轉換過程）
- 轉換過程中的決策和取捨

**3. 驗證結果**

需要提供：
- 驗證結果（驗證的方法和結果）
- 驗證的範例
- 驗證中發現的問題和解決方案

#### 3.6.3 預期產出

1. **整合報告文件**（Markdown）：
   - 提取過程說明
   - 規則轉換記錄
   - 驗證結果
   - 整合過程中的決策和取捨

---

## 四、參考資料

### 4.1 任務包要求

- `P0-12_SCIENTIFIC_ENGINE_COMPLETION/P0-12_PHASE2-4_RULES_AND_REGULATIONS_EXTRACTION_TASK_PACKET.md`

### 4.2 Legacy 檔案

- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/guidance/buildGuidance.js`
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/ontology/guidancePrinciples.v1.json`
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/src/core/ontology/guidanceActionTemplates.v1.json`
- `docs/legacy/115_1_3_my-first-app_failed/import/my-first-app/archive/legacy/core-content/resultTemplates/intervention_boundary_matrix.v1.json`

### 4.3 相關設計文件

- `P0-5.7_WORLDVIEW_DESIGN/P0-5.7_DESIGN_DOC_FINAL.md`（Stage 4 設計規範、AI 敘事生成層約束）
- `P0-12_SCIENTIFIC_ENGINE_COMPLETION/P0-12_PHASE2-3_ACCEPTED_CONTENT.md`（L1-L4 分層架構定義）

---

## 五、重要提醒

1. **所有資料保持可回滾、不凍結**：所有補充的內容都標記為 WORKING DOCUMENT（不鎖定，可回滾）
2. **文本作為唯一依據**：所有補充的內容都記錄在文本中
3. **完整的背景資料**：本追問包已包含所有必要的背景資料，顧問團隊無需訪問其他檔案即可完成補充

---

**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-12  
**追問狀態**：等待顧問團隊補充
