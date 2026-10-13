// frames.js — render individual stills of the film as PNGs (for checking shots without a full render).
// usage: node frames.js [--w 1280] [--out out/frames] (--times 1,2.5,3 | --from a --to b --step s) [--debug]
//   files are named t<seconds>.png; --debug overlays the time and the active shot name. Page errors (e.g. a missing
//   asset) are printed at the end.
const puppeteer=require('puppeteer');const fs=require('fs'),path=require('path');
const argv=process.argv.slice(2);const arg=(k,d)=>{const i=argv.indexOf('--'+k);return i>=0?argv[i+1]:d;};
const W=+arg('w',1280),H=Math.round(W*9/16),OUT=path.resolve(arg('out','out/frames'));fs.mkdirSync(OUT,{recursive:true});
let times=arg('times')?arg('times').split(',').map(Number):[];
if(!times.length){const a=+arg('from',0),b=+arg('to',137),s=+arg('step',1);for(let t=a;t<=b+1e-9;t+=s)times.push(+t.toFixed(4));}
(async()=>{const b=await puppeteer.launch({headless:'new',protocolTimeout:600000,args:['--allow-file-access-from-files','--force-device-scale-factor=1','--font-render-hinting=none']});
const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.setViewport({width:W,height:H});await p.goto('file://'+path.resolve(__dirname,'src/film.html'));
await p.evaluate((w,h,d)=>{window.DEBUG=d;return window.setup(w,h)},W,H,argv.includes('--debug'));
for(const t of times){await p.evaluate(tt=>window.seek(tt),t);const c=await p.$('#cv');await c.screenshot({path:path.join(OUT,`t${t.toFixed(2).padStart(7,'0')}.png`)});}
await b.close();if(errs.length)console.log('ERRORS:\n'+[...new Set(errs)].slice(0,20).join('\n'));console.log('rendered',times.length);})();
