# P0-5 技術風險評估（SPEC-6）

**Status**：ACTIVE · EDITABLE · REFERENCE（NOT FROZEN）  
**Version**：v1.0  
**Date**：2026-01-10  
**Scope**：性能/相容性/可維護性/可擴展性/實作風險 + MVP Gate 影響 + 緩解對策（含步驟與驗證）

---

## 0. 風險評級方法（簡化且可執行）

- **Impact**（影響）：1 低 / 2 中 / 3 高
- **Likelihood**（機率）：1 低 / 2 中 / 3 高
- **Priority** = Impact * Likelihood（1–9）
- 前 5 名視為「優先緩解」

---

## 1. 技術風險清單（完整）

### 1.1 性能風險（Performance）

#### R-P1：Stage 2 SVG 渲染性能（20–30 符碼）

- **影響**：Gate #3（羅盤）、整體體驗
- **成因**：
  - SVG 節點數過多（glyph + filter + mask）
  - 動畫用非 GPU-friendly 屬性（例如頻繁改 path）
- **估算**（可行的近似）：
  - glyph 每個至少 1 `<g>` + 1 hit `<circle>` + 1 icon `<path>` → 約 3 nodes
  - 30 glyph → 90 nodes（可接受）
  - 若每 glyph 還帶 filter/mask → node 成倍上升 → 可能卡頓
- **風險評分**：Impact 3 / Likelihood 2 / Priority 6

**緩解對策**：
1. 控制節點：glyph icon 盡量合併 path（或用 `<use>` 重複引用）
2. 動畫只用 transform/opacity（GPU）
3. mobile 降級：關閉 filter、降低裝飾層
4. 監控：加 FPS 監測（dev only）

**有效性驗證**：
- 用 Chrome Performance 記錄 5 秒操作，確認長任務（>50ms）不連發
- mobile 模擬器下拖曳旋盤不卡死

#### R-P2：手機端觸控事件與動畫造成掉幀

- **影響**：Gate #3
- **成因**：touchmove 事件過頻、未節流
- **風險評分**：Impact 3 / Likelihood 3 / Priority 9（最高）

**緩解對策**：
1. touchmove 使用 `requestAnimationFrame` 節流（只在 rAF 更新 rotation）
2. 避免每次 move 觸發大量 React re-render（用 ref + minimal state）
3. 降級：低端機只更新 rotation，不做粒子/陰影

**驗證**：
- 連續旋轉 10 秒，畫面可持續回應
- Performance：事件 handler 平均 < 2ms

#### R-P3：i18n 切換大文本更新造成閃爍/卡頓

- **影響**：Gate #2（No-reload + native feel）
- **成因**：大量組件依賴 `t()`，切換時 re-render 多
- **風險評分**：Impact 2 / Likelihood 2 / Priority 4

**緩解對策**：
1. 避免在 render 期做昂貴運算（`t()` O(1)）
2. 大段文字拆成少數 block（不要把每個字都做 component）
3. 若 dict 很大：分 facet 載入，避免一次塞爆

**驗證**：
- 切換語言 < 100ms（主觀 + Performance）
- 無 reload、無白屏

---

### 1.2 相容性風險（Compatibility）

#### R-C1：SVG filter/mask 在部分瀏覽器表現不一致

- **影響**：視覺一致性、L3 撥霧效果
- **風險評分**：Impact 2 / Likelihood 2 / Priority 4

**緩解對策**：
1. 撥霧效果提供 CSS 版本 fallback（opacity/blur）
2. 避免過度依賴複雜 filter（feTurbulence 可能不穩）

**驗證**：
- Safari/Chrome/Firefox（至少桌面）效果可接受
- 若不支援：自動 fallback，不影響互動

#### R-C2：Touch Events 在 iOS 上與 scroll/gesture 衝突

- **影響**：Gate #3
- **風險評分**：Impact 3 / Likelihood 2 / Priority 6

**緩解對策**：
1. 旋盤區域 `touch-action: none;`（注意只對特定區域）
2. 防止頁面滾動干擾（必要時 `preventDefault`）
3. iOS 實機驗證（至少一次）

**驗證**：
- iOS Safari 旋盤可用、不會卡住捲動

---

### 1.3 可維護性風險（Maintainability）

#### R-M1：Adapter 層越做越胖，後續難維護

- **影響**：新增 facet 的速度、bug 風險
- **風險評分**：Impact 2 / Likelihood 3 / Priority 6

**緩解對策**：
1. Adapter 拆模組：compassAdapter/projectionAdapter/resultAdapter
2. Adapter 必須有 unit tests（Vitest）
3. 對 raw schema 變更必須 ADR + 更新 adapter tests

**驗證**：
- 新 facet 只需新增 mapping，不必改 UI components

#### R-M2：Theme config 擴展後導致 CSS 變數混亂

- **影響**：Gate #6
- **風險評分**：Impact 2 / Likelihood 2 / Priority 4

**緩解對策**：
1. Theme 變數命名規範（`--theme-primary`, `--theme-bg-url`）
2. 只允許 themeEngine 注入，不允許 component 自行 setProperty
3. 缺值永遠回 Neutral

**驗證**：
- 刪 `theme_config`：仍能 render
- 改 `primary_color`：立即生效

---

### 1.4 可擴展性風險（Scalability / Extensibility）

#### R-S1：新增 Facet 時 schema 不一致造成 UI 崩潰

- **影響**：Gate #1（資料串接 Fail-soft）
- **風險評分**：Impact 3 / Likelihood 2 / Priority 6

**緩解對策**：
1. JSON Schema 驗證（開發期）
2. Adapter fail-soft 對所有欄位有 fallback
3. 提供 examples（normal/high）

**驗證**：
- 任意刪欄位：UI 不崩潰（顯示 fallback）

#### R-S2：新增 Stage 1 時路由與資料接口破壞現有流程

- **影響**：未來擴展
- **風險評分**：Impact 2 / Likelihood 2 / Priority 4

**緩解對策**：
1. Router 預留 `/start`
2. Stage2 props optional + mock data
3. Component slot 預留

**驗證**：
- `/start` 存在且可導回 `/`

---

### 1.5 實作風險（Implementation)

#### R-I1：羅盤退化成問卷 UI（紅線破壞）

- **影響**：Critical（直接不驗收）
- **風險評分**：Impact 3 / Likelihood 2 / Priority 6

**緩解對策**：
1. SPEC-4 禁止事項 + DOM 掃描自動化（SPEC-7）
2. 設計審查：每次 PR 必須附羅盤截圖 + Elements 結構
3. 若要加提示：只能 HUD/霧光，不得列表

**驗證**：
- domScan 不得出現 radio/checkbox/select/range

#### R-I2：英文敘事失真（native feel 破壞）

- **影響**：Gate #2 主觀品質
- **風險評分**：Impact 2 / Likelihood 2 / Priority 4

**緩解對策**：
1. 英文文案不做機翻；以 parallel key 由內容端提供
2. 缺字就顯示 key（Fail-soft），用掃描列出缺漏
3. 內容 QA：抽樣 20 個 key 檢查語感

**驗證**：
- 缺漏清單可產出（SPEC-7）
- 關鍵頁（Stage2/3/4）英文可讀

#### R-I3：高風險漏蓋（動態 L4 外洩）

- **影響**：Critical（Gate #5）
- **風險評分**：Impact 3 / Likelihood 2 / Priority 6

**緩解對策**：
1. Risk Interceptor 在 store 前覆蓋（SPEC-5）
2. 自動化檢查：DOM + store + network（SPEC-7）
3. Interceptor 失敗時保守 = HIGH（fail-safe）

**驗證**：
- high risk sample 下，掃描不到 `recommendation_key`

---

## 2. 風險優先級 Top 5（必做）

1. **R-P2（Priority 9）**：手機 touch 掉幀  
2. **R-P1（Priority 6）**：SVG 節點與動畫  
3. **R-M1（Priority 6）**：Adapter 可維護性  
4. **R-S1（Priority 6）**：schema 變更與 fail-soft  
5. **R-I3（Priority 6）**：高風險漏蓋（安全）

---

## 3. 對 MVP Gate 的影響（逐 Gate）

### Gate #1（資料串接 & 遮罩）

- **高影響風險**：R-S1
- **要求**：schema 驗證 + adapter fail-soft + masking

### Gate #2（CN/EN No-Reload）

- **高影響風險**：R-P3, R-I2
- **要求**：parallel key + 缺漏掃描 + 切換性能

### Gate #3（羅盤）

- **高影響風險**：R-P1, R-P2, R-C2
- **要求**：transform/opacity 動畫 + touch rAF 節流 + iOS 實測

### Gate #4（L1-L4）

- **中影響風險**：R-C1（霧效果相容性）
- **要求**：霧效果有 fallback

### Gate #5（HIGH 覆蓋）

- **高影響風險**：R-I3
- **要求**：interceptor + 自動掃描（DOM/store/network）

### Gate #6（視覺解耦）

- **中影響風險**：R-M2
- **要求**：themeEngine 唯一注入 + neutral fallback

---

## 4. 緩解對策的落地步驟（可執行）

### 4.1 性能（mobile touch）落地步驟

1. 在 `useCompassGestures` 使用 rAF 節流
2. rotation 狀態採 ref + setState（低頻）
3. 只更新 root `<g transform="rotate(...)"`，避免重排所有 glyph
4. Performance 記錄：10 秒旋盤

### 4.2 安全（HIGH 覆蓋）落地步驟

1. `riskIntercept()` 寫在 page bootstrap（store 前）
2. high risk sample 測試資料就位
3. domScan + storeDump + networkTap 寫成腳本（SPEC-7）

---

## 5. 有效性驗證（每項對策如何驗證）

- **性能**：Performance trace（附檔）
- **安全**：掃描報告（json）
- **i18n**：缺漏清單（txt/json）
- **theme**：對照截圖（before/after/neutral）

---

## 6. 可修改與可回滾聲明

**本文件所有風險評估與緩解對策均為「可修改」「可回滾」**：

- **可修改**：所有風險評級、緩解對策、落地步驟均可根據實際情況調整
- **可回滾**：所有技術決策均可回滾，但必須以 ADR 記錄變更原因與影響範圍
- **影響範圍**：風險評估變更需評估對所有 MVP Gate 的影響

**回滾機制**：
- 若風險評級不符合實際情況，可調整，但需 ADR 記錄
- 若緩解對策不符合需求，可改用其他方案，但需 ADR 記錄
- 若落地步驟不符合需求，可調整，但需 ADR 記錄

---

**End of SPEC-6**

