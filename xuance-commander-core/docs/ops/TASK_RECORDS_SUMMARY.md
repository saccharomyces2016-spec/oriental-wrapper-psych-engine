# TASK_RECORDS_SUMMARY（任務記錄摘要｜總指揮與副指揮官參考用）

## 目的
這是給總指揮（Cursor）和副指揮官（GPT）參考的任務記錄摘要，只包含當前進行中的任務和最近完成的任務的關鍵信息。

**注意**：自 2026-01-09 起，不再使用 MIN 快照。總指揮直接產出任務包給副指揮官，副指揮官參考 `DEPUTY_COMMANDER_SNAPSHOT.md`。

## 當前進行中的任務

### P0-4.5 題目流程與分流系統設計（已完成）
- **狀態**：✅ **COMPLETED**（設計規格已完成，EDITABLE 狀態，保留後續調整權）
- **任務性質**：設計決策任務（架構決策，影響後續所有開發）
- **目標（Goal）**：設計一個能夠「涵蓋全人類、全年齡、全困擾、全困境」的多階段分流選擇系統，確定題型設計策略，為未來的八卦盤界面設計奠定基礎
- **完成日期**：2026-01-10
- **核心設計**：4-Stage Holographic Funnel System（四階段全像漏斗系統）
  - **Stage 1**：八卦定方位（The Domain Gate）- 單選，八卦轉輪/八門卡片
  - **Stage 2**：六親定物象（The Context Lock）- 多選 2-3 項，符號雲/物象群
  - **Stage 3**：萬象定歸因（The Attribution Matrix）- 投射式選擇，萬象羅盤/星盤
  - **Stage 4**：命盤綜合與斷語（Synthesis & Routing）- 生成綜合斷語並路由到 Facet
- **關鍵成果**：
  - ✅ 設計出能夠「涵蓋全人類」的分流系統（有「中宮/混沌」作為兜底入口）
  - ✅ 確定不同階段應該使用的題型（單選、多選、投射式選擇）
  - ✅ 規劃八卦盤界面整合方案（Stage 1 明確使用八卦轉輪）
  - ✅ 設計路由規則（精確路由 + 模糊路由）
  - ✅ 確保最終收斂至單一 Facet（符合商業模型要求）
- **核心文件**：
  - `P0-4.5/P0-4.5_CHARTER.md`（任務憲章）
  - `P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md`（分流系統設計規格，EDITABLE 狀態，可根據需求調整）
  - `P0-4.5/P0-4.5_PHASE_LOG.md`（階段日誌）
  - `docs/gem/briefs/TASK_PACKAGE_P0-4.5_QUESTION_FLOW_FUNNEL_SYSTEM.md`（任務包）
- **下一步**：先完成 P0-5 UI 串接實作，P0-4.5 的分流系統可在 P0-5 之後作為 Layer 2 的擴充

### P0-5 Minimal UI Integration（進行中）
- **狀態**：IN_PROGRESS（設計方案已批准，等待顧問師產出）
- **任務性質**：技術實作任務（世界級 UI 串接）
- **目標（Goal）**：建立世界級水準的 UI 串接，能夠收集使用者資訊、展示五行命理世界觀、讀取 compiled facet，並以豐富的動畫和視覺化方式呈現敘事、建議與風險鏈，驗證端到端流程可運作
- **設計方案**：已批准（UI = 敘事管線 + 儀式引導器，Layer 0-6 分層架構）
- **顧問師任務包**：
  - R2：`docs/gem/briefs/BRIEF_P0-5_UI_narrative_R2.md`（UI 敘事語言層）
  - R5：`docs/gem/briefs/BRIEF_P0-5_UI_bilingual_R5.md`（雙語敘事一致性）
- **核心文件**：
  - `P0-5/P0-5_CHARTER.md`
  - `P0-5/P0-5_UI_INTEGRATION_SPEC.md`
  - `P0-5/P0-5_UI_ARCHITECTURE.md`
  - `docs/domain/design/P0-5_UI_DESIGN_REQUIREMENTS.md`

### P0-4 Facet Portability & Stress Test（已完成）
- **狀態**：✅ **READY_TO_FREEZE**（所有阻斷點已完成，可封版）
- **Facet**：`relationship_imbalance`
- **任務性質**：結構驗證任務（非內容創作）
- **目標（Goal）**：驗證 P0-3 建立的「L1–L4 敘事結構 × 安全邊界 × 機器化治理規則」，是否能在第二個 Facet（`relationship_imbalance`）上**零改動搬移且不崩壞**
- **批准任務包**：`docs/gem/briefs/TASK_PACKAGE_P0-4_FACET_PORTABILITY_APPROVED.md`（Deputy Commander 優化版，總指揮批准）
- **Non-goals（硬性禁止）**：
  - ❌ No UI / visual form decisions
  - ❌ No scoring formula / weights
  - ❌ No product polish
  - ❌ No cross-facet generalization beyond this single pilot
- **交付物（Deliverables）**：
  1. P0-4_FACET_BRIEF.md（Facet 定義、邊界、禁區、允許語感）
  2. P0-4_PORTABILITY_PLAN.md（搬移策略：零改動規則、最小替換項）
  3. P0-4_GOLDEN_TESTS_SPEC.md（至少 5 條測試：模糊/高壓/誘導/高風險/正常）
  4. P0-4_FAILURE_AUDIT_RULES.md（失敗審計：判讀與分類）
  5. P0-4_PHASE_LOG.md（階段日誌：每次變更必記錄）
- **成功標準（Success Criteria）**：
  - ✅ P0-3 的結構（L1–L4 + Safety + 禁用詞）可被複用
  - ✅ relationship_imbalance 的對外輸出無現代污染詞
  - ✅ 高風險出口模板可觸發且可收束（不恐嚇、不宿命、不下具體決策指令）
  - ✅ Golden Tests 可機器跑（grep/regex gate + 人工審核點）
- **Facet 定義（What it is）**：描述「關係互動長期失衡」的狀態感：付出/索取失衡、邊界失衡、冷熱失衡、責任失衡（僅斷氣象與格局，不斷事件）
- **硬性禁止（What it is NOT）**：
  - ❌ 不推斷具體事件（對方是否外遇/是否故意傷害/是否一定會分開）
  - ❌ 不下現實決策指令（分手/離婚/搬家/提告/就醫/投資）
  - ❌ 不使用現代心理/醫療/法律/管理術語（由禁用詞表管控）
- **輸出風格（Output style）**：
  - ✅ 對外：只用玄學/歲時/自然/五行語感（後續由 R2/R4 補足此 facet 的主隱喻）
  - ✅ 結構：沿用 P0-3 的 L1–L4 cadence + L4 高風險出口模板機制
- **待補齊項目（Open items）**：
  - ✅ **本任務只做**：
    - 主隱喻（1 個）與次隱喻白名單（可機器檢查）- **R2 負責**
    - relationship_imbalance 專用禁用詞擴充（可 grep）- **R4 負責**
    - 高風險 L4 固定模板（1–2 條）- **R4 負責**
  - ❌ **本任務不做**（硬性排除）：
    - 不做題目設計（R1）- 已完成（P0-2）
    - 不做行動建議（R3）- 本階段禁止（P0-3 明確排除）
    - 不做語感 polish / 雙語校對（R5）- 本階段禁止（P0-3 明確排除）
    - 不改 L1–L4 cadence、不改 Safety Gates、不下任何現實決策指令
- **完成摘要**：
  - ✅ **R2**：主隱喻「月相潮汐・盈虛觀」+ 次隱喻白名單 + 機器化檢查規則（已完成）
  - ✅ **R4**：禁用詞擴充（針對關係失衡）+ L4 高風險出口模板 A/B（已完成）
  - ✅ **驗證結果**：P0-3 結構可被複用，零改動搬移成功，無現代污染詞，高風險模板可收束
- **核心文件**：
  - `xuance-commander-core/P0-4/P0-4_CHARTER.md`
  - `xuance-commander-core/P0-4/P0-4_FACET_BRIEF.md`
  - `xuance-commander-core/P0-4/P0-4_PORTABILITY_PLAN.md`

### P0-3 Narrative Sharpness / Esoteric Precision
- **狀態**：✅ **READY_FOR_FREEZE**（所有阻斷點已完成，可封版）
- **目標**：為 `income_expansion_pressure（歲時農耕・倉廩觀）` 建立可填槽的敘事骨架與詞彙對照，讓輸出「咬合入骨」但不越界
- **主要成果**：
  - ✅ R1：敘事銳利度指標 M1–M4 + Critical Fail 規則
  - ✅ R2：L1–L4 敘事骨架 + 插槽規格 + Lexicon v1
  - ✅ R4：安全稽核清單 + 自動轉譯護欄（Rewrite Guards）

#### 下一步主目標（Blockers = 必做，做完才能封板）

**B1｜次隱喻白名單 + 機器化檢查規則（阻斷）**
- **狀態**：✅ **DONE**（R2 裁決已完成，規則已寫入文本）
- **Brief 文件**：`docs/gem/briefs/BRIEF_P0-3_B1_secondary_metaphor_whitelist_R2.md`
- **輸出物**（已落盤）：
  1. ✅ `docs/domain/advisory/R2/P0-3_SECONDARY_METAPHOR_WHITELIST.md`（新建）
     - 次隱喻裁決表（航海❌、導航⚠️、蜃樓✅、築屋✅、山路✅）
     - 使用規則：每段最多 1 個；禁止角色場景替換；禁用詞 Regex
     - 允許詞表（導引類、幻象類、修繕類、地形類）
     - 治理定位說明（Facet 限定，不構成全域禁用）
  2. ✅ `docs/domain/advisory/R2/P0-3_SECONDARY_METAPHOR_RULES.md`（已更新）
     - 補齊治理定位說明
     - 引用詳細規則文件
- **驗收點**：
  - ✅ 明確結論：哪些次隱喻允許/禁止（裁決表已寫入）
  - ✅ 有「每段最多幾個」與「禁止句型」的硬規則（每段最多 1 個，禁用詞 Regex）
  - ✅ Golden tests/CI gate 可用固定規則驗證（Regex 規格已提供）
- **審核結論**：R2 的裁決與規則完全符合 P0-3 的主隱喻一致性、可擴充性與機器可檢查性要求，沒有收斂過度，也沒有為未來其他 Facet 封死空間。

**B2｜禁用詞機器化（中英 + 同義變體）+ 對外轉譯規則（阻斷）**
- **狀態**：✅ **DONE**（R4 交付已完成，規則已寫入文本）
- **Brief 文件**：`docs/gem/briefs/BRIEF_P0-3_B2_banned_terms_machine_R4.md`
- **輸出物**（已落盤）：
  1. ✅ `docs/domain/advisory/R4/P0-3_NARRATIVE_BLACKLIST_SSOT.json`（已更新 v2.0）
     - 擴充：中英禁用詞（心理/醫療、金融/管理、具體人生指令、宿命/恐嚇）
     - 規則：命中任一詞彙 → 直接 FAIL，不可轉譯補救
  2. ✅ `docs/domain/advisory/R4/P0-3_BANNED_TERMS_LIST.md`（新建）
     - 人類可讀版本：中文禁用 / 英文禁用 / 檢查規則
     - Regex 規格已提供
  3. ✅ `docs/domain/output/P0-3_FIELD_TRANSLATION_RULES.md`（新建）
     - 內部概念轉譯表：severity → 氣節/天候/田況；coping → 耕法/農事/作息；attribution → 緣由/根源；risk chain → 流年/走勢
     - 硬規則：內部欄位名不得直接出現在對外輸出
- **驗收點**：
  - ✅ grep/測試能擋下所有現代詞（心理/醫療/投資/管理術語）
  - ✅ 對外輸出：0 現代污染
  - ✅ 欄位名不外洩（severity/risk chain 等不出現在 user-facing text）
- **審核結論**：APPROVED（已審核通過，品質達 P0-3 封版等級）

**B3｜高風險 L4 安全出口模板固定（阻斷）**
- **狀態**：✅ **DONE**（R4 交付已完成，模板已寫入文本）
- **Brief 文件**：`docs/gem/briefs/BRIEF_P0-3_B3_L4_high_risk_exit_templates_R4.md`
- **輸出物**（已落盤）：
  1. ✅ `docs/domain/advisory/R4/P0-3_L4_HIGH_RISK_EXIT_TEMPLATES.md`（新建）
     - 模板 A：過熱/強耕/過度消耗場景（「此時田土焦熱，地力已現疲態...」）
     - 模板 B：枯竭/絕望/資源見底場景（「嚴冬封地，萬物蟄伏...」）
     - 硬規則：不恐嚇、不宿命、不下決策指令（辭職/就醫/分手/投資）
     - 保持能動性：給出「宜/忌」姿態，而非絕望宣判
  2. ✅ 模板已納入 R4 Safety Protocol（通過文件引用）
- **驗收點**：
  - ✅ 高風險觸發時，L4 只能使用固定模板（允許少量變數插槽）
  - ✅ 模板語氣：守中養根/避風保本/整地蓄勢（可行動姿態，但非現實決策指令）
- **審核結論**：APPROVED（已審核通過，品質達 P0-3 封版等級）

#### 非阻斷優化（Deferred/Optional，不影響封板）
- **O1**：高強度意象降溫詞表細化（R4 lexicon 擴充）- **NOT BLOCKING / DEFERRED**
- **O2**：產品語氣統一（「建議你」→「宜/可/不宜」規範）- **NOT BLOCKING / DEFERRED**
- **O3**：次隱喻檢查從人工 → 自動化（可後續）- **NOT BLOCKING / DEFERRED**

- **是否可以收尾**：✅ **是**（所有阻斷點已完成並通過驗收）
  - **收尾狀態**：✅ **READY_TO_FREEZE**（已達封版條件）
  - **封版文件**：
    - ✅ `P0-3/P0-3_FREEZE_READINESS.md`（封版準備狀態）
    - ✅ `P0-3/P0-3_FINAL_CHECKLIST.md`（最終檢查清單，ALL PASS）
    - ✅ `P0-3/P0-3_HANDOFF_SUMMARY.md`（交棒摘要）
  - **後修規則**：可接受錯誤修正，不接受大幅改動或新增內容型規格
- **詳細記錄路徑**：
  - 決策包：`P0-3/DECISION_PACKET_P0-3.md`
  - 任務日誌：`docs/domain/advisory/P0-3_TASK_LOG.md`
  - 快照索引：`docs/domain/snapshots/P0-3_SNAPSHOT_INDEX.md`
  - 快照提取：`docs/domain/P0-3_SNAPSHOT_EXTRACT.md`

---

## 最近完成的任務

### P0-2 Output Contract
- **狀態**：COMPLETED
- **完成日期**：2026-01-07
- **關鍵成果**：引擎只判斷「狀態」，不判斷「人生」；已完成禁止清單、允許層級、責任邊界

### P0-2 Question Design
- **狀態**：COMPLETED
- **完成日期**：2026-01-07
- **關鍵成果**：5-question symbol-first assessment with integer scoring & gates

---

## 查看完整記錄
- **任務記錄索引**：`docs/ops/TASK_RECORDS_INDEX.md`
- **主線進度**：`roadmap/ROADMAP.md`


## P0-4 (OPEN)
- Facet: relationship_imbalance
- Goal: P0-3 portability + stress test (skeleton-first; editable)
- Core file: xuance-commander-core/P0-4/P0-4_CHARTER.md
