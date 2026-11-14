"""keyout.py IN OUT — cut a coloured-pencil drawing out of its scanned paper.
Paper = region connected to the sheet border whose colour is close to the paper colour (flood fill from the border), so
pale lab coats enclosed by pencil contours stay inside. Edges that touch the sheet border (busts / sleeves) stay straight."""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
def keyout(src, dst, erode=1, cut=None, holes=False):
    im = Image.open(src).convert('RGB'); a = np.asarray(im).astype(np.float32); H, W, _ = a.shape
    b = np.concatenate([a[:6].reshape(-1, 3), a[:, :6].reshape(-1, 3), a[:, -6:].reshape(-1, 3)])
    paper = np.median(b, 0)
    dev = np.sqrt(((a - paper) ** 2).sum(2))
    sm = ndi.gaussian_filter(dev, 1.2)
    paperlike = sm < 20                                      # very close to blank paper
    # flood: paper connected to top/left/right borders (and bottom unless the figure is cut by it)
    lab, n = ndi.label(paperlike)
    edges = [lab[0], lab[:, 0], lab[:, -1], lab[-1]]
    if cut == 'bottom': edges = [lab[0], lab[:, 0], lab[:, -1]]           # the figure's cut edge is a wall, not paper
    if cut == 'top': edges = [lab[-1], lab[:, 0], lab[:, -1]]
    border = set(np.unique(np.concatenate(edges))) - {0}
    bg = np.isin(lab, list(border))
    if holes:
        sizes = ndi.sum(paperlike, lab, range(1, n + 1))
        big = [i + 1 for i, v in enumerate(sizes) if v > H * W * .002]
        bg |= np.isin(lab, big)
    fg = ~bg
    fg = ndi.binary_opening(fg, iterations=1)
    lab2, n2 = ndi.label(fg)
    if n2 > 1:
        sizes = ndi.sum(fg, lab2, range(1, n2 + 1)); fg = np.isin(lab2, 1 + np.where(sizes > sizes.max() * .003)[0])
    if cut == 'bottom': fg[-2:] |= fg[-12:-2].any(0)                          # close the cut so the coat fills
    if cut == 'top': fg[:2] |= fg[2:12].any(0)
    if not holes: fg = ndi.binary_fill_holes(fg)
    if cut == 'bottom':
        # busts: the drawing should run off the sheet's bottom edge. Fill each row between the figure's outer contours
        # (so pale coat interiors stay in), then cut the sprite at the last row the drawing actually reaches —
        # the shot code positions busts so that edge sits behind the table / frame edge.
        rows = np.where(fg.any(1))[0]
        if len(rows):
            top, bot = rows.min(), rows.max()
            for y in range(int(top + (bot - top) * .4), bot + 1):
                xs = np.where(fg[y])[0]
                if len(xs) > 1: fg[y, xs.min():xs.max() + 1] = True
    if cut == 'top':
        cols = np.where(fg[2:14].any(0))[0]
        if len(cols): row = np.zeros(W, bool); row[cols.min():cols.max() + 1] = True; fg[:2] = row
        fg = ndi.binary_fill_holes(fg)
    if erode: fg = ndi.binary_erosion(fg, iterations=erode)
    alpha = ndi.gaussian_filter(fg.astype(np.float32), .7) * 255
    # keep straight cuts where the figure meets the sheet edge
    for sl in (np.s_[-3:, :], np.s_[:3, :]):
        alpha[sl] = np.where(fg[sl], 255, alpha[sl])
    out = Image.fromarray(np.dstack([a, alpha]).clip(0, 255).astype(np.uint8), 'RGBA')
    bb = out.getchannel('A').getbbox(); pad = 4
    out.crop((max(0, bb[0] - pad), max(0, bb[1] - pad), min(W, bb[2] + pad), min(H, bb[3] + pad))).save(dst)
if __name__ == '__main__':
    keyout(sys.argv[1], sys.argv[2], cut=sys.argv[3] if len(sys.argv) > 3 else None)
