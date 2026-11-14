"""holes.py --paper-from GENDIR [--dry] files... — cut out blank paper trapped inside a drawing (between legs, inside
arm loops, under tables).

keyout only removes paper connected to the sheet border, so enclosed gaps stay as cream paper. A region is a hole when
it is close to the sheet colour AND mostly transparent in the original ink sprite the drawing was fitted onto (for boil
variants ~1/~2: in the already-fixed base drawing, so run on bases and variants together). Pale lab coats, cards and
eyes are opaque there, so they stay. Each hole then grows a few pixels into the light paper fringe beside the pencil
line. Regions with pencil texture, or lying on the original outline (pose differs), are kept. Bust cut edges
(cuts.json) are protected. Run from the project root after peel.py:

    python3 tools/pencil/holes.py --paper-from <gendir> assets/pencil/<name>*.webp
"""
import json, os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
from fit import save
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

HERE = os.path.dirname(os.path.abspath(__file__))
CUT = json.load(open(os.path.join(HERE, 'cuts.json')))
ORIG = {n: p[3:] for n, p in re.findall(r"\['([^']+)', '([^']+)'\]", open('src/assets.js').read())}   # name -> ink original
TOL, MINF, MINPX, TF, GROW, GTOL = 22, .0004, 120, .5, 4, 48
MAXSTD, MIND = 4.25, 4      # holes are blank paper (no pencil texture) and sit inside the original gap, not on its outline
SKIP = {'window', 'scales'}  # keyout already cuts their holes (build.py HOLES)
GEN = sys.argv[sys.argv.index('--paper-from') + 1] if '--paper-from' in sys.argv else None


def paper_col(n):
    """Median colour of the sheet border of the generated drawing this asset came from."""
    g = os.path.join(GEN or '', n + '.png')
    if not GEN or not os.path.exists(g): return None
    g = np.asarray(Image.open(g).convert('RGB')).astype(np.float32)
    b = np.concatenate([g[:6].reshape(-1, 3), g[-6:].reshape(-1, 3), g[:, :6].reshape(-1, 3), g[:, -6:].reshape(-1, 3)])
    return np.median(b, 0)


dry = '--dry' in sys.argv
for f in [f for f in sys.argv[1:] if not f.startswith('--') and f != GEN]:
    n = os.path.splitext(os.path.basename(f))[0]; base = n.split('~')[0]
    if base in SKIP: continue
    im = Image.open(f)
    if im.mode != 'RGBA': continue
    s = ORIG.get(base); pc = paper_col(n)
    if pc is None: pc = paper_col(base)
    if not s or pc is None: continue
    bf = os.path.join(os.path.dirname(f), base + os.path.splitext(f)[1])   # boil variants: compare with the fixed base
    sa = np.asarray(Image.open(bf if '~' in n and os.path.exists(bf) else s).convert('RGBA'))[..., 3]
    a = np.asarray(im).astype(np.float32); al = a[..., 3]; rgb = a[..., :3]
    if sa.shape != al.shape: continue
    m = al > 128
    dev = np.sqrt(((rgb - pc) ** 2).sum(2))
    pl = (ndi.gaussian_filter(dev, 1.2) < TOL) & m
    lab, k = ndi.label(pl)
    if not k: continue
    sz = ndi.sum(pl, lab, range(1, k + 1))
    tr = ndi.mean((sa < 100).astype(float), lab, range(1, k + 1))
    ok = np.nonzero((sz >= max(MINPX, m.sum() * MINF)) & (tr >= TF))[0] + 1
    dist = ndi.distance_transform_edt(sa < 100)
    ok = [i for i in ok if rgb[lab == i].std(0).mean() <= MAXSTD and np.median(dist[lab == i]) >= MIND]
    if not len(ok): continue
    hole = np.isin(lab, ok)
    near = (dev < GTOL) & m
    for _ in range(GROW): hole |= ndi.binary_dilation(hole) & near
    cut = CUT.get(base)
    if cut:
        ys = np.nonzero(m.any(1))[0]; band = max(4, int((ys.max() - ys.min()) * .03))
        if cut == 'bottom': hole[ys.max() - band:] = False
        if cut == 'top': hole[:ys.min() + band] = False
    keep = m & ~hole
    lab2, k2 = ndi.label(keep)                             # drop paper specks stranded inside a hole
    if k2 > 1:
        sz2 = ndi.sum(keep, lab2, range(1, k2 + 1)); keep &= ~np.isin(lab2, 1 + np.nonzero(sz2 < 30)[0])
    soft = np.minimum(ndi.gaussian_filter(keep.astype(np.float32), .6) * 255, al)
    soft[hole & ~ndi.binary_dilation(keep)] = 0
    soft = np.where(ndi.binary_dilation(hole, iterations=3), soft, al)         # untouched away from the holes
    if not dry:
        out = a.copy(); out[..., 3] = soft
        save(Image.fromarray(out.clip(0, 255).astype(np.uint8), 'RGBA'), f)
    print(f'{n} holes {len(ok)} {hole.sum() / m.sum():.2%}')
