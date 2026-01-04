# Prototype (wired to compiled facet)

此原型「不解釋原理」，只呈現玄學結果。題目/計分/敘事/建議/風險鏈皆從 compiled facet 讀取。

## 為何不要用 file:// 直接開
瀏覽器常會擋 `fetch()` 讀 JSON（CORS/安全限制），請用 HTTP server。

## Run 方法 1：內建 Python server
在專案根目錄執行：
```bash
python3 -m http.server 5173
```
然後開啟 http://localhost:5173/prototype/

## Run 方法 2：使用 npm（若有 Vite/前端工具鏈）
```bash
npm install
npm run dev
# 然後在 dev server 下開 /prototype/
```

## 內容來源
- Compiled facet（預設）：`domain/compiled/stress_recovery.compiled.v1.0.json`
- 若更換檔案，可在瀏覽器 console 設定 `window.__COMPILED_FACET__ = "path/to/compiled.json"` 後重新整理。

## 調整項目
- 題目、分段、敘事、行動建議、風險鏈均由 compiled JSON 決定
- UI 可切換語系（CN/EN），需在 JSON 內提供對應文本

