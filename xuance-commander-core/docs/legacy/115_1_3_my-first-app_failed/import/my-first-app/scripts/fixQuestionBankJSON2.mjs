import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/core/ontology/questionBank.v1.json');
let content = fs.readFileSync(filePath, 'utf8');

// 修復字串值中的換行符（將換行符移除，保留下劃線）
// 匹配模式：引號內的內容包含換行符
let fixed = false;
do {
  fixed = false;
  const before = content;
  // 修復字串值中的換行符
  content = content.replace(/:\s*"([^"]*)\n+([^"]*)"\s*([,}\]]])/g, (match, p1, p2, p3) => {
    fixed = true;
    const part1 = p1.trim();
    const part2 = p2.trim();
    // 如果 part1 以 _ 結尾或 part2 以 _ 開頭，合併時只保留一個
    let combined = part1.replace(/_+$/, '') + '_' + part2.replace(/^_+/, '');
    // 移除所有空白
    combined = combined.replace(/\s+/g, '');
    return `: "${combined}"${p3}`;
  });
} while (fixed);

// 修復欄位名稱中的換行符
fixed = false;
do {
  fixed = false;
  content = content.replace(/"([^"\n]*)\n+([^"\n]*)"\s*:/g, (match, p1, p2) => {
    fixed = true;
    const part1 = p1.trim();
    const part2 = p2.trim();
    let combined = part1.replace(/_+$/, '') + '_' + part2.replace(/^_+/, '');
    combined = combined.replace(/\s+/g, '');
    return `"${combined}":`;
  });
} while (fixed);

// 移除多餘的下劃線行（單獨的 _ 行）
content = content.replace(/^\s*_\s*$/gm, '');

// 移除多餘的逗號（連續的逗號）
content = content.replace(/,\s*,/g, ',');

// 寫回檔案
fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed JSON syntax errors');


















