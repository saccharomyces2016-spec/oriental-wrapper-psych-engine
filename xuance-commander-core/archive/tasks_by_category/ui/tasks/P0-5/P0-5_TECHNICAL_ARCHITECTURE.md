# P0-5 技術架構設計文件（SPEC-1）

**Status**：ACTIVE · EDITABLE · REFERENCE  
**Version**：v1.0 | **Date**：2026-01-10  
**Scope**：P0-5（Stage 2 → Stage 3 → Stage 4），Stage 1 僅做接口預留  
**Non-Goal**：前端不得承載任何「評分/診斷/心理學 Domain Logic」

---

## 1. 架構總覽（High-Level Architecture）

本專案採用 **Pure Renderer** 架構：  
- 前端只負責「渲染」「互動」「儀式引導」  
- 所有「分數、權重、風險鏈、診斷推論」屬於 Raw Domain Data：前端一律 **遮罩/不渲染/不記錄**

### 1.1 四層架構（4 Layers）

1) **Assets Layer**  
- SVG、字體、紋理、粒子貼圖、背景圖等

2) **Engine Layer**  
- i18n 管理（no-reload）  
- Theme Engine（CSS Variables 注入 + fail-soft 降級 Neutral Skin）  
- RiskOverride Interceptor（FOUC 防護，資料層阻斷）

3) **Adapters Layer**  
- Raw JSON → ViewModel（UI 可用資料）  
- fail-soft 補值、結構扁平化、敏感欄位遮罩

4) **Components Layer**  
- React 純 UI 元件：只吃乾淨 Props（ViewModel）

### 1.2 資料流（Data Flow）

```
Compiled Facet JSON (Raw Domain Data)
        ↓
Adapter: normalize + mask (移除敏感欄位)
        ↓
RiskOverride Interceptor (檢查 risk_level: HIGH)
        ↓
ViewModel (Safe, Clean Props)
        ↓
Zustand Global Store (僅存 locale, themeResolved, riskResolved)
        ↓
React Components (Pure Renderer)
        ↓
Flow State (React Context, 單次體驗暫存答案)
```

**關鍵原則**：
- **遮罩層**：Adapter 必須移除所有敏感欄位（score, weights, severity, band 等）
- **攔截層**：RiskOverride Interceptor 必須在 Store 更新前執行，避免 FOUC
- **渲染層**：Components 只接收 Safe ViewModel，不得直接讀取 Raw JSON

---

## 2. Adapter Pattern（資料轉換層）

### 2.1 核心原則

- UI 不得直接讀取 Raw JSON
- ViewModel 必須是「可渲染、可驗收、可降級」的乾淨資料
- Adapter 必須遮罩敏感資料：例如 score, weights, severity_score, riskchains（專案若有）等

### 2.2 Adapter 職責（必做）

#### 1. Normalization（補值）

- 缺欄位：補預設值（fail-soft）
- 欄位型別錯：嘗試修正或回退預設

#### 2. Masking（遮罩）

- 移除/不輸出任何敏感欄位
- Adapter 輸出不得包含 raw score、band、weights 等

#### 3. Flatten（扁平化）

- 將巢狀 JSON 轉成 UI 易讀結構（如：`stages.projection.questions[]`）

### 2.3 ViewModel 介面（示意）

```typescript
export type RiskLevel = 'NORMAL' | 'HIGH';

export interface FacetViewModel {
  meta: {
    facetId: string;
    title: string;
    riskLevel: RiskLevel;
    isOverridden?: boolean;
  };

  i18nDict: Record<string, { 'zh-TW': string; 'en-US': string }>;

  themeResolved: {
    cssVars: Record<string, string>;
    assetUrls: {
      backgroundUrl?: string;
      particleTextureUrl?: string;
    };
    isNeutralFallback: boolean;
  };

  stages: {
    compass: {
      symbols: Array<{
        id: string;
        labelKey: string;
        svgRef: string; // asset key/path
        track: 'INNER' | 'MIDDLE' | 'OUTER';
        weight?: never; // explicitly forbidden
      }>;
      rules: {
        selectMax: 3;
      };
    };

    projection: {
      questions: Array<{
        id: string;
        titleKey: string;
        promptKey: string;
        type: 'SINGLE' | 'MULTI';
        options: Array<{
          id: string;
          labelKey: string;
          imageRef?: string;
          sceneKey?: string; // 情境描述 key
          score?: never;     // forbidden
        }>;
      }>;
    };

    results: {
      layers: {
        l1: { titleKey: string; bodyKey: string };
        l2: { titleKey: string; bodyKey: string };
        l3: { titleKey: string; bodyKey: string };
        l4: {
          // NORMAL: may have dynamic; HIGH: must be overridden to template
          dynamicBodyKey?: string;
          safetyTemplateId?: 'TEMPLATE_A' | 'TEMPLATE_B';
          safetyBodyKey?: string;
        };
      };
      reveal: {
        orderLocked: ['L1', 'L2', 'L3', 'L4'];
        l2AutoAfterMs: 2000;
        l3RequiresUserAction: true;
      };
    };
  };
}
```

**關鍵約束**：
- `weight`, `score` 等欄位標註為 `never`，TypeScript 編譯時即會報錯
- ViewModel 結構必須與 UI 需求完全對齊，不得包含任何內部計算值

---

## 3. 狀態管理（State Management）

### 3.1 Global Store（Zustand）

**只存環境變數，不存用戶流程答案**：
- `locale`：'zh-TW' | 'en-US'
- `themeResolved`：Theme Engine 解析後結果
- `riskResolved`：RiskOverride Interceptor 計算後狀態（含 isOverridden）

**建議 Store shape**：

```typescript
type GlobalState = {
  locale: 'zh-TW' | 'en-US';
  setLocale: (v: GlobalState['locale']) => void;

  vm?: FacetViewModel; // 注意：存的是已被遮罩+攔截後的 Safe ViewModel
  setVm: (vm: FacetViewModel) => void;
};
```

**嚴禁**：將使用者選象、流程暫存資料（Flow State）或任何推導中間值、評分、權重長期存入 Global Store

### 3.2 Flow State（React Context）

**存放單次體驗暫存答案（重整即焚）**：
- `currentStage`：2 | 3 | 4（Stage 1 目前不啟動）
- `selectedSymbols`: string[]（Stage 2）
- `projectionAnswers`: Record<string, string[] | string>（Stage 3：依 SINGLE/MULTI）

**Flow State 管理原則**：
- 不得存入 Global Store（避免跨 session 留存）
- 不得存入 LocalStorage（單次體驗原則）
- 可存入 React Context（單次 session 記憶）

---

## 4. Stage 1 接口預留（Reservation Only）

**P0-5 從 Stage 2 啟動，但必須預留 Stage 1 接口（Router / Data / Slot）。**

### 4.1 Router Interface

- **`/`**：預設導向 Stage 2 容器
- **`/start`**：預留給 Stage 1
- **臨時占位**：`<Navigate replace to="/" />`

**路由配置示例**（React Router）：
```typescript
<Routes>
  <Route path="/start" element={<Stage1Slot />} /> {/* 預留，目前不渲染 */}
  <Route path="/" element={<Stage2Page />} /> {/* 預設入口 */}
  <Route path="/stage3" element={<Stage3Page />} />
  <Route path="/stage4" element={<Stage4Page />} />
</Routes>
```

### 4.2 Data Interface（Props Optional）

- **Stage 2 若未取得 Stage 1 的資料**（如 `birthData`, `domain_id`），不得阻塞流程
- **Adapter 注入 default/mock**，使 Stage 2 可渲染

**Adapter 處理邏輯**：
```typescript
function buildSafeViewModel(raw: any, stage1Data?: any): FacetViewModel {
  // Stage 1 資料是可選的
  const domainId = stage1Data?.domain_id || 'default_domain';
  
  // Stage 2 不依賴 Stage 1 的輸出
  // 若 Stage 1 缺失，Stage 2 仍可正常運行
  return {
    // ... ViewModel 結構
  };
}
```

### 4.3 Component Slot

```tsx
// MainLayout.tsx (示意)
function MainLayout() {
  const hasStage1 = false; // P0-5 階段為 false，未來可切換為 true

  return (
    <>
      {hasStage1 && <Stage1Widget />}
      <Outlet /> {/* Stage 2/3/4 渲染 */}
    </>
  );
}
```

**未來擴展方式**：
- 將 `hasStage1` 改為由配置或路由參數決定
- Stage 1 組件可無縫插入，不影響既有流程

---

## 5. 架構擴展性說明

### 5.1 如何新增 Facet（更換 JSON，無需修改程式碼）

**步驟**：
1. 新增 `compiled_facet.json` 文件（符合 UMIP Schema v1）
2. 在 UI 入口處指定要載入的 JSON 路徑
3. Adapter 自動解析並轉換為 ViewModel
4. Components 自動適應新的資料結構（因為使用 ViewModel 介面）

**擴展成本**：**零代碼修改**（僅需新增 JSON 文件）

### 5.2 如何新增 Stage（接口預留機制）

**步驟**：
1. 在 ViewModel 的 `stages` 中新增 Stage 定義
2. 新增 Stage 組件（遵循 Pure Renderer 原則）
3. 更新路由配置（新增 Stage 路由）
4. 更新 Flow State（新增 Stage 狀態）

**擴展成本**：**低**（只需新增組件和路由，不需要修改既有組件）

### 5.3 如何擴展主題（`theme_config` 擴展）

**步驟**：
1. 在 `theme_config` 中新增視覺資產欄位
2. Theme Engine 自動讀取並應用（fail-soft 處理缺失欄位）
3. UI 自動適應新的視覺樣式（因為使用 CSS Variables）

**擴展成本**：**低**（只需擴展 JSON Schema，Theme Engine 自動處理）

---

## 6. 禁止事項（Hard Prohibitions / Redlines）

**違反以下任一條，視為 Critical Bug，不予驗收**：

1. **禁止 UI 出現任何「量表、分數、問卷控件」**：
   - ❌ slider、radio group、Likert 1-5、checkbox、range input
   - ✅ 必須使用 SVG 互動、卡片選擇、儀式感互動

2. **禁止 console/network 泄漏 Raw Data**：
   - ❌ `console.log(raw.score)`, `console.log(raw.weights)`
   - ❌ Network Payload 中包含 `score`, `band`, `weights` 等
   - ✅ 僅允許封裝後的 `narrative_text`, `visual_id` 等

3. **HIGH Risk 下，動態 L4 建議不得進入 Store**：
   - ❌ 先寫入 Store，再進行覆蓋（會導致 FOUC）
   - ✅ 必須在 Interceptor 層完全丟棄，從未進入 Store

4. **禁止 UI Component 直接讀取 Raw JSON**：
   - ❌ `component.props.rawData.score`
   - ✅ 只允許 `component.props.vm.stages.results.layers.l2.titleKey`

---

## 7. 資料流詳細設計

### 7.1 完整資料流圖

```
[1] compiled_facet.json (Raw Domain Data)
        ↓
[2] Adapter: normalizeAndMask()
        ├─ 補值（fail-soft）
        ├─ 扁平化結構
        └─ 遮罩敏感欄位（score, weights, band 等）
        ↓
[3] Theme Engine: resolveTheme()
        ├─ 讀取 theme_config
        ├─ 解析 CSS Variables
        └─ 降級處理（缺失 → Neutral Skin）
        ↓
[4] RiskOverride Interceptor: riskInterceptor()
        ├─ 檢查 risk_level
        ├─ HIGH: 丟棄 dynamic L4，注入安全模板
        └─ NORMAL: 通過
        ↓
[5] ViewModel (Safe, Clean Props)
        ↓
[6] Zustand Store: setVm()
        └─ 僅存 Safe ViewModel
        ↓
[7] React Components (Pure Renderer)
        ├─ 讀取 Store 中的 Safe ViewModel
        ├─ 渲染 UI（使用 i18n, themeResolved）
        └─ 收集用戶選擇（存入 Flow State）
```

### 7.2 資料轉換點說明

| 轉換點 | 輸入 | 輸出 | 關鍵操作 |
| --- | --- | --- | --- |
| **Adapter** | Raw JSON | Normalized + Masked Data | 補值、扁平化、遮罩 |
| **Theme Engine** | `theme_config` | `themeResolved` | 解析、降級 |
| **Risk Interceptor** | Normalized Data | Safe ViewModel | 檢查、覆蓋、標記 |
| **Store** | Safe ViewModel | Global State | 僅存環境變數 |
| **Components** | Safe ViewModel (from Store) | UI Rendered | 純渲染，不計算 |

### 7.3 錯誤處理流程（Fail-soft 機制）

**Adapter 層錯誤處理**：
```typescript
function buildSafeViewModel(raw: any): FacetViewModel {
  try {
    // 正常處理
    return normalizeAndMask(raw);
  } catch (error) {
    // 降級：返回最小可用 ViewModel
    return DEFAULT_MINIMAL_VIEWMODEL;
  }
}
```

**Theme Engine 錯誤處理**：
```typescript
function resolveTheme(themeConfig: any) {
  try {
    // 正常解析
    return parseThemeConfig(themeConfig);
  } catch (error) {
    // 降級：返回 Neutral Skin
    return NEUTRAL_THEME;
  }
}
```

**降級策略**：
- **JSON 載入失敗** → 顯示「卦象未成，暫不可觀」錯誤頁面
- **theme_config 缺失** → 使用 Neutral Ritual Skin
- **i18n key 缺失** → 回退到 key 字串本身
- **Stage 資料缺失** → 顯示占位內容，不崩潰

---

## 8. 組件架構設計

### 8.1 組件層級架構

```
App (Root)
├── MainLayout
│   ├── Stage1Slot (預留，目前不渲染)
│   └── Outlet (Stage 2/3/4)
│       ├── Stage2Page
│       │   └── RadialCompass (SVG 羅盤)
│       ├── Stage3Page
│       │   └── ProjectiveCard (投射卡片)
│       └── Stage4Page
│           └── ResultLayers (L1-L4 分層呈現)
├── ThemeProvider (注入 CSS Variables)
├── I18nProvider (提供 t() 函數)
└── FlowStateProvider (管理流程狀態)
```

### 8.2 組件職責邊界

| 組件類型 | 職責 | 禁止事項 |
| --- | --- | --- |
| **Page Components** | 路由容器、Stage 流程控制 | 不得包含 domain logic |
| **Feature Components** | Stage 2/3/4 具體實作 | 不得直接讀取 Raw JSON |
| **Shared Components** | 通用 UI 元件（按鈕、卡片等） | 不得包含業務邏輯 |
| **Engine Components** | i18n, Theme, Risk 核心引擎 | 不得影響 UI 渲染邏輯 |

---

## 9. 與上游文件的對齊關係（Traceability）

本文件與以下文件的對齊關係：

- **技術規格結案包**：`P0-5/P0-5_TECHNICAL_SPEC_CLOSURE_PACK.md` 第 1 章「核心技術決策」
  - ✅ 對齊：React + Vite, Zustand, Adapter Pattern
  - ✅ 對齊：Stage 1 接口預留機制

- **UMIP 結案報告**：`P0-5/P0-5_UMIP_CLOSURE_REPORT.md` 第 3 章「通用玄學介面架構」
  - ✅ 對齊：Pure Renderer 原則
  - ✅ 對齊：隱喻解耦（Metaphor-Agnostic）架構

- **工程執行報告**：`P0-5/P0-5_IMPLEMENTATION_EXECUTION_REPORT.md` 第 4 章「實作範圍與技術決策」
  - ✅ 對齊：Component-Based Architecture
  - ✅ 對齊：SVG 為 Stage 2 核心渲染技術

---

## 10. 可修改與可回滾聲明

**本文件所有技術規格均為「可修改」「可回滾」**：

- **可修改**：所有架構設計、資料流設計、接口設計均可根據實際需求調整
- **可回滾**：所有技術決策均可回滾，但必須以 ADR 記錄變更原因與影響範圍
- **影響範圍**：架構變更需評估對所有組件的影響，確保向後相容

**回滾機制**：
- 若 Adapter Pattern 不符合需求，可改為直接讀取 JSON，但需 ADR 記錄
- 若 Zustand 不符合需求，可改為 Context API，但需 ADR 記錄
- 若 Stage 1 接口預留機制不符合需求，可改為硬編碼，但需 ADR 記錄

---

**End of SPEC-1**

