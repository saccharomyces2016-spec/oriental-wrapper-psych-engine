# P0-5 工程實作執行報告（Implementation Execution Report）

**文件位置**：`P0-5/P0-5_IMPLEMENTATION_EXECUTION_REPORT.md`  
**建立日期**：2026-01-10  
**版本**：v3.0 FINAL (Execution Baseline / Audit-Ready / Revision-Allowed)  
**狀態**：**EXECUTING**（工程執行中）

**文件性質**：
- 工程執行依據（非 Canon 凍結文件，但具備審計效力）
- 允許以 Addendum/ADR 修訂，禁止直接覆寫歷史版本
- **可更改、可回滾**：所有技術決策與執行順序均可根據實際情況調整，需記錄變更原因

**上游依據**：
- `P0-5/P0-5_UMIP_CLOSURE_REPORT.md` v1.0（開發與驗收的唯一依據）
- `P0-5/P0-5_IMPLEMENTATION_TASK_PACKET.md` v1.0（工程實作任務包）

---

## ⚠️ 重要聲明（Non-Freeze）

**本文件為 P0-5 當前可執行的工程基線**，用於讓代碼能一致地被寫出、被驗收、被交接。

**本文件不凍結任何世界觀與 UMIP 規格**；若需調整，必須以 Addendum / ADR 追加記錄，禁止直接覆寫歷史版本。

**治理層級聲明**：
- 本文件將原本僅屬於工程師視角的「實作策略」，提升為專案指揮官可引用的「審計標準」
- 本文件解決「工程師做完但指揮官不敢認」的常見矛盾
- 本文件確保工程執行與專案治理的嚴肅性取得平衡

---

## 一、報告目的（Purpose）

本文件用於正式確立 P0-5 階段之工程執行事實，並作為：

1. **工程端的唯一實作路徑依據**：開發團隊以此為準
2. **Gate 驗收時的審計對照文件**：驗收人員以此檢核
3. **後續 P1 階段的技術交接基準**：未來迭代的起點

**聲明**：本文件不凍結 UMIP 規格、不重寫世界觀，但鎖定「此階段工程要怎麼做、做到什麼程度才算完成」。

---

## 二、角色與責任確認（Execution Role Declaration）

### 2.1 工程執行角色

P0-5 階段工程執行角色定義為：**UMIP Interface Implementation Integrator**

其職責明確限定為：

**Input (輸入)**：
- Canonized 的 UMIP v1.0 規格
- 合法的 `compiled_facet.json`（含既有實例）

**Process (過程)**：
- 將規格轉化為可運行、可測試、可驗收的前端 UI
- 嚴格遵守互動紅線、敘事遮罩與高風險規範

**Output (輸出)**：
- 通過 6 項 MVP Gate 的工程交付物
- 可進入 P1-1 使用者驗證階段的操作介面

### 2.2 明確排除之責任範圍（Non-Scope）

以下事項 **不屬於** P0-5 工程責任，亦不得在此階段引入：

- ❌ 新增 / 修改 Facet 的心理、命理、象數定義
- ❌ 調整 UMIP Stage 或 L1–L4 語義順序
- ❌ 創作新的敘事隱喻或替換主隱喻
- ❌ 設計帳號、金流、資料庫或營運機制

---

## 三、工程實作總目標（Implementation Objective）

### 3.1 核心目標（Single Sentence）

在完全不修改 UMIP 核心規格的前提下，完成一套 **可運作、可測試、可持續調整** 的前端實作，並完整通過 6 項 MVP Gate 驗收標準。

### 3.2 完成判定標準（Definition of Done）

P0-5 僅在 **以下條件同時成立** 時，方可宣告完成：

1. **流程完整**：Stage 2 → Stage 4 可被完整執行
2. **紅線零違規**：無量化暗示、無內部數據外洩、互動形式不退化為問卷
3. **Gate 全通過**：6/6 MVP Gate 驗收成功（有證據支持）

---

## 四、實作範圍與技術決策（Scope & Technical Decisions）

### 4.1 核心交付物（Mandatory Deliverables）

| ID | 交付物 | 路徑/名稱 | 說明 |
| --- | --- | --- | --- |
| **D1** | UMIP UI Schema | `schemas/umip_schema_v1.json` | 定義 `theme_config`、`i18n` 欄位與必要 fallback 約束 |
| **D2** | 生產級 UI 代碼目錄 | `ui/` | **決策已定**：新建標準化工程目錄（不沿用 `prototype/`） |
| **D3** | Stage 2 羅盤元件 | `RadialCompass` | 放射狀/同心圓符碼盤（RWD + Touch 支援） |
| **D4** | i18n 引擎 | `i18nManager` | CN/EN 即時切換（no reload） |
| **D5** | 主題引擎 | `ThemeEngine` | 讀取 `theme_config`，Fail-soft 回退 |
| **D6** | 風險覆蓋 | `RiskOverride` | `risk_level: HIGH` → L4 強制安全模板（Hard Logic） |
| **D7** | 結果分層呈現 | `ResultLayers` | L1→L4 分層揭示，L3 主動揭示 |
| **D8** | 驗收報告 | `P0-5/P0-5_IMPLEMENTATION_ACCEPTANCE_REPORT.md` | 6 Gate 勾選 + 證據 |

### 4.2 目錄決策（Directory Decision）

**執行決策**：新建 `ui/` 作為標準化工程目錄；`prototype/` 僅作參考與對照

**可回滾要求**：若後續改為擴展 `prototype/`，必須以 ADR 記錄並提供遷移策略（不得覆寫本決策紀錄）

### 4.3 技術決策狀態說明（Technical Decisions）

本節鎖定「工程型態」而非「唯一工具」，確保架構正確性與工具選擇彈性。

#### ✅ 已鎖定（Locked for P0-5）

**P0-5 期間不得推翻，確保系統屬性**：

- **架構模式**：Component-Based Architecture（組件化架構）
- **Stage 2 渲染技術**：SVG 為主（優於 Canvas 在 RWD 與互動判定上的表現）
- **全域狀態管理**：必須集中管理 `i18n` / `theme` / `risk` 三類全域狀態
- **Fail-soft 原則**：`theme_config` 資產失敗不得阻斷流程，只能降級呈現

#### 🔄 可替換但需記錄（Replaceable with ADR）

**開發團隊可依專長選擇，但需有明確紀錄**：

- **前端框架實例**：Vue.js / React / Svelte 擇一
- **替換條件**：
  1. 不得影響 Gate 行為與紅線規範
  2. 必須新增 ADR（Architecture Decision Record）記錄選型原因、影響與回滾方式
  3. 禁止多框架混用造成狀態與樣式分裂

**決策顆粒度說明**：
- 將技術決策區分為「已鎖定（架構面）」與「可替換（工具面）」
- 這給予了開發團隊必要的彈性，同時守住了系統設計的底線

---

## 五、絕對紅線（任何違反皆視為 Bug）

**（本節為工程實作必遵守硬規則摘要；權威版本以結案報告為準）**

### 5.1 互動紅線（Interaction Red Lines）

- **禁止問卷化**：禁止長列表、滑桿、Likert、分數化 UI
- **禁止量化暗示**：禁止 1–10、0%–100%、進度條等評分語彙與視覺
- **使用者行為必是「選象/凝視」**：不是「自我打分」

### 5.2 數據遮罩紅線（Data Masking）

- **前端不得接收/保存/顯示未轉譯內部量化資料**：Severity、Attribution、Coping 等
- **UI 僅呈現對外封裝輸出**：如 `narrative_text`、`visual_assets`、`theme_config` 等

### 5.3 安全與合規紅線（Safety Protocols）

- **高風險必覆蓋**：`risk_level: HIGH` 時必須忽略動態 L4，強制渲染安全模板（Template A/B）
- **L4 禁止命令/待辦樣式**：只能用「宜/不宜/守/攻」姿態語氣，不可做 To-Do 清單

---

## 六、6 項 MVP Gate（Audit-Ready Checklist）

**本節為驗收可直接勾選之檢核定義**；每項需附證據（截圖/錄影/可重跑步驟）。

### Gate #1：資料串接

- [ ] UI 可載入任一符合 Schema 的 `compiled_facet.json`
- [ ] 非關鍵缺值時 fallback 生效且 UI 不崩潰
- [ ] 前端 Store/記憶體不保存 `severity`、`attribution` 等內部計算值

**驗收證據要求**：
- 載入 `domain/compiled/stress_recovery.compiled.v1.0.json` 成功
- 驗證所有字段（questions、scoring、recommendations、narratives、riskchains）正確解析
- 驗證基本的容錯能力（fallback 值）

### Gate #2：CN/EN 即時切換

- [ ] 切換語言時頁面 **不 Reload**
- [ ] 所有靜態 UI、動態敘事文字皆即時更新
- [ ] 英文內容顯示完整，非逐字翻譯腔（原生語感）

**驗收證據要求**：
- 手動切換語言（CN ↔ EN），驗證所有文字（題目、結果、按鈕、UI 標籤）即時更新
- 驗證英文敘事具原生語感（不得逐字翻譯腔）

### Gate #3：Stage 2 儀式介面（Radial Compass）

- [ ] 介面呈現放射狀 / 同心圓結構（非 Grid/List/Form）
- [ ] 使用者可完成 2–3 個符碼的「凝視與選取」流程（點亮 + 吸附中央）
- [ ] 手機端可單手操作（旋盤/撥動模式或等效方案）
- [ ] **❌ 紅線檢核**：無問卷化控制元件（checkbox、slider、likert）

**驗收證據要求**：
- 驗證羅盤介面正確顯示（20–30 個符碼，同心圓軌道）
- 驗證符碼選取功能（點擊後點亮並吸附至中央）
- 驗證手機端旋盤適配基本可用

### Gate #4：L1–L4 結果呈現

- [ ] L1→L2→L3→L4 的揭示順序正確鎖定
- [ ] L3（干擾/盲點）必須經由使用者 **主動互動** 才能揭示（點擊/長按/展開）
- [ ] UI/原始碼/畫面中無任何內部計算欄位外洩

**驗收證據要求**：
- 驗證 L1–L4 分層呈現邏輯（L1 → L2 → L3 → L4）
- 驗證 L3 主動揭示機制（點擊/長按/展開）
- 驗證不顯示未轉譯的內部數據（Severity、Attribution、Coping 等）

### Gate #5：高風險覆蓋（Hard Logic）

- [ ] 可透過人工設定觸發 `risk_level = HIGH`（資料或測試開關）
- [ ] 觸發後，L4 強制顯示指定的安全模板（Template A/B，含 CN/EN）
- [ ] 動態生成的 L4 內容被完全忽略/不渲染

**驗收證據要求**：
- 人工設置 `risk_level: HIGH`（可在 `compiled_facet.json` 中設定或通過 UI 模擬）
- 驗證 L4 顯示安全語句：
  - CN：「宜暫停自判，轉向外部守護者。」
  - EN：「Seek an external keeper of balance.」
- 驗證動態生成的 L4 被忽略

### Gate #6：視覺解耦（Theme Config）

- [ ] 在不修改程式碼的情況下，僅修改 JSON `theme_config` 即可更換主題（至少背景/字體/配色任一生效）
- [ ] `theme_config` 缺失或錯誤時，UI 自動回退至「中性玄學皮層（Neutral Ritual Skin）」
- [ ] 視覺變化（字體、顏色、背景）未影響敘事結構與文字內容

**驗收證據要求**：
- 準備兩組不同的 `theme_config`（例如：農耕主題 vs 海洋主題）
- 在不修改前端程式碼的情況下，切換 `theme_config`
- 驗證視覺風格正確切換（背景/字體/配色至少一項生效）
- 驗證視覺變化不影響敘事結構與文字內容

**驗收標準可操作化說明**：
- 將 Gate 從「策略描述」轉化為「檢核清單（Checklist）」
- 這直接對應了最後的驗收報告需求，確保驗收過程可追溯、可審計

---

## 七、執行順序與風險控管（Execution Roadmap）

### 7.1 已確認執行順序（Sprint Order）

1. **Foundation**：建立 `ui/` 骨架 + `umip_schema_v1.json`
2. **Core Engine**：`FacetLoader` + `ThemeEngine`（含 Fail-soft）
3. **Stage 2**：`RadialCompass`（先 mobile 可用，再 desktop 完整）
4. **Stage 4**：L1–L4 分層呈現 + `RiskOverride`
5. **Integration**：i18n 全流程整合 + Gate 逐條驗收

### 7.2 主要風險與工程對策

| 風險 | 工程對策 |
| --- | --- |
| **羅盤退化成問卷** | 開發前進行結構審查：是否能被線性填答；禁止列表化 DOM 結構；確保 SVG/DOM 結構無法被線性填答 |
| **英文敘事失真** | 英文文案視為獨立內容資產（Key-Value），不依賴機器翻譯；不依賴機器直翻 |
| **高風險漏蓋** | 實作 Middleware 攔截器，其優先級高於任何渲染邏輯；`RiskOverride` 作為渲染前 middleware，優先級最高 |
| **主題破圖/缺字** | 實作 `onerror` 事件與 CSS Fallback，確保流程不中斷；資產失敗只降級，不阻斷流程 |

---

## 八、驗收與結案方式（Acceptance & Closure）

### 8.1 必交文件與證據

工程結束時，必須提交：**`P0-5/P0-5_IMPLEMENTATION_ACCEPTANCE_REPORT.md`**

**內容至少包含**：

1. 上述 6 項 Gate 的逐項勾選結果（✅ 通過 / ❌ 失敗）
2. 每項 Gate 的測試方法與步驟記錄
3. 高風險覆蓋機制的實測截圖/錄影/可重跑步驟
4. 主題切換（Theme A vs Theme B）的對照證明
5. 已知問題與後續改進計劃

**最低證據要求**：
- 6 Gate 勾選結果（✅/❌）
- 高風險覆蓋前後對照（截圖/錄影/可重跑步驟）
- `theme_config` 切換對照（至少兩組 theme）

### 8.2 結案語義聲明（Governance Statement）

**P0-5 結案代表**：
- UMIP v1.0 **「可被實作且不自相矛盾」**
- 形成可被使用者體驗到的流程
- 工程實作與專案治理的嚴肅性取得平衡

**P0-5 結案不代表**：
- ❌ 產品完成
- ❌ UX 定型
- ❌ 商業就緒

---

## 九、變更控制與回滾機制（Revision Control & Rollback Strategy）

### 9.1 修訂原則

**本文件允許修訂，但必須**：

1. **新增 Addendum（補充條款）或 ADR（技術決策記錄）**
2. **清楚寫出**：
   - 變更原因
   - 影響範圍
   - 回滾方式
   - 對 Gate 的影響評估
3. **禁止**：直接覆寫本文件歷史內容而不留痕

### 9.2 回滾機制（Rollback Strategy）

**可回滾的決策與範圍**：

1. **技術決策回滾**：
   - 前端框架選擇（需 ADR 記錄）
   - 項目結構決策（需 ADR 記錄）
   - 執行順序調整（需 Addendum 記錄）
   - **回滾方式**：更新 ADR/Addendum，說明回滾原因與新方案
   - **影響範圍**：僅影響技術實現，不影響 UMIP 規格

2. **驗收標準回滾**（需謹慎）：
   - 6 項 MVP Gate 的具體驗收要求（需先更新結案報告並獲得批准）
   - **回滾方式**：需先更新 `P0-5/P0-5_UMIP_CLOSURE_REPORT.md` 並獲得批准
   - **影響範圍**：影響驗收標準，需與專案治理對齊

3. **執行報告回滾**：
   - 所有技術決策與執行順序均可根據實際情況調整
   - **回滾方式**：新增 Addendum/ADR，記錄回滾原因與新方案
   - **影響範圍**：僅影響工程實作流程，不影響最終交付物

**不可回滾的決策**（需最高層級批准）：

- UMIP 核心規格（需更新結案報告）
- 終極目標（需更新 `charter/CHARTER.md`，需使用者批准）
- 絕對紅線（需更新結案報告，需使用者批准）

### 9.2 變更記錄格式

任何變更應以以下格式記錄：

```markdown
## Addendum / ADR: [變更標題]
**日期**：YYYY-MM-DD
**變更原因**：[原因說明]
**影響範圍**：[受影響的 Gate / 交付物]
**對 Gate 的影響評估**：[影響評估]
**回滾方式**：[如何回滾]
```

---

## 十、文件狀態聲明（Status）

### 10.1 文件狀態

- ✅ **可寫入**：工程團隊可依此執行
- ✅ **可引用**：驗收人員可依此檢核
- ✅ **可審計**：具備審計效力，可追溯
- 🔄 **允許修訂**：但需記錄（需透過 Addendum 方式）
- 📌 **描述工程事實**：不預測未來

### 10.2 簽署狀態

**Role**: UMIP Interface Implementation Integrator  
**Date**: 2026-01-10  
**Status**: **READY FOR CODING / GOVERNANCE-SAFE**

---

## 十一、附錄：相關文件索引

### 11.1 核心依據文件

- **結案報告**：`P0-5/P0-5_UMIP_CLOSURE_REPORT.md` v1.0（**開發與驗收的唯一依據**）
- **工程實作任務包**：`P0-5/P0-5_IMPLEMENTATION_TASK_PACKET.md` v1.0（背景與歷史狀態）

### 11.2 設計規格文件

- **UI 架構設計**：`P0-5/P0-5_UI_ARCHITECTURE.md`
- **UI 串接規格**：`P0-5/P0-5_UI_INTEGRATION_SPEC.md`
- **分流系統設計**：`P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`

### 11.3 數據結構與 Schema

- **Compiled Facet Schema**：`schemas/compiled_facet.schema.json`
- **Compiled Facet 實例**：`domain/compiled/stress_recovery.compiled.v1.0.json`
- **評分引擎**：`engine/score_facet.py`（評分邏輯參考）

### 11.4 敘事規格與安全規範

- **敘事銳利度指標**：`P0-3/R1_METRICS_V1_EXECUTABLE_SPEC.md`
- **禁用詞表與高風險模板**：`P0-3/R2_METAPHOR_BOUNDARY_BANLIST_HIGHRISK_TEMPLATES.md`

---

**本文件版本**：v3.0 FINAL  
**建立日期**：2026-01-10  
**狀態**：EXECUTING（工程執行中）

**— 本文件遵循 `P0-5/P0-5_UMIP_CLOSURE_REPORT.md` v1.0 與 `P0-5/P0-5_IMPLEMENTATION_TASK_PACKET.md` v1.0 規範。**

**— 本文件將工程實作的具體性與專案治理的嚴肅性取得完美平衡。**

