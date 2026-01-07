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


## Execution Target｜貼哪裡才對（避免貼錯造成 Terminal exit 127）

<!-- XUANCE_TRUNCATION_GUARD_BEGIN -->


## 指令包交付防截斷規則（Chat / UI Truncation Guard）

問題：Chat/介面可能截斷「很長的 code block」，導致貼到 Terminal 只是一半 → 直接失敗。

硬規則（之後一律照做）：
1) 只要指令包 >= 80 行、或混合 shell+python、或包含多段 heredoc：不得在 Chat 交付全文。
2) 一律改成「兩段式交付」：
   - A 段（短 bootstrap）：貼到 Terminal 就能跑，負責驗證 pack 檔案存在與摘要。
   - B 段（完整 pack）：由 Cursor 在本機寫入固定路徑（建議 tmp/audit/packs/<name>.sh 或 /tmp/<name>.sh），不走 Chat 複製。
3) 驗收：bootstrap 必須印出 pack 的「路徑 + 行數 + hash」，用來抓截斷/貼錯。

標準 bootstrap（只允許貼這段到 Terminal）：
```bash
set -euo pipefail
PACK_PATH="/tmp/xc_pack.sh"

test -f "$PACK_PATH" || (echo "[ERR] Missing pack: $PACK_PATH" && exit 1)
echo "PACK=$PACK_PATH"
echo "LINES=$(wc -l < "$PACK_PATH" | tr -d ' ')"
if command -v shasum >/dev/null 2>&1; then
  echo "SHA256=$(shasum -a 256 "$PACK_PATH" | awk '{print $1}')"
else
  echo "SHA256=$(sha256sum "$PACK_PATH" | awk '{print $1}')"
fi

bash "$PACK_PATH"
```
備註：
- 要可追溯：pack 改存 repo：tmp/audit/packs/，並把「路徑 + hash」寫進 VERIFICATION_PACK。
<!-- XUANCE_TRUNCATION_GUARD_END -->

- **Terminal**：只能貼純 shell 指令（建議用「腳本式指令包」模板）。
- **Cursor AI**：適合貼「需要本機盤點/彙整/檢查」的需求，並要求它先跑只讀盤點。
- **Codex**：只在落點與規則位置已被 evidence 確認後，用來做一次性修補。
- **ChatGPT（指揮官）**：只做判斷與規格化，不直接宣稱已改到本機。

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



## 禁止行為
- AI 不得擅自新增更高層級目標
- AI 不得擅自增加不可接受的限制
- AI 不得基於「我覺得更好」改寫主線

## 強制行為
- 每次完成任務驗收後：必須在 MASTER_MIN / CURRENT 留下「進度百分比 + 下一個檢查點」的可讀摘要
- 每次開始任何工作前，必須先跑 preflight（tools/preflight.sh）
- preflight 會生成 memory/briefs/COMMAND_BRIEF.md
- 指揮官之後的所有決策與建議必須基於 COMMAND_BRIEF.md
- 預設證據來源：REPO_STATUS / LAST_COMMAND_STATUS / LATEST_VERIFICATION_PACK（對話中不貼長輸出）
- 若證據缺失或過期：先要求 Cursor 重新生成 REPO_STATUS + VERIFICATION_PACK；未補齊前不得提出修復方案

- 證據回報預設走「自動快照」：除非指揮官明確要求，否則不要要求使用者手動貼 terminal 輸出；以 LAST_COMMAND_STATUS / REPO_STATUS / LATEST_VERIFICATION_PACK / MASTER_MIN 作為回報依據
- 當需要驗收時，指揮官必須提供「可重跑指令包」來自動產出證據（寫入 LAST_COMMAND_STATUS + 更新 LATEST_VERIFICATION_PACK/MASTER），使用者只需執行完後貼最新 MASTER_MIN（或回覆 done 並附 MASTER_MIN）
- 治理/制度性改動的施工前檢查：優先由 Cursor 先做本機彙整與檢查（路徑/重複/索引/缺檔/未追蹤檔案），輸出報告後，指揮官才可下達修復指令包與寫入文本
- 會話紀錄硬規則：每回合結束必須把（計畫/指令/結果/阻塞）寫入文本（CURRENT/CHANGELOG/必要時 governance），下一回合必須輸出可直接執行的指令包以更新文本與驗收


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

---
## 執行環境標註（Execution Target Declaration｜硬規則）

- 每一個「指令包 / 操作建議」，**必須明確標註執行對象**：
  - Cursor + Terminal（本機）
  - Codex（一次性代碼修復）
  - NO RUN（僅制度/決策，先寫文本）

- 未標註執行對象的指令包，**視為不合格，不得執行**。

- 涉及以下類型，**預設一律使用 Cursor + Terminal**：
  - 文本治理（.md）
  - 規則／制度新增或調整
  - 流程文件（TASK / GOVERNANCE / RULES）
  - 需要 grep / git status / git diff 驗收者

- Codex 僅限用於：
  - 已明確定義修改範圍與內容的程式碼修復
  - 不涉及制度判斷與文本治理的情境

## Cursor 能力邊界（策略層補檢）
- Cursor 不自動處理：語義層衝突／跨文件策略衝突／歷史意圖偏離
- 必依 `docs/governance/CURSOR_LIMITATION_REVIEW_RULE.md` 於關鍵節點回檢

## Boss Mode｜回報層級限制（治理規則）

- 預設模式：**老闆模式（Boss Mode）**
- AI 回覆必須遵守：
  - 用白話摘要
  - 不展開實作細節
  - 不教使用者怎麼跑指令
- 若需要技術細節，必須明確被要求，否則禁止主動補充。

