// Simple static file server (no Express)
// Serves files from the "public" directory

const http = require('http');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const rootDir = __dirname;

const mimeTypes = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function sendFile(res, filePath, statusCode = 200) {
  const ext = path.extname(filePath).toLowerCase();
  const type = mimeTypes[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') return send404(res);
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
      return res.end('500 Internal Server Error');
    }
    res.writeHead(statusCode, { 'Content-Type': type });
    res.end(data);
  });
}

function send404(res) {
  const custom404 = path.join(publicDir, '404.html');
  if (fs.existsSync(custom404)) {
    return sendFile(res, custom404, 404);
  }
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
  res.end('404 Not Found');
}

const server = http.createServer((req, res) => {
  let urlPath = decodeURI(req.url || '/');
  if (urlPath === '/' || urlPath === '/index' || urlPath === '/index.html') {
    const indexPath = path.join(publicDir, 'index.html');
    return sendFile(res, indexPath);
  }

  // Prevent directory traversal
  const safePath = path.normalize(urlPath).replace(/^\/+/, '');
  const filePath = path.join(publicDir, safePath);

  // If path is a directory, try index.html in that directory
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isDirectory()) {
      const maybeIndex = path.join(filePath, 'index.html');
      if (fs.existsSync(maybeIndex)) return sendFile(res, maybeIndex);
    }
    if (err) {
      // Fallback to project root (e.g., root logo.jpeg)
      const fallbackPath = path.join(rootDir, safePath);
      return fs.access(fallbackPath, fs.constants.R_OK, (e2) => {
        if (e2) return send404(res);
        sendFile(res, fallbackPath);
      });
    }
    sendFile(res, filePath);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Static server running at http://localhost:${port}`);
});


