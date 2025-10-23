// serve.mjs – mini server per servire la build prod + proxy /api→localhost:3000
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import history from 'connect-history-api-fallback';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, 'dist', 'admin-pwa', 'browser');

const app = express();

// Proxy API e WebSocket verso il BE locale
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:3000',
  changeOrigin: true,
  ws: true,
  logLevel: 'debug',
}));
app.use('/socket.io', createProxyMiddleware({
  target: 'http://localhost:3000',
  changeOrigin: true,
  ws: true,
  logLevel: 'debug',
}));

// SPA fallback (non toccare /api e /socket.io)
app.use(history({
  rewrites: [
    { from: /^\/api\/.*$/, to: ctx => ctx.parsedUrl.path },
    { from: /^\/socket\.io\/.*$/, to: ctx => ctx.parsedUrl.path },
  ],
}));

// Statico buildato da Angular
app.use(express.static(distDir, { extensions: ['html'], maxAge: '1h' }));

const port = process.env.PORT || 4300;
app.listen(port, () => {
  console.log(`✅ SPA pronta: http://localhost:${port}`);
  console.log(`➡️  Proxy /api → http://localhost:3000`);
});
