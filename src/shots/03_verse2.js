// 03_verse2.js — THE LOOP (24.25 – 31.42, instrumental) + VERSE 2 (31.42 – 47.53): "Medicine moves as the evidence
// grows ... Then choose the next step. D-X-O." Also defines the D-X-O stamp sequence (dxo) reused in chorus 1.
'use strict';

// ── loop · 24.25 → 31.42  THE LOOP WHEEL (instrumental) ───────────────────────────────
// Six stations on a big circle. Camera whips station→station on each beat (lap 1), then on
// half-beats (lap 2) incl. a branch that tries a route and retracts, then pulls back to reveal the loop.
const WR = 1250;
// each station is a 2-pose limited animation: pose → poseB on the off-beat (lap 1) / the 16th (lap 2)
const STATIONS = [
  { lab: 'ask', pose: 'hyp_raisehand', h: 520, poseB: 'pa_hyp_shout', hB: 450, col: PAL.lemon, card: '?' },
  { lab: 'guess', pose: 'pa_hyp_think', h: 470, poseB: 'hyp_present', hB: 500, col: '#f3e39a', card: 'bulb' },
  { lab: 'choose a test', pose: 'tc_fan', h: 560, poseB: 'tc_slap', hB: 560, col: '#bfe0d6', card: 'tube' },
  { lab: 'result', pose: 'gk_walk', h: 470, poseB: 'gk_stand', hB: 520, col: '#cfdcef', card: 'heart' },
  { lab: 'doubt', pose: 'chal_lean', h: 520, poseB: 'pa_chal_doubt', hB: 600, col: '#f6c2b0', card: 'cross' },
  { lab: 'update', pose: 'ck_tick', h: 540, poseB: 'ck_cheer', hB: 560, col: '#dccdea', card: 'tick' },
];
const stAng = i => -Math.PI / 2 + i * Math.PI * 2 / 6;
const stPos = (i, r = WR) => [Math.cos(stAng(i)) * r, Math.sin(stAng(i)) * r];
const LOOP_HIT = beat(36);
const LOOP_T0 = LOOP_HIT - .001;
const LOOP_FPS = 24, LOOP_FRAME = 1 / LOOP_FPS, LOOP_LEAD = 2 * LOOP_FRAME, LOOP_SETTLE = .14;
const LOOP_DOUBLE_LEAD = 1.5 * LOOP_FRAME, LOOP_DOUBLE_SETTLE = .06, LOOP_DOUBLE_OVER = .012;
const loopFrameHit = n => Math.floor(beat(n) / LOOP_FRAME) * LOOP_FRAME;
const loopHit = n => n <= 41 ? loopFrameHit(n) : beat(n);
// steady pulse on the measured beat map: lap 1 on the quarters (36–41), lap 2 rattles round on the 8ths (41.5–44),
// then the wheel ratchets back: CHAIN OF on 44, DEBATE on the band's big hit (45), held into the next verse.
const loopSched = [36, 37, 38, 39, 40, 41, 41.5, 42, 42.5, 43, 43.5, 44].map(loopHit);
const LOOP_DOUBLE_START = loopHit(41.5);
const LOOP_PULL_START = loopHit(43), LOOP_PULL = loopHit(43.5), T_CHAIN = loopHit(44), T_DEBATE = loopHit(45);
const loopIsDouble = hit => hit >= LOOP_DOUBLE_START - .001;
const loopLeadFor = hit => loopIsDouble(hit) ? LOOP_DOUBLE_LEAD : LOOP_LEAD;
function loopArrive(t, hit, lead = LOOP_LEAD, settle = LOOP_SETTLE, over = .035) {
  if (t < hit - lead) return 0;
  if (t < hit) return E.inC(prog(t, hit - lead, hit));
  const s = prog(t, hit, hit + settle), o = Math.sin(Math.PI * s);
  return 1 + over * o * o * (1 - s);
}
const loopDrawIn = (t, hit, lead = loopLeadFor(hit)) => t < hit - lead ? 0 : t < hit ? E.inC(prog(t, hit - lead, hit)) : 1;
function loopCamIndex(t) {
  let idx = 0;
  for (let j = 1; j < loopSched.length; j++) {
    const tj = loopSched[j], calm = loopIsDouble(tj), lead = loopLeadFor(tj);
    if (t >= tj - lead) idx = j - 1 + loopArrive(t, tj, lead, calm ? LOOP_DOUBLE_SETTLE : LOOP_SETTLE, calm ? LOOP_DOUBLE_OVER : .035);
  }
  return idx;
}
shot('loop', LOOP_T0, (t) => {
  // pull back before the title so the full round table is visible before the sign grows from its centre
  const cl = (tt) => loopArrive(tt, LOOP_PULL, LOOP_PULL - LOOP_PULL_START, .12, .018);
  const pull = clamp(cl(t), 0, 1.04), pullz = Math.min(1, pull);
  const ci = loopCamIndex(t), a = stAng(ci);
  const camP = [Math.cos(a) * (WR + 230), Math.sin(a) * (WR + 230)];
  const zoom = Math.exp(lerp(Math.log(1.0), Math.log(.3), pullz)) * (1 + E.ioS(prog(t, T_DEBATE, 31.4)) * .055);
  const roll = -(a + Math.PI / 2) * (1 - pullz) - pull * Math.PI * 2;
  // once CHAIN OF DEBATE appears, the whole table turns slowly underneath the (upright) sign — a lazy-Susan of debate
  const spinU = Math.max(0, t - T_CHAIN), spin = spinU <= 0 ? 0 : .34 * (spinU - .35 * (1 - Math.exp(-spinU / .35)));
  const rollS = roll - spin;
  const camX = lerp(camP[0], 0, pull), camY = lerp(camP[1], 0, pull);
  bgCam(() => paperBG(STATIONS[Math.round(ci) % 6].col, .5 * (1 - pull) + .15), [camX, camY, zoom, rollS], { par: .9, over: 1.85 });
  X.save();
  cam(camX, camY, zoom, rollS);
  inkShape(ellPts(0, 0, WR + 30, WR + 30, 48), '#f9f0db', 6, 3, 700);
  X.save(); X.globalAlpha *= .25; X.setLineDash([16, 22]); X.strokeStyle = PAL.ink; X.lineWidth = 4; X.beginPath(); X.arc(0, 0, WR - 200, 0, 7); X.stroke(); X.restore();
  // thread grows round the ring station by station
  const ringFade = 1 - .55 * E.outC(prog(t, T_CHAIN - .16, T_DEBATE + .2));
  const ringPts = (from, to) => { const out = []; for (let s = 0; s <= 24; s++) { const an = lerp(stAng(from), stAng(to), s / 24); out.push([Math.cos(an) * (WR - 40), Math.sin(an) * (WR - 40)]); } return out; };
  let path = [];
  for (let j = 1; j < loopSched.length; j++) {
    const k = loopDrawIn(t, loopSched[j]);
    if (k <= 0) break;
    path = path.concat(k >= 1 ? ringPts(j - 1, j) : ptrim(ringPts(j - 1, j), Math.max(.01, k)));
    if (k < 1) break;
  }
  const closeK = loopDrawIn(t, LOOP_PULL, LOOP_PULL - LOOP_PULL_START);
  if (closeK > 0) path = path.concat(ptrim(ringPts(11, 12), Math.max(.01, closeK)));
  if (path.length > 1) thread(path, { w: 16 });
  // branch in lap 2 at "choose a test": try an outward route, then retract
  const bt0 = loopSched[8], bk = Math.sin(clamp((t - bt0) / .6) * Math.PI);
  if (bk > 0) { const p = stPos(2, WR - 40); thread(spline([p, [p[0] * .8, p[1] * .8 + 120], [p[0] * .6 - 100, p[1] * .6 + 60]]), { k: bk, w: 13, tip: true }); }
  STATIONS.forEach((st, i) => {
    const an = stAng(i);
    let hit = null; loopSched.forEach((tj, j) => { if (j % 6 === i && t >= tj) hit = tj; });
    const hitCalm = hit != null && loopIsDouble(hit);
    const hk = hit != null ? kick(t - hit, hitCalm ? 12 : 7) * (hitCalm ? .35 : 1) : 0;
    X.save(); X.globalAlpha *= ringFade; X.translate(...stPos(i, WR + 20)); X.rotate(an + Math.PI / 2);
    const s1 = loopSched[i], s2 = loopSched[6 + i];
    const seq = [[0, 0], [s1 + (loopSched[i + 1] ? (loopSched[i + 1] - s1) / 2 : BEAT / 2), 1], [s2, 0], [beat(beatAt(s2) + .25), 1], [LOOP_PULL, 0], [T_CHAIN, 1], [T_DEBATE, 0], [beat(45.5), 1], [beat(46), 0], [beat(46.5), 1], [beat(47), 0]];
    const b = IMG[st.poseB] ? paPick(t, seq) : 0, sq = paSq(paSince(t, seq), t >= LOOP_DOUBLE_START && t < T_CHAIN + .2 ? .035 : .1);
    spr(b ? st.poseB : st.pose, 0, -10 - hk * 40, (b ? st.hB : st.h) * (1 + hk * .08), { shadow: 1, seed: i * 5, sx: sq.sx, sy: sq.sy });
    if (t > LOOP_PULL + .1 && t < T_DEBATE + .9) paStars(0, -(b ? st.hB : st.h) - 40, LOOP_PULL + .1 + i * .03, t);
    if (i === 2) {                                        // TEST station: a fan of different investigations, new hand on lap 2
      const fan = t >= loopSched[8] ? ['dna', 'mri', 'slide'] : ['ct', 'flask', 'xray'];
      fan.forEach((g, m) => card(st.h * .45 + 30 + m * 70, -st.h * .42 - (m === 1 ? 30 : 0), { w: 140, h: 180, glyph: g, rot: (m - 1) * .28 + .1, seed: 40 + m + (fan[0] === 'dna' ? 9 : 0), s: 1 + hk * .25 * (m === 1 ? 1 : .6) }));
    } else if (!(st.card === '?' && t >= T_CHAIN)) card(st.h * .45 + 60, -st.h * .45, { w: 160, h: 200, glyph: st.card, rot: .12, seed: 40 + i, s: 1 + hk * .25 });
    X.restore();
  });
  if (t >= T_CHAIN) {
    // The title starts as a tabletop card, then grows smoothly after DEBATE joins it.
    const titleAppear = .9 + .1 * E.outC(prog(t, T_CHAIN, T_CHAIN + .10));
    const chainAlpha = .94 + .06 * E.outC(prog(t, T_CHAIN, T_CHAIN + .08));
    const debateAlpha = t >= T_DEBATE ? .94 + .06 * E.outC(prog(t, T_DEBATE, T_DEBATE + .08)) : 0;
    const titleGrow = E.ioS(prog(t, T_CHAIN, 31.4));
    const titleS = lerp(.86, 2.55, titleGrow);
    X.save(); X.rotate(-rollS); X.translate(0, lerp(0, 60, titleGrow)); X.scale(titleS, titleS);
    card(0, 0, { w: 820, h: 420, stock: '#fbf5e6', lines: false, seed: 77, rot: -.02, shadow: 1.3, alpha: titleAppear });
    X.save(); X.globalAlpha *= titleAppear;
    [[-330, -150], [330, -150]].forEach(([x, y]) => tack(x, y, 1.05, { pressed: E.outC(prog(t, T_CHAIN, T_CHAIN + .08)) }));
    word('CHAIN OF', 0, -48, 120, { col: PAL.ink, rot: -.025, alpha: chainAlpha, bake: true, ax: .5, seed: 77 });
    word('DEBATE', 0, 128, 150, { col: PAL.red, edge: true, rot: .015, alpha: debateAlpha, bake: true, ax: .5, seed: 78 });
    X.restore();
    X.restore();
  }
  X.restore();
  // station labels: screen-space, upright, ≥130px; each rides in with its whip and slides out with the next
  const LBL = { ask: ['ASK'], guess: ['GUESS'], 'choose a test': ['CHOOSE', 'A TEST'], result: ['RESULT'], doubt: ['DOUBT'], update: ['UPDATE'] };
  const labelFade = 1 - E.outC(prog(t, LOOP_PULL_START, LOOP_PULL));
  if (labelFade > .01 && t < T_CHAIN - .02) for (let j = Math.max(0, Math.floor(ci)); j <= Math.min(11, Math.ceil(ci)); j++) {
    const off = (j - ci) * 1500, lines = LBL[STATIONS[j % 6].lab], tj = loopSched[j], pk = t >= tj ? kick(t - tj, loopIsDouble(tj) ? 14 : 10) * (loopIsDouble(tj) ? .35 : 1) : 0;
    const firstAsk = j === 0 && t >= LOOP_T0 && t < loopSched[0] + .36;
    lines.forEach((ln, m) => word(ln, firstAsk ? 610 : 650 + off, firstAsk ? 430 : (lines.length > 1 ? 470 : 540) + m * 150, firstAsk ? 190 : 136,
      { ax: firstAsk ? .5 : 1, col: m === lines.length - 1 ? PAL.red : PAL.ink, edge: m === lines.length - 1, rot: firstAsk ? -.025 : -.04, s: 1 + pk * (firstAsk ? .06 : .12), alpha: labelFade, seed: j }));
  }
  // pull-back reveal: all six labels upright around the wheel (inside the ring), tracking it as it spins
  if (pull > .35) {
    const zoomS = zoom, ca = Math.cos(roll), sa = Math.sin(roll), cx0 = lerp(camP[0], 0, pull), cy0 = lerp(camP[1], 0, pull);
    STATIONS.forEach((st, i) => {
      const p = stPos(i, WR - (i % 3 === 0 ? 250 : 170)), dx = p[0] - cx0, dy = p[1] - cy0;
      const sx = 960 + zoomS * (ca * dx - sa * dy), sy = 540 + zoomS * (sa * dx + ca * dy);
      const lines = LBL[st.lab], a = E.outC(prog(pull, .35 + i * .05, .6 + i * .05)) * 0;
      lines.forEach((ln, m) => word(ln, sx, sy + 22 + (m - (lines.length - 1) / 2) * 60, 62, { ax: .5, col: PAL.ink, alpha: a, seed: i }));
    });
  }
  const dci = loopCamIndex(t + 1 / 48) - ci;
  if (dci > .02 && pull < .2) POST.smear = [dci * 2400 * (t >= LOOP_DOUBLE_START - LOOP_DOUBLE_LEAD ? .38 : 1), 0];
  else { const dr = (cl(t + 1 / 48) - cl(t)) * Math.PI * 2; if (Math.abs(dr) > .01) POST.smear = [dr * 900, dr * 300]; }
});

// ── vine · 31.42 → 36.33  "Medicine moves as the evidence grows, / Each answer can change where the next step goes." ──
const VW4 = LINES[4].words, VW5 = LINES[5].words;
const V_MED = VW4[0][1], V_MOVES = VW4[1][1], V_AS = VW4[2][1], V_THE = VW4[3][1], V_EVID = VW4[4][1], V_GROWS = VW4[5][1];
const V_EACH = VW5[0][1], V_ANSWER = VW5[1][1], V_CAN = VW5[2][1], V_CHANGE = VW5[3][1], V_WHERE = VW5[4][1], V_THE2 = VW5[5][1], V_NEXT = VW5[6][1], V_STEP = VW5[7][1], V_GOES = VW5[8][1];
const VINE = [
  { pts: [[960, 1150], [940, 900], [1000, 700], [930, 520], [980, 330], [960, 150]], t0: V_MED, t1: V_GROWS },
  { pts: [[975, 760], [1180, 680], [1350, 560], [1560, 520]], t0: V_MOVES, t1: beat(49) },
  { pts: [[940, 600], [740, 540], [560, 420], [380, 400]], t0: V_THE, t1: V_GROWS },
  { pts: [[1560, 520], [1700, 380], [1760, 230]], t0: V_GROWS, t1: beat(51) },
  { pts: [[380, 400], [260, 300], [230, 170]], t0: V_EACH, t1: V_CHANGE },
  { pts: [[965, 330], [1150, 260], [1290, 250], [1260, 120], [1100, 70]], t0: V_CAN, t1: V_THE2 },
  { pts: [[930, 520], [760, 760], [600, 860], [420, 900]], t0: V_WHERE, t1: V_STEP, die: beat(54.5) },
];
// climber's grip height over time (world y), quantised to 8ths in the shot
// below the top-left lyric until it clears (33.7), a 16th-note scramble, then above the bottom-right lyric
const PA_CLIMB = [[V_MED, 1320], [V_EVID, 1010], [V_EACH, 700], [V_CHANGE, 215], [V_STEP, 160], [36.4, 160]];
const VINE_WRONG_HIT = beat(54), VINE_WRONG_YANK = beat(54.5);
shot('vine', 31.42, (t) => {
  const sway = Math.sin(t * 1.3) * 6;
  // tilt down from the sky into the vine (continuing DEBATE's spin as a vertical whip), then a slow rise up the trunk
  const ent = E.outC(prog(t, 31.42, 31.78)), ent2 = E.outC(prog(t + 1 / 48, 31.42, 31.78));
  const vc = [960, lerp(640, 540, E.ioS(prog(t, 31.42, 36.3))) - 700 * (1 - ent), lerp(1.12, 1, E.outC(prog(t, 31.42, 33))) * (1 + .12 * (1 - ent)), .04 * (1 - ent)];
  bgCam(() => paperBG('#dfeccd', .65), vc, { par: .9, over: 2.2 });
  X.save(); cam(...vc);
  if (ent2 - ent > .002) POST.smear = [0, (ent2 - ent) * 700 * 2.4];
  VINE.forEach((b, i) => {
    let k = E.outC(prog(t, b.t0, b.t1));
    if (b.die) k *= 1 - E.inQ(prog(t, b.die, b.die + .4));
    if (k <= 0) return;
    const wrong = !!b.die, wig = wrong && t >= VINE_WRONG_HIT ? Math.sin((t - VINE_WRONG_HIT) * 48) * kick(t - VINE_WRONG_HIT, 5) * 34 : 0;
    const pts = spline(b.pts.map((p, j) => [p[0] + sway * j * .3 + wig * (j / Math.max(1, b.pts.length - 1)), p[1] + (wrong ? Math.sin((t - VINE_WRONG_HIT) * 42 + j) * Math.abs(wig) * .18 : 0)]), 14);
    thread(pts, { k, w: i ? 11 : 15, tip: true });
    if (i && k > .97 && !b.die) { const e = b.pts[b.pts.length - 1]; const bl = pop(t, b.t1, 3.5, .4); card(e[0] + sway, e[1] - 40, { w: 110 * bl, h: 140 * bl, glyph: ['dna', 'flask', 'ct', 'slide', 'xray', 'mri'][i % 6], rot: (hash(i) - .5) * .4, seed: 60 + i }); tack(e[0] + sway, e[1] - 100 * bl, .8 * bl); }
    if (b.die && t > b.t1 - .22) {
      const e = b.pts[b.pts.length - 1], bump = t >= VINE_WRONG_HIT ? kick(t - VINE_WRONG_HIT, 9) : 0, yank = E.inQ(prog(t, VINE_WRONG_YANK, VINE_WRONG_YANK + .34));
      const bl = E.outBack(prog(t, b.t1 - .22, VINE_WRONG_HIT), 1.4) * (1 + bump * .18) * vanish(t, VINE_WRONG_YANK + .34, .28);
      card(e[0] + sway + wig - yank * 95, e[1] - 42 + yank * 470 - bump * 18, { w: 112 * bl, h: 142 * bl, glyph: 'cross', rot: -.12 + Math.sin((t - VINE_WRONG_HIT) * 36) * bump * .45 - yank * .8, seed: 77, alpha: bl });
      if (t > VINE_WRONG_HIT && t < VINE_WRONG_YANK + .18) {
        const a = vanish(t, VINE_WRONG_YANK + .08, .16);
        X.save(); X.globalAlpha *= a; X.translate(e[0] + sway + 92, e[1] - 92); X.rotate(-.1);
        word('oops', 0, 0, 42, { font: 'SHm', ax: .5, col: PAL.inkSoft, seed: 78 });
        inkLine([[-64, 24], [-42, 8], [-18, 18], [4, 2]], 3, PAL.red, .65, 79);
        X.restore();
      }
    }
  });
  card(960, 1120, { w: 220, h: 170, glyph: '?', seed: 80 });
  // Hypothesis climbs the growing trunk hand over hand — one pull per 8th, the two climb drawings alternating —
  // staying under the top-left lyric until it clears, then up to the crown by "the next step goes."
  {
    const scr = t >= V_EACH - .12 && t < V_CHANGE, grid = scr ? 4 : 2, b0 = Math.floor(beatAt(scr ? V_EACH - .12 : V_MED) * grid) / grid;
    const n = Math.max(0, Math.floor((beatAt(t) - b0) * grid)), ta = beat(b0 + n / grid), tb = beat(b0 + (n + 1) / grid), K = PA_CLIMB;
    const gy = (tt) => { for (let j = 1; j < K.length; j++) if (tt < K[j][0]) return lerp(K[j - 1][1], K[j][1], E.ioS(prog(tt, K[j - 1][0], K[j][0]))); return K[K.length - 1][1]; };
    const y = lerp(gy(ta), gy(tb), E.outC(prog(t, ta, ta + (tb - ta) * .55)));
    const trunk = spline(VINE[0].pts.map((p, j) => [p[0] + sway * j * .3, p[1]]), 14);
    let x = trunk[0][0];
    for (let j = 1; j < trunk.length; j++) if (trunk[j][1] <= y) { x = lerp(trunk[j - 1][0], trunk[j][0], (trunk[j - 1][1] - y) / ((trunk[j - 1][1] - trunk[j][1]) || 1)); break; }
    const top = t >= wt(5, -1), pose = top ? 'hyp_cheer' : n % 2 ? 'pa_hyp_climb_b' : 'pa_hyp_climb_a', sq = paSq(top ? t - wt(5, -1) : t - ta, top ? .14 : .06);
    if (top) spr(pose, 985, 338 - kick(t - wt(5, -1), 7) * 60, 300, { seed: 7, sx: sq.sx, sy: sq.sy, shadow: 1 });   // hops up onto the fork
    else spr(pose, x, y, 370, { ax: .885, ay: .04, seed: 7, sx: sq.sx, sy: sq.sy, rot: Math.sin(t * 3) * .03 });
  }
  X.restore();
  // each word tears in on its own paper strip, sized to the word
  const TP = '#fbf3df';
  X.save(); X.globalAlpha *= vanish(t, 33.7, .15);
  o12Row([['MEDICINE', V_MED], ['MOVES', V_MOVES, { col: PAL.red, edge: true, size: 165 }]], 70, 300, 140, { align: 'left', maxW: 980, tape: TP });
  o12Row([['as', V_AS, { size: 92, col: PAL.inkSoft, font: 'FBo' }], ['the', V_THE, { size: 92, col: PAL.inkSoft, font: 'FBo' }], ['EVIDENCE', V_EVID], ['GROWS,', V_GROWS, { col: '#3c8a5c', edge: true, size: 155 }]], 70, 480, 130, { align: 'left', maxW: 1300, tape: TP });
  X.restore();
  X.save(); X.globalAlpha *= vanish(t, 36.25, .1);
  o12Row([['EACH', V_EACH], ['ANSWER', V_ANSWER], ['CAN', V_CAN]], 1850, 700, 130, { align: 'right', maxW: 1040, tape: TP });
  o12Row([['CHANGE', V_CHANGE, { col: PAL.red, edge: true, size: 175 }], ['WHERE', V_WHERE]], 1850, 870, 130, { align: 'right', maxW: 1160, tape: TP });
  o12Row([['the', V_THE2, { size: 88, font: 'FBo', col: PAL.inkSoft }], ['NEXT', V_NEXT, { size: 110 }], ['STEP', V_STEP, { size: 110, lead: 0 }], ['GOES.', V_GOES, { size: 125, col: PAL.red, edge: true }]], 1850, 1025, 110, { align: 'right', maxW: 1330, tape: TP });
  X.restore();
});

// ── breadth · 36.33 → 38.81  "Breadth across medicine, depth down each thread," ───────────
const SPECS = ['heart', 'xray', 'drop', 'dna', 'tube', 'slide', 'steth', 'mri', 'thermo', 'flask', 'ct', 'pill', 'bulb', 'tick', 'cross', '?'];
shot('breadth', 36.33, (t) => {
  const dive = E.io(prog(t, 37.5, 38.75));
  const pan = E.io(prog(t, 36.33, 37.45)), camx = lerp(-1200, 4200, pan);
  if (t < 37.5) {
    bgCam(() => paperBG('#f5e3b8', .6), [camx, 540, 1, 0], { par: .88, over: 4.1 });
    X.save(); cam(camx, 540, 1);
    for (let i = -14; i < 40; i++) {
      const x = i * 210, y = 560 + Math.sin(i * 1.7) * 40;
      card(x, y, { w: 170, h: 220, glyph: SPECS[(i + 50) % SPECS.length], rot: (hash(i + 5) - .5) * .2, seed: 90 + i });
      tack(x, y - 92, .9);
    }
    thread(Array.from({ length: 60 }, (_, i) => [-3000 + i * 150, 468 + Math.sin(i * .9) * 8]), { w: 10 });
    X.restore();
    // Test-Chooser rides the line right across medicine, tracked by the camera (stays sharp through the whip)
    paCrisp(() => {
      const enter = E.outC(prog(t, 36.33, 36.66)), exit = E.inQ(prog(t, 37.18, 37.5)), acc = kick(t - 36.33, 3);
      const zx = lerp(-380, 760, enter) + Math.sin((t - 36.33) * 2.6) * 60 + exit * 1500;
      const swing = -.32 * acc - .1 + Math.sin((t - 36.33) * 9) * .06 + exit * -.15;
      spr('pa_tc_zip', zx, 472, 450, { ax: .56, ay: .04, rot: swing, seed: 9 });
      X.save(); X.translate(zx, 462); X.rotate(t * 30);
      inkShape(ellPts(0, 0, 20, 20, 10), PAL.brass, 4, .5, 960); inkLine([[-14, 0], [14, 0]], 3); X.restore();
    });
    const v = lerp(-1200, 4200, E.io(prog(t + 1 / 48, 36.33, 37.45))) - camx;
    if (v > 4) POST.smear = [-v * 1.2, 0];
    const k = E.outC(prog(t, 36.33, 36.6)), bw = measure('BREADTH', 200, 'FB');
    X.save(); X.translate(960, 250); X.scale(lerp(.3, 1700 / bw, k), 1);
    word('BREADTH', 0, 0, 200, { ax: .5, col: PAL.red, edge: true });
    X.restore();
    o12Row([['across', 36.79, { size: 90, font: 'FBo', col: PAL.inkSoft }], ['MEDICINE,', 37.05]], 960, 960, 150);
  } else {
    const cy = lerp(-200, 4200, dive);
    bgCam(() => paperBG('#e9d2a7', .6), [1160, cy, 1, 0], { par: .88, over: 4.2 });
    X.save(); cam(1160, cy, 1);
    thread(Array.from({ length: 40 }, (_, i) => [960 + Math.sin(i * .7) * 14, -800 + i * 160]), { w: 14 });
    for (let j = 0; j < 22; j++) { const y = j * 230, side = j % 2 ? 1 : -1; card(960 + side * (190 + hash(j) * 60), y, { w: 200, h: 150, glyph: SPECS[j % SPECS.length], rot: side * .15, seed: 120 + j, lines: false }); tack(960, y - 40, .9); }
    X.restore();
    const v = lerp(-200, 4200, E.io(prog(t + 1 / 48, 37.5, 38.75))) - cy;
    if (v > 4) POST.smear = [0, -v * 1.2];
    // Challenger fireman-slides down the thread with the dive, then overshoots out the bottom on "thread,"
    paCrisp(() => {
      const tx = 960 - 1160 + 960 + Math.sin(t * 9) * 4;
      const sy = lerp(-700, 250, E.outC(prog(t, 37.5, 37.8))) + Math.sin((t - 37.5) * 5) * 30 + E.inQ(prog(t, 38.33, 38.8)) * 1300;
      spr('pa_chal_slide', tx, sy, 560, { ax: .58, ay: .04, seed: 14, rot: Math.sin(t * 6) * .03, sx: 1 + kick(t - 37.59, 8) * .08, sy: 1 - kick(t - 37.59, 8) * .08 });
    });
    'DEPTH'.split('').forEach((ch, i) => slam(ch, 300, 170 + i * 180, 190, 37.57 + i * .06, { col: PAL.red, edge: true, from: 1.3 }));
    o12Row([['down', 37.88, { size: 92, font: 'FBo', col: PAL.inkSoft }], ['EACH', 38.12]], 1850, 500, 140, { align: 'right', maxW: 620 });
    o12Row([['THREAD,', 38.33, { col: PAL.red, edge: true }]], 1850, 690, 170, { align: 'right', maxW: 620 });
  }
});

// ── lifetime · 38.81 → 41.21  "More than one lifetime could pack in one head." ───────────
// hyp_lid split in two by a clip polygon (image px): the hair lid rotates about its hinge
const PA_LID = { W: 931, H: 1430, hinge: [240, 508], shut: 1.0,
  poly: [[-80, -80], [470, -80], [432, 100], [300, 400], [262, 486], [232, 534], [-80, 536]] };
function paLidHyp(x, y, h, ang, seed) {
  const L = PA_LID, k = h / L.H, poly = () => L.poly.forEach((p, i) => i ? X.lineTo(p[0], p[1]) : X.moveTo(p[0], p[1]));
  X.save(); X.translate(x - L.W * k / 2, y - h); X.scale(k, k);
  X.save(); X.beginPath(); X.rect(-300, -300, L.W + 600, L.H + 600); poly(); X.closePath(); X.clip('evenodd');
  spr('hyp_lid', L.W / 2, L.H, L.H, { seed }); X.restore();
  X.save(); X.translate(...L.hinge); X.rotate(ang); X.translate(-L.hinge[0], -L.hinge[1]);
  X.beginPath(); poly(); X.closePath(); X.clip(); spr('hyp_lid', L.W / 2, L.H, L.H, { seed }); X.restore();
  X.restore();
}
shot('lifetime', 38.81, (t) => {
  bgCam(() => paperBG('#f6ddb0', .7), [960, 540, 1, 0], { par: .9, over: 1.15 });
  const shut = 40.82, hx = 1520, hy = 1090;
  for (let i = 0; i < 28; i++) {
    const ts = 39.0 + i * .062, k = E.inQ(prog(t, ts, ts + .45));
    if (k <= 0 || k >= 1 || t > shut) continue;
    const sx = 1980 + hash(i) * 200, sy = 100 + hash(i + 3) * 900;
    const x = lerp(sx, hx, k), y = lerp(sy, hy - 680, k) - Math.sin(k * Math.PI) * 300;
    if (i % 3 === 0) card(x, y, { w: 90, h: 120, glyph: SPECS[i % 10], rot: k * 8 + i, seed: 140 + i, shadow: 0 });
    else { X.save(); X.translate(x, y); X.rotate(k * 6 + i); inkShape(rectPts(-46, -30, 92, 60, 6, 2), [PAL.coral, PAL.teal, PAL.lemon, PAL.lilac, PAL.sage][i % 5], 4, .8, 150 + i); inkLine([[-38, -30], [-38, 30]], 4); X.restore(); }
  }
  const bump = kick(t - shut, 10), t8 = beat(Math.floor(beatAt(t) * 2) / 2), pour = t > 39.0 && t < 40.66;
  if (t < shut) {
    // the lid gobbles — snaps half-shut and springs back open on every 8th while the clues pour in — then slams on "head."
    const dt8 = t - t8, gob = pour ? .62 * E.outQ(prog(dt8, 0, .05)) * (1 - E.outBack(prog(dt8, .1, .26), 2.4)) : Math.sin(t * 2.4) * .06;
    const ang = lerp(gob, PA_LID.shut, E.inQ(prog(t, 40.62, shut)));
    paLidHyp(hx, hy + 20 + (pour ? kick(t - t8, 10) * 14 : 0), 860, ang, 3);
  } else {
    spr('hyp_cheer', hx, hy + 20, 860 * (1 + bump * .06), { sy: 1 - bump * .1, seed: 3 });
    const bp = pop(t, shut + .12, 3.4, .4);            // ...and the idea lights up
    if (bp > 0) { spr('bulb', hx - 20, hy + 20 - 860 - 10 - bp * 30, 190 * bp, { seed: 6, rot: Math.sin(t * 7) * .06 }); }
  }
  o12Row([['MORE', 38.81], ['THAN', 39.04]], 90, 250, 100, { font: 'FBo', col: PAL.inkSoft, align: 'left' });
  o12Row([['ONE', 39.30], ['LIFETIME', 39.50, { col: PAL.red, edge: true }]], 90, 450, 170, { align: 'left', maxW: 960 });
  o12Row([['could', 40.18], ['pack', 40.43], ['in', 40.55]], 90, 630, 96, { font: 'FBo', col: PAL.inkSoft, align: 'left' });
  o12Row([['ONE', 40.66], ['HEAD.', 40.82, { size: 210 }]], 90, 860, 170, { align: 'left', maxW: 960 });
});

// ── weigh · 41.21 → 44.20  "Weigh what each test adds, what it costs us to know," ─────
function scales(cx, cy, tilt, o = {}) {
  X.save(); X.translate(cx, cy);
  inkShape(rectPts(-18, -20, 36, 520, 8, 4), PAL.brass, 6, 1.5, 400);
  inkShape(rectPts(-160, 490, 320, 50, 18, 3), PAL.brass, 6, 1.5, 401);
  X.save(); X.rotate(tilt);
  inkShape(rectPts(-520, -22, 1040, 34, 14, 6), PAL.brass, 6, 1.5, 402);
  inkShape(ellPts(0, -6, 34, 34, 12), PAL.brassDk, 5, 1, 403);
  [-1, 1].forEach(sd => {
    X.save(); X.translate(sd * 490, 0); X.rotate(-tilt);
    inkLine([[0, 0], [-150, 300]], 4); inkLine([[0, 0], [150, 300]], 4);
    inkShape([[-210, 300], [210, 300], [160, 350], [-160, 350]], PAL.brass, 6, 1.2, 404 + sd);
    if (o.draw) o.draw(sd);
    X.restore();
  });
  X.restore(); X.restore();
}
window.scales = scales;
// Scales rig from the hand-drawn prop_scales sprite (image px): static pole/base, a beam that tilts about the hub,
// and two pans that hang plumb from the beam ends. fill(side) draws into a pan (pan-local px; rim centre ≈ (0, 0)).
const SC_IMG = { W: 2028, H: 1732, piv: [1009, 418], hang: [[391, 482], [1634, 482]], rim: [[393, 1190], [1636, 1190]] };
function scalesRig(x, y, h, tilt, fill, o = {}) {
  const k = h / SC_IMG.H, P = SC_IMG.piv;
  const beamR = [280, 340, 1460, 142], panR = [[20, 482, 750, 865], [1260, 482, 750, 865]];
  const draw = () => spr('scales', SC_IMG.W / 2, SC_IMG.H, SC_IMG.H, { seed: 5 });
  X.save(); X.translate(x - SC_IMG.W * k / 2, y - h); X.scale(k, k);
  X.save(); X.beginPath(); X.rect(-200, -200, SC_IMG.W + 400, SC_IMG.H + 400); X.rect(...beamR); panR.forEach(r => X.rect(...r)); X.clip('evenodd'); draw(); X.restore();
  X.save(); X.translate(...P); X.rotate(tilt); X.translate(-P[0], -P[1]); X.beginPath(); X.rect(...beamR); X.clip(); draw(); X.restore();
  [0, 1].forEach(sd => {
    const [hx, hy] = SC_IMG.hang[sd], c = Math.cos(tilt), s = Math.sin(tilt);
    const nx = P[0] + (hx - P[0]) * c - (hy - P[1]) * s, ny = P[1] + (hx - P[0]) * s + (hy - P[1]) * c;
    const sideSwing = (o.panSwing && o.panSwing[sd]) || 0;
    const sw = Math.sin(T * 2.3 + sd) * .015 - tilt * .25 + sideSwing;
    X.save(); X.translate(nx, ny); X.rotate(sw); X.translate(-hx, -hy);
    shadowBlob(SC_IMG.rim[sd][0], SC_IMG.rim[sd][1] + 72, 245, 34, (o.panShadow ?? .14) + Math.abs(sideSwing) * .55);
    X.save(); X.beginPath(); X.rect(...panR[sd]); X.clip(); draw(); X.restore();
    const lag = sideSwing * 170;
    inkLine([[hx, hy + 8], [hx - 150 - lag, hy + 296]], 5.5, PAL.inkSoft, .65, 1320 + sd);
    inkLine([[hx, hy + 8], [hx + 150 - lag, hy + 296]], 5.5, PAL.inkSoft, .65, 1330 + sd);
    if (fill) { X.save(); X.translate(...SC_IMG.rim[sd]); fill(sd); X.restore(); }
    X.restore();
  });
  X.restore();
}
window.scalesRig = scalesRig;
function moneyBag(x, y, s) {
  X.save(); X.translate(x, y); X.scale(s, s);
  inkShape([[-120, 0], [-150, -90], [-110, -190], [-46, -232], [-60, -282], [60, -282], [46, -232], [110, -190], [150, -90], [120, 0]], '#c9a46a', 9, 2, 1201);
  inkLine([[-60, -236], [60, -236]], 12, PAL.inkSoft, 1.5, 1202);
  word('$', 0, -60, 170, { ax: .5, col: '#3c8a5c', font: 'FB', seed: 2, bake: true });
  X.restore();
}
function scalePuff(x, y, t, t0, s = 1, seed = 0) {
  if (t < t0 || t > t0 + .42) return;
  const k = E.outC(prog(t, t0, t0 + .36)), a = vanish(t, t0 + .18, .26);
  X.save(); X.globalAlpha *= .62 * a;
  for (let i = 0; i < 7; i++) {
    const side = i % 2 ? 1 : -1, off = (i - 3) * 32 * s;
    inkShape(ellPts(x + side * (50 + k * 150) * s + off, y + 24 * s - k * 54 * s + Math.sin(i) * 16 * s,
      (22 + i * 2) * (1 - k * .45) * s, (12 + i) * (1 - k * .35) * s, 9), '#ead6b2', 2.6 * s, .75, seed + i * 11);
  }
  X.restore();
}
function scaleBurst(x, y, t0, o = {}) {
  const dt = T - t0; if (dt < 0 || dt > .34) return;
  const k = E.outC(dt / .28), a = 1 - clamp((dt - .12) / .22), n = o.n ?? 9, r = o.r ?? 150;
  X.save(); X.globalAlpha *= a;
  for (let i = 0; i < n; i++) {
    const an = (o.a0 ?? -Math.PI * .9) + i / Math.max(1, n - 1) * (o.arc ?? Math.PI * .8);
    const r0 = r * (.28 + k * .62), r1 = r0 + r * .44 * (1 - k * .35);
    inkLine([[x + Math.cos(an) * r0, y + Math.sin(an) * r0], [x + Math.cos(an) * r1, y + Math.sin(an) * r1]], o.w ?? 7, o.col ?? PAL.ink, .35, 1240 + i);
  }
  X.restore();
}
const PA_ST_H = { st_scales: 640, pa_st_think: 640, st_wink: 640, pa_st_shock: 700 };
shot('weigh', 41.21, (t) => {
  const addT = 42.43, costT = 43.48, coinT = [42.95, 43.11, 43.26, 43.37], knowT = 44.02;
  // beam: level and bobbing on the beat → tips left as the test lands on "adds" → slammed right by the bag on "costs"
  const nb = beatAt(t);
  let tilt = Math.sin(nb * Math.PI) * .02 * (t < addT ? 1 : 0);
  if (t > addT) tilt -= .16 * spring(t - addT, 2.2, .3);
  coinT.forEach((c, i) => { if (t > c) tilt += .045 * spring(t - c, 3, .4); });
  if (t > costT) tilt += .5 * spring(t - costT, 2.0, .24) + Math.sin((t - costT) * 36) * .05 * vanish(t, costT + .5, .45);
  if (t > addT) tilt += Math.sin((t - addT) * 28) * .016 * vanish(t, addT + .55, .35);
  const shake = (t > costT ? kick(t - costT, 8) * 24 : 0) + (t > addT ? kick(t - addT, 10) * 5 : 0);
  const wz = lerp(1.06, 1.0, E.ioS(prog(t, 41.2, 44.2))) * (1 + (t > costT ? kick(t - costT, 7) * .04 : 0));
  X.save(); X.translate(wob(t, 71, shake), wob(t, 72, shake));
  bgCam(() => paperBG('#efe0b4', .7), [900, 560, wz, 0], { par: .9, over: 1.22 });
  cam(900, 560, wz);
  shadowBlob(860, 906, 330, 26, .18);
  const panSwing = [
    (t > addT ? -Math.sin((t - addT) * 18) * .075 * vanish(t, addT + .7, .55) : 0) + (t > costT ? -Math.sin((t - costT) * 16) * .035 * vanish(t, costT + .75, .6) : 0),
    (t > costT ? Math.sin((t - costT) * 20) * .16 * vanish(t, costT + .78, .68) : 0) + coinT.reduce((a, c) => a + (t > c ? Math.sin((t - c) * 22) * .028 * vanish(t, c + .42, .26) : 0), 0)
  ];
  const fly = t > costT + .02;                            // the test card gets catapulted out on "costs"
  const drop = E.outBack(prog(t, 41.21 - .16, 41.21 + .1), 1.8), dsq = t > 41.21 ? kick(t - 41.21, 12) * .08 : 0;
  X.save(); X.translate(860, 910); X.scale(1 + dsq, 1 - dsq); X.translate(-860, -910 + (1 - Math.min(1, drop)) * -900);
  scalesRig(860, 910, 700, tilt, (sd) => {
    if (sd === 0 && t > addT - .28 && !fly) {
      const k = E.inQ(prog(t, addT - .28, addT)), b = t > addT ? kick(t - addT, 10) * 22 : 0;
      card(0, lerp(-1500, -125, k) - b, { w: 300, h: 220, glyph: 'ct', lines: false, seed: 170, rot: lerp(1.2, -.06, k) });
      scalePuff(0, 70, t, addT, .7, 1160);
    }
    if (sd === 1) {
      coinT.forEach((c, i) => {
        if (t < c - .2) return;
        const k = E.inQ(prog(t, c - .2, c)), x = (i - 1.5) * 85, yy = -26 - (i % 2) * 22;
        X.save(); X.translate(x, lerp(-1400, yy, k) - (t > c ? kick(t - c, 14) * 18 : 0));
        inkShape(ellPts(0, 0, 58, 22, 14), PAL.brass, 6, 1, 1180 + i); inkShape(ellPts(0, -6, 40, 13, 12), '#f1c95c', 0, .8, 1190 + i); X.restore();
      });
      if (t > costT - .22) { const k = E.inC(prog(t, costT - .22, costT)), sq = t > costT ? kick(t - costT, 12) * .34 : 0; X.save(); X.scale(1 + sq, 1 - sq); moneyBag(0, lerp(-1600, -30, k), 1.25); X.restore(); }
      scalePuff(0, 52, t, costT, 1.25, 1208);
      scaleBurst(0, -72, costT, { n: 8, r: 190, w: 8, a0: -Math.PI * .9, arc: Math.PI * .8, col: PAL.redDk });
    }
  }, { panSwing, panShadow: .18 });
  scalePuff(1160, 760, t, costT, .92, 1430);
  scaleBurst(1160, 690, costT, { n: 7, r: 120, w: 6, a0: -Math.PI * .96, arc: Math.PI * .9, col: PAL.inkSoft });
  // catapult: the card arcs over to Stewardship and lands on her head on "know"
  if (fly) {
    const u = prog(t, costT + .02, knowT), P0 = [860 - 380, 640], P1 = [1700, 470];
    const x = lerp(P0[0], P1[0], u), y = lerp(P0[1], P1[1], u) - Math.sin(u * Math.PI) * 520, landed = u >= 1;
    const rot = landed ? .12 + Math.sin((t - knowT) * 18) * kick(t - knowT, 5) * .3 : u * 7.5;
    card(x, y - (landed ? kick(t - knowT, 10) * 30 : 0), { w: 230, h: 170, glyph: 'ct', lines: false, seed: 170, rot });
    if (landed) paStars(1700, 380, knowT, t);
  }
  X.restore();
  // Stewardship: weighs → ponders → thumbs-up on "adds" → back to weighing → gasp at "costs" (and gets bonked on "know")
  const SQ = [[0, 'st_scales'], [41.66, 'pa_st_think'], [addT, 'st_wink'], [42.95, 'st_scales'], [costT, 'pa_st_shock']];
  const sp = paImg(paPick(t, SQ), 'st_scales'), ssq = paSq(t > knowT ? t - knowT : paSince(t, SQ), .12);
  const sshake = sp === 'pa_st_shock' ? Math.sin(t * 60) * 5 * (.3 + kick(t - costT, 4)) : 0;
  spr(sp, 1720 + sshake, 1110 - kick(t - SQ.reduce((a, [ts]) => t >= ts ? ts : a, 0), 9) * 24, PA_ST_H[sp] || 640,
    { seed: 4, flip: sp !== 'pa_st_shock', rot: sp === 'st_scales' ? Math.sin(nb * Math.PI) * .035 : 0, sx: ssq.sx, sy: ssq.sy, shadow: 1 });
  const fw = { size: 86, font: 'FBo', col: PAL.inkSoft };
  o12Row([['WEIGH', 41.21], ['what', 41.66, fw], ['each', 41.91, fw], ['test', 42.16, fw], ['ADDS,', 42.43, { col: '#3c8a5c', edge: true }]], 820, 175, 130, { gap: .22 });
  o12Row([['what', 42.95, fw], ['it', 43.26, fw], ['COSTS', 43.48, { col: PAL.red, edge: true }], ['us', 43.70, fw], ['to', 43.85, fw], ['know,', 44.015, fw]], 820, 1030, 130, { gap: .22 });
});


// ── step · 44.20 → dxo1 (45.39)  "Then choose the next step." ──────────────────────────
// D stamp impact is on the grid (beat 69 + 40ms); its 0.12s descent starts just after this cut.
const DXO1_T0 = LINES[9].dxo[0] - .2;
// bottom strip "the NEXT STEP." — settles in 'step'; STEP. slams on its sung time inside dxo1, then clears
const stepStrip = (t, alpha = 1) => {
  const W = LINES[9].words;
  o12Row([['the', W[2][1], { size: 92, font: 'FBo', col: PAL.inkSoft }], ['NEXT', W[3][1]], ['STEP.', W[4][1], { col: PAL.red, edge: true }]], 960, 1000, 160, { alpha });
};
shot('step', 44.20, (t) => {
  const pick = 44.78, tStep = 45.41, tD = DXO1_T0;
  const stepZ = 1 + kick(t - pick, 8) * .04 + kick(t - tStep, 8) * .03;
  bgCam(() => paperBG('#f7e7c4', .6), [960, 600, stepZ, 0], { par: .9, over: 1.2 });
  X.save(); cam(960, 600, stepZ);
  // the chosen card ends up where dxo1's D stamp lands, so the choice becomes the D
  const C = [[560, 640, 'ct'], [960, 610, 'dna'], [1360, 640, 'flask']], P = 0;
  const lift = spring(t - pick, 3, .4) * (t >= pick ? 1 : 0);
  const fly = E.io(prog(t, tD - .17, tD));
  C.forEach(([x, y, g], i) => {
    if (i === P) return;
    const fl = E.io(prog(t, pick + .05 + i * .05, pick + .25 + i * .05)), dr = E.inQ(prog(t, 44.95 + i * .06, tD - .1 + i * .06));
    if (dr >= 1) return;
    card(x + dr * (i - 1) * 140, y + dr * 900, { w: 230, h: 290, glyph: g, rot: (i - 1) * .06 + dr * (i === 1 ? -1.4 : 1.8), seed: 190 + i, flip: fl, backCol: '#d9c8a2' });
  });
  const [px, py, pg] = C[P], ks = 1 + lift * .2 + (t >= 45.15 ? kick(t - 45.15, 12) * .06 : 0) + (t >= tStep ? kick(t - tStep, 12) * .08 : 0);
  const cxp = lerp(px, 400, fly), cyp = lerp(py - lift * 30, 540 + 60, fly), sc = lerp(ks, 1.55, fly);
  card(cxp, cyp, { w: 230, h: 290, glyph: pg, rot: -.06, seed: 190 + P, s: sc });
  // the thread searches across the cards, then snaps to one on "choose"
  const hov = [960 + Math.sin((t - 44.2) * 7.5 + 1.2) * 420, 460 + Math.sin((t - 44.2) * 15) * 18];
  const pin = [cxp, cyp - 145 * sc];
  const k = E.inC(prog(t, pick - .12, pick));
  const tip = [lerp(hov[0], pin[0], k), lerp(hov[1], pin[1], k)];
  thread(spline([[1990, 380], [1600, 330], [lerp(tip[0] + 260, pin[0] + 400, k), lerp(360, pin[1] - 60, k)], tip]), { w: 13, tip: t < pick });
  if (t >= pick) tack(pin[0], pin[1], 1.4 * sc / 1.2, { pressed: E.outBack(prog(t, pick, pick + .08)) });
  X.restore();
  // Test-Chooser does the choosing: ponders on "then", points the pick out on "choose", cheers it off on "next"
  const TQ = [[0, 'pa_tc_think'], [pick, 'tc_point'], [45.15, 'tc_cheer']];
  const tp = paImg(paPick(t, TQ), 'tc_leanin'), tsq = paSq(paSince(t, TQ), .12), tin = E.outC(prog(t, 44.2, 44.42));
  paCrisp(() => spr(tp, lerp(2150, 1700, tin), 1110 - kick(paSince(t, TQ), 8) * 30, ({ tc_point: 640, tc_cheer: 660 })[tp] || 650,
    { seed: 15, flip: true, sx: tsq.sx, sy: tsq.sy, rot: tp === 'pa_tc_think' ? Math.sin(beatAt(t) * Math.PI) * .03 : 0 }));
  const v = (E.io(prog(t + 1 / 48, tD - .17, tD)) - fly) * 600;
  if (v > 3) POST.smear = [-v * .35, -v * .1];
  o12Row([['THEN', 44.20], ['CHOOSE', 44.78, { col: PAL.teal, edge: true }]], 960, 215, 150);
  stepStrip(t);
});

// ── D-X-O stamps (reused) ─────────────────────────────────────────────────────────────
function dxo(t, times, o = {}) {
  const cols = [PAL.lemon, PAL.coral, PAL.teal], L = ['D', 'X', 'O'];
  const sh = times.reduce((a, ti) => a + kick(t - ti, 12) * 18, 0);
  // camera: leans toward each letter as it lands (log-zoom, eased), then settles centred and breathes in
  const xs = [-560, 0, 560];
  let cx = 960, z = 1.08;
  for (let i = 0; i < 3; i++) { const k = E.io(prog(t, times[i] - .14, times[i] + .02)); cx = lerp(cx, 960 + xs[i] * .2, k); }
  cx = lerp(cx, 960, E.io(prog(t, times[2] + .1, times[2] + .55)));
  z *= 1 - .08 * E.io(prog(t, times[2] + .1, times[2] + .55)) + times.reduce((a, ti) => a + (t > ti ? kick(t - ti, 9) * .035 : 0), 0);
  const tEnd = o.next ?? times[2] + .8;
  z *= 1 + .05 * E.ioS(prog(t, times[2] + .55, tEnd));
  const dxoR = wob(t, 7, .003);
  X.save(); X.translate(wob(t, 5, sh), wob(t, 6, sh));
  bgCam(() => paperBG(o.bg || '#fff2d2', .5), [cx, 540, z, dxoR], { par: .9, over: 1.25 });
  cam(cx, 540, z, dxoR);
  L.forEach((l, i) => {
    const x = 960 + xs[i], ti = times[i];
    const revealT = ti - 1 / 24;
    // after all three land, each letter hops in turn on the 8ths (a little curtain call)
    const hb = [1, 1.5, 2].map(k => beat(Math.round(beatAt(times[2]) * 2) / 2 + k)), hj = t > hb[i] ? Math.sin(clamp((t - hb[i]) / .2) * Math.PI) * 40 : 0;
    if (t >= revealT) {
      const hitK = t >= revealT ? kick(t - revealT, 9) : 0;
      const sp = ellPts(x, 540, 250 + hitK * 30, 240, 18).map((p, j) => [p[0] + (hash(j + i * 20) - .5) * 70, p[1] + (hash(j + 9 + i * 20) - .5) * 70]);
      X.save(); X.globalAlpha *= clamp((t - revealT) / (1 / 48)); inkShape(sp, cols[i], 0, 2, 500 + i); X.restore();
    }
    X.save(); X.translate(0, -hj);
    if (!o.hands || t >= revealT) stamp(l, x, 540, 430, revealT, { col: PAL.ink, rot: (i - 1) * .06 });
    // the O comes alive: eyes pop open, looks at D and X, then winks at camera
    if (l === 'O' && o.wink && t > ti + .25) {
      const e = pop(t, ti + .25, 5, .45), look = E.io(prog(t, ti + .45, ti + .6)) - E.io(prog(t, ti + .75, ti + .9)), wk = t > ti + .95 && t < ti + 1.15;
      X.save(); X.translate(x - 10 - look * 14, 520); X.scale(e, e);
      X.fillStyle = '#fffdf4'; [-34, 34].forEach(ex => { X.beginPath(); X.ellipse(ex, 0, 22, 26, 0, 0, 7); X.fill(); });
      if (wk) inkLine([[18, 2], [34, -6], [50, 2]], 7, PAL.ink, .4, 1301); else dot(34 - look * 8, 4, 10);
      dot(-34 - look * 8, 4, 10);
      X.restore();
    }
    X.restore();
  });
  // o.hands: a cast member's hand slams a rubber stamp down for each letter (block covers the letter on impact), then lifts
  if (o.hands) L.forEach((l, i) => {
    const x = 960 + xs[i], ti = times[i], name = paImg(o.hands[i], 'pa_hand_stamp');
    const hitT = ti - 1 / 24, dn = i ? E.inC(prog(t, hitT - .13, hitT)) : E.inC(prog(t, hitT - .18, hitT));
    const upK = E.outC(prog(t, hitT + .004, ti - .004));
    if (dn <= 0 || upK >= .98 || t >= ti - .002) return;
    const sq = t >= ti ? kick(t - ti, 16) * .1 : 0, hh = 900;
    spr(name, x + 14 + (1 - dn) * (i - 1) * 220 + upK * (i - 1) * 320,
      770 - (1 - dn) * (i ? 1120 : 700) - upK * 1450, hh * (1 - sq),
      { seed: 30 + i, flip: i === 2, rot: (i - 1) * .07 + (1 - dn) * .18 - upK * (i - 1) * .08, sx: 1 + sq * .6 });
  });
  X.restore();
  if (o.sub) o.sub(t);
}
window.dxo = dxo;
shot('dxo1', DXO1_T0, (t) => dxo(t, LINES[9].dxo, { hands: ['pa_hand_stamp_y', 'pa_hand_stamp', 'pa_hand_stamp'], wink: true, next: LINES[10].words[0][1], sub: (tt) => { const a = vanish(tt, LINES[9].dxo[1] - .1, .14); if (a > 0) stepStrip(tt, a); } }));
