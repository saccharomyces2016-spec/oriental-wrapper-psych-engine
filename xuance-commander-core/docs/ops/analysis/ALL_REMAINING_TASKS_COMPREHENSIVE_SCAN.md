# 所有剩餘任務全案掃描報告

**建立日期**：2026-01-13  
**掃描範圍**：全專案  
**目的**：徹底檢查所有剩餘任務及其相關檔案狀態

---

## 📋 剩餘任務總覽

### 任務分類

| 類別 | 任務數量 | 優先級 | 狀態 |
|------|----------|--------|------|
| **Gemini 方案追問** | 3 | HIGH | 等待裁示 |
| **GPT 方案追問** | 1 | HIGH | 等待裁示 |
| **P0-12 階段任務** | 1 | MEDIUM | 進行中 |
| **Legacy Facet 遷移** | 9 | MEDIUM | 未開始 |
| **文件更新** | 多項 | LOW | 部分完成 |

---

## 🔍 詳細任務清單

### 類別 1：Gemini 方案追問（等待裁示）

#### 任務 1.1：五行「洩」關係實作決策

**狀態**：⚠️ **等待裁示**

**問題**：
- Gemini 方案提到「洩（Exhaustion）」路徑
- 現有實作只有「剋」關係
- 需要決定是否實作「洩」關係

**相關檔案**：
- ✅ `engine/cascade_calculator.py`（已實作「剋」關係）
- ✅ `domain/knowledge_base/wuxing_5_elements.v1.0.json`（有五行關係定義，但無「洩」關係）
- ✅ `docs/task_packets/advisor/GEMINI_CONSTITUTION_QUESTIONS.md`（追問包）

**影響範圍**：
- 需要更新 `cascade_calculator.py`
- 需要定義「洩」關係的邏輯
- 需要更新 `cascade_overrides.v1.0.json`

**建議**：
- 選項 A：採納「洩」關係（需要實作）
- 選項 B：維持現狀（只有「剋」關係）

---

#### 任務 1.2：角色原型參數矩陣實作決策

**狀態**：⚠️ **等待裁示**

**問題**：
- Gemini 方案提到「角色原型參數矩陣」（Pioneer, Keeper, Strategist, Artisan）
- 每個角色有不同的 `volatility_thresholds` 和 `rigidity_weight`
- 需要決定是否實作

**相關檔案**：
- ✅ `docs/task_packets/advisor/GEMINI_CONSTITUTION_QUESTIONS.md`（追問包）
- ❌ 尚未實作角色參數矩陣
- ❌ 尚未實作角色選擇器（UI）

**影響範圍**：
- 需要更新 `engine/score_facet.py`（加入角色參數）
- 需要建立角色參數配置檔
- 需要更新 UI（角色選擇器）

**建議**：
- 選項 A：採納角色參數矩陣（需要實作）
- 選項 B：維持現狀（統一參數）

---

#### 任務 1.3：Rigidity 預設值衝突解決

**狀態**：⚠️ **等待裁示（HIGH PRIORITY）**

**問題**：
- Gemini 方案：`rigidity_default_when_missing = 0.1`
- 任務包裁示：`rigidity_default_when_missing = 0.0`
- DIRECTIVE REV.B：`return 0.0`
- GPT 方案：`rigidity=0.50`

**相關檔案**：
- ✅ `engine/score_facet.py`（目前使用 `default_when_missing: float = 0.5`）
- ✅ `docs/task_packets/advisor/REMAINING_TASKS_COMPLETE_PACKET.md`（裁示 0.0）
- ✅ `docs/task_packets/advisor/GEMINI_CONSTITUTION_QUESTIONS.md`（追問包）
- ✅ `docs/task_packets/advisor/GPT_CONSTITUTION_AUDIT_REPORT.md`（追問包）

**衝突狀態**：
- `score_facet.py` 使用 0.5（與所有裁示衝突）
- 需要統一為一個值

**建議**：
- 選項 A：採用 0.0（符合任務包裁示和 DIRECTIVE REV.B）
- 選項 B：採用 0.1（Gemini 方案）
- 選項 C：採用 0.50（GPT 方案，但需要 ADR 說明）

---

### 類別 2：GPT 方案追問（等待裁示）

#### 任務 2.1：Rigidity 預設值衝突解決

**狀態**：⚠️ **等待裁示（HIGH PRIORITY）**

**問題**：
- GPT 方案 Section 7.2：`rigidity=0.50`
- 任務包裁示：`rigidity_default_when_missing = 0.0`
- DIRECTIVE REV.B：`return 0.0`

**相關檔案**：
- ✅ `docs/task_packets/advisor/GPT_CONSTITUTION_AUDIT_REPORT.md`（追問包）
- ✅ `engine/score_facet.py`（目前使用 0.5）

**建議**：
- 需要確認 GPT 是否了解任務包已裁示採用 0.0
- 如果堅持使用 0.50，需要建立 ADR 說明理由

---

### 類別 3：P0-12 階段任務

#### 任務 3.1：P0-12 階段二-4：規則與制度提取

**狀態**：⚠️ **進行中（受阻）**

**問題**：
- 需要分析 Legacy 系統規則（`intervention_boundary_matrix`, `guidancePrinciples`, `buildGuidance.js`）
- 需要建立 presentation rules
- 目前受阻：無法定位 Legacy 檔案

**相關檔案**：
- ❌ Legacy 檔案位置不明
- ✅ `docs/task_packets/advisor/REMAINING_TASKS_COMPLETE_PACKET.md`（任務描述）

**影響範圍**：
- 需要找到 Legacy 檔案
- 需要分析 Legacy 規則
- 需要建立 presentation rules

**建議**：
- 需要先找到 Legacy 檔案位置
- 然後進行規則提取和分析

---

### 類別 4：Legacy Facet 遷移

#### 任務 4.1：Legacy Facet 遷移到 V3

**狀態**：⚠️ **未開始**

**問題**：
- 需要將 9 個 Legacy Facet 從 `weighted_sum` 遷移到 `vector_state_v3`
- 需要調整題目數量（部分 Facet 需要調整為 8 題）

**相關檔案**：
- ✅ `domain/facets/`（需要檢查哪些是 Legacy Facet）
- ✅ `engine/score_facet.py`（已支援兩種模型）
- ✅ `docs/task_packets/advisor/REMAINING_TASKS_COMPLETE_PACKET.md`（任務描述）

**影響範圍**：
- 需要更新 9 個 Facet 的 `scoring.model`
- 需要調整題目數量
- 需要測試遷移後的 Facet

**建議**：
- 需要先列出所有 Legacy Facet
- 然後逐一遷移

---

### 類別 5：文件更新

#### 任務 5.1：更新 CONSTITUTION 文件

**狀態**：✅ **部分完成**

**問題**：
- 需要整合 Gemini 和 GPT 方案的通過項目
- 需要解決衝突項目

**相關檔案**：
- ✅ `docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md`
- ✅ `docs/task_packets/advisor/GEMINI_CONSTITUTION_AUDIT_REPORT.md`
- ✅ `docs/task_packets/advisor/GPT_CONSTITUTION_AUDIT_REPORT.md`

**已完成**：
- ✅ Domain Schema i18n 結構（已整合）
- ✅ 8 題制政策（已更新）

**待完成**：
- ⚠️ Rigidity 預設值衝突解決
- ⚠️ 五行「洩」關係決策
- ⚠️ 角色參數矩陣決策

---

#### 任務 5.2：更新 ADR 文件

**狀態**：⚠️ **待完成**

**問題**：
- 需要更新 `ADR_0005_vector_state_scoring_engine.md`（明確 sample stddev）
- 需要建立新的 ADR（如果採納新功能）

**相關檔案**：
- ✅ `docs/adr/ADR_0005_vector_state_scoring_engine.md`
- ❌ 新 ADR（如果採納新功能）

**建議**：
- 需要先解決衝突項目
- 然後更新或建立 ADR

---

#### 任務 5.3：更新 Schema 文件

**狀態**：✅ **已完成**

**問題**：
- 需要建立 `domain.schema.json`

**相關檔案**：
- ✅ `schemas/domain.schema.json`（已建立）
- ✅ `domain/domains/bagua.domain_map.v1.0.json`（已驗證）

**狀態**：✅ **已完成**

---

## 📊 檔案狀態檢查

### 核心引擎檔案

| 檔案 | 狀態 | 問題 |
|------|------|------|
| `engine/score_facet.py` | ⚠️ **需修正** | Rigidity 預設值為 0.5，與裁示衝突 |
| `engine/cascade_calculator.py` | ✅ **正常** | 已實作「剋」關係 |
| `engine/root_element_mapper.py` | ✅ **正常** | 已實作 |
| `engine/collision_calculator.py` | ✅ **正常** | 已實作 |

---

### 配置檔案

| 檔案 | 狀態 | 問題 |
|------|------|------|
| `domain/domains/bagua.domain_map.v1.0.json` | ✅ **正常** | 已驗證 |
| `domain/cascade/cascade_overrides.v1.0.json` | ✅ **正常** | 有覆寫模板 |
| `domain/knowledge_base/wuxing_5_elements.v1.0.json` | ✅ **正常** | 有五行定義 |
| `schemas/domain.schema.json` | ✅ **正常** | 已建立並驗證 |
| `schemas/compiled_facet.schema.json` | ✅ **正常** | 包含 element 欄位 |

---

### 文件檔案

| 檔案 | 狀態 | 問題 |
|------|------|------|
| `docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md` | ⚠️ **需更新** | 需要解決衝突項目 |
| `docs/task_packets/advisor/GEMINI_CONSTITUTION_QUESTIONS.md` | ✅ **正常** | 追問包已建立 |
| `docs/task_packets/advisor/GPT_CONSTITUTION_AUDIT_REPORT.md` | ✅ **正常** | 審核報告已建立 |
| `docs/task_packets/advisor/REMAINING_TASKS_COMPLETE_PACKET.md` | ✅ **正常** | 任務包已建立 |
| `docs/adr/ADR_0005_vector_state_scoring_engine.md` | ⚠️ **需更新** | 需要明確 sample stddev |

---

## 🎯 優先級排序

### HIGH PRIORITY（阻塞性問題）

1. **Rigidity 預設值衝突解決**
   - 影響：`score_facet.py` 與所有裁示衝突
   - 狀態：等待裁示
   - 檔案：`engine/score_facet.py`, 多個裁示文件

---

### MEDIUM PRIORITY（功能擴充）

2. **五行「洩」關係實作決策**
   - 影響：Cascade 引擎功能擴充
   - 狀態：等待裁示
   - 檔案：`engine/cascade_calculator.py`

3. **角色原型參數矩陣實作決策**
   - 影響：V3 引擎參數調整
   - 狀態：等待裁示
   - 檔案：`engine/score_facet.py`, UI 檔案

4. **P0-12 階段二-4：規則與制度提取**
   - 影響：Legacy 系統整合
   - 狀態：進行中（受阻）
   - 檔案：Legacy 檔案位置不明

5. **Legacy Facet 遷移**
   - 影響：9 個 Facet 需要遷移
   - 狀態：未開始
   - 檔案：`domain/facets/`

---

### LOW PRIORITY（文件更新）

6. **更新 CONSTITUTION 文件**
   - 影響：文件一致性
   - 狀態：部分完成
   - 檔案：`docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md`

7. **更新 ADR 文件**
   - 影響：文件完整性
   - 狀態：待完成
   - 檔案：`docs/adr/ADR_0005_vector_state_scoring_engine.md`

---

## 📝 建議行動方案

### 立即行動（HIGH PRIORITY）

1. **解決 Rigidity 預設值衝突**
   - 步驟 1：確認最終裁示（0.0 vs 0.1 vs 0.50）
   - 步驟 2：更新 `engine/score_facet.py`
   - 步驟 3：更新所有相關文件

---

### 短期行動（MEDIUM PRIORITY）

2. **解決 Gemini/GPT 方案追問**
   - 步驟 1：裁示五行「洩」關係
   - 步驟 2：裁示角色參數矩陣
   - 步驟 3：實作通過的項目

3. **完成 P0-12 階段任務**
   - 步驟 1：找到 Legacy 檔案位置
   - 步驟 2：分析 Legacy 規則
   - 步驟 3：建立 presentation rules

4. **開始 Legacy Facet 遷移**
   - 步驟 1：列出所有 Legacy Facet
   - 步驟 2：制定遷移計劃
   - 步驟 3：逐一遷移

---

### 長期行動（LOW PRIORITY）

5. **更新文件**
   - 步驟 1：解決所有衝突項目
   - 步驟 2：更新 CONSTITUTION
   - 步驟 3：更新 ADR

---

## 🔍 檔案掃描結果

### 已掃描的檔案

1. ✅ `engine/score_facet.py` - 發現 Rigidity 預設值衝突
2. ✅ `engine/cascade_calculator.py` - 正常
3. ✅ `engine/root_element_mapper.py` - 正常
4. ✅ `engine/collision_calculator.py` - 正常
5. ✅ `domain/domains/bagua.domain_map.v1.0.json` - 正常
6. ✅ `domain/cascade/cascade_overrides.v1.0.json` - 正常
7. ✅ `domain/knowledge_base/wuxing_5_elements.v1.0.json` - 正常
8. ✅ `schemas/domain.schema.json` - 正常
9. ✅ `schemas/compiled_facet.schema.json` - 正常
10. ✅ `docs/task_packets/advisor/REMAINING_TASKS_COMPLETE_PACKET.md` - 正常
11. ✅ `docs/task_packets/advisor/GEMINI_CONSTITUTION_QUESTIONS.md` - 正常
12. ✅ `docs/task_packets/advisor/GPT_CONSTITUTION_AUDIT_REPORT.md` - 正常

---

### 已檢查的檔案詳細狀態

#### Legacy Facet 檔案（9 個）

| Facet | 檔案 | 模型 | 題數 | `exclude_from_volatility` | `domainKey` | `questionSet` | 狀態 |
|-------|------|------|------|--------------------------|-------------|---------------|------|
| `stress_recovery` | `stress_recovery.scoring.v1.0.json` | `weighted_sum` | 2 | ❌ 無 | ❌ 無 | ❌ 無 | ⚠️ **需遷移 + 擴充** |
| `chronic_depletion` | `chronic_depletion.scoring.v1.0.json` | `weighted_sum` | 7 | ❌ 無 | ❌ 無 | ❌ 無 | ⚠️ **需遷移** |
| `identity_diffusion` | `identity_diffusion.scoring.v1.0.json` | `weighted_sum` | 7 | ❌ 無 | ❌ 無 | ❌ 無 | ⚠️ **需遷移** |
| `fear_based_stability` | `fear_based_stability.scoring.v1.0.json` | `weighted_sum` | 3 | ❌ 無 | ❌ 無 | ❌ 無 | ⚠️ **需遷移 + 擴充** |
| `meaning_vacuum` | `meaning_vacuum.scoring.v1.0.json` | `weighted_sum` | 7 | ❌ 無 | ❌ 無 | ❌ 無 | ⚠️ **需遷移** |
| `suppressed_needs` | `suppressed_needs.scoring.v1.0.json` | `weighted_sum` | 7 | ❌ 無 | ❌ 無 | ❌ 無 | ⚠️ **需遷移** |
| `chronic_alertness` | `chronic_alertness.scoring.v1.0.json` | `weighted_sum` | 7 | ❌ 無 | ❌ 無 | ❌ 無 | ⚠️ **需遷移** |
| `hyper_responsibility` | `hyper_responsibility.scoring.v1.0.json` | `weighted_sum` | 7 | ❌ 無 | ❌ 無 | ❌ 無 | ⚠️ **需遷移** |
| `loss_of_agency` | `loss_of_agency.scoring.v1.0.json` | `weighted_sum` | 7 | ❌ 無 | ❌ 無 | ❌ 無 | ⚠️ **需遷移** |

**發現**：
- ✅ 所有 9 個 Facet 都使用 `weighted_sum` 模型
- ⚠️ 所有 Facet 都缺少 `exclude_from_volatility` 標記
- ⚠️ 所有 Facet 都缺少 `domainKey` 和 `questionSet`
- ⚠️ 2 個 Facet 題數不足（需要擴充到 6-10 題）

---

#### Legacy 系統檔案搜尋結果

**P0-12 階段二-4 需要的檔案**：
1. `intervention_boundary_matrix` - 規則矩陣
2. `guidancePrinciples` - 指導原則
3. `buildGuidance.js` - 決策邏輯

**搜尋結果**：
- ❌ **未找到** `intervention_boundary_matrix` 相關檔案
- ❌ **未找到** `guidancePrinciples` 相關檔案
- ❌ **未找到** `buildGuidance.js` 檔案

**可能位置**：
- `docs/legacy/115_1_3_my-first-app_failed/` - Legacy 失敗版本資料夾（需要檢查）
- `docs/research/legacy_analysis/` - Legacy 分析文件（已檢查，沒有具體檔案）
- `docs/governance/LEGACY_REFERENCE_RULES.md` - Legacy 參考規則（已讀取，但沒有具體的檔案位置）

**建議**：
- 需要檢查 `docs/legacy/115_1_3_my-first-app_failed/` 資料夾
- 如果找不到，需要標記為「無法定位，待後續處理」

---

#### ADR_0005 標準差模式檢查結果

**檔案**：`docs/adr/ADR_0005_vector_state_scoring_engine.md`

**發現**：
- Section 1.3（2）提到「Volatility Index｜波動指數」
- 公式：`StdDev(normalized_answers)`
- ⚠️ **未明確寫入「sample stddev」作為 SSOT**

**狀態**：⚠️ **需更新**

**建議**：
- 需要在 ADR_0005 中明確寫入「sample stddev」作為 SSOT
- 或確認是否已在其他地方明確寫入

---

---

## 📋 完整任務清單（按優先級排序）

### HIGH PRIORITY（阻塞性問題）

1. **Rigidity 預設值衝突解決**
   - **狀態**：⚠️ **等待裁示**
   - **問題**：`engine/score_facet.py` 使用 0.5，與所有裁示（0.0）衝突
   - **檔案**：
     - `engine/score_facet.py`（Line 52, 110：`default_when_missing = 0.5`）
     - `docs/task_packets/advisor/REMAINING_TASKS_COMPLETE_PACKET.md`（裁示 0.0）
     - `docs/task_packets/advisor/GEMINI_CONSTITUTION_QUESTIONS.md`（追問包）
     - `docs/task_packets/advisor/GPT_CONSTITUTION_AUDIT_REPORT.md`（追問包）
   - **行動**：需要確認最終裁示（0.0 vs 0.1 vs 0.50），然後更新所有檔案

---

### MEDIUM PRIORITY（功能擴充）

2. **五行「洩」關係實作決策**
   - **狀態**：⚠️ **等待裁示**
   - **問題**：Gemini 方案提到「洩」路徑，但現有實作只有「剋」關係
   - **檔案**：
     - `engine/cascade_calculator.py`（只有「剋」關係）
     - `docs/task_packets/advisor/GEMINI_CONSTITUTION_QUESTIONS.md`（追問包）
   - **行動**：需要裁示是否採納「洩」關係

3. **角色原型參數矩陣實作決策**
   - **狀態**：⚠️ **等待裁示**
   - **問題**：Gemini 方案提到角色參數矩陣，但尚未實作
   - **檔案**：
     - `docs/task_packets/advisor/GEMINI_CONSTITUTION_QUESTIONS.md`（追問包）
   - **行動**：需要裁示是否採納角色參數矩陣

4. **P0-12 階段二-4：規則與制度提取**
   - **狀態**：⚠️ **進行中（受阻）**
   - **問題**：無法定位 Legacy 檔案（`intervention_boundary_matrix`, `guidancePrinciples`, `buildGuidance.js`）
   - **檔案**：
     - `docs/task_packets/advisor/REMAINING_TASKS_COMPLETE_PACKET.md`（任務描述）
     - `docs/governance/LEGACY_REFERENCE_RULES.md`（Legacy 參考規則，但沒有具體檔案位置）
   - **行動**：
     - 需要檢查 `docs/legacy/115_1_3_my-first-app_failed/` 資料夾
     - 如果找不到，標記為「無法定位，待後續處理」

5. **Legacy Facet 遷移（9 個）**
   - **狀態**：⚠️ **未開始**
   - **問題**：9 個 Facet 需要從 `weighted_sum` 遷移到 `vector_state_v3`
   - **檔案**：
     - `domain/facets/*.scoring.v1.0.json`（9 個檔案）
   - **行動**：
     - 更新 `scoring.model` 為 `"vector_state_v3"`
     - 加入 `exclude_from_volatility` 標記
     - 加入 `domainKey` 和 `questionSet`
     - 2 個 Facet 需要擴充題目（`stress_recovery`: 2→8 題，`fear_based_stability`: 3→8 題）

---

### LOW PRIORITY（文件更新）

6. **更新 CONSTITUTION 文件**
   - **狀態**：✅ **部分完成**
   - **問題**：需要整合 Gemini/GPT 方案的通過項目，解決衝突項目
   - **檔案**：
     - `docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md`
   - **已完成**：
     - ✅ Domain Schema i18n 結構（已整合）
     - ✅ 8 題制政策（已更新）
   - **待完成**：
     - ⚠️ Rigidity 預設值衝突解決
     - ⚠️ 五行「洩」關係決策
     - ⚠️ 角色參數矩陣決策

7. **更新 ADR_0005 標準差模式**
   - **狀態**：⚠️ **待完成**
   - **問題**：需要明確寫入「sample stddev」作為 SSOT
   - **檔案**：
     - `docs/adr/ADR_0005_vector_state_scoring_engine.md`
   - **行動**：在 ADR_0005 中明確寫入「sample stddev」作為 SSOT

8. **更新其他相關文件**
   - **狀態**：⚠️ **待完成**
   - **檔案**：
     - `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md`
     - `specs/integration/ui_engine/FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md`
     - `docs/ops/TASK_RECORDS_SUMMARY.md`
     - `docs/ops/TASK_STATUS.md`
     - `memory/changes/CHANGELOG.md`
     - `memory/briefs/CURRENT.md`

---

## 🔍 檔案狀態詳細檢查

### 核心引擎檔案

| 檔案 | 狀態 | 問題 |
|------|------|------|
| `engine/score_facet.py` | ⚠️ **需修正** | Line 52, 110：`default_when_missing = 0.5`，與裁示衝突 |
| `engine/cascade_calculator.py` | ✅ **正常** | 已實作「剋」關係 |
| `engine/root_element_mapper.py` | ✅ **正常** | 已實作 |
| `engine/collision_calculator.py` | ✅ **正常** | 已實作 |

---

### Legacy Facet 檔案（9 個）

| Facet | 檔案 | 模型 | 題數 | 狀態 |
|-------|------|------|------|------|
| `stress_recovery` | `stress_recovery.scoring.v1.0.json` | `weighted_sum` | 2 | ⚠️ **需遷移 + 擴充**（2 題 < 6 題） |
| `chronic_depletion` | `chronic_depletion.scoring.v1.0.json` | `weighted_sum` | 7 | ⚠️ **需遷移** |
| `identity_diffusion` | `identity_diffusion.scoring.v1.0.json` | `weighted_sum` | 7 | ⚠️ **需遷移** |
| `fear_based_stability` | `fear_based_stability.scoring.v1.0.json` | `weighted_sum` | 3 | ⚠️ **需遷移 + 擴充**（3 題 < 6 題） |
| `meaning_vacuum` | `meaning_vacuum.scoring.v1.0.json` | `weighted_sum` | 7 | ⚠️ **需遷移** |
| `suppressed_needs` | `suppressed_needs.scoring.v1.0.json` | `weighted_sum` | 7 | ⚠️ **需遷移** |
| `chronic_alertness` | `chronic_alertness.scoring.v1.0.json` | `weighted_sum` | 7 | ⚠️ **需遷移** |
| `hyper_responsibility` | `hyper_responsibility.scoring.v1.0.json` | `weighted_sum` | 7 | ⚠️ **需遷移** |
| `loss_of_agency` | `loss_of_agency.scoring.v1.0.json` | `weighted_sum` | 7 | ⚠️ **需遷移** |

**發現**：
- ✅ 所有 9 個 Facet 都使用 `weighted_sum` 模型（需要遷移到 `vector_state_v3`）
- ⚠️ 所有 Facet 都缺少 `exclude_from_volatility` 標記
- ⚠️ 所有 Facet 都缺少 `domainKey` 和 `questionSet`
- ⚠️ 2 個 Facet 題數不足（需要擴充到 6-10 題）

---

### Legacy 系統檔案搜尋結果

**P0-12 階段二-4 需要的檔案**：
1. `intervention_boundary_matrix` - 規則矩陣
2. `guidancePrinciples` - 指導原則
3. `buildGuidance.js` - 決策邏輯

**搜尋結果**：
- ❌ **未找到** `intervention_boundary_matrix` 相關檔案
- ❌ **未找到** `guidancePrinciples` 相關檔案
- ❌ **未找到** `buildGuidance.js` 檔案

**可能位置**：
- `docs/legacy/115_1_3_my-first-app_failed/` - Legacy 失敗版本資料夾（需要檢查）
- `docs/research/legacy_analysis/` - Legacy 分析文件（已檢查，沒有具體檔案）
- `docs/governance/LEGACY_REFERENCE_RULES.md` - Legacy 參考規則（已讀取，但沒有具體的檔案位置）

**建議**：
- 需要檢查 `docs/legacy/115_1_3_my-first-app_failed/` 資料夾
- 如果找不到，需要標記為「無法定位，待後續處理」

---

### 配置檔案

| 檔案 | 狀態 | 問題 |
|------|------|------|
| `domain/domains/bagua.domain_map.v1.0.json` | ✅ **正常** | 已驗證 |
| `domain/cascade/cascade_overrides.v1.0.json` | ✅ **正常** | 有覆寫模板 |
| `domain/knowledge_base/wuxing_5_elements.v1.0.json` | ✅ **正常** | 有五行定義 |
| `schemas/domain.schema.json` | ✅ **正常** | 已建立並驗證 |
| `schemas/compiled_facet.schema.json` | ✅ **正常** | 包含 element 欄位 |

---

### 文件檔案

| 檔案 | 狀態 | 問題 |
|------|------|------|
| `docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md` | ⚠️ **需更新** | 需要解決衝突項目 |
| `docs/task_packets/advisor/GEMINI_CONSTITUTION_QUESTIONS.md` | ✅ **正常** | 追問包已建立 |
| `docs/task_packets/advisor/GPT_CONSTITUTION_AUDIT_REPORT.md` | ✅ **正常** | 審核報告已建立 |
| `docs/task_packets/advisor/REMAINING_TASKS_COMPLETE_PACKET.md` | ✅ **正常** | 任務包已建立 |
| `docs/adr/ADR_0005_vector_state_scoring_engine.md` | ⚠️ **需更新** | 需要明確 sample stddev |

---

**建立日期**：2026-01-13  
**掃描者**：Cursor（總指揮）  
**狀態**：完成全案掃描，等待裁示和行動
