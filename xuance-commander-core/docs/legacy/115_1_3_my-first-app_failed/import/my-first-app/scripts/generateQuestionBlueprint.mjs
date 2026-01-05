#!/usr/bin/env node
// Generate question blueprint for 10 mother themes

const themes = [
  {
    id: 'chronic_depletion',
    coreTag: 'overextension',
    availableTags: ['overextension', 'recovery', 'body_signals', 'self-prioritization', 'pace', 'routine', 'planning'],
    description: 'A pattern of prolonged physical, mental, or emotional exhaustion caused by overextension, pressure, or lack of recovery.'
  },
  {
    id: 'loss_of_agency',
    coreTag: 'voice',
    availableTags: ['voice', 'decision-making', 'negotiation', 'adaptation', 'initiative', 'change_readiness', 'assertion', 'goal_setting'],
    description: 'Feeling unable to influence one\'s life direction, decisions, or outcomes despite effort.'
  },
  {
    id: 'hyper_responsibility',
    coreTag: 'role_drift',
    availableTags: ['role_drift', 'control', 'shared_ownership', 'self-sacrifice', 'support_network', 'limits', 'people_pleasing', 'capacity'],
    description: 'Taking excessive responsibility for others, systems, or outcomes at the cost of self-needs.'
  },
  {
    id: 'fear_based_stability',
    coreTag: 'risk_aversion',
    availableTags: ['risk_aversion', 'status_quo', 'experimentation', 'safety_behaviors', 'learning', 'fear_of_change', 'obligation', 'evidence_seeking'],
    description: 'Avoiding change or risk primarily due to fear of loss, failure, or collapse.'
  },
  {
    id: 'identity_diffusion',
    coreTag: 'external_validation',
    availableTags: ['external_validation', 'values_clarity', 'direction', 'alignment', 'autonomy', 'consistency', 'self_concept', 'expression', 'clarity'],
    description: 'Unclear sense of self, values, or direction, often shaped by external expectations.'
  },
  {
    id: 'suppressed_needs',
    coreTag: 'self-care',
    availableTags: ['self-care', 'need_expression', 'conflict_avoidance', 'self_assessment', 'boundaries', 'decision_habit'],
    description: 'Habitually minimizing or ignoring personal needs to maintain harmony or function.'
  },
  {
    id: 'chronic_alertness',
    coreTag: 'baseline_tension',
    availableTags: ['baseline_tension', 'somatic_state', 'safety_signal', 'hypervigilance', 'environment_scan', 'social_entry', 'flexibility', 'uncertainty_tolerance', 'control_needs'],
    description: 'Persistent tension or vigilance even when no immediate threat is present.'
  },
  {
    id: 'unprocessed_loss',
    coreTag: null, // No 1.0 tag, highest is 0.8
    availableTags: ['avoidance', 'emotional_regulation', 'triggers', 'generalization', 'risk_avoidance', 'decision_filter', 'processing', 'ritual', 'emotional_expression'],
    description: 'Past losses or endings that continue to affect present behavior or emotions.'
  },
  {
    id: 'meaning_vacuum',
    coreTag: 'purpose_alignment',
    availableTags: ['purpose_alignment', 'task_quality', 'fulfillment', 'prioritization', 'external_drivers', 'values_alignment', 'motivation', 'narrative'],
    description: 'A sense that life actions lack purpose or internal justification.'
  },
  {
    id: 'self_erosion',
    coreTag: 'values_tradeoff',
    availableTags: ['values_tradeoff', 'compromise_habit', 'integrity', 'self_trust', 'confidence', 'external_influence', 'authenticity', 'social_fitting', 'energy'],
    description: 'Gradual loss of vitality, confidence, or identity through repeated compromise.'
  }
];

const facets = ['follow_momentum', 'avoid_conflict', 'observe_and_wait', 'self_prioritize', 'adjust_strategy', 'seek_support', 'push_through', 'withdraw_and_protect'];

// Generate 7 blueprints per theme
function generateBlueprints() {
  const blueprint = {
    meta: {
      purpose: 'blueprint only, not final wording',
      generatedAt: new Date().toISOString(),
      totalThemes: 10,
      questionsPerTheme: 7,
      totalQuestions: 70
    },
    themes: {}
  };

  themes.forEach(theme => {
    blueprint.themes[theme.id] = [];
    
    // Generate 7 different question intents
    const intents = generateIntents(theme);
    
    intents.forEach((intent, idx) => {
      const question = {
        theme_id: theme.id,
        intent_label: intent.label,
        question_text: intent.question,
        choices: intent.choices,
        choice_meta: intent.choices.map((choice, i) => ({
          choice: choice,
          behavior_facet: intent.facets[i]
        })),
        pattern_tags: intent.tags,
        confidence_weight: intent.isCore ? 1.2 : 1
      };
      
      blueprint.themes[theme.id].push(question);
    });
  });

  return blueprint;
}

function generateIntents(theme) {
  // This is a placeholder - will be manually crafted
  // For now, return structure
  return Array(7).fill(null).map((_, idx) => ({
    label: `Intent ${idx + 1}`,
    question: `[Rough question text for ${theme.id} - intent ${idx + 1}]`,
    choices: ['[Choice 1]', '[Choice 2]', '[Choice 3]', '[Choice 4]'],
    facets: facets.slice(0, 4),
    tags: [theme.coreTag || theme.availableTags[0], ...theme.availableTags.slice(1, 3)],
    isCore: idx === 0
  }));
}

console.log(JSON.stringify(generateBlueprints(), null, 2));



















