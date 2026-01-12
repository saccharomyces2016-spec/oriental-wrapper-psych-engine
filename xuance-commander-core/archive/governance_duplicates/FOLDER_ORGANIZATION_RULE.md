# 資料夾組織規範（Folder Organization Rule）

**建立日期**：2026-01-11  
**狀態**：ACTIVE  
**適用範圍**：整個專案

---

## 一、資料夾結構原則

### 1.1 核心原則

1. **功能分離**：不同功能類型的文件放在不同目錄
2. **階段分離**：階段任務文件放在對應的階段任務目錄
3. **文檔集中**：所有文檔集中在 `docs/` 目錄
4. **代碼集中**：所有代碼集中在對應的功能目錄（engine、domain、schemas、tests、ui）

### 1.2 目錄層級

```
xuance-commander-core/
├── charter/              # 專案憲章（最高目標與限制）
├── roadmap/              # 專案路線圖
├── docs/                 # 文檔目錄（所有文檔）
├── domain/               # 領域數據
├── engine/               # 引擎代碼
├── schemas/              # Schema 定義
├── tests/                # 測試文件
├── ui/                   # UI 代碼
├── tools/                # 工具腳本
├── memory/               # 記憶管理
└── P{階段}-{子任務}_{名稱}/  # 階段任務目錄
```

---

## 二、階段任務目錄規範

### 2.1 命名規範

**格式**：`P{階段編號}-{子任務編號}_{任務名稱}/`

**範例**：
- `P0-5.6_ICHING_MATRIX_IMPLEMENTATION/`
- `P0-5.7_WORLDVIEW_DESIGN/`
- `P1-1_USER_VALIDATION_PLAN/`

**規則**：
- 階段編號：數字（如 0、1、2）
- 子任務編號：數字或數字.數字（如 5、5.5、5.6）
- 任務名稱：大寫英文，使用底線分隔
- 位置：專案根目錄

### 2.2 目錄內容

階段任務目錄應包含：
- 任務包文件（`*_TASK_PACKET.md`）
- 執行日誌（`*_PHASE_LOG.md` 或 `*_EXECUTION_LOG.md`）
- 結案報告（`*_CLOSURE_REPORT.md` 或 `*_COMPLETION_REPORT.md`）
- 其他相關文件（審計報告、驗證報告等）

### 2.3 當前階段任務目錄

- `P0-3/` - 敘事銳利度與安全邊界
- `P0-4/` - Facet 可移植性驗證
- `P0-4.5/` - 題目流程與分流系統設計
- `P0-5/` - 最小 UI 串接
- `P0-5.5_ORIENTAL_ELEMENT_CONSULTATION/` - 東方玄學元素選擇諮詢
- `P0-5.6_ICHING_MATRIX_IMPLEMENTATION/` - 易經矩陣系統實作
- `P0-5.7_WORLDVIEW_DESIGN/` - 最小世界觀設計

---

## 三、核心功能目錄規範

### 3.1 engine/ 目錄

**用途**：存放引擎代碼

**文件類型**：
- Python 代碼文件（`.py`）
- 引擎相關的實作文件

**範例**：
- `engine/score_facet.py`
- `engine/root_element_mapper.py`
- `engine/hexagram_deriver.py`
- `engine/collision_calculator.py`

### 3.2 domain/ 目錄

**用途**：存放領域數據

**子目錄**：
- `domain/compiled/` - 編譯後的數據
- `domain/facets/` - Facet 定義
- `domain/manifests/` - 清單文件
- `domain/narratives/` - 敘事數據
- `domain/recommendations/` - 建議數據
- `domain/riskchains/` - 風險鏈數據

### 3.3 schemas/ 目錄

**用途**：存放 Schema 定義文件

**文件類型**：
- JSON Schema 文件（`.json`）

**範例**：
- `schemas/umip_schema_v1.json`
- `schemas/umip_schema_v1.1.json`
- `schemas/domain_manifest.schema.json`

### 3.4 tests/ 目錄

**用途**：存放測試文件

**文件類型**：
- Python 測試文件（`test_*.py`）
- 測試數據文件（`.json` 等）

**範例**：
- `tests/test_unit_root_mapper.py`
- `tests/test_integration_dual_compute.py`
- `tests/golden/` - Golden Tests 數據

### 3.5 ui/ 目錄

**用途**：存放 UI 代碼

**文件類型**：
- TypeScript/React 代碼文件
- 樣式文件
- 配置文件

---

## 四、文檔目錄規範

### 4.1 docs/ 目錄結構

```
docs/
├── adr/                  # 架構決策記錄
├── domain/               # 領域規格
├── gem/                  # 顧問角色相關
├── governance/           # 治理制度（包括本文件）
├── ops/                  # 運維相關
├── process/              # 流程相關
├── product/              # 產品相關
└── ...
```

### 4.2 文檔文件放置規則

1. **治理制度**：放在 `docs/governance/`
2. **架構決策**：放在 `docs/adr/`
3. **領域規格**：放在 `docs/domain/`
4. **運維相關**：放在 `docs/ops/`
5. **流程相關**：放在 `docs/process/`
6. **產品相關**：放在 `docs/product/`

### 4.3 memory/ 目錄

**用途**：記憶管理

**子目錄**：
- `memory/briefs/` - 簡報文件
- `memory/changes/` - 變更記錄
- `memory/index/` - 索引文件
- `memory/state/` - 狀態文件

---

## 五、文件命名規範

### 5.1 階段任務文件命名

**格式**：`{階段編號}-{子任務編號}_{文件類型}.md`

**範例**：
- `P0-5.6_TASK_PACKET.md`
- `P0-5.6_CLOSURE_REPORT.md`
- `P0-5.6_VERIFICATION_REPORT.md`

**文件類型**：
- `TASK_PACKET` - 任務包
- `CLOSURE_REPORT` - 結案報告
- `VERIFICATION_REPORT` - 驗證報告
- `AUDIT_REPORT` - 審計報告
- `COMPLETION_REPORT` - 完成報告
- `PHASE_LOG` - 階段日誌
- `EXECUTION_LOG` - 執行日誌

### 5.2 Schema 文件命名

**格式**：`{名稱}_schema_v{版本}.json`

**範例**：
- `umip_schema_v1.json`
- `umip_schema_v1.1.json`
- `domain_manifest.schema.json`

### 5.3 測試文件命名

**格式**：`test_{類型}_{名稱}.py`

**範例**：
- `test_unit_root_mapper.py`
- `test_integration_dual_compute.py`
- `test_golden_cases.py`

---

## 六、特殊文件位置

### 6.1 專案根目錄文件

**可以放在根目錄的文件**：
- `README.md` - 專案說明
- `PROGRESS_ANALYSIS_*.md` - 進度分析報告
- `MASTER_PROGRESS_REVIEW_*.md` - 整體進度檢討報告
- `FOLDER_HEALTH_CHECK_*.md` - 資料夾健康檢查報告
- `NEXT_TASK_RECOMMENDATION.md` - 下一步任務建議

### 6.2 階段任務目錄文件

**階段任務目錄應包含的文件**：
- 任務包相關文件
- 執行日誌
- 結案報告
- 驗證報告
- 審計報告

---

## 七、檢查與維護

### 7.1 定期檢查

**建議**：每個階段任務完成後進行資料夾健康檢查

**檢查項目**：
1. 階段任務目錄命名是否符合規範
2. 文件是否放在正確的位置
3. 是否有未歸類的文件
4. 目錄結構是否清晰

### 7.2 維護原則

1. **保持一致性**：所有階段任務目錄使用相同的命名格式
2. **及時整理**：新文件建立時立即放到正確位置
3. **定期檢查**：每個階段任務完成後檢查資料夾結構
4. **記錄變更**：如果有結構調整，記錄在 `memory/changes/CHANGELOG.md`

---

## 八、相關文件

- `memory/index/INDEX.md` - 索引文件
- `docs/governance/` - 其他治理制度文件
- `FOLDER_HEALTH_CHECK_*.md` - 資料夾健康檢查報告

---

**文件狀態**：ACTIVE  
**建立日期**：2026-01-11  
**最後更新**：2026-01-11
