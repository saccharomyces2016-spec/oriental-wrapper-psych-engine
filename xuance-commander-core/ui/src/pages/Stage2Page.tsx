/**
 * Stage 2 Page
 * 
 * 萬象定物象 - Radial Compass 頁面
 * 
 * 核心原則：
 * - 使用 Radial Compass 組件
 * - 管理符碼選取狀態
 * - 選取完成後進入 Stage 3
 * - 所有設計保持不鎖定、不凍結、可回滾
 */

import React from 'react';
import type { FacetViewModel } from '../adapters/types';
import { RadialCompass } from '../components/compass';
import { useFlowState } from '../state';

/**
 * Stage 2 Page Props
 */
export interface Stage2PageProps {
  viewModel: FacetViewModel;
}

/**
 * Stage 2 Page Component
 */
export function Stage2Page({ viewModel }: Stage2PageProps) {
  const { state, setSelectedSymbolIds, setCurrentStage } = useFlowState();

  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedSymbolIds(selectedIds);
  };

  const handleConfirm = (selectedIds: string[]) => {
    setSelectedSymbolIds(selectedIds);
    // 進入 Stage 3
    setCurrentStage(3);
  };

  return (
    <div className="stage-2-page">
      <RadialCompass
        viewModel={viewModel}
        onSelectionChange={handleSelectionChange}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

