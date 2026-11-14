# One More Clue

A 2 min 17 s hand-drawn music video for the song **"One More Clue"**, inspired by the paper
*"Sequential diagnosis in medicine using language models"* (*Science*, 22 October 2026). Every picture looks as if it
was drawn by hand in coloured pencil on cream cartridge paper and scanned, with crisp kinetic lyric type on top.

The whole film is code. Each frame is a pure JavaScript function of time `t`, drawn on an HTML canvas from
AI-generated coloured-pencil drawings, procedural pencil lines and fills, and lyric typography. Headless Chrome
(Puppeteer) captures every frame, and ffmpeg encodes them with the song.

---

## Quick start

Requirements: **Node 18+**, **ffmpeg** on your `PATH` (with libx264; libx265 for the HEVC delivery), about 4 GB of free
RAM per render worker at 4K.

```bash
npm install                 # installs Puppeteer and its bundled Chrome
npm run preview             # 960×540, 24 fps → out/preview.mp4 (about 1–2 min)
npm run render:4k           # 3840×2160, 30 fps master → out/master_4k.mp4 (about 15–20 min on an M-series Mac)
```

Render individual stills while you work on a shot:

```bash
node frames.js --w 1280 --times 21.34,29.43,131.44 --debug   # --debug overlays the time and the shot name
```

The renderer splits the timeline into chunks and renders them in parallel, with a fresh headless browser per chunk.
Finished chunks are kept, so an interrupted render resumes. Delete the `--tmp` chunk folder after changing the
resolution or frame rate. Keep `--jobs 2` at 4K; more workers can exhaust memory.

**Delivery encodes** (from the 4K master):

```bash
# 4K HEVC: hardware-decodable on Macs and suitable for YouTube
ffmpeg -i out/master_4k.mp4 -map 0 -c:v libx265 -preset medium -crf 17 -pix_fmt yuv420p -tag:v hvc1 \
  -x265-params "profile=main:level-idc=5.1:vbv-maxrate=60000:vbv-bufsize=90000:aq-mode=3" \
  -color_primaries bt709 -color_trc bt709 -colorspace bt709 -c:a copy -movflags +faststart "One More Clue 4K.mp4"
# 1080p H.264 for social media
ffmpeg -i out/master_4k.mp4 -map 0 -vf "scale=1920:1080:flags=lanczos" -c:v libx264 -preset slow -crf 17 \
  -pix_fmt yuv420p -profile:v high -level:v 4.2 -maxrate 20M -bufsize 30M -tune animation \
  -color_primaries bt709 -color_trc bt709 -colorspace bt709 -c:a aac -b:a 256k -movflags +faststart "One More Clue 1080p.mp4"
```

---

## The idea

> **Diagnosis is a red thread pulled through a pile of clues.**

A single hand-drawn red thread runs through the film. It's pinned to every new clue, pulled taut, re-routed when the
facts change, and branches at forks. That's sequential diagnosis, drawn: ask, test, look at the result, update, and
choose the next move.

Around the thread:
- **Clue cards.** Small cream index cards with a hand-drawn glyph (question mark, flask, ECG, X-ray, DNA, …). They are
  pinned, dealt, flipped and weighed.
- **The panel.** Five characters, one per reasoning role from the paper: Hypothesis, Challenger, Test-Chooser,
  Stewardship and Checklist. They begin as five little neural networks (one model, five coats). A blue filing-cabinet
  character plays the patient-record simulator.
- **D·X·O.** Three letter characters who stamp the chorus, measure progress on a growth chart and finally conga along
  the thread to the confirmed diagnosis.

The paper is nudged, never charted: no results, no figures, no named diseases. The tone is warm, witty and optimistic.

**Song map**

| Time | Section | What happens |
|---|---|---|
| 0:00–0:24 | Hook and verse 1 | Cork-board opening ("SE·QUEN·TIAL"); five neural networks become the panel; an ECG lands on the committee's table; the thread runs card to card into the **ONE MORE CLUE** title |
| 0:24–0:47 | Verse 2 | The reasoning wheel spins on the beat (ask → guess → test → result → doubt → update) into **CHAIN OF DEBATE**; branching vine; breadth vs depth; the cost scales; D·X·O stamps |
| 0:47–0:58 | Chorus 1 | Route crossed out and re-routed; "little by little, get a better view" |
| 0:58–1:15 | Verse 3 | The benchmark; the simulator runs dry, types a *Synthetic result* and files it in its own drawer |
| 1:15–1:30 | Verse 4 | The five roles one by one, then "five coats, one model" |
| 1:30–1:41 | Bridge | Trials on the track at dusk; a night town ("could that knowledge reach every bedside?"); the camera cranes up to the sky on "the least capable it'll ever be" |
| 1:41–2:03 | Chorus 2 | A patient at the centre of a branching web; a globe at dawn; a brass-band curtain call |
| 2:03–2:17 | Finale | One patient's journey pinned along the thread; the lights go down to a spotlight; **Diagnosis confirmed ✓**; the title card |

---

## How it was made: the creative process

The film was built by one person directing a team of AI coding agents. A coordinator agent held the brief and the
timeline, and specialist agents each owned one section of the song. A separate reviewer agent, which had never seen
the build reasoning, critiqued each cut. The prompts that drove each stage are in
[`prompts/WORKFLOW_PROMPTS.md`](prompts/WORKFLOW_PROMPTS.md).

### In numbers

- **14 versions** from first draft to final cut: 12 in a cut-paper and ink look, then two coloured-pencil restyles.
- **8 rounds of the creator's frame-accurate notes** on the ink cut, with more than 70 individual timestamped notes.
- **7 independent director's critiques** of the ink cut, each checking sync frame by frame against the sung words.
- **5 pulse-check clips and 3 independent critique rounds** for the coloured-pencil restyle.
- **About 180 image-generation prompts** for the original characters, poses, props and background plates (in
  [`prompts/IMAGE_PROMPTS.md`](prompts/IMAGE_PROMPTS.md)), and **about 430 coloured-pencil drawings** that redraw
  every one of them, including two re-drawn "boil" frames per sprite (in
  [`prompts/PENCIL_PROMPTS.md`](prompts/PENCIL_PROMPTS.md)).
- **Every lyric word timed to its sung onset**, and every beat-locked move driven by a measured tempo map.

### The arc

1. **First draft, then a reset.** The first version worked technically, but it looked generic and didn't tell the
   lyrics. The brief was rewritten around a higher bar: charming, hand-made, witty, K-pop-level attention direction,
   big kinetic lyric type, tightly synced, conceptual rather than literal, and optimistic.
2. **Concept before code.** One idea (the red thread) and a one-page concept bible came first. Then came a storyboard
   table with one row per lyric line (time → lyric → visual → gag → type placement → camera). A fresh reviewer
   critiqued both before any shot was written.
3. **Assets.** The five role characters and the filing cabinet came from a single character sheet. Every new pose was
   generated with that sheet (or a crop of one character) as a reference image, using a fixed style clause so the
   whole cast stays on-model. Background plates were generated at 4K, with empty space left for the lyric type.
4. **An engine first, then parallel shots.** The shared engine came first: timing, easing, the ink-boil sprite system,
   cut-paper type, the thread, cards, the camera and post-processing. Then one agent per song section built its shots
   from a common brief and checked its own work with contact sheets at every sung word.
5. **Timing became a measurement.** The singer and band drift by up to ±130 ms against a fixed BPM, so the beat grid
   was replaced by a tempo map measured from drum onsets in the separated instrumental stem. Every lyric onset was
   re-measured from the isolated vocal stem (transcription of short slices plus energy envelopes). Visual hits read
   these times instead of hard-coded numbers.
6. **Critique → fix loops.** After each major pass, a fresh "director" agent reviewed the full render. It produced
   ranked, timestamped issues (illegible type, collisions, late hits, dead moments, gags that don't read), and each
   issue went back to the agent that owned that section.
7. **The creator's notes.** Eight rounds of timestamped notes on the rendered film followed. They covered smoother and
   more deliberate camera moves, backgrounds that move with the camera, a calmer double-time section, the finale's
   lights-down spotlight, a new font, clearer story beats (the simulator typing and filing its synthetic result), and
   removing gags that didn't earn their place. Each round was split across agents, verified frame by frame at viewing
   size, and checked note by note by an independent reviewer before delivery.
8. **A first coloured-pencil restyle.** With the story, timing and camera locked, the whole film was restyled as a
   pure style edit: every image was redrawn with the original as the reference and fitted onto the original's canvas,
   so no shot code had to move. The first attempt was a clean, delicate picture-book look. The feedback was that it
   still felt too neat and digital; the aim was a drawing that genuinely looks made by hand.
9. **Pulse checks, then the full rollout.** The second restyle was settled on the first 24 seconds before touching
   the rest. Five short pulse-check clips pushed, round by round, towards a looser and softer hand: drawings generated
   small on the sheet so the pencil grain survives, colour rubbed in rather than cross-hatched, light values with no
   near-black areas, paper texture that moves with the picture instead of sitting on the screen, real re-drawn boil
   instead of digital wobble, and lyric type kept crisp and legible on top.
10. **Three critique rounds on the restyle.** Independent reviewers compared the full pencil cut against the ink cut
    at exact frames. The rounds focused on keeping the cast on-model, removing pale halos around cut-out drawings,
    fixing type that printed over the picture, redrawing glows, skies and stage lights as rubbed pencil, and
    legibility at phone size, until the third pass judged it ready for the 4K master.

### What made the difference

- **One visual idea, everywhere.** The thread gives every scene a reason to exist and every transition a direction.
- **Measure, don't assume.** A measured tempo map and measured word onsets turned "slightly off" into "on the syllable".
- **Review the actual frames.** Contact sheets at word time +83 ms and frame-stepping around every hit caught what
  intuition missed.
- **Fresh eyes.** Reviewers who never saw the build reasoning were the most valuable part of the loop.
- **Cut what doesn't read.** Several gags were built and then removed; a clear frame beat a busy one every time.
- **Restyle on a short slice first.** Settling the look on 24 seconds made each round of feedback fast and cheap.

---

## Engine and techniques

| File | Purpose |
|---|---|
| `src/film.html` | Page shell: fonts, `setup(w, h)`, `seek(t)`, camera, post-processing and the type-on-top pass |
| `src/core.js` | Timing (`beat(n)`, `beatAt(t)` from the tempo map), easings, springs and kicks, seeded noise, lyric lookup, shot registry |
| `src/gfx.js` | Drawing library: sprites, plates, paper and post, lines, the thread, cards and glyphs, lyric type, `slam()` and `stamp()` |
| `src/pencil.js` | Coloured-pencil layer, loaded after `gfx.js`: pencil lines, rubbed fills, thread and tacks, boil-frame cycling |
| `src/tempo.js` | Measured beat times (generated from `audio/tempomap.json`) |
| `src/lyrics.js` | Word onset times (generated from `lyrics_timed.json`) |
| `src/assets.js` | Original ink sprite and plate list (generated by `tools/make_assets_js.py`) |
| `src/assets_pencil.js` | Coloured-pencil drawings that replace the originals by name (generated by `tools/pencil/make_assets_js.py`) |
| `src/shots/01–09_*.js` | One file per song section; each registers its shots with `shot(name, t0, fn)` |
| `render.js`, `frames.js` | Chunked parallel renderer; single-frame renderer for review |

Techniques:

- **Pure function of time.** `seek(t)` picks the latest shot with `t0 ≤ t` and draws it. There's no state between
  frames and no `Math.random` (all randomness is seeded hashing), so any frame can be rendered in any order, and
  chunks can render in parallel.
- **Boil.** Every sprite has three genuinely re-drawn drawings (`name`, `name~1`, `name~2`) cycled at 12 fps ("on
  twos"), while motion stays smooth at the full frame rate. Nothing is wobbled with noise; backgrounds and type hold
  still.
- **Coloured pencil everywhere.** Procedural lines and fills (the thread, cards, glows, skies, stage lights) are drawn
  with pencil texture swatches as world-space grain masks, so the paper and pencil texture move and zoom with the
  picture rather than sitting on the screen. Values stay light: darks are mid-indigo or brown pencil, never black.
- **Crisp type on top.** Lyric type is recorded while the picture is drawn and replayed on top afterwards, so it
  stays crisp. Words that sit behind props are drawn in picture order instead (`bake: true`).
- **Measured tempo map.** `beat(n)` interpolates per-beat drum onsets, so beat-locked moves stay locked through the
  song's rubato. `slam()` and `stamp()` lead the audio by about one frame, so hits read as on the beat.
- **Camera-locked sets.** `bgCam()` draws a background under the same camera as the foreground, with gentle parallax
  and a fixed overscan. The set pans and zooms with the action instead of floating behind it.
- **Motion smear.** During fast camera moves, the picture is drawn blurred along the velocity, with crisp lyric type
  laid over it.

### Regenerating data

```bash
python3 tools/make_lyrics_js.py                    # lyrics_timed.json → src/lyrics.js
python3 tools/audio/tempomap.py --stem <no_vocals.wav> --out audio/tempomap.json   # needs librosa, numpy, scipy
python3 tools/audio/make_tempo_js.py               # audio/tempomap.json → src/tempo.js
python3 tools/make_assets_js.py                    # assets/ → src/assets.js
```

The instrumental and vocal stems came from [demucs](https://github.com/facebookresearch/demucs) (`htdemucs`).

### Generating images

```bash
export OPENAI_API_KEY=...                       # optional: IMAGE_MODEL=... chooses the model (default gpt-image-1)
tools/genone.sh <jobs.tsv> <outdir> <line>      # one job: name, size, background, refs, prompt (tab-separated)
tools/genbatch.sh <jobs.tsv> <outdir> [N]       # run a whole jobs file, N in parallel
node tools/trim.js assets/sprites <outdir>/*.png # alpha-trim new sprites into place
python3 tools/make_assets_js.py                 # register them in src/assets.js
```

### Coloured-pencil drawings

Each pencil drawing is generated opaque on a plain cream sheet (prompts in `prompts/PENCIL_PROMPTS.md`), then:

```bash
pip install pillow numpy scipy
python3 tools/pencil/build.py <gendir> [names...]    # key out the paper, fit onto the original's canvas -> assets/pencil/*.webp
python3 tools/pencil/peel.py --paper-from <gendir> assets/pencil/<name>*.webp   # remove the paper fringe outside the contour
python3 tools/pencil/holes.py --paper-from <gendir> assets/pencil/<name>*.webp  # cut out paper trapped inside (between legs, arm loops)
python3 tools/pencil/make_assets_js.py               # register them in src/assets_pencil.js
```

`build.py` keeps every drawing on the original asset's canvas, so the shot code works unchanged. Busts that run off
the bottom of the sheet are listed in `tools/pencil/cuts.json`. Boil variants (`name~1`, `name~2`) are registered onto
their base drawing; run `holes.py` on a base and its variants together, since variants are checked against the fixed
base. Drawings are stored as lossless WebP.

---

## Repository layout

```
assets/pencil/     coloured-pencil drawings and boil frames used by the film (texture/: pencil grain swatches)
assets/ref/        character sheet and crops; pencil/ holds the coloured-pencil model sheets (generation references)
assets/sets/       original ink background plates
assets/sprites/    original ink characters, props and poses (typing/, windows/ sub-folders)
audio/             measured tempo map
fonts/             Fraunces, Fredoka and Bricolage Grotesque (SIL Open Font License; licences included)
prompts/           workflow prompts and the full image-prompt library
src/               engine and shots
tools/             image generation, trimming, contact sheets and data generators; pencil/ for the pencil drawings
lyrics_timed.json  per-word sung onset times (source of truth)
song.mp3           the soundtrack
```

---

## Credits

- **Inspired by:** "Sequential diagnosis in medicine using language models", *Science*, 22 October 2026.
- **Fonts:** [Fraunces](https://github.com/undercasetype/Fraunces),
  [Fredoka](https://github.com/hafontia/Fredoka-One) and
  [Bricolage Grotesque](https://github.com/ateliertriay/bricolage), all under the SIL Open Font License 1.1 (see
  `fonts/`).
- **Images:** generated with **GPT Image 2.5** and **MAI Image 2.6** from the prompts in
  `prompts/IMAGE_PROMPTS.md` and `prompts/PENCIL_PROMPTS.md`.
- **Rendering:** [Puppeteer](https://pptr.dev/) and [ffmpeg](https://ffmpeg.org/). Audio analysis used demucs,
  librosa and whisper.cpp.
