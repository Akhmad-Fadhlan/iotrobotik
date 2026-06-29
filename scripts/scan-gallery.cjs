const fs = require('fs');
const path = require('path');

const srcKbm = path.join(__dirname, '..', 'galeri kbm');
const srcLomba = path.join(__dirname, '..', 'Documentasi Lomba');

const galleryItems = [];
let idCounter = 1;

function getMediaType(filename) {
  const ext = path.extname(filename).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
    return 'image';
  } else if (['.mp4', '.mov', '.webm', '.ogg', '.mkv'].includes(ext)) {
    return 'video';
  }
  return null;
}

function cleanName(filename) {
  const base = path.basename(filename, path.extname(filename));
  return base
    .replace(/[_-]/g, ' ')
    .replace(/WhatsApp Image/g, 'Dokumentasi')
    .replace(/WhatsApp Video/g, 'Video')
    .trim();
}

function scanDir(dirPath, category, subCategory, rootDirName) {
  if (!fs.existsSync(dirPath)) return;

  const items = fs.readdirSync(dirPath);
  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      const nextSub = subCategory ? `${subCategory} - ${item}` : item;
      scanDir(fullPath, category, nextSub, rootDirName);
    } else {
      const type = getMediaType(item);
      if (!type) return; // Skip non-media files

      // Compute virtual relative URL
      // e.g., if fullPath is ".../galeri kbm/7A/img.jpg" and srcKbm is ".../galeri kbm",
      // the relative path is "7A/img.jpg", so URL is "/galeri/kbm/7A/img.jpg"
      const relativePart = path.relative(
        category === 'kbm' ? srcKbm : srcLomba,
        fullPath
      ).replace(/\\/g, '/');

      const virtualSrc = `/galeri/${category}/${relativePart}`;

      // Determine bento grid spanning pattern
      let colSpan = 1;
      let rowSpan = 1;
      
      const val = idCounter % 7;
      if (val === 0) {
        colSpan = 2;
        rowSpan = 2; // Large
      } else if (val === 2 || val === 5) {
        colSpan = 2;
        rowSpan = 1; // Wide
      } else if (val === 3) {
        colSpan = 1;
        rowSpan = 2; // Tall
      }

      galleryItems.push({
        id: `g_${idCounter++}`,
        src: virtualSrc,
        name: cleanName(item),
        type,
        category, // 'kbm' or 'lomba'
        tag: subCategory || (category === 'kbm' ? 'KBM Umum' : 'Lomba Umum'),
        size: stats.size,
        colSpan,
        rowSpan
      });
    }
  });
}

console.log('Scanning Galeri KBM...');
scanDir(srcKbm, 'kbm', '', 'galeri kbm');

console.log('Scanning Documentasi Lomba...');
scanDir(srcLomba, 'lomba', '', 'Documentasi Lomba');

// Save output json
const dataDir = path.join(__dirname, '..', 'src', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
fs.writeFileSync(
  path.join(dataDir, 'gallery.json'),
  JSON.stringify(galleryItems, null, 2)
);

console.log(`Successfully scanned ${galleryItems.length} media items and saved metadata to src/data/gallery.json.`);
