import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

function getMimeType(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    case '.webp':
      return 'image/webp';
    case '.mp4':
      return 'video/mp4';
    case '.mov':
      return 'video/quicktime';
    case '.webm':
      return 'video/webm';
    case '.ogg':
      return 'video/ogg';
    default:
      return 'application/octet-stream';
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-gallery-assets',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const rawUrl = req.url || '';
          const decodeUrl = decodeURIComponent(rawUrl.split('?')[0]);
          
          if (decodeUrl.startsWith('/galeri/kbm/')) {
            const relativePath = decodeUrl.replace('/galeri/kbm/', '');
            const filePath = path.join(__dirname, 'galeri kbm', relativePath);
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              res.setHeader('Content-Type', getMimeType(filePath));
              res.setHeader('Cache-Control', 'max-age=3600');
              fs.createReadStream(filePath).pipe(res);
              return;
            }
          } else if (decodeUrl.startsWith('/galeri/lomba/')) {
            const relativePath = decodeUrl.replace('/galeri/lomba/', '');
            const filePath = path.join(__dirname, 'Documentasi Lomba', relativePath);
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              res.setHeader('Content-Type', getMimeType(filePath));
              res.setHeader('Cache-Control', 'max-age=3600');
              fs.createReadStream(filePath).pipe(res);
              return;
            }
          }
          next();
        });
      }
    }
  ],
})

