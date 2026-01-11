/**
 * Radial Compass Component
 * 
 * Stage 2 萬象羅盤組件
 * 
 * 核心原則：
 * - SVG 為核心（不可用 Canvas）
 * - 20-30 符碼流暢渲染（桌面/手機）
 * - 3 象選取（可取消、可確認）
 * - 手機單手可用（旋盤或撥動）
 * - 儀式感互動（凝視→直覺選取）
 * - 所有設計保持不鎖定、不凍結、可回滾
 */

import React, { useState, useMemo, useCallback } from 'react';
import type { FacetViewModel } from '../../adapters/types';
import { useI18nStore } from '../../engine/i18n';
import { polarToCartesian, calculateGlyphPosition } from './compassMath';
import { SymbolGlyph } from './SymbolGlyph';
import './compass.css';

/**
 * Radial Compass Props
 */
export interface RadialCompassProps {
  viewModel: FacetViewModel;
  onSelectionChange: (selectedIds: string[]) => void;
  onConfirm: (selectedIds: string[]) => void;
}

/**
 * Radial Compass Component
 */
export function RadialCompass({
  viewModel,
  onSelectionChange,
  onConfirm,
}: RadialCompassProps) {
  const { t } = useI18nStore();
  const compassData = viewModel.stages.compass;
  const rules = compassData.rules;
  
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [viewSize] = useState(600); // 視圖大小（可根據實際容器調整）

  // 計算符碼位置
  const glyphPositions = useMemo(() => {
    const trackGroups: Record<'INNER' | 'MIDDLE' | 'OUTER', number> = {
      INNER: 0,
      MIDDLE: 0,
      OUTER: 0,
    };

    // 計算每個軌道的符碼數量
    compassData.symbols.forEach((symbol) => {
      trackGroups[symbol.track]++;
    });

    // 計算每個符碼的位置
    const positions: Record<string, { x: number; y: number }> = {};
    const trackIndices: Record<'INNER' | 'MIDDLE' | 'OUTER', number> = {
      INNER: 0,
      MIDDLE: 0,
      OUTER: 0,
    };

    compassData.symbols.forEach((symbol) => {
      const trackCount = trackGroups[symbol.track];
      const index = trackIndices[symbol.track]++;
      
      const polarPos = calculateGlyphPosition(
        index,
        trackCount,
        symbol.track,
        viewSize,
        0 // jitter（可調整）
      );
      
      // 計算相對於原點 (0,0) 的位置，之後會用 transform translate 移動到中心
      positions[symbol.id] = polarToCartesian(polarPos.angle, polarPos.radius, {
        x: 0,
        y: 0,
      });
    });

    return positions;
  }, [compassData.symbols, viewSize]);

  // 處理符碼點擊
  const handleGlyphClick = useCallback((id: string) => {
    setSelectedIds((prev) => {
      let next: string[];
      
      if (prev.includes(id)) {
        // 取消選取
        next = prev.filter((selectedId) => selectedId !== id);
      } else {
        // 新增選取
        if (prev.length >= rules.selectMax) {
          // 已達最大選取數，移除第一個，加入新的
          next = [...prev.slice(1), id];
        } else {
          next = [...prev, id];
        }
      }
      
      // 使用 setTimeout 確保在渲染完成後調用
      setTimeout(() => {
        onSelectionChange(next);
      }, 0);
      
      return next;
    });
  }, [rules.selectMax, onSelectionChange]);

  // 處理確認
  const handleConfirm = () => {
    if (selectedIds.length >= rules.selectMin) {
      onConfirm(selectedIds);
    }
  };

  const guideText = t('compass_guide') || '請凝視盤面，選出三個最有感的符碼';
  const canConfirm = selectedIds.length >= rules.selectMin;

  return (
    <div className="radial-compass-container">
      <div className="compass-guide">
        <p>{guideText}</p>
        <p>
          {selectedIds.length} / {rules.selectMax}
        </p>
      </div>

      <svg
        viewBox={`0 0 ${viewSize} ${viewSize}`}
        className="radial-compass"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          {/* 未來可加入 filter、mask、gradients */}
        </defs>

        {/* 軌道圓（可選，用於視覺參考） */}
        <g id="tracks">
          <circle
            cx={viewSize / 2}
            cy={viewSize / 2}
            r={(viewSize / 2) * 0.30}
            fill="none"
            stroke="#ddd"
            strokeWidth={1}
            opacity={0.3}
          />
          <circle
            cx={viewSize / 2}
            cy={viewSize / 2}
            r={(viewSize / 2) * 0.55}
            fill="none"
            stroke="#ddd"
            strokeWidth={1}
            opacity={0.3}
          />
          <circle
            cx={viewSize / 2}
            cy={viewSize / 2}
            r={(viewSize / 2) * 0.85}
            fill="none"
            stroke="#ddd"
            strokeWidth={1}
            opacity={0.3}
          />
        </g>

        {/* 符碼群 */}
        <g id="glyphs" transform={`translate(${viewSize / 2}, ${viewSize / 2})`}>
          {compassData.symbols
            .filter((symbol) => {
              const hasId = !!symbol.id;
              const hasPosition = glyphPositions[symbol.id] !== undefined;
              return hasId && hasPosition;
            })
            .map((symbol) => {
              const position = glyphPositions[symbol.id];
              if (!position) {
                console.warn(`Symbol ${symbol.id} has no position`);
                return null;
              }
              
              return (
                <SymbolGlyph
                  key={symbol.id}
                  id={symbol.id}
                  labelKey={symbol.labelKey}
                  svgRef={symbol.svgRef}
                  position={position}
                  isSelected={selectedIds.includes(symbol.id)}
                  onClick={handleGlyphClick}
                  getLabel={t}
                />
              );
            })
            .filter(Boolean)}
        </g>

        {/* 中央太極區（選取的符碼顯示區域，未來可實作） */}
        <g id="center">
          {/* 未來可加入選取符碼的顯示 */}
        </g>
      </svg>

      {/* 確認按鈕 */}
      <div className="compass-actions">
        <button
          onClick={handleConfirm}
          disabled={!canConfirm}
          className="compass-confirm-button"
        >
          {t('btn_confirm') || '確認'}
        </button>
      </div>
    </div>
  );
}

