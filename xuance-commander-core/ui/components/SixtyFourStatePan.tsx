import React, { useState, useEffect } from 'react';

interface StateSymbol {
  symbol_id: string;
  compound_zh: string;
  compound_en: string;
  primary_symbol: string;
  secondary_symbol: string;
  vectors: {
    severity: number;
    attribution: string;
    agency: number;
    mood: string;
    energy_pattern: string;
  };
  narrative_template: {
    象意: string;
    內勢: string;
    外勢: string;
    轉機: string;
  };
}

interface SixtyFourStatePanProps {
  onSelectionChange: (selections: {
    primary: string;
    secondary: string[];
    direction: number;
    roleTokens: string[];
  }) => void;
}

const STATE_SYMBOLS: StateSymbol[] = [
  {
    symbol_id: "state_kun_nei",
    compound_zh: "困內",
    compound_en: "Trapped_Inward",
    primary_symbol: "困",
    secondary_symbol: "內",
    vectors: {
      severity: 0.75,
      attribution: "internal",
      agency: 0.4,
      mood: "helpless_guilty",
      energy_pattern: "stuck_self_blame"
    },
    narrative_template: {
      象意: "困於困境，又責怪自己",
      內勢: "內心自責，無法解脫",
      外勢: "環境制約，進退維谷",
      轉機: "接納自我，尋求支援"
    }
  },
  {
    symbol_id: "state_yan_ya",
    compound_zh: "嚴壓",
    compound_en: "Strict_Pressure",
    primary_symbol: "嚴",
    secondary_symbol: "壓",
    vectors: {
      severity: 0.80,
      attribution: "external",
      agency: 0.5,
      mood: "overwhelmed_stressed",
      energy_pattern: "burdened_compliant"
    },
    narrative_template: {
      象意: "嚴格要求帶來巨大壓力",
      內勢: "自我要求過高",
      外勢: "外界期望嚴苛",
      轉機: "調整標準，適度放鬆"
    }
  },
  {
    symbol_id: "state_lei_tao",
    compound_zh: "累逃",
    compound_en: "Tired_Escape",
    primary_symbol: "累",
    secondary_symbol: "逃",
    vectors: {
      severity: 0.70,
      attribution: "mixed",
      agency: 0.6,
      mood: "exhausted_resigned",
      energy_pattern: "withdrawal_tired"
    },
    narrative_template: {
      象意: "累到想逃避一切",
      內勢: "精力耗盡，意志消沉",
      外勢: "壓力持續，難以承受",
      轉機: "適度休息，重新充能"
    }
  },
  {
    symbol_id: "state_ju_ze",
    compound_zh: "懼責",
    compound_en: "Fear_Blame",
    primary_symbol: "懼",
    secondary_symbol: "責",
    vectors: {
      severity: 0.75,
      attribution: "external",
      agency: 0.4,
      mood: "fearful_accusatory",
      energy_pattern: "defensive_accusative"
    },
    narrative_template: {
      象意: "恐懼中帶著責備",
      內勢: "神經緊繃，心生怨懟",
      外勢: "感受到威脅與不公",
      轉機: "面對恐懼，化解怨氣"
    }
  },
  {
    symbol_id: "state_kong_zui",
    compound_zh: "空罪",
    compound_en: "Empty_Guilty",
    primary_symbol: "空",
    secondary_symbol: "罪",
    vectors: {
      severity: 0.70,
      attribution: "internal",
      agency: 0.5,
      mood: "void_remorseful",
      energy_pattern: "hollow_guilty"
    },
    narrative_template: {
      象意: "空虛中感到罪惡",
      內勢: "缺乏意義，自責不已",
      外勢: "貢獻不足，價值感低",
      轉機: "探索新意義，釋放罪感"
    }
  },
  {
    symbol_id: "state_leng_yi",
    compound_zh: "冷依",
    compound_en: "Cold_Dependent",
    primary_symbol: "冷",
    secondary_symbol: "依",
    vectors: {
      severity: 0.65,
      attribution: "mixed",
      agency: 0.5,
      mood: "distant_needy",
      energy_pattern: "withdrawal_attachment"
    },
    narrative_template: {
      象意: "表面冷淡，內心依賴",
      內勢: "怕受傷，築起高牆",
      外勢: "關係疏離，缺乏溫暖",
      轉機: "學習信任，重建連結"
    }
  }
];

const SixtyFourStatePan: React.FC<SixtyFourStatePanProps> = ({ onSelectionChange }) => {
  const [primary, setPrimary] = useState<string>('');
  const [secondary, setSecondary] = useState<string[]>([]);
  const [direction, setDirection] = useState<number>(0);
  const [roleTokens, setRoleTokens] = useState<string[]>([]);
  const [revealedSymbols, setRevealedSymbols] = useState<Set<string>>(new Set());

  // 模擬符號逐一顯現
  useEffect(() => {
    const revealInterval = setInterval(() => {
      setRevealedSymbols(prev => {
        const newRevealed = new Set(prev);
        const remaining = STATE_SYMBOLS.filter(s => !newRevealed.has(s.compound_zh));

        if (remaining.length > 0) {
          const randomIndex = Math.floor(Math.random() * remaining.length);
          newRevealed.add(remaining[randomIndex].compound_zh);
        }

        return newRevealed;
      });
    }, 300); // 每300ms顯示一個

    return () => clearInterval(revealInterval);
  }, []);

  const handleSymbolClick = (symbol: StateSymbol) => {
    if (!primary) {
      // 選擇主象
      setPrimary(symbol.compound_zh);
    } else if (primary === symbol.compound_zh) {
      // 取消主象
      setPrimary('');
    } else if (secondary.includes(symbol.compound_zh)) {
      // 取消副象
      setSecondary(prev => prev.filter(s => s !== symbol.compound_zh));
    } else if (secondary.length < 2) {
      // 添加副象
      setSecondary(prev => [...prev, symbol.compound_zh]);
    }

    // 通知父組件
    onSelectionChange({
      primary,
      secondary,
      direction,
      roleTokens
    });
  };

  const handleRoleToggle = (role: string) => {
    setRoleTokens(prev => {
      if (prev.includes(role)) {
        return prev.filter(r => r !== role);
      } else if (prev.length < 2) {
        return [...prev, role];
      }
      return prev;
    });
  };

  const getDirectionLabel = () => {
    if (direction < -0.3) return "內收（偏內部歸因）";
    if (direction > 0.3) return "外推（偏外部歸因）";
    return "平衡（內外均衡）";
  };

  return (
    <div className="sixty-four-state-pan">
      <div className="pan-header">
        <h2>【六十四狀態盤】</h2>
        <p>請凝視這些浮現的狀態象徵，選擇最能描述你的當下</p>
      </div>

      <div className="state-grid">
        {STATE_SYMBOLS.map((symbol, index) => (
          <div
            key={symbol.symbol_id}
            className={`state-card ${
              primary === symbol.compound_zh ? 'primary' :
              secondary.includes(symbol.compound_zh) ? 'secondary' : ''
            } ${revealedSymbols.has(symbol.compound_zh) ? 'revealed' : 'hidden'}`}
            style={{
              animationDelay: `${index * 0.1}s`,
              gridColumn: (index % 8) + 1,
              gridRow: Math.floor(index / 8) + 1
            }}
            onClick={() => handleSymbolClick(symbol)}
          >
            <div className="symbol-text">
              {symbol.compound_zh}
            </div>
            <div className="symbol-tooltip">
              <div className="tooltip-content">
                <div className="象意">{symbol.narrative_template.象意}</div>
                <div className="內勢">{symbol.narrative_template.內勢}</div>
                <div className="外勢">{symbol.narrative_template.外勢}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="direction-control">
        <h3>推力方向</h3>
        <div className="direction-slider">
          <span className="direction-label">內收</span>
          <input
            type="range"
            min="-1"
            max="1"
            step="0.1"
            value={direction}
            onChange={(e) => setDirection(parseFloat(e.target.value))}
            className="direction-input"
          />
          <span className="direction-label">外推</span>
        </div>
        <div className="direction-display">
          {getDirectionLabel()}
        </div>
      </div>

      <div className="role-selection">
        <h3>關係角色符（可選 0-2 個）</h3>
        <div className="role-tokens">
          {['🏛️長輩', '💼上司', '💰伴侶', '👥平輩', '🌱晚輩'].map(role => (
            <button
              key={role}
              className={`role-token ${roleTokens.includes(role) ? 'selected' : ''}`}
              onClick={() => handleRoleToggle(role)}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <div className="selection-summary">
        <div className="summary-item">
          <span className="label">主象：</span>
          <span className="value">{primary || '未選擇'}</span>
        </div>
        <div className="summary-item">
          <span className="label">副象：</span>
          <span className="value">{secondary.join('、') || '未選擇'}</span>
        </div>
        <div className="summary-item">
          <span className="label">關係角色：</span>
          <span className="value">{roleTokens.join('、') || '未選擇'}</span>
        </div>
      </div>

      <div className="instruction">
        💡 提示：先選擇一個「主象」（最像你），再選擇 1-2 個「副象」。
        推力方向表示你是更傾向怪自己（內收）還是怪環境/他人（外推）。
        關係角色符幫助系統理解你的壓力來源。
      </div>

      <style jsx>{`
        .sixty-four-state-pan {
          max-width: 1000px;
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
          font-size: 16px;
          color: #666;
        }

        .state-grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          grid-template-rows: repeat(8, 1fr);
          gap: 8px;
          margin-bottom: 30px;
          min-height: 400px;
        }

        .state-card {
          position: relative;
          aspect-ratio: 1;
          border: 2px solid #ddd;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: white;
          transition: all 0.3s ease;
          opacity: 0;
          transform: scale(0.8);
        }

        .state-card.revealed {
          opacity: 1;
          transform: scale(1);
          animation: reveal 0.5s ease-out forwards;
        }

        .state-card.hidden {
          opacity: 0;
          transform: scale(0.8);
        }

        .state-card:hover {
          border-color: #b8860b;
          transform: scale(1.05);
        }

        .state-card.primary {
          border-color: #8b0000;
          background: linear-gradient(135deg, #ffe4e1 0%, #fff 100%);
          box-shadow: 0 0 15px rgba(139, 0, 0, 0.3);
        }

        .state-card.secondary {
          border-color: #b8860b;
          background: linear-gradient(135deg, #fffacd 0%, #fff 100%);
          box-shadow: 0 0 10px rgba(184, 134, 11, 0.3);
        }

        .symbol-text {
          font-size: 16px;
          font-weight: bold;
          color: #1a1a1a;
          text-align: center;
        }

        .symbol-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          background: rgba(0,0,0,0.9);
          color: white;
          padding: 12px;
          border-radius: 8px;
          font-size: 12px;
          width: 200px;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease;
          z-index: 1000;
        }

        .state-card:hover .symbol-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(-10px);
        }

        .tooltip-content {
          line-height: 1.4;
        }

        .tooltip-content > div {
          margin-bottom: 4px;
        }

        .tooltip-content > div:last-child {
          margin-bottom: 0;
        }

        .direction-control {
          margin-bottom: 30px;
          text-align: center;
        }

        .direction-control h3 {
          margin-bottom: 15px;
          color: #1a1a1a;
        }

        .direction-slider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 10px;
        }

        .direction-label {
          font-size: 14px;
          color: #666;
          min-width: 40px;
        }

        .direction-input {
          width: 200px;
          height: 6px;
          border-radius: 3px;
          background: #ddd;
          outline: none;
          -webkit-appearance: none;
        }

        .direction-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #b8860b;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .direction-display {
          font-size: 16px;
          color: #8b0000;
          font-weight: bold;
        }

        .role-selection {
          margin-bottom: 30px;
          text-align: center;
        }

        .role-selection h3 {
          margin-bottom: 15px;
          color: #1a1a1a;
        }

        .role-tokens {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .role-token {
          padding: 8px 12px;
          border: 2px solid #ddd;
          border-radius: 20px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
        }

        .role-token:hover {
          border-color: #b8860b;
        }

        .role-token.selected {
          border-color: #8b0000;
          background: #ffe4e1;
          box-shadow: 0 0 8px rgba(139, 0, 0, 0.3);
        }

        .selection-summary {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .summary-item {
          display: flex;
          margin-bottom: 8px;
        }

        .summary-item:last-child {
          margin-bottom: 0;
        }

        .label {
          font-weight: bold;
          color: #1a1a1a;
          min-width: 80px;
        }

        .value {
          color: #666;
        }

        .instruction {
          background: #fffacd;
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #b8860b;
          font-size: 14px;
          color: #666;
        }

        @keyframes reveal {
          0% {
            opacity: 0;
            transform: scale(0.8) rotate(10deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @media (max-width: 768px) {
          .state-grid {
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(16, 1fr);
            gap: 6px;
          }

          .direction-slider {
            flex-direction: column;
            gap: 10px;
          }

          .direction-input {
            width: 150px;
          }

          .role-tokens {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default SixtyFourStatePan;