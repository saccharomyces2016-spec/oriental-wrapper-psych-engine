# P0-4｜Failure Audit Rules（失敗審計規則｜MVP）

## Failure categories
- F1: Metaphor collapse（隱喻崩壞/混用）
- F2: Modern term leakage（現代詞污染）
- F3: Event prediction（斷事實/斷事件）
- F4: Directive leakage（下具體決策指令）
- F5: Safety exit missing（高風險未收束到 L4 模板）
- F6: Tone violation（恐嚇/宿命/羞辱）

## What to do when fail
- 只允許：修正白名單/禁用詞/出口模板/重寫守門規則
- 不允許：改 L1–L4 結構（除非開新 phase 決策）
