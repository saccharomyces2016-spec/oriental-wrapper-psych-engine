# P0-5 測試網址

**生成時間**：2026-01-11 13:51:16

---

## 開發伺服器網址

### 本地開發伺服器

**網址**：http://localhost:5173/

**啟動命令**：
```bash
cd xuance-commander-core/ui
npm run dev
```

**說明**：
- 使用 Vite 開發伺服器
- 默認端口：5173
- 支援熱重載（HMR）
- 自動打開瀏覽器（可選）

---

## 預構建版本（生產構建）

**啟動預覽服務器**：
```bash
cd xuance-commander-core/ui
npm run build
npm run preview
```

**預覽網址**：http://localhost:4173/（默認）

---

## 測試數據

**數據文件路徑**：`/data/compiled_facet.json`

**自定義數據路徑**（URL 參數）：
- http://localhost:5173/?data=/path/to/custom.json

---

## 注意事項

1. **確保開發伺服器已啟動**
   - 檢查終端是否有 "VITE v5.x.x ready in xxx ms" 訊息
   - 檢查端口 5173 是否被佔用

2. **瀏覽器兼容性**
   - 推薦使用 Chrome、Firefox、Safari 最新版本
   - 需要支援 ES6+ 和現代 JavaScript 特性

3. **數據載入**
   - 確保 `public/data/compiled_facet.json` 文件存在
   - 檢查瀏覽器控制台是否有錯誤訊息

---

**狀態**：開發伺服器可以正常啟動
