# P0-5 技術規格設計任務包（Technical Specification Design Task Packet）

**狀態**：ACTIVE | EDITABLE | REFERENCE（非硬性、可隨時修正）  
**建立日期**：2026-01-10  
**版本**：v1.0  
**任務類型**：技術規格設計（Technical Specification Design）  
**目標受眾**：GPT（技術理解與升華）、Gemini（技術方案發散）

---

## ⚠️ 重要聲明：所有內容保留修改空間

**本任務包中的所有設計、規格、決策均為暫時性版本，不得凍結。**

- 所有技術決策均可在後續討論中調整
- 所有架構設計、組件規格、實現方式均可修改
- 所有「最終版本」「確定方案」的說法均指「當前可執行的方案」，非永久凍結

**目標**：建立一個**可運作、可測試、可持續調整**的技術規格基礎，而非完美終版。

---

**文件放置規範**：請參考 `docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`

---

## 一、專案／任務背景摘要

### 1.1 這是什麼專案

**XUANCE 玄學介面專案**是一個「後端科學極大化、前端玄學極致化」的網頁應用系統。

**核心價值**：
- **內核**：基於心理/行為科學的評估、分流、計分、風險鏈、Golden Tests（內部不可見）
- **外殼**：使用者只感知到「玄學系統」與「問卦儀式」（不得暴露心理學/現代科學語彙）
- **架構**：採用「通用玄學介面協議（UMIP）」，實現隱喻解耦（Metaphor-Agnostic），可通過更換 JSON `theme_config` 切換視覺宇宙

**技術定位**：
- **前端**：Pure Renderer，所有資料來自 `compiled_facet.json`，無任何 domain logic
- **後端**：Python 評分引擎（`engine/score_facet.py`），負責計算分數與選擇 outcome band
- **資料流**：`compiled_facet.json` → UI Adapter（只 mapping，不運算）→ View Components

### 1.2 為什麼現在要做這件事

**P0-5 階段目標**：將已確立的 UMIP 規格轉化為**可運作、可測試、可驗收**的前端實作。

**當前狀態**：
- ✅ **設計階段已完成**：UMIP v1.0 結案報告已確立（`P0-5/P0-5_UMIP_CLOSURE_REPORT.md`）
- ✅ **工程執行報告已確立**：`P0-5/P0-5_IMPLEMENTATION_EXECUTION_REPORT.md` 已定義 8 個核心交付物與 6 項 MVP Gate
- ⏳ **技術規格設計階段**：需要 GPT/Gemini 提供詳細的技術規格，供 Cursor 實作

**為什麼需要技術規格設計**：
- Cursor 作為實作者，需要**明確的技術決策**（框架選擇、架構設計、組件規格等）
- 需要**詳細的實作指南**（資料結構、API 設計、狀態管理、錯誤處理等）
- 需要**可驗證的技術標準**（性能指標、相容性要求、測試策略等）

### 1.3 這次任務在整體中扮演什麼位置

**專案階段定位**：
```
P0-5 設計階段（已完成）
    ↓
P0-5 技術規格設計階段（當前階段）← 你現在在這裡
    ↓
P0-5 工程實作階段（待開始）
    ↓
P0-5 驗收與結案階段（待完成）
    ↓
P1-1 使用者驗證階段（未來）
```

**本次任務的產出將直接成為工程實作的唯一技術依據**。

---

## 二、與本次任務相關的「過往任務回顧」

### 2.1 之前做過哪些相關嘗試

#### ✅ 已完成階段

**P0-3：Facet 設計與編譯系統**
- 建立了 Facet 的資料結構（questions, scoring, recommendations, narratives, riskchains）
- 實作了 `engine/compile_domain.py` 和 `engine/score_facet.py`
- 建立了 `schemas/compiled_facet.schema.json`（基本版本）
- **成果**：目前有 `stress_recovery` Facet 作為範例

**P0-4.5：多階段分流系統設計**
- 設計了 4-Stage Holographic Funnel（八卦定方位、六親定物象、萬象定歸因、命盤綜合與斷語）
- **重要變更**：P0-5 將「萬象羅盤」提前至 Stage 2，取代原設計的「符號雲/列表」
- **成果**：`P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`

**P0-5 設計階段（已完成）**
- **UMIP v1.0 結案報告**：確立了絕對紅線、UI 架構、4-Stage 實作規格、結果呈現規格、6 項 MVP Gate
- **UI 架構設計**：`P0-5/P0-5_UI_ARCHITECTURE.md` 定義了 Layer 0-6 的架構
- **UI 串接規格**：`P0-5/P0-5_UI_INTEGRATION_SPEC.md` 定義了資料流與技術立場
- **工程執行報告**：`P0-5/P0-5_IMPLEMENTATION_EXECUTION_REPORT.md` 定義了 8 個核心交付物與執行順序

#### ⚠️ 已卡住或暫停的方向

**原 P0-5 UI 架構的 Layer 設計**
- **問題**：原設計的 Layer 0-6 與 UMIP 的 4-Stage 架構不完全對齊
- **決策**：P0-5 以 UMIP 的 4-Stage 為主，Layer 0-6 作為參考架構，不強制對齊
- **彈性**：Layer 1（使用者錨定）在 P0-5 MVP 中可簡化或延後

**Stage 1 八卦定方位**
- **問題**：時間與資源限制
- **決策**：P0-5 允許 Stage 1 延後，可由 Stage 2 直接啟動，但需預留接口
- **彈性**：若資源允許則實作，否則簡化為「直接進入 Stage 2」的入口

**原型代碼的遷移策略**
- **問題**：現有 `prototype/app.js` 是 MVP 範例，不適合直接擴展為生產代碼
- **決策**：新建 `ui/` 目錄作為標準化工程目錄，`prototype/` 僅作參考與對照
- **可回滾要求**：若後續改為擴展 `prototype/`，必須以 ADR 記錄並提供遷移策略

#### ❌ 已被否定或暫停的方向

**問卷化 UI 設計**
- **否定原因**：違反絕對紅線（禁止量表/滑桿/表單式列表）
- **替代方案**：全面採用「儀式性交互」與「單一物象選擇」

**符號雲/列表式 Stage 2**
- **否定原因**：原 P0-4.5 設計的「符號雲/物象群」被判定為仍有「問卷感」
- **替代方案**：定案為「萬象羅盤（Radial Compass）」作為 Stage 2 的具體實作形態

**硬編碼單一隱喻**
- **否定原因**：違反隱喻解耦原則（UI 不得硬編碼任何單一隱喻）
- **替代方案**：UI 必須讀取 Facet JSON 的 `theme_config` 以決定視覺皮層

**L4 待辦清單式呈現**
- **否定原因**：違反姿態化要求（L4 必須是「宜/不宜/守/攻」姿態語氣，不得呈現成待辦或命令）
- **替代方案**：籤詩/錦囊式卡片，只允許「宜… / 不宜… / 守… / 攻…」語氣

### 2.2 哪些已完成、哪些卡住

**已完成**：
- ✅ UMIP v1.0 規格確立
- ✅ 工程執行報告確立（8 個交付物 + 6 項 MVP Gate）
- ✅ 現有原型代碼（`prototype/app.js`）可作為參考
- ✅ Python 評分引擎（`engine/score_facet.py`）可作為後端參考

**已卡住（等待技術規格）**：
- ⏳ **前端框架選擇**：需要明確建議（Vue.js / React / Svelte 等）
- ⏳ **UMIP Schema v1 完整定義**：需要詳細的 `theme_config`、`i18n` 欄位結構與 fallback 約束
- ⏳ **Stage 2 Radial Compass 技術規格**：需要詳細的 SVG 結構、互動邏輯、RWD 適配方案
- ⏳ **i18n 機制設計**：需要詳細的即時切換方案、資料結構、原生語感保證機制
- ⏳ **Theme Engine 設計**：需要詳細的 `theme_config` 讀取、容錯、降級機制
- ⏳ **Risk Override 機制設計**：需要詳細的高風險檢測、L4 強制覆寫邏輯
- ⏳ **L1-L4 結果呈現組件規格**：需要詳細的分層揭示邏輯、互動方式、動畫策略

### 2.3 哪些方向已被否定或暫停

見「2.1 之前做過哪些相關嘗試」中的「❌ 已被否定或暫停的方向」。

---

## 三、目前已完成的結果或階段性結論

### 3.1 已經有哪些初步成果

#### ✅ 設計文件（完整且可參考）

1. **`P0-5/P0-5_UMIP_CLOSURE_REPORT.md`**（UMIP v1.0 結案報告）
   - 絕對紅線與硬規則（互動紅線、數據遮罩紅線、安全協議）
   - 4-Stage 全像漏斗實作規格（Stage 1-4 的詳細 UI 規格）
   - 結果頁面呈現規格（L1-L4 的詳細規格與揭示順序）
   - 6 項 MVP Gate 驗收標準（詳細且可操作化）

2. **`P0-5/P0-5_IMPLEMENTATION_EXECUTION_REPORT.md`**（工程執行報告）
   - 8 個核心交付物清單（D1-D8）
   - 技術決策狀態說明（已鎖定 vs 可替換）
   - 6 項 MVP Gate 的工程化檢核定義（Audit-Ready Checklist）
   - 執行順序與風險控管策略

3. **`P0-5/P0-5_UI_ARCHITECTURE.md`**（UI 架構設計）
   - Layer 0-6 的詳細架構說明
   - 技術立場：UI = Pure Renderer
   - 資料流設計：`compiled_facet.json` → UI Adapter → View Components
   - 錯誤處理（玄學語感版）

4. **`P0-5/P0-5_UI_INTEGRATION_SPEC.md`**（UI 串接規格）
   - UI 角色定位：儀式引導器（Ritual Orchestrator）
   - 全流程 UI 模組分層（Layer 0-6）
   - 動畫與視覺策略（不鎖死）
   - 顧問師角色需求（R2/R5 等）

#### ✅ 現有代碼與資料結構（可作為參考）

1. **`prototype/app.js`**（現有原型代碼）
   - 基本的 compiled facet 載入與解析
   - 簡單的題目渲染與答案收集
   - 基本的結果呈現（需大幅重構以符合 UMIP）
   - 簡單的 i18n 切換（需升級為即時切換）
   - **狀態**：MVP 範例，不適合直接擴展為生產代碼

2. **`engine/score_facet.py`**（Python 評分引擎）
   - 實現了 `weighted_sum` 評分模型
   - 支援 `higher_is_worse` 和 `higher_is_worse_reversed` 方向
   - 根據 scoring bands 選擇 outcome band
   - 輸出包含 `facetId`、`domainVersion`、`score`、`band`、`narrative`、`recommendations`、`riskchains`
   - **狀態**：可作為後端 API 參考，但前端需自行實現評分邏輯（或呼叫此 API）

3. **`domain/compiled/stress_recovery.compiled.v1.0.json`**（範例 Compiled Facet）
   - 基本結構：`domainVersion`、`facetId`、`questions`、`scoring`、`recommendations`、`narratives`、`riskchains`
   - **問題**：目前結構較簡單，缺少 `theme_config`、`i18n`、`risk_level` 等 P0-5 所需欄位
   - **需求**：需要擴展為符合 UMIP Schema v1 的完整結構

4. **`schemas/compiled_facet.schema.json`**（基本 Schema）
   - 目前只有基本結構驗證
   - **問題**：缺少 `theme_config`、`i18n`、`risk_level`、L1-L4 敘事結構等欄位
   - **需求**：需要擴展為完整的 UMIP Schema v1

#### ✅ 治理文件（確保技術規格符合要求）

1. **`docs/governance/CURSOR_GPT_GEMINI_COLLABORATION_FRAMEWORK.md`**（協作框架）
   - 明確了 GPT 和 Gemini 的角色定位
   - 任務包的「建議必含內容」結構
   - **目標**：讓技術規格設計站在正確的高度上思考

2. **`docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`**（文件放置規範）
   - 確保技術規格文件放置在正確位置
   - 確保所有產出符合專案結構規範

### 3.2 哪些東西「暫時可用」

#### ✅ 可直接參考的文件

- **UMIP 結案報告**：可作為技術規格的絕對權威依據
- **工程執行報告**：可作為技術決策的約束條件
- **現有原型代碼**：可作為實作邏輯的參考（需重構）
- **Python 評分引擎**：可作為後端 API 設計的參考

#### ⚠️ 需要擴展的資料結構

- **`compiled_facet.json` 結構**：需要擴展為符合 UMIP Schema v1 的完整結構
- **`schemas/compiled_facet.schema.json`**：需要擴展為完整的 UMIP Schema v1

### 3.3 哪些仍不確定

#### ❓ 需要技術規格設計解決的問題

1. **前端框架選擇**
   - **問題**：Vue.js / React / Svelte 等，如何選擇？
   - **約束**：必須支援組件化架構、SVG 渲染、RWD、即時 i18n 切換
   - **需求**：需要提供選型建議與決策依據

2. **UMIP Schema v1 完整定義**
   - **問題**：`theme_config`、`i18n`、`risk_level`、L1-L4 敘事結構等欄位的詳細定義為何？
   - **約束**：必須符合 UMIP 規格、必須支援 fail-soft、必須支援擴展
   - **需求**：需要提供完整的 JSON Schema 定義與範例

3. **Stage 2 Radial Compass 技術規格**
   - **問題**：SVG 結構、互動邏輯、RWD 適配、動畫策略為何？
   - **約束**：必須符合「放射狀羅盤/同心圓結構」，必須支援 20-30 個符碼，必須支援手機端旋盤模式
   - **需求**：需要提供詳細的技術規格與實作指南

4. **i18n 機制設計**
   - **問題**：即時切換方案、資料結構、原生語感保證機制為何？
   - **約束**：必須支援 CN/EN 即時切換（no reload），必須保證原生語感（非逐字翻譯）
   - **需求**：需要提供詳細的 i18n 架構設計與實作指南

5. **Theme Engine 設計**
   - **問題**：`theme_config` 讀取、容錯、降級機制為何？
   - **約束**：必須支援 fail-soft、必須支援隱喻解耦、必須不影響敘事結構
   - **需求**：需要提供詳細的 Theme Engine 架構設計與實作指南

6. **Risk Override 機制設計**
   - **問題**：高風險檢測、L4 強制覆寫邏輯為何？
   - **約束**：必須在渲染前 middleware 層級處理，優先級最高，必須支援 Template A/B
   - **需求**：需要提供詳細的 Risk Override 架構設計與實作指南

7. **L1-L4 結果呈現組件規格**
   - **問題**：分層揭示邏輯、互動方式、動畫策略為何？
   - **約束**：必須遵循 L1→L2→L3→L4 順序，L3 必須主動揭示，必須支援高風險鎖定
   - **需求**：需要提供詳細的組件規格與實作指南

8. **狀態管理架構**
   - **問題**：i18n / theme / risk 三類全域狀態如何管理？
   - **約束**：必須集中管理，必須支援即時切換，必須不影響性能
   - **需求**：需要提供詳細的狀態管理架構設計與實作指南

9. **錯誤處理與容錯機制**
   - **問題**：JSON 載入失敗、資產載入失敗、結構錯誤等如何處理？
   - **約束**：必須符合「玄學語感版」錯誤處理，必須 fail-soft，必須不阻斷流程
   - **需求**：需要提供詳細的錯誤處理策略與實作指南

10. **測試策略**
    - **問題**：單元測試、整合測試、E2E 測試、Golden Tests 如何設計？
    - **約束**：必須驗證 6 項 MVP Gate，必須驗證絕對紅線，必須可重複執行
    - **需求**：需要提供詳細的測試策略與測試用例設計

---

## 四、本次希望推進的下一個目標

### 4.1 核心目標（一句話）

**產出一份完整的技術規格設計文件，包含所有 8 個核心交付物的詳細技術規格，供 Cursor 作為工程實作的唯一技術依據。**

### 4.2 想補強哪一段

#### 🎯 優先補強（必須完整）

1. **UMIP Schema v1 完整定義**
   - 包含 `theme_config`、`i18n`、`risk_level`、L1-L4 敘事結構等所有必需欄位
   - 提供完整的 JSON Schema 定義
   - 提供至少 2 個完整的範例（不同主題的 `theme_config`）

2. **前端框架選型建議**
   - 比較 Vue.js / React / Svelte 等在專案場景下的優劣
   - 提供明確的選型建議與決策依據
   - 說明選擇後的影響與後續實作指南

3. **Stage 2 Radial Compass 技術規格**
   - SVG 結構設計（放射狀/同心圓布局算法）
   - 互動邏輯設計（點擊、選取、吸附、確認）
   - RWD 適配方案（桌面端 vs 手機端旋盤模式）
   - 動畫策略（符碼點亮、飛入、吸附等）

4. **i18n 機制設計**
   - 資料結構設計（如何組織 CN/EN 雙語內容）
   - 即時切換方案（不 reload 的實現方式）
   - 原生語感保證機制（如何確保英文非逐字翻譯）

5. **Theme Engine 架構設計**
   - `theme_config` 讀取與解析邏輯
   - 容錯與降級機制（fail-soft 實現）
   - 視覺皮層與敘事結構的隔離策略

6. **Risk Override 機制設計**
   - 高風險檢測邏輯（如何判斷 `risk_level: HIGH`）
   - L4 強制覆寫邏輯（Middleware 層級實現）
   - Template A/B 的管理與渲染

#### 🎯 次要補強（可簡化但需明確）

7. **L1-L4 結果呈現組件規格**
   - 分層揭示邏輯與動畫策略
   - L3 主動揭示的互動方式
   - 高風險鎖定的實現方式

8. **狀態管理架構**
   - 全域狀態的組織方式（Store/Context/Provider 等）
   - 狀態更新的觸發機制
   - 性能優化策略

9. **錯誤處理與容錯機制**
   - 錯誤分類與處理策略
   - 玄學語感版錯誤訊息的組織方式
   - Fail-soft 實現細節

10. **測試策略**
    - 6 項 MVP Gate 的測試用例設計
    - 絕對紅線的測試驗證方法
    - Golden Tests 的設計與維護方式

### 4.3 想擴展還是收斂

**本次任務的定位是「收斂」**：

- **不擴展**：不新增功能需求，不修改 UMIP 規格，不改變 6 項 MVP Gate
- **只收斂**：將現有的設計文件與工程執行報告「收斂」為明確、可執行的技術規格

**收斂的目標**：
- 將「抽象的設計描述」轉化為「具體的技術規格」
- 將「可選的技術方案」轉化為「明確的技術決策」（或提供決策依據）
- 將「模糊的實作要求」轉化為「可驗證的技術標準」

### 4.4 想驗證某個假設，還是單純找靈感

**本次任務的定位是「技術規格設計」，而非「靈感探索」**：

- **目標**：產出明確、可執行的技術規格，而非多個創意方案
- **方法**：基於現有設計文件與工程執行報告，進行技術升華與細節補齊
- **驗證**：技術規格的合理性與可實作性（需考慮 Cursor 的實作能力與專案約束）

**但允許以下「探索性思考」**：
- 不同前端框架的比較與選型分析
- 不同技術方案的優劣比較（需提供決策依據）
- 潛在技術風險的識別與對策

---

## 五、思考與產出期待（取代角色設定）

### 5.1 技術理解與升華（GPT 的主要責任）

**請以「技術架構師」的視角**，理解整體專案背景與設計文件，並進行技術升華：

1. **技術架構設計**
   - 理解 UMIP 規格的技術含義
   - 設計符合「Pure Renderer」定位的前端架構
   - 確保架構設計符合所有絕對紅線與技術約束

2. **技術決策與選型**
   - 比較不同前端框架在專案場景下的優劣
   - 提供明確的選型建議與決策依據
   - 說明選擇後的影響與實作指南

3. **技術風險識別**
   - 識別潛在的技術風險（性能、相容性、可維護性等）
   - 提供風險對策與緩解方案
   - 說明風險對 MVP Gate 驗收的影響

4. **技術規格完整性**
   - 確保技術規格涵蓋所有 8 個核心交付物
   - 確保技術規格符合 6 項 MVP Gate 的要求
   - 確保技術規格可被 Cursor 直接實作（無需猜測）

**產出格式**：
- 技術架構設計文件（Architecture Design Document）
- 技術選型建議與決策依據（Technology Selection & Rationale）
- 技術風險評估與對策（Technical Risk Assessment & Mitigation）

### 5.2 技術方案發散與細節補齊（Gemini 的主要責任）

**請以「技術實現顧問」的視角**，在 GPT 的技術架構基礎上，進行方案發散與細節補齊：

1. **技術方案發散**
   - 針對每個核心交付物，提供多個可行的技術方案
   - 比較不同方案的優劣與適用場景
   - 提供實作難度評估與時間估算

2. **實作細節補齊**
   - 將抽象的技術規格轉化為具體的實作指南
   - 提供程式碼結構建議與命名規範
   - 提供關鍵演算法的偽代碼或實作思路

3. **資料結構設計**
   - 設計完整的 UMIP Schema v1（包含所有必需欄位）
   - 提供 JSON Schema 定義與範例
   - 設計 i18n 資料結構與 `theme_config` 結構

4. **組件規格設計**
   - 設計每個核心組件的介面與 API
   - 設計組件間的資料流與狀態管理
   - 設計組件的互動邏輯與動畫策略

**產出格式**：
- 技術方案比較與建議（Technical Solution Comparison & Recommendations）
- 實作細節指南（Implementation Details Guide）
- 資料結構與組件規格（Data Structure & Component Specifications）

### 5.3 共同產出要求

**無論是 GPT 還是 Gemini，都應產出以下內容**：

1. **完整且可執行的技術規格**
   - 不得有「待確定」「待討論」的模糊地帶
   - 必須提供明確的技術決策或決策依據
   - 必須確保 Cursor 可直接依此實作（無需額外猜測）

2. **符合專案約束與絕對紅線**
   - 所有技術規格必須符合 UMIP 規格
   - 所有技術決策必須符合絕對紅線（互動紅線、數據遮罩紅線、安全協議）
   - 所有技術方案必須通過 6 項 MVP Gate 的驗收

3. **可追溯與可審計**
   - 所有技術決策必須有明確的決策依據
   - 所有技術方案必須說明其優劣與適用場景
   - 所有技術風險必須有對策與緩解方案

4. **可修改與可回滾**
   - 所有技術規格必須標註「可修改」「可回滾」
   - 所有技術決策必須說明其影響範圍與回滾方式
   - 所有技術方案必須支援後續迭代與優化

---

## 六、技術規格設計的具體需求清單

### 6.1 必須提供的技術規格（8 個核心交付物）

#### D1: UMIP UI Schema (`schemas/umip_schema_v1.json`)

**需求**：
- 完整的 JSON Schema 定義，包含所有必需欄位與約束
- 必須包含：`theme_config`、`i18n`、`risk_level`、L1-L4 敘事結構等
- 必須包含 fail-soft 約束與 fallback 機制定義
- 必須提供至少 2 個完整的範例（不同主題的 `theme_config`）

**參考資料**：
- `schemas/compiled_facet.schema.json`（現有基本版本）
- `domain/compiled/stress_recovery.compiled.v1.0.json`（現有範例）
- `P0-5/P0-5_UMIP_CLOSURE_REPORT.md`（UMIP 規格）

#### D2: 生產級 UI 代碼目錄 (`ui/`)

**需求**：
- 明確的目錄結構設計（符合前端最佳實踐）
- 組件、工具、樣式、資源等文件的組織方式
- 與 `prototype/` 的關係說明（參考 vs 遷移）

**參考資料**：
- `prototype/app.js`（現有原型代碼）
- `P0-5/P0-5_IMPLEMENTATION_EXECUTION_REPORT.md`（目錄決策）

#### D3: Stage 2 羅盤元件 (`RadialCompass`)

**需求**：
- SVG 結構設計（放射狀/同心圓布局算法）
- 互動邏輯設計（點擊、選取、吸附、確認）
- RWD 適配方案（桌面端 vs 手機端旋盤模式）
- 動畫策略（符碼點亮、飛入、吸附等）
- 符碼資料結構（如何從 `compiled_facet.json` 讀取符碼）

**參考資料**：
- `P0-5/P0-5_UMIP_CLOSURE_REPORT.md`（Stage 2 規格）
- `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`（Stage 2 設計）

#### D4: i18n 引擎 (`i18nManager`)

**需求**：
- 資料結構設計（如何組織 CN/EN 雙語內容）
- 即時切換方案（不 reload 的實現方式）
- 原生語感保證機制（如何確保英文非逐字翻譯）
- 與組件的整合方式（如何讓所有組件支援 i18n）
- 動態文本的處理方式（如何處理來自 `compiled_facet.json` 的動態文本）

**參考資料**：
- `prototype/app.js`（現有簡單 i18n 實現，需升級）
- `P0-5/P0-5_UMIP_CLOSURE_REPORT.md`（CN/EN 即時切換要求）

#### D5: 主題引擎 (`ThemeEngine`)

**需求**：
- `theme_config` 讀取與解析邏輯
- 容錯與降級機制（fail-soft 實現）
- 視覺皮層與敘事結構的隔離策略
- 主題切換的實現方式（如何在不修改程式碼的情況下切換主題）
- 中性玄學皮層（Neutral Ritual Skin）的定義與使用

**參考資料**：
- `P0-5/P0-5_UMIP_CLOSURE_REPORT.md`（視覺解耦要求）

#### D6: 風險覆蓋 (`RiskOverride`)

**需求**：
- 高風險檢測邏輯（如何判斷 `risk_level: HIGH`）
- L4 強制覆寫邏輯（Middleware 層級實現）
- Template A/B 的管理與渲染
- 與 L4 組件的整合方式
- CN/EN 雙語安全模板的組織方式

**參考資料**：
- `P0-5/P0-5_UMIP_CLOSURE_REPORT.md`（高風險鎖定要求）
- `P0-3/R2_METAPHOR_BOUNDARY_BANLIST_HIGHRISK_TEMPLATES.md`（Template A/B 定義）

#### D7: 結果分層呈現 (`ResultLayers`)

**需求**：
- L1-L4 分層揭示邏輯（必須遵循 L1→L2→L3→L4 順序）
- L3 主動揭示的互動方式（點擊/長按/展開）
- 高風險鎖定的實現方式
- 動畫策略（分層展開、揭示節奏等）
- 資料結構（如何從 `compiled_facet.json` 讀取 L1-L4 敘事）

**參考資料**：
- `P0-5/P0-5_UMIP_CLOSURE_REPORT.md`（結果呈現規格）

#### D8: 驗收報告模板 (`P0-5/P0-5_IMPLEMENTATION_ACCEPTANCE_REPORT.md`)

**需求**：
- 6 項 MVP Gate 的驗收檢查清單
- 驗收證據要求（截圖/錄影/可重跑步驟）
- 已知問題與後續改進計劃模板

**參考資料**：
- `P0-5/P0-5_IMPLEMENTATION_EXECUTION_REPORT.md`（驗收要求）

### 6.2 必須提供的技術決策與選型建議

#### 前端框架選型

**需求**：
- 比較 Vue.js / React / Svelte 等在專案場景下的優劣
- 提供明確的選型建議與決策依據
- 說明選擇後的影響與實作指南

**約束**：
- 必須支援組件化架構
- 必須支援 SVG 渲染
- 必須支援 RWD
- 必須支援即時 i18n 切換（no reload）
- 必須有良好的生態系統與文檔

#### 狀態管理選型

**需求**：
- 設計 i18n / theme / risk 三類全域狀態的管理方式
- 比較不同狀態管理方案（Vuex/Pinia、Redux/Zustand、Svelte Stores 等）
- 提供明確的選型建議與決策依據

**約束**：
- 必須集中管理
- 必須支援即時切換
- 必須不影響性能

#### 動畫方案選型

**需求**：
- 設計動畫策略（CSS / Canvas / WebGL / Animation Libraries）
- 比較不同動畫方案的優劣
- 提供明確的選型建議與決策依據

**約束**：
- 動畫模組必須獨立，可整包替換
- 動畫不得與內容耦合
- 動畫不得影響性能

### 6.3 必須提供的技術風險評估與對策

**需求**：
- 識別潛在的技術風險（性能、相容性、可維護性、可擴展性等）
- 提供風險對策與緩解方案
- 說明風險對 MVP Gate 驗收的影響

**重點風險領域**：
- 羅盤退化成問卷的風險
- 英文敘事失真的風險
- 高風險漏蓋的風險
- 主題破圖/缺字的風險
- 性能問題（特別是手機端）

### 6.4 必須提供的測試策略

**需求**：
- 6 項 MVP Gate 的測試用例設計
- 絕對紅線的測試驗證方法
- Golden Tests 的設計與維護方式
- 單元測試、整合測試、E2E 測試的策略

**參考資料**：
- `P0-5/P0-5_IMPLEMENTATION_EXECUTION_REPORT.md`（測試要求）

---

## 七、關鍵技術約束與絕對紅線（必須遵守）

### 7.1 絕對紅線（任何違反皆視為 Bug）

#### 互動紅線 (Interaction Red Lines)

- ❌ **禁止問卷化**：禁止長列表、滑桿、Likert、分數化 UI
- ❌ **禁止量化暗示**：禁止 1–10、0%–100%、進度條等評分語彙與視覺
- ✅ **使用者行為必是「選象/凝視」**：不是「自我打分」

**技術規格必須確保**：
- Stage 2 Radial Compass 不得退化成問卷
- Stage 3 投射卡片不得出現數值評分
- 任何 UI 元素不得引導使用者「評分自己」

#### 數據遮罩紅線 (Data Masking)

- ❌ **前端不得接收/保存/顯示**未轉譯內部量化資料（Severity/Attribution/Coping 等）
- ✅ **UI 僅呈現對外封裝輸出**：`narrative_text`、`visual_assets`、`theme_config` 等

**技術規格必須確保**：
- 前端 Store/記憶體不保存內部計算值
- UI 原始碼與介面中無任何內部計算欄位外洩
- 資料結構設計必須隔離內部資料與對外輸出

#### 安全與合規紅線 (Safety Protocols)

- ❌ **高風險必覆蓋**：`risk_level: HIGH` 時必須忽略動態 L4，強制渲染安全模板（A/B）
- ❌ **L4 禁止命令/待辦樣式**：只能用「宜/不宜/守/攻」姿態語氣，不可做 To-Do 清單

**技術規格必須確保**：
- Risk Override 機制必須在渲染前 middleware 層級處理，優先級最高
- L4 組件必須支援高風險鎖定與安全模板渲染
- 所有建議層文案必須符合「宜/不宜/守/攻」語感

### 7.2 技術約束（必須符合）

#### 架構模式約束

- ✅ **Component-Based Architecture**：必須採用組件化架構（已鎖定）
- ✅ **Pure Renderer**：UI 不得包含任何 domain logic
- ✅ **資料驅動**：所有視覺與互動必須由 `compiled_facet.json` 驅動

#### 技術選型約束

- ✅ **Stage 2 渲染技術**：SVG 為主（已鎖定，優於 Canvas 在 RWD 與互動判定上的表現）
- ✅ **全域狀態管理**：必須集中管理 i18n / theme / risk 三類狀態（已鎖定）
- 🔄 **前端框架實例**：Vue / React / Svelte 等擇一（可替換，需 ADR 記錄）

#### 性能與相容性約束

- ✅ **RWD 適配**：必須支援桌面端、平板端、手機端
- ✅ **即時切換**：CN/EN 切換必須不 reload
- ✅ **Fail-soft**：任何資產載入失敗不得阻斷流程

### 7.3 驗收標準約束（必須通過 6 項 MVP Gate）

**技術規格必須確保所有實作都能通過以下 6 項 MVP Gate**：

1. **Gate #1：資料串接**
   - UI 可載入任一符合 Schema 的 `compiled_facet.json`
   - 非關鍵缺值時 fallback 生效且 UI 不崩潰
   - 前端 Store/記憶體不保存內部計算值

2. **Gate #2：CN/EN 即時切換**
   - 切換語言不 reload
   - 靜態 UI 與動態敘事文字皆即時更新
   - 英文內容為原生語感（非逐字翻譯腔）

3. **Gate #3：Stage 2 儀式介面（Radial Compass）**
   - 放射狀/同心圓結構（非 Grid/List/Form）
   - 可完成 2–3 個符碼選取（點亮 + 吸附中央）
   - 手機端可單手操作（旋盤/撥動模式或等效方案）
   - 紅線：無問卷化控制元件

4. **Gate #4：L1–L4 結果呈現**
   - L1→L2→L3→L4 揭示順序鎖定
   - L3 必須使用者主動互動才揭示（點擊/長按/展開）
   - UI/原始碼/畫面中無內部計算欄位外洩

5. **Gate #5：高風險覆蓋（Hard Logic）**
   - 可人工觸發 `risk_level = HIGH`（資料或測試開關）
   - 觸發後 L4 強制顯示安全模板（Template A/B，含 CN/EN）
   - 動態 L4 完全不渲染/不顯示

6. **Gate #6：視覺解耦（Theme Config）**
   - 不改程式碼，僅改 JSON `theme_config` 即可切換至少一項視覺元素（背景/字體/配色）
   - `theme_config` 缺失或資產錯誤 → 自動回退 Neutral Ritual Skin
   - 視覺變化不影響敘事結構與文字內容

---

## 八、參考資料與文件索引

### 8.1 權威設計文件（必須參考）

1. **`P0-5/P0-5_UMIP_CLOSURE_REPORT.md`**
   - UMIP v1.0 結案報告（絕對權威）
   - 包含絕對紅線、4-Stage 規格、結果呈現規格、6 項 MVP Gate

2. **`P0-5/P0-5_IMPLEMENTATION_EXECUTION_REPORT.md`**
   - 工程執行報告（技術決策約束）
   - 包含 8 個核心交付物、技術決策狀態、執行順序、風險控管

3. **`P0-5/P0-5_UI_ARCHITECTURE.md`**
   - UI 架構設計（架構參考）
   - 包含 Layer 0-6 架構、技術立場、資料流設計

4. **`P0-5/P0-5_UI_INTEGRATION_SPEC.md`**
   - UI 串接規格（整合參考）
   - 包含 UI 角色定位、全流程模組分層、動畫策略

### 8.2 現有代碼與資料結構（可作為參考）

1. **`prototype/app.js`**
   - 現有原型代碼（邏輯參考，需重構）

2. **`engine/score_facet.py`**
   - Python 評分引擎（後端 API 參考）

3. **`domain/compiled/stress_recovery.compiled.v1.0.json`**
   - 範例 Compiled Facet（資料結構參考，需擴展）

4. **`schemas/compiled_facet.schema.json`**
   - 基本 Schema（結構參考，需擴展）

### 8.3 相關設計文件（上下文參考）

1. **`P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`**
   - 4-Stage 分流系統設計（Stage 設計參考）

2. **`P0-3/R2_METAPHOR_BOUNDARY_BANLIST_HIGHRISK_TEMPLATES.md`**
   - 高風險模板定義（Template A/B 參考）

3. **`docs/governance/CURSOR_GPT_GEMINI_COLLABORATION_FRAMEWORK.md`**
   - 協作框架（任務包格式參考）

### 8.4 治理文件（確保符合規範）

1. **`docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`**
   - 文件放置規範（產出文件必須符合）

2. **`docs/governance/AI_ADVISORY_ROLES.md`**
   - AI 顧問角色系統（角色定位參考）

---

## 九、產出要求與交付格式

### 9.1 產出文件要求

**必須產出以下文件**：

1. **技術架構設計文件**（Architecture Design Document）
   - 檔案名稱：`P0-5/P0-5_TECHNICAL_ARCHITECTURE.md`
   - 內容：整體技術架構、組件架構、資料流設計、狀態管理設計

2. **技術選型建議與決策依據**（Technology Selection & Rationale）
   - 檔案名稱：`P0-5/P0-5_TECHNOLOGY_SELECTION.md`
   - 內容：前端框架選型、狀態管理選型、動畫方案選型等

3. **技術方案比較與建議**（Technical Solution Comparison & Recommendations）
   - 檔案名稱：`P0-5/P0-5_TECHNICAL_SOLUTIONS.md`
   - 內容：每個核心交付物的技術方案比較與建議

4. **實作細節指南**（Implementation Details Guide）
   - 檔案名稱：`P0-5/P0-5_IMPLEMENTATION_GUIDE.md`
   - 內容：每個核心交付物的詳細實作指南、程式碼結構建議、關鍵演算法偽代碼

5. **資料結構與組件規格**（Data Structure & Component Specifications）
   - 檔案名稱：`P0-5/P0-5_DATA_STRUCTURE_SPEC.md`
   - 內容：UMIP Schema v1 完整定義、i18n 資料結構、`theme_config` 結構、組件介面與 API

6. **技術風險評估與對策**（Technical Risk Assessment & Mitigation）
   - 檔案名稱：`P0-5/P0-5_TECHNICAL_RISKS.md`
   - 內容：潛在技術風險、對策與緩解方案、對 MVP Gate 驗收的影響

7. **測試策略**（Testing Strategy）
   - 檔案名稱：`P0-5/P0-5_TESTING_STRATEGY.md`
   - 內容：測試用例設計、測試驗證方法、Golden Tests 設計

### 9.2 產出格式要求

**所有產出文件必須**：

1. **符合文件放置規範**
   - 放置在 `P0-5/` 目錄下
   - 檔案名稱符合規範（見上）

2. **標註版本與狀態**
   - 版本號：v1.0
   - 狀態：ACTIVE | EDITABLE | REFERENCE（非硬性、可隨時修正）

3. **包含可追溯性聲明**
   - 說明與上游文件的對齊關係（UMIP 結案報告、工程執行報告等）
   - 說明技術決策的決策依據

4. **包含可修改與可回滾聲明**
   - 明確標註所有技術規格「可修改」「可回滾」
   - 說明影響範圍與回滾方式

5. **包含實作驗證標準**
   - 每個技術規格都必須有明確的驗證標準
   - 確保 Cursor 可以驗證實作是否符合規格

### 9.3 產出完整性檢查清單

**產出前請確認**：

- [ ] 所有 8 個核心交付物都有詳細的技術規格
- [ ] 所有技術決策都有明確的選型建議或決策依據
- [ ] 所有技術方案都有優劣比較與適用場景說明
- [ ] 所有技術風險都有對策與緩解方案
- [ ] 所有技術規格都符合絕對紅線與技術約束
- [ ] 所有技術規格都確保能通過 6 項 MVP Gate 驗收
- [ ] 所有產出文件都符合文件放置規範與格式要求

---

## 十、結語與期待

### 10.1 本次任務的重要性

**本次技術規格設計任務是 P0-5 階段的關鍵節點**：

- **上游**：設計階段已完成，UMIP 規格已確立
- **當前**：需要將設計轉化為明確、可執行的技術規格
- **下游**：技術規格將直接成為 Cursor 工程實作的唯一技術依據

**技術規格的品質將直接影響**：
- 工程實作的效率與品質
- MVP Gate 驗收的順利程度
- 後續迭代與優化的可維護性

### 10.2 對 GPT 的期待

**請以「技術架構師」的視角**，理解整體專案背景與設計文件，並進行技術升華：

- **技術架構設計**：設計符合「Pure Renderer」定位的前端架構
- **技術決策與選型**：提供明確的選型建議與決策依據
- **技術風險識別**：識別潛在風險並提供對策
- **技術規格完整性**：確保技術規格涵蓋所有交付物且可被直接實作

### 10.3 對 Gemini 的期待

**請以「技術實現顧問」的視角**，在 GPT 的技術架構基礎上，進行方案發散與細節補齊：

- **技術方案發散**：針對每個交付物提供多個可行的技術方案
- **實作細節補齊**：將抽象的技術規格轉化為具體的實作指南
- **資料結構設計**：設計完整的 UMIP Schema v1 與相關資料結構
- **組件規格設計**：設計每個核心組件的介面與 API

### 10.4 共同期待

**無論是 GPT 還是 Gemini，都應產出**：

1. **完整且可執行的技術規格**（無模糊地帶）
2. **符合專案約束與絕對紅線**（通過驗收）
3. **可追溯與可審計**（有決策依據）
4. **可修改與可回滾**（支援迭代）

**期待最終產出**：
- 一份讓 Cursor 可以直接依此實作的技術規格
- 一份讓專案可以順利通過 MVP Gate 驗收的技術標準
- 一份讓後續迭代可以持續優化的技術基礎

---

**本任務包確認完畢，可交付 GPT 與 Gemini 進行技術規格設計。**

**任務包建立日期**：2026-01-10  
**任務包版本**：v1.0  
**任務包狀態**：ACTIVE | EDITABLE | REFERENCE（非硬性、可隨時修正）

