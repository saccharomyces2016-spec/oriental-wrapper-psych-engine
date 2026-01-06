# Single Source Rules（單一真相來源）

## CHAT_PACKET
- 唯一來源：
  xuance-commander-core/out/CHAT_PACKET.md
- 禁止任何 ./out/ 或相對路徑引用

## ROLE_*_SYNC_PACKET
- 唯一來源：
  xuance-commander-core/memory/briefs/role_sync_packets/LATEST/
- out/role_sync_packets 僅為輸出鏡像，不得引用

## Advisor Packs（時間戳）
- 所有 advisor_packs 必須：
  - 使用時間戳目錄
  - 並建立 LATEST 指向最新版本
- 不得直接人工判斷最新時間戳
