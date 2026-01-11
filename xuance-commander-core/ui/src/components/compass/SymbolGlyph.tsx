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

import React from 'react';
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
  svgRef,
  position,
  isSelected,
  onClick,
  getLabel,
}: SymbolGlyphProps) {
  const label = getLabel(labelKey);
  const hitAreaRadius = 20; // 點擊區域半徑（可調整）

  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      className={`compass-glyph ${isSelected ? 'selected' : ''}`}
    >
      {/* Hit area（透明，擴大點擊區域） */}
      <circle
        r={hitAreaRadius}
        fill="transparent"
        style={{ cursor: 'pointer' }}
        onClick={() => onClick(id)}
      />
      
      {/* 符碼圖示（placeholder，未來可載入 SVG） */}
      <circle
        r={12}
        fill={isSelected ? 'var(--theme-primary, #6B7280)' : '#999'}
        stroke={isSelected ? '#fff' : 'transparent'}
        strokeWidth={2}
        onClick={() => onClick(id)}
        style={{ cursor: 'pointer' }}
      />
      
      {/* 符碼標籤 */}
      <text
        x={0}
        y={28}
        textAnchor="middle"
        fontSize={12}
        fill={isSelected ? 'var(--theme-primary, #6B7280)' : '#666'}
        style={{ pointerEvents: 'none' }}
      >
        {label}
      </text>
    </g>
  );
}

