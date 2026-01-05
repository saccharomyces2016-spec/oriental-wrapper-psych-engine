import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/core/ontology/questionBank.v1.json');
let content = fs.readFileSync(filePath, 'utf8');

// 修復所有字串值中的換行符（包括多行）
// 使用更強大的正則表達式來匹配跨行的字串值
let iterations = 0;
let maxIterations = 100; // 防止無限循環

while (iterations < maxIterations) {
  iterations++;
  const before = content;
  
  // 修復字串值中的換行符（匹配 : "..." 模式）
  content = content.replace(/:\s*"([^"]*?)\n+([^"]*?)"\s*([,}\]]])/g, (match, p1, p2, p3) => {
    const part1 = p1.trim();
    const part2 = p2.trim();
    // 移除所有空白，保留下劃線
    let combined = (part1.replace(/_+$/, '') + '_' + part2.replace(/^_+/, '')).replace(/\s+/g, '');
    return `: "${combined}"${p3}`;
  });
  
  // 修復欄位名稱中的換行符
  content = content.replace(/"([^"\n]*?)\n+([^"\n]*?)"\s*:/g, (match, p1, p2) => {
    const part1 = p1.trim();
    const part2 = p2.trim();
    let combined = (part1.replace(/_+$/, '') + '_' + part2.replace(/^_+/, '')).replace(/\s+/g, '');
    return `"${combined}":`;
  });
  
  // 如果沒有變化，退出循環
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


















