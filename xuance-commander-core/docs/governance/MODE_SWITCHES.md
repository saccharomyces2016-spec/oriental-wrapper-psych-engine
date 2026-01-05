# MODE SWITCHES（自動判斷｜不需人工操作）

判斷來源（優先序）：
1) ROADMAP
2) CURRENT
3) 任務類型（facet / legacy / seal）

## 規則
- 若 ROADMAP 指向 P0-2 → MODE=M02
- 若引用 legacy → MODE=M03
- 若宣告完成 → MODE=M04
- 否則 → MODE=M01
