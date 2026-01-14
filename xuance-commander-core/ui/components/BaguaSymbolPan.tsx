import React, { useState, useEffect } from 'react';

interface SymbolData {
  symbol_id: string;
  character_zh: string;
  character_en: string;
  vectors: {
    weight: number;
    element: string;
    bagua_affinity: string[];
  };
  narrative_hooks: {
    象意: string;
    內勢: string;
    外勢: string;
    建議: string;
  };
}

interface BaguaZoneProps {
  bagua: string;
  symbols: SymbolData[];
  onSelect: (bagua: string, symbol: string, weight: number) => void;
}

const BAGUA_SYMBOLS = {
  '乾': ['嚴', '逼', '控', '高', '剛'],
  '坤': ['壓', '載', '重', '順', '吞'],
  '震': ['衝', '驚', '躁', '爆', '散'],
  '巽': ['擾', '飄', '弱', '依', '隨'],
  '坎': ['困', '陷', '溺', '凍', '重'],
  '離': ['燃', '焦', '耗', '偽', '空'],
  '艮': ['止', '阻', '卡', '躲', '避'],
  '兌': ['悅', '破', '悲', '棄', '絕']
};

const BaguaZone: React.FC<BaguaZoneProps> = ({ bagua, symbols, onSelect }) => {
  const [selectedSymbols, setSelectedSymbols] = useState<Set<string>>(new Set());
  const [dragWeight, setDragWeight] = useState(1.0);

  const availableSymbols = BAGUA_SYMBOLS[bagua as keyof typeof BAGUA_SYMBOLS] || [];

  const handleSymbolClick = (symbol: string) => {
    const newSelected = new Set(selectedSymbols);
    if (newSelected.has(symbol)) {
      newSelected.delete(symbol);
    } else {
      newSelected.add(symbol);
    }
    setSelectedSymbols(newSelected);

    // 通知父組件
    onSelect(bagua, symbol, dragWeight);
  };

  return (
    <div className="bagua-zone">
      <div className="bagua-header">
        <span className="bagua-symbol">{bagua}</span>
        <span className="bagua-name">
          {bagua === '乾' && '主宰'}
          {bagua === '坤' && '承載'}
          {bagua === '震' && '動盪'}
          {bagua === '巽' && '不定'}
          {bagua === '坎' && '險陷'}
          {bagua === '離' && '明傷'}
          {bagua === '艮' && '阻礙'}
          {bagua === '兌' && '毀折'}
        </span>
      </div>

      <div className="symbols-grid">
        {availableSymbols.map(symbol => (
          <div
            key={symbol}
            className={`symbol-item ${selectedSymbols.has(symbol) ? 'selected' : ''}`}
            onClick={() => handleSymbolClick(symbol)}
          >
            <span className="symbol-char">{symbol}</span>
            <div className="symbol-tooltip">
              {symbols.find(s => s.character_zh === symbol)?.narrative_hooks.象意}
            </div>
          </div>
        ))}
      </div>

      <div className="weight-slider">
        <label>重要程度：</label>
        <input
          type="range"
          min="0.5"
          max="1.5"
          step="0.1"
          value={dragWeight}
          onChange={(e) => setDragWeight(parseFloat(e.target.value))}
        />
        <span>{dragWeight.toFixed(1)}x</span>
      </div>

      <div className="selection-info">
        已選：{Array.from(selectedSymbols).join('、')}
      </div>
    </div>
  );
};

interface BaguaSymbolPanProps {
  onSelectionChange: (selections: any[]) => void;
}

const BaguaSymbolPan: React.FC<BaguaSymbolPanProps> = ({ onSelectionChange }) => {
  const [selections, setSelections] = useState<any[]>([]);
  const [symbols, setSymbols] = useState<SymbolData[]>([]);

  useEffect(() => {
    // 載入符號數據
    fetch('/symbol_library/symbols_phaseA_complete.json')
      .then(res => res.json())
      .then(data => setSymbols(data))
      .catch(err => console.error('Failed to load symbols:', err));
  }, []);

  const handleZoneSelect = (bagua: string, symbol: string, weight: number) => {
    const newSelections = [...selections];

    // 檢查是否已存在此八卦
    const existingIndex = newSelections.findIndex(s => s.bagua === bagua);

    if (existingIndex >= 0) {
      // 更新現有八卦的符號
      const existing = newSelections[existingIndex];
      const symbolIndex = existing.symbols.indexOf(symbol);

      if (symbolIndex >= 0) {
        // 移除符號
        existing.symbols.splice(symbolIndex, 1);
        if (existing.symbols.length === 0) {
          newSelections.splice(existingIndex, 1);
        }
      } else {
        // 添加符號
        existing.symbols.push(symbol);
        existing.weight = weight;
      }
    } else {
      // 添加新八卦
      newSelections.push({
        bagua,
        symbols: [symbol],
        weight
      });
    }

    setSelections(newSelections);
    onSelectionChange(newSelections);
  };

  return (
    <div className="bagua-symbol-pan">
      <div className="pan-header">
        <h2>【八象盤】</h2>
        <p>請選擇最能描述你當下感受的領域與象徵</p>
      </div>

      <div className="bagua-grid">
        {Object.keys(BAGUA_SYMBOLS).map(bagua => (
          <BaguaZone
            key={bagua}
            bagua={bagua}
            symbols={symbols}
            onSelect={handleZoneSelect}
          />
        ))}
      </div>

      <div className="pan-footer">
        <div className="selection-summary">
          <h3>當前選擇：</h3>
          {selections.map(selection => (
            <div key={selection.bagua} className="selection-item">
              {selection.bagua}：{selection.symbols.join('、')}（權重：{selection.weight.toFixed(1)}x）
            </div>
          ))}
        </div>

        <div className="instruction">
          💡 提示：可選擇 1-3 個領域，每個領域選擇 1-3 個象徵，
          拖拽滑桿調整該領域的整體重要性
        </div>
      </div>

      <style jsx>{`
        .bagua-symbol-pan {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Source Han Serif TC', serif;
        }

        .pan-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .pan-header h2 {
          font-size: 32px;
          color: #1a1a1a;
          margin-bottom: 10px;
        }

        .pan-header p {
          font-size: 18px;
          color: #666;
        }

        .bagua-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }

        .bagua-zone {
          border: 2px solid #b8860b;
          border-radius: 10px;
          padding: 15px;
          background: linear-gradient(135deg, #f5f5dc 0%, #fff 100%);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .bagua-header {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 15px;
        }

        .bagua-symbol {
          font-size: 48px;
          font-weight: bold;
          color: #8b0000;
          margin-right: 10px;
        }

        .bagua-name {
          font-size: 16px;
          color: #666;
        }

        .symbols-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;
          margin-bottom: 15px;
        }

        .symbol-item {
          position: relative;
          width: 40px;
          height: 40px;
          border: 2px solid #ddd;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: white;
        }

        .symbol-item:hover {
          border-color: #b8860b;
          transform: scale(1.1);
        }

        .symbol-item.selected {
          border-color: #8b0000;
          background: #ffe4e1;
          box-shadow: 0 0 10px rgba(139, 0, 0, 0.3);
        }

        .symbol-char {
          font-size: 20px;
          font-weight: bold;
          color: #1a1a1a;
        }

        .symbol-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.8);
          color: white;
          padding: 8px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .symbol-item:hover .symbol-tooltip {
          opacity: 1;
        }

        .weight-slider {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .weight-slider label {
          font-size: 14px;
          color: #666;
        }

        .weight-slider input {
          flex: 1;
        }

        .weight-slider span {
          font-size: 14px;
          color: #8b0000;
          font-weight: bold;
          min-width: 40px;
        }

        .selection-info {
          font-size: 12px;
          color: #666;
          min-height: 20px;
        }

        .pan-footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
        }

        .selection-summary {
          margin-bottom: 20px;
        }

        .selection-summary h3 {
          margin-bottom: 10px;
          color: #1a1a1a;
        }

        .selection-item {
          background: #f9f9f9;
          padding: 8px;
          border-radius: 4px;
          margin-bottom: 5px;
          font-size: 14px;
        }

        .instruction {
          background: #fffacd;
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #b8860b;
          font-size: 14px;
          color: #666;
        }

        @media (max-width: 768px) {
          .bagua-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }

          .symbols-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .bagua-symbol {
            font-size: 36px;
          }
        }
      `}</style>
    </div>
  );
};

export default BaguaSymbolPan;