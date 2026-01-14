# INTEGRATION-5：前端實作與API對接

**任務包編號**：INTEGRATION-5  
**建立日期**：2026-01-14  
**優先級**：🔴 CRITICAL  
**預估時間**：10-14 天  
**交付物數量**：10 個檔案

---

## 🎯 任務目標

完成前端網頁實作，對接底層 V3 引擎，實現完整的使用者互動流程。

---

## 📚 背景資料

### 系統架構

```
前端（符碼投射UI）
  ↓ API 請求
後端（V3 引擎 + Layer 2）
  ↓ 計算結果
前端（結果呈現）
```

### 技術棧建議

**前端**：
- React 18+ (UI 框架)
- TypeScript (類型安全)
- TailwindCSS (樣式系統)
- Framer Motion (簡單動畫)

**後端**：
- Python 3.11+ (引擎語言)
- FastAPI (API 框架)
- Pydantic (數據驗證)

---

## 📋 交付物清單（10 個檔案）

### 檔案 1：`FRONTEND_ARCHITECTURE_DESIGN.md`

**內容**：前端架構設計

```markdown
# 前端架構設計

## 1. 頁面結構

### Page 1：起心動念（Landing Page）
- 畫面：太極圖 + 「叩門」按鈕
- 功能：使用者長按太極，開始占筮

### Page 2：八門遁甲（Domain Selection）
- 畫面：8 扇心門（八卦符號）
- 功能：選擇主要困擾領域

### Page 3：六親選擇（Context Selection）
- 畫面：環境意象（屋簷、官印、錢幣等）
- 功能：選擇問事類別

### Page 4：辭象感應（Projection Questions）
- 畫面：8 組辭象（對應 OCTET_8）
- 功能：選擇觸動心弦的辭象

### Page 5：顯化計算（Loading）
- 畫面：銅錢旋轉 + 「卦象顯化中」
- 功能：等待後端計算（1-2 秒）

### Page 6：卦象呈現（Result）
- 畫面：64 卦圖像 + 卦辭 + 白話解讀
- 功能：展示診斷結果

### Page 7：解法建議（Activities）
- 畫面：5 個五行活動卡片
- 功能：展示具體行動建議

### Page 8：風險預測（Riskchain）
- 畫面：連鎖圖（水墨風格）
- 功能：展示未改變的後果

## 2. 組件設計

### 核心組件（10 個）
1. `TaijiButton.tsx` - 太極按鈕
2. `BaguaGate.tsx` - 八卦門組件
3. `LiuqinScene.tsx` - 六親場景
4. `CiXiangCard.tsx` - 辭象卡片
5. `HexagramDisplay.tsx` - 卦象展示
6. `ActivityCard.tsx` - 活動卡片
7. `RiskchainFlow.tsx` - 風險鏈流程圖
8. `LoadingAnimation.tsx` - 載入動畫
9. `NavigationFlow.tsx` - 流程控制
10. `ResultLayout.tsx` - 結果頁面佈局
```

---

### 檔案 2：`API_INTEGRATION_SPECIFICATION.md`

**內容**：API 對接規格

```markdown
# API 對接規格

## 1. Endpoint 定義

### POST /api/v1/compute

**描述**：接收使用者答案，返回診斷結果

**請求格式**：
```json
{
  "request_id": "req_20260114_001",
  "timestamp": 1768400000,
  "primary_domain": "Kan",
  "facet_id": "chronic_depletion",
  "answers": [3, 2, 2, 3, 2, 3, 2, 2],
  "context": {
    "liuqin": "Power",
    "age_group": "adult",
    "language": "zh_TW"
  }
}
```

**回應格式（成功）**：
```json
{
  "result_id": "res_20260114_001",
  "severity": 0.61,
  "rigidity_state": "Locked",
  "agency_score": 0.5,
  "safety_mode": "L3",
  "hexagram": {
    "id": "hexagram_29_kan",
    "name_zh": "坎為水",
    "narrative": "坎，習坎。水流不息，卻困於深淵...",
    "action_guidance": "宜守不宜進，需先築堤固土。",
    "expected_state": "水流歸道"
  },
  "recommendation": {
    "activities": [
      {
        "id": "forest_walk",
        "name_zh": "森林散步",
        "element": "Wood",
        "duration": "30 分鐘",
        "steps": ["...", "..."]
      }
    ]
  },
  "riskchain": {
    "short_chain": [
      {"stage": 1, "text": "能量持續外流"},
      {"stage": 2, "text": "內在枯竭感加劇"},
      {"stage": 3, "text": "失去行動動力"}
    ]
  }
}
```

**回應格式（錯誤）**：
```json
{
  "error": true,
  "code": 400,
  "message": "Invalid answers format",
  "details": "Answers must be array of 8 integers (0-4)",
  "trace_id": "err_20260114_0001"
}
```

## 2. 前端整合範例

```typescript
// API 呼叫函數
async function computeDiagnostics(
  domain: string,
  facetId: string,
  answers: number[],
  context: Context
): Promise<DiagnosticResult> {
  const response = await fetch('/api/v1/compute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Client-ID': CLIENT_ID
    },
    body: JSON.stringify({
      request_id: generateRequestId(),
      timestamp: Date.now(),
      primary_domain: domain,
      facet_id: facetId,
      answers: answers,
      context: context
    })
  });
  
  if (!response.ok) {
    throw new Error('Computation failed');
  }
  
  return await response.json();
}
```
```

---

### 檔案 3：`COMPONENT_IMPLEMENTATION_GUIDE.md`

**內容**：組件實作指南

```markdown
# 組件實作指南

## 1. TaijiButton 組件

**功能**：起心動念按鈕，使用者長按開始

```tsx
interface TaijiButtonProps {
  onComplete: () => void;
  pressDuration?: number; // 預設 2000ms
}

function TaijiButton({ onComplete, pressDuration = 2000 }: TaijiButtonProps) {
  const [pressing, setPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const handlePress = () => {
    setPressing(true);
    // 漸進式填充進度
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          onComplete();
          return 100;
        }
        return p + 5;
      });
    }, pressDuration / 20);
  };
  
  return (
    <div className="taiji-container">
      <div className="taiji-symbol">☯</div>
      <div className="instruction">長按太極，注入心念</div>
      {pressing && (
        <div className="progress-ring" style={{ strokeDashoffset: progress }} />
      )}
    </div>
  );
}
```

---

## 2. CiXiangCard 組件

**功能**：辭象卡片，使用者選擇

```tsx
interface CiXiangOption {
  value: number;  // 0-4 分
  symbol: string; // 符號（如 💧）
  text_zh: string; // 辭象（如「餘力猶存」）
}

interface CiXiangCardProps {
  options: CiXiangOption[];
  onSelect: (value: number) => void;
}

function CiXiangCard({ options, onSelect }: CiXiangCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  
  useEffect(() => {
    // 延遲顯示（神秘感）
    setTimeout(() => setRevealed(true), 500);
  }, []);
  
  return (
    <div className="ci-xiang-container">
      {options.map((option, index) => (
        <div
          key={option.value}
          className={`ci-xiang ${selected === option.value ? 'selected' : ''} ${revealed ? 'revealed' : ''}`}
          style={{ animationDelay: `${index * 0.5}s` }}
          onClick={() => {
            setSelected(option.value);
            onSelect(option.value);
          }}
        >
          <span className="symbol">{option.symbol}</span>
          <span className="text">{option.text_zh}</span>
        </div>
      ))}
    </div>
  );
}
```
```

---

### 檔案 4：`LOADING_EXPERIENCE_DESIGN.md`

**內容**：載入體驗設計（神秘感營造）

```markdown
# 載入體驗設計

## 核心理念：「等待即儀式」

傳統算命需要時間（排卦、查書、解讀），我們也需要時間（但實際上是在計算）。

## 1. 載入畫面設計

### 視覺元素
- 中央：三枚銅錢（緩慢旋轉）
- 背景：水墨暈染效果（淡淡的煙霧）
- 文字：「卦象顯化中...」（古典字體）

### 時間控制
- **最短時間**：2 秒（即使計算只需 0.5 秒）
- **最長時間**：5 秒（如果計算超過 5 秒，顯示「請稍候」）

**理由**：
- ✅ 2 秒讓使用者感到「這不是機器計算，是天道運行」
- ✅ 不能太快（0.5 秒），會感覺是機器
- ✅ 不能太慢（10 秒），會感覺是卡頓

---

## 2. 載入動畫（極簡版）

### 銅錢旋轉

```css
.coin {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #b8860b 0%, #8b7355 100%);
  animation: coin-rotate 3s ease-in-out infinite;
}

@keyframes coin-rotate {
  0% { transform: rotateY(0deg); }
  50% { transform: rotateY(180deg); }
  100% { transform: rotateY(360deg); }
}
```

### 文字浮現

```css
.loading-text {
  font-family: 'Source Han Serif TC', serif;
  font-size: 24px;
  color: #1a1a1a;
  animation: text-pulse 2s ease-in-out infinite;
}

@keyframes text-pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
```

---

## 3. 神秘感營造

### 隨機顯示古文

在等待期間，隨機顯示一句古文：

**範例**：
- 「天行健，君子以自強不息」
- 「窮則變，變則通，通則久」
- 「否極泰來，剝極必復」
- 「積善之家，必有餘慶」
- 「履霜堅冰至」

**實作**：
```typescript
const ANCIENT_TEXTS = [
  "天行健，君子以自強不息",
  "窮則變，變則通，通則久",
  "否極泰來，剝極必復"
];

function LoadingScreen() {
  const randomText = ANCIENT_TEXTS[Math.floor(Math.random() * ANCIENT_TEXTS.length)];
  
  return (
    <div className="loading-container">
      <div className="coins">{/* 三枚銅錢 */}</div>
      <div className="loading-text">卦象顯化中...</div>
      <div className="ancient-text">{randomText}</div>
    </div>
  );
}
```
```

---

### 檔案 5：`RESULT_PAGE_LAYOUT_DESIGN.md`

**內容**：結果頁面佈局設計

```markdown
# 結果頁面佈局設計

## 1. 頁面結構

```
┌──────────────────────────────┐
│        【卦象區】             │
│    ☵ 坎為水（習坎）           │
│                              │
├──────────────────────────────┤
│      【卦辭與解讀區】          │
│  「坎，習坎。水流不息...」    │
│                              │
├──────────────────────────────┤
│      【當前狀態區】            │
│  「你的內在如同...」          │
│                              │
├──────────────────────────────┤
│      【行動指引區】            │
│  「宜守不宜進...」            │
│                              │
├──────────────────────────────┤
│      【五行活動區】            │
│  [活動卡片 1] [活動卡片 2]    │
│                              │
├──────────────────────────────┤
│      【風險預測區】            │
│  「若不改變，可能...」        │
│                              │
└──────────────────────────────┘
```

## 2. 視覺風格

### 卦象區
- 中央：64 卦圖像（黑白線條）
- 字體：思源宋體 Heavy 48px
- 配色：墨黑 + 古銅邊框

### 卦辭區
- 背景：淡米色捲軸效果
- 字體：思源宋體 Regular 24px
- 行距：2.0（增加呼吸感）

### 活動區
- 卡片：米白背景 + 古銅邊框
- 符號：五行符號（🌳🔥⛰️💎🌊）
- 佈局：橫向排列，可滑動

### 風險區
- 背景：漸層（淺色 → 深色）
- 連線：虛線 + 箭頭
- 顏色：隨 Safety Mode 變化
  - L1/L2：灰色
  - L3：古銅色
  - L4：朱砂色
```

---

### 檔案 6：`RESPONSIVE_DESIGN_SPEC.md`

**內容**：響應式設計規格

```markdown
# 響應式設計規格

## 斷點定義

| 裝置 | 寬度 | 佈局調整 |
|------|------|---------|
| **Mobile** | < 768px | 單欄，辭象縱向排列 |
| **Tablet** | 768-1024px | 雙欄，卡片並排 |
| **Desktop** | > 1024px | 三欄，完整展示 |

## 移動端優化

### 手勢支持
- 長按太極：觸發起卦
- 上下滑動：查看完整結果
- 左右滑動：切換活動卡片

### 性能優化
- 辭象懶加載：只載入當前頁面的辭象
- 圖片壓縮：卦象圖像 < 50KB
- 動畫簡化：移動端減少動畫複雜度
```

---

### 檔案 7-10：

**檔案 7**：`ANIMATION_IMPLEMENTATION_GUIDE.md`
- 動畫實作指南（極簡版）
- CSS 動畫範例
- 性能優化建議

**檔案 8**：`STATE_MANAGEMENT_DESIGN.md`
- 狀態管理設計
- React Context / Redux 選擇
- 資料流向

**檔案 9**：`ERROR_HANDLING_UX_DESIGN.md`
- 錯誤處理 UX 設計
- 網路錯誤、API 錯誤、輸入錯誤
- 用戶友善的錯誤訊息

**檔案 10**：`TESTING_DEPLOYMENT_PLAN.md`
- 測試計畫（單元測試、整合測試、E2E 測試）
- 部署計畫（Vercel / Netlify）
- 監控與日誌

---

## 🎯 預期成果

### 完成後可實現

1. ✅ 使用者從進入到獲得結果，全程 5-8 分鐘
2. ✅ 感覺像是傳統六爻納甲算命
3. ✅ 底層是精密的科學診斷
4. ✅ 結果準確，活動可執行，風險合理
5. ✅ 響應式設計，支援所有裝置

---

**交付日期**：2026-01-14  
**預估完成時間**：10-14 天  
**依賴項目**：INTEGRATION-1, 2, 3, 4 完成
