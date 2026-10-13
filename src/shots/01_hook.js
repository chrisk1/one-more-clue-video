// 01_hook.js — COLD OPEN (0 – 6.42): "Sequential diagnosis: a question, a test,". One continuous camera move across a
// cork board, in the same camera language as the ending (log-space zoom, long eased glides, restrained drift on holds).
// A hand scribbles a giant "?" in red thread; SE · QUEN · TIAL slap down over it on the sung
// syllables; DIAGNOSIS pulls the camera back to reveal the sequence while three of the panel pop up to admire it;
// then the thread leads on to "a question, a test".
'use strict';
(() => {
const tSE = 1.405, tQU = 1.60, tTI = 1.84;                 // sung syllables Se-quen-tial (vocal stem onsets)
const tD = () => wt(0, 1), tA1 = () => wt(0, 2), tQ = () => wt(0, 3), tA2 = () => wt(0, 4), tT = () => wt(0, 5), tAI = () => wt(1, 0);
const tDot = 1.196;                                        // drum hit: the "?" gets its dot (a pressed tack)
const SEC = [1300, 900], QUC = [2650, 830], TIC = [4000, 910];
const HOOK = [['SE', tSE, SEC, '#f9df86', -.035], ['QUEN', tQU, QUC, '#f6bea6', .03], ['TIAL', tTI, TIC, '#b9e3d3', -.02]];
const CWd = 860, CHt = 540;
const QC = [5500, 960], TC = [6750, 900], DC = [2650, 1520];
const OV = [2650, 1330, .44];                              // overview after DIAGNOSIS
const pinOf = (c, h, rot = 0) => [c[0] + Math.sin(rot) * (h / 2 - 26), c[1] - Math.cos(rot) * (h / 2 - 26)];
const PSE = pinOf(SEC, CHt, -.035), PQU = pinOf(QUC, CHt, .03), PTI = pinOf(TIC, CHt, -.02), PQ = pinOf(QC, 470, .05), PT = pinOf(TC, 430, -.04);

// the "?" the hand scribbles, centred on where SE will land
const [cx0, cy0] = SEC;
const QPATH = spline([[cx0 - 1750, cy0 - 40], [cx0 - 1150, cy0 + 10], [cx0 - 650, cy0 - 80], [cx0 - 330, cy0 - 170], [cx0 - 215, cy0 - 270],
  [cx0 - 175, cy0 - 375], [cx0 - 70, cy0 - 445], [cx0 + 80, cy0 - 448], [cx0 + 200, cy0 - 378], [cx0 + 232, cy0 - 262], [cx0 + 172, cy0 - 150],
  [cx0 + 62, cy0 - 78], [cx0 + 6, cy0 + 4], [cx0, cy0 + 140]], 16);
const QDOT = [cx0, cy0 + 282];
const PICK = [.212, .342, .839];                            // the drum pickups before the vocal: the hand lunges on each
const qk = (t) => {
  let v = .04 * E.ioS(prog(t, -.1, PICK[0]));
  v = lerp(v, .19, E.outExpo(prog(t, PICK[0], PICK[0] + .12)));
  v = lerp(v, .37, E.outExpo(prog(t, PICK[1], PICK[1] + .13)));
  v = lerp(v, .45, E.ioS(prog(t, PICK[1] + .13, PICK[2])));
  v = lerp(v, .93, E.outExpo(prog(t, PICK[2], PICK[2] + .17)));
  v = lerp(v, 1, E.outQ(prog(t, PICK[2] + .17, 1.06)));
  return Math.max(.0015, v);
};
const tipAt = (t) => t < 1.06 ? pAt(QPATH, qk(t)) : (() => {    // after the hook: hop to the dot, jab it, then away
  const end = QPATH[QPATH.length - 1], k = E.io(prog(t, 1.06, tDot));
  return [lerp(end[0], QDOT[0], k), lerp(end[1], QDOT[1], k) - Math.sin(k * Math.PI) * 70];
})();

// main route: from the left edge through the three syllable pins, on to the question and the test, then off right
const R_CTRL = [[-500, 560], [500, 640], PSE, ...sag(PSE, PQU, .1, 6).slice(1, -1), PQU, ...sag(PQU, PTI, .1, 6).slice(1, -1), PTI,
  [4700, 820], PQ, ...sag(PQ, PT, .08, 6).slice(1, -1), PT, [7500, 820], [8700, 700]];
const ROUTE = spline(R_CTRL, 8), RLEN = plen(ROUTE);
const uOf = (p) => { let best = 0, bd = 1e9; ROUTE.forEach((q, i) => { const d = Math.hypot(q[0] - p[0], q[1] - p[1]); if (d < bd) { bd = d; best = i; } }); return plen(ROUTE.slice(0, best + 1)) / RLEN; };
const U = { se: uOf(PSE), qu: uOf(PQU), ti: uOf(PTI), q: uOf(PQ), t: uOf(PT) };
const routeK = (t) => {
  if (t < 1.24) return 0;
  if (t < tSE) return lerp(0, U.se, E.outC(prog(t, 1.24, tSE)));
  if (t < tQU) return lerp(U.se, U.qu, E.io(prog(t, tQU - .19, tQU)));
  if (t < tTI) return lerp(U.qu, U.ti, E.io(prog(t, tTI - .2, tTI)));
  if (t < tQ()) return lerp(U.ti, U.q, E.io(prog(t, 3.5, tQ())));
  if (t < tT()) return lerp(U.q, U.t, E.io(prog(t, tT() - .26, tT())));
  return lerp(U.t, 1, E.io(prog(t, 5.25, 6.3)));
};

// ── camera ──
const mixC = (A, B, k) => [lerp(A[0], B[0], k), lerp(A[1], B[1], k), Math.exp(lerp(Math.log(A[2]), Math.log(B[2]), k))];
function camRaw(t) {
  // 1 · wide on a cluttered board, then a long, deliberate push to the "?" as it curls
  const W0 = [cx0 - 620, cy0 - 140, .44];
  const PRE = [W0[0] + 36, W0[1] - 10, W0[2] * 1.035];
  const G0 = [SEC[0] + 540, 900, .64], G1 = [TIC[0] - 560, 910, .61];
  let c = mixC(W0, PRE, E.ioS(prog(t, -.1, .68)));
  c = mixC(c, G0, E.ioS(prog(t, .68, tSE)));
  // 2 · arrive cleanly with SE, then glide once across SE → QUEN → TIAL (arrivals do the hits; no bumps)
  if (t >= tSE + .1) c = mixC(G0, G1, E.ioS(prog(t, tSE + .1, tD() + .08)));
  // 3 · DIAGNOSIS: a confident eased pull to the overview, then a quiet breath
  if (t >= tD() - .02) {
    const k = E.ioS(prog(t, tD() - .02, tD() + .62)), d = E.ioS(prog(t, tD() + .32, 3.6));
    c = mixC(c, [OV[0] + d * 45, OV[1] - d * 16, OV[2] * (1 + d * .04)], k);
  }
  // 4 · the thread leads off to the question; 5 · one unhurried move to TEST; 6 · hold/push into the handoff
  if (t >= 3.42) c = mixC(c, [QC[0] - 40, QC[1] - 60, .9], E.ioS(prog(t, 3.42, tQ())));
  if (t >= tQ()) c = mixC([QC[0] - 40, QC[1] - 60, .9], [TC[0] - 70, TC[1] - 58, .94], E.ioS(prog(t, tQ(), tT())));
  if (t >= tT()) c = mixC([TC[0] - 70, TC[1] - 58, .94], [TC[0] - 120, TC[1] - 70, 1.06], E.ioS(prog(t, tT(), tAI())));
  return c;
}
function camAt(t) {
  return camRaw(t);
}

// ── cork: the ending's board, tiled with mirrored copies so it runs on seamlessly ──
let CORKC = null;
function corkCanvas() {
  const im = IMG.cork_even || IMG.cork; if (!im) return null;
  if (!CORKC) { CORKC = document.createElement('canvas'); CORKC.width = im.naturalWidth; CORKC.height = im.naturalHeight; CORKC.getContext('2d').drawImage(im, 0, 0); }
  return CORKC;
}
function cork(c) {
  const ck = corkCanvas(); if (!ck) return;
  const TW = 2880, TH = 1620, hw = DW / 2 / c[2] + 200, hh = DH / 2 / c[2] + 200;
  for (let i = Math.floor((c[0] - hw) / TW); i <= Math.floor((c[0] + hw) / TW); i++)
    for (let j = Math.floor((c[1] - hh) / TH); j <= Math.floor((c[1] + hh) / TH); j++) {
      X.save(); X.translate(i * TW + (i & 1 ? TW : 0), j * TH + (j & 1 ? TH : 0)); X.scale(i & 1 ? -1 : 1, j & 1 ? -1 : 1);
      X.drawImage(ck, 0, 0, TW + 1, TH + 1); X.restore();
    }
  X.save(); X.globalCompositeOperation = 'multiply'; X.globalAlpha = .26; X.fillStyle = PAL.peach; X.fillRect(c[0] - hw, c[1] - hh, hw * 2, hh * 2); X.restore();
  // soft window light falling across the board (wide, uneven diagonal bands)
  X.save(); X.globalCompositeOperation = 'soft-light';
  for (let i = -2; i < 9; i++) {
    const x = i * 1350 + hash(i + 3) * 500, w = 260 + hash(i + 9) * 420, a = .35 + hash(i + 17) * .35;
    const g = X.createLinearGradient(x, 0, x + w, 0); g.addColorStop(0, 'rgba(255,240,200,0)'); g.addColorStop(.25, `rgba(255,236,190,${a})`); g.addColorStop(.75, `rgba(255,236,190,${a})`); g.addColorStop(1, 'rgba(255,240,200,0)');
    X.save(); X.translate(0, 1300); X.transform(1, 0, -.9, 1, 0, 0); X.translate(0, -1300); X.fillStyle = g; X.fillRect(x, -800, w, 4200); X.restore();
  }
  X.restore();
}

// the board starts cluttered with old clue cards; the hand's big yank (PICK[2]) blows them all off toward camera
const CLUT = (() => {
  const G = ['heart', 'xray', 'flask', 'dna', 'tube', 'slide', 'steth', 'mri', 'thermo', 'ct', 'pill', 'drop', '?', 'bulb'], out = [];
  for (let i = 0; i < 46; i++) {
    const x = cx0 - 2900 + hash(i * 3.1) * 4700, y = cy0 - 1350 + hash(i * 7.7 + 2) * 2500;
    if (x > cx0 - 1850 && x < cx0 + 420 && y > cy0 - 560 && y < cy0 + 380) continue;   // keep the "?" lane clear
    out.push({ x, y, g: G[i % G.length], rot: (hash(i + 40) - .5) * .5, w: 190 + hash(i + 9) * 90, i });
  }
  return out;
})();
function clutter(t) {
  const hp = [cx0 - 900, cy0 - 100];
  CLUT.forEach(c => {
    const d = Math.hypot(c.x - hp[0], c.y - hp[1]), tb = PICK[2] + d / 14000, u = t - tb;
    const wig = (t > PICK[1] ? kick(t - PICK[1] - d / 12000, 9) : 0) * .04 * (c.i % 2 ? 1 : -1);   // they shiver on the first yank
    if (u > .72) return;
    if (u <= 0) {
      card(c.x, c.y, { w: c.w, h: c.w * 1.25, glyph: c.g, rot: c.rot + wig, seed: 400 + c.i, lines: false });
      tack(c.x, c.y - c.w * .55, 1.1);
      return;
    }
    const k = E.ioS(clamp(u / .72)), dx = (c.x - hp[0]) / (d || 1), dy = (c.y - hp[1]) / (d || 1);
    const s = 1 + k * 2.1, x = c.x + dx * k * 2450, y = c.y + dy * k * 1850 - Math.sin(clamp(u / .72) * Math.PI) * 150;
    card(x, y, { w: c.w, h: c.w * 1.25, glyph: c.g, rot: c.rot + k * (c.i % 2 ? 3.1 : -3.1), seed: 400 + c.i, lines: false, s, alpha: 1 - E.ioS(clamp((u - .18) / .42)), flip: k * .9, shadow: 1 + k * 2.1 });
  });
}
// paper puffs where a card slaps down
function puff(x, y, t, t0, w) {
  if (t < t0 || t > t0 + .6) return;
  const d = E.outC(prog(t, t0, t0 + .5));
  X.save(); X.globalAlpha *= vanish(t, t0 + .25, .3) * .55; X.fillStyle = '#efdfbd';
  for (let j = 0; j < 9; j++) { const s = j % 2 ? 1 : -1, a = j / 9; X.beginPath(); X.arc(x + s * (w * .5 + d * 120 * (.6 + a)), y + (a - .5) * w * .5 - d * 40 * a, 18 * (1 - d * .7) + 6, 0, 7); X.fill(); }
  X.restore();
}
const shiver = (t, x) => t > tD() ? Math.sin((t - tD()) * 26 + x * .01) * kick(t - tD(), 5) * .05 : 0;

function world(t, c) {
  cork(c);
  if (t < PICK[2] + 1) clutter(t);
  // the scribbled "?" (covered by SE once it lands); its dot stays as a tack peeking out under the card
  const k = qk(t);
  if (t < tSE + .05) thread(QPATH, { k, w: 26, tip: t < 1.06 });
  if (t >= tDot) tack(...QDOT, 1.7, { pressed: E.outBack(prog(t, tDot, tDot + .08)) });
  // route
  const rk = routeK(t);
  if (rk > 0) thread(ROUTE, { k: rk, w: 20, tip: rk < 1 });
  // loose end dangling from TIAL while the title holds (as the ending's loose end does)
  if (t > tTI + .05 && t < 3.6) {
    const hang = E.outC(prog(t, tTI + .05, tTI + .6)), sw = Math.sin(t * 2.1) * 26, out = 1 - E.inQ(prog(t, 3.35, 3.6));
    thread(spline([PTI, [PTI[0] + 180, PTI[1] - 20 - 40 * hang], [PTI[0] + 330 + sw, PTI[1] + 60 + 170 * hang * out]], 8), { w: 20 });
  }
  // the three syllable cards
  HOOK.forEach(([txt, t0, C, stock, rot], i) => {
    if (t < t0 - .2) return;
    const f = flyCard(t, t0, C[0], C[1], { rot, fromX: C[0] + 420, fromY: C[1] + 900, fromR: -1 + i * .55, fromS: 2.5, dur: i ? .17 : .13 });
    const r = f.rot + shiver(t, C[0]);
    X.save(); X.translate(f.x, f.y); X.rotate(r); X.scale(f.s * f.sx, f.s * f.sy); X.globalAlpha *= f.alpha;
    card(0, 0, { w: CWd, h: CHt, stock, lines: false, seed: i + 1, shadow: 1 + (f.s - 1) * 1.5 });
    word(txt, 0, 112, 330, { ax: .5, col: PAL.ink, seed: i, bake: true });
    X.restore();
    puff(C[0], C[1], t, t0, CWd);
    const P = [PSE, PQU, PTI][i];
    if (t >= t0) tack(P[0], P[1], 1.7, { pressed: E.outBack(prog(t, t0, t0 + .08)) });
  });
  // three of the panel pop up under the title on the 8ths, then all lean to watch the thread run off right
  const PEEK = [['chal_peek', DC[0] - 1080, beat(2), -.06], ['ck_peek', DC[0], beat(2.5), .03], ['st_peek', DC[0] + 1080, beat(3), -.02]];
  PEEK.forEach(([n, x, t0, r], i) => {
    if (t < t0 - .05 || t > 4.3) return;
    const up = spring(t - t0, 3.3, .38), look = E.io(prog(t, 3.45 + i * .04, 3.75 + i * .04));
    const bob = (t > beat(3.5) ? kick(t - beat(3.5), 9) : 0) * 30 + (t > beat(4) ? kick(t - beat(4), 9) : 0) * 30;
    const sq = paSq(t - t0, .14);
    spr(n, x + look * 90, 2420 + (1 - up) * 760 - bob, 760, { rot: r + look * .14, seed: 60 + i, sx: sq.sx, sy: sq.sy, ay: 1 });
  });
  // question & test cards
  const ta1 = tA1(), tq = tQ(), ta2 = tA2(), tt = tT();
  if (t > tq - .2) {
    const f = flyCard(t, tq, QC[0], QC[1], { fromS: 1.7, fromY: QC[1] - 900, fromX: QC[0] + 120, fromR: .6, rot: .05, dur: .2 });
    X.save(); X.translate(f.x, f.y); X.rotate(f.rot); X.scale(f.s * f.sx, f.s * f.sy); X.globalAlpha *= f.alpha; card(0, 0, { w: 380, h: 470, glyph: '?', stock: '#f9df86', seed: 7, lines: false }); X.restore();
    puff(QC[0], QC[1], t, tq, 380);
    if (t >= tq) tack(...PQ, 1.3, { pressed: E.outBack(prog(t, tq, tq + .08)) });
  }
  if (t > tt - .2) {
    const g = flyCard(t, tt, TC[0], TC[1], { fromS: 2.4, fromY: TC[1] + 900, fromX: TC[0] + 260, fromR: -.6, rot: -.04, dur: .18 });
    X.save(); X.translate(g.x, g.y); X.rotate(g.rot); X.scale(g.s * g.sx, g.s * g.sy); X.globalAlpha *= g.alpha; card(0, 0, { w: 360, h: 430, glyph: 'flask', seed: 8 }); X.restore();
    puff(TC[0], TC[1], t, tt, 360);
    if (t >= tt) tack(...PT, 1.3, { pressed: E.outBack(prog(t, tt, tt + .08)) });
  }
  // words travel with the board (baked: they blur with the whip like everything else on it)
  word('a', QC[0] - 620, QC[1] - 330, 110, { alpha: appear(t, ta1 - .03, .08), col: PAL.inkSoft, font: 'FBo', ax: .5, bake: true });
  tapeSlam('QUESTION,', QC[0] - 80, QC[1] - 330, 150, tq, PAL.dusk, t);
  word('a', TC[0] - 520, TC[1] - 320, 110, { alpha: appear(t, ta2 - .03, .08), col: PAL.inkSoft, font: 'FBo', ax: .5, bake: true });
  tapeSlam('TEST,', TC[0] - 70, TC[1] - 320, 210, tt, PAL.red, t);
  // Hypothesis bobs up beside the "?": shouts on "a", hand up on "question", points on to the test
  if (t > ta1 - .1) {
    const up = spring(t - (ta1 - .06), 3.2, .42);
    const seq = [[0, paImg('pa_hyp_shout', 'hyp_raisehand')], [tq, 'hyp_raisehand'], [tt, 'hyp_point']];
    const pose = paPick(t, seq), sq = paSq(paSince(t, seq), .1), hh = { hyp_raisehand: 560, hyp_point: 440 }[pose] || 420;
    spr(pose, QC[0] + 440, QC[1] + 620 + (1 - up) * 520 - kick(t - tq, 9) * 28 * (t > tq ? 1 : 0), hh, { sx: sq.sx, sy: sq.sy, seed: 12, rot: Math.sin(beatAt(t) * Math.PI) * .03 });
  }
  // Test-Chooser pops up under the test card the moment it lands, hugging her own card
  if (t > tt) { const up = spring(t - tt - .03, 3.4, .4); spr('tc_peek', TC[0] + 30, TC[1] + 610 + (1 - up) * 400, 330, { seed: 13, rot: -.04 + Math.sin(t * 5) * .02 }); }
}
// a word slammed onto its own torn tape strip (world space, travels with the board)
function tapeSlam(text, x, y, size, t0, col, t) {
  if (t < t0 - .06) return;
  const w = measure(text, size, 'FB'), kk = E.outC(prog(t, t0 - .05, t0 + .06)), pad = size * .2;
  X.save(); X.translate(x - w / 2 - pad, y - size * .36); X.rotate(-.012); X.scale(kk, 1);
  inkShape(rectPts(0, -size * .52, w + pad * 2, size * 1.04, 6, 3), '#fbf3df', 3, 1.2, 640 + text.length);
  X.restore();
  slam(text, x, y, size, t0 - .02, { col, edge: true, from: 1.35, bake: true });
}
// DIAGNOSIS: a long title card slapped across the board (kept crisp through the snap-back)
function diagCard(t) {
  const t0 = tD(); if (t < t0 - .16) return;
  const f = flyCard(t, t0, DC[0], DC[1], { fromS: 1.9, fromY: DC[1] + 300, fromX: DC[0] + 200, fromR: -.25, rot: -.015, dur: .15 });
  X.save(); X.translate(f.x, f.y); X.rotate(f.rot + shiver(t, DC[0]) * .4); X.scale(f.s * f.sx, f.s * f.sy); X.globalAlpha *= f.alpha;
  card(0, 0, { w: 2900, h: 560, stock: '#fbf5e6', lines: false, seed: 31, shadow: 1.4 });
  word('DIAGNOSIS:', 0, 140, 400, { ax: .5, col: PAL.red, edge: true, seed: 4, bake: true });
  X.restore();
  if (t >= t0) [[DC[0] - 1380, DC[1] - 245], [DC[0] + 1380, DC[1] - 255]].forEach(([x, y]) => tack(x, y, 1.6, { pressed: E.outBack(prog(t, t0, t0 + .07)) }));
  puff(DC[0], DC[1], t, t0, 2900);
}

shot('hook', 0, (t) => {
  const c = camAt(t), p = camAt(t - 1 / 48);
  const roll = wob(t, 9, .0007) + Math.sin(prog(t, 3.5, tQ()) * Math.PI) * .004;
  X.save(); cam(c[0], c[1], c[2], roll);
  world(t, c);
  paCrisp(() => diagCard(t));
  // the hand: pinches the thread tip, writes the "?", jabs the dot in, then whisks off up-right
  if (t < 1.36 && t > -.05) {
    const tip = tipAt(t), away = Math.max(1 - E.outC(prog(t, PICK[0] - .12, PICK[0] + .02)), E.inQ(prog(t, tDot + .03, 1.32))), press = t > tDot ? kick(t - tDot, 14) : 0;
    const ang = .42 + Math.sin(t * 2.1) * .015 + vnoise(t * 2, 5) * .018;
    const bob = 0;
    const hx = tip[0] + Math.sin(ang) * 2600 * away, hy = tip[1] - Math.cos(ang) * 2600 * away + 6 + press * 14 - bob;
    spr('pa_hand_pinch', hx, hy, 520 * (1 - press * .06), { rot: ang, seed: 33, ay: .985 });
  }
  X.restore();
  const sm = .45, vx = (c[0] - p[0]) * c[2] * sm, vy = (c[1] - p[1]) * c[2] * sm;
  if (Math.hypot(vx, vy) > 18) POST.smear = [vx, vy];
  POST.vign = .6;
});
window.HOOK_CAM = camAt;
})();
