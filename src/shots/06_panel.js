// 06_panel.js — VERSE 4 · THE PANEL (74.78 – 90.38): "Hypothesis keeps three contenders in view ... Five coats, one
// model. Now all five rotate." (shot names v4_* = verse 4). K-pop "member intro" cards: one colour block per role,
// giant name slammed left, member right, one gag each. One red thread crosses every cut at y = THY.
(() => {
  'use strict';
  const THY = 660;                                    // thread height at every cut (screen space)
  const IN = PAL.inkSoft;
  const sm = (txt, t0, o = {}) => [txt, t0, { size: 86, font: 'FBo', col: IN, ...o }];
  // Lyric row: auto-fit to maxW; every word grows from its OWN left edge (+ small drop) so mid-slam it can only
  // spill into space the next (not-yet-sung) word will occupy — never back over the previous word.
  // Item option `spread` (px) springs that word's letters apart.
  function lrow(items, x0, y, maxW, o = {}) {
    const base = o.size ?? 120, gk = o.gap ?? .32;
    const sz = items.map(([, , oo = {}]) => oo.size || base), fn = items.map(([, , oo = {}]) => oo.font || 'FB');
    const ws = items.map(([w], i) => measure(w, sz[i], fn[i]));
    const k = Math.min(1, maxW / (ws.reduce((a, b) => a + b, 0) + base * gk * (items.length - 1)));
    const total = (ws.reduce((a, b) => a + b, 0) + base * gk * (items.length - 1)) * k;
    let x = o.align === 'center' ? x0 - total / 2 : x0;
    items.forEach(([w, t0, oo = {}], i) => {
      const size = sz[i] * k, dy = T >= t0 ? -24 * (1 - spring(T - t0, 4.6, .6)) : 0;
      const so = { font: fn[i], from: 1.3, f: 4.6, z: .55, col: o.col, ...oo, ax: 0 };
      if (oo.spread) {
        let lx = x;
        [...w].forEach((ch, j) => { slam(ch, lx, y + dy, size, t0, { ...so, rot: oo.rot ?? 0, seed: j }); lx += measure(ch, size, fn[i]) + oo.spread; });
      } else slam(w, x, y + dy, size, t0, so);
      x += ws[i] * k + base * k * gk;
    });
  }
  const lyr = (items, y, maxW, o = {}) => lrow(items, 70, y, maxW, o);
  const UP = 600, LO = 1005;          // calm bands: between name and thread / bottom

  // Camera push about (960, THY) so the thread keeps its screen height while zooming.
  function pushCam(t, t0, t1, kicks = []) {
    const z = lerp(1, 1.04, E.ioS(prog(t, t0, t1))) + kicks.reduce((a, k) => a + kick(t - k, 9) * .022, 0);
    return [960, THY + (540 - THY) / z, z, 0];
  }
  // Member-card dressing: wash, slanted name band, disc behind member, sparkles.
  function deco(t, t0, o, c) {
    bgCam(() => {
      paperBG(o.wash, o.k ?? .8);
      const b = E.outC(prog(t, t0, t0 + .16));
      X.save(); X.globalAlpha *= .42;
      inkShape([[-80, 120 + 40], [lerp(-80, 1180, b), 90], [lerp(-80, 1120, b), 560], [-80, 600]], o.band, 0, 2, 820);
      X.restore();
      const d = spring(t - t0, 2.6, .45);
      X.save(); X.globalAlpha *= .55;
      inkShape(ellPts(o.cx ?? 1520, 600, 430 * d, 430 * d, 18), o.disc, 0, 3, 830);
      X.restore();
      (o.sparks || [[1130, 150, 26], [1150, 440, 18], [560, 70, 14]]).forEach(([x, y, r], i) => {
        const s = r * (.8 + .4 * hash2(boilStep(t), i + 3)) * appear(t, t0 + .1 + i * .06, .1);
        if (s > 0) inkShape([[x, y - s * 2], [x + s * .45, y - s * .45], [x + s * 2, y], [x + s * .45, y + s * .45], [x, y + s * 2], [x - s * .45, y + s * .45], [x - s * 2, y], [x - s * .45, y - s * .45]], PAL.cream, 3, .6, 840 + i);
      });
    }, c, { par: .9, over: 1.22 });
  }
  // Giant two-part name stacked on the left; each half slams on its syllable.
  function nameStack(a, b, ta, tb, o = {}) {
    let s = o.size ?? 230;
    const k = Math.min(1, (o.maxW ?? 880) / Math.max(measure(a, s), measure(b, s) + (o.indent ?? 70)));
    s *= k;
    const y1 = o.y ?? 285, y2 = y1 + s * .9, col = o.col || PAL.cream;
    const ns = (txt, x, y, t0, r, c) => {
      if (T < t0 - 1e-6) return;
      const dt = T - t0 + .04, k = spring(dt, 4.4, .5), sq = 1 + kick(dt, 14) * .14;
      word(txt, x, y, s, { col: c, edge: true, ax: 0, s: lerp(1.6, 1, k), sx: sq, sy: 1 / sq, rot: r * (1 + kick(dt, 6) * 2), seed: txt.length });
    };
    ns(a, 90, y1, ta, -.03, col);
    ns(b, 90 + (o.indent ?? 70), y2, tb, .02, o.col2 || col);
  }
  // Member enters from the right on the cut.
  const enterX = (t, t0, x) => x + (1 - spring(t - t0 + .12, 3.2, .6)) * 520;
  function hangCard(px, py, ang, o = {}) {
    const h = o.h ?? 220;
    X.save(); X.translate(px, py); X.rotate(ang); card(0, h / 2 + 6, { ...o, h, rot: 0 }); X.restore();
    tack(px, py, o.ts ?? 1, { pressed: o.pressed ?? 1 });
  }
  const line = (pts) => thread(pts, { w: 11 });
  // K-pop "point choreography": seq = [[t, pose, h], ...] swapped on sung words. Each swap lands with a squash pop;
  // between swaps the member grooves on the beat (dip + alternating lean) so nobody freezes.
  function member(t, seq, x, base, o = {}) {
    let cur = seq[0]; for (const s of seq) if (t >= s[0]) cur = s;
    const [ts, name, h] = cur, sw = t >= ts ? kick(t - ts, 13) : 0;
    const bi = Math.floor(beatAt(t)), bk = kick(t - beat(bi), 9);
    const sq = 1 + sw * .13 + bk * .035, lean = (bi % 2 ? 1 : -1) * .022 * E.outC(prog(t - beat(bi), 0, .14));
    spr(name, x, base + bk * 6, h, { flip: true, shadow: 1, seed: o.seed, sx: sq, sy: 1 / sq, rot: lean + (o.rot || 0) });
    return name;
  }

  // ── HYPOTHESIS (lemon) 74.78 → 77.31 — three contenders drop onto the thread ─────
  shot('v4_hyp', 74.78, (t) => {
    const t0 = 74.78, tb = 75.12, drops = [75.47, 75.80, 76.13], tIn = 77.10, view = 77.23;
    const c = pushCam(t, t0, 77.31, [t0, tb, ...drops, view]);
    deco(t, t0, { wash: PAL.lemon, band: '#e2a417', disc: '#fff6cf' }, c);
    X.save(); cam(...c);
    const pins = [300, 560, 820], glyphs = ['xray', 'dna', 'slide'];
    const C = pins.map((px, i) => {
      const td = drops[i], dt = t - td, landed = t >= td;
      const dip = landed ? 24 * clamp(dt / .05) + 30 * kick(dt, 4.5) * Math.cos(dt * 22) + 24 * kick(t - view, 3.5) * Math.sin((t - view) * 15) * (t > view ? 1 : 0) : 0;
      const ang = landed ? .5 * kick(dt, 2.4) * Math.sin(dt * 11 + .3) * (i % 2 ? -1 : 1) + (t > tIn ? .34 * kick(t - tIn, 1.8) * Math.sin((t - tIn) * 9 + i * .9) : 0) : .6 * (1 - E.inQ(prog(t, td - .2, td))) * (i % 2 ? 1 : -1);
      return { px, py: THY + dip, ang, fall: landed ? 0 : lerp(-900, 0, E.inQ(prog(t, td - .2, td))), on: t > td - .2, g: glyphs[i], i, landed };
    });
    line(spline([[-60, THY], [140, THY], ...C.map(c => [c.px, c.py]), [1100, THY], [1980, THY]], 12));
    C.forEach(c => { if (c.on) hangCard(c.px, c.py + c.fall, c.ang, { w: 180, h: 210, glyph: c.g, seed: 50 + c.i, pressed: c.landed ? E.outBack(prog(t, drops[c.i], drops[c.i] + .07)) : 0 }); });
    const hop = kick(t - view, 6) * 60 * (t > view ? 1 : 0) + drops.reduce((a, d) => a + kick(t - d, 12) * 14, 0);
    // present → point "keeps" → three fingers "THREE" → point "CONTENDERS" → ta-da → cheer "VIEW"
    member(t, [[t0, 'hyp_present', 600], [drops[0], 'hyp_point', 680], [drops[1], 'pc_hyp_three', 720], [drops[2], 'hyp_point', 680],
      [beat(117), 'hyp_present', 600], [view, 'hyp_cheer', 680]], enterX(t, t0, 1545), 1080 - hop, { seed: 2 });
    X.restore();
    nameStack('HYPO-', 'THESIS', t0, tb);
    lyr([sm('keeps', drops[0]), ['THREE', drops[1]]], UP, 1000);
    lyr([['CONTENDERS', drops[2], { col: PAL.red, edge: true }], sm('in', tIn), ['VIEW,', view - .06, { from: 1.15, f: 6, z: .6 }]], LO, 1200);
  });

  // ── CHALLENGER (coral) 77.31 → 80.32 — magnifies a knot; "what else?" forks the thread ─
  shot('v4_chal', 77.31, (t) => {
    const t0 = 77.31, tb = 77.64, asks = 78.07, what = 78.835, els = 79.06, tru = 79.675;
    const W = LINES[21].words;
    const c = pushCam(t, t0, 80.32, [t0, tb, what, tru]);
    deco(t, t0, { wash: PAL.coral, k: .72, band: '#c4482c', disc: '#ffe1d2' }, c);
    X.save(); cam(...c);
    const h = 720, cx = lerp(1700, 1540, E.outC(prog(t, t0, t0 + .7))), base = 1040;
    const kx = 1540 - .35 * h, ky = THY;                  // knot sits where the lens comes to rest
    const Q = [[-14, -34], [-8, -46], [8, -46], [16, -34], [12, -24], [0, -18], [0, -11]];   // the knot's hook sits above the thread…
    const qs = .56 * (1 - E.inBack(prog(t, what, what + .16)));
    const knotQ = () => {
      if (qs <= .01) return;
      thread(spline(Q.map(([x, y]) => [kx + x * qs, ky - 8 + y * qs]), 8), { w: 4.5, shadow: 0 });
      // …and its dot is a little bead resting on top of the thread, so it reads as a full "?"
      X.save(); X.fillStyle = PAL.red; X.strokeStyle = PAL.redDk; X.lineWidth = 1.6;
      X.beginPath(); X.arc(kx, ky - 8 + 5 * qs, 3.6 * qs * 1.6, 0, 7); X.fill(); X.stroke(); X.restore();
    };
    line([[-60, THY], [1980, THY]]);
    knotQ();
    // the branch: "what else could be true?"
    const card2 = [1095, 300];
    if (t > what) {
      thread(spline([[kx - 18, ky], [kx - 80, ky - 110], [card2[0] + 60, card2[1] + 140], card2], 12), { w: 10, k: E.outC(prog(t, what, els)), tip: true });
    }
    if (t > els - .15) {
      const a = E.outBack(prog(t, els - .15, els));
      X.save(); X.translate(card2[0], card2[1]); X.scale(a, a);
      const fl = 1 + E.outBack(prog(t, tru - .05, tru + .2));
      X.translate(0, 125); X.rotate(-.06 + Math.sin((t - els) * 8) * kick(t - els, 4) * .1);
      card(0, 0, { w: 190, h: 240, glyph: '?', flip: fl, seed: 61, s: 1 + kick(t - tru, 10) * .12, backCol: '#f2c9b6' });
      X.restore();
      tack(card2[0], card2[1], 1.1, { pressed: E.outBack(prog(t, els, els + .07)) });
    }
    if (t < what) {
      spr('chal_sneak', cx, base + Math.abs(Math.sin((t - t0) * 9)) * -10, h, { flip: true, shadow: 1, seed: 5 });
      // lens shows the knot, magnified
      const lx = cx - .35 * h, ly = base - .53 * h, r = .105 * h;
      X.save(); X.beginPath(); X.arc(lx, ly, r, 0, 7); X.clip();
      X.fillStyle = '#fbe6d8'; X.fillRect(lx - r, ly - r, r * 2, r * 2);
      X.translate(lx, ly); X.scale(2.5, 2.5); X.translate(-lx, -ly);
      thread([[lx - 200, THY], [lx + 200, THY]], { w: 11, shadow: 0 }); knotQ();
      X.restore();
      X.save(); X.globalAlpha *= .5; X.strokeStyle = '#fff'; X.lineWidth = 6; X.beginPath(); X.arc(lx, ly, r * .72, 3.6, 4.4); X.stroke(); X.restore();
      inkShape(ellPts(lx, ly, r, r, 16), null, 6, .8, 77);
    } else {
      const hop = kick(t - what, 7) * 50 + kick(t - tru, 9) * 24;
      // finger up "WHAT ELSE" → shrug "could be" → point at the flipped card "TRUE?"
      member(t, [[what, 'pc_chal_aha', 780], [W[4][1], 'pc_chal_shrug', 760], [tru, 'chal_point', 760]], 1560, 1075 - hop, { seed: 6 });
    }
    X.restore();
    nameStack('CHAL-', 'LENGER', t0, tb);
    hand('asks,', 330, 585, 76, asks, asks + .25, { font: 'SH', col: PAL.ink, pencil: false });
    lyr([['“WHAT', W[2][1]], ['ELSE', W[3][1], { col: PAL.cream, edge: true }]], 875, 1150);
    lyr([sm('could', W[4][1]), sm('be', W[5][1]), ['TRUE?”', tru, { col: PAL.cream, edge: true, size: 130 }]], LO, 1150);
  });

  // ── TEST-CHOOSER (teal) 80.32 → 82.85 — the test card tears the options APART ────────
  shot('v4_tc', 80.32, (t) => {
    const t0 = 80.32, tb = 80.64, which = 80.97, test = 81.20, apart = 82.16;
    const W = LINES[22].words;
    const sp = spring(t - apart, 2.6, .55);
    {
      const c = pushCam(t, t0, 82.85, [t0, tb, test, apart]);
      deco(t, t0, { wash: PAL.teal, k: .7, band: '#2f7d70', disc: '#d8f1ea' }, c);
      X.save(); cam(...c);
      const jig = (i) => [W[3][1], W[4][1], W[5][1]].reduce((a, w) => a + kick(t - w, 9) * (t > w ? 1 : 0), 0) * (i ? 1 : -1);
      const opt = [{ g: 'heart', x: lerp(835, 560, sp), r: -.1 }, { g: 'drop', x: lerp(1085, 1250, sp), r: .1 }];
      line(spline([[-60, THY], [300, THY], [opt[0].x, THY + 18], [960, THY + 24], [opt[1].x, THY + 18], [1600, THY], [1980, THY]], 12));
      if (t > apart && t < apart + .35) {                    // whoosh lines behind the flying options
        X.save(); X.globalAlpha *= vanish(t, apart + .15, .2);
        opt.forEach((o, i) => { const sd = i ? 1 : -1; for (let j = 0; j < 3; j++) inkLine([[o.x - sd * (110 + j * 8), THY + 70 + j * 60], [o.x - sd * (200 + j * 30), THY + 70 + j * 60]], 5, PAL.ink, 1, 860 + j + i * 3); });
        X.restore();
      }
      opt.forEach((o, i) => hangCard(o.x, THY + 18, o.r + jig(i) * .18 + Math.sin(t * 3 + i) * .03 + (t > apart ? (i ? 1 : -1) * .5 * kick(t - apart, 3) * Math.cos((t - apart) * 9) : 0), { w: 170, h: 210, glyph: o.g, seed: 70 + i }));
      if (t > test - .18) {
        const k = E.outC(prog(t, test - .18, test)), s = lerp(2.6, 1, k);
        X.save(); X.translate(lerp(1300, 960, k), lerp(200, THY + 24, k)); X.rotate(lerp(-.9, .02, k)); X.scale(s * (1 + kick(t - test, 14) * .15), s / (1 + kick(t - test, 14) * .15));
        card(0, 125, { w: 190, h: 240, glyph: 'tube', seed: 72, stock: '#fff8e6' }); X.restore();
        if (t >= test) tack(960, THY + 24, 1.25, { pressed: E.outBack(prog(t, test, test + .07)), col: PAL.red });
      }
      const hop = kick(t - test, 10) * 30 + kick(t - apart, 7) * 40;
      // fan → chin-tap "Which" → slap "TEST" → point "these" → arms up "APART" → point
      member(t, [[t0, 'tc_fan', 760], [which, 'pc_tc_think', 780], [test, 'tc_slap', 800], [W[4][1], 'tc_point', 800],
        [apart, 'tc_cheer', 820], [beat(126) + .1, 'tc_point', 800]], enterX(t, t0, 1580), 1080 - hop, { seed: 8 });
      X.restore();
      nameStack('TEST-', 'CHOOSER', t0, tb);
      lyr([sm('“Which', which), ['TEST', test, { col: PAL.lemon, edge: true }], sm('tells these', W[3][1])], UP, 1080);
      lyr([['OPTIONS', W[5][1], { size: 110 }], ['APART?”', apart, { col: PAL.lemon, edge: true, size: 120, spread: 26 * spring(t - apart, 2.2, .3) }]], LO, 1400);
    }
  });

  // ── STEWARDSHIP (sage) 82.85 → 85.49 — same bulb, $ vs $$$, the wink ────────────────
  function balance(cx, py, tilt, draw) {
    inkLine([[cx, py], [cx, py + 46]], 5, PAL.ink, .6, 701);
    X.save(); X.translate(cx, py + 46); X.rotate(tilt);
    inkShape(rectPts(-270, -12, 540, 24, 10, 5), PAL.brass, 5, 1.2, 702);
    [-1, 1].forEach(sd => {
      X.save(); X.translate(sd * 250, 0); X.rotate(-tilt);
      inkLine([[0, 0], [-95, 120]], 3.5, PAL.ink, .6, 705 + sd); inkLine([[0, 0], [95, 120]], 3.5, PAL.ink, .6, 707 + sd);
      inkShape([[-125, 120], [125, 120], [92, 152], [-92, 152]], PAL.brass, 5, 1, 709 + sd);
      draw(sd);
      X.restore();
    });
    inkShape(ellPts(0, 0, 17, 17, 10), PAL.brassDk, 4, .7, 711);
    X.restore();
    tack(cx, py, 1.1);
  }
  shot('v4_st', 82.85, (t) => {
    const t0 = 82.85, tb = 83.30, same = 83.64, ins = 83.89, fr = 84.35, less = 84.60, thats = 84.78, smart = 84.93;
    const c = pushCam(t, t0, 85.49, [t0, tb, same, less, thats, smart]);
    deco(t, t0, { wash: PAL.sage, k: .8, band: '#5f9a4f', disc: '#eef7df', sparks: [[1010, 110, 20], [1090, 470, 16], [560, 60, 12]] }, c);
    X.save(); cam(...c);
    const px = 720, dip = 14 * clamp((t - same) * 20) + 26 * kick(t - same, 5) * Math.cos((t - same) * 20) * (t > same ? 1 : 0);
    line(spline([[-60, THY], [300, THY], [px, THY + dip], [1200, THY], [1980, THY]], 12));
    const cheapLift = t > fr ? -.08 * spring(t - fr, 2.5, .5) * (1 - clamp((t - less + .02) / .22)) : 0;
    const costlyDrop = t > less - .035 ? .62 * spring(t - less + .035, 1.85, .22) + .08 * kick(t - less, 4) * Math.sin((t - less) * 18) : 0;
    const tilt = cheapLift + costlyDrop + Math.sin(t * 2.4) * .006;
    balance(px, THY + dip, tilt, (sd) => {
      if (t > same - .2) {
        const k = E.inQ(prog(t, same - .2, same)), glow = t > ins ? 1 + kick(t - ins, 6) * .25 : .85;
        const bh = 170 * (1 + kick(t - same, 14) * .1);
        X.save(); X.globalAlpha *= t > ins ? .5 + .25 * kick(t - ins, 4) : 0;
        X.fillStyle = '#fff2a6'; X.beginPath(); X.arc(0, 30, 110 * glow, 0, 7); X.fill(); X.restore();
        spr('bulb', 0, lerp(-700, 122, k), bh, { seed: sd > 0 ? 1 : 0, sy: 1 / (1 + kick(t - same, 14) * .12) });
      }
      // cost markers sit inside the plumb pans and ride with the pan, rather than dangling from the beam.
      const tt = sd < 0 ? fr : less;
      if (t > tt - .12) {
        const k = E.outBack(prog(t, tt - .12, tt), 1.6), sw = Math.sin((t - tt) * 11) * kick(t - tt, 4) * .12;
        X.save(); X.translate(sd < 0 ? -34 : 30, 116 - 40 * (1 - k)); X.rotate(sw + sd * .035); X.scale(k, k);
        if (sd < 0) {
          inkShape([[-50, -58], [-28, -70], [54, -62], [50, 8], [-54, 8]], '#fbf3df', 3.5, .7, 722 + sd);
          dot(-33, -50, 4);
          word('$', 2, -4, 64, { col: '#2f7a4c', ax: .5, seed: 2 + sd });
        } else {
          inkShape(rectPts(-88, -84, 176, 88, 12, 5), '#fbf3df', 4, .8, 722 + sd);
          word('$$$', 0, -17, 62, { col: '#2f7a4c', ax: .5, seed: 2 + sd });
          for (let i = 0; i < 4; i++) inkShape(ellPts(-54 + i * 36, 8, 17, 6, 10), PAL.brass, 2.2, .45, 730 + i);
        }
        X.restore();
      }
      if (sd < 0 && t > smart) {
        const s = E.outBack(prog(t, smart, smart + .14), 2.4);
        X.save(); X.translate(-150, 92); X.scale(s * 1.3, s * 1.3); GLYPH.tick(1); X.restore();
      }
    });
    const hop = kick(t - smart, 7) * 22 + kick(t - less, 10) * 18 + kick(t - same, 10) * 16;
    // lean in → point at the bulbs "SAME" → squint at a coin "for less?" → wink "SMART."
    member(t, [[t0, 'st_leanin', 640], [same, 'st_point', 660], [fr, 'pc_st_think', 680], [smart, 'st_wink', 660]], enterX(t, t0, 1560), 1080 - hop, { seed: 9 });
    X.restore();
    // hero punchline, right-anchored so it grows inward from the frame edge
    const drop = (t0_) => T >= t0_ ? -70 * (1 - spring(T - t0_, 4.4, .5)) : 0;   // punch = drop from above, not scale
    slam("THAT'S", 1850, 200 + drop(thats), 135, thats, { ax: 1, col: PAL.cream, edge: true, from: 1.15, f: 5, z: .5, rot: -.04 });
    slam('SMART.', 1850, 375 + drop(smart), 175, smart, { ax: 1, col: PAL.red, edge: true, from: 1.2, f: 5, z: .45, rot: .03 });
    nameStack('STEWARD-', 'SHIP', t0, tb, { indent: 120 });
    lyr([['“SAME', same], ['INSIGHT', ins, { col: PAL.lemon, edge: true }]], UP, 1000);
    lyr([sm('for', fr), ['LESS?”', less, { col: PAL.red, edge: true, size: 130 }]], LO, 900);
  });

  // ── CHECKLIST (lilac) 85.49 → 87.93 — names ticked on beats, tangle yanked STRAIGHT ──
  const ROLES = [['Hypothesis', PAL.lemon], ['Challenger', PAL.coral], ['Test-Chooser', PAL.teal], ['Stewardship', PAL.sage], ['Checklist', PAL.lilac]];
  const PINX = [283, 496, 742, 988, 1170], DROP = [20, 104, 20, 104, 20];   // tier A short strings, tier B long
  function tangle(k) {
    const xs = [110, ...PINX, 1350], pts = [[-60, THY]];
    for (let g = 0; g < xs.length - 1; g++) for (let i = 0; i < 16; i++) {
      const s = i / 16, x = lerp(xs[g], xs[g + 1], s), env = Math.pow(Math.sin(s * Math.PI), .6), a = s * Math.PI * 2 * 1.5 + g;
      const sa = Math.sin(a), tx = x + Math.cos(a) * 55 * env, ty = THY + sa * (sa < 0 ? 26 : 70) * env * (.7 + hash(g * 16 + i) * .4);
      pts.push([lerp(tx, x, clamp(k, 0, 1.08)), lerp(ty, THY, k)]);
    }
    pts.push([1350, THY], [1980, THY]);
    return pts;
  }
  function nameTag(i, px, drop, rot, t, tickT) {
    const [name, col] = ROLES[i], tw = measure(name, 60, 'SH') + 64, h = 80;
    const bump = t >= tickT ? kick(t - tickT, 12) * 10 : 0;
    X.save(); X.translate(px, THY); X.rotate(rot);
    inkLine([[0, 0], [0, drop + bump]], 3, PAL.ink, .4, 770 + i);
    X.translate(0, bump);
    inkShape(rectPts(-tw / 2, drop, tw, h, 12, 4), '#fbf3df', 4, .9, 780 + i);
    inkShape(rectPts(-tw / 2, drop, 26, h, 8, 2), col, 0, .6, 790 + i);
    word(name, 13, drop + 60, 60, { font: 'SH', col: PAL.ink, ax: .5, seed: i });
    if (t >= tickT) { const a = E.outBack(prog(t, tickT, tickT + .12), 2.5); X.save(); X.translate(tw / 2 - 6, drop + 4); X.rotate(.1); X.scale(a * 1.5, a * 1.5); GLYPH.tick(1); X.restore(); }
    X.restore();
    tack(px, THY, .8);
  }
  function selfTickGag(t, x, base, tAim, tTick) {
    if (t < tAim - .14) return;
    const tx = x - 310, ty = base - 630;
    const k = E.outBack(prog(t, tAim - .05, tAim + .10), 2.2);
    const draw = E.io(prog(t, tTick - .10, tTick + .12));
    const hit = kick(t - tTick, 12);
    X.save(); X.globalAlpha *= clamp((t - tAim + .14) / .18);
    X.save();
    X.translate(tx, ty); X.rotate(-.025 * (1 - k));
    X.scale(lerp(.96, 1, k) * (1 + hit * .018), lerp(.96, 1, k) * (1 - hit * .012));
    shadowBlob(10, 18, 210, 35, .16);
    inkShape(rectPts(-175, -118, 350, 260, 18, 5), '#fffaf0', 5, .75, 904);
    word('REASONING', 0, -78, 42, { font: 'SH', col: PAL.inkSoft, ax: .5, bake: true });
    inkShape(rectPts(-64, -32, 128, 128, 12, 4), 'rgba(255,255,255,.58)', 6, .8, 905);
    for (let i = 0; i < 3; i++) inkLine([[-134, 114 + i * 18], [134, 114 + i * 18]], 2.2, '#9fb7c9', .25, 906 + i);
    if (draw > 0) inkLine(ptrim([[-38, 26], [-12, 54], [50, -18]], draw), 10, '#2f9f72', .5, 916);
    X.restore();
    if (t >= tTick - .04 && draw < 1) {
      const px = tx + lerp(84, 20, draw), py = ty + lerp(-8, 28, draw);
      X.save(); X.translate(px, py); X.rotate(.86); X.scale(.82, .82);
      inkShape(rectPts(-5, -58, 10, 50, 2, 2), PAL.lemon, 2.4, .35, 917);
      inkShape([[-5, -8], [5, -8], [0, 8]], '#e8c9a0', 2.4, .3, 918);
      dot(0, 9, 2);
      X.restore();
    }
    X.restore();
  }
  shot('v4_ck', 85.49, (t) => {
    const t0 = 85.49, tb = 85.74, st = 87.51, W = LINES[24].words;
    const ticks = [86.0, 86.17, 86.5, 86.64, 86.76];
    const c = pushCam(t, t0, 87.93, [t0, tb, st]);
    deco(t, t0, { wash: PAL.lilac, k: .8, band: '#7c5c98', disc: '#f1e8f7' }, c);
    X.save(); cam(...c);
    const kS = t < st - .08 ? 0 : spring(t - st + .08, 3.4, .32);
    const P = tangle(kS);
    thread(P, { w: 11 });
    PINX.forEach((px, i) => {
      const crook = (hash(i + 31) - .5) * .4;
      nameTag(i, px, DROP[i], lerp(crook, 0, kS) + Math.sin(t * 3 + i) * .02 * (1 - clamp(kS)), t, ticks[i]);
    });
    const bob = ticks.reduce((a, k) => a + kick(t - k, 14) * 16, 0) + kick(t - st, 6) * 60;
    // cleaner point pose between marks; the pencil pose appears only on the tick beats.
    const seq = [[t0, 'ck_point', 680]];
    ticks.forEach(k => seq.push([k - .04, 'pc_ck_mark', 600], [k + .1, 'ck_point', 680]));
    seq.push([st, 'ck_cheer', 760]);
    const ckX = enterX(t, t0, 1650), ckBase = 1080 - bob;
    member(t, seq, ckX, ckBase, { seed: 11, rot: t < st ? -ticks.reduce((a, k) => a + kick(t - k, 14), 0) * .04 : 0 });
    selfTickGag(t, ckX, ckBase, ticks[0], W[5][1]);
    X.restore();
    nameStack('CHECK-', 'LIST', t0, tb);
    const crooked = (i) => lerp((hash(i + 77) - .5) * .35, 0, clamp(kS));
    lyr([sm('keeps', W[1][1], { rot: crooked(0) }), ['NAMES', W[2][1], { rot: crooked(1) }], sm('and the', W[3][1], { rot: crooked(2) })], 585, 1000);
    lyr([['REASONING', W[5][1], { rot: crooked(3) }], ['STRAIGHT,', st, { col: PAL.red, edge: true, rot: 0 }]], 1025, 1250, { size: 110 });
  });

  // ── FIVE COATS, ONE MODEL — fold into one friendly network; then all five rotate (87.93 → 90.42) ─
  const POSE5 = ['ck_point', 'chal_point', 'hyp_stand', 'tc_point', 'st_point'];
  const JOG = ['ck_jog', 'chal_jog', 'hyp_jog', 'tc_jog', 'st_jog'];
  const JOGH = [400, 410, 360, 430, 360];
  const ORIGIN_COLS = [PAL.lilac, PAL.coral, PAL.lemon, PAL.teal, PAL.sage];
  function originFlash(t, x, y, i, t0, s = 1) {
    const a = appear(t, t0, .08) * vanish(t, t0 + .62, .22);
    if (a <= 0) return;
    const pts = [[0, -62, 20], [-34, -12, 10], [0, -12, 10], [34, -12, 10], [-22, 34, 10], [22, 34, 10]];
    const links = [[0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5]];
    X.save(); X.globalAlpha *= .42 * a; X.translate(x, y); X.scale(s, s);
    links.forEach(([p, q], j) => {
      const A = pts[p], B = pts[q], k = E.outC(prog(t, t0 + j * .025, t0 + j * .025 + .12));
      inkLine([[A[0], A[1]], [lerp(A[0], B[0], k), lerp(A[1], B[1], k)]], 3 / s, PAL.inkSoft, .3, 1660 + i * 17 + j);
    });
    pts.forEach(([px, py, r], j) => {
      const k = E.outBack(prog(t, t0 + j * .035, t0 + j * .035 + .13), .5);
      if (k <= 0) return;
      X.save(); X.translate(px + wob(t, 1700 + i * 23 + j, .5), py + wob(t, 1730 + i * 19 + j, .45)); X.scale(k, k);
      inkShape(ellPts(0, 0, r, r * .9, 11), '#fff4df', 2.4 / s, .35, 1680 + i * 13 + j);
      X.save(); X.globalAlpha *= .58; inkShape(ellPts(0, 0, r * .84, r * .72, 11), ORIGIN_COLS[i], 0, .4, 1710 + i * 13 + j); X.restore();
      X.restore();
    });
    X.restore();
  }
  function dxoModel(t, cx, y, s, t0, o = {}) {
    const cols = [PAL.lemon, PAL.coral, PAL.teal], L = ['D', 'X', 'O'], xs = [-150, 0, 150];
    const a = o.alpha ?? 1, winkT = o.winkT ?? t0 + .75;
    X.save(); X.translate(cx, y); X.scale(s, s); X.globalAlpha *= a;
    L.forEach((l, i) => {
      const hit = t0 + i * .055, k = E.outBack(prog(t, hit - .08, hit + .18), .62);
      if (k <= 0) return;
      const hopT = o.hopT ?? hit, hop = (t > hopT ? Math.sin(clamp((t - hopT) / .24) * Math.PI) * 34 : 0) + kick(t - hit, 10) * 16;
      const x = xs[i], yy = -hop + (1 - k) * 78;
      X.save(); X.translate(x, yy); X.scale(k, k);
      shadowBlob(0, 165, 74, 13, .12);
      const sp = ellPts(0, 0, 105, 100, 18).map((p, j) => [p[0] + (hash(j + i * 20) - .5) * 26, p[1] + (hash(j + 9 + i * 20) - .5) * 24]);
      X.save(); X.globalAlpha *= .9; inkShape(sp, cols[i], 0, 1.15, 1880 + i); X.restore();
      stamp(l, 0, 0, 235, hit, { col: PAL.ink, rot: (i - 1) * .045 });
      if (l === 'O' && t > hit + .18) {
        const e = pop(t, hit + .18, 5, .45), look = E.io(prog(t, hit + .34, hit + .52)) - E.io(prog(t, hit + .62, hit + .82)), wk = t > winkT && t < winkT + .2;
        X.save(); X.translate(-4 - look * 8, -11); X.scale(e, e);
        X.fillStyle = '#fffdf4'; [-19, 19].forEach(ex => { X.beginPath(); X.ellipse(ex, 0, 13, 15, 0, 0, 7); X.fill(); });
        if (wk) inkLine([[9, 1], [19, -4], [29, 1]], 4.2, PAL.ink, .4, 1901); else dot(19 - look * 5, 2, 5.7);
        dot(-19 - look * 5, 2, 5.7);
        X.restore();
      }
      X.restore();
    });
    X.restore();
  }
  function originBridge(t, cx, y, gap, u, t0) {
    const a = appear(t, t0, .1) * vanish(t, t0 + .95, .28);
    if (a <= 0) return;
    const pts = [0, 1, 2, 3, 4].map(i => [cx + (i - 2) * gap * u, y + Math.sin(t * 3 + i) * 8]);
    X.save(); X.globalAlpha *= .42 * a;
    for (let i = 0; i < 4; i++) inkLine([pts[i], pts[i + 1]], 3.2, PAL.inkSoft, .28, 1780 + i);
    pts.forEach(([x, yy], i) => {
      inkShape(ellPts(x, yy, 13, 11, 10), '#fff4df', 2.4, .35, 1790 + i);
      X.save(); X.globalAlpha *= .68; inkShape(ellPts(x, yy, 12, 9, 10), ORIGIN_COLS[i], 0, .3, 1800 + i); X.restore();
    });
    X.restore();
  }
  shot('v4_five', 87.93, (t) => {
    const W = LINES[25].words, five = 87.93, coats = W[1][1], one = W[2][1], model = W[3][1];
    const now = W[4][1], all = W[5][1], fiv = W[6][1], rot = W[7][1];
    const shk = kick(t - model, 10) * 14 + kick(t - rot, 10) * 12;
    const c = pushCam(t, five, 90.42, [five, model, rot]);
    X.save(); X.translate(wob(t, 31, shk), wob(t, 32, shk)); bgCam(() => paperBG('#fbe9c8', .6), c, { par: .9, over: 1.2 }); X.restore();
    X.save(); X.translate(wob(t, 31, shk), wob(t, 32, shk));
    X.save(); cam(...c);
    const cx = 960, base = 1000, gap = 330;
    const modelY = 965, dxoY = 805, dxoS = 1.08, sideX = 255, sideY = dxoY + 52;
    const modelLine = () => { line(spline([[-60, THY], [300, THY], [cx - sideX, sideY]], 12)); line(spline([[cx + sideX, sideY], [1620, THY], [1980, THY]], 12)); };
    if (t < now) {
      // ── fold: five members → five network-creatures → D·X·O as the one model
      const u = t < one ? 1 : 1 - E.inC(prog(t, one, model));
      const single = t >= model;
      if (single) modelLine(); else line([[-60, THY], [1980, THY]]);
      if (!single) originBridge(t, cx, base - 440, gap, u, five);
      if (single) {
        const a = E.outC(prog(t, model - .05, model + .2)), popS = 1 + kick(t - model, 12) * .045;
        dxoModel(t, cx, dxoY, dxoS * popS, model - .04, { alpha: a, hopT: model, winkT: model + .55 });
      } else for (let i = 0; i < 5; i++) {
        const x = cx + (i - 2) * gap * u, f0 = coats + i * .045, fl = prog(t, f0, f0 + .14), sxx = Math.abs(Math.cos(fl * Math.PI));
        const drop = (1 - spring(t - five - i * .03 + .09, 4, .5)) * -700;
        originFlash(t, x, base + drop - 245, i, five + i * .045, .95);
        if (fl < .5) spr(POSE5[i], x, base + drop, CAST[i].h * 1.08, { flip: x > cx, sx: sxx, shadow: 1, seed: i * 3 });
        else window.aiCreature(x, base, .62, { sx: (i % 2 ? -1 : 1) * sxx * Math.max(.04, Math.abs(Math.cos((1 - u) * Math.PI / 2))), seed: 900 + i, col: ORIGIN_COLS[i], colorK: 1, build: five + i * .035, shadow: i === 2 ? 1 : 0 });
      }
    } else {
      // ── carousel: five burst out from D·X·O and jog round it, landing on "rotate"
      const R = spring(t - now, 3, .55);
      const ang = Math.PI * 2 * (E.io(prog(t, now, rot)) * 1.0 + Math.max(0, t - rot) * .35);
      const ring = [];
      for (let i = 0; i < 5; i++) {
        const ph = ang + i / 5 * Math.PI * 2 + Math.PI / 2;
        const pop = t >= [now, now, all, fiv, fiv][i] ? 1 : 0;
        ring.push({ i, x: cx + Math.cos(ph) * 720 * R, y: modelY + Math.sin(ph) * 185 * R, d: Math.sin(ph), vx: -Math.sin(ph), pop });
      }
      ring.sort((a, b) => a.y - b.y);
      const drawM = (m) => {
        const sc = lerp(.8, 1.22, (m.d + 1) / 2), ph = ((t - now) * 11 + m.i) / Math.PI, u = ph - Math.floor(ph);
        const hop = Math.sin(u * Math.PI) * 18 + kick(t - rot, 8) * 50, passing = u > .25 && u < .75 && (t < rot || t > rot + .25);
        spr(passing ? JOG[m.i].replace('_jog', '_pass').replace(/^/, 'pc_') : JOG[m.i], m.x, m.y + 55 - hop, JOGH[m.i] * sc * (1 + kick(t - rot, 12) * .06) * (passing ? 1.03 : 1), { flip: m.vx < 0, shadow: 1, seed: m.i * 5, alpha: m.pop * (R > .05 ? 1 : 0) });
      };
      ring.filter(m => m.d < 0).forEach(drawM);
      modelLine();
      dxoModel(t, cx, dxoY, dxoS * (1 + kick(t - now, 9) * .035), model - .04, { hopT: now, winkT: now + .42 });
      ring.filter(m => m.d >= 0).forEach(drawM);
      const v = Math.abs(E.io(prog(t + .02, now, rot)) - E.io(prog(t, now, rot))) * 800;
      if (v > 4) POST.smear = [v, 0];
    }
    X.restore();
    X.restore();
    // type
    const outA = vanish(t, now - .06, .1);
    X.save(); X.globalAlpha *= outA;
    lrow([['FIVE', five], ['COATS,', coats, { col: PAL.coral, edge: true }]], 960, 200, 1500, { size: 150, align: 'center' });
    row([['ONE', one]], 410, 545, 175, { from: 1.6 });                         // ONE · network · MODEL.
    row([['MODEL.', model, { col: PAL.red, edge: true }]], 1500, 545, 175, { from: 1.6 });
    X.restore();
    if (t > now - .04) {
      lrow([['NOW', now], ['ALL', all], ['FIVE', fiv, { col: PAL.coral, edge: true }]], 960, 200, 1500, { size: 140, align: 'center' });
      if (t > rot - .17) {                                   // spins in, lands upright exactly on "rotate"
        const p = prog(t, rot - .17, rot), sq = t >= rot ? kick(t - rot, 12) * .14 : 0;
        word('ROTATE.', 960, 405, 195, { col: PAL.red, edge: true, ax: .5, rot: -Math.PI * 2 * (1 - E.outC(p)), s: lerp(.25, 1, E.outBack(p, .8)), sx: 1 + sq, sy: 1 - sq, alpha: clamp(p / .2) });
      }
    }
  });
})();
