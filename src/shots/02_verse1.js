// 02_verse1.js — VERSE 1 (6.42 – 24.25): "Artificial intelligence choosing what comes next. / New evidence lands, and
// we change our view, / The next move follows from the latest clue." then the ONE MORE CLUE title drop.
// Also defines helpers shared by the other early sections (pa* pose helpers, o12Row, camIn, flyCard, paStars).
'use strict';

// ── small pose helpers (pa*) — shared with the hook and verse 2 ──────────────────────────────────────
// paPick: value of the last [time, value] step reached; paSince: seconds since that step (for swap squash)
const paPick = (t, seq) => { let v = seq[0][1]; for (const [ts, val] of seq) if (t >= ts) v = val; return v; };
const paSince = (t, seq) => { let s = -1e9; for (const [ts] of seq) if (t >= ts) s = ts; return t - s; };
const paSq = (dt, a = .1) => { const k = dt >= 0 ? kick(dt, 14) : 0; return { sx: 1 + k * a, sy: 1 - k * a }; };
const paImg = (n, fb) => IMG[n] ? n : fb;
// Draw fn() so it stays sharp through a whip smear (subject tracked by the camera): it is left out of
// the blurred pass and painted straight onto the frame during the type-record pass, under the type.
function paCrisp(fn) {
  if (TYPE_MODE === 'skip') return;
  if (TYPE_MODE === 'record') { const keep = X, m = X.getTransform(), a = X.globalAlpha; X = CV.getContext('2d'); X.save(); X.setTransform(m); X.globalAlpha = a; fn(); X.restore(); X = keep; return; }
  fn();
}

// Friendly hand-drawn AI creature: a small paper constellation/molecule (a tiny neural net), not a robot.
function aiCreature(x, y, s, o = {}) {
  const t = o.t ?? T, seed = o.seed ?? 1200, build = o.build ?? -99, col = o.col ?? PAL.lemon;
  const colorK = o.colorK ?? 1, button = o.button ?? 0, bow = o.bow ?? 0;
  const cols = o.cols || [col];
  const head = [0, -334, 36];
  const layers = [
    [[-58, -226], [0, -226], [58, -226]],
    [[-82, -146], [-27, -146], [27, -146], [82, -146]],
    [[-58, -66], [0, -66], [58, -66]]
  ];
  const nodes = [head, ...layers.flat().map(([nx, ny]) => [nx, ny, 13])];
  const layerIndex = (li, ni) => 1 + layers.slice(0, li).reduce((a, row) => a + row.length, 0) + ni;
  const links = [[0, layerIndex(0, 0)], [0, layerIndex(0, 1)], [0, layerIndex(0, 2)]];
  for (let li = 0; li < layers.length - 1; li++) {
    for (let a = 0; a < layers[li].length; a++) for (let b = 0; b < layers[li + 1].length; b++) links.push([layerIndex(li, a), layerIndex(li + 1, b)]);
  }
  const made = (j) => E.outBack(prog(t, build + j * .045, build + j * .17), .55);
  X.save(); X.translate(x, y); X.scale(s * (o.sx ?? 1), s * (o.sy ?? 1)); X.globalAlpha *= o.alpha ?? 1;
  const beatN = Math.floor(beatAt(t)), beatPulse = kick(t - beat(beatN), 8);
  if (o.shadow !== 0) shadowBlob(0, 18, 126, 16, .15);
  const pts = nodes.map(([nx, ny, r], j) => [
    nx + wob(t, seed + j * 11, .55),
    ny + wob(t, seed + j * 13, .5),
    r
  ]);
  links.forEach(([a, b], j) => {
    const k = E.outC(prog(t, build + Math.max(a, b) * .045 - .04, build + Math.max(a, b) * .045 + .14));
    if (k <= 0) return;
    const A = pts[a], B = pts[b], bow = (j % 2 ? 1 : -1) * (a === 0 ? 10 : 7);
    const C = [(A[0] + B[0]) / 2 + bow, (A[1] + B[1]) / 2];
    const drawn = ptrim(spline([[A[0], A[1]], C, [B[0], B[1]]], 7), k);
    inkLine(drawn, 3.2 / s, PAL.inkSoft, .32, seed + 40 + j);
    if (k > .96 && colorK > .18) {
      const p = (beatAt(t) * .85 + j * .17) % 1;
      const q0 = p < .5 ? lerp(A[0], C[0], p * 2) : lerp(C[0], B[0], (p - .5) * 2);
      const q1 = p < .5 ? lerp(A[1], C[1], p * 2) : lerp(C[1], B[1], (p - .5) * 2);
      X.save(); X.globalAlpha *= (.18 + beatPulse * .18) * colorK;
      X.fillStyle = cols[j % cols.length];
      X.beginPath(); X.ellipse(q0, q1, 4.5 / s, 3.8 / s, 0, 0, 7); X.fill();
      X.restore();
    }
  });
  pts.forEach(([nx, ny, r], j) => {
    const k = made(j);
    if (k <= 0) return;
    const popS = k * (1 + kick(t - (build + j * .045), 12) * .11);
    X.save(); X.translate(nx, ny); X.scale(popS, popS);
    const nodeCol = cols[j % cols.length];
    inkShape(ellPts(0, 0, r, r * (j === 0 ? .94 : .9), 14), '#fff5df', 3 / s, .55, seed + j);
    X.save(); X.globalAlpha *= .24 + .58 * colorK; inkShape(ellPts(0, 0, r * .92, r * (j === 0 ? .86 : .78), 13), nodeCol, 0, .65, seed + 80 + j); X.restore();
    if (j === 0) {
      const blink = Math.sin(t * 7.2 + seed) > .94 ? .12 : 1;
      if (blink > .2) {
        dot(-11, -6, 3.1); dot(11, -6, 3.1);
      } else {
        inkLine([[-14, -6], [-8, -6]], 1.8 / s, PAL.ink, .28, seed + 8);
        inkLine([[8, -6], [14, -6]], 1.8 / s, PAL.ink, .28, seed + 9);
      }
      inkLine([[-9, 11], [0, 15], [10, 11]], 2.1 / s, PAL.ink, .32, seed + 10);
    }
    X.restore();
  });
  if (button > .04) {
    X.save(); X.globalAlpha *= button * .7; X.translate(0, -146); X.scale(1 + button * .08, 1 + button * .08);
    inkShape(ellPts(0, 0, 62 + button * 18, 48 + button * 12, 18), null, 3 / s, .35, seed + 91);
    X.save(); X.globalAlpha *= .28; X.fillStyle = PAL.lemon; X.beginPath(); X.ellipse(0, 0, 78 + button * 26, 56 + button * 18, 0, 0, 7); X.fill(); X.restore();
    X.restore();
  }
  if (bow > .04) {
    X.save(); X.globalAlpha *= bow * .45; X.translate(0, -334);
    inkShape(ellPts(0, 0, 58 + bow * 20, 46 + bow * 14, 18), null, 2.2 / s, .3, seed + 93);
    X.restore();
  }
  X.restore();
}
window.aiCreature = aiCreature;
function aiMorphPuff(x, y, s, t, t0, seed = 1300) {
  const a = appear(t, t0 - .03, .05) * vanish(t, t0 + .22, .16);
  if (a <= 0) return;
  const spin = E.outC(prog(t, t0 - .03, t0 + .22));
  X.save(); X.translate(x, y); X.scale(s, s); X.globalAlpha *= a;
  for (let j = 0; j < 9; j++) {
    const an = j / 9 * Math.PI * 2 + spin * 1.7, r0 = 20 + j * 1.8, r1 = 96 + spin * 42;
    inkLine([[Math.cos(an) * r0, Math.sin(an) * r0], [Math.cos(an + .35) * r1, Math.sin(an + .35) * r1]], 5, j % 2 ? PAL.cream : PAL.inkSoft, .35, seed + j);
  }
  for (let j = 0; j < 6; j++) {
    const an = j / 6 * Math.PI * 2 - spin, rr = 44 + spin * 72;
    X.save(); X.globalAlpha *= .5; X.fillStyle = j % 2 ? '#fff5df' : PAL.cream;
    X.beginPath(); X.ellipse(Math.cos(an) * rr, Math.sin(an) * rr * .75, 12 - spin * 4, 9 - spin * 3, an, 0, 7); X.fill(); X.restore();
  }
  X.restore();
}

// Row of slammed words (shared by the opening and verse 2): gentle overshoot + a short drop for punch, growth anchored inward
// near the frame edges, and (o.tape) a paper strip per word that tears in WITH its word, sized to the text.
function o12Row(items, cx, y, size, o = {}) {
  const font = o.font || 'FB', gapK = o.gap ?? .26, sz = (oo) => (oo && oo.size) || size;
  const meas = (kk) => { const ws = items.map(([w, , oo]) => measure(w, sz(oo) * kk, (oo && oo.font) || font)); return [ws, ws.reduce((a, b) => a + b, 0) + size * kk * gapK * (ws.length - 1)]; };
  let k = 1, [ws, total] = meas(1);
  const maxW = o.maxW ?? 1760;
  if (total > maxW) { k = maxW / total; [ws, total] = meas(k); }
  const gap = size * k * gapK;
  let x = cx - total * (o.align === 'left' ? 0 : o.align === 'right' ? 1 : .5);
  if (o.clamp !== false) x = clamp(x, 70, DW - 70 - total);
  const xs = []; ws.reduce((xx, w) => { xs.push(xx); return xx + w + gap; }, x);
  const lead = (oo) => (oo && oo.lead) ?? o.lead ?? -.02;
  if (o.tape) items.forEach(([w, t0, oo = {}], i) => {
    const t1 = t0 + lead(oo), kk = E.outC(prog(T, t1 - .02, t1 + .07));
    if (kk <= 0) return;
    const s = sz(oo) * k, pad = Math.max(16, s * .15), hh = size * k * 1.02, x0 = xs[i] - pad - (i ? gap * .3 : 0);
    X.save(); X.globalAlpha *= (o.alpha ?? 1); X.translate(x0, y - size * k * .36); X.rotate((hash(i * 7.3 + t0) - .5) * .025); X.scale(kk, 1);
    inkShape(rectPts(0, -hh / 2, ws[i] + pad * 2 + (i ? gap * .3 : 0), hh, 6, 3), o.tape, 3, 1.2, 600 + i * 13 + Math.floor(t0 * 10));
    X.restore();
  });
  items.forEach(([w, t0, oo = {}], i) => {
    const s = sz(oo) * k, t1 = t0 + lead(oo), dt = T - t1;
    const dy = dt >= 0 ? (oo.dy ?? o.dy ?? s * .28) * (1 - spring(dt, 3.4, .42)) : 0;
    let ax = .5, px = xs[i] + ws[i] / 2;
    if (xs[i] < 230) { ax = 0; px = xs[i]; } else if (xs[i] + ws[i] > DW - 230) { ax = 1; px = xs[i] + ws[i]; }
    const { size: _s, tape: _t, ...rest } = { ...o, ...oo };
    slam(w, px, y - dy, s, t1, { ...rest, font: (oo.font) || font, ax, from: oo.from ?? o.from ?? 1.25 });
  });
  return total;
}
window.o12Row = o12Row;

// Camera entry shared by the opening shots: a calm eased settle, then a slow push for the rest of the shot.
// Call inside X.save()/X.restore(). If o.bg is supplied, it is drawn with bgCam before the foreground camera.
function camIn(t, t0, o = {}) {
  const d = o.d ?? .62, k = E.ioS(prog(t, t0, t0 + d)), k2 = E.ioS(prog(t + 1 / 48, t0, t0 + d));
  const dx = o.dx ?? -240, dy = o.dy ?? 0, z0 = o.z0 ?? .035;
  const push = 1 + (o.push ?? .035) * E.ioS(prog(t, t0, o.t1 ?? t0 + 4));
  const z = push * (1 + z0 * (1 - k)) * (1 + (o.kick ? o.kick(t) : 0));
  const cx = 960 + dx * (1 - k) + (o.ox ?? 0), cy = 540 + dy * (1 - k) + (o.oy ?? 0), r = (o.r ?? 0) * (1 - k) + wob(t, 77, .0006);
  if (o.bg) bgCam(o.bg, [cx, cy, z, r], { par: o.par ?? .82, over: o.over ?? 1.22 });
  cam(cx, cy, z, r);
  const vx = dx * (k - k2) * 2.4 * z, vy = dy * (k - k2) * 2.4 * z;
  if (o.smear !== false && Math.hypot(vx, vy) > 22) POST.smear = [vx * .25, vy * .25];
}
window.camIn = camIn;

// Card arriving from camera: returns transform state for flight then pinned.
function flyCard(t, t0, x, y, o = {}) {
  const d = o.dur ?? .26, k = E.outC(prog(t, t0 - d, t0));
  const s = lerp(o.fromS ?? 3.2, 1, k), r = lerp(o.fromR ?? -.9, o.rot ?? 0, k);
  const fx = lerp(o.fromX ?? x - 120, x, k), fy = lerp(o.fromY ?? y + 160, y, k);
  const sq = 1 + kick(t - t0, 16) * .14;
  return { x: fx, y: fy, s: s, rot: r + Math.sin((t - t0) * 30) * kick(t - t0, 9) * .05, sx: sq, sy: 1 / sq, alpha: clamp((t - t0 + d) / .06) };
}

// ── ai · "Artificial" → "New"  "Artificial intelligence choosing what comes next." ─────────
// Five friendly network-creatures form, then puff into the five roles.
const CAST = [
  { k: 'ck', h: 430 }, { k: 'chal', h: 470 }, { k: 'hyp', h: 360 }, { k: 'tc', h: 450 }, { k: 'st', h: 380 }];
window.CAST = CAST;
// per-pose height multipliers vs CAST[i].h (which is tuned for the _point/_leanin drawings)
const PA_AI_H = { pa_hyp_think: 1.0, pa_chal_think: 1.0, pa_tc_think: 1.0, pa_st_think: 1.0, pa_ck_think: 1.0,
  hyp_cheer: 1.05, chal_cheer: 1.05, tc_cheer: 1.05, st_cheer: 1.05, ck_cheer: 1.05 };
const W1 = LINES[1].words.map(w => w[1]);                 // Artificial intelligence choosing what comes next.
shot('ai', W1[0], (t) => {
  const [tA, tI, tC, tW, , tN] = W1;
  X.save(); camIn(t, tA, { dx: -180, d: .74, z0: .025, push: .035, t1: tN + .6, oy: 10, bg: () => paperBG('#fbe9c8', .55), par: .78, over: 1.24, smear: false });
  const unf = [tA, tA + .20, tA + .40, tA + .62, tI];    // Ar-ti-fi-cial (sung syllables) in- : one unfold each
  const u = clamp(unf.reduce((a, t0) => a + spring(t - t0, 4, .5), 0) / 5, 0, 1.08);
  const cx = 960, charBase = 1000, netBase = 906, gap = 285;
  const morphBeat = Math.ceil(beatAt(tC) * 4) / 4;
  const flips = [0, 1, 2, 3, 4].map(i => beat(morphBeat + i * .25));   // choosing → what: creature puffs into character
  const pointT = tW, agreeT = tN;
  // type
  const topOut = vanish(t, tC - .09, .1);
  o12Row([['ARTIFICIAL', tA, { col: PAL.ink, size: 118 }]], 960, 215, 118, { alpha: topOut, from: 1.3 });
  slam('INTELLIGENCE', 960, 412, 162, tI - .02, { col: PAL.coral, edge: true, alpha: topOut, from: .78, rot: -.015 });
  // during "in-tel-li-gence": the five friendly network-creatures tint into their coat colours one by one.
  const fb = Math.ceil(beatAt(tI + .12) * 4) / 4;
  const FLOOD = [0, .25, .5, .75, 1].map(b => beat(fb + b)), COATS = [PAL.lilac, PAL.coral, PAL.lemon, PAL.teal, PAL.sage];
  const intelK = Math.sin(clamp((t - tI) / .42) * Math.PI) * vanish(t, tI + .68, .28);
  const focusA = E.outC(prog(t, tI - .05, tI + .12)) * vanish(t, tI + .78, .3);
  if (focusA > 0) {
    const gx = cx, gy = netBase - 178, pulse = .55 + .45 * intelK;
    X.save();
    X.globalCompositeOperation = 'multiply';
    X.globalAlpha *= .42 * focusA;
    const g = X.createRadialGradient(gx, gy, 40, gx, gy, 520 + intelK * 80);
    g.addColorStop(0, `rgba(255,218,82,${0.30 * pulse})`);
    g.addColorStop(.52, `rgba(255,218,82,${0.12 * pulse})`);
    g.addColorStop(1, 'rgba(255,218,82,0)');
    X.fillStyle = g;
    X.fillRect(gx - 660, gy - 560, 1320, 1120);
    X.restore();
  }
  X.save(); X.translate(cx, netBase); X.scale(1 + intelK * .045, 1 + intelK * .045); X.translate(-cx, -netBase);
  for (let i = 0; i < 5; i++) {
    const x = cx + (i - 2) * gap * u, fl = prog(t, flips[i], flips[i] + .16);
    const sxx = Math.abs(Math.cos(fl * Math.PI));
    const bob = Math.sin(beatAt(t) * Math.PI * 2 + i) * 7 * (t > tA + .6 ? 1 : 0);
    aiMorphPuff(x, netBase - 162 + bob, .9, t, flips[i] + .08, 1320 + i * 17);
    if (fl < .5) {
      const fk = E.outC(prog(t, FLOOD[i] - .02, FLOOD[i] + .12)), jump = kick(t - FLOOD[i], 10) * 22 * (t >= FLOOD[i] ? 1 : 0);
      const bow = 0, dsx = (i % 2 ? -1 : 1) * Math.max(.04, u < 1 ? Math.abs(Math.cos((1 - u) * Math.PI / 2)) : 1) * sxx;
      aiCreature(x, netBase + bob - jump + bow * 16, 1.03, {
        sx: dsx * (1 + bow * .08), sy: 1 - bow * .08, seed: 920 + i * 31, shadow: 1,
        build: unf[i], col: COATS[i], colorK: .22 + fk * .78
      });
    } else {
      // K-pop choreography, one pose per sung word / band hit:
      // choosing → think · what → point every which way · comes → swap sides · next → all point at NEXT ·
      // beat 15 → cheer jump · beat 16 → jog off to the next scene
      const c = CAST[i], wild = [1, 0, 1, 0, 1][i], tCo = W1[4];
      const b15 = beat(15) + i * .025, b16 = beat(16) + i * .03;
      const seq = [[0, [paImg('pa_' + c.k + '_think', c.k === 'hyp' ? 'hyp_stand' : c.k + '_leanin'), i % 2 === 1]],
        [pointT, [c.k + '_point', !!wild]], [tCo, [c.k + '_point', !wild]], [agreeT, [c.k + '_point', i === 4 ? false : x > 960]], ...(i === 4 ? [[agreeT + BEAT * .75, [c.k + '_point', true]]] : []),
        [b15, [c.k + '_cheer', x > 960]], [b16, [c.k + '_jog', false]]];
      const [pose, flip] = paPick(t, seq), sq = paSq(paSince(t, seq), .12);
      const hk = PA_AI_H[pose] ?? 1;
      const run = t >= b16 ? E.inQ(prog(t, b16, b16 + .42)) * 1500 : 0;
      const after = t >= b15 && t < b16 ? kick(t - b15, 7) * 60 : 0;
      const hop = kick(t - agreeT, 7) * 26 * (t >= agreeT ? 1 : 0) + kick(t - pointT, 8) * 14 + kick(t - tCo, 9) * 12 * (t >= tCo ? 1 : 0) + after;
      const popSq = 1 + kick(t - (flips[i] + .08), 12) * .18;
      spr(pose, x + run, charBase + bob - hop, c.h * hk, { flip, sx: sxx * sq.sx * popSq, sy: sq.sy / popSq, shadow: 1, seed: i * 3 });
    }
  }
  X.restore();
  const lw = LINES[1].words.map(w => w[1]);
  if (t > tC - .09) o12Row([['CHOOSING', lw[2], { col: PAL.teal, edge: true }], ['what', lw[3], { size: 100, font: 'FBo' }], ['comes', lw[4], { size: 100, font: 'FBo' }]], 960, 200, 140);
  slam('NEXT.', 960, 455, 250, tN - .02, { col: PAL.red, edge: true, from: 1.6 });
  if (t > tN) { const k = E.outC(prog(t, tN, tN + .22)); thread([[-50, 520], [600 * k, 470]], { w: 10 }); thread([[1970, 520], [1970 - 600 * k, 470]], { w: 10 }); }
  X.restore();
});

// ── lands · "New" → "follow"  "New evidence lands, and we change our view," ─────────────────
const ROOM_PEEKS = [['ck_peek', 560, -.06], ['chal_peek', 760, .04], ['hyp_peek', 960, 0], ['tc_peek', 1160, -.03], ['st_peek', 1365, .05]];
const PA_GASP_H = { ck: 270, chal: 300, hyp: 270, tc: 300, st: 250 };
const ECG_W = 720, ECG_H = 420;
let ECG_CANVAS = null;
function ecgTraceCtx(g, x, y, w, amp, seed) {
  g.save(); g.strokeStyle = PAL.red; g.lineWidth = 7; g.lineJoin = g.lineCap = 'round'; g.globalAlpha *= .96;
  g.beginPath();
  for (let i = 0; i <= 190; i++) {
    const px = x + w * i / 190, p = ((i / 190 * 5.7 + hash(seed) * .15) % 1);
    const spike = Math.exp(-Math.pow((p - .50) / .018, 2)) * -1.25 + Math.exp(-Math.pow((p - .54) / .012, 2)) * 2.35 + Math.exp(-Math.pow((p - .59) / .018, 2)) * -.8;
    const wave = Math.exp(-Math.pow((p - .22) / .06, 2)) * .22 + Math.exp(-Math.pow((p - .82) / .10, 2)) * .38;
    const py = y + Math.sin(i * .31 + seed) * amp * .035 - (spike + wave) * amp;
    if (i) g.lineTo(px, py); else g.moveTo(px, py);
  }
  g.stroke(); g.restore();
}
function ecgCanvas() {
  if (ECG_CANVAS) return ECG_CANVAS;
  const c = document.createElement('canvas'), g = c.getContext('2d');
  c.width = ECG_W; c.height = ECG_H;
  g.fillStyle = '#fffaf0'; g.fillRect(0, 0, ECG_W, ECG_H);
  g.save(); g.beginPath(); g.rect(18, 18, ECG_W - 36, ECG_H - 36); g.clip();
  g.globalAlpha = .34; g.strokeStyle = '#ef9a9b'; g.lineWidth = 1.5; g.beginPath();
  for (let x = 24; x <= ECG_W - 24; x += 14) { g.moveTo(x, 24); g.lineTo(x, ECG_H - 24); }
  for (let y = 24; y <= ECG_H - 24; y += 14) { g.moveTo(24, y); g.lineTo(ECG_W - 24, y); }
  g.stroke();
  g.globalAlpha = .42; g.strokeStyle = '#d85f66'; g.lineWidth = 2.6; g.beginPath();
  for (let x = 24; x <= ECG_W - 24; x += 70) { g.moveTo(x, 24); g.lineTo(x, ECG_H - 24); }
  for (let y = 24; y <= ECG_H - 24; y += 70) { g.moveTo(24, y); g.lineTo(ECG_W - 24, y); }
  g.stroke(); g.restore();
  g.fillStyle = PAL.ink; g.font = '48px SH'; g.textBaseline = 'top'; g.fillText('ECG 12-lead', 36, 28);
  g.fillStyle = PAL.inkSoft; g.font = '27px SH'; g.fillText('ID: SEQ-DX   25 mm/s   NEW EVIDENCE', 330, 44);
  [128, 208, 288, 360].forEach((yy, i) => {
    g.fillStyle = PAL.inkSoft; g.font = '30px SH'; g.fillText(['I', 'II', 'V1', 'V5'][i], 38, yy - 18);   // ECG lead labels
    ecgTraceCtx(g, 86, yy, 590, 30 + i * 3, 1230 + i);
  });
  g.save(); g.globalAlpha = .18; g.strokeStyle = '#8b5d42'; g.lineWidth = 7; g.beginPath(); g.ellipse(582, 82, 58, 38, .35, 0, 7); g.stroke(); g.restore();
  g.strokeStyle = '#d2b99a'; g.lineWidth = 3; g.beginPath(); g.moveTo(36, ECG_H - 31); g.lineTo(ECG_W - 38, ECG_H - 28); g.stroke();
  ECG_CANVAS = c;
  return c;
}
function ecgSheet(t) {
  const w = ECG_W, h = ECG_H, x0 = -w / 2, y0 = -h / 2, c = ecgCanvas();
  X.drawImage(c, x0, y0, w, h);
  inkShape(rectPts(x0, y0, w, h, 10, 4), null, 4, 1.1, 1200);
}
function ecgQuad(cx, cy, w, h, topK, rot) {
  const top = w * topK, pts = [[-top / 2, -h / 2], [top / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]];
  const cs = Math.cos(rot), sn = Math.sin(rot);
  return pts.map(([x, y]) => [cx + x * cs - y * sn, cy + x * sn + y * cs]);
}
function ecgQuadPath(q) {
  X.beginPath(); X.moveTo(q[0][0], q[0][1]); X.lineTo(q[1][0], q[1][1]); X.lineTo(q[2][0], q[2][1]); X.lineTo(q[3][0], q[3][1]); X.closePath();
}
function ecgContactShadow(q, a) {
  const cx = (q[0][0] + q[1][0] + q[2][0] + q[3][0]) / 4, cy = (q[0][1] + q[1][1] + q[2][1] + q[3][1]) / 4 + 9;
  const bw = Math.hypot(q[2][0] - q[3][0], q[2][1] - q[3][1]), ang = Math.atan2(q[2][1] - q[3][1], q[2][0] - q[3][0]);
  X.save(); X.translate(cx, cy); X.rotate(ang); X.globalAlpha *= a;
  [[.62, .26], [.48, .16], [.34, .10]].forEach(([s, al], i) => shadowBlob(0, i * 2, bw * s, 28 - i * 6, al));
  X.restore();
}
function drawEcgQuad(q, alpha = 1) {
  const c = ecgCanvas(), rows = 96, rowH = ECG_H / rows;
  ecgContactShadow(q, .75 * alpha);
  X.save(); X.globalAlpha *= alpha; ecgQuadPath(q); X.clip();
  for (let i = 0; i < rows; i++) {
    const sy = i * rowH, f0 = i / rows, f1 = (i + 1.15) / rows;
    const l0 = [lerp(q[0][0], q[3][0], f0), lerp(q[0][1], q[3][1], f0)];
    const r0 = [lerp(q[1][0], q[2][0], f0), lerp(q[1][1], q[2][1], f0)];
    const l1 = [lerp(q[0][0], q[3][0], f1), lerp(q[0][1], q[3][1], f1)];
    X.save();
    X.transform((r0[0] - l0[0]) / ECG_W, (r0[1] - l0[1]) / ECG_W, (l1[0] - l0[0]) / rowH, (l1[1] - l0[1]) / rowH, l0[0], l0[1]);
    X.drawImage(c, 0, sy, ECG_W, rowH + 1, 0, 0, ECG_W, rowH + 1);
    X.restore();
  }
  X.restore();
  X.save(); X.globalAlpha *= alpha; inkLine([q[0], q[1], q[2], q[3]], 3.4, PAL.ink, .8, 1200, true); X.restore();
}
function fallingEcgSheet(t, land, fallT0) {
  if (t <= fallT0) return;
  const k = clamp((t - fallT0) / (land - fallT0)), settled = E.outC(prog(t, land, land + .26)), hit = t >= land ? kick(t - land, 12) : 0;
  if (t < land - .16) {
    const x = 960 + Math.sin(k * 7) * 48 * (1 - k), y = lerp(244, 560, E.inQ(k));
    const rot = lerp(-.58, -.12, k) + Math.sin(k * 18) * .13 * (1 - k), sx = lerp(.52, .62, k), sy = lerp(.78, .62, k);
    X.save(); X.translate(x, y); X.rotate(rot); X.scale(sx, sy); ecgSheet(t); X.restore();
    return;
  }
  const flat = E.outC(prog(t, land - .16, land)), flutter = Math.sin(k * 18) * (1 - flat) * 22;
  const cx = (t < land ? 960 + Math.sin(k * 8) * 28 * (1 - k) : 960 + lerp(-18, 0, settled)) + Math.sin((t - land) * 22) * hit * 1.5;
  const cy = t < land ? lerp(512, 586, flat) + flutter * .38 : 586 + lerp(4, 0, settled) + Math.sin((t - land) * 20) * hit * 1.2;
  const q = ecgQuad(cx, cy, lerp(480, 372, flat), lerp(242, 104, flat), lerp(.98, .80, flat), t < land ? lerp(-.08, 0, flat) : 0);
  drawEcgQuad(q, E.outC(prog(t, land - .15, land - .04)));
}
const W2 = LINES[2].words.map(w => w[1]);                 // New evidence lands, and we change our view,
shot('lands', W2[0], (t) => {
  const [tNew, tEv, tL, tAnd, tWe, tCh, tOur, tV] = W2;
  // "change our view": the room rolls all the way upside-down, settling exactly on VIEW,
  const rk = E.io(prog(t, tCh, tV)), roll = rk * Math.PI + kick(t - tV, 7) * .03, zz = 1 + rk * 1.0 + kick(t - tV, 8) * .05;
  const ent = E.outC(prog(t, tNew, tNew + .32)), ent2 = E.outC(prog(t + 1 / 48, tNew, tNew + .32));
  const readPush = 1 + .07 * E.ioS(prog(t, tL - .23, tL + .77)) * vanish(t, tCh - .08, .2);
  const camY = lerp(560, 615, rk) - 420 * (1 - ent), camZ = zz * readPush * (1 + .035 * E.ioS(prog(t, tNew, tCh))) * (1 + .08 * (1 - ent));
  bgCam('room', [960, camY, camZ, roll], { par: .92, over: 1.75 });
  X.save(); cam(960, camY, camZ, roll);
  if (ent2 - ent > .002) POST.smear = [0, (ent2 - ent) * 420 * 2.4];
  const land = tL, fallT0 = tL - .41;
  const hop = (i) => kick(t - land - i * .03, 6) * 40 * (t > land ? 1 : 0);
  // the five nod on the beat, crane up as the card drops out of the pipe, gasp when it lands,
  // settle on "and we", then gasp again (hair on end) as the whole room turns over
  const nb = Math.floor(beatAt(t)), nodK = kick(t - beat(nb), 9);
  const crane = E.outC(prog(t, fallT0 - .1, land)) * (t < land ? 1 : 0);
  ROOM_PEEKS.forEach(([n, x, r], i) => {
    const k = n.split('_')[0], gasp = (t >= land + i * .03 && t < tAnd) || t >= tCh + i * .04;
    const name = gasp ? paImg('pa_' + k + '_gasp', n) : n, sw = gasp ? (t < tAnd ? land + i * .03 : tCh + i * .04) : (t >= tAnd ? tAnd : 0);
    const sq = paSq(t - sw, .12), hh = gasp ? PA_GASP_H[k] : 300;
    const atTable = E.outC(prog(t, land - .1, land + .18)) * vanish(t, tCh - .08, .18);
    const nod = gasp ? 0 : nodK * 9, tilt = (gasp ? Math.sin(t * 14 + i) * .025 : ((nb + i) % 2 ? 1 : -1) * nodK * .05 + (x < 960 ? 1 : -1) * crane * .07)
      + (x < 940 ? .11 : x > 980 ? -.11 : 0) * atTable;
    const px = x + (x - 960) * .25, py = 600 - hop(i) + nod - crane * 26 + Math.sin(t * 2 + i) * 3;
    spr(name, px, py, hh, { rot: r + tilt, seed: i, sx: sq.sx, sy: sq.sy });
  });
  spr('table', 960, 1040, 520, { boil: true });
  fallingEcgSheet(t, land, fallT0);
  if (t > land) for (let j = 0; j < 7; j++) { const a = j / 7 * Math.PI * 2, d = E.outC(prog(t, land, land + .5)) * 72; X.save(); X.globalAlpha *= vanish(t, land + .25, .3) * .25; X.fillStyle = '#e9d9b5'; X.beginPath(); X.arc(960 + Math.cos(a) * d * 1.25, 604 + Math.sin(a) * d * .2 - d * .1, 10 - d * .065, 0, 7); X.fill(); X.restore(); }
  X.restore();
  // type in screen space
  o12Row([['NEW', tNew], ['EVIDENCE', tEv], ['LANDS,', tL, { col: PAL.red, edge: true }]], 960, 215, 150, { alpha: vanish(t, tAnd - .1, .1) });
  o12Row([['and', tAnd], ['we', tWe]], 960, 178, 104, { font: 'FBo', col: PAL.ink, tape: '#fbf3df' });
  const cw = measure('CHANGE', 215, 'FB'), pk = E.outC(prog(t, tCh - .04, tCh + .05));
  if (pk > 0) { X.save(); X.translate(960 - cw / 2 - 45, 415 - 215 * .36); X.rotate(-.02); X.scale(pk, 1 + kick(t - tCh, 12) * .08); inkShape(rectPts(0, -104, cw + 90, 208, 8, 4), PAL.ink, 4, 1.6, 812); X.restore(); }
  slam('CHANGE', 960, 415, 215, tCh - .02, { col: PAL.lemon, edge: true, from: 1.3 });
  o12Row([['OUR', tOur, { size: 160 }], ['VIEW,', tV, { col: PAL.red, edge: true, size: 230, rot: -.05 }]], 960, 660, 160, { tape: '#fbf3df', from: 1.3 });
  const v = (E.io(prog(t + .02, tCh, tV)) - rk) * 1100;
  if (v > 2) POST.smear = [v, -v * .4];
});

// ── follow · beat 22.5 → "clue."  top-down table: "The next move follows from the latest clue." ──
// Close top-down. The thread runs card → card; each stop is a sung word; camera rides the tip.
const RUN = spline([[420, 640], [760, 760], [1120, 600], [1420, 420], [1820, 470], [2160, 700], [2560, 760], [2900, 560], [3240, 420], [3560, 520]], 18);
const STOP_K = [0, .12, .25, .40, .55, .66, .80, 1];
const STOPS = LINES[3].words.map((w, i) => [w[1], STOP_K[i]]);
const T_CLUE = STOPS[STOPS.length - 1][0];
const runK = (t) => {                                        // piecewise: thread jumps between stops on each word
  let k = 0;
  for (let i = 1; i < STOPS.length; i++) {
    const [ta, ka] = STOPS[i - 1], [tb, kb] = STOPS[i];
    if (t < ta) break;
    const d = Math.min(.22, (tb - ta) * .85);
    // held notes ("moooove", "follooows"): the thread creeps on toward the next card while they're sung
    const creep = tb - ta > .9 ? .3 * E.io(prog(t, ta + .3, tb - .3)) : 0;
    k = lerp(ka, kb, Math.max(creep, E.outC(prog(t, tb - d, tb))));
  }
  return Math.max(.004, k);
};
const FOLLOW_T0 = beat(22.5), DEAL = [beat(23), beat(23.25), beat(23.5)];
shot('follow', FOLLOW_T0, (t) => {
  const k = runK(t), tip = pAt(RUN, k);
  const intro = E.outC(prog(t, FOLLOW_T0, FOLLOW_T0 + .72));
  const camx = clamp(tip[0] + 380, 860, 3400), camy = lerp(540, tip[1], .35) + 230;
  const zoomIn = E.inExpo(prog(t, T_CLUE - .19, T_CLUE));
  const punch = STOPS.reduce((a, [ts]) => a + (t >= ts ? kick(t - ts, 9) : 0), 0) + DEAL.reduce((a, ts) => a + (t >= ts ? kick(t - ts, 12) * .5 : 0), 0);
  const z = lerp(1.6, 1.2, intro) * (1 + zoomIn * 3) * (1 + punch * .015), roll = lerp(.25, 0, intro) + punch * .004;
  bgCam(() => {
    X.save(); X.translate(-600, -500); X.scale(2.6, 2.6); plate('tabletop', { z: 1.0 }); X.restore();
    X.save(); X.translate(1700, -500); X.scale(2.6, 2.6); X.rotate(.01); plate('tabletop', { z: 1.0 }); X.restore();
  }, [camx, camy, z, roll], { par: 1, over: 1.45 });
  X.save(); X.translate(wob(t, 61, punch * 1.5), wob(t, 62, punch * 1.5));
  cam(camx, camy, z, roll);
  const words = LINES[3].words;
  // a card sits at every stop; the first three are dealt onto the table on the 8ths after the cut
  const glyphs = ['heart', 'xray', 'flask', 'dna', 'slide', 'mri', 'ct', '?'];
  STOPS.forEach(([ts, ks], i) => {
    const p = pAt(RUN, Math.max(.003, ks)), last = i === STOPS.length - 1;
    const o = { w: last ? 230 : 170, h: last ? 280 : 210, glyph: glyphs[i], rot: (hash(i) - .5) * .3, seed: 20 + i, s: t >= ts ? 1 + kick(t - ts, 12) * .06 : 1 };
    if (i < 3) {
      if (t < DEAL[i] - .14) return;
      const f = flyCard(t, DEAL[i], p[0], p[1] + 70, { fromS: 2.4, fromX: p[0] + 260, fromY: p[1] - 300, fromR: .9 - i * .5, rot: o.rot, dur: .14 });
      X.save(); X.translate(f.x, f.y); X.rotate(f.rot); X.scale(f.s * f.sx, f.s * f.sy); X.globalAlpha *= f.alpha; card(0, 0, { ...o, rot: 0 }); X.restore();
    } else card(p[0], p[1] + 70, o);
    if (t >= ts) tack(p[0], p[1], 1.15, { pressed: E.outBack(prog(t, ts, ts + .08)) });
  });
  thread(RUN, { k, w: 14, tip: true });
  // a hand (Hypothesis's) makes each move: pinches the thread's tip, drags it card to card, presses each pin home,
  // then lets go as the camera dives into the last clue
  {
    const enter = E.outC(prog(t, FOLLOW_T0 + .08, FOLLOW_T0 + .45)), leave = E.inQ(prog(t, T_CLUE - .32, T_CLUE - .06));
    const press = STOPS.reduce((a, [ts]) => a + (t >= ts ? kick(t - ts, 10) : 0), 0), off = (1 - enter) + leave;
    const ang = .42 + Math.sin(t * 2.3) * .05 - kick(t - STOPS[3][0], 4) * .12 * (t >= STOPS[3][0] ? 1 : 0);
    spr('pa_hand_pinch', tip[0] + Math.sin(ang) * 1000 * off, tip[1] - Math.cos(ang) * 1000 * off + 6 + press * 6, 470 * (1 - press * .05), { rot: ang, seed: 33, ay: .985 });
  }
  X.restore();
  // sentence accumulates in screen space; each word tears in on its own strip (calm band at the bottom)
  const wd = words.map(w => w[1]), out = 1 - zoomIn;
  X.save(); X.globalAlpha *= out;
  o12Row([['the', wd[0], { size: 100, font: 'FBo' }], ['NEXT', wd[1]], ['MOVE', wd[2], { col: PAL.red, edge: true }]], 70, 790, 170, { align: 'left', maxW: 1120, tape: '#fbf3df' });
  o12Row([['FOLLOWS', wd[3], { col: PAL.teal, edge: true }], ['from', wd[4], { size: 100, font: 'FBo', lead: 0 }], ['the', wd[5], { size: 100, font: 'FBo' }], ['LATEST', wd[6], { col: PAL.coral, edge: true }]], 70, 990, 170, { align: 'left', maxW: 1440, tape: '#fbf3df' });
  X.restore();
  if (zoomIn > 0) POST.fade = zoomIn * .9;
});

// ── title · "clue." (21.34 = beat 31.5) → 24.17  TITLE (drop) ─────────────────────────────────────
function paStars(x, y, t0, t) {                      // cartoon "bonk" stars circling a head
  const a = vanish(t, t0 + .5, .2); if (a <= 0) return;
  X.save(); X.globalAlpha *= a;
  for (let i = 0; i < 3; i++) {
    const an = (t - t0) * 10 + i * 2.1, px = x + Math.cos(an) * 95, py = y + Math.sin(an) * 28, s = .8 + pop(t, t0 + i * .03, 5, .4) * .4;
    inkShape(Array.from({ length: 10 }, (_, j) => { const r = (j % 2 ? 9 : 22) * s, b = j / 10 * Math.PI * 2 - Math.PI / 2 + an * .3; return [px + Math.cos(b) * r, py + Math.sin(b) * r]; }), PAL.lemon, 3, .6, 950 + i);
  }
  X.restore();
}
shot('title', T_CLUE, (t) => {
  X.save(); camIn(t, T_CLUE, { dx: 0, dy: 220, d: .66, z0: .045, push: .035, t1: 24.2, bg: () => paperBG('#ffe7a8', .75), par: .76, over: 1.24, smear: false });
  // cards rain past in depth
  const RAIN = ['?', 'flask', 'heart', 'dna', 'xray', 'slide', 'tube', 'mri', 'drop', 'ct', 'bulb', 'tick', 'steth', 'pill'];
  for (let i = 0; i < 26; i++) {
    const sp = .6 + hash(i) * .8, z = .4 + hash(i + 50) * 1.1;
    const y = ((t - T_CLUE) * 520 * sp * z + hash(i + 9) * 1500) % 1500 - 200;
    card(hash(i + 3) * 1920, y, { w: 120 * z, h: 90 * z, rot: (t * (hash(i + 7) - .5) * 3) + i, flip: (t * .8 + hash(i)) % 1, glyph: RAIN[i % RAIN.length], lines: false, alpha: .55 + z * .3, seed: i, shadow: 0 });
  }
  // CLUE lands on the sung "clue." at T_CLUE (beat 31.5); ONE on the next 16th, MORE on
  // the band's boom on beat 32 (measured hit 21.63 = the title drop); later band hits pulse it.
  const tO = beat(31.75), tM = beat(32), tDrop = beat(32) + .04, HITS = [22.86, 22.96, 23.28, 23.60];
  const sh = kick(t - T_CLUE, 9) * 14 + kick(t - tO, 9) * 8 + kick(t - tM, 9) * 8 + kick(t - tDrop, 8) * 18 + HITS.reduce((a, h) => a + kick(t - h, 10) * 7, 0);
  // the whole title throbs with the beat (and the band hits) once it has landed
  const throb = [32, 33, 34, 35].reduce((a, n) => a + (t >= beat(n) ? kick(t - beat(n), 9) : 0), 0) + HITS.reduce((a, h) => a + (t >= h ? kick(t - h, 11) * .5 : 0), 0);
  const push = (1 + .05 * E.ioS(prog(t, tDrop, 24.17))) * (1 + throb * .045);
  X.save(); X.translate(wob(t, 3, sh), wob(t, 4, sh)); X.translate(960, 640); X.scale(push, push); X.translate(-960, -640);
  o12Row([['ONE', tO], ['MORE', tM, { col: PAL.coral, edge: true }]], 960, 520, 290, { from: 1.3, lead: 0 });
  const dk = (t >= tDrop ? kick(t - tDrop, 9) : 0) + HITS.reduce((a, h) => a + kick(t - h, 11) * .45, 0);
  X.save(); X.translate(1060, 830 - 120); X.scale(1 + dk * .12, 1 - dk * .08); X.translate(-1060, -830 + 120);
  slam('CLUE', 1060, 830, 380, T_CLUE + .035, { col: PAL.red, edge: true, from: 1.45, hero: true, rot: -.04 });
  X.restore();
  const bk = E.io(prog(t, tDrop + .05, tDrop + .75));
  thread(spline([[-40, 905], [380, 935], [640, 890], [600, 835], [530, 895], [680, 930], [900, 905]]), { k: bk, w: 12 });
  X.restore();
  hand('a song about sequential diagnosis', 960, 1028, 80, 22.4, 23.0, { font: 'SHm', col: PAL.inkSoft, pencil: false });
  X.restore();
});
