# ENGINE CORE LOGIC — THE OMNISCIENT CONSTITUTION (FINAL)
**文件編號**：CONSTITUTION-2026-01-12-FINAL-REV.Ω2  
**建立日期**：2026-01-12  
**適用範圍**：Backend Engine / Content System / UI Contract / Data Governance  
**狀態**：FINAL · EXECUTION-READY · AUDIT-READY · WRITE-IN READY  
**對齊依據**：CHARTER / ADR_0001 / ADR_0005 / DIRECTIVE-REV.B / DIRECTIVE-REV.C+ / ENGINE_CORE_LOGIC_MASTER_V3 / ENGINE_CORE_FINAL_INTEGRATION-001 / OMNISCIENT_MATRIX 追問包  

> 本文件為本次追問包的「單一真相來源（SSOT）」：  
> - **所有追問 1–5 皆已裁示**（含工程可落地規格）  
> - **禁止隱性魔法**：所有行為必須由顯式欄位或顯式配置觸發（REV.C+）  
> - **可審計**：V3 引擎輸出必須可重算（含 `_meta`）  
> - **可擴充**：新增 Domain/Facet 不得造成重構災難（Schema 明確、模組可替換）  

---

## 0. CANON（不可覆寫）
### 0.1 終極目標（North Star）
1. 覆蓋：全世界、全年齡、全文化、全性別、全困擾、全問題場景  
2. 體驗：使用者只看見「玄學/象數/隱喻」，但能得到可執行的指引  
3. 工程：可審計、可重跑、可驗證、可回溯（Debug Payload / Fixtures / Tests）  
4. 安全：敏感語彙治理（白/黑名單）、高風險出口模板（R4/R5 等）可插拔  

### 0.2 不可觸碰限制（Governance Locks）
- 文本治理：未寫入文本視為不存在；任何結構性變更需 ADR  
- 禁止「Implicit Magic」：不得由程式推測題型/排除規則/策略，必須顯式宣告  
- Frontend 不得成為權威計算來源（避免分歧與不可審計）  

---

## 1. 全知矩陣圖譜（Omniscient Map）
### 1.1 八大領域（Ba Gua Domains）與 5-Element
| 卦象 | 自然象徵 | 現代困擾域（使用者不可見） | Domain Key | 5-Element | MVP Facet（至少 1） |
|---|---|---|---|---|---|
| 乾 Qian | 天 | 自我/權威/方向 | `qian` | 金 | `leadership_burden` |
| 坤 Kun | 地 | 事業/資源/財務 | `kun` | 土 | `income_expansion_pressure` |
| 震 Zhen | 雷 | 行動/變動/焦慮 | `zhen` | 木 | `procrastination_loop` |
| 巽 Xun | 風 | 關係/溝通/社交 | `xun` | 木 | `relationship_imbalance` |
| 坎 Kan | 水 | 情緒/抑鬱/成癮 | `kan` | 水 | `deep_depression` |
| 離 Li | 火 | 過勞/形象/認知 | `li` | 火 | `burnout_syndrome` |
| 艮 Gen | 山 | 健康/家庭/阻滯 | `gen` | 土 | `physical_somatization` |
| 兌 Dui | 澤 | 口舌/衝突/慾望 | `dui` | 金 | `conflict_argument` |
| 中宮 Center | 渾沌 | 兜底路由 | `center` | NONE | `general_chaos_router` |

**硬性規則（驗收）**：  
- `domain.element` 必須存在且為 SSOT（不得散落多處互相矛盾）  
- Domain 對應 Facet 清單允許逐步擴充，但 Domain Key 不可改名（破壞兼容）  
- `center` 不計分；僅用於路由、缺失 priors、或多域並行控制輸出數量  

### 1.2 中宮（Chaos Router）
- 目標：當使用者無法自選 Domain 或出現多域混雜時，避免 UX 斷裂  
- 機制：以 Stage 2（符號痛點）+ Stage 3（歸因鏡像）產生 `priors`，回推至 8 域之一；若仍不確定，最多同時提示 2 域 + 指定 1 域作為主路由  

---

## 2. 題目數量規範（追問 1｜PRIORITY: HIGH）
### 2.1 最終裁示
- **固定 8 題為最佳實務**（可比性最佳、模板最穩定、波動率計算的數學前提）  
- **允許擴充至 10 題**（在 6–10 範圍內），但**必須顯式宣告** `question_set="DECET_10"`（禁止推導）  
- **10 題擴充規則**：新增的 2 題必須是 **Validation** 類型（加強信任），嚴禁破壞 Core/Reaction 的比例  
- **<6 或 >10**：屬結構性變更，必須 ADR + 指揮官批准  

### 2.2 模板定義
- **OCTET_8**：`3 Core State + 2 Validation + 2 Reaction + 1 Resource`  
- **DECET_10**：`3 Core State + 2 Validation + 3 Reaction + 2 Resource`  

### 2.3 顯式宣告（Schema）
- Manifest 必填：`domainKey`、`question_set`（預設 `OCTET_8`）  
- Scoring 必填：`model`（`weighted_sum` / `vector_state_v3`）  
- Inputs 必填：每題都必須指定 `exclude_from_volatility`（REV.C+）  

---

## 3. V3 引擎計算公式完整性（追問 2｜PRIORITY: HIGH）
### 3.1 Normalize 規則（REV.B）
- `higher_is_worse`: `v/4`  
- `higher_is_worse_reversed`: `(4-v)/4`  
> 若不是 0–4，必須在 `inputs[].scale` 顯式宣告與提供 normalize 函數；否則阻擋進入 V3。

### 3.2 Severity / Volatility / Rigidity
- **Severity**：所有 inputs 加權平均（含 Validation / Resource）  
- **Volatility**：只納入 `exclude_from_volatility=false` 的 inputs，採 **sample stddev**（SSOT）  
- **Rigidity**：採 DIRECTIVE REV.B 三層模型（Base × Modifier）  

### 3.3 Final Score（融合）
`final_score = clamp(raw_score * (1 + rigidity * rigidity_weight), 0, 1)`  
- `rigidity_weight` 預設 0.10（可由 Role Archetype 微調，但建議只動 thresholds）  

### 3.4 Flags（狀態）
- `volatility_thresholds` 預設 `[0.15, 0.35]` → `RAIN` / `STORM`  
- `rigidity >= 0.70` → `FROZEN`（可與 RAIN/STORM 並存）  

### 3.5 Debug Payload（必須）
V3 回應必須包含 `_meta`，足以重算：  
- 原始答案、正規化、權重貢獻  
- vol 計算集合（排除題後）  
- params（實際使用值）  
- priors 是否存在與來源  
> `_meta` 不提供給一般使用者 UI（預設隱藏）。

---

## 4. 跨域擴散引擎（追問 3｜PRIORITY: MEDIUM）
### 4.1 觸發條件
**裁示**：使用 `final_score > 0.80` 才觸發（final_score 含 rigidity，更貼近結構性傳導）。

### 4.2 實作策略
**裁示**：動態計算（五行生剋） + 顯式覆寫表（高命中路徑專用敘事）。  
- 動態：避免 8×8 64 格硬寫、易錯、難維護  
- 覆寫：對商業價值高的路徑用模板鎖定敘事品質  

### 4.3 詞彙治理（必須）
cascade 敘事必須通過 `narrative_guard` 白黑名單檢查。  
- 禁止輸出不在白名單的核心詞  
- 允許模板參數化（但參數值同樣受白名單約束）

### 4.4 Anti-Spam（必須）
- 單次回應最多 3 條 warning  
- 同一 target domain 只出 1 條  
- `FROZEN+STORM` 可提高優先級，但不突破數量限制  

---

## 5. 使用者背景資料策略整合（追問 4｜PRIORITY: MEDIUM）
### 5.1 最終裁示
- 保留 P0-5：DOB（出生年月日）流程不擅自移除（避免結構性變更）  
- 增加 Role Archetype（可選或弱必填）：用於調整 `volatility_thresholds`（而非直接改 score）  

### 5.2 兩軌分離（避免污染計分核心）
- DOB → Root Element（用於敘事/碰撞，不改核心 score）  
- Role → Params（只微調 thresholds / 或少量權重；預設只動 thresholds）  

### 5.3 隱私
DOB 屬 PII：必須提供「短期存留/可刪除」策略；或採 client-only 計算 Root Element 的 ADR 後續路線。

---

## 6. 向後相容性（追問 5｜PRIORITY: MEDIUM）
### 6.1 策略
- 策略模式：`scoring.model` 決定 `weighted_sum` 或 `vector_state_v3`  
- Lazy Migration：既有 Facet 先保留 legacy；新 Facet 直接 V3；每週固定升級 N 個（建議 2）  
- 回滾：任何 Facet 若 V3 造成分布異常，可回到 legacy（同一份 questions 仍可用）  

---

## 7. P0-4.5 Funnel → Engine 契約（必做）
### 7.1 Priors Contract（最小結構）
```json
{
  "source": "P0-4.5",
  "attribution_profile": {
    "locus": "EXTERNAL|MIXED|INTERNAL",
    "subtype": "FATE|CONTEXT|OVERLOAD|DEFICIT",
    "agency_level": "HIGH|MEDIUM|LOW"
  },
  "domain_hint": "kun",
  "symbols": ["broken_seal", "leaking_grain_sack"]
}
```

### 7.2 缺失 priors 的行為（必須顯式）
- `priors.present=false`
- `rigidity_default_when_missing = 0.0`（符合 DIRECTIVE REV.B；寫入 params）
- UX：以玄學語境提示「需補一輪定象」

---

## 8. UI / Engine 契約（不可妥協）
- Backend 為權威分數；Frontend 只負責互動與過場  
- 必須提供 alignment 文件 + fixtures：同一組輸入得到一致輸出  

---

## 9. Risk Chains（L1/L2/L3）
每個 Facet 必須輸出：
- L1（身/象）：感知徵兆（對應驗證題）
- L2（事/行）：行為能力下滑
- L3（局/命）：長期結構崩壞

---

## 10. 驗收（Audit Checklist）
- V3：normalize / exclude_from_volatility / stddev_mode / `_meta` 完整
- Cascade：>0.8 觸發、動態+覆寫、詞彙治理、anti-spam
- Data：DOB 保留、Role 只調 params、PII 策略存在
- Backward：兩模型共存、可回滾、遷移計畫具體

---

## 11. 最終宣告
本文件為本次追問包的最終裁示與工程落地規格。任何變更必須走 ADR。

**Commander**  
**System Status**：GREEN / GO FOR IMPLEMENTATION
