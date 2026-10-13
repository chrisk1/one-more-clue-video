#!/bin/bash
# Generate every image in a jobs TSV (see genone.sh for the format), N in parallel (default 4).
# usage: genbatch.sh jobs.tsv OUTDIR [N]
# Then trim the transparent margins and drop the results into assets/sprites/:  node tools/trim.js assets/sprites OUTDIR/*.png
JOBS=$(cd "$(dirname "$1")" && pwd)/$(basename "$1"); mkdir -p "$2"; OUT=$(cd "$2" && pwd); P=${3:-4}
HERE=$(cd "$(dirname "$0")" && pwd)
seq 1 $(wc -l < "$JOBS") | xargs -n1 -P "$P" "$HERE/genone.sh" "$JOBS" "$OUT" 2>/dev/null
