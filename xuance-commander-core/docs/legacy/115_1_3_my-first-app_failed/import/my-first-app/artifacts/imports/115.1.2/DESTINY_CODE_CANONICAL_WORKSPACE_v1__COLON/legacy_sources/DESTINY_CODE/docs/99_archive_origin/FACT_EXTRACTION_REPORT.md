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

