# Text-Only Execution Rules（文本主控硬規則）


## 白話說明：看不懂技術輸出是什麼意思

## 白話說明：GPT 上下文長度與同步資料的問題

GPT 一次最多只能讀取一定長度的上下文（文字量限制）。  
為了讓 GPT 只讀需要的部分，我們不把所有歷史資料丟給它，  
而是用「同步快照 + 分段」方式讓 GPT 聚焦在關鍵段落。

簡單比喻：

- 把整本書全部丟給 GPT → 它會忘記前面  
- 把書拆成小段 + 目錄查詢 → GPT 只看需要的章節

未來我們可以進一步把重要片段存進更高效的查詢系統（例如向量資料庫），  
讓 GPT 查詢時更加精準、token 也省更多。

---



有時系統會顯示很多技術性很強的內容（例如 shell hook 輸出或系統內部訊息）。  
這些技術訊息並非錯誤，而是系統寫給機器或流程檢查用的「證據」文字。  
人類要看的重點是：

- 指令是否成功（exitCode / success）
- 是否已同步到雲端（commit + push）
- 是否更新 MASTER snapshot

如果這三件事都有證據，其他技術訊息可以視為背景細節，不影響結果判斷。

---


## Repo 可視性邊界（AI 不可直接瀏覽你的 repo）

硬事實：
- 指揮官（GPT）**無法直接讀取**你本機的資料夾結構、檔名清單、或任何未被貼出的檔案內容。
- 指揮官能掌握的全貌，**只能來自你提供的文本快照**（例如 MASTER / MIN / Role Sync Packets / Verification Pack）。

因此：
- 只要「資料夾全貌」會影響判斷（例如：顧問缺件、路徑是否存在、是否有 legacy/router/brief/run/domain 檔），就必須提供可審計的快照證據。
- 未被快照包含的檔案/內容，對指揮官而言視為不存在；不得基於猜測推進。

驗收（可檢查）：
- 任何需要 repo 全貌的任務，必須在 VERIFICATION_PACK 內提供一份「Repo Tree Snapshot」輸出（見 `docs/ops/VERIFICATION_PACK_POLICY.md`）。


## 穩定性優先（Stability-First）功能提升規則

硬規則：
- 任何「功能提升 / 自動化增強 / 同步策略優化」，都必須以**系統穩定性不下降**為前提。
- 若新增功能會引入不確定性（例如：更多 hook、更多自動生成、更多同步分支），必須先提供「可回滾」方案；未提供則不得合併。

必備驗收（至少一項，依變更範圍提升）：
- 最低：可重跑且成功（exitCode=0）+ 不產生新噪音/錯誤
- 中等：提供 VERIFICATION_PACK（含：版本/狀態/關鍵輸出）證明功能正常
- 高風險：必須先在「隔離測試」或「dry-run」模式驗證，並保留 rollback 指令

失敗處理：
- 一旦驗收失敗：立即停止追加功能，優先修回穩定狀態（必要時回退到上一次 checkpoint）。


## 核心規則
- 對話上下文只能作為參考，不得作為主目標與主進度依據
- 主目標與主進度只允許引用：
  - charter/CHARTER.md
  - roadmap/ROADMAP.md
  - memory/briefs/CURRENT.md
  - docs/adr/*

## 低說明・指令優先互動模式（Anti-Drift Mode）

適用情境：
- 進入執行期 / 治理修復期 / 大型專案中後段
- 使用者明確要求「只要下一步 / 指令包」

互動原則：
- 指揮官預設 **不進行長篇說明**
- 回覆內容優先順序：
  1) 可直接執行的指令包
  2) 必要時的一行判斷（對 / 不對 / PASS / FAIL）
- 非必要背景、推理、術語一律省略

例外：
- 僅在「重大決策 / 題目設計 / 世界觀封板」時，才可進入詳細說明模式

驗收：
- 每次回覆可在 1 次貼上內完成
- 不依賴對話記憶即可執行
- 若「無法一次貼完」，必須先產生指令包或要求補充最小必要上下文

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

<!-- XUANCE_DOCS_GEM_CANON_BEGIN -->
## docs/gem 單一真相來源（防漂移硬規則）

硬規則：
- GEM 證據（briefs/profiles/runs）的唯一合法落點是：
  - `xuance-commander-core/docs/gem/`
- `xuance-commander-core/prompts/gem/` 只放提示模板，不是 runs 落點。
- 任何其他 `*/docs/gem`（尤其是 repo root 的 `./docs/gem`）一律視為漂移副本，不得寫入。

驗收（可檢查）：
- `bash xuance-commander-core/tools/audit_docs_gem_drift.sh` 必須 PASS。

引用要求：
- ROADMAP/CURRENT/DECISION 內對 GEM runs 的引用，必須使用：
  - `xuance-commander-core/docs/gem/runs/...`

規範來源：
- `xuance-commander-core/docs/governance/DOCS_GEM_CANON_RULE.md`
<!-- XUANCE_DOCS_GEM_CANON_END -->

---

## Pending Governance Specs (to be authored from audit)

These items are approved to be written next (derived from the governance gap audit) and then enforced:

- Governance Canon Enforcement (single governance root)
- Output Artifact Canon (single `out/` + naming)
- Temporary Artifact Canon (single `tmp/` + lifecycle)
- Log Artifact Registry (structure + retention)
- Sync Packet Single Source (role sync packets)
- Chat Packet Canon (single path)
- Advisor Packet Versioning (timestamp dirs + LATEST rule)
- Duplicate Filename Resolution (priority + lint rule)
- Cross-Directory Reference Rule (how to cite paths)
- Shadow Path Registry (explicitly non-evidence unless promoted)
- Legacy Artifact Governance (retention + reference ban by default)

- Global Path Canon: docs/governance/GLOBAL_PATH_CANON.md
- Governance Audit Record (FULL): memory/briefs/CURRENT.md (section: Governance Audit Record)
  - 注意：`./tmp/audit/*` 只能當暫存輸出；FULL 記錄以 CURRENT 為準
