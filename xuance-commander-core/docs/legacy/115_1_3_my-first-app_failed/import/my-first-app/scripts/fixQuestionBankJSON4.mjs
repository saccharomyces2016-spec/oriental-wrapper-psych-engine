import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/core/ontology/questionBank.v1.json');
let content = fs.readFileSync(filePath, 'utf8');

// 修復所有字串值中的換行符
// 對於包含中文的文字，只移除換行符，不添加下劃線
// 對於英文標識符，將換行符替換為下劃線

let iterations = 0;
const maxIterations = 100;

while (iterations < maxIterations) {
  iterations++;
  const before = content;
  
  // 修復字串值中的換行符
  // 匹配 : "..." 模式，處理跨行的字串值
  content = content.replace(/:\s*"([^"]*?)\n+([^"]*?)"\s*([,}\]]])/g, (match, p1, p2, p3) => {
    const part1 = p1.trim();
    const part2 = p2.trim();
    
    // 判斷是否包含中文（中文字符範圍）
    const hasChinese = /[\u4e00-\u9fff]/.test(part1 + part2);
    
    if (hasChinese) {
      // 中文文字：只移除換行符，直接連接
      const combined = part1 + part2;
      return `: "${combined}"${p3}`;
    } else {
      // 英文標識符：將換行符替換為下劃線
      let combined = (part1.replace(/_+$/, '') + '_' + part2.replace(/^_+/, '')).replace(/\s+/g, '');
      return `: "${combined}"${p3}`;
    }
  });
  
  // 修復欄位名稱中的換行符（欄位名稱通常是英文，所以替換為下劃線）
  content = content.replace(/"([^"\n]*?)\n+([^"\n]*?)"\s*:/g, (match, p1, p2) => {
    const part1 = p1.trim();
    const part2 = p2.trim();
    let combined = (part1.replace(/_+$/, '') + '_' + part2.replace(/^_+/, '')).replace(/\s+/g, '');
    return `"${combined}":`;
  });
  
  if (content === before) {
    break;
  }
}

// 移除多餘的下劃線行（單獨的 _ 行）
content = content.replace(/^\s*_\s*$/gm, '');

// 移除多餘的逗號（連續的逗號）
content = content.replace(/,\s*,/g, ',');

// 移除多餘的空白行
content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

// 寫回檔案
fs.writeFileSync(filePath, content, 'utf8');
console.log(`Fixed JSON syntax errors (${iterations} iterations)`);


















