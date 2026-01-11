/**
 * Facet Adapter
 * 
 * 將 Raw UMIP JSON 轉換為 FacetViewModel
 * 
 * 核心職責：
 * 1. Normalization（補值）：缺欄位時補預設值
 * 2. Masking（遮罩）：移除敏感欄位（score, weights, severity, band 等）
 * 3. Flatten（扁平化）：將巢狀 JSON 轉成 UI 易讀結構
 * 
 * 核心原則：
 * - UI 不得直接讀取 Raw JSON
 * - ViewModel 必須是「可渲染、可驗收、可降級」的乾淨資料
 * - 所有設計保持不鎖定、不凍結、可回滾
 */

import type { FacetViewModel, RawUmipJson, RiskLevel, CompassTrack, QuestionType } from './types';
import {
  safeString,
  safeNumber,
  safeBoolean,
  safeObject,
  safeArray,
  safeColorCode,
  NEUTRAL_THEME,
} from './failsoft';

/**
 * 將 Raw UMIP JSON 轉換為 FacetViewModel
 * 
 * @param raw - Raw UMIP JSON 資料
 * @returns FacetViewModel（UI 可用資料）
 */
export function facetAdapter(raw: unknown): FacetViewModel {
  const data = (raw as RawUmipJson) || {};

  // 1. 提取 meta 資訊
  const facetId = safeString(data.facet_id, 'unknown');
  const riskLevel: RiskLevel = data.risk_level === 'HIGH' ? 'HIGH' : 'NORMAL';

  // 2. 處理 i18n 字典
  const i18nDict = safeObject(data.i18n, {});

  // 3. 處理 theme_config（含 fail-soft）
  const themeConfig = data.theme_config;
  const themeResolved = adaptTheme(themeConfig);

  // 4. 處理 stage2_compass
  const compassStage = data.stage2_compass;
  const compass = adaptCompass(compassStage);

  // 5. 處理 stage3_projection
  const projectionStage = data.stage3_projection;
  const projection = adaptProjection(projectionStage);

  // 6. 處理 stage4_results
  const resultsStage = data.stage4_results;
  const results = adaptResults(resultsStage);

  return {
    meta: {
      facetId,
      riskLevel,
    },
    i18nDict,
    themeResolved,
    stages: {
      compass,
      projection,
      results,
    },
  };
}

/**
 * 適配 theme_config
 */
function adaptTheme(themeConfig: RawUmipJson['theme_config']): FacetViewModel['themeResolved'] {
  if (!themeConfig) {
    // 使用 Neutral Theme 作為 fallback
    return {
      cssVars: {
        '--primary-color': NEUTRAL_THEME.primary_color,
        '--font-family': NEUTRAL_THEME.font_family,
      },
      assetUrls: {},
      isNeutralFallback: true,
      metaphorId: NEUTRAL_THEME.metaphor_id,
    };
  }

  const primaryColor = safeColorCode(
    themeConfig.primary_color,
    NEUTRAL_THEME.primary_color
  );
  const fontFamily = safeString(themeConfig.font_family, NEUTRAL_THEME.font_family);

  const cssVars: Record<string, string> = {
    '--primary-color': primaryColor,
    '--font-family': fontFamily,
  };

  // 處理 typography
  const typography = themeConfig.typography;
  if (typography) {
    if (typography.heading_font) {
      cssVars['--heading-font'] = typography.heading_font;
    }
    if (typography.body_font) {
      cssVars['--body-font'] = typography.body_font;
    }
    if (typography.font_size_scale !== undefined) {
      cssVars['--font-size-scale'] = String(typography.font_size_scale);
    }
  }

  // 處理 assets
  const assets = themeConfig.assets;
  const assetUrls: FacetViewModel['themeResolved']['assetUrls'] = {};
  if (assets) {
    if (assets.background_url) {
      assetUrls.backgroundUrl = assets.background_url;
    }
    if (assets.particle_texture) {
      assetUrls.particleTextureUrl = assets.particle_texture;
    }
    if (assets.border_pattern) {
      assetUrls.borderPatternUrl = assets.border_pattern;
    }
  }

  return {
    cssVars,
    assetUrls,
    isNeutralFallback: false,
    metaphorId: themeConfig.metaphor_id,
  };
}

/**
 * 適配 stage2_compass
 */
function adaptCompass(
  compassStage: RawUmipJson['stage2_compass']
): FacetViewModel['stages']['compass'] {
  const symbols = safeArray(compassStage?.symbols, []).map((symbol) => ({
    id: safeString(symbol.symbol_id || symbol.id, ''),
    labelKey: safeString(symbol.label_key, ''),
    svgRef: safeString(symbol.svg_ref, ''),
    track: (safeString(symbol.track, 'MIDDLE').toUpperCase() as CompassTrack) || 'MIDDLE',
    initialAngle: symbol.initial_angle !== undefined ? safeNumber(symbol.initial_angle) : undefined,
  }));

  const rules = compassStage?.rules;
  const selectMax = safeNumber(rules?.select_max || rules?.max_selections, 3);
  const selectMin = safeNumber(rules?.select_min || rules?.min_selections, 2);

  return {
    symbols,
    rules: {
      selectMax: Math.max(1, Math.min(5, selectMax)),
      selectMin: Math.max(1, Math.min(3, selectMin)),
    },
  };
}

/**
 * 適配 stage3_projection
 */
function adaptProjection(
  projectionStage: RawUmipJson['stage3_projection']
): FacetViewModel['stages']['projection'] {
  const questions = safeArray(projectionStage?.questions, []).map((question) => ({
    id: safeString(question.question_id || question.id, ''),
    titleKey: safeString(question.title_key, ''),
    promptKey: safeString(question.prompt_key || '', ''),
    type: (safeString(question.question_type, 'SINGLE').toUpperCase() as QuestionType) || 'SINGLE',
    options: safeArray(question.options, []).map((option) => ({
      id: safeString(option.option_id || option.id, ''),
      labelKey: safeString(option.label_key, ''),
      imageRef: option.image_ref ? safeString(option.image_ref) : undefined,
      sceneKey: option.scene_key ? safeString(option.scene_key) : undefined,
    })),
  }));

  return {
    questions,
  };
}

/**
 * 適配 stage4_results
 */
function adaptResults(
  resultsStage: RawUmipJson['stage4_results']
): FacetViewModel['stages']['results'] {
  const layers = resultsStage?.layers;

  const l1 = layers?.l1;
  const l1Adapted = {
    titleKey: safeString(l1?.title_key, 'l1_title'),
    bodyKey: safeString(l1?.body_key, 'l1_body'),
    variants: safeArray(l1?.variants, []).map((variant) => ({
      titleKey: safeString(variant.title_key, ''),
      bodyKey: safeString(variant.body_key, ''),
    })),
  };

  const l2 = layers?.l2;
  const l2Adapted = {
    titleKey: safeString(l2?.title_key, 'l2_title'),
    bodyKey: safeString(l2?.body_key, 'l2_body'),
    variants: safeArray(l2?.variants, []).map((variant) => ({
      titleKey: safeString(variant.title_key, ''),
      bodyKey: safeString(variant.body_key, ''),
    })),
  };

  const l3 = layers?.l3;
  const l3Adapted = {
    titleKey: safeString(l3?.title_key, 'l3_title'),
    bodyKey: safeString(l3?.body_key, 'l3_body'),
    variants: safeArray(l3?.variants, []).map((variant) => ({
      titleKey: safeString(variant.title_key, ''),
      bodyKey: safeString(variant.body_key, ''),
    })),
  };

  const l4 = layers?.l4;
  const l4Adapted = {
    titleKey: safeString(l4?.title_key, 'l4_title'),
    dynamicBodyKey: l4?.dynamic_body_key ? safeString(l4.dynamic_body_key) : undefined,
    // 注意：safetyTemplateId 和 safetyBodyKey 由 RiskOverride Interceptor 注入，不在這裡處理
  };

  return {
    layers: {
      l1: l1Adapted,
      l2: l2Adapted,
      l3: l3Adapted,
      l4: l4Adapted,
    },
    reveal: {
      orderLocked: ['L1', 'L2', 'L3', 'L4'],
      l2AutoAfterMs: 2000,
      l3RequiresUserAction: true,
    },
  };
}

