// 09_finale_extras.js — two chorus-2 shots that cut into 08_finale.js (a shot runs until the next t0, so these end
// c2kill at 104.357 and c2kill2 at 110.71):
//   c2web     104.357 → 106.7  "Little by little, get a better view." — a patient at the centre, investigations branch out fast
//   c2imagine 110.71 → 114.6   "Imagine what we could do." — no words: a night globe pops question → test → ✓ bubbles; people helped; dawn on "do."
(() => {
'use strict';
const L31 = LINES[31].words.map(w => w[1]), L33 = LINES[33].words.map(w => w[1]);
const TESTS = ['xray', 'tube', 'dna', 'slide', 'flask', 'mri', 'ct', 'heart', 'steth', 'drop', 'thermo', 'pill'];
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
const softDisc = (x, y, r, col, a, seed) => { const pts = sw4(ellPts(x, y, r, r, 10), seed, r * .12); p4Fill(() => curve(pts, true), col, { alpha: a, wash: .85, grain: .6, tex: 'tex_soft' }); };
// tiny pencil sparkle: two crossed soft strokes
function sparkle(x, y, sz, rot, col, a, seed) {
  if (a <= .01 || sz < 1) return;
  X.save(); X.translate(x, y); X.rotate(rot);
  p4Line([[-sz, 0], [0, 0], [sz, 0]], Math.max(1.5, sz * .28), col, .3, seed, false, { alpha: a, rough: .4 });
  p4Line([[0, -sz], [0, 0], [0, sz]], Math.max(1.5, sz * .28), col, .3, seed + 1, false, { alpha: a, rough: .4 });
  X.restore();
}

// ── c2web ─────────────────────────────────────────────────────────────────────────────────────────────────────────
const C = [960, 470];
const NODES = [];                                          // {p:[x,y], parent:[x,y], t0, lvl, g}
(() => {
  const L1 = [-165, -125, -55, -15, 25, 155];
  const t1 = [104.385, 104.453, 104.52, 104.608, 104.718, 104.831];
  const t2 = [104.916, 104.956, 105.002, 105.047, 105.093, 105.139, 105.184, 105.238, 105.3, 105.351, 105.415, 105.466];
  let gi = 0, k2 = 0, k3 = 0;
  L1.forEach((a1, i) => {
    const r = Math.PI / 180, p1 = [C[0] + Math.cos(a1 * r) * 430, C[1] + Math.sin(a1 * r) * 330];
    NODES.push({ p: p1, par: C, t0: t1[i], lvl: 1, g: TESTS[gi++ % TESTS.length], s: i });
    [-24, 24].forEach((d, j) => {
      const a2 = a1 + d, p2 = [C[0] + Math.cos(a2 * r) * 800, C[1] + Math.sin(a2 * r) * 600];
      NODES.push({ p: p2, par: p1, t0: t2[k2++], lvl: 2, g: TESTS[gi++ % TESTS.length], s: 10 + i * 2 + j });
      [-12, 12].forEach((d3, m) => {
        const a3 = a2 + d3, p3 = [C[0] + Math.cos(a3 * r) * 1180, C[1] + Math.sin(a3 * r) * 880];
        NODES.push({ p: p3, par: p2, t0: 105.616 + (k3++) * .016, lvl: 3, g: (k3 % 3) ? TESTS[gi++ % TESTS.length] : '?', s: 40 + k3 });
      });
    });
  });
})();
const QS = Array.from({ length: 22 }, (_, i) => ({ a: hash(i * 3.1) * 6.283, r: 250 + hash(i + 7) * 900, t0: 104.412 + i * .072, s: .6 + hash(i + 2) * .7 }));
// sprite at a fixed scale per source pixel (so alternate poses of one character stay the same size)
const sprK = (n, x, y, k, o) => { const im = IMG[n]; if (im) spr(n, x, y, k * im.height, o); };
const PK = 1.1 * 420 / 1363;                                     // patient scale: 1.1 × 420 design px per 1363 source px
function patientPose(t) {
  const tv = L31[6] + .04;
  if (t < L31[2]) return { name: 'pd_patient_worried', t0: 103.497, flip: false };
  if (t < tv) {                                            // glances at each new wave of tests: right, left (to the fan), right (to the lens)
    const sw = [[L31[2], false], [L31[3], true], [L31[5], false]].filter(([a]) => t >= a).pop();
    return { name: 'pd_patient_curious', t0: sw[0], flip: sw[1] };
  }
  if (t < beat(163)) return { name: 'patient_happy', t0: tv, flip: false };
  return { name: 'pd_patient_cheer', t0: beat(163), flip: false };
}
function tcPose(t) {
  if (t < L31[3]) return { name: 'tc_fan', t0: L31[2] };
  if (t < L31[5]) return { name: 'tc_point', t0: L31[3] };
  if (t < L31[6] + .3) return { name: 'tc_fan', t0: L31[5] };
  return { name: 'tc_cheer', t0: L31[6] + .3 };
}
// Challenger + his magnifier. chal_lean's lens sits at (.89, .344) of the sprite; on "VIEW." a cartoon close-up lens
// swells out of it over the patient's face showing her smile at 2.2x, then he pops back into a cheer.
const CK = .5, CH_FEET = C[1] + 370, FACE = [C[0] - 9, C[1] - 84];
function chalLens(t, pp) {
  const tv = L31[6], te = L31[3];
  const e = E.outBack(prog(t, te - .15, te + .1), 1.3), lean = kick(t - L31[5], 7) * (t >= L31[5] ? 1 : 0);
  const cheer = t >= tv + .38, name = cheer ? 'chal_cheer' : 'chal_lean', im = IMG[name]; if (!im) return;
  const h = CK * im.height, w = h * im.width / im.height;
  const x = lerp(C[0] + 1250, C[0] + 290, e) + (cheer ? 110 : 0) - lean * 20, ck = kick(t - (tv + .38), 10) * (cheer ? 1 : 0);
  const rot = (1 - e) * .3 - lean * .05;
  spr(name, x, CH_FEET - ck * 50, h, { flip: true, rot, seed: 33, shadow: 1, sx: 1 + ck * .08, sy: 1 - ck * .08 });
  const mag = cheer ? 0 : E.outBack(prog(t, tv - .03, tv + .1), 1.6);
  if (mag <= 0) return;
  // where the sprite's lens is (rotation about the feet)
  const lx0 = -(.89 - .5) * w, ly0 = -(1 - .344) * h, c = Math.cos(rot), s = Math.sin(rot);
  const L0 = [x + lx0 * c - ly0 * s, CH_FEET + lx0 * s + ly0 * c];
  const r = lerp(48, 158, mag), cx = lerp(L0[0], FACE[0] + 40, mag), cy = lerp(L0[1], FACE[1] - 6, mag);
  const hand = [x - (.74 - .5) * w, CH_FEET - .48 * h];
  inkLine([[cx + r * .7, cy + r * .7], hand], 16, PAL.ink, .6, 3301);
  X.save(); X.beginPath(); X.arc(cx, cy, r, 0, 7); X.clip();
  X.fillStyle = p4Shade('#fbf3df', .4); X.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  p4Fill(() => { X.beginPath(); X.rect(cx - r, cy - r, 2 * r, 2 * r); }, '#fbf3df', SOFT(1, .6));
  const Z = 2.2; X.translate(cx, cy); X.scale(Z, Z); X.translate(-FACE[0], -FACE[1]);
  sprK(pp.name, C[0], C[1] + 330, PK, { seed: 6, boil: false });
  X.restore();
  X.save(); X.beginPath(); X.arc(cx, cy, r, 0, 7); X.clip();
  softPool(cx - r * .15, cy - r * .15, r * 1.15, r * 1.15, '#bfe1ee', .32, 3305, 3, .5); X.restore();
  inkLine([[cx - r * .55, cy - r * .2], [cx - r * .25, cy - r * .55]], 10, '#ffffff', .4, 3302);
  inkShape(ellPts(cx, cy, r, r, 26), null, 14, .8, 3303);
  inkShape(ellPts(cx, cy, r + 9, r + 9, 26), null, 5, .8, 3304, PAL.brassDk);
}

shot('c2web', 104.357, (t) => {
  const tView = L31[6];
  const z = lerp(1.5, .74, E.io(prog(t, 104.357, 105.964))) * (1 + kick(t - tView, 7) * .04) * (1 + kick(t - 104.916, 9) * .02);
  const cx = 960 + E.inQ(prog(t, 106.56, 106.7)) * 1500, cy = lerp(520, 470, prog(t, 104.357, 106.059)), cr = wob(t, 11, .003);
  bgCam(() => paperBG(t < tView ? '#f3dcc0' : '#f6e6b6', .55), [cx, cy, z, cr], { par: .9, over: 3.0 });
  const whip = E.inQ(prog(t, 106.56, 106.7));             // whip-pan out, matched to the globe rolling into c2world
  if (whip > 0) POST.smear = [-whip * 800, 0];
  X.save(); cam(cx, cy, z, cr);
  // soft halo behind the patient
  softPool(C[0], C[1] + 80, 520, 500, '#fff8e1', .8, 3001, 4, .25);
  // threads first (under cards)
  NODES.forEach(n => {
    const k = E.outC(prog(t, n.t0 - .18, n.t0));
    if (k <= 0) return;
    const mid = [(n.par[0] + n.p[0]) / 2 + (hash(n.s) - .5) * 60, (n.par[1] + n.p[1]) / 2 + (hash(n.s + 1) - .5) * 60];
    thread(spline([n.par, mid, n.p], 8), { k, w: n.lvl === 1 ? 14 : n.lvl === 2 ? 11 : 8, tip: k < 1 });
  });
  // floating question marks (questions everywhere)
  QS.forEach((q, i) => {
    if (t < q.t0) return;
    const dt = t - q.t0, a = clamp(dt / .1) * (1 - clamp((dt - 1.1) / .3)); if (a <= 0) return;
    const r = q.r + dt * 60, x = C[0] + Math.cos(q.a) * r * 1.2, y = C[1] + Math.sin(q.a) * r * .8 - dt * 40;
    X.save(); X.globalAlpha *= a; X.translate(x, y); X.rotate((hash(i) - .5) * .5); X.scale(q.s * (1 + kick(dt, 12) * .4), q.s * (1 + kick(dt, 12) * .4));
    GLYPH['?'](1.6); X.restore();
  });
  // cards
  NODES.forEach(n => {
    if (t < n.t0) return;
    const sc = pop(t, n.t0, 4.2, .45), base = n.lvl === 1 ? 1.15 : n.lvl === 2 ? .95 : .8;
    // on "view" the outer "?" cards flip to reveal results, rippling outward
    let g = n.g, fl = 0;
    if (n.g === '?') { const tf = tView + .05 + hash(n.s) * .25; fl = prog(t, tf, tf + .16); if (fl > .5) g = 'tick'; }
    card(n.p[0], n.p[1] + 60 * base, { w: 175 * base, h: 220 * base, glyph: g, s: sc * (1 + kick(t - tView, 8) * .06), flip: fl < .5 ? fl : 1 - fl, rot: (hash(n.s + 5) - .5) * .35, seed: 1200 + n.s });
    tack(n.p[0], n.p[1], .9 * base, { pressed: E.outBack(prog(t, n.t0, n.t0 + .07)) });
  });
  // the patient, centre stage: worried → curious (glancing at each new wave of tests) → relieved on "view" → cheering
  const pp = patientPose(t), feet = C[1] + 330;
  const pk = kick(t - pp.t0, 10);
  const shiver = pp.name === 'pd_patient_worried' ? wob(t, 31, .025) : 0;
  const ppx = C[0] + (pp.name === 'pd_patient_worried' ? wob(t, 37, 3) : 0);
  sprK(pp.name, ppx, feet - (pp.name === 'pd_patient_cheer' ? pk * 40 : 0), PK, { seed: 6, shadow: 1, flip: pp.flip, rot: shiver + Math.sin(t * 3) * .012, sx: 1 + pk * .08, sy: 1 - pk * .08 });
  // nervous sweat drops while she's worried
  if (t < L31[2]) [0, 1].forEach(j => {
    const ph = ((t - 103.697) * 2.4 + j * .5) % 1, side = j ? 1 : -1;
    X.save(); X.globalAlpha *= Math.sin(ph * Math.PI); X.translate(ppx + side * (70 + ph * 50), feet - 445 + ph * ph * 80); X.rotate(side * .4);
    inkShape([[0, -22], [11, 2], [0, 12], [-11, 2]], '#bfe3f2', 2.5, .4, 3100 + j); X.restore();
  });
  // Test-Chooser hurries in from the left on "little," offering her fan of tests, points at the web, cheers on "view"
  if (t > L31[2] - .2) {
    const e = E.outBack(prog(t, L31[2] - .2, L31[2] + .05), 1.2), tp = tcPose(t);
    sprK(tp.name, lerp(C[0] - 1100, C[0] - 390, e), C[1] + 400 - kick(t - tp.t0, 9) * (tp.name === 'tc_cheer' ? 55 : 14), .41,
      { seed: 21, shadow: 1, rot: (1 - e) * .25 + Math.sin(t * 7) * .015, sx: 1 + kick(t - tp.t0, 12) * .07, sy: 1 - kick(t - tp.t0, 12) * .07 });
  }
  // Challenger swings in from the right on "get", magnifier up; on "VIEW." her beaming face fills his lens
  if (t > L31[3] - .15) chalLens(t, pp);
  X.restore();
  // type (screen space, on tape strips)
  X.save(); X.globalAlpha *= vanish(t, 106.62, .08);
  tapeRow([['LITTLE', L31[0], { col: PAL.red, edge: true }], ['by', L31[1], { size: 90, font: 'FBo' }], ['LITTLE,', L31[2], { col: PAL.red, edge: true }]], 960, 190, 150, { from: 1.4 }, t);
  if (t > L31[3] - .1) tapeRow([['get a', L31[3], { size: 90, font: 'FBo' }], ['BETTER', L31[5], { col: PAL.teal, edge: true }], ['VIEW.', tView, { col: PAL.red, edge: true, size: 210, hero: true, from: 2 }]], 960, 1000, 150, { from: 1.4 }, t);
  X.restore();
  POST.vign = .55;
});

// ── c2imagine (no words) ─────────────────────────────────────────────────────────────────────────────────────────
const G = [960, 590], GR = 330;
function globeSpin(R, scroll) {
  X.save(); X.beginPath(); X.arc(0, 0, R, 0, 7); X.clip();
  // ocean: cream paper base, blue rubbed in with pencil in layered wobbled discs (no flat underlay)
  p4Fill(() => { X.beginPath(); X.arc(0, 0, R + 4, 0, 7); }, '#f6efdc', { wash: 1, grain: .5, tex: 'tex_soft' });
  pkRub(0, 0, R * 1.08, R * 1.08, '#7cc3c9', { layers: 3, seed: 3409, step: .14, amp: .08, wash: .55, grain: .85, alpha: 1.6 });
  spr('globe', scroll, 0, R * 2 * 1.75, { ax: .5, ay: .5, seed: 3 });
  softPool(-R * .35, -R * .4, R * .55, R * .48, '#fff8dc', .32, 3405, 3);
  softShroud(R * .06, R * .06, R * .8, R * .8, '#7d7488', .55, 3407, [-R - 20, -R - 20, R + 20, R + 20], 3, .12);
  X.restore();
  inkShape(ellPts(0, 0, R, R, 28), null, 8, 1.4, 701);
}
function bubble(x, y, tx, ty, r, g, a, seed) {        // speech bubble at (x,y) with tail to (tx,ty)
  X.save(); X.globalAlpha *= a;
  const ang = Math.atan2(ty - y, tx - x), b1 = ang - .35, b2 = ang + .35;
  inkShape([[x + Math.cos(b1) * r * .85, y + Math.sin(b1) * r * .85], [lerp(x, tx, .55), lerp(y, ty, .55)], [x + Math.cos(b2) * r * .85, y + Math.sin(b2) * r * .85]], '#fffaf0', 3, .6, seed + 1);
  inkShape(ellPts(x, y, r, r * .92, 16), '#fffaf0', 3.5, 1, seed);
  X.translate(x, y); GLYPH[g](r / 52); X.restore();
}
// 18 bubbles: born as "?", become a test, then a green tick
const BUB = Array.from({ length: 18 }, (_, i) => {
  const a = -Math.PI / 2 + (i % 2 ? 1 : -1) * (.35 + (i * .37) % 1.25) + (hash(i) - .5) * .2;
  const tb = 110.729 + Math.pow(i / 17, 1.15) * 2.3;
  return { a, tb, d: 130 + hash(i + 3) * 120, r: 58 + hash(i + 9) * 20, test: TESTS[i % TESTS.length] };
});
const HELP = [['help_grandma', 330, 640, 330], ['help_farmer', 1600, 660, 360], ['help_mother', 560, 860, 330], ['help_kid', 1380, 900, 300], ['help_wheel', 250, 1010, 290], ['help_nurse', 1690, 1020, 320]];
const HELP_T = [111.2, 111.347, 111.49, 111.57, 111.65, 111.73];
const SICK = ['pd_grandma_sick', 'pd_farmer_sick', 'pd_mother_worried', 'pd_kid_hurt', 'pd_wheel_worried', 'pd_nurse_run'];

shot('c2imagine', 110.71, (t) => {
  const tDo = L33[7];
  const dawn = E.ioS(prog(t, tDo - .04, tDo + 1.55));   // slow, magical ~1.6 s dawn bloom starting on "do."
  const z = lerp(1.35, 1, E.io(prog(t, 110.71, 111.378))) * (1 + kick(t - tDo, 6) * .05);
  bgCam(() => {
    // night → dawn wash
    // sunshine spreads outward from the globe: day paper underneath, the night wash recedes radially (brightness only ever rises)
    // (the night is dark indigo pencil rubbed over the paper; dawn opens a widening hole in it, soft-edged by layers)
    paperBG(dawn > 0 ? '#ffd99a' : null, dawn * 1.1);
    if (dawn < 1) {
      const R = 2400 * dawn;
      softShroud(G[0], G[1], R * .4 + 1, R * .4 + 1, '#2e3266', 1.15 * (1 - dawn * .35), 3501, [-200, -200, DW + 200, DH + 200], 5, .375);
    }
    // stars fade with dawn: tiny soft pencil dots
    for (let i = 0; i < 60; i++) { const x = hash(i * 1.3) * DW, y = hash(i * 2.7) * 700, tw = .5 + .5 * Math.sin(t * 3 + i); softDisc(x, y, 2.4 + hash(i) * 2.8, '#fff4c8', (1 - dawn) * (.35 + .6 * tw), 3520 + i); }
  }, [960, 560, z, 0], { par: .86, over: 1.4 });
  X.save(); cam(960, 560, z);
  // sunrise glow behind the globe on "do."
  if (dawn > 0) {
    softPool(G[0], G[1], GR * 3.2, GR * 3.0, '#ffcf73', .5 * dawn, 3601, 5, .35);
    pencilRays(G[0], G[1], GR * .9, 1600, 16, t * .08, '#fbe49a', .5 * dawn, 3611, 34);
  }
  // magic: golden motes twinkle outward from the globe while the dawn blooms
  {
    const life = prog(t, tDo - .04, tDo + 2.1);
    if (life > 0 && life < 1) {
      X.save();
      for (let i = 0; i < 46; i++) {
        const born = hash(i * 7.3) * .62, u = (life - born) / .38;
        if (u <= 0 || u >= 1) continue;
        const a0 = hash(i * 3.1) * 6.283, r = GR * (1.02 + E.outC(u) * (.35 + hash(i * 5.7) * .75));
        const x = G[0] + Math.cos(a0) * r, y = G[1] + Math.sin(a0) * r - u * 40, k = Math.sin(u * Math.PI), sz = (10 + hash(i * 9.1) * 16) * k;
        sparkle(x, y, sz, t * 1.5 + i, i % 3 ? '#f2cc5a' : '#fff2b8', .85 * k, 3700 + i * 3);
      }
      X.restore();
    }
  }
  // the globe, spinning
  const scroll = lerp(GR * .7, -GR * .7, E.ioS(prog(t, 110.71, 114.6)));
  X.save(); X.translate(G[0], G[1] + Math.sin(t * 2.2) * 6); X.scale(1 + kick(t - tDo, 9) * .06, 1 + kick(t - tDo, 9) * .06);
  globeSpin(GR, scroll);
  // night side: warm city lights twinkle on as bubbles are born
  X.save(); X.beginPath(); X.arc(0, 0, GR, 0, 7); X.clip();
  p4Fill(() => { X.beginPath(); X.rect(-GR, -GR, GR * 2, GR * 2); }, '#20264a', SOFT(.5 * (1 - dawn), .8));
  for (let i = 0; i < 40; i++) {
    const on = 110.729 + hash(i * 5.1) * 2.5; if (t < on) continue;
    const lx = ((hash(i * 1.9) * 2 - 1) * GR * 1.4 + scroll * .9), ly = (hash(i * 3.3) * 2 - 1) * GR * .8;
    if (Math.hypot(lx, ly) > GR * .95) continue;
    softDisc(lx, ly, 4.5 + kick(t - on, 10) * 6, '#ffe28a', (.6 + .4 * Math.sin(t * 6 + i)) * appear(t, on, .15), 3800 + i);
  }
  X.restore();
  X.restore();
  // bubbles pop out of the surface: ? → test → ✓
  BUB.forEach((b, i) => {
    if (t < b.tb) return;
    const dt = t - b.tb, out = E.outBack(clamp(dt / .32), 1.4);
    const sx = G[0] + Math.cos(b.a) * GR, sy = G[1] + Math.sin(b.a) * GR;
    const d = GR + b.d * out + Math.sin(t * 2 + i) * 6;
    const x = G[0] + Math.cos(b.a) * d * 1.25, y = G[1] + Math.sin(b.a) * d * .95 - dt * 10;
    let g = '?';
    const tTest = b.tb + .45, tTick = Math.min(b.tb + .9, tDo);
    if (t >= tTick || t >= tDo) g = 'tick'; else if (t >= tTest) g = b.test;
    const flip = Math.max(kick(t - tTest, 18), kick(t - tTick, 18));
    X.save(); X.translate(x, y); X.scale(1 - flip * .3 + kick(t - tDo, 9) * .15, 1 + flip * .15); X.translate(-x, -y);
    bubble(x, y, sx, sy, b.r * out, g, clamp(dt / .08), 1300 + i * 7);
    X.restore();
  });
  // people helped: each pops up unwell with a "?" bubble; when their ✓ arrives they spring into the happy pose.
  // The nurse runs in from the edge instead. On "do." everyone hops on the beat.
  HELP.forEach(([n, x, y, h], i) => {
    const t0 = HELP_T[i]; if (t < t0 - .12) return;
    const ts = Math.min(t0 + .34, tDo - .02), well = t >= ts, k = h / (IMG[n] ? IMG[n].height : 1400);
    const name = well ? n : SICK[i], sw = kick(t - ts, 10) * (well ? 1 : 0);
    const hop = t > tDo ? Math.abs(Math.sin((t - tDo) * Math.PI / BEAT)) * 22 * kick(t - tDo, 1.2) : 0;
    const run = n === 'help_nurse' && !well, side = x < 960 ? -1 : 1;   // bubbles on the outside, clear of the globe's
    let px = x, py = y, up = 1, rot = 0;
    if (run) { const e = E.outC(prog(t, t0 - .12, ts)); px = lerp(DW + 260, x, e); py = y - Math.abs(Math.sin(t * 16)) * 14; rot = -.06; }
    else { if (t < t0 - .02) return; up = spring(t - t0, 3, .42); rot = well ? Math.sin(beatAt(t) * Math.PI + i) * .035 : wob(t, 40 + i, .02) + side * .03; }
    const im = IMG[name], hh = (im ? im.height : 1400) * k;
    spr(name, px, py + (1 - up) * 140 - hop - sw * 26, hh * clamp(up, 0, 1.1), { seed: i, shadow: 1, rot, alpha: run ? 1 : clamp((t - t0) / .05), sx: 1 + sw * .1, sy: 1 - sw * .1 });
    const bx = x + side * 100, by = y - h - 30;
    if (!well && t > t0 + .08) bubble(bx, by, x + side * 30, y - h + 30, 40 * pop(t, t0 + .08, 4, .45), '?', 1, 1450 + i * 9);
    if (well) bubble(bx, by, x + side * 30, y - h + 30, 44 * pop(t, ts, 4, .45), 'tick', 1, 1400 + i * 9);
  });
  X.restore();
  POST.vign = lerp(.75, .45, dawn);
});
})();
