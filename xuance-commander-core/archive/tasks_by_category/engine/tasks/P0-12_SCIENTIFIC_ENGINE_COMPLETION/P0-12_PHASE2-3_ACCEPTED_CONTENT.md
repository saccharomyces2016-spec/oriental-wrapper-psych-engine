# P0-12 階段二-3 符合要求內容（可寫入文本）

**建立日期**：2026-01-12  
**來源**：P0-12 階段二-3 最終結案報告（第二個版本）  
**審核結果**：通過（兩個版本都符合要求，推薦使用第二個版本）  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）

---

## 一、說明

本文件提取了顧問團隊交付內容中**符合任務包要求**的部分，可以直接寫入文本作為設計基準。

**推薦使用版本**：第二個版本（最終結案報告）

**符合要求的部分**：
- ✅ L1-L4 分層架構定義（完整且詳細）
- ✅ 各層資料結構定義（包含 Storage vs Runtime 對照）
- ✅ 各層內容分配（明確的 Legacy 對應說明）
- ✅ 整合後的資料範例（完整的 JSON 範例）
- ✅ Stage 4 資料流說明
- ✅ 自我檢視與驗證紀錄（詳細且完整）

---

## 二、L1-L4 分層架構定義（符合要求）

### 2.1 L1：Hexagram Visual（卦象視覺層）

**功能定位**：負責視覺化呈現，確立使用者的當前卦象（Flow Hexagram）。此層級僅作為「象」，呈現計算後之最終卦象，不承載敘事、不承載建議。

**資料來源**：
- 動態計算：`hexagram_deriver.py`（本機計算出的 `hexagram_id`）
- 靜態資源：`domain/knowledge_base/hexagram_64_full.v1.0.json`

**Legacy 對應**：無直接對應 Legacy 檔案（此為新系統原生功能）。

**資料結構（Runtime Payload）**：
```json
{
  "layer": "L1",
  "hexagram_id": 23,
  "hexagram_name": {
    "zh": "剝",
    "en": "Splitting Apart"
  },
  "upper_trigram": "艮",
  "lower_trigram": "坤",
  "changing_line": 4
}
```

**治理說明**：
- ⚠️ L1 不接收 Phase 2-2 靜態資料
- ⚠️ 嚴禁 AI 解釋或重算卦象，必須直接使用引擎計算結果

### 2.2 L2：Root Personalization（本命個人化敘事層）

**功能定位**：建立與使用者的連結，以「本命五行（Root Element）」為核心，提供根本狀態敘事（Opening Statement）。

**資料來源**：
- 動態計算：`root_element_mapper.py`
- 靜態文本：`domain/narratives/chronic_depletion.narr.v1.0.json` (Field: `opening`)
- 參考知識：`domain/knowledge_base/wuxing_5_elements.v1.0.json`

**Legacy 對應**：源自 `anchor_statements.v1.json` (Acknowledge / State Tags)。

**資料結構對照**：

**檔案存儲 (Storage)**:
```json
"mid": {
  "opening": "你近期呈現金氣偏強之象，行事俐落卻開始內耗。"
}
```

**執行時 (Runtime Payload)**:
```json
{
  "layer": "L2",
  "root_element": "土",
  "band": "mid",
  "narrative": "你近期呈現金氣偏強之象，行事俐落卻開始內耗。"
}
```

**治理說明**：
- 敘事內容完全來自 Phase 2-2 narratives 檔案
- 僅允許依 Root Element 與 Band 做語句選擇，不得改寫內容

### 2.3 L3：Flow Analysis（當前流動狀態層）

**功能定位**：深入解釋當前狀態，結合「當前卦象（Flow Hexagram）」描述目前行運與變化趨勢，使用「解釋文 (Explain)」說明五行生剋機制。

**資料來源**：
- 動態計算：`hexagram_deriver.py`
- 靜態文本：`domain/narratives/chronic_depletion.narr.v1.0.json` (Field: `explain`)

**Legacy 對應**：源自 `anchor_statements.v1.json` (Why it hits)。

**資料結構對照**：

**檔案存儲 (Storage)**:
```json
"mid": {
  "explain": "金過則剋木，象徵控制加重，而生機與恢復逐步受抑。"
}
```

**執行時 (Runtime Payload)**:
```json
{
  "layer": "L3",
  "flow_hexagram_id": 23,
  "band": "mid",
  "analysis": "金過則剋木，象徵控制加重，而生機與恢復逐步受抑。"
}
```

**治理說明**：
- L2 與 L3 共用 narratives 檔案，差異僅在於取用欄位（Opening vs Explain）與語境來源（Root vs Flow）
- 不新增任何新敘事文本

### 2.4 L4：Risk Blocking & Action Advice（風險阻斷與行動層）

**功能定位**：唯一允許出現「未改善後果（Risk Chains）」與「行動建議（Recommendations）」的層級。包含警示與具體改運步驟。

**資料來源**：
- 動態計算：`score_facet.py` (Risk Level)
- 靜態文本 (Risk)：`domain/riskchains/chronic_depletion.risk.v1.0.json`
- 靜態文本 (Reco)：`domain/recommendations/chronic_depletion.reco.v1.0.json`

**Legacy 對應**：
- Risk 源自 `consequence_chain_library.v1.json`
- Reco 源自 `intervention_boundary_matrix.v1.json`

**資料結構對照**：

**檔案存儲 (Storage)**:
- Risk: `mid: { "if_not_improve": ["..."] }`
- Reco: `mid: [ { "id": "...", "title": "...", "steps": ["..."] } ]`

**執行時 (Runtime Payload)**:
```json
{
  "layer": "L4",
  "risk_level": "mid",
  "risk_chains": [
    "氣機持續緊繃 → 判斷力變得偏激狹隘",
    "金氣過盛由外轉內 → 對親近之人言語尖銳 → 人和受損"
  ],
  "recommendations": [
    {
      "id": "cd_mid_1",
      "title": "疏肝理氣",
      "steps": [
        "連續三天，強迫自己在日落後停止勞心工作",
        "飲用溫熱飲品，避免生冷，以護脾胃之氣",
        "進行接觸泥土或草地的活動，接地氣以穩心神"
      ]
    }
  ]
}
```

**治理說明**：
- ⚠️ 嚴禁 AI 新增或刪除任何風險鏈與建議
- 僅能做語言潤飾，不得改變結構與語義
- Risk Chain 僅在中高 (Mid/High) 風險等級觸發

---

## 三、Stage 4 資料流與系統邊界確認（符合要求）

### 3.1 資料流向（標準化鎖定）

1. **Local Calc (本機運算)**：雙引擎（科學評分 + 玄學推導）完成計算，鎖定 `Risk_Level`, `Hexagram_ID`, `Changing_Line`, `Root_Element`
2. **Payload Build (資料組裝)**：系統依據上述計算結果，從 L2-L4 JSON 檔案中提取對應內容，組裝成完整 Context
3. **AI Generation (生成)**：AI 模型僅負責將 Context 轉化為流暢的敘事文本（潤飾），不進行邏輯推理
4. **Frontend Presentation (呈現)**：前端依據 L1-L4 順序進行「卷軸顯影」

### 3.2 嚴格禁止事項（再次確認）

- ❌ AI 解卦：禁止 AI 根據卦名自行解釋吉凶
- ❌ AI 修改 Risk Level：禁止 AI 根據語氣調整風險等級
- ❌ AI 新增建議：禁止 AI "Hallucinate" 額外的建議步驟
- ❌ 語境污染：禁止出現任何心理學、神經科學或臨床診斷語境

---

## 四、各層內容分配表（符合要求）

| 層級 | Legacy 對應 | Phase 2-2 對應 | 資料來源 |
|------|------------|---------------|---------|
| L1 | 無（新系統原生功能） | 無 | `hexagram_deriver.py` + `hexagram_64_full.v1.0.json` |
| L2 | `anchor_statements.v1.json` (Acknowledge / State Tags) | `narratives.narr.v1.0.json` (opening) | `root_element_mapper.py` + narratives |
| L3 | `anchor_statements.v1.json` (Why it hits) | `narratives.narr.v1.0.json` (explain) | `hexagram_deriver.py` + narratives |
| L4 (Risk) | `consequence_chain_library.v1.json` | `riskchains.risk.v1.0.json` | `score_facet.py` + riskchains |
| L4 (Reco) | `intervention_boundary_matrix.v1.json` | `recommendations.reco.v1.0.json` | `score_facet.py` + recommendations |

---

## 五、設計決策記錄（符合要求）

### 5.1 L2 與 L3 共用 narratives 檔案

**決策**：L2 與 L3 共用 `domain/narratives/<facet>.narr.v1.0.json` 檔案

**理由**：
- narratives 檔案中的 `opening` 欄位用於 L2
- narratives 檔案中的 `explain` 欄位用於 L3
- 兩個層級使用相同的 `low/mid/high` bands 結構
- 共用檔案可以減少資料重複，提高維護性

**影響**：
- 資料結構保持一致
- 維護成本降低
- 資料來源明確

### 5.2 L1 不接收 Phase 2-2 靜態資料

**決策**：L1 不接收 Phase 2-2 轉換後的靜態資料

**理由**：
- L1 僅負責視覺化呈現卦象
- 卦象資料來自玄學引擎計算結果
- L1 不承載敘事、不承載建議

**影響**：
- L1 資料結構簡單明確
- L1 與 Phase 2-2 轉換資料無關

### 5.3 L4 包含 Risk 和 Recommendations

**決策**：L4 包含風險鏈（Risk Chains）和行動建議（Recommendations）

**理由**：
- L4 是唯一允許出現「未改善後果」與「行動建議」的層級
- Risk 和 Recommendations 都是行動導向的內容
- 兩者都基於風險等級（low/mid/high）

**影響**：
- L4 資料結構包含兩個部分（risk_chains 和 recommendations）
- 兩個部分來自不同的 Phase 2-2 轉換檔案

---

## 六、驗證結果（符合要求）

### 6.1 結構符合性 ✅

- ✅ L1-L4 分層定義完整
- ✅ 資料結構定義正確（包含 Storage vs Runtime 對照）
- ✅ 資料來源說明完整

### 6.2 語境純粹性 ✅

- ✅ 所有文字使用玄學語境
- ✅ 通過禁用詞檢查
- ✅ 符合語境純粹性要求

### 6.3 任務包要求符合性 ✅

- ✅ L1-L4 資料結構定義文件（完整）
- ✅ 各層內容分配表（明確）
- ✅ 整合後的資料範例（完整）
- ✅ 整合報告（詳細）

---

**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-12  
**狀態說明**：本文件提取了符合要求的部分，可以直接寫入文本
