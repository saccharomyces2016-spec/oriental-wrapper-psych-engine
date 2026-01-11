# 任務包：P0-4 Facet Portability & Stress Test

**生成時間**：2026-01-09  
**任務編號**：P0-4  
**目標 Facet**：`relationship_imbalance`  
**優先級**：P0（阻斷 P0-4 封板）

---

## 1. 任務目標（Task Goal）

### 一句話目標
為 `relationship_imbalance` facet 驗證 P0-3 的「引擎 × 玄學外皮」結構是否能在第二個 Facet 上「零改動搬移」且不崩壞。

### 預期成果
完成後應該產出：
1. **主隱喻（1 個）**與次隱喻白名單（可機器檢查）
2. **relationship_imbalance 專用禁用詞擴充**（可 grep）
3. **高風險 L4 固定出口模板**（1–2 條）
4. **驗證結果**：確認 P0-3 結構可被複用，對外輸出無現代污染詞，高風險出口模板可觸發且可收束

---

## 2. 專案歷史摘要（Project History Summary）

### 2.1 過去執行歷史（Past Execution History）

#### 最近完成的任務（最近 3-5 個）

**P0-3 Narrative Sharpness / Esoteric Precision**（✅ READY_FOR_FREEZE）
- **完成狀態**：所有阻斷點已完成，可封版
- **關鍵成果**：
  - R1：敘事銳利度指標 M1–M4 + Critical Fail 規則
  - R2：L1–L4 敘事骨架 + 插槽規格 + Lexicon v1 + 次隱喻白名單和機器化檢查規則
  - R4：安全稽核清單 + 自動轉譯護欄（Rewrite Guards）+ 禁用詞機器化（中英 + 同義變體）+ L4 高風險出口模板
- **關鍵決策**：
  - 採用「歲時農耕・倉廩觀」作為 `income_expansion_pressure` 的主隱喻
  - 建立次隱喻白名單和機器化檢查規則（每段最多 1 個；禁止角色場景替換；禁用詞 Regex）
  - 建立禁用詞機器化檢查（心理/醫療、金融/管理、具體人生指令、宿命/恐嚇）
  - 建立 L4 高風險出口模板（不恐嚇、不宿命、不下具體決策指令）
  - **明確排除 R3 和 R5**：具體行動建議內容（R2/R3）不在 P0-3 範圍內
- **詳細記錄**：
  - `docs/ops/TASK_RECORDS_SUMMARY.md`（P0-3 詳細摘要）
  - `P0-3/P0-3_COMPLETE_STATUS.md`（P0-3 完整狀態）
  - `P0-3/P0-3_FREEZE_READINESS.md`（封版準備狀態）
  - `P0-3/P0-3_FINAL_CHECKLIST.md`（最終檢查清單）
  - `P0-3/P0-3_HANDOFF_SUMMARY.md`（交棒摘要）

**P0-2 Output Contract**（✅ COMPLETED，完成日期：2026-01-07）
- **關鍵成果**：引擎只判斷「狀態」，不判斷「人生」；已完成禁止清單、允許層級、責任邊界
- **詳細記錄**：`docs/domain/output/P0-2_OUTPUT_CONTRACT.md`

**P0-2 Question Design**（✅ COMPLETED，完成日期：2026-01-07）
- **關鍵成果**：5-question symbol-first assessment with integer scoring & gates
- **詳細記錄**：`docs/domain/design/P0_2_PHASE_CLOSURE_SUMMARY.md`

#### 關鍵決策點
1. **P0-3 明確排除 R3 和 R5**：
   - 具體行動建議內容（R2/R3）不在 P0-3 範圍內
   - P0-3 專注於敘事銳利度、隱喻一致性、安全控制
   - 行動建議將在後續階段處理

2. **P0-4 目標是驗證可移植性**：
   - P0-3 建立的結構（L1–L4 cadence + Safety gates + 禁用詞）必須能在第二個 Facet 上「零改動搬移」且不崩壞
   - 這是驗證架構可擴展性的關鍵步驟
   - 成功後才能進行 P0-5（最小 UI 串接）

#### 失敗經驗（如果有）
目前無失敗經驗記錄。

### 2.2 專案整體狀態（Overall Project Status）

#### 整體進度
- **當前階段**：Phase 0 - MVP（單一構面）基礎建設階段
- **整體完成度**：
  - ✅ P0-1：選定第一個構面（facet）— `income_expansion_pressure`（已完成）
  - ✅ P0-2：Output Contract + Question Design（已完成）
  - ✅ P0-3：Narrative Sharpness / Esoteric Precision（READY_FOR_FREEZE）
  - 🔄 P0-4：Facet Portability & Stress Test（進行中）
  - ⏳ P0-5：最小 UI 串接（占位，不優化，待 P0-4 完成後）

#### 階段性目標
- **當前階段**：P0-4 Facet Portability & Stress Test
- **已完成**：
  - P0-1（Facet 選定）
  - P0-2（Output Contract、Question Design）
  - P0-3（Narrative Sharpness - READY_FOR_FREEZE）
- **待完成**：
  - P0-4（可移植性驗證 - 當前任務）
  - P0-5（最小 UI 串接 - 占位）

#### 整體決策脈絡
P0-4 是為了驗證 P0-3 建立的「引擎 × 玄學外皮」結構可以在第二個 Facet（`relationship_imbalance`）上「零改動搬移」且不崩壞。這對於未來擴充到更多 Facet 至關重要，是驗證架構可擴展性的關鍵步驟。

**與整體目標的關係**：
- 系統最終目標是「打造一個能夠適用於全世界、全文化、全人類、全問題場景的解析、引導與連鎖互動系統」
- 要達到這個目標，必須能夠快速擴充到不同的 Facet（問題場景）
- P0-4 的成功驗證將證明架構的可擴展性，為後續擴充奠定基礎

#### 風險與挑戰
1. **架構可擴展性風險**：
   - 如果 P0-3 的結構無法在第二個 Facet 上複用，可能需要重新設計架構
   - 風險緩解：P0-4 專門驗證可移植性，及早發現問題

2. **隱喻一致性挑戰**：
   - 不同 Facet 需要不同的主隱喻（P0-3 用「歲時農耕・倉廩觀」，P0-4 需要新的主隱喻）
   - 挑戰：如何在保持架構一致的同時，允許 Facet 特定的隱喻
   - 解決方案：主隱喻和次隱喻白名單機制（Facet 限定，不構成全域禁用）

3. **安全控制挑戰**：
   - 不同 Facet 可能有不同的高風險場景
   - 挑戰：如何在不修改架構的情況下，允許 Facet 特定的高風險出口模板
   - 解決方案：L4 高風險出口模板機制（Facet 限定，但遵循相同規則）

### 2.3 未來規劃摘要（Future Planning Summary）

#### 短期任務清單（接下來 1-2 週）
1. **P0-4：Facet Portability & Stress Test**（當前任務，P0，阻斷封板）
   - R2：定義主隱喻 + 次隱喻白名單（machine-check）for `relationship_imbalance`
   - R4：擴充禁用詞 + 提供 L4 高風險出口模板 for `relationship_imbalance`
   - 預計時程：2-3 天（依顧問產出速度而定）

2. **P0-4：Golden Tests 規格**（P1，不阻斷封板）
   - 定義至少 5 條測試：模糊/高壓/誘導/高風險/正常
   - 預計時程：1-2 天

3. **P0-4：封板準備**（P0，阻斷封板）
   - 完成所有驗收標準檢查
   - 生成封板文件
   - 預計時程：1 天

#### 階段性規劃
- **當前階段**：P0-4 Facet Portability & Stress Test
- **下一個階段**：P0-5 最小 UI 串接（占位，不優化，待 P0-4 完成後）
- **目標**：驗證引擎結構的可移植性，為未來擴充到更多 Facet 奠定基礎

#### 決策點
1. **P0-4 封板決策**（預計 2-3 週後）：
   - 需要確認所有驗收標準是否通過
   - 需要確認 Golden Tests 是否通過
   - 需要確認封板文件是否齊全

2. **架構可擴展性決策**（依 P0-4 結果而定）：
   - 如果 P0-4 成功：繼續使用現有架構，進行 P0-5
   - 如果 P0-4 失敗：需要重新評估架構設計，可能需要調整 P0-3 結構

---

## 3. 背景資料（Background）

### 3.1 相關文件

#### 參考 Facet（P0-3）
- **P0-3 Charter**：`P0-3/P0-3_CHARTER.md`（如果存在）
- **P0-3 Facet Brief**：`P0-3/P0-3_FACET_BRIEF.md`（如果存在）
- **P0-3 決策包**：`P0-3/DECISION_PACKET_P0-3.md`
- **P0-3 任務日誌**：`docs/domain/advisory/P0-3_TASK_LOG.md`
- **P0-3 完整狀態**：`P0-3/P0-3_COMPLETE_STATUS.md`

#### P0-3 的關鍵產出（必須參考）
1. **R1 敘事銳利度指標**：
   - `docs/domain/advisory/R1/P0-3_METRICS.md`（R1 Narrative Sharpness Scoring System）
   - 關鍵：M1–M4 指標定義、Critical Fail 規則、Facet-limited 檢查

2. **R2 次隱喻白名單**：
   - `docs/domain/advisory/R2/P0-3_SECONDARY_METAPHOR_WHITELIST.md`（新建）
     - 次隱喻裁決表（航海❌、導航⚠️、蜃樓✅、築屋✅、山路✅）
     - 使用規則：每段最多 1 個；禁止角色場景替換；禁用詞 Regex
     - 允許詞表（導引類、幻象類、修繕類、地形類）
     - 治理定位說明（Facet 限定，不構成全域禁用）
   - `docs/domain/advisory/R2/P0-3_SECONDARY_METAPHOR_RULES.md`（已更新）
     - 治理定位說明
     - 引用詳細規則文件

3. **R4 禁用詞和 L4 高風險出口模板**：
   - `docs/domain/advisory/R4/P0-3_NARRATIVE_BLACKLIST_SSOT.json`（已更新 v2.0）
     - 中英禁用詞（心理/醫療、金融/管理、具體人生指令、宿命/恐嚇）
     - 規則：命中任一詞彙 → 直接 FAIL，不可轉譯補救
   - `docs/domain/advisory/R4/P0-3_BANNED_TERMS_LIST.md`（新建）
     - 人類可讀版本：中文禁用 / 英文禁用 / 檢查規則
     - Regex 規格已提供
   - `docs/domain/output/P0-3_FIELD_TRANSLATION_RULES.md`（新建）
     - 內部概念轉譯表：severity → 氣節/天候/田況；coping → 耕法/農事/作息；attribution → 緣由/根源；risk chain → 流年/走勢
     - 硬規則：內部欄位名不得直接出現在對外輸出
   - `docs/domain/advisory/R4/P0-3_L4_HIGH_RISK_EXIT_TEMPLATES.md`（新建）
     - 模板 A：過熱/強耕/過度消耗場景（「此時田土焦熱，地力已現疲態...」）
     - 模板 B：枯竭/絕望/資源見底場景（「嚴冬封地，萬物蟄伏...」）
     - 硬規則：不恐嚇、不宿命、不下決策指令（辭職/就醫/分手/投資）
     - 保持能動性：給出「宜/忌」姿態，而非絕望宣判

#### 目標 Facet（P0-4）
- **P0-4 Charter**：`xuance-commander-core/P0-4/P0-4_CHARTER.md`
- **P0-4 Facet Brief**：`xuance-commander-core/P0-4/P0-4_FACET_BRIEF.md`
- **P0-4 Portability Plan**：`xuance-commander-core/P0-4/P0-4_PORTABILITY_PLAN.md`
- **P0-4 Phase Log**：`xuance-commander-core/P0-4/P0-4_PHASE_LOG.md`（階段日誌）

#### 治理規範（必須遵守）
- **最終目標**：`FULL/NORTH_STAR.md`（系統最終目標）
- **專案憲章**：`xuance-commander-core/charter/CHARTER.md`（如果存在）
- **資訊分類規則**：`docs/governance/INFORMATION_CLASSIFICATION_RULE.md`
- **任務包規則**：`docs/governance/CURSOR_TASK_PACKAGE_RULE.md`
- **治理隱喻兼容性規則**：`docs/domain/advisory/GOVERNANCE_METAPHOR_COMPATIBILITY_RULE.md`
  - 關鍵：隱喻兼容性基於文明一致性，不構成全域禁用清單
  - Facet 特定的隱喻白名單/禁用詞表是允許的

### 3.2 現狀分析（Current Status）

#### 當前狀態
- **任務狀態**：OPEN（骨架已創建，等待顧問產出）
- **已完成項目**：
  - ✅ P0-4 Charter 已創建（目標、Non-goals、交付物、成功標準）
  - ✅ P0-4 Facet Brief 已創建（Facet 定義、What it is、What it is NOT、Output style、Open items）
  - ✅ P0-4 Portability Plan 已創建（零改動規則、允許變更、遷移步驟、輸出產物）
  - ✅ P0-4 Phase Log 已創建（階段日誌）
  - ✅ P0-4 Golden Tests Spec 已創建（佔位符）
  - ✅ P0-4 Failure Audit Rules 已創建（佔位符）

#### 待完成項目
1. **主隱喻（1 個）與次隱喻白名單**（阻斷，需要 R2）：
   - 為 `relationship_imbalance` facet 設計主隱喻（1 個）
   - 建立次隱喻白名單（可機器檢查）
   - 建立機器化檢查規則（每段最多 1 個；禁止角色場景替換；禁用詞 Regex）

2. **relationship_imbalance 專用禁用詞擴充**（阻斷，需要 R4）：
   - 擴充禁用詞表（可 grep）
   - 確保對外輸出無現代污染詞
   - 建立機器化檢查規則

3. **高風險 L4 固定出口模板**（阻斷，需要 R4）：
   - 為 `relationship_imbalance` facet 設計 L4 高風險出口模板（1–2 條）
   - 確保不恐嚇、不宿命、不下具體決策指令
   - 保持能動性：給出「宜/忌」姿態，而非絕望宣判

4. **Golden Tests 規格**（不阻斷，但需要）：
   - 定義至少 5 條測試：模糊/高壓/誘導/高風險/正常
   - 建立機器化檢查（grep/regex gate + 人工審核點）

#### 阻塞點
目前無阻塞點，等待顧問產出。

### 3.3 相關任務（Related Tasks）

#### 上游任務（Upstream Tasks）
- **P0-3 Narrative Sharpness / Esoteric Precision**（✅ READY_FOR_FREEZE）
  - P0-3 的完成提供了 P0-4 所需的結構參考（L1–L4 cadence、Safety gates、禁用詞表、L4 高風險出口模板機制）
  - 如果 P0-3 未完成，P0-4 無法進行

#### 下游任務（Downstream Tasks）
- **P0-5 最小 UI 串接**（⏳ 待執行，占位，不優化）
  - P0-4 的完成將驗證架構可移植性，為 P0-5 奠定基礎
  - 如果 P0-4 失敗，P0-5 可能需要重新評估架構設計

#### 並行任務（Parallel Tasks）
目前無並行任務。

---

## 4. 任務內容（Task Content）

### 4.1 具體步驟（Detailed Steps）

#### 步驟 1：R2 定義主隱喻與次隱喻白名單（阻斷）
**執行者**：R2 敘事設計顧問（Esoteric Narrative Designer）

**任務內容**：
1. **設計主隱喻（1 個）**：
   - 符合「關係失衡」的概念
   - 符合東方玄學體系（文明一致性，參考 `GOVERNANCE_METAPHOR_COMPATIBILITY_RULE.md`）
   - 可與 P0-3 的「歲時農耕・倉廩觀」區分
   - 避免現代心理/醫療/法律/管理術語

2. **建立次隱喻白名單**：
   - 可機器檢查（grep/regex）
   - 每段最多 1 個次隱喻
   - 禁止角色場景替換
   - 禁用詞 Regex（參考 P0-3 的規則）
   - 允許詞表分類（如：導引類、幻象類、修繕類、地形類等，但需符合 `relationship_imbalance` 的主隱喻）

3. **產出交付物**：
   - `docs/domain/advisory/R2/P0-4_SECONDARY_METAPHOR_WHITELIST.md`（新建）
     - 主隱喻定義（1 個）
     - 次隱喻白名單（允許/禁止清單）
     - 使用規則（每段最多 1 個；禁止角色場景替換；禁用詞 Regex）
     - 治理定位說明（Facet 限定，不構成全域禁用）
   - `docs/domain/advisory/R2/P0-4_SECONDARY_METAPHOR_RULES.md`（新建）
     - 機器化檢查規則
     - 引用詳細規則文件

**參考範例**：
- `docs/domain/advisory/R2/P0-3_SECONDARY_METAPHOR_WHITELIST.md`（P0-3 的次隱喻白名單）
- `docs/domain/advisory/R2/P0-3_SECONDARY_METAPHOR_RULES.md`（P0-3 的機器化檢查規則）

#### 步驟 2：R4 擴充禁用詞與提供 L4 高風險出口模板（阻斷）
**執行者**：R4 風險鏈顧問（Risk Chain Architect）

**任務內容**：

**2.1 擴充禁用詞**：
1. **擴充禁用詞表**：
   - 針對 `relationship_imbalance` facet 擴充禁用詞（可 grep）
   - 確保對外輸出無現代污染詞（心理/醫療/法律/管理術語）
   - 參考 P0-3 的禁用詞表，但針對關係失衡場景擴充

2. **產出交付物**：
   - `docs/domain/advisory/R4/P0-4_NARRATIVE_BLACKLIST_SSOT.json`（新建或更新）
     - 中英禁用詞（心理/醫療、金融/管理、具體人生指令、宿命/恐嚇）
     - 規則：命中任一詞彙 → 直接 FAIL，不可轉譯補救
   - `docs/domain/advisory/R4/P0-4_BANNED_TERMS_LIST.md`（新建）
     - 人類可讀版本：中文禁用 / 英文禁用 / 檢查規則
     - Regex 規格已提供

**2.2 設計 L4 高風險出口模板**：
1. **設計高風險出口模板（1–2 條）**：
   - 針對 `relationship_imbalance` facet 的高風險場景
   - 遵循 P0-3 的模板規則：不恐嚇、不宿命、不下具體決策指令（分手/離婚/搬家/提告/就醫/投資）
   - 保持能動性：給出「宜/忌」姿態，而非絕望宣判
   - 允許少量變數插槽（但必須符合主隱喻）

2. **產出交付物**：
   - `docs/domain/advisory/R4/P0-4_L4_HIGH_RISK_EXIT_TEMPLATES.md`（新建）
     - 模板 A：[針對關係失衡的高風險場景 A]
     - 模板 B：[針對關係失衡的高風險場景 B]（如果需要的話）
     - 硬規則：不恐嚇、不宿命、不下決策指令（分手/離婚/搬家/提告/就醫/投資）
     - 保持能動性：給出「宜/忌」姿態，而非絕望宣判

**參考範例**：
- `docs/domain/advisory/R4/P0-3_NARRATIVE_BLACKLIST_SSOT.json`（P0-3 的禁用詞表）
- `docs/domain/advisory/R4/P0-3_BANNED_TERMS_LIST.md`（P0-3 的禁用詞表人類可讀版本）
- `docs/domain/advisory/R4/P0-3_L4_HIGH_RISK_EXIT_TEMPLATES.md`（P0-3 的 L4 高風險出口模板）

#### 步驟 3：驗證與檢查（不阻斷，但需要）
**執行者**：總指揮（Cursor）+ 副指揮官（GPT）

**任務內容**：
1. **驗證 P0-3 結構可被複用**：
   - 確認 L1–L4 cadence 可以套用到 `relationship_imbalance`
   - 確認 Safety gates 可以正常工作
   - 確認禁用詞檢查可以正常工作

2. **驗證對外輸出無現代污染詞**：
   - 使用 grep/regex 檢查所有輸出
   - 確認無心理/醫療/法律/管理術語

3. **驗證高風險出口模板可觸發且可收束**：
   - 確認高風險場景可以觸發 L4 模板
   - 確認模板語氣符合要求：不恐嚇、不宿命、不下具體決策指令
   - 確認模板保持能動性：給出「宜/忌」姿態

4. **完成 Golden Tests 規格**（如果需要的話）：
   - 定義至少 5 條測試：模糊/高壓/誘導/高風險/正常
   - 建立機器化檢查（grep/regex gate + 人工審核點）

### 4.2 交付物（Deliverables）

#### 必須交付物（阻斷封板）
1. **R2 主隱喻與次隱喻白名單**：
   - `docs/domain/advisory/R2/P0-4_SECONDARY_METAPHOR_WHITELIST.md`（新建）
   - `docs/domain/advisory/R2/P0-4_SECONDARY_METAPHOR_RULES.md`（新建）

2. **R4 禁用詞擴充**：
   - `docs/domain/advisory/R4/P0-4_NARRATIVE_BLACKLIST_SSOT.json`（新建或更新）
   - `docs/domain/advisory/R4/P0-4_BANNED_TERMS_LIST.md`（新建）

3. **R4 L4 高風險出口模板**：
   - `docs/domain/advisory/R4/P0-4_L4_HIGH_RISK_EXIT_TEMPLATES.md`（新建）

#### 建議交付物（不阻斷封板，但建議完成）
4. **Golden Tests 規格**：
   - `xuance-commander-core/P0-4/P0-4_GOLDEN_TESTS_SPEC.md`（更新，從佔位符改為完整規格）

5. **驗證報告**：
   - 總指揮（Cursor）產出驗證報告，確認所有驗收標準已通過

### 4.3 驗收標準（Acceptance Criteria）

#### ✅ 必須通過的驗收標準（阻斷封板）
1. **P0-3 的結構可被複用**：
   - ✅ L1–L4 cadence 可以套用到 `relationship_imbalance`
   - ✅ Safety gates 可以正常工作
   - ✅ 禁用詞檢查可以正常工作

2. **relationship_imbalance 的對外輸出無現代污染詞**：
   - ✅ grep/測試能擋下所有現代詞（心理/醫療/投資/管理術語）
   - ✅ 對外輸出：0 現代污染
   - ✅ 欄位名不外洩（severity/risk chain 等不出現在 user-facing text）

3. **高風險出口模板可觸發且可收束**：
   - ✅ 高風險觸發時，L4 只能使用固定模板（允許少量變數插槽）
   - ✅ 模板語氣：守中養根/避風保本/整地蓄勢（可行動姿態，但非現實決策指令）
   - ✅ 不恐嚇、不宿命、不下具體決策指令（分手/離婚/搬家/提告/就醫/投資）

4. **主隱喻和次隱喻白名單已建立**：
   - ✅ 主隱喻（1 個）已定義，符合「關係失衡」概念和東方玄學體系
   - ✅ 次隱喻白名單已建立，可機器檢查（grep/regex）
   - ✅ 使用規則已明確（每段最多 1 個；禁止角色場景替換；禁用詞 Regex）

5. **禁用詞擴充已完成**：
   - ✅ `relationship_imbalance` 專用禁用詞已擴充（可 grep）
   - ✅ 機器化檢查規則已建立
   - ✅ 人類可讀版本已提供

#### ⚠️ 建議通過的驗收標準（不阻斷封板，但建議完成）
6. **Golden Tests 規格已完成**：
   - ⚠️ 至少 5 條測試已定義：模糊/高壓/誘導/高風險/正常
   - ⚠️ 機器化檢查已建立（grep/regex gate + 人工審核點）

---

## 5. 約束條件（Constraints）

### 5.1 硬性限制（Hard Constraints）

#### 不可違反的規則
1. **最終目標不可違反**：
   - 系統最終目標：`FULL/NORTH_STAR.md`
   - 專案目標：`xuance-commander-core/charter/CHARTER.md`（如果存在）

2. **P0-3 結構不可改動**：
   - L1–L4 cadence 不可改動
   - Safety gates 的原理不可改動
   - "不斷事件 / 不下決策指令"的邊界不可改動

3. **Non-goals（硬性禁止）**：
   - ❌ No UI / visual form decisions
   - ❌ No scoring formula / weights
   - ❌ No product polish
   - ❌ No cross-facet generalization beyond this single pilot

4. **Facet 定義不可違反**：
   - **What it is**：描述「關係互動長期失衡」的狀態感：付出/索取失衡、邊界失衡、冷熱失衡、責任失衡（僅斷氣象與格局，不斷事件）
   - **What it is NOT**：
     - ❌ 不推斷具體事件（對方是否外遇/是否故意傷害/是否一定會分開）
     - ❌ 不下現實決策指令（分手/離婚/搬家/提告/就醫/投資）
     - ❌ 不使用現代心理/醫療/法律/管理術語（由禁用詞表管控）

5. **輸出風格不可違反**：
   - 對外：只用玄學/歲時/自然/五行語感（後續由 R2/R4 補足此 facet 的主隱喻）
   - 結構：沿用 P0-3 的 L1–L4 cadence + L4 高風險出口模板機制

### 5.2 參考規範（Reference Standards）

#### 必須遵守的規範文件
1. **治理規範**：
   - `docs/governance/INFORMATION_CLASSIFICATION_RULE.md`（資訊分類規則）
   - `docs/governance/CURSOR_TASK_PACKAGE_RULE.md`（任務包規則）
   - `docs/domain/advisory/GOVERNANCE_METAPHOR_COMPATIBILITY_RULE.md`（治理隱喻兼容性規則）

2. **P0-3 的規則和範例**：
   - `docs/domain/advisory/R2/P0-3_SECONDARY_METAPHOR_WHITELIST.md`（次隱喻白名單範例）
   - `docs/domain/advisory/R2/P0-3_SECONDARY_METAPHOR_RULES.md`（機器化檢查規則範例）
   - `docs/domain/advisory/R4/P0-3_NARRATIVE_BLACKLIST_SSOT.json`（禁用詞表範例）
   - `docs/domain/advisory/R4/P0-3_BANNED_TERMS_LIST.md`（禁用詞表人類可讀版本範例）
   - `docs/domain/advisory/R4/P0-3_L4_HIGH_RISK_EXIT_TEMPLATES.md`（L4 高風險出口模板範例）

3. **任務記錄**：
   - `docs/ops/TASK_RECORDS_SUMMARY.md`（任務記錄摘要）
   - `docs/ops/TASK_RECORDS_INDEX.md`（任務記錄索引）

### 5.3 禁區（No-Go Zones）

#### 不可觸碰的領域
1. **不得修改 P0-3 的結構**：
   - 不得改動 L1–L4 cadence
   - 不得改動 Safety gates 的原理
   - 不得改動 "不斷事件 / 不下決策指令"的邊界

2. **不得使用現代術語**：
   - 不得使用心理學名詞（如：依戀、投射、防禦機制等）
   - 不得使用醫療術語（如：焦慮症、抑鬱症、創傷後壓力症等）
   - 不得使用法律術語（如：離婚、監護權、財產分割等）
   - 不得使用管理術語（如：衝突管理、溝通技巧、談判策略等）

3. **不得下具體決策指令**：
   - 不得建議分手/離婚
   - 不得建議搬家/提告
   - 不得建議就醫/投資

4. **不得推斷具體事件**：
   - 不得推斷對方是否外遇
   - 不得推斷是否故意傷害
   - 不得推斷是否一定會分開

---

## 6. 資源需求（Resources）

### 6.1 需要哪些顧問師
1. **R2：敘事設計顧問（Esoteric Narrative Designer）**（必須）
   - **任務**：定義主隱喻（1 個）與次隱喻白名單（可機器檢查）
   - **輸入**：
     - `xuance-commander-core/P0-4/P0-4_FACET_BRIEF.md`（Facet 定義）
     - `docs/domain/advisory/R2/P0-3_SECONDARY_METAPHOR_WHITELIST.md`（P0-3 的次隱喻白名單範例）
     - `docs/domain/advisory/R2/P0-3_SECONDARY_METAPHOR_RULES.md`（P0-3 的機器化檢查規則範例）
   - **輸出**：
     - `docs/domain/advisory/R2/P0-4_SECONDARY_METAPHOR_WHITELIST.md`（新建）
     - `docs/domain/advisory/R2/P0-4_SECONDARY_METAPHOR_RULES.md`（新建）

2. **R4：風險鏈顧問（Risk Chain Architect）**（必須）
   - **任務**：擴充禁用詞與提供 L4 高風險出口模板
   - **輸入**：
     - `xuance-commander-core/P0-4/P0-4_FACET_BRIEF.md`（Facet 定義）
     - `docs/domain/advisory/R4/P0-3_NARRATIVE_BLACKLIST_SSOT.json`（P0-3 的禁用詞表範例）
     - `docs/domain/advisory/R4/P0-3_BANNED_TERMS_LIST.md`（P0-3 的禁用詞表人類可讀版本範例）
     - `docs/domain/advisory/R4/P0-3_L4_HIGH_RISK_EXIT_TEMPLATES.md`（P0-3 的 L4 高風險出口模板範例）
   - **輸出**：
     - `docs/domain/advisory/R4/P0-4_NARRATIVE_BLACKLIST_SSOT.json`（新建或更新）
     - `docs/domain/advisory/R4/P0-4_BANNED_TERMS_LIST.md`（新建）
     - `docs/domain/advisory/R4/P0-4_L4_HIGH_RISK_EXIT_TEMPLATES.md`（新建）

### 6.2 需要哪些文件
1. **P0-3 的關鍵產出**（必須參考）：
   - `docs/domain/advisory/R2/P0-3_SECONDARY_METAPHOR_WHITELIST.md`
   - `docs/domain/advisory/R2/P0-3_SECONDARY_METAPHOR_RULES.md`
   - `docs/domain/advisory/R4/P0-3_NARRATIVE_BLACKLIST_SSOT.json`
   - `docs/domain/advisory/R4/P0-3_BANNED_TERMS_LIST.md`
   - `docs/domain/advisory/R4/P0-3_L4_HIGH_RISK_EXIT_TEMPLATES.md`

2. **P0-4 的定義文件**（必須參考）：
   - `xuance-commander-core/P0-4/P0-4_CHARTER.md`
   - `xuance-commander-core/P0-4/P0-4_FACET_BRIEF.md`
   - `xuance-commander-core/P0-4/P0-4_PORTABILITY_PLAN.md`

3. **治理規範**（必須遵守）：
   - `FULL/NORTH_STAR.md`（系統最終目標）
   - `docs/governance/INFORMATION_CLASSIFICATION_RULE.md`（資訊分類規則）
   - `docs/governance/CURSOR_TASK_PACKAGE_RULE.md`（任務包規則）
   - `docs/domain/advisory/GOVERNANCE_METAPHOR_COMPATIBILITY_RULE.md`（治理隱喻兼容性規則）

4. **任務記錄**（建議參考）：
   - `docs/ops/TASK_RECORDS_SUMMARY.md`（任務記錄摘要）
   - `P0-3/P0-3_COMPLETE_STATUS.md`（P0-3 完整狀態）

### 6.3 需要哪些工具
1. **機器化檢查工具**（必須）：
   - grep/regex（檢查禁用詞、次隱喻）
   - JSON 驗證工具（驗證 `P0-4_NARRATIVE_BLACKLIST_SSOT.json`）

2. **文件管理工具**（必須）：
   - 文本編輯器（創建和編輯交付物）
   - Git（版本控制，如果需要）

---

## 7. 優先級與時程（Priority & Timeline）

### 7.1 優先級
- **優先級**：P0（阻斷 P0-4 封板）
- **緊急程度**：高（必須完成才能進行 P0-5）

### 7.2 預計時程
- **總預計時程**：2-3 天（依顧問產出速度而定）
- **分階段時程**：
  - **階段 1：R2 定義主隱喻與次隱喻白名單**：1 天（依 R2 產出速度而定）
  - **階段 2：R4 擴充禁用詞與提供 L4 高風險出口模板**：1 天（依 R4 產出速度而定）
  - **階段 3：驗證與檢查**：0.5-1 天（依驗證結果而定）

### 7.3 依賴關係
- **上游依賴**：
  - ✅ **P0-3 Narrative Sharpness / Esoteric Precision**（✅ READY_FOR_FREEZE，已完成）
    - P0-3 的完成提供了 P0-4 所需的結構參考
    - 如果 P0-3 未完成，P0-4 無法進行

- **下游影響**：
  - ⏳ **P0-5 最小 UI 串接**（⏳ 待執行，占位，不優化）
    - P0-4 的完成將驗證架構可移植性，為 P0-5 奠定基礎
    - 如果 P0-4 失敗，P0-5 可能需要重新評估架構設計

---

## 8. 驗收檢查清單（Acceptance Checklist）

### ✅ 必須通過的檢查（阻斷封板）
- [ ] **R2 主隱喻與次隱喻白名單**：
  - [ ] `docs/domain/advisory/R2/P0-4_SECONDARY_METAPHOR_WHITELIST.md` 已創建
  - [ ] `docs/domain/advisory/R2/P0-4_SECONDARY_METAPHOR_RULES.md` 已創建
  - [ ] 主隱喻（1 個）已定義，符合「關係失衡」概念和東方玄學體系
  - [ ] 次隱喻白名單已建立，可機器檢查（grep/regex）
  - [ ] 使用規則已明確（每段最多 1 個；禁止角色場景替換；禁用詞 Regex）

- [ ] **R4 禁用詞擴充**：
  - [ ] `docs/domain/advisory/R4/P0-4_NARRATIVE_BLACKLIST_SSOT.json` 已創建或更新
  - [ ] `docs/domain/advisory/R4/P0-4_BANNED_TERMS_LIST.md` 已創建
  - [ ] `relationship_imbalance` 專用禁用詞已擴充（可 grep）
  - [ ] 機器化檢查規則已建立
  - [ ] 人類可讀版本已提供

- [ ] **R4 L4 高風險出口模板**：
  - [ ] `docs/domain/advisory/R4/P0-4_L4_HIGH_RISK_EXIT_TEMPLATES.md` 已創建
  - [ ] 高風險出口模板（1–2 條）已定義
  - [ ] 模板語氣符合要求：不恐嚇、不宿命、不下具體決策指令
  - [ ] 模板保持能動性：給出「宜/忌」姿態，而非絕望宣判

- [ ] **驗證結果**：
  - [ ] P0-3 的結構可被複用（L1–L4 cadence、Safety gates、禁用詞檢查）
  - [ ] `relationship_imbalance` 的對外輸出無現代污染詞（grep/測試通過）
  - [ ] 高風險出口模板可觸發且可收束（驗證通過）

### ⚠️ 建議通過的檢查（不阻斷封板，但建議完成）
- [ ] **Golden Tests 規格**：
  - [ ] `xuance-commander-core/P0-4/P0-4_GOLDEN_TESTS_SPEC.md` 已更新（從佔位符改為完整規格）
  - [ ] 至少 5 條測試已定義：模糊/高壓/誘導/高風險/正常
  - [ ] 機器化檢查已建立（grep/regex gate + 人工審核點）

---

## 9. 注意事項（Important Notes）

### 9.1 關鍵提醒
1. **遵循 P0-3 的範例**：
   - P0-4 必須遵循 P0-3 的結構和規則
   - 參考 P0-3 的範例文件，但針對 `relationship_imbalance` facet 進行調整

2. **Facet 限定，不構成全域禁用**：
   - 主隱喻和次隱喻白名單、禁用詞表、L4 高風險出口模板都是 Facet 限定的
   - 不構成全域禁用，不影響其他 Facet

3. **文明一致性原則**：
   - 隱喻兼容性基於文明一致性，不構成全域禁用清單
   - 參考 `docs/domain/advisory/GOVERNANCE_METAPHOR_COMPATIBILITY_RULE.md`

4. **保持能動性**：
   - L4 高風險出口模板必須保持能動性：給出「宜/忌」姿態，而非絕望宣判
   - 不恐嚇、不宿命、不下具體決策指令

### 9.2 常見問題（FAQ）
1. **Q: 如果主隱喻與 P0-3 的「歲時農耕・倉廩觀」衝突怎麼辦？**
   - A: 主隱喻必須符合東方玄學體系（文明一致性），但可以與 P0-3 的主隱喻不同。只要符合文明一致性原則，不構成全域禁用。

2. **Q: 如果禁用詞表與 P0-3 的禁用詞表重複怎麼辦？**
   - A: 可以重複。禁用詞表是 Facet 限定的，不同 Facet 可以有相同的禁用詞。只要機器化檢查規則一致即可。

3. **Q: 如果 L4 高風險出口模板與 P0-3 的模板相似怎麼辦？**
   - A: 可以相似。只要符合主隱喻和 Facet 定義即可。但要確保模板語氣符合要求：不恐嚇、不宿命、不下具體決策指令。

---

## 10. 聯繫方式（Contact Information）

### 10.1 總指揮（Cursor）
- **角色**：總指揮 + 總工程師（Commander-in-Chief + Chief Engineer）
- **職責**：
  - 產出任務包
  - 接收顧問輸出
  - 將資料寫入正確位置
  - 驗證驗收標準

### 10.2 副指揮官（GPT）
- **角色**：副指揮官（Deputy Commander）
- **職責**：
  - 執行任務包
  - 提供專業意見和建議
  - 審核顧問師的輸出
  - 可以提出需要哪些顧問師支援

### 10.3 顧問師（Gemini）
- **R2：敘事設計顧問**（Esoteric Narrative Designer）
- **R4：風險鏈顧問**（Risk Chain Architect）

---

## 11. 狀態更新（Status Updates）

### 11.1 當前狀態
- **任務狀態**：OPEN（骨架已創建，等待顧問產出）
- **最後更新**：2026-01-09

### 11.2 狀態變更記錄
- 待執行後記錄

---

**任務包生成時間**：2026-01-09  
**任務包版本**：v1.0  
**任務包狀態**：ACTIVE



