// src/core/WuXingEngine.js

// 五行關係表 (generate: 生, overcome: 剋)
const relations = {
  wood: { generate: 'fire', overcome: 'earth', name: '木' },
  fire: { generate: 'earth', overcome: 'metal', name: '火' },
  earth: { generate: 'metal', overcome: 'water', name: '土' },
  metal: { generate: 'water', overcome: 'wood', name: '金' },
  water: { generate: 'wood', overcome: 'fire', name: '水' }
};

// 1. 計算先天命盤 (Input)
export function calculateDestiny(form) {
  const yearEnd = parseInt(form.year.toString().slice(-1));
  const elements = ['metal', 'metal', 'water', 'water', 'wood', 'wood', 'fire', 'fire', 'earth', 'earth'];
  const mainElement = elements[yearEnd] || 'water';

  return {
    ...form,
    element: mainElement,
    // 這裡的分數僅作雷達圖基底
    rawScores: { 
      metal: 10 + (mainElement === 'metal' ? 10 : 0), 
      wood: 10 + (mainElement === 'wood' ? 10 : 0), 
      water: 10 + (mainElement === 'water' ? 10 : 0), 
      fire: 10 + (mainElement === 'fire' ? 10 : 0), 
      earth: 10 + (mainElement === 'earth' ? 10 : 0) 
    }
  };
}

// 2. 深度分析引擎 (Cross-Analysis)
export function refineDestiny(birthData, resonanceData) {
  // A. 統計後天選擇 (符咒)
  const base = birthData.rawScores;
  const added = { metal:0, wood:0, water:0, fire:0, earth:0 };
  
  // 統計哪些符咒被選中 (假設 resonance 是一個包含完整符咒物件的陣列)
  const selectedTalismans = resonanceData.resonance || [];
  
  selectedTalismans.forEach(t => {
    if (added[t.element] !== undefined) added[t.element] += 10;
  });

  // B. 找出「主要壓力源」(選最多的屬性)
  let maxAddedScore = -1;
  let stressElement = 'water'; 
  for (const [elm, score] of Object.entries(added)) {
    if (score > maxAddedScore) {
      maxAddedScore = score;
      stressElement = elm;
    }
  }

  // C. 核心診斷：生剋邏輯判讀
  const innate = birthData.element; // 先天本命
  let relationType = 'same';
  let template = analysisTemplates.same;

  if (relations[innate].generate === stressElement) {
    relationType = 'generative'; // 本命 生 壓力 (洩氣/過度付出)
    template = analysisTemplates.generative;
  } else if (relations[stressElement].generate === innate) {
    relationType = 'generative'; // 壓力 生 本命 (過載/依賴)
    template = analysisTemplates.generative;
  } else if (relations[innate].overcome === stressElement) {
    relationType = 'destructive'; // 本命 剋 壓力 (戰鬥/消耗)
    template = analysisTemplates.destructive;
  } else if (relations[stressElement].overcome === innate) {
    relationType = 'destructive'; // 壓力 剋 本命 (壓抑/受傷)
    template = analysisTemplates.destructive;
  }

  // D. 組裝有建設性的建議 (Constructive Advice)
  const advice = generateAdvice(innate, stressElement, relationType, selectedTalismans);

  // E. 最終分數整合 (用於雷達圖)
  const finalScores = {
    metal: base.metal + added.metal,
    wood: base.wood + added.wood,
    water: base.water + added.water,
    fire: base.fire + added.fire,
    earth: base.earth + added.earth
  };

  return {
    ...birthData,
    scores: finalScores,
    rawScores: base,
    element: innate,
    info: {
      label: `天機 · ${relations[innate].name}${relations[stressElement].name}之局`,
      title: template.title,
      personality: `您的本質為【${relations[innate].name}】，象徵著${getArchetype(innate)}。但您目前的困境多集中於【${relations[stressElement].name}】屬性，這顯示您正處於一種「${template.title}」的心理狀態。`,
      strength: "潛在優勢：在這種張力下，您正在發展出極強的適應力。", // 可再細化
      weakness: `核心痛點：${selectedTalismans.map(t => t.label).join('、')}。`,
      advice: advice
    }
  };
}

// 輔助：原型描述
function getArchetype(elm) {
  const map = { metal: '秩序與邊界', wood: '成長與仁慈', water: '流動與智慧', fire: '熱情與變革', earth: '穩重與承載' };
  return map[elm];
}

// 輔助：生成具體建議
function generateAdvice(innate, stress, type, talismans) {
  // 這裡可以寫得非常細，根據具體選了哪個符咒 (psychTag) 來給建議
  // 暫時給出通用但有深度的建議
  let mainAdvice = "";
  if (type === 'destructive') {
    mainAdvice = "面對內在衝突，建議採用「抽離法」。試著將問題客觀化，不要將失敗歸因於自我價值。";
  } else if (type === 'generative') {
    mainAdvice = "您需要「邊界重塑」。練習對不合理的要求說不，並意識到您的能量是有限的資源。";
  } else {
    mainAdvice = "您需要「引入異質元素」。若火太旺，請尋求水的冷靜（如冥想）；若土太重，請尋求木的突破（如學習新知）。";
  }

  return {
    wear: `建議穿搭：${getLuckyColor(innate)}色系，以強化本命能量，抵禦外界消耗。`,
    eat: `飲食調理：${getLuckyFood(innate)}，由內而外穩固核心。`,
    luckyColor: mainAdvice // 這裡借用欄位顯示心理建議
  };
}

function getLuckyColor(elm) {
  const map = { metal: '白/金', wood: '綠/青', water: '黑/藍', fire: '紅/紫', earth: '黃/褐' };
  return map[elm];
}
function getLuckyFood(elm) {
  const map = { metal: '辛辣或白色食物', wood: '酸味或綠色蔬菜', water: '海鮮或黑色食物', fire: '苦味或紅色蔬果', earth: '甜味或根莖類' };
  return map[elm];
}