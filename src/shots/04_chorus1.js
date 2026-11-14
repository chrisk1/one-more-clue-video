// 04_chorus1.js — CHORUS 1 (47.53 – 58.41): "One more clue, let it come through, / Little by little, get a better view.
// / If the facts change, then the route can too, / D-X-O, what's the next best move?"
// Also defines the shared chorus devices: killingPart (the ONE MORE CLUE hook, reused in chorus 2) and the fog reveal.
'use strict';

// ── KILLING PART (the hook line): "ONE MORE CLUE" on the cork board ───────────────────────────────────
function killingPart(t, li, o = {}) {
  const W = LINES[li].words, tOne = W[0][1], tMore = W[1][1], tClue = W[2][1];
  const thunk = tClue;
  const zoomPunch = kick(t - thunk, 7) * .05;
  const kc = [960, 560, 1.02 + zoomPunch + (o.fast ? .04 : 0), wob(t, 9, kick(t - thunk, 10) * .02)];
  bgCam('cork', kc, { z: 1.06, par: .94, over: 1.28 });
  X.save(); cam(...kc);
  if (o.crowd) {
    const pins = [];
    for (let i = 0; i < 24; i++) {
      const x = 120 + (i % 8) * 240 + (hash(i) - .5) * 80, y = 150 + Math.floor(i / 8) * 380 + (hash(i + 9) - .5) * 80;
      if (Math.abs(x - 960) < 280 && Math.abs(y - 580) < 300) continue;
      pins.push([x, y - 80]);
      card(x, y, { w: 160, h: 200, glyph: SPECS[i % SPECS.length], rot: (hash(i + 4) - .5) * .3, seed: 300 + i });
    }
    thread(spline(pins, 8), { w: 9, shadow: 0 });
    pins.forEach(p => tack(p[0], p[1], .8));
  }
  const d = .55, k = E.outC(prog(t, thunk - d, thunk));
  if (t > thunk - d) {
    const s = lerp(5, 1, k), r = lerp(-2.6, -.04, k), sq = 1 + kick(t - thunk, 14) * .12;
    X.save(); X.translate(lerp(1300, 960, k), lerp(900, 600, k)); X.rotate(r); X.scale(s * sq, s / sq);
    card(0, 0, { w: 300, h: 380, glyph: o.glyph || '?', seed: 333, flip: (1 - k) * 2 });
    X.restore();
  }
  if (t >= thunk) {
    tack(960, 432, 1.6, { pressed: E.outBack(prog(t, thunk, thunk + .07)) });
    const sn = spring(t - thunk, 5, .3);
    thread(sag([-80, 300], [960, 432], .25 * (1 - sn), 14), { w: 14 });
  }
  X.restore();
  if (o.cast !== false) {
    const jab = t >= thunk ? Math.sin(clamp((t - thunk) / .9) * Math.PI) : 0;
    if (jab > 0) ['ck_tack', 'chal_tack', 'hyp_tack', 'tc_tack', 'st_tack'].forEach((n, i) => {
      spr(n, 160 + i * 400, 1080 + 560 - jab * (380 + (i % 2) * 40), 620, { rot: (i - 2) * .05, seed: i });
    });
  }
  const out = o.out ? vanish(t, o.out, .12) : 1;
  X.save(); X.globalAlpha *= out;
  // bake: drawn in picture order so the pipe, the "let it" plate and the cast's fists cover these words
  row([['ONE', tOne, { col: PAL.cream, edge: true }], ['MORE', tMore, { col: PAL.cream, edge: true }]], 960, 250, 230, { from: 1.2, gap: .42, bake: true });
  slam('CLUE', 960, 900, 300, tClue, { col: PAL.red, edge: true, from: 3, bake: true });
  X.restore();
}
window.killingPart = killingPart;

// ── FOG REVEAL: frosted glass cleared patch by patch ──────────────────────────────────
// o.frost (0..1): fog is laid over a blurred copy of the scene at this opacity, so shapes read through the glass.
// o.smear: patches are scrubbed open along a little circular wiping path instead of popping open.
let fogC = null;
function fogReveal(t, scene, wipes, o = {}) {
  scene();
  if (!fogC) fogC = document.createElement('canvas');
  if (fogC.width !== CV.width) { fogC.width = CV.width; fogC.height = CV.height; }
  const g = fogC.getContext('2d'), M = X.getTransform(), fr = o.frost ?? 1, fogCol = o.fog || '#f4efe6';
  g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1;
  g.clearRect(0, 0, fogC.width, fogC.height);
  if (o.frost != null) { g.filter = `blur(${Math.max(2, Math.round(12 * S))}px)`; g.drawImage(CV, 0, 0); g.filter = 'none'; }
  // the frost is drawn ON the glass (world space, moves with the camera): a pale wash with soft white pencil
  // rubbed over it, slightly uneven — no screen-locked paper overlay
  g.setTransform(M);
  const FX = -600, FY = -600, FW = DW + 1200, FH = DH + 1200;
  g.globalAlpha = o.frost != null ? fr * .9 : 1; g.fillStyle = fogCol; g.fillRect(FX, FY, FW, FH);
  g.globalAlpha = fr * .55; g.fillStyle = p4Pat(p4Shade(fogCol, -.07), 'tex_soft'); g.fillRect(FX, FY, FW, FH);
  g.save(); g.translate(41, 67); g.globalAlpha = fr * .7; g.fillStyle = p4Pat('#fffcf5', 'tex_soft'); g.fillRect(FX, FY, FW, FH); g.restore();
  // clearing uses a solid fill (the last fillStyle was a grain pattern, which only rubbed the frost partly away)
  g.globalAlpha = 1; g.globalCompositeOperation = 'destination-out'; g.fillStyle = '#000';
  const blob = (x, y, r, i, j = 0) => {
    for (const [rk, ak] of [[1.14, .4], [1, 1]]) {           // soft rubbed edge: a lighter outer pass, then the clear patch
      g.globalAlpha = ak; g.beginPath();
      for (let a = 0; a <= 24; a++) { const an = a / 24 * Math.PI * 2, rr = r * rk * (1 + (hash2(a + j * 31, i) - .5) * .25); g.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr * .85); }
      g.closePath(); g.fill();
    }
    g.globalAlpha = 1;
  };
  wipes.forEach(([tw, x, y, r], i) => {
    if (t < tw) return;
    if (o.smear) {
      const k = E.outC(prog(t, tw, tw + (o.smear.d ?? .32))), n = Math.ceil(20 * k);
      for (let j = 0; j <= n; j++) { const s = j / 20, an = s * Math.PI * 4.5 + i * 1.7, rr = r * (.15 + .5 * s);
        blob(x + Math.cos(an) * rr * .8, y + Math.sin(an) * rr * .55, r * (.38 + .34 * s), i, j); }
      return;
    }
    blob(x, y, r * E.outBack(prog(t, tw, tw + .22), 1.2), i);
  });
  if (o.clearAll != null && t > o.clearAll) { g.globalAlpha = E.outC(prog(t, o.clearAll, o.clearAll + .3)); g.fillRect(FX, FY, FW, FH); }
  if (o.clearAll != null && t >= o.clearAll + .3) return;          // fully clear: no frost residue at all
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.drawImage(fogC, 0, 0); X.restore();
}
window.fogReveal = fogReveal;

// ═════════ CHORUS 1 shots (wrapped: private helpers) ═════════
(() => {
'use strict';
// sprite at a fixed pixel scale (all character poses share one scale → no size pop when poses swap)
const ps = (n, x, y, k, o) => { const im = IMG[n]; if (im) spr(n, x, y, im.height * k, o); };
const burst = (x, y, t0, o = {}) => {                     // ink pop-lines radiating from a point
  const dt = T - t0; if (dt < 0 || dt > .4) return;
  const k = E.outC(dt / .3), a = 1 - clamp((dt - .15) / .25), n = o.n ?? 8, r = o.r ?? 60;
  X.save(); X.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const an = (o.a0 ?? 0) + i / n * (o.arc ?? Math.PI * 2), r0 = r * (.6 + k * .7), r1 = r0 + r * .7 * (1 - k * .4);
    inkLine([[x + Math.cos(an) * r0, y + Math.sin(an) * r0], [x + Math.cos(an) * r1, y + Math.sin(an) * r1]], o.w ?? 6, o.col ?? PAL.ink, .4, 900 + i); }
  X.restore();
};

// ── kill1 · 47.53 → 50.12  KILLING PART #1 + "let it COME THROUGH," ──────────────────
// Chorus 1 is the trickle (chorus 2 is the gush): one clue gulps its way down the pneumatic pipe and pops out on
// "THROUGH". The hook line gets the same torn-paper plate as chorus 2 — the biggest, cleanest type in the film.
const K1 = LINES[10].words, K1_CLUE = K1[2][1], K1_LET = K1[3][1], K1_COME = K1[5][1], K1_THR = K1[6][1];
const PIPE1_H = 250, PIPE1_W = PIPE1_H * 3683 / 893, MOUTH1 = [1500, 190];
function pipeGulp(px, py, bx, amp, puff, sq) {             // pipe drawn in slices so a bulge can travel along it
  const x0 = px - .98 * PIPE1_W, N = 30, sw = PIPE1_W / N;
  for (let i = 0; i < N; i++) {
    const sx = x0 + i * sw, cx = sx + sw / 2; if (sx > DW + 10) break;
    const b = 1 + amp * Math.exp(-Math.pow((cx - bx) / 105, 2)) + puff * clamp(1 - (cx - x0) / 240) + sq;
    X.save(); X.beginPath(); X.rect(sx - .6, py - PIPE1_H * 1.3, sw + 1.2, PIPE1_H * 2.6); X.clip();
    X.translate(0, py); X.scale(1, b); X.translate(0, -py);
    spr('pipe', px, py, PIPE1_H, { ax: .02, ay: .5, flip: true, seed: 4 });
    X.restore();
  }
}
const K1_CAST = [['ck', 80, 0], ['chal', 255, 0], ['hyp', 440, 0], ['st', 1540, 1], ['tc', 1790, 1]];
function hookPlate1(t) {
  const k = E.outC(prog(t, K1_LET - .07, K1_LET + .06)); if (k <= 0) return;
  const Y = 800, L1 = Y - 100, L2 = Y + 120;
  const thr = t >= K1_THR ? kick(t - K1_THR, 9) : 0, com = t >= K1_COME ? kick(t - K1_COME, 10) : 0;
  const w1 = measure('let it', 120, 'FBo'), w2 = measure('COME', 190, 'FB'), w3 = measure('THROUGH,', 240, 'FB'), gap = 44;
  const pw = Math.max(w1 + gap + w2, w3) + 170, ph = 470, x0 = 960 - pw / 2, x1 = x0 + pw * k;
  X.save(); X.translate(960, Y); X.rotate(.01); X.scale(1 + thr * .03 + com * .012, 1 + thr * .04 + com * .016); X.translate(-960, -Y);
  const top = [], bot = [];
  for (let i = 0; i <= 16; i++) { const x = lerp(x0, x1, i / 16); top.push([x, Y - ph / 2 + (hash(i + 41) - .5) * 16]); bot.push([x, Y + ph / 2 + (hash(i + 67) - .5) * 16]); }
  shadowBlob(x0 + pw * k / 2 + 14, Y + 20, pw * k * .52, ph * .54, .32);
  pkPaper([...top, ...bot.reverse()], '#fbf5e6', 5, 762, { shade: [18, 24], shadeA: .4 });
  X.restore();
  const xa = 960 - (w1 + gap + w2) / 2;
  slam('let it', xa + w1 / 2, L1 + 26, 120, K1_LET, { font: 'FBo', col: PAL.ink, from: 1.15 });
  slam('COME', xa + w1 + gap + w2 / 2, L1, 190, K1_COME, { col: PAL.ink, from: 1.35 });
  slam('THROUGH,', 960, L2, 240, K1_THR, { col: PAL.red, edge: true, from: 1.4 });
}
shot('kill1', 47.53, (t) => {
  // the board rises (zoom about the bottom edge) to make room for the hook plate
  const lift = E.io(prog(t, K1_LET - .12, K1_LET + .4)), z = 1 + .2 * lift;
  X.save(); X.translate(960, 1080); X.scale(z, z); X.translate(-960, -1080);
  killingPart(t, 10, { out: K1_LET, cast: false });
  X.restore();
  const mainTack = [960, 1080 - (1080 - 409) * z];
  // the panel springs up at the frame edges on "CLUE" and K-pops through the line: point → lean in → point → cheer
  K1_CAST.forEach(([n, x, fl], i) => {
    const up = spring(t - K1_CLUE - i * .035, 3.2, .42); if (up <= 0) return;
    const keys = [K1_CLUE, K1_LET, K1_COME, K1_THR, beat(75), beat(75.5)];
    const tk = keys.filter(k => t >= k).pop();
    const pose = t < K1_LET ? 'point' : t < K1_COME ? 'leanin' : t < K1_THR ? 'point' : 'cheer';
    const hop = kick(t - tk, 9) * (pose === 'cheer' ? 70 : 34), sq = 1 + kick(t - tk, 14) * .06;
    const settle = lerp(0, 40, lift);                          // duck a little once the plate is up
    ps(`${n}_${pose}`, x, 1080 + 560 - up * 560 + settle - hop, .5, { flip: !!fl, seed: i * 3, sx: 1 / sq, sy: sq, rot: (fl ? -1 : 1) * (pose === 'leanin' ? .06 : 0) });
  });
  // pneumatic pipe: slides in on "let", a bulge gulps along it, mouth swells, the clue pops out on "THROUGH"
  if (t > K1_LET - .04) {
    const pin = E.outBack(prog(t, K1_LET - .04, K1_LET + .26), 1.3), px = lerp(3400, MOUTH1[0] + .97 * PIPE1_W, pin);
    let bx = -999, amp = 0;
    if (t > K1_LET && t < K1_COME) { bx = lerp(2050, 1760, E.outQ(prog(t, K1_LET, K1_COME))); amp = .26; }
    else if (t >= K1_COME && t < K1_THR) { bx = lerp(1760, MOUTH1[0] + 30, E.inQ(prog(t, K1_COME + .04, K1_THR))); amp = .34; }
    const puff = t >= K1_THR ? kick(t - K1_THR, 7) * .4 : prog(t, K1_THR - .12, K1_THR) * .25;
    const sq = t >= K1_COME ? kick(t - K1_COME, 12) * .1 : 0;
    pipeGulp(px, MOUTH1[1], bx, amp, puff, sq);
    if (t < K1_THR + .05) { X.save(); X.globalAlpha *= .7 * prog(t, K1_THR - .5, K1_THR - .1); const mq = pkBlobPts(MOUTH1[0] - 4, MOUTH1[1] + 18, 26, 56 * (1 + puff), 31, 14, .08); p4Fill(() => curve(mq, true), '#4a372a', { wash: .7, grain: .9, tex: 'tex_soft' }); X.restore(); }
    burst(MOUTH1[0] - 40, MOUTH1[1] + 18, K1_THR, { n: 7, r: 70, a0: Math.PI * .55, arc: Math.PI * .9 });
  }
  // the clue: out of the mouth, a quick tumbling arc, pinned beside the "?" — the thread snaps across to it
  const LAND = [1330, 430], TK = [1330, 312];
  if (t > K1_THR - .02) {
    const k = E.outC(prog(t, K1_THR - .02, K1_THR + .3));
    const x = lerp(MOUTH1[0] - 70, LAND[0], k), y = lerp(MOUTH1[1] + 30, LAND[1], k) - Math.sin(k * Math.PI) * 150;
    const sq = 1 + kick(t - K1_THR - .3, 14) * .12;
    card(x, y, { w: 210, h: 260, glyph: 'tube', rot: lerp(-2.2, .06, k), flip: (1 - k) * 2, seed: 334, s: lerp(.35, 1, k) * sq });
    if (t > K1_THR + .3) {
      tack(TK[0], TK[1], 1.15, { pressed: E.outBack(prog(t, K1_THR + .3, K1_THR + .37)) });
      thread(sag(mainTack, TK, .1 * (1 - spring(t - K1_THR - .3, 4, .3)) + .03, 12), { w: 12, k: E.outC(prog(t, K1_THR + .3, K1_THR + .44)) });
      burst(TK[0] + 40, TK[1] + 120, K1_THR + .3, { n: 8, r: 150, w: 5 });
    }
  }
  hookPlate1(t);
  POST.vign = .7;
});

// ── fog1 · 50.12 → 52.02  "Little by little, get a better view." ────────────────────
// Frosted glass: blurry shapes behind it. Each sung word, one of the panel scrubs a patch clear — nose squashed flat
// against the pane. On "VIEW" the glass clears and they all pop back, unsquished, beaming.
const WIPERS = [['hyp', 0, 680, 830, 420], ['chal', 1, 1250, 800, 450], ['tc', 2, 420, 850, 420], ['st', 3, 1530, 870, 390], ['ck', 5, 965, 900, 410]];
// the window must be see-through: pane centres (fractions of the image) for pkSprKeyed (03_verse2.js)
const WIN_PANES = [[.296, .296], [.5, .296], [.70, .296], [.296, .675], [.5, .675], [.70, .675]];
shot('fog1', beat(76), (t) => {
  const W = LINES[11].words, view = W[6][1];
  const push = E.io(prog(t, 50.12, view)), pk = kick(t - view, 8) * (t > view ? 1 : 0);
  const fc = [960, 560, 1 + push * .035 + pk * .03, 0];
  // the room behind the panes, rubbed a little deeper with warm pencil so the cleared view reads strong (world space)
  bgCam(() => {
    plate('room', { z: 1.25, cy: .45 });
    X.save(); X.globalCompositeOperation = 'multiply';
    p4Fill(() => { X.beginPath(); X.rect(-300, -300, DW + 600, DH + 600); }, '#e6cf9e', { alpha: .5, wash: .6, grain: .5, tex: 'tex_soft' });
    X.restore();
  }, fc, { par: .9, over: 1.2 });
  X.save(); cam(...fc);
  fogReveal(t, () => {
    WIPERS.forEach(([n, wi, x, y, h], i) => {
      const tw = W[wi][1], pop = t > view + .06 + i * .04;
      if (!pop) {                                     // scrubbing the glass in little circles, then pressed & breathing
        const sc = prog(t, tw - .05, tw + .34), ph = sc * Math.PI * 4.5 + i;
        const amp = sc > 0 && sc < 1 ? 1 : 0, br = Math.sin(t * 7 + i * 2) * .015;
        ps(`pb_${n}_wipe`, x + Math.cos(ph) * 16 * amp, y + h * .5 + Math.sin(ph) * 9 * amp, h / IMG[`pb_${n}_wipe`].height, { seed: i, rot: Math.cos(ph) * .03 * amp, sx: 1 + br, sy: 1 - br });
      } else {                                        // un-squish: spring back from the glass into a delighted peek
        const s = spring(t - view - .06 - i * .04, 3.4, .38);
        spr(`${n}_peek`, x, y + h * .5 + 40 - s * 60, h * lerp(.86, 1.02, s), { seed: i, rot: (i % 2 ? -1 : 1) * .04 * (1 - s) });
      }
    });
  }, WIPERS.map(([, wi, x, y, h]) => [W[wi][1], x, y - h * .08, h * .52]), { clearAll: view - .05, frost: .72, smear: { d: .34 } });
  pkSprKeyed('window', WIN_PANES, 960, 1130, 1300);
  X.restore();
  X.save(); X.globalAlpha *= vanish(t, 51.95, .08);
  row([['LITTLE', W[0][1]], ['by', W[1][1], { size: 90, font: 'FBo' }], ['LITTLE,', W[2][1]]], 960, 210, 150, { from: 1.7 });
  row([['get a', W[3][1], { size: 90, font: 'FBo' }], ['BETTER', W[5][1], { col: PAL.coral, edge: true }], ['VIEW.', view, { col: PAL.red, edge: true, size: 220 }]], 960, 470, 150, { from: 1.8 });
  X.restore();
});

// ── reroute · 52.02 → dxo2 (54.442)  "If the facts change, then the route can too," ─────────────
// Hypothesis drives the route in a little red roadster, laying the thread behind. "CHANGE" — the result flips to a
// cross and a roadblock springs up: skid. Reverse back to the junction, then swerve onto the new route to the bulb.
const MAP_A = spline([[220, 820], [460, 700], [700, 760], [920, 560], [1180, 520], [1440, 360], [1700, 300]], 14);
const MAP_B = spline([[920, 560], [960, 490], [1100, 450], [1320, 425], [1530, 395], [1700, 300]], 14);
const uAtX = (pts, x) => { const L = plen(pts); let acc = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); if (pts[i][0] >= x) return (acc + d * clamp((x - pts[i - 1][0]) / ((pts[i][0] - pts[i - 1][0]) || 1))) / L; acc += d; } return 1; };
const U_STOP = uAtX(MAP_A, 990), U_J = uAtX(MAP_A, 920), U_B = .86;
shot('reroute', 52.02, (t) => {
  const W = LINES[12].words, tChange = W[3][1], tThen = W[4][1], tRoute = W[6][1], tToo = W[8][1];
  // car progress: drive A → skid stop → reverse to junction → drive B
  const onB = t >= tRoute;
  const uA = t < tChange ? E.ioS(prog(t, 52.0, tChange)) * U_STOP
    : t < tThen ? U_STOP + .012 * E.outC(prog(t, tChange, tChange + .2))
    : lerp(U_STOP + .012, U_J, E.io(prog(t, tThen, tRoute - .04)));
  const uB = onB ? E.io(prog(t, tRoute, tToo)) * U_B : 0;
  const shake = t >= tRoute ? 0 : kick(t - tChange, 10);
  const cl = kick(t - tChange, 8) * (t > tChange ? 1 : 0);
  const rc = [960 + wob(t, 3, shake * 6), 540, 1 + cl * .03 + kick(t - tToo, 9) * (t > tToo ? .03 : 0), wob(t, 5, shake * .01)];
  bgCam(() => paperBG('#efe4c6', .7), rc, { par: .9, over: 1.22 });
  X.save(); cam(...rc);
  X.save(); X.globalAlpha *= .5;
  [[[100, 980], [600, 900], [1200, 980], [1900, 900]], [[300, 100], [500, 400], [400, 700]], [[1500, 1050], [1600, 700], [1850, 600]]].forEach((r, ri) => pkDash(spline(r, 10), 10, 16, 4, P4.lineSoft, { seed: 620 + ri * 50 }));
  X.restore();
  for (let i = 0; i < 9; i++) { const x = 160 + hash(i) * 1600, y = 120 + hash(i + 3) * 860; X.save(); X.globalAlpha *= .4; inkLine([[x - 40, y + 20], [x, y - 20], [x + 40, y + 20]], 4, PAL.inkSoft, 1, 600 + i); X.restore(); }
  thread(MAP_A, { k: Math.max(.002, uA), w: 13, tip: !onB });
  if (onB) thread(MAP_B, { k: Math.max(.002, uB), w: 13, tip: true });
  const fl = prog(t, tChange - .08, tChange + .14);
  card(1180, 620, { w: 170, h: 210, glyph: fl < .5 ? 'tick' : 'cross', flip: fl < .5 ? fl : 1 - fl, rot: -.05, seed: 610, s: 1 + kick(t - tChange, 10) * .15 });
  tack(920, 560, 1.1); card(220, 900, { w: 150, h: 180, glyph: '?', seed: 611, rot: .06 }); tack(220, 820, 1.1);
  const glow = t > tToo ? E.outC(prog(t, tToo, tToo + .2)) : 0;
  if (glow > 0) { pkRub(1700, 400, 150 + kick(t - tToo, 6) * 40, 150 + kick(t - tToo, 6) * 40, '#f6dc7a', { alpha: .9 * glow, seed: 670, layers: 5, step: .16, amp: .1 }); burst(1700, 400, tToo, { n: 12, r: 150, col: PAL.brassDk }); }
  card(1700, 400, { w: 180, h: 220, glyph: 'bulb', seed: 612, rot: .04, s: 1 + kick(t - tToo, 10) * .12 * (t > tToo) }); if (t > tToo) tack(1700, 300, 1.2, { pressed: E.outBack(prog(t, tToo, tToo + .08)) });
  // roadblock springs up in the car's path on "CHANGE"
  if (t > tChange - .04) { const s = spring(t - tChange + .04, 3.6, .38); spr('pb_roadblock', 1190, 548, 150 * s, { seed: 7, rot: (1 - s) * .3, shadow: 1 }); }
  // the car
  const path = onB ? MAP_B : MAP_A, u = onB ? uB : uA, du = .012;
  const p = pAt(path, Math.max(.001, u)), p0 = pAt(path, Math.max(.001, u - du)), p1 = pAt(path, Math.min(1, u + du));
  const moving = onB ? t < tToo : (t < tChange || (t > tThen && t < tRoute - .04));
  const rev = !onB && t > tThen;
  const ang = clamp(Math.atan2(p1[1] - p0[1], p1[0] - p0[0]), -.5, .5) * .7;
  const swerve = (t > tChange - .04 && t < tChange + .4) || (onB && t < tRoute + .32);
  const bump = moving ? -Math.abs(Math.sin(t * 26)) * 6 : 0;
  // dust / skid marks / reversing beeps
  if (moving) for (let j = 1; j <= 4; j++) {
    const uj = u + (rev ? 1 : -1) * j * .018; if (uj <= 0) continue; const q = pAt(path, uj), a = (1 - j / 5) * .45;
    X.save(); X.globalAlpha *= a; inkShape(ellPts(q[0] + (hash2(j, 641) - .5) * 8 - (rev ? -1 : 1) * 60, q[1] - 6 - j * 6, 14 + j * 7, 10 + j * 5, 9), '#efe2c4', 3, 1.2, 640 + j); X.restore();
  }
  if (t > tChange && t < tThen + .2) { X.save(); X.globalAlpha *= .5 * (1 - prog(t, tThen - .1, tThen + .2)); inkLine([[p[0] - 240, p[1] - 6], [p[0] - 90, p[1] - 8]], 8, PAL.ink, .6, 650); inkLine([[p[0] - 215, p[1] + 12], [p[0] - 65, p[1] + 10]], 8, PAL.ink, .6, 651); X.restore(); }
  burst(p[0] + 165, p[1] - 150, tChange, { n: 7, r: 60, a0: -Math.PI * .9, arc: Math.PI * .8 });
  if (rev) [0, 1].forEach(j => { const tb = tThen + .08 + j * .2; if (t > tb && t < tb + .16) { X.save(); X.globalAlpha *= 1 - prog(t, tb, tb + .16); [-1, 0, 1].forEach(s => inkLine([[p[0] - 175, p[1] - 75 + s * 30], [p[0] - 215, p[1] - 82 + s * 40]], 5, PAL.red, .4, 660 + s)); X.restore(); } });
  X.save(); X.translate(p[0], p[1] + 14 + bump); X.rotate(ang + (swerve ? wob(t, 9, .05) : 0) + (rev ? Math.sin(t * 30) * .01 : 0));
  shadowBlob(0, 0, 125, 16, .22);
  ps(swerve ? 'pb_hyp_swerve' : 'pb_hyp_car', swerve ? -6 : 0, 0, .25, { seed: 3, sx: 1 + shake * .06, sy: 1 - shake * .06 });
  X.restore();
  X.restore();
  row([['IF THE', W[0][1], { size: 100, font: 'FBo' }], ['FACTS', W[2][1]], ['CHANGE,', tChange, { col: PAL.red, edge: true }]], 70, 170, 150, { from: 2, align: 'left', maxW: 1100 });
  row([['then the', tThen, { size: 100, font: 'FBo' }], ['ROUTE', tRoute, { col: PAL.red, edge: true }], ['CAN', W[7][1]], ['TOO,', tToo, { f: 5.5, z: .5 }]], 1860, 1010, 170, { from: 2, align: 'right', maxW: 1400 });
});

// D stamp impact on the grid (beat 83 + 40ms); the cut leaves room for its 0.12s descent
shot('dxo2', LINES[13].dxo[0] - .2, (t) => dxo(t, LINES[13].dxo, { bg: '#fde3c8', hands: ['pa_hand_stamp', 'pa_hand_stamp_y', 'pa_hand_stamp'], wink: true, next: 56.12 }));

// ── move · 56.12 → 58.41  "what's the next best move?" ─────────────────────────────
// Test-Chooser plays her hand like a card sharp: fan → hmm (chin tap) → fan → plucks ONE high → slaps it onto the
// board on "MOVE". On the next beat she presents it; Challenger leans out from behind her, magnifier already up.
shot('move', 56.12, (t) => {
  const W = LINES[13].words, tThe = W[2][1], tNext = W[3][1], tBest = W[4][1], tMove = W[5][1], tThrow = tMove - .14, b88 = beat(88);
  const keys = [56.12, tThe, tNext, tBest, tThrow, b88, beat(88.5), beat(89)], tk = keys.filter(k => t >= k).pop();
  const pose = t < tThe ? 'tc_fan' : t < tNext ? 'pb_tc_think' : t < tThrow ? 'pb_tc_pick' : t < b88 ? 'tc_slap' : 'tc_point';
  const hop = kick(t - tk, 10), sq = 1 + hop * .05;
  const mc = [960, 560, 1 + E.io(prog(t, 56.12, tMove)) * .03 + kick(t - tMove, 8) * .03 * (t > tMove), 0];
  bgCam(() => paperBG('#d6ebe3', .55), mc, { par: .9, over: 1.18 });
  X.save(); cam(...mc);
  // Challenger, sneaking out from behind her
  if (t > b88 + .05) {
    const k = E.outBack(prog(t, b88 + .05, b88 + .4), 1.4);
    ps('chal_lean', lerp(1540, 1270, k), 1175, .6, { flip: true, seed: 6, rot: -.04 * k + Math.sin(t * 2.3) * .006 });
  }
  ps(pose, 1470, 1110 - hop * 26, .64, { flip: true, seed: 2, shadow: 1, sx: 1 / sq, sy: sq, rot: pose === 'pb_tc_pick' ? -.03 * hop : 0 });
  if (pose === 'pb_tc_think') {                              // little thought dots
    for (let i = 0; i < 3; i++) if (t > tThe + .06 + i * .06) { const s = pop(t, tThe + .06 + i * .06, 5, .45); X.save(); X.globalAlpha *= .8; inkShape(ellPts(1290 - i * 40, 330 - i * 50, (9 + i * 5) * s, (9 + i * 5) * s, 10), '#fbf5e6', 3, .5, 940 + i); X.restore(); }
  }
  if (t > tThrow) {
    const k = E.outC(prog(t, tThrow, tMove));
    card(lerp(1300, 640, k), lerp(330, 660, k) - Math.sin(k * Math.PI) * 50, { w: 260, h: 330, glyph: 'ct', rot: lerp(.6, -.04, k) + (1 - k) * 6, seed: 650, s: lerp(.4, 1, k) * (1 + kick(t - tMove, 12) * .1) });
    if (t >= tMove) {
      tack(640, 510, 1.5, { pressed: E.outBack(prog(t, tMove, tMove + .07)) });
      thread(sag([-60, 640], [640, 510], .08 * (1 - spring(t - tMove - .05, 4, .3)) + .03, 12), { w: 12, k: E.outC(prog(t, tMove + .05, tMove + .25)) });
      burst(640, 660, tMove, { n: 10, r: 210, w: 6 });
    }
  }
  if (t > b88 + .3) {                                        // Challenger's lens glint on the card
    const g = pop(t, b88 + .3, 5, .4); X.save(); X.globalAlpha *= .9 * clamp(g); X.translate(1080, 640); X.rotate(.3);
    inkLine([[-16 * g, 0], [16 * g, 0]], 4, '#fff', .2, 950); inkLine([[0, -16 * g], [0, 16 * g]], 4, '#fff', .2, 951); X.restore();
  }
  X.restore();
  row([["WHAT'S", W[1][1], { size: 120 }], ['THE', tThe, { size: 100, font: 'FBo' }]], 70, 200, 120, { from: 2, align: 'left' });
  row([['NEXT', tNext], ['BEST', tBest, { col: PAL.teal, edge: true }]], 70, 400, 170, { from: 2.2, align: 'left', maxW: 1000 });
  if (t >= tMove - .06) slam('MOVE?', 700, 1000, 220, tMove, { col: PAL.red, edge: true, from: 1.7 });
});
})();
