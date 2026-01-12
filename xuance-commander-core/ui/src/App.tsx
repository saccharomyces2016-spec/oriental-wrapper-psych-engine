/**
 * App Component
 * 
 * 主應用組件
 * 
 * 核心原則：
 * - 整合所有階段（Stage 2, 3, 4）
 * - 管理 Flow State（單次會話的用戶交互數據）
 * - 載入並處理 Facet 資料
 * - 所有設計保持不鎖定、不凍結、可回滾
 */

import { FlowStateProvider, useFlowState } from './state';
import { useFacetData } from './hooks';
import { Stage2Page } from './pages/Stage2Page';
import { Stage3Page } from './pages/Stage3Page';
import { Stage4Page } from './pages/Stage4Page';
import { useI18nStore } from './engine/i18n';
import './App.css';

/**
 * App Content Component（需要在 FlowStateProvider 內部）
 */
function AppContent() {
  const { state } = useFlowState();
  const { locale, setLocale } = useI18nStore();
  
  // 從 URL 查詢參數獲取資料路徑（測試用）
  const urlParams = new URLSearchParams(window.location.search);
  const dataPath = urlParams.get('data') || '/data/compiled_facet.json';
  
  const { viewModel, loading, error } = useFacetData(dataPath);

  // 語言切換按鈕
  const handleLocaleToggle = () => {
    setLocale(locale === 'zh-TW' ? 'en-US' : 'zh-TW');
  };

  // 載入中
  if (loading) {
    return (
      <div className="app-loading">
        <div>載入中...</div>
      </div>
    );
  }

  // 錯誤狀態
  if (error || !viewModel) {
    return (
      <div className="app-error">
        <div>載入失敗：{error?.message || 'Unknown error'}</div>
        <button onClick={() => window.location.reload()}>重試</button>
      </div>
    );
  }

  // 根據當前階段渲染對應頁面
  const renderStage = () => {
    switch (state.currentStage) {
      case 2:
        return <Stage2Page viewModel={viewModel} />;
      case 3:
        return <Stage3Page viewModel={viewModel} />;
      case 4:
        return <Stage4Page viewModel={viewModel} />;
      default:
        return <Stage2Page viewModel={viewModel} />;
    }
  };

  return (
    <div className="app">
      {/* 語言切換按鈕（右上角） */}
      <div className="app-header">
        <button onClick={handleLocaleToggle} className="locale-toggle">
          {locale === 'zh-TW' ? 'EN' : '中文'}
        </button>
      </div>

      {/* 主要內容區域 */}
      <main className="app-main">
        {renderStage()}
      </main>
    </div>
  );
}

/**
 * App Component
 */
function App() {
  return (
    <FlowStateProvider>
      <AppContent />
    </FlowStateProvider>
  );
}

export default App;
