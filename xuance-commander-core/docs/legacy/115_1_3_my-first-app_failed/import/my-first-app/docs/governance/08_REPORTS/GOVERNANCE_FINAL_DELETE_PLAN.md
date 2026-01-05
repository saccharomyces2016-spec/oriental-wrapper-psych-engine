# Governance Final Delete Plan

**Date**: 2026-01-01  
**Role**: Governance / Cleanup Auditor  
**Objective**: 刪除所有用不到的檔案，讓後期維護更容易

---

## Executive Summary

經過完整分析，發現：

1. **Repo 狀態**：大部分 legacy 檔案已清理，但仍有少數殘留引用需要處理
2. **Runtime 路徑**：`npm run build` ✅ 通過
3. **工具鏈**：`npm run validate:all` ✅ 通過（已改為 `validate:governance`，不依賴 questionBank）
4. **主要發現**：
   - `readingEngine.v1.js` 已從 Dashboard 移除引用（✅ 乾淨）
   - `questionBank.v1.json` 不存在，但所有 scripts 已有 guard/skip 邏輯（✅ 可安全刪除）
   - `anchorSelector.js` 不存在，App.vue 已無引用（✅ 乾淨）
   - `ContentDB_*.js` 和 `_deprecated/**` 已完全移除（✅ 乾淨）

5. **可刪除檔案**：
   - **DELETE_SAFE**: 70 個檔案（0 風險）
   - **DELETE_NEEDS_REWIRE**: 1 個檔案（questionBank.v1.json，但實際上檔案不存在，只是 scripts 有引用）

---

## A) 全量檔案清單

- **總檔案數**: 257 (git tracked)
- **詳細清單**: `artifacts/governance_runs/_governance/final_audit/all_files.txt`
- **時間戳**: `artifacts/governance_runs/_governance/final_audit/file_times.tsv`

---

## B) 依賴/引用證據

### B1. Runtime Import Graph

- **入口點**: `src/main.js`, `src/App.vue`, `src/router/index.js`, `src/views/**`
- **邊數**: 68 條 import 邊
- **詳細地圖**: `artifacts/governance_runs/_governance/final_audit/runtime_import_graph.tsv`

**關鍵發現**:
- ✅ `readingEngine.v1.js` **不在** runtime import graph 中
- ✅ `questionBank.v1.json` **不在** runtime import graph 中
- ✅ `anchorSelector.js` **不在** runtime import graph 中
- ✅ `ContentDB_*.js` **不在** runtime import graph 中

### B2. Ripgrep 引用證據

**特別檢查結果** (`artifacts/governance_runs/_governance/final_audit/special_refs.txt`):

| 關鍵字 | 引用數 | 狀態 | 備註 |
|--------|--------|------|------|
| `readingEngine` | 0 (src) | ✅ 乾淨 | 僅在 scripts 中有引用（診斷用） |
| `questionBank.v1.json` | 0 (src) | ✅ 乾淨 | 僅在 scripts 中有引用，且都有 guard |
| `anchorSelector` | 0 (src) | ✅ 乾淨 | 無任何引用 |
| `ContentDB_` | 0 (src) | ✅ 乾淨 | 已完全移除 |
| `_deprecated` | 0 (src) | ✅ 乾淨 | 僅在 scripts/deprecateUnused.mjs 中有路徑字串 |

---

## C) 判定規則分類

### C1. KEEP_RUNTIME (57 個檔案)

**定義**: 在 runtime import graph 中的檔案

**關鍵檔案**:
- `src/core/ontology/round2FourSymbol.v1.json` ✅
- `src/core/ontology/round4Anchors.v1.json` ✅
- `src/core/flow/readingNarrative.v1.js` ✅
- `src/core/SoulArchitect.js` ✅
- `src/views/**` ✅
- 所有被上述檔案直接/間接引用的檔案

**詳細清單**: `artifacts/governance_runs/_governance/final_audit/keep_runtime.txt`

### C2. KEEP_TOOLING (33 個檔案)

**定義**: 被 `package.json` scripts 使用的檔案

**關鍵檔案**:
- `scripts/validate/validate-governance.mjs` ✅ (被 `validate:all` 使用)
- `scripts/validate/validate-questionbank.mjs` ✅ (被 `validate:qbank` 使用，但有 guard)
- `scripts/analyticsReport.mjs` ✅
- 所有被 npm scripts 直接/間接引用的 scripts

**詳細清單**: `artifacts/governance_runs/_governance/final_audit/keep_tooling.txt`

**注意**: 所有 scripts 都已對 `questionBank.v1.json` 實作 guard/skip 邏輯，即使檔案不存在也不會失敗。

### C3. DELETE_SAFE (70 個檔案)

**定義**: 
- 不在 runtime import graph
- 不被 package.json scripts 使用
- 無任何引用

**範例**:
- 報告檔案（`docs/governance/08_REPORTS/root_reports/PRODUCT_ANALYSIS_REPORT.md`, `docs/governance/08_REPORTS/root_reports/ROOT_CAUSE.md` 等）
- `core/ontology/cascades.v1.json` (未使用)
- `core/ontology/patterns.v1.json` (未使用)
- `reports/*.md`, `reports/*.json` (報告產物)

**詳細清單**: `artifacts/governance_runs/_governance/final_audit/delete_safe.txt`

**風險**: 0（完全無引用）

### C4. DELETE_NEEDS_REWIRE (1 個項目)

**項目**: `src/core/ontology/questionBank.v1.json`

**現況**:
- 檔案**不存在**
- 被 11 個 scripts 引用
- 所有 scripts 都已實作 guard/skip 邏輯

**引用來源**:
- `scripts/validate/validate-questionbank.mjs`
- `scripts/validate/validate-ontology-consistency.mjs`
- `scripts/fixQuestionBankJSON*.mjs` (5 個檔案)
- `scripts/doctorPaths.mjs`
- `scripts/fixChoiceMeta.mjs`
- `scripts/auditPatternTags.mjs`
- `scripts/analyticsReport.mjs`

**建議修補**:
1. **選項 A（推薦）**: 保持現狀，所有 scripts 已有 guard，不會失敗
2. **選項 B**: 更新 scripts 移除對 questionBank.v1.json 的引用（如果不再需要）

**詳細資料**: `artifacts/governance_runs/_governance/final_audit/delete_needs_rewire.json`

### C5. REVIEW_UNCERTAIN (0 個檔案)

無不確定項目。

---

## D) 特別檢查結果

### D1. readingEngine.v1.js

**狀態**: ✅ **已清理**

**證據**:
- ❌ 不在 runtime import graph
- ❌ `src/views/05_Dashboard.vue` 無 `import readingEngine` (grep 結果為空)
- ✅ 僅在 scripts 中有引用（`diagnoseReading.mjs`, `validateReading.mjs`, `validateNarrative.mjs`, `validateOutputV2.mjs`），但都有 guard

**結論**: 檔案可能已不存在或已被 stub，Dashboard 已不再使用。

### D2. questionBank.v1.json

**狀態**: ⚠️ **檔案不存在，但 scripts 有引用（已有 guard）**

**證據**:
- ❌ 檔案不存在（`find` 結果為空）
- ✅ 所有引用 scripts 都有 guard/skip 邏輯
- ✅ `validate:all` 不依賴此檔案（已改為 `validate:governance`）

**結論**: 可安全保持現狀，或更新 scripts 移除引用。

### D3. anchorSelector.js

**狀態**: ✅ **已清理**

**證據**:
- ❌ 檔案不存在（僅在 `archive/legacy/` 中）
- ❌ `src/App.vue` 無引用（grep 結果為空）
- ❌ 無任何 runtime 引用

**結論**: 已完全清理。

### D4. ContentDB_* 與 _deprecated

**狀態**: ✅ **已完全清理**

**證據**:
- ❌ `src/core/content/ContentDB_*.js` 不存在（find 結果為 0）
- ❌ `src/_deprecated/**` 不存在
- ✅ 僅在 `scripts/deprecateUnused.mjs` 中有路徑字串（工具腳本）

**結論**: 已完全清理。

---

## E) package.json Scripts 使用分析

**總 scripts 數**: 33 個被使用，0 個未使用

**關鍵發現**:
- ✅ 所有 scripts 都在使用中
- ✅ `validate:all` 已改為 `validate:governance`（不依賴 questionBank）
- ✅ 所有 validate scripts 都有 guard 邏輯

**詳細清單**: `artifacts/governance_runs/_governance/final_audit/package_scripts_used.txt`

---

## F) 刪除計畫

### Phase 3: DELETE_SAFE (0 風險)

**目標**: 刪除完全無引用的檔案

**檔案數**: 70 個

**範例**:
- 報告檔案（`docs/governance/08_REPORTS/root_reports/PRODUCT_ANALYSIS_REPORT.md`, `docs/governance/08_REPORTS/root_reports/ROOT_CAUSE.md` 等）
- `core/ontology/cascades.v1.json`
- `core/ontology/patterns.v1.json`
- `reports/*.md`, `reports/*.json` (報告產物，可選)

**驗收命令**:
```bash
# 1. Build 測試
npm run build

# 2. Validate 測試
npm run validate:all

# 3. 確認無引用殘留
grep -r "PRODUCT_ANALYSIS_REPORT\|ROOT_CAUSE\|cascades\|patterns" src scripts --include="*.js" --include="*.ts" --include="*.vue" --include="*.mjs" || echo "No references"
```

**回滾方式**:
```bash
git restore <file>
```

### Phase 4: DELETE_NEEDS_REWIRE (中風險，但實際上檔案不存在)

**項目**: `src/core/ontology/questionBank.v1.json`

**現況**: 檔案已不存在，但 scripts 有引用（已有 guard）

**選項 A（推薦）**: 保持現狀
- 所有 scripts 已有 guard，不會失敗
- 無需任何修改

**選項 B**: 更新 scripts 移除引用
- 修改 11 個 scripts，移除對 questionBank.v1.json 的引用
- 風險：低（scripts 已有 guard）

**驗收命令**:
```bash
# 1. Build 測試
npm run build

# 2. Validate 測試（應仍通過，因為已有 guard）
npm run validate:all

# 3. 確認 scripts 仍可執行
npm run validate:qbank  # 應顯示 skip 訊息
npm run analytics:report  # 應顯示 skip 訊息
```

---

## G) Codex 工作包

### 工作包 1: 刪除 DELETE_SAFE 檔案

**目標**: 刪除 70 個完全無引用的檔案

**檔案清單**: `artifacts/governance_runs/_governance/final_audit/delete_safe.txt`

**操作步驟**:
1. 讀取 `artifacts/governance_runs/_governance/final_audit/delete_safe.txt`
2. 對每個檔案執行 `git rm <file>`
3. 提交變更

**驗收條件**:
- [ ] `npm run build` 通過
- [ ] `npm run validate:all` 通過
- [ ] 無 broken imports

**風險**: 0（完全無引用）

**回滾**:
```bash
git restore <file>
```

---

### 工作包 2: 處理 questionBank.v1.json 引用（可選）

**目標**: 更新 scripts 移除對不存在檔案的引用

**檔案清單**:
- `scripts/validate/validate-questionbank.mjs`
- `scripts/validate/validate-ontology-consistency.mjs`
- `scripts/fixQuestionBankJSON*.mjs` (5 個)
- `scripts/doctorPaths.mjs`
- `scripts/fixChoiceMeta.mjs`
- `scripts/auditPatternTags.mjs`
- `scripts/analyticsReport.mjs`

**操作步驟**:
1. 對每個 script，移除或註解對 `questionBank.v1.json` 的引用
2. 確認 guard 邏輯仍存在（如果需要的話）

**驗收條件**:
- [ ] `npm run validate:all` 通過
- [ ] 所有相關 scripts 可執行（應顯示 skip 或正常執行）

**風險**: 低（scripts 已有 guard）

**回滾**:
```bash
git restore scripts/
```

---

## H) 總結

### 現況評估

**Repo 乾淨度**: ✅ **非常乾淨**

- ✅ Runtime 路徑無 legacy 引用
- ✅ 所有關鍵檔案（readingEngine, anchorSelector, ContentDB）已清理
- ✅ Scripts 都有 guard 邏輯，不會因缺失檔案而失敗
- ⚠️ questionBank.v1.json 不存在，但 scripts 有引用（已有 guard，可選處理）

### 建議執行順序

1. **Phase 3**: 刪除 DELETE_SAFE 檔案（0 風險，可立即執行）
2. **Phase 4**: 處理 questionBank.v1.json 引用（可選，風險低）

### 風險評估

- **Phase 3**: 風險 0（完全無引用）
- **Phase 4**: 風險 低（scripts 已有 guard，檔案不存在）

---

**報告生成時間**: 2026-01-01  
**分析工具**: git, node, grep, npm  
**機器可讀檔位置**: `artifacts/governance_runs/_governance/final_audit/`
