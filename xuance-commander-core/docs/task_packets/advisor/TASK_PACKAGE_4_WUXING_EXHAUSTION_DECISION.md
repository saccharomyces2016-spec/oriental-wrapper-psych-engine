# 任務包 4：五行「洩」關係決策包

**建立日期**：2026-01-13  
**執行對象**：Gemini（顧問）  
**狀態**：等待裁示  
**優先級**：MEDIUM

---

## 📋 任務目標

評估是否需要引入「洩（Exhaustion）」路徑，擴充為雙向傳導。

---

## ❓ 問題描述

**現狀**：
- 現有實作只有「剋（Overcomes）」路徑（`engine/cascade_calculator.py`）
- Gemini 方案引入「洩（Exhaustion）」路徑，提供完整的 5-Element 全循環矩陣
- 需要決定是否實作「洩」關係

**問題**：
- 為什麼需要「洩」路徑？現有「剋」路徑無法解釋哪些場景？
- 雙向傳導是否會產生過多警告？（Anti-Spam 規則是否需要調整？）
- 是否需要建立 ADR 記錄此決策？

---

## 📚 背景資料

### 現有 Cascade 實作

**檔案位置**：
- `engine/cascade_calculator.py` - Cascade 引擎實作

**現有邏輯**：
- 觸發條件：`final_score > 0.80`
- 實作策略：動態計算（五行「剋」關係）+ 顯式覆寫表
- Anti-Spam：最多 3 條 warning
- 詞彙治理：必須通過詞彙檢查

**現有「剋」關係**：
```python
OVERCOMES = {
    "WOOD": "EARTH",
    "EARTH": "WATER",
    "WATER": "FIRE",
    "FIRE": "METAL",
    "METAL": "WOOD",
}
```

### 五行知識庫

**檔案位置**：
- `domain/knowledge_base/wuxing_5_elements.v1.0.json` - 五行知識庫

**現有關係定義**：
- `generates`（生）：已定義但未使用
- `controlled_by`（被剋）：已定義但未使用
- `controls`（剋）：已定義且在使用
- `generated_by`（被生）：已定義但未使用

**注意**：
- 知識庫中沒有「洩」關係的定義
- Gemini 方案提到「洩」路徑，但尚未定義

### Cascade 覆寫表

**檔案位置**：
- `domain/cascade/cascade_overrides.v1.0.json` - Cascade 覆寫表

**現有覆寫模板**：
- 只有「剋」關係的覆寫模板（例如：`EARTH_OVERCOMES_WATER`）
- 沒有「洩」關係的覆寫模板

### CONSTITUTION 規格

**檔案位置**：
- `docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md` - CONSTITUTION 規格

**現有規格**：
- Section 4.2：跨域擴散引擎
- 明確提到「動態計算（五行生剋）」
- 但只有「剋」關係的實作

### Gemini 追問包

**檔案位置**：
- `docs/task_packets/advisor/GEMINI_CONSTITUTION_QUESTIONS.md` - Gemini 追問包

**追問內容**：
- 追問 1：五行全循環矩陣（剋/洩雙向傳導）
- 提供選項 A/B/C 和建議

---

## 🎯 選項分析

### 選項 A：採納「洩」路徑，建立 ADR，更新實作

**理由**：
- 更完整的五行理論，能解釋「資源耗盡」類型的連鎖反應
- 符合「準到發毛」的目標
- 提供更完整的風險傳導機制

**代價**：
- 需要更新 `cascade_calculator.py`
- 需要定義「洩」關係的邏輯
- 需要更新 `cascade_overrides.v1.0.json`
- 可能產生更多警告（需要調整 Anti-Spam 規則）
- 需要建立 ADR 記錄此決策

**需要執行的行動**：
1. 定義「洩」關係的邏輯（如何計算、何時觸發）
2. 建立 ADR 記錄此決策
3. 更新 `cascade_calculator.py`（加入「洩」關係的計算邏輯）
4. 更新 `cascade_overrides.v1.0.json`（加入「洩」關係的覆寫模板）
5. 調整 Anti-Spam 規則（如果產生過多警告）
6. 更新 `domain/knowledge_base/wuxing_5_elements.v1.0.json`（加入「洩」關係的定義）

---

### 選項 B：暫時不採納，先驗證「剋」路徑是否足夠

**理由**：
- 現有「剋」路徑已能解釋大部分連鎖反應
- 避免過度複雜化
- 可以先驗證現有系統是否足夠

**代價**：
- 可能無法解釋「資源耗盡」類型的連鎖反應
- 五行理論不完整

**需要執行的行動**：
- 維持現有實作
- 記錄此決策（可選）

---

### 選項 C：採納但簡化（例如：只在特定條件下觸發「洩」路徑）

**理由**：
- 平衡完整性和複雜度
- 可以解釋「資源耗盡」類型的連鎖反應，但不會產生過多警告

**代價**：
- 需要定義觸發條件
- 邏輯較複雜

**需要執行的行動**：
1. 定義觸發條件（例如：`final_score > 0.85` 且 `volatility > 0.35`）
2. 建立 ADR 記錄此決策
3. 更新 `cascade_calculator.py`（加入「洩」關係的計算邏輯，但只在特定條件下觸發）
4. 更新 `cascade_overrides.v1.0.json`（加入「洩」關係的覆寫模板）
5. 更新 `domain/knowledge_base/wuxing_5_elements.v1.0.json`（加入「洩」關係的定義）

---

## 🔍 需要評估的問題

### 問題 1：為什麼需要「洩」路徑？

**現有「剋」路徑無法解釋的場景**：
- 「資源耗盡」類型的連鎖反應
- 例如：過度付出導致自身資源耗盡，進而影響其他領域

**需要評估**：
- 這些場景是否真的需要「洩」路徑？
- 現有「剋」路徑是否可以通過其他方式解釋？

---

### 問題 2：雙向傳導是否會產生過多警告？

**現有 Anti-Spam 規則**：
- 最多 3 條 warning
- 如果加入「洩」路徑，可能會產生更多警告

**需要評估**：
- 雙向傳導是否會產生過多警告？
- Anti-Spam 規則是否需要調整？
- 如何平衡完整性和警告數量？

---

### 問題 3：是否需要建立 ADR？

**根據 CHARTER Section 3**：
- 任何結構性變更必須 ADR + 使用者批准
- 「洩」路徑是結構性變更

**需要評估**：
- 是否需要建立 ADR 記錄此決策？
- ADR 的內容應該包含什麼？

---

## 📝 建議的裁示選項

**建議選項**：選項 C（採納但簡化）

**理由**：
- 完整的五行理論確實包含「洩」路徑
- 但需要避免過度複雜化和產生過多警告
- 可以先在特定條件下觸發（例如：`final_score > 0.85` 且 `volatility > 0.35`）

---

## ✅ 驗收標準

### 必須完成

1. ✅ 決策已做出（選項 A/B/C）
2. ✅ 如果採用選項 A 或 C，ADR 已建立
3. ✅ 如果採用選項 A 或 C，實作已更新

### 建議完成

4. ✅ 如果採用選項 A 或 C，觸發條件已定義（選項 C）
5. ✅ 如果採用選項 A 或 C，Anti-Spam 規則已調整（如果需要）
6. ✅ 如果採用選項 B，決策已記錄

---

## 📦 交付物

完成後應產出：
1. ✅ 決策報告（選項 A/B/C 的選擇和理由）
2. ✅ 如果採用選項 A 或 C：
   - ADR 文件（`docs/adr/ADR_XXXX_wuxing_exhaustion_path.md`）
   - 更新的 `cascade_calculator.py`
   - 更新的 `cascade_overrides.v1.0.json`
   - 更新的 `domain/knowledge_base/wuxing_5_elements.v1.0.json`
3. ✅ 如果採用選項 B：
   - 決策記錄（可選）

---

**建立日期**：2026-01-13  
**執行對象**：Gemini（顧問）  
**狀態**：等待裁示
