"""fit.py SRC GEN OUT — make a restyled drawing a drop-in replacement for the original asset.

Sprites (RGBA): trim GEN's alpha, scale so its content height matches SRC's content height (shrink if too wide),
bottom-align and centre it on SRC's content box; the output canvas is SRC's pixel size, so shot coordinates don't change.
Opaque plates: resize GEN to SRC's exact size. OUT may be .png or .webp (lossless)."""
import sys
import numpy as np
from PIL import Image


def save(im, p):
    if p.endswith('.webp'): im.save(p, 'WEBP', lossless=True, exact=True, quality=100, method=6)
    else: im.save(p)


def bbox(im, thr=14):
    return im.getchannel('A').point(lambda v: 255 if v > thr else 0).getbbox()


def fit(src_p, gen_p, out_p):
    src = Image.open(src_p); gen = Image.open(gen_p)
    if src.mode not in ('RGBA', 'LA'):
        save(gen.convert('RGB').resize(src.size, Image.LANCZOS), out_p); return
    src = src.convert('RGBA'); gen = gen.convert('RGBA')
    sb = bbox(src) or (0, 0, *src.size); gb = bbox(gen)
    if not gb: raise SystemExit('empty drawing ' + gen_p)
    g = gen.crop(gb); sw, sh = sb[2] - sb[0], sb[3] - sb[1]
    k = sh / g.height
    if g.width * k > sw * 1.12: k = min(k, sw * 1.12 / g.width)
    k = min(k, src.width / g.width, src.height / g.height)
    g = g.resize((max(1, round(g.width * k)), max(1, round(g.height * k))), Image.LANCZOS)
    cx = (sb[0] + sb[2]) / 2; x = round(cx - g.width / 2); y = sb[3] - g.height
    x = min(max(0, x), src.width - g.width); y = min(max(0, y), src.height - g.height)
    out = Image.new('RGBA', src.size, (0, 0, 0, 0)); out.alpha_composite(g, (x, y)); save(out, out_p)


def fitvar(base_fit_p, var_p, out_p):
    """Register a re-drawn boil variant onto its already-fitted base: same canvas, matched alpha area and centroid."""
    base = Image.open(base_fit_p); var = Image.open(var_p)
    if base.mode != 'RGBA':
        save(var.convert('RGB').resize(base.size, Image.LANCZOS), out_p); return
    var = var.convert('RGBA')

    def stats(im):
        a = np.asarray(im.getchannel('A'), float) / 255.0; s = a.sum()
        ys, xs = np.mgrid[0:a.shape[0], 0:a.shape[1]]
        return s, (xs * a).sum() / s, (ys * a).sum() / s
    A0, cx0, cy0 = stats(base)
    v = var.crop(bbox(var)); Av, cxv, cyv = stats(v)
    k = (A0 / Av) ** .5
    v = v.resize((max(1, round(v.width * k)), max(1, round(v.height * k))), Image.LANCZOS)
    x = round(cx0 - cxv * k); y = round(cy0 - cyv * k)
    out = Image.new('RGBA', base.size, (0, 0, 0, 0))
    if x >= 0 and y >= 0 and x + v.width <= base.width and y + v.height <= base.height: out.alpha_composite(v, (x, y))
    else: out.paste(v, (x, y), v)
    save(out, out_p)


if __name__ == '__main__':
    fit(*sys.argv[1:4])
