// serve.mjs – mini server per servire la build prod + proxy /api→localhost:3000 (WS incluso)
// ============================================================================
// Obiettivo: poter aprire direttamente URL profondi (es. /reservations/new) anche da iPhone
// sulla LAN, con fallback SPA + proxy verso il backend locale.
// Mantengo il tuo stile e le tue logiche (nessun cambio a router/guard/service worker).
// ============================================================================

import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import history from 'connect-history-api-fallback';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔎 Auto-detect cartella dist (supporta sia dist/admin-pwa/browser che dist/admin-pwa)
const distCandidates = [
  path.join(__dirname, 'dist', 'admin-pwa', 'browser'),
  path.join(__dirname, 'dist', 'admin-pwa')
];
const distDir = distCandidates.find(p => existsSync(p)) ?? distCandidates[0];

const app = express();

// ⚙️ Config
const PORT = Number(process.env.PORT || 8100);
const API_TARGET = process.env.API_TARGET || 'http://localhost:3000';

// 🔌 Proxy API e WebSocket verso il BE locale
app.use(
  '/api',
  createProxyMiddleware({
    target: API_TARGET,
    changeOrigin: true,
    ws: true,
    logLevel: 'debug'
  })
);

app.use(
  '/socket.io',
  createProxyMiddleware({
    target: API_TARGET,
    changeOrigin: true,
    ws: true,
    logLevel: 'debug'
  })
);

// 🧭 SPA fallback (non toccare /api e /socket.io)
app.use(
  history({
    rewrites: [
      { from: /^\/api\/.*$/, to: ctx => ctx.parsedUrl.path },
      { from: /^\/socket\.io\/.*$/, to: ctx => ctx.parsedUrl.path }
    ]
  })
);

// 📦 Statico buildato da Angular
app.use(express.static(distDir, { extensions: ['html'], maxAge: '1h' }));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ SPA pronta:      http://0.0.0.0:${PORT}`);
  console.log(`📁 dist:            ${distDir}`);
  console.log(`➡️  Proxy /api  →   ${API_TARGET}`);
  console.log(`🔁 Fallback SPA:    ON (deep-link/reload ok)`);
  console.log(`📱 Esempio iPhone:  http://192.168.1.85:${PORT}/reservations/new`);
});
