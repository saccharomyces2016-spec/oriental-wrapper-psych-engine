# P0-11 階段一剩餘任務包

**建立日期**：2026-01-11  
**狀態**：READY FOR EXECUTION  
**階段**：階段一（基礎知識庫建立）剩餘任務

---

## 一、任務概述

**當前狀態**：
- ✅ 64 卦基礎知識庫已完成並通過審計
- ⏳ 階段一還有 3 個交付物待完成

**任務目標**：完成階段一的剩餘 3 個交付物

---

## 二、剩餘交付物詳情

### 2.1 五行基礎知識庫

**目標文件**：`domain/knowledge_base/wuxing_5_elements.v1.0.json`

**需要內容**：

1. **五行基本屬性**
   - 五行名稱（金、木、水、火、土，中英文）
   - 五行的特性描述（中英文）
   - 五行的象徵意義（中英文）

2. **五行生剋關係**
   - 相生關係（木→火→土→金→水→木）
   - 相剋關係（木→土→水→火→金→木）
   - 相制、相化關係（如果需要）

3. **五行與心理學的對應**
   - 每個元素對應的心理狀態
   - 每個元素對應的行為模式
   - 每個元素在系統中的應用（Stage 2 五行羅盤）

**建議 JSON 結構**：
```json
{
  "version": "1.0",
  "elements": [
    {
      "id": "METAL",
      "name": { "zh": "金", "en": "Metal" },
      "properties": {
        "zh": "...",
        "en": "..."
      },
      "psychological_mapping": {
        "state": "...",
        "behavior": "...",
        "desc": "..."
      },
      "relationships": {
        "generates": "WATER",
        "controlled_by": "FIRE",
        "controls": "WOOD",
        "generated_by": "EARTH"
      }
    }
  ]
}
```

### 2.2 八卦基礎知識庫

**目標文件**：`domain/knowledge_base/bagua_8_trigrams.v1.0.json`

**需要內容**：

1. **八卦基本屬性**
   - 八卦名稱（乾、坤、震、巽、坎、離、艮、兌，中英文）
   - 八卦的特性描述（中英文）
   - 八卦的象徵意義（中英文）

2. **八卦與 64 卦的關係**
   - 每個八卦對應哪些 64 卦（作為上下卦）
   - 八卦在 Stage 1 中的應用（分流選擇）

3. **八卦與五行的對應**（如果需要）
   - 每個八卦對應的五行屬性

**建議 JSON 結構**：
```json
{
  "version": "1.0",
  "trigrams": [
    {
      "id": "QIAN",
      "code": "111",
      "name": { "zh": "乾", "en": "Heaven" },
      "properties": {
        "zh": "...",
        "en": "..."
      },
      "hexagram_ids_as_upper": [0, 1, 9, 10, 13, 14, 43, 44],
      "hexagram_ids_as_lower": [0, 10, 11, 12, 25, 33, 43, 44],
      "element": "METAL"
    }
  ]
}
```

### 2.3 基礎對應關係表

**目標文件**：`domain/knowledge_base/mapping_tables.v1.0.json`

**需要內容**：

1. **卦象 ↔ 風險等級對應表**
   - 從 64 卦 JSON 中提取風險等級分布
   - 建立風險等級 → 卦象列表的映射
   - 建立卦象 → 風險等級的映射

2. **五行 ↔ 心理狀態對應表**
   - 從五行 JSON 中提取心理映射
   - 建立五行 → 心理狀態的映射
   - 建立心理狀態 → 五行列表的映射

3. **其他基礎對應關係**（如果需要）
   - 八卦 ↔ 五行對應
   - 八卦 ↔ 風險等級對應

**建議 JSON 結構**：
```json
{
  "version": "1.0",
  "hexagram_to_risk": {
    "0": 1,
    "1": 1,
    ...
  },
  "risk_to_hexagrams": {
    "0": [10, 13, 34, 39, 41, 45, 57, 60],
    "1": [0, 1, 7, 12, 14, 16, 18, ...],
    ...
  },
  "element_to_psychological_state": {
    "METAL": "...",
    ...
  },
  "psychological_state_to_elements": {
    "...": ["METAL", "WATER"],
    ...
  }
}
```

---

## 三、執行要求

### 3.1 格式要求

- ✅ JSON 格式
- ✅ UTF-8 編碼
- ✅ 雙語支援（中英文）
- ✅ 結構清晰、易於查詢

### 3.2 品質要求

- ✅ 資料完整
- ✅ 對應關係準確
- ✅ 與現有資料一致（64 卦 JSON）
- ✅ 符合系統設計要求

### 3.3 驗收標準

- ✅ JSON 格式有效
- ✅ 內容完整（所有必需的欄位）
- ✅ 雙語支援完整
- ✅ 對應關係正確
- ✅ 與現有資料一致

---

## 四、參考資料

### 4.1 已完成資料

- `domain/knowledge_base/hexagram_64_full.v1.0.json` - 64 卦基礎知識庫（可作為參考）

### 4.2 任務包文件

- `P0-11_TASK_PACKET.md` - 完整任務包（5.1.1, 5.1.2 節）

### 4.3 系統設計文件

- `P0-5.5_ELEMENT_SELECTION_DECISION.md` - 易經矩陣系統決策
- `P0-5.6_COMPLETE_TASK_PACKAGE.md` - 易經矩陣系統實作包
- `DESIGN_DIRECTION_SUMMARY_2026-01-11.md` - 設計方向摘要

---

## 五、交付物清單

1. ⏳ `domain/knowledge_base/wuxing_5_elements.v1.0.json` - 五行基礎知識庫
2. ⏳ `domain/knowledge_base/bagua_8_trigrams.v1.0.json` - 八卦基礎知識庫
3. ⏳ `domain/knowledge_base/mapping_tables.v1.0.json` - 基礎對應關係表

---

**任務狀態**：READY FOR EXECUTION  
**建立日期**：2026-01-11
