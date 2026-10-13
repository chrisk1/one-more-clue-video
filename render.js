#!/usr/bin/env node
/* render.js — parallel chunked renderer for "One More Clue".
   Splits [from, to) into CHUNK-second pieces and renders them with JOBS parallel headless Chrome workers (a fresh
   browser per chunk keeps memory flat). Each worker loads src/film.html, calls setup(w, h) once, then seek(n / fps) per
   frame and pipes the PNG screenshots into ffmpeg (x264). Finished chunks are kept in --tmp, so an interrupted render
   resumes where it stopped (delete the --tmp dir after changing size/fps/quality settings); at the end the chunks are concatenated and muxed with song.mp3.
   Usage: node render.js [--w 3840] [--fps 30] [--from 0] [--to 136.8] [--chunk 8] [--jobs 4]
                         [--crf 16] [--preset slow] [--out out/one_more_clue.mp4] [--tmp _chunks_<w>_<fps>]
   Preview: npm run preview   (960 px, 24 fps)        4K master: npm run render:4k   (3840 px, 30 fps) */
const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path'), fs = require('fs');
const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf('--' + k); return i >= 0 ? argv[i + 1] : d; };
const W = +arg('w', 3840), H = Math.round(W * 9 / 16), FPS = +arg('fps', 30);
const FROM = +arg('from', 0), TO = +arg('to', 136.8), CHUNK = +arg('chunk', 8), JOBS = +arg('jobs', 4);
const CRF = arg('crf', '16'), PRESET = arg('preset', 'slow');
const SONG = path.resolve(__dirname, 'song.mp3'), PAGE = path.resolve(__dirname, 'src/film.html');
const OUT = path.resolve(arg('out', 'out/one_more_clue.mp4'));
const TMP = path.resolve(arg('tmp', `_chunks_${W}_${FPS}`));
const errors = new Set();

const sh = (cmd, args) => new Promise((res, rej) => {
  const p = spawn(cmd, args, { stdio: ['ignore', 'ignore', 'pipe'] }); let err = '';
  p.stderr.on('data', d => { err += d; if (err.length > 8000) err = err.slice(-4000); });
  p.on('close', c => c === 0 ? res() : rej(new Error(cmd + ' exited ' + c + '\n' + err.slice(-1500))));
});

async function renderChunk(idx, n0, n1) {
  const out = path.join(TMP, `c${String(idx).padStart(4, '0')}.mp4`);
  if (fs.existsSync(out) && fs.statSync(out).size > 1000) return out;          // resume
  const part = out + '.part.mp4';
  const ff = spawn('ffmpeg', ['-y', '-f', 'image2pipe', '-vcodec', 'png', '-framerate', String(FPS), '-i', 'pipe:0',
    '-c:v', 'libx264', '-preset', PRESET, '-crf', CRF, '-pix_fmt', 'yuv420p', '-profile:v', 'high',
    '-x264-params', 'aq-mode=3:aq-strength=0.9:deblock=-1,-1', '-tune', 'animation',
    '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', part], { stdio: ['pipe', 'ignore', 'pipe'] });
  let ffErr = ''; ff.stderr.on('data', d => { ffErr += d; if (ffErr.length > 8000) ffErr = ffErr.slice(-4000); });
  const browser = await puppeteer.launch({ headless: 'new', protocolTimeout: 600000,
    args: ['--allow-file-access-from-files', '--force-device-scale-factor=1', '--hide-scrollbars', '--font-render-hinting=none',
      '--disable-lcd-text', '--js-flags=--max-old-space-size=4096'] });
  try {
    const page = await browser.newPage();
    page.on('pageerror', e => errors.add(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.add(m.text()); });
    await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
    await page.goto('file://' + PAGE);
    await page.evaluate((w, h) => window.setup(w, h), W, H);
    const cv = await page.$('#cv');
    let pipeErr = null; ff.stdin.on('error', e => { pipeErr = e; });
    const write = buf => new Promise((res, rej) => { if (pipeErr) return rej(pipeErr); if (ff.stdin.write(buf)) return res(); ff.stdin.once('drain', res); });
    for (let n = n0; n < n1; n++) {
      await page.evaluate(tt => window.seek(tt), n / FPS);
      await write(await cv.screenshot({ type: 'png', optimizeForSpeed: true }));
    }
    ff.stdin.end();
    await new Promise((res, rej) => ff.on('close', c => c === 0 ? res() : rej(new Error('ffmpeg ' + c + '\n' + ffErr.slice(-1200)))));
    fs.renameSync(part, out);
  } finally { await browser.close().catch(() => {}); }
  return out;
}

(async () => {
  fs.mkdirSync(TMP, { recursive: true }); fs.mkdirSync(path.dirname(OUT), { recursive: true });
  const N0 = Math.round(FROM * FPS), N1 = Math.round(TO * FPS), per = Math.round(CHUNK * FPS);
  const jobs = []; for (let n = N0, i = 0; n < N1; n += per, i++) jobs.push([i, n, Math.min(N1, n + per)]);
  const done = new Array(jobs.length); let next = 0, fin = 0; const t0 = Date.now();
  const worker = async () => {
    while (next < jobs.length) {
      const j = jobs[next++]; let ok = false, err;
      for (let a = 0; a < 3 && !ok; a++) { try { done[j[0]] = await renderChunk(...j); ok = true; } catch (e) { err = e; console.log(`\n chunk ${j[0]} attempt ${a + 1} failed: ${e.message.slice(0, 120)}`); } }
      if (!ok) throw err;
      fin++; const el = (Date.now() - t0) / 1000;
      process.stdout.write(`\r  ${fin}/${jobs.length} chunks  ${(el / 60).toFixed(1)}min  eta ${((el / fin) * (jobs.length - fin) / 60).toFixed(1)}min   `);
    }
  };
  await Promise.all(Array.from({ length: Math.min(JOBS, jobs.length) }, worker));
  const list = path.join(TMP, 'list.txt');
  fs.writeFileSync(list, done.map(c => `file '${c.replace(/'/g, "'\\''")}'`).join('\n'));
  const silent = path.join(TMP, 'silent.mp4');
  await sh('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', silent]);
  await sh('ffmpeg', ['-y', '-i', silent, '-ss', String(FROM), '-i', SONG, '-map', '0:v', '-map', '1:a', '-c:v', 'copy',
    '-c:a', 'aac', '-b:a', '320k', '-ar', '48000', '-shortest', '-movflags', '+faststart', OUT]);
  console.log(`\ndone in ${((Date.now() - t0) / 60000).toFixed(1)} min -> ${OUT}`);
  if (errors.size) console.log('PAGE ERRORS:\n' + [...errors].slice(0, 20).join('\n'));
})().catch(e => { console.error('\nFAILED:', e.message); process.exit(1); });
