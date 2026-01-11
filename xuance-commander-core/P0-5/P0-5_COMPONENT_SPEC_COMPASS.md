# P0-5 Stage 2 萬象羅盤組件規格（SPEC-4）

**Status**：ACTIVE · EDITABLE · REFERENCE（NOT FROZEN）  
**Version**：v1.0  
**Date**：2026-01-10  
**Scope**：D3（Stage 2 Compass）+ RWD + Animation + Redline Checks

---

## 0. 目標與非目標

### 0.1 目標（Must）
- SVG 為核心（不可用 Canvas）
- 20–30 符碼流暢渲染（桌面/手機）
- 3 象選取（可取消、可確認）
- 手機單手可用（旋盤或撥動）
- 儀式感互動（凝視→直覺選取），不得退化問卷 UI

### 0.2 非目標（Not now）
- 不追求超高質感粒子特效（可用 placeholder）
- 不追求物理精準（慣性/阻尼可簡化，但需手感一致）

---

## 1. 資料結構（TypeScript Types）

### 1.1 Compass Data（來自 Adapter 之 ViewModel）

```typescript
export type GlyphId = string;

export type CompassGlyph = {
  id: GlyphId;
  visual_id: string;          // 用於取 SVG / icon
  label_key: string;          // i18n key（不直接給文字）
  weight_hint?: 'core' | 'main' | 'decor'; // 僅用於分層建議（非評分）
};

export type CompassTrack = {
  id: 'inner' | 'middle' | 'outer' | 'extra';
  radius_ratio: number;       // 0~1, 相對於 min(width,height)/2
  glyphs: CompassGlyph[];
};

export type CompassViewModel = {
  title_key: string;
  guide_key: string;
  max_select: 3;
  tracks: CompassTrack[];
};
```

### 1.2 UI 狀態（Flow State，不進 global store）

```typescript
export type CompassSelection = {
  selected: GlyphId[];
  // 用於回彈：記錄每個 glyph 初始角度/半徑
  originPose: Record<GlyphId, { trackId: string; angleRad: number; r: number }>;
  // 當前旋轉角（手機旋盤模式）
  rotationRad: number;
};
```

---

## 2. SVG 結構設計（完整結構）

### 2.1 SVG 元素層級（建議）

- `<svg>` 根節點：固定 `viewBox="0 0 1000 1000"`（避免每次算像素）
- `<defs>`：放 filter（柔光）/ mask（霧）/ gradients（可選）
- `<g id="compass-root" transform="translate(500,500)">`
- `<g id="tracks">`：同心圓軌道（circle 或 path）
- `<g id="glyphs">`：符碼群（每 glyph 一個 `<g>`）
- `<g id="center">`：太極/中心容器（被選的 glyph 進入此層）
- `<g id="hud">`：提示/確認（必須避免列表型 UI）

### 2.2 軌道數（3–5 層）

- **Inner**：核心符碼（半徑 0.30）
- **Middle**：主要符碼（半徑 0.55~0.65）
- **Outer**：裝飾符碼（半徑 0.85~0.92）
- **Extra**（可選）：點狀星塵（僅裝飾、不可點擊）

---

## 3. 布局演算法（完整公式 + 參數定義）

### 3.1 參數定義

- `N_t`：某 track 的 glyph 數量
- `r_t`：該 track 半徑（以 viewBox 為基準，例如 500*ratio）
- `theta0`：起始角（建議 -π/2，12 點鐘方向）
- `gap`：最小角間距（避免重疊）
- `jitter`：小幅亂數偏移（提升自然感，但需 deterministic seed）

### 3.2 基本極座標轉換（必須）

```
x = cx + r * cos(theta)
y = cy + r * sin(theta)
```

在本案：用 `translate(500,500)` 後，`cx=0`, `cy=0`，位置可直接用 `(x,y)`。

### 3.3 均分分布（Baseline）

對於某 track：
```
theta_i = theta0 + i * (2π / N_t)，其中 i ∈ [0, N_t-1]
```

### 3.4 密度控制（避免擠爆）

若 `N_t` 過大導致符碼重疊，使用以下策略：

1. 增加該 track 半徑 `r_t`（上限 outer <= 0.92）
2. 縮小 glyph 視覺半徑（scale down）
3. 若仍重疊：將部分 glyph 下放到下一層 track（Adapter 可做 track rebalance）

**重疊估算（近似）**：
- 假設 glyph 佔用角寬 `w_angle ≈ glyph_px / r_px`
- 需滿足：`2π / N_t >= w_angle + gap`

### 3.5 Jitter（儀式感自然度）

```
theta_i' = theta_i + clamp(rand(seed+i) * jitter - jitter/2, -jitter/2, +jitter/2)
r_i' = r_t + (rand(seed+i+999) * rJitter - rJitter/2)
```

jitter 必須可關閉（debug）。

---

## 4. 點擊命中（Hit Testing）— 完整點擊檢測

### 4.1 優先選擇：SVG 原生事件

- 每個 glyph `<g>` 設 `pointer-events: visiblePainted`
- glyph 的「可點區」用透明 `<circle>` 或 `<path>` 包覆（hit area 擴大）

### 4.2 若需自算 hit（備案）

- 將 click/touch 座標轉換到 viewBox 座標（使用 `getScreenCTM().inverse()`）
- 計算點到 glyph 中心距離：
  ```
  d = sqrt((x - gx)^2 + (y - gy)^2)
  ```
- 命中條件：`d <= hitRadius`
- `hitRadius` 建議：
  - desktop：28~34（viewBox 單位）
  - mobile：36~46（更容易單手點擊）

---

## 5. 選取狀態管理（完整邏輯）

### 5.1 選取規則

- `max_select = 3`
- 點擊未選 glyph：
  - 若 `selected.length < 3` → 加入 `selected`
  - 否則 → 顯示「已定三象」提示（非 alert；HUD 霧光提示 800ms）
- 點擊已選 glyph（在中心或軌道）：
  - 取消選取，回到 `originPose`（飛回動畫）

### 5.2 狀態資料（Flow State）

```typescript
function toggleGlyph(id: GlyphId) {
  setFlow((s) => {
    const isSelected = s.selected.includes(id);
    if (isSelected) return { ...s, selected: s.selected.filter(x => x !== id) };
    if (s.selected.length >= 3) return { ...s, hud: { type: 'FULL', ts: Date.now() } };
    return { ...s, selected: [...s.selected, id] };
  });
}
```

---

## 6. 吸附/飛入動畫（完整策略）

### 6.1 動畫約束

- 不用 SMIL（相容性差）
- 優先使用 CSS transform（GPU）
- 每 glyph 都可用「兩段動畫」：飛入 → 吸附（最後 150ms）

### 6.2 路徑計算（可簡化）

- 起點：glyph 當前位置 `(x0, y0)`
- 終點：中心 slot 位置 `(xc, yc)`（例如中心圓周上的三個插槽）
- 插槽角：`slotAngle = -π/2 + k*(2π/3)`（k=0,1,2）

### 6.3 時間函數（easing）

- 飛入：`ease-out` 350ms
- 吸附：`cubic-bezier(...)` 150ms（更「黏」）

具體曲線可在 CSS 設定，後續可 ADR 調整。

### 6.4 最小可實作偽代碼

```typescript
type Pose = { x: number; y: number; scale: number; rot: number };

function computeSlotPose(k: 0|1|2): Pose {
  const r = 110; // center ring radius in viewBox unit
  const ang = -Math.PI/2 + k*(2*Math.PI/3);
  return { x: r*Math.cos(ang), y: r*Math.sin(ang), scale: 1.0, rot: 0 };
}
```

---

## 7. RWD 適配（桌面/平板/手機完整方案）

### 7.1 斷點（建議 baseline）

- **Mobile**: < 640px
- **Tablet**: 640px ~ 1024px
- **Desktop**: > 1024px

### 7.2 Desktop（完整羅盤）

- SVG 寬高取容器 `min(width,height)`
- `viewBox` 固定 1000
- glyph hit area 正常

### 7.3 Tablet（中等尺寸）

- 若容器不足以顯示 outer track：降低 outer glyph 密度（Adapter 可把 일부 glyph 放到 middle）
- HUD 提示置於羅盤下方，不使用列表

### 7.4 Mobile（旋盤模式）— 觸控事件完整邏輯

#### 7.4.1 核心：用水平拖曳映射旋轉角

- 記錄：
  - `touchStartX`
  - `startRotation`
  - `deltaX = currentX - touchStartX`
- 旋轉角：
  ```
  rotation = startRotation + deltaX * ROTATE_SENSITIVITY
  ```
  `ROTATE_SENSITIVITY` 建議：0.006 ~ 0.012 rad/px

#### 7.4.2 touch handlers（偽代碼）

```typescript
function onTouchStart(e) {
  const x = e.touches[0].clientX;
  setGesture({ active: true, startX: x, startRot: flow.rotationRad });
}

function onTouchMove(e) {
  if (!gesture.active) return;
  const x = e.touches[0].clientX;
  const dx = x - gesture.startX;
  const rot = gesture.startRot + dx * 0.008;
  setFlow(s => ({ ...s, rotationRad: rot }));
}

function onTouchEnd() {
  setGesture({ active: false });
}
```

#### 7.4.3 呈現策略

- 羅盤可只顯示「可視扇形」或縮小視覺密度
- 但本質仍是 SVG 羅盤，不得替換成列表/問卷

---

## 8. 絕對紅線檢查（至少 10 項禁止事項 + 驗收方法）

### 8.1 禁止事項（Fail = Critical Bug）

1. 禁止 `<select>` 下拉
2. 禁止 `<input type="radio">` / `<input type="checkbox">` 作為主要互動
3. 禁止長列表問答（ul/li 作為主要選擇）
4. 禁止 1–10 評分、滑桿、量表
5. 禁止顯示「第 n 題 / n」的數字進度條（可用非數字隱喻）
6. 禁止將符碼呈現為 grid 卡片列表（主要互動必須在羅盤上）
7. 禁止 Canvas（必須 SVG）
8. 禁止在 DOM 或 console 輸出計算分數
9. 禁止把選象變成文字 checklist
10. 禁止把「儀式感」替換成表單送出

### 8.2 驗收方法（可重跑）

- **DOM 掃描**：檢查是否存在 `select`, `input[type=radio]`, `input[type=checkbox]`, `range`
- **UI 錄影**：桌面 + 手機各一段（選 3 象 + 取消 1 象）
- **結構截圖**：DevTools Elements：glyph 節點應為 SVG `<g>`/`<path>`/`<circle>`

---

## 9. 最終 DoD（本文件）

- 20–30 glyph 無明顯卡頓（mobile 60fps 允許降到 45fps，但不得卡死）
- mobile 可旋轉/撥動以探索符碼
- 選滿三象有儀式提示且可確認
- 紅線掃描腳本通過（見 SPEC-7 自動化）

---

## 10. 可修改與可回滾聲明

**本文件所有技術規格均為「可修改」「可回滾」**：

- **可修改**：所有 SVG 結構、布局算法、互動邏輯、動畫策略、RWD 方案均可根據實際需求調整
- **可回滾**：所有技術決策均可回滾，但必須以 ADR 記錄變更原因與影響範圍
- **影響範圍**：技術規格變更需評估對所有組件的影響，確保向後相容

**回滾機制**：
- 若 SVG 結構不符合需求，可改用 Canvas，但需 ADR 記錄
- 若布局算法不符合需求，可改用其他算法，但需 ADR 記錄
- 若互動邏輯不符合需求，可調整選取規則，但需 ADR 記錄

---

**End of SPEC-4**

