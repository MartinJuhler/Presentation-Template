/* ═══════════════════════════════════════════════
   Sync Server — Auto git-pull after browser save
   Start:  node sync-server.js
   ═══════════════════════════════════════════════ */

const http = require('http');
const { exec } = require('child_process');
const path = require('path');

const PORT = 3939;
const PROJECT_DIR = __dirname;

const server = http.createServer((req, res) => {
    // CORS — allow file:// and any origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    if (req.method === 'POST' && req.url === '/pull') {
        exec('git pull', { cwd: PROJECT_DIR }, (error, stdout, stderr) => {
            if (error) {
                console.error('❌ git pull failed:', stderr || error.message);
                res.writeHead(500);
                res.end(JSON.stringify({ ok: false, error: stderr || error.message }));
            } else {
                const output = stdout.trim();
                console.log('✅ git pull:', output);
                res.writeHead(200);
                res.end(JSON.stringify({ ok: true, output }));
            }
        });
        return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, '127.0.0.1', () => {
    console.log(`\n🔄 Sync server running at http://localhost:${PORT}`);
    console.log(`   Project: ${PROJECT_DIR}`);
    console.log(`   POST /pull → git pull\n`);
});
