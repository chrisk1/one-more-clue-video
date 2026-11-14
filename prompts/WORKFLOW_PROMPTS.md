# Workflow prompts

These are the prompts used to make *One More Clue* with AI agents, lightly edited for clarity. Placeholders are in
`{braces}`. The image-generation prompts are in [IMAGE_PROMPTS.md](IMAGE_PROMPTS.md) for the original ink style and
[PENCIL_PROMPTS.md](PENCIL_PROMPTS.md) for the coloured-pencil restyle. The images were generated with GPT Image 2.5
and MAI Image 2.6.

---

## 1. The creative brief

After the first draft, this brief set the standard for everything that followed:

> Make a music video for this song about the paper. It should be charming, hand-drawn, organic, fun, playful and fast
> moving, with good camera work, attention-grabbing, and closely timed to the music and lyrics. Don't recreate figures or
> results from the paper; stay conceptual and only nudge at its content.
>
> Think deeply about how to represent every lyric on screen. You can do anything: abstract motion graphics, characters,
> kinetic typography, all rendered in JavaScript with a hand-made papery feel. Push the aesthetic somewhere fresh, and
> avoid anything generic.
>
> Think like a real music video: inserts, characters doing something unexpected, a very strong visual hook. Use
> K-pop-style attention direction, with big, present, beautifully animated lyric typography. Keep the background calm
> where the lyrics are big, and sometimes put characters on one side and type on the other.
>
> Plan composition and timing rigorously before building. Watch the whole video many times and check individual frames.
> It should tell the story of the lyrics in a witty, conceptually accurate way, with optimism about AI-assisted diagnosis
> and the theme of sequentiality (question → test → result → update → next test …).

In short:
- Build the film around one strong visual idea.
- Treat the lyrics as designed type.
- Turn every line into a small gag.
- Time the words to the syllable.
- Hint at the paper's content without charting it.
- Keep the tone optimistic.
- Plan first, then look at the actual frames again and again.

---

## 2. Concept and storyboard

> Write a one-page concept bible for the video: the single visual idea, tone, palette, type system, camera language and
> the recurring devices. Then write a storyboard table, one row per lyric line, with columns: time range → lyric → what
> we see → the gag → where the type sits → camera move. Every line needs a visual idea that *tells* the lyric, not just
> decorates it. Then hand both documents to a fresh reviewer for a blunt critique and revise.

This produced the film's central idea: diagnosis as a red thread pulled through a pile of clues. One hand-drawn red
thread runs through the film. It gets pinned to each new clue, re-routed when the facts change, and ends on
"Diagnosis confirmed ✓".

---

## 3. Shot-writer brief (one agent per song section)

A separate agent built each section of the song in its own file. Every agent got the same brief:

> You own `src/shots/{file}` ({time range}, lyrics: {lines with word onset times}). Read `src/core.js` and `src/gfx.js`
> first; reuse their helpers.
>
> **Look:** one colour wash per scene; hand-drawn ink that boils at 12 fps while motion stays smooth; cream paper
> grain; the red thread is the most saturated thing in frame. Lyric type is cut-paper and composed into the frame, never
> smaller than 80 px at 1080p.
>
> **Rules:** every frame is a pure function of `t` (no `Math.random`, no state between frames); use `beat(n)` and the
> lyric word times rather than literal numbers; wrap everything in an IIFE; save and restore the camera.
>
> **Loop:** render frames at each sung word time + 83 ms, tile them into a contact sheet, look at it, fix, and repeat at
> least three times. Report what each shot does, which assets you generated, and the contact-sheet paths.

---

## 4. Lyric timing

> Find the true sung onset of every word from {A} s to {B} s. Don't trust a single transcription.
> - Separate the vocals (demucs), then transcribe short isolated slices with Whisper and bracket each word by moving the
>   slice edges.
> - Confirm with the vocal-band energy envelope at 10–20 ms resolution (sharp rises are onsets).
> - Cross-check against the measured beat map; sung syllables usually sit near 8th or 16th grid points.
>
> Write the times into `lyrics_timed.json`, regenerate `src/lyrics.js`, and make every visual hit read its time from
> the lyric data instead of hard-coded numbers. Validate with frames at each word time and a low-res clip with audio.
> Report an old → new table.

**Tempo map.** The track drifts by up to ±130 ms from a fixed tempo. `beat(n)` uses a map of every beat, measured
from the drum hits in the separated instrumental track (`tools/audio/tempomap.py` → `audio/tempomap.json` →
`src/tempo.js`), so moves that follow the beat stay on it for the whole song.

---

## 5. Independent director's critique (run after every major pass)

This was always run by a fresh agent that hadn't seen any of the build discussion:

> You are a demanding music-video director and motion designer reviewing a draft. Read-only. The goal: charming, witty,
> fast, with big kinetic lyric typography tightly synced to the sung words, telling the story, optimistic. The preview
> with audio is `{file}`; word timings are in `lyrics_timed.json`. Extract frames with ffmpeg and look at them. For sync,
> compare the frame where each key word lands with its sung time.
>
> Write `CRITIQUE.md` with a ranked list (max ~25) of concrete, fixable problems: timestamp, what's wrong, and a
> specific fix. Priority:
> 1. Anything illegible, clipped, overlapping or confusing.
> 2. Lyric words missing, or more than ~60 ms off.
> 3. Dead moments where nothing lands on the beat.
> 4. Visuals that don't tell the lyric.
> 5. Jarring transitions or uncomfortable camera moves.
>
> Then give a gag-by-gag verdict (reads / too subtle / cut) and a publication-readiness verdict. Be specific and blunt.

Each finding became a specific follow-up for the agent responsible for that section.

---

## 6. Polish pass

> Look for every moment where the screen is static or a lyric is only illustrated, not dramatised. Aim for a small smile
> roughly every five seconds: a witty, on-beat moment that supports the line's meaning. Keep every word time and beat
> hit. Prefer one clear, readable gag over several small ones; if a gag can't be read at normal viewing size, cut it.
> Keep camera work deliberate and smooth (eased push-ins and glides, never jittery). Do at least three render → review
> → fix loops.

---

## 7. Applying timestamped notes

Every round of the creator's notes was handled the same way:

> Here are the notes, each with a timestamp. Split them by the files that own those moments and give each agent its
> notes verbatim plus the exact word and beat times involved. Each agent fixes its own notes and verifies with
> frame-stepped stills at 960 px (the size viewers actually see). Then render the whole film and have a fresh reviewer
> check every note: PASS / PARTIAL / FAIL with frame evidence, plus any regressions. Iterate until every note passes.

---

## 8. Coloured-pencil restyle

Once the ink version was finished, the look was changed without touching the story, timing or camera. A summary of
the restyle brief:

> Restyle the finished film so that every picture looks drawn by hand in coloured pencil on cream cartridge paper and
> scanned: soft, warm and charming, like a classic hand-drawn animated film. Keep the storyboard, timing, camera moves
> and lyrics identical; only the drawing technique changes. Keep the lyric type crisp and legible on top.
>
> Redraw every image with the original as the reference, generated opaque on plain paper, then key it out and fit it
> onto the original's canvas so the shot code doesn't change. Give each character a pencil model sheet and pass it with
> every pose so the cast stays on-model. Redraw procedural elements (lines, fills, the thread, glows, skies, lights) as
> pencil too.
>
> Settle the look on the first 24 seconds before rolling it out, and compare against the ink cut at exact frames.

**Test clips.** Five short clips of the opening were rendered and reviewed before the rest of the film was restyled.
Each round of feedback pushed the same way, from something neat and digital-looking towards something looser, softer
and genuinely hand-made. The lessons from these clips became the rules for the rest of the film:
- Generate drawings small on the sheet so the pencil grain survives on screen.
- Rub colour in with the side of the pencil; no cross-hatching or neat parallel strokes.
- Keep values light: no near-black areas.
- Paper and pencil texture belong to the drawing (world space), never fixed to the screen.
- Boil comes from genuinely re-drawn drawings, never from noise or displacement.
- Lyric type stays crisp computer type on top of the picture.

---

## 9. Restyle critique

A fresh agent that hadn't seen the build discussion reviewed each full pencil render:

> Review the coloured-pencil cut against the ink cut at matching frames. Read-only. Check that every drawing reads as
> genuine hand-drawn coloured pencil and stays on-model, that nothing kept the old ink look, that cut-out drawings have
> no pale halos or fringes, that type is crisp, legible at phone size and in the right depth order, and that timing,
> boil and camera match the ink cut. Check the status of every item from the previous round (fixed / partial / not
> fixed) and look for regressions. Give a ranked, timestamped list of fixes and a verdict on readiness for the 4K master.

There were three rounds. The findings went back to the agents responsible for the drawings or shots involved, and
after the third round the film was ready for the final 4K render.
