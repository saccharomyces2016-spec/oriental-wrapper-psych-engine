# P0-5 Risk 邏輯與結果呈現規格（SPEC-5）

**Status**：ACTIVE · EDITABLE · REFERENCE（NOT FROZEN）  
**Version**：v1.0  
**Date**：2026-01-10  
**Scope**：D6 RiskOverride Interceptor + D7 L1-L4 Result Layers + Stage 3 Projection Spec

---

## 0. 本文件目標（Cursor-Executable）

本文件必須讓工程端能「無猜測」完成三件事：
1. **RiskOverride 必須是 Interceptor**，阻斷 HIGH 時的動態 L4（含 FOUC 防護）  
2. **L1–L4 分層揭示**：順序鎖定、L3 主動揭示、狀態機、動畫策略  
3. **Stage 3 投射定歸因**：卡片結構、題目/選項型別、互動/流程、RWD、紅線驗收

---

## 1. RiskOverride — Interceptor Pattern（D6，重點）

### 1.1 核心約束（Critical）

- 攔截點必須在：`Adapter Output` → **Risk Interceptor** → `Store.setState()` → `View Render`
- 在 HIGH 狀態下：
  - 動態 L4 建議「必須被丟棄」
  - UI State（store / props）中「不得存在」任何動態 L4 文字或 key
- 任一違反：Critical Bug，不予驗收（Gate #5）

### 1.2 Risk 型別（TS）

```typescript
export type RiskLevel = 'NORMAL' | 'HIGH';

export type RiskResolved = {
  level: RiskLevel;
  overridden: boolean;
  templateId?: 'A' | 'B';
  reason?: 'facet_risk_high' | 'interceptor_fail_safe';
};
```

### 1.3 Safety Template 管理（Template A/B）

#### 1.3.1 存放位置（必須）

- `ui/public/templates/safety_template_A.json`
- `ui/public/templates/safety_template_B.json`

#### 1.3.2 Template 資料結構（TS）

```typescript
export type SafetyTemplate = {
  template_id: 'A' | 'B';
  title_key: string;
  body_keys: string[];   // 多段落 i18n keys
  cta?: { label_key: string; href?: string };
};
```

#### 1.3.3 Template 選擇邏輯（可追溯、可重跑）

- **baseline**：deterministic（避免不可重現）
- `templateId = (hash(facet_id) % 2 === 0) ? 'A' : 'B'`
- 若未來要做真 A/B（分析工具、cookie）：需 ADR

**偽代碼**：

```typescript
function pickTemplateId(facetId: string): 'A'|'B' {
  let h = 0;
  for (let i=0;i<facetId.length;i++) h = (h*31 + facetId.charCodeAt(i)) >>> 0;
  return (h % 2 === 0) ? 'A' : 'B';
}
```

### 1.4 Interceptor 接線位置（必須寫死，不可模糊）

#### 1.4.1 正確接線（唯一允許）

```
const vm = facetAdapter(raw)
const safe = riskIntercept(vm, raw)  ← 必須在 store 之前
store.setState({ themeResolved, riskResolved })
render(safe)
```

#### 1.4.2 禁止接線（會產生 FOUC）

- ❌ 禁止：先 `store.setState(vm)`，再在 component `useEffect` 內覆蓋
- ❌ 禁止：先 render dynamic L4，再 conditional render safety template

### 1.5 Risk Interceptor（完整偽代碼，可轉 TS）

#### 1.5.1 ViewModel 相關型別（簡化版）

```typescript
export type ResultLayers = {
  l1_title_key: string;
  l2_narrative_key: string;
  l3_insight_key: string;
  l4_action?: {
    recommendation_key?: string; // 動態內容（NORMAL 可用）
    // 任何 raw 內容不得進入 vm
  };
  safety_template?: {
    template_id: 'A'|'B';
    title_key: string;
    body_keys: string[];
    cta?: { label_key: string; href?: string };
  };
};

export type FacetViewModel = {
  meta: { facet_id: string; riskLevel: 'NORMAL'|'HIGH' };
  stages: {
    results: ResultLayers;
    // projection, compass 省略
  };
};
```

#### 1.5.2 Interceptor 實作

```typescript
import type { FacetViewModel } from '../adapters/types';
import type { RiskResolved } from './riskTypes';
import { loadSafetyTemplate } from './templates';

export function riskIntercept(vm: FacetViewModel): { vm: FacetViewModel; risk: RiskResolved } {
  try {
    if (vm.meta.riskLevel !== 'HIGH') {
      return { vm, risk: { level: 'NORMAL', overridden: false } };
    }

    const tid = pickTemplateId(vm.meta.facet_id);
    const tpl = loadSafetyTemplate(tid); // sync load from in-memory cache or preloaded JSON

    // 1) 丟棄 dynamic L4（關鍵）
    const safeResults = { ...vm.stages.results };
    if (safeResults.l4_action) {
      safeResults.l4_action = {}; // 或直接刪除
    }
    // 2) 注入 safety template
    safeResults.safety_template = tpl;

    // 3) 返回 new vm（不可 mutate 原 vm，以利審計/測試）
    const safeVm: FacetViewModel = {
      ...vm,
      stages: { ...vm.stages, results: safeResults },
    };

    return {
      vm: safeVm,
      risk: { level: 'HIGH', overridden: true, templateId: tid, reason: 'facet_risk_high' },
    };
  } catch {
    // Fail-safe：攔截器自己出錯，仍需保守 = HIGH
    const tid: 'A'|'B' = 'A';
    const tpl = loadSafetyTemplate(tid);
    const safeVm: FacetViewModel = {
      ...vm,
      meta: { ...vm.meta, riskLevel: 'HIGH' },
      stages: {
        ...vm.stages,
        results: {
          ...vm.stages.results,
          l4_action: {},
          safety_template: tpl,
        },
      },
    };
    return {
      vm: safeVm,
      risk: { level: 'HIGH', overridden: true, templateId: tid, reason: 'interceptor_fail_safe' },
    };
  }
}
```

### 1.6 FOUC 防護驗收（必須）

在 HIGH 測試資料下：
1. 任何時刻 DOM 不得出現 dynamic recommendation 的文字或 key
2. store 序列化（debug）不得包含 `recommendation_key`
3. network payload（若有）不得包含 dynamic L4 文案

---

## 2. L1–L4 分層揭示（D7）

### 2.1 分層定義（語意）

- **L1**：Title / 牌面總標題（立即可見）
- **L2**：Narrative / 敘事（自動延遲揭示）
- **L3**：Insight / 迷霧層（必須使用者主動揭示）
- **L4**：Action / 行動建議（NORMAL：動態 key；HIGH：安全模板）

### 2.2 順序鎖定（不可變更）

- L1 → L2 → L3 → L4
- L3 必須是 User Action（點擊/長按/撥霧），不得 auto reveal
- L4 必須等 L3 完成後才可 reveal

### 2.3 狀態機（完整定義）

```typescript
export type ResultState =
  | { s: 'L1_ONLY' }
  | { s: 'L2_REVEALING'; t0: number }
  | { s: 'L2_SHOWN' }
  | { s: 'L3_WAITING' }
  | { s: 'L3_REVEALING'; t0: number }
  | { s: 'L3_SHOWN' }
  | { s: 'L4_REVEALING'; t0: number }
  | { s: 'L4_SHOWN' };
```

### 2.4 狀態轉換規則（不可模糊）

- **初始化**：`L1_ONLY`
- **進入結果頁後**：
  - 立即轉 `L2_REVEALING`，並在 1200ms 後 → `L2_SHOWN`
  - `L2_SHOWN` 立即 → `L3_WAITING`
- **L3_WAITING**：
  - 只有 user action 觸發 → `L3_REVEALING`
  - `L3_REVEALING` 在 600ms 後 → `L3_SHOWN`
- **L3_SHOWN** 自動 → `L4_REVEALING`
- **L4_REVEALING** 在 600ms 後 → `L4_SHOWN`

### 2.5 「撥霧」隱喻（視覺表現）

- L3 預設被霧 mask 遮罩（SVG mask 或 CSS blur/overlay）
- User action 觸發：
  - 霧層透明度從 1 → 0（600ms）
  - blur 從 10px → 0（600ms）
- 必須可在低效能模式降級（只做 opacity）

### 2.6 高風險鎖定（HIGH 時 L4 規則）

- **HIGH 時**：
  - L4 永遠渲染 `safety_template`
  - 不讀、不渲染 `l4_action.recommendation_key`（該欄位應不存在）
- **NORMAL 時**：
  - L4 渲染 `recommendation_key`（透過 i18n `t()`）

---

## 3. Stage 3 投射定歸因（詳細技術規格）

### 3.1 Stage 3 的定位

- **形式**：一題一畫面（單卡片）
- **互動**：直覺選擇「象 / 狀態」，非數值、非評分
- **狀態**：答案暫存於 Flow State，完成後進 Stage 4

### 3.2 題目資料結構（TS Types）

```typescript
export type ProjectionQuestionType = 'SINGLE' | 'MULTI';

export type ProjectionOption = {
  id: string;
  label_key: string;         // i18n key
  visual_id?: string;        // 若是圖像選項
  description_key?: string;  // 狀態描述 i18n key
};

export type ProjectionQuestion = {
  id: string;
  title_key: string;
  prompt_key: string;
  type: ProjectionQuestionType;
  options: ProjectionOption[];
  // 是否需要確認按鈕（避免過快誤觸）
  confirm_mode: 'AUTO_ADVANCE' | 'REQUIRE_CONFIRM';
};

export type ProjectionViewModel = {
  stage_title_key: string;
  questions: ProjectionQuestion[];
};
```

### 3.3 答案資料結構（Flow State）

```typescript
export type ProjectionAnswers =
  Record<string, { selectedOptionIds: string[] }>;
```

### 3.4 卡片結構（完整佈局定義）

- **Header**：
  - Stage title（`stage_title_key`）
  - Question title（`title_key`）
- **Body**：
  - Prompt（`prompt_key`）
  - Options grid（但不是問卷列表；必須是「象/狀態卡」）
- **Footer**：
  - 非數字進度（例如「星線連結」icon 變亮）
  - Confirm（若 `confirm_mode=REQUIRE_CONFIRM`）

**禁止**：顯示「第 3/10 題」的數字

### 3.5 單選 vs 多選（完整互動）

- **SINGLE**：
  - 點選 option → 立即選中
  - 若 `AUTO_ADVANCE`：延遲 250ms 進下一題（保留視覺回饋）
  - 若 `REQUIRE_CONFIRM`：顯示 Confirm（不可用表單 submit）
- **MULTI**：
  - 可多選；再次點擊可取消
  - Confirm 才能進下一題（避免無意跳題）

### 3.6 轉場動畫（完整參數）

- **進入下一題**：
  - 現卡：opacity 1→0 + translateX 0→-20（300ms）
  - 新卡：opacity 0→1 + translateX 20→0（300ms）
- **選項點擊回饋**：
  - scale 1→1.02（120ms）再回 1（120ms）

### 3.7 題目順序與流程控制

- **題目順序**：固定（依 JSON order）
- **不允許跳題**（baseline）
- **完成條件**：
  - 所有題目都已回答（SINGLE：至少 1；MULTI：>=1 或允許 0 由題目定義）
- **完成後**：
  - 將 answers 傳給 Stage 4（但前端不得計分）
  - 若 Stage 4 由外部引擎產出結果：此處只送 option ids

### 3.8 RWD（桌面/平板/手機）

- **Desktop**：卡片居中，最大寬 720px
- **Tablet**：卡片最大寬 640px
- **Mobile**：全屏卡片（padding 16），option hit area >= 44px

### 3.9 Stage 3 絕對紅線（至少 10 項）

1. 禁止任何分數、量表、1–10
2. 禁止 `<input type="radio">` / `<checkbox>` 作為選項主體
3. 禁止「第 n 題」數字進度
4. 禁止長列表問卷式排版（可用象卡，但不可像表單）
5. 禁止把 option label 當作心理量表語句（偏向隱喻/狀態）
6. 禁止在 UI/console/network 暴露任何「權重」或「分值」
7. 禁止 AUTO_ADVANCE 導致誤觸無法回退（必須可回上一題 baseline：允許 Back）
8. 禁止用瀏覽器 alert/prompt
9. 禁止把多選做成 checklist 形式（可視覺幣章/印記）
10. 禁止將題目答案存入 global store

---

## 4. 驗收（可重跑）

### 4.1 Gate #5（HIGH 覆蓋）

- 載入 `high risk sample`
- 驗證：
  - store 不含 `recommendation_key`
  - DOM 不含 recommendation 文案或 key
  - 僅渲染 safety template A/B

### 4.2 Gate #4（L1-L4）

- 錄影：L2 自動出現、L3 必須點擊撥霧才出現、L4 最後出現
- DOM：揭示前後都不得包含 `raw_score/weight`

### 4.3 Stage 3（投射）

- 單選題可 auto-advance 或 require confirm（依 JSON）
- 多選題必須 confirm
- 手機單手可點
- 無數字進度

---

## 5. 可修改與可回滾聲明

**本文件所有技術規格均為「可修改」「可回滾」**：

- **可修改**：所有 RiskOverride 邏輯、L1-L4 揭示規則、Stage 3 技術規格均可根據實際需求調整
- **可回滾**：所有技術決策均可回滾，但必須以 ADR 記錄變更原因與影響範圍
- **影響範圍**：技術規格變更需評估對所有組件的影響，確保向後相容

**回滾機制**：
- 若 RiskOverride Interceptor 設計不符合需求，可改用其他方案，但需 ADR 記錄
- 若 L1-L4 揭示順序不符合需求，可調整，但需 ADR 記錄
- 若 Stage 3 技術規格不符合需求，可調整，但需 ADR 記錄

---

**End of SPEC-5**

