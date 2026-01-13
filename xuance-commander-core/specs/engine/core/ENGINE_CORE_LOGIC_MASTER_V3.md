# ENGINE CORE LOGIC — MASTER SPECIFICATION V3.0 (FULL INTEGRATED)

**Task ID**: ENGINE-CORE-LOGIC-MASTER-V3  
**建立日期**：2026-01-12  
**狀態**：ACTIVE · REFERENCE · EDITABLE（可修改，保留後續調整權）  
**角色**：The Absolute Logic Core for Calculation, Reasoning, and Narrative Generation  
**目標**：Global Audience · Scientifically Grounded · Metaphysically Presented

---

## ⚠️ 重要聲明：所有內容保留修改空間

**本文件中的所有設計、規格、決策均為暫時性版本，不得凍結。**

- 所有設計決策均可在後續討論中調整
- 所有規格均可根據實際測試結果修改
- 所有流程均可根據協作經驗優化

---

## 0. 核心憲章 (Charter & Philosophy)

### 0.1 雙層運作原則 (Dual-Layer Operation)

本引擎是「科學內核」與「玄學外殼」的完美結合。系統必須在毫秒級內完成從科學模型到玄學敘事的轉譯。

- **內核 (Internal)**: 基於 CBT (認知行為)、Big Five (人格特質)、System Dynamics (系統動力學) 的向量運算。
- **外顯 (External)**: 100% 封裝於「歲時農耕」與「陰陽五行」的象徵體系。
- **鐵律 (Iron Rule)**: 使用者介面絕不可洩露 `Score`, `Weight`, `Algorithm`, `Psychology`, `Diagnosis` 等術語。

**對應 SSOT**：
- `charter/CHARTER.md` - 專案憲章
- `domain/knowledge_base/presentation_guidelines.v1.0.md` - 呈現用語規範

### 0.2 「準到發毛」的定義 (Definition of "Scary Accurate")

準確度來自於**多維度三角定位 (Multidimensional Triangulation)**：
$$Accuracy = Context (Where) \times Attribution (Why) \times State (How)$$

系統不應只回答「你很累」，而應回答「你因為**無法改變的上層結構(Context)**，導致**長期的無力感(Attribution)**，進而造成**根系腐爛與土壤板結(State)**」。

**對應 SSOT**：
- `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` - 4 階段分流系統設計

### 0.3 八大領域全覆蓋方案（Universal Domain Coverage）

**來源**：`ENGINE_CORE_OMNISCIENT_MATRIX_FINAL.md`（2026-01-12 審核通過）、`ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md`（2026-01-12 審核通過並補強）

八大領域（八卦）+ 中宮/混沌形成**完整問題拓撲**：

| 卦象 (Trigram) | 自然象徵 | 現代困擾域（使用者不可見） | Domain Key | 5-Element | MVP 核心 Facet（至少 1） |
| --- | --- | --- | --- | --- | --- |
| **乾 (Qian)** | **天** | **自我/權威/方向** | `qian` | **金 (Metal)** | `leadership_burden` (決策孤獨) |
| **坤 (Kun)** | **地** | **事業/資源/財務** | `kun` | **土 (Earth)** | **`income_expansion_pressure`** (既有: 財運) |
| **震 (Zhen)** | **雷** | **行動/變動/焦慮** | `zhen` | **木 (Wood)** | `procrastination_loop` (拖延) |
| **巽 (Xun)** | **風** | **關係/溝通/社交** | `xun` | **木 (Wood)** | **`relationship_imbalance`** (既有: 感情) |
| **坎 (Kan)** | **水** | **情緒/抑鬱/成癮** | `kan` | **水 (Water)** | `deep_depression` (深層憂鬱) |
| **離 (Li)** | **火** | **過勞/形象/認知** | `li` | **火 (Fire)** | `burnout_syndrome` (過勞燃燒) |
| **艮 (Gen)** | **山** | **健康/家庭/阻滯** | `gen` | **土 (Earth)** | `physical_somatization` (身心症) |
| **兌 (Dui)** | **澤** | **口舌/衝突/慾望** | `dui` | **金 (Metal)** | `conflict_argument` (口舌是非) |
| **中宮 (Center)** | **渾沌** | **兜底路由** | `center` | **－** | `general_chaos_router` (系統 Facet) |

**硬性規則（可驗收）**：
1. 每個 Domain 必須配置 `domain.element`（金木水火土），且為 SSOT。
2. 每個 Domain 在 MVP 至少 1 個 Facet；Full 至少 3 個 Facet（可逐步達成）。
3. `center` 不作為普通 Domain 計分；僅作為路由與缺失 priors 之兜底流程。

**路由邏輯**：P0-4.5 Stage 1 的轉輪直接對應此八卦。

**擴充順序建議**：優先補齊 **坎 (情緒/水)** 與 **離 (過勞/火)**，因為這是現代人最常見的「水火不容」問題，能與既有的財運/感情形成最強的交叉連鎖。

**中宮（Chaos Routing）**：
- **用途**：使用者無法選擇、或多域同時困擾、或 priors 缺失時的「安全路由器」。
- **策略**：依 P0-4.5 Stage 2/3 的輸入生成 `priors.attribution_profile`，並回推至 8 域之一；若仍不確定，採「多域並行」但**限制輸出數量**（最多 2 域提示 + 1 域主要路由）。

**對應 SSOT**：
- `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md` - Stage 1 路由規則
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` Section 1 - 全知矩陣圖譜

---

## 1. 數據注入與分流整合 (Input & Context Injection)

在進入具體 Facet (如 `income_expansion_pressure`) 計算前，必須先接收來自 P0-4.5 分流系統的 `Priors` (先驗參數)。

### 1.1 Context Schema

**對應 SSOT**：`P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`

```json
{
  "priors": {
    "domain_lock": "BAGUA_KUN",      // Stage 1: 定義場景 (影響風險鏈的領域)
    "object_lock": ["SYMBOL_WALL", "SYMBOL_RAIN"], // Stage 2: 定義對象 (高牆=權威, 雨=情緒)
    "attribution_mode": "EXTERNAL_FATE", // Stage 3: 定義歸因 (宿命論 -> 增加固著係數)
    "agency_level": 0.3               // Stage 3: 定義能動性 (低 -> 建議需溫和)
  }
}
```

**整合說明**：
- `domain_lock` 對應 Stage 1 的 `domain_id`（八卦代碼）
- `object_lock` 對應 Stage 2 的 `context_items`（物象符號）
- `attribution_mode` 對應 Stage 3 的 `attribution_profile.locus` 和 `subtype`
- `agency_level` 對應 Stage 3 的 `attribution_profile.agency_level`

**Priors 最小結構**（CONSTITUTION Section 7.1）：
```json
{
  "source": "P0-4.5",
  "attribution_profile": {
    "locus": "EXTERNAL|MIXED|INTERNAL",
    "subtype": "FATE|CONTEXT|OVERLOAD|DEFICIT|...",
    "agency_level": "HIGH|MEDIUM|LOW"
  },
  "domain_hint": "kun",
  "symbols": ["..."]
}
```

**缺失 Priors 的處理**（CONSTITUTION Section 7.2）：
- `priors.present=false`
- `rigidity=0.0`（DIRECTIVE REV.B 預設值，或依產品策略設定）
- 系統提示：不以心理學語彙解釋，只以玄學語境提示「資訊不足，需補一輪定象」。

**注意**：此 Schema 需要與 P0-4.5 的實際輸出格式對齊，可能需要後續調整。

### 1.2 動態權重調整 (Dynamic Weighting Logic)

引擎根據 `priors` 動態調整 Facet 內題目的權重：

* **Rule**: 若 `object_lock` 包含 "SYMBOL_WALL" (權威/體制)，則 Facet 中關於 "Autonomy" (自主權) 的題目權重 `Weight *= 1.5`。
* **Rule**: 若 `attribution_mode` 為 "EXTERNAL_FATE" (宿命)，則所有 "Action-based" (行動類) 建議的 `Difficulty_Score` 提升，敘事轉為「守成」而非「進攻」。

**實作狀態**：⚠️ **待實作**
- 當前 `engine/score_facet.py` 不支援動態權重調整
- 需要擴充 `domain/facets/*.scoring.v1.0.json` 的 schema
- 需要修改 `engine/score_facet.py` 的實作

**後續行動**：需要建立 ADR 或技術規格來定義動態權重調整的實作細節

**V3 引擎實作狀態**：✅ **已實作**
- `engine/score_facet.py` - 完整 V3 實作（支援 weighted_sum 和 vector_state_v3）
- `tests/test_v3_scoring.py` - V3 測試
- 符合 DIRECTIVE REV.B 和 REV.C+ 的所有要求

---

## 2. 題目系統設計 (Question System Architecture)

### 2.1 去問卷化設計 (De-Survey Principle)

題目必須設計為**「象徵性極端選擇 (Symbolic Extremes)」**，迫使潛意識表態。

**對應 SSOT**：`domain/knowledge_base/question_design_guidelines.v1.0.md`

**範例 (測量 Stress/Soil Quality)**：

> **Q: 觀測你當下的心田狀態，更接近下列何種景象？**
> * **Option A (Anxiety/High Arousal)**: 烈日曝曬，地表乾裂，急需降雨卻無雲。（燥土）
> * **Option B (Depression/Low Arousal)**: 連日陰雨，積水難退，根系泡爛發霉。（濕土）
> * **Option C (Burnout/Empty)**: 養分耗盡，只剩白沙，無論種何物皆不發芽。（貧土）
> * **Option D (Healthy)**: 土壤鬆軟，乾濕適中，蚯蚓翻動。（沃土）

### 2.2 題目類型配比（追問 1 裁示）

**來源**：`ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` Section 2（2026-01-12 審核通過）

**裁示（最終）**：採用 **選項 B**
- **允許 6–10 題彈性**（符合 ENGINE_CORE_LOGIC_MASTER_V3）
- **預設（RECOMMENDED DEFAULT）= 8 題**（作為「可比性最佳」的標準模板）
- **例外（>10 或 <6）**：僅在「強需求」時允許，且必須 **ADR 批准**（結構性變更）

#### 2.2.1 8 題標準模板（Octet Default）

**8 題模板 = 3 + 2 + 2 + 1**（保持不變）

| 類型 | 題數 | 參與 Severity | 參與 Volatility | 目的 |
|---|---:|---|---|---|
| Core State | 3 | ✅ | ✅ | 核心現狀（深度） |
| Validation Anchor | 2 | ✅ | ❌ | 信任錨點（命中率） |
| Reaction | 2 | ✅ | ✅ | 反應波動（不穩） |
| Resource | 1 | ✅ | ❌ | 緩衝盤點（支撐） |

**對齊 30/20/30/20 的處理方式**：
- 在 8 題制下，比例無法完美等於 30/20/30/20；我們採「**結構等價**」而非「數學嚴格比例」。
- 比例校正透過「權重」而非「題數」：見 2.2.3 權重基準。

#### 2.2.2 10 題擴展模板（Decet Optional）

當 Facet 複雜度偏高（跨文化、跨年齡、跨身份差異顯著），允許採 10 題：**3 + 2 + 3 + 2**
- Core State 3（30%）
- Validation 2（20%）
- Reaction 3（30%）
- Resources 2（20%）

**啟用條件**：`scoring.question_set = "DECET_10"` 且須在 Facet 檔案內顯式宣告（無自動推導）。  
**ADR 需求**：不需要（仍在 6–10 範圍內），但必須寫入文本並在 manifest 標記。

#### 2.2.3 權重基準（推薦）

在 8 題制下，推薦權重：
- Core State：1.00
- Validation：1.00（參與 Severity；但排除 Volatility）
- Reaction：1.25（放大波動信號）
- Resource：0.75（穩定與緩衝）

> 權重只是「推薦預設」，Facet 可調整，但必須顯式寫入 `inputs[].weight`。

**對應 SSOT**：
- `domain/knowledge_base/question_design_guidelines.v1.0.md`
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` Section 2 - 題目設計聖典

---

## 3. 核心運算引擎 V3.0 (Scoring Engine) — 追問 2 裁示

**來源**：`ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` Section 3（2026-01-12 審核通過）

我們放棄單純的線性加總，採用 **向量狀態評估 (Vector State Evaluation)**。

### 3.1 變數定義

* **Raw Score (原始分數)**: 加權平均分 (0.0 - 1.0)。
* **Volatility Index (波動指數)**: 答案的標準差。測量使用者的狀態是否「不穩定/反覆無常」。
* **Rigidity Index (固著指數)**: 來自 Stage 3 的歸因固著度。測量使用者是否「固執/難以改變」。

### 3.2 Rigidity（固著度）計算（決策）

**裁示（最終）**：採用 **DIRECTIVE REV.B 的三層模型（Layer A/B/C）**（選項 A）。

**裁示（最終）**：採用 DIRECTIVE REV.B 的預設值（0.0）

**理由**：
1. DIRECTIVE REV.B 是技術裁示文件，具有更高的權威性
2. 缺失 Priors 時，不應該假設使用者的歸因模式
3. 0.0 是最安全的預設值（避免誤判）

**已解決**：所有文件已統一為 0.0（見 `docs/task_packets/advisor/REMAINING_TASKS_COMPLETE_PACKET.md` 裁示）

#### 3.2.1 Canonical Formula

```python
def calculate_rigidity(profile: dict) -> float:
    """
    Rigidity Index ∈ [0.0, 1.0]
    Canonical V3 Implementation (DIRECTIVE REV.B)
    """
    if not profile:
        return 0.0  # 缺失時預設 Rigidity = 0（DIRECTIVE REV.B）
    
    locus = profile.get("locus", "INTERNAL")
    subtype = profile.get("subtype", "DEFICIT")
    agency = profile.get("agency_level", "LOW")
    
    # Layer A: Base Rigidity
    if locus == "EXTERNAL" and subtype == "FATE":
        base = 1.0
    elif locus == "EXTERNAL" and subtype == "CONTEXT":
        base = 0.6
    elif locus == "MIXED":
        base = 0.5
    elif locus == "INTERNAL" and subtype == "OVERLOAD":
        base = 0.3
    else:
        base = 0.1
    
    # Layer B: Agency Modifier
    if agency == "HIGH":
        modifier = 0.8
    elif agency == "MEDIUM":
        modifier = 0.9
    else:
        modifier = 1.0
    
    return round(min(base * modifier, 1.0), 2)
```

### 3.3 正規化（Normalization）規則（決策）

**裁示（最終）**：完全遵循 DIRECTIVE REV.B（必做）。
- 0–4, `higher_is_worse` → `v / 4.0`
- 0–4, `higher_is_worse_reversed` → `(4 - v) / 4.0`

**注意**：任何題目若不是 0–4，必須在 `inputs[].scale` 顯式宣告並提供對應 normalize 函數；否則不得進入 V3（阻擋條件）。

### 3.4 Volatility（波動度）計算（決策）

- 計算集合：只納入 `exclude_from_volatility != true` 的 inputs
- 公式：標準差（stddev），len < 2 → 0
- 建議：使用 population stdev 或 sample stdev 必須固定（建議 sample stdev）；一經決定寫入 ADR_0005 附錄（避免差異）。

### 3.5 Final Score 融合（決策）

- `raw_score` = weighted mean（全部 inputs）
- `final_score` = `clamp(raw_score * (1 + rigidity * rigidity_weight), 0, 1)`
- `rigidity_weight`：可配置，預設 0.10（見 3.7）。

### 3.6 Flags（狀態旗標）

- Volatility thresholds（可配置）：預設 `[0.15, 0.35]`
  - `vol > 0.35` → `STORM`
  - `0.15 < vol <= 0.35` → `RAIN`
- Rigidity threshold：預設 `>= 0.70` → `FROZEN`
- 允許同時存在（例：`FROZEN + STORM`）。

### 3.7 Params 預設值（追問 2-4）

**裁示（最終）**：
```json
{
  "volatility_thresholds": [0.15, 0.35],
  "rigidity_weight": 0.10,
  "rigidity_frozen_threshold": 0.70,
  "volatility_stddev_mode": "sample",
  "rigidity_default_when_missing": 0.0
}
```

**⚠️ 注意**：`rigidity_default_when_missing` 的預設值需要裁示（見 3.2 節說明）。

### 3.8 Debug Payload（追問 2-3）— 必須完整

**裁示（最終）**：必須包含完整 `_meta`（選項 A），否則不可稱為可審計引擎。

**結構（規格）**：
```json
{
  "facet_id": "burnout_syndrome",
  "model": "vector_state_v3",
  "score": 0.68,
  "band": "HIGH",
  "flags": ["RAIN"],
  "_meta": {
    "raw_score": 0.65,
    "final_score": 0.68,
    "volatility": 0.25,
    "rigidity": 0.45,
    "params": {
      "volatility_thresholds": [0.15, 0.35],
      "rigidity_weight": 0.10,
      "rigidity_frozen_threshold": 0.70,
      "volatility_stddev_mode": "sample"
    },
    "priors": {
      "present": true,
      "source": "P0-4.5",
      "attribution_profile": {
        "locus": "EXTERNAL",
        "subtype": "CONTEXT",
        "agency_level": "MEDIUM"
      }
    },
    "normalization": {
      "scale": "0-4",
      "direction_rules": "REV.B"
    },
    "inputs": [
      {
        "question_id": "Q1",
        "weight": 1.0,
        "direction": "higher_is_worse",
        "exclude_from_volatility": false,
        "raw": 3,
        "norm": 0.75,
        "contrib": 0.75
      }
    ],
    "intermediate": {
      "weighted_sum": 5.20,
      "weight_total": 8.00,
      "vol_values": [0.25, 0.75, 0.50],
      "version": "V3.0"
    }
  }
}
```

**安全性規則**：`_meta` 僅供內部/除錯（或付費/專家模式），UI 默認不顯示。

**對應 SSOT**：
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.B.md` - Rigidity 計算公式
- `docs/directives/DIRECTIVE-2026-01-12-02-REV.C+.md` - Volatility 排除規則
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` Section 3 - V3 運算引擎核心

### 3.3 特徵錨點 (Feature Anchors / Combos)

除了分數，系統須偵測特定組合以觸發**「精準敘事」**。

* **Combo: [Empty Granary]**: `Resource_Score < 0.3` AND `Effort_Score > 0.8`
* *含義*: 努力耕作卻無收成。
* *敘事*: 「農人日夜揮鋤，然倉廩依舊空虛，此非力不足，乃土不藏氣。」

* **Combo: [Flooded Root]**: `Emotion_Score > 0.8` AND `Action_Score < 0.2`
* *含義*: 情緒氾濫導致行動癱瘓。
* *敘事*: 「大水漫灌，田埂崩塌，雖有良種卻無法下田。」

**實作狀態**：⚠️ **待實作**
- 需要定義特徵錨點的 schema
- 需要補充更多範例來確保覆蓋面完整
- 需要確認特徵錨點與敘事的一致性

**後續行動**：補充更多範例和實作細節

---

## 4. 全域風險鏈矩陣 (Universal Risk-Chain Matrix)

**來源**：`ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` Section 9（2026-01-12 審核通過）

風險鏈是本引擎的核心價值：**預演未發生的未來**。必須符合「農業因果律」。

### 4.1 風險鏈結構（L1/L2/L3）

**來源**：`ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` Section 9（2026-01-12 審核通過）

每個 Facet 必須輸出：
- **L1（身/象）**：可感知徵兆（對應驗證題）
- **L2（事/行）**：行為能力下滑與決策偏差
- **L3（局/命）**：長期結構崩壞（職涯/關係/健康/財務）

**與 A/B Framework 的關係**：
- Framework A/B 僅存在於內容設計與內部邏輯
- 用於區分「停滯型崩壞」與「透支型崩壞」
- 對外輸出統一為三層結構（Level 1/2/3），不暴露 Framework A/B

**Cascade warning 與本體描述的區分**：
- Cascade warning 屬於「跨域」的補充層，不混入 L1/L2/L3 的本體描述
- 以 `cascade_warnings[]` 另出

**對應 SSOT**：
- `docs/domain/advisory/R4/R4_RISKCHAINS_STRUCTURAL_ASSETS.md` - Framework A/B 結構
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` Section 9 - 風險鏈結構

**後續行動**：建立追問包，確認風險鏈結構整合策略

### 4.2 跨域擴散 (Cross-Domain Cascade)

**來源**：`ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` Section 4（2026-01-12 GPT V3 審核通過）

#### 4.2.1 觸發條件

**裁示（最終）**：使用 `final_score > 0.80` 才觸發（final_score 含 rigidity，更貼近結構性傳導）。

#### 4.2.2 實作策略

**裁示（最終）**：動態計算（五行生剋） + 顯式覆寫表（高命中路徑專用敘事）。
- 動態：避免 8×8 64 格硬寫、易錯、難維護
- 覆寫：對商業價值高的路徑用模板鎖定敘事品質

**五行生剋規則**：
- 木剋土（震/巽 → 坤/艮）
- 土剋水（坤/艮 → 坎）
- 水剋火（坎 → 離）
- 火剋金（離 → 乾/兌）
- 金剋木（乾/兌 → 震/巽）

#### 4.2.3 詞彙治理（必須）

Cascade 敘事必須通過 `narrative_guard` 白黑名單檢查。
- 禁止輸出不在白名單的核心詞
- 允許模板參數化（但參數值同樣受白名單約束）

#### 4.2.4 Anti-Spam（必須）

- 單次回應最多 3 條 warning
- 同一 target domain 只出 1 條
- `FROZEN+STORM` 可提高優先級，但不突破數量限制

**實作狀態**：✅ **已實作**
- `engine/cascade_calculator.py` - 完整實作
- `domain/cascade/cascade_overrides.v1.0.json` - 覆寫表範例

**對應 SSOT**：
- `engine/cascade_calculator.py` - Cascade 實作
- `domain/cascade/cascade_overrides.v1.0.json` - 覆寫表
- `ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL.md` Section 4 - 跨域擴散引擎

---

## 5. 結果呈現與敘事架構 (Result Presentation)

### 5.1 動態敘事組裝 (Dynamic Narrative Assembly)

**對應 SSOT**：`domain/knowledge_base/result_presentation_design.v1.0.md`

L1-L4 的內容並非靜態文本，而是由以下模組組裝：

1. **Opening (起)**: 讀取 `Stage 1 Domain`。「觀君之事業田...」
2. **Validation (承)**: 讀取 `Validation Questions`。「近來似有夜不成眠、肩背沈重之象...」(**準到發毛點**)
3. **Diagnosis (轉)**: 讀取 `Feature Anchors`。「此乃『水多土流』之局，非君不努力，乃形勢比人強。」
4. **Prophecy (合)**: 讀取 `Risk Chain`。「若不疏通水道，恐致根系徹底腐爛，來年春耕無望。」

**與 L1-L4 的對應關係**：
- **Opening** → L1 (Hexagram Visual) + L2 (Root Narrative) 的開場
- **Validation** → L2 (Root Narrative) 的驗證部分
- **Diagnosis** → L3 (Flow Analysis) 的診斷部分
- **Prophecy** → L4 (Action & Risk) 的風險鏈部分

**實作狀態**：⚠️ **待確認**
- 需要確認動態敘事組裝與 L1-L4 的對應關係是否完整
- 需要確認 Validation Questions 的來源（是否來自題目設計）

### 5.2 建議系統：宜與忌 (Actionable Advice)

建議必須明確、微小、可執行，分為三階：

* **止損 (Stop)**: 對應 `Risk Level 1`。「忌：強行擴張、大興土木。」
* **養護 (Nourish)**: 對應 `Risk Level 2`。「宜：修補圍籬、曬田養氣。」
* **轉勢 (Pivot)**: 對應 `Risk Level 3`。「心法：退一步，為了進兩步。」

**對應 SSOT**：`domain/knowledge_base/result_presentation_design.v1.0.md`

---

## 6. 詞彙與安全治理 (Vocabulary & Safety Governance)

### 6.1 嚴格白名單機制

* **Allowlist**: 僅允許 `vocabulary_metaphysical.json` 內的詞彙通過。
* **Blacklist**: 任何 `psychological`, `medical`, `fatalistic` 詞彙觸發即 **BLOCK**。

**對應 SSOT**：
- `domain/knowledge_base/vocabulary_metaphysical.v1.0.json` - 玄學詞彙白名單
- `domain/knowledge_base/forbidden_terms.v1.0.json` - 全域禁用詞表

### 6.2 命定論防禦 (Anti-Fatalism Protocol)

* **禁止**: 「你註定失敗」、「你的命不好」。
* **強制重寫**:
* Input: "Your personality causes you to fail."
* Rewrite: "土質偏硬，若不深耕，種子難以穿透。" (將「人格」轉化為「土質」，暗示可透過「深耕」改變)。

**對應 SSOT**：
- `domain/knowledge_base/forbidden_terms.v1.0.json` - 包含命定論用語
- `domain/knowledge_base/presentation_guidelines.v1.0.md` - 呈現用語規範

---

## 7. 總結：給開發團隊的指引

1. **Database**: 需要存儲 User Session 的完整路徑 (Stage 1-4 + Facet Answers)，以便計算 Cross-Domain Risk。
2. **API**: Facet Calculation API 需接受 `priors` 參數。
3. **Content**: 需盡快擴充 `metaphors_agriculture.json`，涵蓋現代生活的所有映射 (如：Email = 信鴿/飛書，會議 = 議事/聚落)。

**本規格書定義了引擎的邏輯極限。執行此規格，即能達成「全知全能」的體驗目標。**

---

## 8. 待確認項目（需追問）

### 8.1 運算模型升級

**問題**：
1. 是否要**取代**現有的 `weighted_sum` 模型，還是作為**擴充**（支援兩種模型）？
2. 是否需要建立 ADR（Architecture Decision Record）來記錄這個架構變更？
3. Volatility Index 和 Rigidity Index 的計算方式是否需要更多細節？
4. 如何處理現有 Facet（如 `stress_recovery`）的遷移？

**追問包位置**：`docs/task_packets/advisor/ENGINE_CORE_LOGIC_MASTER_V3_QUESTIONS.md`

### 8.2 風險鏈結構整合

**問題**：
1. 三層結構與 A/B Framework 的關係是什麼？
2. 是否要將 A/B Framework 映射到三層結構？
3. 如何處理現有 Facet（如 `income_expansion_pressure`）的風險鏈遷移？

**追問包位置**：`docs/task_packets/advisor/ENGINE_CORE_LOGIC_MASTER_V3_QUESTIONS.md`

---

**建立日期**：2026-01-12  
**狀態**：ACTIVE · REFERENCE · EDITABLE  
**最後更新**：2026-01-12
