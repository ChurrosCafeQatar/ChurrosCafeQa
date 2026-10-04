const sharp = require('sharp');
(async()=>{
for(const width of [800,1400]){await sharp('public/assets/churros.png').resize(width).webp({quality:82}).toFile(`public/assets/churros-${width}.webp`);await sharp('public/assets/churros.png').resize(width).avif({quality:53}).toFile(`public/assets/churros-${width}.avif`)}
for(const [name,width] of [['coffee-pastry',900],['barista',900],['cafe-interior',1600]]) await sharp(`public/assets/${name}.png`).resize(width).webp({quality:80}).toFile(`public/assets/${name}-${width}.webp`);
await sharp('public/assets/coffee-pastry.png').extract({left:0,top:0,width:800,height:800}).resize(750).webp({quality:82}).toFile('public/assets/coffee-detail.webp');
console.log('Responsive photography ready');
})();
