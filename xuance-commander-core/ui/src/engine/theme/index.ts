/**
 * Theme 導出接口
 * 
 * 統一導出 Theme 相關的類型與函數
 * 
 * 所有設計保持不鎖定、不凍結、可回滾
 */

export { resolveTheme, applyTheme } from './themeEngine';
export { NEUTRAL_THEME } from './neutralTheme';
export type { ThemeConfig, ThemeAssets, ResolvedTheme } from './themeTypes';

