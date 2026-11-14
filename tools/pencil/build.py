#!/usr/bin/env python3
"""build.py GENDIR [names...] — turn generated coloured-pencil drawings into film assets.

Each drawing in GENDIR (<name>.png, boil variants <name>~1.png, <name>~2.png) was generated opaque on a plain sheet of
cream paper. Sprites are keyed out of the paper (keyout.py) and fitted onto the original ink asset's canvas (fit.py), so
the shot code needs no coordinate changes; variants are registered onto their fitted base. Background plates are
resized to the original plate. Output: assets/pencil/<name>.webp (lossless). Run from the project root.

    python3 tools/pencil/build.py <gendir> [names...]
    python3 tools/pencil/peel.py --paper-from <gendir> assets/pencil/<name>*.webp
    python3 tools/pencil/holes.py --paper-from <gendir> assets/pencil/<name>*.webp
    python3 tools/pencil/make_assets_js.py
"""
import json, os, re, sys, tempfile
sys.path.insert(0, os.path.dirname(__file__))
from fit import fit, fitvar
from keyout import keyout
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ORIG = {n: p[3:] for n, p in re.findall(r"\['([^']+)', '([^']+)'\]", open('src/assets.js').read())}   # name -> ink original
CUT = json.load(open(os.path.join(HERE, 'cuts.json')))      # busts cut by the sheet's bottom (or top) edge
HOLES = {'window', 'scales'}                                # see-through gaps enclosed by pencil
OUT = 'assets/pencil'

gen = sys.argv[1]
names = sys.argv[2:] or sorted(f[:-4] for f in os.listdir(gen) if f.endswith('.png') and not f.startswith('_'))
os.makedirs(OUT, exist_ok=True); tmp = tempfile.mkdtemp()
built = 0
for n in names:
    base = n.split('~')[0]; src = ORIG.get(base); g = f'{gen}/{n}.png'
    if not src or not os.path.exists(g): print('skip', n); continue
    dst = f'{OUT}/{n}.webp'
    if Image.open(src).mode != 'RGBA':                      # background plate
        fit(src, g, dst); built += 1; continue
    k = f'{tmp}/{n}.png'; keyout(g, k, cut=CUT.get(base), holes=base in HOLES)
    if '~' in n and os.path.exists(f'{OUT}/{base}.webp'): fitvar(f'{OUT}/{base}.webp', k, dst)
    else: fit(src, k, dst)
    built += 1
print('built', built)
