# P0-11 階段三任務包：詞彙庫與對應關係

**建立日期**：2026-01-11  
**狀態**：READY FOR EXECUTION  
**階段**：階段三（詞彙庫與對應關係）

---

## ⚠️ 重要聲明：所有內容保留修改空間

**本任務包中的所有設計、規格、決策均為暫時性版本，不得凍結。**

- 所有設計決策均可在後續討論中調整
- 所有規格均可根據實際測試結果修改
- 所有流程均可根據協作經驗優化

**目標**：建立一個**可運作、可測試、可持續調整**的基礎版本，而非完美終版。

---

## 一、任務概述

### 1.1 階段一、二完成狀態

✅ **階段一已完成**：
- ✅ 64 卦基礎知識庫
- ✅ 五行基礎知識庫
- ✅ 八卦基礎知識庫
- ✅ 基礎對應關係表

✅ **階段二已完成**（條件式完成）：
- ✅ Root Element Mapper（功能完整，治理補強聲明已建立）
- ✅ Hexagram Deriver（功能完整，治理補強聲明已建立）
- ✅ Collision Calculator（功能完整，治理補強聲明已建立）

**詳細報告**：
- `P0-11_PHASE1_COMPLETION_SUMMARY.md`
- `P0-11_PHASE2_CONDITIONAL_ACCEPTANCE.md`

### 1.2 階段三目標

**本次任務包要達成什麼**：

> 建立完整的玄學詞彙庫、心理學對應詞彙表、呈現用語規範，以及禁用詞清單，為階段四（題目設計與結果呈現）和後續的 AI 整合提供詞彙基礎。

### 1.3 任務重要性

**阻塞關係**：
- **阻塞**：階段四（題目設計與結果呈現）、AI 整合設計（P0-14）、結果呈現頁面設計（P0-13）
- **被阻塞**：階段一、階段二 ← 已解除

**理由**：
- 詞彙庫是呈現層的基礎，不完整無法進行題目設計和結果呈現
- 詞彙庫需要基於階段一的知識庫資料

---

## 二、任務範圍與目標

### 2.1 玄學詞彙庫（CN/EN）

**目標文件**：`domain/knowledge_base/vocabulary_metaphysical.v1.0.json`

**需要內容**：

1. **基礎詞彙**
   - 易經詞彙（卦名、卦辭關鍵詞等）
   - 五行詞彙（元素名稱、特性描述等）
   - 八卦詞彙（卦名、特性描述等）

2. **形容詞與修飾語**
   - 描述狀態的形容詞（如：通達、阻塞、流動等）
   - 描述關係的形容詞（如：相生、相剋、共振等）
   - 描述趨勢的形容詞（如：上升、下降、穩定等）

3. **敘事用語**
   - 開場用語（如：觀卦、察象等）
   - 解釋用語（如：此卦象顯示、當前局勢為等）
   - 建議用語（如：宜、忌、當等）
   - 警示用語（如：需注意、謹慎等）

4. **雙語支援**
   - 中文詞彙庫（原生中文玄學用語）
   - 英文詞彙庫（原生英文玄學用語，非翻譯）

**建議 JSON 結構**：
```json
{
  "version": "1.0",
  "categories": {
    "hexagram_names": {
      "zh": {...},
      "en": {...}
    },
    "element_properties": {
      "zh": {...},
      "en": {...}
    },
    "state_descriptors": {
      "zh": [...],
      "en": [...]
    },
    "narrative_openers": {
      "zh": [...],
      "en": [...]
    },
    "advice_markers": {
      "zh": [...],
      "en": [...]
    }
  }
}
```

### 2.2 心理學對應詞彙表（內部使用）

**目標文件**：`domain/knowledge_base/vocabulary_psychology_mapping.v1.0.json`

**說明**：此文件僅供內部使用，不對使用者暴露。

**需要內容**：

1. **對應關係表**
   - 玄學詞彙 → 心理學概念（如：「氣滯流塞」→「認知阻塞」）
   - 玄學狀態 → 心理學狀態（如：「心神閉塞」→「防禦機制啟動」）
   - 玄學關係 → 心理學關係（如：「相剋」→「認知衝突」）

2. **對應邏輯說明**
   - 如何建立對應關係
   - 對應關係的驗證機制
   - 對應關係的維護方法

**建議 JSON 結構**：
```json
{
  "version": "1.0",
  "internal_only": true,
  "mappings": {
    "metaphysical_term": {
      "psychological_concept": "...",
      "validation_note": "..."
    }
  }
}
```

### 2.3 呈現用語規範

**目標文件**：`domain/knowledge_base/presentation_guidelines.v1.0.json` 或 Markdown 文件

**需要內容**：

1. **呈現原則**
   - 如何選擇詞彙（優先使用玄學詞彙庫中的詞彙）
   - 如何組織語言（保持玄學語境純粹性）
   - 如何保持玄學語境（禁用心理學名詞、科學術語）

2. **禁用詞清單**
   - 不得使用的心理學名詞（如：焦慮、抑鬱、防禦機制等）
   - 不得使用的科學術語（如：認知偏差、神經科學等）
   - 不得使用的診斷用語（如：症狀、疾病、治療等）

3. **替代詞彙建議**
   - 心理學名詞的玄學替代詞（如：「焦慮」→「心神不寧」）
   - 科學術語的玄學替代詞（如：「認知阻塞」→「氣滯流塞」）

**建議格式**：Markdown 文件或 JSON（如需要結構化查詢）

### 2.4 禁用詞清單

**目標文件**：`domain/knowledge_base/forbidden_terms.v1.0.json`

**需要內容**：

1. **禁用詞列表**
   - 心理學名詞列表（CN/EN）
   - 科學術語列表（CN/EN）
   - 診斷用語列表（CN/EN）

2. **替代建議**
   - 每個禁用詞的建議替代詞（從玄學詞彙庫中選擇）

**建議 JSON 結構**：
```json
{
  "version": "1.0",
  "categories": {
    "psychological_terms": {
      "zh": {
        "焦慮": {"forbidden": true, "suggested_alternative": "心神不寧"},
        ...
      },
      "en": {
        "anxiety": {"forbidden": true, "suggested_alternative": "unease"},
        ...
      }
    },
    "scientific_terms": {...},
    "diagnostic_terms": {...}
  }
}
```

---

## 三、參考資料

### 3.1 階段一交付物（知識庫）

- `domain/knowledge_base/hexagram_64_full.v1.0.json` - 64 卦基礎知識庫（包含卦名、關鍵詞）
- `domain/knowledge_base/wuxing_5_elements.v1.0.json` - 五行基礎知識庫（包含屬性、象徵意義）
- `domain/knowledge_base/bagua_8_trigrams.v1.0.json` - 八卦基礎知識庫（包含卦名、屬性）

### 3.2 階段二交付物（運算引擎）

- `engine/root_element_mapper.py` - Root Element Mapper
- `engine/hexagram_deriver.py` - Hexagram Deriver
- `engine/collision_calculator.py` - Collision Calculator

### 3.3 系統設計文件

- `P0-5.5_ELEMENT_SELECTION_DECISION.md` - 易經矩陣系統決策
- `P0-5.7_DESIGN_DOC_FINAL.md` - 世界觀設計文檔（包含 AI 敘事層約束）
- `DESIGN_DIRECTION_SUMMARY_2026-01-11.md` - 設計方向摘要

### 3.4 舊版本資料（參考）

- `docs/legacy/115_1_3_my-first-app_failed/` - 舊版本詞彙和敘事資料（可參考，但需過濾）

---

## 四、執行要求

### 4.1 格式要求

- ✅ JSON 格式（詞彙庫、對應表、禁用詞清單）
- ✅ Markdown 格式（呈現用語規範，如需要）
- ✅ UTF-8 編碼
- ✅ 雙語支援（中英文）

### 4.2 品質要求

- ✅ 詞彙完整（覆蓋所有階段一知識庫中的詞彙）
- ✅ 對應關係準確（心理學對應關係有明確依據）
- ✅ 語境純粹性（玄學詞彙庫不混入心理學名詞）
- ✅ 禁用詞清單完整（覆蓋常見的心理學、科學、診斷用語）

### 4.3 驗收標準

- ✅ 功能驗收：
  - 玄學詞彙庫包含所有必要的詞彙類別
  - 心理學對應詞彙表完整且準確
  - 呈現用語規範清晰明確
  - 禁用詞清單完整且有替代建議
- ✅ 一致性驗收：
  - 詞彙庫與階段一知識庫一致
  - 對應關係與系統設計一致
- ✅ 整合驗收：
  - 詞彙庫可被階段四和 AI 整合使用
  - 禁用詞清單可被 AI 提示詞使用

---

## 五、交付物清單

1. ⏳ `domain/knowledge_base/vocabulary_metaphysical.v1.0.json` - 玄學詞彙庫（CN/EN）
2. ⏳ `domain/knowledge_base/vocabulary_psychology_mapping.v1.0.json` - 心理學對應詞彙表（內部使用）
3. ⏳ `domain/knowledge_base/presentation_guidelines.v1.0.json` 或 `.md` - 呈現用語規範
4. ⏳ `domain/knowledge_base/forbidden_terms.v1.0.json` - 禁用詞清單

---

## 六、執行建議

### 6.1 執行順序

建議按以下順序執行：
1. **第一步**：建立玄學詞彙庫（因為它是基礎，其他文件會引用它）
2. **第二步**：建立禁用詞清單（因為它相對獨立，且可與詞彙庫對照）
3. **第三步**：建立心理學對應詞彙表（因為它依賴詞彙庫）
4. **第四步**：建立呈現用語規範（因為它整合前面所有文件）

### 6.2 資料來源策略

**從階段一知識庫提取**：
- 從 `hexagram_64_full.v1.0.json` 提取卦名、關鍵詞
- 從 `wuxing_5_elements.v1.0.json` 提取五行屬性、象徵意義
- 從 `bagua_8_trigrams.v1.0.json` 提取八卦屬性

**從系統設計文件提取**：
- 從 `P0-5.7_DESIGN_DOC_FINAL.md` 提取 AI 敘事層約束和禁用詞要求
- 從 `DESIGN_DIRECTION_SUMMARY_2026-01-11.md` 提取語境要求

**參考舊版本資料**：
- 從 `docs/legacy/` 中參考舊版本的詞彙和敘事方式（但需過濾心理學名詞）

---

## 七、成功標準

### 7.1 功能完整性

- [ ] 玄學詞彙庫包含所有必要的詞彙類別（卦名、五行、八卦、狀態描述、敘事用語等）
- [ ] 心理學對應詞彙表完整且準確
- [ ] 呈現用語規範清晰明確
- [ ] 禁用詞清單完整且有替代建議

### 7.2 一致性

- [ ] 詞彙庫與階段一知識庫一致
- [ ] 對應關係與系統設計一致

### 7.3 整合性

- [ ] 詞彙庫可被階段四和 AI 整合使用
- [ ] 禁用詞清單可被 AI 提示詞使用

---

**任務狀態**：READY FOR EXECUTION  
**建立日期**：2026-01-11
