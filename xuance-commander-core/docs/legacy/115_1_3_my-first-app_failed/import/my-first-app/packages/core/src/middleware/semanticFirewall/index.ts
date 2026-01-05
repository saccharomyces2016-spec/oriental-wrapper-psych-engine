export type ValidationResult = {
  ok: boolean;
  violations: Array<{
    ruleId: string;
    severity: 'BLOCK';
    match?: string;
    message: string;
  }>;
};

type Rule = {
  ruleId: string;
  regexes: RegExp[];
  message: string;
};

const dailyRules: Rule[] = [
  {
    ruleId: 'DAILY_YOU_DIRECTIVE',
    regexes: [/(?:\bYou\b|\bUser\b)\s+(should|must|need\s+to|ought\s+to)\b/i],
    message: 'You/User directive detected.',
  },
  {
    ruleId: 'DAILY_ADVICE_BETTER_TIME_TO',
    regexes: [/\b(It\s+is|It\'s)\s+(better|best|time)\s+to\b/i],
    message: 'Advice phrasing detected (better/best/time to).',
  },
  {
    ruleId: 'DAILY_PREDICTIVE_WILL',
    regexes: [/(You|It)\s+will\s+(be|find|encounter|become)\b/i],
    message: 'Predictive promise detected.',
  },
  {
    ruleId: 'DAILY_FATE_GUARANTEE',
    regexes: [/\b(guarantee|promise|inevitable|destiny|fate)\b/i],
    message: 'Fate/guarantee language detected.',
  },
  {
    ruleId: 'DAILY_COACH_PSYCH',
    regexes: [
      /\b(growth|mindset|healing|self-care|valid|worthy)\b/i,
      /\b(don\'t\s+worry|be\s+happy|stay\s+strong)\b/i,
    ],
    message: 'Coaching/psychological language detected.',
  },
];

const diagnosticRules: Rule[] = [
  {
    ruleId: 'DIAG_PRESCRIPTIVE_YOU_DIRECTIVE',
    regexes: [/(?:\bYou\b|\bUser\b)\s+(should|must|need\s+to|ought\s+to)\b/i],
    message: 'Prescriptive directive not allowed in diagnostic mode.',
  },
  {
    ruleId: 'DIAG_PRESCRIPTIVE_RECOMMEND_SUGGEST',
    regexes: [/\bI\s+(recommend|suggest)\b/i],
    message: 'Recommendations not allowed in diagnostic mode.',
  },
];

const SENTENCE_CAP = 4;
const TOKEN_CAP = 150;

type Mode = 'daily' | 'diagnostic';

export function validateDailyOutput(text: string): ValidationResult {
  const violations: ValidationResult['violations'] = [];
  applyRules(text, dailyRules, violations);
  const sentenceCount = countSentences(text);
  if (sentenceCount > SENTENCE_CAP) {
    violations.push({
      ruleId: 'DAILY_SENTENCE_CAP',
      severity: 'BLOCK',
      match: String(sentenceCount),
      message: `Daily output exceeds sentence cap (${sentenceCount} > ${SENTENCE_CAP}).`,
    });
  }
  const tokenCount = countTokens(text);
  if (tokenCount > TOKEN_CAP) {
    violations.push({
      ruleId: 'DAILY_TOKEN_CAP',
      severity: 'BLOCK',
      match: String(tokenCount),
      message: `Daily output exceeds token cap (${tokenCount} > ${TOKEN_CAP}).`,
    });
  }
  return { ok: violations.length === 0, violations };
}

export function validateDiagnosticOutput(text: string): ValidationResult {
  const violations: ValidationResult['violations'] = [];
  applyRules(text, diagnosticRules, violations);
  return { ok: violations.length === 0, violations };
}

export function validateAnyOutput(text: string, mode: Mode): ValidationResult {
  return mode === 'daily' ? validateDailyOutput(text) : validateDiagnosticOutput(text);
}

function applyRules(text: string, rules: Rule[], out: ValidationResult['violations']) {
  const source = String(text ?? '');
  rules.forEach(rule => {
    for (const regex of rule.regexes) {
      const match = regex.exec(source);
      if (match) {
        out.push({
          ruleId: rule.ruleId,
          severity: 'BLOCK',
          match: match[0],
          message: rule.message,
        });
        break;
      }
    }
  });
}

function countSentences(text: string): number {
  return String(text)
    .split(/[.!?]+/)
    .map(part => part.trim())
    .filter(Boolean).length;
}

function countTokens(text: string): number {
  return String(text)
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}
