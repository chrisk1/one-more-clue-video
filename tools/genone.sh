#!/bin/bash
# Generate one image from one line of a jobs TSV (used by genbatch.sh).
# usage: genone.sh JOBS.tsv OUTDIR LINENO
# TSV columns: name <TAB> size (e.g. 1024x1536) <TAB> background (transparent|opaque|auto) <TAB> refs (comma-separated
# reference images; "~" is expanded; may be empty) <TAB> prompt.  Lines starting with # are skipped; existing outputs too.
# Env: MODEL (default $IMAGE_MODEL or gpt-image-1), Q quality (default high). API key: see imagegen.py.
line=$(sed -n "${3}p" "$1"); OUT=$2
name=$(cut -f1 <<<"$line"); size=$(cut -f2 <<<"$line"); bg=$(cut -f3 <<<"$line"); refs=$(cut -f4 <<<"$line"); prompt=$(cut -f5- <<<"$line")
refs=${refs//\~/$HOME}
[ -z "$name" ] && exit 0; [[ "$name" == \#* ]] && exit 0
[ -f "$OUT/$name.png" ] && { echo "skip $name"; exit 0; }
args=(); IFS="," read -ra R <<<"$refs"; for r in "${R[@]}"; do [ -n "$r" ] && args+=(--ref "$r"); done
MODEL=${MODEL:-${IMAGE_MODEL:-gpt-image-1}}; Q=${Q:-high}
out=$(python3 "$(dirname "$0")/imagegen.py" "$prompt" "${args[@]}" --model "$MODEL" --size "$size" --quality "$Q" --background "$bg" -o "$OUT/$name.png" 2>&1) && echo "ok $name" || echo "FAIL $name: $(echo "$out"|tail -1)"
