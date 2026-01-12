# 核心引擎運算邏輯完整任務包（顧問群完整背景資料）

**任務編號**：ENGINE-CORE-LOGIC-ADVISOR-001  
**建立日期**：2026-01-12  
**狀態**：READY_FOR_ADVISOR_CONSULTATION  
**目標**：提供完整背景資料給顧問群，針對題目設計、題目內容、分數計算方式進行總討論

---

## 📋 任務概述

### 任務目標

針對以下核心議題進行總討論，並提供完整背景資料給顧問群：

1. **題目設計**：題目要怎麼問？選項要有幾個？要怎麼選？
2. **題目內容**：題目內容如何設計才能達到「準到發毛」的分析能力？
3. **分數計算方式**：如何進行積分？如何進行權重？如何獲得後續結果？
4. **結果呈現方式**：如何呈現結果？如何讓使用者覺得非常準確？
5. **UI 整合**：如何與網頁設計架構（八卦盤、五行、福馬盤等）完美融合？

### 終極目標

- **對全世界所有年齡所有人都可以非常準確**，準到發毛的那一種感覺
- **基於準確的分析結果，提出有效的解決方案以及未解決的連鎖反應**
- **需要龐大的資料庫和強大的運算能力**
- **需要顧問團隊的協助**

---

## 🎯 第一部分：專案核心目標與限制

### 1.1 專案憲章（CHARTER）

**SSOT**：`charter/CHARTER.md`

#### 最高目標
- 打造可長期運作、可維護、可收費、可持續擴充的互動式網頁產品
- 核心策略：核心引擎可審計；外層以東方命理敘事呈現；對使用者提供可執行建議與風險鏈

#### 不可觸碰限制
1. 主進度/主目標以文本為準，不以對話上下文為準
2. 未寫入文本的結論視為不存在
3. 任何結構性變更（schema/domain/governance/charter）必須 ADR + 使用者批准
4. 指揮官必須白話回報、短句直白

#### 成功定義
- 本專案在使用者的認知與體驗中，是一個**完整的玄學系統**
- 使用者只會、也只需要感知到：這是一個玄學網站、這是一套命理/神秘系統、這個系統非常準、這個系統對自己很有幫助
- 使用者**不需要、也不應該**被告知：任何心理學名詞、任何現代科學背景、任何「其實這不是玄學」的說明

#### 核心原則
- **對使用者：純玄學體驗**（ADR_0002）
- **內部：科學核心**：建立在完整、嚴謹、可推導的現代心理學與相關科學系統之上
- **世界級水準與國際市場（CN/EN）**：必須做到世界級水準，可切換成英文版，英文版不得只是翻譯

---

### 1.2 路線圖（ROADMAP）

**SSOT**：`roadmap/ROADMAP.md`

#### 當前階段：Phase 0 - MVP（單一構面）

**已完成**：
- ✅ P0-1 選定第一個構面（facet）：`income_expansion_pressure`
- ✅ P0-2 建立該 facet 的 questions/scoring/reco/narr/risk
- ✅ P0-3 跑 golden tests 固定輸入輸出
- ✅ P0-4 Facet Portability & Stress Test（驗證結構可移植性）
- ✅ P0-4.5 題目流程與分流系統設計（多階段分流系統設計）

**P0-2 決策（Commander Locked）**：
- 採納 R1 題目藍圖：A「歲時農耕・倉廩觀」作為 user-facing 唯一主隱喻
- 採納 R4 風險鏈：Framework A/B 作為 internal 結構（對外輸出必須翻譯成農耕語彙）

**當前任務**：
- [ ] P0-5 建立最小 UI 串接（讀 compiled facet -> 顯示敘事+建議+風險鏈）

---

### 1.3 當前狀態（CURRENT）

**SSOT**：`memory/briefs/CURRENT.md`

#### P0-2（income_expansion_pressure）決策已鎖定
- R1：採用「歲時農耕・倉廩觀」作為題目與敘事主隱喻
- R4：採用 A/B 風險鏈結構（對外全部轉譯為農耕詞彙，避免隱喻混用）
- 下一步：產出 questions + scoring -> 交 R2 做 narr/reco -> 風險鏈落盤 -> golden tests

---

## 🔧 第二部分：核心引擎運算邏輯

### 2.1 分數計算模型（Scoring Model）

**SSOT**：`domain/facets/*.scoring.v1.0.json`  
**實作**：`engine/score_facet.py`

#### 當前模型：weighted_sum（加權總和）

**模型定義**：
```json
{
  "model": "weighted_sum",
  "inputs": [
    { "questionId": "sr_q1", "weight": 1.0, "direction": "higher_is_worse" },
    { "questionId": "sr_q2", "weight": 1.0, "direction": "higher_is_worse" }
  ],
  "bands": [
    { "band": "low", "min": 0.0, "max": 0.33 },
    { "band": "mid", "min": 0.33, "max": 0.66 },
    { "band": "high", "min": 0.66, "max": 1.01 }
  ]
}
```

#### 計算邏輯（Python 實作）

**檔案**：`engine/score_facet.py`

**計算步驟**：
1. 對每個題目（questionId）：
   - 取得使用者答案（answers[qid]）
   - 取得權重（weight）
   - 根據方向（direction）正規化：
     - `higher_is_worse`：`score = v / 4.0`（假設 5 點量表，0-4）
     - `higher_is_worse_reversed`：`score = (4.0 - v) / 4.0`
2. 計算加權總和：`total += score * weight`
3. 計算平均分數：`avg = total / total_weight`
4. 根據分數區間（bands）決定 band（low/mid/high）

**輸出格式**：
```json
{
  "facetId": "stress_recovery",
  "domainVersion": "1.0",
  "score": 0.75,
  "band": "high",
  "narrative": { ... },
  "recommendations": [ ... ],
  "riskchains": { ... }
}
```

#### 當前限制與擴充需求

**當前限制**：
- 只支援 `weighted_sum` 模型
- 只支援 5 點量表（0-4）
- 只支援兩種方向：`higher_is_worse` 和 `higher_is_worse_reversed`

**擴充需求**：
- 需要支援更多題型（單選、多選、情境題等）
- 需要支援不同量表長度
- 需要支援更複雜的計算模型（如果需要）
- 需要支援多階段分流系統的計算邏輯

---

### 2.2 題目設計指南（Question Design Guidelines）

**SSOT**：`domain/knowledge_base/question_design_guidelines.v1.0.md`

#### 核心原則

##### 1. 「去問卷化」原則 (De-survey Principle)
- **儀式感優先**：使用者的互動體驗應被感知為「選象、取兆、應機」，而非填寫醫療問卷或心理測驗
- **單一物件選擇**：避免滑桿、李克特量表與多選題；優先採用單選、直覺式決定
- **象徵化互動**：選項應以符號、元素、狀態或情境呈現，模擬抽籤、擲卦、選牌

##### 2. 題目語境要求 (Contextual Purity)
- **詞彙限制**：題目與選項必須僅使用 `vocabulary_metaphysical.v1.0.json` 中的詞彙
- **嚴禁外顯語境**：不得出現任何心理學、科學、醫療或診斷相關用語
- **正反示例**：
  - ❌ 錯誤：你最近是否感到焦慮？
  - ✅ 正確：近來是否常覺心神不寧，氣滯難行？

##### 3. 題目結構要求 (Structural Mapping)

**注意**：以下 Stage 設計以 `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` 為準（2026-01-12 更新）。

- **Stage 1（八卦定方位）**：
  - 題目引導使用者從八個具象象徵（天、地、雷、風、水、火、山、澤）中選擇其一
  - 對應 `bagua_8_trigrams.v1.0.json`
  - 界面類型：八卦轉輪 (Ba Gua Wheel) 或 八門卡片
  - 互動方式：單選（強制）

- **Stage 2（六親定物象）**：
  - 鎖定具體人事物，避免抽象歸因
  - 界面類型：符號雲 / 物象群 (Symbol Cloud)
  - 互動方式：多選 2–3 項
  - 物象分類：Authority (印)、Power (官)、Resource (財)、Peer (比)、Output (食)

- **Stage 3（萬象定歸因）**：
  - 診斷歸因模式與能動性
  - 界面類型：萬象羅盤 / 星盤 (Phenomenon Compass)
  - 互動方式：投射式選擇（單選或少量多選）

---

### 2.3 結果呈現設計（Result Presentation Design）

**SSOT**：`domain/knowledge_base/result_presentation_design.v1.0.md`

#### L1–L4 分層架構

- **L1（Hexagram Visual）**：卦象視覺、卦名（中 / 英）、核心關鍵詞
- **L2（Root Narrative）**：Root Element 個性化切入敘事
- **L3（Flow Analysis）**：上下卦互動、五行生剋、Collision 敘事
- **L4（Action & Risk）**：風險狀態、宜忌指引、行動建議

#### 各層級內容定義

- **L1**：Hexagram ID、卦名、象意標籤
- **L2**：Root Element 名稱、天賦與盲點敘述
- **L3**：局勢流動描述，使用 `narrative_openers`
- **L4**：風險等級轉譯、`advice_markers` 導引、三項行動要點

---

### 2.4 詞彙管理與語言規範（Vocabulary Management & Language Guidelines）

**重要性**：詞彙管理是確保「純玄學體驗」的核心機制，直接影響題目設計、結果呈現和 AI 敘事生成的品質。

#### 2.4.1 全域詞彙管理（Global Vocabulary Management）

**SSOT**：`domain/knowledge_base/`

##### 1. 玄學詞彙白名單（Metaphysical Vocabulary Whitelist）

**SSOT**：`domain/knowledge_base/vocabulary_metaphysical.v1.0.json`

**用途**：
- 定義所有允許使用的玄學詞彙
- 包含：卦名、五行屬性、狀態描述詞、敘事開場用語、建議標記等
- **硬規則**：題目與選項必須僅使用此白名單中的詞彙

**主要類別**：
- `hexagram_names`：六十四卦名稱（中/英）
- `element_properties`：五行屬性描述
- `state_descriptors`：狀態描述詞（positive/neutral/negative）
- `narrative_openers`：敘事開場用語（觀卦、察象、推演等）
- `advice_markers`：建議標記（宜/忌、適合/不宜等）

##### 2. 全域禁用詞表（Global Forbidden Terms）

**SSOT**：`domain/knowledge_base/forbidden_terms.v1.0.json`

**用途**：
- 定義所有禁止使用的詞彙和短語
- 包含：心理學名詞、科學術語、診斷用語、**命定論用語**等
- **硬規則**：命中即 FAIL，不轉譯、不補救

**主要類別**：
- `psychological_terms`：心理學名詞（焦慮、抑鬱、防禦機制等）
- `scientific_terms`：科學術語（心理學、神經科學、認知科學等）
- `diagnostic_terms`：診斷用語（診斷、治療、症狀等）
- **`fatalism_terms`（命定論用語）**：
  - ❌ 「你註定是木命/火命/土命/金命/水命」
  - ❌ 「你無法改變五行」
  - ❌ 「你天生就是這樣」
  - ❌ 「你五行缺X所以會失敗」
  - ❌ 「這是你的宿命」
  - ❌ **「你是怎樣」/「你就怎樣」等語氣**

**替代詞彙**：
- 每個禁用詞都提供 `suggested_alternatives`（建議替代詞）
- 例如：「焦慮」→「心神不寧」、「氣滯流塞」

##### 3. 心理學映射表（Psychology Mapping - Internal Only）

**SSOT**：`domain/knowledge_base/vocabulary_psychology_mapping.v1.0.json`

**用途**：
- **內部使用**：僅供驗證和維護使用
- **對外隱藏**：不得暴露給使用者
- 建立玄學詞彙與心理學概念的對應關係

**警告**：此檔案僅供開發和設計層使用，不得出現在使用者可接觸的層級。

#### 2.4.2 呈現用語規範（Presentation Guidelines）

**SSOT**：`domain/knowledge_base/presentation_guidelines.v1.0.md`

**核心原則**：

1. **Metaphysical Purity（玄學語境純粹性）**：
   - 使用**僅限於**玄學詞彙庫中的詞彙
   - 禁止使用心理學名詞、科學術語、診斷用語

2. **Strict Prohibition（嚴格禁止）**：
   - 絕對禁止在使用者面向的輸出中使用心理學、科學或醫學/診斷術語
   - 引用 `forbidden_terms.v1.0.json` 進行檢查

3. **Narrative Role（敘事角色）**：
   - 系統扮演「解象者」，而非臨床分析師
   - 系統是「玄學敘事者」，不是運算者

4. **AI 敘事層約束**：
   - AI 是「敘事者」，不是「運算者」
   - AI 不得重新解卦、修改風險等級、新增建議
   - AI 必須維持本機計算的風險等級

#### 2.4.3 AI 敘事生成規範（AI Narrative Spec）

**SSOT**：`domain/knowledge_base/ai_narrative_spec.v1.0.md`

**嚴格約束**：

1. **禁止重新解卦**：
   - AI 必須完全接受 Payload 中的卦象與變爻資料

2. **禁止修改風險等級**：
   - AI 不得降低或提升本機計算之風險等級

3. **禁止新增建議**：
   - AI 僅能潤飾 Payload 中既有之行動建議

4. **玄學語境約束**：
   - 僅使用玄學詞彙庫（`vocabulary_metaphysical.v1.0.json`）
   - 必須通過禁用詞檢查（`forbidden_terms.v1.0.json`）
   - 遵循呈現用語規範（`presentation_guidelines.v1.0.md`）

#### 2.4.4 Facet 專用詞彙管理（Facet-Specific Vocabulary Management）

**重要性**：每個 Facet 都有其專用的禁用詞表和次隱喻白名單，確保 Facet 之間的語境隔離。

##### Facet 專用禁用詞表（Facet-Specific Banned Terms）

**位置**：`docs/domain/advisory/R4/`

**範例**：
- `P0-3_NARRATIVE_BLACKLIST_SSOT.json` - `income_expansion_pressure` Facet 專用禁用詞
- `P0-3_BANNED_TERMS_LIST.md` - 人類可讀版本
- `P0-4_NARRATIVE_BLACKLIST_SSOT.json` - `relationship_imbalance` Facet 專用禁用詞
- `P0-4_BANNED_TERMS_LIST.md` - 人類可讀版本

**結構**：
```json
{
  "version": "2.0",
  "scope": "P0-3 income_expansion_pressure",
  "facet": "income_expansion_pressure",
  "primary_metaphor": "agriculture_granary",
  "blacklist": {
    "clinical_medical": { "cn": [...], "en": [...] },
    "finance_corporate": { "cn": [...], "en": [...] },
    "specific_instruction": { "cn": [...], "en": [...] },
    "fatalism_fear": { "cn": [...], "en": [...] }
  },
  "rule": {
    "on_hit": "FAIL",
    "no_translation_recovery": true
  }
}
```

**硬規則**：
- 命中任一詞彙 → 直接 FAIL（Gate=0）
- 不可轉譯補救：不能通過轉譯或替代說法來規避檢查
- Facet 限定：不構成全域禁用

##### Facet 專用次隱喻白名單（Facet-Specific Secondary Metaphor Whitelist）

**位置**：`docs/domain/advisory/R2/`

**範例**：
- `P0-3_SECONDARY_METAPHOR_WHITELIST.json` / `.md`
- `P0-4_SECONDARY_METAPHOR_WHITELIST.md`

**用途**：
- 定義每個 Facet 允許使用的次隱喻類型
- 確保隱喻一致性（文明一致性原則）
- 可被 grep/regex 機器檢查

**使用規則**：
- 每一層 L1–L4：最多 **1 個**次隱喻關鍵詞
- 禁止角色與場景替換
- 禁止跨句、跨段延展
- Facet 限定：不構成全域禁用

#### 2.4.5 語氣與敘事限制（Tone & Narrative Restrictions）

**重要限制**：

1. **禁止命定論語氣**：
   - ❌ 「你註定是...」
   - ❌ 「你天生就是這樣」
   - ❌ 「你無法改變...」
   - ❌ 「這是你的宿命」
   - ❌ **「你是怎樣」/「你就怎樣」**

2. **禁止恐嚇語氣**：
   - ❌ 「註定失敗」
   - ❌ 「沒救了」
   - ❌ 「完蛋」
   - ❌ 「永遠無法」
   - ❌ 「報應」
   - ❌ 「死路」
   - ❌ 「絕望」
   - ❌ 「災難」

3. **禁止具體決策指令**：
   - ❌ 「分手」
   - ❌ 「離婚」
   - ❌ 「辭職」
   - ❌ 「就醫」
   - ❌ 「投資」
   - ❌ 「買房/買車」

4. **保持能動性**：
   - ✅ 給出「宜/忌」姿態，而非絕望宣判
   - ✅ 即使入冬，也要給「守中養根/避風保本」的姿態
   - ✅ 避免宿命論，保持使用者的能動性

#### 2.4.6 詞彙管理在題庫整理中的重要性

**在總題庫整理階段，詞彙管理的重要性**：

1. **題目設計階段**：
   - 所有題目必須通過 `vocabulary_metaphysical.v1.0.json` 白名單檢查
   - 所有題目必須通過 `forbidden_terms.v1.0.json` 禁用詞檢查
   - 所有題目必須通過 Facet 專用禁用詞表檢查

2. **結果呈現階段**：
   - 所有敘事必須遵循 `presentation_guidelines.v1.0.md`
   - 所有敘事必須通過 AI 敘事生成規範檢查
   - 所有敘事必須避免命定論語氣

3. **題庫分類與整合**：
   - 確保不同 Facet 的題目使用正確的詞彙
   - 確保題目分類符合 Facet 專用的次隱喻白名單
   - 確保計分方式與詞彙使用一致

**建議**：
- 在總題庫整理階段，應建立統一的詞彙檢查機制
- 所有題目、敘事、建議都應通過自動化詞彙檢查
- 定期更新和擴充詞彙庫，確保覆蓋面完整

---

## 🎨 第三部分：UI 架構與工作流程

### 3.1 UI 架構設計（Layer 0-6）

**SSOT**：`specs/ui/architecture/P0-5_UI_ARCHITECTURE.md`

#### 架構總覽

- **Layer 0（Entry）**：入口層
- **Layer 1（Worldview）**：世界觀層
- **Layer 2（Facet Gate）**：構面選擇層（目前設計為直接選擇 Facet，未來可擴充為 P0-4.5 的 Stage 1-4）
- **Layer 3（Question Walk）**：題目問答層
- **Layer 4（Calculation）**：計算層（隱藏）
- **Layer 5（Narrative Stage）**：結果呈現層
- **Layer 6（Action & Risk）**：行動建議與風險鏈層

#### 當前實作（Prototype）

**檔案**：`prototype/app.js`

**功能**：
- 載入 compiled facet JSON
- 渲染題目（renderQuestions）
- 計算分數（sumScore）
- 選擇結果 band（chooseOutcome）
- 呈現結果（renderResult）

---

### 3.2 4 階段分流系統設計（P0-4.5）

**SSOT**：`P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`

#### 系統目標

建立一套「純玄學外觀、科學內核」的分流系統，使任何使用者可在短流程內，從模糊困擾被收斂至單一、可解析、可計費的 Facet。

**核心原則**：
1. **全覆蓋 (Universal Coverage)**：全程不產生「沒有符合選項」的體驗
2. **單一出口 (Single Exit)**：最終必須收斂至單一 Facet (One Session, One Problem)
3. **高解析度 (High Granularity)**：必須能區分相同領域下的不同心理歸因與具體情境

#### 4 階段架構

| 階段 | 名稱 | 核心功能 | 資訊維度 |
| :--- | :--- | :--- | :--- |
| **Stage 1** | **八卦定方位** (The Domain Gate) | 鎖定大領域，建立付費邊界 | **Where** (哪裡痛) |
| **Stage 2** | **六親定物象** (The Context Lock) | 鎖定具體人事物，避免抽象歸因 | **Who/What** (局中何物) |
| **Stage 3** | **萬象定歸因** (The Attribution Matrix) | 診斷歸因模式與能動性 | **Why** (為何而痛) |
| **Stage 4** | **綜合斷語** (Synthesis & Routing) | 產出洞察與路由 | **Insight** (洞察與路徑) |

#### Stage 1：八卦定方位

- **目的**：初步分流，確立諮詢主題
- **互動形式**：強制單選 (Single Choice)
- **隱喻介面**：八卦轉輪 (Ba Gua Wheel) 或 八門卡片
- **硬規則**：
  - 必須包含 **「中宮 / 混沌 (Chaos)」** 作為兜底入口
  - 一次僅鎖定一個領域，禁止複選
- **數據輸出**：
  ```json
  { "domain_id": "BAGUA_CODE" } // e.g., KUN (Career), XUN (Relationship)
  ```

#### Stage 2：六親定物象

- **目的**：鎖定具體人事物，解決「有痛感但無對象」的問題
- **理論基礎**：八字六親 (Six Relations) → 抽象化符號
- **互動形式**：符號雲 / 物象群 (Symbol Cloud)
- **操作方式**：多選 2–3 項（憑直覺，不需理解含義）
- **物象分類表**：
  1. **Authority (印)**：長輩、規範、契約、制度、高牆
  2. **Power (官)**：責任、壓力、考試、法則、枷鎖
  3. **Resource (財)**：金錢、目標、慾望、資源、獵物
  4. **Peer (比)**：同儕、競爭者、合作夥伴、影子
  5. **Output (食)**：子女、作品、表現、情緒出口、花果

#### Stage 3：萬象定歸因

- **目的**：診斷使用者的歸因慣性（Locus of Control）與能動性（Agency）
- **互動形式**：萬象羅盤 / 星盤 (Phenomenon Compass)
- **操作方式**：投射式選擇（單選或少量多選）
- **歸因軸向 (Attribution Axis)**：
  - **外部・不可控** (Fate)：宿命、劫數、天意
  - **外部・情境** (Context)：小人、羅網、時勢
  - **內部・不足** (Deficit)：無力、迷惘、空虛（能力/資源不足）
  - **內部・過度** (Overload)：執著、心魔、自苦（責任/認知過載）
- **能動軸向 (Agency Axis)**：Low / Medium / High

#### Stage 4：命盤綜合與斷語

- **目的**：生成「當頭棒喝」的洞察並導向 Facet
- **生成規則**：
  1. **比例化描述**：指出「責任分佈失衡」（如：七分在天，三分在人）
  2. **必引物象**：斷語中必須包含 Stage 2 選中的具體符號（如：「您被『高牆』所困...」）
  3. **矛盾揭露**：若 Stage 2 與 Stage 3 存在衝突（如：選了「宿命」卻又「執著」），必須點出
  4. **去病理化**：禁止使用焦慮、憂鬱等現代心理學名詞
- **數據輸出**：
  ```json
  {
    "diagnosis_insight": "String (Metaphysical Narrative)",
    "target_facet_id": "income_expansion_pressure" // or relationship_imbalance
  }
  ```

---

### 3.3 UI 整合方案（P0-4.5 與 P0-5）

**SSOT**：`P0-4.5/P0-4.5_INTEGRATION_WITH_P0-5.md`

#### 整合策略

**方案 A：P0-5 先做基礎實作，P0-4.5 後續擴充（推薦）**

**P0-5 階段**：
- Layer 2：直接實作簡單的 Facet 選擇（卡片式，選擇 `income_expansion_pressure` 或 `relationship_imbalance`）
- Layer 3-5：正常實作（題目問答、結果顯示）

**P0-5 之後**：
- 將 P0-4.5 的 Stage 1-4 作為 Layer 2 的擴充
- Stage 1-4 完成後，路由到對應的 Facet
- 然後進入 Layer 3-5（題目問答、結果顯示）

#### 數據流整合

**當前 P0-5 的數據流（簡化版）**：
```
使用者選擇 Facet (Layer 2)
        ↓
Facet 題目問答 (Layer 3)
        ↓
結果顯示 (Layer 5)
```

**整合 P0-4.5 後的數據流（完整版）**：
```
Stage 1: 八卦定方位 (Layer 2 擴充)
        ↓
Stage 2: 六親定物象 (Layer 2 擴充)
        ↓
Stage 3: 萬象定歸因 (Layer 2 擴充)
        ↓
Stage 4: 命盤綜合與斷語 → 路由到 Facet (Layer 2 擴充)
        ↓
Facet 題目問答 (Layer 3)
        ↓
結果顯示 (Layer 5)
```

---

## 📊 第四部分：當前實作範例

### 4.1 當前 Facet 範例：stress_recovery

**Manifest**：`domain/manifests/stress_recovery.v1.0.json`  
**Compiled**：`domain/compiled/stress_recovery.compiled.v1.0.json`  
**Questions**：`domain/questions/stress_recovery.questions.v1.0.json`  
**Scoring**：`domain/facets/stress_recovery.scoring.v1.0.json`

#### 題目範例

```json
{
  "id": "sr_q1",
  "text": "最近 7 天，你覺得自己大多時候是在「撐著」嗎？",
  "type": "likert_5",
  "scale": [
    "完全沒有",
    "很少",
    "有時",
    "常常",
    "幾乎一直"
  ]
}
```

#### 分數計算範例

```json
{
  "model": "weighted_sum",
  "inputs": [
    {
      "questionId": "sr_q1",
      "weight": 1.0,
      "direction": "higher_is_worse"
    },
    {
      "questionId": "sr_q2",
      "weight": 1.0,
      "direction": "higher_is_worse"
    }
  ],
  "bands": [
    { "band": "low", "min": 0.0, "max": 0.33 },
    { "band": "mid", "min": 0.33, "max": 0.66 },
    { "band": "high", "min": 0.66, "max": 1.01 }
  ]
}
```

---

## 🎯 第五部分：核心討論議題

### 5.1 題目設計議題

#### 議題 1：題目要怎麼問？

**當前設計**：
- 使用玄學語境（「撐著」、「心神不寧」等）
- 避免心理學名詞
- 使用 5 點量表（likert_5）

**需要討論**：
- 如何設計題目才能達到「準到發毛」的效果？
- 題目數量應該多少？（當前範例只有 2 題，但實際可能需要更多）
- 題目類型配比（情境題/自評題/資源題/恢復題）應該如何？
- 如何確保題目能穩定區分 3~5 種狀態？

#### 議題 2：選項要有幾個？要怎麼選？

**當前設計**：
- 5 點量表（完全沒有、很少、有時、常常、幾乎一直）
- 單選（radio button）

**需要討論**：
- 選項數量是否足夠？（5 個 vs 7 個 vs 其他）
- 選項文字如何設計才能更準確？
- 是否需要支援多選題？（Stage 2 需要多選 2-3 項）
- 如何避免使用者「全部選中間」的問題？

#### 議題 3：如何與 UI 架構融合？

**當前設計**：
- Stage 1：八卦轉輪/八門卡片（單選）
- Stage 2：符號雲/物象群（多選 2-3 項）
- Stage 3：萬象羅盤/星盤（投射式選擇）
- Layer 3：題目問答（單選）

**需要討論**：
- 如何將題目設計與八卦盤、五行、福馬盤等 UI 元素完美融合？
- 不同階段的題目應該如何呈現？
- 如何確保使用者體驗流暢且直覺？

---

### 5.2 分數計算議題

#### 議題 1：如何進行積分？

**當前設計**：
- 使用 `weighted_sum` 模型
- 每個題目有權重（weight）
- 根據方向（direction）正規化分數

**需要討論**：
- 權重應該如何設定？（當前都是 1.0，是否需要不同權重？）
- 如何處理不同題型的積分？（單選、多選、情境題等）
- 如何處理多階段分流系統的積分？（Stage 1-4 的選擇如何轉換為分數？）

#### 議題 2：如何進行權重？

**當前設計**：
- 所有題目權重相同（1.0）

**需要討論**：
- 哪些題目應該有更高的權重？
- 權重應該如何決定？（基於理論、基於數據、基於顧問建議？）
- 不同 Facet 的權重策略是否應該不同？

#### 議題 3：如何獲得後續結果？

**當前設計**：
- 根據分數區間（bands）決定 band（low/mid/high）
- 根據 band 取得對應的 narrative、recommendations、riskchains

**需要討論**：
- 分數區間應該如何設定？（當前是 0-0.33, 0.33-0.66, 0.66-1.01）
- 是否需要更多 band？（3 個 vs 5 個 vs 其他）
- 如何確保結果準確且有意義？

---

### 5.3 結果呈現議題

#### 議題 1：如何呈現結果？

**當前設計**：
- L1-L4 分層架構
- 使用玄學敘事（narrative）
- 提供行動建議（recommendations）
- 提供風險鏈（riskchains）

**需要討論**：
- 如何呈現才能讓使用者覺得「準到發毛」？
- 如何平衡「準確性」和「可理解性」？
- 如何確保結果對使用者有實際幫助？
- **如何確保結果呈現符合詞彙管理規範？**
- **如何避免命定論語氣和恐嚇語氣？**
- **如何確保 AI 敘事生成符合規範？**

#### 議題 2：如何讓使用者覺得非常準確？

**需要討論**：
- 什麼樣的結果呈現方式會讓使用者覺得準確？
- 如何避免「套話」和「雞湯」？
- 如何確保結果有個性化和針對性？

#### 議題 3：如何基於準確的分析結果提出有效的解決方案？

**需要討論**：
- 解決方案應該如何設計？
- 如何確保解決方案可執行且有效？
- 如何處理「未解決的連鎖反應」？

---

### 5.4 UI 整合議題

#### 議題 1：如何與網頁設計架構融合？

**當前設計**：
- Stage 1：八卦轉輪/八門卡片
- Stage 2：符號雲/物象群
- Stage 3：萬象羅盤/星盤
- Layer 3：題目問答
- Layer 5：結果呈現

**需要討論**：
- 如何將題目設計與八卦盤、五行、福馬盤等 UI 元素完美融合？
- 不同階段的 UI 應該如何設計？
- 如何確保使用者體驗流暢且直覺？

#### 議題 2：如何結合 UI 互動功能？

**需要討論**：
- 題目要怎麼問才能配合 UI 互動？
- 選項要有幾個才能配合 UI 設計？
- 要怎麼選才能配合 UI 互動功能？

---

## 📚 第六部分：相關資料位置索引

### 6.1 核心引擎運算邏輯資料

#### 分數計算
- **SSOT**：`domain/facets/*.scoring.v1.0.json`
- **實作**：`engine/score_facet.py`
- **範例**：`domain/facets/stress_recovery.scoring.v1.0.json`

#### 題目設計
- **SSOT**：`domain/knowledge_base/question_design_guidelines.v1.0.md`
- **範例**：`domain/questions/stress_recovery.questions.v1.0.json`
- **編譯後**：`domain/compiled/stress_recovery.compiled.v1.0.json`

#### 結果呈現
- **SSOT**：`domain/knowledge_base/result_presentation_design.v1.0.md`
- **範例**：`domain/compiled/stress_recovery.compiled.v1.0.json`（包含 narratives、recommendations、riskchains）

---

### 6.2 UI 架構與工作流程資料

#### UI 架構
- **SSOT**：`specs/ui/architecture/P0-5_UI_ARCHITECTURE.md`
- **整合規格**：`specs/ui/architecture/P0-5_UI_INTEGRATION_SPEC.md`
- **世界觀設計**：`specs/ui/worldview/P0-5.7_WORLDVIEW_DESIGN.md`

#### 分流系統
- **SSOT**：`P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` ⭐
- **整合文件**：`P0-4.5/P0-4.5_INTEGRATION_WITH_P0-5.md` ⭐

#### 實作範例
- **Prototype**：`prototype/app.js`、`prototype/index.html`
- **範例資料**：`domain/compiled/stress_recovery.compiled.v1.0.json`

---

### 6.3 任務報告與整合資料

#### 引擎類別任務報告
- **SSOT**：`archive/tasks_by_category/engine/TASK_REPORTS.md`
- **詳細報告**：`archive/tasks_by_category/engine/tasks/P0-12_SCIENTIFIC_ENGINE_COMPLETION/`
- **詳細報告**：`archive/tasks_by_category/engine/tasks/P0-11_METAPHYSICAL_ENGINE_COMPLETION/`

#### UI 類別任務報告
- **SSOT**：`archive/tasks_by_category/ui/TASK_REPORTS.md`
- **詳細報告**：`archive/tasks_by_category/ui/tasks/P0-5/`
- **詳細報告**：`archive/tasks_by_category/ui/tasks/P0-4.5/`

---

### 6.4 顧問角色與流程資料

#### AI 顧問角色系統
- **SSOT**：`docs/governance/AI_ADVISORY_ROLES.md`
- **角色定義**：`docs/gem/profiles/R1_assessment_designer.md`（題目設計顧問）
- **角色定義**：`docs/gem/profiles/R2_esoteric_narrative_designer.md`（玄學敘事顧問）
- **角色定義**：`docs/gem/profiles/R3_actionability_coach.md`（行動建議顧問）
- **角色定義**：`docs/gem/profiles/R4_risk_chain_architect.md`（風險鏈顧問）

#### 顧問流程
- **GEM Protocol**：`docs/adr/ADR_0004_ai_advisory_roles_and_gem_protocol.md`
- **顧問 Brief 範例**：`docs/task_packets/advisor/briefs/BRIEF_P0-2_ADVISOR_CONTEXT_SUPERPACK_income_expansion_pressure.zh.md`

---

## 🎯 第七部分：顧問群討論重點

### 7.0 詞彙管理與語言規範討論重點（**新增**）

1. **詞彙管理策略**：
   - 如何確保題目設計符合詞彙白名單？
   - 如何建立有效的詞彙檢查機制？
   - 如何在總題庫整理階段整合詞彙管理？

2. **禁用詞與語氣限制**：
   - 如何避免使用命定論語氣（「你是怎樣」、「你就怎樣」等）？
   - 如何避免恐嚇語氣和具體決策指令？
   - 如何確保結果呈現保持能動性？

3. **Facet 專用詞彙管理**：
   - 如何為新 Facet 建立專用禁用詞表？
   - 如何建立 Facet 專用次隱喻白名單？
   - 如何確保 Facet 之間的語境隔離？

4. **題庫分類與詞彙整合**：
   - 如何確保題目分類符合詞彙管理規範？
   - 如何確保計分方式與詞彙使用一致？
   - 如何建立統一的詞彙檢查機制？

---

### 7.1 題目設計討論重點

1. **題目設計策略**：
   - 如何設計題目才能達到「準到發毛」的效果？
   - 題目數量應該多少？
   - 題目類型配比應該如何？

2. **選項設計策略**：
   - 選項要有幾個？
   - 選項文字如何設計？
   - 如何避免「全部選中間」的問題？

3. **UI 整合策略**：
   - 如何與八卦盤、五行、福馬盤等 UI 元素完美融合？
   - 不同階段的題目應該如何呈現？

---

### 7.2 分數計算討論重點

1. **積分策略**：
   - 如何進行積分？
   - 如何處理不同題型的積分？
   - 如何處理多階段分流系統的積分？

2. **權重策略**：
   - 如何進行權重？
   - 哪些題目應該有更高的權重？
   - 權重應該如何決定？

3. **結果計算策略**：
   - 如何獲得後續結果？
   - 分數區間應該如何設定？
   - 是否需要更多 band？

---

### 7.3 結果呈現討論重點

1. **呈現策略**：
   - 如何呈現結果？
   - 如何讓使用者覺得「準到發毛」？
   - 如何避免「套話」和「雞湯」？

2. **解決方案策略**：
   - 如何基於準確的分析結果提出有效的解決方案？
   - 如何處理「未解決的連鎖反應」？

---

### 7.4 UI 整合討論重點

1. **整合策略**：
   - 如何與網頁設計架構（八卦盤、五行、福馬盤等）完美融合？
   - 不同階段的 UI 應該如何設計？

2. **互動策略**：
   - 題目要怎麼問才能配合 UI 互動？
   - 選項要有幾個才能配合 UI 設計？
   - 要怎麼選才能配合 UI 互動功能？

---

## 📋 第八部分：資料庫與運算能力需求

### 8.1 龐大的資料庫需求

**需要討論**：
- 需要什麼樣的資料庫？
- 資料庫應該包含哪些內容？
- 如何建立和維護資料庫？

### 8.2 強大的運算能力需求

**需要討論**：
- 需要什麼樣的運算能力？
- 如何處理大量使用者的計算需求？
- 如何優化計算效能？

---

## ✅ 第九部分：顧問群輸出要求

### 9.1 輸出格式

顧問群應該提供：
1. **題目設計建議**：
   - 題目設計策略
   - 選項設計策略
   - UI 整合策略

2. **分數計算建議**：
   - 積分策略
   - 權重策略
   - 結果計算策略

3. **結果呈現建議**：
   - 呈現策略
   - 解決方案策略

4. **UI 整合建議**：
   - 整合策略
   - 互動策略

### 9.2 輸出要求

- 所有建議必須基於本任務包提供的背景資料
- 所有建議必須考慮「準到發毛」的終極目標
- 所有建議必須考慮 UI 架構和互動功能
- 所有建議必須考慮資料庫和運算能力需求

---

## 📚 第十部分：完整背景資料清單

### 10.1 必須閱讀的檔案（SSOT）

1. **專案核心**：
   - `charter/CHARTER.md` - 專案憲章
   - `roadmap/ROADMAP.md` - 路線圖
   - `memory/briefs/CURRENT.md` - 當前狀態

2. **核心引擎運算邏輯**：
   - `domain/knowledge_base/question_design_guidelines.v1.0.md` - 題目設計指南 ⭐
   - `domain/knowledge_base/result_presentation_design.v1.0.md` - 結果呈現設計 ⭐
   - `domain/facets/stress_recovery.scoring.v1.0.json` - 分數計算範例 ⭐
   - `engine/score_facet.py` - 分數計算實作 ⭐

3. **詞彙管理與語言規範**（**必須讀**）：
   - `domain/knowledge_base/vocabulary_metaphysical.v1.0.json` - 玄學詞彙白名單 ⭐⭐⭐
   - `domain/knowledge_base/forbidden_terms.v1.0.json` - 全域禁用詞表（包含命定論用語）⭐⭐⭐
   - `domain/knowledge_base/presentation_guidelines.v1.0.md` - 呈現用語規範 ⭐⭐
   - `domain/knowledge_base/ai_narrative_spec.v1.0.md` - AI 敘事生成規範 ⭐⭐
   - `docs/domain/advisory/R4/P0-3_NARRATIVE_BLACKLIST_SSOT.json` - Facet 專用禁用詞表範例 ⭐
   - `docs/domain/advisory/R2/P0-3_SECONDARY_METAPHOR_WHITELIST.md` - Facet 專用次隱喻白名單範例 ⭐

3. **UI 架構與工作流程**：
   - `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` - UI 架構設計 ⭐
   - `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` - 4 階段分流系統設計 ⭐
   - `P0-4.5/P0-4.5_INTEGRATION_WITH_P0-5.md` - UI 整合方案 ⭐

4. **實作範例**：
   - `domain/compiled/stress_recovery.compiled.v1.0.json` - 完整編譯範例 ⭐
   - `prototype/app.js` - UI 實作範例 ⭐

---

### 10.2 建議閱讀的檔案（參考）

1. **任務報告**：
   - `archive/tasks_by_category/engine/TASK_REPORTS.md` - 引擎類別任務報告
   - `archive/tasks_by_category/ui/TASK_REPORTS.md` - UI 類別任務報告

2. **顧問角色定義**：
   - `docs/gem/profiles/R1_assessment_designer.md` - 題目設計顧問
   - `docs/gem/profiles/R2_esoteric_narrative_designer.md` - 玄學敘事顧問
   - `docs/gem/profiles/R3_actionability_coach.md` - 行動建議顧問
   - `docs/gem/profiles/R4_risk_chain_architect.md` - 風險鏈顧問

3. **相關 ADR**：
   - `docs/adr/ADR_0002_esoteric_experience_scientific_core.md` - 玄學體驗科學核心
   - `docs/adr/ADR_0004_ai_advisory_roles_and_gem_protocol.md` - AI 顧問角色與 GEM 流程

---

## 🎯 第十一部分：核心問題總結

### 問題 1：題目要怎麼問？

**背景**：
- 當前使用玄學語境（「撐著」、「心神不寧」等）
- 避免心理學名詞
- 使用 5 點量表（likert_5）

**需要顧問群回答**：
- 如何設計題目才能達到「準到發毛」的效果？
- 題目數量應該多少？
- 題目類型配比應該如何？
- 如何確保題目能穩定區分 3~5 種狀態？
- **如何確保題目內容符合詞彙白名單和禁用詞表？**
- **如何避免使用「你是怎樣」、「你就怎樣」等命定論語氣？**

---

### 問題 2：選項要有幾個？要怎麼選？

**背景**：
- 當前使用 5 點量表（完全沒有、很少、有時、常常、幾乎一直）
- 單選（radio button）
- Stage 2 需要多選 2-3 項

**需要顧問群回答**：
- 選項數量是否足夠？（5 個 vs 7 個 vs 其他）
- 選項文字如何設計才能更準確？
- 是否需要支援多選題？
- 如何避免使用者「全部選中間」的問題？

---

### 問題 3：如何進行積分？如何進行權重？

**背景**：
- 當前使用 `weighted_sum` 模型
- 每個題目有權重（weight），目前都是 1.0
- 根據方向（direction）正規化分數

**需要顧問群回答**：
- 權重應該如何設定？
- 如何處理不同題型的積分？
- 如何處理多階段分流系統的積分？
- 哪些題目應該有更高的權重？

---

### 問題 4：如何獲得後續結果？如何呈現？

**背景**：
- 根據分數區間（bands）決定 band（low/mid/high）
- 根據 band 取得對應的 narrative、recommendations、riskchains
- 使用 L1-L4 分層架構呈現

**需要顧問群回答**：
- 分數區間應該如何設定？
- 是否需要更多 band？
- 如何呈現才能讓使用者覺得「準到發毛」？
- 如何確保結果對使用者有實際幫助？

---

### 問題 5：如何與 UI 架構完美融合？

**背景**：
- Stage 1：八卦轉輪/八門卡片（單選）
- Stage 2：符號雲/物象群（多選 2-3 項）
- Stage 3：萬象羅盤/星盤（投射式選擇）
- Layer 3：題目問答（單選）

**需要顧問群回答**：
- 如何將題目設計與八卦盤、五行、福馬盤等 UI 元素完美融合？
- 不同階段的題目應該如何呈現？
- 如何確保使用者體驗流暢且直覺？

---

## 📊 第十二部分：資料位置總覽

### 核心引擎運算邏輯資料位置

| 類別 | 資料位置 | SSOT 狀態 |
|------|----------|-----------|
| **題目設計指南** | `domain/knowledge_base/question_design_guidelines.v1.0.md` | ✅ SSOT |
| **結果呈現設計** | `domain/knowledge_base/result_presentation_design.v1.0.md` | ✅ SSOT |
| **分數計算定義** | `domain/facets/*.scoring.v1.0.json` | ✅ SSOT |
| **分數計算實作** | `engine/score_facet.py` | ✅ SSOT |
| **題目範例** | `domain/questions/*.questions.v1.0.json` | ✅ SSOT |
| **編譯後範例** | `domain/compiled/*.compiled.v1.0.json` | ✅ SSOT |
| **玄學詞彙白名單** | `domain/knowledge_base/vocabulary_metaphysical.v1.0.json` | ✅ SSOT |
| **全域禁用詞表** | `domain/knowledge_base/forbidden_terms.v1.0.json` | ✅ SSOT |
| **呈現用語規範** | `domain/knowledge_base/presentation_guidelines.v1.0.md` | ✅ SSOT |
| **AI 敘事生成規範** | `domain/knowledge_base/ai_narrative_spec.v1.0.md` | ✅ SSOT |
| **Facet 專用禁用詞表** | `docs/domain/advisory/R4/P0-3_NARRATIVE_BLACKLIST_SSOT.json` | ✅ SSOT |
| **Facet 專用次隱喻白名單** | `docs/domain/advisory/R2/P0-3_SECONDARY_METAPHOR_WHITELIST.md` | ✅ SSOT |

---

### UI 架構與工作流程資料位置

| 類別 | 資料位置 | SSOT 狀態 |
|------|----------|-----------|
| **UI 架構設計** | `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` | ✅ SSOT |
| **4 階段分流系統** | `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` | ✅ SSOT |
| **UI 整合方案** | `P0-4.5/P0-4.5_INTEGRATION_WITH_P0-5.md` | ✅ SSOT |
| **世界觀設計** | `specs/ui/worldview/P0-5.7_WORLDVIEW_DESIGN.md` | ✅ SSOT |
| **UI 實作範例** | `prototype/app.js` | 參考 |

---

### 任務報告與整合資料位置

| 類別 | 資料位置 | 說明 |
|------|----------|------|
| **引擎類別任務報告** | `archive/tasks_by_category/engine/TASK_REPORTS.md` | 引擎相關任務整合報告 |
| **UI 類別任務報告** | `archive/tasks_by_category/ui/TASK_REPORTS.md` | UI 相關任務整合報告 |
| **P0-12 詳細報告** | `archive/tasks_by_category/engine/tasks/P0-12_SCIENTIFIC_ENGINE_COMPLETION/` | 科學引擎完成任務詳細報告 |
| **P0-11 詳細報告** | `archive/tasks_by_category/engine/tasks/P0-11_METAPHYSICAL_ENGINE_COMPLETION/` | 玄學引擎完成任務詳細報告 |

---

## ✅ 第十三部分：顧問群使用指南

### 13.1 如何使用本任務包

1. **先閱讀核心 SSOT 檔案**（必須讀）：
   - `charter/CHARTER.md` - 了解專案終極目標
   - `roadmap/ROADMAP.md` - 了解當前進度
   - `domain/knowledge_base/question_design_guidelines.v1.0.md` - 了解題目設計原則
   - `domain/knowledge_base/result_presentation_design.v1.0.md` - 了解結果呈現原則
   - `domain/knowledge_base/vocabulary_metaphysical.v1.0.json` - **了解允許使用的詞彙（白名單）** ⭐⭐⭐
   - `domain/knowledge_base/forbidden_terms.v1.0.json` - **了解禁止使用的詞彙（黑名單，包含命定論用語）** ⭐⭐⭐
   - `domain/knowledge_base/presentation_guidelines.v1.0.md` - **了解呈現用語規範** ⭐⭐
   - `domain/knowledge_base/ai_narrative_spec.v1.0.md` - **了解 AI 敘事生成規範** ⭐⭐
   - `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` - 了解 4 階段分流系統
   - `specs/ui/architecture/P0-5_UI_ARCHITECTURE.md` - 了解 UI 架構

2. **閱讀實作範例**（建議讀）：
   - `domain/compiled/stress_recovery.compiled.v1.0.json` - 完整編譯範例
   - `engine/score_facet.py` - 分數計算實作
   - `prototype/app.js` - UI 實作範例

3. **針對核心問題提供建議**：
   - 題目設計建議
   - 分數計算建議
   - 結果呈現建議
   - UI 整合建議

---

### 13.2 輸出要求

顧問群應該提供：
1. **完整的設計建議**：基於本任務包提供的背景資料
2. **具體的實作方案**：考慮「準到發毛」的終極目標
3. **UI 整合方案**：考慮 UI 架構和互動功能
4. **資料庫和運算能力建議**：考慮實際需求

---

**建立日期**：2026-01-12  
**狀態**：READY_FOR_ADVISOR_CONSULTATION  
**目標**：提供完整背景資料給顧問群，進行總討論
