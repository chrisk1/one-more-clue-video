// pencil.js — the coloured-pencil layer (loaded after gfx.js).
// Principles: (1) everything that is DRAWN looks like coloured pencil on toothy paper, using real hand-made pencil
// textures (assets/pencil/texture/*) as grain masks; (2) nothing boils — drawings hold still like a real drawing (motion and
// camera shake still animate); (3) lyric type stays crisp computer type and is composited ON TOP of the
// pencil picture (see film.html seek()).
'use strict';

const P4 = {
  line: '#4d3b2f',          // warm sepia-graphite pencil line
  lineSoft: '#7a6656',
  lineK: .78,               // procedural line width multiplier vs the ink originals
  wash: .5,                 // colour under-layer inside fills
  grain: .85,               // hatch texture strength inside fills
  texScale: .55,            // design px per texture texel (pencil grain size)
};
const _sw = (seed, amp) => (hash2(0, seed) * 2 - 1) * amp;          // static (time-independent) wobble

// ---------- texture masks from the scanned pencil swatches ----------
let _mask = {}, _pat4 = new Map();
function p4Mask(name) {
  if (_mask[name]) return _mask[name];
  const im = IMG[name]; if (!im) return null;
  const N = 1024, c = document.createElement('canvas'); c.width = c.height = N;
  const g = c.getContext('2d'); g.drawImage(im, 0, 0, im.width, im.height, 0, 0, N, N);
  const id = g.getImageData(0, 0, N, N), d = id.data;
  // dark graphite → opaque; paper → clear. Normalise so the texture's median ~ .55 alpha.
  for (let i = 0; i < d.length; i += 4) { const L = (d[i] * .3 + d[i + 1] * .59 + d[i + 2] * .11) / 255; const a = clamp((1 - L - .12) * 1.9); d[i] = d[i + 1] = d[i + 2] = 0; d[i + 3] = a * 255; }
  g.putImageData(id, 0, 0);
  // make it tile seamlessly: 2x2 mirrored tile
  const t = document.createElement('canvas'); t.width = t.height = N * 2; const tg = t.getContext('2d');
  for (const [sx, sy] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) { tg.save(); tg.translate(sx < 0 ? N * 2 : 0, sy < 0 ? N * 2 : 0); tg.scale(sx, sy); tg.drawImage(c, 0, 0); tg.restore(); }
  return (_mask[name] = t);
}
function p4Pat(col, kind = 'tex_hatch') {
  const key = col + '|' + kind;
  let p = _pat4.get(key);
  if (!p) {
    const mk = p4Mask(kind); if (!mk) return col;
    const c = document.createElement('canvas'); c.width = mk.width; c.height = mk.height; const g = c.getContext('2d');
    g.fillStyle = col; g.fillRect(0, 0, c.width, c.height); g.globalCompositeOperation = 'destination-in'; g.drawImage(mk, 0, 0);
    p = X.createPattern(c, 'repeat'); _pat4.set(key, p); if (_pat4.size > 260) _pat4.delete(_pat4.keys().next().value);
  }
  // texture is attached to the drawing (world space): it moves, zooms and rotates with the object/camera
  p.setTransform(new DOMMatrix().scaleSelf(P4.texScale, P4.texScale));
  return p;
}
function p4Shade(col, k) {
  const m = /^#?([0-9a-f]{6})$/i.exec(col); if (!m) return col;
  const n = parseInt(m[1], 16); const f = (c) => Math.round(k < 0 ? c * (1 + k) : c + (255 - c) * k);
  return '#' + [n >> 16 & 255, n >> 8 & 255, n & 255].map(f).map(x => Math.max(0, Math.min(255, x)).toString(16).padStart(2, '0')).join('');
}
const _ink = (c) => !c || c === PAL.ink || c === PAL.inkSoft || /^#2a1d14$/i.test(c) || /^#(000|000000)$/.test(c);

// ---------- static geometry (no boil) ----------
window.wobbled = function (pts, amp, seed) { return pts.map((p, i) => [p[0] + _sw(seed + i * 7.1, amp), p[1] + _sw(seed + i * 3.7 + 99, amp)]); };

// ---------- rough pencil sketching (lines + hatching re-drawn each sketch step: a real "boil", no image noise) ----------
const P4_SKETCH_FPS = 12;          // 'on twos' at 24 fps — soft and fluid, like hand-drawn animation
const p4Step = () => Math.floor(T * P4_SKETCH_FPS + 1e-6);
const _rn = (i, seed) => hash2(i * 1.7 + p4Step() * 13.1, seed * .37 + 5.3);           // per-step random 0..1
// one rough line = 2-3 overlapping searching passes with overshoot, textured graphite/coloured pencil
function p4Line(pts, w = 3, col = P4.line, amp = 1, seed = 1, closed = false, o = {}) {
  if (!pts || pts.length < 2) return;
  const a0 = X.globalAlpha * (o.alpha ?? 1), passes = o.passes ?? 2;
  const rough = (o.rough ?? 1) * (.6 + w * .22 + amp * .35);
  X.save(); X.lineCap = X.lineJoin = 'round';
  for (let k = 0; k < passes; k++) {
    const sd = seed * 3.1 + k * 17;
    let q = pts.map((p, i) => [p[0] + (hash2(i, sd) - .5) * rough * 1.4 + (_rn(i, sd) - .5) * rough * .55, p[1] + (hash2(i, sd + 9) - .5) * rough * 1.4 + (_rn(i, sd + 9) - .5) * rough * .55]);
    if (!closed && q.length > 1) {                                   // overshoot / undershoot the ends a little
      const e = (_rn(91, sd) - .35) * rough * 2.2, A = q[0], B = q[1], C = q[q.length - 1], D = q[q.length - 2];
      const dA = Math.hypot(A[0] - B[0], A[1] - B[1]) || 1, dC = Math.hypot(C[0] - D[0], C[1] - D[1]) || 1;
      q[0] = [A[0] + (A[0] - B[0]) / dA * e, A[1] + (A[1] - B[1]) / dA * e];
      q[q.length - 1] = [C[0] + (C[0] - D[0]) / dC * e * .8, C[1] + (C[1] - D[1]) / dC * e * .8];
    }
    X.globalAlpha = a0 * (k === 0 ? .9 : .42 + _rn(7, sd) * .2);
    X.strokeStyle = p4Pat(col, k === 0 ? 'tex_soft' : 'tex_hatch');
    X.lineWidth = Math.max(.7, w * (k === 0 ? 1 : .55 + _rn(3, sd) * .35));
    curve(q, closed); X.stroke();
  }
  X.restore();
}
// soft watercolour-pencil fill: a soft wash plus gently rubbed pigment (tex_soft), slightly uneven, darker on the shadow side.
// The pigment layer shifts by a few texels on each sketch step = a quiet "breathing" crayon texture (no line hatching).
function p4Hatch(pts, col, o = {}) {
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  for (const [x, y] of pts) { if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y; }
  const st = p4Step(), ox = (st % 3) * 23, oy = ((st >> 1) % 3) * 17;
  X.save(); X.translate(ox * .05, oy * .05);
  X.globalAlpha *= (o.alpha ?? 1) * .85; X.fillStyle = p4Pat(p4Shade(col, -.1), 'tex_soft'); X.fillRect(x0 - 20, y0 - 20, x1 - x0 + 40, y1 - y0 + 40);
  X.restore();
  if (o.shade) {
    // inner shadow that follows the contour: layers of (big rect minus the shape shifted up-left), clipped by caller
    const d0 = Math.max(4, Math.min(x1 - x0, y1 - y0) * .06);
    X.save(); X.fillStyle = p4Pat(p4Shade(col, -.32), 'tex_soft'); const ga = X.globalAlpha;
    for (let k = 1; k <= 3; k++) {
      X.globalAlpha = ga * (o.alpha ?? 1) * o.shade * .32;
      X.beginPath(); X.rect(x0 - 50, y0 - 50, x1 - x0 + 100, y1 - y0 + 100);
      const dx = -d0 * k, dy = -d0 * k * .8; X.moveTo(pts[0][0] + dx, pts[0][1] + dy);
      for (let i = 1; i < pts.length; i++) X.lineTo(pts[i][0] + dx, pts[i][1] + dy);
      X.closePath(); X.fill('evenodd');
    }
    X.restore();
  }
}
function p4Fill(buildPath, col, o = {}) {                            // texture-only fill for path-only callers / huge areas
  if (!col) return;
  const a0 = X.globalAlpha * (o.alpha ?? 1);
  X.save(); buildPath();
  X.globalAlpha = a0 * (o.wash ?? P4.wash); X.fillStyle = col; X.fill();
  X.globalAlpha = a0 * (o.grain ?? P4.grain); X.fillStyle = p4Pat(p4Shade(col, -.12), o.tex || 'tex_hatch'); X.fill();
  if (o.shade) { X.globalAlpha = a0 * o.shade; X.fillStyle = p4Pat(p4Shade(col, -.38), 'tex_soft'); X.fill(); }
  X.restore();
}
window.inkLine = function (pts, w = 4, col = PAL.ink, amp = 1.2, seed = 1, closed = false) {
  const g = _ink(col); p4Line(pts, w * (g ? P4.lineK : .95), g ? P4.line : col, amp, seed, closed);
};
window.inkShape = function (pts, fill, w = 4, amp = 1.2, seed = 1, col = PAL.ink) {
  if (fill) {
    const q = wobbled(pts, amp, seed);
    X.save(); X.fillStyle = p4Shade(fill, .5); curve(q, true); X.fill(); X.restore();                    // solid, paper-light under-colour (objects stay opaque)
    X.save(); curve(q, true); X.clip(); p4Hatch(q, fill, { seed, shade: .45 }); X.restore();
  }
  if (w) p4Line(pts, w * (_ink(col) ? P4.lineK : .9), _ink(col) ? P4.line : col, amp, seed + 50, true);
};
window.shadowBlob = function (x, y, rx, ry, a = .2) {                 // contact shadow = a few soft pencil hatch strokes
  const pts = ellPts(x, y, rx, ry, 16);
  X.save(); X.globalAlpha *= Math.min(1, a * 2.6); curve(pts, true); X.clip(); p4Hatch(pts, '#8a7a6c', { seed: 61, spacing: 6, lw: 2.2 }); X.restore();
};
window.dot = function (x, y, r) { X.save(); X.beginPath(); X.arc(x, y, r, 0, 7); X.fillStyle = P4.line; X.globalAlpha *= .85; X.fill(); X.restore(); };

// ---------- paper wash: coloured pencil laid over the page (not flat colour) ----------
window.paperBG = function (col = null, k = 1) {
  plate('paper');
  if (col) {
    const st = p4Step();
    X.save(); X.globalCompositeOperation = 'multiply';
    X.globalAlpha = k * .55; X.fillStyle = col; X.fillRect(-10, -10, DW + 20, DH + 20);
    X.translate((st % 3) * 1.2, ((st >> 1) % 3) * .9);
    X.globalAlpha = Math.min(1, k * .55); X.fillStyle = p4Pat(p4Shade(col, -.06), 'tex_soft'); X.fillRect(-20, -20, DW + 40, DH + 40);
    X.restore();
  }
};

// ---------- sprites: the drawings hold still (no displacement, no jitter) ----------
// Subtle, simple boil for characters & props only: three hand-redrawn drawings of the same pose (name, name~1,
// name~2), cycled slowly ("on fours" at 24 fps = 6 drawings/s), each sprite on its own phase. No noise, no
// displacement. Backgrounds and type never boil.
const _spr4 = window.spr, _nv = new Map();
const P4_BOIL_FPS = 12;
function p4Variants(name) { let n = _nv.get(name); if (n === undefined) { n = 1; while (IMG[name + '~' + n]) n++; _nv.set(name, n); } return n; }
function p4SprShadow(im, x, y, h, o) {
  if ((o.alpha ?? 1) <= 0) return;
  const w = h * im.width / im.height;
  X.save(); X.globalAlpha *= (o.alpha ?? 1); X.translate(x, y); if (o.rot) X.rotate(o.rot); X.scale(o.sx ?? 1, o.sy ?? 1);
  shadowBlob(0, 0, w * .32, Math.max(4, h * .025), .2 * o.shadow); X.restore();
}
window.spr = function (name, x, y, h, o = {}) {
  const im = IMG[name]; if (!im) return;
  const n = p4Variants(name);
  if (n > 1 && o.boil !== false && !o.still) {
    const st = Math.floor(T * P4_BOIL_FPS + 1e-6) + Math.floor(hash(name.length * 7.3 + (o.seed || 0) * 3.1) * 3);
    const i = ((st % n) + n) % n, fr = i ? name + '~' + i : name;
    if (o.shadow) p4SprShadow(im, x, y, h, o);
    return _spr4(fr, x, y, h * IMG[fr].height / im.height, { ...o, boil: false, shadow: 0 });
  }
  if (o.shadow) p4SprShadow(im, x, y, h, o);
  return _spr4(name, x, y, h, { ...o, boil: false, shadow: 0 });
};

// ---------- thread, tack ----------
window.thread = function (pts, o = {}) {
  if (pts.length < 2) return;
  const w = o.w ?? 9, col = o.col ?? PAL.red, k = o.k ?? 1;
  let q = k < 1 ? ptrim(pts, k) : pts; if (q.length < 2) return;
  if (o.shadow !== 0) { X.save(); X.globalAlpha *= .12; X.translate(w * .5, w); p4Line(q, w, P4.lineSoft, .5, 401, false, { passes: 1 }); X.restore(); }
  X.save(); X.globalAlpha *= .22; X.lineCap = X.lineJoin = 'round'; X.strokeStyle = col; X.lineWidth = w * .7; curve(q); X.stroke(); X.restore();
  p4Line(q, w * .95, p4Shade(col, -.12), .9, 403, false, { passes: 3, rough: .7 });
  if (o.tip && k < 1) { const p = q[q.length - 1]; inkShape(ellPts(p[0], p[1], w * .8, w * .8, 9), col, 0, .5, 405); }
};
window.tack = function (x, y, s = 1, o = {}) {
  const r = 17 * s, pressed = o.pressed ?? 1, lift = (1 - pressed) * 26 * s;
  X.save(); X.translate(x, y);
  shadowBlob(lift * .4 + 3 * s, 6 * s + lift * .2, r * (1 + lift / 60), r * .55, .25 * (o.alpha ?? 1));
  X.translate(0, -lift); X.globalAlpha *= o.alpha ?? 1;
  const col = o.col || PAL.brass;
  X.save(); X.beginPath(); X.ellipse(0, 0, r, r * .92, 0, 0, 7); X.fillStyle = p4Shade(col, .35); X.fill(); X.restore();
  p4Fill(() => { X.beginPath(); X.ellipse(0, 0, r, r * .92, 0, 0, 7); }, col, { wash: .55, shade: .35 });
  X.save(); X.globalAlpha *= .75; X.fillStyle = '#fffaf0'; X.beginPath(); X.ellipse(-r * .3, -r * .35, r * .26, r * .16, -.5, 0, 7); X.fill(); X.restore();
  p4Line(ellPts(0, 0, r, r * .92, 12), 2.4 * s, P4.line, .4 * s, 78, true);
  X.restore();
};

// ---------- type: computer type, crisp (no displacement boil), one fixed variant ----------
const _slab0 = window.slabCanvas;
// gfx.js word() picks variant v from boilStep; force v=0 so letters never jitter
const _word0 = window.word;
window.word = function (text, x, y, size, o = {}) { return _word0(text, x, y, size, { ...o, seed: -(boilStep(T) % 3) }); };

// ---------- post: real paper + pencil tooth unifying everything (type is drawn afterwards, crisp) ----------
let _tooth = null;
function p4Tooth(W, H) {
  // white specks where the paper's tooth shows through pigment: derived from the scanned soft-shading swatch
  const src = IMG.tex_soft; if (!src) return null;
  const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
  const tile = document.createElement('canvas'); const T0 = Math.round(1024 * S * 1.1); tile.width = tile.height = T0;
  const tg = tile.getContext('2d'); tg.drawImage(src, 0, 0, src.width, src.height, 0, 0, T0, T0);
  const id = tg.getImageData(0, 0, T0, T0), d = id.data;
  for (let i = 0; i < d.length; i += 4) { const L = (d[i] + d[i + 1] + d[i + 2]) / 765; const a = clamp((L - .62) * 3.2); d[i] = d[i + 1] = d[i + 2] = 255; d[i + 3] = a * 255; }
  tg.putImageData(id, 0, 0);
  for (let y = 0; y < H; y += T0) for (let x = 0; x < W; x += T0) g.drawImage(tile, x, y);
  return c;
}
const _post0 = window.post;
window.post = function (o = {}) {
  // no screen-locked paper / grain / tooth overlays — paper texture lives on the drawn paper itself (plate('paper'))
  // and moves with the camera. Only a very soft vignette remains.
  _post0({ ...o, paper: 0, grain: 0, vign: (o.vign ?? .55) * .45 });
};

// plates draw as-is; their own drawn texture zooms with the camera

Object.assign(window, { P4, p4Fill, p4Line, p4Pat, p4Shade, p4Mask });
