// gfx.js — canvas, assets, boiled sprites, paper & post, ink primitives, thread, cards, tacks, stamps, type.
'use strict';
let CV, X, S = 1, T = 0;                 // main canvas, ctx, design→pixel scale, current time
const IMG = {};                          // name → HTMLImageElement
const PAL = {
  ink: '#2a1d14', inkSoft: '#4a3628', cream: '#f7efdc', paper: '#f3e8cf', red: '#d23a26', redDk: '#8f2316',
  brass: '#d6a43c', brassDk: '#8a6420', lemon: '#f6d54a', coral: '#ee7a5c', teal: '#4fae9e', sage: '#a9cf94',
  lilac: '#b9a0cc', blue: '#7aa6d6', rose: '#e7b7ae', plum: '#7d4a5e', mustard: '#d9ab3a',
  dusk: '#26305a', night: '#1b2140', peach: '#f6c39a', cork: '#c99a63',
};

// ---------- assets ----------
const loadImages = (list) => Promise.all(list.map(([k, src]) => new Promise((res) => {
  const im = new Image(); im.onload = () => { IMG[k] = im; res(); }; im.onerror = () => { console.error('missing', src); res(); }; im.src = src;
})));

// Boiled sprite variants: SVG displacement filter baked once per (sprite, variant), LRU cached.
const BOILN = 3, bake = new Map();
function boiled(name, v) {
  const key = name + '|' + v;
  let c = bake.get(key);
  if (c) { bake.delete(key); bake.set(key, c); return c; }
  const im = IMG[name]; if (!im) return null;
  const pad = 8, sc = Math.min(1, 1600 / Math.max(im.width, im.height));
  c = document.createElement('canvas');
  c.width = Math.round(im.width * sc) + pad * 2; c.height = Math.round(im.height * sc) + pad * 2;
  const g = c.getContext('2d');
  g.filter = `url(#boil${v})`;
  g.drawImage(im, pad, pad, im.width * sc, im.height * sc);
  g.filter = 'none';
  c._pad = pad; c._sc = sc;
  bake.set(key, c);
  if (bake.size > 64) bake.delete(bake.keys().next().value);
  return c;
}

// Draw sprite. (x,y) anchor in design units; h = drawn height of the *image* in design units.
function spr(name, x, y, h, o = {}) {
  const im = IMG[name]; if (!im) return;
  const ax = o.ax ?? .5, ay = o.ay ?? 1, a = o.alpha ?? 1;
  if (a <= 0) return;
  const st = boilStep(T) + (o.seed || 0);
  const src = o.boil === false ? null : boiled(name, ((st % BOILN) + BOILN) % BOILN);
  const w = h * im.width / im.height;
  X.save();
  X.globalAlpha *= a;
  const jx = o.boil === false ? 0 : wob(T, 11 + (o.seed || 0), .6), jy = o.boil === false ? 0 : wob(T, 23 + (o.seed || 0), .6);
  X.translate(x + jx, y + jy);
  if (o.rot) X.rotate(o.rot);
  X.scale((o.flip ? -1 : 1) * (o.sx ?? 1), o.sy ?? 1);
  if (o.shadow) {                                      // soft contact shadow under feet
    X.save(); X.globalAlpha *= .22 * o.shadow; X.fillStyle = PAL.ink;
    X.beginPath(); X.ellipse(0, 0, w * .32, h * .025, 0, 0, Math.PI * 2); X.fill(); X.restore();
  }
  if (src) {
    const k = h / (im.height * src._sc), p = src._pad * k;
    X.drawImage(src, -ax * w - p, -ay * h - p, src.width * k, src.height * k);
  } else X.drawImage(im, -ax * w, -ay * h, w, h);
  X.restore();
}
// cover-fit a background plate into the design frame with optional camera on it
function plate(name, o = {}) {
  const im = IMG[name]; if (!im) return;
  const z = o.z ?? 1, cx = o.cx ?? .5, cy = o.cy ?? .5;
  const sc = Math.max(DW / im.width, DH / im.height) * z;
  const w = im.width * sc, h = im.height * sc;
  X.save(); if (o.alpha != null) X.globalAlpha *= o.alpha;
  X.drawImage(im, DW / 2 - cx * w, DH / 2 - cy * h, w, h);
  X.restore();
}

// Draw a background under the SAME camera as the foreground so the set moves with the action (not a floating backdrop).
// c = [x, y, z, r] exactly as passed to cam(); par = how much of the move the background takes (1 = locked to world,
// .7-.9 = gentle parallax depth); over = fixed overscan so edges never show for this shot's camera range.
// draw = plate name (string) or a function that paints the design frame (0..DW, 0..DH) e.g. () => paperBG('#fde3c8', .6).
function bgCam(draw, c = [960, 540, 1, 0], o = {}) {
  const par = o.par ?? .85, over = o.over ?? 1.12;
  const [x, y, z = 1, r = 0] = c;
  X.save();
  X.translate(DW / 2, DH / 2); X.scale(1 + (z - 1) * par, 1 + (z - 1) * par); X.rotate(r * par);
  X.translate(-(DW / 2 + (x - DW / 2) * par), -(DH / 2 + (y - DH / 2) * par));
  X.translate(DW / 2, DH / 2); X.scale(over, over); X.translate(-DW / 2, -DH / 2);
  if (typeof draw === 'string') plate(draw, o); else draw();
  X.restore();
}

// ---------- paper, colour, post ----------
let grainC = null, vignC = null;
function makePost(W, H) {
  grainC = document.createElement('canvas'); grainC.width = W; grainC.height = H;
  const g = grainC.getContext('2d'), id = g.createImageData(W, H), d = id.data;
  let s = 1234567;
  for (let i = 0; i < d.length; i += 4) {
    s = (s * 1103515245 + 12345) & 0x7fffffff; const r = s / 0x7fffffff;
    const v = 255 - (r < .5 ? r * r * 60 : 0);
    d[i] = d[i + 1] = v; d[i + 2] = v - 2; d[i + 3] = 255;
  }
  g.putImageData(id, 0, 0);
  vignC = document.createElement('canvas'); vignC.width = W; vignC.height = H;
  const v = vignC.getContext('2d'), rg = v.createRadialGradient(W / 2, H * .48, H * .35, W / 2, H / 2, W * .72);
  rg.addColorStop(0, '#ffffff'); rg.addColorStop(1, '#c9b49a');
  v.fillStyle = rg; v.fillRect(0, 0, W, H);
}
function paperBG(col = null, k = 1) {      // cream paper, optionally washed with a flat colour
  plate('paper');
  if (col) { X.save(); X.globalCompositeOperation = 'multiply'; X.globalAlpha = k; X.fillStyle = col; X.fillRect(-10, -10, DW + 20, DH + 20); X.restore(); }
}
function post(o = {}) {                      // paper tooth + grain + vignette over everything
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0);
  X.globalCompositeOperation = 'multiply';
  if (IMG.paper && o.paper !== 0) { X.globalAlpha = o.paper ?? .55; X.drawImage(IMG.paper, 0, 0, CV.width, CV.height); }
  X.globalAlpha = o.grain ?? .5; X.drawImage(grainC, 0, 0);
  X.globalAlpha = o.vign ?? .55; X.drawImage(vignC, 0, 0);
  X.restore();
}

// ---------- ink primitives ----------
// Smooth path through points with stepped boil. pts: [[x,y],...]
function wobbled(pts, amp, seed) {
  return pts.map((p, i) => [p[0] + wob(T, seed + i * 7.1, amp), p[1] + wob(T, seed + i * 3.7 + 99, amp)]);
}
function curve(pts, closed = false) {
  X.beginPath();
  if (pts.length < 3) { X.moveTo(pts[0][0], pts[0][1]); for (const p of pts.slice(1)) X.lineTo(p[0], p[1]); if (closed) X.closePath(); return; }
  const n = pts.length, P = i => pts[closed ? (i + n) % n : clamp(i, 0, n - 1)];
  X.moveTo(...(closed ? mid(P(-1), P(0)) : P(0)));
  for (let i = 0; i < (closed ? n : n - 1); i++) {
    const m = mid(P(i), P(i + 1));
    X.quadraticCurveTo(P(i)[0], P(i)[1], m[0], m[1]);
  }
  if (!closed) X.lineTo(...P(n - 1)); else X.closePath();
}
const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
function inkLine(pts, w = 4, col = PAL.ink, amp = 1.2, seed = 1, closed = false) {
  X.save(); X.lineCap = X.lineJoin = 'round'; X.strokeStyle = col; X.lineWidth = w;
  curve(wobbled(pts, amp, seed), closed); X.stroke(); X.restore();
}
function inkShape(pts, fill, w = 4, amp = 1.2, seed = 1, col = PAL.ink) {
  const q = wobbled(pts, amp, seed);
  X.save(); X.lineCap = X.lineJoin = 'round';
  if (fill) { X.fillStyle = fill; curve(q, true); X.fill(); }
  if (w) { X.strokeStyle = col; X.lineWidth = w; curve(wobbled(pts, amp, seed + 50), true); X.stroke(); }
  X.restore();
}
const rectPts = (x, y, w, h, r = 10, n = 3) => {   // rounded-ish rectangle polygon with n pts/edge
  const p = [];
  const edge = (ax, ay, bx, by) => { for (let i = 0; i < n; i++) p.push([lerp(ax, bx, i / n), lerp(ay, by, i / n)]); };
  edge(x + r, y, x + w - r, y); p.push([x + w, y + r * .3]); edge(x + w, y + r, x + w, y + h - r); p.push([x + w - r * .3, y + h]);
  edge(x + w - r, y + h, x + r, y + h); p.push([x, y + h - r * .3]); edge(x, y + h - r, x, y + r); p.push([x + r * .3, y]);
  return p;
};
const ellPts = (cx, cy, rx, ry, n = 16) => Array.from({ length: n }, (_, i) => [cx + Math.cos(i / n * Math.PI * 2) * rx, cy + Math.sin(i / n * Math.PI * 2) * ry]);
function shadowBlob(x, y, rx, ry, a = .2) { X.save(); X.globalAlpha *= a; X.fillStyle = PAL.ink; X.beginPath(); X.ellipse(x, y, rx, ry, 0, 0, 7); X.fill(); X.restore(); }

// ---------- thread ----------
// Polyline length helpers
function plen(pts) { let L = 0; for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return L; }
function ptrim(pts, k) {                    // first k (0..1) of polyline by length
  if (k >= 1) return pts; const L = plen(pts) * k; const out = [pts[0]]; let acc = 0;
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    if (acc + d >= L) { const f = (L - acc) / (d || 1); out.push([lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)]); return out; }
    acc += d; out.push(pts[i]);
  }
  return out;
}
function pAt(pts, k) { const q = ptrim(pts, clamp(k, 0.0001, 1)); return q[q.length - 1]; }
// Dense curve sampled through control points (Catmull-Rom)
function spline(ctrl, per = 14) {
  if (ctrl.length < 2) return ctrl.slice();
  const out = [], n = ctrl.length, P = i => ctrl[clamp(i, 0, n - 1)];
  for (let i = 0; i < n - 1; i++) for (let s = 0; s < per; s++) {
    const u = s / per, p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
    const f = (a, b, c, d) => .5 * ((2 * b) + (-a + c) * u + (2 * a - 5 * b + 4 * c - d) * u * u + (-a + 3 * b - 3 * c + d) * u * u * u);
    out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
  }
  out.push(ctrl[n - 1]); return out;
}
// Sagging span between two pins. slack: 0 = taut.
function sag(a, b, slack = .12, n = 10) {
  const L = Math.hypot(b[0] - a[0], b[1] - a[1]), out = [];
  for (let i = 0; i <= n; i++) { const u = i / n; out.push([lerp(a[0], b[0], u), lerp(a[1], b[1], u) + Math.sin(u * Math.PI) * L * slack]); }
  return out;
}
// The red thread: twisted string look (body + dark edge + twist ticks). w in design units.
function thread(pts, o = {}) {
  if (pts.length < 2) return;
  const w = o.w ?? 9, col = o.col ?? PAL.red, k = o.k ?? 1;
  let q = k < 1 ? ptrim(pts, k) : pts;
  if (q.length < 2) return;
  q = q.map((p, i) => [p[0] + wob(T, i * 1.3 + 400, .5), p[1] + wob(T, i * 2.1 + 500, .5)]);
  X.save(); X.lineCap = X.lineJoin = 'round';
  if (o.shadow !== 0) { X.save(); X.globalAlpha *= .18; X.strokeStyle = PAL.ink; X.lineWidth = w; X.translate(w * .45, w * .9); curve(q); X.stroke(); X.restore(); }
  X.strokeStyle = PAL.redDk; X.lineWidth = w + 3; curve(q); X.stroke();
  X.strokeStyle = col; X.lineWidth = w; curve(q); X.stroke();
  X.setLineDash([w * .5, w * 1.1]); X.lineDashOffset = 0; X.strokeStyle = 'rgba(255,220,200,.35)'; X.lineWidth = w * .35; curve(q); X.stroke();
  X.restore();
  if (o.tip && k < 1) { const p = q[q.length - 1]; X.save(); X.fillStyle = PAL.red; X.beginPath(); X.arc(p[0], p[1], w * .8, 0, 7); X.fill(); X.restore(); }
}

// ---------- tack ----------
function tack(x, y, s = 1, o = {}) {
  const r = 17 * s, pressed = o.pressed ?? 1;            // pressed 0..1 (lifts a bit before)
  const lift = (1 - pressed) * 26 * s;
  X.save(); X.translate(x, y);
  shadowBlob(lift * .4 + 3 * s, 6 * s + lift * .2, r * (1 + lift / 60), r * .55, .25 * (o.alpha ?? 1));
  X.translate(0, -lift);
  X.globalAlpha *= o.alpha ?? 1;
  inkShape(ellPts(0, 0, r, r * .92, 12), o.col || PAL.brass, 3.2 * s, .6 * s, 77);
  X.fillStyle = 'rgba(255,245,200,.75)'; X.beginPath(); X.ellipse(-r * .3, -r * .35, r * .32, r * .2, -.5, 0, 7); X.fill();
  X.fillStyle = 'rgba(80,50,10,.25)'; X.beginPath(); X.ellipse(r * .2, r * .3, r * .55, r * .35, .3, 0, 7); X.fill();
  X.restore();
}

// ---------- clue cards ----------
const GLYPH = {
  '?': (s) => { inkLine([[-14, -18], [-8, -30], [8, -30], [16, -18], [12, -6], [0, 2], [0, 12]].map(p => [p[0] * s, p[1] * s]), 7 * s, PAL.ink, .8, 31); dot(0, 26 * s, 5 * s); },
  tube: (s) => { inkShape([[-9, -34], [9, -34], [9, 18], [0, 28], [-9, 18]].map(p => [p[0] * s, p[1] * s]), '#fff7e8', 4 * s, .6, 41); inkShape([[-9, 2], [9, 2], [9, 18], [0, 28], [-9, 18]].map(p => [p[0] * s, p[1] * s]), PAL.coral, 0, .6, 42); inkLine([[-14, -34], [14, -34]].map(p => [p[0] * s, p[1] * s]), 5 * s); },
  heart: (s) => { inkLine([[-34, 4], [-16, 4], [-9, -12], [-2, 22], [6, -26], [12, 4], [34, 4]].map(p => [p[0] * s, p[1] * s]), 5 * s, PAL.red, .7, 51); },
  drop: (s) => { inkShape([[0, -28], [12, -6], [16, 8], [8, 22], [-8, 22], [-16, 8], [-12, -6]].map(p => [p[0] * s, p[1] * s]), PAL.coral, 4 * s, .7, 61); },
  bulb: (s) => { inkShape(ellPts(0, -6 * s, 17 * s, 18 * s, 12), PAL.lemon, 4 * s, .6, 71); inkShape(rectPts(-8 * s, 12 * s, 16 * s, 12 * s, 3, 2), '#cfc3a8', 3.5 * s, .5, 72); },
  tick: (s) => { inkLine([[-18, 0], [-5, 14], [20, -18]].map(p => [p[0] * s, p[1] * s]), 8 * s, '#3c8a5c', .7, 81); },
  cross: (s) => { inkLine([[-16, -16], [16, 16]].map(p => [p[0] * s, p[1] * s]), 8 * s, PAL.red, .7, 91); inkLine([[16, -16], [-16, 16]].map(p => [p[0] * s, p[1] * s]), 8 * s, PAL.red, .7, 92); },
  steth: (s) => { inkLine([[-14, -26], [-14, -2], [0, 14], [14, -2], [14, -26]].map(p => [p[0] * s, p[1] * s]), 4.5 * s, PAL.ink, .6, 101); inkLine([[0, 14], [0, 22], [18, 28]].map(p => [p[0] * s, p[1] * s]), 4.5 * s, PAL.ink, .6, 102); inkShape(ellPts(22 * s, 28 * s, 8 * s, 8 * s, 10), PAL.brass, 3.5 * s, .5, 103); },
  pill: (s) => { X.save(); X.rotate(-.6); inkShape(rectPts(-24 * s, -10 * s, 24 * s, 20 * s, 9 * s, 2), PAL.teal, 4 * s, .5, 111); inkShape(rectPts(0, -10 * s, 24 * s, 20 * s, 9 * s, 2), '#fff7e8', 4 * s, .5, 112); X.restore(); },
  thermo: (s) => { inkShape(rectPts(-6 * s, -30 * s, 12 * s, 44 * s, 5 * s, 3), '#fff7e8', 4 * s, .5, 121); inkShape(ellPts(0, 20 * s, 11 * s, 11 * s, 10), PAL.red, 4 * s, .5, 122); inkLine([[0, 12 * s], [0, -14 * s]], 5 * s, PAL.red, .4, 123); },
  dollar: (s) => { X.save(); X.font = `${62 * s}px FB`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = '#3c8a5c'; X.fillText('$', 0, 2 * s); X.restore(); },
  xray: (s) => { const P = (a) => a.map(p => [p[0] * s, p[1] * s]);
    inkShape(P(rectPts(-30, -34, 60, 62, 4, 3)), '#2c3746', 3.5 * s, .5, 131);
    inkShape(P(ellPts(-12, -6, 11, 20, 12)), '#55657a', 0, .5, 132); inkShape(P(ellPts(12, -6, 11, 20, 12)), '#55657a', 0, .5, 133);
    inkLine(P([[0, -28], [0, 22]]), 3.5 * s, '#e9eef2', .3, 134);
    for (let i = 0; i < 4; i++) { const y = -20 + i * 9; inkLine(P([[-2, y], [-14, y - 3], [-22, y + 4]]), 2.4 * s, '#dfe7ee', .3, 135 + i); inkLine(P([[2, y], [14, y - 3], [22, y + 4]]), 2.4 * s, '#dfe7ee', .3, 140 + i); }
    inkLine(P([[-26, 18], [-10, 14]]), 2 * s, '#cdd6de', .3, 145); inkLine(P([[26, 18], [10, 14]]), 2 * s, '#cdd6de', .3, 146); },
  ct: (s) => { const P = (a) => a.map(p => [p[0] * s, p[1] * s]);
    inkShape(P(rectPts(-34, 12, 68, 9, 3, 2)), '#cfc3a8', 3 * s, .4, 151);
    inkShape(P(ellPts(0, -8, 30, 30, 18)), '#e9e4d8', 4 * s, .6, 152); inkShape(P(ellPts(0, -6, 14, 14, 14)), '#3a3f4a', 3 * s, .4, 153);
    inkLine(P([[-34, 4], [34, 4]]), 4 * s, PAL.teal, .3, 154); dot(18 * s, -30 * s, 3 * s); },
  mri: (s) => { const P = (a) => a.map(p => [p[0] * s, p[1] * s]);
    inkShape(P(rectPts(-30, -34, 60, 62, 6, 3)), '#23262f', 3.5 * s, .5, 161);
    inkShape(P(ellPts(0, -3, 21, 25, 16)), '#9aa1ad', 0, .6, 162);
    inkLine(P([[0, -26], [0, 20]]), 2 * s, '#e9e9ee', .3, 163);
    [[-14, -14, -6, -10, -12, -4], [-15, 4, -6, 0, -12, 10], [14, -14, 6, -10, 12, -4], [15, 4, 6, 0, 12, 10]].forEach((q, i) => inkLine(P([[q[0], q[1]], [q[2], q[3]], [q[4], q[5]]]), 2 * s, '#e9e9ee', .4, 164 + i)); },
  slide: (s) => { const P = (a) => a.map(p => [p[0] * s, p[1] * s]);
    X.save(); X.rotate(-.35); inkShape(P(rectPts(-38, -14, 76, 28, 3, 3)), '#dcecf1', 3.5 * s, .4, 171);
    inkShape(P(rectPts(-36, -12, 16, 24, 2, 2)), '#f3f0e6', 2 * s, .3, 172);
    inkShape(P(ellPts(10, 0, 18, 10, 14)), '#e7b7ae', 0, .7, 173);
    [[4, -3], [14, 2], [20, -4], [8, 5], [-1, 2], [17, 6]].forEach(([x, y], i) => { X.save(); X.fillStyle = '#7d4a7e'; X.beginPath(); X.arc(x * s, y * s, 2.3 * s, 0, 7); X.fill(); X.restore(); });
    X.restore(); },
  dna: (s) => { const A = [], B = [];
    for (let i = 0; i <= 16; i++) { const y = -32 + i * 4, x = Math.sin(i / 16 * Math.PI * 2.2) * 15; A.push([x * s, y * s]); B.push([-x * s, y * s]); }
    for (let i = 1; i < 16; i += 2) inkLine([A[i], B[i]], 2.5 * s, i % 4 === 1 ? PAL.mustard : PAL.lilac, .3, 180 + i);
    inkLine(A, 4.5 * s, PAL.red, .4, 178); inkLine(B, 4.5 * s, PAL.teal, .4, 179); },
  flask: (s) => { const P = (a) => a.map(p => [p[0] * s, p[1] * s]);
    const shell = P([[-7, -34], [7, -34], [7, -12], [24, 22], [-24, 22], [-7, -12]]);
    inkShape(shell, '#fff7e8', 0, .6, 191);
    X.save(); curve(wobbled(P([[-5.5, -32], [5.5, -32], [5.5, -12.5], [21.5, 20.5], [-21.5, 20.5], [-5.5, -12.5]]), .6, 191), true); X.clip();   // liquid stays inside the glass
    inkShape(P([[-15, 4], [15, 4], [26, 24], [-26, 24]]), PAL.teal, 0, .6, 192);
    [[-6, 12, 3], [5, 8, 2.4], [0, -4, 2]].forEach(([x, y, r]) => { X.save(); X.strokeStyle = PAL.ink; X.lineWidth = 2 * s; X.beginPath(); X.arc(x * s, y * s, r * s, 0, 7); X.stroke(); X.restore(); });
    X.restore();
    inkShape(shell, null, 4 * s, .6, 191);                                       // outline last, on top of the liquid
    inkLine(P([[-11, -34], [11, -34]]), 5 * s, PAL.ink, .3, 193); },
  blank: () => {},
};
function dot(x, y, r) { X.save(); X.fillStyle = PAL.ink; X.beginPath(); X.arc(x, y, r, 0, 7); X.fill(); X.restore(); }
// Card centred at (x,y). o: {w,h,rot,glyph,flip(0..1 spin: back shows when >.5),stock,tint,ink}
function card(x, y, o = {}) {
  const w = o.w ?? 150, h = o.h ?? 190, sc = o.s ?? 1;
  const flip = o.flip ?? 0, cosf = Math.cos(flip * Math.PI), back = cosf < 0;
  X.save(); X.translate(x, y); X.rotate(o.rot ?? 0); X.scale(sc * Math.max(.02, Math.abs(cosf)) * (o.sx ?? 1), sc * (o.sy ?? 1));
  X.globalAlpha *= o.alpha ?? 1;
  if (o.shadow !== 0) shadowBlob(10, 14, w * .52, h * .52, .16 * (o.shadow ?? 1));
  const stock = back ? (o.backCol || '#eadcbc') : (o.stock || PAL.cream);
  inkShape(rectPts(-w / 2, -h / 2, w, h, 9, 3), stock, 3.6, 1.1, (o.seed || 3) * 13);
  if (back && o.backGlyph !== false && w >= 120) { X.save(); X.globalAlpha *= .55; X.translate(0, 6); GLYPH['?'](Math.min(w, h) / 110); X.restore(); }
  if (!back) {
    if (o.lines !== false) {   // ruled lines drawn as soft coloured pencil (p4Line, pencil.js)
      X.save(); X.globalAlpha *= .8;
      const L = window.p4Line, sd = (o.seed || 3) * 13;
      if (L) { L([[-w / 2 + 8, -h / 2 + 26], [w / 2 - 8, -h / 2 + 26]], 2.4, '#d0574a', .5, sd + 1, false, { passes: 1 });
        for (let i = 1; i < 6; i++) { const yy = -h / 2 + 26 + i * (h - 34) / 6; L([[-w / 2 + 8, yy], [w / 2 - 8, yy]], 2.0, '#86a8c4', .5, sd + 1 + i, false, { passes: 1 }); } }
      X.restore();
    }
    if (o.glyph && GLYPH[o.glyph]) { X.save(); X.translate(0, 10); GLYPH[o.glyph](Math.min(w, h) / 120); X.restore(); }
    if (o.text) { X.save(); X.fillStyle = PAL.ink; X.font = `${o.fs || 34}px SH`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText(o.text, 0, 12); X.restore(); }
  }
  X.restore();
}

// ---------- type ----------
const typeCache = new Map();
// Cut-paper word: coloured letters with lifted shadow + ink edge. Cached per (text,size,col,variant).
function slabCanvas(text, size, col, font, v, edge) {
  const key = [text, size, col, font, v, edge].join('|');
  let c = typeCache.get(key); if (c) return c;
  const px = size * S;
  const m = document.createElement('canvas').getContext('2d'); m.font = `${px}px ${font}`;
  const tw = m.measureText(text).width, pad = px * .35;
  c = document.createElement('canvas'); c.width = Math.ceil(tw + pad * 2); c.height = Math.ceil(px * 1.5 + pad);
  const g = c.getContext('2d'); g.font = `${px}px ${font}`; g.textBaseline = 'alphabetic';
  const bx = pad, by = pad * .5 + px * 1.0;
  g.filter = 'none';   // lyric type stays crisp (no displacement boil)
  g.fillStyle = 'rgba(42,29,20,.30)'; g.fillText(text, bx + px * .045, by + px * .06);   // lifted shadow
  if (edge) { g.lineJoin = 'round'; g.strokeStyle = PAL.ink; g.lineWidth = px * .045; g.strokeText(text, bx, by); }
  g.fillStyle = col; g.fillText(text, bx, by);
  g.filter = 'none';
  if (IMG.paper) {
    const m2 = document.createElement('canvas'); m2.width = c.width; m2.height = c.height; m2.getContext('2d').drawImage(c, 0, 0);
    g.globalCompositeOperation = 'multiply'; g.globalAlpha = .7;
    g.drawImage(IMG.paper, (v * 517) % 900, (v * 311) % 500, Math.min(c.width, IMG.paper.width - 900), Math.min(c.height, IMG.paper.height - 500), 0, 0, c.width, c.height);
    g.globalCompositeOperation = 'destination-in'; g.globalAlpha = 1; g.drawImage(m2, 0, 0); g.globalCompositeOperation = 'source-over';
  }
  c._w = tw / S; c._pad = pad / S; c._base = by / S; c._h = c.height / S;
  typeCache.set(key, c); if (typeCache.size > 300) typeCache.delete(typeCache.keys().next().value);
  return c;
}
const measure = (text, size, font = 'FB') => { X.save(); X.font = `${size}px ${font}`; const w = X.measureText(text).width; X.restore(); return w; };
// Draw word with baseline-left at (x,y). o: {col,font,rot,s,sx,sy,alpha,edge,ax(0..1 of width)}
// TYPE_MODE: '' draw now | 'skip' (blur pass: leave type out) | 'record' (collect type ops to draw above the blur).
// seek() uses this during whip-pans so the lyrics stay crisp while everything else is motion-smeared (film.html).
let TYPE_MODE = '', TYPE_OPS = [];
function word(text, x, y, size, o = {}) {
  if ((o.alpha ?? 1) <= 0 || (o.s ?? 1) <= 0) return 0;
  if (TYPE_MODE && !o.bake) {
    if (TYPE_MODE === 'record') TYPE_OPS.push([X.getTransform(), X.globalAlpha, text, x, y, size, o]);
    return measure(text, size, o.font || 'FB');
  }
  const v = ((boilStep(T) + (o.seed || 0)) % 3 + 3) % 3;
  const c = slabCanvas(text, size, o.col || PAL.ink, o.font || 'FB', v, o.edge ?? false);
  const ax = (o.ax ?? 0) * c._w;
  X.save(); X.globalAlpha *= o.alpha ?? 1; X.translate(x, y - size * .32);
  X.rotate(o.rot || 0); X.scale((o.s ?? 1) * (o.sx ?? 1), (o.s ?? 1) * (o.sy ?? 1));
  X.drawImage(c, -ax - c._pad, -c._base + size * .32, c.width / S, c.height / S);
  X.restore();
  return c._w;
}
// SLAM: word lands at t0 with overshoot squash, slight random tilt. Returns width.
const VLEAD = .035;                      // visual hits lead the audio by ~1 frame so they read as on the beat
function slam(text, x, y, size, t0, o = {}) {
  t0 -= VLEAD;
  if (T < t0 - .02) return measure(text, size, o.font);
  const dt = T - t0, k = spring(dt, o.f ?? 3.4, o.z ?? .42);
  const s = lerp(o.from ?? 1.9, 1, k), sq = 1 + kick(dt, 14) * .18;
  const rot = (o.rot ?? (hash(text.length * 3.3 + t0) - .5) * .08) * (1 + kick(dt, 6) * 2);
  return word(text, x, y, size, { ...o, s, sx: sq, sy: 1 / sq, rot, alpha: (o.alpha ?? 1) * clamp(dt / .05), ax: o.ax ?? .5 });
}
// HAND: handwritten line written on left→right between t0 and t1, held, then fades at t2
function hand(text, x, y, size, t0, t1, o = {}) {
  if (T < t0) return;
  const k = E.ioS(prog(T, t0, t1)), font = o.font || 'SH';
  const w = measure(text, size, font), x0 = x - (o.align === 'left' ? 0 : w / 2);
  X.save(); X.globalAlpha *= (o.alpha ?? 1) * (o.t2 ? vanish(T, o.t2, .25) : 1);
  X.beginPath(); X.rect(x0 - 20, y - size * 1.4, (w + 40) * k, size * 2.2); X.clip();
  if (o.bg) { X.fillStyle = o.bg; X.fillRect(x0 - 24, y - size * 1.05, w + 48, size * 1.5); }
  word(text, x0, y, size, { col: o.col || PAL.ink, font, seed: 5, bake: true });
  X.restore();
  if (k > 0 && k < 1 && o.pencil !== false) {           // pencil tip at the writing head
    const px = x0 + w * k, py = y - size * .2 + Math.sin(T * 40) * 3;
    X.save(); X.translate(px, py); X.rotate(.7); inkShape(rectPts(-5, -60, 10, 54, 2, 2), PAL.lemon, 2.5, .4, 7); inkShape([[-5, -6], [5, -6], [0, 6]], '#e8c9a0', 2.5, .3, 8); X.restore();
  }
}
// Row of slammed words laid out by measurement, centred on cx. items: [[text, t0, {col,edge,size}], ...]
function row(items, cx, y, size, o = {}) {
  const font = o.font || 'FB';
  let k = 1;
  const meas = (kk) => { const ws = items.map(([w, , oo]) => measure(w, ((oo && oo.size) || size) * kk, (oo && oo.font) || font)); return [ws, ws.reduce((a, b) => a + b, 0) + size * kk * (o.gap ?? .26) * (ws.length - 1)]; };
  let [ws, total] = meas(1);
  const maxW = o.maxW ?? 1760;
  if (total > maxW) { k = maxW / total; [ws, total] = meas(k); }
  const gap = size * k * (o.gap ?? .26);
  let x = cx - total * (o.align === 'left' ? 0 : o.align === 'right' ? 1 : .5);
  if (o.clamp !== false) x = clamp(x, 70, DW - 70 - total);
  items.forEach(([w, t0, oo = {}], i) => {
    const hero = oo.hero ?? false;
    slam(w, x + ws[i] / 2, y, ((oo.size) || size) * k, t0, { font, ...o, ...oo, from: hero ? (oo.from ?? o.from ?? 1.9) : Math.min(oo.from ?? o.from ?? 1.9, 1.4) });
    x += ws[i] + gap;
  });
  return total;
}

// Row on a cream tape strip that grows with the landed words (sized to the text).
function tapeRow(items, x, y, size, o, t) {
  // tape grows to cover exactly the words that have landed (positions mirror row()'s layout)
  const font = o.font || 'FB', gp = o.gap ?? .26;
  let ws = items.map(([w, , oo]) => measure(w, (oo && oo.size) || size, (oo && oo.font) || font));
  let total = ws.reduce((a, b) => a + b, 0) + size * gp * (ws.length - 1), k = 1;
  if (total > (o.maxW ?? 1760)) { k = (o.maxW ?? 1760) / total; ws = ws.map(w => w * k); total *= k; }
  let x0 = x - total * (o.align === 'left' ? 0 : o.align === 'right' ? 1 : .5); x0 = clamp(x0, 70, DW - 70 - total);
  let right = -1, cx = x0;
  items.forEach(([w, t0], i) => { const e = cx + ws[i]; if (t >= t0 - .05) right = Math.max(right, lerp(cx, e, E.outC(prog(t, t0 - .05, t0 + .06)))); cx = e + size * k * gp; });
  if (right > 0) {
    const pad = 30;
    X.save(); X.beginPath(); X.rect(x0 - pad - 10, y - size * 1.2, right - x0 + pad * 2 + 10, size * 1.8); X.clip();
    inkShape(rectPts(x0 - pad, y - size * k * .98, total + pad * 2, size * k * 1.32, 6, 4), '#fbf3df', 3, 1.3, 900 + Math.round(y));
    X.restore();
  }
  row(items, x, y, size, o);
}

// ---------- stamp ----------
function stamp(letter, x, y, size, t0, o = {}) {
  t0 -= VLEAD * .5;
  if (T < t0 - .12) return;
  const dt = T - t0;
  const down = dt < 0 ? E.inC(clamp((dt + .12) / .12)) : 1;            // stamp descends
  const sc = dt < 0 ? lerp(1.6, 1, down) : 1 + kick(dt, 18) * .06;
  const col = o.col || PAL.red;
  X.save(); X.translate(x, y); X.rotate(o.rot ?? -.06); X.scale(sc, sc);
  X.globalAlpha *= (dt < 0 ? down * .9 : 1) * (o.alpha ?? 1);
  const w = size * .95, h = size * 1.05;
  X.lineJoin = 'round';
  inkShape(rectPts(-w / 2, -h / 2, w, h, 18, 3), null, size * .06, 2, 300 + letter.charCodeAt(0), col);
  word(letter, 0, size * .34, size * .85, { col, font: 'FB', ax: .5, seed: letter.charCodeAt(0), bake: true });
  X.restore();
}

Object.assign(window, { takeTypeOps: () => { const o = TYPE_OPS; TYPE_OPS = []; return o; }, putTypeOps: (o) => { TYPE_OPS = o; }, replayType: () => { const ops = TYPE_OPS; TYPE_OPS = []; TYPE_MODE = ''; for (const [m, a, ...args] of ops) { X.save(); X.setTransform(m); X.globalAlpha = a; word(...args); X.restore(); } }, setTypeMode: (m) => { TYPE_MODE = m; if (m === 'record') TYPE_OPS = []; }, PAL, IMG, loadImages, spr, plate, paperBG, post, makePost, inkLine, inkShape, rectPts, ellPts, shadowBlob,
  curve, wobbled, row, tapeRow, plen, ptrim, pAt, spline, sag, thread, tack, card, GLYPH, word, slam, hand, measure, stamp, dot });
