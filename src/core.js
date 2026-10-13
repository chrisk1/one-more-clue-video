// core.js — time, easing, seeded noise, music grid, lyric lookup. Everything here is a pure function of its inputs:
// the film has no state between frames, so any frame can be rendered on its own (and chunks in parallel).
'use strict';
const DW = 1920, DH = 1080;                       // design space; canvas scaled to fit
const BPM = 92.95, D0 = 0.9357083, BEAT = 60 / BPM;   // nominal tempo and first downbeat (s)
// Tempo map: the song drifts slightly off the nominal grid, so beat(n) (n may be fractional, e.g. 31.5 = the "and" of 31)
// reads the measured beat times in tempo.js (linear between beats) and beatAt(t) inverts it. See tools/audio/tempomap.py.
const TB = window.TEMPO_BEATS || null;
const beat = n => {
  if (!TB) return D0 + n * BEAT;
  const N = TB.length - 1;
  if (n <= 0) return TB[0] + n * BEAT;
  if (n >= N) return TB[N] + (n - N) * BEAT;
  const i = Math.floor(n); return TB[i] + (TB[i + 1] - TB[i]) * (n - i);
};
const beatAt = t => {
  if (!TB) return (t - D0) / BEAT;
  const N = TB.length - 1;
  if (t <= TB[0]) return (t - TB[0]) / BEAT;
  if (t >= TB[N]) return N + (t - TB[N]) / BEAT;
  let lo = 0, hi = N; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (TB[m] <= t) lo = m; else hi = m; }
  return lo + (t - TB[lo]) / (TB[lo + 1] - TB[lo]);
};
const bar = n => beat(4 * n);
const FPS_HOLD = 12;                               // drawings/boil change at 12/s ("on twos" at 24fps)
const boilStep = t => Math.floor(t * FPS_HOLD + 1e-6);

const clamp = (v, a = 0, b = 1) => v < a ? a : v > b ? b : v;
const lerp = (a, b, k) => a + (b - a) * k;
const prog = (t, a, b) => clamp((t - a) / (b - a));
const E = {
  lin: x => x,
  inQ: x => x * x, outQ: x => 1 - (1 - x) * (1 - x),
  inC: x => x * x * x, outC: x => 1 - Math.pow(1 - x, 3),
  io: x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
  ioS: x => x * x * (3 - 2 * x),
  outExpo: x => x >= 1 ? 1 : 1 - Math.pow(2, -10 * x),
  inExpo: x => x <= 0 ? 0 : Math.pow(2, 10 * x - 10),
  outBack: (x, s = 1.70158) => 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2),
  inBack: (x, s = 1.70158) => (s + 1) * x * x * x - s * x * x,
};
// Closed-form damped spring 0→1 (overshoots). f = Hz, z = damping ratio.
const spring = (dt, f = 3, z = .35) => {
  if (dt <= 0) return 0;
  const w = 2 * Math.PI * f, wd = w * Math.sqrt(1 - z * z);
  return 1 - Math.exp(-z * w * dt) * (Math.cos(wd * dt) + (z * w / wd) * Math.sin(wd * dt));
};
const kick = (dt, decay = 8) => dt < 0 ? 0 : Math.exp(-decay * dt);

const hash = n => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453123; return x - Math.floor(x); };
const hash2 = (a, b) => hash(a * 57.31 + b * 311.17);
const vnoise = (x, s = 0) => { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f); return lerp(hash2(i, s), hash2(i + 1, s), u) * 2 - 1; };   // smooth value noise, -1..1
// Stepped wobble: a new random offset FPS_HOLD times/s — the "boil" for procedurally drawn lines and shapes
const wob = (t, seed, amp = 1) => (hash2(boilStep(t), seed) * 2 - 1) * amp;

// Lyrics (lyrics.js): wt(line, word) = the sung time of a word; negative word index counts from the end of the line.
const LINES = window.LYR.lines;
const wt = (li, wi) => LINES[li].words[wi < 0 ? LINES[li].words.length + wi : wi][1];

const pop = (t, t0, f = 3.2, z = .38) => spring(t - t0, f, z);
const appear = (t, t0, d = .18) => E.outC(prog(t, t0, t0 + d));
const vanish = (t, t0, d = .18) => 1 - E.inC(prog(t, t0, t0 + d));

Object.assign(window, { DW, DH, BPM, D0, BEAT, bar, beat, beatAt, boilStep, clamp, lerp, prog, E, spring, kick,
  hash, hash2, vnoise, wob, LINES, wt, pop, appear, vanish });
// Shot registry: shot(name, t0, f) — f(t, lt) draws the frame at film time t (lt = t - t0) while this shot is active.
const SHOTS = [];
const shot = (name, t0, f) => SHOTS.push({ name, t0, f });
Object.assign(window, { SHOTS, shot });
