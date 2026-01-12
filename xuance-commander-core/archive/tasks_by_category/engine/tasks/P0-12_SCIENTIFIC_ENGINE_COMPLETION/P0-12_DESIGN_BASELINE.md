# P0-12 設計基準文件（WORKING BASELINE）

**建立日期**：2026-01-11  
**文件狀態**：WORKING BASELINE（不鎖定 / 可回滾）  
**適用階段**：Stage 1–4 (MVP)  
**來源**：顧問團最終回報（P0-12_IMPLEMENTATION_SUPPLEMENT_FINAL）

---

## 說明

本文件記錄了 P0-12 任務中符合要求且通過審核的設計決策。這些內容標記為 **WORKING BASELINE**，表示：

- ✅ 設計方向正確，符合系統架構要求
- ⚠️ 可演化、不鎖定，可根據後續實作調整
- ⚠️ 可回滾，如果後續實作發現問題可以修改

---

## 一、人生八大領域定義（Stage 1 入口）

### 1.1 領域定義

以下為本階段正式採用之 **人生八大領域（Domains）**，作為 Stage 1 的入口選擇。

| Domain ID | 領域核心 | 系統定位 |
|-----------|---------|---------|
| D1 | `chronic_depletion` | 能量與承載狀態 |
| D2 | `chronic_alertness` | 生存警戒與安全 |
| D3 | `fear_based_stability` | 停滯與改變阻力 |
| D4 | `hyper_responsibility` | 角色與責任過載 |
| D5 | `identity_diffusion` | 自我認同與方向 |
| D6 | `loss_of_agency` | 行動力與主控感 |
| D7 | `meaning_vacuum` | 價值與動機 |
| D8 | `suppressed_needs` | 需求與情感表達 |

### 1.2 補充說明

- `self_erosion`、`unprocessed_loss` 本階段不作為第一關領域
- 保留為母題層（motherThemes）或後續六十四卦敘事延伸

**狀態**：WORKING BASELINE（可演化、不鎖定）

---

## 二、八卦、五行、六十四卦的系統定位

### 2.1 分層原則

| 層級 | 功能 | 是否參與計算 |
|------|------|-------------|
| 科學計算層 | traits / axes / elements | ✅ 是 |
| Facet / Domain 層 | 分數、Band | ✅ 是 |
| 八卦 × 五行 | 語義與理解介面 | ❌ 否 |
| 六十四卦 | 敘事延伸、洞察 | ❌ 否 |

### 2.2 核心原則

- 象數系統（八卦、五行、六十四卦）**不參與第一關計算**
- 僅用於「怎麼說、怎麼理解、怎麼敘事」
- 計算層和語義層嚴格分離

**狀態**：WORKING BASELINE（可演化、不鎖定）

---

## 三、10 → 8 主題整合決策

### 3.1 主題映射決策表

| Legacy Theme | 整合動作 | 目標 Domain |
|-------------|---------|------------|
| chronic_depletion | Direct Map | D1 |
| chronic_alertness | Direct Map | D2 |
| fear_based_stability | Direct Map | D3 |
| hyper_responsibility | Direct Map | D4 |
| identity_diffusion | Direct Map | D5 |
| loss_of_agency | Direct Map | D6 |
| meaning_vacuum | Direct Map | D7 |
| suppressed_needs | Direct Map | D8 |
| self_erosion | Downgrade | MotherThemes |
| unprocessed_loss | Downgrade | MotherThemes |

### 3.2 Downgrade 處理機制

- `self_erosion` 和 `unprocessed_loss` 僅存在於：
  - 題目 `metadata.pattern_tags`
  - Layer A `motherThemes` 累積
- **不影響 Layer B 分數與 Band**
- 僅用於深層洞察、長期後果敘事、風險鏈提示

**狀態**：WORKING BASELINE（可演化、不鎖定）

---

## 四、雙層計算模型設計方向

### 4.1 模型結構

**Layer A：Legacy Psychometric Layer（保留）**
- 保留 Legacy 的完整計算邏輯
- 計算 traits, axes, elements, motherThemes
- 作為內部驗證與結構基準

**Layer B：Facet / Domain Layer（現有系統）**
- `weighted_sum` 模型
- 計算單一分數（0-1）
- 判斷 band（low/mid/high）
- 作為對外輸出與 UI 使用

### 4.2 一致性原則

- 預期兩層結果高度一致
- 若不一致：記錄差異，視需求調整 scoring 或解讀方式
- **不強制鎖死，保留設計彈性**

**狀態**：WORKING BASELINE（可演化、不鎖定）

**注意**：具體的 Python 移植程式碼和完整實現方案仍需補充。

---

## 五、測試驗證標準

### 5.1 驗收標準

| 類型 | 標準 |
|------|------|
| Schema | 全 JSON 通過 |
| 計算 | 誤差 < 0.01 |
| 一致性 | Layer A / B 無衝突 |
| 語境 | 無 forbidden_terms |
| 編譯 | 8 Domains 全通過 |

**狀態**：WORKING BASELINE（可演化、不鎖定）

**注意**：具體的測試方案和測試方法仍需補充。

---

## 六、文件狀態說明

### 6.1 不鎖定原則

本文件中的所有設計決策均為 **WORKING BASELINE**，表示：

- ✅ 設計方向正確，可以作為實作的指導
- ⚠️ 可根據後續實作情況調整
- ⚠️ 不會鎖定為最終版本，保留修改空間

### 6.2 可回滾原則

所有設計決策都可以在後續階段調整或回滾，如果：

- 實作過程中發現技術問題
- 實作過程中發現設計缺陷
- 需要根據實際測試結果調整

### 6.3 後續工作

以下內容仍需補充：

1. 符合現有系統 schema 的 JSON 結構範例
2. 完整的欄位對應表和轉換規則
3. buildGuidance.js 和結果呈現系統的整合方案
4. 完整的 Python 程式碼實現
5. 完整的編譯流程說明
6. 完整的測試方案

---

**文件狀態**：WORKING BASELINE（不鎖定，可回滾）  
**最後更新**：2026-01-11
