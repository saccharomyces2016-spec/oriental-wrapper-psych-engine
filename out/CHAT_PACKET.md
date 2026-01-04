# CHAT_PACKET (paste this whole file into XuanCe Commander)

Generated: 2026-01-04T16:24:18+08:00

## WHAT THIS PACKET IS
- Minimal context bundle to keep Commander aligned to TEXT-only goals/progress.
- If Commander needs more code, it must request specific paths + reasons.

## FILE: ./xuance-commander-core/memory/briefs/COMMAND_BRIEF.md

# COMMAND BRIEF（指揮官每次必讀，否則不得開始工作）

- generatedAt: 2026-01-04T16:24:18

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
- 並貼 out/CHAT_PACKET.md 給指揮官（最小必要上下文）

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

## FILE: ./xuance-commander-core/memory/changes/CHANGELOG.md

# CHANGELOG

## Unreleased
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

## FILE: ./xuance-commander-core/docs/adr/ADR_0004_ai_advisory_roles_and_gem_protocol.md

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

./xuance-commander-core
tools
tools/refresh_brief.py
tools/preflight.sh
tools/build_master_sync_packet.sh
tools/refresh_brief.sh
tools/export_chat_packet.sh
tools/preflight.py
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
memory/briefs/COMMAND_BRIEF.json
memory/briefs/COMMAND_BRIEF.md
memory/briefs/MASTER_SYNC_PACKET.md
memory/briefs/DIGEST.md
memory/briefs/CURRENT.md
memory/briefs/DIGEST.json
out
roadmap
roadmap/ROADMAP.md
codex
codex/packs
codex/packs/20260104_ai_roles_gem_protocol.sh
codex/packs/20260104_104125_mvp_extensible_skeleton.md
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
logs/preflight/2026-01-04_121634.txt
logs/preflight/2026-01-04_153302.txt
logs/preflight/2026-01-04_115021.txt
logs/preflight/2026-01-04_153210.txt
logs/preflight/2026-01-04_130239.txt
logs/preflight/2026-01-04_153359.txt
logs/preflight/2026-01-04_124138.txt
logs/preflight/2026-01-04_121653.txt
logs/preflight/2026-01-04_153606.txt
logs/preflight/2026-01-04_162418.txt
logs/preflight/2026-01-04_131718.txt
logs/preflight/2026-01-04_161649.txt
logs/preflight/2026-01-04_063046.txt
logs/preflight/2026-01-04_161645.txt
logs/preflight/2026-01-04_153608.txt
logs/preflight/2026-01-04_124121.txt
logs/preflight/2026-01-04_153356.txt
logs/preflight/2026-01-04_125639.txt
logs/preflight/2026-01-04_153209.txt
logs/preflight/2026-01-04_124136.txt
logs/preflight/2026-01-04_111101.txt
logs/preflight/2026-01-04_125111.txt
logs/preflight/2026-01-04_134020.txt
logs/preflight/2026-01-04_112025.txt
logs/preflight/2026-01-04_063225.txt
logs/preflight/2026-01-04_125113.txt
logs/preflight/2026-01-04_153442.txt
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

## FILE: ./xuance-commander-core/docs/ops/COMMANDER_AUTOPILOT_PROTOCOL.md

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
- 然後把輸出的 out/CHAT_PACKET.md 內容整段貼給指揮官

## 指揮官的固定索取話術（必用）
- 我需要你先提供最新 CHAT_PACKET，否則我不能開始做決策或產出指令包。
- 請你在專案根目錄執行：bash tools/export_chat_packet.sh .
- 然後把 out/CHAT_PACKET.md 全部貼給我。

## AI 合夥人責任確認
- Before entering any design or content production phase, the Commander must verify compliance with docs/governance/AI_PARTNERSHIP_PROTOCOL.md

