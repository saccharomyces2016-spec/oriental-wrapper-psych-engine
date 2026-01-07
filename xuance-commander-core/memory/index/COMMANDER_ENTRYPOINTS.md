# Commander Entrypoints（指揮官必讀入口，只讀這些就夠）

每次開始任何工作，先讀這 5 個檔（小檔、穩定）：
1) memory/index/INDEX.md
2) memory/index/COMMANDER_ENTRYPOINTS.md
3) memory/briefs/CURRENT.md
4) memory/changes/CHANGELOG.md
5) docs/adr/ 最新一份 ADR（依日期/編號）

若需要 domain 細節：
- domain/manifests/（先讀 manifest 再去找分檔）
- domain/compiled/（優先讀 compiled，避免掃一堆小檔）

強制規則：
- 不允許「我記得之前…」；一律以以上檔案為準

## 每次開始工作前的硬規則
- 必須先跑：tools/preflight.sh
- 然後必讀：memory/briefs/COMMAND_BRIEF.md
- 未跑 preflight / 未讀 COMMAND_BRIEF -> 不得開始做任何決策或產出指令包

## 缺資料時的最低要求（替代上傳整包）
- 先索取 xuance-commander-core/out/CHAT_PACKET.md
- 生成方式：bash tools/export_chat_packet.sh .
