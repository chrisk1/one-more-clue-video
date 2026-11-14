# One More Clue

A 2 min 17 s music video for the song **"One More Clue"**, inspired by the paper
[*"Sequential diagnosis in medicine using language models"*](https://www.science.org/doi/10.1126/science.aeh7930)
(*Science*, 22 October 2026). It's drawn to look like coloured pencil on cream cartridge paper,
scanned in, with crisp lyric type animated on top.

The film is entirely code. Each frame is a JavaScript function of time `t` that draws onto an HTML canvas using
AI-generated coloured-pencil drawings, pencil lines and fills drawn in code, and the lyric type. Headless Chrome
(Puppeteer) captures each frame and ffmpeg encodes them with the song.

---

## Quick start

You'll need **Node 18+**, **ffmpeg** on your `PATH` (with libx264, plus libx265 for the HEVC encode) and about 4 GB of
free RAM per render worker at 4K.

```bash
npm install                 # installs Puppeteer and its bundled Chrome
npm run preview             # 960×540, 24 fps → out/preview.mp4 (about 1–2 min)
npm run render:4k           # 3840×2160, 30 fps master → out/master_4k.mp4 (about 15–20 min on an M-series Mac)
```

To render individual stills while working on a shot:

```bash
node frames.js --w 1280 --times 21.34,29.43,131.44 --debug   # --debug overlays the time and the shot name
```

The renderer splits the timeline into chunks and renders them in parallel, starting a fresh headless browser for each
chunk. It keeps finished chunks, so an interrupted render picks up where it left off. If you change the resolution or
frame rate, delete the `--tmp` chunk folder first. Keep `--jobs 2` at 4K, as more workers can run out of memory.

**Delivery encodes** from the 4K master:

```bash
# 4K HEVC: plays with hardware decoding on Macs and works for YouTube
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

The film shows diagnosis as a red thread pulled through a pile of clues.

One hand-drawn red thread runs through the whole film. It gets pinned to each new clue, pulled tight, re-routed when
the facts change and split where the reasoning branches. That's sequential diagnosis: ask a question, order a test,
look at the result, update your thinking and choose the next step.

The other recurring elements are:
- **Clue cards.** Small cream index cards, each with a hand-drawn symbol (a question mark, flask, ECG, X-ray, DNA and
  so on). They get pinned, dealt, flipped and weighed.
- **The panel.** Five characters, one for each reasoning role in the paper: Hypothesis, Challenger, Test-Chooser,
  Stewardship and Checklist. They start out as five small neural networks, because in the paper they're one model
  playing five roles. A blue filing-cabinet character plays the simulator that answers questions from the patient's
  records.
- **D·X·O.** Three characters shaped like the letters, who stamp the chorus, mark progress on a growth chart and
  finally conga along the thread to the confirmed diagnosis.

The film only hints at the paper's content. It doesn't show results, figures or named diseases, and the tone is warm,
funny and optimistic.

**Song map**

| Time | Section | What happens |
|---|---|---|
| 0:00–0:24 | Hook and verse 1 | Cork-board opening ("SE·QUEN·TIAL"); five neural networks become the panel; an ECG lands on the committee's table; the thread runs from card to card into the **ONE MORE CLUE** title |
| 0:24–0:47 | Verse 2 | The reasoning wheel spins on the beat (ask → guess → test → result → doubt → update) into **CHAIN OF DEBATE**; a branching vine; breadth vs depth; the cost scales; D·X·O stamps |
| 0:47–0:58 | Chorus 1 | A route is crossed out and re-routed; "little by little, get a better view" |
| 0:58–1:15 | Verse 3 | The benchmark; the simulator runs out of answers, types a *Synthetic result* and files it in its own drawer |
| 1:15–1:30 | Verse 4 | The five roles one by one, then "five coats, one model" |
| 1:30–1:41 | Bridge | Trials on a running track at dusk; a town at night ("could that knowledge reach every bedside?"); the camera rises to the sky on "the least capable it'll ever be" |
| 1:41–2:03 | Chorus 2 | A patient at the centre of a branching web; a globe at dawn; a brass-band curtain call |
| 2:03–2:17 | Finale | One patient's journey pinned along the thread; the lights go down to a spotlight; **Diagnosis confirmed ✓**; the title card |

---

## How it was made

One person made the film by directing a team of AI coding agents. A coordinating agent kept the brief and the
timeline, and each section of the song had its own agent. A separate reviewer agent, which hadn't seen any of the
build discussion, critiqued each cut. The prompts used at each stage are in
[`prompts/WORKFLOW_PROMPTS.md`](prompts/WORKFLOW_PROMPTS.md).

### In numbers

- **14 versions** from first draft to final cut: 12 in a cut-paper and ink style, then two coloured-pencil restyles.
- **8 rounds of the creator's notes** on the ink version, more than 70 notes in all, each tied to an exact timestamp.
- **7 independent critiques** of the ink version, each checking frame by frame that the visuals hit the sung words.
- **5 short test clips and 3 independent critique rounds** for the coloured-pencil restyle.
- **About 180 image-generation prompts** for the original characters, poses, props and backgrounds (in
  [`prompts/IMAGE_PROMPTS.md`](prompts/IMAGE_PROMPTS.md)), and **about 430 coloured-pencil drawings** that redraw all
  of them, including two extra hand-redrawn frames per sprite for the "boil" (in
  [`prompts/PENCIL_PROMPTS.md`](prompts/PENCIL_PROMPTS.md)).
- **Every lyric word timed to the moment it's sung**, and every move that follows the beat driven by a tempo map
  measured from the track.

### How the music video was developed

1. **A first draft, then a fresh start.** The first version worked technically, but it looked generic and didn't tell
   the story of the lyrics. The brief was rewritten to ask for much more: charming, hand-made and funny, with K-pop-style
   direction of the viewer's attention, big animated lyric type, tight sync, ideas rather than literal illustration,
   and an optimistic tone.
2. **Concept before code.** The red-thread idea and a one-page concept document came first. Then came a storyboard
   with one row per lyric line, giving the time, lyric, visual, gag, type placement and camera move. A fresh reviewer
   critiqued both before anyone wrote a shot.
3. **Images.** The five role characters and the filing cabinet came from a single character sheet. Each new pose was
   generated with that sheet (or a crop of one character) as a reference image, using the same style wording every
   time, so the characters stayed consistent. Background plates were generated at 4K with space left for the lyrics.
4. **Shared code first, then sections in parallel.** The shared code came first: timing, easing, the sprite boil,
   cut-paper type, the thread, cards, the camera and post-processing. Then one agent per song section built its shots
   from a common brief, checking its work with contact sheets of frames at every sung word.
5. **Measuring the timing.** The singer and band drift by up to ±130 ms from a fixed tempo, so the fixed beat grid was
   replaced with a tempo map measured from the drum hits in the separated instrumental track. Every lyric word's start
   time was measured again from the separated vocal track, using transcription of short slices and the vocal volume
   envelope. The visuals read these measured times rather than hard-coded numbers.
6. **Critique and fix.** After each major pass, a fresh reviewer agent watched the full render and listed problems by
   priority and timestamp: type that couldn't be read, things overlapping, hits that landed late, moments where nothing
   happened and gags that didn't work. Each problem went back to the agent responsible for that section.
7. **The creator's notes.** Eight rounds of timestamped notes on the rendered film followed. They asked for smoother,
   more deliberate camera moves, backgrounds that move with the camera, a calmer double-time section, a lights-down
   spotlight in the finale, a new font, clearer story moments (such as the simulator typing and filing its synthetic
   result) and cutting gags that weren't worth their place. Each round was split between the agents, checked frame by
   frame at the size people would watch it, and then checked note by note by an independent reviewer.
8. **A first coloured-pencil restyle.** Once the story, timing and camera were settled, the whole film was restyled
   without changing anything else. Each image was redrawn using the original as a reference and placed on the
   original's canvas, so none of the shot code had to change. The first attempt was a clean, delicate picture-book
   style. It still looked too neat and digital, and the aim was for it to look genuinely drawn by hand.
9. **Test clips, then the whole film.** The second restyle was worked out on the first 24 seconds before anything else
   was changed. Five short test clips moved it, one round at a time, towards a looser, softer hand. The drawings were
   generated small on the sheet so the pencil grain would show, colour was rubbed in rather than cross-hatched, dark
   areas were kept light, the paper texture moved with the picture instead of staying fixed on the screen, the boil
   used genuinely redrawn frames instead of a digital wobble, and the lyric type stayed crisp on top.
10. **Three critique rounds on the restyle.** Independent reviewers compared the full pencil version with the ink
    version at the same frames. They looked for characters drifting off-model, pale halos around cut-out drawings,
    type drawn over the wrong part of the picture, glows, skies and stage lights that still needed redrawing in
    pencil, and type that was hard to read on a phone. The third round judged the film ready for the 4K master.

### What helped most

- **A single visual idea.** The thread gave every scene a purpose and every transition a direction.
- **Measuring instead of guessing.** The measured tempo map and word timings moved the hits from slightly off to
  exactly on the syllable.
- **Looking at the actual frames.** Contact sheets 83 ms after each sung word, and stepping frame by frame around each
  hit, caught problems that weren't obvious when watching.
- **Reviewers without the context.** Reviewers who hadn't seen the build discussion gave the most useful feedback.
- **Restyling a short section first.** Working out the look on 24 seconds made each round of feedback quick and cheap.

---

## Code and techniques

| File | Purpose |
|---|---|
| `src/film.html` | Page shell: fonts, `setup(w, h)`, `seek(t)`, camera, post-processing and drawing the type on top |
| `src/core.js` | Timing (`beat(n)`, `beatAt(t)` from the tempo map), easings, springs and kicks, seeded noise, lyric lookup, shot registry |
| `src/gfx.js` | Drawing library: sprites, plates, paper and post-processing, lines, the thread, cards and symbols, lyric type, `slam()` and `stamp()` |
| `src/pencil.js` | Coloured-pencil layer, loaded after `gfx.js`: pencil lines, rubbed-in fills, the thread and tacks, cycling the boil frames |
| `src/tempo.js` | Measured beat times (generated from `audio/tempomap.json`) |
| `src/lyrics.js` | When each word is sung (generated from `lyrics_timed.json`) |
| `src/assets.js` | List of the original ink sprites and plates (generated by `tools/make_assets_js.py`) |
| `src/assets_pencil.js` | Coloured-pencil drawings that replace the originals by name (generated by `tools/pencil/make_assets_js.py`) |
| `src/shots/01–09_*.js` | One file per song section; each registers its shots with `shot(name, t0, fn)` |
| `render.js`, `frames.js` | Parallel renderer that works in chunks; single-frame renderer for review |

Techniques:

- **Each frame depends only on the time.** `seek(t)` finds the latest shot with `t0 ≤ t` and draws it. Nothing carries
  over between frames and nothing uses `Math.random` (randomness comes from seeded hashing), so frames can be rendered
  in any order and chunks can render in parallel.
- **Boil.** Each sprite has three separately redrawn frames (`name`, `name~1`, `name~2`) that cycle at 12 fps ("on
  twos"), while movement stays smooth at the full frame rate. There's no noise-based wobble, and backgrounds and type
  stay still.
- **Pencil texture on everything.** Lines and fills drawn in code (the thread, cards, glows, skies, stage lights) use
  pencil texture samples as grain masks in world space, so the paper and pencil texture move and zoom with the
  picture instead of staying fixed on the screen. Values stay light: the darkest tones are mid-indigo or brown pencil,
  never black.
- **Type drawn last.** Lyric type is recorded while the picture is drawn and then drawn again on top, so it stays
  crisp. Words that sit behind props are drawn in picture order instead (`bake: true`).
- **Measured tempo map.** `beat(n)` interpolates between the measured drum hits, so moves stay on the beat even where
  the song speeds up or slows down. `slam()` and `stamp()` land about one frame before the audio, so the hits feel on
  the beat.
- **Sets that move with the camera.** `bgCam()` draws a background under the same camera as the foreground, with
  gentle parallax and a fixed margin beyond the frame. The set pans and zooms with the action instead of floating
  behind it.
- **Motion smear.** During fast camera moves the picture is blurred along the direction of movement, with crisp lyric
  type over it.

### Regenerating data

```bash
python3 tools/make_lyrics_js.py                    # lyrics_timed.json → src/lyrics.js
python3 tools/audio/tempomap.py --stem <no_vocals.wav> --out audio/tempomap.json   # needs librosa, numpy, scipy
python3 tools/audio/make_tempo_js.py               # audio/tempomap.json → src/tempo.js
python3 tools/make_assets_js.py                    # assets/ → src/assets.js
```

The instrumental and vocal tracks were separated with [demucs](https://github.com/facebookresearch/demucs)
(`htdemucs`).

### Generating images

```bash
export OPENAI_API_KEY=...                       # optional: IMAGE_MODEL=... chooses the model (default gpt-image-1)
tools/genone.sh <jobs.tsv> <outdir> <line>      # one job: name, size, background, refs, prompt (tab-separated)
tools/genbatch.sh <jobs.tsv> <outdir> [N]       # run a whole jobs file, N in parallel
node tools/trim.js assets/sprites <outdir>/*.png # alpha-trim new sprites into place
python3 tools/make_assets_js.py                 # register them in src/assets.js
```

### Coloured-pencil drawings

Each pencil drawing is generated on a plain cream sheet with no transparency (prompts in
`prompts/PENCIL_PROMPTS.md`). Then:

```bash
pip install pillow numpy scipy
python3 tools/pencil/build.py <gendir> [names...]    # key out the paper, fit onto the original's canvas -> assets/pencil/*.webp
python3 tools/pencil/peel.py --paper-from <gendir> assets/pencil/<name>*.webp   # remove the paper fringe outside the outline
python3 tools/pencil/holes.py --paper-from <gendir> assets/pencil/<name>*.webp  # cut out paper trapped inside (between legs, arm loops)
python3 tools/pencil/make_assets_js.py               # register them in src/assets_pencil.js
```

`build.py` places each drawing on the original image's canvas, so the shot code works unchanged. Busts cut off by the
bottom of the sheet are listed in `tools/pencil/cuts.json`. The boil frames (`name~1`, `name~2`) are lined up with
their base drawing. Run `holes.py` on a base drawing and its boil frames together, because the boil frames are checked
against the fixed base. The drawings are stored as lossless WebP.

---

## Repository layout

```
assets/pencil/     coloured-pencil drawings and boil frames used in the film (texture/: pencil grain samples)
assets/ref/        character sheet and crops; pencil/ holds the coloured-pencil character sheets (used as references)
assets/sets/       original ink background plates
assets/sprites/    original ink characters, props and poses (typing/, windows/ sub-folders)
audio/             measured tempo map
fonts/             Fraunces, Fredoka and Bricolage Grotesque (SIL Open Font License; licences included)
prompts/           workflow prompts and every image prompt
src/               drawing code and shots
tools/             image generation, trimming, contact sheets and data generators; pencil/ for the pencil drawings
lyrics_timed.json  when each word is sung (the source for src/lyrics.js)
song.mp3           the soundtrack
```

---

## Credits

- **Inspired by:** ["Sequential diagnosis in medicine using language models"](https://www.science.org/doi/10.1126/science.aeh7930),
  *Science*, 22 October 2026.
- **Fonts:** [Fraunces](https://github.com/undercasetype/Fraunces),
  [Fredoka](https://github.com/hafontia/Fredoka-One) and
  [Bricolage Grotesque](https://github.com/ateliertriay/bricolage), all under the SIL Open Font License 1.1 (see
  `fonts/`).
- **Images:** generated with **GPT Image 2.5** and **MAI Image 2.6** from the prompts in
  `prompts/IMAGE_PROMPTS.md` and `prompts/PENCIL_PROMPTS.md`.
- **Rendering:** [Puppeteer](https://pptr.dev/) and [ffmpeg](https://ffmpeg.org/). Audio analysis used demucs,
  librosa and whisper.cpp.
