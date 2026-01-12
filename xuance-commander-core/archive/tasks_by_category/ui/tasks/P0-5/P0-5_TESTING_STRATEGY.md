# P0-5 測試策略（SPEC-7）

**Status**：ACTIVE · EDITABLE · REFERENCE（NOT FROZEN）  
**Version**：v1.0  
**Date**：2026-01-10  
**Scope**：6 MVP Gates 可重跑驗收 + 工具配置（Vitest/Playwright）+ 自動化紅線掃描腳本（可執行）

---

## 0. 測試總則（必須）

- 所有 Gate 都要可重跑（同樣步驟可再次驗收）
- 每個 Gate 必須產出「證據」：
  - 截圖 / 錄影 / JSON 報告 / console dump
- Critical Constraints（紅線）必須可自動掃描：
  - DOM
  - Network payload（若有）
  - Store dump（debug 版本）

---

## 1. 測試環境與資料（Test Fixtures）

### 1.1 必備測試資料

- `ui/public/data/compiled_facet.json`（baseline）
- `P0-5/examples/normal_risk_sample.json`
- `P0-5/examples/high_risk_sample.json`

### 1.2 安全模板

- `ui/public/templates/safety_template_A.json`
- `ui/public/templates/safety_template_B.json`

---

## 2. Gate #1：資料串接 & 遮罩（Raw Data Masking）

### 2.1 Action（至少 8 steps）

1. 調整 app 以可切換資料源（query param）：`?fixture=normal` / `?fixture=high`
2. 啟動 dev server：`npm run dev`
3. 載入 `?fixture=normal`
4. 打開 DevTools → Network，確認成功抓到 json
5. 打開 React DevTools（或 console debug），輸出當前 ViewModel（不得含 raw）
6. 人為破壞 json（刪除 theme_config 或 i18n）
7. 重整頁面
8. 確認 UI 不崩潰（顯示 fallback）

### 2.2 Check（至少 10 項）

1. UI 不白屏  
2. fetch 失敗時顯示可重試 UI  
3. ViewModel 不含 `raw_score`, `severity`, `weight`, `weights`  
4. DOM 不含上述字串  
5. console 不輸出 raw 值（debug dump 必須先過濾）  
6. 刪 i18n key 時顯示 key（Fail-soft）  
7. 刪 theme_config 時自動 neutral  
8. stage2 仍可渲染（至少顯示 placeholder）  
9. no crash in console（無未捕獲例外）  
10. 產出 evidence：console dump + 截圖

### 2.3 Fail-soft 測試（降級場景）

- 移除 `theme_config`
- 移除 `i18n`
- 移除 `stage2_compass`（顯示錯誤頁但不崩）

---

## 3. Gate #2：CN/EN 即時切換（No-Reload）

### 3.1 Action（至少 7 steps）

1. 啟動 app
2. 進入 Stage2
3. 點語言切換（zh→en）
4. 觀察 1 秒
5. 再切回（en→zh）
6. 進入 Stage3
7. 重複切換

### 3.2 Check（至少 10 項）

1. 切換時不觸發 reload（Network 無 document reload）  
2. UI 文字立即更新（<100ms 主觀）  
3. stage2 guide/ title 正確切換  
4. stage3 題目與選項正確切換  
5. stage4 L1-L4 文案切換  
6. 若缺 key：顯示 key（列入缺漏清單）  
7. 無閃爍白屏  
8. 無重置 flow state（切語言不清掉選象/答案）  
9. 產出 evidence：錄影（含 browser tab 無 reload）  
10. 產出缺漏 key 報告

---

## 4. Gate #3：Stage 2 羅盤（桌面/手機）

### 4.1 Action（桌面，至少 6 steps）

1. Desktop viewport（>1024）
2. 選 3 個符碼
3. 取消其中 1 個
4. 再選回 3 個
5. 觸發確認（進 Stage3）
6. 錄影保存

### 4.2 Action（手機，至少 7 steps）

1. Chrome DevTools → iPhone 模擬
2. 進入 Stage2
3. 拖曳旋盤 5 秒
4. 點選 3 個符碼（單手可用）
5. 確認可取消一個
6. 再選回 3 個
7. 錄影保存

### 4.3 Check（至少 10 項）

1. SVG 結構（Elements 顯示 svg/g/path/circle）  
2. 禁止 Canvas  
3. 禁止 radio/checkbox/select/range  
4. 20–30 glyph 不卡死  
5. mobile 旋盤可動  
6. hit area 足夠（不需精準點小點）  
7. 選滿 3 象提示（HUD，不是 alert）  
8. 確認進 Stage3  
9. 產出 evidence：Elements 截圖 + 桌面/手機錄影  
10. 旋盤處理有節流（Performance 無大量 long task）

---

## 5. Gate #4：L1-L4 分層揭示

### 5.1 Action（至少 6 steps）

1. 完成 Stage2 + Stage3 進 Stage4
2. 觀察 L1 立即顯示
3. 等待 L2 自動顯示
4. 確認 L3 預設被遮罩
5. 觸發撥霧（點擊/長按）
6. 確認 L4 最後出現

### 5.2 Check（至少 10 項）

1. L1 立即顯示  
2. L2 延遲顯示（時間在 spec 範圍）  
3. L3 必須 user action 才顯示  
4. L4 必須在 L3 後  
5. DOM 在任何時刻都不含 `raw_score/weight`  
6. 撥霧動畫有效（或 fallback opacity）  
7. 切語言不破壞 state machine  
8. 產出 evidence：錄影（完整揭示）  
9. 產出 DOM snapshot（揭示前後各一份）  
10. 狀態機轉換可在 debug 面板觀察（dev only）

---

## 6. Gate #5：高風險覆蓋（Interceptor）

### 6.1 Action（至少 7 steps）

1. 切到 `?fixture=high`
2. 直接進 Stage4（或走完整流程）
3. 打開 DevTools → Elements
4. 搜尋 `recommendation` 或動態文案片段
5. 打開 console（或 debug）輸出 store dump（riskResolved）
6. 確認 safety template 顯示
7. 截圖/錄影存證

### 6.2 Check（至少 12 項）

1. `riskResolved.level = HIGH`  
2. `riskResolved.overridden = true`  
3. store dump 不含 `recommendation_key`  
4. DOM 搜尋不到 `recommendation_key` 或內容  
5. network payload（若有）不含動態 L4  
6. 只渲染 safety template A/B  
7. 兩次 reload（同 facetId）templateId 必須一致（deterministic）  
8. Interceptor 自己失敗時仍保守 HIGH（可用故意 throw 測試）  
9. 無 FOUC（錄影逐幀看不到閃出動態 L4）  
10. console 不可輸出動態 L4  
11. error reporting（若有）不可包含動態 L4  
12. 產出 evidence：錄影 + 掃描報告 JSON

---

## 7. Gate #6：視覺解耦（Theme Engine）

### 7.1 Action（至少 6 steps）

1. 開啟 normal fixture
2. 修改 JSON `primary_color`（例如 #FF0000）
3. reload
4. 截圖（紅色生效）
5. 移除 `theme_config`
6. reload，截圖（neutral 生效）

### 7.2 Check（至少 10 項）

1. `primary_color` 生效（按鈕/邊框/主色）  
2. 無需改 code  
3. `theme_source` 調整（facet/neutral）  
4. 刪 theme_config 不崩潰  
5. fallback 套 neutral  
6. 無 console error  
7. asset load fail 仍可渲染  
8. 切語言不影響 theme  
9. 產出 evidence：前後對照截圖  
10. CSS vars 確實存在（Elements → :root）

---

## 8. 測試工具配置（Vitest / Playwright）

### 8.1 Vitest（Unit）配置建議

- Adapter 測試：缺欄位時 fallback、生產 ViewModel 不含敏感欄位
- Risk interceptor 測試：HIGH 覆蓋，動態 L4 不存在

`package.json` scripts（示例）：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "e2e": "playwright test"
  }
}
```

**Vitest 測試樣板（示意）**：

```typescript
import { describe, it, expect } from 'vitest';
import { riskIntercept } from '../src/engine/risk/interceptor';

it('HIGH should remove dynamic L4', () => {
  const vm = { meta:{facet_id:'x', riskLevel:'HIGH'}, stages:{ results:{ l4_action:{ recommendation_key:'dyn' } } } };
  const out = riskIntercept(vm as any);
  expect(out.vm.stages.results.l4_action?.recommendation_key).toBeUndefined();
  expect(out.vm.stages.results.safety_template).toBeTruthy();
});
```

### 8.2 Playwright（E2E）配置建議

- 跑完整流程（Stage2→Stage3→Stage4）
- high fixture：確保 DOM 不含動態 L4

---

## 9. 自動化紅線掃描（可直接執行腳本）

目的：在 CI 或本地一鍵掃描「問卷化控件」「敏感字段」「高風險漏蓋」

### 9.1 DOM/HTML 掃描規則（至少 15 項）

**禁止元素**：
- `<select>`
- `<input type="radio">`
- `<input type="checkbox">`
- `<input type="range">`
- `<progress>`

**禁止字串（敏感字段）**：
- `raw_score`
- `severity`
- `weight`
- `weights`
- `severity_score`

**禁止高風險動態 L4 key**：
- `recommendation_key`
- `l4_recommendation`

### 9.2 Node 腳本（示例：掃描 build 後的 dist）

建立 `ui/scripts/redline_scan.mjs`：

```javascript
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const bannedSelectors = [
  '<select', 'type="radio"', 'type="checkbox"', 'type="range"', '<progress'
];
const bannedTokens = [
  'raw_score', 'severity', 'weight', 'weights', 'severity_score',
  'recommendation_key', 'l4_recommendation'
];

function walk(dir, acc=[]) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (/\.(html|js|css|json)$/.test(name)) acc.push(p);
  }
  return acc;
}

if (!fs.existsSync(dist)) {
  console.error('❌ dist not found. Run npm run build first.');
  process.exit(1);
}

const files = walk(dist);
let hit = 0;
const report = [];

for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  for (const token of [...bannedSelectors, ...bannedTokens]) {
    if (s.includes(token)) {
      hit++;
      report.push({ file: f, token });
    }
  }
}

fs.writeFileSync('redline_scan_report.json', JSON.stringify({ hit, report }, null, 2));

if (hit > 0) {
  console.error('❌ Redline scan failed. See redline_scan_report.json');
  process.exit(2);
}
console.log('✅ Redline scan passed.');
```

### 9.3 執行方式

```bash
cd xuance-commander-core/ui
npm run build
node scripts/redline_scan.mjs
```

---

## 10. 文件存在性驗證（追問包要求）

```bash
cd xuance-commander-core/P0-5
for f in \
  P0-5_IMPLEMENTATION_GUIDE.md \
  P0-5_COMPONENT_SPEC_COMPASS.md \
  P0-5_LOGIC_SPEC_RISK_RESULT.md \
  P0-5_TECHNICAL_RISKS.md \
  P0-5_TESTING_STRATEGY.md
do
  test -f "$f" && echo "✅ $f" || echo "❌ $f missing"
done
```

---

## 11. 可修改與可回滾聲明

**本文件所有測試策略均為「可修改」「可回滾」**：

- **可修改**：所有測試步驟、檢查清單、測試工具配置、自動化腳本均可根據實際需求調整
- **可回滾**：所有測試決策均可回滾，但必須以 ADR 記錄變更原因與影響範圍
- **影響範圍**：測試策略變更需評估對所有 MVP Gate 的影響

**回滾機制**：
- 若測試步驟不符合需求，可調整，但需 ADR 記錄
- 若測試工具不符合需求，可改用其他工具，但需 ADR 記錄
- 若自動化腳本不符合需求，可調整或移除，但需 ADR 記錄

---

**End of SPEC-7**

