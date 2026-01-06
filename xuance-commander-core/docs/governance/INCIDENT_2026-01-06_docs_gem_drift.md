# Incident Report — docs/gem Drift (2026-01-06)

## Summary（發生了什麼）
在 repo 中同時出現多個 `docs/gem` 路徑：
- `./docs/gem`（repo root）
- `xuance-commander-core/docs/gem`（正確）
- `xuance-commander-core/prompts/gem`（模板）

導致顧問證據（GEM runs）存在「可能被寫入錯誤路徑」的風險。

## Impact（風險）
- SSOT 破壞：指揮官可能引用錯誤證據
- 後期回補成本極高（需人工比對）
- Cursor / AI 無法可靠判斷哪個才是正式證據

## Root Cause（根因）
- 早期制度只定義「應該放哪」，但沒有：
  - 明確「禁止路徑」
  - 自動化 drift 偵測工具
- docs 層級治理硬度不足，允許「沉默漂移」

## Resolution（已採取行動）
- 移除 repo root 的漂移 `docs/gem`
- 明確定義 GEM Canon Rule
- 新增 `audit_docs_gem_drift.sh` 作為可重跑驗證

## Prevention（防止再犯）
- docs/gem 單一真相來源寫入治理文本
- 未來任何 GEM 引用必須可被 audit tool 驗證
- 若 audit FAIL，視為硬阻斷，不得推進主線

## Status
- Resolved
- Governance gap sealed (v1)
# INCIDENT: 2026-01-06 docs/gem governance drift

## 問題
docs/gem 與 governance 類文件在多個路徑生成，造成 Canon 不明。

## 原因
缺乏全域檔案 Canon 與 artifact 登錄強制規則。

## 處理
- 建立 GLOBAL_FILE_CANON
- 建立 ARTIFACT_REGISTRY_RULE
- 建立 STATELESS_CONTINUITY_RULE
- 封板並提交

## 結果
治理基準已固定；同類問題視為違規。
