const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=__dirname,types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.avif':'image/avif','.png':'image/png','.json':'application/json','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8','.xml':'application/xml','.woff2':'font/woff2'};
http.createServer((req,res)=>{let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);return res.end('Bad request')}
 if(!path.extname(pathname)&&!pathname.endsWith('/')){res.writeHead(308,{Location:pathname+'/'});return res.end()}
 const file=path.resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end('Forbidden')}
 if(!types[path.extname(file)]){res.writeHead(404);return res.end('Not found')}
 fs.readFile(file,(err,data)=>{if(err){res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});return res.end(fs.readFileSync(path.join(root,'404.html')))}res.writeHead(200,{'Content-Type':types[path.extname(file)],'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Cache-Control':path.extname(file)==='.html'?'no-cache':'public, max-age=3600'});res.end(data)})
}).listen(process.env.PORT||4173,'0.0.0.0',()=>console.log('CreovoCafe: http://localhost:'+(process.env.PORT||4173)));

