import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/core/ontology/questionBank.v1.json');
let content = fs.readFileSync(filePath, 'utf8');

// 修復被換行分割的欄位名稱（如 "theme\nid" -> "theme_id"）
// 匹配模式：引號內的內容被換行分割，後面跟著冒號
let fixed = false;
do {
  fixed = false;
  // 修復欄位名稱
  const before = content;
  content = content.replace(/"([^"\n]*)\n\s*([^"\n]*)"\s*:/g, (match, p1, p2) => {
    fixed = true;
    const part1 = p1.trim();
    const part2 = p2.trim();
    // 移除多餘的下劃線
    const combined = (part1.replace(/_+$/, '') + '_' + part2.replace(/^_+/, '')).replace(/\s+/g, '');
    return `"${combined}":`;
  });
} while (fixed);

// 修復被換行分割的字串值（如 "chronic\n_\n_\ndepletion" -> "chronic_depletion"）
fixed = false;
do {
  fixed = false;
  const before = content;
  content = content.replace(/:\s*"([^"\n]*)\n\s*([^"\n]*)"\s*([,}\]]])/g, (match, p1, p2, p3) => {
    fixed = true;
    const part1 = p1.trim();
    const part2 = p2.trim();
    // 移除多餘的下劃線和空白
    const combined = (part1.replace(/_+$/, '') + '_' + part2.replace(/^_+/, '')).replace(/\s+/g, '');
    return `: "${combined}"${p3}`;
  });
} while (fixed);

// 修復 pattern_tags 陣列中被換行分割的值
fixed = false;
do {
  fixed = false;
  content = content.replace(/\[\s*"([^"\n]*)\n\s*([^"\n]*)"\s*\]/g, (match, p1, p2) => {
    fixed = true;
    const part1 = p1.trim();
    const part2 = p2.trim();
    const combined = (part1.replace(/_+$/, '') + '_' + part2.replace(/^_+/, '')).replace(/\s+/g, '');
    return `["${combined}"]`;
  });
} while (fixed);

// 修復 behavior_facet 中被換行分割的值
fixed = false;
do {
  fixed = false;
  content = content.replace(/"behavior\s*\n\s*facet"\s*:\s*"([^"\n]*)\n\s*([^"\n]*)"/g, (match, p1, p2) => {
    fixed = true;
    const part1 = p1.trim();
    const part2 = p2.trim();
    const combined = (part1.replace(/_+$/, '') + '_' + part2.replace(/^_+/, '')).replace(/\s+/g, '');
    return `"behavior_facet": "${combined}"`;
  });
} while (fixed);

// 移除多餘的下劃線行（單獨的 _ 行）
content = content.replace(/^\s*_\s*$/gm, '');

// 移除多餘的逗號（連續的逗號）
content = content.replace(/,\s*,/g, ',');

// 寫回檔案
fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed JSON syntax errors');
