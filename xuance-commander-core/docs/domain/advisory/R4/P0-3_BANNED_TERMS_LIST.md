# P0-3 Banned Terms List（禁用詞清單｜人類可讀版）

## 狀態
- ACTIVE
- Facet 限定：`income_expansion_pressure`（歲時農耕・倉廩觀）
- 版本：v2.0
- 日期：2026-01-09

---

## 目的
提供人類可讀的禁用詞清單，用於理解和管理機器化檢查規則。  
**注意**：命中任一詞彙 → 直接 FAIL，不可轉譯補救。

---

## 1️⃣ 中文禁用詞（CN）

### 心理 / 醫療
- 焦慮、憂鬱、躁鬱、創傷、壓力、失眠、職業倦怠
- 心理諮商、治療、診斷、症狀、內分泌、皮質醇、多巴胺、身心科

### 金融 / 管理
- 投資、理財、破產、負債、貸款、槓桿、被動收入、資產配置
- 績效、KPI、OKR、升遷、離職、裁員、失業、職場、老闆、主管、面試

### 具體人生指令
- 分手、離婚、買房、買車、存錢、記帳、兼職、斜槓、轉職、跳槽

### 宿命 / 恐嚇
- 註定失敗、沒救了、完蛋、永遠無法、報應、死路、絕望、災難

---

## 2️⃣ 英文禁用詞（EN）

### Psych / Medical
- Anxiety、Depression、Trauma、PTSD、Burnout、Stress、Insomnia
- Therapy、Counseling、Diagnosis、Symptom、Cortisol、Dopamine、Mental health、Panic attack

### Finance / Mgmt
- Investment、Bankruptcy、Debt、Loan、Passive income、Asset、KPI、Performance
- Promotion、Resign、Quit、Layoff、Unemployment、Boss、Manager、Career path

### Directives / Life
- Break up、Divorce、Buy house、Save money、Accounting、Side hustle、Part-time job

### Fatalism / Fear
- Doomed、Hopeless、Irreversible、Ruined、Disaster、Karma (punitive)、Forever stuck

---

## 3️⃣ 檢查規則

### 硬規則（Hard Fail）
- **命中任一詞彙** → 直接 FAIL（Gate=0）
- **不可轉譯補救**：不能通過轉譯或替代說法來規避檢查

### 檢查方法
- **Regex / Grep 檢查**：使用 `P0-3_NARRATIVE_BLACKLIST_SSOT.json` 進行自動檢查
- **不分大小寫**：匹配時不分大小寫
- **部分匹配**：匹配到詞彙的任何部分即觸發

### CI / Golden Test 驗證
- CI 必須輸出：Gate pass/fail + 命中詳單
- 若命中 → FinalScore 強制為 0（不允許 "部分通過"）

---

## 4️⃣ 機器化檢查規格

### JSON 格式（機器可讀）
見 `P0-3_NARRATIVE_BLACKLIST_SSOT.json` 獲取完整機器可讀格式。

### Regex 檢查範例
```regex
# 中文禁用詞檢查
/(焦慮|憂鬱|躁鬱|創傷|壓力|失眠|職業倦怠|心理諮商|治療|診斷|症狀|內分泌|皮質醇|多巴胺|身心科|投資|理財|破產|負債|貸款|槓桿|被動收入|資產配置|績效|KPI|OKR|升遷|離職|裁員|失業|職場|老闆|主管|面試|分手|離婚|買房|買車|存錢|記帳|兼職|斜槓|轉職|跳槽|註定失敗|沒救了|完蛋|永遠無法|報應|死路|絕望|災難)/

# 英文禁用詞檢查
/(Anxiety|Depression|Trauma|PTSD|Burnout|Stress|Insomnia|Therapy|Counseling|Diagnosis|Symptom|Cortisol|Dopamine|Mental health|Panic attack|Investment|Bankruptcy|Debt|Loan|Passive income|Asset|KPI|Performance|Promotion|Resign|Quit|Layoff|Unemployment|Boss|Manager|Career path|Break up|Divorce|Buy house|Save money|Accounting|Side hustle|Part-time job|Doomed|Hopeless|Irreversible|Ruined|Disaster|Karma|Forever stuck)/i
```

---

## 5️⃣ 治理定位說明

### 規則性質
- **本禁用詞表屬於**：P0-3 Facet-Level Governance
- **適用範圍**：僅限 Facet `income_expansion_pressure`（歲時農耕・倉廩觀）
- **不等於**：全域禁用

### 跨 Facet 隔離規則
其他 Facet 若需使用心理 / 金融語彙，必須：
1. **另立 Facet**：新建獨立的 Facet 定義
2. **另立轉譯與安全規範**：建立該 Facet 專屬的禁用詞表和轉譯規則
3. **不可回滲本 Facet**：其他 Facet 的允許詞彙，不得反向影響本 Facet 的規則

### 制度備註
- ✅ 僅適用於 `income_expansion_pressure`
- ❌ 不構成全系統宿命論
- ❌ 不構成全域禁用詞清單

---

## 6️⃣ 狀態與版本

- **狀態**：ACTIVE
- **版本**：v2.0
- **建立日期**：2026-01-09
- **建立依據**：R4 顧問交付（P0-3 B2 任務交付）
- **審核狀態**：APPROVED（已審核通過，品質達 P0-3 封版等級）

---

## 參考文件
- **機器可讀版本**：`P0-3_NARRATIVE_BLACKLIST_SSOT.json`
- **轉譯規則**：`docs/domain/output/P0-3_FIELD_TRANSLATION_RULES.md`
- **治理規則**：`docs/domain/advisory/GOVERNANCE_METAPHOR_COMPATIBILITY_RULE.md`



