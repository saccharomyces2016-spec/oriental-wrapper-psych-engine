# docs/gem Canon Rule（GEM 證據落點單一真相來源）

## 目的
避免顧問證據（GEM runs/briefs/profiles）被寫到錯誤路徑，造成：
- 版本漂移（drift）
- 指揮官/顧問引用失真
- 後期回補成本爆炸

## 單一真相來源（SSOT）
本專案中，所有 GEM 相關資料「唯一合法路徑」為：

- `xuance-commander-core/docs/gem/`
  - `briefs/`：顧問輸入 brief（研究萃取後的短輸入）
  - `profiles/`：顧問角色設定（GEM profile）
  - `runs/`：顧問輸出（建議稿，必須可追溯）

提示模板（不是 evidence 落點）：
- `xuance-commander-core/prompts/gem/`

## 非法路徑（嚴格禁止）
以下路徑一律視為「漂移副本」，不得寫入：
- `./docs/gem`（repo root 底下的 docs/gem）
- 任何其他 `*/docs/gem`（除 `xuance-commander-core/docs/gem` 以外）

## 執行規則
1) 若發現漂移副本：
   - 先確認是否為空壳（例如只有 `.DS_Store` 或空資料夾）
   - 空壳：可直接刪除
   - 非空：不得自動刪除；必須先人工裁決「搬移/合併/棄置」
2) 所有對外引用（ROADMAP/CURRENT/DECISION）必須指向：
   - `xuance-commander-core/docs/gem/runs/...`

## 必備驗收
- `find . -path "*/docs/gem" -maxdepth 4` 只允許出現：
  - `./xuance-commander-core/docs/gem`
  - `./xuance-commander-core/prompts/gem`

## 工具（可重跑）
- `bash xuance-commander-core/tools/audit_docs_gem_drift.sh`
