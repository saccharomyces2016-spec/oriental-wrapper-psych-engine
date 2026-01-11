/**
 * Theme Engine
 * 
 * Theme 解析與 CSS Variables 注入
 * 
 * 核心原則：
 * - Adapter 解析 theme_config，若缺失或不合法 → 回傳 NEUTRAL_THEME
 * - applyTheme 將值注入 CSS Variables
 * - 若背景圖 URL 無法載入，不拋錯：背景 fallback 到純色/漸層
 * - 所有設計保持不鎖定、不凍結、可回滾
 */

import type { ResolvedTheme, ThemeConfig } from './themeTypes';
import { NEUTRAL_THEME } from './neutralTheme';

/**
 * 驗證十六進位色碼格式
 */
function isHexColor(s: unknown): s is string {
  return typeof s === 'string' && /^#([A-Fa-f0-9]{6})$/.test(s);
}

/**
 * 解析 Theme（從 Raw Config 解析為 ResolvedTheme）
 * 
 * @param raw - Raw Theme Config
 * @returns ResolvedTheme
 */
export function resolveTheme(raw: unknown): ResolvedTheme {
  try {
    const cfg = raw as Partial<ThemeConfig>;
    if (!cfg || !isHexColor(cfg.primary_color)) {
      return NEUTRAL_THEME;
    }

    return {
      primary_color: cfg.primary_color,
      font_family: cfg.font_family ?? NEUTRAL_THEME.font_family,
      assets: cfg.assets ?? NEUTRAL_THEME.assets,
      typography: cfg.typography ?? NEUTRAL_THEME.typography,
      __resolved: true,
      __source: 'facet',
    };
  } catch {
    return NEUTRAL_THEME;
  }
}

/**
 * 應用 Theme（將 Theme 值注入 CSS Variables）
 * 
 * @param theme - ResolvedTheme
 */
export function applyTheme(theme: ResolvedTheme): void {
  try {
    const root = document.documentElement;
    
    // 設定主要顏色
    root.style.setProperty('--theme-primary', theme.primary_color);
    root.style.setProperty('--theme-font', theme.font_family ?? '');
    
    // 設定字體
    if (theme.typography) {
      if (theme.typography.heading_font) {
        root.style.setProperty('--theme-heading-font', theme.typography.heading_font);
      }
      if (theme.typography.body_font) {
        root.style.setProperty('--theme-body-font', theme.typography.body_font);
      }
      if (theme.typography.font_size_scale !== undefined) {
        root.style.setProperty('--theme-font-size-scale', String(theme.typography.font_size_scale));
      }
    }
    
    // 設定背景圖片
    const bg = theme.assets?.background_url ?? '';
    root.style.setProperty('--theme-bg-url', bg ? `url(${bg})` : 'none');
    
    // 設定粒子紋理
    const particle = theme.assets?.particle_texture ?? '';
    root.style.setProperty('--theme-particle-url', particle ? `url(${particle})` : 'none');
    
    // 設定邊框圖案
    const border = theme.assets?.border_pattern ?? '';
    root.style.setProperty('--theme-border-url', border ? `url(${border})` : 'none');
    
    // 標記 theme 來源
    root.dataset.themeSource = theme.__source;
  } catch {
    // 最終保險：即使 applyTheme 自己爆，也不能讓 UI 白屏
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', NEUTRAL_THEME.primary_color);
    root.style.setProperty('--theme-font', NEUTRAL_THEME.font_family ?? '');
    root.style.setProperty('--theme-bg-url', 'none');
    root.style.setProperty('--theme-particle-url', 'none');
    root.style.setProperty('--theme-border-url', 'none');
    root.dataset.themeSource = 'neutral';
  }
}

