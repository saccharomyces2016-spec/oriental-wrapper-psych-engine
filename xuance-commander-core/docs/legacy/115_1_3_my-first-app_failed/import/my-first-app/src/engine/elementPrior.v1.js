/**
 * elementPrior.v1.js
 * 五行 prior 計算：四柱干支 -> 五行分數/百分比
 *
 * Spec anchors:
 * - 地支藏干分數化（主/中/餘氣權重表） [oai_citation:8‡114.12.41 五行總集合.pdf](sediment://file_000000003ff871faa9489c796737aa47)
 * - 月令加權（示例：當令 x1.5；月支代表季節影響最大） [oai_citation:9‡114.12.41 五行總集合.pdf](sediment://file_000000003ff871faa9489c796737aa47)
 * - 天干加權：每個天干基礎分 10（坐支生剋可微調；此處先留可插拔 hook） [oai_citation:10‡114.12.41 五行總集合.pdf](sediment://file_000000003ff871faa9489c796737aa47)
 * - 歸一化為百分比 [oai_citation:11‡114.12.41 五行總集合.pdf](sediment://file_000000003ff871faa9489c796737aa47)
 * - 旺相休囚死季節強弱表 [oai_citation:12‡114.12.41 五行總集合.pdf](file-service://file-BxqqzgaYKnSVsyTpFDWZgX)
 */

/** @typedef {"Wood"|"Fire"|"Earth"|"Metal"|"Water"} ElementKey */

const ELEMENTS = /** @type {const} */ (["Wood", "Fire", "Earth", "Metal", "Water"]);

/** 十天干 -> 五行 */
const STEM_TO_ELEMENT = /** @type {Record<string, ElementKey>} */ ({
  "甲": "Wood", "乙": "Wood",
  "丙": "Fire", "丁": "Fire",
  "戊": "Earth","己": "Earth",
  "庚": "Metal","辛": "Metal",
  "壬": "Water","癸": "Water",
});

/**
 * 地支藏干權重表（主/中/餘氣）
 * 來源：附錄 B 權重表 [oai_citation:13‡114.12.41 五行總集合.pdf](sediment://file_000000003ff871faa9489c796737aa47)
 * ⚠️文件對「亥」在該段落僅列出壬/甲（未列第三項）；本實作會在計算前自動 normalize，避免總和≠1。
 */
const BRANCH_HIDDEN_STEMS = /** @type {Record<string, Array<{stem: string, weight: number}>>} */ ({
  "子": [{ stem: "癸", weight: 1.00 }],
  "丑": [{ stem: "己", weight: 0.60 }, { stem: "癸", weight: 0.30 }, { stem: "辛", weight: 0.10 }],
  "寅": [{ stem: "甲", weight: 0.60 }, { stem: "丙", weight: 0.30 }, { stem: "戊", weight: 0.10 }],
  "卯": [{ stem: "乙", weight: 1.00 }],
  "辰": [{ stem: "戊", weight: 0.60 }, { stem: "乙", weight: 0.30 }, { stem: "癸", weight: 0.10 }],
  "巳": [{ stem: "丙", weight: 0.60 }, { stem: "戊", weight: 0.30 }, { stem: "庚", weight: 0.10 }],
  "午": [{ stem: "丁", weight: 0.70 }, { stem: "己", weight: 0.30 }],
  "未": [{ stem: "己", weight: 0.60 }, { stem: "丁", weight: 0.30 }, { stem: "乙", weight: 0.10 }],
  "申": [{ stem: "庚", weight: 0.60 }, { stem: "壬", weight: 0.30 }, { stem: "戊", weight: 0.10 }],
  "酉": [{ stem: "辛", weight: 1.00 }],
  "戌": [{ stem: "戊", weight: 0.60 }, { stem: "辛", weight: 0.30 }, { stem: "丁", weight: 0.10 }],
  "亥": [{ stem: "壬", weight: 0.60 }, { stem: "甲", weight: 0.30 }],
});

/** 月支 -> 季節分類（依旺相休囚死表的月份段落） [oai_citation:14‡114.12.41 五行總集合.pdf](file-service://file-BxqqzgaYKnSVsyTpFDWZgX) */
function seasonOfMonthBranch(monthBranch) {
  if (monthBranch === "寅" || monthBranch === "卯") return "spring";
  if (monthBranch === "巳" || monthBranch === "午") return "summer";
  if (monthBranch === "申" || monthBranch === "酉") return "autumn";
  if (monthBranch === "亥" || monthBranch === "子") return "winter";
  if (monthBranch === "辰" || monthBranch === "戌" || monthBranch === "丑" || monthBranch === "未") return "late";
  return "unknown";
}

/**
 * 旺相休囚死：季節對五行的相對強弱（ranking）
 * 來源表 [oai_citation:15‡114.12.41 五行總集合.pdf](file-service://file-BxqqzgaYKnSVsyTpFDWZgX)
 */
const SEASON_RANKING = /** @type {Record<string, {wang: ElementKey, xiang: ElementKey, xiu: ElementKey, qiu: ElementKey, si: ElementKey}>} */ ({
  spring: { wang: "Wood",  xiang: "Fire",  xiu: "Water", qiu: "Metal", si: "Earth" },
  summer: { wang: "Fire",  xiang: "Earth", xiu: "Wood",  qiu: "Water", si: "Metal" },
  autumn: { wang: "Metal", xiang: "Water", xiu: "Earth", qiu: "Fire",  si: "Wood" },
  winter: { wang: "Water", xiang: "Wood",  xiu: "Metal", qiu: "Earth", si: "Fire" },
  late:   { wang: "Earth", xiang: "Metal", xiu: "Fire",  qiu: "Wood",  si: "Water" },
});

/**
 * 建議預設 multiplier（文件只明確示例當令 x1.5） [oai_citation:16‡114.12.41 五行總集合.pdf](sediment://file_000000003ff871faa9489c796737aa47)
 * 因此：wang 預設 1.5，其餘提供保守預設，並允許外部 config 覆寫為你們最終定案係數。
 */
const DEFAULT_MULTIPLIERS = { wang: 1.5, xiang: 1.15, xiu: 0.95, qiu: 0.85, si: 0.75 };

/** @typedef {{stem:string, branch:string}} Pillar */
/** @typedef {{year:Pillar, month:Pillar, day:Pillar, hour:Pillar}} FourPillars */

/**
 * @typedef {Object} ElementPriorConfig
 * @property {number} [stemBaseScore] 每個天干基礎分（spec: 10） [oai_citation:17‡114.12.41 五行總集合.pdf](sediment://file_000000003ff871faa9489c796737aa47)
 * @property {number} [branchBaseScore] 每個地支基礎分（用來承載藏干；預設 10，讓天干/地支同量級；可調）
 * @property {{wang:number, xiang:number, xiu:number, qiu:number, si:number}} [seasonMultipliers]
 * @property {(args:{stem:string, branch:string, stemElement:ElementKey, monthBranch:string})=>number} [stemBranchAdjustment]
 *    插拔：坐支生剋微調（spec 說可微調，但未給公式） [oai_citation:18‡114.12.41 五行總集合.pdf](sediment://file_000000003ff871faa9489c796737aa47)
 */

/**
 * normalize 權重：確保每個地支藏干權重總和為 1
 * @param {Array<{stem:string, weight:number}>} items
 */
function normalizeWeights(items) {
  const sum = items.reduce((a, x) => a + (Number.isFinite(x.weight) ? x.weight : 0), 0);
  if (!sum) return items.map(x => ({ ...x, weight: 0 }));
  return items.map(x => ({ ...x, weight: x.weight / sum }));
}

function emptyScore() {
  return /** @type {Record<ElementKey, number>} */ ({ Wood:0, Fire:0, Earth:0, Metal:0, Water:0 });
}

/**
 * 核心：計算五行 prior
 * @param {FourPillars} pillars
 * @param {ElementPriorConfig} [config]
 */
export function computeElementPrior(pillars, config = {}) {
  const stemBaseScore = Number.isFinite(config.stemBaseScore) ? config.stemBaseScore : 10;
  const branchBaseScore = Number.isFinite(config.branchBaseScore) ? config.branchBaseScore : 10;
  const seasonMultipliers = config.seasonMultipliers || DEFAULT_MULTIPLIERS;

  const monthBranch = pillars?.month?.branch;
  if (!monthBranch) throw new Error("computeElementPrior: pillars.month.branch is required");

  const season = seasonOfMonthBranch(monthBranch);
  const ranking = SEASON_RANKING[season] || null;

  /** 1) 天干計分（外顯） */
  const stemScores = emptyScore();
  const stemDebug = [];

  /** @param {Pillar} p @param {string} label */
  function addStem(p, label) {
    const stem = p?.stem;
    const branch = p?.branch;
    if (!stem || !branch) throw new Error(`computeElementPrior: missing stem/branch at ${label}`);

    const elem = STEM_TO_ELEMENT[stem];
    if (!elem) throw new Error(`computeElementPrior: unknown stem '${stem}' at ${label}`);

    let s = stemBaseScore;

    // 可插拔：坐支生剋微調（未定公式，先提供 hook）
    if (typeof config.stemBranchAdjustment === "function") {
      const delta = config.stemBranchAdjustment({ stem, branch, stemElement: elem, monthBranch });
      if (Number.isFinite(delta)) s += delta;
    }

    stemScores[elem] += s;
    stemDebug.push({ label, stem, elem, score: s, base: stemBaseScore });
  }

  addStem(pillars.year, "year");
  addStem(pillars.month, "month");
  addStem(pillars.day, "day");
  addStem(pillars.hour, "hour");

  /** 2) 地支藏干計分（隱性） */
  const branchScores = emptyScore();
  const branchDebug = [];

  /** @param {Pillar} p @param {string} label */
  function addBranch(p, label) {
    const branch = p?.branch;
    if (!branch) throw new Error(`computeElementPrior: missing branch at ${label}`);

    const hidden = BRANCH_HIDDEN_STEMS[branch];
    if (!hidden) throw new Error(`computeElementPrior: unknown branch '${branch}' at ${label}`);

    const norm = normalizeWeights(hidden);
    const parts = [];

    for (const it of norm) {
      const e = STEM_TO_ELEMENT[it.stem];
      if (!e) throw new Error(`computeElementPrior: unknown hidden stem '${it.stem}' in branch '${branch}'`);
      const v = branchBaseScore * it.weight;
      branchScores[e] += v;
      parts.push({ hiddenStem: it.stem, elem: e, weight: it.weight, score: v });
    }

    branchDebug.push({ label, branch, base: branchBaseScore, parts });
  }

  addBranch(pillars.year, "year");
  addBranch(pillars.month, "month");
  addBranch(pillars.day, "day");
  addBranch(pillars.hour, "hour");

  /** 3) 合併分數 */
  const totalScores = emptyScore();
  for (const k of ELEMENTS) totalScores[k] = stemScores[k] + branchScores[k];

  /** 4) 月令加權（按旺相休囚死 ranking 乘上倍率） [oai_citation:19‡114.12.41 五行總集合.pdf](sediment://file_000000003ff871faa9489c796737aa47) [oai_citation:20‡114.12.41 五行總集合.pdf](file-service://file-BxqqzgaYKnSVsyTpFDWZgX) */
  const appliedMultipliers = emptyScore();
  if (ranking) {
    appliedMultipliers[ranking.wang]  = seasonMultipliers.wang;
    appliedMultipliers[ranking.xiang] = seasonMultipliers.xiang;
    appliedMultipliers[ranking.xiu]   = seasonMultipliers.xiu;
    appliedMultipliers[ranking.qiu]   = seasonMultipliers.qiu;
    appliedMultipliers[ranking.si]    = seasonMultipliers.si;
  } else {
    for (const k of ELEMENTS) appliedMultipliers[k] = 1.0;
  }

  const weightedScores = emptyScore();
  for (const k of ELEMENTS) weightedScores[k] = totalScores[k] * (appliedMultipliers[k] || 1.0);

  /** 5) 歸一化為百分比 [oai_citation:21‡114.12.41 五行總集合.pdf](sediment://file_000000003ff871faa9489c796737aa47) */
  const sum = ELEMENTS.reduce((a, k) => a + weightedScores[k], 0);
  const distribution = /** @type {Record<ElementKey, number>} */ ({ Wood:0, Fire:0, Earth:0, Metal:0, Water:0 });
  if (sum > 0) {
    for (const k of ELEMENTS) distribution[k] = weightedScores[k] / sum;
  }

  /** dominant / weakest */
  const sorted = [...ELEMENTS].sort((a,b) => weightedScores[b] - weightedScores[a]);
  const dominant = sorted[0];
  const weakest = sorted[sorted.length - 1];

  return {
    element_scores: weightedScores,
    element_distribution: distribution,
    dominant_element: dominant,
    weakest_element: weakest,
    debug: {
      monthBranch,
      season,
      seasonRanking: ranking,
      seasonMultipliersUsed: seasonMultipliers,
      appliedMultipliers,
      stemBaseScore,
      branchBaseScore,
      stemScores,
      branchScores,
      stemDebug,
      branchDebug,
      totalBeforeSeasonality: totalScores,
    },
  };
}

/**
 * 允許輸入更寬鬆的四柱格式（string or object），方便接你們現有資料流。
 * - 若你們已有固定 shape，可刪這段；留著也不影響。
 */
export function normalizeFourPillars(input) {
  // accepted:
  // 1) {year:{stem,branch}, month:{stem,branch}, day:{stem,branch}, hour:{stem,branch}}
  // 2) {year:"甲子", month:"丙寅", day:"丁卯", hour:"戊辰"} （兩字：干支）
  const out = /** @type {any} */ ({});
  for (const key of ["year","month","day","hour"]) {
    const v = input?.[key];
    if (!v) throw new Error(`normalizeFourPillars: missing ${key}`);
    if (typeof v === "string") {
      if (v.length < 2) throw new Error(`normalizeFourPillars: invalid ${key} '${v}'`);
      out[key] = { stem: v[0], branch: v[1] };
    } else {
      if (!v.stem || !v.branch) throw new Error(`normalizeFourPillars: invalid ${key} object`);
      out[key] = { stem: v.stem, branch: v.branch };
    }
  }
  return /** @type {FourPillars} */ (out);
}
