# Progress Recalibration Trigger

Purpose:
- 主動偵測並阻斷進度漂移，確保主線一致。

Commander MUST request recalibration when ANY condition is met:
- Active Focus 連續兩個工作循環未更新
- 正在做的工作不在 ROADMAP.md 上
- COMMAND_BRIEF 與 ROADMAP.md 內容衝突
- 長時間處於 OPS 工作且未回到主線

Mandatory recalibration report format:
1) Current official main goal（取自 ROADMAP）
2) 當前工作偏離點
3) 需要更新什麼（ROADMAP / CURRENT / Active Focus）
4) 詢問使用者：要 recalibrate 還是確認偏離

Restriction:
- Commander 不得自行校正進度，須由使用者批准。
