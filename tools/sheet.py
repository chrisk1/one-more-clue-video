#!/usr/bin/env python3
# Contact sheet of rendered frames (the t*.png files written by frames.js), for a quick visual review.
# usage: python3 tools/sheet.py FRAMES_DIR COLS THUMB_WIDTH OUT.png      (needs Pillow)
# e.g.   node frames.js --w 640 --out out/frames --from 0 --to 136 --step 2 && python3 tools/sheet.py out/frames 8 320 out/sheet.png
import sys,glob
from PIL import Image
d,cols,w,out=sys.argv[1],int(sys.argv[2]),int(sys.argv[3]),sys.argv[4]
fs=sorted(glob.glob(d+'/t*.png')); ims=[Image.open(f).convert('RGB') for f in fs]
h=round(ims[0].height*w/ims[0].width); rows=(len(ims)+cols-1)//cols
S=Image.new('RGB',(cols*(w+3),rows*(h+3)),'black')
for i,im in enumerate(ims): S.paste(im.resize((w,h)),((i%cols)*(w+3),(i//cols)*(h+3)))
S.save(out); print(out,len(ims))
