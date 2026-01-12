# P0-5 技術規格設計結案包 (Technical Specification Closure Pack)

**狀態**：`CLOSED (SPEC READY)` | `ACTIVE` · `EDITABLE` · `IMPLEMENTATION BASELINE (NOT FROZEN)`

**建立日期**：2026-01-10

**版本**：v1.0-Final-Closure

**審核狀態**：✅ **已通過總工程師審核（有條件通過）**

**審核日期**：2026-01-10

**審核意見**：技術規格設計整體品質優秀，特別是 RiskOverride 的 Interceptor 模式修正和絕對紅線的詳細程度。需在實際工程中補充 Stage 3 規格細節和 Stage 1 接口預留機制說明，不影響結案。

**文件定位**：
本文件標誌 P0-5 技術規格設計階段完成，並作為 Cursor / Codex 進入工程實作的**當前基準藍圖（Implementation Baseline）**。
本文件**不是凍結規格**；任何重大架構、資料流或紅線調整，需以 **ADR（Architecture Decision Record）** 記錄其動機、影響與回滾方案。

---

## 0. 結案範圍與邊界（Scope & Boundaries）

### ✅ In-Scope（本結案涵蓋）

本結案包定義以下 8 個核心交付物（D1–D8）的**可實作結構**、**可驗收標準（DoD）**與**明確紅線**：

1. **D1 Schema**：UMIP UI Schema v1（含 Theme / Risk / i18n）。
2. **D2 Directory**：生產級前端目錄架構（含 Adapter Pattern）。
3. **D3 Compass**：Stage 2 萬象羅盤（Radial Compass）SVG 互動規格。
4. **D4 i18n**：無刷新（No-reload）雙語切換引擎。
5. **D5 Theme**：Theme Engine 與 Neutral Skin 降級機制。
6. **D6 Risk**：高風險強制覆寫（RiskOverride Middleware）。
7. **D7 Layers**：L1–L4 結果分層揭示邏輯。
8. **D8 Acceptance**：6 項 MVP Gate 驗收模板。

### ⛔ Out-of-Scope（本階段不處理）

為避免需求蔓延（Scope Creep），本階段明確排除：

* ❌ **新增功能**：不新增 UMIP 以外的流程、題型或互動。
* ❌ **定稿視覺**：不定稿最終視覺風格，僅需產出機制，不需高品質美術產出。
* ❌ **極致優化**：排除非關鍵動畫的效能或視覺極致優化。

### ⚠️ 待完善項目（不影響結案，需在實作中補充）

1. **Stage 3 投射定歸因規格細節**：需在 SPEC-4 或 SPEC-5 中補充 Stage 3 的具體 UI 組件規格與互動邏輯。
2. **Stage 1 接口預留機制**：需明確 Stage 1 的擴展點與接口設計，確保未來可擴展。

---

## 1. 核心技術決策（Default Decisions）

*以下為**預設執行路徑**，目的是降低 Cursor / Codex 啟動與判斷成本。所有決策可被 ADR 替換，但必須說明影響面與回滾策略。*

### 1.1 前端框架 (Default): React + Vite

* **理由**：
* **Pure Renderer 契合度高**：`UI = f(State)` 模式完全符合「UI 不承載 Domain Logic」原則。
* **SVG Component 生態成熟**：適合 Stage 2 羅盤（大量 SVG 元件化與互動）。
* **MVP 啟動成本低**：可快速驗收。

* **備選**：Vue 3 (Composition API)。允許替換，但不得破壞 Adapter / Risk / Result Layer 之介面與責任邊界。

### 1.2 狀態管理 (Constraint): Zustand 或等效方案

* **Global State 僅限**：`locale` (語言)、`themeResolved` (主題)、`riskResolved` (風險狀態)。
* **嚴禁**：將使用者選象、流程暫存資料（Flow State）或任何推導中間值、評分、權重長期存入 Global Store。

### 1.3 架構模式 (Mandatory): Adapter Pattern

* **流程**：`Compiled Facet JSON` → **Data Adapter** → `ViewModel` (Clean Props) → **Pure View Components**
* **紅線**：
* UI Component 層 **禁止** 直接讀取或依賴原始 JSON 結構。
* 所有資料結構差異必須在 Adapter 層解決。

### 1.4 工程執行順序（Recommended）

*以下執行順序建議，可根據實際情況調整，需記錄變更原因：*

1. **Foundation**：建立 `ui/` 骨架 + UMIP Schema v1（D1, D2）
2. **Core Engine**：FacetLoader (Adapter) + ThemeEngine（含 Fail-soft）+ i18nManager（D4, D5）
3. **Stage 2**：RadialCompass 元件開發（先 mobile 可用，再 desktop 完整）（D3）
4. **Stage 3**：投射定歸因卡片元件（需補充規格細節）
5. **Stage 4**：L1–L4 分層呈現 + RiskOverride Middleware（D6, D7）
6. **Integration**：i18n 全流程整合 + Gate 逐條驗收（D8）

---

## 2. 必須產出的 7 份規格文件（SPEC）

*Cursor 在進入 Coding 之前，必須確認以下文件存在或已被完整理解：*

| ID | 建議路徑/檔名 | 內容摘要 | 狀態 |
| --- | --- | --- | --- |
| **SPEC-1** | `P0-5/P0-5_TECHNICAL_ARCHITECTURE.md` | 整體架構圖、Adapter 詳解、資料流。 | ⏳ 待產出 |
| **SPEC-2** | `P0-5/P0-5_DATA_STRUCTURE_SPEC.md` | **(D1)** Schema 定義、i18n 結構。 | ⏳ 待產出 |
| **SPEC-3** | `P0-5/P0-5_IMPLEMENTATION_GUIDE.md` | **(D2, D4, D5)** 目錄、i18n、Theme 實作指南。 | ⏳ 待產出 |
| **SPEC-4** | `P0-5/P0-5_COMPONENT_SPEC_COMPASS.md` | **(D3)** Stage 2 羅盤 SVG 互動規格。 | ⏳ 待產出 |
| **SPEC-5** | `P0-5/P0-5_LOGIC_SPEC_RISK_RESULT.md` | **(D6, D7)** Risk 邏輯、L1-L4 揭示順序、**Stage 3 投射定歸因規格（需補充）**。 | ⏳ 待產出 |
| **SPEC-6** | `P0-5/P0-5_TECHNICAL_RISKS.md` | 技術風險與對策。 | ⏳ 待產出 |
| **SPEC-7** | `P0-5/P0-5_TESTING_STRATEGY.md` | **(D8)** 測試策略與 Gate 驗收案例。 | ⏳ 待產出 |

**說明**：以上 7 份規格文件需由 GPT/Gemini 在技術規格設計階段產出，或由 Cursor 在工程實作前補充完成。

---

## 3. 詳細驗收標準 (Definition of Done)

### D1: UMIP UI Schema

* [ ] 提供完整 JSON Schema（含 `theme_config`, `risk_level`, `i18n`）。
* [ ] 提供 2 組驗證通過範例（Normal / High Risk）。
* [ ] 所有欄位定義 Fail-soft Fallback 行為。

### D2: 生產級 UI 目錄

* [ ] 分層清楚：`adapters/`, `components/`, `engine/`, `assets/`。
* [ ] 專案可編譯、可執行。
* [ ] `prototype/` 僅作參考，不可被 production code 引用。

### D3: Stage 2 萬象羅盤

* [ ] **SVG 為核心**（非 Canvas）。
* [ ] 20–30 符碼流暢渲染，支援選取與吸附。
* [ ] 手機端單手可用（旋盤或滑動）。
* [ ] **紅線檢查**：無任何問卷化控件。

### D4: i18n 引擎

* [ ] 語言切換無 Reload。
* [ ] 所有文字來自 JSON，無硬編碼。

### D5: Theme Engine

* [ ] 修改 JSON 即可即時換膚。
* [ ] Config 缺失或錯誤時，自動回退 Neutral Skin 且不報錯。

### D6: RiskOverride (Middleware/Interceptor)

* [ ] **攔截邏輯**：Adapter 解析資料 → **Risk Interceptor (檢查 HIGH)** → 寫入 Store/ViewModel。
* [ ] **覆蓋行為**：若 `risk_level = HIGH`，強制丟棄原 L4 建議，寫入靜態安全模板（Template A/B）。
* [ ] **防止閃爍**：確保動態 L4 內容在 HIGH 狀態下**從未進入** UI State。

**技術實現要點**：
* RiskOverride 必須在 Adapter 層之後、Store 更新之前執行（Interceptor 模式）。
* 不得讓原始 L4 內容先進入 Store，再進行覆蓋（避免 FOUC - Flash of Unsafe Content）。
* 實現方式：在 Adapter 產出 ViewModel 後，立即檢查 `risk_level`，若為 HIGH，直接替換 L4 欄位為安全模板。

### D7: Result Layers

* [ ] 揭示順序鎖定：L1 → L2 → L3 → L4。
* [ ] L3 需使用者主動揭示。
* [ ] **DOM 檢查**：任何階段 DOM 中皆不得出現內部計算數值。

### D8: 驗收報告模板

* [ ] 包含 6 MVP Gate 檢查表。
* [ ] 每 Gate 必須附可重跑證據欄位（截圖 / 錄影 / 匯出）。

---

## 4. 絕對紅線與工程約束（Critical Constraints）

**違反以下任一條，視為 Critical Bug，不予驗收。**

### 4.1 互動紅線

* ❌ **禁止**：問卷、量表、滑桿、1–10 評分、進度條。
* ✅ **必須**：凝視、直覺選擇、儀式感互動。

### 4.2 數據遮罩紅線

* ❌ **禁止**：前端記憶體、DOM、Network Payload、Console Log、Error Reporting 中出現 `raw_score`, `severity`, `weight` 等計算值。
* ✅ **僅允許**：封裝後的 `narrative_text`、`visual_id`。

**詳細說明**：
* **前端記憶體**：Store/State 中不得保存內部計算值。
* **DOM**：HTML 元素與 React Virtual DOM 中不得出現內部計算值。
* **Network Payload**：任何網路請求（如 API 呼叫、錯誤上報）的 Payload 中不得包含內部計算值。
* **Console Log**：開發與生產環境的 Console 輸出中不得洩漏內部計算值（生產環境應移除所有 Console Log）。
* **Error Reporting**：錯誤追蹤系統（如 Sentry）的錯誤報告中不得包含內部計算值。

### 4.3 安全紅線

* ❌ **禁止**：`risk_level = HIGH` 時顯示動態生成的 L4。
* ✅ **必須**：強制顯示經過審核的靜態安全模板（Template A/B）。

---

## 5. 6 項 MVP Gate（含可重跑證據要求）

實作完成後，請依此清單進行驗收：

### Gate #1：資料串接

* [ ] UI 可載入任一符合 Schema 的 `compiled_facet.json`
* [ ] 非關鍵缺值時 fallback 生效且 UI 不崩潰
* [ ] 前端 Store/記憶體不保存內部計算值

**驗收證據**：
* DOM Snapshot（確保無內部計算值）
* Store 序列化檢查（確保無內部計算值）
* Network Payload 匯出（確保無敏感數據）

### Gate #2：CN/EN 即時切換

* [ ] 切換語言不 reload
* [ ] 靜態 UI 與動態敘事文字皆即時更新
* [ ] 英文內容為原生語感（非逐字翻譯腔）

**驗收證據**：
* 無 Reload 錄影（切換語言前後對照）
* 文字同步切換確認（所有文字即時更新）

### Gate #3：Stage 2 羅盤

* [ ] 放射狀/同心圓結構（非 Grid/List/Form）
* [ ] 可完成 2–3 個符碼選取（點亮 + 吸附中央）
* [ ] 手機端可單手操作（旋盤/撥動模式或等效方案）
* [ ] 紅線：無問卷化控制元件

**驗收證據**：
* SVG 結構截圖（證明非 Grid/List）
* 手機單手操作錄影（證明可用性）

### Gate #4：L1–L4 呈現

* [ ] L1→L2→L3→L4 揭示順序鎖定
* [ ] L3 必須使用者主動互動才揭示（點擊/長按/展開）
* [ ] UI/原始碼/畫面中無內部計算欄位外洩

**驗收證據**：
* 揭示順序錄影（證明順序正確）
* DOM 檢查（確保無內部計算值）

### Gate #5：高風險覆蓋

* [ ] 可人工觸發 `risk_level = HIGH`（資料或測試開關）
* [ ] 觸發後 L4 強制顯示安全模板（Template A/B，含 CN/EN）
* [ ] 動態 L4 完全不渲染/不顯示

**驗收證據**：
* HIGH 狀態下僅顯示安全模板（截圖證明）
* 確保動態 L4 從未進入 DOM（DOM 檢查）

### Gate #6：視覺解耦

* [ ] 不改程式碼，僅改 JSON `theme_config` 即可切換至少一項視覺元素（背景/字體/配色）
* [ ] `theme_config` 缺失或資產錯誤 → 自動回退 Neutral Ritual Skin
* [ ] 視覺變化不影響敘事結構與文字內容

**驗收證據**：
* 修改 JSON → UI 換膚（對照圖）
* 錯誤 → Neutral Skin（對照圖）

---

## 6. Stage 3 投射定歸因規格補充（待完善項）

**說明**：本結案包中 Stage 3 的規格較為簡略，需在實際工程中補充詳細規格。

### 基本規格（來自 UMIP 結案報告）

* **UI**：投射卡片，一題一頁
* **互動**：直覺選擇（象/狀態），不得出現數值評分
* **對應**：任務包「Stage 3：萬象定歸因（具體題目回答）」

### 待補充的技術規格（需在 SPEC-5 中詳細說明）

1. **投射卡片元件設計**：
   * 卡片結構（標題、選項、確認按鈕等）
   * 題目資料結構（如何從 `compiled_facet.json` 讀取題目）
   * 選項呈現方式（圖像、文字、狀態描述等）

2. **互動邏輯**：
   * 單選 vs 多選（根據題目類型）
   * 選項點擊/選擇邏輯
   * 答案收集與暫存
   * 轉場動畫（卡片切換、選項確認等）

3. **流程控制**：
   * 題目順序（是否允許跳題）
   * 完成判斷（何時進入 Stage 4）
   * 答案提交時機（完成所有題目後提交，或逐題提交）

4. **RWD 適配**：
   * 桌面端卡片呈現
   * 手機端卡片呈現（是否需要全屏）
   * 平板端適配

5. **絕對紅線檢查**：
   * 無數值評分（不得出現 1-10、0%-100% 等）
   * 無問卷化控件（不得出現 checkbox、radio button 等傳統表單元素）
   * 確保「直覺選擇（象/狀態）」的互動方式

**建議**：Stage 3 規格應在 SPEC-5 (`P0-5_LOGIC_SPEC_RISK_RESULT.md`) 中詳細說明，或在單獨的 `P0-5_COMPONENT_SPEC_STAGE3.md` 中說明。

---

## 7. Stage 1 接口預留機制說明（待完善項）

**說明**：Stage 1 允許延後，但需預留接口，確保未來可擴展。

### 基本規格（來自 UMIP 結案報告）

* **P0-5 策略**：若資源允許則實作；否則可由 Stage 2 直接啟動（仍需預留接口）
* **UI**：八卦轉輪或星圖（占位即可）
* **彈性空間**：若時間不足，可簡化為「直接進入 Stage 2」的入口

### 待補充的接口設計（需在 SPEC-1 或 SPEC-4 中說明）

1. **路由接口**：
   * 定義 Stage 1 → Stage 2 的路由轉換點
   * 定義「直接進入 Stage 2」的入口邏輯
   * 確保未來 Stage 1 實作時，路由邏輯可無縫銜接

2. **資料接口**：
   * 定義 Stage 1 可能的輸出資料結構（如 `domain_id` 等）
   * 定義 Stage 2 的輸入資料結構（是否依賴 Stage 1 的輸出）
   * 確保 Stage 1 缺失時，Stage 2 仍可正常運行

3. **組件接口**：
   * 定義 Stage 1 組件的 Props 接口
   * 定義 Stage 1 組件的回調接口（完成後的處理）
   * 確保未來實作時，組件可無縫整合

**建議**：Stage 1 接口預留機制應在 SPEC-1 (`P0-5_TECHNICAL_ARCHITECTURE.md`) 的「架構擴展性」章節中詳細說明。

---

## 8. 結案宣告

**P0-5 技術規格設計階段正式結案。**

本文件作為工程實作的**當前基準藍圖**，已明確定義資料流、UI 邊界、風險覆蓋與驗收 Gate。後續調整需以 ADR 記錄，不影響本結案之有效性與可審計性。

**待完善項目說明**：
* Stage 3 規格細節需在實際工程中補充（建議在 SPEC-5 或單獨文件中說明）
* Stage 1 接口預留機制需在實際工程中明確（建議在 SPEC-1 中說明）
* 以上待完善項目不影響結案，但需在工程實作前或實作過程中完成

**審核通過日期**：2026-01-10

**審核者**：總工程師（Cursor）

**審核結論**：✅ **有條件通過** - 技術規格設計整體品質優秀，特別是 RiskOverride 的 Interceptor 模式修正和絕對紅線的詳細程度。需在實際工程中補充 Stage 3 規格細節和 Stage 1 接口預留機制說明，不影響結案。

---

**End of Closure Pack**

