/**
 * L3 Reveal Component
 * 
 * L3：干擾/盲點（The Fog）
 * 
 * 核心原則：
 * - 主動揭示（需使用者點擊/長按/展開）
 * - 所有設計保持不鎖定、不凍結、可回滾
 */

import React, { useState } from 'react';

/**
 * L3 Reveal Props
 */
export interface L3RevealProps {
  titleKey: string;
  bodyKey: string;
  isRevealed: boolean;
  onReveal: () => void;
  getText: (key: string) => string;
}

/**
 * L3 Reveal Component
 */
export function L3Reveal({
  titleKey,
  bodyKey,
  isRevealed,
  onReveal,
  getText,
}: L3RevealProps) {
  const title = getText(titleKey);
  const body = getText(bodyKey);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    if (!isRevealed) {
      onReveal();
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="result-layer l3-layer">
      <div className="l3-header" onClick={handleToggle} style={{ cursor: 'pointer' }}>
        <h3 className="l3-title">{title}</h3>
        <span className="l3-toggle">{isExpanded ? '▲' : '▼'}</span>
      </div>
      {isRevealed && isExpanded && (
        <div className="l3-body">{body}</div>
      )}
    </div>
  );
}

