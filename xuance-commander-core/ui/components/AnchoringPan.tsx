import React, { useState } from 'react';

interface AnchoringPanProps {
  onAnchorChange: (anchors: {
    positive: string;
    negative: string;
    confidence: number;
  }) => void;
}

const ANCHOR_OPTIONS = [
  {
    id: 'mature',
    text: '我應該更成熟',
    category: 'positive',
    attribution: 'internal',
    confidence: 'high'
  },
  {
    id: 'support',
    text: '我需要更多支持',
    category: 'positive',
    attribution: 'external',
    confidence: 'medium'
  },
  {
    id: 'escape',
    text: '我想要逃離',
    category: 'positive',
    attribution: 'mixed',
    confidence: 'high'
  },
  {
    id: 'useless',
    text: '我很沒用',
    category: 'negative',
    attribution: 'internal',
    confidence: 'high'
  },
  {
    id: 'confident',
    text: '我很有自信',
    category: 'negative',
    attribution: 'internal',
    confidence: 'high'
  },
  {
    id: 'others_fault',
    text: '我覺得是對方的錯',
    category: 'negative',
    attribution: 'external',
    confidence: 'high'
  },
  {
    id: 'incompetent',
    text: '我能力不足',
    category: 'negative',
    attribution: 'internal',
    confidence: 'medium'
  },
  {
    id: 'unfair',
    text: '這不公平',
    category: 'negative',
    attribution: 'external',
    confidence: 'medium'
  },
  {
    id: 'apathetic',
    text: '我不在乎',
    category: 'negative',
    attribution: 'internal',
    confidence: 'low'
  },
  {
    id: 'overwhelmed',
    text: '我應付不來',
    category: 'negative',
    attribution: 'mixed',
    confidence: 'medium'
  },
  {
    id: 'focused',
    text: '我很專注',
    category: 'negative',
    attribution: 'internal',
    confidence: 'high'
  },
  {
    id: 'flexible',
    text: '我很靈活',
    category: 'negative',
    attribution: 'internal',
    confidence: 'medium'
  }
];

const AnchoringPan: React.FC<AnchoringPanProps> = ({ onAnchorChange }) => {
  const [selectedPositive, setSelectedPositive] = useState<string>('');
  const [selectedNegative, setSelectedNegative] = useState<string>('');
  const [confidence, setConfidence] = useState<number>(0.7);

  const handleAnchorSelect = (anchorId: string, category: 'positive' | 'negative') => {
    if (category === 'positive') {
      setSelectedPositive(anchorId);
    } else {
      setSelectedNegative(anchorId);
    }

    // 通知父組件
    onAnchorChange({
      positive: selectedPositive === anchorId ? '' : (category === 'positive' ? anchorId : selectedPositive),
      negative: selectedNegative === anchorId ? '' : (category === 'negative' ? anchorId : selectedNegative),
      confidence
    });
  };

  const getConfidenceLabel = () => {
    if (confidence < 0.4) return '低 - 感覺不太準';
    if (confidence < 0.7) return '中 - 勉強準確';
    return '高 - 非常準確';
  };

  const positiveOptions = ANCHOR_OPTIONS.filter(opt => opt.category === 'positive');
  const negativeOptions = ANCHOR_OPTIONS.filter(opt => opt.category === 'negative');

  return (
    <div className="anchoring-pan">
      <div className="pan-header">
        <h2>【最後確認】</h2>
        <p>請選擇最像你和最不像你的描述，這將幫助我們更準確地理解你的狀態</p>
      </div>

      <div className="anchor-section">
        <div className="anchor-group">
          <h3>最像我的是：</h3>
          <div className="anchor-options">
            {positiveOptions.map(option => (
              <button
                key={option.id}
                className={`anchor-option ${selectedPositive === option.id ? 'selected' : ''}`}
                onClick={() => handleAnchorSelect(option.id, 'positive')}
              >
                {option.text}
              </button>
            ))}
          </div>
          {selectedPositive && (
            <div className="selected-display">
              已選擇：{positiveOptions.find(opt => opt.id === selectedPositive)?.text}
            </div>
          )}
        </div>

        <div className="anchor-group">
          <h3>最不像我的是：</h3>
          <div className="anchor-options">
            {negativeOptions.map(option => (
              <button
                key={option.id}
                className={`anchor-option ${selectedNegative === option.id ? 'selected' : ''}`}
                onClick={() => handleAnchorSelect(option.id, 'negative')}
              >
                {option.text}
              </button>
            ))}
          </div>
          {selectedNegative && (
            <div className="selected-display">
              已選擇：{negativeOptions.find(opt => opt.id === selectedNegative)?.text}
            </div>
          )}
        </div>
      </div>

      <div className="confidence-section">
        <h3>整體準確度：</h3>
        <div className="confidence-slider">
          <span className="confidence-label">低</span>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.1"
            value={confidence}
            onChange={(e) => setConfidence(parseFloat(e.target.value))}
            className="confidence-input"
          />
          <span className="confidence-label">高</span>
        </div>
        <div className="confidence-display">
          {getConfidenceLabel()}
        </div>
      </div>

      <div className="summary-section">
        <h3>你的選擇：</h3>
        <div className="summary-content">
          <div className="summary-item">
            <span className="label">最像我：</span>
            <span className="value">
              {selectedPositive ?
                positiveOptions.find(opt => opt.id === selectedPositive)?.text :
                '尚未選擇'
              }
            </span>
          </div>
          <div className="summary-item">
            <span className="label">最不像我：</span>
            <span className="value">
              {selectedNegative ?
                negativeOptions.find(opt => opt.id === selectedNegative)?.text :
                '尚未選擇'
              }
            </span>
          </div>
          <div className="summary-item">
            <span className="label">準確度：</span>
            <span className="value">{getConfidenceLabel()}</span>
          </div>
        </div>
      </div>

      <div className="instruction">
        💡 提示：這個階段是用來「最後錨定」你的狀態。
        請誠實選擇最符合和最不符合你的描述，這將幫助系統做出最終調整。
        如果你覺得整體很準，就把準確度調高；如果覺得有偏差，就調低。
      </div>

      <style jsx>{`
        .anchoring-pan {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Source Han Serif TC', serif;
        }

        .pan-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .pan-header h2 {
          font-size: 32px;
          color: #1a1a1a;
          margin-bottom: 10px;
        }

        .pan-header p {
          font-size: 16px;
          color: #666;
          line-height: 1.6;
        }

        .anchor-section {
          margin-bottom: 40px;
        }

        .anchor-group {
          margin-bottom: 30px;
        }

        .anchor-group h3 {
          margin-bottom: 15px;
          color: #1a1a1a;
          font-size: 20px;
        }

        .anchor-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          margin-bottom: 15px;
        }

        .anchor-option {
          padding: 12px 16px;
          border: 2px solid #ddd;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
          font-size: 14px;
          line-height: 1.4;
          min-height: 50px;
          display: flex;
          align-items: center;
        }

        .anchor-option:hover {
          border-color: #b8860b;
          background: #fffacd;
        }

        .anchor-option.selected {
          border-color: #8b0000;
          background: #ffe4e1;
          box-shadow: 0 0 8px rgba(139, 0, 0, 0.3);
          font-weight: bold;
        }

        .selected-display {
          background: #f0f8ff;
          padding: 10px;
          border-radius: 6px;
          border-left: 4px solid #8b0000;
          font-size: 14px;
          color: #1a1a1a;
        }

        .confidence-section {
          margin-bottom: 40px;
          text-align: center;
        }

        .confidence-section h3 {
          margin-bottom: 20px;
          color: #1a1a1a;
          font-size: 20px;
        }

        .confidence-slider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 15px;
        }

        .confidence-label {
          font-size: 16px;
          color: #666;
          font-weight: bold;
        }

        .confidence-input {
          width: 250px;
          height: 8px;
          border-radius: 4px;
          background: #ddd;
          outline: none;
          -webkit-appearance: none;
        }

        .confidence-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #b8860b;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }

        .confidence-display {
          font-size: 18px;
          color: #8b0000;
          font-weight: bold;
        }

        .summary-section {
          background: #f9f9f9;
          padding: 25px;
          border-radius: 10px;
          margin-bottom: 30px;
        }

        .summary-section h3 {
          margin-bottom: 20px;
          color: #1a1a1a;
          text-align: center;
        }

        .summary-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .summary-item {
          display: flex;
          margin-bottom: 12px;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }

        .summary-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }

        .label {
          font-weight: bold;
          color: #1a1a1a;
          min-width: 100px;
          flex-shrink: 0;
        }

        .value {
          color: #666;
          flex: 1;
        }

        .instruction {
          background: #fffacd;
          padding: 18px;
          border-radius: 8px;
          border-left: 4px solid #b8860b;
          font-size: 14px;
          color: #666;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .anchor-options {
            grid-template-columns: 1fr;
          }

          .confidence-slider {
            flex-direction: column;
            gap: 15px;
          }

          .confidence-input {
            width: 200px;
          }

          .summary-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }

          .label {
            min-width: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default AnchoringPan;