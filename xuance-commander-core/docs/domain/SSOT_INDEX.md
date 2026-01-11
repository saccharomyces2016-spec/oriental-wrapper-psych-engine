# SSOT Index

## P0-3 Phase
- **Status**: STABLE | FREEZE_READY
- **Facet**: income_expansion_pressure（歲時農耕・倉廩觀）
- **Phase**: READY_TO_FREEZE
- **Date**: 2026-01-09

### P0-3 Canon (Completed)
- **R1**: Narrative Metrics (M1–M4 + Critical Fail)
  - Path: `P0-3/R1_METRICS_V1_EXECUTABLE_SPEC.md`
  - Status: COMPLETED | APPROVED
- **R2**: L1–L4 Narrative Skeleton + Secondary Metaphor Whitelist
  - Path: `docs/domain/advisory/R2/P0-3_SECONDARY_METAPHOR_WHITELIST.md`
  - Status: COMPLETED | APPROVED
- **R4**: Banned Terms SSOT + L4 High-Risk Exit Templates
  - Path: `docs/domain/advisory/R4/P0-3_NARRATIVE_BLACKLIST_SSOT.json`
  - Path: `docs/domain/advisory/R4/P0-3_L4_HIGH_RISK_EXIT_TEMPLATES.md`
  - Status: COMPLETED | APPROVED

### P0-3 Freeze Documents
- **Freeze Readiness**: `P0-3/P0-3_FREEZE_READINESS.md` (READY_TO_FREEZE)
- **Final Checklist**: `P0-3/P0-3_FINAL_CHECKLIST.md` (ALL PASS)
- **Handoff Summary**: `P0-3/P0-3_HANDOFF_SUMMARY.md` (交棒摘要)


## P0-3 Governance Extensions
- docs/domain/advisory/P0-3_GOVERNANCE_EXTENSIONS.md (ACTIVE)
  - Expandable Metaphor Domains
  - Advisor Proposal / Owner Decision Model

- P0-3 CI Golden Tests (ACTIVE, MVP, Editable)

## NORTH_STAR_CANON
- **charter/CHARTER.md** (ACTIVE | IMMUTABLE_REFERENCE)【SSOT，取代舊的 FULL/MIN】
- Status: ACTIVE | IMMUTABLE_REFERENCE
- Rule: 不可由任何單一任務覆寫；任務需調整而非目標

**⚠️ 重要更新（2026-01-10）**：
- 舊的 `FULL/NORTH_STAR.md` 和 `MIN/NORTH_STAR.md` 已封存至 `docs/legacy/archived_old_system_structure/full_min_snapshots/`
- 這些是為迎合 GPT 作為總指揮時的舊制度文件，現已採用新架構（Cursor 作為總工程師 + 總指揮）
- 新的制度使用 `charter/CHARTER.md` 作為 SSOT


## QUESTION_QUALITY_ACCEPTANCE_RULE
- Path: xuance-commander-core/docs/governance/QUESTION_QUALITY_ACCEPTANCE_RULE.md
- Phase: P0-2
- Status: ACTIVE | EDITABLE
- Note: Structural acceptance only, no formulas

## P0-2_PHASE_CLOSURE
- Path: xuance-commander-core/docs/process/P0-2_PHASE_CLOSURE.md
- Status: COMPLETED
- Next: P0-3

## FULL_SNAPSHOT_RULES
- Path: xuance-commander-core/docs/governance/FULL_SNAPSHOT_RULES.md
- Status: ACTIVE | EDITABLE
- Note: FULL 快照必須引用健康檢查結果

## HEALTH_CHECK
- Path: xuance-commander-core/docs/governance/HEALTH_CHECK_PLAN.md
- Tool: xuance-commander-core/tools/xc_health_check.sh
- Status: ACTIVE | GOVERNANCE_CRITICAL
- Note: 健康檢查 = 治理結構全面盤點（Governance Inventory）

## GOVERNANCE_IMPROVEMENT_PROPOSAL_01
- Path: xuance-commander-core/docs/governance/proposals/GOVERNANCE_IMPROVEMENT_PROPOSAL_01.md
- Status: IN_PROGRESS
- Note: 總工程師（Cursor）制度改進提案

## SNAPSHOT_REQUEST_PROTOCOL
- Path: xuance-commander-core/docs/governance/SNAPSHOT_REQUEST_PROTOCOL.md
- Status: ACTIVE
- Priority: CRITICAL
- Scope: All phases
- Note: 系統執行前必須明確請求所需快照

## FILE_WRITE_LOCATION_RULE
- Path: xuance-commander-core/docs/governance/FILE_WRITE_LOCATION_RULE.md
- Status: ACTIVE
- Priority: CRITICAL
- Scope: All file write operations
- Note: 必須納入 MIN 快照，防止文件寫錯位置

## P0-4_PHASE
- Status: READY_TO_FREEZE
- Facet: relationship_imbalance（月相潮汐・盈虛觀）
- Path: xuance-commander-core/P0-4/P0-4_CHARTER.md
- References:
  - xuance-commander-core/P0-4/P0-4_FACET_BRIEF.md
  - xuance-commander-core/P0-4/P0-4_PORTABILITY_PLAN.md
  - xuance-commander-core/P0-4/P0-4_GOLDEN_TESTS_SPEC.md
  - xuance-commander-core/P0-4/P0-4_FAILURE_AUDIT_RULES.md
  - xuance-commander-core/P0-4/P0-4_PHASE_LOG.md
  - xuance-commander-core/P0-4/P0-4_FREEZE_READINESS.md
  - xuance-commander-core/P0-4/P0-4_FINAL_CHECKLIST.md
  - xuance-commander-core/P0-4/P0-4_HANDOFF_SUMMARY.md
- Edit Policy: EDITABLE（保留後修權）

## MASTER_WORK_OBJECTIVES
- Path: xuance-commander-core/roadmap/MASTER_WORK_OBJECTIVES.md
- Status: ACTIVE | IMMUTABLE_REFERENCE（附屬於 NORTH_STAR）
- Purpose: 定義所有主線工作目標，作為任務包發派的依據
- Scope: 所有 Phase 0-6 的工作目標
- Note: 所有工作目標必須附屬於 NORTH_STAR，不得違背終極目標

## NORTH_STAR_GAP_ANALYSIS
- Path: xuance-commander-core/docs/governance/NORTH_STAR_GAP_ANALYSIS.md
- Status: ACTIVE | EDITABLE
- Purpose: 識別終極目標中缺失的關鍵要素
- Note: 作為 MASTER_WORK_OBJECTIVES 的輸入來源

## 專案資料夾說明（人類可讀）
- Path: xuance-commander-core/專案資料夾說明.md
- Status: ACTIVE | EDITABLE
- Purpose: 給人類看的資料夾結構說明，使用白話文，讓新手小白也能看懂
- Note: 包含所有主要資料夾的超連結和用途說明，可以透過 tools/update_folder_guide.sh 自動更新

### P0-4 Canon (Completed)
- **R2**: Primary Metaphor + Secondary Metaphor Whitelist
  - Path: `docs/domain/advisory/R2/P0-4_SECONDARY_METAPHOR_WHITELIST.md`
  - Path: `docs/domain/advisory/R2/P0-4_SECONDARY_METAPHOR_RULES.md`
  - Status: COMPLETED | APPROVED
- **R4**: Banned Terms SSOT + L4 High-Risk Exit Templates
  - Path: `docs/domain/advisory/R4/P0-4_NARRATIVE_BLACKLIST_SSOT.json`
  - Path: `docs/domain/advisory/R4/P0-4_BANNED_TERMS_LIST.md`
  - Path: `docs/domain/advisory/R4/P0-4_L4_HIGH_RISK_EXIT_TEMPLATES.md`
  - Status: COMPLETED | APPROVED

### P0-4 Freeze Documents
- **Freeze Readiness**: `P0-4/P0-4_FREEZE_READINESS.md` (READY_TO_FREEZE)
- **Final Checklist**: `P0-4/P0-4_FINAL_CHECKLIST.md` (ALL PASS)
- **Handoff Summary**: `P0-4/P0-4_HANDOFF_SUMMARY.md` (交棒摘要)

## P0-4.5_PHASE
- Status: COMPLETED
- Task: Question Flow & Funnel System Design（題目流程與分流系統設計）
- Path: xuance-commander-core/P0-4.5/P0-4.5_CHARTER.md
- References:
  - xuance-commander-core/P0-4.5/P0-4.5_FUNNEL_SYSTEM_DESIGN.md（EDITABLE 狀態，可根據需求調整）
  - xuance-commander-core/P0-4.5/P0-4.5_PHASE_LOG.md
  - xuance-commander-core/docs/gem/briefs/TASK_PACKAGE_P0-4.5_QUESTION_FLOW_FUNNEL_SYSTEM.md
  - xuance-commander-core/docs/governance/QUESTION_FLOW_DESIGN_PRIORITY_ANALYSIS.md
- Design: 4-Stage Holographic Funnel System（四階段全像漏斗系統）
  - Stage 1: 八卦定方位（The Domain Gate）- 單選，八卦轉輪/八門卡片
  - Stage 2: 六親定物象（The Context Lock）- 多選 2-3 項，符號雲/物象群
  - Stage 3: 萬象定歸因（The Attribution Matrix）- 投射式選擇，萬象羅盤/星盤
  - Stage 4: 命盤綜合與斷語（Synthesis & Routing）- 生成綜合斷語並路由到 Facet
- Edit Policy: EDITABLE（保留後續調整權，可根據實際需求修改）

