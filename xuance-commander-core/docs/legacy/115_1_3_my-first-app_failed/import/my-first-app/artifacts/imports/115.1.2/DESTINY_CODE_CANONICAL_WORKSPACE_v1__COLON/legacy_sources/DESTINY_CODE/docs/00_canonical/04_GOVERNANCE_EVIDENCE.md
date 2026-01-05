# 04_GOVERNANCE_EVIDENCE（治理狀態與事實證據）

產出日期：2026-01-01

本檔案收斂「治理狀態報告」與「事實抽取報告」。來源原文逐字嵌入。

以下為來源原文：


---

# [SOURCE] 115.1.1 GOVERNANCE_STATE_REPORT.md

# Governance State Report

**Date**: 2026-01-01  
**Role**: Governance / Refactor Lead  
**Branch**: gov/cleanup-legacy-20260101-170835  
**Objective**: 刪除 legacy、只保留最終版本（v1 ontology + v1 engine + v2 output/narrative）

---

## Executive Summary

經過完整分析，發現：

1. **大部分 legacy 檔案已清理**：ContentDB_*.js、_deprecated、psych/questionBank 已從 src 目錄移除
2. **核心 keep 集合狀態**：
   - ✅ `round2FourSymbol.v1.json` - ACTIVE
   - ✅ `round4Anchors.v1.json` - ACTIVE
   - ✅ `readingNarrative.v1.js` - ACTIVE
   - ⚠️ `readingEngine.v1.js` - STUB（被 Dashboard 引用但實際不使用）
   - ❌ `questionBank.v1.json` - MISSING（但被 scripts 引用）
   - ❌ `resultTemplates/*.js` - MISSING（Dashboard 使用內聯 stub）

3. **主要問題**：
   - Dashboard 仍引用 stub 的 `readingEngine.v1.js`，但實際資料來自 `props.data`
   - Scripts 引用不存在的 `questionBank.v1.json`
   - App.vue 動態 import 不存在的 `anchorSelector.js`

---

## A) Repo 現況盤點

### A1. 最終核心 keep 集合狀態

| 檔案 | 狀態 | 最後修改 | 被引用於 | 備註 |
|------|------|----------|----------|------|
| `src/core/ontology/questionBank.v1.json` | ❌ MISSING | - | scripts/*.mjs | 被多個 scripts 引用，但檔案不存在 |
| `src/core/ontology/round2FourSymbol.v1.json` | ✅ ACTIVE | 2025-12-31 | `choiceEngine.js` | Round2 資料源 |
| `src/core/ontology/round4Anchors.v1.json` | ✅ ACTIVE | 2025-12-30 | `05_Dashboard.vue` | Round4 資料源 |
| `src/core/flow/readingEngine.v1.js` | ⚠️ STUB | 2026-01-01 | `05_Dashboard.vue` | 已被 stub（blocked: true），返回最小結構 |
| `src/core/flow/readingNarrative.v1.js` | ✅ ACTIVE | 2025-12-31 | `05_Dashboard.vue` | 敘事生成 |
| `src/core/content/resultTemplates/readingOutputV2.js` | ❌ MISSING | - | - | Dashboard 使用內聯 stub |
| `src/core/content/resultTemplates/loader.js` | ❌ MISSING | - | - | 已不存在 |
| `src/core/content/resultTemplates/stateTagExtractor.js` | ❌ MISSING | - | - | Dashboard 使用內聯 stub |
| `src/core/content/resultTemplates/anchorSelector.js` | ❌ MISSING | - | `App.vue` (dynamic) | 被動態 import，但檔案不存在 |

**詳細資料**: 見 `_governance/state_snapshot/keep_final_detected.json`

### A2. Legacy 候選集合分類

| 路徑/模式 | 狀態 | 分類 | 可否刪除 | 備註 |
|-----------|------|------|----------|------|
| `src/core/content/ContentDB_*.js` | ✅ ALREADY_DELETED | DEAD | ✅ | 已從 src 移除（find 結果為 0） |
| `src/_deprecated/**` | ✅ ALREADY_DELETED | DEAD | ✅ | 目錄已不存在 |
| `src/core/psych/questionBank/**` | ✅ ALREADY_DELETED | DEAD | ✅ | 目錄已不存在 |
| `archive/legacy/**` | 📦 ARCHIVED | ARCHIVE | ✅ | 已歸檔，不影響 runtime |
| `archive/legacy_question_bank/**` | 📦 ARCHIVED | ARCHIVE | ✅ | 已歸檔，不影響 runtime |

**詳細資料**: 見 `_governance/state_snapshot/legacy_candidates_classified.json`

### A3. 過期但仍被引用的檔案

1. **`questionBank.v1.json`** (MISSING)
   - 被引用於：11 個 scripts
   - 最後 commit：2025-12-28
   - 狀態：檔案不存在，但 scripts 仍嘗試讀取
   - 建議：確認 scripts 是否仍需要，或改用其他資料源

2. **`readingEngine.v1.js`** (STUB)
   - 被引用於：`05_Dashboard.vue`
   - 最後修改：2026-01-01（stub 化）
   - 狀態：已被 stub，但 Dashboard 仍調用
   - 建議：移除 Dashboard 中的引用，改用 `props.data`

---

## B) 依賴/引用地圖

### B1. Entrypoints → Imports 地圖

**主要 Entrypoints**:
- `src/main.js` → `src/App.vue`
- `src/App.vue` → Views (01-05) + `SoulArchitect.js`
- `src/views/03_Resonance.vue` → `choiceEngine.js` + ontology JSONs
- `src/views/05_Dashboard.vue` → `readingEngine.v1.js` (stub) + `readingNarrative.v1.js`

**核心資料流**:
```
main.js → App.vue → SoulArchitect.js → readingFacade.v1.js → psych/scorer.js
                                                              → guidance/buildGuidance.js
                                                              → ai/promptBuilder.js
```

**詳細地圖**: 見 `_governance/state_snapshot/import_graph_summary.tsv`

### B2. 引用分類

| 分類 | 檔案數 | 說明 | 範例 |
|------|--------|------|------|
| RUNTIME_HARD | ~30 | build/run 必須 | `choiceEngine.js`, `SoulArchitect.js`, ontology JSONs |
| RUNTIME_SOFT | ~5 | 特定路徑/feature 才用 | `readingEngine.v1.js` (stub), `anchorSelector.js` (missing) |
| DEV_TOOLING | ~20 | scripts/validate/reports | `scripts/*.mjs`, `scripts/validate/*.mjs` |
| DEAD | 0 | 完全無引用 | 已清理 |

### B3. delete_paths.txt 候選檔案狀態

根據 `_governance/cleanup_phase2/delete_paths.txt`：

| 檔案 | 狀態 | 被引用於 | 分類 | 建議 |
|------|------|----------|------|------|
| `src/core/content/ContentDB_*.js` | ✅ DELETED | - | DEAD | 已刪除 |
| `src/_deprecated/core/**` | ✅ DELETED | `scripts/deprecateUnused.mjs` | DEAD | 已刪除 |
| `src/core/psych/questionBank/**` | ✅ DELETED | - | DEAD | 已刪除 |
| `src/core/ontology/questionBank.v1.json` | ❌ MISSING | 11 scripts | DEV_TOOLING | 需確認 scripts 需求 |

---

## C) readingEngine 真實狀態確認

### C1. 目前狀態

**檔案**: `src/core/flow/readingEngine.v1.js`
**狀態**: **STUB** (blocked: true)
**內容**: 返回最小結構，不依賴任何 datasets

```javascript
export default async function readingEngineV1(payload = {}) {
  console.warn('[GOVERNANCE] readingEngine.v1 stubbed; legacy datasets blocked')
  return {
    domain_key: payload?.round1?.domain_key || payload?.domain || '',
    situation_profile: { top_signals: [], chosen_round2: [] },
    facet_scores: {},
    top_themes: [],
    anchors: [],
    debug: { source: 'readingEngine.v1', blocked: true }
  }
}
```

### C2. Runtime 如何產生 readingResult

**實際流程**:
1. `SoulArchitect.js` 透過 `readingFacade.v1.js` 產生 `psych` 資料
2. `SoulArchitect.js` 組裝完整的 `destinyData`（包含 psych, insights, guidance, narrative）
3. `App.vue` 將 `destinyData` 傳給 `05_Dashboard.vue` 作為 `props.data`
4. `05_Dashboard.vue` 從 `props.data` 取得實際資料

**Dashboard 中的 readingEngine 調用**:
- `05_Dashboard.vue:985` 調用 `readingEngine(payload)`
- 但 `readingResult` 主要用於 debug 顯示
- 實際顯示的資料來自 `props.data` (line 1004-1008)

### C3. 哪些功能頁面使用 readingEngine 輸出

**僅 `05_Dashboard.vue`**:
- 用於 debug 顯示（JSON 預覽）
- 實際顯示的資料來自 `props.data`
- `readingNarrative` 和 `readingOutputV2` 使用 `readingResult`，但 `readingResult` 是 stub 輸出

**結論**: `readingEngine.v1.js` 可安全移除，但需先修改 Dashboard 移除引用。

---

## D) 刪除計畫建議

### Phase 3: DEAD & DEV_TOOLING (0 風險)

**目標**: 刪除已確認無 runtime 依賴的檔案

**刪除清單**:
1. `archive/legacy/**` - 已歸檔，不影響 runtime
2. `archive/legacy_question_bank/**` - 已歸檔，不影響 runtime

**驗證**:
```bash
npm run build
grep -r "archive/legacy" src || echo "No references"
```

**詳細計畫**: 見 `_governance/state_snapshot/delete_plan_phase3.txt`

### Phase 4: RUNTIME_SOFT (中風險)

**目標**: 移除 runtime 中的軟依賴

**修改前必須完成**:

1. **Dashboard 的 readingEngine 引用**
   - 移除 `import readingEngine`
   - 移除或註解 `readingEngine(payload)` 調用
   - 確認 `readingResult` 資料來源改為 `props.data`

2. **App.vue 的 anchorSelector 動態 import**
   - 確認 `markCurrentAnchorAsUsed` 是否仍需要
   - 如果不需要，移除動態 import

3. **Scripts 中的 questionBank.v1.json 引用**
   - 檢查每個引用 script 是否仍需要
   - 如果不需要，標記為 deprecated 或刪除

**刪除清單**（修改完成後）:
- `src/core/flow/readingEngine.v1.js` (如果 Dashboard 不再需要)

**驗證**:
```bash
npm run build
npm run dev  # 手動測試完整流程
```

**詳細計畫**: 見 `_governance/state_snapshot/delete_plan_phase4.txt`

---

## E) 需要交給 Codex 的工作包

### 工作包 1: 移除 Dashboard 的 readingEngine 引用

**目標**: 移除 Dashboard 對 stub readingEngine 的依賴

**改動檔案**:
- `src/views/05_Dashboard.vue`

**改動內容**:
1. 移除 `import readingEngine from '../core/flow/readingEngine.v1.js'` (line 556)
2. 移除或註解 `readingResult.value = await readingEngine(payload)` (line 985)
3. 確認 `readingResult` 的資料來源改為 `props.data` 或從 `props.data` 衍生
4. 保留內聯的 `buildReadingOutputV2` 和 `extractStateTags` stub

**驗收條件**:
- [ ] `npm run build` 通過
- [ ] Dashboard 頁面正常顯示（使用 `props.data`）
- [ ] 沒有 console 錯誤
- [ ] Debug JSON 預覽仍可顯示（如果需要的話）

---

### 工作包 2: 清理 App.vue 的 anchorSelector 引用

**目標**: 處理 App.vue 中對不存在檔案的動態 import

**改動檔案**:
- `src/App.vue`

**改動內容**:
1. 確認 `markCurrentAnchorAsUsed` 是否仍需要
2. 如果不需要，移除動態 import (line 82-84)
3. 如果需要，確認 `anchorSelector.js` 的位置或重新實作

**驗收條件**:
- [ ] `npm run build` 通過
- [ ] App 初始化正常
- [ ] 沒有 console 錯誤

---

### 工作包 3: 清理 Scripts 中的 questionBank.v1.json 引用

**目標**: 處理 scripts 中對不存在檔案的引用

**改動檔案**:
- `scripts/fixQuestionBankJSON*.mjs` (5 個檔案)
- `scripts/doctorPaths.mjs`
- `scripts/fixChoiceMeta.mjs`
- `scripts/auditPatternTags.mjs`
- `scripts/analyticsReport.mjs`
- `scripts/validate/validate-questionbank.mjs`

**改動內容**:
1. 檢查每個 script 是否仍需要 `questionBank.v1.json`
2. 如果不需要，標記為 deprecated 或刪除 script
3. 如果需要，確認 `questionBank.v1.json` 是否應存在或改用其他資料源

**驗收條件**:
- [ ] `npm run validate:all` 通過（如果 scripts 仍保留）
- [ ] 沒有 broken imports

---

### 工作包 4: 刪除 readingEngine.v1.js（工作包 1 完成後）

**目標**: 刪除 stub 的 readingEngine

**改動檔案**:
- `src/core/flow/readingEngine.v1.js` (刪除)

**改動內容**:
1. 確認 Dashboard 已不再引用
2. 刪除檔案

**驗收條件**:
- [ ] `npm run build` 通過
- [ ] 沒有 broken imports

---

## 總結與建議

### 現況總結

1. **大部分 legacy 已清理**：ContentDB、_deprecated、psych/questionBank 已從 src 移除
2. **核心 keep 集合狀態良好**：round2FourSymbol、round4Anchors、readingNarrative 均為 ACTIVE
3. **主要問題**：
   - Dashboard 仍引用 stub 的 readingEngine（可移除）
   - Scripts 引用不存在的 questionBank.v1.json（需確認需求）
   - App.vue 動態 import 不存在的 anchorSelector.js（需確認需求）

### 建議執行順序

1. **Phase 3**（0 風險）：刪除 archive 目錄（可立即執行）
2. **工作包 1**：移除 Dashboard 的 readingEngine 引用
3. **工作包 2**：清理 App.vue 的 anchorSelector 引用
4. **工作包 3**：清理 Scripts 中的 questionBank.v1.json 引用
5. **工作包 4**：刪除 readingEngine.v1.js
6. **Phase 4**：執行剩餘的清理工作

### 風險評估

- **Phase 3**: 風險 0（archive 不影響 runtime）
- **工作包 1-3**: 風險 中（需修改 runtime 檔案，但影響範圍可控）
- **工作包 4**: 風險 低（工作包 1 完成後）

### 回滾策略

所有修改均可透過 git 回滾：
```bash
git restore <file>
git log --all --full-history -- <file>  # 查看歷史
```

---

**報告生成時間**: 2026-01-01  
**分析工具**: grep, find, git log, node scripts  
**機器可讀檔位置**: `_governance/state_snapshot/`


---

# [SOURCE] FACT_EXTRACTION_REPORT.md

# 專案事實抽取報告

**執行時間**：2024  
**目標**：抽取事實，不做推理或解釋

---

## [B] Round1 Domain UI 詞彙/label map

### 搜尋結果

```
src/App.vue:240:  background: rgba(212, 175, 55, 0.12);
src/core/SoulArchitect.js:55:      domain: psych?.input?.domain || safeResonance.domain,
src/core/SoulArchitect.js:56:      domainLabel: psych?.input?.domainLabel || safeResonance.domainLabel,
src/core/SoulArchitect.js:228:  const domainLabel = safeResonance.domainLabel || '此局'
src/core/SoulArchitect.js:236:  const fallbackNarrativeText = [`目前顯示的是保底報告（${domainLabel}）。`, r2, r3]
src/core/SoulArchitect.js:245:    info: { title: '命盤回響', label: safeResonance.domainLabel || '' },
src/core/SoulArchitect.js:313:            domain: resonance.domain,
src/core/SoulArchitect.js:314:            domainLabel: resonance.domainLabel,
src/core/SoulArchitect.js:369:  const domain = psych?.input?.domain || ''
src/core/SoulArchitect.js:384:    domain === 'money'
src/core/SoulArchitect.js:386:      : domain === 'relationship'
src/core/SoulArchitect.js:390:  const label = makeLabel({ domain, innerTension, riskAversion })
src/core/SoulArchitect.js:395:  if (domain === 'money') {
src/core/SoulArchitect.js:401:  } else if (domain === 'relationship') {
src/core/SoulArchitect.js:433:  const imagePrompt = buildImagePrompt({ domain, psych })
src/core/SoulArchitect.js:447:function makeLabel({ domain, innerTension, riskAversion }) {
src/core/SoulArchitect.js:448:  if (domain === 'money') {
src/core/SoulArchitect.js:453:  if (domain === 'relationship') {
src/core/SoulArchitect.js:461:function buildImagePrompt({ domain, psych }) {
src/core/SoulArchitect.js:463:  if (domain === 'money') {
src/core/SoulArchitect.js:466:  if (domain === 'relationship') {
src/core/guidance/guidance.schema.json:11:        "required": ["id", "domain", "tags", "title", "tone", "rationale", "actions", "warnings"],
src/core/guidance/guidance.schema.json:14:          "domain": { "type": "string" },
src/core/guidance/guidance.schema.json:40:        "required": ["id", "domain", "triggerTags", "title", "steps"],
src/core/guidance/guidance.schema.json:43:          "domain": { "type": "string" },
src/core/guidance/guidance.schema.json:65:      "required": ["version", "domain", "topElement", "tags", "generatedAt", "note"],
src/core/guidance/guidance.schema.json:68:        "domain": { "type": "string" },
src/core/guidance/schema.json:22:      "required": ["version", "domain", "generatedAt", "note"],
src/core/guidance/schema.json:25:        "domain": { "type": "string" },
src/core/guidance/schema.json:41:        "domain": { "type": "string" },
src/core/guidance/schema.json:68:        "domain": { "type": "string" },
src/core/guidance/buildGuidance.js:11: * 優先用「母題」(byTheme) → 其次才走舊的 domains/chains 格式（相容）
src/core/guidance/buildGuidance.js:14:  const domainKey = psych?.input?.domain || resonance?.domain || 'self'
src/core/guidance/buildGuidance.js:44:  // ✅ B) 舊版相容：domains / chains[]
src/core/guidance/buildGuidance.js:45:  const domainsRoot =
src/core/guidance/buildGuidance.js:46:    interventionsDB?.domains && typeof interventionsDB.domains === 'object'
src/core/guidance/buildGuidance.js:47:      ? interventionsDB.domains
src/core/guidance/buildGuidance.js:50:  const domainCfg = domainsRoot?.[domainKey] || null
src/core/guidance/buildGuidance.js:51:  const recsByDomain = pickRecommendationsFromDomain(domainCfg, topElements)
src/core/guidance/buildGuidance.js:52:  const chainsByDomain = pickChainsFromArray(domainKey, topElements)
src/core/guidance/buildGuidance.js:54:  // ✅ 最終輸出：優先母題，沒有才回退到 domain
src/core/guidance/buildGuidance.js:55:  const recommendations = recsByTheme.length ? recsByTheme : recsByDomain
src/core/guidance/buildGuidance.js:56:  const chains = chainsByTheme.length ? chainsByTheme : chainsByDomain
src/core/guidance/buildGuidance.js:69:    domain: domainKey,
src/core/guidance/buildGuidance.js:70:    domainLabel: resonance?.domainLabel || domainKey,
src/core/guidance/buildGuidance.js:79:      domainKey,
src/core/guidance/buildGuidance.js:84:      mode: recsByTheme.length || chainsByTheme.length ? 'byTheme' : 'byDomainFallback',
src/core/guidance/buildGuidance.js:233: * 舊版相容：domains / chains[]
src/core/guidance/buildGuidance.js:235:function pickRecommendationsFromDomain(domainCfg, topElements) {
src/core/guidance/buildGuidance.js:236:  if (!domainCfg) return []
```

---

## [C] Round1 是否影響 Round2 題庫

### 搜尋結果：round2Situations / round2 / situation

```
src/core/content/resultTemplates/readingOutputV2.js:42:  const signals = safeTop(readingResult?.situation_profile?.top_signals, 3)
src/core/content/resultTemplates/readingOutputV2.js:54:  const round2Chosen = Array.isArray(readingResult?.situation_profile?.chosen_round2)
src/core/content/resultTemplates/readingOutputV2.js:55:    ? readingResult.situation_profile.chosen_round2.map(c => ({
src/core/flow/readingNarrative.v1.js:65:  const signals = safeTop(readingResult?.situation_profile?.top_signals, 3)
src/core/flow/readingEngine.v1.js:2:import round2Situations from '../ontology/round2Situations.v1.json' with { type: 'json' }
src/core/flow/readingEngine.v1.js:45:  Array.isArray(round2Situations?.items) ? round2Situations.items.map(q => [q.id, q]) : []
src/core/flow/readingEngine.v1.js:48:  Array.isArray(round2Situations?.questions)
src/core/flow/readingEngine.v1.js:49:    ? round2Situations.questions.map(q => [q.situation_id, q])
src/core/flow/readingEngine.v1.js:63:  const { signalScores, chosenRound2, themeScores: round2Themes } = scoreRound2(payload?.round2, debugNotes)
src/core/flow/readingEngine.v1.js:83:    situation_profile: {
src/core/flow/readingEngine.v1.js:97:  const situation_answers = Array.isArray(round2Input?.situation_answers)
src/core/flow/readingEngine.v1.js:98:    ? round2Input.situation_answers
src/core/flow/readingEngine.v1.js:104:  for (const ans of situation_answers) {
src/core/flow/readingEngine.v1.js:303:    id: q.situation_id,
src/views/05_Dashboard.vue:456:              <div class="mt-4">Round2 payload (前 3 筆)：{{ JSON.stringify(round2PayloadPreview) }}</div>
src/views/05_Dashboard.vue:561:import round2Situations from '../core/ontology/round2Situations.v1.json' with { type: 'json' }
src/views/05_Dashboard.vue:586:    situation_answers: {
src/views/05_Dashboard.vue:633:  () => readingResult.value?.situation_profile?.top_signals || []
src/views/05_Dashboard.vue:637:  Object.keys(selections.value?.round2?.situation_answers || {}).slice(0, 12)
src/views/05_Dashboard.vue:639:const round2PayloadPreview = computed(() => {
src/views/05_Dashboard.vue:640:  const arr = selections.value?.round2?.situation_answers || {}
src/views/05_Dashboard.vue:650:  if (!R2_ID_SET.size) return 'round2Situations 無 items/choice_meta，engine 無法建立題庫映射'
src/views/05_Dashboard.vue:737:const R2_LIST = Array.isArray(round2Situations?.questions) ? round2Situations.questions : []
src/views/05_Dashboard.vue:738:const R2_ID_SET = new Set(R2_LIST.map(q => q?.situation_id).filter(Boolean))
src/views/05_Dashboard.vue:749:    return [q?.situation_id, map]
src/views/05_Dashboard.vue:784:  const fromArray = Array.isArray(candidate?.situation_answers)
src/views/05_Dashboard.vue:785:    ? candidate.situation_answers
src/views/05_Dashboard.vue:790:    !fromArray && candidate?.situation_answers && typeof candidate.situation_answers === 'object'
src/views/05_Dashboard.vue:791:      ? candidate.situation_answers
src/views/05_Dashboard.vue:798:      const id = item?.question_id || item?.situation_id || item?.id
```

### 搜尋結果：round2 與 domain 的關聯

```
src/core/content/ContentDB_index.js:26:  return DB[domainKey] || { round2: [], round3: [] }
```

**事實**：`ContentDB_index.js` 顯示 Round2 的資料是根據 `domainKey` 從 `ContentDB_*.js` 取得的，表示 Round1 選擇的 domain 會影響 Round2 的題庫來源。

---

## [D] Round2 題目數/選項數（讀 json）

### 檔案資訊

```
Round2 file: src/core/ontology/round2Situations.v1.json
Round2 questions: 12
Options per question (unique): 4
```

**事實**：
- Round2 共有 **12 題**
- 每題有 **4 個選項**

---

## [E] Round3 題庫來源/出題數/是否複選（讀 question bank）

### 搜尋結果：questionBank 相關

```
src/core/ontology/ontologyLoader.js:2:import questionBank from './questionBank.v1.json' with { type: 'json' }
src/core/flow/readingEngine.v1.js:1:import questionBank from '../ontology/questionBank.v1.json' with { type: 'json' }
src/config/questionMode.v1.js:1:const ENV_FLAG = String(import.meta.env?.VITE_USE_QUESTION_BANK || '').toLowerCase() === 'true'
src/config/questionMode.v1.js:3:export function getQuestionMode() {
src/config/questionMode.v1.js:7:export default getQuestionMode
src/views/03_Resonance.vue:7:    <div class="header-area" :class="{ 'fade-out': isThinking && !questionModeActive }">
src/views/03_Resonance.vue:20:    <div v-if="questionModeActive" class="question-mode">
src/views/03_Resonance.vue:46:        <button class="confirm" :disabled="!canSubmitQuestions" @click="submitQuestionMode">
src/views/03_Resonance.vue:49:        <button class="confirm ghost" v-if="questionModeEnabled && !questionModeActive" @click="resetAll">
src/views/03_Resonance.vue:84:    <div class="cauldron-area" v-if="!questionModeActive">
src/views/03_Resonance.vue:148:const USE_QUESTION_BANK = (import.meta.env.VITE_USE_QUESTION_BANK || '').toLowerCase() === 'true'
src/views/03_Resonance.vue:151:const questionModeEnabled = USE_QUESTION_BANK
src/views/03_Resonance.vue:154:const questionModeFallback = ref(false)
src/views/03_Resonance.vue:159:const questionModeActive = computed(
src/views/03_Resonance.vue:160:  () => questionModeEnabled && !questionModeFallback.value && questionCards.value.length > 0
src/views/03_Resonance.vue:166:function initQuestionMode() {
src/views/03_Resonance.vue:167:  questionModeFallback.value = false
src/views/03_Resonance.vue:177:    questionModeFallback.value = true
src/views/03_Resonance.vue:234:function submitQuestionMode() {
src/views/03_Resonance.vue:319:  if (questionModeEnabled) {
src/views/03_Resonance.vue:320:    initQuestionMode()
src/views/03_Resonance.vue:323:  if (!questionModeActive.value) {
src/views/03_Resonance.vue:526:  if (questionModeEnabled) {
src/views/03_Resonance.vue:527:    initQuestionMode()
src/views/03_Resonance.vue:540:  if (!questionModeActive.value) {
src/views/03_Resonance.vue:606:  if (questionModeActive.value) return
src/views/03_Resonance.vue:630:  if (questionModeActive.value) return '題庫模式'
src/views/03_Resonance.vue:638:  if (questionModeActive.value) return '內在狀態 · 問題挑選'
src/views/03_Resonance.vue:646:  if (questionModeActive.value) return '每題選一項最像你的描述'
src/views/03_Resonance.vue:654:  if (questionModeActive.value) return '題庫模式 · 單選'
```

### QuestionBank 檔案資訊

```
QuestionBank file: src/core/ontology/questionBank.v1.json
QuestionBank themes/items: 10
QuestionBank total questions: 64
Options per question (unique): 4
No multi-select questions found
```

**事實**：
- QuestionBank 有 **10 個 themes/items**
- 總共有 **64 題**
- 每題有 **4 個選項**
- **沒有複選題**（所有題目都是單選）

---

## [F] Round4 Anchors 是否真的加權（找 scorer/engine 是否改分數）

### 搜尋結果：anchor 相關

```
src/App.vue:73:    // M-8.4 Fix: Mark current anchor as used when test is completed (not on page reload)
src/App.vue:74:    // This ensures the anchor won't be shown again in next test, but will stay same for current test
src/App.vue:75:    if (destinyData.value?.anchors?.primary?.id) {
src/App.vue:76:      const { markCurrentAnchorAsUsed } = await import('./core/content/resultTemplates/anchorSelector.js')
src/App.vue:77:      markCurrentAnchorAsUsed()
src/App.vue:109:  // M-8.4 Fix: But preserve anchor_used_ids for next session, only clear current session anchor
src/App.vue:111:    const usedIds = sessionStorage.getItem('anchor_used_ids') // Preserve for next session
src/App.vue:114:    // Clear current session anchor (will be regenerated for new test)
src/App.vue:115:    // But preserve used IDs for next session (to avoid showing same anchors)
src/App.vue:117:      sessionStorage.setItem('anchor_used_ids', usedIds) // Restore for next session
src/core/SoulArchitect.js:81:    // --- M-8.4: 選取錨點語句（含 state_tags 提取與反規律機制）---
src/core/SoulArchitect.js:82:    const { selectAnchors } = await import('./content/resultTemplates/anchorSelector.js')
src/core/SoulArchitect.js:91:    const anchors = selectAnchors({
src/core/SoulArchitect.js:95:      usedAnchorIds: null, // M-8.4: Will use sessionStorage automatically
src/core/SoulArchitect.js:118:      // M-8.4: 加入錨點語句（含 variantKey）
src/core/SoulArchitect.js:119:      anchors: {
src/core/SoulArchitect.js:120:        primary: anchors.primary ? {
src/core/SoulArchitect.js:121:          id: anchors.primary.id,
src/core/SoulArchitect.js:122:          text: anchors.primary.text || '',
src/core/SoulArchitect.js:123:          variantKey: anchors.primary.variantKey || 'default'
src/core/SoulArchitect.js:125:        secondary: anchors.secondary ? {
src/core/SoulArchitect.js:126:          id: anchors.secondary.id,
src/core/SoulArchitect.js:127:          text: anchors.secondary.text || '',
src/core/SoulArchitect.js:128:          variantKey: anchors.secondary.variantKey || 'default'
src/core/SoulArchitect.js:130:        debug: DEBUG_ORACLE_CACHE ? anchors.debug : undefined
src/core/content/resultTemplates/anchorSelector.js:1:// src/core/content/resultTemplates/anchorSelector.js
src/core/content/resultTemplates/anchorSelector.js:2:// M-8.3: Anchor selection logic
src/core/content/resultTemplates/anchorSelector.js:8: * Get used anchor IDs from sessionStorage (for next session, not current)
src/core/content/resultTemplates/anchorSelector.js:10: * @returns {Set<string>} Set of used anchor IDs
src/core/content/resultTemplates/anchorSelector.js:12:function getUsedAnchorIds(maxCount = 20) {
src/core/content/resultTemplates/anchorSelector.js:14:    const key = 'anchor_used_ids'
src/core/content/resultTemplates/anchorSelector.js:25: * Get current session anchor (for same test, not across sessions)
src/core/content/resultTemplates/anchorSelector.js:26: * @returns {Object|null} Current anchor { id, variantKey } or null
src/core/content/resultTemplates/anchorSelector.js:28:function getCurrentSessionAnchor() {
src/core/content/resultTemplates/anchorSelector.js:30:    const key = 'anchor_current_session'
src/core/content/resultTemplates/anchorSelector.js:40: * Save current session anchor (for same test, not across sessions)
src/core/content/resultTemplates/anchorSelector.js:41: * @param {string} anchorId - Anchor ID
src/core/content/resultTemplates/anchorSelector.js:44:function saveCurrentSessionAnchor(anchorId, variantKey) {
src/core/content/resultTemplates/anchorSelector.js:46:    const key = 'anchor_current_session'
src/core/content/resultTemplates/anchorSelector.js:47:    sessionStorage.setItem(key, JSON.stringify({ id: anchorId, variantKey }))
```

### 搜尋結果：anchor 與 score/weight/boost 的關聯

```
src/core/content/resultTemplates/anchorSelector.js:212:  // Score anchors by mother theme match
src/core/content/resultTemplates/anchorSelector.js:213:  const scored = availableAnchors.map(anchor => {
src/core/content/resultTemplates/anchorSelector.js:240:    if (anchor.confidence === 'high') score += 3
src/core/content/resultTemplates/anchorSelector.js:241:    else if (anchor.confidence === 'medium-high') score += 2
src/core/content/resultTemplates/anchorSelector.js:242:    else if (anchor.confidence === 'medium') score += 1
src/core/content/resultTemplates/anchorSelector.js:244:    return { anchor, score }
src/core/content/resultTemplates/anchorSelector.js:253:  // Select primary anchor (highest score)
src/core/content/resultTemplates/anchorSelector.js:254:  const primaryAnchor = scored[0]?.anchor || null
src/core/domainScoring.js:126:export function scoreDomains({ elements, axes, anchors = [], confidence = 0.72 } = {}) {
src/core/domainScoring.js:154:    const anchorBoost = anchorHit ? 0.08 : 0
src/core/domainScoring.js:155:    raw[d] = se * 0.58 + sa * 0.42 + anchorBoost
src/core/flow/readingEngine.v1.js:42:const ANCHOR_THEME_BOOST = 0.25
src/core/flow/readingEngine.v1.js:76:  const anchors = applyAnchors(payload?.round4, facetScores, themeScores, debugNotes)
src/core/flow/readingEngine.v1.js:205:function applyAnchors(round4Input = {}, facetScores, themeScores, debugNotes = []) {
src/core/flow/readingEngine.v1.js:244:      themeScores.set(themeId, prev + ANCHOR_THEME_BOOST)
src/core/flow/readingEngine.v1.js:248:  return [...anchors.entries()].map(([anchor_key, weight]) => ({ anchor_key, weight }))
```

**事實**：
- Round4 Anchors **確實有加權**：
  - `domainScoring.js:154`：`anchorBoost = 0.08`（影響領域機率）
  - `readingEngine.v1.js:42`：`ANCHOR_THEME_BOOST = 0.25`（影響 theme 分數）
  - `readingEngine.v1.js:205-244`：`applyAnchors` 函數會修改 `facetScores` 和 `themeScores`
  - `anchorSelector.js:212-244`：anchors 本身也有 scoring 機制（根據 confidence 加權）

---

## 總結

### Round1 Domain
- Round1 選擇的 domain 會影響 Round2 的題庫來源（`ContentDB_index.js:26`）
- Domain 相關的程式碼散佈在多個檔案中，主要用於指引生成和標籤生成

### Round2
- 共有 **12 題**，每題 **4 個選項**
- 檔案：`src/core/ontology/round2Situations.v1.json`
- 結構問題：使用 `questions[]` 而非 `items[]`，缺少 `choice_meta`

### Round3
- 題庫來源：`questionBank.v1.json`
- 總共 **64 題**，分屬 **10 個 themes**
- 每題 **4 個選項**
- **沒有複選題**（全部單選）
- 透過環境變數 `VITE_USE_QUESTION_BANK` 控制是否啟用

### Round4 Anchors
- **確實有加權機制**：
  - 影響領域機率：`anchorBoost = 0.08`
  - 影響 theme 分數：`ANCHOR_THEME_BOOST = 0.25`
  - 影響 facet 分數：透過 `effect.facet_weights`
  - Anchor 選擇本身也有 scoring（根據 confidence）

---

**報告結束**
