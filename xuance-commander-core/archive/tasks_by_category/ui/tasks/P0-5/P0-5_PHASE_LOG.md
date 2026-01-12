# P0-5｜Phase Log
- Phase: P0-5
- Status: ✅ **CANONIZED**（結案報告已定案，可開始工程實作）
- Target: 建立最小 UI 串接（讀 compiled facet -> 顯示敘事+建議+風險鏈）
- Edit Policy: REFERENCE（結案報告已鎖定，工程實作期間不得隨意變更）

---

## 階段目標（Goal）

建立一套**「通用玄學介面協議」（Universal Metaphysical Interface Protocol, UMIP）**，確立「後端科學極大化、前端玄學極致化」的二元架構，實現可跨 Facet 重用、可被工程驗收的 UI 整合方案。

---

## Log entries

### 2026-01-10：P0-5 任務包建立與更新

- ✅ **任務包建立**：`P0-5/P0-5_TASK_PACKET.md` v1.0 建立
- ✅ **任務包更新**：依據新任務包制度更新至 v2.0
  - 加入文件放置規範引用
  - 重新組織為核心四要素結構（背景 + 歷史任務狀態 + 已完成結果 + 下一步目標）
  - 加入「思考與產出期待」部分（取代角色設定）
  - 更新引用（charter/CHARTER.md 取代 FULL/NORTH_STAR.md）

### 2026-01-10：結案報告審核與定案

- ✅ **GPT 結案報告產出**：通用玄學介面協議 (UMIP) 初版
- ✅ **Gemini 結案報告產出**：通用玄學介面協議 (UMIP) 優化版
- ✅ **總工程師審核**：統整兩個版本，確認符合任務包 v2.0 要求
  - ✅ 關鍵決策點明確：Stage 2 UI 形態變更已明確說明，保留彈性空間
  - ✅ CN/EN 即時切換已列為硬性驗收標準（對齊任務包 9.1）
  - ✅ 驗收標準清晰：6 項 MVP Gate 標準具體可驗證
  - ✅ 追蹤性完整：與任務包的對齊關係已明確標註
  - ✅ 彈性機制健全：保留回調與迭代空間
- ✅ **結案報告定案**：`P0-5/P0-5_UMIP_CLOSURE_REPORT.md` v1.0 寫入 Canon
- ✅ **狀態變更**：從 ACTIVE 變更為 **CANONIZED / REVISION-LOCKED (P0-5 Scope)**

### 2026-01-10：技術規格設計任務包建立

- ✅ **技術規格設計任務包建立**：`docs/task_packets/advisor/task_packages/P0-5_TECHNICAL_SPEC_DESIGN_TASK_PACKET.md` v1.0
  - 完整的專案背景與歷史任務回顧
  - 明確的 8 個核心交付物技術規格需求
  - 詳細的技術約束與絕對紅線說明
  - 7 份規格文件的產出要求

### 2026-01-10：技術規格設計結案

- ✅ **GPT/Gemini 技術規格設計產出**：技術規格設計結案包（經過交互討論與修正）
  - ✅ **RiskOverride 的 Interceptor 模式修正**：避免 FOUC（Flash of Unsafe Content）問題，確保高風險內容從未進入 UI State
  - ✅ **數據遮罩紅線的詳細程度**：涵蓋前端記憶體、DOM、Network Payload、Console Log、Error Reporting
  - ✅ **絕對紅線的明確性**：互動紅線、數據遮罩紅線、安全紅線均清晰明確
  - ✅ **技術決策明確性**：React + Vite, Zustand, Adapter Pattern 均有明確理由與備選方案
  - ✅ **6 項 MVP Gate 驗收標準**：含可重跑證據要求，可驗收性高
- ✅ **總工程師審核**：技術規格設計整體品質優秀，**有條件通過**
  - ✅ 審核通過：技術規格設計符合要求，可作為工程實作基準藍圖
  - ⚠️ 待完善項：Stage 3 規格細節需在實際工程中補充（不影響結案）
  - ⚠️ 待完善項：Stage 1 接口預留機制需在實際工程中明確（不影響結案）
- ✅ **技術規格結案包定案**：`P0-5/P0-5_TECHNICAL_SPEC_CLOSURE_PACK.md` v1.0 寫入
- ✅ **結案摘要建立**：`P0-5/P0-5_TECHNICAL_SPEC_CLOSURE_SUMMARY.md` v1.0 建立
- ✅ **狀態變更**：技術規格設計階段完成，進入**工程實作準備階段**

---

## 關鍵決策記錄（Key Decisions）

### 決策 1：Stage 2 UI 形態變更（相對於 P0-4.5 設計）

**原 P0-4.5 設計**：
- Stage 2：六親定物象（The Context Lock）— 符號雲/物象群（Symbol Cloud）
- Stage 3：萬象定歸因（The Attribution Matrix）— 萬象羅盤/星盤（Phenomenon Compass）

**P0-5 決策變更**：
- 將「萬象羅盤（Radial Compass）」提前至 Stage 2，作為「六親定物象」的具體 UI 實作形態
- **原因**：羅盤式界面更符合「儀式性交互」要求，避免列表/符號雲的「問卷感」
- **彈性空間**：若後續版本驗證此變更不合適，可回調至 P0-4.5 的「符號雲」設計

**決策文件**：`P0-5/P0-5_UMIP_CLOSURE_REPORT.md` 第 4 章

---

### 決策 2：CN/EN 即時切換列為硬性驗收標準

**任務包要求**：任務包 v2.0 的 9.1「功能完整性最低要求」已將 CN/EN 即時切換列為硬性要求

**結案報告強化**：UMIP 結案報告將 CN/EN 即時切換列為 **MVP Gate #2（硬性驗收條款）**

**技術要求**：
- 必須支援即時切換，不需重新載入頁面（no reload）
- 所有文字（題目、結果、按鈕、UI 標籤）都需即時更新
- 英文敘事需具原生語感（不得逐字翻譯腔）
- 數據結構中應包含 `zh` 和 `en` 欄位，UI 根據當前語言選擇對應欄位

**決策文件**：`P0-5/P0-5_UMIP_CLOSURE_REPORT.md` 第 6 章「驗收標準 #2」

---

### 決策 3：隱喻解耦（Metaphor-Agnostic）架構

**核心原則**：UI 不得硬編碼任何單一隱喻（如農耕、倉廩）；必須讀取 Facet JSON 的 `theme_config` 以決定視覺皮層

**技術實現**：
- UI 框架轉型為通用播放器，讀取 JSON `theme_config` 切換視覺宇宙
- 更換 Facet JSON（或其 `theme_config`）＝可在不改前端程式碼情況下切換整體視覺宇宙

**決策文件**：`P0-5/P0-5_UMIP_CLOSURE_REPORT.md` 第 3 章

---

### 決策 4：去問卷化與儀式化

**核心原則**：廢除量表/滑桿/表單式列表，全面採用「羅盤凝視」與「單一物象選擇」

**互動紅線**：
- 一屏一問（One Screen, One Query）：禁止捲動式長問卷
- 禁止量化暗示：嚴禁出現 1–10、0%–100%、進度量表、Likert
- 具象化選項：選項必須是「狀態/畫面/象」，不得引導使用者「評分自己」

**決策文件**：`P0-5/P0-5_UMIP_CLOSURE_REPORT.md` 第 2.1 章

---

## 交付物記錄（Deliverables）

### 已交付文件

1. **任務包文件**：`P0-5/P0-5_TASK_PACKET.md` v2.0
   - 狀態：ACTIVE | EDITABLE | REFERENCE
   - 建立日期：2026-01-10
   - 更新日期：2026-01-10

2. **結案報告**：`P0-5/P0-5_UMIP_CLOSURE_REPORT.md` v1.0
   - 狀態：CANONIZED / REVISION-LOCKED (P0-5 Scope)
   - 建立日期：2026-01-10
   - 性質：作為 P0-5 開發與驗收的唯一依據

3. **階段憲章**：`P0-5/P0-5_CHARTER.md`
   - 狀態：ACTIVE
   - 建立日期：2026-01-09

4. **UI 架構設計**：`P0-5/P0-5_UI_ARCHITECTURE.md`
   - 狀態：ACTIVE
   - 建立日期：2026-01-09

5. **UI 串接規格**：`P0-5/P0-5_UI_INTEGRATION_SPEC.md`
   - 狀態：ACTIVE
   - 建立日期：2026-01-09

### 待交付實作（工程階段）

根據技術規格結案包，需交付以下 8 個核心交付物（D1-D8）：

- [ ] **D1 Schema**：UMIP UI Schema v1（含 Theme / Risk / i18n）
- [ ] **D2 Directory**：生產級前端目錄架構（含 Adapter Pattern）
- [ ] **D3 Compass**：Stage 2 萬象羅盤（Radial Compass）SVG 互動規格
- [ ] **D4 i18n**：無刷新（No-reload）雙語切換引擎
- [ ] **D5 Theme**：Theme Engine 與 Neutral Skin 降級機制
- [ ] **D6 Risk**：高風險強制覆寫（RiskOverride Middleware/Interceptor）
- [ ] **D7 Layers**：L1–L4 結果分層揭示邏輯
- [ ] **D8 Acceptance**：6 項 MVP Gate 驗收模板

**技術規格依據**：`P0-5/P0-5_TECHNICAL_SPEC_CLOSURE_PACK.md` v1.0

---

## 驗收標準（MVP Gate）

P0-5 被視為「完成」，必須同時滿足以下 **6 項**驗收標準：

1. ✅ **資料串接**：UI 可正確載入並解析任一符合 Schema 的 `compiled_facet.json`
2. ✅ **CN/EN 雙語即時切換**（硬性要求）：必須支援即時切換，不需重新載入頁面，英文敘事需具原生語感
3. ✅ **儀式介面（Stage 2 硬性）**：成功實作「萬象羅盤（Radial Compass）」並可完成選取流程
4. ✅ **結果呈現**：Stage 4 結果頁完整呈現 L1–L4；且所有開發用數據皆不可見（遵守遮罩紅線）
5. ✅ **風險覆蓋**：可人工模擬 `risk_level = HIGH`，並驗證 L4 會被安全模板強制覆寫
6. ✅ **視覺解耦**：不改前端程式碼情況下，僅修改 JSON `theme_config` 即可切換基本視覺元素

**詳細規格**：見 `P0-5/P0-5_UMIP_CLOSURE_REPORT.md` 第 6 章

---

## 相關文件索引

### 核心文件

- **結案報告**：`P0-5/P0-5_UMIP_CLOSURE_REPORT.md`（開發與驗收的唯一依據）
- **任務包**：`P0-5/P0-5_TASK_PACKET.md` v2.0
- **階段憲章**：`P0-5/P0-5_CHARTER.md`
- **UI 架構設計**：`P0-5/P0-5_UI_ARCHITECTURE.md`
- **UI 串接規格**：`P0-5/P0-5_UI_INTEGRATION_SPEC.md`

### 參考文件

- **專案憲章**：`charter/CHARTER.md`
- **專案路線圖**：`roadmap/ROADMAP.md`
- **P0-4.5 分流系統設計**：`P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`
- **P0-3 敘事規格**：`P0-3/R1_METRICS_V1_EXECUTABLE_SPEC.md`、`P0-3/R2_METAPHOR_BOUNDARY_BANLIST_HIGHRISK_TEMPLATES.md`

---

**本階段日誌版本**：v1.0  
**建立日期**：2026-01-10  
**最後更新**：2026-01-10  
**狀態**：REFERENCE（結案報告已定案，工程實作期間不得隨意變更）

**— 本階段日誌記錄 P0-5 從任務包建立到結案報告定案的完整過程。**

