const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.css')) {
      results.push(file);
    }
  });
  return results;
}

const files = [...walk('./components'), ...walk('./app')];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  if (file.endsWith('.tsx')) {
    content = content.replace(/bg-white\/(?:40|50|60|70)\s+backdrop-blur-(?:sm|md|lg|xl|2xl)/g, 'bg-white/95');
    content = content.replace(/bg-white\/90\s+backdrop-blur-(?:sm|md|lg|xl|2xl)/g, 'bg-white/95');
    content = content.replace(/backdrop-blur-(?:sm|md|lg|xl|2xl)/g, '');
    content = content.replace(/bg-black\/(?:75|80)\s*/g, 'bg-black/95 ');
  } else if (file.endsWith('.css')) {
    content = content.replace(/backdrop-filter:\s*blur\([^)]+\);/g, '');
    content = content.replace(/-webkit-backdrop-filter:\s*blur\([^)]+\);/g, '');
    content = content.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.[4567]\d*\);/g, 'background: rgba(255, 255, 255, 0.95);');
    content = content.replace(/background:\s*rgba\(61,\s*36,\s*16,\s*0\.85\);/g, 'background: rgba(61, 36, 16, 0.98);');
  }

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
