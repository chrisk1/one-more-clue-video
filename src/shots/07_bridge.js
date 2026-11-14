// 07_bridge.js — BRIDGE (90.38 – 101.557): "Still trials to run, still work to get right, / Could that knowledge reach
// every bedside? / If this is the starting point, think what we'll see, / Let's make this the least capable it'll ever be."
// Dusk → night → dawn: an honest caveat, then a sunrise of optimism.
(() => {
  'use strict';
  const T1 = 90.38, T2 = 93.47, T3 = 95.44, T4 = 98.12;
  const w26 = i => wt(26, i), w27 = i => wt(27, i), w28 = i => wt(28, i), w29 = i => wt(29, i);

  // plate drawn as a world-space rectangle (so cam() can move over it)
  const worldPlate = (name, w, h, a = 1) => { const im = IMG[name]; if (!im) return; X.save(); X.globalAlpha *= a; X.drawImage(im, 0, 0, w, h); X.restore(); };
  // Light = soft rubbed pencil: three wobble-edged pale discs, denser toward the centre (no gradients, no 'lighter').
  const glow = (x, y, r, col, a, seed) => {
    if (a <= 0 || r <= 0) return;
    const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(col);
    const hex = m ? '#' + [m[1], m[2], m[3]].map(v => (+v).toString(16).padStart(2, '0')).join('') : col, ca = m && m[4] != null ? +m[4] : 1;
    const sd = seed ?? Math.round(x * 3.1 + y * 1.7);
    X.save(); X.globalAlpha *= Math.min(1, a * ca * 1.5);
    (r > 150 ? [[1, .06], [.8, .09], [.62, .12], [.46, .16], [.3, .22]] : [[1, .09], [.64, .2], [.36, .38]]).forEach(([k, al], i) => {
      const pts = wobbled(ellPts(x, y, r * k, r * k * .92, r > 60 ? 22 : 12), r * k * .1, sd + i * 13);
      p4Fill(() => curve(pts, true), p4Shade(hex, Math.min(.6, i * .15)), { alpha: al, wash: .6, grain: .8, tex: 'tex_soft' });
    });
    X.restore();
  };

  // ── bridge_track · 90.38 → 93.47  "Still trials to run, still work to get right," ───────────────
  // Track at dusk. Side-scrolling jog; ink hurdles (labelled "trial") stream in; each runner hops in turn.
  const RUNV = 600;
  const BASE_F = 1045, BASE_B = 885;
  const FRONT = [['chal_jog', 330, 7], ['st_jog', 790, 3], ['hyp_jog', 1270, 1]];
  const BACK = [['ck_jog', 560, 5], ['tc_jog', 1050, 9]];
  const HF = [866, 1766, 2666, 3566], HB = [932, 1832, 2732];
  // Trial paperwork pinned/taped to each hurdle: label + tiny hand-drawn chart (drawn in a ±60 × ±34 box).
  const P = (a) => a;
  const ICON = {
    'EVIDENCE': () => {
      inkLine([[-58, -36], [-58, 30], [60, 30]], 3.5, PAL.ink, .5, 1501);
      [[22, PAL.teal], [34, PAL.teal], [28, PAL.teal], [56, PAL.coral]].forEach(([h, c], i) => inkShape(rectPts(-46 + i * 26, 30 - h, 18, h, 2, 2), c, 2.6, .4, 1502 + i));
    },
    'SAFETY': () => {
      inkShape(P([[0, -36], [32, -26], [29, 6], [0, 34], [-29, 6], [-32, -26]]), PAL.sage, 3.5, .6, 1511);
      inkLine([[-13, -2], [-3, 10], [15, -14]], 7, '#2f6b45', .4, 1512);
    },
    'REGULATORY': () => {
      inkShape(P([[-14, 14], [-26, 40], [-14, 34], [-8, 44], [2, 18]]), PAL.red, 2.5, .4, 1521);
      inkShape(P([[14, 14], [26, 40], [14, 34], [8, 44], [-2, 18]]), PAL.red, 2.5, .4, 1522);
      inkShape(Array.from({ length: 24 }, (_, i) => { const a = i / 24 * Math.PI * 2, r = i % 2 ? 26 : 32; return [Math.cos(a) * r, Math.sin(a) * r - 4]; }), PAL.brass, 3, .4, 1523);
      inkShape(ellPts(0, -4, 17, 17, 14), '#f3d27a', 2.5, .4, 1524);
      inkLine([[-8, -4], [-2, 3], [9, -10]], 4.5, PAL.ink, .3, 1525);
    },
    'FAIRNESS': (tilt) => {
      inkLine([[0, -30], [0, 28]], 4, PAL.ink, .4, 1531); inkLine([[-20, 31], [20, 31]], 6, PAL.ink, .4, 1532); dot(0, -32, 5);
      X.save(); X.translate(0, -24); X.rotate(tilt);
      inkLine([[-46, 0], [46, 0]], 4.5, PAL.brassDk || PAL.ink, .4, 1533);
      [-1, 1].forEach(sd => {
        X.save(); X.translate(sd * 42, 0); X.rotate(-tilt);
        inkLine([[0, 0], [-15, 28]], 2, PAL.ink, .2, 1534 + sd); inkLine([[0, 0], [15, 28]], 2, PAL.ink, .2, 1536 + sd);
        inkShape(P([[-19, 28], [19, 28], [12, 37], [-12, 37]]), PAL.brass, 2.5, .3, 1538 + sd);
        X.restore();
      });
      X.restore();
    },
    'BIAS CHECK': () => {
      const C = []; for (let i = 0; i <= 20; i++) { const x = -54 + i * 5.4; C.push([x, 28 - 58 * Math.exp(-Math.pow(x / 21, 2))]); }
      inkShape([...C, [54, 30], [-54, 30]], PAL.lilac, 0, .3, 1541);
      inkLine(C, 3.5, PAL.ink, .4, 1542); inkLine([[-58, 30], [58, 30]], 3, PAL.ink, .3, 1543);
      for (let i = 0; i < 4; i++) inkLine([[0, 26 - i * 16], [0, 18 - i * 16]], 3, PAL.red, .2, 1544 + i);
    },
    'PROSPECTIVE TRIAL': () => {
      inkLine([[-58, -36], [-58, 30], [60, 30]], 3.5, PAL.ink, .5, 1551);
      const L = [[-50, 20], [-32, 12], [-16, 15], [0, 2]];
      inkLine(L, 4, PAL.teal, .3, 1552); L.forEach(([x, y]) => dot(x, y, 4.5));
      for (let i = 0; i < 3; i++) inkLine([[6 + i * 15, -2 - i * 8], [14 + i * 15, -6 - i * 8]], 4, PAL.red, .2, 1553 + i);
      inkShape(P([[50, -26], [36, -24], [46, -14]]), PAL.red, 2.5, .2, 1557);
    },
    'PRIVACY': () => {
      inkLine([[-15, -2], [-16, -20], [-8, -32], [8, -32], [16, -20], [15, -2]], 5, PAL.ink, .4, 1561);
      inkShape(rectPts(-26, -4, 52, 40, 6, 2), PAL.mustard, 3.5, .5, 1562);
      dot(0, 10, 5.5); inkLine([[0, 12], [0, 24]], 4, PAL.ink, .2, 1563);
    },
  };
  // sheet hangs from its top-centre (x,y); s = scale, ls = label size (local)
  function sheet(label, x, y, s, rot, seed, ls, pinned, flutter) {
    const W = 250, H = 134;
    X.save(); X.translate(x, y); X.scale(s, s); X.rotate(rot);
    X.save(); X.scale(1, 1 - Math.abs(flutter) * .12);
    X.save(); X.globalAlpha *= .2; inkShape(rectPts(-W / 2 + 9, 9, W, H, 6, 3), PAL.ink, 0, 1, seed + 50); X.restore();
    inkShape(rectPts(-W / 2, 0, W, H, 6, 3), '#fbf5e4', 3, .9, seed);
    X.save(); X.globalAlpha *= .4;
    for (let i = 0; i < 4; i++) { const yy = 62 + i * 18; p4Line([[-W / 2 + 10, yy], [0, yy + .6], [W / 2 - 10, yy]], 1.6, '#8fa9c0', .3, seed + 20 + i, false, { passes: 1 }); }
    X.restore();
    const lw = measure(label, ls, 'BR'), lk = Math.min(1, (W - 22) / lw);
    word(label, 0, 46, ls * lk, { font: 'BR', col: '#1d130c', edge: true, ax: .5, seed, bake: true });   // darker, a touch heavier
    X.save(); X.translate(0, 96); X.scale(.95, .95); ICON[label](flutter * 2.2 + Math.sin(T * 2.3 + seed) * .03); X.restore();
    X.restore();
    if (pinned) tack(0, 12, .75, { col: PAL.red });
    else [-1, 1].forEach(sd => { X.save(); X.translate(sd * (W / 2 - 22), 2); X.rotate(sd * .5 + (hash(seed + sd) - .5) * .3); X.globalAlpha *= .72; inkShape(rectPts(-24, -10, 48, 20, 2, 2), '#efe2b4', 1.5, .5, seed + 7 + sd, '#b9a678'); X.restore(); });
    X.restore();
  }
  const SH_F = ['EVIDENCE', 'SAFETY', 'FAIRNESS', 'PROSPECTIVE TRIAL'], SH_B = ['REGULATORY', 'BIAS CHECK', 'PRIVACY'];
  // runners clearing a hurdle (and the "TRIALS" accent) make its paper flap
  const flap = (t, hx, xs) => [...xs.map(x => T1 + (hx - x) / RUNV), w26(1)].reduce((a, tc) => a + kick(t - tc, 5) * Math.sin((t - tc) * 17), 0);
  function hurdle(x, base, w, h, s, seed, label, hx, xs) {
    const post = '#56688f', bar = '#efe6cf';
    inkShape(rectPts(x - w / 2 - 8 * s, base - 14 * s, 44 * s, 14 * s, 4, 2), post, 3, .6, seed);
    inkShape(rectPts(x + w / 2 - 36 * s, base - 14 * s, 44 * s, 14 * s, 4, 2), post, 3, .6, seed + 1);
    inkShape(rectPts(x - w / 2 + 2 * s, base - h, 16 * s, h - 10 * s, 3, 3), post, 3, .6, seed + 2);
    inkShape(rectPts(x + w / 2 - 18 * s, base - h, 16 * s, h - 10 * s, 3, 3), post, 3, .6, seed + 3);
    inkShape(rectPts(x - w / 2 - 12 * s, base - h - 6 * s, w + 24 * s, 30 * s, 5, 4), bar, 3.2, .7, seed + 4);
    const f = flap(T, hx, xs) * .14, pinned = seed % 20 === 0;
    sheet(label, x, base - h - 2 * s, s * 1.04, (hash(seed) - .5) * .07 + f, seed + 3000, s < 1 ? 46 : 40, pinned, f);
  }
  function hopOf(t, x, hs, H) {
    let y = 0, r = 0, sq = 1, land = -1;
    for (const hx of hs) {
      const tc = T1 + (hx - x) / RUNV, u = (t - tc + .26) / .52;
      if (u > 0 && u < 1) { y = -Math.sin(u * Math.PI) * H; r = -.2 * Math.cos(u * Math.PI); }
      const tl = tc + .26;
      if (t >= tl && t < tl + .4) { sq = 1 - kick(t - tl, 12) * .14; land = tl; }
    }
    return { y, r, sq, land };
  }
  function runner(t, name, x, base, h, hs, seed, flip = false) {
    const hp = hopOf(t, x, hs, h * .42);
    // 2-key run: stride (jog) at the low point of each step, passing position at the top
    const u = (((beatAt(t) * 2) + seed / Math.PI) % 1 + 1) % 1, passing = !hp.y && u > .25 && u < .75;
    const bob = hp.y ? 0 : -Math.sin(u * Math.PI) * h * .045;
    shadowBlob(x, base, h * .3 * (1 + hp.y / h * .6), h * .03, .22);
    spr(passing ? 'pc_' + name.replace('_jog', '_pass') : name, x, base + hp.y + bob, h * (passing ? 1.03 : 1), { seed, rot: hp.r * (flip ? -1 : 1), sx: 1 / hp.sq, sy: hp.sq, flip });
  }
  shot('bridge_track', T1, (t) => {
    const whip = E.inQ(prog(t, T2 - .15, T2));
    X.save();
    const s = RUNV * (t - T1);
    const z = 1 + .03 * E.ioS(prog(t, T1, T2)) + kick(t - w26(3), 7) * .012 + kick(t - w26(8), 7) * .012;
    const cy = 540 - whip * 160, cz = z + whip * .3;
    bgCam(() => {
      plate('track_dusk', { z: 1.1, cx: .5 + .03 - s * .00002 });
      // a few pale stars boil in the dusk sky
      for (let i = 0; i < 14; i++) {                    // pale pencil stars, twinkling gently
        const sx = hash(i * 3.1) * 1920, sy = 30 + hash(i * 7.7) * 230, tw = .5 + .5 * Math.sin(t * 3 + i), r = 4 + hash(i * 5.3) * 3;
        X.save(); X.globalAlpha *= .55 * tw;
        p4Line([[sx - r, sy], [sx + r, sy]], 2.2, '#fff3cf', .2, 1400 + i, false, { passes: 1 }); p4Line([[sx, sy - r], [sx, sy + r]], 2.2, '#fff3cf', .2, 1420 + i, false, { passes: 1 });
        X.restore();
      }
      X.save(); X.globalCompositeOperation = 'multiply';
      p4Fill(() => { X.beginPath(); X.rect(-100, -100, 2200, 1300); }, PAL.dusk, { alpha: .18, wash: .75, grain: .5, tex: 'tex_soft' });
      X.restore();
    }, [960, cy, cz, 0], { par: 1, over: 1.08 });
    X.save(); cam(960, cy, cz);
    HB.forEach((hx, i) => { const x = hx - s; if (x > -200 && x < 2200) hurdle(x, BASE_B, 218, 118, .78, 640 + i * 10, SH_B[i], hx, BACK.map(b => b[1])); });
    BACK.forEach(([n, x, sd]) => runner(t, n, x, BASE_B, 290, HB, sd));
    HF.forEach((hx, i) => { const x = hx - s; if (x > -200 && x < 2200) hurdle(x, BASE_F, 276, 150, 1, 680 + i * 10, SH_F[i], hx, FRONT.map(f => f[1])); });
    FRONT.forEach(([n, x, sd]) => runner(t, n, x, BASE_F, 380, HF, sd));

    X.restore();
    // the thread whips up out of the race and over into the night town
    const sk = E.inQ(prog(t, T2 - .3, T2));
    if (sk > 0) thread(spline([[-80, 1060], [520, 760], [1180, 430], [2060, 90]], 14), { k: sk, w: 14, tip: true });
    // type: cream cut-paper over the dusk sky
    X.save(); X.globalAlpha *= vanish(t, T2 - .26, .12);
    row([['STILL', w26(0) - .02, { size: 104 }], ['TRIALS', w26(1) - .02, { col: PAL.peach }], ['to', w26(2) - .02, { size: 72, font: 'FBo' }],
      ['RUN,', w26(3) - .02, { col: PAL.lemon }]], 90, 215, 150, { align: 'left', col: PAL.cream, edge: true, from: 1.8 });
    row([['STILL', w26(4) - .02, { size: 104 }], ['WORK', w26(5) - .02, { col: PAL.lemon }], ['to', w26(6) - .02, { size: 72, font: 'FBo' }],
      ['GET', w26(7) - .02], ['RIGHT,', w26(8) - .02, { col: PAL.peach }]], 90, 380, 150, { align: 'left', col: PAL.cream, edge: true, from: 1.8 });
    X.restore();
    X.restore();
    if (whip > .02) POST.smear = [0, whip * 520];
    POST.vign = .65;
  });

  // ── bridge_town · 93.47 → 95.44  "Could that knowledge reach every bedside?" ──────────────────
  // Night town. The red thread skips chimney to chimney; windows warm up as it passes, then all at once.
  const ROOF = spline([[-120, 330], [95, 272], [270, 402], [505, 388], [700, 560], [958, 580], [1180, 600], [1428, 668], [1660, 560], [1872, 505], [2060, 470]], 10)
    .map((p, i, a) => i && i < a.length - 1 ? [p[0], p[1] + Math.sin(i / 10 * Math.PI) * 26] : p);
  const RK0 = T2 - .05, RK1 = w27(4) + .05;
  const roofK = t => E.ioS(prog(t, RK0, RK1));
  // windows [x0,y0,x1,y1,arched]
  const WINS = [[165, 780, 225, 965, 1], [478, 640, 512, 745, 1], [448, 818, 488, 855, 0], [575, 788, 610, 878, 0], [738, 822, 778, 925, 1],
    [708, 1035, 752, 1080, 0], [615, 562, 632, 592, 0], [705, 540, 725, 560, 0], [888, 570, 902, 605, 0], [820, 622, 835, 655, 0], [878, 632, 896, 672, 0],
    [1040, 965, 1070, 1045, 0], [960, 995, 980, 1070, 0], [1158, 777, 1182, 815, 0], [1147, 852, 1165, 897, 0], [1197, 845, 1215, 890, 0],
    [1307, 998, 1330, 1040, 0], [1435, 1005, 1472, 1080, 0], [1225, 642, 1242, 670, 0], [1545, 662, 1565, 697, 0], [1722, 612, 1735, 640, 0],
    [1645, 665, 1660, 695, 0], [1332, 560, 1343, 580, 0], [1370, 600, 1382, 622, 0], [1611, 560, 1623, 583, 0], [1560, 478, 1575, 500, 0],
    [348, 320, 360, 342, 0], [412, 342, 423, 358, 0]];
  // when does the thread tip pass x?  (static, precomputed by bisection)
  const kAtX = (x) => { let a = 0, b = 1; for (let i = 0; i < 30; i++) { const m = (a + b) / 2; if (pAt(ROOF, m)[0] < x) a = m; else b = m; } return a; };
  const tAtK = (k) => { let a = RK0, b = RK1; for (let i = 0; i < 30; i++) { const m = (a + b) / 2; if (roofK(m) < k) a = m; else b = m; } return a; };
  const yOnRoof = (x) => pAt(ROOF, kAtX(x))[1];
  const WIN_T = WINS.map((w, i) => {
    const cx = (w[0] + w[2]) / 2, every = w27(4) + .02 + hash(i * 5.3) * .3;
    const near = Math.abs((w[1] + w[3]) / 2 - yOnRoof(cx)) < 300 && cx < 1500;
    return near ? Math.min(tAtK(kAtX(cx)) + .05, every) : every;
  });
  function litWindow(w, k, i) {
    const [x0, y0, x1, y1, arch] = w, ww = x1 - x0, hh = y1 - y0, cx = (x0 + x1) / 2;
    const pts = arch ? [[x0, y1], [x0, y0 + ww * .55], [x0 + ww * .15, y0 + ww * .15], [cx, y0], [x1 - ww * .15, y0 + ww * .15], [x1, y0 + ww * .55], [x1, y1]]
      : [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    // pane: warm lemon/amber pencil rubbed in, a little heavier at the bottom, pale where the lamp is
    const amp = Math.min(1.4, ww * .04);
    X.save(); X.globalAlpha *= Math.min(1, k);
    inkShape(pts, '#f6b24c', 0, amp, 1300 + i);
    const ip = wobbled(ellPts(cx, y0 + hh * .48, ww * .32, hh * .3, 12), Math.min(2, ww * .05), 1350 + i);
    p4Fill(() => curve(ip, true), '#fff0c0', { alpha: .8, wash: .7, grain: .6, tex: 'tex_soft' });
    X.restore();
    if (ww > 20) {
      X.save(); X.globalAlpha *= .75 * k;
      inkLine([[cx, y0 + (arch ? ww * .2 : 2)], [cx, y1 - 2]], Math.max(2, ww * .07), '#3a2a1c', .3, 700 + i);
      inkLine([[x0 + 2, (y0 + y1) / 2 + hh * .08], [x1 - 2, (y0 + y1) / 2 + hh * .08]], Math.max(2, ww * .07), '#3a2a1c', .3, 720 + i);
      X.restore();
    }
    glow(cx, (y0 + y1) / 2, Math.max(ww, hh) * .85 + 20, 'rgba(255,196,104,.5)', Math.min(1, k) * (.75 + .12 * Math.sin(T * 5 + i)), 1500 + i * 3);
  }
  function windowPath(w) {
    const [x0, y0, x1, y1, arch] = w, ww = x1 - x0, cx = (x0 + x1) / 2;
    const pts = arch ? [[x0, y1], [x0, y0 + ww * .55], [x0 + ww * .15, y0 + ww * .15], [cx, y0], [x1 - ww * .15, y0 + ww * .15], [x1, y0 + ww * .55], [x1, y1]]
      : [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    X.beginPath(); pts.forEach((p, j) => j ? X.lineTo(p[0], p[1]) : X.moveTo(p[0], p[1])); X.closePath();
  }
  function windowSprite(w, k, name, seed, o = {}) {
    const im = IMG[name]; if (k <= .04 || !im) return;
    const [x0, y0, x1, y1] = w, ww = x1 - x0, hh = y1 - y0, cx = (x0 + x1) / 2;
    X.save(); if (o.clip !== false) { windowPath(w); X.clip(); } X.globalAlpha *= Math.min(1, k) * (o.alpha ?? .95);
    spr(name, cx + (o.dx || 0) * ww, y1 + (o.dy || 0) * hh, hh * (o.h || 1.08), { ax: .5, ay: 1, seed, boil: false, sx: o.sx ?? 1, sy: o.sy ?? 1 });
    X.restore();
  }
  // each word is written in the .24s before it is sung, so it's complete on its sung time
  function handWords(idx, cx, y, size, col) {
    const ws = idx.map(i => LINES[27].words[i][0]), gap = size * .3;
    const wd = ws.map(w => measure(w, size, 'SH')), tot = wd.reduce((a, b) => a + b, 0) + gap * (ws.length - 1);
    let x = cx - tot / 2;
    idx.forEach((wi, j) => { const tw = w27(wi); hand(ws[j], x, y, size, tw - .24, tw - .01, { col, align: 'left' }); x += wd[j] + gap; });
  }
  function wordCenter(idx, cx, size, pick) {
    const ws = idx.map(i => LINES[27].words[i][0]), gap = size * .3;
    const wd = ws.map(w => measure(w, size, 'SH')), tot = wd.reduce((a, b) => a + b, 0) + gap * (ws.length - 1);
    let x = cx - tot / 2;
    for (let j = 0; j < idx.length; j++) {
      if (idx[j] === pick) return x + wd[j] / 2;
      x += wd[j] + gap;
    }
    return cx;
  }
  // Bedside window: a lamp clicks on and blinks awake as the thread reaches it (SIL = window-interior silhouette ink).
  const SIL = '#33241a';
  function bedsideRelay(t) {
    const w = WINS[0], [x0, y0, x1, y1] = w, ww = x1 - x0, hh = y1 - y0;
    const lampT = w27(5) - .04, lampK = E.outC(prog(t, w27(4) - .18, lampT + .18));
    if (lampK <= 0) return;
    X.save(); X.beginPath(); X.rect(x0, y0, ww, hh); X.clip(); X.globalAlpha *= lampK;
    const by = y1 - 22, bx = x0 + ww * .68, blink = kick(t - lampT, 9), awake = E.outC(prog(t, lampT - .03, lampT + .18));
    inkShape(rectPts(x0 + 7, by - 20, ww * .43, 20, 4, 2), '#f5e2b0', 2, .3, 1640, SIL);
    inkShape(rectPts(x0 + 9, by - 32, ww * .22, 13, 4, 2), '#fff4cf', 1.5, .2, 1641, SIL);
    X.save(); X.globalAlpha *= .65; inkLine([[x0 + 7, by], [x1 - 7, by]], 3, SIL, .25, 1642); X.restore();
    inkLine([[bx, by - 3], [bx, by - 35]], 3.5, SIL, .25, 1643);
    inkShape([[bx - 18, by - 35], [bx + 18, by - 35], [bx + 13, by - 58], [bx - 13, by - 58]], awake ? PAL.lemon : '#5d4634', 2.4, .35, 1644);
    inkShape(ellPts(bx, by - 61, 6, 4, 8), awake ? PAL.lemon : '#5d4634', 1.6, .25, 1645);
    if (awake > .1) {
      glow(bx, by - 46, 62, 'rgba(255,220,120,.75)', (.38 + blink * .62) * awake, 1647);
      const sm = .5 + blink * .5;
      [-1, 1].forEach(sd => dot(bx + sd * 7, by - 48, 2.2 * sm));
      inkLine([[bx - 8, by - 40], [bx, by - 37 - blink * 2], [bx + 8, by - 40]], 2, SIL, .18, 1646);
    }
    X.restore();
  }
  // the residents' windows light on the words, so they're seen waving for a good second
  WIN_T[1] = Math.min(WIN_T[1], w27(2) - .02); WIN_T[3] = Math.min(WIN_T[3], w27(3) - .02); WIN_T[4] = Math.min(WIN_T[4], w27(3) + .1);
  const WINDOW_SCENES = [[0, 'win_nurse_bedside', 1661, 1.12, 0, .02], [1, 'win_person_reading_bed', 1671, 1.05, 0, .02],
    [3, 'win_cat_sill', 1681, .95, 0, 0, undefined, .44], [4, 'win_parent_child', 1691, 1.08, 0, .03], [11, 'win_elder_armchair', 1701, 1.24, 0, .04]];
  shot('bridge_town', T2, (t) => {
    const inn = 1 - E.outQ(prog(t, T2, T2 + .16)), outW = E.inQ(prog(t, T3 - .14, T3));
    X.save();
    const cx = lerp(845, 1078, E.ioS(prog(t, T2, T3 - .22))) + outW * 150, cy = 560 + inn * 50, z = 1.15 + .04 * E.ioS(prog(t, w27(4), T3)) + inn * .15 + outW * .2;
    bgCam(() => worldPlate('town_night', 1920, 1080), [cx, cy, z, 0], { par: 1, over: 1 });
    X.save(); cam(cx, cy, z);
    // warmth rises as the town lights up
    const warm = E.outC(prog(t, w27(4), w27(5) + .3));
    if (warm > 0) { X.save(); X.globalCompositeOperation = 'soft-light'; p4Fill(() => { X.beginPath(); X.rect(0, 0, 1920, 1080); }, PAL.peach, { alpha: .35 * warm, wash: .8, grain: .45, tex: 'tex_soft' }); X.restore(); }
    WINS.forEach((w, i) => { const k = E.outC(prog(t, WIN_T[i], WIN_T[i] + .14)); if (k > 0) litWindow(w, k * (1 + kick(t - WIN_T[i], 10) * .25), i); });
    WINDOW_SCENES.forEach(([i, name, sd, h, dx, dy, clip, sx]) => {
      const k = E.outC(prog(t, WIN_T[i] + .04, WIN_T[i] + .22)) * (1 + kick(t - WIN_T[i], 10) * .12);
      windowSprite(WINS[i], k, name, sd, { h, dx, dy, clip, sx });
    });
    bedsideRelay(t);
    // tiny far windows sparkle on "every bedside?"
    for (let i = 0; i < 22; i++) {
      const tx = 980 + hash(i * 9.1) * 860, ty = 445 + hash(i * 4.3) * 95, ti = w27(4) + .1 + hash(i * 2.2) * .4;
      const k = appear(t, ti, .1); if (k <= 0) continue;
      X.save(); X.globalAlpha *= k; inkShape(rectPts(tx, ty, 5, 7, 1, 1), '#f7c25c', 0, .4, 1560 + i); X.restore(); glow(tx + 2, ty + 3, 16, 'rgba(255,200,110,.6)', k, 1580 + i * 3);
    }
    thread(ROOF, { k: roofK(t), w: 9, tip: true });
    X.restore();
    // handwritten, wondering — warm cream/lemon on the night sky
    shadowBlob(900, 174, 430, 82, .18);
    shadowBlob(880, 306, 350, 92, .22);
    const bedT = w27(5), bedCx = wordCenter([4, 5], 880, 128, 5);
    const bedBloom = appear(t, bedT - .1, .18) * vanish(t, bedT + .5, .55);
    if (bedBloom > 0) glow(bedCx, 308, 200, 'rgba(255,225,120,.3)', bedBloom, 1650);
    handWords([0, 1, 2, 3], 900, 210, 98, '#fff4ce');
    const eb = pop(t, w27(5), 3, .45);
    handWords([4, 5], 880, 350, 128, '#ffe97d');
    if (t > w27(5)) glow(bedCx, 304, 200, 'rgba(255,205,95,.22)', eb * .75, 1655);
    X.restore();
    if (inn > .2) POST.smear = [0, (inn - .2) * 380];
    if (outW > .02) POST.smear = [outW * 700, 0];
    POST.vign = .7;
  });

  // ── bridge_dawn · 95.44 → 98.29  "If this is the starting point, think what we'll see," ───────
  // Dawn breaks over the track; a chalk START line; on "think" they're off down the track into the sunrise.
  const SUN = [966, 498], LINE_Y = 930;
  // seen from behind: [ready pose, run pose, x at the line, seed, height, launch delay, pace]
  const LINEUP = [['chal_backready', 'chal_backrun', 300, 3, 340, .10, 1.15], ['st_backready', 'st_backrun', 640, 7, 320, .02, .95],
    ['hyp_backready', 'hyp_backrun', 975, 1, 330, 0, 1.3], ['ck_backready', 'ck_backrun', 1300, 5, 345, .14, 1.05], ['tc_backready', 'tc_backrun', 1620, 9, 350, .06, 1.2]];
  const lastBeat = t => beat(Math.floor(beatAt(t)));
  shot('bridge_dawn', T3, (t) => {
    const inn = 1 - E.outQ(prog(t, T3, T3 + .24));
    // whip lands crisp: only ~2 frames of smear, and first light is already on the track (no murky blur of runners)
    const dawn = .32 + .68 * E.ioS(prog(t, T3 - .1, w28(3) + .1));
    const go = w28(6), push = E.inQ(prog(t, go - .05, T4)) * .85 + E.ioS(prog(t, go - .05, T4)) * .15;
    const flare = E.inQ(prog(t, T4 - .32, T4));
    X.save();
    const z = lerp(1.0, 3.3, push) + kick(t - w28(5), 7) * .015 + inn * .25;
    const cx = lerp(960, SUN[0], push) - inn * 190, cy = lerp(540, SUN[1] + 20, push);
    bgCam(() => { worldPlate('track_dusk', 1920, 1080); worldPlate('track_dawn', 1920, 1080, dawn); }, [cx, cy, z, 0], { par: 1, over: 1 });
    X.save(); cam(cx, cy, z);
    if (dawn < 1) { X.save(); X.globalCompositeOperation = 'multiply'; p4Fill(() => { X.beginPath(); X.rect(0, 0, 1920, 1080); }, PAL.night, { alpha: .35 * (1 - dawn), wash: .75, grain: .5, tex: 'tex_soft' }); X.restore(); }
    glow(SUN[0], SUN[1], 260 + 240 * push, 'rgba(255,214,140,.9)', dawn * (.45 + .5 * push) + kick(t - w28(9), 5) * .3, 1660);
    // the route ahead: thread runs from the start line to the sun
    const rk = E.outC(prog(t, w28(5) - .1, w28(9)));
    if (rk > 0) {
      const R = spline([[960, 1120], [948, 880], [972, 720], [958, 600], [966, 520]], 12);
      [[0, .45, 16], [.45, .75, 10], [.75, 1, 5]].forEach(([a, b, w]) => {
        if (rk <= a) return;
        const seg = ptrim(R, Math.min(rk, b)).slice(Math.max(0, ptrim(R, a).length - 2));
        if (seg.length > 1) thread(seg, { w, shadow: 0 });
      });
    }
    // chalk START line painted across the track
    const lk = E.outC(prog(t, w28(4) - .12, w28(4) + .18));
    if (lk > 0) {
      const L = ptrim([[120, LINE_Y + 8], [700, LINE_Y - 2], [1240, LINE_Y + 4], [1800, LINE_Y - 4]], lk);
      inkLine(L, 22, '#fbf6e8', 2, 950);
      X.save(); X.globalAlpha *= appear(t, w28(5) - .05, .12); X.translate(960, LINE_Y + 118); X.scale(1, .55);
      word('START', 0, 0, 170, { ax: .5, col: '#fbf6e8', font: 'BR', seed: 3 }); X.restore();
    }
    // runners: crouched at the line, backs to us; on "think" they recede to the vanishing point (far ones drawn first)
    LINEUP.map(([ready, run, x0, sd, h, dl, pace], i) => {
      const ti = go + dl, u = Math.max(0, t - ti);
      const f = 1 / (1 + u * pace * (1.4 + u * 2.6));
      return { ready, run, x0, sd, h, i, ti, u, f };
    }).sort((a, b) => a.f - b.f).forEach(({ ready, run, x0, sd, h, i, ti, u, f }) => {
      const base = SUN[1] + 26 + (LINE_Y - 8 - SUN[1] - 26) * f, x = SUN[0] + (x0 - SUN[0]) * f;
      const arr = pop(t, T3 - .3 + i * .07, 3.2, .45);
      if (t < ti) {
        const bk = kick(t - lastBeat(t), 9) * arr, set = kick(t - w28(5), 8);
        shadowBlob(x, LINE_Y - 8, h * .33, 13, .22 * arr);
        spr(ready, x, LINE_Y - 8 + (1 - arr) * 60 + bk * 8, h * (.7 + .3 * arr), { seed: sd, alpha: clamp(arr * 3), sy: 1 - bk * .05 - set * .04, sx: 1 + bk * .03 });
      } else {
        const ph = (t - ti) * 9 + i * .5, step = Math.floor(ph) % 2;
        const bob = -Math.abs(Math.sin(Math.PI * ph)) * 26 * f;
        shadowBlob(x, base, h * .28 * f, 12 * f, .22);
        spr(run, x, base + bob, h * 1.02 * f, { seed: sd, flip: step === 1, rot: (step ? -1 : 1) * .03 });
      }
    });
    X.restore();
    // type
    const k1 = vanish(t, go - .22, .14), lt = E.ioS(prog(t, 95.5, 95.85));
    [[PAL.cream, lt < 1 ? 1 : 0], [PAL.ink, lt]].forEach(([c, a]) => {
      if (a <= 0) return;
      X.save(); X.globalAlpha *= k1 * a;
      row([['If', w28(0) - .02], ['this', w28(1) - .02], ['is', w28(2) - .02], ['the', w28(3) - .02]], 960, 175, 84, { font: 'FBo', col: c, from: 1.5 });
      row([['STARTING', w28(4) - .02, { col: c }]], 140, 330, 150, { from: 1.25, align: 'left' });
      row([['POINT,', w28(5) - .02, { col: PAL.red, edge: true }]], 1830, 330, 166, { from: 1.4, align: 'right' });
      X.restore();
    });
    X.save(); X.globalAlpha *= 1 - flare * .9;
    row([['think', w28(6) - .02], ['what', w28(7) - .02], ["we'll", w28(8) - .02]], 960, 165, 92, { font: 'FBo', col: PAL.ink, from: 1.15, gap: .42 });
    const seeK = kick(t - w28(9), 3);
    row([['SEE,', w28(9) - .02, { col: PAL.lemon }]], 960, 470, 250 * (1 + seeK * .06), { edge: true, from: 1.6 });
    X.restore();
    X.restore();
    const sm = Math.pow(1 - prog(t, T3, T3 + .07), 2);
    if (sm > .02) POST.smear = [sm * 480, 0];
    POST.vign = lerp(.7, .35, dawn);
    POST.fade = flare * .92; POST.fadeCol = '#fff2d6';
  });

  // ── bridge_door · 98.12 → 101.557  "Let's make this the least capable it'll ever be." ──────────
  // Door-frame growth chart. D·X·O letter kids at the lowest mark ("least", tiny). Camera tilts up the chart into the dawn sky: "EVER" enormous.
  const DH_ = 3413;                          // door plate drawn 1920 × 3413 (world)
  const POSTX = [1282, 1398], SPIRE = y => [lerp(942, 900, y / 1380), lerp(982, 1022, y / 1380)];
  const LOWY = 2882, FLOOR = 3078;
  // D·X·O as little cut-paper letter kids (like the dxo() stamps), measured against the frame
  const KIDS = [['D', PAL.lemon, 995], ['X', PAL.coral, 1113], ['O', PAL.teal, 1228]];
  function letterKid(L, col, x, y, o) {
    const s = o.s ?? 1, th = 112 * s, tw = 98 * s, leg = (72 + 46 * o.tip) * s, sd = 940 + L.charCodeAt(0) * 3, lw = 5 * s;
    X.save(); X.translate(x + (o.dx || 0), y);
    shadowBlob(0, (o.air || 0), 52 * s * (1 - (o.air || 0) / 300), 7 * s, .22);
    const sq = o.sq ?? 1; X.scale((o.spin ?? 1) / sq, sq);
    const kn = 8 * s * (1 - o.tip);
    inkLine([[-18 * s, -leg], [-22 * s - kn, -leg * .5], [-20 * s, -6 * s]], lw, PAL.ink, .5, sd);
    inkLine([[18 * s, -leg], [22 * s + kn, -leg * .5], [20 * s, -6 * s]], lw, PAL.ink, .5, sd + 1);
    inkShape(ellPts(-27 * s, -6 * s + o.tip * -4 * s, 13 * s, 6 * s, 8), PAL.ink, 0, .4, sd + 2);
    inkShape(ellPts(27 * s, -6 * s + o.tip * -4 * s, 13 * s, 6 * s, 8), PAL.ink, 0, .4, sd + 3);
    X.translate(0, -leg + 4 * s); X.rotate(o.rot || 0);
    const sw = o.swing || 0, ul = o.upL || 0, ur = o.upR || 0;
    // left arm: swinging ↔ thrown up in a V
    const lhx = lerp(-tw / 2 - 34 * s, -tw / 2 - 40 * s, ul), lhy = lerp(-th * .04 + sw * 1.4, -th * 1.3, ul);
    inkLine([[-tw / 2 + 4 * s, -th * .42], [lerp(-tw / 2 - 24 * s, -tw / 2 - 30 * s, ul), lerp(-th * .26 + sw, -th * .82, ul)], [lhx, lhy]], lw, PAL.ink, .5, sd + 4);
    dot(lhx, lhy, 6 * s);
    const pt = o.point || 0;                                   // right arm: swinging → V → pointing straight up
    const vx = lerp(tw / 2 + 34 * s, tw / 2 + 40 * s, ur), vy = lerp(-th * .04 - sw * 1.4, -th * 1.3, ur);
    const hx = lerp(vx, tw / 2 + 18 * s, pt), hy = lerp(vy, -th * 1.42, pt);
    inkLine([[tw / 2 - 4 * s, -th * .42], [lerp(lerp(tw / 2 + 24 * s, tw / 2 + 30 * s, ur), tw / 2 + 26 * s, pt), lerp(lerp(-th * .26 - sw, -th * .82, ur), -th * .9, pt)], [hx, hy]], lw, PAL.ink, .5, sd + 5);
    dot(hx, hy, 6 * s);
    if (pt > .6) inkLine([[hx, hy - 4 * s], [hx + 2 * s, hy - 20 * s]], lw * .8, PAL.ink, .3, sd + 6);
    const back = (o.spin ?? 1) < 0;                           // mid-flip we see the plain paper back
    inkShape(rectPts(-tw / 2, -th, tw, th, 18 * s, 3), back ? '#efe2c4' : col, 4.5 * s, .9, sd + 7);
    if (!back) word(L, 0, -th * .12, th * .6, { ax: .5, col: PAL.ink, seed: L.charCodeAt(0) });
    const lu = o.look || 0, ey = -th * .8;
    if (!back) [-1, 1].forEach(side => {
      const ex = side * tw * .2;
      inkShape(ellPts(ex, ey, 9 * s, 10 * s, 10), '#fffaf0', 2.5 * s, .3, sd + 8 + side);
      dot(ex + (o.glance || 0) * 3 * s, ey + 2 * s - lu * 5 * s, 4.2 * s);
    });
    X.restore();
  }
  const MARKS = [2700, 2520, 2335, 2150, 1960, 1800, 1180, 880, 560, 250];
  // deliberate crane up the growth chart: bottom on LET'S/least, sky/top by EVER/be.
  const TILT0 = w29(3) - .2, TILT1 = w29(7) + .03;
  const camAt = (t) => {
    const pk = E.outBack(prog(t, w29(4) - .06, w29(4) + .22)), k = E.ioS(prog(t, TILT0, TILT1));
    const x0 = lerp(1190, 1150, pk), y0 = lerp(2830, 2790, pk), z0 = lerp(1.55, 1.75, pk);
    return [lerp(x0, 960, k), lerp(y0, 560, k), lerp(z0, .96, k)];
  };
  function mark(x0, x1, y, k, i) {
    if (k <= 0) return;
    inkLine(ptrim([[x0, y + 1], [(x0 + x1) / 2, y - 1], [x1, y + 1]], k), 4.5, '#5a4632', .6, 800 + i);
  }
  shot('bridge_door', T4, (t) => {
    const fadeIn = 1 - E.outC(prog(t, T4, w29(0) - .03));
    const [cx, cy, z] = camAt(t);
    bgCam(() => paperBG('#f3dfb8', .3), [cx, cy, z, 0], { par: .9, over: 3.2 });
    X.save(); cam(cx, cy, z);
    worldPlate('door', 1920, DH_);
    // marks + labels on the door post (pencil), then on into the sky post
    const reveal = (y) => { const [, ccy, cz] = camAt(t); return prog(ccy + 600 / cz - y, -40, 160); };
    MARKS.forEach((y, i) => {
      const inSky = y < 1400, xs = inSky ? SPIRE(y) : POSTX;
      const k = E.outC(reveal(y));
      mark(xs[0] + 4, xs[1] - 4, y, k, i);
    });
    // today's mark: the lowest one
    const lowK = E.outC(prog(t, w29(4) - .25, w29(4) + .02));
    mark(POSTX[0] + 4, POSTX[1] - 4, LOWY, lowK, 99);
    // D·X·O kids: bounce on the beats, nudge each other, tiptoe on "least", then look up as we tilt (X points)
    const dk = pop(t, T4 + .05, 3, .45);
    const tip = Math.sin(Math.PI * clamp((t - w29(4) + .02) / .5));
    const look = E.outC(prog(t, w29(6) - .1, w29(6) + .1)), point = pop(t, w29(6), 3.4, .5);
    const bi = Math.floor(beatAt(t)), bk = kick(t - beat(bi), 10);
    const hb = Math.floor((beatAt(t) * 2)), hbT = beat(hb / 2), hsw = E.outC(prog(t - hbT, 0, .09));
    const calm = (1 - tip) * (1 - look);
    // featured move per sung word: everyone hops "Let's", D flips "make", X leaps "THIS", O flips "the"
    const MOVES = [[w29(0), -1], [w29(1), 0], [w29(2), 1], [w29(3), 2]];
    KIDS.forEach(([L, col, x], i) => {
      let air = 0, spin = 1, upB = 0, sq = 1;
      MOVES.forEach(([tw, who]) => {
        if (who !== -1 && who !== i) return;
        const dur = who === -1 ? .26 : .34, u = (t - tw + .08) / dur, Hh = who === -1 ? 30 : i === 1 ? 92 : 64;
        if (u > 0 && u < 1) { const a = Math.sin(u * Math.PI); air += a * Hh; upB = Math.max(upB, a); sq *= 1 + a * .12; if (who === i && i !== 1) spin = Math.cos(u * Math.PI * 2); }
        const land = tw - .08 + dur; if (t >= land) sq *= 1 - kick(t - land, 13) * .2;
        if (t < tw - .08 && t > tw - .18) sq *= 1 - (1 - (tw - .08 - t) / .1) * .14;      // anticipation crouch
      });
      const hop = ((bi + i) % 2 === 0 ? bk : bk * .3) * 18 * (1 - tip);
      const shove = ((bi % 3) === i ? 1 : 0) * kick(t - beat(bi), 7) * (i === 2 ? -1 : 1) * 14;
      const rot = Math.sin(Math.PI * beatAt(t) + i * 1.3) * .09 * calm - look * .12 * (i - 1) * .5;
      const sw = Math.sin(Math.PI * beatAt(t) * 2 + i) * 10 * calm;
      const pump = (hb + i) % 2 === 0 ? hsw : 1 - hsw;          // alternating arm pumps on every half-beat
      const upL = Math.max(upB, pump * .85 * calm), upR = Math.max(upB, (1 - pump) * .85 * calm);
      letterKid(L, col, x, FLOOR - air - hop - (1 - dk) * 40 * (i + 1) / 3, {
        s: .6 + .4 * dk, tip, rot, swing: sw, dx: shove, look, point: i === 1 ? point : 0, glance: (i - 1) * calm * Math.sin(t * 3),
        upL, upR: i === 1 ? upR * (1 - point) : upR, sq, spin, air: air + hop });
    });
    if (t > w29(4) - .03) {
      const lk = pop(t, w29(4) - .03, 4, .5);
      X.save(); X.translate(POSTX[1] + 16, LOWY + 10); X.scale(lk, lk);
      word('least', 0, 0, 34, { font: 'SH', col: PAL.red, seed: 2 }); X.restore();
      
    }
    X.restore();
    // type (screen space, crisp): LET'S MAKE THIS the / LEAST CAPABLE / it'll / EVER / be.
    X.save(); X.globalAlpha *= vanish(t, TILT0 - .02, .16);
    row([["LET'S", w29(0) - .02], ['MAKE', w29(1) - .02], ['THIS', w29(2) - .02, { col: PAL.red, edge: true }], ['the', w29(3) - .02, { size: 92, font: 'FBo', col: PAL.inkSoft }]],
      90, 225, 130, { align: 'left', from: 1.6, maxW: 1080 });
    X.restore();
    row([['LEAST', w29(4) - .02, { size: 124, col: PAL.red, edge: true }], ['CAPABLE', w29(5) - .02, { size: 176, col: PAL.ink }]], 90, 425, 176,
      { align: 'left', from: 1.45, gap: .2 });
    row([["it'll", w29(6) - .02, { col: PAL.inkSoft }]], 300, 540, 120, { align: 'left', font: 'FBo', from: 1.3 });
    // the payoff
    const evK = kick(t - w29(7), 4);
    X.save(); X.translate(wob(t, 31, evK * 8), wob(t, 32, evK * 8));
    row([['EVER', w29(7) - .02, { col: PAL.lemon, edge: true }]], 960, 915, 500, { from: 2.0, f: 3, z: .5 });
    row([['be.', w29(8) - .02, { col: PAL.ink }]], 1830, 1030, 140, { from: 1.6, align: 'right' });
    X.restore();
    // tilt smear
    const [, cy2] = camAt(t + 1 / 48), vy = (cy2 - cy) * z;
    if (Math.abs(vy) > 4) POST.smear = [0, -vy * 1.6];
    POST.vign = .45;
    if (fadeIn > 0) { POST.fade = fadeIn * .92; POST.fadeCol = '#fff2d6'; }
  });
})();
