/**
 * Neutral Theme
 * 
 * 中性玄學皮層（Neutral Ritual Skin）
 * 
 * 核心原則：
 * - 作為 theme_config 缺失時的 fallback
 * - 所有設計保持不鎖定、不凍結、可回滾
 */

import type { ResolvedTheme } from './themeTypes';

/**
 * Neutral Theme（預設主題，用於 fallback）
 */
export const NEUTRAL_THEME: ResolvedTheme = {
  primary_color: '#6B7280',
  font_family: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
  assets: {},
  typography: {
    heading_font: 'system-ui',
    body_font: 'system-ui',
    font_size_scale: 1.0,
  },
  __resolved: true,
  __source: 'neutral',
};

