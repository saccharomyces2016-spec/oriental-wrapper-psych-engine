import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/core/ontology/questionBank.v1.json');
let content = fs.readFileSync(filePath, 'utf8');

// 修復 choice_meta 的結構問題
// 將分離的 behavior_facet 合併到對應的 choice 物件中

// 匹配 choice_meta 陣列的內容
content = content.replace(/"choice_meta":\s*\[\s*([^\]]+)\]/g, (match, arrayContent) => {
  // 分割成多個物件
  const objects = [];
  let currentObj = null;
  let inObject = false;
  let braceCount = 0;
  let currentText = '';
  
  for (let i = 0; i < arrayContent.length; i++) {
    const char = arrayContent[i];
    currentText += char;
    
    if (char === '{') {
      if (!inObject) {
        inObject = true;
        braceCount = 1;
        currentObj = '{';
      } else {
        braceCount++;
        currentObj += char;
      }
    } else if (char === '}') {
      braceCount--;
      if (inObject) {
        currentObj += char;
        if (braceCount === 0) {
          // 完成一個物件
          objects.push(currentObj);
          currentObj = null;
          inObject = false;
        }
      }
    } else if (inObject) {
      currentObj += char;
    }
  }
  
  // 處理物件，將分離的 behavior_facet 合併
  const fixedObjects = [];
  let behaviorFacets = [];
  
  for (let obj of objects) {
    if (obj.includes('"choice"') && obj.includes('"behavior_facet"')) {
      // 完整的物件
      fixedObjects.push(obj);
    } else if (obj.includes('"choice"')) {
      // 只有 choice 的物件，需要找到對應的 behavior_facet
      fixedObjects.push(obj);
    } else if (obj.includes('"behavior_facet"')) {
      // 只有 behavior_facet 的物件，需要合併到前一個物件
      behaviorFacets.push(obj);
    }
  }
  
  // 合併 behavior_facet 到對應的 choice 物件
  const result = [];
  let facetIndex = 0;
  
  for (let obj of fixedObjects) {
    if (obj.includes('"choice"') && !obj.includes('"behavior_facet"')) {
      // 需要添加 behavior_facet
      if (facetIndex < behaviorFacets.length) {
        const facet = behaviorFacets[facetIndex];
        const facetValue = facet.match(/"behavior_facet":\s*"([^"]+)"/)?.[1];
        if (facetValue) {
          obj = obj.replace(/\}\s*$/, `, "behavior_facet": "${facetValue}" }`);
        }
        facetIndex++;
      }
    }
    result.push(obj);
  }
  
  return `"choice_meta": [\n${result.join(',\n')}\n]`;
});

// 寫回檔案
fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed choice_meta structure');


















