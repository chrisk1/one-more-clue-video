// Trim the transparent margins of generated sprites (keeps a 1.2% pad), using headless Chrome's canvas.
// usage: node tools/trim.js OUTDIR in1.png in2.png ...   -> OUTDIR/<name>.png + OUTDIR/bbox.json (crop boxes)
// e.g.   node tools/trim.js assets/sprites generated/*.png && python3 tools/make_assets_js.py
const puppeteer=require('puppeteer');const fs=require('fs'),path=require('path');
const [out,...files]=process.argv.slice(2); fs.mkdirSync(out,{recursive:true});
(async()=>{const b=await puppeteer.launch({headless:'new',args:['--allow-file-access-from-files']});const p=await b.newPage();
await p.goto('file://'+path.resolve(out)+'/');
const meta={};
for(const f of files){
  const data='data:image/png;base64,'+fs.readFileSync(f).toString('base64');
  const r=await p.evaluate(async(src)=>{const im=new Image();im.src=src;await im.decode();
    const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d');g.drawImage(im,0,0);
    const d=g.getImageData(0,0,c.width,c.height).data;let x0=c.width,y0=c.height,x1=0,y1=0;
    for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++){if(d[(y*c.width+x)*4+3]>24){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;}}
    const pad=Math.round(Math.max(c.width,c.height)*.012);x0=Math.max(0,x0-pad);y0=Math.max(0,y0-pad);x1=Math.min(c.width-1,x1+pad);y1=Math.min(c.height-1,y1+pad);
    const o=document.createElement('canvas');o.width=x1-x0+1;o.height=y1-y0+1;o.getContext('2d').drawImage(c,-x0,-y0);
    return {url:o.toDataURL('image/png'),bb:[x0,y0,x1,y1],w:c.width,h:c.height};},data);
  const n=path.basename(f);fs.writeFileSync(path.join(out,n),Buffer.from(r.url.split(',')[1],'base64'));meta[n.replace('.png','')]={bb:r.bb,w:r.w,h:r.h};
}
fs.writeFileSync(path.join(out,'bbox.json'),JSON.stringify(meta,null,1));await b.close();})();
