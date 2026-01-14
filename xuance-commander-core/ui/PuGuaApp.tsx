import React, { useState } from 'react';
import BaguaSymbolPan from './components/BaguaSymbolPan';
import SixtyFourStatePan from './components/SixtyFourStatePan';
import AnchoringPan from './components/AnchoringPan';

type AppState = 'welcome' | 'bagua' | 'states' | 'anchoring' | 'loading' | 'result';

interface DiagnosticData {
  theme: string;
  phaseA: any[];
  phaseB: {
    primary: string;
    secondary: string[];
    direction: number;
    roleTokens: string[];
  };
  phaseC: {
    positive: string;
    negative: string;
    confidence: number;
  };
}

const PuGuaApp: React.FC = () => {
  const [currentState, setCurrentState] = useState<AppState>('welcome');
  const [diagnosticData, setDiagnosticData] = useState<DiagnosticData>({
    theme: '',
    phaseA: [],
    phaseB: {
      primary: '',
      secondary: [],
      direction: 0,
      roleTokens: []
    },
    phaseC: {
      positive: '',
      negative: '',
      confidence: 0.7
    }
  });

  const handleThemeSelect = (theme: string) => {
    setDiagnosticData(prev => ({ ...prev, theme }));
    setCurrentState('bagua');
  };

  const handleBaguaSelection = (selections: any[]) => {
    setDiagnosticData(prev => ({ ...prev, phaseA: selections }));
  };

  const handleStateSelection = (selections: any) => {
    setDiagnosticData(prev => ({ ...prev, phaseB: selections }));
  };

  const handleAnchorChange = (anchors: any) => {
    setDiagnosticData(prev => ({ ...prev, phaseC: anchors }));
  };

  const handleNext = () => {
    switch (currentState) {
      case 'bagua':
        setCurrentState('states');
        break;
      case 'states':
        setCurrentState('anchoring');
        break;
      case 'anchoring':
        handleDiagnose();
        break;
    }
  };

  const handleDiagnose = async () => {
    setCurrentState('loading');

    try {
      // 發送診斷請求
      const response = await fetch('/api/v1/pugua/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(diagnosticData)
      });

      if (!response.ok) {
        throw new Error('診斷請求失敗');
      }

      const result = await response.json();
      setCurrentState('result');

    } catch (error) {
      console.error('診斷失敗:', error);
      // 處理錯誤
      setCurrentState('result'); // 臨時跳轉
    }
  };

  const renderCurrentView = () => {
    switch (currentState) {
      case 'welcome':
        return (
          <div className="welcome-screen">
            <div className="welcome-content">
              <h1 className="title">譜掛</h1>
              <p className="subtitle">東方卜卦系統</p>
              <p className="description">
                這是一個古老的占問儀式，通過符號的感應，揭示你內在的狀態與走向。
                請誠心面對，系統將為你呈現卦象與指引。
              </p>

              <div className="theme-selection">
                <h3>請選擇你的占問主題：</h3>
                <div className="theme-buttons">
                  <button onClick={() => handleThemeSelect('career')}>💼 事業前程</button>
                  <button onClick={() => handleThemeSelect('wealth')}>💰 財富資源</button>
                  <button onClick={() => handleThemeSelect('relationship')}>❤️ 感情婚姻</button>
                  <button onClick={() => handleThemeSelect('authority')}>🏛️ 權威關係</button>
                  <button onClick={() => handleThemeSelect('creativity')}>🌱 創作表達</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'bagua':
        return (
          <div className="phase-container">
            <BaguaSymbolPan onSelectionChange={handleBaguaSelection} />
            <div className="navigation">
              <button
                className="next-button"
                onClick={handleNext}
                disabled={diagnosticData.phaseA.length === 0}
              >
                下一步：狀態盤
              </button>
            </div>
          </div>
        );

      case 'states':
        return (
          <div className="phase-container">
            <SixtyFourStatePan onSelectionChange={handleStateSelection} />
            <div className="navigation">
              <button
                className="back-button"
                onClick={() => setCurrentState('bagua')}
              >
                上一步
              </button>
              <button
                className="next-button"
                onClick={handleNext}
                disabled={!diagnosticData.phaseB.primary}
              >
                下一步：最後確認
              </button>
            </div>
          </div>
        );

      case 'anchoring':
        return (
          <div className="phase-container">
            <AnchoringPan onAnchorChange={handleAnchorChange} />
            <div className="navigation">
              <button
                className="back-button"
                onClick={() => setCurrentState('states')}
              >
                上一步
              </button>
              <button
                className="next-button"
                onClick={handleNext}
              >
                開始卜卦
              </button>
            </div>
          </div>
        );

      case 'loading':
        return (
          <div className="loading-screen">
            <div className="loading-content">
              <div className="coin-animation">
                <div className="coin">☯</div>
                <div className="coin">☯</div>
                <div className="coin">☯</div>
              </div>
              <h2>卦象顯化中...</h2>
              <p>請靜心等待，天道運轉有其節奏</p>
              <div className="loading-text">
                {[
                  "天行健，君子以自強不息",
                  "窮則變，變則通，通則久",
                  "否極泰來，剝極必復",
                  "積善之家，必有餘慶"
                ][Math.floor(Math.random() * 4)]}
              </div>
            </div>
          </div>
        );

      case 'result':
        return (
          <div className="result-screen">
            <div className="result-content">
              <h1>卦象已成</h1>
              <p>系統正在生成你的專屬解讀...</p>
              {/* 這裡會顯示實際的結果 */}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pugua-app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="brand">譜掛</h1>
          <div className="progress-indicator">
            <div className={`step ${currentState === 'welcome' ? 'active' : currentState !== 'welcome' ? 'completed' : ''}`}>1</div>
            <div className={`step ${['bagua', 'states', 'anchoring'].includes(currentState) ? 'active' : ['loading', 'result'].includes(currentState) ? 'completed' : ''}`}>2</div>
            <div className={`step ${['loading', 'result'].includes(currentState) ? 'active' : ''}`}>3</div>
          </div>
        </div>
      </header>

      <main className="app-main">
        {renderCurrentView()}
      </main>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Source Han Serif TC', serif;
          background: linear-gradient(135deg, #f5f5dc 0%, #fff 100%);
          color: #1a1a1a;
          line-height: 1.6;
        }

        .pugua-app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .app-header {
          background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
          color: white;
          padding: 20px 0;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .brand {
          font-size: 28px;
          font-weight: bold;
          color: #b8860b;
        }

        .progress-indicator {
          display: flex;
          gap: 10px;
        }

        .step {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          background: #555;
          color: #ccc;
          transition: all 0.3s ease;
        }

        .step.active {
          background: #b8860b;
          color: white;
        }

        .step.completed {
          background: #8b0000;
          color: white;
        }

        .app-main {
          flex: 1;
          padding: 20px;
        }

        .welcome-screen {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 70vh;
        }

        .welcome-content {
          text-align: center;
          max-width: 600px;
        }

        .title {
          font-size: 64px;
          color: #8b0000;
          margin-bottom: 10px;
          font-weight: bold;
        }

        .subtitle {
          font-size: 24px;
          color: #b8860b;
          margin-bottom: 30px;
        }

        .description {
          font-size: 18px;
          color: #666;
          margin-bottom: 40px;
          line-height: 1.8;
        }

        .theme-selection h3 {
          margin-bottom: 20px;
          color: #1a1a1a;
          font-size: 20px;
        }

        .theme-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          max-width: 500px;
          margin: 0 auto;
        }

        .theme-buttons button {
          padding: 15px;
          border: 2px solid #b8860b;
          border-radius: 10px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 16px;
          font-weight: bold;
        }

        .theme-buttons button:hover {
          background: #b8860b;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(184, 134, 11, 0.3);
        }

        .phase-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .navigation {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 30px;
        }

        .back-button, .next-button {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .back-button {
          background: #666;
          color: white;
        }

        .back-button:hover {
          background: #555;
        }

        .next-button {
          background: #b8860b;
          color: white;
        }

        .next-button:hover:not(:disabled) {
          background: #a0760a;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(184, 134, 11, 0.3);
        }

        .next-button:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .loading-screen {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 70vh;
        }

        .loading-content {
          text-align: center;
        }

        .coin-animation {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 30px;
        }

        .coin {
          font-size: 48px;
          animation: coin-flip 2s ease-in-out infinite;
          animation-delay: calc(var(--delay, 0) * 0.3s);
        }

        .coin:nth-child(1) { --delay: 0; }
        .coin:nth-child(2) { --delay: 1; }
        .coin:nth-child(3) { --delay: 2; }

        @keyframes coin-flip {
          0%, 100% { transform: rotateY(0deg); }
          50% { transform: rotateY(180deg); }
        }

        .loading-content h2 {
          font-size: 32px;
          color: #1a1a1a;
          margin-bottom: 10px;
        }

        .loading-content p {
          font-size: 18px;
          color: #666;
          margin-bottom: 30px;
        }

        .loading-text {
          font-size: 16px;
          color: #8b0000;
          font-style: italic;
          padding: 15px;
          background: #fffacd;
          border-radius: 8px;
          border-left: 4px solid #b8860b;
        }

        .result-screen {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 70vh;
        }

        .result-content {
          text-align: center;
          max-width: 600px;
        }

        .result-content h1 {
          font-size: 48px;
          color: #8b0000;
          margin-bottom: 20px;
        }

        .result-content p {
          font-size: 18px;
          color: #666;
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 15px;
          }

          .progress-indicator {
            order: -1;
          }

          .theme-buttons {
            grid-template-columns: 1fr;
          }

          .navigation {
            flex-direction: column;
            align-items: center;
          }

          .back-button, .next-button {
            width: 150px;
          }

          .coin-animation {
            gap: 10px;
          }

          .coin {
            font-size: 36px;
          }
        }
      `}</style>
    </div>
  );
};

export default PuGuaApp;