// 05_verse3.js — VERSE 3 (58.41 – 74.78): "S-D-Bench: ask for findings, order a test ... So gaps in the notes don't
// give answers away." Ask → result → next; the record runs dry → the simulator types a finding; patched notes.
(() => {
'use strict';
const SYN_STOCK = '#dccdf2';                              // synthetic finding tint
const W = (li) => LINES[li].words.map(w => w[1]);

// Synthetic result card: lilac stock, dashed border, readable tag.
function syntheticCard(x, y, o = {}) {
  const w0 = o.w ?? 150, h0 = o.h ?? 190, s = o.s ?? 1, heading = o.heading !== false ? (o.heading || 'Synthetic result') : '';
  card(x, y, { ...o, glyph: false, stock: SYN_STOCK, lines: false });
  const w = w0 * s, h = h0 * s;
  X.save(); X.translate(x, y); X.rotate(o.rot ?? 0); X.globalAlpha *= (o.alpha ?? 1) * .75;
  X.setLineDash([10, 9]); X.lineDashOffset = boilStep(T) * 3; X.strokeStyle = '#6b4f9a'; X.lineWidth = 3.2;
  X.strokeRect(-w / 2 + 9, -h / 2 + 9, w - 18, h - 18); X.restore();
  X.save(); X.translate(x, y); X.rotate(o.rot ?? 0); X.scale(s, s); X.globalAlpha *= o.alpha ?? 1;
  if (heading) {
    const hs0 = o.headingSize ?? 43, hs = Math.min(hs0, (w0 - 34) / measure(heading, hs0, 'SH') * hs0);
    word(heading, 0, -h0 / 2 + 76, Math.max(30, hs), { font: 'SH', col: '#6b4f9a', ax: .5, bake: true });
  }
  if (o.glyph && GLYPH[o.glyph]) {
    X.save(); X.translate(0, heading ? 46 : 10); GLYPH[o.glyph](Math.min(w0, h0) / 132); X.restore();
  }
  X.restore();
}
// Torn hole polygon in a page.
function holePts(x, y, w, h, seed) {
  const pts = [], n = 40;
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2, c = Math.cos(a), s = Math.sin(a);
    const k = 1 / Math.max(Math.abs(c) / (w / 2), Math.abs(s) / (h / 2));
    const j = 1 + (hash2(i, seed) - .5) * .3 * (i % 2 ? 1 : .4) + wob(T, seed + i, .015);
    pts.push([x + c * k * j, y + s * k * j]);
  }
  return pts;
}
function hole(x, y, w, h, seed, inner) {
  const p = holePts(x, y, w, h, seed);
  // torn white fibre rim (paper torn away), then the cork board showing through
  const rim = p.map(([px, py], i) => [x + (px - x) * (1.07 + hash2(i, seed + 3) * .06), y + (py - y) * (1.1 + hash2(i, seed + 4) * .08)]);
  inkShape(rim, '#fffaf0', 0, .8, seed + 50);
  X.save(); X.beginPath(); p.forEach((q, i) => i ? X.lineTo(...q) : X.moveTo(...q)); X.closePath(); X.clip();
  X.fillStyle = PAL.cork; X.fillRect(x - w, y - h, w * 2, h * 2);
  X.fillStyle = 'rgba(80,50,25,.12)'; for (let i = 0; i < 40; i++) { X.beginPath(); X.arc(x + (hash(i + seed) - .5) * w, y + (hash(i * 2 + seed) - .5) * h, 3, 0, 7); X.fill(); }
  X.fillStyle = 'rgba(40,25,10,.35)'; X.fillRect(x - w, y - h / 2 - 6, w * 2, h * .22);
  if (inner) inner();
  X.restore();
  inkShape(p, null, 3, .6, seed, PAL.inkSoft);
}
// Bell "DING" burst lines.
function ding(x, y, t0, s = 1) {
  const dt = T - t0; if (dt < 0 || dt > .5) return;
  const k = E.outC(clamp(dt / .35)), a = 1 - clamp((dt - .2) / .3);
  X.save(); X.globalAlpha *= a;
  for (let i = 0; i < 9; i++) { const an = -Math.PI / 2 + (i - 4) * .3, r0 = 90 * s + k * 40 * s, r1 = r0 + 60 * s * (1 - k * .5);
    inkLine([[x + Math.cos(an) * r0, y + Math.sin(an) * r0], [x + Math.cos(an) * r1, y + Math.sin(an) * r1]], 7 * s, PAL.ink, .4, 700 + i); }
  X.restore();
}
function resultSheet(x, y, o = {}) {
  const w0 = o.w ?? 360, h0 = o.h ?? 270, s = o.s ?? 1, rot = o.rot ?? 0;
  X.save();
  if (o.clipBottom != null) { X.beginPath(); X.rect(x - w0 * s, -400, w0 * s * 2, o.clipBottom + 400); X.clip(); }
  X.translate(x, y); X.rotate(rot); X.scale(s, s); X.globalAlpha *= o.alpha ?? 1;
  inkShape(rectPts(-w0 / 2, -h0 / 2, w0, h0, 14, 5), '#fff7df', 3.4, .45, o.seed ?? 860, '#352721');
  inkLine([[-w0 / 2 + 28, -h0 / 2 + 58], [w0 / 2 - 28, -h0 / 2 + 58]], 2.2, '#c8a9e8', .18, 861);
  X.save(); X.globalAlpha *= .18;
  for (let i = 0; i < 4; i++) inkLine([[-132, 76 + i * 28], [132, 76 + i * 28]], 2.4, '#9fb7c9', .18, 862 + i);
  X.restore();
  const tk = o.textK ?? 1, total = 15;
  const chars = o.chars ?? Math.floor(total * E.outC(prog(tk, .04, .92)) + .001);
  const drawTyped = (txt, yy, size, n, seed) => {
    if (n <= 0) return;
    const fit = Math.min(size, (w0 - 44) / Math.max(1, measure(txt, size, 'SH')) * size);
    let xx = -measure(txt, fit, 'SH') / 2;
    [...txt].forEach((ch, i) => {
      const cw = measure(ch, fit, 'SH');
      if (i < n) word(ch, xx, yy, fit, { font: 'SH', col: '#4e327f', bake: true, seed: seed + i });
      xx += cw;
    });
  };
  drawTyped('Synthetic', -54, 72, Math.min(chars, 9), 870);
  drawTyped('result', 30, 76, Math.max(0, chars - 9), 890);
  if (chars > 0 && chars < total) {
    const cy = chars <= 9 ? -54 : 30, txt = chars <= 9 ? 'Synthetic' : 'result', n = chars <= 9 ? chars : chars - 9;
    const size = chars <= 9 ? 72 : 76, fit = Math.min(size, (w0 - 44) / Math.max(1, measure(txt, size, 'SH')) * size);
    const left = -measure(txt, fit, 'SH') / 2, upto = measure(txt.slice(0, n), fit, 'SH');
    inkLine([[left + upto + 7, cy - 48], [left + upto + 7, cy + 18]], 4, '#4e327f', .12, 908);
  }
  X.restore();
}
// 'Synthetic' (9 keys) → carriage return on tRet → 'result' (6 keys)
function typewriterCharTimes(t0, t1, tRet) {
  return Array.from({ length: 9 }, (_, i) => lerp(t0 + .03, tRet - .06, i / 8))
    .concat(Array.from({ length: 6 }, (_, i) => lerp(tRet + .12, t1 - .08, i / 5)));
}
function typewriterTypedChars(t, t0, t1, tRet) {
  return typewriterCharTimes(t0, t1, tRet).reduce((n, tt) => n + (t >= tt ? 1 : 0), 0);
}
// Simulator-at-the-typewriter sprites (assets/sprites/typing/): a both hands down · b both up · l one hand up · c carriage return + ding.
// All frames share one canvas so they register; the sheet is drawn over the sprite so it always occludes raised hands.
const TW = { k: .60, w: 976, h: 1238,
  // paper mouth (top of the roller bail) in sprite px: [left, right]; c has the carriage shoved right
  mouth: { a: [[560, 509], [850, 545]], c: [[650, 524], [900, 552]] } };
function typewriterPose(t, t0, t1, tRet) {
  const ct = typewriterCharTimes(t0, t1, tRet);
  if (t < ct[0] - .02) return 'b';
  if ((t >= tRet - .05 && t < tRet + .1) || t >= ct[14] + .02) return 'c';
  return ['l', 'a', 'b', 'a'][boilStep(t) % 4];
}
// sprite px → local coords of a bottom-centre anchored typing sprite
const twPt = ([sx, sy]) => [(sx - TW.w / 2) * TW.k, -(TW.h - sy) * TW.k];
function typewriterMouth(pose) {
  const [p0, p1] = (TW.mouth[pose] || TW.mouth.a).map(twPt);
  return { p0, p1, m: [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2], rot: Math.atan2(p1[1] - p0[1], p1[0] - p0[0]) };
}
// sheet fed up out of the roller: vis = fraction of the sheet showing above the bail
function typewriterSheet(mo, vis, o) {
  const s = o.s, h = 270 * s, ux = Math.sin(mo.rot), uy = -Math.cos(mo.rot), d = vis * h - h / 2;
  const ax = mo.p1[0] - mo.p0[0], ay = mo.p1[1] - mo.p0[1];
  X.save(); X.beginPath();
  X.moveTo(mo.p0[0] - ax, mo.p0[1] - ay); X.lineTo(mo.p1[0] + ax, mo.p1[1] + ay);
  X.lineTo(mo.p1[0] + ax + ux * 900, mo.p1[1] + ay + uy * 900); X.lineTo(mo.p0[0] - ax + ux * 900, mo.p0[1] - ay + uy * 900);
  X.closePath(); X.clip();
  resultSheet(mo.m[0] + ux * d, mo.m[1] + uy * d, { ...o, rot: mo.rot });
  X.restore();
  return [mo.m[0] + ux * d, mo.m[1] + uy * d];
}
function typePuff(x, y, t0, seed, r = 150, n = 7) {
  const dt = T - t0; if (dt < 0 || dt > .36) return;
  const k = E.outC(clamp(dt / .3));
  X.save(); X.globalAlpha *= .7 * (1 - clamp((dt - .06) / .3));
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + hash2(i, seed) * .6, rr = r * (.35 + k * .75);
    inkShape(ellPts(x + Math.cos(a) * rr, y + Math.sin(a) * rr * .55, 40 + k * 30 + i * 3, 30 + k * 22 + i * 2, 10), '#f4ead6', 3, 1.2, seed + i); }
  X.restore();
}
function ownDrawer(x, y, open, tSlam, front = false) {
  if (open <= .01 && !front) return;
  const dx = x - 188, dy = y - 314, w = 330, h = 96, pull = 112 * open;
  X.save(); X.globalAlpha *= clamp(open * 1.15);
  if (!front) {
    inkShape(rectPts(dx - 16, dy + 18, w + 30, h + 18, 12, 5), '#5b4a3d', 4, .7, 846);
    inkShape(rectPts(dx - 4, dy + 28, w + 8, h - 8, 9, 4), '#2f2825', 2.5, .45, 847);
    for (let i = 0; i < 3; i++) inkLine([[dx + 30 + i * 92, dy + 34], [dx + 8 + i * 92, dy + h + 12]], 2, '#82664a', .25, 848 + i);
  } else {
    inkShape(rectPts(dx - pull, dy + 62, w, h, 13, 5), '#5fa6d5', 5, .9, 852);
    inkShape(rectPts(dx - pull + 110, dy + 100, 112, 18, 7, 3), '#f6e2b8', 2.6, .55, 853);
    inkLine([[dx - pull + 104, dy + 138], [dx - pull + 230, dy + 138]], 4, PAL.inkSoft, .35, 854);
  }
  X.restore();
  const hit = kick(T - tSlam, 11);
  if (front && hit > .02) {
    X.save(); X.globalAlpha *= vanish(T, tSlam + .16, .10);
    for (let i = 0; i < 7; i++) { const an = -2.3 + i * .33, r0 = 110 + hit * 38; inkLine([[dx + 120 + Math.cos(an) * r0, dy + 92 + Math.sin(an) * r0], [dx + 120 + Math.cos(an) * (r0 + 42), dy + 92 + Math.sin(an) * (r0 + 42)]], 5, PAL.ink, .35, 858 + i); }
    X.restore();
  }
}
// sprite at a fixed pixel scale: every pose of one character shares a scale, so pose swaps never pop in size
const ps = (n, x, y, k, o) => { const im = IMG[n]; if (im) spr(n, x, y, im.height * k, o); };
const lastKey = (t, keys) => { let k = -99; for (const x of keys) if (t >= x) k = x; return k; };

// ── 58.41 → 62.08  "S-D-Bench: ask for findings, order a test," — the waiting room counter ─────────────────────
// Gatekeeper hops the count-in (S · D · BENCH), winks at the question, pulls the finding from his own drawer.
// "order a test" is a diner order: Hypothesis scurries to the counter and slaps the bell — DING — ticket out.
shot('sdbench', 58.41, (t) => {
  const w = W(14), tAsk = w[1], tFind = w[3], tOrder = w[4], tA = w[5], tTest = w[6];
  const S1 = beat(89), S2 = beat(89.5), S3 = beat(90);
  const push = E.io(prog(t, 58.41, 62.08));
  const c = [960 + push * 40, 540 + push * 10, 1.04 + push * .06 + kick(t - tTest, 9) * .03 * (t > tTest), wob(t, 3, .002)];
  bgCam('waiting', c, { z: 1.02, par: .92, over: 1.22 });
  X.save(); cam(...c);
  // Gatekeeper at the counter: the benchmark examiner
  const gKeys = [S1, S2, S3, tAsk + .1, tFind - .04, tOrder - .05, tTest], gk0 = lastKey(t, gKeys);
  const gk = t < tAsk + .1 ? (t - gk0 < .2 ? 'gk_hop' : 'gk_stand') : t < tFind - .04 ? 'gk_wink' : t < tOrder - .05 ? 'pb_gk_drawer' : 'gk_stand';
  const gb = kick(t - gk0, 10) * (gk0 === tTest ? 1.8 : 1);
  ps(gk, 1520, 1050 - gb * 30, .533, { seed: 1, shadow: 1, flip: gk === 'pb_gk_drawer', sx: 1 + gb * .04, sy: 1 - gb * .04 });
  // bell on the counter edge
  const ring = kick(t - tTest, 12);
  spr('bell', 1180, 1000 + ring * 12, 170 * (1 - ring * .08), { seed: 2, shadow: 1, rot: wob(t, 4, ring * .12) });
  ding(1180, 900, tTest, 1.2);
  // Hypothesis: bobs to the count-in, hand up on "ask", scurries to the bell on "order", slaps it on "test"
  const hKeys = [S1, S2, S3, tAsk - .05, tOrder, tA], h0 = lastKey(t, hKeys), hb = kick(t - h0, 9);
  if (t < tOrder) {
    const hp = t < tAsk - .05 ? 'hyp_stand' : 'hyp_raisehand';
    ps(hp, 380, 1060 - hb * (hp === 'hyp_stand' ? 18 : 34), .558, { seed: 3, shadow: 1, sx: 1 + hb * .03, sy: 1 - hb * .03 });
  } else if (t < tA) {
    const k = E.io(prog(t, tOrder, tA)), x = lerp(380, 948, k);
    ps('hyp_jog', x, 1060 - Math.abs(Math.sin(k * Math.PI * 3)) * 26, .52, { seed: 3, shadow: 1, rot: .06 });
    for (let j = 1; j < 4; j++) { X.save(); X.globalAlpha *= .4 * (1 - j / 4) * (k < .95 ? 1 : 0); inkLine([[x - 200 - j * 50, 760 + j * 40], [x - 280 - j * 50, 760 + j * 40]], 5, PAL.ink, .5, 870 + j); X.restore(); }
  } else {
    const press = t < tTest ? -18 * E.outC(prog(t, tA, tTest - .03)) : -18 * (1 - E.outC(prog(t, tTest - .03, tTest)));
    const hs = t >= tTest - .03 ? kick(t - tTest, 12) * .06 : 0;
    ps('pb_hyp_bell', 948, 1060 + press * .4, .558, { seed: 3, shadow: 1, sx: 1 + hs, sy: 1 - hs, rot: t < tTest ? -.03 : 0 });
  }
  // question card flies hyp → gk along the thread; comes back as a finding
  const A = [520, 560], B = [1420, 600];
  if (t > tAsk) {
    const out = E.io(prog(t, tAsk, tFind - .02)), back = E.io(prog(t, tFind + .08, tOrder - .1));
    const ta = vanish(t, tOrder - .12, .2);
    if (ta > 0) { X.save(); X.globalAlpha *= ta; thread(sag(A, B, .14 - .1 * out, 14), { w: 10, k: Math.max(out, .001) }); X.restore(); }
    const u = back > 0 ? 1 - back : out, p = pAt(sag(A, B, .14 - .1 * out, 14), u);
    const fl = back > 0 ? clamp(back * 1.6) : 0;
    card(p[0], p[1] + 70, { w: 130, h: 165, glyph: fl > .5 ? 'heart' : '?', flip: fl, rot: Math.sin(u * 7) * .2, seed: 760 });
    tack(p[0], p[1] - 10, .8);
  }
  if (t > tOrder) {                                       // test-tube ticket shoots out of the drawer on "test"
    const k = spring(t - tTest, 3.2, .45), u = clamp((t - tTest) / .45);
    if (t > tTest) card(lerp(1470, 1180, E.outC(u)), lerp(720, 470, k), { w: 140, h: 175, glyph: 'tube', rot: lerp(.9, -.08, E.outC(u)), seed: 761, s: lerp(.3, 1, clamp(k)) });
  }
  X.restore();
  // TYPE — top band, sequential
  X.save(); X.globalAlpha *= vanish(t, tAsk - .12, .1);
  row([['S-', S1, { col: PAL.red, edge: true }], ['D-', S2, { col: PAL.red, edge: true }], ['BENCH:', S3, { col: PAL.cream, edge: true }]], 960, 330, 210, { from: 2.2, gap: .08, maxW: 1500 });
  X.restore();
  if (t > tAsk - .05) {
    X.save(); X.globalAlpha *= vanish(t, tOrder - .1, .08);
    row([['ask for', tAsk, { size: 110, font: 'FBo' }], ['FINDINGS,', tFind, { col: PAL.coral, edge: true }]], 960, 250, 170, { from: 2 });
    X.restore();
  }
  if (t > tOrder - .05) row([['order a', tOrder, { size: 110, font: 'FBo' }], ['TEST,', tTest, { col: PAL.red, edge: true, size: 210 }]], 960, 260, 170, { from: 2.2 });
  POST.vign = .6;
});

// ── 62.08 → 64.66  "Let what comes back help decide what comes next." — boomerang + branch ──────────────────
// Hypothesis flings a boomerang off-frame; it whirls home carrying the result card. Catch! Pin it to the hub on
// "help", weigh the sprouting branches (lean · look · lean), point on "NEXT" and hop.
const BH = { x: 250, k: .48, hand: [463, 628], hub: [620, 560] };
shot('back', 62.08, (t) => {
  const w = W(15), tBack = w[3], tHelp = w[4], tDec = w[5], tNext = w[8];
  const pan = E.io(prog(t, tDec - .1, tNext + .2));
  const c = [960 + pan * 120, 560, 1 + kick(t - tBack, 9) * .04 * (t > tBack), 0];
  bgCam(() => paperBG('#e9dcf3', .55), c, { par: .9, over: 1.2 });
  X.save(); cam(...c);
  const hub = BH.hub, hand = BH.hand;
  // the route so far, running in from the left to the hub
  thread(spline([[-60, 430], [180, 360], [420, 450], hub], 12), { w: 11 });
  // branches sprout on "decide": three dashed candidate routes
  const ends = [[1480, 250], [1620, 520], [1380, 690]], gl = ['dna', 'xray', 'slide'];
  ends.forEach((e, i) => {
    const t0 = tDec + i * .1, k = E.outC(prog(t, t0, t0 + .35));
    if (k <= 0) return;
    const path = spline([hub, [lerp(hub[0], e[0], .5), lerp(hub[1], e[1], .5) + (i - 1) * 40], e], 12);
    const chosen = i === 1 && t >= tNext;
    if (chosen) thread(path, { w: 12, k: E.outC(prog(t, tNext, tNext + .2)), tip: true });
    X.save(); X.globalAlpha *= chosen ? .3 : (t > tNext ? .45 : 1); X.setLineDash([16, 14]); X.strokeStyle = PAL.redDk; X.lineWidth = 6;
    X.beginPath(); ptrim(path, k).forEach((p, j) => j ? X.lineTo(...p) : X.moveTo(...p)); X.stroke(); X.restore();
    const sc = pop(t, t0 + .2, 4, .45);
    if (sc > 0) card(e[0] + 30, e[1] + 120, { w: 170, h: 215, glyph: gl[i], rot: (i - 1) * .07, seed: 773 + i, s: sc * (chosen ? 1 + kick(t - tNext, 9) * .2 : 1), alpha: chosen || t < tNext ? 1 : .55 });
    if (chosen) tack(e[0], e[1], 1.1, { pressed: E.outBack(prog(t, tNext + .15, tNext + .22)) });
  });
  // Hypothesis
  const keys = [62.08, w[2], tBack, tHelp, tDec, w[6], w[7], tNext, tNext + .26], k0 = lastKey(t, keys), hb = kick(t - k0, 10);
  const pose = t < w[2] ? 'pb_hyp_throw' : t < tBack - .06 ? 'hyp_leanin' : t < tBack ? 'pb_hyp_catch' : t < tHelp ? 'pb_hyp_catch' : t < tDec ? 'hyp_point' : t < w[6] ? 'hyp_leanin' : t < w[7] ? 'hyp_stand' : t < tNext ? 'hyp_leanin' : t < tNext + .26 ? 'hyp_point' : 'hyp_hop';
  const recoil = t >= tBack && t < tHelp ? kick(t - tBack, 7) * 22 : 0;
  ps(pose, BH.x - recoil, 1060 - hb * (pose === 'hyp_hop' ? 60 : 22), BH.k, { seed: 3, shadow: 1, sx: 1 + hb * .04, sy: 1 - hb * .04, rot: pose === 'pb_hyp_catch' ? -.05 * kick(t - tBack, 6) : 0 });
  // boomerang: out along a big ellipse, off-frame, and home again with the result card
  const T0 = 62.1;
  if (t > T0 && t < tBack) {
    const u = prog(t, T0, tBack), th = Math.PI + u * Math.PI * 2, cx = hand[0] + 880;
    const x = cx + Math.cos(th) * 880, y = hand[1] + Math.sin(th) * 290;
    X.save(); X.globalAlpha *= .35;
    const trail = []; for (let j = 0; j <= 8; j++) { const uu = Math.max(0, u - j * .012), a = Math.PI + uu * Math.PI * 2; trail.push([cx + Math.cos(a) * 880, hand[1] + Math.sin(a) * 290]); }
    inkLine(trail, 5, PAL.ink, .5, 880); X.restore();
    if (u > .5) card(x, y + 10, { w: 120, h: 150, glyph: 'heart', rot: Math.sin(u * 20) * .3, seed: 771, shadow: .5 });
    spr('pb_boomerang', x, y, 110, { ax: .5, ay: .5, rot: u * Math.PI * 14, seed: 4 });
  }
  if (t >= tBack) {
    // the boomerang ricochets off and whirls away over his head; the card stays in hand until "help" pins it
    const fd = t - tBack;
    if (fd < .5) spr('pb_boomerang', hand[0] - 20 - fd * 700, hand[1] - fd * 1500 + fd * fd * 900, 100, { ax: .5, ay: .5, rot: -fd * 30, seed: 4 });
    const k = E.outC(prog(t, tHelp, tHelp + .16));
    const cxp = lerp(hand[0] - recoil, hub[0], k), cyp = lerp(hand[1] + 30, hub[1] + 120, k) - Math.sin(k * Math.PI) * 80;
    card(cxp, cyp, { w: lerp(130, 190, k), h: lerp(165, 240, k), glyph: 'heart', rot: lerp(-.25, -.04, k), seed: 771, s: 1 + kick(t - tBack, 10) * .2 * (1 - k) + kick(t - tHelp - .16, 12) * .12 * (t > tHelp + .16) });
    if (t > tHelp + .16) tack(...hub, 1.1, { pressed: E.outBack(prog(t, tHelp + .16, tHelp + .23)) });
    if (t > tBack && t < tBack + .3) { X.save(); X.globalAlpha *= 1 - prog(t, tBack, tBack + .3); for (let j = 0; j < 7; j++) { const a = -Math.PI * .8 + j * .27, r0 = 80 + fd * 200; inkLine([[hand[0] + Math.cos(a) * r0, hand[1] + Math.sin(a) * r0], [hand[0] + Math.cos(a) * (r0 + 50), hand[1] + Math.sin(a) * (r0 + 50)]], 6, PAL.ink, .4, 890 + j); } X.restore(); }
  }
  X.restore();
  row([['LET WHAT', w[0], { size: 110, font: 'FBo' }], ['COMES', w[2]], ['BACK', tBack, { col: PAL.coral, edge: true, size: 230 }]], 70, 250, 190, { from: 2, align: 'left', maxW: 1400 });
  row([['HELP', w[4], { size: 100, font: 'FBo' }], ['DECIDE', tDec, { col: PAL.plum, edge: true }], ['what comes', w[6], { size: 90, font: 'FBo' }], ['NEXT.', tNext, { col: PAL.red, edge: true, size: 210 }]], 1850, 1020, 160, { from: 2.2, align: 'right', maxW: 1360 });
});

// ── 64.66 → 68.48  "When the record runs dry, the simulator replies" — empty drawer → typing → self-filed sheet ─
shot('dry', 64.66, (t) => {
  const w = W(16), tDry = w[4], tSim = w[6], tRep = w[7];
  const wp = W(17), tBulb = tSim, tSheet = tSim + .14, tRet = tRep, tPull = 67.12, tPlace = wp[0], tSink = wp[1], tSlam = beat(104);
  const pullK = E.outC(prog(t, tPull, tPlace)), fileK = E.io(prog(t, tPlace, tSink)), sinkK = E.inC(prog(t, tSink, tSlam - .06));
  const proud = t > tSlam + .02;
  const jolt = kick(t - tDry, 10) + kick(t - tBulb, 10) * 1.2 + kick(t - tSheet, 10) * .7 + kick(t - tPull, 12) * .8 + kick(t - tSlam, 13) * 1.8;
  const drawerOpen = E.outBack(prog(t, tPlace - .22, tPlace + .1), 1.5) * (1 - E.inC(prog(t, tSlam - .16, tSlam)));
  const simX = 1210, simY = 1010;
  const pushK = E.ioS(prog(t, 65.9, 68.2)), settleK = E.ioS(prog(t, tSlam + .08, 68.46));
  const camK = pushK * (1 - settleK * .30);
  // extra push onto the typewriter while the sheet is typed: sheet readable, typist right of the lyric (bulb drifts out of frame top)
  const typeK = E.ioS(prog(t, 65.95, 66.55)) * (1 - E.ioS(prog(t, 67.0, 67.42)));
  const c = [lerp(lerp(960, 760, camK), 1045, typeK), lerp(lerp(540, 690, camK), 642, typeK), lerp(lerp(1, 1.24, camK), 1.5, typeK), 0];
  bgCam(() => paperBG('#f1d9a8', .6), c, { par: .9, over: 1.18 });
  X.save(); cam(...c);
  if (t > tBulb - .05) { const pw = E.outC(prog(t, tBulb - .05, tBulb + .25)); X.save(); X.globalCompositeOperation = 'multiply'; X.globalAlpha = pw * .45; const gl = X.createRadialGradient(simX - 70, 470, 60, simX - 70, 470, 1100); gl.addColorStop(0, '#ffffff'); gl.addColorStop(1, '#9fb8e0'); X.fillStyle = gl; X.fillRect(0, 0, DW, DH); X.restore();
    X.save(); X.globalCompositeOperation = 'lighter'; X.globalAlpha = pw * (.56 + .16 * Math.sin(t * 30)); const g2 = X.createRadialGradient(simX - 35, 390, 10, simX - 35, 390, 420); g2.addColorStop(0, 'rgba(255,238,120,.85)'); g2.addColorStop(1, 'rgba(160,200,255,0)'); X.fillStyle = g2; X.fillRect(740, 0, 900, 820); X.restore(); }
  inkLine([[0, 900], [1920, 905]], 5, PAL.inkSoft, 1.4, 780);
  // typing: he sits at a desk typewriter (sprite frames swap with the keystrokes); the sheet feeds up out of its roller
  const twX = 1308, twY = 1122, typing = !proud && t >= tBulb - .03 && t < tPull;
  const chars = typewriterTypedChars(t, tSheet, tPull, tRet), ct = typewriterCharTimes(tSheet, tPull, tRet);
  const vis = .06 + .36 * E.outC(prog(t, tBulb + .02, ct[0])) + .03 * prog(t, ct[0], ct[8]) + .3 * E.outBack(prog(t, tRet - .02, tRet + .1), 1.4) + .02 * prog(t, ct[9], ct[14]);
  const sheetS = .5;
  if (typing) {
    const pose = typewriterPose(t, tSheet, tPull, tRet), nm = 'gktw_' + pose, sx = 1 + jolt * .035, sy = 1 - jolt * .03;
    ps(nm, twX, twY, TW.k, { seed: 4, shadow: 1, sx, sy });
    X.save(); X.translate(twX, twY); X.scale(sx, sy);
    typewriterSheet(typewriterMouth(pose), vis, { s: sheetS, seed: 841, chars });
    X.restore();
  } else {
    const gkN = proud ? 'gk_wink' : t < tDry - .02 ? 'gk_stand' : t < tBulb - .03 ? 'gk_empty' : 'pb_gk_drawer';
    ps(gkN, simX, simY - jolt * 28, .56, { seed: 4, shadow: 1, sx: 1 + jolt * .06 + (proud ? .08 : 0), sy: 1 - jolt * .05 - (proud ? .06 : 0), rot: proud ? -.035 : 0, flip: gkN === 'pb_gk_drawer' });
  }
  if (drawerOpen > .01) ownDrawer(simX, simY, drawerOpen, tSlam, false);
  if (t > tBulb - .08 && t < tSlam + .1) {
    const b = pop(t, tBulb, 3.3, .55);
    if (b > .01) spr('bulb', simX - 35, 360 - kick(t - tBulb, 7) * 26, 180 * b, { seed: 7, shadow: .5, rot: wob(t, 11, .04) });
    ding(simX - 35, 320, tBulb, .8);
  }
  // desk + typewriter pop in / out behind a puff on the pose changes
  if (t > tBulb - .03 && t < tBulb + .5) typePuff(twX - 20, 850, tBulb - .03, 940, 190);
  if (t > tPull && t < tPull + .5) typePuff(twX + 10, 830, tPull, 950, 200);
  if (t >= tPull && t < tSlam + .02) {
    // pulled out of the roller (where the last carriage-return frame left it) → held up → filed into his own drawer
    const mo = typewriterMouth('c'), h = 270 * sheetS, d = vis * h - h / 2;
    const x0 = twX + mo.m[0] + Math.sin(mo.rot) * d, y0 = twY + mo.m[1] - Math.cos(mo.rot) * d;
    let x = lerp(x0, 1052, pullK), y = lerp(y0, 384, pullK), rot = lerp(mo.rot, -.20, pullK), sc = lerp(sheetS, .70, pullK), alpha = 1;
    if (t >= tPlace) { x = lerp(1052, 1084, fileK); y = lerp(384, 725, fileK); rot = lerp(-.20, .02, fileK); sc = lerp(.70, .52, fileK); }
    if (t >= tSink) { x = 1084; y = lerp(725, 812, sinkK); rot = .02; sc = .52; alpha = 1 - .42 * sinkK; }
    resultSheet(x, y, { s: sc, rot, seed: 841, chars: 15, alpha, clipBottom: t >= tSink ? simY - 252 : null });
    if (drawerOpen > .01) ownDrawer(simX, simY, drawerOpen, tSlam, true);
    if (t > tSink && t < tSlam - .04) {
      const pk = kick(t - tSink, 9) + kick(t - (tSink + .18), 9);
      X.save(); X.globalAlpha *= vanish(t, tSlam - .1, .08);
      for (let i = 0; i < 5; i++) inkLine([[simX - 206 + i * 24, simY - 298 - pk * 8], [simX - 190 + i * 26, simY - 284 - pk * 5]], 4, PAL.ink, .28, 866 + i);
      X.restore();
    }
  }
  if (proud) {
    X.save(); X.globalAlpha *= vanish(t, tSlam + .34, .22);
    for (let i = 0; i < 6; i++) { const an = -1.95 + i * .33, r = 170 + kick(t - tSlam, 8) * 46; inkLine([[simX - 5 + Math.cos(an) * r, 650 + Math.sin(an) * r], [simX - 5 + Math.cos(an) * (r + 48), 650 + Math.sin(an) * (r + 48)]], 5, PAL.brassDk, .35, 846 + i); }
    X.restore();
  }
  // dust puff + moth when the drawer comes up empty
  if (t > tDry && t < tSim + .2) {
    const dt = t - tDry;
    for (let i = 0; i < 7; i++) { const a = -2.4 + i * .5, r = 40 + E.outC(clamp(dt / .6)) * 150;
      X.save(); X.globalAlpha *= .5 * (1 - clamp(dt / .9)); inkShape(ellPts(simX - 210 + Math.cos(a) * r, 660 + Math.sin(a) * r * .6, 34 + i * 4, 26 + i * 3, 10), '#e8dcc2', 3, 1.4, 790 + i); X.restore(); }
    const mx = simX - 210 - dt * 260 + Math.sin(dt * 11) * 30, my = 620 - dt * 220 + Math.cos(dt * 17) * 20, fl = Math.abs(Math.sin(t * 40));
    inkShape([[mx, my], [mx - 34, my - 26 * fl], [mx - 26, my + 8]], '#d8ccb4', 3, .6, 798); inkShape([[mx, my], [mx + 34, my - 26 * fl], [mx + 26, my + 8]], '#d8ccb4', 3, .6, 799);
  }
  X.restore();
  X.save(); X.globalAlpha *= vanish(t, tSim - .14, .1);
  row([['WHEN THE', w[0], { size: 110, font: 'FBo' }], ['RECORD', w[2]]], 70, 260, 170, { from: 2, align: 'left', maxW: 1000 });
  row([['RUNS', w[3], { size: 120 }], ['DRY,', tDry, { col: '#e3b65c', edge: true, size: 260 }]], 70, 520, 170, { from: 2.4, align: 'left', maxW: 1000 });
  X.restore();
  if (t > tSim - .1) {
    row([['the', w[5], { size: 100, font: 'FBo' }], ['SIMULATOR', tSim, { col: '#8a6cc4', edge: true }]], 70, 240, 170, { from: 2.2, align: 'left', maxW: 1050 });
    row([['REPLIES', tRep, { col: PAL.coral, edge: true }]], 70, 470, 210, { from: 2.4, align: 'left', maxW: 900 });
  }
  if (t > wp[0] - .06) tapeRow([['with', wp[0], { size: 90, font: 'FBo' }], ['PLAUSIBLE', wp[1], { col: '#8a6cc4', edge: true }], ['FINDINGS', wp[2]]], 70, 1010, 140, { from: 1.4, align: 'left', maxW: 1150 }, t);
});

// ── 68.48 → 72.23  "With plausible findings the notes don't supply. Synthetic answers keep new routes in play," ─
const HOLES = [[560, 430, 300, 120, 811], [1170, 560, 330, 120, 812], [700, 800, 300, 120, 813]];
function notesPage(t, patchTimes, o = {}) {
  if (!o.noPlate) plate('notes', { z: 1.04 });
  HOLES.forEach(([x, y, w, h, sd], i) => {
    const tp = patchTimes[i];
    if (tp == null || t < tp - .06) hole(x, y, w, h, sd);
    if (tp != null && t >= tp - .2) {
      const k = E.outC(prog(t, tp - .2, tp)), sq = 1 + kick(t - tp, 14) * .1;
      syntheticCard(lerp(x + 500, x, k), lerp(y - 300, y, k), { w: w + 40, h: h + 80, glyph: ['heart', 'drop', 'thermo'][i], rot: (1 - k) * 1.2 + (i - 1) * .05, seed: 820 + i, s: lerp(1.6, 1, k) * sq, sx: 1 });
    }
  });
}
shot('patch', 68.48, (t) => {
  const w = W(17), w2 = W(18), tSup = w[6], tSyn = w2[0], tRoutes = w2[4], tPlay = w2[6];
  const pull = E.io(prog(t, tSyn - .2, tSyn + .6));
  const c = [960 + pull * 120, 560, 1.12 - pull * .14 + kick(t - tSup, 9) * .03, 0];
  bgCam('notes', c, { z: 1.04, par: .94, over: 1.28 });
  X.save(); cam(...c);
  notesPage(t, [w[1], w[2], tSup], { noPlate: true });
  if (t > tSyn) {                                         // the thread runs through the patches, then forks
    const route = [[-60, 200], ...HOLES.map(h => [h[0], h[1] - h[3] / 2 - 26])];
    route.sort((a, b) => a[1] - b[1]);
    const main = spline([[-60, 240], [560, 370], [1170, 500], [700, 740], [980, 900]], 12);
    thread(main, { w: 11, k: E.io(prog(t, tSyn, tRoutes)) });
    [[[980, 900], [1350, 720], [1680, 430]], [[980, 900], [1400, 860], [1780, 700]], [[980, 900], [1300, 930], [1560, 860]]].forEach((r, i) => {
      const k = E.outC(prog(t, tRoutes + i * .1, tPlay));
      if (k > 0) thread(spline(r, 12), { w: 10, k, tip: true });
      if (t > tPlay - .05) { const e = r[2]; card(e[0], e[1] + 70, { w: 150, h: 190, glyph: ['tick', '?', 'bulb'][i], rot: (i - 1) * .1, seed: 830 + i, s: pop(t, tPlay - .05 + i * .06, 4, .45) }); }
    });
    [[560, 370], [1170, 500], [700, 740]].forEach((p, i) => { if (t > tSyn + i * .12) tack(p[0], p[1], .9); });
  }
  X.restore();
  // type on cream tape strips so it reads over the scribbled notes
  if (t < tSyn - .1) {
    tapeRow([['with', w[0], { size: 90, font: 'FBo' }], ['PLAUSIBLE', w[1], { col: '#8a6cc4', edge: true }], ['FINDINGS', w[2]]], 70, 235, 140, { from: 1.4, align: 'left', maxW: 1140 }, t);
    if (t > w[3] - .1) {
      tapeRow([['the notes', w[3], { size: 100, font: 'FBo' }], ["DON'T", w[5]], ['SUPPLY.', tSup, { col: PAL.red, edge: true }]], 1850, 1015, 140, { from: 1.4, align: 'right', maxW: 1120 }, t); }
  } else {
    tapeRow([['SYNTHETIC', tSyn, { col: '#8a6cc4', edge: true }], ['ANSWERS', w2[1]]], 70, 235, 150, { from: 1.4, align: 'left', maxW: 1110 }, t);
    if (t > w2[2] - .1) {
      tapeRow([['keep', w2[2], { size: 100, font: 'FBo' }], ['NEW', w2[3]], ['ROUTES', tRoutes, { col: PAL.red, edge: true }], ['in', w2[5], { size: 90, font: 'FBo' }], ['PLAY,', tPlay]], 80, 1015, 140, { from: 1.4, align: 'left', maxW: 1140 }, t); }
  }
});

// ── 72.23 → 74.78  "So gaps in the notes don't give answers away." — Challenger peeks; the gap gets patched ────
shot('leak', 72.23, (t) => {
  const w = W(19), tGaps = w[1], tAns = w[7], tAway = w[8];
  const zin = E.io(prog(t, 72.23, tGaps + .3));
  const slap = kick(t - tAway, 12);
  const c = [lerp(960, 1170, zin), lerp(560, 600, zin), lerp(1, 2.0, zin) + slap * .06, wob(t, 9, slap * .03)];
  bgCam('notes', c, { z: 1.04, par: .96, over: 1.85 });
  X.save(); cam(...c);
  const [hx, hy, hw, hh, sd] = HOLES[1], bigW = hw * 1.15, bigH = hh * 1.5;
  if (t < tAway) hole(hx, hy, bigW, bigH, sd, () => {
    // behind the page: the hidden ANSWER card, and Challenger peering in
    card(hx + 70, hy + 10, { w: 110, h: 140, glyph: 'bulb', seed: 850, rot: .08 });
    const pk = E.outBack(prog(t, tGaps - .1, tGaps + .2));
    spr('chal_peek', hx - 70 - (1 - pk) * 220, hy + 120, 240, { seed: 5, rot: -.08 + wob(t, 2, .01) });
    if (t > tAns - .15) { X.save(); X.globalAlpha *= appear(t, tAns - .15, .08); word('!', hx - 10, hy - 70, 70, { col: PAL.red, font: 'FB', ax: .5 }); X.restore(); }
  });
  if (t >= tAway - .14) {
    const k = E.outC(prog(t, tAway - .14, tAway));
    syntheticCard(lerp(hx + 300, hx, k), lerp(hy - 260, hy, k), { w: bigW + 40, h: bigH + 50, glyph: 'heart', rot: (1 - k) * .9 - .04, seed: 851, s: lerp(1.5, 1, k) });
    if (t >= tAway) { tack(hx - bigW / 2 + 24, hy - bigH / 2 + 30, .9); tack(hx + bigW / 2 - 24, hy - bigH / 2 + 30, .9, { pressed: E.outBack(prog(t, tAway + .05, tAway + .12)) }); }
  }
  X.restore();
  tapeRow([['SO', w[0], { size: 100, font: 'FBo' }], ['GAPS', tGaps, { col: PAL.red, edge: true }], ['in the notes', w[2], { size: 90, font: 'FBo' }]], 70, 230, 150, { from: 1.4, align: 'left', maxW: 1020 }, t);
  if (t > w[5] - .1) {
    tapeRow([["DON'T", w[5]], ['GIVE', w[6]], ['ANSWERS', tAns], ['AWAY.', tAway, { col: PAL.red, edge: true, size: 180 }]], 1850, 1015, 140, { from: 1.4, align: 'right', maxW: 1270 }, t); }
});
})();
