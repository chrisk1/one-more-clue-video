#!/usr/bin/env python3
"""Measure the song's per-beat times (the "tempo map") from its drums.

The song drifts a little around its nominal 92.95 BPM grid, so instead of a fixed grid the film times every hit
against measured beats. Pipeline:

  1. Separate the stems (once):  demucs --two-stems vocals song.mp3      -> separated/htdemucs/song/no_vocals.wav
  2. Measure the beats:          python3 tools/audio/tempomap.py         -> audio/tempomap.json
  3. Generate the JS table:      python3 tools/audio/make_tempo_js.py    -> src/tempo.js  (window.TEMPO_BEATS)

How it works: percussive onset flux of the no-vocals stem (HPSS + log-spectral flux, hop 64 @ 22.05 kHz); for each
beat n of the nominal grid (downbeat D0 + n * 60/BPM) pick the strongest onset within +-90 ms of where the previous
beats say it should be; fill gaps by interpolating the offsets, light median-3 smoothing, and keep a measured value only
when it is within 25 ms of that median. Prints the per-beat offsets (ms) for a quick sanity check.

Requires: numpy, scipy, librosa.
"""
import argparse
import json

import librosa
import numpy as np
import scipy.signal as ss

BPM, D0, LENGTH = 92.95, 0.9357083, 136.8      # nominal tempo, first downbeat (s), song length (s)
SR, HOP = 22050, 64


def percussive_flux(path):
    y, _ = librosa.load(path, sr=SR, mono=True)
    _, yp = librosa.effects.hpss(y, margin=2.0)
    S = np.abs(librosa.stft(yp, n_fft=512, hop_length=HOP))
    L = np.log1p(100 * S)
    fl = np.maximum(0, np.diff(L, axis=1, prepend=L[:, :1])).sum(0)
    return fl / fl.max()


def measure_beats(fl):
    fr = SR / HOP
    B = 60 / BPM
    N = int((LENGTH - D0) / B) + 2
    pk, _ = ss.find_peaks(fl, height=.05, distance=int(.08 * fr))
    pt, ph = pk / fr, fl[pk]
    bt, prev = [], 0.0
    for n in range(N):
        g = D0 + n * B
        exp = g + prev
        m = (pt > exp - .09) & (pt < exp + .09)
        if m.any():
            c, h = pt[m], ph[m]
            j = np.argmax(h - 1.5 * np.abs(c - exp))
            if h[j] > .12:
                bt.append(c[j])
                prev = .7 * prev + .3 * (c[j] - g)
                continue
        bt.append(np.nan)
    bt = np.array(bt)
    n = np.arange(N)
    ok = ~np.isnan(bt)
    off = bt - (D0 + n * B)
    offi = np.interp(n, n[ok], off[ok])                                  # fill gaps
    med = np.array([np.median(offi[max(0, i - 1):i + 2]) for i in range(N)])
    fin = np.where(np.abs(offi - med) < .025, offi, med)                 # real hit, else the median
    for i in range(0, N, 4):
        print(i, f'{D0 + i * B + fin[i]:7.3f}',
              ' '.join(f'{fin[k] * 1000:+4.0f}{"" if ok[k] else "?"}' for k in range(i, min(N, i + 4))))
    return (D0 + n * B + fin).tolist()


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--stem', default='separated/htdemucs/song/no_vocals.wav', help='demucs no-vocals stem (wav)')
    ap.add_argument('--out', default='audio/tempomap.json', help='output JSON {beats:[seconds...]}')
    a = ap.parse_args()
    beats = measure_beats(percussive_flux(a.stem))
    with open(a.out, 'w') as fh:
        json.dump({'beats': beats, 'src': 'drum onsets per beat (no_vocals stem), median-3 smoothed'}, fh)
    print(len(beats), 'beats ->', a.out)


if __name__ == '__main__':
    main()
