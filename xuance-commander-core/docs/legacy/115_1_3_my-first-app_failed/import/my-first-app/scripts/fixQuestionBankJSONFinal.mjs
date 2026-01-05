import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/core/ontology/questionBank.v1.json');
let content = fs.readFileSync(filePath, 'utf8');

// 使用更強大的方法：逐字符處理，識別字串邊界
let result = '';
let inString = false;
let stringStart = -1;
let currentString = '';
let escapeNext = false;

for (let i = 0; i < content.length; i++) {
  const char = content[i];
  const prevChar = i > 0 ? content[i - 1] : '';
  
  if (escapeNext) {
    currentString += char;
    escapeNext = false;
    continue;
  }
  
  if (char === '\\') {
    escapeNext = true;
    currentString += char;
    continue;
  }
  
  if (char === '"' && !escapeNext) {
    if (!inString) {
      // 開始字串
      inString = true;
      stringStart = i;
      currentString = '';
      result += char;
    } else {
      // 結束字串
      inString = false;
      // 處理字串內容：移除換行符
      const processed = processString(currentString);
      result += processed + char;
      currentString = '';
    }
  } else if (inString) {
    currentString += char;
  } else {
    result += char;
  }
}

function processString(str) {
  // 如果包含換行符，需要處理
  if (str.includes('\n')) {
    // 判斷是否包含中文
    const hasChinese = /[\u4e00-\u9fff]/.test(str);
    
    if (hasChinese) {
      // 中文文字：只移除換行符和空白，直接連接
      return str.replace(/\n+/g, '').replace(/\s+/g, ' ');
    } else {
      // 英文標識符：將換行符和空白替換為下劃線
      const parts = str.split(/\n+/);
      const cleaned = parts.map(p => p.trim()).filter(p => p.length > 0);
      return cleaned.join('_').replace(/\s+/g, '_');
    }
  }
  return str;
}

// 移除多餘的下劃線行（單獨的 _ 行）
result = result.replace(/^\s*_\s*$/gm, '');

// 移除多餘的逗號（連續的逗號）
result = result.replace(/,\s*,/g, ',');

// 移除多餘的空白行
result = result.replace(/\n\s*\n\s*\n/g, '\n\n');

// 寫回檔案
fs.writeFileSync(filePath, result, 'utf8');
console.log('Fixed JSON syntax errors');


















