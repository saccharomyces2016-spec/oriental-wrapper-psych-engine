# Legacy 資料內容分析報告

**建立日期**：2026-01-12  
**目的**：分析已提取的原始資料，識別各主題相關的內容  
**文件狀態**：WORKING DOCUMENT（持續更新）

---

## 一、anchor_statements.v1.json 分析

### 1.1 結構

- **總數**：50 個錨定語句
- **結構**：每個語句包含 `id`、`label`、`mother_theme`、`state_tags`、`safe_tone_template`、`variants` 等

### 1.2 主題對應關係

**待分析**：需要分析每個錨定語句的 `mother_theme` 和 `state_tags`，對應到 13 個主題

---

## 二、ContentDB 檔案分析

### 2.1 ContentDB_self.js

**結構**：
- `round2`：3 個情境（自疑之局、燃盡之局、轉念之局）
- `round3`：3 個特質（怕麻煩別人、完美主義、情緒壓抑）

**可能對應的主題**：
- `chronic_depletion`（燃盡之局）
- `hyper_responsibility`（怕麻煩別人）
- `suppressed_needs`（情緒壓抑）
- `identity_diffusion`（自疑之局）

---

### 2.2 ContentDB_health.js

**待分析**

---

### 2.3 ContentDB_relationship.js

**待分析**

---

## 三、consequence_chain_library.v1.json 分析

### 3.1 結構

- **總數**：3 個通用後果鏈
- **結構**：每個鏈包含 `id`、`label`、`confidence`、`do_not_say`、`safe_tone_template`

### 3.2 後果鏈清單

1. **chain_chronic_stress** - 長期壓力連鎖
   - 可能對應：`chronic_depletion`、`chronic_alertness`

2. **chain_avoidance_loop** - 逃避迴圈連鎖
   - 可能對應：`avoidance_coping`、`fear_based_stability`

3. **chain_relationship_pattern** - 關係模式連鎖
   - 可能對應：`social_comparison`、`emotional_permeability`

---

## 四、chains.json 分析

### 4.1 結構

- **byTheme**：按主題分類的鏈條
- **主題 key**：`control_need`、`attachment_insecurity`、`avoidance_procrastination`、`commitment_anxiety`、`burnout_overload`

### 4.2 主題對應關係

**待建立**：需要建立 Legacy 主題 key → 13 個主題的對應關係

---

## 五、interventions.json 分析

### 5.1 結構

- **byTheme**：按主題分類的介入建議
- **主題 key**：同上 chains.json

### 5.2 主題對應關係

**待建立**：需要建立 Legacy 主題 key → 13 個主題的對應關係

---

## 六、提取策略

### 6.1 Narratives 提取策略

1. **從 anchor_statements 提取**
   - 分析每個錨定語句的 `mother_theme`
   - 對應到 13 個主題
   - 提取 `safe_tone_template` 作為 narratives 的 opening

2. **從 ContentDB 提取**
   - 分析每個 ContentDB 檔案的 `round2` 和 `round3`
   - 對應到 13 個主題
   - 提取相關的敘事內容

3. **從 narrative_logic 提取**
   - 分析 elementNarrative、hookRules、round2OracularText
   - 提取相關的敘事邏輯

---

### 6.2 Riskchains 提取策略

1. **從 consequence_chain_library 提取**
   - 提取 3 個通用後果鏈
   - 對應到相關主題

2. **從 chains.json 提取**
   - 提取 byTheme 結構中的鏈條
   - 建立主題對應關係

3. **從 buildGuidance.js 提取**
   - 提取風險鏈生成邏輯
   - 識別主題相關的風險鏈

---

## 七、待完成工作

### 7.1 高優先級

1. **分析 anchor_statements**
   - 建立 mother_theme → 13 個主題的對應關係
   - 提取各主題相關的錨定語句

2. **分析 ContentDB 檔案**
   - 分析 11 個 ContentDB 檔案
   - 建立 round2/round3 → 13 個主題的對應關係
   - 提取各主題相關的敘事內容

3. **分析 consequence_chain_library**
   - 建立後果鏈 → 13 個主題的對應關係
   - 提取各主題相關的風險鏈

4. **分析 chains.json 和 interventions.json**
   - 建立 Legacy 主題 key → 13 個主題的對應關係
   - 提取各主題相關的鏈條和介入建議

---

**文件狀態**：WORKING DOCUMENT（持續更新）  
**最後更新**：2026-01-12  
**下一步**：開始分析並提取實際內容
