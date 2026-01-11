# BRIEF_P0-4_banned_terms_L4_templates_R4

**完整任務包**（包含所有必要背景資料）  
**生成時間**：2026-01-09  
**版本**：v1.0  
**批准狀態**：✅ APPROVED（總指揮批准）

---

## 任務資訊
- **Phase**: P0-4 Facet Portability & Stress Test
- **Blocker**: B2、B3（阻斷點）
- **Role**: R4 (Risk Chain Architect)
- **Facet**: `relationship_imbalance`
- **任務性質**: 結構驗證任務（非內容創作）

---

## 任務目標

為 `relationship_imbalance` Facet 補齊**安全邊界**：禁用詞擴充 + L4 高風險出口模板，確保高壓情境不失控。

### 成功定義（不可模糊）
- ✅ 高風險只能走模板
- ✅ 模板語氣穩定、可收束
- ✅ 與 P0-3 安全哲學完全一致

---

## Facet 定義（完整內容）

### What it is (scope)
描述「關係互動長期失衡」的狀態感：付出/索取失衡、邊界失衡、冷熱失衡、責任失衡（僅斷氣象與格局，不斷事件）。

### What it is NOT (hard bans)
- ❌ 不推斷具體事件（對方是否外遇/是否故意傷害/是否一定會分開）
- ❌ 不下現實決策指令（分手/離婚/搬家/提告/就醫/投資）
- ❌ 不使用現代心理/醫療/法律/管理術語（由禁用詞表管控）

### Output style (must)
- ✅ 對外：只用玄學/歲時/自然/五行語感（後續由 R2/R4 補足此 facet 的主隱喻）
- ✅ 結構：沿用 P0-3 的 L1–L4 cadence + L4 高風險出口模板機制

### 任務範圍
- ✅ **本任務只做**：
  - relationship_imbalance 專用禁用詞擴充（可 grep）- **R4 負責**
  - 高風險 L4 固定模板（1–2 條）- **R4 負責**
- ❌ **本任務不做**：
  - 不做題目設計（R1）- 已完成（P0-2）
  - 不做行動建議（R3）- 本階段禁止（P0-3 明確排除）
  - 不做語感 polish / 雙語校對（R5）- 本階段禁止（P0-3 明確排除）
  - 不改 L1–L4 cadence、不改 Safety Gates、不下任何現實決策指令

---

## 任務內容（必須逐條符合）

### 1️⃣ 禁用詞擴充
**要求**：
- 擴充 Facet 專用禁用詞（CN/EN）
- 類型至少包含：
  - 心理 / 醫療
  - 法律 / 關係判決
  - 現實決策指令
  - 宿命 / 恐嚇
- 規則：命中即 FAIL，不轉譯、不補救
- 可被 grep / regex 機器檢查

### 2️⃣ L4 高風險出口模板（1–2 條）
**要求**：
- 僅在高風險觸發時使用
- 語氣要求：
  - 不恐嚇
  - 不宿命
  - 不下具體決策（分手、離婚等）
  - 僅描述「態勢 / 走向 / 宜忌」
  - 必須可收束，不引導延伸
- 允許少量變數插槽（但必須符合主隱喻）
- 必須與 P0-3 的模板結構一致

---

## 禁區（命中即 FAIL）

- ❌ 推斷對方行為或動機
- ❌ 現實決策指令
- ❌ 心理、法律、醫療語言
- ❌ 現代心理/醫療/法律/管理術語
- ❌ 具體事件預言
- ❌ 可操作人生決策指令（分手/離婚/搬家/提告/就醫/投資）
- ❌ 宿命論、恐嚇語（註定失敗、沒救了、完蛋、永遠無法、報應、死路、絕望、災難）

---

## 治理規範（必須遵守）

### 最終目標（系統 North Star）
「打造一個以心理學、行為科學與認知結構為底層引擎，
以東方命理、玄學、象數與隱喻作為人類可理解介面，
能夠適用於全世界、全文化、全人類、全問題場景的
解析、引導與連鎖互動系統。」

### 專案目標
- **主目標**：打造可長期運作、可維護、可收費、可持續擴充的互動式網頁產品
- **核心策略**：核心引擎可審計；外層以東方命理敘事呈現；對使用者提供可執行建議與風險鏈

### 不可觸碰限制
1. 主進度/主目標以文本為準，不以對話上下文為準
2. 未寫入文本的結論視為不存在
3. 任何結構性變更（schema/domain/governance/charter）必須 ADR + 使用者批准
4. 指揮官必須白話回報、短句直白

### 成功定義（必須達成）
本專案在**使用者的認知與體驗中**，是一個**完整的玄學系統**。

使用者只會、也只需要感知到：
- 這是一個玄學網站
- 這是一套命理／神秘系統
- 這個系統非常準
- 這個系統對自己很有幫助

使用者**不需要、也不應該**被告知：
- 任何心理學名詞
- 任何現代科學背景
- 任何「其實這不是玄學」的說明

---

## 參考範例：P0-3 禁用詞表（完整內容）

### 來源 1：JSON 格式（機器可讀）
`docs/domain/advisory/R4/P0-3_NARRATIVE_BLACKLIST_SSOT.json`

### P0-3 禁用詞表結構
```json
{
  "version": "2.0",
  "scope": "P0-3 income_expansion_pressure",
  "status": "FROZEN_FOR_P0-3",
  "facet": "income_expansion_pressure",
  "primary_metaphor": "agriculture_granary",
  "note": "Facet限定，不具全域封鎖效力",
  "blacklist": {
    "clinical_medical": {
      "cn": ["焦慮", "憂鬱", "躁鬱", "創傷", "壓力", "失眠", "職業倦怠", "心理諮商", "治療", "診斷", "症狀", "內分泌", "皮質醇", "多巴胺", "身心科"],
      "en": ["Anxiety", "Depression", "Trauma", "PTSD", "Burnout", "Stress", "Insomnia", "Therapy", "Counseling", "Diagnosis", "Symptom", "Cortisol", "Dopamine", "Mental health", "Panic attack"]
    },
    "finance_corporate": {
      "cn": ["投資", "理財", "破產", "負債", "貸款", "槓桿", "被動收入", "資產配置", "績效", "KPI", "OKR", "升遷", "離職", "裁員", "失業", "職場", "老闆", "主管", "面試"],
      "en": ["Investment", "Bankruptcy", "Debt", "Loan", "Passive income", "Asset", "KPI", "Performance", "Promotion", "Resign", "Quit", "Layoff", "Unemployment", "Boss", "Manager", "Career path"]
    },
    "specific_instruction": {
      "cn": ["分手", "離婚", "買房", "買車", "存錢", "記帳", "兼職", "斜槓", "轉職", "跳槽"],
      "en": ["Break up", "Divorce", "Buy house", "Save money", "Accounting", "Side hustle", "Part-time job"]
    },
    "fatalism_fear": {
      "cn": ["註定失敗", "沒救了", "完蛋", "永遠無法", "報應", "死路", "絕望", "災難"],
      "en": ["Doomed", "Hopeless", "Irreversible", "Ruined", "Disaster", "Karma (punitive)", "Forever stuck"]
    }
  },
  "rule": {
    "on_hit": "FAIL",
    "no_translation_recovery": true,
    "note": "命中任一詞彙 → 直接 FAIL，不可轉譯補救"
  }
}
```

### 來源 2：人類可讀版本
`docs/domain/advisory/R4/P0-3_BANNED_TERMS_LIST.md`

### P0-3 中文禁用詞（CN）

**心理 / 醫療**
- 焦慮、憂鬱、躁鬱、創傷、壓力、失眠、職業倦怠
- 心理諮商、治療、診斷、症狀、內分泌、皮質醇、多巴胺、身心科

**金融 / 管理**
- 投資、理財、破產、負債、貸款、槓桿、被動收入、資產配置
- 績效、KPI、OKR、升遷、離職、裁員、失業、職場、老闆、主管、面試

**具體人生指令**
- 分手、離婚、買房、買車、存錢、記帳、兼職、斜槓、轉職、跳槽

**宿命 / 恐嚇**
- 註定失敗、沒救了、完蛋、永遠無法、報應、死路、絕望、災難

### P0-3 英文禁用詞（EN）

**Psych / Medical**
- Anxiety、Depression、Trauma、PTSD、Burnout、Stress、Insomnia
- Therapy、Counseling、Diagnosis、Symptom、Cortisol、Dopamine、Mental health、Panic attack

**Finance / Mgmt**
- Investment、Bankruptcy、Debt、Loan、Passive income、Asset、KPI、Performance
- Promotion、Resign、Quit、Layoff、Unemployment、Boss、Manager、Career path

**Directives / Life**
- Break up、Divorce、Buy house、Save money、Accounting、Side hustle、Part-time job

**Fatalism / Fear**
- Doomed、Hopeless、Irreversible、Ruined、Disaster、Karma (punitive)、Forever stuck

### P0-3 檢查規則

**硬規則（Hard Fail）**
- 命中任一詞彙 → 直接 FAIL（Gate=0）
- 不可轉譯補救：不能通過轉譯或替代說法來規避檢查

**檢查方法**
- Regex / Grep 檢查：使用 JSON 格式進行自動檢查
- 不分大小寫：匹配時不分大小寫
- 部分匹配：匹配到詞彙的任何部分即觸發

**CI / Golden Test 驗證**
- CI 必須輸出：Gate pass/fail + 命中詳單
- 若命中 → FinalScore 強制為 0（不允許 "部分通過"）

### P0-3 治理定位說明

**規則性質**：
- 本禁用詞表屬於：P0-3 Facet-Level Governance
- 適用範圍：僅限 Facet `income_expansion_pressure`（歲時農耕・倉廩觀）
- 不等於：全域禁用

**跨 Facet 隔離規則**：
其他 Facet 若需使用心理 / 金融語彙，必須：
1. 另立 Facet：新建獨立的 Facet 定義
2. 另立轉譯與安全規範：建立該 Facet 專屬的禁用詞表和轉譯規則
3. 不可回滲本 Facet：其他 Facet 的允許詞彙，不得反向影響本 Facet 的規則

**制度備註**：
- ✅ 僅適用於 `income_expansion_pressure`
- ❌ 不構成全系統宿命論
- ❌ 不構成全域禁用詞清單

---

## 參考範例：P0-3 L4 高風險出口模板（完整內容）

### 來源
`docs/domain/advisory/R4/P0-3_L4_HIGH_RISK_EXIT_TEMPLATES.md`

### P0-3 Facet 資訊
- **Facet**：`income_expansion_pressure`
- **主隱喻**：歲時農耕・倉廩觀

### P0-3 硬規則（Mandatory）

**使用條件**
- 觸發條件：R4 觸發高風險時
- 使用方式：L4 只能使用固定模板（允許少量變數插槽）
- 禁止：臨場發揮、自創語句、改寫模板

**必須符合**
- ✅ 不恐嚇
- ✅ 不宿命
- ✅ 不下決策指令（辭職/就醫/投資/分手等）
- ✅ 保持能動性（避免宿命論）：即使入冬，也要給「守中養根/避風保本」的姿態

### P0-3 模板 A｜過熱 / 強耕 / 過度消耗

**完整模板**
```
此時田土焦熱，地力已現疲態。強行深耕恐傷地氣，非長久之計。

宜： 休耕養息，疏通溝渠，靜待天降甘霖。
忌： 焦躁冒進，透支來年地力。

養地即是養命，留得青山在，不怕沒柴燒。
```

**適用場景**
- 高風險：資源過度消耗、持續高強度運作
- 對應內部狀態：高 severity + 高 coping pressure

**變數插槽（可選）**
- 可替換：`{季節}`、`{地況}`（例如："此時田土焦熱" → "此時田土{季節}，地力已現疲態"）
- **限制**：變數必須符合主隱喻，不得插入現代詞

### P0-3 模板 B｜枯竭 / 絕望 / 資源見底

**完整模板**
```
嚴冬封地，萬物蟄伏。雖倉廩見底，然根系尚存土中，生機未絕。

宜： 守中護根，封倉避風，不宜冒進開源。
忌： 輕棄根基，受寒風侵擾。

此非終局，乃節氣之轉折。若覺風雪難耐，尋一避風處暫歇，靜候春雷初響。
```

**適用場景**
- 高風險：資源見底、極度枯竭、瀕臨絕望
- 對應內部狀態：極高 severity + 極低 coping capacity

**變數插槽（可選）**
- 可替換：`{季節}`、`{地況}`（例如："嚴冬封地" → "{季節}封地"）
- **限制**：變數必須符合主隱喻，不得插入現代詞

### P0-3 模板驗證規則

**必須符合的檢查點**
- ✅ **不恐嚇**：無「必死」、「絕望」、「完蛋」等恐嚇語
- ✅ **不宿命**：無「註定」、「永遠」、「無法改變」等宿命語
- ✅ **不下決策指令**：無「辭職」、「就醫」、「投資」、「分手」等可操作人生決策
- ✅ **保持能動性**：給出「宜/忌」姿態，而非絕望宣判

**機器化檢查**
```regex
# 檢查是否違反硬規則
/(註定失敗|沒救了|完蛋|永遠無法|報應|死路|絕望|災難|辭職|就醫|投資|分手|離婚|買房|買車)/

# 違規後果：匹配到任何違規詞 → FAIL
```

### P0-3 使用說明

**選擇模板**
- **模板 A**：適用於過熱/強耕/過度消耗場景
- **模板 B**：適用於枯竭/絕望/資源見底場景

**插入變數（可選）**
- 允許少量變數插槽，但必須符合主隱喻
- 禁止插入現代詞或技術術語

**禁止改寫**
- **禁止**：臨場發揮、自創語句、改寫模板
- **必須**：使用固定模板，僅允許少量變數插槽

### P0-3 治理定位說明

**規則性質**：
- 本模板屬於：P0-3 Facet-Level Governance
- 適用範圍：僅限 Facet `income_expansion_pressure`（歲時農耕・倉廩觀）
- 目的：固定高風險時唯一可用語句，避免越界

**跨 Facet 差異性**：
其他 Facet 若需使用不同的高風險出口模板，必須：
1. 另立 Facet：新建獨立的 Facet 定義
2. 另立模板：建立該 Facet 專屬的 L4 高風險出口模板
3. 不可回滲本 Facet：其他 Facet 的模板，不得反向影響本 Facet

**制度備註**：
- ✅ 僅適用於 `income_expansion_pressure`
- ❌ 不構成全系統宿命論
- ❌ 不構成全域高風險處理規則

---

## 交付物格式要求

### 交付物 1：禁用詞表 JSON（機器可讀）
**文件路徑**：`docs/domain/advisory/R4/P0-4_NARRATIVE_BLACKLIST_SSOT.json`（新建或更新）

**必須包含**：
1. **版本資訊**：version、scope、status、facet、primary_metaphor
2. **禁用詞分類**：
   - `clinical_medical`（心理 / 醫療）：CN/EN 詞彙列表
   - `law_relationship_verdict`（法律 / 關係判決）：CN/EN 詞彙列表（需針對關係失衡擴充）
   - `specific_instruction`（現實決策指令）：CN/EN 詞彙列表（需針對關係失衡擴充）
   - `fatalism_fear`（宿命 / 恐嚇）：CN/EN 詞彙列表
3. **檢查規則**：`on_hit: "FAIL"`、`no_translation_recovery: true`

**格式要求**：
- 必須是有效的 JSON 格式
- 必須包含 CN 和 EN 兩種語言的禁用詞
- 必須明確標註 Facet 限定

### 交付物 2：禁用詞表人類可讀版本
**文件路徑**：`docs/domain/advisory/R4/P0-4_BANNED_TERMS_LIST.md`（新建）

**必須包含**：
1. **中文禁用詞（CN）**：按分類列出（心理/醫療、法律/關係判決、現實決策指令、宿命/恐嚇）
2. **英文禁用詞（EN）**：按分類列出（Psych/Medical、Law/Relationship、Directives/Life、Fatalism/Fear）
3. **檢查規則**：硬規則、檢查方法、CI/Golden Test 驗證
4. **治理定位說明**：規則性質、跨 Facet 隔離規則、制度備註

**格式要求**：
- 條列式、可落盤、少論述
- 必須包含完整的禁用詞列表和檢查規則
- 必須包含治理定位說明

### 交付物 3：L4 高風險出口模板
**文件路徑**：`docs/domain/advisory/R4/P0-4_L4_HIGH_RISK_EXIT_TEMPLATES.md`（新建）

**必須包含**：
1. **硬規則（Mandatory）**：使用條件、必須符合的檢查點
2. **模板 A**（1 條）：完整模板、適用場景、變數插槽（可選）、限制
3. **模板 B**（如果需要 2 條）：完整模板、適用場景、變數插槽（可選）、限制
4. **模板驗證規則**：必須符合的檢查點、機器化檢查
5. **使用說明**：選擇模板、插入變數、禁止改寫
6. **治理定位說明**：規則性質、跨 Facet 差異性、制度備註

**格式要求**：
- 必須包含完整的模板內容（不是路徑引用）
- 必須包含完整的驗證規則和使用說明
- 必須包含治理定位說明

---

## 驗收標準

### 必須通過的驗收標準（阻斷封板）

#### 禁用詞擴充驗收標準
- ✅ `relationship_imbalance` 專用禁用詞已擴充（可 grep）
- ✅ 類型至少包含：心理/醫療、法律/關係判決、現實決策指令、宿命/恐嚇
- ✅ 機器化檢查規則已建立
- ✅ 人類可讀版本已提供
- ✅ grep/測試能擋下所有現代詞（心理/醫療/法律/管理術語）
- ✅ 對外輸出：0 現代污染
- ✅ 規則：命中即 FAIL，不轉譯、不補救

#### L4 高風險出口模板驗收標準
- ✅ 高風險出口模板（1–2 條）已定義
- ✅ 模板語氣符合要求：不恐嚇、不宿命、不下具體決策指令
- ✅ 模板保持能動性：給出「宜/忌」姿態，而非絕望宣判
- ✅ 高風險只能走模板（固定模板，不允許自由文本）
- ✅ 模板語氣穩定、可收束
- ✅ 與 P0-3 安全哲學完全一致

### 驗收檢查清單
- [ ] `docs/domain/advisory/R4/P0-4_NARRATIVE_BLACKLIST_SSOT.json` 已創建或更新
- [ ] `docs/domain/advisory/R4/P0-4_BANNED_TERMS_LIST.md` 已創建
- [ ] `docs/domain/advisory/R4/P0-4_L4_HIGH_RISK_EXIT_TEMPLATES.md` 已創建
- [ ] `relationship_imbalance` 專用禁用詞已擴充（可 grep）
- [ ] 機器化檢查規則已建立
- [ ] 人類可讀版本已提供
- [ ] 高風險出口模板（1–2 條）已定義
- [ ] 模板語氣符合要求（不恐嚇、不宿命、不下具體決策指令）
- [ ] 模板保持能動性（給出「宜/忌」姿態）
- [ ] 治理定位說明已包含（Facet 限定，不構成全域禁用）

---

## 注意事項

### 關鍵提醒
1. **遵循 P0-3 的結構**：
   - P0-4 必須遵循 P0-3 的禁用詞分類和檢查規則結構
   - P0-4 必須遵循 P0-3 的 L4 模板結構（硬規則、模板內容、驗證規則、使用說明）
   - 參考 P0-3 的範例，但針對 `relationship_imbalance` facet 進行調整

2. **Facet 限定，不構成全域禁用**：
   - 禁用詞表和 L4 高風險出口模板都是 Facet 限定的
   - 不構成全域禁用，不影響其他 Facet

3. **針對關係失衡場景擴充**：
   - 禁用詞表需要針對關係失衡場景擴充（法律/關係判決、關係相關的決策指令）
   - L4 模板需要針對關係失衡的高風險場景設計（但必須符合主隱喻，待 R2 設計主隱喻後調整）

4. **與 P0-3 的關係**：
   - P0-4 的規則結構必須與 P0-3 等價
   - 但內容（禁用詞表、L4 模板）必須針對 `relationship_imbalance` facet 設計

---

## 常見問題（FAQ）

### Q1: 如果禁用詞表與 P0-3 的禁用詞表重複怎麼辦？
**A**: 可以重複。禁用詞表是 Facet 限定的，不同 Facet 可以有相同的禁用詞。只要機器化檢查規則一致即可。

### Q2: 如果 L4 高風險出口模板與 P0-3 的模板相似怎麼辦？
**A**: 可以相似。只要符合主隱喻和 Facet 定義即可。但要確保模板語氣符合要求：不恐嚇、不宿命、不下具體決策指令。

### Q3: L4 模板需要等待 R2 設計主隱喻嗎？
**A**: 是的。L4 模板必須符合主隱喻（由 R2 設計），但可以先建立模板結構和驗證規則，待 R2 產出主隱喻後再調整模板內容。

---

## 聯繫方式

### 總指揮（Cursor）
- **角色**：總指揮 + 總工程師（Commander-in-Chief + Chief Engineer）
- **職責**：產出任務包、接收顧問輸出、將資料寫入正確位置、驗證驗收標準

### 副指揮官（GPT）
- **角色**：副指揮官（Deputy Commander）
- **職責**：執行任務包、提供專業意見和建議、審核顧問師的輸出

---

## 狀態更新

### 當前狀態
- **任務狀態**：OPEN（等待 R4 顧問產出）
- **最後更新**：2026-01-09

---

**任務包生成時間**：2026-01-09  
**任務包版本**：v1.0  
**任務包狀態**：✅ APPROVED | ACTIVE



