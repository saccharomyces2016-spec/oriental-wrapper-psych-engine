/**
 * L2 Narrative Component
 * 
 * L2：物象/主敘事（The Manifestation）
 * 
 * 核心原則：
 * - 自動揭示（2 秒後）
 * - 所有設計保持不鎖定、不凍結、可回滾
 */

import React from 'react';

/**
 * L2 Narrative Props
 */
export interface L2NarrativeProps {
  titleKey: string;
  bodyKey: string;
  isRevealed: boolean;
  getText: (key: string) => string;
}

/**
 * L2 Narrative Component
 */
export function L2Narrative({
  titleKey,
  bodyKey,
  isRevealed,
  getText,
}: L2NarrativeProps) {
  const title = getText(titleKey);
  const body = getText(bodyKey);

  if (!isRevealed) {
    return null;
  }

  return (
    <div className="result-layer l2-layer">
      <h2 className="l2-title">{title}</h2>
      <div className={`l2-body ${isRevealed ? 'revealed' : ''}`}>{body}</div>
    </div>
  );
}

