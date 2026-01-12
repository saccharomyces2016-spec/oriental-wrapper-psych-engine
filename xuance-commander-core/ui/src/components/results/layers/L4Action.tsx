/**
 * L4 Action Component
 * 
 * L4：姿態/儀式（The Stance）
 * 
 * 核心原則：
 * - NORMAL：顯示動態建議
 * - HIGH：顯示安全模板（由 RiskOverride Interceptor 注入）
 * - 所有設計保持不鎖定、不凍結、可回滾
 */


/**
 * L4 Action Props
 */
export interface L4ActionProps {
  titleKey: string;
  dynamicBodyKey?: string;
  safetyTemplateId?: 'TEMPLATE_A' | 'TEMPLATE_B';
  safetyBodyKey?: string;
  isHighRisk: boolean;
  isRevealed: boolean;
  getText: (key: string) => string;
}

/**
 * L4 Action Component
 */
export function L4Action({
  titleKey,
  dynamicBodyKey,
  safetyBodyKey,
  isHighRisk,
  isRevealed,
  getText,
}: L4ActionProps) {
  const title = getText(titleKey);

  if (!isRevealed) {
    return null;
  }

  // HIGH Risk：顯示安全模板
  const bodyKey = isHighRisk && safetyBodyKey ? safetyBodyKey : dynamicBodyKey;
  const body = bodyKey ? getText(bodyKey) : '';

  return (
    <div className="result-layer l4-layer">
      <h3 className="l4-title">{title}</h3>
      <div className="l4-body">{body}</div>
      {isHighRisk && (
        <div className="l4-safety-note">
          {/* 安全提示（可選） */}
        </div>
      )}
    </div>
  );
}

