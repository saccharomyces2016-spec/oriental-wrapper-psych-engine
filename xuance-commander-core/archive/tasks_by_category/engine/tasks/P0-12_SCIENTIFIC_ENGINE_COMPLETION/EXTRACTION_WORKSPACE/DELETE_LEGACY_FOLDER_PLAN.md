# Legacy 資料夾刪除計劃

**建立日期**：2026-01-12  
**目的**：記錄 Legacy 資料夾刪除的準備工作和確認清單  
**文件狀態**：READY FOR REVIEW

---

## 一、刪除前檢查清單

### 1.1 資料提取完成確認

- ✅ **所有 Legacy 資料已提取到 EXTRACTION_WORKSPACE**
  - 系統邏輯和規則：7 個檔案
  - ContentDB 檔案：11 個檔案
  - narrative 和 guidance 邏輯：8 個檔案
  - 題庫資料：2 個檔案
  - Questions：13 個主題
  - Manifests：13 個主題
  - Recommendations：13 個主題
  - Narratives：13 個主題
  - Riskchains：13 個主題

- ✅ **所有可提取的內容已提取完成**
  - 所有可提取的內容已提取
  - 缺失內容已標註

- ✅ **雙向核對已完成**
  - EXTRACTION_WORKSPACE vs domain/ 核對完成
  - 核對報告已生成：`VERIFICATION_COMPARISON_REPORT.md`

- ✅ **原始檔案已備份**
  - 所有原始檔案已備份到 `EXTRACTION_WORKSPACE/raw/`
  - 所有 ContentDB 檔案已備份到 `EXTRACTION_WORKSPACE/contentdb/`
  - 所有邏輯檔案已備份到 `EXTRACTION_WORKSPACE/narrative_logic/` 和 `EXTRACTION_WORKSPACE/guidance_logic/`

---

### 1.2 重複內容確認

**根據核對報告**：

**完全相同的檔案**（3 個）：
1. ✅ `fear_based_stability.questions.v1.0.json` - EXTRACTION_WORKSPACE 和 domain/ 完全相同
2. ✅ `chronic_alertness.questions.v1.0.json` - EXTRACTION_WORKSPACE 和 domain/ 完全相同
3. ✅ `meaning_vacuum.questions.v1.0.json` - EXTRACTION_WORKSPACE 和 domain/ 完全相同

**建議**：
- 這 3 個檔案在 domain/ 中的版本可以考慮刪除（因為 EXTRACTION_WORKSPACE 中已有相同版本）
- 但建議在顧問團隊整合刪減昇華完成後再刪除

**不同的檔案**（需要進一步分析）：
- `chronic_depletion.questions.v1.0.json` - 不同，需要分析差異
- `hyper_responsibility.questions.v1.0.json` - 不同，需要分析差異
- `loss_of_agency.questions.v1.0.json` - 不同，需要分析差異
- `suppressed_needs.questions.v1.0.json` - 不同，需要分析差異
- `identity_diffusion.questions.v1.0.json` - 不同，需要分析差異

**建議**：
- 這些不同的檔案需要顧問團隊進一步分析差異
- 在確認差異後，決定保留哪個版本

---

## 二、Legacy 資料夾位置

### 2.1 資料夾路徑

**Legacy 資料夾**：
- `docs/legacy/115_1_3_my-first-app_failed/`

**包含內容**：
- 舊系統的所有原始檔案
- 已提取的資料來源檔案

---

### 2.2 資料夾大小

**待確認**：需要檢查資料夾大小

---

## 三、刪除條件確認

### 3.1 必須滿足的條件

- ✅ **所有資料已提取**
  - 所有 Legacy 資料已提取到 EXTRACTION_WORKSPACE
  - 所有可提取的內容已提取完成

- ✅ **雙向核對完成**
  - EXTRACTION_WORKSPACE vs domain/ 核對完成
  - 核對報告已生成

- ✅ **原始檔案已備份**
  - 所有原始檔案已備份到 EXTRACTION_WORKSPACE/raw/

- ⏳ **顧問團隊整合刪減昇華完成**
  - 待顧問團隊完成整合刪減昇華
  - 待顧問團隊確認所有資料已整合

- ⏳ **重複內容確認完成**
  - 待顧問團隊確認重複內容
  - 待顧問團隊決定保留哪個版本

---

### 3.2 建議滿足的條件

- ⏳ **最終審核完成**
  - 待最終審核確認所有資料已整合
  - 待最終審核確認可以安全刪除

---

## 四、刪除計劃

### 4.1 刪除時機

**建議時機**：
- 顧問團隊整合刪減昇華完成後
- 最終審核確認可以安全刪除後

**不建議時機**：
- 在顧問團隊整合刪減昇華完成前
- 在最終審核確認前

---

### 4.2 刪除步驟

1. **最終確認**
   - 確認所有資料已提取
   - 確認雙向核對完成
   - 確認原始檔案已備份
   - 確認顧問團隊整合刪減昇華完成
   - 確認重複內容確認完成
   - 確認最終審核完成

2. **備份確認**
   - 確認所有原始檔案已備份
   - 確認備份檔案完整性

3. **刪除執行**
   - 刪除 `docs/legacy/115_1_3_my-first-app_failed/` 資料夾
   - 記錄刪除時間和原因

4. **刪除後確認**
   - 確認資料夾已刪除
   - 確認沒有遺漏重要檔案

---

### 4.3 刪除命令

**建議命令**：
```bash
# 在確認所有條件滿足後執行
rm -rf docs/legacy/115_1_3_my-first-app_failed/
```

**注意**：
- 刪除前請再次確認所有條件已滿足
- 刪除前請確認已備份所有重要檔案
- 刪除後請記錄刪除時間和原因

---

## 五、風險評估

### 5.1 潛在風險

1. **資料遺失風險**
   - 風險等級：低
   - 原因：所有資料已提取並備份

2. **整合問題風險**
   - 風險等級：中
   - 原因：如果整合過程中發現需要參考原始檔案，可能會有問題
   - 緩解措施：所有原始檔案已備份到 EXTRACTION_WORKSPACE/raw/

3. **版本衝突風險**
   - 風險等級：低
   - 原因：雙向核對已完成，重複內容已識別

---

### 5.2 風險緩解措施

1. **備份所有原始檔案**
   - ✅ 已完成：所有原始檔案已備份到 EXTRACTION_WORKSPACE/raw/

2. **雙向核對**
   - ✅ 已完成：雙向核對已完成，核對報告已生成

3. **顧問團隊整合**
   - ⏳ 進行中：待顧問團隊完成整合刪減昇華

---

## 六、建議

### 6.1 刪除前建議

1. **等待顧問團隊整合完成**
   - 建議在顧問團隊整合刪減昇華完成後再刪除
   - 確保所有資料已整合到 domain/

2. **最終審核**
   - 建議進行最終審核
   - 確認所有資料已整合
   - 確認可以安全刪除

3. **備份確認**
   - 建議再次確認所有原始檔案已備份
   - 確認備份檔案完整性

---

### 6.2 刪除後建議

1. **記錄刪除**
   - 記錄刪除時間和原因
   - 更新相關文件

2. **確認完整性**
   - 確認沒有遺漏重要檔案
   - 確認所有資料已整合

---

## 七、總結

### 7.1 當前狀態

- ✅ 所有資料已提取
- ✅ 雙向核對完成
- ✅ 原始檔案已備份
- ⏳ 顧問團隊整合刪減昇華進行中
- ⏳ 重複內容確認進行中

### 7.2 下一步行動

1. **等待顧問團隊整合完成**
2. **進行最終審核**
3. **確認所有條件滿足後刪除 Legacy 資料夾**

---

**文件狀態**：READY FOR REVIEW  
**最後更新**：2026-01-12  
**下一步**：等待顧問團隊整合完成後，進行最終審核並刪除 Legacy 資料夾
