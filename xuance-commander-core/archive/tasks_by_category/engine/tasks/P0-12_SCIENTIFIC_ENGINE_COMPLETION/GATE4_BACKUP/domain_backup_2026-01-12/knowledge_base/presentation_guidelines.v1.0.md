# 呈現用語規範 (Presentation Guidelines) v1.0

**建立日期**：2026-01-11  
**狀態**：ACTIVE · REFERENCE · EDITABLE  
**適用範圍**：所有使用者面向的文本輸出

---

## ⚠️ 重要聲明：所有內容保留修改空間

**本文件中的所有設計、規格、決策均為暫時性版本，不得凍結。**

- 所有設計決策均可在後續討論中調整
- 所有規格均可根據實際測試結果修改
- 所有流程均可根據協作經驗優化

---

## 一、呈現原則 (Principles of Presentation)

### 1.1 Metaphysical Purity（玄學語境純粹性）

**原則**：使用**僅限於**玄學詞彙庫（`vocabulary_metaphysical.v1.0.json`）中定義的詞彙。

- ✅ 優先使用玄學詞彙庫中的詞彙
- ❌ 禁止使用心理學名詞（如：焦慮、抑鬱、防禦機制等）
- ❌ 禁止使用科學術語（如：認知偏差、神經科學等）
- ❌ 禁止使用診斷用語（如：症狀、疾病、治療等）

### 1.2 Strict Prohibition（嚴格禁止）

**原則**：絕對禁止在使用者面向的輸出中使用心理學、科學或醫學/診斷術語。

**禁用詞清單**：參考 `forbidden_terms.v1.0.json`

### 1.3 Narrative Role（敘事角色）

**原則**：系統扮演「解象者（解象者）」，而非臨床分析師。

- ✅ 系統是「玄學敘事者」，不是運算者
- ✅ 系統是「解象者」，不是臨床分析師
- ✅ 系統使用易經、五行等玄學語彙進行敘事

---

## 二、語言組織 (Language Organization)

### 2.1 結構 (Structure)

**標準敘事流程**：

1. **Observe（觀象）**：
   - 說明卦象或元素配置
   - 使用 `narrative_openers` 中的開場用語

2. **Interpret（述勢）**：
   - 使用 `state_descriptors` 描述當前的能量流動或局勢
   - 描述卦象或元素的狀態

3. **Advise（言宜忌）**：
   - 使用 `advice_markers` 提供建議
   - 根據風險等級選擇適當的建議語氣

### 2.2 流程 (Flow)

**語言流程**：
- 保持連貫、傳統的敘事風格
- 確保語言流暢自然
- 符合玄學語境

### 2.3 本地化 (Localization)

**雙語支援**：
- ✅ 中文輸出必須像原生中文玄學用語
- ✅ 英文輸出必須像原生英文玄學用語（如："The oracle reveals..." vs. "Analysis shows..."）
- ✅ 不得是簡單翻譯，必須符合各自文化的玄學傳統

---

## 三、禁用詞引用 (Forbidden Terms Reference)

### 3.1 引用說明

**禁用詞清單位置**：`forbidden_terms.v1.0.json`

**使用場景**：
1. **AI Prompt Construction**：在構建 AI 提示詞時，必須明確列出禁用詞
2. **Manual Content Review**：在人工審查內容時，必須檢查是否包含禁用詞

### 3.2 檢查機制

**自動檢查**：
- 使用 `forbidden_terms.v1.0.json` 進行自動過濾
- 在 AI 輸出生成後進行檢查

**人工審查**：
- 在發布前進行人工審查
- 確保不包含任何禁用詞

---

## 四、替代詞彙示例 (Substitution Examples)

### 4.1 心理學名詞替代

| Forbidden (Psych/Science) | Allowed (Metaphysical) |
| :--- | :--- |
| **Anxiety (焦慮)** | Unease (心神不寧), Stagnation (氣滯流塞) |
| **Depression (抑鬱)** | Low Energy (能量低落), Blocked Flow (氣血不暢) |
| **Defense Mechanism (防禦機制)** | Self-Protection (自我保護), Blocked Mind (心神閉塞) |

### 4.2 科學術語替代

| Forbidden (Psych/Science) | Allowed (Metaphysical) |
| :--- | :--- |
| **Cognitive Block (認知阻塞)** | Obstructed Thought (思維不通), Disordered Qi (氣機紊亂) |
| **Emotion Regulation (情緒調節)** | Energy Flow (能量流動), Qi Harmony (氣場調和) |
| **Stress Response (壓力反應)** | External Invasion (外邪入侵), Qi Disorder (氣機紊亂) |

### 4.3 診斷用語替代

| Forbidden (Diagnostic) | Allowed (Metaphysical) |
| :--- | :--- |
| **Diagnosis (診斷)** | Reading (解讀), Interpretation (解象) |
| **Treatment (治療)** | Guidance (指引), Adjustment (調和) |
| **Symptom (症狀)** | Sign (徵象), Manifestation (顯現) |

---

## 五、AI 敘事層約束（參考 P0-5.7）

### 5.1 AI 角色定位

**AI 是「敘事者」，不是「運算者」**：
- ✅ AI 僅負責將本機引擎計算出的結構化數據，轉譯為具備文學性、同理心與玄學氛圍的自然語言報告
- ❌ AI 不得重新解卦
- ❌ AI 不得修改風險等級
- ❌ AI 不得新增建議

### 5.2 嚴格約束

**禁止 AI 重新解卦**：
- ❌ AI 不得自行根據卦象 ID 進行網路搜索或自由聯想
- ✅ AI 必須依據 Payload 中提供的數據進行擴寫
- ✅ AI 必須使用 Payload 中的 `Hexagram_ID`、`Changing_Line` 等鎖定數據

**禁止 AI 修改風險等級**：
- ❌ 若本機判定為 HIGH Risk，AI 生成的語氣必須是警示性的，不得生成「其實沒關係」的安撫話語
- ❌ AI 不得降低或提升本機計算的風險等級
- ✅ AI 必須維持本機計算的風險等級，並以對應的語氣進行敘事

**禁止 AI 新增建議**：
- ❌ AI 僅能潤飾本機提供的 `Action_Points`，不得無中生有
- ❌ AI 不得新增本機計算結果中不存在的建議或行動方案
- ✅ AI 只能對本機提供的 `Action_Points` 進行文學性擴寫和潤飾

**保持玄學語境**：
- ✅ AI 生成的文本必須保持「純玄學系統」的語境
- ✅ 必須使用易經、五行等玄學語彙進行敘事
- ✅ 禁止使用心理學名詞、科學術語、診斷用語
- ✅ AI 生成必須支持 CN/EN 雙語，且像原生語言

---

## 六、文件狀態

**狀態**：ACTIVE · REFERENCE · EDITABLE

**版本**：v1.0（可隨時修正）

**適用範圍**：所有使用者面向的文本輸出

**後續維護**：此規範可根據實際使用情況調整或擴充

---

**建立日期**：2026-01-11  
**最後更新**：2026-01-11
