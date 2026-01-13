# 所有剩餘任務執行計劃

**建立日期**：2026-01-13  
**狀態**：READY FOR EXECUTION  
**目標**：完成所有剩餘任務，依照難易度和執行對象分類

---

## 📊 任務分析與分類

### 任務難易度評估

| 任務 | 難易度 | 執行對象 | 理由 |
|------|--------|----------|------|
| **1. Rigidity 預設值修正** | ⭐ 簡單 | Cursor（直接解決） | 單純的數值修正，無風險 |
| **2. ADR_0005 標準差模式更新** | ⭐ 簡單 | Cursor（直接解決） | 文件更新，無風險 |
| **3. Legacy Facet 遷移（9 個）** | ⭐⭐⭐ 中等 | GPT/GEMINI（任務執行者） | 需要批量處理，但規則明確 |
| **4. 五行「洩」關係實作決策** | ⭐⭐⭐⭐ 困難 | Gemini（顧問） | 需要專業評估和設計 |
| **5. 角色原型參數矩陣實作決策** | ⭐⭐⭐⭐ 困難 | Gemini（顧問） | 需要專業評估和設計 |
| **6. P0-12 階段二-4：規則與制度提取** | ⭐⭐⭐ 中等 | GPT/GEMINI（任務執行者） | 需要分析，但 Legacy 檔案未找到 |
| **7. 更新 CONSTITUTION 文件** | ⭐⭐ 簡單 | Cursor（直接解決） | 文件整合，無風險 |
| **8. 更新其他相關文件** | ⭐⭐ 簡單 | Cursor（直接解決） | 文件更新，無風險 |

---

## 🎯 執行策略

### 階段一：Cursor 直接解決（無風險任務）

**目標**：立即完成簡單且無風險的任務

**任務清單**：
1. ✅ Rigidity 預設值修正（0.5 → 0.0）
2. ✅ ADR_0005 標準差模式更新
3. ✅ 更新 CONSTITUTION 文件（整合通過項目）
4. ✅ 更新其他相關文件

**預估時間**：30 分鐘

---

### 階段二：任務執行者批量處理（中等難度）

**目標**：完成需要批量處理但規則明確的任務

**任務清單**：
1. Legacy Facet 遷移（9 個）
2. P0-12 階段二-4：規則與制度提取（如果找到 Legacy 檔案）

**執行對象**：GPT / GEMINI（任務執行者）

**預估時間**：2-3 小時

---

### 階段三：顧問團隊專業評估（困難任務）

**目標**：完成需要專業評估和設計的任務

**任務清單**：
1. 五行「洩」關係實作決策
2. 角色原型參數矩陣實作決策

**執行對象**：Gemini（顧問）

**預估時間**：等待裁示後實作

---

## 📦 任務包設計

### 任務包 1：Cursor 直接解決包（立即執行）

**狀態**：✅ **可直接執行**

**任務**：
1. Rigidity 預設值修正
2. ADR_0005 標準差模式更新
3. 更新 CONSTITUTION 文件
4. 更新其他相關文件

**詳細內容**：見下方「任務包 1 詳細內容」

---

### 任務包 2：Legacy Facet 遷移包（任務執行者）

**狀態**：⏳ **等待執行**

**任務**：Legacy Facet 遷移（9 個）

**執行對象**：GPT / GEMINI（任務執行者）

**詳細內容**：見下方「任務包 2 詳細內容」

---

### 任務包 3：P0-12 階段二-4 規則提取包（任務執行者）

**狀態**：⏳ **等待執行（受阻）**

**任務**：P0-12 階段二-4：規則與制度提取

**執行對象**：GPT / GEMINI（任務執行者）

**詳細內容**：見下方「任務包 3 詳細內容」

---

### 任務包 4：五行「洩」關係決策包（顧問）

**狀態**：⏳ **等待裁示**

**任務**：五行「洩」關係實作決策

**執行對象**：Gemini（顧問）

**詳細內容**：見下方「任務包 4 詳細內容」

---

### 任務包 5：角色原型參數矩陣決策包（顧問）

**狀態**：⏳ **等待裁示**

**任務**：角色原型參數矩陣實作決策

**執行對象**：Gemini（顧問）

**詳細內容**：見下方「任務包 5 詳細內容」

---

## 📋 任務包詳細內容

### 任務包 1：Cursor 直接解決包

#### 任務 1.1：Rigidity 預設值修正

**目標**：統一 Rigidity 預設值為 0.0

**需要修改的檔案**：
1. `engine/score_facet.py`
   - Line 52：`default_when_missing: float = 0.5` → `0.0`
   - Line 110：`rigidity_default_when_missing = float(params.get("rigidity_default_when_missing", 0.5))` → `0.0`

2. `docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md`
   - Section 7.2：`rigidity_default_when_missing = 0.50` → `0.0`

**驗收標準**：
- ✅ `engine/score_facet.py` 的預設值為 0.0
- ✅ CONSTITUTION 文件的預設值為 0.0
- ✅ 所有相關文件一致

---

#### 任務 1.2：ADR_0005 標準差模式更新

**目標**：明確寫入「sample stddev」作為 SSOT

**需要修改的檔案**：
1. `docs/adr/ADR_0005_vector_state_scoring_engine.md`
   - 在 Section 1.3（2）Volatility Index 之後，新增「決策 3：Volatility 標準差模式」

**新增內容**：
```markdown
### 決策 3：Volatility 標準差模式（Volatility StdDev Mode）

**裁示（最終）**：採用 **sample stddev**（樣本標準差）作為 SSOT

**理由**：
- 符合統計學標準（樣本標準差用於樣本數據）
- 與 CONSTITUTION Section 3.2 一致
- 引擎實作預設為 sample stddev

**實作位置**：
- `engine/score_facet.py`：`volatility_stddev_mode` 參數預設為 `"sample"`
- 支援切換為 `"population"`，但預設固定為 `"sample"`

**對應 SSOT**：
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` Section 3.2
- `engine/score_facet.py` - `run_vector_state_v3` 函數
```

**驗收標準**：
- ✅ ADR_0005 包含標準差模式的決策記錄
- ✅ 決策記錄與 CONSTITUTION 和實作一致

---

#### 任務 1.3：更新 CONSTITUTION 文件

**目標**：整合 Gemini/GPT 方案的通過項目

**需要修改的檔案**：
1. `docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md`

**需要整合的項目**：
1. ✅ Domain Schema i18n 結構（Gemini 方案通過）
2. ✅ 題目數量規範（8 題固定）（Gemini 方案通過）
3. ⚠️ Rigidity 預設值（改為 0.0）（任務 1.1 完成後）

**驗收標準**：
- ✅ 所有通過項目已整合
- ✅ 衝突項目已解決

---

#### 任務 1.4：更新其他相關文件

**目標**：更新所有相關文件，確保一致性

**需要修改的檔案**：
1. `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md`
   - 更新 Section 3.2（Rigidity 預設值為 0.0）
   - 更新 Section 3.7（Params 預設值，`rigidity_default_when_missing: 0.0`）

2. `specs/integration/ui_engine/FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md`
   - 確認所有 V3 實作狀態標記為已完成

3. `docs/ops/TASK_RECORDS_SUMMARY.md`
4. `docs/ops/TASK_STATUS.md`
5. `memory/changes/CHANGELOG.md`
6. `memory/briefs/CURRENT.md`

**驗收標準**：
- ✅ 所有相關文件已更新
- ✅ 文件內容與實作一致

---

### 任務包 2：Legacy Facet 遷移包

**執行對象**：GPT / GEMINI（任務執行者）

**目標**：將 9 個 Legacy Facet 從 `weighted_sum` 遷移到 `vector_state_v3`

**待遷移的 Facet**（9 個）：
1. `stress_recovery`（2 題，需擴充到 8 題）
2. `chronic_depletion`（7 題，符合規範）
3. `identity_diffusion`（7 題，符合規範）
4. `fear_based_stability`（3 題，需擴充到 8 題）
5. `meaning_vacuum`（7 題，符合規範）
6. `suppressed_needs`（7 題，符合規範）
7. `chronic_alertness`（7 題，符合規範）
8. `hyper_responsibility`（7 題，符合規範）
9. `loss_of_agency`（7 題，符合規範）

**需要執行的行動**：

**步驟 1：檢查每個 Facet**
- 讀取每個 Facet 的 `scoring.v1.0.json`
- 確認題目數量（是否符合 6-10 題規範）
- 確認是否有 `exclude_from_volatility` 標記
- 確認是否有 `domainKey` 和 `questionSet`

**步驟 2：更新 Facet 配置**
- 更新 `scoring.model` 為 `"vector_state_v3"`
- 更新 `scoring.params` 包含 V3 參數：
  ```json
  "params": {
    "volatility_thresholds": [0.15, 0.35],
    "rigidity_weight": 0.10,
    "rigidity_frozen_threshold": 0.70,
    "volatility_stddev_mode": "sample",
    "rigidity_default_when_missing": 0.0
  }
  ```
- 確保所有題目都有 `exclude_from_volatility` 標記（根據題目類型：Validation/Resource 為 true，其他為 false）
- 更新 `domainKey` 和 `questionSet`（如果缺失）

**步驟 3：題目擴充（僅限 2 個 Facet）**
- `stress_recovery`：從 2 題擴充到 8 題
- `fear_based_stability`：從 3 題擴充到 8 題
- 需要參考 `domain/knowledge_base/question_design_guidelines.v1.0.md`
- 需要符合「去問卷化」原則和語境純粹性要求

**步驟 4：更新 Manifest**
- 檢查每個 Facet 的 manifest 文件
- 確保 manifest 包含 `domainKey` 和 `questionSet`

**步驟 5：驗證遷移**
- 執行測試確保遷移後的 Facet 可以正常運作
- 驗證計算結果的合理性

**驗收標準**：
- ✅ 所有 Legacy Facet 已遷移到 `vector_state_v3`
- ✅ 所有 Facet 配置符合 V3 規範
- ✅ 2 個 Facet 題數已擴充到 8 題
- ✅ 測試通過

**背景資料**：
- 現有 V3 Facet 範例：`domain/facets/burnout_syndrome.scoring.v1.0.json`
- 題目設計指南：`domain/knowledge_base/question_design_guidelines.v1.0.md`
- V3 引擎實作：`engine/score_facet.py` - `run_vector_state_v3` 函數
- Schema 定義：`schemas/compiled_facet.schema.json`

---

### 任務包 3：P0-12 階段二-4 規則提取包

**執行對象**：GPT / GEMINI（任務執行者）

**目標**：分析 Legacy 系統中的規則與制度，提取並整合到現有系統

**待完成工作**：
1. 分析 `intervention_boundary_matrix` 的規則
2. 提取 `guidancePrinciples` 的邏輯
3. 分析 `buildGuidance.js` 的決策邏輯
4. 建立呈現規則文件

**⚠️ 重要發現**：
- Legacy 資料夾 `docs/legacy/115_1_3_my-first-app_failed/` 不存在
- 無法找到 `intervention_boundary_matrix`, `guidancePrinciples`, `buildGuidance.js` 檔案

**需要執行的行動**：

**步驟 1：確認 Legacy 檔案位置**
- 搜尋整個專案，確認 Legacy 檔案是否存在
- 如果找不到，標記為「無法定位，待後續處理」

**步驟 2：分析規則邏輯**（如果找到檔案）
- 分析規則結構
- 提取邏輯
- 分析決策邏輯

**步驟 3：建立呈現規則文件**（如果找到檔案）
- 建立 `domain/knowledge_base/presentation_rules.v1.0.md` 或類似文件
- 整合規則邏輯到現有系統
- 確保規則符合現有 Schema 和架構

**步驟 4：驗證整合**（如果找到檔案）
- 驗證規則邏輯與現有系統的一致性
- 確保規則可以正常運作

**驗收標準**：
- ✅ 規則與制度已提取並整合（或標記為「無法定位，待後續處理」）
- ✅ 呈現規則文件已建立（或標記為「待 Legacy 文件定位後處理」）
- ✅ 規則邏輯與現有系統一致

**背景資料**：
- P0-12 Legacy 整合任務包：`specs/integration/ui_engine/P0-12_LEGACY_INTEGRATION_TASK_PACKET.md`
- Legacy 參考規則：`docs/governance/LEGACY_REFERENCE_RULES.md`
- 現有系統架構：`docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md`

---

### 任務包 4：五行「洩」關係決策包

**執行對象**：Gemini（顧問）

**目標**：評估是否需要引入「洩（Exhaustion）」路徑，擴充為雙向傳導

**問題**：
- 現有實作只有「剋（Overcomes）」路徑（`engine/cascade_calculator.py`）
- Gemini 方案引入「洩（Exhaustion）」路徑，提供完整的 5-Element 全循環矩陣
- 需要決定是否實作「洩」關係

**選項**：
- **選項 A**：採納「洩」路徑，建立 ADR，更新實作
  - 理由：更完整的五行理論，能解釋「資源耗盡」類型的連鎖反應；符合「準到發毛」的目標
  - 代價：需要更新 `cascade_calculator.py` 和 `cascade_overrides.v1.0.json`；可能產生更多警告（需要調整 Anti-Spam 規則）
- **選項 B**：暫時不採納，先驗證「剋」路徑是否足夠
  - 理由：現有「剋」路徑已能解釋大部分連鎖反應；避免過度複雜化
  - 代價：可能無法解釋「資源耗盡」類型的連鎖反應
- **選項 C**：採納但簡化（例如：只在特定條件下觸發「洩」路徑）
  - 理由：平衡完整性和複雜度
  - 代價：需要定義觸發條件

**需要執行的行動**（如果採用選項 A）：
- 建立 ADR
- 更新 `cascade_calculator.py`
- 更新 `cascade_overrides.v1.0.json`
- 調整 Anti-Spam 規則

**背景資料**：
- 現有 Cascade 實作：`engine/cascade_calculator.py`
- 現有覆寫表：`domain/cascade/cascade_overrides.v1.0.json`
- 五行知識庫：`domain/knowledge_base/wuxing_5_elements.v1.0.json`
- Gemini 追問包：`docs/task_packets/advisor/GEMINI_CONSTITUTION_QUESTIONS.md`
- CONSTITUTION：`docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md`

**驗收標準**：
- ✅ 決策已做出（選項 A/B/C）
- ✅ 如果採用選項 A，ADR 已建立，實作已更新
- ✅ 如果採用選項 B，維持現有實作
- ✅ 如果採用選項 C，觸發條件已定義，ADR 已建立，實作已更新

---

### 任務包 5：角色原型參數矩陣決策包

**執行對象**：Gemini（顧問）

**目標**：評估是否需要引入完整的角色原型參數矩陣

**問題**：
- CONSTITUTION V4 Section 5.1 提到「Role Archetype（可選或弱必填）：用於調整 `volatility_thresholds`」
- 但沒有具體的角色定義和參數矩陣
- Gemini 方案提供完整的 4 個角色原型（開拓者、守成者、謀略者、工匠）和參數矩陣

**選項**：
- **選項 A**：採納 4 個角色原型，建立 ADR，更新實作
  - 理由：更精準的個人化調整；符合「準到發毛」的目標
  - 代價：需要建立 ADR；需要更新 UI 加入角色選擇器；需要驗證參數值的合理性
- **選項 B**：暫時不採納，先驗證是否需要角色原型
  - 理由：現有系統已能運作；避免過度複雜化
  - 代價：可能無法提供個人化調整
- **選項 C**：採納但簡化（例如：只調整 `volatility_thresholds`，不調整 `rigidity_weight`）
  - 理由：平衡個人化和複雜度
  - 代價：功能較不完整

**需要執行的行動**（如果採用選項 A）：
- 建立 ADR
- 定義角色原型
- 建立參數矩陣
- 更新 UI（角色選擇器）
- 更新引擎實作

**背景資料**：
- CONSTITUTION V4：`docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md`
- Gemini 追問包：`docs/task_packets/advisor/GEMINI_CONSTITUTION_QUESTIONS.md`
- V3 引擎實作：`engine/score_facet.py` - `run_vector_state_v3` 函數
- UI 整合規範：`specs/integration/ui_engine/FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md`

**驗收標準**：
- ✅ 決策已做出（選項 A/B/C）
- ✅ 如果採用選項 A，ADR 已建立，角色原型已定義，參數矩陣已建立，UI 已更新，引擎實作已更新
- ✅ 如果採用選項 B，維持現有設計
- ✅ 如果採用選項 C，簡化版角色原型已定義，ADR 已建立，實作已更新

---

## 📋 執行順序建議

### 第一階段：Cursor 直接解決（立即執行）

1. ✅ 任務包 1：Cursor 直接解決包
   - 預估時間：30 分鐘
   - 狀態：可直接執行

### 第二階段：任務執行者批量處理（等待執行）

2. ⏳ 任務包 2：Legacy Facet 遷移包
   - 預估時間：2-3 小時
   - 狀態：等待執行

3. ⏳ 任務包 3：P0-12 階段二-4 規則提取包
   - 預估時間：1-2 小時（如果找到 Legacy 檔案）
   - 狀態：等待執行（受阻）

### 第三階段：顧問團隊專業評估（等待裁示）

4. ⏳ 任務包 4：五行「洩」關係決策包
   - 預估時間：等待裁示後實作
   - 狀態：等待裁示

5. ⏳ 任務包 5：角色原型參數矩陣決策包
   - 預估時間：等待裁示後實作
   - 狀態：等待裁示

---

## ✅ 驗收標準（總體）

### 必須完成（PRIORITY: HIGH）

1. ✅ Rigidity 預設值統一為 0.0（所有文件一致）
2. ✅ ADR_0005 已更新（包含標準差模式決策記錄）
3. ✅ CONSTITUTION 文件已更新（整合通過項目）

### 建議完成（PRIORITY: MEDIUM）

4. ✅ Legacy Facet 已遷移（9 個 Facet 遷移到 V3）
5. ✅ P0-12 階段二-4 已完成（規則與制度提取，或標記為「待後續處理」）

### 等待裁示（PRIORITY: MEDIUM）

6. ⏳ 五行「洩」關係決策已做出
7. ⏳ 角色原型參數矩陣決策已做出

---

**建立日期**：2026-01-13  
**狀態**：READY FOR EXECUTION  
**執行者**：Cursor（任務包 1）+ GPT/GEMINI（任務包 2-3）+ Gemini（任務包 4-5）
