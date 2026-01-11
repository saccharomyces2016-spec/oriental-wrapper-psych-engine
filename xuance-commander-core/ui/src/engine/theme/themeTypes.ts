/**
 * Theme Types
 * 
 * 定義 theme 相關類型
 * 
 * 核心原則：
 * - Theme Engine 負責 CSS Variables 注入
 * - 必須支援 Neutral Theme fallback
 * - 所有設計保持不鎖定、不凍結、可回滾
 */

/**
 * Theme Assets
 */
export type ThemeAssets = {
  background_url?: string;
  particle_texture?: string;
  border_pattern?: string;
};

/**
 * Theme Config
 */
export type ThemeConfig = {
  primary_color: string;     // "#RRGGBB"
  font_family?: string;      // e.g. "Inter, system-ui"
  assets?: ThemeAssets;
  typography?: {
    heading_font?: string;
    body_font?: string;
    font_size_scale?: number;
  };
};

/**
 * Resolved Theme
 */
export type ResolvedTheme = ThemeConfig & {
  __resolved: true;
  __source: 'facet' | 'neutral';
};

