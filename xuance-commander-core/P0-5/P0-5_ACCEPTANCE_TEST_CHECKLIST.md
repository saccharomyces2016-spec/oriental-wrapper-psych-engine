# P0-5 驗收測試檢查清單（Acceptance Test Checklist）

**狀態**：READY_FOR_TESTING  
**建立日期**：2026-01-11  
**執行者**：總工程師（Cursor）  
**依據**：`P0-5/P0-5_UMIP_CLOSURE_REPORT.md` v1.0（6 項 MVP Gate 驗收標準）

---

## ⚠️ 重要聲明

**本驗收測試檢查清單中的所有測試結果均為暫時性版本，不得凍結。**

- 所有測試結果均可在後續討論中調整
- 所有測試方法均可變更
- 任何「最終版本」的說法均指「當前可執行的版本」，非永久凍結

**目標**：驗證工程實作是否滿足 6 項 MVP Gate 驗收標準。

---

## 📋 測試環境準備

### 前置條件

1. ✅ 專案已建立（Vite + React + TypeScript）
2. ✅ 所有依賴已安裝（npm install）
3. ✅ 所有核心功能已實作完成
4. ✅ 測試資料已建立（compiled_facet.json, normal_risk_sample.json, high_risk_sample.json）
5. ✅ 主應用組件已整合

### 啟動開發伺服器

```bash
cd xuance-commander-core/ui
npm run dev
```

預設 URL：http://localhost:5173

---

## 📋 6 項 MVP Gate 驗收測試

### Gate #1：資料串接

**驗收標準**：
- UI 可正確載入並解析任一符合 Schema 的 `compiled_facet.json`
- 支援 `income_expansion_pressure` 和 `relationship_imbalance`
- 具備基本的容錯能力（fallback 值）

**測試步驟**：
1. [ ] 啟動開發伺服器：`npm run dev`
2. [ ] 打開瀏覽器：http://localhost:5173
3. [ ] 打開 DevTools → Network，確認成功抓到 `compiled_facet.json`
4. [ ] 確認 UI 不白屏
5. [ ] 打開 React DevTools（或 console debug），輸出當前 ViewModel（不得含 raw）
6. [ ] 人為破壞 json（刪除 theme_config 或 i18n）
7. [ ] 重整頁面
8. [ ] 確認 UI 不崩潰（顯示 fallback）

**檢查項目**：
- [ ] UI 不白屏
- [ ] fetch 失敗時顯示可重試 UI
- [ ] ViewModel 不含 `raw_score`, `severity`, `weight`, `weights`
- [ ] DOM 不含上述字串
- [ ] console 不輸出 raw 值（debug dump 必須先過濾）
- [ ] 刪 i18n key 時顯示 key（Fail-soft）
- [ ] 刪 theme_config 時自動 neutral
- [ ] stage2 仍可渲染（至少顯示 placeholder）
- [ ] no crash in console（無未捕獲例外）

**狀態**：⏳ 待測試  
**結果**：待填寫  
**證據**：待上傳（截圖/錄影/console dump）

---

### Gate #2：CN/EN 雙語即時切換（硬性要求）

**驗收標準**：
- 必須支援**即時切換**，不需重新載入頁面（no reload）
- 所有文字（題目、結果、按鈕、UI 標籤）都需即時更新
- **英文敘事需具原生語感**（不得逐字翻譯腔）
- 數據結構中應包含 `zh` 和 `en` 欄位，UI 根據當前語言選擇對應欄位

**測試步驟**：
1. [ ] 啟動 app
2. [ ] 進入 Stage2
3. [ ] 點語言切換（zh→en）
4. [ ] 觀察 1 秒
5. [ ] 再切回（en→zh）
6. [ ] 進入 Stage3
7. [ ] 重複切換
8. [ ] 進入 Stage4
9. [ ] 重複切換

**檢查項目**：
- [ ] 切換時不觸發 reload（Network 無 document reload）
- [ ] UI 文字立即更新（<100ms 主觀）
- [ ] stage2 guide/ title 正確切換
- [ ] stage3 題目與選項正確切換
- [ ] stage4 L1-L4 文案切換
- [ ] 若缺 key：顯示 key（列入缺漏清單）
- [ ] 無閃爍白屏
- [ ] 無重置 flow state（切語言不清掉選象/答案）
- [ ] 產出缺漏 key 報告（如有）

**狀態**：⏳ 待測試  
**結果**：待填寫  
**證據**：待上傳（錄影含 browser tab 無 reload）

---

### Gate #3：儀式介面（Stage 2 硬性）

**驗收標準**：
- 成功實作「萬象羅盤（Radial Compass）」並可完成選取流程
- 至少支援 2–3 個符碼選取
- 選取後符碼正確點亮並吸附至中央
- 手機端旋盤適配基本可用

**測試步驟（桌面）**：
1. [ ] Desktop viewport（>1024）
2. [ ] 選 3 個符碼
3. [ ] 取消其中 1 個
4. [ ] 再選回 3 個
5. [ ] 觸發確認（進 Stage3）
6. [ ] 錄影保存

**測試步驟（手機）**：
1. [ ] Chrome DevTools → iPhone 模擬
2. [ ] 進入 Stage2
3. [ ] 拖曳旋盤 5 秒（如已實作）
4. [ ] 點選 3 個符碼（單手可用）
5. [ ] 確認可取消一個
6. [ ] 再選回 3 個
7. [ ] 錄影保存

**檢查項目**：
- [ ] SVG 結構（Elements 顯示 svg/g/path/circle）
- [ ] 禁止 Canvas
- [ ] 禁止 radio/checkbox/select/range
- [ ] 20–30 glyph 不卡死（目前 6 個，基本可用）
- [ ] mobile 旋盤可動（如已實作）
- [ ] hit area 足夠（不需精準點小點）
- [ ] 選滿 3 象提示（HUD，不是 alert）
- [ ] 確認進 Stage3
- [ ] 旋盤處理有節流（Performance 無大量 long task）

**狀態**：⏳ 待測試  
**結果**：待填寫  
**證據**：待上傳（Elements 截圖 + 桌面/手機錄影）

---

### Gate #4：結果呈現

**驗收標準**：
- Stage 4 結果頁完整呈現 L1–L4
- 所有開發用數據皆不可見（遵守遮罩紅線）
- Severity、Attribution、Coping 等內部數值僅開發模式可見
- 不得對外顯示任何未轉譯的內部數據

**測試步驟**：
1. [ ] 完成 Stage2 + Stage3 進 Stage4
2. [ ] 觀察 L1 立即顯示
3. [ ] 等待 L2 自動顯示
4. [ ] 確認 L3 預設被遮罩
5. [ ] 觸發撥霧（點擊/長按）
6. [ ] 確認 L4 最後出現

**檢查項目**：
- [ ] L1 立即顯示
- [ ] L2 延遲顯示（時間在 spec 範圍）
- [ ] L3 必須 user action 才顯示
- [ ] L4 必須在 L3 後
- [ ] DOM 在任何時刻都不含 `raw_score/weight`
- [ ] 撥霧動畫有效（或 fallback opacity）
- [ ] 切語言不破壞 state machine
- [ ] 所有內部數據已遮罩（檢查 DOM 和 console）

**狀態**：⏳ 待測試  
**結果**：待填寫  
**證據**：待上傳（錄影完整揭示）

---

### Gate #5：風險覆蓋

**驗收標準**：
- 可人工模擬 `risk_level = HIGH`，並驗證 L4 會被安全模板強制覆寫
- 高風險時 L4 必須顯示安全語句（CN/EN 對應版本）
- 動態生成的 L4 必須被忽略

**測試步驟**：
1. [ ] 切到 `?data=/data/high_risk_sample.json`
2. [ ] 直接進 Stage4（或走完整流程）
3. [ ] 打開 DevTools → Elements
4. [ ] 搜尋 `recommendation` 或動態文案片段
5. [ ] 打開 console（或 debug）輸出 store dump（riskResolved）
6. [ ] 確認 safety template 顯示
7. [ ] 切換語言（CN/EN），確認安全模板正確切換
8. [ ] 截圖/錄影存證

**檢查項目**：
- [ ] risk_level = HIGH 時 L4 顯示安全模板
- [ ] 動態 L4 建議被丟棄（DOM 中不存在）
- [ ] 安全模板 A/B 正確選擇（deterministic）
- [ ] 安全模板 CN/EN 正確切換
- [ ] 切語言不破壞風險覆蓋

**狀態**：⏳ 待測試  
**結果**：待填寫  
**證據**：待上傳（截圖/錄影 + console dump）

---

### Gate #6：視覺解耦

**驗收標準**：
- 不改前端程式碼情況下，僅修改 JSON `theme_config` 即可切換基本視覺元素（至少背景/字體/配色任一生效）
- 證明 UI 框架具備隱喻解耦能力
- 至少驗證一組完整的 `theme_config` 切換

**測試步驟**：
1. [ ] 修改 `compiled_facet.json` 的 `theme_config`
2. [ ] 修改 `color_palette` 為不同顏色
3. [ ] 重整頁面
4. [ ] 確認顏色已切換
5. [ ] 刪除 `theme_config`
6. [ ] 重整頁面
7. [ ] 確認自動降級為 neutral theme
8. [ ] 截圖/錄影存證

**檢查項目**：
- [ ] 修改 theme_config 後視覺元素切換（至少一項生效）
- [ ] 刪除 theme_config 後自動 neutral
- [ ] CSS Variables 正確應用
- [ ] 不改前端程式碼即可切換視覺

**狀態**：⏳ 待測試  
**結果**：待填寫  
**證據**：待上傳（截圖對比 + theme_config 修改記錄）

---

## ✅ 驗收結論

**狀態**：⏳ 待執行測試

**整體評估**：待測試後評估

**通過/失敗**：待測試後判定

**備註**：
- 所有測試需手動執行（需要運行開發伺服器）
- 每個 Gate 需產出證據（截圖/錄影/console dump）
- 如有失敗項目，需記錄問題並提供修復建議

---

**最後更新時間**：2026-01-11  
**狀態**：READY_FOR_TESTING

