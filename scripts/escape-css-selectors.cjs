const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'src', 'index.css');
let css = fs.readFileSync(cssPath, 'utf8');

// List of replacement mapping for unescaped selectors to escaped CSS selectors
const replacements = [
  // Widths
  { from: '.w-[280px]', to: '.w-\\[280px\\]' },
  { from: '.w-[320px]', to: '.w-\\[320px\\]' },
  { from: '.md:w-[400px]', to: '.md\\:w-\\\[400px\\\]' },
  { from: '.md:w-[300px]', to: '.md\\:w-\\\[300px\\\]' },
  { from: '.md:w-[200px]', to: '.md\\:w-\\\[200px\\\]' },
  
  // Heights
  { from: '.h-[76px]', to: '.h-\\\[76px\\\]' },
  { from: '.h-[72vh]', to: '.h-\\\[72vh\\\]' },
  { from: '.h-[calc(100vh-140px)]', to: '.h-\\\[calc\\(100vh-140px\\)\\\]' },
  
  // Max widths
  { from: '.max-w-[420px]', to: '.max-w-\\[420px\\]' },
  { from: '.max-w-[700px]', to: '.max-w-\\[700px\\]' },
  { from: '.max-w-[650px]', to: '.max-w-\\[650px\\]' },
  { from: '.max-w-[580px]', to: '.max-w-\\[580px\\]' },
  
  // Text sizes
  { from: '.text-[9px]', to: '.text-\\[9px\\]' },
  { from: '.text-[10px]', to: '.text-\\[10px\\]' },
  { from: '.text-[11px]', to: '.text-\\[11px\\]' },
  { from: '.text-[11.5px]', to: '.text-\\[11\\.5px\\]' },
  { from: '.text-[12px]', to: '.text-\\[12px\\]' },
  { from: '.text-[12.5px]', to: '.text-\\[12\\.5px\\]' },
  { from: '.text-[13px]', to: '.text-\\[13px\\]' },
  { from: '.text-[13.5px]', to: '.text-\\[13\\.5px\\]' },
  { from: '.text-[14px]', to: '.text-\\[14px\\]' },
  { from: '.text-[14.5px]', to: '.text-\\[14\\.5px\\]' },
  { from: '.text-[15px]', to: '.text-\\[15px\\]' },
  { from: '.text-[16px]', to: '.text-\\[16px\\]' },
  { from: '.text-[18px]', to: '.text-\\[18px\\]' },
  
  // Backgrounds with opacity
  { from: '.bg-white/10', to: '.bg-white\\/10' },
  { from: '.bg-white/15', to: '.bg-white\\/15' },
  { from: '.bg-white/20', to: '.bg-white\\/20' },
  { from: '.bg-white/40', to: '.bg-white\\/40' },
  { from: '.bg-white/50', to: '.bg-white\\/50' },
  { from: '.bg-white/60', to: '.bg-white\\/60' },
  { from: '.bg-white/70', to: '.bg-white\\/70' },
  { from: '.bg-white/80', to: '.bg-white\\/80' },
  
  { from: '.bg-slate-50/70', to: '.bg-slate-50\\/70' },
  { from: '.bg-slate-50/50', to: '.bg-slate-50\\/50' },
  { from: '.bg-slate-50/20', to: '.bg-slate-50\\/20' },
  { from: '.bg-slate-100/70', to: '.bg-slate-100\\/70' },
  { from: '.bg-slate-100/50', to: '.bg-slate-100\\/50' },
  { from: '.bg-slate-900/40', to: '.bg-slate-900\\/40' },
  { from: '.bg-slate-950/90', to: '.bg-slate-950\\/90' },
  { from: '.bg-slate-950/40', to: '.bg-slate-950\\/40' },
  
  { from: '.bg-blue-50/70', to: '.bg-blue-50\\/70' },
  { from: '.bg-blue-50/50', to: '.bg-blue-50\\/50' },
  { from: '.bg-blue-50/40', to: '.bg-blue-50\\/40' },
  { from: '.bg-blue-500/5', to: '.bg-blue-500\\/5' },
  { from: '.bg-blue-500/10', to: '.bg-blue-500\\/10' },
  { from: '.bg-blue-600/90', to: '.bg-blue-600\\/90' },
  
  { from: '.bg-violet-50/70', to: '.bg-violet-50\\/70' },
  { from: '.bg-violet-50/20', to: '.bg-violet-50\\/20' },
  { from: '.bg-emerald-50/40', to: '.bg-emerald-50\\/40' },
  { from: '.bg-black/20', to: '.bg-black\\/20' },
  
  // Scale and hover
  { from: '.scale-[1.02]', to: '.scale-\\[1\\.02\\]' },
  { from: '.hover:scale-[1.01]:hover', to: '.hover\\:scale-\\[1\\.01\\]:hover' },
  { from: '.hover:scale-[1.05]:hover', to: '.hover\\:scale-\\[1\\.05\\]:hover' },
  { from: '.group:hover .group-hover:scale-110', to: '.group:hover .group-hover\\:scale-110' },
  { from: '.group:hover .group-hover:translate-x-1', to: '.group:hover .group-hover\\:translate-x-1' },
  { from: '.group:hover .group-hover:text-blue-700', to: '.group:hover .group-hover\\:text-blue-700' },
  { from: '.group:hover .group-hover:text-emerald-700', to: '.group:hover .group-hover\\:text-emerald-700' },
  
  // Hover bg
  { from: '.hover:bg-white/80:hover', to: '.hover\\:bg-white\\/80:hover' },
  { from: '.hover:bg-white/60:hover', to: '.hover\\:bg-white\\/60:hover' },
  { from: '.hover:bg-slate-50:hover', to: '.hover\\:bg-slate-50:hover' },
  { from: '.hover:bg-slate-100:hover', to: '.hover\\:bg-slate-100:hover' },
  { from: '.hover:bg-slate-200/50:hover', to: '.hover\\:bg-slate-200\\/50:hover' },
  { from: '.hover:bg-blue-50:hover', to: '.hover\\:bg-blue-50:hover' },
  { from: '.hover:bg-blue-50/40:hover', to: '.hover\\:bg-blue-50\\/40:hover' },
  { from: '.hover:bg-emerald-50/40:hover', to: '.hover\\:bg-emerald-50\\/40:hover' },
  { from: '.hover:bg-violet-100/70:hover', to: '.hover\\:bg-violet-100\\/70:hover' },
  { from: '.hover:bg-blue-100/70:hover', to: '.hover\\:bg-blue-100\\/70:hover' },
  { from: '.hover:bg-red-100:hover', to: '.hover\\:bg-red-100:hover' }
];

// Perform search and replace
for (const rep of replacements) {
  css = css.split(rep.from).join(rep.to);
}

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Fixed all css escapes successfully!');
