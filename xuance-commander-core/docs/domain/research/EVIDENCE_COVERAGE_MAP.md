# Evidence Coverage Map (Failure Distillation - Stage 1b)

本文件記錄 Stage 1 三份報告（FAILURE_PATTERNS.md, SALVAGEABLE_ELEMENTS.md, RECURRING_ANTI_PATTERNS.md）的證據來源覆蓋範圍。

**生成時間**：2026-01-07  
**掃描模式**：只讀盤點（Read-only inventory）  
**定位**：證據地圖，非分析報告

---

## Section A: Repo Internal Sources（內部來源）

### A.1 Legacy Codebase（歷史代碼庫）

#### 掃描路徑
- `./legacy/`（若存在）
- `./**/legacy/**/115_1_3_my-first-app_failed/**`（若存在）

#### 實際掃描結果
- ✅ **已找到**：`xuance-commander-core/docs/legacy/115_1_3_my-first-app_failed/`
- **目錄結構**：
  - `_meta/`：元數據（INDEX.md, PROVENANCE.md, SHA256SUMS.txt）
  - `extract/`：萃取報告（FAILURE_PATTERNS.md, INVENTORY.md, CAPABILITY_MAP.md, ROUTER.md, UI_FLOW_REFERENCES.md, REUSABLE_ASSETS.md）
  - `import/my-first-app/`：原始代碼庫（454 個文件，包含 125 個 .md, 91 個 .js, 65 個 .txt）

#### 相關文件清單（已掃描）
**Extract 目錄（萃取報告）**：
- `extract/FAILURE_PATTERNS.md`（已存在，與 Stage 1 報告不同，為 legacy 專屬失敗模式）
- `extract/INVENTORY.md`（文件清單）
- `extract/CAPABILITY_MAP.md`（能力映射）
- `extract/ROUTER.md`（路由結構）
- `extract/UI_FLOW_REFERENCES.md`（UI 流程參考）
- `extract/REUSABLE_ASSETS.md`（可重用資產）

**Import 目錄（原始代碼）**：
- `import/my-first-app/src/core/types/destiny.ts`（Destiny 類型定義）
- `import/my-first-app/src/core/psych/scorer.js`（評分引擎）
- `import/my-first-app/src/core/ontology/resultLexicon.v1.json`（結果詞彙表）
- `import/my-first-app/src/core/ontology/behaviorFacetLexicon.v1.json`（行為 Facet 詞彙表）
- `import/my-first-app/packages/data/src/raw/legacy_questionBank.v1.json`（歷史題庫）
- `import/my-first-app/archive/legacy_question_bank/2025-12-31/src/_deprecated/core/ContentDB*.js`（多個領域的內容資料庫：career, money, family, relationship, health, self, study, social）
- `import/my-first-app/reports/question_bank_concept_package.md`（題庫概念包）
- `import/my-first-app/reports/mother_theme_questionization_v2.md`（母題問題化）
- `import/my-first-app/reports/p1_question_blueprint_v1.json`（題目藍圖）

**Canonical 文檔**：
- `import/my-first-app/artifacts/imports/115.1.2/DESTINY_CODE_CANONICAL_WORKSPACE_v1__COLON/legacy_sources/DESTINY_CODE/docs/00_canonical/00_CONSTITUTION.md`
- `import/my-first-app/artifacts/imports/115.1.2/DESTINY_CODE_CANONICAL_WORKSPACE_v1__COLON/legacy_sources/DESTINY_CODE/docs/00_canonical/01_PROJECT_MASTER.md`
- `import/my-first-app/artifacts/imports/115.1.2/DESTINY_CODE_CANONICAL_WORKSPACE_v1__COLON/legacy_sources/DESTINY_CODE/docs/00_canonical/02_QUESTION_SYSTEM.md`
- `import/my-first-app/artifacts/imports/115.1.2/DESTINY_CODE_CANONICAL_WORKSPACE_v1__COLON/legacy_sources/DESTINY_CODE/docs/00_canonical/03_THEORY_FOUNDATION.md`
- `import/my-first-app/artifacts/imports/115.1.2/DESTINY_CODE_CANONICAL_WORKSPACE_v1__COLON/legacy_sources/DESTINY_CODE/docs/00_canonical/04_GOVERNANCE_EVIDENCE.md`

**Archive 文檔**：
- `import/my-first-app/artifacts/imports/115.1.2/DESTINY_CODE_CANONICAL_WORKSPACE_v1__COLON/legacy_sources/DESTINY_CODE/docs/99_archive_origin/`（多個歷史版本文檔，包含編碼問題但內容相關）

### A.2 Domain Research Directory（領域研究目錄）

#### 掃描路徑
- `xuance-commander-core/docs/domain/research/`

#### 實際掃描結果
- ✅ `FAILURE_PATTERNS.md`（已存在，3,258 字節）
- ✅ `SALVAGEABLE_ELEMENTS.md`（已存在，2,943 字節）
- ✅ `RECURRING_ANTI_PATTERNS.md`（已存在，3,188 字節）
- ✅ `FACET_META_MAP.md`（已存在，位於 `docs/domain/`）
- ✅ `FACET_META_RESEARCH_TASK.md`（已存在，位於 `docs/domain/`）
- ✅ `FACET_DESIGN_PRINCIPLES.md`（已存在，位於 `docs/domain/`）

### A.3 Keyword-Based Search（關鍵字掃描）

#### 掃描關鍵字
- `facet` / `Facet` / `FACET`
- `question` / `Question` / `QUESTION`
- `result` / `Result` / `RESULT`
- `destiny` / `命理` / `五行` / `八卦` / `score` / `判定`

#### 實際掃描結果
- **範圍**：全 repo（排除 `node_modules/`, `.git/`）
- **方法**：使用 `grep` 與 `codebase_search` 工具
- **狀態**：已發現大量相關文件（主要集中在 legacy 與 domain 目錄）

#### 發現的文件（關鍵清單）

**Domain 實作文件**：
- `xuance-commander-core/domain/manifests/stress_recovery.v1.0.json`（Facet manifest）
- `xuance-commander-core/domain/questions/stress_recovery.questions.v1.0.json`（題目定義）
- `xuance-commander-core/domain/facets/stress_recovery.scoring.v1.0.json`（評分規則）
- `xuance-commander-core/domain/narratives/stress_recovery.narr.v1.0.json`（敘事模板）
- `xuance-commander-core/domain/riskchains/`（風險鏈定義）
- `xuance-commander-core/domain/recommendations/`（建議定義）

**Engine 實作**：
- `xuance-commander-core/engine/score_facet.py`（Facet 評分引擎）
- `xuance-commander-core/engine/compile_domain.py`（領域編譯器）

**Schema 定義**：
- `xuance-commander-core/schemas/compiled_facet.schema.json`（編譯後 Facet Schema）
- `xuance-commander-core/schemas/domain_manifest.schema.json`（領域 Manifest Schema）

**Gem 相關（顧問證據）**：
- `xuance-commander-core/docs/gem/runs/RUN_P0-2_income_expansion_pressure_R1_20260106.md`
- `xuance-commander-core/docs/gem/runs/RUN_P0-2_income_expansion_pressure_R4_20260106.md`
- `xuance-commander-core/docs/gem/runs/DECISION_P0-2_income_expansion_pressure_20260106.md`
- `xuance-commander-core/docs/gem/briefs/BRIEF_P0-2_income_expansion_pressure_R1_question_blueprint.zh.md`

---

## Section B: External / Conceptual Sources（外部／概念來源）

### B.1 傳統命理系統（Traditional Metaphysical Systems）

#### 已引用（在 Stage 1 報告中提及）
- **八字命理**（四柱八字）
  - 神煞派（Shen-Sha School）
  - 十神系統（10-Gods System）
  - 大運流年（Major/Minor Cycles）
- **紫微斗數**（Ziwei Doushu）
  - 命盤結構（Chart Structure）
  - 時辰邊界問題（Time Boundary Issue）
  - 全書雜曜（Miscellaneous Stars）
- **易經**（I-Ching）
  - 六十四卦（64 Hexagrams）
  - 陰陽消長（Yin-Yang Oscillation）
- **姓名學**（Name Numerology）
  - 三才五格（Three-Talent Five-Grid）
  - 筆畫數理（Stroke Count Logic）
- **鐵板神數**（Tieban Shenshu）
  - 精確度要求（Precision Requirement）

#### 未明確引用但相關
- **奇門遁甲**（Qimen Dunjia）
- **六爻**（Six Lines Divination）
- **梅花易數**（Plum Blossom Numerology）
- **太乙神數**（Taiyi Shenshu）

### B.2 現代心理學／測評系統（Modern Psychology / Assessment Systems）

#### 已引用（作為對照）
- **人格量表**（Personality Inventories）
  - 提及但未深入分析

#### 未明確引用但相關
- **MBTI**（Myers-Briggs Type Indicator）
- **Big Five**（五大人格特質）
- **心理階段模型**（Psychological Stage Models）
  - 如：Erikson's Stages, Maslow's Hierarchy

### B.3 歷史失敗案例（Historical Failure Cases）

#### 已引用（在 FAILURE_PATTERNS.md）
- 《三命通會》（古籍斷語案例）
- 《滴天髓》（階級標籤案例）
- 傳統女命論斷（性別偏見案例）

#### 未明確引用但相關
- 現代命理 App 失敗案例（若存在公開資料）
- 心理測驗產品失敗案例（若存在內部資料）

---

## Section C: Explicit Gaps（明確未涵蓋項）

### C.1 內部代碼庫缺口

#### Legacy Codebase
- **狀態**：✅ 已找到並掃描 `xuance-commander-core/docs/legacy/115_1_3_my-first-app_failed/`
- **發現**：Legacy 目錄包含完整的失敗項目代碼庫（454 個文件）
- **影響**：Stage 1 報告的結論可與 legacy/extract/FAILURE_PATTERNS.md 對照驗證
- **備註**：Legacy 的 FAILURE_PATTERNS.md 與 Stage 1 的 FAILURE_PATTERNS.md 為不同層級（legacy 為專案失敗，Stage 1 為傳統系統失敗）

#### 現有代碼中的 Facet 實作
- **狀態**：✅ 已發現完整的 Facet 實作結構
- **發現**：
  1. `domain/` 目錄包含完整的 Facet 定義（manifest, questions, scoring, narratives, riskchains, recommendations）
  2. `engine/` 目錄包含評分與編譯引擎
  3. `schemas/` 目錄包含 Schema 定義
  4. 目前有一個實作範例：`stress_recovery` Facet（v1.0）
- **結論**：實作已開始，但僅有一個 Facet 範例，符合 P0-2 MVP 階段

### C.2 外部來源缺口

#### 現代命理 App 市場分析
- **狀態**：未引用具體的現代 App 失敗案例
- **原因**：Stage 1 報告主要基於傳統系統的結構性問題，而非現代產品市場數據
- **影響**：可能遺漏「現代化轉型中的新失敗模式」

#### 學術研究文獻
- **狀態**：未引用心理學或認知科學的相關研究
- **原因**：Stage 1 定位為「傳統系統失敗模式萃取」，非學術文獻回顧
- **影響**：可能遺漏「認知偏誤」或「測量理論」層面的失敗模式

#### 用戶反饋數據
- **狀態**：未引用實際用戶投訴或流失數據
- **原因**：若存在，應位於產品數據庫或客服系統，非代碼庫範圍
- **影響**：無法驗證「理論失敗模式」與「實際用戶體驗」的對應關係

---

## Coverage Summary（覆蓋摘要）

### 已覆蓋
- ✅ 傳統命理系統的結構性問題（八字、紫微、易經、姓名學）
- ✅ 符號與象徵系統的可回收元素（五行、十神、陰陽）
- ✅ 常見設計反模式（二元吉凶、道德綁定、恐嚇行銷）

### 未覆蓋（需後續補強）
- ⚠️ 內部 legacy 代碼庫（若存在）
- ⚠️ 現代 App 市場失敗案例
- ⚠️ 學術研究文獻
- ⚠️ 用戶反饋數據

### 覆蓋完整性評估
- **結構性失敗模式**：高覆蓋（基於傳統系統的長期觀察）
- **可回收元素**：中高覆蓋（基於符號學與原型理論）
- **反模式**：高覆蓋（基於常見設計陷阱）
- **實證數據**：低覆蓋（缺乏內部數據與市場數據）

---

## Notes（備註）

1. 本報告為「證據地圖」，不包含新結論或設計建議。
2. 若後續發現 `legacy/115_1_3_my-first-app_failed/` 目錄，需更新 Section A.1。
3. 若需要補充現代 App 失敗案例，建議進行外部市場調研（非代碼庫掃描範圍）。
4. 學術文獻回顧建議作為 Stage 2 任務（若需要）。

