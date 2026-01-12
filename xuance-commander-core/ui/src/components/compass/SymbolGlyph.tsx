/**
 * Symbol Glyph Component
 * 
 * 符碼組件（單個符碼）
 * 
 * 核心原則：
 * - SVG 為核心
 * - 支援點擊互動
 * - 所有設計保持不鎖定、不凍結、可回滾
 */

import { CartesianPosition } from './compassMath';

/**
 * Symbol Glyph Props
 */
export interface SymbolGlyphProps {
  id: string;
  labelKey: string;
  svgRef: string;
  position: CartesianPosition;
  isSelected: boolean;
  onClick: (id: string) => void;
  getLabel: (key: string) => string;
}

/**
 * Symbol Glyph Component
 */
export function SymbolGlyph({
  id,
  labelKey,
  svgRef: _svgRef, // 未來用於載入 SVG，目前為 placeholder
  position,
  isSelected,
  onClick,
  getLabel,
}: SymbolGlyphProps) {
  const label = getLabel(labelKey);
  const hitAreaRadius = 32; // 點擊區域半徑（調整為 32px，包含文字區域，符合行動裝置標準）
  
  // 開發環境檢查：如果 label 等於 labelKey，表示翻譯未找到
  if (process.env.NODE_ENV === 'development' && label === labelKey) {
    console.warn(`[SymbolGlyph] Translation missing for key: "${labelKey}"`);
  }

  const handleClick = () => {
    onClick(id);
  };

  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      className={`compass-glyph ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Hit area（透明，擴大點擊區域，包含圓點和文字） */}
      <circle
        r={hitAreaRadius}
        fill="transparent"
        style={{ cursor: 'pointer' }}
      />
      
      {/* 符碼圖示（placeholder，未來可載入 SVG） */}
      <circle
        r={12}
        fill={isSelected ? 'var(--theme-primary, #6B7280)' : '#999'}
        stroke={isSelected ? '#fff' : 'transparent'}
        strokeWidth={2}
        style={{ cursor: 'pointer' }}
      />
      
      {/* 符碼標籤（允許點擊） */}
      <text
        x={0}
        y={28}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={12}
        fill={isSelected ? 'var(--theme-primary, #6B7280)' : '#666'}
        style={{ 
          pointerEvents: 'auto',
          cursor: 'pointer',
          userSelect: 'none',
          textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)'
        }}
      >
        {label}
      </text>
    </g>
  );
}

