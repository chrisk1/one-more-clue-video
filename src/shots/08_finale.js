// 08_finale.js — CHORUS 2 + OUTRO (101.557 – 136.8): "One more clue, let it come through ... One more clue. Imagine what
// we could do.", then the curtain call, the brass section and the diagnostic journey board with the title card.
// Rhymes with chorus 1 and escalates. c2web (104.357) and c2imagine (110.71) cut in from 09_finale_extras.js.
(() => {
'use strict';
const L30 = LINES[30].words, L32 = LINES[32].words;
const STOCKS = [PAL.cream, '#fbe7a1', '#f8d3b8', '#d8ead0', '#d3e2f2', '#e3d6ee', '#f6d0c8'];
// ── soft coloured-pencil light: layered rubbed shapes with static wobbled edges (no gradients, no additive light) ──
const sw4 = (pts, seed, amp) => pts.map((p, i) => [p[0] + (hash2(i, seed) - .5) * 2 * amp, p[1] + (hash2(i, seed + 9) - .5) * 2 * amp]);
const SOFT = (a, wash = .7) => ({ alpha: a, wash, grain: .5, tex: 'tex_soft' });
// a pool of pale pencil light: n nested ellipses (densest in the middle, lightest toward the edge)
function softPool(x, y, rx, ry, col, a, seed, n = 4, core = .3) {
  if (a <= .004) return;
  const L = n * 2;                                       // many faint layers with lumpy, crossing edges = no visible bands
  for (let i = 0; i < L; i++) {
    const k = (1 - i / L * (1 - core)) * (1 + (hash2(i, seed) - .5) * .12), ox = (hash2(i, seed + 3) - .5) * rx * .08, oy = (hash2(i, seed + 4) - .5) * ry * .08;
    const pts = sw4(ellPts(x + ox, y + oy, rx * k, ry * k, 14), seed + i * 13, Math.min(rx, ry) * k * .1);
    p4Fill(() => curve(pts, true), col, { alpha: a / L * 1.15, wash: i < L / 3 ? .35 : .6, grain: .8, tex: 'tex_soft' });
  }
}
// pencil dimming round a lit ellipse: n nested holes cut from box [x0,y0,x1,y1], darkest far away (multiply)
function softShroud(x, y, rx, ry, col, a, seed, box, n = 4, spread = .35) {
  if (a <= .004) return;
  X.save(); X.globalCompositeOperation = 'multiply';
  const L = n * 2, sp = spread / 2;
  for (let i = 0; i < L; i++) {
    const k = (1 + i * sp) * (1 + (hash2(i, seed) - .5) * sp * .9), ox = (hash2(i, seed + 3) - .5) * rx * .06, oy = (hash2(i, seed + 4) - .5) * ry * .06;
    const pts = sw4(ellPts(x + ox, y + oy, rx * k, ry * k, 16), seed + i * 17, Math.min(rx, ry) * k * .09).reverse();
    p4Fill(() => { curve(pts, true); X.moveTo(box[0], box[1]); X.lineTo(box[2], box[1]); X.lineTo(box[2], box[3]); X.lineTo(box[0], box[3]); X.closePath(); }, col, { alpha: a / L, wash: i < L / 3 ? .45 : .75, grain: .7, tex: 'tex_soft' });
  }
  X.restore();
}
// sunburst as soft pencil rays: a faint rubbed wedge plus a bundle of long low-alpha pencil strokes per ray
function pencilRays(cx, cy, r0, r1, n, rot, col, a, seed, lw = 30) {
  if (a <= .004) return;
  X.save(); X.translate(cx, cy); X.rotate(rot);
  for (let i = 0; i < n; i++) {
    const a0 = i / n * Math.PI * 2, a1 = a0 + Math.PI / n, am = (a0 + a1) / 2, N = 7;
    const wedge = [[Math.cos(am) * r0 * .5, Math.sin(am) * r0 * .5]];
    for (let j = 0; j <= N; j++) { const aa = lerp(a0, a1, j / N), rr = r1 * (.94 + hash2(i * 9 + j, seed) * .06); wedge.push([Math.cos(aa) * rr, Math.sin(aa) * rr]); }
    const wq = sw4(wedge, seed + i * 5, 10);
    p4Fill(() => curve(wq, true), col, SOFT(a * .75, .6));
    for (let j = 0; j < 3; j++) {
      const ang = lerp(a0, a1, (j + .5) / 3) + (hash2(i, seed + j) - .5) * .03, ra = r0 * (.7 + hash2(j, seed + i) * .3), rb = r1 * (.8 + hash2(i + j, seed + 3) * .2);
      const pts = [0, .34, .67, 1].map(u => { const rr = lerp(ra, rb, u); return [Math.cos(ang) * rr, Math.sin(ang) * rr]; });
      p4Line(pts, lw * (.75 + hash2(i * 3 + j, seed + 7) * .5), col, .6, seed + i * 7 + j, false, { alpha: a * .55, rough: .5 });
    }
  }
  X.restore();
}
function pencilDashes(pts, on, off, w, col, seed) {            // dashed outline drawn as short pencil strokes
  const P = [...pts, pts[0]], c = col === PAL.ink ? P4.line : col === PAL.inkSoft ? P4.lineSoft : col;
  let d = 0, cur = [], k = 0;
  for (let i = 1; i < P.length; i++) {
    const [ax, ay] = P[i - 1], [bx, by] = P[i], L = Math.hypot(bx - ax, by - ay);
    for (let u = 0; u < L; u += 4) {
      const p = [ax + (bx - ax) * u / L, ay + (by - ay) * u / L], ph = d % (on + off);
      if (ph < on) cur.push(p); else if (cur.length) { if (cur.length > 1) p4Line(cur, w, c, .4, seed + k++, false, { rough: .5 }); cur = []; }
      d += 4;
    }
  }
  if (cur.length > 1) p4Line(cur, w, c, .4, seed + k, false, { rough: .5 });
}
const softDisc = (x, y, r, col, a, seed) => { const pts = sw4(ellPts(x, y, r, r, 10), seed, r * .12); p4Fill(() => curve(pts, true), col, { alpha: a, wash: .85, grain: .6, tex: 'tex_soft' }); };

// ── c2kill · 101.557 → 104.357  KILLING PART #2 + "let it COME THROUGH," (a pipe gushing cards at camera) ─────
const PIPE_H = 330, PIPE_W = PIPE_H * 3683 / 893, PIPE_X = 2240, PIPE_Y = 240;
const tLet = L30[3][1], tCome = L30[5][1], tThr = L30[6][1];
const EMIT = [];
for (let i = 0; i < 8; i++) EMIT.push(tLet + .06 + i * .065);
for (let i = 0; i < 12; i++) EMIT.push(tCome - .03 + i * .027);
for (let i = 0; i < 22; i++) EMIT.push(tThr - .03 + i * .011 * (1 + i * .08));
const STREAM = EMIT.map((te, i) => ({
  te, ang: lerp(-.25, Math.PI + .25, hash(i * 3.1 + 7)), spd: 230 + hash(i + 40) * 160, spin: (hash(i + 2) - .5) * 4,
  fr: (hash(i + 9) - .5) * 1.1, glyph: SPECS[(i * 7) % SPECS.length], stock: STOCKS[i % STOCKS.length], r0: (hash(i + 5) - .5) * 1.2,
}));
const FINAL_T0 = 103.547, FINAL_T1 = 104.337;
// kp: chorus 2's version of killingPart (04_chorus1.js). It temporarily wraps card/row/plate so that every card back
// carries an ink "?" and the ONE MORE row gets more air and a smaller overshoot, then restores them.
function kp(t, li, o) {
  const W = LINES[li].words, thunk = W[2][1];
  const zoomPunch = kick(t - thunk, 7) * .05, cz = 1.02 + zoomPunch + (o.fast ? .04 : 0), cr = wob(t, 9, kick(t - thunk, 10) * .02);
  bgCam('cork', [960, 560, cz, cr], { par: 1, over: 1.16, z: 1.06 });
  const card0 = card, row0 = row, plate0 = plate;
  card = (x, y, c = {}) => {
    card0(x, y, c);
    const cf = Math.cos((c.flip ?? 0) * Math.PI);
    if (cf < -.05) {
      const w = c.w ?? 150, h = c.h ?? 190, sc = c.s ?? 1;
      X.save(); X.translate(x, y); X.rotate(c.rot ?? 0); X.scale(sc * -cf * (c.sx ?? 1), sc * (c.sy ?? 1)); X.globalAlpha *= c.alpha ?? 1;
      X.translate(0, 10); GLYPH['?'](Math.min(w, h) / 120); X.restore();
    }
  };
  row = (items, cx, y, size, ro = {}) => row0(items, cx, y, size, { ...ro, from: Math.min(ro.from ?? 1.9, 1.2), gap: Math.max(ro.gap ?? .26, .42) });
  plate = (name, po = {}) => name === 'cork' ? undefined : plate0(name, po);
  try { killingPart(t, li, o); } finally { card = card0; row = row0; plate = plate0; }
}
// the hook line sits on a calm torn-paper plate, the biggest type in the film: "let it COME" / "THROUGH,"
const HOOK_Y = 795, HOOK_L1 = HOOK_Y - 100, HOOK_L2 = HOOK_Y + 120;
function hookPlate(t) {
  if (t < tLet - .1) return;
  const thr = kick(t - tThr, 9) * (t >= tThr ? 1 : 0), com = kick(t - tCome, 10) * (t >= tCome ? 1 : 0);
  const w1 = measure('let it', 120, 'FBo'), w2 = measure('COME', 190, 'FB'), w3 = measure('THROUGH,', 240, 'FB'), gap = 44;
  const pw = Math.max(w1 + gap + w2, w3) + 170, ph = 470, xa = 960 - (w1 + gap + w2) / 2;
  // the torn plate grows with the words: a snug strip for "let it", stretches right for COME, drops open for THROUGH
  const S1 = [xa - 70, HOOK_L1 - 120, xa + w1 + 70, HOOK_L1 + 70];
  const S2 = [Math.min(xa - 70, 960 - pw / 2), HOOK_L1 - 165, xa + w1 + gap + w2 + 70, HOOK_L1 + 78];
  const S3 = [960 - pw / 2, HOOK_Y - ph / 2, 960 + pw / 2, HOOK_Y + ph / 2];
  const g1 = spring(t - (tLet - .1), 4.2, .5), g2 = spring(t - (tCome - .06), 4.4, .45), g3 = spring(t - (tThr - .07), 4, .45);
  const box = [0, 1, 2, 3].map(j => { let v = lerp(j === 2 ? S1[0] + 40 : S1[j], S1[j], g1); v = lerp(v, S2[j], g2); return lerp(v, S3[j], g3); });
  const [x0, y0, x1, y1] = box, bw = x1 - x0, bh = y1 - y0, cy = (y0 + y1) / 2;
  X.save(); X.translate(960, HOOK_Y); X.rotate(-.012); X.scale(1 + thr * .03 + com * .012, 1 + thr * .04 + com * .016); X.translate(-960, -HOOK_Y);
  const top = [], bot = [], N = 16;
  for (let i = 0; i <= N; i++) { const x = lerp(x0, x1, i / N); top.push([x, y0 + (hash(i + 31) - .5) * 16]); bot.push([x, y1 + (hash(i + 57) - .5) * 16]); }
  const lft = [[x0 + (hash(91) - .5) * 14, lerp(y1, y0, .5)]], rgt = [[x1 + (hash(92) - .5) * 14, lerp(y0, y1, .5)]];
  shadowBlob((x0 + x1) / 2 + 14, cy + 20, bw * .52, bh * .54, .32);
  inkShape([...top, ...rgt, ...bot.reverse(), ...lft], '#fbf5e6', 5, 1, 761);
  X.restore();
  slam('let it', xa + w1 / 2, HOOK_L1 + 26, 120, tLet, { font: 'FBo', col: PAL.ink, from: 1.15, bake: true });
  slam('COME', xa + w1 + gap + w2 / 2, HOOK_L1, 190, tCome, { col: PAL.ink, from: 1.35, bake: true });
  slam('THROUGH,', 960, HOOK_L2, 240, tThr, { col: PAL.red, edge: true, from: 1.4, bake: true });
}
shot('c2kill', 101.557, (t) => {
  kp(t, 30, { crowd: true, out: tLet });
  const pin = E.outBack(prog(t, tLet - .28, tLet + .02), 1.3);
  const puff = STREAM.reduce((a, c) => a + kick(t - c.te, 16) * .07, 0);
  const px = lerp(3000, PIPE_X, pin), mouth = [px - .97 * PIPE_W, PIPE_Y + 20];
  if (t > tLet - .3) spr('pipe', px, PIPE_Y, PIPE_H, { ax: .02, ay: .5, flip: true, sx: 1 + puff * .4, sy: 1 + puff });
  // stream of cards bursting out of the mouth toward camera (starfield perspective); every one carries a glyph
  const L = .78, S0 = .55;
  const live = STREAM.filter(c => t > c.te && t < c.te + L).map(c => {
    const dt = t - c.te, s = S0 / Math.max(.06, 1 - dt / L);
    return { c, dt, s };
  }).sort((a, b) => a.s - b.s);
  live.forEach(({ c, dt, s }) => {
    const off = 150 * (s / S0 - 1) + dt * 420;
    const x = mouth[0] - 30 + Math.cos(c.ang) * off * 1.5, y = mouth[1] + 70 + Math.sin(c.ang) * off * .9 + dt * dt * 300;
    card(x, y, { s, glyph: c.glyph, stock: c.stock, rot: c.r0 + dt * c.spin, flip: Math.abs(dt * c.fr) % .45, seed: 700 + c.te * 100, alpha: clamp(dt / .04) * (1 - prog(s, 3.2, 5.5)), shadow: .6 });
  });
  hookPlate(t);
  // one last "?" card is pushed through the lens; its face becomes a window onto the next shot (the worried patient),
  // so when it fills the frame we are already inside c2web — no blank cream beat
  if (t > FINAL_T0) {
    const k = prog(t, FINAL_T0, FINAL_T1), s = .42 * Math.exp(Math.log(16 / .42) * E.inC(k));
    const x = lerp(mouth[0], 960, E.outC(k)), y = lerp(mouth[1] + 60, 540, E.outC(k)), rot = lerp(1.4, 0, E.outC(k)), fl = lerp(.3, 0, E.outQ(k));
    card(x, y, { s, lines: false, stock: '#fbf5e6', rot, flip: fl, seed: 777, shadow: 0 });
    const win = E.ioS(prog(k, .45, .8)), web = SHOTS.find(o => o.name === 'c2web');
    if (win > 0 && web) {                                  // the window: c2web, clipped to the card face, irising open
      const cw = Math.cos(fl * Math.PI) * s, m = lerp(.5, .06, win);
      X.save(); X.translate(x, y); X.rotate(rot); X.scale(cw, s); X.beginPath(); X.rect(-75 + 150 * m * .5, -95 + 190 * m * .5, 150 * (1 - m), 190 * (1 - m)); X.restore();
      X.save(); X.clip(); X.globalAlpha *= win; const P0 = POST; POST = {}; web.f(t, t - web.t0); POST = P0; X.restore();
    }
    const ga = 1 - prog(k, .72, .9);
    if (ga > 0) { X.save(); X.translate(x, y); X.rotate(rot); X.scale(s * Math.cos(fl * Math.PI), s); X.globalAlpha *= ga; X.translate(0, 10); GLYPH['?'](150 / 120); X.restore(); }
  }
  POST.vign = .7;
});

// (104.357 → 106.7: c2web, in 09_finale_extras.js)

// ── c2world · 106.7 → 109.47  "A world of people we could bring this to," — the gift-wrapped globe ─────────
const PEEPS = [[46, 494], [502, 1194], [1238, 1540], [1625, 1894], [1960, 2481], [2536, 2904], [2924, 3426], [3460, 3744]];
function person(j, x, y, hh, rot, sq = 1) {          // one figure cut out of the `people` strip, feet at (x,y)
  const im = IMG.people; if (!im) return;
  const c = boiled('people', ((boilStep(T) + j) % 3 + 3) % 3); if (!c) return;
  const [a, b] = PEEPS[j], k = hh / im.height, sc = c._sc, m = 6;
  const sx = c._pad + a * sc - m, sw = (b - a) * sc + 2 * m, sy = c._pad - m, sh = im.height * sc + 2 * m;
  X.save(); X.translate(x, y); X.rotate(rot); X.scale(1 / sq, sq);
  X.drawImage(c, sx, sy, sw, sh, (-(b - a) / 2 - m / sc) * k, (-m / sc - 952) * k, sw / sc * k, sh / sc * k);
  X.restore();
}
function sunburst(cx, cy, r, n, rot, col, a, seed = 731) {           // soft pencil rays
  pencilRays(cx, cy, Math.min(r * .3, 260), r, n, rot, col, a, seed);
}
function globeBody(R, scroll) {                       // turning globe: zoomed map scrolls inside a clipped sphere
  shadowBlob(14, R * 1.02, R * .8, R * .1, .18);
  X.save(); X.beginPath(); X.arc(0, 0, R, 0, 7); X.clip();
  // ocean: cream paper base, blue rubbed in with pencil in layered wobbled discs (no flat underlay)
  p4Fill(() => { X.beginPath(); X.arc(0, 0, R + 4, 0, 7); }, '#f6efdc', { wash: 1, grain: .5, tex: 'tex_soft' });
  pkRub(0, 0, R * 1.08, R * 1.08, '#7cc3c9', { layers: 3, seed: 709, step: .14, amp: .08, wash: .55, grain: .85, alpha: 1.6 });
  spr('globe', scroll, 0, R * 2 * 1.75, { ax: .5, ay: .5, seed: 3 });
  softPool(-R * .35, -R * .4, R * .55, R * .48, '#fff8dc', .38, 705, 3);                       // soft pencil highlight
  softShroud(R * .06, R * .06, R * .8, R * .8, '#9a7f72', .5, 707, [-R - 20, -R - 20, R + 20, R + 20], 3, .12);   // rubbed shade round the rim
  X.restore();
  inkShape(ellPts(0, 0, R, R, 28), null, 8, 1.4, 701);
}
// ribbon spiral round a sphere; returns [backSegments, frontSegments]
function ribbon(R, phase, k) {
  const N = 260, pts = [];
  for (let i = 0; i <= N; i++) {
    const u = i / N; if (u > k) break;
    const h = lerp(.86, -.86, u) * R, r = Math.sqrt(Math.max(0, R * R - h * h)) * 1.04, th = u * Math.PI * 2 * 2.5 + phase;
    pts.push([Math.cos(th) * r, h * .97 + Math.sin(th) * r * .3, Math.sin(th) >= 0]);
  }
  const segs = [[], []]; let cur = null, side = null;
  pts.forEach(p => { if (p[2] !== side) { if (cur) cur.push([p[0], p[1]]); cur = [[p[0], p[1]]]; side = p[2]; segs[side ? 1 : 0].push(cur); } else cur.push([p[0], p[1]]); });
  return segs;
}
function bow(x, y, s, a) {
  if (s <= 0) return;
  X.save(); X.translate(x, y); X.scale(s, s); X.rotate(a);
  thread([[0, 0], [-60, -55], [-110, -30], [-95, 20], [-40, 10], [0, 0]], { w: 14 });
  thread([[0, 0], [60, -55], [110, -30], [95, 20], [40, 10], [0, 0]], { w: 14 });
  thread([[0, 0], [-30, 60], [-55, 120]], { w: 14 }); thread([[0, 0], [35, 55], [70, 105]], { w: 14 });
  inkShape(ellPts(0, 0, 20, 17, 10), PAL.red, 4, .8, 951);
  X.restore();
}
shot('c2world', 106.7, (t) => {
  const W = L32, tWorld = W[1][1], tPeople = W[3][1], tBring = W[6][1], tTo = W[8][1];
  const GX = 1390, GY = 640, R = 310;
  const punch = kick(t - tWorld, 7) * .03 + kick(t - tPeople, 7) * .03 + kick(t - tBring, 7) * .025 + kick(t - tTo, 6) * .04;
  const cz = 1 + punch + E.io(prog(t, 106.7, 109.5)) * .03;
  bgCam(() => paperBG(PAL.peach, .7), [960, 540, cz, 0], { par: .9, over: 1.12 });
  X.save(); cam(960, 540, cz);
  // the globe rolls in from the right (whip-matched to c2web's exit) and lands with a squash on "world"
  const ent = E.outC(prog(t, 106.64, 106.921)), land = t > 106.921 ? kick(t - 106.921, 9) : 0;
  const rays = E.outC(prog(t, 106.751, 107.224));
  sunburst(GX, GY, lerp(R * 1.1, 1500, rays), 22, t * .12 - (1 - rays) * .8, PAL.lemon, .38 * rays, 741);
  softPool(GX, GY, R * 2.6, R * 2.4, '#fff0c8', .5 * rays, 745, 5, .4);                       // warm pencil glow round the world
  X.save(); X.translate(GX + (1 - ent) * 1150, GY - Math.sin(ent * Math.PI) * 60 + land * 18); X.scale(1 + land * .1, 1 - land * .1); X.rotate(-.12 - (1 - ent) * 1.6);
  if (ent < 1) POST.smear = [-(1 - ent) * 700, 0];
  const spin = (t - 106.7) / 3.03 - (1 - ent) * .6;
  const kR = E.io(prog(t, tWorld + .1, tBring + .1));
  const [back, front] = ribbon(R, -spin * Math.PI * 1.2, kR);
  back.forEach(s => s.length > 1 && thread(s, { w: 13, shadow: 0, col: '#b83222' }));
  globeBody(R, lerp(-.55, .55, spin) * R);
  front.forEach(s => s.length > 1 && thread(s, { w: 15 }));
  // people standing round the top of the world, heads out, popping on "people"
  PEEPS.forEach((_, j) => {
    const ph = lerp(-1.12, 1.12, j / (PEEPS.length - 1)), up = spring(t - tPeople - j * .055, 3.4, .4);
    if (up <= 0) return;
    const hop = (kick(t - tTo - j * .02, 7) * 40 + kick(t - tBring - j * .02, 9) * 18) * (t > tBring ? 1 : 0);
    const rr = R * .98 + hop;
    person(j, Math.sin(ph) * rr, -Math.cos(ph) * rr, R * .76 * up, ph + Math.sin(t * 3 + j) * .04, 1 + kick(t - tPeople - j * .055, 12) * .2);
  });
  bow(-R * .1, R * .42, spring(t - tTo, 3.5, .4) * 1.1, -.1);
  X.restore();
  X.restore();
  // type — stacked poster on the left
  const opt = { from: 2.1, align: 'left', maxW: 790 };
  row([['A', W[0][1], { size: 110, font: 'FBo' }], ['WORLD', tWorld, { col: PAL.teal, edge: true }]], 80, 230, 190, opt);
  row([['of', W[2][1], { size: 100, font: 'FBo' }], ['PEOPLE', tPeople, { col: PAL.coral, edge: true }]], 80, 430, 200, opt);
  row([['we', W[4][1]], ['could', W[5][1]]], 80, 590, 105, { ...opt, font: 'FBo' });
  row([['BRING', tBring, { col: PAL.red, edge: true }]], 80, 800, 220, opt);
  row([['THIS', W[7][1]], ['TO,', tTo]], 80, 980, 150, { ...opt, gap: .42 });
  POST.vign = .6;
});

// ── c2kill2 · 109.47 → 110.71  KILLING PART #3 — quick punch; the card that lands is a lightbulb ─────────────
shot('c2kill2', 109.47, (t) => {
  kp(t, 33, { fast: true, crowd: true, glyph: 'bulb' });
  POST.vign = .7;
});

// (110.71 → 114.6: c2imagine, "Imagine what we could do.", in 09_finale_extras.js)

// ── c2bows · 114.6 → 122.94  CURTAIN CALL + BRASS SECTION, then a whip-pan to the journey board ────────────
// Entrances on half-beats 177→179.5, a bow on 180, then the BRASS SECTION (audio: brass in on beat 181 = 117.77,
// last stab on beat 189 = 122.94, where the board whips in). Trumpet / tuba / trombone centre stage; ck, gk, st dance.
const tBow = beat(180), tBrass = beat(181), tFin = beat(188), tWhip = beat(189);
const BOWS = [['ck', 215, 560, 177], ['gk', 445, 500, 177.5], ['tc', 715, 600, 178], ['hyp', 985, 470, 178.5], ['chal', 1335, 620, 179], ['st', 1725, 480, 179.5]];
// brass rigs: a/b sprites, scale per source px, feet anchor per pose, bell [x,y] (fraction of sprite) + bell direction
const BRASS = {
  tc: { a: 'tc_trumpet_a', b: 'tc_trumpet_b', k: .42, ax: [.42, .5], flip: true, bell: [[.94, .07, -1.0], [.93, .22, -.15]] },
  hyp: { a: 'hyp_tuba_a', b: 'hyp_tuba_b', k: .46, ax: [.4, .45], flip: false, bell: [[.7, .08, -1.45], [.71, .07, -1.4]] },
  chal: { a: 'chal_trombone_a', b: 'chal_trombone_b', k: .44, ax: [.32, .49], flip: false, bell: [[.69, .2, -.35], [.75, .19, -.5]] },
};
const DANCE = { ck: [.403, 'ck_cheer', 'ck_point', 'ck_cheer', 'ck_tick'], st: [.469, 'st_cheer', 'st_wink', 'st_jog', 'st_cheer'], gk: [.44, 'gk_hop', 'gk_wink'] };
const CONF = Array.from({ length: 90 }, (_, i) => ({ x: hash(i * 1.7) * 2000 - 40, y0: -40 - hash(i + 3) * 700, v: 260 + hash(i + 8) * 220,
  col: [PAL.red, PAL.lemon, PAL.teal, PAL.cream, PAL.coral, PAL.lilac][i % 6], w: 14 + hash(i + 1) * 14, ph: hash(i + 6) * 7, t0: i % 2 ? tBrass : tFin }));
const nbOf = t => beatAt(t);                       // continuous beat number
function brassPose(key, t) {                              // which sprite (0 = a, 1 = b) is up at t
  const nb = nbOf(t), n = Math.floor(nb);
  if (t >= tFin) return key === 'tc' ? 0 : 1;             // finale: every bell up
  if (key === 'tc') return (n - 181) % 2 ? 1 : 0;         // trumpet: bell lifts on 181, 183, 185, 187
  if (key === 'chal') return (n - 181) % 2 ? 1 : 0;       // trombone: slide OUT on the beat, IN on the next
  return nb - n < .5 ? 1 : 0;                             // tuba: oom (wide stance) on the beat, pah on the "and"
}
function brassRig(key, x, t) {                            // → { name, x, y, h, ax, flip, rot, sx, sy, bell:[x,y,ang] }
  const R = BRASS[key], p = brassPose(key, t), name = p ? R.b : R.a, im = IMG[name];
  const h = R.k * (im ? im.height : 1300), w = im ? h * im.width / im.height : h * .7, s = R.flip ? -1 : 1;
  const nb = nbOf(t), n = Math.floor(nb), kb = kick(t - beat(n), 9);
  const pop = kick(t - tBrass, 7);
  const rock = Math.max(kick(t - beat(184), 4) * (t >= beat(184) ? 1 : 0), E.outC(prog(t, tFin, tFin + .18)));
  const half = key === 'hyp' ? kick(t - beat(n + .5), 10) * (nb - n >= .5 ? 1 : 0) : 0;
  const rot = s * (Math.sin(nb * Math.PI + x * .01) * .035 - .11 * rock) + (key === 'chal' ? s * kb * .03 * (p ? -1 : 1) : 0);
  const sy = (1 - kb * .07 - half * .05) * (1 + pop * .22), sx = (1 + kb * .05 + half * .04) * (1 + pop * .12) * (key === 'chal' && !p ? 1 + kb * .05 : 1);
  const y = 1000 - Math.abs(Math.sin(nb * Math.PI)) * 14 * (key === 'hyp' ? .5 : 1);
  const [bx, by, ba] = R.bell[p], ax = R.ax[p];
  // bell in frame space (rotation about the feet)
  const lx = (bx - ax) * w * s * sx, ly = -(1 - by) * h * sy, c = Math.cos(rot), si = Math.sin(rot);
  const bell = [x + lx * c - ly * si, y + lx * si + ly * c, R.flip ? Math.PI - ba + rot : ba + rot];
  return { name, x, y, h, ax, flip: R.flip, rot, sx, sy, bell };
}
function flare(x, y, ang, k, seed) {                      // cut-paper brass blast: lemon wedges fanning out of the bell
  if (k < .02) return;
  for (let i = 0; i < 5; i++) {
    const a = ang + (i - 2) * .32 + (hash(seed + i) - .5) * .12, r0 = 30 + 20 * k, r1 = r0 + (90 + 120 * hash(seed + i + 9)) * k, wd = .09;
    inkShape([[x + Math.cos(a - wd) * r0, y + Math.sin(a - wd) * r0], [x + Math.cos(a) * r1, y + Math.sin(a) * r1], [x + Math.cos(a + wd) * r0, y + Math.sin(a + wd) * r0]],
      i % 2 ? PAL.lemon : '#fff3b0', 3, .6, seed + i);
  }
}
function note(x, y, s, rot, a, seed) {                    // a hand-inked quaver
  if (a <= 0) return;
  X.save(); X.globalAlpha *= a; X.translate(x, y); X.rotate(rot); X.scale(s, s);
  inkShape(ellPts(0, 0, 17, 12, 12).map(([px, py]) => [px * Math.cos(-.4) - py * Math.sin(-.4), px * Math.sin(-.4) + py * Math.cos(-.4)]), PAL.ink, 2, .5, seed);
  inkLine([[15, -4], [15, -62]], 5, PAL.ink, .5, seed + 1);
  inkLine([[15, -62], [32, -46], [36, -26]], 5, PAL.ink, .6, seed + 2);
  X.restore();
}
function curtains(o) {
  const xr = lerp(990, 70, o);
  // the drape's inner edge at height y (inset by d): a soft bulge as the curtain is drawn back, static wobble
  const edge = (y, d = 0) => xr - d - Math.sin(Math.PI * Math.min(1, y / 800)) * 70 * o + Math.sin(y / 140 * 2.1) * 8;
  const panel = (d, seed) => {
    const pts = [[-40, -20], [edge(-20, d) + 20, -20]];
    for (let i = 1; i <= 12; i++) { const y = i / 12 * 1120; pts.push([edge(y, d) + (hash2(i, seed) - .5) * 6, y]); }
    pts.push([-40, 1120]);
    return pts;
  };
  for (const side of [-1, 1]) {
    X.save(); if (side > 0) { X.translate(DW, 0); X.scale(-1, 1); }
    // red rubbed in with pencil — a paper-light base, then denser layers set back from the edge (lighter at the edge)
    const P0 = wobbled(panel(0, 821 + side), 1.5, 820 + side);
    X.save(); X.fillStyle = p4Shade(PAL.red, .55); curve(P0, true); X.fill(); X.restore();
    p4Fill(() => curve(P0, true), PAL.red, { alpha: .7, wash: .3, grain: .95, tex: 'tex_soft' });
    p4Fill(() => curve(wobbled(panel(30, 823 + side), 6, 824 + side), true), PAL.red, { alpha: .55, wash: .4, grain: .85, tex: 'tex_soft' });
    p4Fill(() => curve(wobbled(panel(90, 825 + side), 10, 826 + side), true), p4Shade(PAL.red, -.04), { alpha: .45, wash: .45, grain: .8, tex: 'tex_soft' });
    X.save(); curve(P0, true); X.clip();
    // folds: soft shade bands following the drape, each with a wobbling pencil line in its valley
    for (let f = 1; f < 5; f++) {
      const u = f / 5, fx = (y) => edge(y) * u + Math.sin(y / 210 + f * 1.7) * 9 + (hash2(f, 834 + side) - .5) * 30;
      const ys = Array.from({ length: 9 }, (_, i) => 100 + i / 8 * 1000), bw = 20 + 16 * hash2(f, 836 + side);
      const band = [...ys.map(y => [fx(y) - bw * (.6 + .4 * y / 1100), y]), ...ys.slice().reverse().map(y => [fx(y) + bw * .5, y])];
      p4Fill(() => curve(sw4(band, 838 + f + side * 10, 4), true), p4Shade(PAL.red, -.28), SOFT(.32, .45));
      p4Fill(() => curve(sw4(band.map(([x, y]) => [x + bw * .7, y]), 840 + f + side * 10, 4), true), p4Shade(PAL.red, .35), SOFT(.22, .5));
      p4Line(ys.map((y, i) => [fx(y) - 4 + (hash2(i, 842 + f + side * 10) - .5) * 5, y]), 3.2, PAL.redDk, 1.2, 830 + f + side * 10, false, { alpha: .6, rough: .9 });
    }
    X.restore();
    p4Line(P0, 6 * P4.lineK, P4.line, 1.5, 870 + side, true);
    X.restore();
  }
  const sc = []; for (let i = 0; i <= 24; i++) { const x = i / 24 * DW; sc.push([x, 70 + (i % 2 ? 46 : 0)]); }
  inkShape([[-20, -20], [DW + 20, -20], [DW + 20, 70], ...sc.reverse(), [-20, 70]], PAL.red, 6, 1.4, 840);
  inkLine([[0, 40], [DW, 40]], 5, PAL.brass, 1.2, 841);
}
function stage(t, o = {}) {
  if (!o.noBg) paperBG('#f5b8a4', .6);
  const sunY = lerp(1180, 800, E.outC(prog(t, 114.7, 122.9)));
  sunburst(960, sunY, 1600, 20, -t * .08, PAL.lemon, .3 + .12 * (t > tBrass ? kick(t - beat(Math.floor(nbOf(t))), 6) : 0), 811);
  // sun: layered wobbled discs rubbed in with pencil — densest in the middle, lighter toward the rim — on a
  // paper-light base (so the rays stop at the rim), with a soft pencil contour
  const sun = (k, ox, oy, seed) => sw4(ellPts(960 + ox, sunY + oy, 380 * k, 380 * k, 30), seed, 380 * k * .014);
  const S0 = sun(1, 0, 0, 811);
  X.save(); X.fillStyle = '#fdf0c6'; curve(S0, true); X.fill(); X.restore();
  p4Fill(() => curve(S0, true), '#fbe496', SOFT(.8, .5));
  for (let i = 0; i < 2; i++) p4Fill(() => curve(sun(.84 - i * .05, -12 - i * 4, -8 - i * 5, 812 + i), true), '#fbd768', SOFT(.42, .6));
  for (let i = 0; i < 3; i++) p4Fill(() => curve(sun(.64 - i * .08, -24 - i * 5, -20 - i * 6, 815 + i), true), '#f8cb55', SOFT(.26, .55));
  p4Line(S0, 4, '#c9973f', 1, 819, true, { alpha: .75, rough: .8 });
  const brass = t >= tBrass, nb = nbOf(t), n = Math.floor(nb), kb = kick(t - beat(n), 8);
  // spotlights: one per entrance; once the brass is in, the trio's lights pump on the beat
  // (soft pale pencil beams + floor pools, rubbed in on top of the wash, no additive light)
  BOWS.forEach(([k, x, h, b], j) => {
    let on = t > beat(b) - .08 ? (.6 + .4 * (1 - kick(t - beat(b) + .08, 12))) : 0;
    if (!on) return;
    if (brass && BRASS[k]) on = .8 + .9 * kb;
    const col = brass && BRASS[k] ? '#fff6c8' : '#fffbe8';
    [[1, .5], [.8, .4], [.58, .4]].forEach(([wk, ak], m) => {
      const pts = [];
      for (let i = 0; i <= 5; i++) pts.push([x - lerp(60, 220, i / 5) * wk, lerp(-10, 1000, i / 5)]);
      for (let i = 5; i >= 0; i--) pts.push([x + lerp(60, 220, i / 5) * wk, lerp(-10, 1000, i / 5)]);
      const q = sw4(pts, 880 + j * 7 + m, 7 * wk);
      p4Fill(() => curve(q, true), col, SOFT(.62 * on * ak, .8));
    });
    [-1, 1].forEach(sd => p4Line([[x + sd * 62, -10], [x + sd * 140, 495], [x + sd * 218, 1000]], 5, col, .6, 895 + j + sd, false, { alpha: .45 * on, rough: .6 }));
    softPool(x, 995, 230, 42, col, .5 * on, 890 + j, 3, .45);
  });
  inkShape([[-30, 985], [DW + 30, 985], [DW + 30, 1110], [-30, 1110]], '#c98d4e', 5, 1.2, 802);
  const bells = [];
  // dancers first (upstage), then the brass trio in front
  const order = [0, 1, 5, 2, 4, 3];
  order.forEach(i => {
    const [k, x, h, b] = BOWS[i];
    const te = beat(b), up = spring(t - te + .1, 3.2, .45);
    if (up <= 0) return;
    const rise = (1 - Math.min(1, up)) * (h + 60), sq0 = 1 + kick(t - te + .1, 10) * .1;
    const bowing = t >= tBow && t < tBrass;
    if (brass && BRASS[k]) {
      const r = brassRig(k, x, t);
      spr(r.name, r.x, r.y, r.h, { ax: r.ax, flip: r.flip, rot: r.rot, sx: r.sx, sy: r.sy, seed: i * 2, shadow: 1 });
      bells.push([k, r.bell]);
      return;
    }
    if (brass && DANCE[k]) {                              // dancers: a new move every beat, a hop on every beat, turn every 2
      const D = DANCE[k], m = n - 181, name = D[1 + ((m % (D.length - 1)) + (D.length - 1)) % (D.length - 1)], im = IMG[name];
      const hh = D[0] * (im ? im.height : 1200) * (k === 'gk' ? 1 : 1), hop = kick(t - beat(n), 7) * (k === 'gk' ? 80 : 45) + Math.abs(Math.sin(nb * Math.PI * 2)) * 10;
      const sq = 1 + kb * .1, flip = k === 'gk' ? (Math.floor(m / 2) % 2 === 1) : (Math.floor(m / 2) % 2 === (k === 'st' ? 0 : 1));
      const dx = Math.sin(nb * Math.PI / 2) * 30 * (k === 'st' ? -1 : 1);
      spr(name, x + dx, 1000 - hop, hh, { rot: Math.sin(nb * Math.PI + i) * .07, sx: 1 / sq, sy: sq, seed: i * 2, shadow: 1, flip });
      return;
    }
    let pose = k === 'gk' ? 'gk_wink' : k + '_cheer', rot = 0, hh = h;
    if (bowing) { pose = k === 'gk' ? 'gk_stand' : k + '_leanin'; rot = (i % 2 ? -1 : 1) * .05 + Math.sin(prog(t, tBow, tBow + .5) * Math.PI) * .12 * (x < 960 ? 1 : -1); hh = h * .92; }
    let hop = 0; for (let m = b + 1; m < 180; m += .5) { const tb = beat(m); if (tb > t) break; hop = kick(t - tb, 8) * 16; }
    spr(pose, x, 1000 + rise - hop, hh, { rot: rot + Math.sin(beatAt(t) * Math.PI + i) * .02, sx: 1 / sq0, sy: sq0, seed: i * 2, shadow: 1, flip: bowing && x > 960 });
  });
  inkShape([[-30, 1030], [DW + 30, 1030], [DW + 30, 1110], [-30, 1110]], '#a8703a', 5, 1.2, 803);
  for (let i = 0; i < 9; i++) inkLine([[i * 230 + 40, 1035], [i * 230 + 60, 1080]], 3, PAL.inkSoft, .8, 860 + i);
  if (brass) {
    // the swap: a paper "POW" puff hides the instruments appearing on the first brass hit
    // (an opaque pale-pencil puff — no fade, so it never double-exposes; it shrinks away at the end instead)
    const pf = kick(t - tBrass, 6);
    if (pf > .05) BOWS.forEach(([k, x, h], i) => {
      if (!BRASS[k]) return;
      const R = (90 + 150 * (1 - pf)) * E.outC(clamp((pf - .05) / .4)), pts = Array.from({ length: 18 }, (_, j) => { const a = j / 18 * Math.PI * 2 + i, r = R * (j % 2 ? .62 : 1); return [x + Math.cos(a) * r, 1000 - h * .55 + Math.sin(a) * r * .9]; });
      inkShape(pts, '#fff4c4', 5, 1, 870 + i);
    });
    // brass flares on every beat (big on the entry, the downbeat 184 and the finale), notes floating off the bells
    bells.forEach(([k, [bx, by, ba]], j) => {
      const big = Math.max(kick(t - tBrass, 5), kick(t - beat(184), 5) * (t >= beat(184) ? 1 : 0), kick(t - tFin, 3) * (t >= tFin ? 1 : 0));
      flare(bx, by, ba, Math.max(kb * .55, big), 900 + j * 10 + n * 3);
    });
    for (let m = 181; m <= n; m++) BOWS.forEach(([k, x], j) => {
      if (!BRASS[k]) return;
      const born = beat(m) + j * .1, age = t - born; if (age < 0 || age > 1.5) return;
      const r = brassRig(k, x, born), [bx, by, ba] = r.bell, dir = Math.cos(ba) >= 0 ? 1 : -1;
      note(bx + dir * (40 + 120 * age) + Math.sin(age * 6 + m) * 22, by - 40 - 220 * age, .9 + .25 * kick(age, 10), Math.sin(age * 5 + j) * .25, 1 - E.inC(prog(age, .9, 1.5)), 950 + m * 3 + j);
    });
  }
  // confetti: a burst on the brass entry, another on the finale
  CONF.forEach((c, i) => {
    if (t < c.t0 - .05) return;
    const dt = t - c.t0 + .05, y = c.y0 + c.v * dt; if (y > 1100) return;
    const x = c.x + Math.sin(dt * 3 + c.ph) * 40;
    X.save(); X.translate(x, y); X.rotate(c.ph + dt * 4); X.scale(1, Math.cos(dt * 9 + c.ph));
    const q = sw4([[-c.w / 2, -c.w * .3], [c.w / 2, -c.w * .3], [c.w / 2, c.w * .3], [-c.w / 2, c.w * .3]], 960 + i, c.w * .06);
    X.save(); X.globalAlpha *= .85; X.fillStyle = p4Shade(c.col, .3); X.beginPath(); q.forEach(([a, b], m) => m ? X.lineTo(a, b) : X.moveTo(a, b)); X.closePath(); X.fill(); X.restore();
    p4Fill(() => { X.beginPath(); q.forEach(([a, b], m) => m ? X.lineTo(a, b) : X.moveTo(a, b)); X.closePath(); }, c.col, { wash: .5, grain: .9, tex: 'tex_soft' });
    X.restore();
  });
  curtains(E.io(prog(t, 114.62, 115.1)));
}
shot('c2bows', 114.6, (t) => {
  const w = E.inC(prog(t, tWhip - .2, tWhip));
  bgCam(() => paperBG('#f5b8a4', .6), [960 + w * 1500, 540, 1, 0], { par: 1, over: 2.5 });
  X.save(); X.translate(-w * 1500, 0); stage(t, { noBg: true }); X.restore();
  if (w > 0) POST.smear = [-w * 900, 0];
  POST.vign = .6;
});


// ── c2board · DIAGNOSTIC JOURNEY BOARD · tWhip (122.94) → end ──────────────────────────────────────────────────────────────
// One patient's route across a cork board: question cards (lemon stock, big "?") and test polaroids (big glyph),
// each slapped on and pinned as the red thread reaches it, with a few ruled-out side trips. Then the board holds
// its breath at the loose end until the answer card flies down and pins there.
const Q = ['?', 'Question'];
const EVENTS = [
  Q, Q, Q, ['thermo', 'Temperature'], ['steth', 'Examination'], ['tube', 'Blood test'], ['heart', 'ECG'],
  Q, ['xray', 'Chest X-ray'], ['ct', 'CT scan'], Q, ['flask', 'Lab test'], ['dna', 'Genetics'], Q,
  ['slide', 'Pathology'], Q, ['mri', 'MRI'], ['flask', 'Lab test'], ['tube', 'Blood test'], Q,
];
const TINT = { thermo: '#f6dccf', steth: '#ebe2c9', tube: '#f5d8cf', heart: '#fbece4', xray: '#c3cdd7', flask: '#d6ebe4',
  ct: '#dde5ea', dna: '#e9e0f2', mri: '#c8ced8', slide: '#f2e0e8', drop: '#f5d8cf', pill: '#d7ece8' };
const QSTOCK = '#f9df86', PSTOCK = '#fbf6ea';
// Board: 4000×2250 world, 3 rows of 7 slots snaking L→R, R→L, L→R; the last slot (row 3, far right) waits for the answer.
const BDW = 4000, BHt = 2250, CW = 420, CH = 400, CAP = 50;
const ROWY = [520, 1235, 1950], COLX = c => 360 + c * 545;
const NODES = EVENTS.map(([g, cap], i) => {
  const r = Math.floor(i / 7), c = i % 7, col = r % 2 ? 6 - c : c;
  return { x: COLX(col) + (hash(i + 70) - .5) * 30, y: ROWY[r] + (hash(i + 80) - .5) * 20, rot: (hash(i + 90) - .5) * .06, g, cap, q: g === '?', r };
});
const PIN = n => [n.x + Math.sin(n.rot) * (CH / 2 - 22), n.y - Math.cos(n.rot) * (CH / 2 - 22)];
const capCache = new Map();
function capLines(text, size, maxW) {                     // one line if it fits, else split at the space nearest the middle
  const key = text + '|' + size + '|' + maxW;
  if (capCache.has(key)) return capCache.get(key);
  let out = [text];
  if (measure(text, size, 'SH') > maxW) {
    const sp = [...text].map((ch, i) => ch === ' ' ? i : -1).filter(i => i > 0);
    if (sp.length) { const m = sp.reduce((b, i) => Math.abs(i - text.length / 2) < Math.abs(b - text.length / 2) ? i : b, sp[0]); out = [text.slice(0, m), text.slice(m + 1)]; }
  }
  capCache.set(key, out);
  return out;
}
// camera stops (card ranges): the board whips in on beat 189 and the camera hops stop→stop landing on beats 190..194
const STOPS = [[0, 2], [3, 6], [7, 10], [11, 13], [14, 16], [17, 19]], NS = STOPS.length, HOP = .2;
const tS = s => beat(189 + s);
const NODE_T = [];
STOPS.forEach(([a, b], s) => { const t0 = s === 0 ? tWhip + .1 : tS(s) - .1, sp = s === 0 ? .14 : .12; for (let i = a; i <= b; i++) NODE_T[i] = t0 + (i - a) * sp; });
const tNode = i => NODE_T[i];                             // thread reaches card i (it pins on that instant)
const CTR = STOPS.map(([a, b]) => {                       // [cx, cy, zoom] framing each stop
  const ns = NODES.slice(a, b + 1), xs = ns.map(n => n.x), x0 = Math.min(...xs), x1 = Math.max(...xs);
  return [(x0 + x1) / 2, ns.reduce((q, n) => q + n.y, 0) / ns.length - 20, Math.min(1.15, 1840 / (x1 - x0 + CW + 90))];
});
const ZW = .485, tBack0 = beat(194.6), tBack1 = 127.4;
// main route: enters from the left edge, sags pin→pin along each row, loops round the board edge between rows
const ROUTE_CTRL = [[-160, PIN(NODES[0])[1] - 40]], PIN_CI = [];
NODES.forEach((n, i) => {
  PIN_CI.push(ROUTE_CTRL.length); ROUTE_CTRL.push(PIN(n));
  const m = NODES[i + 1];
  if (m && m.r === n.r) { const a = PIN(n), b = PIN(m); ROUTE_CTRL.push([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + 26]); }
  if (i === 6) ROUTE_CTRL.push([BDW - 110, PIN(n)[1] - 14], [BDW - 50, (ROWY[0] + ROWY[1]) / 2 + 40], [BDW - 140, PIN(NODES[7])[1] - 16]);
  if (i === 13) ROUTE_CTRL.push([110, PIN(n)[1] - 14], [50, (ROWY[1] + ROWY[2]) / 2 + 40], [140, PIN(NODES[14])[1] - 16]);
});
const RPER = 12, ROUTE = spline(ROUTE_CTRL, RPER), RL = plen(ROUTE);
const ROUTE_U = [0, ...PIN_CI.map(ci => plen(ROUTE.slice(0, ci * RPER + 1)) / RL)];
function routeK(t) {
  if (t < tNode(0)) return lerp(ROUTE_U[0], ROUTE_U[1], E.outC(prog(t, tWhip, tNode(0))));
  for (let i = 0; i < NODES.length - 1; i++) if (t < tNode(i + 1)) return lerp(ROUTE_U[i + 1], ROUTE_U[i + 2], E.io(prog(t, tNode(i), tNode(i + 1))));
  return 1;
}
// dead ends: short side trips tried and ruled out (small card in the gap above its row, red cross stamped on)
const BWd = 240, BHd = 220;
const DEAD = [[5, 1, 'mri', 'MRI'], [8, 1, 'heart', 'ECG'], [11, -1, 'slide', 'Pathology'], [13, 1, 'tube', 'Blood test'], [17, 1, 'dna', 'Genetics']]
  .map(([p, side, g, cap], j) => {
    const n = NODES[p], r = n.r, x = COLX(r % 2 ? 6 - (p % 7) : p % 7) + side * 272, y = r === 0 ? 165 : (ROWY[r - 1] + ROWY[r]) / 2;
    return { p, side, g, cap, x, y, rot: (hash(j + 220) - .5) * .12, t: tNode(p) + .24, corner: [x - side * (BWd / 2 - 16), y + 22] };
  });
// the answer: the last slot of row 3, at the loose end of the route
const QX = COLX(6), QY = ROWY[2] + 6, HW = 380, HH = 470, GREEN = '#3c8a5c';
const tF0 = beat(201), tSnap = beat(202);                 // flies down from above on 201, pins on 202 (the band comes back in)
const tTick = tSnap - .02, tTick1 = tTick + .2;          // the tick is inked, then the words handwritten
const SNEEZE_I = 15, tSneeze = beat(193);
const TICK = spline([[-92, -38], [-62, -6], [-30, 32], [10, -22], [62, -88], [104, -132]], 10);
const PQ = [QX, QY - HH / 2 + 22];
function sneezeQuestionFace(t) {
  const prep = E.ioS(prog(t, tSneeze - .12, tSneeze - .015)), trem = prep * Math.sin((t - tSneeze) * 170);
  const qA = 1 - E.io(prog(t, tSneeze - .055, tSneeze + .09));
  if (qA > 0) {
    const flip = Math.max(.08, Math.cos(E.io(prog(t, tSneeze - .045, tSneeze + .055)) * Math.PI / 2));
    X.save(); X.globalAlpha *= qA; X.translate(trem * 5, -66 + Math.abs(trem) * 2); X.rotate(-prep * .08 + trem * .018); X.scale(flip, 1 + prep * .04); GLYPH['?'](3.3); X.restore();
  }
  if (prep > .05) {
    X.save(); X.globalAlpha *= prep * .75;
    [-1, 1].forEach(sd => inkLine([[sd * 22, -138], [sd * 46, -136 + sd * trem * 2]], 4, PAL.ink, .25, 1158 + sd));
    word('ah-', -8, -184, 32, { font: 'SHm', col: PAL.inkSoft, ax: .5, rot: -.12 + trem * .01, alpha: prep });
    X.restore();
  }
  const burst = appear(t, tSneeze - .006, .01) * vanish(t, tSneeze + .055, .025);
  if (burst > .02) {
    X.save(); X.globalAlpha *= burst;
    [[-70, -108, -154, -140], [-64, -84, -172, -84], [-70, -62, -146, -36]].forEach(([x0, y0, x1, y1], j) => inkLine([[x0, y0], [x1, y1]], 4.5, '#eaf9ff', .35, 1152 + j));
    inkShape(ellPts(-120, -90, 44, 25, 11), '#fffaf0', 3, .55, 1156);
    X.restore();
  }
  const pf = kick(t - tSneeze, 6);
  if (pf > .03) {
    [[-196, -96, 18], [-220, -64, 12], [-188, -34, 9]].forEach(([x, y, r], j) => {
      X.save(); X.globalAlpha *= pf * (.42 - j * .08); inkShape(ellPts(x - pf * 46, y - pf * 22, r, r * .72, 10), '#fffaf0', 2.4, .45, 1160 + j); X.restore();
    });
  }
  const ck = E.outBack(prog(t, tSneeze + .03, tSneeze + .3), .75);
  if (ck > 0) {
    const q = ptrim(TICK.map(([a, b]) => [a * .76, b * .76 + 8]), Math.min(1, ck));
    if (q.length > 1) {
      p4Line(q.map(([a, b]) => [a + 2, b + 3]), 20, '#1f4d33', .4, 1163, false, { alpha: .18, passes: 1 });
      inkLine(q, 15, GREEN, .5, 1164);
    }
  }
  const eyes = appear(t, tSneeze + .22, .12) * vanish(t, tSneeze + 1.5, .45);
  if (eyes > 0) {
    X.save(); X.globalAlpha *= eyes;
    [-32, 32].forEach((x, j) => inkShape(ellPts(x, -132 - j * 3, 8, 11, 10), P4.line, 0, .3, 1166 + j));
    inkLine([[-48, -154], [-18, -148]], 3, PAL.ink, .2, 1168); inkLine([[18, -149], [48, -156]], 3, PAL.ink, .2, 1169);
    inkLine(ellPts(0, -105, 12, 15, 12), 3, PAL.ink, .3, 1170, true);
    X.restore();
  }
}
function settleAt(x, y, t) {                              // the board shivers when the answer is pinned
  if (t <= tSnap) return 0;
  const near = Math.max(0, 1 - Math.hypot(x - QX, y - QY) / 1300);
  return Math.sin((t - tSnap) * 24 + x * .01) * kick(t - tSnap, 4) * .04 * near;
}
function heroPose(t) {
  const u = prog(t, tF0, tSnap), lift = 1 - u;
  return {
    x: lerp(QX - 1250, QX, E.outQ(u)),                    // sweeps in from top-centre of frame, dropping into the slot
    y: lerp(QY - 1800, QY, u * .75 + E.inQ(u) * .25),
    rot: lerp(-.9, -.03, E.outC(u)) + Math.sin(u * Math.PI * 2) * .2 * lift,
    s: 1 + lift * .3,
    flip: 1 - E.io(prog(u, .45, .96)),                      // back ('?') on the way down, face up as it lands
    lift,
  };
}
function heroCard(t) {
  if (t < tF0) return;
  const p = heroPose(t), sq = t > tSnap ? 1 + kick(t - tSnap, 12) * .14 : 1;
  const sc = p.s * (t > tTick1 ? 1 + kick(t - tTick1, 7) * .04 : 1);
  const x = p.x, y = p.y, rot = p.rot + settleAt(QX, QY, t) * .3;
  if (t < tSnap) for (let j = 3; j >= 1; j--) {             // a faint paper trail on the dive
    const q = heroPose(t - j * .035);
    X.save(); X.translate(q.x, q.y); X.rotate(q.rot); X.scale(q.s, q.s);
    const tr = sw4(rectPts(-HW / 2, -HH / 2, HW, HH, 12, 3), 985 + j, 5);
    p4Fill(() => curve(tr, true), '#e6d2a8', SOFT(.2 * (4 - j) / 3, .6)); X.restore();
  }
  if (t < tSnap) shadowBlob(x + 60 + p.lift * 160, y + 80 + p.lift * 220, HW * .55 * p.s, HH * .5 * p.s, .12 * (1 - p.lift * .6));
  card(x, y, { lines: false, w: HW, h: HH, s: sc, sx: sq, sy: 1 / sq, flip: p.flip, rot, seed: 990, shadow: 1 + p.lift, stock: '#fffaf0', backCol: '#e6d2a8' });
  const cf = Math.cos(p.flip * Math.PI);
  if (cf > 0) {                                           // the face: self-inking green tick, handwritten verdict
    X.save(); X.translate(x, y); X.rotate(rot); X.scale(sc * Math.max(.02, cf) * sq, sc / sq);
    inkLine([[-HW / 2 + 26, -HH / 2 + 56], [HW / 2 - 26, -HH / 2 + 56]], 3, PAL.red, .6, 992);
    const tk = E.io(prog(t, tTick, tTick1));
    if (t > tTick1) {                                     // a soft green glow once it's confirmed
      const gk = E.outC(prog(t, tTick1, tTick1 + .4)) * (.5 + .5 * kick(t - tTick1, 3));
      softPool(0, -40, 170, 160, '#bfe8c4', .5 * gk, 993, 3, .4);
    }
    if (tk > 0) {
      const q = ptrim(TICK.map(([a, b]) => [a * 1.2, b * 1.2 + 8]), tk);
      if (q.length > 1) {
        X.save(); X.lineCap = X.lineJoin = 'round';
        p4Line(q.map(([a, b]) => [a + 3, b + 4]), 30, '#1f4d33', .4, 994, false, { alpha: .25, passes: 1 }); X.restore();
        inkLine(q, 24, GREEN, .5, 995);
        if (tk < 1) { const [px, py] = q[q.length - 1]; X.save(); X.translate(px, py); X.rotate(.6); inkShape(rectPts(-6, -78, 12, 70, 2, 2), PAL.ink, 2.5, .3, 996); inkShape([[-6, -8], [6, -8], [0, 6]], GREEN, 2, .3, 997); X.restore(); }
      }
    }
    hand('Diagnosis', 0, 124, 58, tTick1 + .02, tTick1 + .38, { pencil: false });
    hand('confirmed', 0, 186, 58, tTick1 + .3, tTick1 + .66, { pencil: false });
    X.restore();
  }
  if (t > tSnap) tack(...PQ, 1.15, { pressed: E.outBack(prog(t, tSnap, tSnap + .07)) });   // pinned on the beat
}

function camAt(t) {                                       // [cx, cy, zoom], kept inside the board
  const [x, y, z] = camRaw(t), hw = DW / 2 / z + 4, hh = DH / 2 / z + 4;
  const shake = t > tSnap ? Math.sin((t - tSnap) * 46) * kick(t - tSnap, 7) * 7 : 0;
  return [t < tS(0) + .25 ? x : clamp(x, Math.min(BDW / 2, hw - 500), Math.max(BDW / 2, BDW - hw + 500)), clamp(y, Math.min(BHt / 2, hh - 300), Math.max(BHt / 2, BHt - hh + 300)) + shake, z];   // the cork runs past the board edge
}
function camRaw(t) {
  if (t < tS(1) - HOP) {                                  // whip in from the left, settling on the first three questions
    const k = E.outC(prog(t, tWhip, tWhip + .4)), d = prog(t, tWhip + .4, tS(1) - HOP);
    return [CTR[0][0] - (1 - k) * 700 + d * 25, CTR[0][1], CTR[0][2] * (1 + (1 - k) * .15)];
  }
  if (t < tBack0) {
    let s = 1; while (s < NS - 1 && t >= tS(s + 1) - HOP) s++;
    if (t < tS(s)) {                                      // hop s-1 → s: whip along the thread with a zoom dip
      const k = E.io(prog(t, tS(s) - HOP, tS(s))), A = CTR[s - 1], B = CTR[s], dA = s - 1 === 0 ? 25 : 25 * (NODES[STOPS[s - 1][0]].r % 2 ? -1 : 1);
      return [lerp(A[0] + dA, B[0], k), lerp(A[1], B[1], k), Math.exp(lerp(Math.log(A[2]), Math.log(B[2]), k)) * (1 - Math.sin(k * Math.PI) * .12)];
    }
    const d = prog(t, tS(s), tS(s) + BEAT - HOP), dir = NODES[STOPS[s][0]].r % 2 ? -1 : 1;
    return [CTR[s][0] + d * 25 * dir, CTR[s][1], CTR[s][2] * (1 + kick(t - tS(s), 9) * .06)];
  }
  const L = CTR[NS - 1], k = E.io(prog(t, tBack0, tBack1)), zk = Math.exp(lerp(Math.log(L[2]), Math.log(ZW), k));
  // held breath: nearly still, then a deliberate close push toward the patient and empty answer slot
  const lean = E.io(prog(t, 127.5, 130.9)), close = E.ioS(prog(t, 127.9, 130.75));
  const mix = (A, B, q) => [lerp(A[0], B[0], q), lerp(A[1], B[1], q), Math.exp(lerp(Math.log(A[2]), Math.log(B[2]), q))];
  let c = [lerp(L[0] + 25, BDW / 2, k) + lean * (QX - BDW / 2) * .26, lerp(L[1], BHt / 2, k) + lean * (QY - BHt / 2) * .3, zk * (1 + lean * .2) * (1 + kick(t - tBack1, 6) * .02 * (t > tBack1 ? 1 : 0))];
  c = mix(c, [QX - 330, QY - 120, 1.1], close);
  // push in on the answer as it pins and confirms, then slide over so the title has the left of frame
  c = mix(c, [QX - 150, QY - 70, 1.3], E.io(prog(t, tSnap - .05, tSnap + .6)));
  c = mix(c, [QX - 700, QY - 70, 1.0], E.io(prog(t, 132.75, 133.3)));
  return c;
}
function evCard(i, t) {                                   // one clinical event, slapped onto the cork as the thread arrives
  const n = NODES[i], tn = tNode(i), a = t - (tn - .12);
  if (a < 0) return;
  const k = E.outC(clamp(a / .12)), hit = t >= tn ? kick(t - tn, 9) : 0;
  const sneeze = i === SNEEZE_I, sk = sneeze ? kick(t - tSneeze, 7) : 0, sf = sneeze ? Math.sin(E.io(prog(t, tSneeze - .1, tSneeze + .26)) * Math.PI) : 0;
  const sn = NODES[SNEEZE_I], dist = Math.hypot(n.x - sn.x, n.y - sn.y);
  const recoil = sneeze ? 0 : kick(t - tSneeze, 11) * Math.max(0, 1 - dist / 760);
  const rx = recoil ? (n.x - sn.x) / Math.max(1, dist) * 34 * recoil : 0, ry = recoil ? (n.y - sn.y) / Math.max(1, dist) * 26 * recoil : 0;
  const s = lerp(1.28, 1, k) * (1 + hit * .05), sq = 1 + hit * .07;
  X.save(); X.translate(n.x + sk * 18 + rx, n.y - (1 - k) * 40 - sk * 24 + ry);
  X.rotate(n.rot + (1 - k) * (i % 2 ? .14 : -.14) + settleAt(n.x, n.y, t) + sf * .16 + recoil * (i % 2 ? .08 : -.08)); X.scale(s * sq * (1 - sf * .46 + sk * .09), s / sq * (1 + sf * .18));
  X.globalAlpha *= clamp(a / .05);
  card(0, 0, { w: CW, h: CH, lines: false, stock: n.q ? QSTOCK : PSTOCK, seed: 500 + i, shadow: 1.2 + (1 - k) * 1.6 });
  if (n.q) {
    if (sneeze) sneezeQuestionFace(t);
    else { X.save(); X.translate(0, -66); GLYPH['?'](3.3); X.restore(); }
  }
  else {
    const wx = -CW / 2 + 22, wy = -CH / 2 + 22, ww = CW - 44, wh = 234;
    inkShape(rectPts(wx, wy, ww, wh, 3, 3), TINT[n.g] || '#eee', 3, .8, 520 + i);
    if (n.g === 'heart') {                                // ECG paper grid behind the trace
      X.save(); X.globalAlpha *= .4;
      for (let gx = wx + 22; gx < wx + ww - 6; gx += 26) p4Line([[gx, wy + 8], [gx, wy + wh / 2], [gx, wy + wh - 8]], 1.8, '#e08a7a', .3, 530 + gx, false, { passes: 1, rough: .4 });
      for (let gy = wy + 20; gy < wy + wh - 6; gy += 26) p4Line([[wx + 8, gy], [wx + ww / 2, gy], [wx + ww - 8, gy]], 1.8, '#e08a7a', .3, 560 + gy, false, { passes: 1, rough: .4 });
      X.restore();
    }
    X.save(); X.translate(0, wy + wh / 2); GLYPH[n.g](n.g === 'heart' ? 4.2 : 3.2); X.restore();
  }
  const L = capLines(n.cap, CAP, CW - 36);
  L.forEach((s, j) => word(s, 0, L.length === 1 ? 138 : 112 + j * 56, CAP, { font: 'SH', col: PAL.ink, ax: .5, seed: i * 3 + j, bake: true }));
  X.restore();
}
function deadCard(d, j, t) {
  if (t < d.t - .1) return;
  const k = E.outC(prog(t, d.t - .1, d.t)), sq = t > d.t ? 1 + kick(t - d.t, 14) * .12 : 1, s = lerp(1.3, 1, k);
  X.save(); X.translate(d.x, d.y); X.rotate(d.rot + settleAt(d.x, d.y, t)); X.scale(s * sq, s / sq); X.globalAlpha *= clamp((t - d.t + .1) / .05);
  card(0, 0, { w: BWd, h: BHd, lines: false, stock: '#f1e8d2', seed: 600 + j, shadow: 1 + (1 - k) });
  X.save(); X.translate(0, -30); GLYPH[d.g](d.g === 'heart' ? 2 : 1.6); X.restore();
  word(d.cap, 0, 88, 36, { font: 'SH', col: PAL.inkSoft, ax: .5, seed: 40 + j, bake: true });
  const xk = E.outBack(prog(t, d.t + .2, d.t + .32));       // ruled out: red cross stamped on the corner
  if (xk > 0) { X.save(); X.translate(BWd / 2 - 36, -BHd / 2 + 40); X.scale(xk, xk); inkLine([[-24, -24], [24, 24]], 10, PAL.red, .6, 640 + j); inkLine([[24, -24], [-24, 24]], 10, PAL.red, .6, 650 + j); X.restore(); }
  X.restore();
}
// The cork is copied 1:1 into a private canvas once: drawing the big PNG directly at changing zooms lets the browser's
// scaled-image cache depend on which frame was seeked first, so the texture differed between render chunks.
let CORK = null;
function corkSrc() {
  const im = IMG.cork; if (!im) return null;
  if (!CORK) { CORK = document.createElement('canvas'); CORK.width = im.naturalWidth; CORK.height = im.naturalHeight; CORK.getContext('2d').drawImage(im, 0, 0); }
  return CORK;
}
function board(t) {
  const ck = corkSrc();
  if (ck) { X.save(); X.translate(-700, -400); X.scale((BDW + 1400) / DW, (BHt + 800) / DH); X.drawImage(ck, 0, 0, DW, DH); X.restore(); }
  X.save(); X.globalCompositeOperation = 'multiply'; X.globalAlpha = .22; X.fillStyle = PAL.peach; X.fillRect(-700, -400, BDW + 1400, BHt + 800); X.restore();
  // the empty last slot: a pencilled outline and a question, waiting
  const sa = appear(t, tNode(19) + .2, .5) * vanish(t, tSnap - .12, .1);
  if (sa > 0) {
    const focus = diagnosisCue(t);
    X.save(); X.globalAlpha *= sa * (.55 + focus * .35); X.translate(QX, QY); X.rotate(.02);
    pencilDashes(sw4(rectPts(-HW / 2, -HH / 2, HW, HH, 12, 3), 980, 1.4), 22, 16, 5 + focus * 3, focus > .2 ? PAL.ink : PAL.inkSoft, 980);
    const br = 1 + Math.sin(Math.max(0, t - 127.5) * 3.2) * .05;
    word('?', 0, 70, 220 + focus * 26, { font: 'SH', col: focus > .2 ? PAL.ink : PAL.inkSoft, ax: .5, s: br, seed: 981, bake: true });
    X.restore();
  }
  NODES.forEach((n, i) => evCard(i, t));
  DEAD.forEach((d, j) => deadCard(d, j, t));
  DEAD.forEach(d => {                                     // side strings: from the event's pin out to the dead end
    const k = E.outC(prog(t, d.t - .28, d.t - .04));
    if (k > 0) thread(sag(PIN(NODES[d.p]), d.corner, .06, 10), { w: 8, k, tip: k < 1 });
  });
  thread(ROUTE, { w: 12, k: routeK(t), tip: routeK(t) < 1 });
  NODES.forEach((n, i) => { if (t >= tNode(i) - .02) tack(...PIN(n), .9, { pressed: E.outBack(prog(t, tNode(i), tNode(i) + .07)) }); });
  DEAD.forEach(d => { if (t >= d.t - .02) { const pr = E.outBack(prog(t, d.t, d.t + .07)); tack(d.x, d.y - BHd / 2 + 20, .7, { pressed: pr }); tack(...d.corner, .7, { pressed: pr }); } });
  // the loose end hangs off the last question, swaying, until the answer pins and it snaps taut
  const pl = PIN(NODES[19]);
  if (t < tSnap && t > tNode(19) + .1) {
    const sw = Math.sin(t * 1.6) * 16, hang = E.outC(prog(t, tNode(19) + .1, tNode(19) + .6));
    thread(spline([pl, [pl[0] + 130, pl[1] - 10 - 30 * hang], [pl[0] + 230 + sw, pl[1] + 30 + 110 * hang]], 8), { w: 12 });
  }
  if (t > tSnap) { const sn = spring(t - tSnap, 4.5, .3); thread(sag(pl, PQ, .2 * (1 - sn) + .012, 12), { w: 12 }); }
  diagnosisFocus(t);
  diagnosisSpot(t);
  heroCard(t);
  dxoConga(t);
}
function diagnosisCue(t) {
  return E.ioS(prog(t, 128.0, 130.8)) * (1 - E.ioS(prog(t, 132.55, 133.35)));
}
function diagnosisLightsDown(t) {
  return E.ioS(prog(t, 129.5, tSnap)) * (1 - E.ioS(prog(t, 132.55, 133.35)));
}
// the cue / lights-down / spotlight are soft coloured pencil laid on the board (world space): warm brown pencil
// rubbed in round the edges to dim (multiply), pale yellow pencil pools for the light — no gradients, no additive light
const BOARD_BOX = [-800, -800, BDW + 800, BHt + 800];
function diagnosisFocus(t) {
  const cue = diagnosisCue(t), house = diagnosisLightsDown(t), focus = Math.max(cue, house);
  if (focus <= 0) return;
  const cx = QX - 265, cy = QY - 150, hx = QX - 185, hy = QY - 40, cueOnly = cue * (1 - house);
  softShroud(cx, cy, 760, 600, '#8a6450', cueOnly * .62, 1201, BOARD_BOX, 5, .42);
  const br = 1 + .08 * Math.sin((t - 128) * 3.2);
  softPool(hx, hy, 1020 * 1.34 * .8, 1020 * .88 * .8, '#ffe6b0', cueOnly * .38 * br, 1211, 5, .3);
  softPool(QX - 90, QY - 65, 520, 500, '#fff4cc', cueOnly * .3, 1221, 3, .35);
}
function diagnosisHouseMask(t) {
  const house = diagnosisLightsDown(t);
  if (house <= 0) return;
  softShroud(QX - 170, QY - 20, 760 * 1.24 * .82, 760 * .82 * .82, '#4a3226', house * .9, 1231, BOARD_BOX, 4, .07);
}
function diagnosisSpot(t) {
  const house = diagnosisLightsDown(t), warm = E.ioS(prog(t, 128.0, tSnap - .08)) * (1 - house * .9) * (1 - .28 * E.ioS(prog(t, 134.2, 136.0)));
  if (warm <= 0) { diagnosisHouseMask(t); return; }
  const pulse = .88 + .12 * Math.sin((t - 128) * 3.4);
  softPool(QX - 130, QY - 170, 1050, 1000, '#ffe3a6', warm * pulse * .45, 1241, 5, .25);
  softPool(QX + 30, QY + 20, 540, 520, '#fff2c4', warm * pulse * .3, 1251, 3, .35);
  diagnosisHouseMask(t);
}
// ── D·X·O letter characters conga along the diagnostic thread, then perch on the answer card ───────
const DXO_KIDS = [['D', PAL.lemon], ['X', PAL.coral], ['O', PAL.teal]];
const DXO_WAIT = [[QX - 310, QY + 124], [QX - 210, QY + 138], [QX - 110, QY + 124]];
const DXO_FINAL = [[QX - 126, QY - HH / 2 + 14], [QX - 24, QY - HH / 2 + 12], [QX + 80, QY - HH / 2 + 14]];
function congaRoutePose(t, i) {
  const tt = t - .18 - i * .07, k = routeK(tt);
  const p = pAt(ROUTE, k), p0 = pAt(ROUTE, Math.max(.001, k - .006)), p1 = pAt(ROUTE, Math.min(1, k + .006));
  const lag = i * .5, bEff = beatAt(t) - lag, ba = Math.floor(bEff * 2) / 2, bb = ba + .5;
  const ta = beat(ba + lag), tb = beat(bb + lag), u = E.ioS(prog(t, ta, tb));
  const hop = Math.sin(u * Math.PI) * (62 + i * 9), land = kick(t - ta, 14), crouch = E.inQ(prog(t, tb - .08, tb)) * .14;
  return { x: p[0], y: p[1] - 16 - hop, rot: Math.atan2(p1[1] - p0[1], p1[0] - p0[0]) * .14 + Math.sin(beatAt(t) * Math.PI + i) * .055, air: hop, sq: 1 - land * .2 + crouch, up: Math.min(1, hop / 58), k };
}
function blendPose(A, B, q) {
  return { x: lerp(A.x, B.x, q), y: lerp(A.y, B.y, q), rot: lerp(A.rot || 0, B.rot || 0, q), air: lerp(A.air || 0, B.air || 0, q), sq: lerp(A.sq ?? 1, B.sq ?? 1, q), up: lerp(A.up || 0, B.up || 0, q), k: lerp(A.k || 0, B.k || 0, q), glance: lerp(A.glance || 0, B.glance || 0, q) };
}
function dxoLetterKid(L, col, x, y, o = {}) {
  const s = o.s ?? 1, th = 112 * s, tw = 98 * s, leg = (72 + 46 * (o.tip || 0)) * s, sd = 1240 + L.charCodeAt(0) * 3, lw = 5 * s;
  X.save(); X.translate(x + (o.dx || 0), y);
  shadowBlob(0, Math.max(0, o.air || 0), 52 * s * (1 - Math.min(1, (o.air || 0) / 300)), 7 * s, .2);
  const sq = o.sq ?? 1; X.scale((o.spin ?? 1) / Math.max(.2, sq), sq); X.rotate(o.rot || 0);
  const kn = 8 * s * (1 - (o.tip || 0));
  inkLine([[-18 * s, -leg], [-22 * s - kn, -leg * .5], [-20 * s, -6 * s]], lw, PAL.ink, .5, sd);
  inkLine([[18 * s, -leg], [22 * s + kn, -leg * .5], [20 * s, -6 * s]], lw, PAL.ink, .5, sd + 1);
  inkShape(ellPts(-27 * s, -6 * s + (o.tip || 0) * -4 * s, 13 * s, 6 * s, 8), PAL.ink, 0, .4, sd + 2);
  inkShape(ellPts(27 * s, -6 * s + (o.tip || 0) * -4 * s, 13 * s, 6 * s, 8), PAL.ink, 0, .4, sd + 3);
  X.translate(0, -leg + 4 * s);
  const sw = o.swing || 0, ul = o.upL || 0, ur = o.upR || 0;
  const lhx = lerp(-tw / 2 - 34 * s, -tw / 2 - 40 * s, ul), lhy = lerp(-th * .04 + sw * 1.4, -th * 1.3, ul);
  inkLine([[-tw / 2 + 4 * s, -th * .42], [lerp(-tw / 2 - 24 * s, -tw / 2 - 30 * s, ul), lerp(-th * .26 + sw, -th * .82, ul)], [lhx, lhy]], lw, PAL.ink, .5, sd + 4);
  dot(lhx, lhy, 6 * s);
  const vx = lerp(tw / 2 + 34 * s, tw / 2 + 40 * s, ur), vy = lerp(-th * .04 - sw * 1.4, -th * 1.3, ur);
  inkLine([[tw / 2 - 4 * s, -th * .42], [lerp(tw / 2 + 24 * s, tw / 2 + 30 * s, ur), lerp(-th * .26 - sw, -th * .82, ur)], [vx, vy]], lw, PAL.ink, .5, sd + 5);
  dot(vx, vy, 6 * s);
  const back = (o.spin ?? 1) < 0;
  inkShape(rectPts(-tw / 2, -th, tw, th, 18 * s, 3), back ? '#efe2c4' : col, 4.5 * s, .9, sd + 7);
  if (!back) {
    word(L, 0, -th * .12, th * .6, { ax: .5, col: PAL.ink, seed: L.charCodeAt(0) });
    const ey = -th * .8, wink = L === 'O' && o.wink > .55;
    [-1, 1].forEach(side => {
      const ex = side * tw * .2, look = (o.glance || 0) * 4 * s;
      if (wink && side > 0) inkLine([[ex - 10 * s, ey + 1 * s], [ex + 10 * s, ey - 3 * s], [ex + 18 * s, ey + 3 * s]], 3.6 * s, PAL.ink, .3, sd + 11);
      else { inkShape(ellPts(ex, ey, 9 * s, 10 * s, 10), '#fffaf0', 2.5 * s, .3, sd + 8 + side); dot(ex + look, ey + 2 * s, 4.2 * s); }
    });
  }
  X.restore();
}
function dxoFrameGuard(P, t, s) {
  const [cx, cy, z] = camAt(t), margin = 62;
  const halfW = 138 * s, topH = 250 * s, footH = 26 * s;
  let { x, y } = P;
  const sx = xx => DW / 2 + (xx - cx) * z, sy = yy => DH / 2 + (yy - cy) * z;
  const left = sx(x - halfW), right = sx(x + halfW), top = sy(y - topH), bot = sy(y + footH);
  if (left < margin) x += (margin - left) / z;
  if (right > DW - margin) x -= (right - (DW - margin)) / z;
  if (top < margin) y += (margin - top) / z;
  if (bot > DH - margin) y -= (bot - (DH - margin)) / z;
  return { ...P, x, y };
}
function dxoKidPose(t, i) {
  const route = congaRoutePose(t, i);
  const waitBase = { x: DXO_WAIT[i][0], y: DXO_WAIT[i][1], rot: (i - 1) * .08, air: 0, sq: 1, up: 0, k: 1, glance: 1 };
  const waitIn = E.ioS(prog(t, 127.35 + i * .04, 128.0 + i * .04));
  let P = blendPose(route, waitBase, waitIn);
  if (t >= 128.0 && t < tF0 + .05) {
    const lookT = E.ioS(prog(t, 128.0, 130.8)), peer = Math.sin((t - 128.0) * 3.6 + i * 1.8), shrug = kick(t - (129.95 + i * .12), 5);
    P.x = waitBase.x + lookT * (24 + i * 10) + peer * (8 + i * 2);
    P.y = waitBase.y - Math.abs(peer) * 6 - shrug * 10;
    P.rot = (i - 1) * .08 + lookT * (.18 - i * .05) + peer * .045;
    P.sq = 1 - shrug * .14 + Math.abs(peer) * .025;
    P.up = i === 1 ? shrug * .55 : shrug * .35;
    P.glance = 1.15;
  }
  const launch = tTick1 + .05 + i * .08, land = launch + .34, finalBase = { x: DXO_FINAL[i][0], y: DXO_FINAL[i][1], rot: -.05 + i * .035, air: 0, sq: 1, up: 1, k: 1, glance: -1 };
  if (t > launch) {
    const u = E.ioS(prog(t, launch, land)), arc = Math.sin(prog(t, launch, land) * Math.PI) * (88 + i * 12);
    P = blendPose(P, finalBase, u); P.y -= arc; P.air += arc; P.sq = Math.max(.8, P.sq - kick(t - land, 13) * .2);
  }
  if (t > tSnap + .18 && t < 133.2) {
    const celebT = [tSnap + .28, tSnap + .52, tSnap + .76][i], hop = Math.sin(prog(t, celebT, celebT + .26) * Math.PI) * 42;
    if (t > celebT && t < celebT + .26) { P.y -= hop; P.air += hop; P.up = 1; }
    P.sq = Math.max(.78, P.sq - kick(t - (celebT + .26), 12) * .18);
  }
  const calm = E.ioS(prog(t, 133.2, 135.4));
  if (calm > 0) { P.up *= 1 - calm; P.rot *= 1 - calm * .7; P.glance = lerp(P.glance || 0, -1, calm); P.sq = lerp(P.sq ?? 1, 1, calm); }
  return P;
}
function dxoConga(t) {
  if (t < tWhip - .08) return;
  DXO_KIDS.forEach(([L, col], i) => {
    const zs = Math.pow(1.08 / camAt(t)[2], .42), s = .56 * zs, P = dxoFrameGuard(dxoKidPose(t, i), t, s);
    const flipK = L === 'D' ? prog(t, beat(192) - .06, beat(192.5) + .02) : 0;
    const spin = L === 'D' && flipK > 0 && flipK < 1 ? Math.cos(flipK * Math.PI * 2) : 1;
    const wobble = L === 'X' ? Math.sin((t - 123.4) * 14) * .055 * vanish(t, 132.7, .45) : 0;
    const wink = L === 'O' ? Math.max(kick(t - 129.12, 4), kick(t - 132.18, 5)) : 0;
    const swing = Math.sin(beatAt(t) * Math.PI * 2 + i) * 7 * (t < 133.4 ? 1 : .25);
    dxoLetterKid(L, col, P.x, P.y, { s, rot: (P.rot || 0) + wobble, sq: P.sq ?? 1, spin, air: P.air || 0, swing, glance: P.glance || 0, wink, upL: Math.max(P.up || 0, .2 + .15 * Math.sin(t * 5 + i)), upR: Math.max(P.up || 0, .2 + .15 * Math.cos(t * 5 + i)), tip: 0 });
  });
}


shot('c2board', tWhip, (t) => {
  const [cx, cy, z] = camAt(t), [px, py] = camAt(t - 1 / 48);
  const roll = Math.sin(prog(t, tBack0, tBack1) * Math.PI) * .03 + (t < tBack0 ? wob(t, 9, kick(t - tS(1), 10) * .004) : 0);
  X.save(); cam(cx, cy, z, roll); board(t); X.restore();
  const vx = (cx - px) * z * 2.4, vy = (cy - py) * z * 2.4;
  if (Math.hypot(vx, vy) > 6 && t < tBack1) POST.smear = [vx, vy];
  // title: big cut-paper slam on its own pinned card (left of frame; the confirmed card stays in view right),
  // then the credit and the citation — all three readable before the fade
  const t1 = beat(205), t2 = beat(205.5), t3 = beat(206), t4 = beat(206.5), t5 = beat(207);
  if (t > t1 - .3) {
    const k = E.outC(prog(t, t1 - .3, t1)), TX = 800, TY = 540;
    X.save(); X.globalAlpha *= k;
    card(TX, TY + (1 - k) * 80, { w: 1240, h: 640, lines: false, stock: '#fbf5e6', seed: 998, rot: -.012, shadow: 1.6, s: lerp(1.08, 1, k) });
    X.restore();
    if (t > t1) [[TX - 560, TY - 285], [TX + 560, TY - 295]].forEach(([x, y]) => tack(x, y, 1, { pressed: E.outBack(prog(t, t1, t1 + .07)) }));
    row([['ONE', t1], ['MORE', t2]], TX, TY - 130, 190, { from: 1.8, maxW: 1060 });
    slam('CLUE', TX, TY + 95, 270, t3, { col: PAL.red, edge: true, from: 2.4 });
    word('inspired by \u201cSequential diagnosis in medicine using language models\u201d', TX, TY + 205, 34, { font: 'SHm', col: '#1d130c', edge: true, ax: .5, alpha: appear(t, t4, .4) });
    word('Science, 22 October 2026', TX, TY + 262, 32, { font: 'FBo', col: '#1d130c', edge: true, ax: .5, alpha: appear(t, t5, .4) });
  }
  // the film ends holding on the finished board: title, credit and the confirmed diagnosis all stay in view
  POST.vign = .62;
});
})();
