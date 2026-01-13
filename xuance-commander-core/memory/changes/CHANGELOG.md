# CHANGELOG

## 2026-01-13

### ENGINE_CORE_OMNISCIENT_CONSTITUTION_V4 審核（GPT V4 處理後版本）

**狀態**：✅ 高度合格，已解決大部分追問問題，但存在關鍵不一致點需要裁示  
**審核日期**：2026-01-13

**審核結果**：
- ✅ 合格部分（可直接整合）：八大領域覆蓋方案、題目設計聖典（已解決追問 1）、V3 運算引擎核心（已解決追問 2）、跨域擴散引擎（已解決追問 3，已提供完整實作）、使用者背景資料策略（已解決追問 4）、向後相容與遷移（已解決追問 5）、Domain Element 儲存結構（已解決追問 1.1，已提供完整實作）、Schema 更新（已更新 domainKey/questionSet/scoringModel）、V3 引擎實作（已提供完整實作和測試）、新 Facet 範例（已提供 burnout_syndrome 和 deep_depression）、i18n 範例（已提供中英文題目範例）、Volatility 標準差模式（已明確為 sample stddev，寫入 CONSTITUTION）
- ⚠️ 需要裁示的關鍵不一致點：缺失 Priors 的 Rigidity 預設值不一致（CONSTITUTION Section 7.2：0.50，DIRECTIVE REV.B Section 1.2：0.0，engine/score_facet.py：0.5，GPT V4 的說法與 DIRECTIVE REV.B 的實際內容不一致）
- ⚠️ 需要補強：Domain Schema 定義（需要建立 domain.schema.json）、ADR_0005 標準差模式更新（需要確認是否已更新）、世界級增強建議的實作細節（需要更詳細的規格）

**關鍵交付物**：
- ✅ `docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_V4_AUDIT.md` - 審核報告
- ✅ `docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_CONSTITUTION_V4_QUESTIONS.md` - 追問包（4 個關鍵問題）
- ✅ `tmp/ENGINE_CORE_OMNISCIENT_CONSTITUTION_V4_PACKAGE_*.zip` - 打包檔案（待建立）
- ✅ **V4 實作已整合**：`engine/score_facet.py`、`engine/cascade_calculator.py`、`engine/narrative_guard.py`、`tests/test_v3_scoring.py`、`schemas/domain_manifest.schema.json`、`schemas/compiled_facet.schema.json`、`domain/domains/bagua.domain_map.v1.0.json`、`domain/cascade/cascade_overrides.v1.0.json`、`docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_FINAL_V4.md`

**關鍵追問問題**（4 個）：
1. ⭐⭐⭐ 缺失 Priors 的 Rigidity 預設值（應該是 0 還是 0.50？GPT V4 的說法與 DIRECTIVE REV.B 的實際內容不一致）
2. ⭐⭐ Domain Schema 定義（是否需要建立完整的 Domain Schema？）
3. ⭐⭐ ADR_0005 標準差模式更新（是否需要更新 ADR_0005？）
4. ⭐⭐ 世界級增強建議的實作細節（是否需要建立詳細的實作規格？）

**相關文件更新**：
- `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` - 已更新（V3 實作狀態）
- `specs/integration/ui_engine/FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md` - 已更新實作狀態
- `docs/ops/TASK_RECORDS_SUMMARY.md` - 更新任務記錄
- `docs/ops/TASK_STATUS.md` - 更新任務狀態

---

## 2026-01-12

### ENGINE_CORE_OMNISCIENT_CONSTITUTION_V3 審核（GPT V3 處理後版本）

**狀態**：✅ 高度合格，已解決大部分追問問題，部分需要微調和確認  
**審核日期**：2026-01-12

**審核結果**：
- ✅ 合格部分（可直接整合）：八大領域覆蓋方案、題目設計聖典（已解決追問 1）、V3 運算引擎核心（已解決追問 2）、跨域擴散引擎（已解決追問 3，已提供完整實作）、使用者背景資料策略（已解決追問 4）、向後相容與遷移（已解決追問 5）、Domain Element 儲存結構（已解決追問 1.1，已提供完整實作）、Schema 更新（已更新 domainKey/questionSet/scoringModel）、V3 引擎實作（已提供完整實作和測試）、新 Facet 範例（已提供 burnout_syndrome 和 deep_depression）、i18n 範例（已提供中英文題目範例）
- ⚠️ 需要微調和確認：缺失 Priors 的 Rigidity 預設值不一致（Section 7.2 說 0.50，但 DIRECTIVE REV.B 說 0.0）、Domain Schema 定義（需要建立 domain.schema.json）、世界級增強建議的實作細節（需要更詳細的規格）

**關鍵交付物**：
- ✅ `docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_V3_AUDIT.md` - 審核報告
- ✅ `docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_CONSTITUTION_V3_QUESTIONS.md` - 追問包（3 個關鍵問題）
- ✅ `tmp/ENGINE_CORE_OMNISCIENT_CONSTITUTION_V3_PACKAGE_*.zip` - 打包檔案（83KB，24 個文件）
- ✅ **V3 實作已整合**：`engine/score_facet.py`（完整 V3 實作）、`engine/cascade_calculator.py`、`engine/narrative_guard.py`、`tests/test_v3_scoring.py`、`domain/cascade/cascade_overrides.v1.0.json`

**關鍵追問問題**（3 個）：
1. ⭐⭐⭐ 缺失 Priors 的 Rigidity 預設值（應該是 0 還是 0.50？）
2. ⭐⭐ Domain Schema 定義（是否需要建立完整的 Domain Schema？）
3. ⭐⭐ 世界級增強建議的實作細節（是否需要建立詳細的實作規格？）

**相關文件更新**：
- `specs/engine/core/ENGINE_CORE_LOGIC_MASTER_V3.md` - 已更新 Section 3.2、3.7、4.2
- `specs/integration/ui_engine/FRONTEND_BACKEND_CALCULATION_ALIGNMENT.md` - 已更新實作狀態
- `docs/ops/TASK_RECORDS_SUMMARY.md` - 更新任務記錄
- `docs/ops/TASK_STATUS.md` - 更新任務狀態

---

### ENGINE_CORE_OMNISCIENT_CONSTITUTION 審核（V2）

**狀態**：✅ 高度合格，部分需要微調和補強  
**審核日期**：2026-01-12

**審核結果**：
- ✅ 合格部分（可直接整合）：八大領域覆蓋方案、題目設計聖典（已解決追問 1）、V3 運算引擎核心（已解決追問 2）、跨域擴散引擎（已解決追問 3）、使用者背景資料策略（已解決追問 4）、向後相容與遷移（已解決追問 5）、P0-4.5 Funnel 整合、UI/Engine 契約、風險鏈結構、驗收標準
- ⚠️ 需要微調和補強：Domain element 儲存結構、缺失 Priors 的 Rigidity 預設值、10 題擴展模板的 Schema 擴充、標準差模式的 ADR 更新、世界級水準增強建議

**關鍵交付物**：
- ✅ `docs/ops/analysis/ENGINE_CORE_OMNISCIENT_CONSTITUTION_AUDIT.md` - 審核報告
- ✅ `docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_CONSTITUTION_QUESTIONS.md` - 追問包（5 個關鍵問題 + 世界級水準增強建議）
- ✅ `tmp/ENGINE_CORE_OMNISCIENT_CONSTITUTION_PACKAGE_20260112_220831.zip` - 打包檔案（78KB，21 個文件）

**關鍵追問問題**（5 個）：
1. ⭐⭐⭐ Domain Element 儲存結構（是否需要建立新的 domain 配置文件？）
2. ⭐⭐ 缺失 Priors 的 Rigidity 預設值（應該是 0 還是 0.50？）
3. ⭐⭐ 10 題擴展模板的 Schema 擴充（是否需要更新 schema？）
4. ⭐ 標準差模式的 ADR 更新（是否需要更新 ADR_0005？）
5. ⭐⭐ 世界級水準增強建議（多語言本地化、文化適應性、可訪問性、效能與擴展性、數據隱私與合規）

**相關文件更新**：
- `docs/ops/TASK_RECORDS_SUMMARY.md` - 更新任務記錄

---

### ENGINE_CORE_OMNISCIENT_MATRIX 審核

**狀態**：⚠️ 部分合格，需要追問  
**審核日期**：2026-01-12

**審核結果**：
- ✅ 合格部分：八大領域覆蓋方案、P0-4.5 分流系統整合、UI/Engine 契約
- ⚠️ 需要追問：題目數量規範、V3 引擎計算公式完整性、跨域擴散引擎實作細節、使用者背景資料策略整合、向後相容性

**關鍵交付物**：
- ✅ `docs/ops/analysis/ENGINE_CORE_OMNISCIENT_MATRIX_AUDIT.md` - 審核報告
- ✅ `docs/task_packets/advisor/ENGINE_CORE_OMNISCIENT_MATRIX_QUESTIONS.md` - 追問包（5 個關鍵問題）
- ✅ `tmp/ENGINE_CORE_OMNISCIENT_MATRIX_PACKAGE_20260112_214233.zip` - 打包檔案（20 個文件）

**關鍵追問問題**（5 個）：
1. ⭐⭐⭐ 題目數量規範（是否強制 8 題？）
2. ⭐⭐⭐ V3 引擎計算公式完整性（Rigidity、Volatility、Debug Payload）
3. ⭐⭐ 跨域擴散引擎實作細節
4. ⭐⭐ 使用者背景資料策略整合
5. ⭐ 向後相容性

**相關文件更新**：
- `docs/ops/TASK_RECORDS_SUMMARY.md` - 更新任務記錄

---

### 新增任務：ENGINE_CORE_FINAL_INTEGRATION_EXECUTION（底層引擎最終整合執行）

**狀態**：🔄 進行中（準備階段）  
**開始日期**：2026-01-12

**任務描述**：
- 基於最終整合任務包，與顧問團隊進行最終整合討論
- 執行 7 個主要任務，達成「全人類、全年齡、全困擾、全解決策略、全連鎖反應」的終極目標

**關鍵交付物**：
- ✅ `docs/task_packets/advisor/ENGINE_CORE_FINAL_INTEGRATION_TASK_PACKET.md` - 最終整合任務包
- ✅ `docs/ops/analysis/ENGINE_CORE_COMPREHENSIVE_INTEGRATION_ANALYSIS.md` - 整合分析報告
- ✅ `tmp/ENGINE_CORE_FINAL_INTEGRATION_PACKAGE_20260112_212851.zip` - ZIP 打包檔案（106KB）

**核心問題**（8 個，最高優先級 3 個）：
1. ⭐⭐⭐ 八大領域覆蓋度評估與題庫設計
2. ⭐⭐⭐ 解決方案與連鎖反應資料庫完整性
3. ⭐⭐⭐ UI 互動設計的四個回合明確化
4. 題庫豐富度與分類
5. 計算模型實作
6. 分流系統整合
7. UI 整合策略
8. 使用者背景資料收集

**7 個主要任務**：
1. 底層引擎內容整合（PRIORITY: HIGH）
2. V3 引擎實作（PRIORITY: HIGH）
3. 題庫擴充與分類（PRIORITY: HIGH）
4. P0-4.5 分流系統整合（PRIORITY: MEDIUM）
5. UI 整合（PRIORITY: MEDIUM）
6. 使用者背景資料收集系統（PRIORITY: MEDIUM）
7. 八大領域覆蓋（PRIORITY: HIGH）

**相關文件更新**：
- `docs/ops/TASK_RECORDS_SUMMARY.md` - 新增任務記錄
- `docs/ops/TASK_STATUS.md` - 更新任務狀態
- `memory/briefs/CURRENT.md` - 更新當前狀態

---

## Unreleased
- Changed: Sync governance now explicitly integrates Role Sync Packets for advisor inputs (avoid missing-text assumptions)
- Added: Advisor return-pack minimal spec (Used Packet/Output/Assumptions/Acceptance) to ROLE_SYNC_PACKET_PROTOCOL
- Added: Tiered Sync spec (MIN/FULL/VERIFICATION_PACK) + Smart Sync definition -> docs/ops/COMMANDER_AUTOPILOT_PROTOCOL.md
- Changed: TASK_LIFECYCLE Sync step now prefers AUTO + requires VERIFICATION_PACK when correctness must be proven -> docs/process/TASK_LIFECYCLE.md
- Added: CURRENT records workflow upgrade to Smart Sync Tiered Workflow (construction method upgraded)
- Added: Governance lessons learned from prior failures (version drift + rules deadlock) -> docs/governance/LESSONS_LEARNED.md
- Added: GEM briefing from failures/constraints -> docs/gem/briefs/BRIEF_lessons_and_constraints.zh.md
- Changed: CURRENT now points to lessons + advisory constraints to avoid repeating failure modes

- Added: USER_OVERRIDE_PROTOCOL (fatigue-safe final override + rollback-by-checkpoint)
- Added: ADR_0005 (Proposed) user override + fatigue rollback protocol
- Changed: ROADMAP P0-1 marked done; selected first facet income_expansion_pressure with seed Q1
- Changed: CURRENT updated to reflect mainline transition to P0-2 for income_expansion_pressure
- Added: Sync system stabilized + milestone sealed (ts=2026-01-05T11:01:02+0800, branch=main, head=54982618a5f6dc8fa2dbc432845adc0d29199346) <!-- XUANCE_CHANGELOG_SYNC_STABLE -->
- Added: GitHub cloud sync verified (local HEAD can be matched to origin/main); documented the safety caveat that only committed+pushed changes are protected
- Added: Legacy zsh hook `_xc_precmd` auto-cleanup in tools/sync_mode_hooks.sh to stop prompt errors and keep Absolute Auto-Log stable
- Added: Milestone checkpoint workflow (xc_checkpoint.sh) required in Task Lifecycle/Autopilot with MASTER rebuild + CURRENT/CHANGELOG evidence


- Added: Realtime MASTER sync marked as achieved (LAST_COMMAND_STATUS as evidence + hook/tool-triggered MASTER rebuild + verifiable checks documented in CURRENT)
- Added: REPO_STATUS auto snapshot (git status/remote/last commit) -> `memory/briefs/REPO_STATUS.md`, included in MASTER for deterministic repo alignment
- Changed: Commander may proactively propose best-path workflow (Cursor diagnosis -> Codex one-shot fix) under controlled limits (see ROLE_XUANCE_COMMANDER R6; COMMANDER_AUTOPILOT_PROTOCOL Cursor/Codex section)

- Changed: ADR_0003 + ADR_0004 status -> Accepted (approvedAt: 2026-01-04)
- Added: ADR_0004 AI advisory roles system + GEM protocol
- Added: docs/governance/AI_ADVISORY_ROLES.md (roles + responsibilities)
- Added: docs/gem/ (profiles + run archive) and prompts/gem/ (GEM templates)
- Added: AI_PARTNERSHIP_PROTOCOL to upgrade AI role to accountable professional partner with mandatory proactive checks and hard-stop authority
- Added: BOOT_RULE (single mandatory task entry gate)
- Added: AUTONOMOUS_STOP_PROTOCOL (hard stop on missing text)
- Added: ADR_0003 world-class quality + bilingual (CN/EN) global-market readiness
- Changed: prototype now loads compiled facet (no hardcoded scoring ranges) + npm dev ready styling
- Added: PREWRITE_STATE_CONFIRMATION governance rule (stop + confirm state before any write)
- Added: extensible MVP skeleton (domain externalization, schema versioning, golden tests, build compiler)
- Changed: memory/index/INDEX.md de-duplicated ADR headings
- Added: MASTER_SYNC_PACKET as single-file synchronization anchor
- Added: MASTER Sync Protocol for real-time alignment and long-term memory
- Changed: Workflow now supports deterministic AI state recovery via MASTER
- Added: MASTER_SYNC_PACKET single-file snapshot for deterministic AI alignment (read-only; SSOT remains original files)
- Added: MASTER sync workflow to prevent context drift and enable state recovery per chat

- Added: Absolute Auto-Log sync mode enabled
  - Shell hook active (bash/zsh)
  - LAST_COMMAND_STATUS auto-written per command
  - Sync verified via live command execution


- Added: milestone checkpoint pushed (ts=2026-01-05T09:56:10, msg="MILESTONE: Checkpoint script TS bug fixed", branch=main, head=f22bddf54e52048e19aff1a71dbfae9a6bd7b901, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T10:12:13+0800, msg=MILESTONE: checkpoint TS/locale fix probe, branch=main, head=a3b273ba9e61344807874219225361310ee7596e, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T10:21:27+0800, msg=MILESTONE: cleanup mojibake evidence (CURRENT/CHANGELOG) verified, branch=main, head=b2fd185984ea15b73d1e8a01515d918080f5a48a, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T10:25:38+0800, msg=MILESTONE: sync system stable (evidence clean), branch=main, head=54982618a5f6dc8fa2dbc432845adc0d29199346, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T11:01:02+0800, msg=MILESTONE: sync system stable (sealed in text), branch=main, head=6d85ad419578cbdc9d3e9f803c2e80a1b9ef1f31, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T11:24:20+0800, msg=MILESTONE: GEM advisory roles (R1/R4) defined and sealed, branch=main, head=ac3e4abeccd963336f00f2a1da362a92ba49a7c2, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T11:34:01+0800, msg=MILESTONE: GEM roles sealed + evidence clean + LAST_COMMAND_STATUS verified, branch=main, head=6c6ab9211620f97e6f2e6753755c3e20c9db14ad, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T12:26:26+0800, msg=MILESTONE: sync hook stable (command capture verified) + evidence updated, branch=main, head=7ec63de4f11b3128ac8da5178205fe2e1acc4d63, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T12:30:09+0800, msg=MILESTONE: sync hook stable - evidence sealed, branch=main, head=49a7a95a543720fb995539a080b915ea17779d5a, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T12:35:48+0800, msg=MILESTONE: sync hook stable - evidence sealed (final), branch=main, head=6ec5eb7f1fef27450b1acc3614068d548ce7786c, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T13:10:23+0800, msg=MILESTONE: research layer added + life_cycle_0_100 note imported, branch=main, head=b6ae24c168e4b12954697885c72d35480254cd1e, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: Checkpoint workflow (`tools/xc_checkpoint.sh`) for milestone sealing (commit+push+evidence+MASTER rebuild)
- Added: Robust zsh command capture for LAST_COMMAND_STATUS (preexec+precmd hooks) to prevent `(unknown)` command evidence
- Added: Internal research layer (`docs/research/`) with explicit non-exposure rule (research text must not be pasted into user-visible domain outputs)
- Added: GEM briefing staging area (`docs/gem/briefs/`) to convert research signals into advisor-ready inputs

- Added: milestone checkpoint pushed (ts=2026-01-05T13:22:56+0800, msg=MILESTONE: sync system + GEM roles + research layer (evidence cleaned & readable), branch=main, head=dd90747261b1cccc0058ba226242394f8dd2adcc, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T13:27:50+0800, msg=MILESTONE: evidence drift sealed (post-readable-cleanup), branch=main, head=be6ef3e1f1e8ebc5fb7f00d133d524bb27c36995, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T14:02:11+0800, msg=MILESTONE: research reference modes sealed (Research->Brief->Advisor->Domain gate), branch=main, head=a64e7c0696a05226397e6544800253abb6ea9be8, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: Foundation & governance sealed (sync system, checkpoint workflow, AI advisory roles, research layer, research gate)
- Changed: Project state now ready to enter ROADMAP Phase 0 (MVP single facet)

- Added: milestone checkpoint pushed (ts=2026-01-05T15:05:28+0800, msg=MILESTONE: P0-1 facet selected (income_expansion_pressure) + user override protocol added, branch=main, head=4bc4347cc615b35fcbf1720bcd215a72a23a7f0c, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T15:15:31+0800, msg=MILESTONE: failure cases recorded (version drift + rules deadlock) + advisory constraints brief, branch=main, head=eefb589c79dc4952c1b0fdda8d88010d8dcb9e11, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T16:32:13+0800, msg=MILESTONE: legacy project analyzed (my-first-app) + research signals preserved, branch=main, head=645967b9bdc9f31cbd71a7da6f986f261d3cedba, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T17:21:40+0800, msg=MILESTONE: legacy vault imported (115_1_3_my-first-app_failed) + inventory + brief pointers, branch=main, head=4fed2a38373d1c4f419d661bd886e461713df856, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T17:43:01+0800, msg=MILESTONE: legacy vault routing layer added (ROUTER/CAPABILITY/UI/REUSE/FAIL) + legacy consult rule, branch=main, head=b906b27ecb1882771dbb48b2c245208e04014a0d, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: Mandatory Milestone Recording Rule (all completed phase/temporary goals must be written into text)
- Added: Legacy vault temporary milestone sealed at callable-layer (router/capability/reuse/ui/failure); paragraph-level analysis intentionally deferred

- Added: milestone checkpoint pushed (ts=2026-01-05T18:11:19+0800, msg=MILESTONE: mandatory milestone recording rule added + legacy callable-layer sealed, branch=main, head=31e098added6882a747d435acc543ac42c433540, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: Completion Record Rule (mandatory write-on-complete)
- Added: Governance CODEBOOK (high-density rules)
- Added: MODE_SWITCHES (auto workflow modes)
- Added: Legacy routing layer sealed as completed temporary goal

- Added: milestone checkpoint pushed (ts=2026-01-05T18:16:15+0800, msg=MILESTONE: completion-record rule + codebook + mode switches + legacy routing sealed, branch=main, head=3d59b138c642f23f2cbf2bd11d81229964d35ad5, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: P0-2 kickoff briefs for income_expansion_pressure (R1 blueprint + R4 riskchains), with mandatory legacy/research/lessons references

- Added: milestone checkpoint pushed (ts=2026-01-05T18:20:32+0800, msg=MILESTONE: P0-2 kickoff briefs staged for income_expansion_pressure (R1/R4) with legacy+research+lessons mandatory refs, branch=main, head=8d5ab106241d3df036d5ac00fe0e51deedeb9831, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint (pre-commit) staged (ts=2026-01-05T19:17:04+0800, msg=MILESTONE: checkpoint flow reorder test, branch=main, head_before=89343ec4b15ec29a7ea321b75311d73e9ea479d6, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: milestone checkpoint pushed (ts=2026-01-05T19:17:04+0800, msg=MILESTONE: checkpoint flow reorder test, branch=main, head=5170f146441673c2e0a8830c8daefd0aafaa7675, remote=https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git)

- Added: checkpoint(pre-commit) ts=2026-01-05T19:23:21+0800 msg="MILESTONE: checkpoint flow reorder test 2" branch=main head_before=5170f146441673c2e0a8830c8daefd0aafaa7675 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-05T19:23:44+0800 msg="MILESTONE: checkpoint flow reorder test 2" branch=main head_pushed=4e11f8f0309e1cf4afaa8ac05d8f5e55775ca450 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(pre-commit) ts=2026-01-05T19:24:02+0800 msg="MILESTONE: checkpoint flow reorder test 2" branch=main head_before=ad3249a61ac3f29f446a75371f12b108abd0df71 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-05T19:24:04+0800 msg="MILESTONE: checkpoint flow reorder test 2" branch=main head_pushed=fd8be79ac672af77ae2a71514bd39c3059f1bb60 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: System Capabilities declaration (Analysis Orchestrator; Exploration/Unlock UX) and noted in roadmap/current

- Added: checkpoint(pre-commit) ts=2026-01-06T10:10:51+0800 msg="MILESTONE: system capabilities (AI orchestrator + exploration unlock) declared" branch=main head_before=ca71c4f1aadd484c1f34e993a7e0d7ba77f42b40 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-06T10:10:53+0800 msg="MILESTONE: system capabilities (AI orchestrator + exploration unlock) declared" branch=main head_pushed=3abf24bc98bdb9c7cc1842440ead9c5b962eac8e remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(pre-commit) ts=2026-01-06T10:25:11+0800 msg="MILESTONE: CURRENT aligned to P0-2 (income_expansion_pressure)" branch=main head_before=9c59b93ab20fb6586807c1cfa9278c77a6bc33c5 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-06T10:25:13+0800 msg="MILESTONE: CURRENT aligned to P0-2 (income_expansion_pressure)" branch=main head_pushed=4569052a10dde039b4c4f6a0b155234ee20bb5b4 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(pre-commit) ts=2026-01-06T10:27:24+0800 msg="MILESTONE: P0-2 briefs staged (MASTER PROPOSAL + R1/R4)" branch=main head_before=9a71dffaa7eaf906b49de3e2980279388fc790b8 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(pre-commit) ts=2026-01-06T11:24:37+0800 msg="MILESTONE: P0-2 briefs staged (MASTER PROPOSAL + R1/R4) [seal wording fix]" branch=main head_before=e1b05a5e05657d21e5871f0698f2d198725de743 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-06T11:24:42+0800 msg="MILESTONE: P0-2 briefs staged (MASTER PROPOSAL + R1/R4) [seal wording fix]" branch=main head_pushed=047bc9ba1d5afbd68d0738942afc75c3bca11d19 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: Repair Recording Rule (all fixes/patches must leave textual trace; no silent repairs) -> docs/governance/REPAIR_RECORDING_RULE.md

- Added: checkpoint(pre-commit) ts=2026-01-06T11:35:03+0800 msg="MILESTONE: repair recording rule added (no silent fixes allowed)" branch=main head_before=6ef9ba707d910c0d2afeef0c0991b3e86b29b743 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-06T11:35:09+0800 msg="MILESTONE: repair recording rule added (no silent fixes allowed)" branch=main head_pushed=9742044430fb1d9c16d8be74aa952075f1c2f88d remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: Sync trigger governance doc (MIN/FULL/VERIFICATION_PACK decision table) -> docs/ops/SYNC_TRIGGERS.md
- Added: VERIFICATION_PACK policy (naming + LATEST pointer + cleanup rule) -> docs/ops/VERIFICATION_PACK_POLICY.md
- Changed: Commander role adds Optimization Suggestion Duty (controlled proactive improvements) -> docs/roles/ROLE_XUANCE_COMMANDER.md

- Added: checkpoint(pre-commit) ts=2026-01-06T14:19:24+0800 msg="MILESTONE: sync trigger governance + verification pack policy + commander optimization duty" branch=main head_before=bb94c7a0f465cf822fb09a78b78815b12402b4db remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(pre-commit) ts=2026-01-06T14:20:23+0800 msg="MILESTONE: sync trigger governance + verification pack policy + commander optimization duty" branch=main head_before=bb94c7a0f465cf822fb09a78b78815b12402b4db remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-06T14:20:25+0800 msg="MILESTONE: sync trigger governance + verification pack policy + commander optimization duty" branch=main head_pushed=fdaaa8728e2ac80d1bf2cee9022c39d811398509 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: Role Sync Packet Protocol (one role = one packet; common+role+refs embedded) -> docs/ops/ROLE_SYNC_PACKET_PROTOCOL.md
- Added: Role Sync Packet generator + outputs -> tools/build_role_sync_packets.sh; memory/briefs/role_sync_packets/ROLE_R1_SYNC_PACKET.md; ROLE_R4_SYNC_PACKET.md

- Added: checkpoint(pre-commit) ts=2026-01-06T15:31:17+0800 msg="MILESTONE: role sync packets (single file per role, embeds all refs) enabled" branch=main head_before=c812b52b8954afe5108f8b852c5b2377d8af743e remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(pre-commit) ts=2026-01-06T15:31:24+0800 msg="MILESTONE: role sync packets (single file per role, embeds all refs) enabled" branch=main head_before=c812b52b8954afe5108f8b852c5b2377d8af743e remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-06T15:31:26+0800 msg="MILESTONE: role sync packets (single file per role, embeds all refs) enabled" branch=main head_pushed=0073f2e241f7b8e66a0e40ba2723a52acddc0d81 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: Smart Work Allocation Protocol (GPT vs Cursor vs Codex) -> docs/ops/SMART_WORK_ALLOCATION_PROTOCOL.md
- Changed: Commander role adds Smart Allocation Duty (explicit tool assignment per instruction pack) -> docs/roles/ROLE_XUANCE_COMMANDER.md

- Added: checkpoint(pre-commit) ts=2026-01-06T15:37:08+0800 msg="MILESTONE: smart work allocation mode enabled (GPT/Cursor/Codex explicit roles)" branch=main head_before=bbee5f4a9d6d949f548e77cd8b87106702939f7e remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-06T15:37:09+0800 msg="MILESTONE: smart work allocation mode enabled (GPT/Cursor/Codex explicit roles)" branch=main head_pushed=16ec30ed760bb482cd1996a2d362fc7b382576c9 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(pre-commit) ts=2026-01-06T15:51:09+0800 msg="MILESTONE: advisor role packet workflow integrated" branch=main head_before=1555140c6066d474493ddd767bead2f96ec78135 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-06T15:51:11+0800 msg="MILESTONE: advisor role packet workflow integrated" branch=main head_pushed=7b2567a4ce565140374ef71c45834082893eac37 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: Execution Assignment Rule (task -> Cursor/Codex decision policy) -> docs/governance/EXECUTION_ASSIGNMENT_RULE.md

- Added: checkpoint(pre-commit) ts=2026-01-06T16:41:40+0800 msg="MILESTONE: execution assignment rule added (Cursor vs Codex decision)" branch=main head_before=31fffc70e5539b9d18ea9db8e33f8313aef529f4 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-06T16:41:43+0800 msg="MILESTONE: execution assignment rule added (Cursor vs Codex decision)" branch=main head_pushed=e2514c8b651ecc110e57f6349367fe282bd50997 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(pre-commit) ts=2026-01-06T16:58:01+0800 msg="MILESTONE: enforce role sync packet coverage audit (single-packet rule)" branch=main head_before=e1e0df1a90ddd13877453367a76989693bc8e516 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-06T16:58:03+0800 msg="MILESTONE: enforce role sync packet coverage audit (single-packet rule)" branch=main head_pushed=5790e6216d77c4737296585d543c54b704eb3c35 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(pre-commit) ts=2026-01-06T18:34:13+0800 msg="MILESTONE: FULL trigger + MIN evidence policy added" branch=main head_before=fc5d088495465be3d44062a681a78826802422ba remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-06T18:34:15+0800 msg="MILESTONE: FULL trigger + MIN evidence policy added" branch=main head_pushed=a7e98cabe9f49ed96c185600f7f9bf71138d5107 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(pre-commit) ts=2026-01-06T22:00:33+0800 msg="MILESTONE: exec response mode + docs/gem drift audit PASS + ignore generated （禁止引用之暫存路徑）" branch=main head_before=cdfb9011a3ae549d057b48cd8608ef189d05314d remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-06T22:00:41+0800 msg="MILESTONE: exec response mode + docs/gem drift audit PASS + ignore generated （禁止引用之暫存路徑）" branch=main head_pushed=d031279f9f676de1d1f77ee35051427aa6266daf remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(pre-commit) ts=2026-01-06T22:09:05+0800 msg="MILESTONE: docs/gem drift audit hardened + pushed (repo-root anchored + depth 6)" branch=main head_before=a3eb9664a43ec3cc1c47194b0a36a4966c9ef8ef remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-06T22:09:08+0800 msg="MILESTONE: docs/gem drift audit hardened + pushed (repo-root anchored + depth 6)" branch=main head_pushed=c9fff2cfa44224679d5dc62b9d235ba328a6319f remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(pre-commit) ts=2026-01-06T23:18:12+0800 msg="MILESTONE: governance hardening sealed (cursor rescan -> rules written)" branch=main head_before=e2a15aea40dfd558741c449f7863740683cec934 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-06T23:18:14+0800 msg="MILESTONE: governance hardening sealed (cursor rescan -> rules written)" branch=main head_pushed=c5a7b11487a20395d943435e14a8aba56988949c remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(pre-commit) ts=2026-01-07T08:24:36+0800 msg="MILESTONE: canon cleanup applied (governance rules enforced in repo)" branch=main head_before=16a4cc4dabe3dbb522836455f7cda0a459de47b4 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-07T08:24:37+0800 msg="MILESTONE: canon cleanup applied (governance rules enforced in repo)" branch=main head_pushed=771d1492c9896547e90e79faee5fcefa5f0da602 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(pre-commit) ts=2026-01-07T08:47:16+0800 msg="MILESTONE: zero-memory execution + master sharding phase started" branch=main head_before=4871a427b43df2a1f01481980625ab1578ac5937 remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"

- Added: checkpoint(post-push) ts=2026-01-07T08:47:18+0800 msg="MILESTONE: zero-memory execution + master sharding phase started" branch=main head_pushed=a80397d9ff96a7581202ccac4660d55d6f8d8bcc remote="https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git"
