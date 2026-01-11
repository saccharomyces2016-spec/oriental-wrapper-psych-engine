/**
 * Fail-soft Utilities
 * 
 * 提供 fail-soft 機制，確保缺欄位時不會崩潰
 * 
 * 核心原則：
 * - 缺欄位時補預設值
 * - 欄位型別錯時嘗試修正或回退預設
 * - 所有設計保持不鎖定、不凍結、可回滾
 */

/**
 * Neutral Theme（中性玄學皮層）
 */
export const NEUTRAL_THEME = {
  metaphor_id: 'neutral_ritual_skin',
  primary_color: '#6B7280',
  font_family: 'system-ui',
  assets: {},
  typography: {
    heading_font: 'system-ui',
    body_font: 'system-ui',
    font_size_scale: 1.0,
  },
  isNeutralFallback: true,
} as const;

/**
 * 安全取得字串值（缺值時回傳空字串）
 */
export function safeString(value: unknown, defaultValue: string = ''): string {
  if (typeof value === 'string') {
    return value;
  }
  return defaultValue;
}

/**
 * 安全取得數字值（缺值時回傳預設值）
 */
export function safeNumber(value: unknown, defaultValue: number = 0): number {
  if (typeof value === 'number' && !isNaN(value)) {
    return value;
  }
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    if (!isNaN(parsed)) {
      return parsed;
    }
  }
  return defaultValue;
}

/**
 * 安全取得布林值（缺值時回傳預設值）
 */
export function safeBoolean(value: unknown, defaultValue: boolean = false): boolean {
  if (typeof value === 'boolean') {
    return value;
  }
  return defaultValue;
}

/**
 * 安全取得物件值（缺值時回傳空物件）
 */
export function safeObject<T extends Record<string, unknown>>(
  value: unknown,
  defaultValue: T
): T {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as T;
  }
  return defaultValue;
}

/**
 * 安全取得陣列值（缺值時回傳空陣列）
 */
export function safeArray<T>(value: unknown, defaultValue: T[] = []): T[] {
  if (Array.isArray(value)) {
    return value as T[];
  }
  return defaultValue;
}

/**
 * 驗證十六進位色碼格式
 */
export function isValidColorCode(color: string): boolean {
  return /^#([A-Fa-f0-9]{6})$/.test(color);
}

/**
 * 安全取得色碼（格式錯誤時回傳預設值）
 */
export function safeColorCode(
  value: unknown,
  defaultValue: string = NEUTRAL_THEME.primary_color
): string {
  const color = safeString(value, '');
  if (color && isValidColorCode(color)) {
    return color;
  }
  return defaultValue;
}

