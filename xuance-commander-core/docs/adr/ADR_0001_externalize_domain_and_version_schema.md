# ADR 0001 - Externalize Domain Content & Versioned Schemas

## Status
Accepted

## Context
若把題目/規則/建議/敘事寫死在程式碼中，後期擴充時會大量修改同一檔案，造成 merge conflicts 與行為不可預測。
同時「文本記憶」會越來越大，必須採用小檔索引與指向式記憶，降低傳輸與同步成本。

## Decision
1) 引擎 code 固定且精簡；內容（questions/scoring/reco/narr/risk）全部外置化到 domain/ 分檔
2) 用 manifest 指向各分檔，build 時 compile 成 compiled facet
3) schema 固定並版本化（domainVersion），任何變更需新增 ADR 與 bump version
4) 用 golden tests 固定輸入輸出，確保新增內容不破壞既有行為
5) 記憶採小檔索引：INDEX + CURRENT + CHANGELOG + ADR，避免單一巨大文本

## Consequences
- 優點：後期新增多為新增檔案，降低衝突；行為可驗收可回歸
- 代價：需要 compile 步驟；需要維護 schema/manifest

## Verification
- 新增 facet 時可只新增 domain 檔案與 manifest，不必改引擎
- build/compile_all.sh 可成功編譯所有 manifests
- tests/run_golden.sh 通過
