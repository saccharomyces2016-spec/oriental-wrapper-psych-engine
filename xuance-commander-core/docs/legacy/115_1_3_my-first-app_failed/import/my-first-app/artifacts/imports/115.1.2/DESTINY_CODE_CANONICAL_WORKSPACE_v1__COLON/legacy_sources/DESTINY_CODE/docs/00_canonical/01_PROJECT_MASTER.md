# 01_PROJECT_MASTER（專案總規格與重建藍圖）

產出日期：2026-01-01

本檔案收斂「專案總規格」與「題庫工程化工作計劃」；內容以最新版為主，來源原文逐字嵌入。

以下為來源原文：


---

# [SOURCE] 114.12.31 PROJECT_MASTER_SPEC_V2.md

# Project Master Specification v2

> 本文件為「專案層級主規格（Authoritative Project Spec）」  
> 依照 **Governance Master Document v2** 的裁決原則整理。  
>  
> 說明：
> - 原始文件內容 **全文保留**
> - 不重寫、不刪減、不自行修正內容
> - 僅新增「專案層 Meta 裁決與定位說明」
> - 本檔為 AI / 人類理解專案的**唯一入口文件**

---

## 一、專案層 Meta 裁決（Project-level Governance）

### 1. 本專案的本質裁決
- 本系統為：  
  **「心理計量引擎為核心，命理作為語彙包裝與 prior 的混合系統」**
- 命理永遠不是決策來源
- 心理計量與使用者選擇為唯一主體

### 2. 系統核心不可破壞清單
以下項目屬於 **System Rule（不可破壞）**：
- 向量累積 → 母題映射 → 規則生成建議
- 計分邏輯的可解釋性
- 命理僅作為 prior（10–20%）

### 3. AI 角色裁決（專案層重申）
- AI 不得：
  - 推導命理結論
  - 改寫計分結果
  - 以生成文字作為結論
- AI 僅能：
  - 解釋
  - 敘事
  - 協助探索

### 4. 問題清單的定位
- `PROJECT_PENDING_ISSUES.md`  
- `PROJECT_ISSUES_FOR_AI.md`

兩者統一裁決為：
- **問題與風險登錄（Problem Registry）**
- 不等於任務
- 不等於進度
- 不代表必然要修

---

## 二、原始專案文件（原文保留，禁止自行解讀修改）



---

<!-- BEGIN 114.12.31 PROJECT_INTRODUCTION_FOR_AI.md -->

# 專案深度介紹（給 GPT/Gemini 理解專案內容和特性）

## 🎯 專案定位

這是一個**「命理心理測驗混合系統」**，結合傳統命理概念（五行、八字）與現代心理學（母題、行為面向），透過儀式化的問答流程，生成個人化的心理分析報告。

**核心價值**：用「命理式包裝」降低心理測驗的抗拒感，讓使用者願意深度探索自我。

---

## 🏗️ 系統架構

### 整體流程（5 個階段）

```
01_Origin（起點）
  ↓ 使用者點擊「探索因緣」
02_Input（輸入）
  ↓ 輸入生辰八字（年、月、日、時）和姓名，點擊「結印」
03_Resonance（共振）
  ↓ 四回合選擇（Round 1-4），點擊「合參」
04_Computation（推演）
  ↓ 顯示「命局演算中」，等待 AI 生成
05_Dashboard（結果）
  ↓ 顯示完整的分析報告
```

### 核心資料流

```
使用者選擇
  ↓
累積向量（elementVector, axisVector）
  ↓
映射到領域機率（scoreDomains）
  ↓
映射到母題（mapToMotherThemes）
  ↓
生成建議（buildGuidance）
  ↓
AI 生成文字（generateAiNarrative）
  ↓
輸出報告
```

---

## 📊 核心概念

### 1. 五行向量（Five Elements）

**概念**：木、火、土、金、水，代表不同的能量特質
- **木**：起念與開局
- **火**：行動與推進
- **土**：承載與穩定
- **金**：界線與控制
- **水**：不安與敏感

**計算方式**：
- 使用者的每個選擇都帶有 `weights.elements`（如 `{wood: 0.2, fire: 0.1, ...}`）
- 所有選擇累積成 `elementVector`
- 最後正規化成「總和 = 1」的單位向量

**用途**：
- 映射到 8 大領域（career, relationship, money, family, health, self, study, social）
- 生成「五行鏡」視覺化圖表

### 2. 軸向量（Axes）

**概念**：5 個心理軸向
- **move**：動 vs 靜
- **inward**：內向 vs 外向
- **heat**：熱 vs 冷
- **damp**：濕 vs 乾
- **boundary**：界線 vs 開放

**計算方式**：
- 類似五行向量，從選擇的 `weights.axes` 累積
- 用 sigmoid 函數壓縮到 0~1

**用途**：
- 生成「暗線提示」文字（如「你傾向於...」）
- 輔助領域機率計算

### 3. 母題（Mother Themes）

**概念**：8 個核心心理模式，代表「反覆卡住的底層劇本」

1. **chronic_depletion**（長期耗竭）：持續的身心疲憊
2. **loss_of_agency**（主控感流失）：感覺無法影響人生方向
3. **hyper_responsibility**（過度承擔）：過度承擔他人責任
4. **fear_based_stability**（恐懼型求穩）：因恐懼而避免改變
5. **identity_diffusion**（自我模糊）：不清楚自己是誰
6. **suppressed_needs**（需求壓抑）：習慣壓抑個人需求
7. **chronic_alertness**（長期警覺）：持續處於警戒狀態
8. **unprocessed_loss**（未處理的失落）：未處理的創傷或失落

**映射方式**：
- 從 Round 2/3 的選擇標籤映射（如 `stability` → `fear_based_stability`）
- 從題庫的 `pattern_tags` 映射
- 從 `behavior_facet` 映射

**用途**：
- 生成「母題命中」區塊
- 生成「解決建議」（優先 `byTheme`，沒有才回退 `byDomain`）
- 生成「連鎖預測」（短/中/長期可能走向）

### 4. 行為面向（Behavior Facets）

**概念**：8 個行為模式，代表「你如何應對壓力」

1. **adjust_strategy**：調整策略
2. **avoid_conflict**：避免衝突
3. **follow_momentum**：跟隨動能
4. **observe_and_wait**：觀察等待
5. **push_through**：硬推突破
6. **seek_support**：尋求支持
7. **self_prioritize**：自我優先
8. **withdraw_and_protect**：退縮保護

**來源**：
- 從題庫的 `choice_meta[].behavior_facet` 取得
- 累積成 `facet_scores`，用於生成「行為模式分析」

---

## 🔄 四回合選擇流程

### Round 1：選領域（Domain）

**選項**：6-8 個領域
- `money`（財氣之流）
- `relationship`（情緣之結）
- `career`（業途之局）
- `family`（家脈之承）
- `health`（形神之耗）
- `self`（心志之向）
- `study`（文運之關）- 目前 disabled
- `social`（交感之網）- 目前 disabled

**互動方式**：「星塵節點」點擊選擇

**輸出**：`selectedDomain`（領域 key）

---

### Round 2：選「此刻狀態」（Situation）

**資料來源**：`round2Situations.v1.json`（12 個情境題）

**範例題目**：
- 「你的身體正在『換季』時，你更像哪一種？」
- 「一談到錢，你心裡會先冒出哪種感覺？」
- 「你和某個重要的人之間，像是有一層霧，你更像？」

**選項**：每個題目 4 個選項（A/B/C/D）

**互動方式**：
- **舊流程**：從 `ContentDB_*.js` 的 `round2[]` 取得選項，顯示為「星塵節點」
- **新流程**：直接顯示 12 題，卡片式選擇（但目前未完全啟用）

**輸出**：`selectedR2`（選中的情境）

**問題**：目前 `round2Situations.v1.json` 沒有 `choice_meta`，導致 `signal_key` 無法映射

---

### Round 3：選「細象」（Theme Details）

**資料來源**：
- **舊流程**：`ContentDB_*.js` 的 `round3[]`
- **新流程**：`questionBank.v1.json`（從前 3 個母題隨機選 6 題）

**規則**：必須選 2-3 個（`round3NeedMin = 2`, `round3NeedMax = 3`）

**互動方式**：
- **舊流程**：「星塵節點」多選
- **新流程**：卡片式選擇（`questionModeActive = true`）

**輸出**：`selectedR3[]`（選中的細象陣列）

**計分**：
- 每個選擇帶 `weights`（累積到 `elementVector` 和 `axisVector`）
- 從 `pattern_tags` 映射到母題
- 從 `behavior_facet` 累積行為面向分數

---

### Round 4：選「錨點」（Anchors）

**資料來源**：`round4Anchors.v1.json`

**規則**：必須選 2 個

**互動方式**：「星塵節點」多選

**輸出**：`selectedAnchors[]`（選中的錨點陣列）

**用途**：
- 生成「錨點語句」（顯示在 Dashboard 第一屏）
- 影響領域機率計算（小幅加成）
- 影響 facet 分數（透過 `effect.facet_weights`）
- 影響 theme 分數（透過 `effect.theme_boost`）

---

## 🧮 計分邏輯

### 1. 向量累積（`scorePsychometrics`）

**輸入**：`resonance.userChoices[]`

**處理**：
- 從每個選擇的 `weights` 累積 `traits`、`axes`、`elements`
- 或從題庫的 `choice_meta` 取得 `behavior_facet`
- 從 `pattern_tags` 映射到母題

**輸出**：
```javascript
{
  traits: { drive, control, stabilityNeed, sensitivity, riskAversion, innerTension },
  axes: { move, inward, heat, damp, boundary },
  elements: { wood, fire, earth, metal, water },
  motherThemes: { hits: [...] }
}
```

### 2. 領域機率計算（`scoreDomains`）

**輸入**：`elements`, `axes`, `anchors`

**處理**：
- 用 dot product 計算每個領域的「匹配度」
- 用 softmax 轉成機率分布

**輸出**：
```javascript
{
  domainTop: ['career', 'relationship'],
  domainProb: { career: 0.35, relationship: 0.28, ... },
  evidence: { topElements: ['metal', 'fire'], suppressedElement: 'water', axes: {...} }
}
```

### 3. 母題映射（`mapToMotherThemes`）

**輸入**：`resonance`（包含 Round 2/3 的標籤）

**處理**：
- 從 Round 2 的標籤映射（如 `stability` → `fear_based_stability`）
- 從 Round 3 的 `pattern_tags` 映射
- 合併 `scorePsychometrics` 的母題結果

**輸出**：
```javascript
{
  hits: [{ themeId, score, reason }],
  top: [{ themeId, score, ... }]
}
```

### 4. 建議生成（`buildGuidance`）

**輸入**：`psych`, `insights`, `birth`（年齡）

**處理**：
- 優先從 `byTheme` 取得建議（`interventions.json`, `chains.json`）
- 沒有才回退到 `byDomain`
- 從 `guidancePrinciples.v1.json` 取得原則
- 從 `guidanceActionTemplates.v1.json` 取得行動模板

**輸出**：
```javascript
{
  recommendations: [{ title, whatItMeans, actions, avoid }],
  chains: [{ title, short, mid, long }],
  warnings: [...]
}
```

### 5. AI 文字生成（`generateAiNarrative`）

**輸入**：`narrativePrompt`, `facts`

**處理**：
- 用 Gemini API 生成「批命文字」
- 失敗才用 `generateLocalNarrative`（本地模板）

**輸出**：
```javascript
{
  text: "長篇分析文字...",
  mode: "ai" | "fallback",
  prompt: "...",
  json: {...}
}
```

---

## 📁 資料檔案結構

### 核心題庫

1. **`questionBank.v1.json`**
   - 結構：`items[]: {theme_id, questions[]: {question_text, choices[], choice_meta[]}}`
   - 用途：新題庫系統，每個問題對應一個母題
   - 欄位：
     - `pattern_tags[]`：映射到母題的標籤
     - `behavior_facet`：行為面向
     - `confidence_weight`：加權

2. **`motherThemes.v1.json`**
   - 結構：`items[]: {id, enLabel, zhLabel, description}`
   - 用途：定義 8 個母題

3. **`round2Situations.v1.json`**
   - 結構：`questions[]: {situation_id, prompt_zh, options[]: {key, text_zh}}`
   - **問題**：沒有 `choice_meta`，無法映射 `signal_key`

4. **`round4Anchors.v1.json`**
   - 結構：`items[]: {id, question_text, choices[], choice_meta[]: {choice, anchor_key, effect}}`
   - 用途：Round 4 的錨點選擇

### 舊流程資料

5. **`ContentDB_*.js`**（money, relationship, career, health, family, self）
   - 結構：`{round2[], round3[]}`
   - 每個選項帶 `weights: {traits, axes, elements}`

### 指引資料

6. **`interventions.json`**
   - 結構：`{byTheme: {...}, domains: {...}}`
   - 用途：解決建議

7. **`chains.json`**
   - 結構：`{byTheme: {...}}`
   - 用途：連鎖預測（短/中/長期）

8. **`guidancePrinciples.v1.json`**
   - 結構：`items[]: {motherThemeId, principles[]}`
   - 用途：母題對應的原則

9. **`guidanceActionTemplates.v1.json`**
   - 結構：`items[]: {motherThemeId, actionTemplates: {today[], week[]}, ageBands: {...}}`
   - 用途：行動模板（依年齡調整）

---

## 🎨 UI/UX 特色

### 視覺風格

- **深色背景**（`#05060a`, `#0f1012`）
- **金色/米色文字**（`rgba(255,220,170,0.92)`）
- **毛玻璃效果**（`backdrop-filter: blur(12px)`）
- **字體**：`Noto Serif TC`（標題）+ `Ma Shan Zheng`（按鈕，毛筆感）
- **動畫**：緩慢旋轉的符印、星塵背景

### 文字風格

- **高度文言化**：「汝之座標正與歲月重疊」「撥開煙雲，窺見那抹被塵世遮蔽的本原」
- **術語密集**：「五行鏡」「氣機分布」「暗線提示」「路徑回聲」「批命」「斷語」
- **按鈕用詞**：「結印」「定象」「合參」「另起一局」

### 互動設計

- **線性流程**：5 個階段，不能跳過
- **選擇方式**：Round 2/3 是「星塵宇宙中的節點」，點擊後標記「已定」
- **進度提示**：底部有「能量條」和狀態文字

---

## 🔧 技術架構

### 前端

- **框架**：Vue 3 + Vite
- **狀態管理**：Composition API（ref, computed）
- **路由**：Vue Router（但只有一個路由，流程由 App.vue 管理）
- **動畫**：GSAP（部分）+ CSS transitions
- **視覺化**：Chart.js（雷達圖）

### 後端邏輯（都在前端）

- **計分引擎**：`scorePsychometrics`, `scoreDomains`
- **母題映射**：`mapToMotherThemes`
- **建議生成**：`buildGuidance`
- **AI 生成**：`generateAiNarrative`（呼叫 Gemini API）

### 資料管理

- **快取**：`ORACLE_CACHE`（Map，存 `{birth, resonance}` 組合）
- **草稿保存**：`localStorage`（Round 3 的選擇）
- **Telemetry**：`telemetryClient.js`（可選，用環境變數控制）

---

## 🎯 核心特色（不可破壞）

1. **「向量累積 → 模式映射」的計分邏輯**
   - 這是產品差異化的核心
   - 其他心理測驗沒有這種「命理式向量計算」

2. **「儀式化流程」的沉浸感**
   - 5 階段流程 + 文言文字 + 深色視覺 + 緩慢動畫
   - 使用者不是來「做測驗」，而是來「探索命盤」

3. **「AI + 規則」的混合生成**
   - 核心計分用規則（可解釋性）
   - 文字生成用 AI（個性化）

4. **「雙語並行但中文優先」的內容架構**
   - 所有 JSON 都有 `_zh` 和 `_en` 欄位
   - 但中文是主要語言，英文是「備註」

---

## ⚠️ 已知問題

詳見 `PROJECT_ISSUES_FOR_AI.md`

---

**最後更新**：2024



<!-- END 114.12.31 PROJECT_INTRODUCTION_FOR_AI.md -->


---

<!-- BEGIN 114.12.31 SYSTEM_ARCHITECTURE_OVERVIEW.md -->

# SYSTEM_ARCHITECTURE_OVERVIEW

本文件用於快速理解本系統的「核心結構與不可破壞邊界」。
適用對象：新工程師、新 AI 協作者、新專案分支。

---

## 一、系統本質

本系統是一套「命理語彙包裝的心理計量引擎」。

- 命理：作為語言與象徵層
- 心理計量：作為核心運算層
- AI：作為敘事生成層（非決策層）

---

## 二、核心資料流（不可破壞）

使用者輸入 / 選擇  
→ 向量累積（elements / axes / facets）  
→ 母題映射（mother themes）  
→ 建議與預測生成（rule-based）  
→ AI 敘事渲染（optional）

---

## 三、回合角色定義

### Round 1（Domain）
- 功能：問題聚焦
- 不直接參與心理計量

### Round 2（Situation / Signal）
- 功能：心理信號輸入
- 低權重影響母題（confidence_weight）
- 不應承載複雜權重

### Round 3（Theme Details）
- 功能：主要心理計量來源
- 影響 elements / axes / facets / themes

### Round 4（Anchors）
- 功能：穩定與放大既有傾向
- 用於錨定與修正排序

---

## 四、AI 的角色邊界

- AI 不得作為結論來源
- AI 不得改寫計分結果
- AI 僅能基於既有 facts 進行敘事生成

---

## 五、可替換模組

- UI 表現與動畫
- 題目文案
- AI 模型（Gemini / 其他）

---

## 六、不可替換核心

- 向量累積 → 母題映射 的邏輯
- 計分的可解釋性
- 命理僅作為包裝與 prior


<!-- END 114.12.31 SYSTEM_ARCHITECTURE_OVERVIEW.md -->


---

<!-- BEGIN 114.12.31 METAPHYSICS_ENGINE_SPEC.md -->

# METAPHYSICS_ENGINE_SPEC

本文件正式定義本系統中「命理相關算法」的採用範圍與工程角色。
此文件為唯一正本，禁止自由發揮或私自擴充流派。

---

## 一、總體原則（強制）

1. 命理算法僅作為「先天背景偏置（Prior）」
2. 命理結果不得覆蓋使用者選擇
3. 心理計量永遠是主體，命理為輔

---

## 二、五行（生辰八字）算法規格

### 採用體系
- 天干地支 × 五行基本歸屬
- 不引入神煞、格局、喜忌
- 不拆藏干（刻意簡化）

### 計算流程
1. 生辰 → 年 / 月 / 日 / 時 四柱
2. 每柱：
   - 天干：對應五行 +1
   - 地支：主五行 +1
3. 合計後正規化為單位向量

### 輸出格式
```js
birthElementVector = {
  wood: number,
  fire: number,
  earth: number,
  metal: number,
  water: number
}
```

### 系統角色
- 作為 elementVector 的 prior
- 建議權重：10%–20%

---

## 三、姓名學算法規格

### 採用體系
- 康熙字典筆畫
- 三才五格（天 / 人 / 地）
- 不使用 81 靈動數吉凶斷語

### 工程化映射
- 天格：背景壓力感
- 人格：主控感 / 行動傾向
- 地格：穩定需求 / 安全感

### 注意事項
- 不產出吉凶
- 僅轉為心理傾向向量

---

## 四、合成規則（不可違反）

```js
finalElementVector =
  α * userChoiceElementVector +
  (1 - α) * birthElementVector
```

- α ≥ 0.8
- 使用者行為永遠佔多數權重

---

## 五、禁止事項

- 禁止新增命理流派而未更新本文件
- 禁止 AI 自行推導命理結論
- 禁止將命理結果直接展示為「命定結論」


<!-- END 114.12.31 METAPHYSICS_ENGINE_SPEC.md -->


---

<!-- BEGIN 114.12.31WORKFLOW_ROLES_AND_RECOMMENDATIONS拷貝.md -->

# 專案角色與工作模式說明（補充建議版）

## 一、專案總覽

本專案為一套「命理語彙包裝的心理計量系統」，核心價值不在於命理本身，
而在於「向量累積 → 心理母題映射 → 可解釋的分析與建議」。

因此，本專案採用「人類決策 × AI 協作 × 工程分層」的工作模式。

---

## 二、角色分工總覽（不可混淆）

### 1. 人類（Product Owner / 世界觀設計者）

**責任範圍：**
- 產品方向與存在理由
- 世界觀與命理語彙定調
- 美術風格與視覺情緒的最終裁決
- 命理語感是否成立
- 品牌調性與市場定位（唯一決策者）

**不應交由 AI 的事項：**
- 價值選擇
- 文化判斷
- 商業風險承擔

**✅ 補充建議：**
- **資料驗證權**：所有 JSON 資料（題庫、母題、指引）的最終審核權
- **計分邏輯確認**：當 ChatGPT 提出新的計分公式時，必須由人類確認「這符合產品世界觀嗎？」
- **邊界案例處理**：當 AI 遇到「不知道怎麼處理」的情況時，必須回報給人類，不能自行決定

---

### 2. ChatGPT（System Architect / 技術監督者）

**責任範圍：**
- 系統架構一致性
- 資料結構與計分邏輯設計
- 演算法可解釋性
- 技術決策風險評估
- 將模糊想法轉換為可執行規格

**角色定位：**
- 不產出大量程式碼
- 不主導創意與美術
- 負責「這套系統會不會壞、能不能長期演進」

**✅ 補充建議：**
- **資料結構審查**：每次新增 JSON 檔案時，ChatGPT 必須檢查「是否與現有結構一致？」
- **計分邏輯文檔化**：所有計分公式必須寫成可讀的註解，不能只有程式碼
- **跨檔案一致性檢查**：當 Cursor 修改檔案時，ChatGPT 要檢查「是否影響其他檔案？」
- **技術債追蹤**：定期檢視 `PROJECT_ISSUES_FOR_AI.md`，評估哪些問題必須優先處理

**⚠️ 重要限制：**
- 不能直接修改程式碼（那是 Cursor 的工作）
- 不能決定「這個功能要不要做」（那是 Product Owner 的工作）
- 只能「建議」和「警告」，不能「執行」

---

### 3. Codex / Cursor（Execution Engine）

**責任範圍：**
- 實際程式碼撰寫
- 重構、補齊、修改檔案
- 依指令執行，不做產品判斷

**限制：**
- 不理解產品全貌
- 不負責設計決策
- 不做價值判斷

**✅ 補充建議：**
- **指令明確性要求**：如果指令不清楚，Cursor 應該「詢問」而不是「猜測」
- **修改前確認**：修改核心計分邏輯前，必須先說明「會影響哪些檔案」
- **測試覆蓋**：每次修改後，Cursor 應該檢查「是否有相關的測試需要更新？」
- **命名一致性**：遵循 ChatGPT 制定的命名規範（如果有的話）

**⚠️ 重要限制：**
- 不能「優化」程式碼（除非明確要求）
- 不能「重構」架構（那是 ChatGPT 的工作）
- 不能「新增功能」（那是 Product Owner 的決策）

---

### 4. Gemini（Creative & Research Sidecar）

**責任範圍：**
- 美術風格提案
- 命理文字風格探索
- 語感、敘事、靈感發散
- 市場與使用者角度的補充觀點

**限制：**
- 不做架構決策
- 不碰核心計分邏輯
- 不負責跨檔案一致性

**✅ 補充建議：**
- **文字風格庫**：建立「命理語彙風格庫」，讓 Gemini 參考（避免偏離調性）
- **文化敏感度檢查**：當 Gemini 提出文字建議時，必須標註「這是否符合中文命理文化？」
- **A/B 測試提案**：可以提出多個風格選項，但最終選擇權在 Product Owner
- **市場研究補充**：可以研究「類似產品怎麼做」，但結論要由 Product Owner 判斷

**⚠️ 重要限制：**
- 不能決定「這個風格好不好」（那是 Product Owner 的決策）
- 不能修改程式碼（那是 Cursor 的工作）
- 不能設計資料結構（那是 ChatGPT 的工作）

---

## 三、協作原則（強制遵守）

1. **所有核心邏輯必須可解釋**
   - ✅ 計分公式要有註解說明「為什麼這樣算」
   - ✅ 母題映射要有規則文檔（如 `SIGNAL_THEME_MAP`）
   - ❌ 不能有「黑盒」邏輯（AI 生成的計分公式必須可追溯）

2. **AI 文字生成不得成為結論來源**
   - ✅ AI 生成的「批命文字」只是「輸出」，不是「決策依據」
   - ✅ 所有「建議」都來自規則引擎（`buildGuidance`），不是 AI 自由發揮
   - ❌ 不能讓 AI 決定「這個使用者應該做什麼」

3. **決策權永遠在 Product Owner**
   - ✅ 所有「要不要做」的決策都由人類決定
   - ✅ AI 只能「建議」和「警告」，不能「決定」
   - ❌ 不能讓 AI 自行決定「這個功能很重要，我來做」

4. **技術監督與創意探索不得混用同一角色**
   - ✅ ChatGPT 負責技術，Gemini 負責創意
   - ✅ 如果 ChatGPT 提出創意建議，要標註「這是創意建議，請 Gemini 評估」
   - ❌ 不能讓 ChatGPT 同時做架構設計和文字風格設計

5. **執行單位（Codex）只接受明確指令**
   - ✅ 指令必須包含「要改什麼檔案」「要改成什麼樣子」
   - ✅ 如果指令不清楚，Cursor 應該「詢問」而不是「猜測」
   - ❌ 不能給 Cursor 模糊指令（如「優化一下」）

---

## 四、這套分工的目的

- 降低錯誤擴散
- 保留創造彈性
- 確保系統可長期維護
- 避免 AI「看起來很會，但實際亂跑」

**✅ 補充：實際運作時的檢查點**

### 當 Product Owner 提出需求時：
1. **ChatGPT 先評估**：「這個需求會影響哪些檔案？技術風險是什麼？」
2. **Gemini 補充觀點**：「這個需求對使用者體驗的影響是什麼？」
3. **Product Owner 決策**：「要不要做？優先級是什麼？」
4. **ChatGPT 寫規格**：「具體要改哪些檔案？改成什麼樣子？」
5. **Cursor 執行**：「依規格修改程式碼」

### 當發現 Bug 時：
1. **Cursor 先定位**：「這個 Bug 在哪個檔案？是什麼原因？」
2. **ChatGPT 評估影響**：「這個 Bug 會影響哪些功能？修復風險是什麼？」
3. **Product Owner 決定**：「要不要立即修復？還是先記錄？」
4. **Cursor 修復**：「依 ChatGPT 的修復方案執行」

### 當要新增功能時：
1. **Product Owner 提出**：「我想要新增 XXX 功能」
2. **ChatGPT 設計架構**：「這個功能需要改哪些檔案？資料結構要怎麼設計？」
3. **Gemini 補充體驗**：「這個功能對使用者體驗的影響是什麼？文字要怎麼表達？」
4. **Product Owner 確認**：「這個設計符合產品定位嗎？」
5. **Cursor 實作**：「依設計規格實作」

---

## 五、實際運作建議（基於專案現況）

### 1. 立即需要 ChatGPT 處理的事項

**高優先級：**
- ✅ **修復 Round 2 資料結構不一致問題**
  - 問題：`round2Situations.v1.json` 缺少 `choice_meta`，導致 `signal_key` 無法映射
  - ChatGPT 應該：設計統一的資料結構格式，寫出「遷移方案」
  - Cursor 執行：依方案修改 JSON 檔案和 `readingEngine.v1.js`

- ✅ **建立 i18n 系統架構**
  - 問題：UI 文字完全硬編碼，無法國際化
  - ChatGPT 應該：設計 i18n 系統架構（檔案結構、載入方式、使用方式）
  - Cursor 執行：實作 i18n 系統，把所有 UI 文字抽到資源檔

**中優先級：**
- ✅ **統一雙軌系統的資料格式**
  - 問題：新題庫和舊流程的 `userChoices` 格式不同
  - ChatGPT 應該：設計統一格式，或設計轉換層
  - Cursor 執行：實作統一格式或轉換層

### 2. 立即需要 Gemini 處理的事項

- ✅ **建立「命理語彙風格庫」**
  - 目的：讓 Gemini 在生成文字時有參考基準
  - 內容：收集現有的「好文字」和「壞文字」範例
  - 產出：一份「風格指南」文檔

- ✅ **評估「星塵節點」互動設計的可用性**
  - 問題：使用者可能找不到想要的選項
  - Gemini 應該：研究類似產品的互動設計，提出改進建議
  - Product Owner 決策：要不要改？改成什麼樣子？

### 3. 需要 Product Owner 決策的事項

- ✅ **決定「要不要修復 Round 2 資料結構問題」**
  - 影響：這是技術債，不修會導致功能不完整
  - 建議：**立即修復**（高優先級）

- ✅ **決定「要不要建立 i18n 系統」**
  - 影響：如果要國際化，這是必須的
  - 建議：**如果要國際化，立即建立**（高優先級）

- ✅ **決定「要不要統一雙軌系統」**
  - 影響：降低維護成本，但需要時間
  - 建議：**中期處理**（中優先級）

---

## 六、常見錯誤與防範

### ❌ 錯誤 1：讓 ChatGPT 直接寫程式碼
**問題**：ChatGPT 應該只負責「設計」，不應該直接寫程式碼
**正確做法**：ChatGPT 寫規格 → Cursor 實作

### ❌ 錯誤 2：讓 Gemini 設計資料結構
**問題**：Gemini 不理解技術架構，可能設計出不一致的結構
**正確做法**：Gemini 提出需求 → ChatGPT 設計結構 → Cursor 實作

### ❌ 錯誤 3：讓 Cursor 自行決定「優化」
**問題**：Cursor 可能「優化」掉重要的邏輯
**正確做法**：明確告訴 Cursor「要優化什麼」「為什麼要優化」

### ❌ 錯誤 4：讓 AI 決定「這個功能要不要做」
**問題**：這是 Product Owner 的決策權
**正確做法**：AI 只能「建議」，不能「決定」

---

## 七、工作流程範例

### 範例 1：修復 Round 2 資料結構問題

**步驟 1：Product Owner 提出需求**
> 「Round 2 的 signal_key 無法映射，需要修復」

**步驟 2：ChatGPT 分析問題**
> 「問題在於 `round2Situations.v1.json` 缺少 `choice_meta` 欄位。建議統一 Round 2/3/4 的資料結構，都使用 `items[]` + `choice_meta[]` 格式。這是遷移方案：[詳細方案]」

**步驟 3：Product Owner 確認**
> 「這個方案可行，請執行」

**步驟 4：Cursor 執行**
> 「依方案修改 `round2Situations.v1.json` 和 `readingEngine.v1.js`」

**步驟 5：ChatGPT 驗證**
> 「檢查修改後的檔案，確認結構一致」

---

### 範例 2：新增一個新的母題

**步驟 1：Product Owner 提出需求**
> 「我想要新增一個母題：『完美主義陷阱』」

**步驟 2：ChatGPT 設計資料結構**
> 「需要在 `motherThemes.v1.json` 新增一個 item，id 為 `perfectionism_trap`。同時需要在 `patternToThemeMap.v1.js` 新增映射規則。這是詳細規格：[規格]」

**步驟 3：Gemini 補充文字**
> 「這個母題的中文標籤建議用『完美主義陷阱』，英文標籤用 `Perfectionism Trap`。描述文字建議：[文字]」

**步驟 4：Product Owner 確認**
> 「文字可以，請執行」

**步驟 5：Cursor 實作**
> 「依規格新增母題到 JSON 檔案」

---

## 八、總結

這套分工模式的**核心價值**：
1. **降低錯誤擴散**：每個角色只負責自己擅長的部分
2. **保留創造彈性**：Product Owner 有最終決策權
3. **確保系統可長期維護**：ChatGPT 負責架構一致性
4. **避免 AI「看起來很會，但實際亂跑」**：明確限制每個角色的權限

**最重要的原則**：
> **「AI 只能建議，不能決定。決策權永遠在 Product Owner。」**

---

**最後更新**：2024


<!-- END 114.12.31WORKFLOW_ROLES_AND_RECOMMENDATIONS拷貝.md -->


---

<!-- BEGIN 114.12.31 PROJECT_PENDING_ISSUES.md -->

# PROJECT_PENDING_ISSUES

本文件列出目前專案中「尚未完成、但已被識別的問題」。
僅記錄問題本身與影響，不包含解法或歷史背景。

---

## Critical（核心正確性）

### 1. 新舊題庫雙軌並行的長期維護風險
新題庫（questionBank）與舊流程（ContentDB）在資料模型與計分密度上不同，導致核心引擎需同時支援兩套語意。

---

## High（架構與擴充性）

### 2. 核心引擎缺乏明確的領域模型抽象
命理流程、心理計量、儀式化流程仍高度耦合，未來新增「非命理模式」成本高。

### 3. 題庫模式切換（VITE_USE_QUESTION_BANK）語意不完全一致
兩種模式在題目來源不同，但輸出仍需共用後段邏輯，測試與驗證複雜。

### 4. 選擇最小單位（choice_meta）仍未完全制度化
Round 2/3/4 已趨於一致，但仍缺乏單一正式 Spec 文件約束。

---

## Medium（體驗與內容工程）

### 5. 星塵節點互動方式的可用性問題
隨機分佈與弱視覺回饋可能提高操作成本，影響完成率。

### 6. UI 文案完全硬編碼
文字修改需動到 Vue 模板，不利快速調整語感或未來國際化。

### 7. 中英文欄位尚未正式啟用
JSON 中保留 `_en` 欄位，但系統目前完全以中文運作。

---

## Low（工程品質）

### 8. 錯誤處理仍以 console 為主
使用者端錯誤提示較為模糊，不利除錯與信任建立。

### 9. 命名風格尚未完全統一
英文、拼音與混合命名並存，對新進人員不友善。

### 10. 缺乏系統性的資料驗證機制
題庫 meta 填寫錯誤多在實際流程中才被發現。


<!-- END 114.12.31 PROJECT_PENDING_ISSUES.md -->


---

<!-- BEGIN 114.12.31 PROJECT_ISSUES_FOR_AI.md -->

# 專案待解決問題清單（給 GPT/Gemini 參考）

## 📋 資料層面的問題

### 1. Round 2 資料結構不一致（**高優先級**）
**問題**：
- `round2Situations.v1.json` 使用 `questions[]` + `situation_id` + `options[]` 結構
- 但 `readingEngine.v1.js` 期望 `items[]` + `id` + `choice_meta[]` 結構
- 導致 Round 2 的 `signal_key` 無法正確映射

**影響**：
- `scoreRound2` 函數會跳過沒有 `choice_meta` 的答案
- Round 2 的 signal 計分可能完全失效
- `05_Dashboard.vue` 有 `normalizeRound2` 補丁，但這是臨時方案

**需要**：
- 統一 Round 2/3/4 的資料結構格式
- 或修改 `readingEngine.v1.js` 以適配現有結構

### 2. 雙軌系統資料格式不一致
**問題**：
- 新題庫系統（`questionBank.v1.json`）的 `userChoices` 有 `pattern_tags`、`behavior_facet`
- 舊流程（`ContentDB_*.js`）的 `userChoices` 有 `weights`
- `scorePsychometrics` 要同時處理兩種格式

**影響**：
- 維護成本是兩倍
- 邏輯複雜度高（用 `if (uc?.weights)` 判斷）

**需要**：
- 統一 `userChoices` 的資料格式
- 或建立轉換層，把兩種格式都轉成統一格式

### 3. JSON 檔案的中英文欄位使用不一致
**問題**：
- 所有 JSON 都有 `_zh` 和 `_en` 欄位
- 但 UI 層面完全只用中文，英文欄位沒有被使用
- 沒有 i18n 系統

**影響**：
- 無法國際化
- 英文欄位是「死資料」

**需要**：
- 建立 i18n 系統
- 或決定是否保留英文欄位

---

## 🔧 功能層面的問題

### 4. Round 2 Signal 映射失效
**問題**：
- `readingEngine.v1.js` 的 `scoreRound2` 無法從 Round 2 答案取得 `signal_key`
- 因為 `round2Situations.v1.json` 沒有 `choice_meta` 欄位

**影響**：
- `SIGNAL_THEME_MAP` 無法運作（如 `stability` → `fear_based_stability`）
- Round 2 的 signal 無法影響 theme 計分

**需要**：
- 修復資料結構，或
- 修改 `scoreRound2` 邏輯以適配現有結構

### 5. 「星塵節點」互動設計可用性問題
**問題**：
- Round 2/3 的選擇方式是「星塵宇宙中的節點」，位置隨機分佈
- 使用者可能找不到想要的選項
- 點擊後沒有明確反饋

**影響**：
- 操作成本高
- 使用者可能因為「找不到選項」而放棄

**需要**：
- 改善視覺反饋（如高亮、動畫）
- 或考慮改為「卡片式選擇」

### 6. 題庫模式與舊流程的切換邏輯不清晰
**問題**：
- 用環境變數 `VITE_USE_QUESTION_BANK` 切換
- 但兩種模式的資料格式不同，可能導致計分不一致

**影響**：
- 測試困難（要測試兩種模式）
- 使用者體驗不一致

**需要**：
- 統一兩種模式的輸出格式
- 或明確說明兩種模式的差異

---

## 🔄 程序層面的問題

### 7. 缺乏抽象層，擴展性差
**問題**：
- `SoulArchitect.js` 直接耦合「生辰」「共振」「命盤」等概念
- 沒有領域模型抽象
- 如果要改成「不問生辰，只問心理狀態」的模式，必須重寫核心邏輯

**影響**：
- 無法快速迭代新功能
- 程式碼耦合度高

**需要**：
- 建立領域模型抽象
- 分離「儀式感」與「功能邏輯」

### 8. 命名風格混亂
**問題**：
- 有些用英文（`elementVector`, `axisVector`）
- 有些用中文拼音（`ink-font`, `brush-font`）
- 有些用混合（`round2Situations`, `motherThemes`）

**影響**：
- 新開發者難以理解
- 國際化時翻譯成本高

**需要**：
- 統一命名規範
- 或建立命名對照表

### 9. UI 文字完全硬編碼
**問題**：
- 所有按鈕、標題、提示文字都寫死在 Vue 模板裡
- 沒有 i18n 系統

**影響**：
- 無法國際化
- 修改文字要改程式碼

**需要**：
- 建立 i18n 系統
- 把所有 UI 文字抽到資源檔

### 10. 缺乏完整的錯誤處理
**問題**：
- 很多地方用 `try-catch` 但只 `console.warn`
- 使用者看不到錯誤訊息（除了「天機混沌，請稍後再試」）

**影響**：
- 除錯困難
- 使用者體驗差（不知道發生什麼事）

**需要**：
- 建立統一的錯誤處理機制
- 提供使用者友善的錯誤訊息

---

## 🎯 優先級建議

### 高優先級（必須修）
1. **Round 2 資料結構不一致**（問題 1、4）
2. **UI 文字硬編碼**（問題 9）- 如果要國際化

### 中優先級（應該修）
3. **雙軌系統資料格式不一致**（問題 2）
4. **缺乏抽象層**（問題 7）
5. **「星塵節點」可用性問題**（問題 5）

### 低優先級（可以修）
6. **命名風格混亂**（問題 8）
7. **錯誤處理**（問題 10）
8. **JSON 中英文欄位**（問題 3）

---

**最後更新**：2024



<!-- END 114.12.31 PROJECT_ISSUES_FOR_AI.md -->


---

# [SOURCE] 114.12.31 題庫工程化工作計劃_MasterPlan_v1.md

# 題庫工程化工作計劃（Master Plan v1）

> 本文件定義「心理鑑別 × 東方命理語境」題庫的**完整工作流程**，作為後續所有題庫設計、修訂、擴充的共同依循標準。

---

## 一、總體目標（不可變）

### 1. 核心使命
以**最少題目數量**，在**不犧牲鑑別度與準確度**的前提下，完成：

- 全人類 × 全年齡 × 全性別 × 跨文化
- 可計算、可驗證、可工程化
- 對外呈現為：  
  **東方命理／五行／算命／姓名學系統**
- 對內本質為：  
  **高鑑別度心理測量系統**

---

## 二、基本設計鐵律（所有人必須遵守）

### 鐵律 1：心理為骨，命理為皮
- 心理結構 = 真正計算核心
- 命理語言 = 題目與敘事包裝
- ❌ 命理不得主導 scoring
- ✅ 命理只作為 prior 與 narrative

### 鐵律 2：少題高效
- 每一題都必須能：
  - 切開族群
  - 對應明確心理構面
- ❌ 不允許「為了好看而存在的題目」

### 鐵律 3：使用者不需知道心理學
- 題目表面語言：
  - 氣、勢、運、卡關、流不動
- 禁用詞：
  - 焦慮、憂鬱、人格、症狀

---

## 三、題庫結構總覽（鎖定）

### Round 1｜命盤入口（定位）
- 功能：引導使用者進入「算命敘事」
- 不承擔心理鑑別
- 僅決定後續題庫路徑

---

### Round 2｜狀態題（State）
**目標**：捕捉「當下能量狀態」

- 題數：每個主軸 3–4 題（上限）
- 題型：單選 / forced choice
- 語言特性：
  - 最近
  - 這段時間
  - 目前的氣是否順

- 工程要求：
  - 高 sensitivity
  - 可短期波動
  - 不定性格標籤

---

### Round 3｜結構題（Trait）
**目標**：捕捉「長期心理結構」

- 題數：核心 4–6 題
- 題型：單選為主
- 語言特性：
  - 一直以來
  - 通常
  - 命盤底色

- 工程要求：
  - 高穩定性
  - 高鑑別度
  - 可跨情境重現

---

### Round 4｜定錨（Anchor）
- 功能：
  - 穩定排序
  - 強化敘事可信度
- 不新增主要分數
- 僅作權重微調與 narrative 支撐

---

## 四、題目產出流程（標準作業）

### Phase A｜心理結構定義
- 定義此題要量：
  - 哪個心理構面
  - 哪個行為面向
  - 對應哪一母題

### Phase B｜命理語感轉譯
- 將心理構面翻譯為：
  - 氣是否通
  - 勢是否被壓
  - 運是否卡住

⚠️ 不得出現結論句

---

### Phase C｜選項設計
- 每個選項都必須：
  - 看起來「合理」
  - 但代表不同傾向
- 禁止：
  - 善惡對立
  - 正確答案感

---

### Phase D｜工程對應
- 綁定：
  - pattern_tag
  - behavior_facet
  - 五行向量（僅作映射）

---

## 五、品質檢核（必跑）

每一題都必須通過：

- [ ] 使用者能理解，但說不出「被測什麼」
- [ ] 不需心理學背景即可作答
- [ ] 不造成羞愧、指責、病理化
- [ ] 對應 scoring 與 narrative

---

## 六、資料補充原則（給 Gemini / 外部研究）

### 什麼時候才搜資料？
✅ 題庫骨架完成後

### 搜尋指令必須明確指定：
- 只要描述句
- 不要結論句
- 可轉為選項語言

---

## 七、完成線定義（v1）

- 題庫骨架完成
- 題目數量最小化
- validate / build 全通過
- 使用者直覺認為：
  >「這是一個算命站」

---

（本文件為題庫工程最高準則，後續所有題目設計不得違反）
