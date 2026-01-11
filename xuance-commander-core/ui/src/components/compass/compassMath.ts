/**
 * Compass Math
 * 
 * 羅盤布局算法（極座標轉換）
 * 
 * 核心原則：
 * - 均分分布（Baseline）
 * - 密度控制（避免擠爆）
 * - Jitter（儀式感自然度）
 * - 所有設計保持不鎖定、不凍結、可回滾
 */

/**
 * 極座標位置
 */
export interface PolarPosition {
  angle: number;  // 角度（弧度）
  radius: number; // 半徑
}

/**
 * 笛卡兒座標位置
 */
export interface CartesianPosition {
  x: number;
  y: number;
}

/**
 * 軌道參數
 */
export interface TrackParams {
  id: 'INNER' | 'MIDDLE' | 'OUTER';
  radiusRatio: number;  // 0~1, 相對於 min(width,height)/2
  glyphCount: number;
}

/**
 * 極座標轉換為笛卡兒座標
 * 
 * @param angle - 角度（弧度）
 * @param radius - 半徑
 * @param center - 中心點
 * @returns 笛卡兒座標
 */
export function polarToCartesian(
  angle: number,
  radius: number,
  center: { x: number; y: number } = { x: 0, y: 0 }
): CartesianPosition {
  return {
    x: center.x + radius * Math.cos(angle),
    y: center.y + radius * Math.sin(angle),
  };
}

/**
 * 計算符碼位置（均分分布）
 * 
 * @param index - 符碼索引
 * @param total - 總符碼數
 * @param startAngle - 起始角度（弧度，預設 -π/2，12 點鐘方向）
 * @returns 角度（弧度）
 */
export function calculateGlyphAngle(
  index: number,
  total: number,
  startAngle: number = -Math.PI / 2
): number {
  return startAngle + (index * (2 * Math.PI / total));
}

/**
 * 計算符碼半徑（根據軌道）
 * 
 * @param trackId - 軌道 ID
 * @param viewSize - 視圖大小（min(width, height)）
 * @returns 半徑
 */
export function calculateGlyphRadius(
  trackId: 'INNER' | 'MIDDLE' | 'OUTER',
  viewSize: number
): number {
  const radiusRatios: Record<'INNER' | 'MIDDLE' | 'OUTER', number> = {
    INNER: 0.30,
    MIDDLE: 0.55,
    OUTER: 0.85,
  };
  
  return (viewSize / 2) * radiusRatios[trackId];
}

/**
 * 計算符碼位置（含 Jitter）
 * 
 * @param index - 符碼索引
 * @param total - 總符碼數
 * @param trackId - 軌道 ID
 * @param viewSize - 視圖大小
 * @param jitter - Jitter 強度（0-1，0 為無 Jitter）
 * @returns 極座標位置
 */
export function calculateGlyphPosition(
  index: number,
  total: number,
  trackId: 'INNER' | 'MIDDLE' | 'OUTER',
  viewSize: number,
  jitter: number = 0
): PolarPosition {
  const baseAngle = calculateGlyphAngle(index, total);
  const baseRadius = calculateGlyphRadius(trackId, viewSize);
  
  // Jitter（可選）
  let angle = baseAngle;
  let radius = baseRadius;
  
  if (jitter > 0) {
    // 使用 deterministic seed（基於 index）
    const seed = index * 31;
    const angleJitter = (Math.sin(seed) * jitter * 0.1) - (jitter * 0.05);
    const radiusJitter = (Math.cos(seed * 2) * jitter * 0.05) - (jitter * 0.025);
    
    angle = baseAngle + angleJitter;
    radius = baseRadius + radiusJitter;
  }
  
  return { angle, radius };
}

