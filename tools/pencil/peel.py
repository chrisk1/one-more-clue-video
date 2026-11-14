"""peel.py --paper-from GENDIR [--dry] files... — remove the cream paper ring that keyout leaves outside a drawing's pencil contour.

Starting from the transparent outside, repeatedly drops edge pixels that look like paper (light, low chroma, close to
the sheet colour) until it reaches pencil. Straight cut edges (cuts.json) are protected. If peeling would remove a lot
of the drawing (white cards/papers with no outer contour) the file is left alone. Finishes with a soft 1px edge."""
import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from fit import save
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

CUT = json.load(open(os.path.join(os.path.dirname(__file__), 'cuts.json')))
MAX_IT, MAX_FRAC, TOL = 14, .08, 54
GEN = sys.argv[sys.argv.index('--paper-from') + 1] if '--paper-from' in sys.argv else None
def paper_col(f):
    """Median colour of the sheet border of the generated drawing this asset came from."""
    g = os.path.join(GEN or '', os.path.splitext(os.path.basename(f))[0] + '.png')
    if not GEN or not os.path.exists(g): return None
    g = np.asarray(Image.open(g).convert('RGB')).astype(np.float32)
    b = np.concatenate([g[:6].reshape(-1, 3), g[-6:].reshape(-1, 3), g[:, :6].reshape(-1, 3), g[:, -6:].reshape(-1, 3)])
    return np.median(b, 0)
dry = '--dry' in sys.argv
files = [f for f in sys.argv[1:] if not f.startswith('--') and f != GEN]
for f in files:
    im = Image.open(f)
    if im.mode != 'RGBA': continue
    a = np.asarray(im).astype(np.float32); al = a[..., 3]; rgb = a[..., :3]
    keep = al > 8
    if keep.sum() < 50: continue
    lum = rgb.mean(2)
    pc = paper_col(f)
    if pc is None: continue
    dist = np.sqrt(((rgb - pc) ** 2).sum(2))
    paper = (dist < TOL) & (lum > pc.mean() - 70)
    ys, xs = np.nonzero(keep); y0, y1 = ys.min(), ys.max()
    prot = np.zeros_like(keep)
    cut = CUT.get(os.path.splitext(os.path.basename(f))[0].split('~')[0])
    band = max(4, int((y1 - y0) * .03))
    if cut == 'bottom': prot[y1 - band:] = True
    if cut == 'top': prot[:y0 + band] = True
    m = keep.copy(); removed = 0
    for _ in range(MAX_IT):
        edge = m & ~ndi.binary_erosion(m, structure=np.ones((3, 3)), border_value=0)
        drop = edge & paper & ~prot
        n = drop.sum()
        if n == 0: break
        m &= ~drop; removed += n
    frac = removed / keep.sum()
    if frac > MAX_FRAC:
        print(f'SKIP {os.path.basename(f)} would remove {frac:.1%}'); continue
    m = ndi.binary_opening(m, iterations=1) | (m & prot)
    lab, nl = ndi.label(m)
    if nl > 1:
        sz = ndi.sum(m, lab, range(1, nl + 1)); big = sz.max()
        ml = ndi.mean(lum, lab, range(1, nl + 1))
        # drop only small paper-coloured specks; keep detached pencil strokes (action marks, sweat drops)
        bad = (sz < 30) | ((sz < max(60, big * .002)) & (ml > pc.mean() - 45))
        small = np.isin(lab, 1 + np.nonzero(bad)[0]); m &= ~small
    soft = np.minimum(ndi.gaussian_filter(m.astype(np.float32), .6) * 255, al)
    soft[~m] = np.minimum(soft[~m], 60)
    if not dry:
        out = a.copy(); out[..., 3] = soft
        save(Image.fromarray(out.clip(0, 255).astype(np.uint8), 'RGBA'), f)
    print(f'{os.path.basename(f)} peeled {frac:.2%}')
