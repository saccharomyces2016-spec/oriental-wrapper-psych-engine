# CHANGELOG

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
