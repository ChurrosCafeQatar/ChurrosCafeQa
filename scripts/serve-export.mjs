import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('out');
const mime = {'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.json':'application/json','.xml':'application/xml','.txt':'text/plain','.png':'image/png','.webp':'image/webp','.avif':'image/avif','.jpg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon','.woff2':'font/woff2','.ttf':'font/ttf'};
createServer(async (req,res) => {
  try {
    const url = new URL(req.url,'http://localhost');
    let file = path.resolve(root,'.'+decodeURIComponent(url.pathname));
    if (file !== root && !file.startsWith(root+path.sep)) { res.writeHead(403);res.end();return; }
    // Vercel maps Next's flattened segment-prefetch URLs to these export files.
    // Emulate that locally without adding or changing production routes.
    const info = await stat(file).catch(async error => {
      if (!/__next\.[^/\\]+\.__PAGE__\.txt$/.test(file)) throw error;
      file = file.replace(/\.__PAGE__\.txt$/, path.sep + '__PAGE__.txt');
      return stat(file);
    });
    if (info.isDirectory() && !url.pathname.endsWith('/')) { res.writeHead(308,{Location:url.pathname+'/'+url.search});res.end();return; }
    const target = info.isDirectory() ? path.join(file,'index.html') : file;
    const body = await readFile(target);
    res.writeHead(200,{'Content-Type':mime[path.extname(target)]||'application/octet-stream','Content-Length':body.length});
    res.end(req.method==='HEAD'?undefined:body);
  } catch {
    res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});
    res.end(await readFile(path.join(root,'404.html')).catch(()=>Buffer.from('Not found')));
  }
}).listen(Number(process.argv[2]||4173),'127.0.0.1',()=>console.log('Serving production static export'));
