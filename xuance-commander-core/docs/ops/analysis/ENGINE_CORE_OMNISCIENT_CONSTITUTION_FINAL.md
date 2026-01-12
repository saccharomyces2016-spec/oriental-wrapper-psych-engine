# ENGINE CORE LOGIC — THE OMNISCIENT CONSTITUTION (FINAL)
**文件編號**：CONSTITUTION-2026-01-12-FINAL-REV.Ω  
**建立日期**：2026-01-12  
**適用範圍**：Backend Engine / Content System / UI Contract / Data Governance  
**狀態**：FINAL · EXECUTION-READY · AUDIT-READY · WRITE-IN READY  
**對齊依據**：CHARTER / ADR_0005 / DIRECTIVE-REV.C+ / DIRECTIVE-REV.B / ENGINE_CORE_LOGIC_MASTER_V3 / ENGINE_CORE_FINAL_INTEGRATION-001 / OMNISCIENT_MATRIX 追問包  

> 本文件為「單一可落地的終極整合規格（SSOT級）」：  
> 1) **統一所有決策**（含追問包裁示）  
> 2) **給工程師可直接實作**（無隱性推導）  
> 3) **給審核可直接驗收**（明確驗收點/阻擋條件）  
> 4) **維持玄學外觀**（前台不暴露現代科學語彙）

---

## 0. CANON（不可覆寫）
### 0.1 終極目標（North Star）
- 覆蓋：全世界、全年齡、全文化、全性別、全困擾、全問題場景
- 體驗：使用者只感知「玄學/命理/神秘系統」，且「準到發毛、看得懂、有幫助」
- 工程：核心引擎可審計（可重跑、可驗證、可回溯）
- 產出：提供「可執行解法」＋「未解決之連鎖反應（Risk Chain / Cascade）」

### 0.2 不可觸碰限制（Governance Locks）
- 進度與結論以文本為準；未寫入文本視為不存在
- 任何「結構性變更（schema/domain/governance/charter）」必須 ADR + 指揮官批准
- 禁止隱性魔法（Implicit Magic）：所有行為必須以顯式欄位或顯式配置決定

---

## 1. 全知矩陣圖譜（The Omniscient Map）
### 1.1 八大領域（Ba Gua Domains）與元素屬性（5-Element）
> 八卦作為「全人類困擾」的**分類拓樸**；五行作為「跨域風險傳導」的**物理層介質**。

| 卦象 | 自然象徵 | 現代困擾域（使用者不可見） | Domain Key | 5-Element | MVP 核心 Facet（至少 1） |
|---|---|---|---|---|---|
| 乾 Qian | 天 | 自我/權威/方向 | `qian` | 金 | `leadership_burden` |
| 坤 Kun | 地 | 事業/資源/財務 | `kun` | 土 | `income_expansion_pressure`（既有） |
| 震 Zhen | 雷 | 行動/變動/焦慮 | `zhen` | 木 | `procrastination_loop` |
| 巽 Xun | 風 | 關係/溝通/社交 | `xun` | 木 | `relationship_imbalance`（既有） |
| 坎 Kan | 水 | 情緒/抑鬱/成癮 | `kan` | 水 | `deep_depression` |
| 離 Li | 火 | 過勞/形象/認知 | `li` | 火 | `burnout_syndrome` |
| 艮 Gen | 山 | 健康/家庭/阻滯 | `gen` | 土 | `physical_somatization` |
| 兌 Dui | 澤 | 口舌/衝突/慾望 | `dui` | 金 | `conflict_argument` |
| 中宮 Center | 渾沌 | 兜底路由 | `center` | － | `general_chaos_router`（系統 Facet） |

**硬性規則（可驗收）**：
1. 每個 Domain 必須配置 `domain.element`（金木水火土），且為 SSOT。  
2. 每個 Domain 在 MVP 至少 1 個 Facet；Full 至少 3 個 Facet（可逐步達成）。  
3. `center` 不作為普通 Domain 計分；僅作為路由與缺失 priors 之兜底流程。

### 1.2 中宮（Chaos Routing）
**用途**：使用者無法選擇、或多域同時困擾、或 priors 缺失時的「安全路由器」。  
**策略**：依 P0-4.5 Stage 2/3 的輸入生成 `priors.attribution_profile`，並回推至 8 域之一；若仍不確定，採「多域並行」但**限制輸出數量**（最多 2 域提示 + 1 域主要路由）。

---

## 2. 題目設計聖典（The Question Canon）— 追問 1 裁示
> 追問包要求：必須解決「8 題制 vs 6-10 題」矛盾，並給出可實作的硬規則。

### 2.1 題數規範（決策）
**裁示（最終）**：採用 **選項 B**  
- **允許 6–10 題彈性**（符合 ENGINE_CORE_LOGIC_MASTER_V3）  
- **預設（RECOMMENDED DEFAULT）= 8 題**（作為「可比性最佳」的標準模板）  
- **例外（>10 或 <6）**：僅在「強需求」時允許，且必須 **ADR 批准**（結構性變更）。

### 2.2 題型配比（可比性規則）
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
- 比例校正透過「權重」而非「題數」：見 2.3 權重基準。

#### 2.2.2 10 題擴展模板（Decet Optional）
當 Facet 複雜度偏高（跨文化、跨年齡、跨身份差異顯著），允許採 10 題：**3 + 2 + 3 + 2**  
- Core State 3（30%）
- Validation 2（20%）
- Reaction 3（30%）
- Resources 2（20%）

**啟用條件**：`scoring.question_set = "DECET_10"` 且須在 Facet 檔案內顯式宣告（無自動推導）。  
**ADR 需求**：不需要（仍在 6–10 範圍內），但必須寫入文本並在 manifest 標記。

### 2.3 權重基準（推薦）
在 8 題制下，推薦權重：  
- Core State：1.00  
- Validation：1.00（參與 Severity；但排除 Volatility）  
- Reaction：1.25（放大波動信號）  
- Resource：0.75（穩定與緩衝）

> 權重只是「推薦預設」，Facet 可調整，但必須顯式寫入 `inputs[].weight`。

### 2.4 工程標記（DIRECTIVE-REV.C+）
所有 `Validation` 與 `Resource` 必須顯式標記：
```json
"exclude_from_volatility": true
```
**禁止**依題型推導（違反 REV.C+）。

---

## 3. V3 運算引擎核心（The Math Core）— 追問 2 裁示
### 3.1 Rigidity（固著度）計算（決策）
**裁示（最終）**：採用 **DIRECTIVE REV.B 的三層模型（Layer A/B/C）**（選項 A）。

#### 3.1.1 Canonical Formula
```python
def calculate_rigidity(profile: dict) -> float:
    base = get_base_rigidity(profile["locus"], profile["subtype"])
    modifier = get_agency_modifier(profile["agency_level"])
    return round(min(base * modifier, 1.0), 2)
```

### 3.2 正規化（Normalization）規則（決策）
**裁示（最終）**：完全遵循 DIRECTIVE REV.B（必做）。  
- 0–4, `higher_is_worse` → `v / 4.0`  
- 0–4, `higher_is_worse_reversed` → `(4 - v) / 4.0`  

**注意**：任何題目若不是 0–4，必須在 `inputs[].scale` 顯式宣告並提供對應 normalize 函數；否則不得進入 V3（阻擋條件）。

### 3.3 Volatility（波動度）計算（決策）
- 計算集合：只納入 `exclude_from_volatility != true` 的 inputs  
- 公式：標準差（stddev），len < 2 → 0  
- 建議：使用 population stdev 或 sample stdev 必須固定（建議 sample stdev）；一經決定寫入 ADR_0005 附錄（避免差異）。

### 3.4 Final Score 融合（決策）
- `raw_score` = weighted mean（全部 inputs）  
- `final_score` = `clamp(raw_score * (1 + rigidity * rigidity_weight), 0, 1)`  
- `rigidity_weight`：可配置，預設 0.10（見 3.6）。

### 3.5 Flags（狀態旗標）
- Volatility thresholds（可配置）：預設 `[0.15, 0.35]`  
  - `vol > 0.35` → `STORM`  
  - `0.15 < vol <= 0.35` → `RAIN`  
- Rigidity threshold：預設 `>= 0.70` → `FROZEN`  
- 允許同時存在（例：`FROZEN + STORM`）。

### 3.6 Params 預設值（追問 2-4）
**裁示（最終）**：
```json
{
  "volatility_thresholds": [0.15, 0.35],
  "rigidity_weight": 0.10,
  "rigidity_frozen_threshold": 0.70,
  "volatility_stddev_mode": "sample"
}
```

### 3.7 Debug Payload（追問 2-3）— 必須完整
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

---

## 4. 跨域擴散引擎（Cascade / Butterfly Effect）— 追問 3 裁示
### 4.1 觸發條件（決策）
**裁示（最終）**：使用 `final_score > 0.80`（選項 A）  
理由：final_score 已包含固著度（更符合「結構性風險傳導」）。

### 4.2 矩陣策略（8×8）
**裁示（最終）**：採用 **動態計算（選項 C） + 顯式覆寫表** 的混合方案。  
- **動態計算**：依五行生剋規則即時計算所有可能傳導（避免硬寫 64 格且易錯）  
- **顯式覆寫（Override Table）**：針對「高命中、商業價值高」的路徑配置專用敘事模板（更準、更可控）

### 4.3 詞彙治理（決策）
**裁示（最終）**：跨域擴散敘事必須通過詞彙檢查（選項 A），且推薦「模板庫」策略（選項 C）。  
- Implementation：`narrative_guard.validate(text, whitelist, blacklist)`  
- 產出形式：從模板庫取用 + 小幅參數化（但不得生成不在白名單的關鍵詞）

### 4.4 實作架構（決策）
**裁示（最終）**：獨立模組（選項 B）  
- 檔案：`engine/cascade_calculator.py`  
- 調用位置：Facet 計分完成後的 Response 組裝層（Interceptor / Orchestrator）  
- 禁止：把 cascade 混進 `score_facet.py` 內部（保持單一職責與可測）。

### 4.5 介面（Contract）
**Input**：
- `source_facet_id`, `source_domain`, `source_element`, `final_score`, `flags`, `context_payload`  
**Output**：
- `cascade_warnings[]`（0–3 條，避免過度觸發）  
- 每條包含：`target_domain`, `target_element`, `relation`, `template_id`, `user_facing_text`, `severity_hint`

### 4.6 避免過度觸發（Anti-Spam）
硬規則（可驗收）：
- 同一次回應最多 3 條 cascade warning  
- 同一 target domain 只允許 1 條  
- 若 `STORM` 且 `FROZEN` 同時成立，可將 warning 優先級提升（但仍受數量限制）

---

## 5. 使用者背景資料策略（User Model）— 追問 4 裁示
### 5.1 Layer 1（P0-5）是否要修改？
**裁示（最終）**：採用 **選項 B**（同時收集 Role Archetype + 出生年月日）  
- **出生年月日**：維持 P0-5 要求（用於 Root Element / 五行碰撞），不移除（避免結構性變更）。  
- **Role Archetype**：新增為可選或弱必填（產品策略可調），用於調參（volatility thresholds）。

> 注意：若要把「出生年月日改為非必填」屬於 P0-5 結構性變更，必須走 ADR + 指揮官批准；本文件先不觸碰該變更。

### 5.2 兩套系統整合（決策）
採用 **兩者獨立、互不影響（選項 C）**：  
- Role Archetype：只影響 V3 params（`volatility_thresholds` 或 `rigidity_weight` 可微調，但建議只動 thresholds）  
- Root Element：只影響五行碰撞（`collision_calculator.py`）與敘事層（不影響 score 的數學核心）

### 5.3 隱私與存留（必做）
- DOB 屬 PII：
  - 若 server 端處理：必須有「短期存留/可刪除」策略（資料清理）
  - 若 client 端處理：可只上傳 Root Element（不傳 DOB）作為最小化方案（此為後續 ADR 可選路線）

---

## 6. 向後相容與遷移（Backward Compatibility）— 追問 5 裁示
### 6.1 既有 14 個 Facet 如何處理？
**裁示（最終）**：逐步遷移（選項 C）  
- 現有 Facet 先保持運作（不得阻擋產品）  
- 新增 Facet（坎/離等高價值域）直接採 V3 + 8/10 題模板  
- 舊 Facet 每週固定升級 N 個（建議 2），以內容產能為節奏

### 6.2 模型共存策略
**裁示（最終）**：同時支援（選項 A）  
- `scoring.model` 決定計分策略（策略模式）  
  - `weighted_sum`（legacy）  
  - `vector_state_v3`（new）  
- ADR_0005 原則：V1/V2 Facet 不得被迫升級

### 6.3 遷移計劃（必做）
**裁示（最終）**：建立完整遷移計畫（選項 A）  
最低包含：
- 優先級（先升級高流量/高付費路徑）
- 每個 Facet 的「完成定義」（題數達標 + 模型切換 + 測試通過）
- 回滾策略（若 V3 造成 UX 或 score 分布異常，可回到 legacy）

---

## 7. P0-4.5 Funnel → Engine 整合（必做）
### 7.1 Priors Contract（SSOT）
`priors` 必須可以缺失；缺失時使用 `center` 兜底策略。

**Priors 最小結構**：
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

### 7.2 缺失 Priors 的處理（必做）
- `priors.present=false`  
- `rigidity=0.0`（MIXED default）或依產品策略設定（必須寫入 params）  
- 系統提示：不以心理學語彙解釋，只以玄學語境提示「資訊不足，需補一輪定象」。

---

## 8. UI / Engine 契約（不可妥協）
### 8.1 權威來源
- Frontend：預覽、交互、過場（不可作最終分數）
- Backend：權威計算、審計 payload、cascade、風險鏈

### 8.2 對齊機制（必做）
- 任何前後端計算差異 = BLOCKER  
- 必須提供：`FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md`（文件）+ 測試用 fixtures（JSON）

---

## 9. 風險鏈（Risk Chain）結構（L1/L2/L3）
每個 Facet 必須輸出：
- L1（身/象）：可感知徵兆（對應驗證題）
- L2（事/行）：行為能力下滑與決策偏差
- L3（局/命）：長期結構崩壞（職涯/關係/健康/財務）

Cascade warning 屬於「跨域」的補充層，不混入 L1/L2/L3 的本體描述；以 `cascade_warnings[]` 另出。

---

## 10. 檔案與模組落點（Cursor 可直接照做）
### 10.1 Engine
- `engine/score_facet.py`：策略模式 + V3 計分 + debug payload
- `engine/cascade_calculator.py`：跨域擴散模組
- `engine/narrative_guard.py`：詞彙白黑名單驗證（或既有治理模組整合）

### 10.2 Domain / Content
- `domain/domains/*.domain.v1.0.json`：Domain element / routing hints
- `domain/facets/*.scoring.v1.0.json`：`scoring.model`、`inputs[].exclude_from_volatility`
- `domain/questions/*.questions.v1.0.json`：題目內容與語言版本（CN/EN）
- `domain/knowledge_base/`：白名單、黑名單、敘事規範

### 10.3 Integration Specs
- `specs/integration/ui_engine/FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md`
- `specs/engine/core/integration/priors_integration.md`

---

## 11. 驗收標準（Audit Checklist）
### 11.1 V3 引擎驗收
- [ ] 所有 V3 Facet：normalize 規則符合 REV.B（0–1 語義一致）  
- [ ] `exclude_from_volatility` 顯式存在且邏輯生效（REV.C+）  
- [ ] `_meta` payload 可重算且含 intermediate  
- [ ] params 可配置且有預設值  
- [ ] 同一組 fixture 前後端結果一致（或前端不計分）

### 11.2 Cascade 驗收
- [ ] `final_score > 0.8` 才觸發  
- [ ] 動態五行計算 + override 模板可用  
- [ ] 詞彙檢查必過（白名單/黑名單）  
- [ ] anti-spam 規則生效（最多 3、去重）

### 11.3 Data 策略驗收
- [ ] DOB 仍符合 P0-5（不擅自移除）  
- [ ] Role Archetype 可用且只影響 params  
- [ ] PII 存留策略有文檔與實作（或 client-only 替代方案列入 ADR backlog）

---

## 12. 最終宣告（Final Declaration）
- 本文件已對追問包的五大高優先問題給出**可執行裁示**，並提供工程落點與驗收點。  
- 任何後續「改規格」必須以 ADR 進行（符合治理）。  
- 玄學外觀的敘事與 UI 表現可持續擴張，但**不得反向污染**計分核心（保持可審計性）。

**Commander**  
**System Status**：GREEN / GO FOR IMPLEMENTATION

---

## APPENDIX A — Domain Element 外置化（追問 1：最終裁示）
**最終裁示**：採用「選項 A + A」  
- A：建立獨立 `domain/domains/*.domain.v1.0.json`（SSOT）  
- A：Facet manifest 內新增 `domainKey`（顯式引用，禁止推導）

### A.1 Domain 檔案（SSOT）
- `domain/domains/bagua.domain_map.v1.0.json`
- 每個 domain 必須具備：`domainKey`, `trigram`, `element`, `labels`, `routing_hints`, `default_facets`

### A.2 Manifest 引用
- `domain/manifests/*.v1.0.json` 必須包含：`domainKey`
- 任何缺少 `domainKey` 的 manifest 視為「Legacy」，由 orchestrator 走 fallback（但須在 audit report 標註）

---

## APPENDIX B — 缺失 Priors 的 Rigidity（追問 2：最終裁示）
**最終裁示**：採用「選項 A」＝ **Rigidity = 0.0**（完全對齊 DIRECTIVE REV.B）  
- 原因：缺失 attribution_profile 時，不得引入主觀推定（避免系統性偏移）
- UI 需引導補齊 priors，但計分核心不得預填 MIXED=0.5

---

## APPENDIX C — 10 題擴展模板 Schema（追問 3：最終裁示）
**最終裁示**：採用「顯式宣告（Explicit Declaration）」  
- `scoring.question_set`：`OCTET_8 | DECET_10 | FLEX_6_10`
- Schema 必須允許 6–10 題；若 `DECET_10` 則要求 `questions.length == 10`（或在 compiled 時驗證）
- `exclude_from_volatility` 必須逐題顯式存在（REV.C+）

---

## APPENDIX D — 標準差模式（追問 4：最終裁示）
**最終裁示**：使用 **Sample Standard Deviation（statistics.stdev）**  
- `scoring.volatility_stddev_mode="sample"` 作為 SSOT  
- ADR_0005 必須顯式記載（避免實作方用 pstdev 造成結果漂移）

---

## APPENDIX E — 世界級增強建議（追問 5：可直接落地）
### E.1 多語言（CN/EN）本地化（必做）
- 全部 user-facing 文本採 Keyed Message（不內嵌字串）
- 格式：ICU MessageFormat（複數、性別、地區化）
- 版本控管：`domain/i18n/<lang>/...`，與 facet/domain 版本綁定

### E.2 文化適應（必做）
- 「符號雲」與「斷語模板」分離：Symbol Set 可按文化切換（East Asia / West / MENA / LatAm）
- 禁止文化假設：不得預設家庭/婚姻/工作型態；以角色原型與處境變數驅動敘事

### E.3 可訪問性（A11y）最低標準
- WCAG 2.2 AA：對比、鍵盤可達、可讀替代文本
- 動畫：提供 Reduce Motion；避免閃爍與眩暈觸發

### E.4 效能與擴展
- 前端：分段載入（Stage 1–4 chunk），首次載入 < 1.5MB
- 後端：計分與敘事生成分離（score first, narrative later），可快取

### E.5 隱私與合規
- PII 最小化：DOB 若可 client-only，僅傳 Root Element；否則 server-side 必須 TTL 清理
- 審計：所有 score 可重算，但不得保存原始答案明文（只保存 hash 或聚合）

