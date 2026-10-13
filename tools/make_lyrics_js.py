#!/usr/bin/env python3
"""lyrics_timed.json -> src/lyrics.js (window.LYR). Run from the project root after editing word timings.

lyrics_timed.json: {bpm, downbeat, lines: [{i, s, e, text, words: [[word, sung_time_s], ...], dxo?: [t, t, t]}]}
Shots look words up by line/word index (core.js: wt(line, word)), so keep the line and word order stable.
"""
import json
import sys

src = sys.argv[1] if len(sys.argv) > 1 else 'lyrics_timed.json'
out = sys.argv[2] if len(sys.argv) > 2 else 'src/lyrics.js'
L = json.load(open(src))
with open(out, 'w') as fh:
    fh.write('window.LYR=' + json.dumps(L) + ';\n')
print(len(L['lines']), 'lines ->', out)
