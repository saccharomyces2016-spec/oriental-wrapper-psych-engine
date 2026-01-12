# MEMORY INDEX（小檔索引）

目的：避免「單一超大文本」。你每次只需要傳：
- memory/index/INDEX.md
- memory/briefs/CURRENT.md
- memory/changes/CHANGELOG.md
- docs/adr/ 最近新增的 ADR

規則：
1) PROJECT_MEMORY 只保留短摘要（<= 300 行）
2) 詳細內容一律拆到 domain/ 或 docs/adr/ 或 docs/ops/
3) 任何重要變更都要寫進 CHANGELOG
4) INDEX 永遠指向「最新入口」與「真相來源」

入口：
- 當前摘要：memory/briefs/CURRENT.md
- 變更紀錄：memory/changes/CHANGELOG.md
- 角色與流程：docs/roles/ROLE_XUANCE_COMMANDER.md、docs/process/WORKFLOW.md
- Domain 清單：domain/manifests/
- Schema：schemas/

## 指揮官快速入口
- memory/index/COMMANDER_ENTRYPOINTS.md
- memory/briefs/DIGEST.md（由 tools/refresh_brief.sh 產生）

## 治理核心
- docs/governance/SUPREME_AUTHORITY.md
- docs/governance/MANDATORY_ALERTS.md
- docs/governance/OVERRIDE_POLICY.md
- docs/governance/CURSOR_FILE_PLACEMENT_RULE.md（資料夾組織規範）

## 顧問升級制度
- docs/governance/MANDATORY_ADVISORY_ESCALATION.md

## 產品經營制度
- docs/governance/PRODUCT_STEWARDSHIP.md

## 最高憲章（不可越界）
- charter/CHARTER.md

## 文本主控硬規則
- docs/governance/TEXT_ONLY_EXECUTION_RULES.md
- memory/briefs/COMMAND_BRIEF.md（每次 preflight 生成）

## 指揮官自我掌控機制
- docs/ops/COMMANDER_AUTOPILOT_PROTOCOL.md
- docs/governance/BOOT_RULE.md
- docs/governance/AUTONOMOUS_STOP_PROTOCOL.md

## 文本自控補強規章
- docs/governance/COMMAND_BRIEF_VALIDITY.md
- docs/governance/REQUIRED_TEXT_SET.md
- docs/governance/PROGRESS_RECALIBRATION.md
- docs/governance/PREWRITE_STATE_CONFIRMATION.md（寫入前現況確認規則）
- docs/governance/AI_PARTNERSHIP_PROTOCOL.md

## ADR
- docs/adr/ADR_0003_world_class_bilingual_global_market.md（世界級 + CN/EN）

## AI 顧問角色與 GEM
- docs/governance/AI_ADVISORY_ROLES.md
- docs/gem/README.md
- docs/gem/profiles/
- prompts/gem/
- docs/gem/runs/

- docs/adr/ADR_0004_ai_advisory_roles_and_gem_protocol.md（AI 顧問角色 + GEM 流程）
