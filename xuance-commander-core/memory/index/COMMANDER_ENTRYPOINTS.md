# Commander Entrypoints（指揮官必讀入口，只讀這些就夠）

## 🚀 第一次接觸專案時（AI 上手指南）

**總入口**：`docs/ONBOARDING.md`（AI 上手指南）

**為什麼重要**：
- 告訴 AI 第一次接觸專案時應該先讀什麼
- 按優先級排序（必須讀 vs 建議讀 vs 需要時查閱）
- 包含快速開始工作的檢查清單

---

## 📋 每次開始工作時（標準流程）

每次開始任何工作，先讀這 5 個檔（小檔、穩定）：
1) `docs/ONBOARDING.md`（AI 上手指南，總入口）
2) `docs/ops/TASK_STATUS.md`（任務狀態總覽）
3) `docs/governance/ESSENTIAL_RULES.md`（核心制度）
4) `memory/briefs/CURRENT.md`（當前狀態摘要）
5) `memory/changes/CHANGELOG.md`（變更紀錄）

若需要 domain 細節：
- domain/manifests/（先讀 manifest 再去找分檔）
- domain/compiled/（優先讀 compiled，避免掃一堆小檔）

強制規則：
- 不允許「我記得之前…」；一律以以上檔案為準

## 每次開始工作前的硬規則
- 必須先跑：tools/preflight.sh
- 然後必讀：memory/briefs/COMMAND_BRIEF.md
- 未跑 preflight / 未讀 COMMAND_BRIEF -> 不得開始做任何決策或產出指令包

## 文件放置規範（寫入文件前必讀）
- **必須參考**：`docs/governance/CURSOR_FILE_PLACEMENT_RULE.md`
- 每次寫入文件前，必須檢查文件放置位置是否符合規範
- 每次生成任務包前，必須參考文件放置規範
- 使用者說「請參考你的規範」時，即指此文件

## 任務狀態追蹤（統一入口）
- **統一入口**：`docs/ops/TASK_STATUS.md`（任務狀態總覽）
- 所有任務狀態更新到此文件，不要建立新的時間戳記檔案
- 過期檔案已歸檔到 `docs/ops/archive/`

## 缺資料時的最低要求（替代上傳整包）
- 先索取 xuance-commander-core/out/CHAT_PACKET.md
- 生成方式：bash tools/export_chat_packet.sh .
