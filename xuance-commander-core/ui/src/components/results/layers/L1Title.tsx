/**
 * L1 Title Component
 * 
 * L1：天象/定調（The Atmosphere）
 * 
 * 核心原則：
 * - 立即顯示
 * - 所有設計保持不鎖定、不凍結、可回滾
 */

import React from 'react';

/**
 * L1 Title Props
 */
export interface L1TitleProps {
  titleKey: string;
  getText: (key: string) => string;
}

/**
 * L1 Title Component
 */
export function L1Title({ titleKey, getText }: L1TitleProps) {
  const title = getText(titleKey);

  return (
    <div className="result-layer l1-layer">
      <h1 className="l1-title">{title}</h1>
    </div>
  );
}

