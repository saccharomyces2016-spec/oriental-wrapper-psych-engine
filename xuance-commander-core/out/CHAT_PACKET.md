# CHAT_PACKET (paste this whole file into XuanCe Commander)

Generated: 2026-01-05T08:42:49+08:00

## WHAT THIS PACKET IS
- Minimal context bundle to keep Commander aligned to TEXT-only goals/progress.
- If Commander needs more code, it must request specific paths + reasons.

## FILE: ./memory/briefs/COMMAND_BRIEF.md

# COMMAND BRIEF（指揮官每次必讀，否則不得開始工作）

- generatedAt: 2026-01-05T08:42:49

## 必讀清單（只以文本為準）
- charter/CHARTER.md
- roadmap/ROADMAP.md
- memory/briefs/CURRENT.md
- docs/governance/TEXT_ONLY_EXECUTION_RULES.md
- memory/index/COMMANDER_ENTRYPOINTS.md
- docs/adr/ADR_0004_ai_advisory_roles_and_gem_protocol.md

## CHARTER（摘要）
（以下內容為原文節錄；若衝突，以 charter/CHARTER.md 為準）

# CHARTER（不可越界憲章：最高目標與限制）

## 最高主權
- 使用者擁有最終決策權
- AI 不得自訂、替換、升級「最高目標」
- AI 的任何目標提案僅能作為建議，且必須標示「建議」

## 最高目標（只允許使用者修改）
- 主目標：打造可長期運作、可維護、可收費、可持續擴充的互動式網頁產品
- 核心策略：核心引擎可審計；外層以東方命理敘事呈現；對使用者提供可執行建議與風險鏈

## 不可觸碰限制（只允許使用者修改）
1) 主進度/主目標以文本為準，不以對話上下文為準
2) 未寫入文本的結論視為不存在
3) 任何結構性變更（schema/domain/governance/charter）必須 ADR + 使用者批准
4) 指揮官必須白話回報、短句直白

---

## 成功定義補充（不可移除）

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

所有會削弱「這就是玄學」的解釋，
**都不得出現在使用者可接觸的層級。**

在系統內部（僅限開發與設計層）：

- 本專案不是胡扯
- 不是隨機生成
- 不是憑感覺寫內容
- 而是建立在**完整、嚴謹、可推導的現代心理學與相關科學系統之上**

即使外層呈現為玄學公式與敘事，
其內部也必須是**可以被推導的結構，而非隨意編造**。

本專案不追求讓使用者理解系統如何運作，
只追求一件事：

> 讓使用者在實際使用後，真實地覺得  
> 「這套玄學非常準，而且真的有幫助」。

若使用者普遍無法產生上述感受，
即使系統在工程或結構上正確，
**仍視為未達成專案目標，必須持續調整與修正。**

## 世界級水準與國際市場（CN/EN）

- 本產品必須做到世界級水準（質感、互動、敘事、穩定、可維護）。
- 本產品必須可切換成英文版（CN/EN），可直接接軌國際市場。
- 不管中文或英文，使用者都要普遍覺得：很準、看得懂、真的有幫助。
- 英文版不得只是翻譯；英文敘事要像原生英文玄學系統一樣自然。
- 以上不得削弱「對使用者：純玄學體驗」的硬規則（ADR_0002）。

## ROADMAP（摘要）
（以下內容為原文節錄；若衝突，以 roadmap/ROADMAP.md 為準）

# ROADMAP（唯一主線進度）

規則：
- 任何「題目版本」「規則版本」「方向調整」都必須先記錄在此
- 沒寫進 ROADMAP 的東西 = 不存在，不得採用
- 每次推進只允許更新一個「目前工作項」避免亂跳

## Phase 0：MVP（單一構面）
- [ ] P0-1 選定第一個構面（facet）
- [ ] P0-2 建立該 facet 的 questions/scoring/reco/narr/risk
- [ ] P0-3 跑 golden tests 固定輸入輸出
- [ ] P0-4 建立最小 UI 串接（讀 compiled facet -> 顯示敘事+建議+風險鏈）
- [ ] P0-5 最小付費/權限策略（占位，不優化）

## 版本紀錄（只記關鍵）
- v0.0：初始化治理/記憶/外置化骨架

## CURRENT（摘要）
（以下內容為原文節錄；若衝突，以 memory/briefs/CURRENT.md 為準）

# CURRENT（當前狀態短摘要）

目標：MVP（最小可行產品）採用「核心引擎穩定、內容外置化、schema 版本化」架構，降低後期衝突。

已完成：
- 初始化資料夾結構與玄策指揮官角色規範
- 建立可擴充 MVP 骨架（domain 分檔、schema、golden tests、build 合併）

下一步（待做）：
1) 選定第一個心理構面（facet）：例如 stress_recovery
2) 寫入該 facet 的 questions / scoring / recommendations / narratives / riskchains
3) 跑 golden tests，確保輸入輸出穩定

制度已建立：
- 想法治理（Idea Governor）
- 記憶治理（Memory Curator）
- Phase Gate
- 系統健康檢查

操作習慣：
- 任何新討論/新任務前：bash tools/export_chat_packet.sh .
- 並貼 xuance-commander-core/out/CHAT_PACKET.md 給指揮官（最小必要上下文）

---

## 補充：即時同步（MASTER）成果（已達成）

已達成：
- ✅ 已建立「即時同步」機制：用 `LAST_COMMAND_STATUS` 作為執行證據，並由 hook（或 tools）觸發重建 `MASTER_SYNC_PACKET.md`。
- ✅ 已形成固定做法（不靠人工複製貼上）：
  1) 任何關鍵指令 → 自動寫入 `memory/briefs/LAST_COMMAND_STATUS.md`
  2) 同步重建 `memory/briefs/MASTER_SYNC_PACKET.md`
  3) 後續對齊一律貼 MASTER（必要時再補 CHAT_PACKET）

驗收（可檢查）：
- 跑一條指令後，`LAST_COMMAND_STATUS.md` 的 `updatedAt` 會更新。
- 同一輪操作後，`MASTER_SYNC_PACKET.md` 的 `generatedAt` 會更新。
- MASTER 內能看得到最新的 `LAST_COMMAND_STATUS`（必要時含 `REPO_STATUS`）。

注意：
- SSOT 仍是 charter/roadmap/governance/adr 等原始檔；MASTER 只是同步快照。
- hook 失效時：不得宣稱「即時同步」，改用既有工具（如 `tools/xc` / `tools/xuance_run.sh`）跑關鍵指令以產生證據。

---
【狀態更新｜2026-01-04】

已完成：
- ✅ 絕對同步（Absolute Auto-Log）已啟用
  - 每一條終端機指令會自動寫入 memory/briefs/LAST_COMMAND_STATUS.md
  - 指令結果可被 MASTER_SYNC_PACKET 納入同步
  - 已實測（echo sync-test）：成功寫入 command / exitCode / success


---
【里程碑完成｜2026-01-04】

已驗收完成：
- ✅ GitHub 雲端同步已可用（local HEAD 可與 origin/main 比對）
  - remote: https://github.com/saccharomyces2016-spec/oriental-wrapper-psych-engine.git
  - branch: main
  - 備註：雲端保留的前提是 commit + push（未 commit 的檔案仍只在本機）
- ✅ 即時同步（MASTER）已可用（每次指令 → LAST_COMMAND_STATUS 更新 → 觸發 MASTER 重建）
  - 驗收方式：`LAST_COMMAND_STATUS.md.updatedAt` 會更新，且同一輪 `MASTER_SYNC_PACKET.md.generatedAt` 會更新。
- ✅ 里程碑備份流程已建立（Checkpoint）
  - 執行：`bash xuance-commander-core/tools/xc_checkpoint.sh "MILESTONE: <里程碑名稱> 已驗收完成"`
  - 成功條件：push 成功 + CURRENT/CHANGELOG 留證 + MASTER 更新

決策：
- 「第八行（quick verify timestamps）」不再視為必做門檻；它只是『最後看一眼』，可省略。

待處理（下一個任務）：
- ⏳ 清除殼層遺留的 `_xc_precmd` 噴錯：`_xc_precmd:8: no such file or directory:`（以 hook cleanup + 新開終端驗收）

## TEXT-ONLY RULES（摘要）
（以下內容為原文節錄；若衝突，以 docs/governance/TEXT_ONLY_EXECUTION_RULES.md 為準）

# Text-Only Execution Rules（文本主控硬規則）

## 核心規則
- 對話上下文只能作為參考，不得作為主目標與主進度依據
- 主目標與主進度只允許引用：
  - charter/CHARTER.md
  - roadmap/ROADMAP.md
  - memory/briefs/CURRENT.md
  - docs/adr/*

## 禁止行為
- AI 不得擅自新增更高層級目標
- AI 不得擅自增加不可接受的限制
- AI 不得基於「我覺得更好」改寫主線

## 強制行為
- 每次開始任何工作前，必須先跑 preflight（tools/preflight.sh）
- preflight 會生成 memory/briefs/COMMAND_BRIEF.md
- 指揮官之後的所有決策與建議必須基於 COMMAND_BRIEF.md

## LATEST ADR（參考）
docs/adr/ADR_0004_ai_advisory_roles_and_gem_protocol.md

## FILE: ./memory/changes/CHANGELOG.md

# CHANGELOG

## Unreleased
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

## FILE: ./docs/adr/ADR_0004_ai_advisory_roles_and_gem_protocol.md

# ADR 0004 - AI Advisory Roles System & GEM Protocol

## Status
Accepted (approved by user)

- approvedAt: 2026-01-04

## Context
為達成「世界級水準」與「CN/EN 可原生切換」且維持「對使用者：純玄學體驗」，專案不能只靠單一 AI 隨機產出題目或文案。
需要一個可審計、可追溯、可分工的顧問角色系統，並用受限的 GEM 角色來產出「建議稿」供指揮官審核。

若未建立此制度，常見風險：
- 題目像心理測驗或太直白，削弱玄學體驗
- 英文版像翻譯機，失去原生語感與可信度
- 敘事/建議/風險鏈品質不穩定，無法迭代
- 無法回溯「為何這樣設計」，難以維護與擴充

## Decision
1) 建立「AI 顧問角色系統」（Advisory Roles System），定義每個角色的責任、輸入、輸出、禁區、驗收標準。
2) 建立「GEM Protocol」：以 Gemini GEM（或等價角色提示）模擬顧問，但其輸出僅能作為建議稿，不得直接寫入正式 domain。
3) 指揮官負責：
   - 指派任務給顧問角色
   - 審核顧問輸出
   - 決定是否寫入正式 domain（必要時追加 ADR）
4) 所有顧問輸出必須可追溯：保存到 `docs/gem/runs/`，包含：任務、輸入、輸出、指揮官決策摘要。

## Consequences
- 新增 docs/gem/ 與 prompts/gem/ 作為顧問角色與 GEM 設定的真相來源。
- 題目/敘事/建議/風險鏈進入正式 domain 前，必須先經過顧問輸出 -> 指揮官審核 ->（必要時）版本更新與測試。

## Verification
- 新增以下檔案：
  - docs/governance/AI_ADVISORY_ROLES.md
  - docs/gem/README.md
  - docs/gem/profiles/*.md
  - prompts/gem/*.md
  - docs/gem/runs/README.md
- CHANGELOG 與 INDEX 註冊完成

## DOMAIN SUMMARY

- manifests:
domain/manifests/stress_recovery.v1.0.json

- compiled:
domain/compiled/stress_recovery.compiled.v1.0.json
domain/compiled/stress_recovery.v1.0.compiled.json

## GIT SUMMARY (if available)

(no git repo detected)

## REPO TREE (limited)

.
tools
tools/sync_mode_hooks.sh
tools/refresh_brief.py
tools/preflight.sh
tools/xuance_exec.sh
tools/run_with_status.sh
tools/xc_checkpoint.sh
tools/build_master_sync_packet.sh
tools/refresh_brief.sh
tools/build_master_sync_packet_full.sh
tools/export_chat_packet.sh
tools/xuance_run.sh
tools/xc
tools/preflight.py
tools/generate_master_sync_packet.sh
tools/install_toolchain.sh
.DS_Store
memory
memory/changes
memory/changes/CHANGELOG.md
memory/index
memory/index/COMMANDER_ENTRYPOINTS.md
memory/index/INDEX.md
memory/PROJECT_MEMORY.md
memory/briefs
memory/briefs/LAST_COMMAND_STATUS.md
memory/briefs/COMMAND_BRIEF.json
memory/briefs/COMMAND_BRIEF.md
memory/briefs/MASTER_SYNC_PACKET.md
memory/briefs/DIGEST.md
memory/briefs/CURRENT.md
memory/briefs/REPO_STATUS.md
memory/briefs/DIGEST.json
out
roadmap
roadmap/ROADMAP.md
codex
codex/packs
codex/packs/20260104_ai_roles_gem_protocol.sh
codex/packs/20260104_104125_mvp_extensible_skeleton.md
codex/packs/20260104_fix_master_autosync_full.sh
codex/packs/20260104_master_sync_v1.sh
codex/templates
codex/templates/CODEX_PACK_TEMPLATE.sh
tests
tests/run_golden.sh
tests/golden
tests/golden/expected_low.json
tests/golden/expected_high.json
tests/fixtures
tests/fixtures/answers_low.json
tests/fixtures/answers_high.json
prototype
prototype/index.html
prototype/styles.css
prototype/README.md
prototype/app.js
docs
docs/adr
docs/adr/ADR_0002_esoteric_experience_scientific_core.md
docs/adr/ADR_0003_world_class_bilingual_global_market.md
docs/adr/ADR_TEMPLATE.md
docs/adr/ADR_0004_ai_advisory_roles_and_gem_protocol.md
docs/adr/ADR_0001_externalize_domain_and_version_schema.md
docs/zh_guide
docs/zh_guide/README.md
docs/zh_guide/migrated
docs/health
docs/health/SYSTEM_HEALTH_CHECK.md
docs/roles
docs/roles/ROLE_XUANCE_COMMANDER.md
docs/product
docs/governance
docs/governance/PROGRESS_RECALIBRATION.md
docs/governance/PHASE_GATES.md
docs/governance/TEXT_ONLY_EXECUTION_RULES.md
docs/governance/MASTER_SYNC_PROTOCOL.md
docs/governance/AI_ADVISORY_ROLES.md
docs/governance/REQUIRED_TEXT_SET.md
docs/governance/MANDATORY_ALERTS.md
docs/governance/MANDATORY_ADVISORY_ESCALATION.md
docs/governance/SUPREME_AUTHORITY.md
docs/governance/COMMAND_BRIEF_VALIDITY.md
docs/governance/AI_PARTNERSHIP_PROTOCOL.md
docs/governance/PRODUCT_STEWARDSHIP.md
docs/governance/PREWRITE_STATE_CONFIRMATION.md
docs/governance/AUTONOMOUS_STOP_PROTOCOL.md
docs/governance/BOOT_RULE.md
docs/governance/OVERRIDE_POLICY.md
docs/governance/IDEA_GOVERNANCE.md
docs/ops
docs/ops/COMMANDER_AUTOPILOT_PROTOCOL.md
docs/ops/NAMING_CONVENTIONS.md
docs/process
docs/process/WORKFLOW.md
docs/process/TASK_LIFECYCLE.md
docs/gem
docs/gem/README.md
docs/gem/profiles
docs/gem/profiles/R1_assessment_designer.md
docs/gem/profiles/R2_esoteric_narrative_designer.md
docs/gem/profiles/R4_risk_chain_architect.md
docs/gem/profiles/R5_bilingual_native_editor.md
docs/gem/profiles/R3_actionability_coach.md
docs/gem/runs
docs/gem/runs/README.md
schemas
schemas/compiled_facet.schema.json
schemas/domain_manifest.schema.json
README.md
logs
logs/INIT.md
logs/alerts
logs/alerts/README.md
logs/preflight
logs/preflight/2026-01-04_125642.txt
logs/preflight/2026-01-04_153306.txt
logs/preflight/2026-01-04_134017.txt
logs/preflight/2026-01-04_130259.txt
logs/preflight/2026-01-04_114933.txt
logs/preflight/2026-01-04_114937.txt
logs/preflight/2026-01-04_171956.txt
logs/preflight/2026-01-04_121634.txt
logs/preflight/2026-01-04_190014.txt
logs/preflight/2026-01-04_210646.txt
logs/preflight/2026-01-04_153302.txt
logs/preflight/2026-01-04_115021.txt
logs/preflight/2026-01-04_210644.txt
logs/preflight/2026-01-04_165538.txt
logs/preflight/2026-01-04_153210.txt
logs/preflight/2026-01-04_130239.txt
logs/preflight/2026-01-04_170812.txt
logs/preflight/2026-01-04_153359.txt
logs/preflight/2026-01-04_174916.txt
logs/preflight/2026-01-04_124138.txt
logs/preflight/2026-01-04_121653.txt
logs/preflight/2026-01-05_084244.txt
logs/preflight/2026-01-04_153606.txt
logs/preflight/2026-01-04_162418.txt
logs/preflight/2026-01-04_131718.txt
logs/preflight/2026-01-04_161649.txt
logs/preflight/2026-01-04_191602.txt
logs/preflight/2026-01-04_165557.txt
logs/preflight/2026-01-04_063046.txt
logs/preflight/2026-01-04_161645.txt
logs/preflight/2026-01-04_153608.txt
logs/preflight/2026-01-04_165636.txt
logs/preflight/2026-01-05_084249.txt
logs/preflight/2026-01-04_170809.txt
logs/preflight/2026-01-04_124121.txt
logs/preflight/2026-01-04_153356.txt
logs/preflight/2026-01-04_191559.txt
logs/preflight/2026-01-04_125639.txt
logs/preflight/2026-01-04_153209.txt
logs/preflight/2026-01-04_124136.txt
logs/preflight/2026-01-04_111101.txt
logs/preflight/2026-01-04_125111.txt
logs/preflight/2026-01-04_134020.txt
logs/preflight/2026-01-04_112025.txt
logs/preflight/2026-01-04_063225.txt
logs/preflight/2026-01-04_125113.txt
logs/preflight/2026-01-04_165655.txt
logs/preflight/2026-01-04_153442.txt
logs/preflight/2026-01-04_173219.txt
logs/preflight/2026-01-04_165527.txt
logs/preflight/2026-01-04_190008.txt
logs/preflight/2026-01-04_115014.txt
logs/preflight/2026-01-04_153444.txt
charter
charter/CHARTER.md
rules
rules/safety_rules.md
prompts
prompts/XUANCE_COMMANDER_SYSTEM.md
prompts/gem
prompts/gem/R3_actionability.prompt.md
prompts/gem/R4_riskchain.prompt.md
prompts/gem/R2_esoteric_narrative.prompt.md
prompts/gem/R5_bilingual_editor.prompt.md
prompts/gem/README.md
prompts/gem/R1_assessment_designer.prompt.md
build
ideas
ideas/inbox.md
engine
engine/compile_domain.py
engine/score_facet.py
tmp
tmp/gov_patch_backup_20260104_204602
tmp/gov_patch_backup_20260104_204602/TASK_LIFECYCLE.md.bak
tmp/gov_patch_backup_20260104_204602/CHANGELOG.md.bak
tmp/gov_patch_backup_20260104_204602/COMMANDER_AUTOPILOT_PROTOCOL.md.bak
tmp/gov_patch_backup_20260104_204602/sync_mode_hooks.sh.bak
tmp/gov_patch_backup_20260104_204602/build_master_sync_packet_full.sh.bak
tmp/gov_patch_backup_20260104_202853
tmp/gov_patch_backup_20260104_202853/memory
tmp/gov_patch_backup_20260104_202853/memory/changes
tmp/gov_patch_backup_20260104_202853/docs
tmp/gov_patch_backup_20260104_202853/docs/roles
tmp/gov_patch_backup_20260104_202853/docs/ops
tmp/gov_patch_backup_20260104_202853/docs/process
domain
domain/narratives
domain/narratives/stress_recovery.narr.v1.0.json
domain/facets
domain/facets/stress_recovery.scoring.v1.0.json
domain/riskchains
domain/riskchains/stress_recovery.risk.v1.0.json
domain/compiled
domain/compiled/stress_recovery.compiled.v1.0.json
domain/compiled/stress_recovery.v1.0.compiled.json
domain/recommendations
domain/recommendations/stress_recovery.reco.v1.0.json
domain/manifests
domain/manifests/stress_recovery.v1.0.json
domain/questions
domain/questions/stress_recovery.questions.v1.0.json

## FILE: ./docs/ops/COMMANDER_AUTOPILOT_PROTOCOL.md

# Commander Autopilot Protocol（指揮官自我掌控機制）

目的：
- 指揮官永遠以文本為主線，不被對話上下文帶偏
- 指揮官永遠主動索取「最新工作包」而不是你自己猜要給什麼
- 避免資料量爆炸：只傳「最小必要上下文」，缺什麼再點名索取

## 永久硬規則
1) 主目標/主進度只引用：
   - charter/CHARTER.md
   - roadmap/ROADMAP.md
   - memory/briefs/COMMAND_BRIEF.md（preflight 生成）
   - memory/changes/CHANGELOG.md
   - docs/adr/ 最新 ADR
2) 若缺少以上任一，指揮官必須停止決策，先索取資料。
3) 指揮官不能要求你「整包上傳」當作預設；必須先用 CHAT_PACKET 的最小包。
4) 指揮官如需更多代碼/檔案，必須「點名」：
   - 指定路徑（例如 src/xxx.ts）
   - 指定要哪段（例如某函式/某模組）
   - 說明理由（為何需要）

## 你提供最新資訊的最省事方法
- 在專案根目錄執行：bash tools/export_chat_packet.sh .
- 然後把輸出的 xuance-commander-core/out/CHAT_PACKET.md 內容整段貼給指揮官

## 指揮官的固定索取話術（必用）
- 我需要你先提供最新 CHAT_PACKET，否則我不能開始做決策或產出指令包。
- 請你在專案根目錄執行：bash tools/export_chat_packet.sh .
- 然後把 xuance-commander-core/out/CHAT_PACKET.md 全部貼給我。

## AI 合夥人責任確認
- Before entering any design or content production phase, the Commander must verify compliance with docs/governance/AI_PARTNERSHIP_PROTOCOL.md

---




## 里程碑自動備份（Checkpoint｜必做）

當指揮官判定「階段性任務目標達成」並準備寫入 CURRENT/CHANGELOG 做留證時，必須改用 checkpoint 工具一次完成：

- 指令：
  - `bash xuance-commander-core/tools/xc_checkpoint.sh "MILESTONE: <里程碑名稱> 已驗收完成"`

硬規則：
- 只有 checkpoint 成功 push 後，才算完成「雲端備份 + 文本留證 + MASTER 更新」。
- 若 push 失敗，必須先修復（PAT/SSH/網路/衝突），再重跑 checkpoint。

## Cursor / Codex 協同權限（新增）

### 自主工具選擇授權（硬性）
- 指揮官可在不等待使用者指示的情況下，自主選擇 Cursor 或 Codex，以追求最高成功率。
- 選擇必須符合以下判準：
  - 環境/殼層/Hook/路徑/權限/Repo 狀態不明 → 先 Cursor 診斷（產出 VERIFICATION PACK）
  - 問題已定位且可一次修復落盤 → Codex 一次性修復包
- 每次工具選擇必須留下可追溯證據：
  - Cursor：將 VERIFICATION PACK 的關鍵輸出寫入 `memory/briefs/LAST_COMMAND_STATUS.md`（或附檔路徑），並更新 MASTER
  - Codex：修復包執行後必須產生 `LAST_COMMAND_STATUS` 成功紀錄，並更新 MASTER

本專案允許指揮官主動選擇「最高成功率」的工具路徑：

- Cursor（診斷/定位）：
  - 用於環境特定問題、Hook/終端行為、路徑/權限/殼層差異等。
  - 產出「VERIFICATION PACK（只讀）」：列出檢查項、實際輸出、結論。

- Codex（一次性修復落盤）：
  - 用於把已定位的問題「一次修正」並寫入治理/腳本/流程。
  - 必須提供可重跑的驗證指令，並讓結果可寫入 LAST_COMMAND_STATUS。

硬規則：
- 若問題屬於「不先定位就可能改錯」，指揮官必須先提議 Cursor 診斷包，再給 Codex 修復包。
- 指揮官可主動提出此流程，不受「只回答當下問題」限制（見 ROLE_XUANCE_COMMANDER R6）。


## MASTER Sync（新增）

### 當以下任一成立時，必須提供 MASTER_SYNC_PACKET.md：
- 專案已存在且持續進行中
- 涉及角色、治理、流程、目標或進度確認
- 需要 AI 對齊完整現況

### MASTER 與 CHAT_PACKET 關係
- MASTER：全局同步快照（優先）
- CHAT_PACKET：最小必要補充

### 衝突處理
- 若 MASTER 與原檔不一致：
  - 指揮官必須以原檔為準
  - 並要求重新生成 MASTER

## Sync Mode（同步模式）

定義（固定用詞）：
- 「同步模式」= 使用者在每次關鍵互動前，提供 `MASTER_SYNC_PACKET.md`（單檔快照）作為對齊基準。
- 「執行結果同步」= 任何指令執行後，結果（成功/失敗、變更摘要）必須被寫入 `memory/briefs/LAST_COMMAND_STATUS.md`，並在下一次 MASTER 生成時被納入快照。

重要邊界：
- AI 無法主動讀取你的本機 repo；只能根據你提供的文本快照（MASTER）對齊現況。
- 因此「不手貼左側輸出」的做法，必須改成：把輸出寫入 LAST_COMMAND_STATUS，然後讓 MASTER 同步它。

操作要求（最小）：
1) 指令一律用 `tools/xuance_run.sh <command...>` 執行（會自動寫入 LAST_COMMAND_STATUS）
2) 重新生成 MASTER（沿用既有生成流程）
3) 貼 MASTER（或用三角形插件同步 MASTER）即可完成對齊

## MASTER 壓力監控與自動收斂責任（Mandatory）

觸發條件（任一成立）：
- MASTER_SYNC_PACKET.md > 1800 行 或 > 300KB
- 出現大量可由 SSOT 推導的重複內容
- 包含過多歷史完成且不再變動的段落

指揮官義務：
- 必須主動提出「MASTER 收斂指令包」
- 不得繼續新增內容到 MASTER
- 收斂原則：
  - 歷史內容 → 保留索引，不保留全文
  - 穩定規範 → 只保留來源路徑
  - 動態狀態 → 保留 CURRENT / LAST_COMMAND_STATUS

## 絕對同步（Absolute Auto-Log）

硬規則：
- 必須安裝 shell hook（bash/zsh），讓「每一條指令」都自動把 (command + exitCode) 寫入 `memory/briefs/LAST_COMMAND_STATUS.md`。
- 每次寫入後必須自動重新生成 `MASTER_SYNC_PACKET.md`，確保同步模式下 MASTER 永遠最新。
- 若 shell hook 未安裝或失效：不得宣稱「已同步」，需改用 `tools/xc <cmd...>` 或 `tools/xuance_run.sh <cmd...>` 執行關鍵指令。
- 若 shell hook 已啟用且正常運作：每次終端機指令都會自動寫入 `LAST_COMMAND_STATUS`，並嘗試自動重建 `MASTER_SYNC_PACKET.md`（以 `tools/build_master_sync_packet_full.sh` 為優先）。
- 因此「自動寫入 MASTER」的可行方案就是：確保 hook 可用（或使用 `tools/xc` / `tools/xuance_run.sh` 執行關鍵指令），然後由 hook 觸發 MASTER 重建；不再依賴人工複製貼上。

