# P0-3 完整狀態報告（Complete Status Report）
> **用途**：此文件包含 P0-3 任務的所有相關記錄和過程，可直接複製貼給 GPT 查看當前狀態、待補事項、以及所有詳細記錄路徑。
> **生成時間**：2026-01-09
> **文件路徑**：`P0-3/P0-3_COMPLETE_STATUS.md`

---

## 📋 快速概覽

### 任務目標
為 `income_expansion_pressure（歲時農耕・倉廩觀）` 建立可填槽的敘事骨架與詞彙對照，讓輸出「咬合入骨」但不越界（不得落入具體醫療/法律/投資/人際決策指令）。

### 當前狀態
- **狀態**：🟡 條件通過（可進入下一步，但需補齊護欄）
- **是否可以收尾**：❌ 否
- **阻斷點**：見下方「待補齊項目」

### 主要成果
- ✅ **R1**：敘事銳利度指標 M1–M4 + Critical Fail 規則
- ✅ **R2**：L1–L4 敘事骨架 + 插槽規格 + Lexicon v1
- ✅ **R4**：安全稽核清單 + 自動轉譯護欄（Rewrite Guards）

---

## ⚠️ 待補齊項目（阻斷點）

### 1. 隱喻一致性未定版
- **問題**：主隱喻為「歲時農耕/倉廩」，是否允許混入「航海/導航/蜃樓」等次隱喻尚未白名單化
- **需要**：次隱喻白名單（允許哪些、每段最多幾個、不得出現哪些句型）
- **追問對象**：R2（主責）＋ R4（共審）
- **詳細說明**：見下方「追問清單 Q1」

### 2. 禁用詞未機器化
- **問題**：需要把「禁用詞」落成可檢查的確切詞表（含中英），避免漏網
- **需要**：對外禁用詞確切詞表（中英、同義詞、常見變體），可直接用 grep/測試擋下
- **追問對象**：R1（規格化）＋ R2（詞庫落地）＋ R4（安全把關）
- **詳細說明**：見下方「追問清單 Q2」

### 3. 高風險時的 L4 安全出口模板未固定
- **問題**：R4 觸發高風險時，L4 應統一收束到固定句式，避免臨場發揮越界
- **需要**：R4 觸發高風險時的 L4 固定模板（1–2 條即可），確保不恐嚇、不中傷、不下決策指令
- **追問對象**：R4（主責）＋ R2（語感校正）
- **詳細說明**：見下方「追問清單 Q3」

---

## 📝 詳細內容

### 1. 決策包（Decision Packet）
**文件路徑**：`P0-3/DECISION_PACKET_P0-3.md`

**關鍵結論**：
- 已具備三件核心（R1/R2/R4）
- 條件通過，但需補齊三個阻斷點
- 對外語感規範：一律走「東方命理/玄學/五行/氣機/歲時」語感
- 驗收點：見下方「驗收點」

**追問清單**：

#### Q1｜隱喻一致性（主/次隱喻白名單）
- **要問的內容**：
  1) `income_expansion_pressure` 是否**完全禁止**「航海/導航/蜃樓」等非農耕隱喻？  
  2) 若允許，請給「次隱喻白名單」：允許哪些、每段最多幾個、不得出現哪些句型（避免隱喻崩塌）。

#### Q2｜禁用詞表機器化（對外輸出零現代污染）
- **要問的內容**：
  1) 請提供「對外禁用詞」**確切詞表**（中英、同義詞、常見變體），可直接用 grep/測試擋下。  
  2) 針對內部欄位名（severity/coping/attribution/risk chain），請定義「對外轉譯規則」與對應玄學詞（避免欄位名外洩）。

#### Q3｜高風險時 L4 安全出口模板（固定句式）
- **要問的內容**：
  1) 請提供「R4 觸發高風險」時的 L4 固定模板（1–2 條即可），確保不恐嚇、不中傷、不下決策指令。  
  2) 模板需保持能動性（避免宿命論）：即使入冬，也要給「守中養根/避風保本」的姿態，而非絕望宣判。

#### Q4｜驗收門檻（Pass/Fail 自動化）
- **要問的內容**：
  1) M1–M4 的「最低通過線」是否要寫死（例如：M1 至少 1 個主隱喻意象；M3 禁用詞 0；M4 L5 0；M2 不矛盾）？  
  2) 是否提供 5 條「標準測試樣本」用於 CI（包含：高壓、停滯、外壓、內耗、臨界高風險）？

---

### 2. 對外語感規範（表層呈現必遵）

#### 2.1 對使用者可見的語詞：一律走「東方命理/玄學/五行/氣機/歲時」語感
- ✅ **允許**：氣機、五行、生克、流年、節氣、倉廩、田土、雨澤、堤防、疏濬、休耕、養根、守中、趨吉避凶（避免字面恐嚇）
- ❌ **禁用（對外）**：任何現代心理/商業/醫療/投資/管理術語（例：焦慮、壓力、倦怠、burnout、coping、attribution、KPI、投資、離職、分手、就醫…）

> **注意**：內部可以保留技術欄位名（如 severity、risk chain），但**不得直接出現在對外輸出句子**；如需出現，必須先玄學轉譯後再顯示。

#### 2.2 「準到發毛」但不越界（銳利度的合法邊界）
- ✅ **可以「斷狀態」**：斷氣象、斷格局、斷暗流、給姿態（L1-L4）  
- ❌ **不可「斷事實/斷事件」**：不可推斷具體職場事件、伴侶行為、投資得失、健康診斷等  
- ❌ **不可「下具體指令」**：不可要求使用者做出可操作的現實決策（辭職/買賣/離婚/就醫…）

---

### 3. 已採納/退回清單

#### 3.1 直接採用（納入 SSOT 候選）
- ✅ R2：L1–L4 四層節奏 + Slot Filling 結構
- ✅ R4：P0-3 專用 Checklist + Rewrite Guards（強制轉譯安全出口）
- ✅ R1：M1–M4 指標 + Critical Fail 規則（L5/心理名詞/邏輯矛盾即退回）

#### 3.2 退回修補（最小修補，避免大返工）
- ⚠️ **R2 插槽值**：所有表層值需改為純玄學語感（例：移除 Burnout 等現代詞）
- ⚠️ **次隱喻白名單**：若允許「導航/蜃樓」等，需明確列為「次隱喻白名單」與使用條件（例如：每段最多 1 個、不得替代主隱喻）
- ⚠️ **禁用詞機器化**：把禁用詞表做成「可 grep 檢查」的固定詞表（含中英、同義詞、常見變體）
- ⚠️ **高風險 L4 固定模板**：R4 觸發時，L4 一律收束到「求庇護/守中/避風」的固定句式（僅換少量變數）

---

### 4. 驗收點（你現在就能用）
- [ ] 對外輸出中：**無任何現代心理/醫療/投資/管理術語**
- [ ] 全段只走：歲時、農耕、倉廩、氣機、五行語感
- [ ] 無具體事件預言、無第三方歸因、無具體人生指令（L5=0）
- [ ] L1–L4 每層都有明確功能，且 L4 僅給「姿態/方位」不給「決策指令」

---

## 📚 已採納的交付物（Accepted Deliverables）

### R1 (Metrics)
- ✔ Narrative Sharpness Metrics v1 (Gated Scoring)
- ✔ M1/M2 Algorithm & CI Schema
- ✔ Narrative Metrics Implementation Spec v1
- **參考文件**：
  - `docs/domain/advisory/R1/P0-3_METRICS.md`
  - `docs/domain/metrics/P0-3_NARRATIVE_METRICS_IMPLEMENTATION.md`
  - `P0-3/R1_METRICS_V1_EXECUTABLE_SPEC.md`

### R2 (Narrative)
- ✔ Bite Tuning Techniques v1
- ✔ Absolute Verdict Scope Definition
- ✔ Narrative Skeleton v1 (L1–L4 fixed cadence + slots)
- ✔ Esoteric Lexicon & Mapping v1
- **參考文件**：
  - `docs/domain/advisory/R2/P0-3_NARRATIVE_TUNING.md`
  - `docs/domain/advisory/R2/P0-3_ABSOLUTE_VERDICT_PROTOCOL.md`
  - `docs/domain/output/P0-3_NARRATIVE_SHARPNESS.md`
  - `P0-3/R2_METAPHOR_BOUNDARY_BANLIST_HIGHRISK_TEMPLATES.md`

### R4 (Safety)
- ✔ Mandatory L4 Trigger Protocol
- ✔ Affirmative Scope Control
- ✔ Narrative Blacklist SSOT (JSON)
- ✔ Narrative Control Protocol
- **參考文件**：
  - `docs/domain/advisory/R4/P0-3_SAFETY_PROTOCOL.md`
  - `docs/domain/advisory/R4/P0-3_NARRATIVE_CONTROL_PROTOCOL.md`
  - `docs/domain/advisory/R4/P0-3_NARRATIVE_BLACKLIST_SSOT.json`
  - `docs/domain/advisory/R4/P0-3_INTENSITY_COOLING_LEXICON.md`

---

## 🔄 任務日誌（Task Log）

**文件路徑**：`docs/domain/advisory/P0-3_TASK_LOG.md`

**最新狀態**：
- Status: READY_FOR_FREEZE_REVIEW
- Modification Right: RESERVED

**更新記錄**：
- ✅ Secondary metaphor rules added (machine-checkable)
- ✅ High-intensity imagery cooling layer added
- ✅ Golden tests executed
- ✅ Governance Update: Added expandable metaphor domain framework
- ✅ CI_GOLDEN_TESTS_MVP: COMPLETED

---

## 📊 快照提取（Snapshot Extract）

**文件路徑**：`docs/domain/P0-3_SNAPSHOT_EXTRACT.md`

**關鍵信息**：
- Phase: P0-3
- Status: OPEN
- Last Updated: 2026-01-08
- Editable: YES (All snapshots are revisable)

**已拒絕/延後決策**：
- UI 呈現形式（八卦盤 / 圖像 / 文字混合）：明確延後至後續階段（ADR-0006）
- Phase 2 / Phase 3 追問模組：不在 P0-3 範圍內
- Evidence-Note 掛載（婆媳 / 職場 / 創業）：延後至後續階段
- 具體行動建議內容（R2/R3）：不在 P0-3 範圍內
- 文化或年齡層差異優化：延後至後續階段

**已知但暫不解的問題**：
- M1 詞表是否需 Embedding：Deferred（Regex matching is sufficient for MVP）
- 多 Facet 共用 Blacklist 的擴展風險：當前 Blacklist 僅針對 `income_expansion_pressure`，後續需評估通用化策略
- 次隱喻白名單的機器化檢查：當前為人工審核，後續可考慮自動化
- 高強度意象降溫規則的細化：R4 已定義基本框架，但具體降溫詞表需後續補充
- 「建議你」禁用詞的產品語氣統一：待後續產品層面決策

**跨角色一致性檢查**：
- R1 Metrics ⟷ R2 Narrative：✅ 一致
- R2 Narrative ⟷ R4 Safety：✅ 一致
- R1 Metrics ⟷ R4 Safety：✅ 一致

**封版條件**：
- 條件 1：所有 R1/R2/R4 規格文檔已寫入 SSOT 且通過驗證
- 條件 2：CI Golden Tests（TC-01~TC-05）全部通過
- 條件 3：Cross-Role Consistency Check 全部為「一致」
- 條件 4：所有已知風險已明確標記為「已知但暫不解」或「延後」

**當前結論**：
- ☐ 已達成階段目標
- ☑ 尚需補強（指明哪一塊）
  - 需補強：次隱喻白名單的機器化檢查規則
  - 需補強：高強度意象降溫詞表的細化
  - 需補強：產品語氣統一策略（「建議你」→「宜/可/不宜」）
- ☐ 可封版入檔（保留修改權）

---

## 📑 快照索引（Snapshot Index）

**文件路徑**：`docs/domain/snapshots/P0-3_SNAPSHOT_INDEX.md`

**SSOT 參考**：
- R1 Metrics: `docs/domain/advisory/R1/P0-3_METRICS.md`
- R1 Impl Spec: `docs/domain/metrics/P0-3_NARRATIVE_METRICS_IMPLEMENTATION.md`
- R2 Narrative: `docs/domain/advisory/R2/P0-3_NARRATIVE_TUNING.md`
- R4 Safety: `docs/domain/advisory/R4/P0-3_SAFETY_PROTOCOL.md`
- Blacklist SSOT: `docs/domain/advisory/R4/P0-3_NARRATIVE_BLACKLIST_SSOT.json`

**已採納（階段凍結）**：
- Narrative Sharpness Metrics v1 (Gated)
- M1/M2 Scoring Algorithm
- L1–L4 Narrative Skeleton
- Mandatory L4 Trigger Protocol
- Blacklist SSOT (income_expansion_pressure)

**已延後（不在範圍內）**：
- UI / Visual form
- Follow-up questioning
- Concrete action advice
- Cross-facet generalization

**開放缺口（非阻斷）**：
- Secondary Metaphor Whitelist → machine-check rules
- High-intensity imagery cooldown lexicon
- Product tone unification ("宜 / 忌 / 可")

**凍結準備度**：
- Metrics: READY
- Narrative: READY
- Safety: READY
- Governance gaps: IDENTIFIED

**階段狀態**：
- STATUS = READY_FOR_HARDENING
- EDITABLE = YES
- P0-3 = READY_TO_FREEZE (with editable flag)

**完成檢查清單**：
- [x] Secondary Metaphor Whitelist (machine-check)
- [x] High-Intensity Imagery Cooldown Lexicon
- [x] CI Golden Tests defined
- [ ] Cross-facet portability (post-freeze)

---

## 🎯 下一步行動

### 立即需要處理（阻斷點）
1. **補齊次隱喻白名單**：
   - 明確列出允許的次隱喻（如「導航/蜃樓」等）
   - 定義使用條件（每段最多幾個、不得出現哪些句型）
   - 建立機器化檢查規則

2. **禁用詞機器化**：
   - 建立確切詞表（中英、同義詞、常見變體）
   - 可 grep/測試擋下的格式
   - 定義內部欄位名的對外轉譯規則

3. **高風險 L4 安全出口模板固定**：
   - 提供 R4 觸發高風險時的 L4 固定模板（1–2 條）
   - 確保不恐嚇、不中傷、不下決策指令
   - 保持能動性（避免宿命論）

### 後續優化（非阻斷）
- 驗收門檻自動化（M1–M4 最低通過線）
- 標準測試樣本（5 條用於 CI）
- 產品語氣統一策略
- 高強度意象降溫詞表細化

---

## 📂 完整文件列表

### 核心決策文件
- `P0-3/DECISION_PACKET_P0-3.md` - 決策包（完整）
- `P0-3/R1_METRICS_V1_EXECUTABLE_SPEC.md` - R1 規格
- `P0-3/R2_METAPHOR_BOUNDARY_BANLIST_HIGHRISK_TEMPLATES.md` - R2 規格

### 任務記錄
- `docs/domain/advisory/P0-3_TASK_LOG.md` - 任務日誌
- `docs/domain/P0-3_SNAPSHOT_EXTRACT.md` - 快照提取
- `docs/domain/snapshots/P0-3_SNAPSHOT_INDEX.md` - 快照索引
- `docs/ops/TASK_RECORDS_SUMMARY.md` - 任務摘要（MIN 快照用）
- `docs/ops/TASK_RECORDS_INDEX.md` - 任務索引

### R1 (Metrics) 文件
- `docs/domain/advisory/R1/P0-3_METRICS.md`
- `docs/domain/metrics/P0-3_NARRATIVE_METRICS_IMPLEMENTATION.md`

### R2 (Narrative) 文件
- `docs/domain/advisory/R2/P0-3_NARRATIVE_TUNING.md`
- `docs/domain/advisory/R2/P0-3_ABSOLUTE_VERDICT_PROTOCOL.md`
- `docs/domain/advisory/R2/P0-3_SECONDARY_METAPHOR_RULES.md`
- `docs/domain/output/P0-3_NARRATIVE_SHARPNESS.md`

### R4 (Safety) 文件
- `docs/domain/advisory/R4/P0-3_SAFETY_PROTOCOL.md`
- `docs/domain/advisory/R4/P0-3_NARRATIVE_CONTROL_PROTOCOL.md`
- `docs/domain/advisory/R4/P0-3_NARRATIVE_BLACKLIST_SSOT.json`
- `docs/domain/advisory/R4/P0-3_INTENSITY_COOLING_LEXICON.md`

### CI 與測試
- `docs/domain/ci/P0-3_GOLDEN_TESTS_SPEC.md`
- `docs/domain/ci/P0-3_GOLDEN_TESTS.json`
- `docs/domain/ci/P0-3_CI_GATE_RULES.md`

### 治理擴展
- `docs/domain/advisory/P0-3_GOVERNANCE_EXTENSIONS.md`

---

## 💡 給 GPT 的使用說明

### 如何閱讀此文件
1. **快速了解當前狀態**：查看「快速概覽」和「待補齊項目」
2. **了解詳細要求**：查看「追問清單」和「驗收點」
3. **查找具體規範**：查看「已採納的交付物」和「完整文件列表」

### 需要 GPT 協助的事項
1. **補齊三個阻斷點**：
   - 次隱喻白名單（Q1）
   - 禁用詞機器化（Q2）
   - 高風險 L4 安全出口模板（Q3）

2. **驗證已採納的交付物**：
   - 檢查 R1/R2/R4 規範是否符合要求
   - 確認跨角色一致性

3. **準備封版**：
   - 確認所有驗收點
   - 執行 CI Golden Tests
   - 完成封版檢查清單

---

## 📌 重要提醒

### 對外語感規範（必須遵守）
- ✅ 所有對使用者可見的語詞：一律走「東方命理/玄學/五行/氣機/歲時」語感
- ❌ 禁用任何現代心理/商業/醫療/投資/管理術語

### 銳利度的合法邊界
- ✅ 可以「斷狀態」：斷氣象、斷格局、斷暗流、給姿態
- ❌ 不可「斷事實/斷事件」：不可推斷具體事件
- ❌ 不可「下具體指令」：不可要求使用者做出可操作的現實決策

### 收尾條件
- 待補齊項目全部完成後，方可封板
- 所有驗收點必須通過
- CI Golden Tests 必須全部通過

---

**最後更新時間**：2026-01-09  
**維護者**：Cursor（總工程師）  
**如需更新**：請更新此文件並同步更新 `docs/ops/TASK_RECORDS_SUMMARY.md`



