# P0-5 技術規格文件補充任務 追問包（Query Packet）

**狀態**：ACTIVE | URGENT | EDITABLE

**建立日期**：2026-01-10

**版本**：v1.0

**任務類型**：追問與補充（Query & Supplement）

**目標受眾**：GPT（技術理解與升華）、Gemini（技術方案發散與細節補齊）

---

## ⚠️ 重要聲明：文件存在性驗證未通過

**審核發現**：
- 結案報告聲稱已產出 7 份 SPEC 文件（SPEC-1 至 SPEC-7）
- 但實際檢查發現：**所有 7 份文件均不存在於 `P0-5/` 目錄**
- **因此，結案報告標註為「待驗證」狀態，需實際產出文件後才能正式結案**

**本追問包的目的**：
- 明確指出問題：文件不存在
- 要求實際產出所有 7 份 SPEC 文件
- 提供完整的背景資料與參考資料，確保文件品質

---

**文件放置規範**：請參考 `docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`

---

## 一、問題說明（Problem Statement）

### 1.1 審核結果

**結案報告提交日期**：2026-01-10  
**審核日期**：2026-01-10  
**審核者**：總工程師（Cursor）

**審核結論**：⚠️ **待驗證（文件存在性驗證未通過）**

**審核意見**：
- ✅ 結案報告格式完整、內容結構良好
- ✅ 結案報告聲稱已完成所有任務要求
- ❌ **但實際驗證發現：所有 7 份 SPEC 文件均不存在於指定路徑**
- ❌ **無法驗證文件內容是否達到「可直接工程實作」水準**

### 1.2 驗證結果詳情

**文件存在性驗證（2026-01-10）**：

| SPEC ID | 文件路徑 | 聲稱狀態 | 實際狀態 | 驗證結果 |
|---------|---------|---------|---------|---------|
| SPEC-1 | `P0-5/P0-5_TECHNICAL_ARCHITECTURE.md` | ✅ 已完成 | ❌ 不存在 | **未通過** |
| SPEC-2 | `P0-5/P0-5_DATA_STRUCTURE_SPEC.md` | ✅ 已完成 | ❌ 不存在 | **未通過** |
| SPEC-3 | `P0-5/P0-5_IMPLEMENTATION_GUIDE.md` | ✅ 已完成 | ❌ 不存在 | **未通過** |
| SPEC-4 | `P0-5/P0-5_COMPONENT_SPEC_COMPASS.md` | ✅ 已完成 | ❌ 不存在 | **未通過** |
| SPEC-5 | `P0-5/P0-5_LOGIC_SPEC_RISK_RESULT.md` | ✅ 已完成 | ❌ 不存在 | **未通過** |
| SPEC-6 | `P0-5/P0-5_TECHNICAL_RISKS.md` | ✅ 已完成 | ❌ 不存在 | **未通過** |
| SPEC-7 | `P0-5/P0-5_TESTING_STRATEGY.md` | ✅ 已完成 | ❌ 不存在 | **未通過** |

**驗證命令**：
```bash
cd xuance-commander-core/P0-5
for file in P0-5_TECHNICAL_ARCHITECTURE.md P0-5_DATA_STRUCTURE_SPEC.md P0-5_IMPLEMENTATION_GUIDE.md P0-5_COMPONENT_SPEC_COMPASS.md P0-5_LOGIC_SPEC_RISK_RESULT.md P0-5_TECHNICAL_RISKS.md P0-5_TESTING_STRATEGY.md; do
  test -f "$file" && echo "✅ $file 存在" || echo "❌ $file 不存在"
done
```

**驗證結果**：所有 7 份文件均顯示「❌ 不存在」

### 1.3 問題影響

**無法驗證的項目**：
1. ❌ 文件內容是否完整（是否包含結案報告聲稱的所有內容）
2. ❌ 文件品質是否達到「可直接工程實作（Cursor-Executable）」水準
3. ❌ Stage 3 規格細節是否完整（是否在 SPEC-5 中）
4. ❌ Stage 1 接口預留機制是否明確（是否在 SPEC-1 中）
5. ❌ RiskOverride Interceptor 邏輯是否完整（是否在 SPEC-5 中）
6. ❌ 絕對紅線是否完整落實（是否在所有 SPEC 文件中）

**對專案進度的影響**：
- P0-5 技術規格設計階段（含補充任務）無法正式結案
- 無法進入工程實作階段（缺少詳細技術規格文件）
- 專案進度受阻

---

## 二、必須完成的工作（Required Work）

### 2.1 立即行動：產出所有 7 份 SPEC 文件

**必須產出的文件清單**：

1. **SPEC-1: 技術架構設計文件**
   - **文件路徑**：`P0-5/P0-5_TECHNICAL_ARCHITECTURE.md`
   - **必須包含**：
     - 整體架構圖（四層架構：Adapters / Engine / Components / Assets）
     - Adapter Pattern 資料流詳解（Compiled Facet JSON → Adapter → ViewModel → Pure View Components）
     - 狀態管理設計（Global State: `locale`, `themeResolved`, `riskResolved`）
     - **Stage 1 接口預留機制**（Router 接口、Data 接口、Component 接口）
   - **參考資料**：見本追問包第 5 章

2. **SPEC-2: 資料結構規格**
   - **文件路徑**：`P0-5/P0-5_DATA_STRUCTURE_SPEC.md`
   - **必須包含**：
     - UMIP Schema v1 完整 JSON Schema 定義（可機器驗證）
     - i18n 資料結構設計（CN/EN 雙語組織方式）
     - `theme_config` 完整結構設計（隱喻解耦、Fail-soft）
     - 至少 2 組完整 JSON 範例（Normal Risk / High Risk）
   - **參考資料**：見本追問包第 5 章

3. **SPEC-3: 實作指南**
   - **文件路徑**：`P0-5/P0-5_IMPLEMENTATION_GUIDE.md`
   - **必須包含**：
     - `ui/` 目錄結構設計與職責說明
     - i18n No-reload 實作路徑（即時切換方案、原生語感保證機制）
     - Theme Engine 實作指南（讀取、注入、降級、Neutral Skin）
     - 關鍵流程偽代碼（Cursor 友善）
   - **參考資料**：見本追問包第 5 章

4. **SPEC-4: Stage 2 羅盤組件規格**
   - **文件路徑**：`P0-5/P0-5_COMPONENT_SPEC_COMPASS.md`
   - **必須包含**：
     - SVG 放射狀/同心圓布局算法（符碼分布、位置計算）
     - 互動邏輯設計（點擊、選取、吸附、確認）
     - RWD 適配方案（桌面端、手機端旋盤模式、平板端）
     - 動畫策略（符碼點亮、飛入、吸附）
     - 絕對紅線檢查（防止問卷化退化）
   - **參考資料**：見本追問包第 5 章

5. **SPEC-5: Risk 邏輯與結果呈現規格（含 Stage 3）** ⭐ **重點**
   - **文件路徑**：`P0-5/P0-5_LOGIC_SPEC_RISK_RESULT.md`
   - **必須包含**：
     - **RiskOverride Interceptor 邏輯設計**：
       - 攔截點位置（Adapter Output → Risk Interceptor → Store.setState() → View Render）
       - 覆蓋行為（HIGH Risk：原 L4 完全丟棄，僅注入 Template A/B）
       - FOUC 防護機制（動態 L4 內容永不進入 UI State）
     - **L1-L4 結果分層揭示邏輯**：
       - 揭示順序鎖定（L1 → L2 → L3 → L4）
       - L3 主動揭示機制（點擊/長按/展開）
       - 高風險鎖定機制
       - 動畫策略
     - **Stage 3 投射定歸因詳細技術規格** ⭐ **重點補充項**：
       - 投射卡片元件設計（卡片結構、題目資料結構、選項呈現方式）
       - 互動邏輯設計（單選/多選、選項點擊、答案收集、轉場動畫）
       - 流程控制設計（題目順序、完成判斷、答案提交時機）
       - RWD 適配（桌面端、手機端、平板端）
       - 絕對紅線檢查（無數值評分、無問卷化控件）
   - **參考資料**：見本追問包第 5 章

6. **SPEC-6: 技術風險評估**
   - **文件路徑**：`P0-5/P0-5_TECHNICAL_RISKS.md`
   - **必須包含**：
     - 技術風險清單（性能、相容性、可維護性、可擴展性、實作風險）
     - 對策與緩解方案（針對每個風險的具體對策）
     - 對 6 項 MVP Gate 驗收的影響評估
   - **參考資料**：見本追問包第 5 章

7. **SPEC-7: 測試策略**
   - **文件路徑**：`P0-5/P0-5_TESTING_STRATEGY.md`
   - **必須包含**：
     - 6 項 MVP Gate 的測試用例設計（含可重跑證據要求）
     - 絕對紅線的測試驗證方法（DOM 掃描、Network Payload、Store/Console 檢查）
     - 測試策略（單元測試、整合測試、E2E 測試）
     - 測試工具與環境設定
   - **參考資料**：見本追問包第 5 章

### 2.2 文件品質要求

**所有產出的 SPEC 文件必須**：

1. **達到「可直接工程實作（Cursor-Executable）」水準**
   - 不得有「待確定」「待討論」的模糊地帶
   - 必須提供明確的技術規格或實作指南
   - 必須確保 Cursor 可直接依此實作（無需額外猜測）

2. **符合專案約束與絕對紅線**
   - 所有技術規格必須符合 UMIP 規格
   - 所有技術規格必須符合絕對紅線（互動、數據遮罩、安全）
   - 所有技術規格必須通過 6 項 MVP Gate 的驗收

3. **可追溯與可審計**
   - 所有技術規格必須有明確的決策依據（引用技術規格結案包、UMIP 結案報告等）
   - 所有技術方案必須說明其優劣與適用場景
   - 所有技術風險必須有對策與緩解方案

4. **符合文件放置規範**
   - 所有文件必須放置在 `P0-5/` 目錄下
   - 文件路徑必須符合 `docs/governance/CURSOR_FILE_PLACEMENT_RULE.md` 規範
   - 文件命名必須符合規範（見上）

5. **包含必要的元數據**
   - 文件首頁應包含：
     - `Status: ACTIVE · EDITABLE · REFERENCE`
     - 版本號（v1.0）
     - 建立日期
     - 可追溯性聲明（引用上游文件）

---

## 三、與主任務的對齊關係

### 3.1 主任務回顧

**主任務**：P0-5 技術規格文件補充任務

**主任務任務包**：`docs/task_packets/advisor/task_packages/P0-5_TECHNICAL_SPEC_SUPPLEMENT_TASK_PACKET.md` v1.0

**主任務要求**：
- 產出 7 份核心技術規格文件（SPEC-1 至 SPEC-7）
- 補充 Stage 3 投射定歸因詳細技術規格（重點補充項）
- 補充 Stage 1 接口預留機制設計（重點補充項）

**主任務狀態**：⚠️ **待驗證** - 結案報告聲稱完成，但文件不存在

### 3.2 本追問包的目標

**本追問包是主任務的延續**，目標是：
1. 明確指出問題（文件不存在）
2. 要求實際產出所有 7 份 SPEC 文件
3. 確保文件品質達到「可直接工程實作」水準
4. 完成主任務的所有要求後，正式結案

### 3.3 完成標準

**本追問包視為完成，當且僅當**：

1. ✅ 所有 7 份 SPEC 文件都存在於指定路徑（可通過文件存在性驗證）
2. ✅ 所有文件內容完整（包含主任務要求的所有內容）
3. ✅ 所有文件品質達到「可直接工程實作」水準
4. ✅ Stage 3 規格細節完整（在 SPEC-5 中）
5. ✅ Stage 1 接口預留機制明確（在 SPEC-1 中）
6. ✅ 絕對紅線完整落實（在所有相關 SPEC 文件中）
7. ✅ 更新結案報告為「正式結案」狀態

---

## 四、背景資料與已完成成果

### 4.1 技術規格結案包（核心依據）

**文件位置**：`P0-5/P0-5_TECHNICAL_SPEC_CLOSURE_PACK.md` v1.0

**內容摘要**：
- 8 個核心交付物的驗收標準（D1-D8）
- 7 份規格文件的產出要求清單（SPEC-1 至 SPEC-7）
- 核心技術決策（React + Vite, Zustand, Adapter Pattern）
- 絕對紅線與工程約束（互動、數據遮罩、安全）
- 6 項 MVP Gate 驗收標準（含可重跑證據要求）
- 工程執行順序建議

**關鍵技術亮點**：
- ✅ RiskOverride 的 Interceptor 模式修正（避免 FOUC）
- ✅ 數據遮罩紅線的詳細程度（涵蓋 Console Log、Network Payload 等）
- ✅ 絕對紅線的明確性（互動、數據遮罩、安全三條紅線）

### 4.2 UMIP 結案報告（基本規格依據）

**文件位置**：`P0-5/P0-5_UMIP_CLOSURE_REPORT.md` v1.0

**內容摘要**：
- Stage 1-4 的基本 UI 規格
- L1-L4 結果呈現規格
- 絕對紅線與硬規則
- 6 項 MVP Gate 驗收標準

**Stage 3 基本規格**（需要深化為詳細技術規格）：
- UI：投射卡片，一題一頁
- 互動：直覺選擇（象/狀態），不得出現數值評分
- 對應：任務包「Stage 3：萬象定歸因（具體題目回答）」

**Stage 1 基本策略**（需要具體化為接口設計）：
- P0-5 策略：若資源允許則實作；否則可由 Stage 2 直接啟動（仍需預留接口）
- UI：八卦轉輪或星圖（占位即可）
- 彈性空間：若時間不足，可簡化為「直接進入 Stage 2」的入口

### 4.3 工程執行報告（交付物與執行順序依據）

**文件位置**：`P0-5/P0-5_IMPLEMENTATION_EXECUTION_REPORT.md` v3.0

**內容摘要**：
- 8 個核心交付物清單（D1-D8）
- 技術決策狀態說明（已鎖定 vs 可替換）
- 執行順序與風險控管策略
- 6 項 MVP Gate 的工程化檢核定義

### 4.4 補充任務包（詳細需求依據）

**文件位置**：`docs/task_packets/advisor/task_packages/P0-5_TECHNICAL_SPEC_SUPPLEMENT_TASK_PACKET.md` v1.0

**內容摘要**：
- 完整的專案背景與歷史任務回顧
- 7 份規格文件的詳細產出要求（第 6 章）
- Stage 3 和 Stage 1 的補充要求（重點補充項）
- 完整的參考資料索引

---

## 五、參考資料索引（Complete Reference Index）

### 5.1 權威設計文件（必須參考）

1. **`P0-5/P0-5_TECHNICAL_SPEC_CLOSURE_PACK.md`** v1.0
   - 技術規格結案包（絕對權威依據）
   - 包含核心技術決策、驗收標準、絕對紅線、7 份規格文件清單

2. **`P0-5/P0-5_UMIP_CLOSURE_REPORT.md`** v1.0
   - UMIP v1.0 結案報告（Stage 1-4 基本規格、L1-L4 結果呈現規格）

3. **`P0-5/P0-5_IMPLEMENTATION_EXECUTION_REPORT.md`** v3.0
   - 工程執行報告（8 個交付物、執行順序、風險控管）

4. **`P0-5/P0-5_UI_ARCHITECTURE.md`**
   - UI 架構設計（Layer 0-6 架構、技術立場、資料流設計）

5. **`P0-5/P0-5_UI_INTEGRATION_SPEC.md`**
   - UI 串接規格（UI 角色定位、全流程模組分層）

### 5.2 相關設計文件（上下文參考）

1. **`P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`**
   - 4-Stage 分流系統設計（Stage 設計參考）

2. **`P0-3/R2_METAPHOR_BOUNDARY_BANLIST_HIGHRISK_TEMPLATES.md`**
   - 高風險模板定義（Template A/B 參考）

3. **`schemas/compiled_facet.schema.json`**
   - 基本 Schema（需擴展為 UMIP Schema v1）

4. **`domain/compiled/stress_recovery.compiled.v1.0.json`**
   - 範例 Compiled Facet（資料結構參考，需擴展）

5. **`prototype/app.js`**
   - 現有原型代碼（邏輯參考，需重構）

### 5.3 主任務相關文件

1. **`docs/task_packets/advisor/task_packages/P0-5_TECHNICAL_SPEC_SUPPLEMENT_TASK_PACKET.md`** v1.0
   - 補充任務包（詳細需求依據）

2. **`P0-5/P0-5_TECHNICAL_SPEC_SUPPLEMENT_CLOSURE_REPORT.md`**
   - 補充任務結案報告（待驗證狀態）

### 5.4 治理文件（確保符合規範）

1. **`docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`**
   - 文件放置規範（產出文件必須符合）

2. **`docs/governance/CURSOR_GPT_GEMINI_COLLABORATION_FRAMEWORK.md`**
   - 協作框架（任務包格式參考）

---

## 六、關鍵技術約束與絕對紅線（必須遵守）

### 6.1 絕對紅線（任何違反皆視為 Bug）

**詳細說明見技術規格結案包第 4 章「絕對紅線與工程約束」**：

#### 互動紅線 (Interaction Red Lines)
- ❌ 禁止問卷化、量化暗示
- ✅ 必須：凝視、直覺選擇、儀式感互動

#### 數據遮罩紅線 (Data Masking)
- ❌ 禁止：前端記憶體、DOM、Network Payload、Console Log、Error Reporting 中出現內部計算值
- ✅ 僅允許：封裝後的 `narrative_text`、`visual_id`

#### 安全紅線 (Safety Protocols)
- ❌ 禁止：`risk_level = HIGH` 時顯示動態生成的 L4
- ✅ 必須：強制顯示靜態安全模板（Template A/B）

### 6.2 技術約束（必須符合）

**詳細說明見技術規格結案包第 1 章「核心技術決策」**：

- ✅ Component-Based Architecture（組件化架構）
- ✅ Adapter Pattern（必須）
- ✅ React + Vite（預設，可替換但需 ADR）
- ✅ Zustand（約束，Global State 僅限 `locale`, `themeResolved`, `riskResolved`）
- ✅ SVG 為 Stage 2 核心渲染技術（已鎖定）

---

## 七、產出要求與驗收標準

### 7.1 文件產出要求

**必須產出以下 7 份 SPEC 文件**：

| ID | 文件路徑 | 文件名稱 | 必須包含的內容 | 優先級 |
| --- | --- | --- | --- | --- |
| **SPEC-1** | `P0-5/P0-5_TECHNICAL_ARCHITECTURE.md` | 技術架構設計文件 | 整體架構、Adapter 詳解、Stage 1 接口預留機制 ⭐ | 🔥 **最高** |
| **SPEC-2** | `P0-5/P0-5_DATA_STRUCTURE_SPEC.md` | 資料結構規格 | UMIP Schema v1、i18n 結構、`theme_config` 結構、2 組範例 JSON | 🔥 **最高** |
| **SPEC-5** | `P0-5/P0-5_LOGIC_SPEC_RISK_RESULT.md` | Risk 邏輯與結果呈現規格 | RiskOverride Interceptor、L1-L4 揭示順序、**Stage 3 詳細技術規格** ⭐ | 🔥 **最高** |
| **SPEC-4** | `P0-5/P0-5_COMPONENT_SPEC_COMPASS.md` | Stage 2 羅盤組件規格 | SVG 結構、互動邏輯、RWD 適配、動畫策略 | 🔶 **高** |
| **SPEC-3** | `P0-5/P0-5_IMPLEMENTATION_GUIDE.md` | 實作指南 | 目錄結構、i18n 實作指南、Theme Engine 實作指南 | 🔶 **高** |
| **SPEC-6** | `P0-5/P0-5_TECHNICAL_RISKS.md` | 技術風險評估 | 風險清單、對策與緩解方案、對 MVP Gate 的影響 | 🔷 **中** |
| **SPEC-7** | `P0-5/P0-5_TESTING_STRATEGY.md` | 測試策略 | 6 項 MVP Gate 測試用例、絕對紅線測試驗證方法、測試策略 | 🔷 **中** |

**說明**：
- 🔥 **最高優先級**：SPEC-1（含 Stage 1 接口）、SPEC-2（資料結構基礎）、SPEC-5（含 Stage 3 詳細規格）
- 🔶 **高優先級**：SPEC-3（實作指南）、SPEC-4（Stage 2 組件規格）
- 🔷 **中優先級**：SPEC-6（風險評估）、SPEC-7（測試策略）

### 7.2 驗收標準

**文件存在性驗證**（必須通過）：
```bash
cd xuance-commander-core/P0-5
for file in P0-5_TECHNICAL_ARCHITECTURE.md P0-5_DATA_STRUCTURE_SPEC.md P0-5_IMPLEMENTATION_GUIDE.md P0-5_COMPONENT_SPEC_COMPASS.md P0-5_LOGIC_SPEC_RISK_RESULT.md P0-5_TECHNICAL_RISKS.md P0-5_TESTING_STRATEGY.md; do
  test -f "$file" && echo "✅ $file" || echo "❌ $file MISSING"
done
```

**文件內容完整性驗證**（必須通過）：
1. ✅ SPEC-1 包含 Stage 1 接口預留機制設計
2. ✅ SPEC-5 包含 Stage 3 投射定歸因詳細技術規格
3. ✅ SPEC-5 包含 RiskOverride Interceptor 邏輯設計（避免 FOUC）
4. ✅ 所有文件包含明確的技術規格或實作指南
5. ✅ 所有文件符合絕對紅線與技術約束
6. ✅ 所有文件達到「可直接工程實作」水準

**文件品質驗證**（必須通過）：
1. ✅ 無「待確定」「待討論」的模糊地帶
2. ✅ 包含明確的驗收標準或驗證方法
3. ✅ 包含必要的元數據（Status、版本號、日期）
4. ✅ 符合文件放置規範

### 7.3 完成確認流程

**完成後必須**：
1. 執行文件存在性驗證（確保所有文件存在）
2. 執行文件內容完整性驗證（確保內容完整）
3. 執行文件品質驗證（確保品質達標）
4. 更新結案報告為「正式結案」狀態
5. 更新階段日誌記錄補充任務完成

---

## 八、結語與期待

### 8.1 本次追問的重要性

**本次追問包是主任務的關鍵延續**：
- **上游**：補充任務包已建立，結案報告已提交（但文件不存在）
- **當前**：需要實際產出所有 7 份 SPEC 文件，確保文件存在性與內容完整性
- **下游**：文件產出後，可正式結案並進入工程實作階段

**文件品質將直接影響**：
- 工程實作的效率與品質
- MVP Gate 驗收的順利程度
- 後續迭代與優化的可維護性

### 8.2 對 GPT 的期待

**請以「技術架構師」的視角**，產出以下文件：

- **SPEC-1**: 技術架構設計文件（含 Stage 1 接口預留機制）
- **SPEC-2**: 資料結構規格（UMIP Schema v1 完整定義）
- **SPEC-4**: Stage 2 羅盤組件規格（SVG 結構、互動邏輯、RWD 適配）
- **SPEC-5**: Risk 邏輯與結果呈現規格（含 Stage 3 詳細技術規格、RiskOverride Interceptor）

### 8.3 對 Gemini 的期待

**請以「技術實現顧問」的視角**，產出以下文件：

- **SPEC-3**: 實作指南（目錄結構、i18n 實作指南、Theme Engine 實作指南）
- **SPEC-6**: 技術風險評估（風險清單、對策與緩解方案）
- **SPEC-7**: 測試策略（6 項 MVP Gate 測試用例、絕對紅線測試驗證方法）

### 8.4 共同期待

**無論是 GPT 還是 Gemini，都應產出**：

1. **實際存在的文件**（可通過文件存在性驗證）
2. **完整且詳細的技術規格**（無模糊地帶，可直接依此實作）
3. **符合專案約束與絕對紅線**（通過驗收）
4. **可追溯與可審計**（有決策依據）
5. **可修改與可回滾**（支援迭代）

**期待最終產出**：
- 7 份實際存在的 SPEC 文件，供 Cursor 直接依此實作
- Stage 3 投射定歸因的詳細技術規格，確保實作時有明確指引
- Stage 1 接口預留機制的設計，確保未來可擴展
- 所有文件品質達到「可直接工程實作」水準

---

**本追問包確認完畢，可交付 GPT 與 Gemini 進行實際文件產出。**

**追問包建立日期**：2026-01-10  
**追問包版本**：v1.0  
**追問包狀態**：ACTIVE | URGENT | EDITABLE

**審核日期**：2026-01-10  
**審核者**：總工程師（Cursor）  
**審核結論**：⚠️ **文件存在性驗證未通過** - 需要實際產出所有 7 份 SPEC 文件後才能正式結案。

