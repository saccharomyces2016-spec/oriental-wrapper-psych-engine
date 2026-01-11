# P0-4 Task Log（P0-4 任務日誌）

## 狀態
- **Phase**：P0-4 Facet Portability & Stress Test
- **Facet**：`relationship_imbalance`（月相潮汐・盈虛觀）
- **狀態**：✅ **READY_TO_FREEZE**（所有阻斷點已完成，可封版）
- **日期**：2026-01-09

---

## 任務目標
驗證 P0-3 建立的「L1–L4 敘事結構 × 安全邊界 × 機器化治理規則」，是否能在第二個 Facet（`relationship_imbalance`）上**零改動搬移且不崩壞**。

---

## 任務進度

### ✅ R2：主隱喻與次隱喻白名單（COMPLETED）
- **狀態**：✅ **DONE**（R2 裁決已完成，規則已寫入文本）
- **Brief 文件**：`docs/gem/briefs/BRIEF_P0-4_secondary_metaphor_whitelist_R2.md`
- **輸出物**（已落盤）：
  1. ✅ `docs/domain/advisory/R2/P0-4_SECONDARY_METAPHOR_WHITELIST.md`（新建）
     - 主隱喻：月相潮汐・盈虛觀
     - 次隱喻裁決表（農耕❌、航海❌、商業❌、水文✅、氣象✅、地形✅、鏡像⚠️）
     - 使用規則：每段最多 1 個；禁止角色場景替換；禁用詞 Regex
     - 允許詞表（水文類、氣象類、地形類、鏡像類）
     - 治理定位說明（Facet 限定，不構成全域禁用）
  2. ✅ `docs/domain/advisory/R2/P0-4_SECONDARY_METAPHOR_RULES.md`（新建）
     - 域層級規則（Allowed/Banned Domains）
     - CI 檢查流程
- **驗收點**：
  - ✅ 明確結論：哪些次隱喻允許/禁止（裁決表已寫入）
  - ✅ 有「每段最多幾個」與「禁止句型」的硬規則（每段最多 1 個，禁用詞 Regex）
  - ✅ Golden tests/CI gate 可用固定規則驗證（Regex 規格已提供）
- **審核結論**：R2 的裁決與規則完全符合 P0-4 的主隱喻一致性、可擴充性與機器可檢查性要求，沒有收斂過度，也沒有為未來其他 Facet 封死空間。

### ✅ R4：禁用詞擴充與 L4 高風險出口模板（COMPLETED）
- **狀態**：✅ **DONE**（R4 交付已完成，規則已寫入文本）
- **Brief 文件**：`docs/gem/briefs/BRIEF_P0-4_banned_terms_L4_templates_R4.md`
- **輸出物**（已落盤）：
  1. ✅ `docs/domain/advisory/R4/P0-4_NARRATIVE_BLACKLIST_SSOT.json`（新建 v1.0）
     - 擴充：中英禁用詞（心理/醫療、法律/關係判決、具體人生指令、宿命/恐嚇）
     - 規則：命中任一詞彙 → 直接 FAIL，不可轉譯補救
  2. ✅ `docs/domain/advisory/R4/P0-4_BANNED_TERMS_LIST.md`（新建）
     - 人類可讀版本：中文禁用 / 英文禁用 / 檢查規則
     - Regex 規格已提供
  3. ✅ `docs/domain/advisory/R4/P0-4_L4_HIGH_RISK_EXIT_TEMPLATES.md`（新建）
     - 模板 A：過熱/衝突/劇烈消耗場景（「此時火旺風急，氣場衝撞...」）
     - 模板 B：枯竭/冷凍/失去連結場景（「嚴冬封凍，萬物蟄伏...」）
     - 硬規則：不恐嚇、不宿命、不下決策指令（分手/離婚/搬家/提告/就醫/投資）
     - 保持能動性：給出「宜/忌」姿態，而非絕望宣判
- **驗收點**：
  - ✅ grep/測試能擋下所有現代詞（心理/醫療/法律/管理術語）
  - ✅ 對外輸出：0 現代污染
  - ✅ 高風險觸發時，L4 只能使用固定模板（允許少量變數插槽）
  - ✅ 模板語氣：守中/退避/養氣（可行動姿態，但非現實決策指令）
- **審核結論**：APPROVED（已審核通過，品質達 P0-4 封版等級）

---

## 驗證結果

### ✅ P0-3 結構可被複用
- ✅ L1–L4 cadence 可以套用到 `relationship_imbalance`
- ✅ Safety gates 可以正常工作
- ✅ 禁用詞檢查可以正常工作

### ✅ relationship_imbalance 的對外輸出無現代污染詞
- ✅ grep/測試能擋下所有現代詞（心理/醫療/法律/管理術語）
- ✅ 對外輸出：0 現代污染
- ✅ 欄位名不外洩（severity/risk chain 等不出現在 user-facing text）

### ✅ 高風險出口模板可觸發且可收束
- ✅ 高風險觸發時，L4 只能使用固定模板（允許少量變數插槽）
- ✅ 模板語氣：守中/退避/養氣（可行動姿態，但非現實決策指令）
- ✅ 不恐嚇、不宿命、不下具體決策指令（分手/離婚/搬家/提告/就醫/投資）

---

## 封版判定

### P0-4 可封板，需同時滿足：
- ✅ R2 / R4 交付物齊全
- ✅ 全部可通過既有 grep / regex gate
- ✅ 無需修改任何 P0-3 結構
- ✅ 高風險場景不會產生自由文本

### 封版狀態
**P0-4 = READY_TO_FREEZE**

---

## 狀態與版本

- **狀態**：READY_TO_FREEZE
- **版本**：v1.0
- **建立日期**：2026-01-09
- **最後更新**：2026-01-09

---

## 參考文件
- **封版準備狀態**：`P0-4/P0-4_FREEZE_READINESS.md`
- **最終檢查清單**：`P0-4/P0-4_FINAL_CHECKLIST.md`
- **交棒摘要**：`P0-4/P0-4_HANDOFF_SUMMARY.md`
- **SSOT 索引**：`docs/domain/SSOT_INDEX.md`



