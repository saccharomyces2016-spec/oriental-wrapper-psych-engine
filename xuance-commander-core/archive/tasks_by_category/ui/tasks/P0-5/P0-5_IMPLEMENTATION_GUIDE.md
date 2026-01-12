# P0-5 實作指南（SPEC-3）

**Status**：ACTIVE · EDITABLE · REFERENCE（NOT FROZEN）  
**Version**：v1.0  
**Date**：2026-01-10  
**Traceability**：Aligned with `P0-5_TECHNICAL_SPEC_CLOSURE_PACK.md` + Supplement Query Packet v2

---

## 0. 本文件目的（Why this doc exists）

本文件提供「可直接動工」的實作指南，特別針對：
1. D2（生產級目錄與工程骨架）  
2. D4（i18n No-Reload）  
3. D5（Theme Engine + Neutral Skin Fail-soft）  
4. **Adapter → Risk Interceptor → Store → UI** 的接線方式  
5. 專案初始化：命令序列、依賴版本、目錄建立、基本 config 檔案（可直接使用）

**目標**：Cursor/Codex 能在不猜測、不補洞的情況下完成 MVP 實作。

---

## 1. 前置假設與硬性約束（Non-Negotiables）

### 1.1 Pure Renderer 原則（不可破壞）
- UI 僅渲染 `ViewModel`，不得持有 Domain Logic（評分、權重、推導中間值）。
- UI 禁止直接讀取 Raw JSON（必須經 Adapter）。

### 1.2 Global vs Flow State 邊界（不可混用）
- Global Store（Zustand）只存：`locale`, `themeResolved`, `riskResolved`（環境態）
- Flow State（React Context / component state）只存：單次體驗資料（符碼選取、投射答案、分層揭示狀態）

### 1.3 風險覆蓋（RiskOverride）必須是 Interceptor
- Risk Interceptor 必須在 `store.setState()` **之前**完成覆蓋，避免 FOUC。

---

## 2. 專案初始化（React + Vite）— 可直接執行命令序列

> 下列命令序列以「可重跑」為原則；若目錄存在則不覆蓋關鍵檔案（用 `test -f` 保護）。

### 2.1 建立 Vite + React + TS

```bash
set -e

# 1) 進入 repo 根目錄（依你的實際路徑調整）
cd xuance-commander-core

# 2) 建立 ui 專案（若已存在，跳過）
if [ ! -d "ui" ]; then
  npm create vite@5 ui -- --template react-ts
fi

cd ui
npm install
```

### 2.2 安裝依賴（含版本號）

若你已經有既定版本鎖定策略，允許以 ADR 調整；此處提供可用的 baseline。

```bash
set -e
cd xuance-commander-core/ui

# runtime
npm i zustand@4 react-router-dom@6

# dev tooling
npm i -D vitest@1 @vitest/ui@1 jsdom@24 \
  @types/node@20 eslint@9 typescript@5

# e2e
npm i -D playwright@1
npx playwright install --with-deps
```

### 2.3 建立目錄結構（D2）

```bash
set -e
cd xuance-commander-core/ui

mkdir -p src/adapters
mkdir -p src/assets/fonts src/assets/svg src/assets/textures
mkdir -p src/components/compass src/components/projection src/components/results src/components/shared
mkdir -p src/engine/i18n src/engine/theme src/engine/risk
mkdir -p src/pages src/state src/utils
mkdir -p public/data public/templates
mkdir -p ../P0-5/examples
```

---

## 3. 目錄結構設計（D2）— 完整結構與職責（含 prototype 關係）

### 3.1 完整目錄樹（建議 baseline）

```
ui/
  src/
    adapters/
      index.ts
      facetAdapter.ts
      types.ts
      failsoft.ts
    assets/
      fonts/
      svg/
      textures/
    components/
      shared/
        Button.tsx
        Toggle.tsx
        ErrorBoundary.tsx
        Loading.tsx
      compass/
        RadialCompass.tsx
        SymbolGlyph.tsx
        compassMath.ts
        useCompassGestures.ts
      projection/
        ProjectionStage.tsx
        ProjectionCard.tsx
        projectionTypes.ts
      results/
        ResultStage.tsx
        layers/
          L1Title.tsx
          L2Narrative.tsx
          L3Reveal.tsx
          L4Action.tsx
        resultStateMachine.ts
    engine/
      i18n/
        store.ts
        i18nTypes.ts
        loader.ts
      theme/
        themeTypes.ts
        themeEngine.ts
        neutralTheme.ts
      risk/
        riskTypes.ts
        templates.ts
        interceptor.ts
    pages/
      Stage2Page.tsx
      Stage3Page.tsx
      Stage4Page.tsx
      StartReserved.tsx
    state/
      globalStore.ts
      flowContext.tsx
    utils/
      assertNever.ts
      safeJson.ts
      domScan.ts
      networkTap.ts
    App.tsx
    main.tsx
  public/
    data/
      compiled_facet.json
    templates/
      safety_template_A.json
      safety_template_B.json
  vite.config.ts
  tsconfig.json
```

### 3.2 各層責任（至少 3–5 句，避免灰區）

#### `adapters/`：
1. 將 `compiled_facet.json` 解析成 UI 使用的 `FacetViewModel`。
2. 一律在此處做 Fail-soft（缺值補齊）與 Data Masking（敏感欄位剔除）。
3. 永遠不要在 component 內做「如果缺值就…」的修補，避免重複與漏網。
4. 這裡也負責「結構解耦」：Raw JSON 可改，但 ViewModel 對 UI 必須穩定。

#### `engine/`：
1. 放「跨頁、跨元件」的機制：i18n、theme、risk interceptor。
2. engine 不直接渲染 UI；它提供 store、工具函式、模板載入與決策（例如 risk template A/B）。
3. engine 不含 domain 評分；僅做「安全覆蓋」「語言切換」「皮層注入」。

#### `components/`：
1. Pure View：UI = f(ViewModel + FlowState + EnvState)。
2. 不可讀 Raw JSON，不可自行判斷 risk 規則。
3. 所有動畫、互動只依「狀態」與「Props」。

#### `pages/`：
1. Route Container：組裝 stage，接線 store/context。
2. 可做資料載入（fetch `compiled_facet.json`）與 adapter 呼叫，但不做資料修補。

#### `state/`：
1. `globalStore.ts`：只放 locale/themeResolved/riskResolved（環境態）。
2. `flowContext.tsx`：只放 stage 流程態（選象/投射答案/結果揭示狀態）。

#### `public/`：
1. 放可 fetch 的資料與模板（安全模板 A/B）。
2. 允許用 mock data 驗收 Gate（例如 high risk sample）。

### 3.3 `prototype/` 的關係（參考 vs 遷移）

- `prototype/` 僅作「行為參考」，不得被 production code import。
- 若 `prototype/app.js` 內含可用的 SVG path 或動畫參數：
  1. 先複製到 `docs/notes/prototype_extract.md`（可追溯）
  2. 再由工程師手動轉寫到 `src/components/compass/` 或 `src/adapters/`
- 原型如果直接操作 DOM：
  - production 必須改成 React state/props 驅動；不得延續 `document.querySelector` 的控制方式。

---

## 4. i18n 實作指南（D4）— No-Reload + 原生語感保證

### 4.1 i18n 策略（Parallel Key，非 runtime 翻譯）

- 每個文案 key 都必須有 zh-TW 與 en-US 的並列內容。
- UI 永遠以 `t(key)` 取值；不得在 component hardcode 文字。
- 原生語感保證：內容產出流程中，英文不是翻譯，而是獨立撰寫（可由內容團隊或 Gemini 提供）。

### 4.2 i18n Store（Zustand）— 完整型別與 Fail-soft

```typescript
// src/engine/i18n/i18nTypes.ts
export type Locale = 'zh-TW' | 'en-US';

export type I18nDict = Record<
  string,
  Partial<Record<Locale, string>>
>;

// src/engine/i18n/store.ts
import { create } from 'zustand';
import type { I18nDict, Locale } from './i18nTypes';

type I18nState = {
  locale: Locale;
  dict: I18nDict;
  setLocale: (locale: Locale) => void;
  setDict: (dict: I18nDict) => void;
  t: (key: string) => string;
};

export const useI18nStore = create<I18nState>((set, get) => ({
  locale: 'zh-TW',
  dict: {},
  setLocale: (locale) => set({ locale }),
  setDict: (dict) => set({ dict }),
  t: (key) => {
    const { dict, locale } = get();
    const v = dict[key]?.[locale];
    // Fail-soft: 找不到就回 key（可被 Gate 掃描抓到）
    return (typeof v === 'string' && v.trim().length > 0) ? v : key;
  },
}));
```

### 4.3 i18n Loader（從 compiled_facet.json 注入）

```typescript
// src/engine/i18n/loader.ts
import { useI18nStore } from './store';
import type { I18nDict } from './i18nTypes';

export function loadI18nFromFacetJson(raw: any): I18nDict {
  // Fail-soft: 若缺失，回空字典
  const dict = raw?.i18n;
  if (!dict || typeof dict !== 'object') return {};
  return dict as I18nDict;
}

// 在 page/container 內：fetch JSON -> setDict
export async function bootstrapI18n(rawFacet: any) {
  const dict = loadI18nFromFacetJson(rawFacet);
  useI18nStore.getState().setDict(dict);
}
```

### 4.4 No-Reload 切換機制（完整步驟 8 steps）

1. `useI18nStore` 保存 `locale`。
2. 語言切換按鈕呼叫 `setLocale('en-US')` 或 `setLocale('zh-TW')`。
3. 所有 UI 文字只透過 `t(key)` 渲染。
4. 切換 `locale` 時，Zustand 觸發訂閱更新，React 重繪。
5. Stage 2/3/4 皆不得 cache 已翻譯文字（只能 cache key）。
6. 若某 key 缺語言版本，UI 顯示 key（Fail-soft），並由 Gate 掃描輸出缺漏清單。
7. 測試：切換語言時不得觸發 `window.location.reload`。
8. 性能：dict 大時，避免在 render 期做深層 clone；僅在 bootstrap 時 `setDict` 一次。

---

## 5. Theme Engine 實作指南（D5）— CSS Vars + Neutral Skin + Fail-soft

### 5.1 Theme 型別與 Neutral Theme

```typescript
// src/engine/theme/themeTypes.ts
export type ThemeAssets = {
  background_url?: string;
  particle_texture?: string;
};

export type ThemeConfig = {
  primary_color: string;     // "#RRGGBB"
  font_family?: string;      // e.g. "Inter, system-ui"
  assets?: ThemeAssets;
};

export type ResolvedTheme = ThemeConfig & {
  __resolved: true;
  __source: 'facet' | 'neutral';
};

// src/engine/theme/neutralTheme.ts
import type { ResolvedTheme } from './themeTypes';

export const NEUTRAL_THEME: ResolvedTheme = {
  primary_color: '#222222',
  font_family: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
  assets: { background_url: '', particle_texture: '' },
  __resolved: true,
  __source: 'neutral',
};
```

### 5.2 Theme Engine（完整步驟 9 steps）

1. Adapter 解析 `theme_config`，若缺失或不合法 → 回傳 `NEUTRAL_THEME`。
2. `themeResolved` 存入 Global Store。
3. `applyTheme(themeResolved)` 將值注入 CSS Variables。
4. 若背景圖 URL 無法載入，不拋錯：背景 fallback 到純色/漸層（由 CSS 定義）。
5. 若 `primary_color` 不是 `#RRGGBB`，強制 Neutral。
6. 引擎不得在 render 中同步 fetch 資源（避免卡頓）。
7. 切換 Facet 時可重複呼叫 `applyTheme`。
8. 任何例外都要被 catch，且降級為 Neutral。
9. Gate #6 會測：改 JSON 色碼即換膚、刪 `theme_config` 自動回退。

### 5.3 applyTheme 偽代碼（可直接轉 TS）

```typescript
// src/engine/theme/themeEngine.ts
import type { ResolvedTheme, ThemeConfig } from './themeTypes';
import { NEUTRAL_THEME } from './neutralTheme';

function isHexColor(s: unknown): s is string {
  return typeof s === 'string' && /^#([A-Fa-f0-9]{6})$/.test(s);
}

export function resolveTheme(raw: any): ResolvedTheme {
  const cfg = raw as Partial<ThemeConfig>;
  if (!cfg || !isHexColor(cfg.primary_color)) return NEUTRAL_THEME;
  return {
    primary_color: cfg.primary_color,
    font_family: cfg.font_family ?? NEUTRAL_THEME.font_family,
    assets: cfg.assets ?? NEUTRAL_THEME.assets,
    __resolved: true,
    __source: 'facet',
  };
}

export function applyTheme(theme: ResolvedTheme) {
  try {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', theme.primary_color);
    root.style.setProperty('--theme-font', theme.font_family ?? '');

    const bg = theme.assets?.background_url ?? '';
    root.style.setProperty('--theme-bg-url', bg ? `url(${bg})` : 'none');

    const particle = theme.assets?.particle_texture ?? '';
    root.style.setProperty('--theme-particle-url', particle ? `url(${particle})` : 'none');

    root.dataset.themeSource = theme.__source;
  } catch {
    // 最終保險：即使 applyTheme 自己爆，也不能讓 UI 白屏
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', NEUTRAL_THEME.primary_color);
    root.style.setProperty('--theme-font', NEUTRAL_THEME.font_family ?? '');
    root.style.setProperty('--theme-bg-url', 'none');
    root.style.setProperty('--theme-particle-url', 'none');
    root.dataset.themeSource = 'neutral';
  }
}
```

---

## 6. Adapter → Interceptor → Store 接線（關鍵流程）

### 6.1 完整接線流程（文字流程圖）

1. Page fetch `public/data/compiled_facet.json`
2. Adapter: `facetAdapter(raw)` → `FacetViewModel`（Fail-soft + Masking）
3. Risk Interceptor: `intercept(vm)` → `SafeFacetViewModel`（HIGH 覆蓋）
4. Global Store: `setResolvedEnv({ themeResolved, riskResolved })`
5. Flow Context reset（進入新體驗）
6. UI Render：Stage2 使用 `vm.stages.compass`，Stage3 使用 `vm.stages.projection`，Stage4 使用 `vm.stages.results`

### 6.2 每個接線點說明（避免灰區）

- **Fetch 層**：只負責 I/O，不做 schema 修補。
- **Adapter**：唯一允許「補欄位」「mask 欄位」的地方。
- **Interceptor**：唯一允許「高風險覆蓋」的地方；覆蓋後動態 L4 永不進 store。
- **Store**：只存 env，且不得存入投射答案或符碼選取。
- **UI**：只 render props，不做 risk 判斷，不做 schema fallback。

### 6.3 錯誤處理鏈（完整）

- **JSON fetch 失敗** → 顯示 ErrorBoundary + 提供「重試」按鈕（不崩潰）。
- **JSON parse 失敗** → `safeJson` 回傳 null → 使用本地 fallback（空 facet + neutral theme）
- **Adapter 讀值失敗** → 永遠回 `FailSoftViewModel`（至少能顯示基本 UI）
- **Theme apply 失敗** → 自動套 neutral
- **Risk interceptor 失敗** → 預設視為 HIGH（保守策略，避免漏蓋）

---

## 7. 建議的全域 Store（僅環境態）

```typescript
// src/state/globalStore.ts
import { create } from 'zustand';
import type { Locale } from '../engine/i18n/i18nTypes';
import type { ResolvedTheme } from '../engine/theme/themeTypes';

export type RiskResolved = {
  level: 'NORMAL' | 'HIGH';
  overridden: boolean;
  templateId?: 'A' | 'B';
};

type GlobalState = {
  locale: Locale;
  themeResolved: ResolvedTheme;
  riskResolved: RiskResolved;

  setLocale: (locale: Locale) => void;
  setThemeResolved: (t: ResolvedTheme) => void;
  setRiskResolved: (r: RiskResolved) => void;
};

export const useGlobalStore = create<GlobalState>((set) => ({
  locale: 'zh-TW',
  themeResolved: {
    primary_color: '#222222',
    font_family: 'system-ui',
    assets: { background_url: '', particle_texture: '' },
    __resolved: true,
    __source: 'neutral',
  },
  riskResolved: { level: 'NORMAL', overridden: false },

  setLocale: (locale) => set({ locale }),
  setThemeResolved: (themeResolved) => set({ themeResolved }),
  setRiskResolved: (riskResolved) => set({ riskResolved }),
}));
```

---

## 8. 最終自檢清單（本文件對應 Gate）

- Gate #2：i18n 切換不 reload；缺 key 顯示 key（可被掃描）
- Gate #6：`theme_config` 改色即變；刪除 `theme_config` 回 neutral
- Gate #5：Risk interceptor 在 store 前覆蓋；HIGH 不得出現動態 L4

---

## 9. 可修改與可回滾聲明

**本文件所有實作指南均為「可修改」「可回滾」**：

- **可修改**：所有目錄結構、實作步驟、程式碼結構建議均可根據實際需求調整
- **可回滾**：所有技術決策均可回滾，但必須以 ADR 記錄變更原因與影響範圍
- **影響範圍**：實作指南變更需評估對所有組件的影響，確保向後相容

**回滾機制**：
- 若目錄結構不符合需求，可調整，但需 ADR 記錄
- 若 i18n 實作方案不符合需求，可改用其他方案，但需 ADR 記錄
- 若 Theme Engine 實作方案不符合需求，可改用其他方案，但需 ADR 記錄

---

**End of SPEC-3**

