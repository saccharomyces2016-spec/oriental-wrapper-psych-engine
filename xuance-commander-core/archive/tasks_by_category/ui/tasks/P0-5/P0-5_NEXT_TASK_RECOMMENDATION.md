# P0-5 下一個任務建議

**建立日期**：2026-01-10  
**版本**：v1.0  
**狀態**：ACTIVE | EDITABLE | REFERENCE（非硬性、可隨時修正）

---

## 📋 當前狀態總結

**P0-5 技術規格設計階段已完成**，技術規格結案包已通過總工程師審核（有條件通過），可作為工程實作的基準藍圖。

**已完成**：
- ✅ UMIP v1.0 結案報告已定案
- ✅ 工程執行報告已確立（8 個交付物 + 6 項 MVP Gate）
- ✅ 技術規格設計結案包已通過審核（有條件通過）
- ✅ 7 份規格文件的產出要求已明確

**待完善**（不影響結案）：
- ⚠️ Stage 3 投射定歸因規格細節需在實際工程中補充
- ⚠️ Stage 1 接口預留機制需在實際工程中明確

**7 份規格文件狀態**：
- ⏳ SPEC-1 至 SPEC-7 均為「待產出」狀態
- 說明：以上規格文件需由 GPT/Gemini 在技術規格設計階段產出，或由 Cursor 在工程實作前補充完成

---

## 🎯 下一個任務建議

### 選項 A：P0-5 工程實作階段（推薦）

**任務定位**：開始執行 P0-5 的工程實作，產出 8 個核心交付物。

**任務內容**：

#### 階段 1：基礎建設（Foundation）

1. **建立專案環境**
   - 建立 React + Vite 專案
   - 安裝 Zustand（或等效狀態管理方案）
   - 建立 `ui/` 目錄結構（`adapters/`, `components/`, `engine/`, `assets/`）

2. **產出 D1: UMIP UI Schema v1**
   - 定義完整的 JSON Schema（含 `theme_config`, `risk_level`, `i18n`）
   - 提供 2 組驗證通過範例（Normal / High Risk）
   - 所有欄位定義 Fail-soft Fallback 行為
   - **文件位置**：`schemas/umip_schema_v1.json`

3. **產出 D2: 生產級 UI 目錄**
   - 建立 `ui/` 目錄結構
   - 確保專案可編譯、可執行
   - 確保 `prototype/` 僅作參考，不可被 production code 引用

#### 階段 2：核心引擎（Core Engine）

4. **產出 D4: i18n 引擎**
   - 實現語言切換無 Reload
   - 確保所有文字來自 JSON，無硬編碼
   - **組件位置**：`ui/engine/i18nManager.ts`

5. **產出 D5: Theme Engine**
   - 實現修改 JSON 即可即時換膚
   - 實現 Config 缺失或錯誤時，自動回退 Neutral Skin 且不報錯
   - **組件位置**：`ui/engine/themeEngine.ts`

6. **實作 Adapter Pattern**
   - 實現 `Compiled Facet JSON` → `Data Adapter` → `ViewModel` → `Pure View Components` 流程
   - 確保 UI Component 層禁止直接讀取原始 JSON 結構
   - **組件位置**：`ui/adapters/facetAdapter.ts`

#### 階段 3：Stage 2 羅盤（Stage 2 Compass）

7. **產出 D3: Stage 2 萬象羅盤**
   - SVG 為核心（非 Canvas）
   - 20–30 符碼流暢渲染，支援選取與吸附
   - 手機端單手可用（旋盤或滑動）
   - 紅線檢查：無任何問卷化控件
   - **組件位置**：`ui/components/RadialCompass.tsx`

#### 階段 4：Stage 3 投射定歸因（Stage 3 Projective Assessment）

8. **Stage 3 投射定歸因元件實作**（需補充規格細節）
   - 投射卡片，一題一頁
   - 直覺選擇（象/狀態），不得出現數值評分
   - 互動邏輯（單選/多選、選項選擇、答案收集）
   - 流程控制（題目順序、完成判斷、答案提交時機）
   - RWD 適配
   - **組件位置**：`ui/components/ProjectiveCard.tsx`

**說明**：Stage 3 規格細節需在實作前補充，建議在 SPEC-5 或單獨文件中說明。

#### 階段 5：Stage 4 結果呈現（Stage 4 Results）

9. **產出 D6: RiskOverride Middleware/Interceptor**
   - 實現攔截邏輯：Adapter 解析資料 → Risk Interceptor (檢查 HIGH) → 寫入 Store/ViewModel
   - 實現覆蓋行為：若 `risk_level = HIGH`，強制丟棄原 L4 建議，寫入靜態安全模板（Template A/B）
   - 防止閃爍：確保動態 L4 內容在 HIGH 狀態下從未進入 UI State
   - **組件位置**：`ui/engine/riskOverride.ts`

10. **產出 D7: Result Layers（L1-L4 分層呈現）**
    - 揭示順序鎖定：L1 → L2 → L3 → L4
    - L3 需使用者主動揭示
    - DOM 檢查：任何階段 DOM 中皆不得出現內部計算數值
    - **組件位置**：`ui/components/ResultLayers.tsx`

#### 階段 6：整合與驗收（Integration & Acceptance）

11. **i18n 全流程整合**
    - 確保所有組件支援 i18n
    - 確保動態文本（來自 `compiled_facet.json`）可即時切換

12. **產出 D8: 驗收報告模板**
    - 包含 6 MVP Gate 檢查表
    - 每 Gate 必須附可重跑證據欄位（截圖 / 錄影 / 匯出）
    - **文件位置**：`P0-5/P0-5_IMPLEMENTATION_ACCEPTANCE_REPORT.md`

13. **6 項 MVP Gate 逐條驗收**
    - Gate #1：資料串接
    - Gate #2：CN/EN 即時切換
    - Gate #3：Stage 2 羅盤
    - Gate #4：L1–L4 呈現
    - Gate #5：高風險覆蓋
    - Gate #6：視覺解耦

**任務依據**：
- 技術規格結案包：`P0-5/P0-5_TECHNICAL_SPEC_CLOSURE_PACK.md` v1.0
- UMIP 結案報告：`P0-5/P0-5_UMIP_CLOSURE_REPORT.md` v1.0
- 工程執行報告：`P0-5/P0-5_IMPLEMENTATION_EXECUTION_REPORT.md` v3.0

**優先級**：🔥 **最高** - 這是 P0-5 階段的自然延續，技術規格已就緒，可立即開始實作。

---

### 選項 B：補充 7 份規格文件

**任務定位**：在工程實作前，先產出完整的 7 份規格文件，作為更詳細的技術實作指南。

**任務內容**：

1. **SPEC-1: 技術架構設計文件**
   - 文件位置：`P0-5/P0-5_TECHNICAL_ARCHITECTURE.md`
   - 內容：整體架構圖、Adapter 詳解、資料流、Stage 1 接口預留機制說明

2. **SPEC-2: 資料結構規格**
   - 文件位置：`P0-5/P0-5_DATA_STRUCTURE_SPEC.md`
   - 內容：UMIP Schema v1 完整定義、i18n 資料結構、`theme_config` 結構

3. **SPEC-3: 實作指南**
   - 文件位置：`P0-5/P0-5_IMPLEMENTATION_GUIDE.md`
   - 內容：目錄結構、i18n 實作指南、Theme Engine 實作指南

4. **SPEC-4: Stage 2 羅盤組件規格**
   - 文件位置：`P0-5/P0-5_COMPONENT_SPEC_COMPASS.md`
   - 內容：Stage 2 羅盤 SVG 互動規格、RWD 適配方案、動畫策略

5. **SPEC-5: Risk 邏輯與結果呈現規格**
   - 文件位置：`P0-5/P0-5_LOGIC_SPEC_RISK_RESULT.md`
   - 內容：RiskOverride 邏輯、L1-L4 揭示順序、**Stage 3 投射定歸因規格（需補充）**

6. **SPEC-6: 技術風險評估**
   - 文件位置：`P0-5/P0-5_TECHNICAL_RISKS.md`
   - 內容：技術風險與對策、風險對 MVP Gate 驗收的影響

7. **SPEC-7: 測試策略**
   - 文件位置：`P0-5/P0-5_TESTING_STRATEGY.md`
   - 內容：測試策略與 Gate 驗收案例、單元測試、整合測試、E2E 測試

**任務依據**：技術規格結案包第 2 章「必須產出的 7 份規格文件（SPEC）」

**優先級**：🔶 **中等** - 規格文件可作為詳細實作指南，但不影響工程實作的啟動。建議在工程實作過程中逐步補充，或委派給 GPT/Gemini 在背景中完成。

---

### 選項 C：Stage 3 規格細節補充

**任務定位**：補充 Stage 3 投射定歸因的詳細技術規格，確保工程實作時有明確的實作指南。

**任務內容**：

1. **投射卡片元件設計**
   - 卡片結構（標題、選項、確認按鈕等）
   - 題目資料結構（如何從 `compiled_facet.json` 讀取題目）
   - 選項呈現方式（圖像、文字、狀態描述等）

2. **互動邏輯設計**
   - 單選 vs 多選（根據題目類型）
   - 選項點擊/選擇邏輯
   - 答案收集與暫存
   - 轉場動畫（卡片切換、選項確認等）

3. **流程控制設計**
   - 題目順序（是否允許跳題）
   - 完成判斷（何時進入 Stage 4）
   - 答案提交時機（完成所有題目後提交，或逐題提交）

4. **RWD 適配方案**
   - 桌面端卡片呈現
   - 手機端卡片呈現（是否需要全屏）
   - 平板端適配

5. **絕對紅線檢查**
   - 無數值評分（不得出現 1-10、0%-100% 等）
   - 無問卷化控件（不得出現 checkbox、radio button 等傳統表單元素）
   - 確保「直覺選擇（象/狀態）」的互動方式

**文件位置**：建議在 `P0-5/P0-5_COMPONENT_SPEC_STAGE3.md` 或 `P0-5/P0-5_LOGIC_SPEC_RISK_RESULT.md` 中說明

**任務依據**：技術規格結案包第 6 章「Stage 3 投射定歸因規格補充（待完善項）」

**優先級**：🔶 **中等** - Stage 3 規格細節需要在實作前補充，但不影響整體工程實作的啟動。建議在階段 4（Stage 3 實作）前完成。

---

### 選項 D：Stage 1 接口預留機制設計

**任務定位**：明確 Stage 1 的接口預留機制，確保未來可擴展。

**任務內容**：

1. **路由接口設計**
   - 定義 Stage 1 → Stage 2 的路由轉換點
   - 定義「直接進入 Stage 2」的入口邏輯
   - 確保未來 Stage 1 實作時，路由邏輯可無縫銜接

2. **資料接口設計**
   - 定義 Stage 1 可能的輸出資料結構（如 `domain_id` 等）
   - 定義 Stage 2 的輸入資料結構（是否依賴 Stage 1 的輸出）
   - 確保 Stage 1 缺失時，Stage 2 仍可正常運行

3. **組件接口設計**
   - 定義 Stage 1 組件的 Props 接口
   - 定義 Stage 1 組件的回調接口（完成後的處理）
   - 確保未來實作時，組件可無縫整合

**文件位置**：建議在 `P0-5/P0-5_TECHNICAL_ARCHITECTURE.md` 的「架構擴展性」章節中說明

**任務依據**：技術規格結案包第 7 章「Stage 1 接口預留機制說明（待完善項）」

**優先級**：🔷 **較低** - Stage 1 允許延後，接口預留機制可在工程實作過程中逐步明確。不影響 P0-5 MVP 的完成。

---

## 🎯 推薦行動方案

### 推薦方案：選項 A（P0-5 工程實作階段）

**理由**：

1. **技術規格已就緒**：技術規格結案包已通過審核，可作為工程實作的基準藍圖
2. **自然延續**：這是 P0-5 階段的自然延續，符合專案進度
3. **MVP 導向**：可立即開始產出可驗收的交付物，符合 MVP 策略
4. **彈性補充**：Stage 3 規格細節和 Stage 1 接口預留機制可在實作過程中逐步補充

**執行建議**：

1. **立即啟動階段 1-2**：基礎建設 + 核心引擎（D1, D2, D4, D5）
2. **同時補充 Stage 3 規格**：在實作 Stage 3 前，先完成 Stage 3 規格細節補充（選項 C）
3. **按順序執行階段 3-6**：Stage 2 羅盤 → Stage 3 投射定歸因 → Stage 4 結果呈現 → 整合與驗收
4. **階段 1 接口預留**：在架構設計階段（SPEC-1）明確 Stage 1 接口預留機制（選項 D）

**不推薦**：
- 選項 B（補充 7 份規格文件）：規格文件可作為詳細實作指南，但不影響工程實作的啟動。建議在工程實作過程中逐步補充，或委派給 GPT/Gemini 在背景中完成。

---

## 📝 任務包準備建議

**如果選擇選項 A（P0-5 工程實作階段）**：

建議建立以下任務包：
1. **P0-5 工程實作任務包**：包含完整的背景資料、技術規格結案包引用、8 個交付物的詳細實作要求、6 項 MVP Gate 驗收標準
2. **Stage 3 規格細節補充任務包**（可選）：如果需要先補充 Stage 3 規格，可建立單獨任務包

**如果選擇選項 C（Stage 3 規格細節補充）**：

建議建立任務包：**Stage 3 投射定歸因規格細節補充任務包**，包含完整的背景資料、UMIP 結案報告引用、Stage 3 的基本規格、需要補充的技術規格清單

---

## 🔄 下一步行動

**立即行動**：
1. 確認下一個任務選擇（建議：選項 A）
2. 建立相應的任務包（如果需要）
3. 開始執行選定的任務

**後續行動**：
- 根據任務執行進度，動態調整任務優先級
- 持續補充待完善項目（Stage 3 規格、Stage 1 接口預留機制）
- 逐步產出 7 份規格文件（作為詳細實作指南）

---

**建議建立日期**：2026-01-10  
**建議建立者**：總工程師（Cursor）  
**狀態**：ACTIVE | EDITABLE | REFERENCE（非硬性、可隨時修正）

