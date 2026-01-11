/**
 * Main Entry Point
 * 
 * 應用入口點
 * 
 * 核心原則：
 * - 使用 React StrictMode
 * - 所有設計保持不鎖定、不凍結、可回滾
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
