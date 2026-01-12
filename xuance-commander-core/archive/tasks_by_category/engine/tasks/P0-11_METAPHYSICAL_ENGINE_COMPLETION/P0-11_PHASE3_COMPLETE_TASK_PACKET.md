# P0-11 階段三完整任務包：詞彙庫與對應關係（含階段二補強）

**建立日期**：2026-01-11  
**狀態**：READY FOR EXECUTION  
**階段**：階段三（詞彙庫與對應關係）+ 階段二補強

---

## ⚠️ 重要聲明：所有內容保留修改空間

**本任務包中的所有設計、規格、決策均為暫時性版本，不得凍結。**

- 所有設計決策均可在後續討論中調整
- 所有規格均可根據實際測試結果修改
- 所有流程均可根據協作經驗優化

**目標**：建立一個**可運作、可測試、可持續調整**的基礎版本，而非完美終版。

---

## 📋 文件導航（快速定位）

- **一、背景資料摘要**：階段一、階段二完成狀態與關鍵決策
- **二、階段二補強任務**：需要先完成的治理補強聲明
- **三、階段三核心任務**：詞彙庫與對應關係建立
- **四、執行要求與驗收標準**：品質要求與成功標準

---

## 一、背景資料摘要（避免上下文遺忘）

### 1.1 階段一完成狀態

**✅ 階段一已完成**（2026-01-11）

**交付物**：
1. ✅ `domain/knowledge_base/hexagram_64_full.v1.0.json` - 64 卦基礎知識庫
2. ✅ `domain/knowledge_base/wuxing_5_elements.v1.0.json` - 五行基礎知識庫
3. ✅ `domain/knowledge_base/bagua_8_trigrams.v1.0.json` - 八卦基礎知識庫
4. ✅ `domain/knowledge_base/mapping_tables.v1.0.json` - 基礎對應關係表

**關鍵資料結構**（供階段三參考）：

**64 卦知識庫結構**：
- 每個卦包含：`id` (0-63), `code` (六爻編碼), `name` (中英文), `structure` (上下卦), `keywords` (中英文), `psychological_mapping` (archetype, state, desc), `risk_level` (0-5)

**五行知識庫結構**：
- 每個元素包含：`id` (WOOD/FIRE/EARTH/METAL/WATER), `name` (中英文), `properties` (中英文), `symbolism` (中英文), `psychological_mapping` (state, behavior, desc), `relationships` (generates, controlled_by, controls, generated_by)

**八卦知識庫結構**：
- 每個卦包含：`id` (QIAN/KUN/ZHEN/XUN/KAN/LI/GEN/DUI), `code` (三爻編碼), `name` (中英文), `properties` (中英文), `symbolism` (中英文), `element` (對應五行)

**對應關係表結構**：
- `hexagram_to_risk`: 64 卦 → 風險等級對應表
- `risk_to_hexagrams`: 風險等級 → 卦象列表對應表
- `element_to_psychological_state`: 五行 → 心理狀態對應表
- `risk_level_definitions`: 風險等級定義（0-5，中英文）

**詳細報告**：`P0-11_PHASE1_COMPLETION_SUMMARY.md`

### 1.2 階段二完成狀態

**✅ 階段二已完成（條件式完成）**（2026-01-11）

**交付物狀態**：
- ✅ `engine/root_element_mapper.py` - Root Element Mapper（功能完整，需補充治理聲明）
- ✅ `engine/hexagram_deriver.py` - Hexagram Deriver（功能完整，需補充治理聲明）
- ✅ `engine/collision_calculator.py` - Collision Calculator（功能完整，需補充治理聲明）

**關鍵實作細節**（供階段三參考）：

**Root Element Mapper**：
- 使用年份尾數法計算天干對應五行
- 支持 DOB (YYYY-MM-DD) 解析
- 容錯處理：無效 DOB → 返回 EARTH
- 輸出包含：`root_element`, `is_derived`, `name`, `properties`, `psychological_mapping`

**Hexagram Deriver**：
- 支持 Facet 映射查表（優先）和 Trigram 組合運算（Fallback）
- 變爻計算：基於 Stage 3 強度分數 (0-100) → 變爻位置 (1-6)
- 輸出包含：`base_hexagram`, `variable_line`, `reading_summary`
- ⚠️ **注意**：變爻結果僅計算位置，不計算結果卦（Phase 3 責任）

**Collision Calculator**：
- 從 `wuxing_5_elements.v1.0.json` 讀取五行生剋關係
- 輸出結構化 Key：`GENERATES`, `CONTROLS`, `GENERATED_BY`, `CONTROLLED_BY`, `SAME_AS`
- 輸出包含：`root`, `target`, `collision_key`, `context` (archetype, flow)
- ⚠️ **注意**：`context` 中的 `archetype` 和 `flow` 為 Symbolic Key，非語義

**詳細報告**：`P0-11_PHASE2_CONDITIONAL_ACCEPTANCE.md`

### 1.3 系統設計核心原則（必須遵循）

**核心原則**（來自 `P0-5.5_ELEMENT_SELECTION_DECISION.md` 和 `P0-5.7_DESIGN_DOC_FINAL.md`）：

1. **雙重計算一致性**：
   - 科學計算和玄學計算必須同時進行，結果必須一致
   - 科學結果作為驗證基準，玄學結果作為表層呈現

2. **前端不可外顯規範**：
   - 使用者視角：此系統必須被感知為「完整玄學系統」
   - 禁止事項：不得向使用者揭露心理學名詞、科學引擎、或「其實不是玄學」的說明
   - 允許事項：內部可保留對應表、推導理由、風險鏈證據（供審計與維護）

3. **AI 敘事層約束**（來自 `P0-5.7_DESIGN_DOC_FINAL.md`）：
   - AI 是「敘事者」，不是「運算者」
   - 禁止 AI 重新解卦、修改風險等級、新增建議
   - 必須遵守「純玄學系統」語境，禁用心理學名詞、科學術語
   - 必須支持 CN/EN 雙語，且像原生語言

4. **語境純粹性要求**：
   - 所有玄學相關的資料、邏輯、詞彙，都必須保持「純玄學系統」語境
   - 嚴禁混入心理學名詞、科學術語，或任何削弱玄學感的解釋
   - 範例：不使用「焦慮指數」，而是使用「氣滯流塞」；不解釋「心理防禦機制」，而是描述「心神閉塞」

---

## 二、階段二補強任務（需先完成）

### 2.1 補強任務說明

**狀態**：⚠️ **需補強**（不阻塞階段三，但建議先完成）

**原因**：階段二交付物功能完整，但需要補充治理聲明，確保符合「可回滾、不凍結」原則。

**補強方式**：在代碼註解中補充聲明，或使用獨立治理文檔（已建立 `P0-11_PHASE2_GOVERNANCE_SUPPLEMENTS.md`）。

### 2.2 四項補強聲明（可直接使用）

#### 2.2.1 Root Element Mapper 治理聲明

**需要補強的文件**：`engine/root_element_mapper.py`

**補強聲明**（建議添加到模組文檔字符串或類別文檔字符串）：

```python
"""
Root Element Mapper
負責推導使用者的本命元素 (Root Element)。
完全依賴外部知識庫 (wuxing_5_elements.v1.0.json) 進行邏輯判斷。

⚠️ 治理聲明：演算法非權威性
- 本模組中實作的天干演算法（年份尾數法）僅為 Phase 2 Placeholder / Reference Implementation
- 不具權威性：此演算法不應被視為「標準」或「唯一正確」的計算方式
- 不具唯一性：Phase 3 或後續階段可完全替換此演算法，不影響系統 Canon
- 可擴展性：未來可加入地支、其他計算方式，或完全不同的演算法
- 向後兼容：即使演算法變更，輸出格式（root_element ID）保持穩定

Compliance: P0-11 Phase 2 Requirement 2.1
"""
```

#### 2.2.2 Hexagram Deriver 治理聲明（變爻結構）

**需要補強的文件**：`engine/hexagram_deriver.py`

**補強聲明**（建議添加到 `calculate_variable_line` 方法）：

```python
def calculate_variable_line(self, hex_id: int, intensity_score: int) -> Dict[str, Any]:
    """
    【變爻計算】
    基於 Stage 3 強度分數 (0-100) 決定變爻位置。
    算法：(分數 % 6) + 1 = 變爻位置 (1-6)
    
    ⚠️ 治理聲明：變爻結果結構定義
    - Phase 2 的變爻計算僅計算變爻位置，不計算結果卦
    - 結構定義：
      {
        "base_hexagram_id": int,      # 基礎卦 ID (0-63)
        "changing_line": int,          # 變爻位置 (1-6)
        "result_hexagram_id": None     # 結果卦 ID (Phase 2 保留為 None)
      }
    - 責任劃分：
      * Phase 2 責任：計算變爻位置、保留結構欄位
      * Phase 3 責任：實作結果卦計算邏輯（如需要）
    """
```

#### 2.2.3 Hexagram Deriver 治理聲明（Facet 預設值）

**需要補強的文件**：`engine/hexagram_deriver.py`

**補強聲明**（建議添加到 `load_facet_mapping` 方法）：

```python
def load_facet_mapping(self, facet_path: str = "domain/facets/income_expansion_pressure/hexagram_mapping.v1.0.json"):
    """
    載入特定 Facet 的錨定對照表。預設載入 Income/Expansion Facet。
    
    ⚠️ 治理聲明：Facet 預設值非業務語義
    - 預設 Facet 路徑（income_expansion_pressure）僅為 Example / Dev Default
    - 不具業務優先順序：此預設值不表示該 Facet 是系統的核心或優先 Facet
    - 不具語義優先性：此預設值僅用於開發和測試，不影響生產環境的業務邏輯
    - 可替換性：正式 Facet 必須由 Phase 3 / Phase 4 的業務邏輯注入
    - 向後兼容：即使預設值變更，方法接口保持穩定
    """
```

#### 2.2.4 Collision Calculator 治理聲明

**需要補強的文件**：`engine/collision_calculator.py`

**補強聲明**（建議添加到 `_get_context_key` 方法或模組文檔字符串）：

```python
def _get_context_key(self, key: str) -> Dict[str, str]:
    """
    返回對應的心理原型 Key，供 Stage 3 敘事層查找。
    
    ⚠️ 治理聲明：輸出為 Symbolic Key
    - 返回的 archetype 和 flow 欄位不是語義，而是 Symbolic Key
    - Symbolic Key 定義：僅作為 Phase 3 Narrative Resolver 的 lookup key，不應被直接解讀為心理狀態描述
    - 非語義性：這些 Key 不包含任何可被使用者直接閱讀的心理語義
    - 可替換性：Phase 3 可以完全重新定義這些 Key 的映射關係
    - 向後兼容：即使 Key 名稱變更，collision_key 欄位保持穩定
    
    替代命名建議（如需要更明確）：
    - archetype → collision_symbol
    - flow → flow_direction_key
    """
```

### 2.3 補強執行建議

**優先級**：中等（建議在階段三開始前完成，但不阻塞階段三）

**執行方式**：
1. **方式一（推薦）**：直接在三個 Python 文件中補充上述註解
2. **方式二**：引用已建立的 `P0-11_PHASE2_GOVERNANCE_SUPPLEMENTS.md` 文件
3. **方式三**：兩者結合（代碼註解 + 獨立文檔引用）

**驗收標準**：
- ✅ 所有治理聲明已補充（四項）
- ✅ 代碼文件或文檔中有明確聲明
- ✅ 聲明內容符合「可回滾、不凍結」原則

---

## 三、階段三核心任務：詞彙庫與對應關係

### 3.1 任務目標

**本次任務包要達成什麼**：

> 建立完整的玄學詞彙庫、心理學對應詞彙表、呈現用語規範，以及禁用詞清單，為階段四（題目設計與結果呈現）和後續的 AI 整合提供詞彙基礎。

### 3.2 任務重要性

**阻塞關係**：
- **阻塞**：階段四（題目設計與結果呈現）、AI 整合設計（P0-14）、結果呈現頁面設計（P0-13）
- **被阻塞**：階段一、階段二 ← 已解除

**理由**：
- 詞彙庫是呈現層的基礎，不完整無法進行題目設計和結果呈現
- 詞彙庫需要基於階段一的知識庫資料
- AI 敘事層需要詞彙庫和禁用詞清單來生成符合語境的內容

---

## 四、交付物詳細規格

### 4.1 交付物 1：玄學詞彙庫（CN/EN）

**目標文件**：`domain/knowledge_base/vocabulary_metaphysical.v1.0.json`

**需要內容**：

1. **基礎詞彙**
   - **易經詞彙**：
     - 64 卦名稱（從 `hexagram_64_full.v1.0.json` 提取，已有中英文）
     - 卦辭關鍵詞（從 `hexagram_64_full.v1.0.json` 的 `keywords` 欄位提取）
     - 卦象描述詞（如：通達、阻塞、流動、靜止等）
   - **五行詞彙**：
     - 元素名稱（從 `wuxing_5_elements.v1.0.json` 提取，已有中英文）
     - 特性描述（從 `properties` 欄位提取，如：生長、擴展、承載、收斂等）
     - 象徵意義（從 `symbolism` 欄位提取，如：生命、意識、信任、正義、智慧等）
   - **八卦詞彙**：
     - 卦名（從 `bagua_8_trigrams.v1.0.json` 提取，已有中英文）
     - 特性描述（從 `properties` 欄位提取）
     - 象徵意義（從 `symbolism` 欄位提取）

2. **形容詞與修飾語**
   - **狀態描述詞**（從 64 卦的 `risk_level` 和 `psychological_mapping.state` 推導）：
     - 正面狀態：通達、順流、穩定、和諧、光明、豐盛等
     - 中性狀態：等待、積蓄、觀察、調整等
     - 負面狀態：阻塞、孤立、危險、耗損、困境等
   - **關係描述詞**（從五行的 `relationships` 推導）：
     - 相生：生、養、助、化等
     - 相剋：剋、制、約、破等
     - 其他：共振、對立、調和、轉化等
   - **趨勢描述詞**：
     - 上升：上升、增長、擴張、升騰等
     - 下降：下降、收縮、退卻、沉潛等
     - 穩定：穩定、平衡、保持、維持等

3. **敘事用語**
   - **開場用語**（用於結果呈現的開場）：
     - 中文：觀卦、察象、推演、顯現、呈現等
     - 英文：Observing the hexagram, Reading the signs, The oracle reveals 等
   - **解釋用語**（用於解釋卦象和狀態）：
     - 中文：此卦象顯示、當前局勢為、此時能量、此時氣場等
     - 英文：This hexagram indicates, The current situation shows, The energy flow suggests 等
   - **建議用語**（用於提供建議）：
     - 中文：宜、忌、當、適合、不宜、應當等
     - 英文：Favorable, Unfavorable, Suitable, Should, Avoid 等
   - **警示用語**（用於高風險情況）：
     - 中文：需注意、謹慎、小心、切忌等
     - 英文：Caution, Beware, Take care, Avoid 等

4. **雙語支援要求**
   - **中文詞彙庫**：使用原生中文玄學用語，不混入現代科學術語
   - **英文詞彙庫**：使用原生英文玄學用語（如：Oracle, Divination, Augury 等），非簡單翻譯
   - **對應關係**：確保中英文詞彙在語境上對應，而非字面翻譯

**建議 JSON 結構**：
```json
{
  "version": "1.0",
  "categories": {
    "hexagram_names": {
      "zh": {
        "0": "乾",
        "1": "坤",
        ...
      },
      "en": {
        "0": "The Creative",
        "1": "The Receptive",
        ...
      }
    },
    "element_properties": {
      "zh": {
        "WOOD": ["生長", "擴展", "向上", "條理"],
        "FIRE": ["熱能", "顯化", "加速", "升騰"],
        ...
      },
      "en": {
        "WOOD": ["Growth", "Expansion", "Upward movement", "Structuring"],
        "FIRE": ["Heat", "Manifestation", "Acceleration", "Ascending"],
        ...
      }
    },
    "state_descriptors": {
      "zh": {
        "positive": ["通達", "順流", "穩定", "和諧", "光明", "豐盛"],
        "neutral": ["等待", "積蓄", "觀察", "調整"],
        "negative": ["阻塞", "孤立", "危險", "耗損", "困境"]
      },
      "en": {
        "positive": ["Flow", "Harmony", "Stability", "Clarity", "Abundance"],
        "neutral": ["Waiting", "Accumulation", "Observation", "Adjustment"],
        "negative": ["Blockage", "Isolation", "Danger", "Depletion", "Obstruction"]
      }
    },
    "narrative_openers": {
      "zh": ["觀卦", "察象", "推演", "顯現", "呈現"],
      "en": ["Observing the hexagram", "Reading the signs", "The oracle reveals", "The divination shows"]
    },
    "advice_markers": {
      "zh": {
        "favorable": ["宜", "適合", "應當"],
        "unfavorable": ["忌", "不宜", "切忌"],
        "caution": ["需注意", "謹慎", "小心"]
      },
      "en": {
        "favorable": ["Favorable", "Suitable", "Should"],
        "unfavorable": ["Unfavorable", "Avoid", "Do not"],
        "caution": ["Caution", "Beware", "Take care"]
      }
    }
  }
}
```

### 4.2 交付物 2：心理學對應詞彙表（內部使用）

**目標文件**：`domain/knowledge_base/vocabulary_psychology_mapping.v1.0.json`

**⚠️ 重要聲明**：此文件僅供內部使用，不對使用者暴露。

**需要內容**：

1. **對應關係表**
   - **玄學詞彙 → 心理學概念**：
     - 範例：「氣滯流塞」→「認知阻塞」
     - 範例：「心神閉塞」→「防禦機制啟動」
     - 範例：「能量流動」→「情緒調節」
   - **玄學狀態 → 心理學狀態**：
     - 範例：「通達、順流」→「Flow State（心流狀態）」
     - 範例：「阻塞、孤立」→「認知失調（Cognitive Dissonance）」
     - 範例：「危險、耗損」→「高焦慮/危機狀態（High Anxiety / Crisis）」
   - **玄學關係 → 心理學關係**：
     - 範例：「相生」→「正向強化（Positive Reinforcement）」
     - 範例：「相剋」→「認知衝突（Cognitive Conflict）」
     - 範例：「共振」→「共鳴（Resonance）」

2. **對應邏輯說明**
   - **如何建立對應關係**：
     - 基於階段一知識庫中的 `psychological_mapping` 欄位
     - 基於階段二運算引擎的輸出（如 Collision Calculator 的 collision_key）
     - 基於系統設計文檔中的雙重計算機制
   - **對應關係的驗證機制**：
     - 確保每個對應關係都有明確的理論依據
     - 確保對應關係與系統設計一致
   - **對應關係的維護方法**：
     - 標註對應關係的來源和依據
     - 標註對應關係的適用範圍和限制

**建議 JSON 結構**：
```json
{
  "version": "1.0",
  "internal_only": true,
  "metadata": {
    "purpose": "Internal mapping between metaphysical terms and psychological concepts",
    "usage": "For system validation and maintenance only, NOT exposed to users",
    "source": "Based on Phase 1 knowledge base psychological_mapping fields"
  },
  "mappings": {
    "metaphysical_to_psychological": {
      "氣滯流塞": {
        "psychological_concept": "認知阻塞",
        "english_term": "Cognitive Blockage",
        "source": "hexagram_64_full.v1.0.json - psychological_mapping.state",
        "validation_note": "Based on hexagram risk_level mapping"
      },
      "心神閉塞": {
        "psychological_concept": "防禦機制啟動",
        "english_term": "Defense Mechanism Activation",
        "source": "wuxing_5_elements.v1.0.json - psychological_mapping.desc",
        "validation_note": "Metaphorical mapping, not diagnostic"
      }
    },
    "state_mappings": {
      "通達、順流": {
        "psychological_state": "Flow State（心流狀態）",
        "risk_level": 0,
        "source": "mapping_tables.v1.0.json - risk_level_definitions"
      },
      "阻塞、孤立": {
        "psychological_state": "認知失調（Cognitive Dissonance）",
        "risk_level": 4,
        "source": "hexagram_64_full.v1.0.json - hexagram_id 11"
      }
    },
    "relationship_mappings": {
      "相生": {
        "psychological_relation": "正向強化（Positive Reinforcement）",
        "source": "wuxing_5_elements.v1.0.json - relationships.generates"
      },
      "相剋": {
        "psychological_relation": "認知衝突（Cognitive Conflict）",
        "source": "wuxing_5_elements.v1.0.json - relationships.controls"
      }
    }
  }
}
```

### 4.3 交付物 3：呈現用語規範

**目標文件**：`domain/knowledge_base/presentation_guidelines.v1.0.md`（Markdown 格式，易於閱讀和維護）

**需要內容**：

1. **呈現原則**
   - **如何選擇詞彙**：
     - 優先使用玄學詞彙庫中的詞彙
     - 避免使用心理學名詞、科學術語、診斷用語
     - 確保詞彙符合「純玄學系統」語境
   - **如何組織語言**：
     - 保持玄學語境純粹性
     - 使用敘事用語（開場用語、解釋用語、建議用語、警示用語）
     - 確保語言流暢自然，像原生語言
   - **如何保持玄學語境**：
     - 禁止使用心理學名詞（如：焦慮、抑鬱、防禦機制等）
     - 禁止使用科學術語（如：認知偏差、神經科學等）
     - 禁止使用診斷用語（如：症狀、疾病、治療等）

2. **禁用詞清單引用**
   - 引用 `forbidden_terms.v1.0.json` 中的禁用詞列表
   - 說明如何使用禁用詞清單（AI 提示詞、人工審查等）

3. **替代詞彙建議**
   - **心理學名詞的玄學替代詞**：
     - 「焦慮」→「心神不寧」「氣滯流塞」
     - 「抑鬱」→「能量低落」「氣血不暢」
     - 「防禦機制」→「心神閉塞」「自我保護」
   - **科學術語的玄學替代詞**：
     - 「認知阻塞」→「氣滯流塞」「思維不通」
     - 「情緒調節」→「能量流動」「氣場調和」
     - 「壓力反應」→「外邪入侵」「氣機紊亂」

**建議格式**：Markdown 文件（結構清晰，易於閱讀和維護）

**建議結構**：
```markdown
# 呈現用語規範

## 一、呈現原則

### 1.1 詞彙選擇原則
...

### 1.2 語言組織原則
...

### 1.3 語境保持原則
...

## 二、禁用詞清單引用

參考 `forbidden_terms.v1.0.json`。

## 三、替代詞彙建議

### 3.1 心理學名詞替代
...

### 3.2 科學術語替代
...
```

### 4.4 交付物 4：禁用詞清單

**目標文件**：`domain/knowledge_base/forbidden_terms.v1.0.json`

**需要內容**：

1. **禁用詞列表**
   - **心理學名詞列表**（CN/EN）：
     - 中文：焦慮、抑鬱、防禦機制、認知偏差、情緒調節、壓力反應、創傷、心理疾病、心理治療等
     - 英文：Anxiety, Depression, Defense Mechanism, Cognitive Bias, Emotion Regulation, Stress Response, Trauma, Mental Illness, Psychotherapy 等
   - **科學術語列表**（CN/EN）：
     - 中文：認知科學、神經科學、心理學、精神醫學、腦科學、行為科學等
     - 英文：Cognitive Science, Neuroscience, Psychology, Psychiatry, Brain Science, Behavioral Science 等
   - **診斷用語列表**（CN/EN）：
     - 中文：症狀、疾病、診斷、治療、藥物、療法、康復、痊癒等
     - 英文：Symptom, Disease, Diagnosis, Treatment, Medication, Therapy, Recovery, Cure 等

2. **替代建議**
   - 每個禁用詞的建議替代詞（從玄學詞彙庫中選擇）
   - 替代詞的來源標註（從哪個知識庫或詞彙庫提取）

**建議 JSON 結構**：
```json
{
  "version": "1.0",
  "metadata": {
    "purpose": "List of forbidden terms for AI narrative generation",
    "usage": "Used in AI prompts to prevent exposure of psychological/scientific terms",
    "source": "Based on P0-5.7 design doc requirements"
  },
  "categories": {
    "psychological_terms": {
      "zh": {
        "焦慮": {
          "forbidden": true,
          "reason": "Psychological term, breaks metaphysical context",
          "suggested_alternatives": ["心神不寧", "氣滯流塞", "心神不安"],
          "alternative_source": "vocabulary_metaphysical.v1.0.json - state_descriptors.negative"
        },
        "抑鬱": {
          "forbidden": true,
          "reason": "Psychological term, breaks metaphysical context",
          "suggested_alternatives": ["能量低落", "氣血不暢", "心神低迷"],
          "alternative_source": "vocabulary_metaphysical.v1.0.json - state_descriptors.negative"
        }
      },
      "en": {
        "anxiety": {
          "forbidden": true,
          "reason": "Psychological term, breaks metaphysical context",
          "suggested_alternatives": ["Unease", "Restlessness", "Disquiet"],
          "alternative_source": "vocabulary_metaphysical.v1.0.json - state_descriptors.negative"
        }
      }
    },
    "scientific_terms": {
      "zh": {...},
      "en": {...}
    },
    "diagnostic_terms": {
      "zh": {...},
      "en": {...}
    }
  }
}
```

---

## 五、參考資料（完整路徑）

### 5.1 階段一交付物（知識庫）

- `domain/knowledge_base/hexagram_64_full.v1.0.json` - 64 卦基礎知識庫
- `domain/knowledge_base/wuxing_5_elements.v1.0.json` - 五行基礎知識庫
- `domain/knowledge_base/bagua_8_trigrams.v1.0.json` - 八卦基礎知識庫
- `domain/knowledge_base/mapping_tables.v1.0.json` - 基礎對應關係表

### 5.2 階段二交付物（運算引擎）

- `engine/root_element_mapper.py` - Root Element Mapper
- `engine/hexagram_deriver.py` - Hexagram Deriver
- `engine/collision_calculator.py` - Collision Calculator

### 5.3 系統設計文件

- `P0-5.5_ORIENTAL_ELEMENT_CONSULTATION/P0-5.5_ELEMENT_SELECTION_DECISION.md` - 易經矩陣系統決策
- `P0-5.7_WORLDVIEW_DESIGN/P0-5.7_DESIGN_DOC_FINAL.md` - 世界觀設計文檔（包含 AI 敘事層約束）
- `DESIGN_DIRECTION_SUMMARY_2026-01-11.md` - 設計方向摘要

### 5.4 階段一、二報告

- `P0-11_METAPHYSICAL_ENGINE_COMPLETION/P0-11_PHASE1_COMPLETION_SUMMARY.md` - 階段一完成摘要
- `P0-11_METAPHYSICAL_ENGINE_COMPLETION/P0-11_PHASE2_CONDITIONAL_ACCEPTANCE.md` - 階段二條件式通過確認
- `P0-11_METAPHYSICAL_ENGINE_COMPLETION/P0-11_PHASE2_GOVERNANCE_SUPPLEMENTS.md` - 階段二治理補強聲明

### 5.5 舊版本資料（參考）

- `docs/legacy/115_1_3_my-first-app_failed/` - 舊版本詞彙和敘事資料（可參考，但需過濾心理學名詞）

---

## 六、執行要求

### 6.1 格式要求

- ✅ JSON 格式（詞彙庫、對應表、禁用詞清單）- UTF-8 編碼
- ✅ Markdown 格式（呈現用語規範）- UTF-8 編碼
- ✅ 雙語支援（中英文）
- ✅ 結構清晰、易於查詢和維護

### 6.2 品質要求

- ✅ **詞彙完整**：覆蓋所有階段一知識庫中的詞彙
- ✅ **對應關係準確**：心理學對應關係有明確依據（基於階段一知識庫的 `psychological_mapping` 欄位）
- ✅ **語境純粹性**：玄學詞彙庫不混入心理學名詞、科學術語、診斷用語
- ✅ **禁用詞清單完整**：覆蓋常見的心理學、科學、診斷用語，並提供替代建議
- ✅ **雙語原生性**：英文詞彙使用原生英文玄學用語，非簡單翻譯

### 6.3 驗收標準

**功能驗收**：
- [ ] 玄學詞彙庫包含所有必要的詞彙類別（卦名、五行、八卦、狀態描述、敘事用語等）
- [ ] 心理學對應詞彙表完整且準確（有明確來源標註）
- [ ] 呈現用語規範清晰明確（包含原則、禁用詞引用、替代建議）
- [ ] 禁用詞清單完整且有替代建議

**一致性驗收**：
- [ ] 詞彙庫與階段一知識庫一致（從知識庫提取的詞彙保持一致）
- [ ] 對應關係與系統設計一致（符合雙重計算機制和語境純粹性要求）
- [ ] 禁用詞清單與設計文檔一致（符合 P0-5.7 設計文檔的要求）

**整合驗收**：
- [ ] 詞彙庫可被階段四和 AI 整合使用（結構清晰，易於查詢）
- [ ] 禁用詞清單可被 AI 提示詞使用（JSON 格式，易於程式化使用）

---

## 七、執行建議

### 7.1 執行順序

建議按以下順序執行：
1. **第一步**：建立玄學詞彙庫（因為它是基礎，其他文件會引用它）
2. **第二步**：建立禁用詞清單（因為它相對獨立，且可與詞彙庫對照）
3. **第三步**：建立心理學對應詞彙表（因為它依賴詞彙庫和階段一知識庫）
4. **第四步**：建立呈現用語規範（因為它整合前面所有文件）

### 7.2 資料來源策略

**從階段一知識庫提取**：
- 從 `hexagram_64_full.v1.0.json` 提取卦名、關鍵詞、狀態描述
- 從 `wuxing_5_elements.v1.0.json` 提取五行屬性、象徵意義、狀態描述
- 從 `bagua_8_trigrams.v1.0.json` 提取八卦屬性
- 從 `mapping_tables.v1.0.json` 提取風險等級定義和狀態對應

**從系統設計文件提取**：
- 從 `P0-5.7_DESIGN_DOC_FINAL.md` 提取 AI 敘事層約束和禁用詞要求
- 從 `DESIGN_DIRECTION_SUMMARY_2026-01-11.md` 提取語境要求

**參考舊版本資料**：
- 從 `docs/legacy/` 中參考舊版本的詞彙和敘事方式（但需過濾心理學名詞）

---

## 八、成功標準

### 8.1 功能完整性

- [ ] 玄學詞彙庫包含所有必要的詞彙類別（卦名、五行、八卦、狀態描述、敘事用語等）
- [ ] 心理學對應詞彙表完整且準確（有明確來源標註）
- [ ] 呈現用語規範清晰明確（包含原則、禁用詞引用、替代建議）
- [ ] 禁用詞清單完整且有替代建議

### 8.2 一致性

- [ ] 詞彙庫與階段一知識庫一致
- [ ] 對應關係與系統設計一致

### 8.3 整合性

- [ ] 詞彙庫可被階段四和 AI 整合使用
- [ ] 禁用詞清單可被 AI 提示詞使用

---

## 九、交付物清單

1. ⏳ `domain/knowledge_base/vocabulary_metaphysical.v1.0.json` - 玄學詞彙庫（CN/EN）
2. ⏳ `domain/knowledge_base/vocabulary_psychology_mapping.v1.0.json` - 心理學對應詞彙表（內部使用）
3. ⏳ `domain/knowledge_base/presentation_guidelines.v1.0.md` - 呈現用語規範
4. ⏳ `domain/knowledge_base/forbidden_terms.v1.0.json` - 禁用詞清單

**可選補強任務**（階段二）：
- ⏳ `engine/root_element_mapper.py` - 補充治理聲明（建議）
- ⏳ `engine/hexagram_deriver.py` - 補充治理聲明（建議）
- ⏳ `engine/collision_calculator.py` - 補充治理聲明（建議）

---

**任務狀態**：READY FOR EXECUTION  
**建立日期**：2026-01-11  
**版本**：v1.0（整合版，包含階段二補強）
