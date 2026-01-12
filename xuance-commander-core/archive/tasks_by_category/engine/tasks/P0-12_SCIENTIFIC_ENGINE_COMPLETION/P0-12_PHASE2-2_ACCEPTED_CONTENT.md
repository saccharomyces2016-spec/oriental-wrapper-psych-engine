# P0-12 階段二-2 符合要求內容（可寫入文本）

**建立日期**：2026-01-12  
**來源**：P0-12 階段二-2 結案總交付包  
**審核結果**：部分符合，提取符合要求的部分  
**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）

---

## 一、說明

本文件提取了顧問團隊交付內容中**符合任務包要求**的部分，可以直接寫入文本作為設計基準。

**符合要求的部分**：
- ✅ 映射策略定義清晰完整
- ✅ 語境轉換規則完整且正確
- ✅ 轉換後的範例文字符合語境要求（但結構需要修正）

**需要修正的部分**：
- ❌ 範例結構包含 `meta` 欄位，需要移除
- ❌ 缺少實際檔案產出
- ❌ 缺少轉換過程記錄
- ❌ 缺少映射表文件

---

## 二、Legacy → 現行系統映射總表（符合要求）

此表定義了資料流向與層級對應關係。

| Legacy 檔案來源 | 目標系統層級 | 目標檔案路徑 | 轉換策略 | 狀態 |
| --- | --- | --- | --- | --- |
| `anchor_statements.v1.json` | **L2 / L3** (Narratives) | `domain/narratives/<facet>.narr.v1.0.json` | **語義重構**：保留結構，內容改為五行生剋敘事 | ✅ 完成 |
| `consequence_chain_library.v1.json` | **L4** (RiskChains) | `domain/riskchains/<facet>.risk.v1.0.json` | **概念轉譯**：行為後果 → 運勢/能量耗損 | ✅ 完成 |
| `intervention_boundary_matrix.v1.json` | **L4** (Recommendations) | `domain/recommendations/<facet>.reco.v1.0.json` | **邏輯抽象**：提取門檻/觸發條件，語境改寫為行動指引 | ✅ 完成 |

---

## 三、Band 分類規則（符合要求）

將 Legacy 的動態分數或標籤轉換為靜態的三層結構。

| Legacy 條件 (Confidence / Tags) | Target Band (現有系統) | 說明 |
| --- | --- | --- |
| `confidence = high` 或 `medium-high` | **high** | 對應高風險或高強度狀態 |
| `confidence = medium` | **mid** | 對應中度風險或過渡狀態 |
| `confidence = low` 或 `undefined` | **low** | 對應低風險或平穩狀態 |

---

## 四、語境轉換規則（心理 → 玄學）（符合要求）

嚴格遵守「純玄學」原則，禁止任何現代科學詞彙。

### 4.1 核心詞彙對照表（鎖定版）

| 心理語境 (Forbidden) | 玄學敘事 (Allowed / Canonical) | 應用場景 |
| --- | --- | --- |
| **Anxiety / Arousal** | **火氣過旺、氣機紊亂、心神不寧** | 描述高能量但不穩定的狀態 |
| **Burnout / Exhaustion** | **能量耗損、火不生土、油盡燈枯** | 描述資源耗盡的後果 |
| **Over-control** | **金剋木、氣行受阻、過度收斂** | 描述過度壓抑或控制的機制 |
| **Stress** | **氣滯、運勢受壓、外煞** | 描述外部壓力或內部緊張 |
| **Recovery** | **調氣、回元、養勢、歸根** | 描述恢復與休息的行動 |
| **Mental Energy** | **神識、精氣、元神** | 描述精神資源 |

### 4.2 禁用詞規範

* ✔ **已全量通過** `forbidden_terms.v1.0.json` 驗證。
* ✔ **嚴禁使用**：焦慮、憂鬱、創傷、防禦機制、認知偏差、神經科學、心理學等詞彙。
* ✔ **未殘留**任何心理學或現代科學名詞。

---

## 五、結構映射規則（符合要求）

### 5.1 anchor_statements → narratives 映射規則

| Legacy 欄位 | 目標欄位 | 轉換規則 |
|------------|---------|---------|
| `confidence` | `band` (low/mid/high) | `high` 或 `medium-high` → `high`<br>`medium` → `mid`<br>`low` 或 `undefined` → `low` |
| `safe_tone_template.acknowledge` 或 `variants[0]` | `opening` | 語境轉換（心理學 → 玄學） |
| `why_it_hits` | `explain` | 語境轉換（心理學解釋 → 命理解釋） |

### 5.2 consequence_chain_library → riskchains 映射規則

| Legacy 欄位 | 目標欄位 | 轉換規則 |
|------------|---------|---------|
| `confidence` | `band` (mid/high) | `high` → `high`<br>`medium` → `mid`<br>`low` 通常不生成風險鏈 |
| `safe_tone_template.guide` 或 `label` | `if_not_improve` | 語境轉換（行為後果 → 運勢/能量耗損），使用箭頭（→）連接 |

### 5.3 intervention_boundary_matrix → recommendations 映射規則

| Legacy 欄位 | 目標欄位 | 轉換規則 |
|------------|---------|---------|
| `confidence` | `band` (low/mid/high) | `high` → `high`<br>`medium` → `mid`<br>`low` → `low` |
| `label` | `title` | 語境轉換（臨床建議 → 行動指引） |
| `safe_tone_template.action` | `steps` | 拆解為陣列，語境轉換（臨床建議 → 日常行動建議） |

---

## 六、範例內容（文字部分符合要求，結構需要修正）

以下範例內容的**文字部分**符合語境要求，但需要注意：
1. ⚠️ 範例中包含 `meta` 欄位，但現有系統不包含此欄位（需要移除）
2. ⚠️ 這些是範例，需要提供實際可寫入的 JSON 檔案

### 6.1 L2 / L3 Narratives 範例（文字符合，結構需修正）

**⚠️ 注意**：以下範例包含 `meta` 欄位，需要移除以符合現有系統結構。

```json
{
  "low": {
    "opening": "你目前的氣場偏穩，行走之間仍有根可循。",
    "explain": "此階段五行流轉尚稱平衡，外在變化未形成明顯牽動，土性厚重代表你擁有不錯的承載力。"
  },
  "mid": {
    "opening": "你近期像是木氣受牽，能往前，但消耗開始浮現。",
    "explain": "木生火而未得水養，代表推進之中，回復尚未跟上，雖有生機但根基略顯浮動。"
  },
  "high": {
    "opening": "你現在呈現火勢過旺之象，亮得快，也耗得急。",
    "explain": "火過則不生土，象徵能量快速輸出，卻難以沉澱回收，神識不定顯示長期運轉已致陰陽失衡。"
  }
}
```

### 6.2 L4 Risk Chains 範例（文字符合，結構需修正）

**⚠️ 注意**：以下範例包含 `meta` 欄位，需要移除以符合現有系統結構。

```json
{
  "mid": {
    "if_not_improve": [
      "氣機紊亂 → 判斷失準 → 行動反覆無常",
      "能量分散 → 專注下降 → 推進受阻難行"
    ]
  },
  "high": {
    "if_not_improve": [
      "火氣持續上衝 → 夜難歸靜 → 日間更耗（惡性循環）",
      "行動失序 → 自責堆疊 → 避事傾向 → 壓力再起"
    ]
  }
}
```

### 6.3 L4 Recommendations 範例（文字符合，結構需修正）

**⚠️ 注意**：以下範例包含 `meta` 欄位，需要移除以符合現有系統結構。

```json
{
  "low": [
    {
      "id": "reco_low_maintain",
      "title": "守住節奏",
      "steps": [
        "每天固定一段不被打擾的緩行時間",
        "避免在疲勞時做重大決定，以保氣場平穩"
      ]
    }
  ],
  "mid": [
    {
      "id": "reco_mid_rebalance",
      "title": "先調氣，再推進",
      "steps": [
        "連續三天維持固定作息節點，重建規律",
        "下午後不再加入高耗能事項，避免過度耗散",
        "每日保留一段可中斷的休息，讓氣機有喘息空間"
      ]
    }
  ],
  "high": [
    {
      "id": "reco_high_stop_loss",
      "title": "先止耗，再談成形",
      "steps": [
        "當日只保留三件必要行動，執行「斷捨離」",
        "晚間僅進行低刺激活動，養陰以濟陽",
        "隔日預留完全無目標時段，讓身心歸零"
      ]
    }
  ]
}
```

---

## 七、系統一致性確認（符合要求）

本交付包已通過以下檢核，確保符合系統設計規範：

1. **設計一致性**：
* ✅ 完全符合 Stage 4（L1–L4）結果呈現分層架構。
* ✅ 完全符合 `P0-5.7` 世界觀與敘事規範（純玄學）。

2. **資料治理**：
* ✅ 完全符合禁用詞（Forbidden Terms）與玄學詞彙庫（Vocabulary Metaphysical）。
* ✅ 嚴格遵守「不凍結、可回滾」原則，所有檔案標記為 Working Document。

---

## 八、注意事項

### 8.1 結構修正要求

所有範例需要：
1. ✅ 移除 `meta` 欄位
2. ✅ 確保結構完全符合現有系統（頂層直接是 `low/mid/high` bands）

### 8.2 實際檔案產出要求

需要提供：
1. ✅ 至少一個完整的 facet 轉換結果（三個 JSON 檔案）
2. ✅ 檔案結構必須完全符合現有系統（不包含 `meta` 欄位）
3. ✅ 檔案內容必須通過禁用詞檢查

### 8.3 轉換過程記錄要求

需要提供：
1. ✅ 轉換過程說明文件
2. ✅ 語境轉換記錄（至少 5-10 個範例）
3. ✅ 結構轉換記錄

---

**文件狀態**：WORKING DOCUMENT（不鎖定，可回滾）  
**最後更新**：2026-01-12  
**狀態說明**：本文件提取了符合要求的部分，但需要補充實際檔案產出和轉換過程記錄
