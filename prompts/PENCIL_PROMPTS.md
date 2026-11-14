# Coloured-pencil image prompts

Every drawing in `assets/pencil/` was generated **opaque on a plain sheet of cream paper** from the original ink asset of the same name (image 1) plus a style reference (image 2), then keyed out and fitted onto the original's canvas with `tools/pencil/` (see the README). The prompts below are the ones used, with references to specific films replaced by generic descriptions. Paths are relative to the repository root.

Images were generated with **GPT Image 2.5** and **MAI Image 2.6** at high quality.

## Shared style clause

Appended to every character, prop and window drawing:

```
Redraw this character as a quick, loose, genuine coloured-pencil SKETCH done by hand on cream cartridge paper and scanned. Use ONLY coloured pencils — no black ink, no marker, no clean outlines. The contours are drawn in soft dark-brown and in darker shades of each colour with a light, quick, nervous hand: wobbly, uneven, sometimes doubled or slightly off, thin in places and fuzzy where the pencil caught the paper grain — clearly imperfect hand-drawn lines. Colour is scribbled and rubbed in softly with the side of the pencil in loose, multi-directional strokes (not neat parallel hatching), a little patchy, slightly over and under the lines, gently layered darker on the shadow side, paper tooth showing through everywhere as tiny pale specks. The whole drawing looks soft, hazy and tactile, like the gentle hand-coloured frames of a classic hand-drawn animated film — warm, tender and full of charm.
```

## Openings

| Key | Opening (image 1 = original asset, image 2 = reference) |
|---|---|
| P | Image 1 is the pose to draw. Image 2 is the character model drawing: it shows exactly how this character looks and how it is drawn (the same loose, scanned coloured-pencil sketch technique, soft brown pencil contours, rubbed-in colour). Draw image 1's exact pose, gesture, expression and props, drawn exactly like image 2. |
| S | Image 1 is the subject to draw. Image 2 is only a STYLE example. Redraw image 1's exact subject, shape, angle, details and colours, but drawn in exactly the loose, scanned coloured-pencil sketch technique of image 2. |
| B | Image 1 is the pose to draw. Image 2 is the character model drawing (exact look and the loose, scanned coloured-pencil technique). Draw image 1's exact head-and-shoulders bust, expression and framing, drawn exactly like image 2. |

`P` was used for characters (image 2 = the character's model sheet in `assets/ref/pencil/`), `S` for props and windows (image 2 = a finished pencil drawing as a style example), `B` for head-and-shoulders busts.

## Layout clauses

Appended after the style clause; `N` is the per-drawing size in the table below. Busts are listed in `tools/pencil/cuts.json` so the cut edge stays straight when keyed out.

| Key | Clause |
|---|---|
| L1 | IMPORTANT: draw it SMALL on the sheet — about N% of the sheet's height (or width if wide), centred, with plenty of empty cream paper all around it — drawn with a normal-sized pencil so the pencil lines and grain stay bold. On a plain sheet of cream cartridge paper; nothing else, no shadow, no text. |
| L2 | IMPORTANT: draw the full figure SMALL on the sheet — about N% of the sheet's height, centred, with lots of empty cream paper all around it — drawn with a normal-sized pencil (so the pencil lines and grain are bold relative to the small figure, like a small sketch in a sketchbook). On a plain sheet of cream cartridge paper; nothing else, no shadow, no text. |
| L3 | IMPORTANT: compose exactly like image 1 — the subject is cut off by the BOTTOM edge of the sheet with a straight cut, filling about N% of the sheet's height, centred, cream paper on the other sides. Normal-sized pencil so the lines and grain stay bold. On a plain sheet of cream cartridge paper; nothing else, no shadow, no text. |
| L4 | IMPORTANT: compose it exactly like image 1 — a HEAD-AND-SHOULDERS figure peeking up from below: the body is cut off by the BOTTOM edge of the sheet with a straight horizontal cut (as if hidden behind a table), hands raised as in image 1; the figure fills about N% of the sheet's height, centred, cream paper on the other three sides. Drawn with a normal-sized pencil so lines and grain stay bold. On a plain sheet of cream cartridge paper; nothing else, no shadow, no text. |
| L5 | Preserve exact skin tones and hair colours (deep and brown skin stays deep and brown). IMPORTANT: draw it SMALL on the sheet — about N% of the sheet's height (or width if wide), centred, with plenty of empty cream paper all around it — drawn with a normal-sized pencil so the pencil lines and grain stay bold. On a plain sheet of cream cartridge paper; nothing else, no shadow, no text. |
| L6 | Preserve exact skin tones and hair colours (deep and brown skin stays deep and brown). IMPORTANT: compose exactly like image 1 — the subject is cut off by the BOTTOM edge of the sheet with a straight cut, filling about N% of the sheet's height, centred, cream paper on the other sides. Normal-sized pencil so the lines and grain stay bold. On a plain sheet of cream cartridge paper; nothing else, no shadow, no text. |
| L7 | IMPORTANT: a FULL-WIDTH bust: the shoulders and white lab coat run straight off the BOTTOM edge of the sheet — the body is cut by the bottom edge in one straight horizontal line across the whole width of the shoulders (no steps or notches); the figure fills about N% of the sheet's height, centred, cream paper above and to the sides. Plain cream cartridge paper; nothing else, no text. |
| L8 | This is a NIGHT-TIME scene seen through a window: keep the same dark values and the warm lamp glow of image 1 — the figures stay as dark, near-silhouettes; drawn in coloured pencil on dark-toned paper feel. IMPORTANT: draw it SMALL on the sheet — about N% of the sheet's height (or width if wide), centred, with plenty of empty cream paper all around it — drawn with a normal-sized pencil so the pencil lines and grain stay bold. On a plain sheet of cream cartridge paper; nothing else, no shadow, no text. |
| L9 | Preserve exact skin tones and hair colours (deep and brown skin stays deep and brown). This is a NIGHT-TIME scene seen through a window: keep the same dark values and the warm lamp glow of image 1 — the figures stay as dark, near-silhouettes; drawn in coloured pencil on dark-toned paper feel. IMPORTANT: compose exactly like image 1 — the subject is cut off by the BOTTOM edge of the sheet with a straight cut, filling about N% of the sheet's height, centred, cream paper on the other sides. Normal-sized pencil so the lines and grain stay bold. On a plain sheet of cream cartridge paper; nothing else, no shadow, no text. |
| L10 | This is a NIGHT-TIME scene seen through a window: keep the same dark values and the warm lamp glow of image 1 — the figures stay as dark, near-silhouettes; drawn in coloured pencil on dark-toned paper feel. IMPORTANT: compose exactly like image 1 — the subject is cut off by the BOTTOM edge of the sheet with a straight cut, filling about N% of the sheet's height, centred, cream paper on the other sides. Normal-sized pencil so the lines and grain stay bold. On a plain sheet of cream cartridge paper; nothing else, no shadow, no text. |

## Model sheets

One model sheet per character (`assets/ref/pencil/`) keeps the cast on-model. The Challenger, Hypothesis and Test-Chooser sheets were developed first over a few iterations; every other sheet used the character's ink pose as image 1 and the Challenger sheet as the style example:

```
Image 1 shows the character and pose. Image 2 is a style example: draw image 1's character in exactly the same loose, scanned coloured-pencil sketch technique as image 2 (same soft brown pencil contours, same rubbed-in colour, same paper). <style clause> Keep image 1's character recognisably the same: same face, hair, glasses, clothes, colours, pose, gesture and props. Full figure, centred with a generous margin, on a plain sheet of cream cartridge paper (nothing else, no shadow, no text).
```

For the patient and helpers, the sheet also says: *preserve the exact skin tone and hair colour (deep and brown skin stays deep and brown)*.

## Boil drawings

Hand-drawn animation never holds a drawing perfectly still. Each sprite has two re-drawn variants (`name~1`, `name~2`) that the film cycles at 12 fps. Each variant uses the finished drawing as its only reference:

```
Re-draw this exact coloured-pencil sketch again by hand on a fresh sheet of the same cream paper, as the next drawing of a hand-drawn animation held on the same pose: identical pose, position on the sheet, size, proportions, colours and amount of shading — but all the pencil strokes are drawn afresh, so the soft wobbly contours and the rubbed-in colour fall slightly differently, exactly as when an animator re-draws the same drawing. Same loose, scanned coloured-pencil technique. Do not add, remove, move or crop anything differently. Plain cream paper around it, nothing else, no text.
```

Variants whose silhouette overlapped the base drawing by less than 86% (IoU) were rejected and redrawn.

## Backgrounds, paper and special cases

### `cork` (3840x2160)

References: `assets/sets/set_cork.png`

```
Redraw this exact scene with the SAME composition, camera angle, perspective and objects in the same positions, as a background for a gentle, classic hand-drawn animated film, drawn by hand in soft coloured pencils and watercolour pencils on cream cartridge paper, then scanned: soft brown-grey pencil lines that wobble a little, colour rubbed in softly with the side of the pencil and lightly blended (NO cross-hatching, no neat parallel hatching), soft hazy tonal shading, paper grain everywhere. Quiet, warm and charming. Keep the EXACT time of day, lighting and colour values (night stays dark night, dusk stays dusk, dawn stays dawn). No text, no people. The cork board fills the frame: soft, calm cork texture of rubbed pencil dabs, warm honey-brown.
```

### `cork_even` (3840x2160)

References: `assets/sets/set_cork_even.png`

```
Redraw this exact scene with the SAME composition, camera angle, perspective and objects in the same positions, as a background painting for a classic hand-drawn animated film: entirely soft coloured pencil and wax crayon on warm toothy paper, layered directional strokes, soft atmospheric tonal shading, gentle diffuse light, muted natural palette, visible paper grain everywhere, soft sepia pencil construction lines, no ink outlines, no flat digital fills. Quiet, warm, hand-made. The cork board fills the frame edge to edge, EVENLY lit with no light beams, no shadows and no frame: fine, even, calm cork grain drawn with small soft crayon dabs and stipple, warm honey-brown, uniform across the whole sheet. No text, no people.
```

### `door` (2160x3840)

References: `assets/sets/set_door.png`

```
Redraw this exact scene with the SAME composition, camera angle, perspective and objects in the same positions, as a background for a gentle, classic hand-drawn animated film, drawn by hand in soft coloured pencils and watercolour pencils on cream cartridge paper, then scanned: soft brown-grey pencil lines that wobble a little, colour rubbed in softly with the side of the pencil and lightly blended (NO cross-hatching, no neat parallel strokes, no airbrushed gradients), soft hazy shading, lots of paper grain and some cream paper showing through. IMPORTANT: keep it LIGHT and airy like a coloured-pencil drawing — no near-black areas; the darkest values are mid-tone indigo / brown pencil, the sky is rubbed in with the pencil rather than a smooth gradient. Quiet, warm and charming. No text, no people.
```

### `globe` (1024x1024) · 2 boil variants

References: `assets/sprites/prop_globe.png`, `assets/ref/pencil/challenger.webp`

```
Image 1 is the subject. Image 2 is only a STYLE example. Redraw image 1's globe (same continents, same framing) in exactly the loose, scanned coloured-pencil technique of image 2: the oceans are soft blue colour RUBBED in with the side of the pencil in gentle multi-directional strokes (NO parallel hatching, no diagonal lines), the land soft greens and ochres, soft shading toward one side, wobbly soft brown pencil outline. About 70% of the sheet's width, centred, on a plain sheet of cream cartridge paper; nothing else, no text.
```

### `notes` (3840x2160)

References: `assets/sets/set_notes.png`

```
Redraw this exact scene with the SAME composition, camera angle, perspective and objects in the same positions, as a background for a gentle, classic hand-drawn animated film, drawn by hand in soft coloured pencils and watercolour pencils on cream cartridge paper, then scanned: soft brown-grey pencil lines that wobble a little, colour rubbed in softly with the side of the pencil and lightly blended (NO cross-hatching, no neat parallel hatching), soft hazy tonal shading, paper grain everywhere. Quiet, warm and charming. Keep the EXACT time of day, lighting and colour values (night stays dark night, dusk stays dusk, dawn stays dawn). No text, no people.
```

### `pa_hand_pinch` (1024x1536) · 1 boil variants

References: `assets/sprites/pa_hand_pinch.png`, `assets/ref/pencil/hypothesis.webp`

```
Redraw this exact object, same shape and angle, as a loose, genuine coloured-pencil sketch in exactly the technique of image 2 (soft brown pencil contours, colour rubbed in with the side of the pencil, paper grain). It is Hypothesis's yellow hand pinching, with a white lab-coat sleeve cuff, reaching DOWN from the TOP edge of the sheet (the sleeve is cut off by the top edge); image 2 shows the style and the yellow skin. About 60% of the sheet's height, on a plain sheet of cream cartridge paper; nothing else, no shadow, no text.
```

### `paper` (3840x2160)

References: —

```
A flat, evenly lit high-resolution scan of a sheet of warm cream cartridge drawing paper with a fine, soft tooth, filling the frame edge to edge. Subtle fibres and grain, no vignette, no shadows, no marks, nothing drawn on it.
```

### `room` (3840x2160)

References: `assets/sets/set_room.png`

```
Redraw this exact scene with the SAME composition, camera angle, perspective and objects in the same positions, as a background for a gentle, classic hand-drawn animated film, drawn by hand in soft coloured pencils and watercolour pencils on cream cartridge paper, then scanned: soft brown-grey pencil lines that wobble a little, colour rubbed in softly with the side of the pencil and lightly blended (NO cross-hatching, no neat parallel hatching), soft hazy tonal shading, paper grain everywhere. Quiet, warm and charming. Keep the same time of day and lighting. No text, no people.
```

### `table` (1536x1024) · 2 boil variants

References: `assets/sprites/prop_table.png`, `assets/ref/pencil/challenger.webp`

```
Redraw this exact object, same shape and angle, as a loose, genuine coloured-pencil sketch in exactly the technique of image 2 (soft brown pencil contours, colour rubbed in with the side of the pencil, paper grain). Use image 2 only as the drawing-style reference. Draw it at about 55% of the sheet's width, centred, on a plain sheet of cream cartridge paper; nothing else, no shadow, no text.
```

### `tabletop` (3840x2160)

References: `assets/sets/set_tabletop.png`

```
Redraw this exact scene with the SAME composition, camera angle, perspective and objects in the same positions, as a background painting for a classic hand-drawn animated film: entirely soft coloured pencil and wax crayon on warm toothy paper, layered directional strokes, soft atmospheric tonal shading, gentle diffuse light, muted natural palette, visible paper grain everywhere, soft sepia pencil construction lines, no ink outlines, no flat digital fills. Quiet, warm, hand-made. Keep the same time of day and lighting. Draw it with crisp, fine detail: sharp pencil wood-grain lines, knots and plank joints drawn with a sharpened pencil, so it still looks drawn (not blurry) when enlarged. No text, no people.
```

### `town_night` (3840x2160)

References: `assets/sets/set_town_night.png`

```
Redraw this exact scene with the SAME composition, camera angle, perspective and objects in the same positions, as a background for a gentle, classic hand-drawn animated film, drawn by hand in soft coloured pencils and watercolour pencils on cream cartridge paper, then scanned: soft brown-grey pencil lines that wobble a little, colour rubbed in softly with the side of the pencil and lightly blended (NO cross-hatching, no neat parallel strokes, no airbrushed gradients), soft hazy shading, lots of paper grain and some cream paper showing through. IMPORTANT: keep it LIGHT and airy like a coloured-pencil drawing — no near-black areas; the darkest values are mid-tone indigo / brown pencil, the sky is rubbed in with the pencil rather than a smooth gradient. Quiet, warm and charming. No text, no people. Time of day: night — a soft mid-indigo coloured-pencil night (not black), with warm lit windows rubbed in yellow and orange pencil, a few pale stars.
```

### `track_dawn` (3840x2160)

References: `assets/sets/set_track_dawn.png`

```
Redraw this exact scene with the SAME composition, camera angle, perspective and objects in the same positions, as a background for a gentle, classic hand-drawn animated film, drawn by hand in soft coloured pencils and watercolour pencils on cream cartridge paper, then scanned: soft brown-grey pencil lines that wobble a little, colour rubbed in softly with the side of the pencil and lightly blended (NO cross-hatching, no neat parallel strokes, no airbrushed gradients), soft hazy shading, lots of paper grain and some cream paper showing through. IMPORTANT: keep it LIGHT and airy like a coloured-pencil drawing — no near-black areas; the darkest values are mid-tone indigo / brown pencil, the sky is rubbed in with the pencil rather than a smooth gradient. Quiet, warm and charming. No text, no people. Time of day: golden dawn (soft gold and pink sky).
```

### `track_dusk` (3840x2160)

References: `assets/sets/set_track_dusk.png`

```
Redraw this exact scene with the SAME composition, camera angle, perspective and objects in the same positions, as a background for a gentle, classic hand-drawn animated film, drawn by hand in soft coloured pencils and watercolour pencils on cream cartridge paper, then scanned: soft brown-grey pencil lines that wobble a little, colour rubbed in softly with the side of the pencil and lightly blended (NO cross-hatching, no neat parallel strokes, no airbrushed gradients), soft hazy shading, lots of paper grain and some cream paper showing through. IMPORTANT: keep it LIGHT and airy like a coloured-pencil drawing — no near-black areas; the darkest values are mid-tone indigo / brown pencil, the sky is rubbed in with the pencil rather than a smooth gradient. Quiet, warm and charming. No text, no people. Time of day: warm dusk (soft lilac and peach sky).
```

### `waiting` (3840x2160)

References: `assets/sets/set_waiting.png`

```
Redraw this exact scene with the SAME composition, camera angle, perspective and objects in the same positions, as a background for a gentle, classic hand-drawn animated film, drawn by hand in soft coloured pencils and watercolour pencils on cream cartridge paper, then scanned: soft brown-grey pencil lines that wobble a little, colour rubbed in softly with the side of the pencil and lightly blended (NO cross-hatching, no neat parallel hatching), soft hazy tonal shading, paper grain everywhere. Quiet, warm and charming. Keep the EXACT time of day, lighting and colour values (night stays dark night, dusk stays dusk, dawn stays dawn). No text, no people.
```

## Texture swatches

Used by `src/pencil.js` as grain masks for procedural pencil lines and fills (`assets/pencil/texture/`).

### `hatch` (2048x2048)

```
A scanned sheet of white cartridge paper evenly covered, edge to edge, with medium-grey graphite pencil hatching: dense parallel diagonal strokes (bottom-left to top-right) of slightly varying length, pressure and spacing, laid down by hand in overlapping patches, with the paper tooth showing as tiny white specks through the strokes. Uniform coverage across the whole sheet, no shapes, no shading gradient, no border, no text.
```

### `soft` (2048x2048)

```
A scanned sheet of white cartridge paper evenly covered, edge to edge, with soft mid-grey coloured-pencil shading: the side of the pencil lead rubbed in gentle overlapping strokes in mixed directions, smooth but visibly hand made, the paper's tooth showing as fine white grain throughout. Uniform tone across the whole sheet, no shapes, no border, no text.
```

## Per-drawing table

Opening + layout keys from above, the size clause `N`, the number of boil variants, and the reference images.

| Drawing | Size | Prompt | N | Boil | References |
|---|---|---|---|---|---|
| `bell` | 1024x1024 | S + L1 | 40% | 2 | `assets/sprites/prop_bell.png`, `assets/ref/pencil/challenger.webp` |
| `bulb` | 1024x1024 | S + L1 | 40% | 2 | `assets/sprites/prop_bulb.png`, `assets/ref/pencil/challenger.webp` |
| `chal_backready` | 1024x1536 | P + L1 | 40% | 2 | `assets/sprites/chal_backready.png`, `assets/ref/pencil/challenger.webp` |
| `chal_backrun` | 1024x1536 | P + L1 | 40% | 2 | `assets/sprites/chal_backrun.png`, `assets/ref/pencil/challenger.webp` |
| `chal_cheer` | 1024x1536 | P + L2 | 50% | 2 | `assets/sprites/chal_cheer.png`, `assets/ref/pencil/challenger.webp` |
| `chal_jog` | 1024x1536 | P + L2 | 50% | 2 | `assets/sprites/chal_jog.png`, `assets/ref/pencil/challenger.webp` |
| `chal_lean` | 1024x1536 | P + L3 | 80% | 2 | `assets/sprites/chal_lean.png`, `assets/ref/pencil/challenger.webp` |
| `chal_leanin` | 1024x1536 | P + L1 | 74% | 2 | `assets/sprites/chal_leanin.png`, `assets/ref/pencil/challenger.webp` |
| `chal_peek` | 1024x1536 | P + L4 | 70% | 2 | `assets/sprites/chal_peek.png`, `assets/ref/pencil/challenger.webp` |
| `chal_point` | 1024x1536 | P + L2 | 50% | 2 | `assets/sprites/chal_point.png`, `assets/ref/pencil/challenger.webp` |
| `chal_sneak` | 1024x1024 | P + L1 | 76% | 2 | `assets/sprites/chal_sneak.png`, `assets/ref/pencil/challenger.webp` |
| `chal_tack` | 1024x1536 | P + L1 | 64% | 2 | `assets/sprites/chal_tack.png`, `assets/ref/pencil/challenger.webp` |
| `chal_trombone_a` | 1024x1024 | P + L1 | 52% | 2 | `assets/sprites/chal_trombone_a.png`, `assets/ref/pencil/challenger.webp` |
| `chal_trombone_b` | 1024x1536 | P + L3 | 60% | 2 | `assets/sprites/chal_trombone_b.png`, `assets/ref/pencil/challenger.webp` |
| `ck_backready` | 1024x1536 | P + L1 | 42% | 2 | `assets/sprites/ck_backready.png`, `assets/ref/pencil/checklist.webp` |
| `ck_backrun` | 1024x1536 | P + L1 | 40% | 2 | `assets/sprites/ck_backrun.png`, `assets/ref/pencil/checklist.webp` |
| `ck_cheer` | 1024x1536 | P + L2 | 50% | 2 | `assets/sprites/ck_cheer.png`, `assets/ref/pencil/checklist.webp` |
| `ck_jog` | 1024x1536 | P + L2 | 50% | 2 | `assets/sprites/ck_jog.png`, `assets/ref/pencil/checklist.webp` |
| `ck_leanin` | 1024x1536 | P + L1 | 69% | 2 | `assets/sprites/ck_leanin.png`, `assets/ref/pencil/checklist.webp` |
| `ck_peek` | 1024x1536 | P + L4 | 70% | 2 | `assets/sprites/ck_peek.png`, `assets/ref/pencil/checklist.webp` |
| `ck_point` | 1024x1536 | P + L2 | 50% | 2 | `assets/sprites/ck_point.png`, `assets/ref/pencil/checklist.webp` |
| `ck_tack` | 1024x1536 | P + L1 | 64% | 2 | `assets/sprites/ck_tack.png`, `assets/ref/pencil/checklist.webp` |
| `ck_tick` | 1024x1536 | P + L1 | 64% | 2 | `assets/sprites/ck_tick.png`, `assets/ref/pencil/checklist.webp` |
| `gk_empty` | 1024x1536 | P + L1 | 68% | 2 | `assets/sprites/gk_empty.png`, `assets/ref/pencil/gatekeeper.webp` |
| `gk_hop` | 1024x1024 | P + L1 | 50% | 2 | `assets/sprites/gk_hop.png`, `assets/ref/pencil/gatekeeper.webp` |
| `gk_stand` | 1024x1536 | P + L3 | 68% | 2 | `assets/sprites/gk_stand.png`, `assets/ref/pencil/gatekeeper.webp` |
| `gk_walk` | 1536x1024 | P + L1 | 52% | 2 | `assets/sprites/gk_walk.png`, `assets/ref/pencil/gatekeeper.webp` |
| `gk_wink` | 1024x1536 | P + L1 | 75% | 2 | `assets/sprites/gk_wink.png`, `assets/ref/pencil/gatekeeper.webp` |
| `gktw_a` | 1024x1536 | P + L1 | 80% | 2 | `assets/sprites/typing/gktw_a.png`, `assets/ref/pencil/gatekeeper.webp` |
| `gktw_b` | 1024x1536 | P + L1 | 80% | 2 | `assets/sprites/typing/gktw_b.png`, `assets/ref/pencil/gatekeeper.webp` |
| `gktw_c` | 1024x1536 | P + L1 | 80% | 2 | `assets/sprites/typing/gktw_c.png`, `assets/ref/pencil/gatekeeper.webp` |
| `gktw_l` | 1024x1536 | P + L1 | 80% | 2 | `assets/sprites/typing/gktw_l.png`, `assets/ref/pencil/gatekeeper.webp` |
| `help_farmer` | 1024x1536 | P + L5 | 40% | 2 | `assets/sprites/help_farmer.png`, `assets/ref/pencil/farmer.webp` |
| `help_grandma` | 1024x1536 | P + L5 | 40% | 2 | `assets/sprites/help_grandma.png`, `assets/ref/pencil/grandma.webp` |
| `help_kid` | 1024x1536 | P + L5 | 40% | 2 | `assets/sprites/help_kid.png`, `assets/ref/pencil/kid.webp` |
| `help_mother` | 1024x1536 | P + L6 | 60% | 2 | `assets/sprites/help_mother.png`, `assets/ref/pencil/mother.webp` |
| `help_nurse` | 1024x1536 | P + L5 | 40% | 2 | `assets/sprites/help_nurse.png`, `assets/ref/pencil/nurse.webp` |
| `help_wheel` | 1024x1536 | P + L5 | 40% | 2 | `assets/sprites/help_wheel.png`, `assets/ref/pencil/wheel.webp` |
| `hyp_backready` | 1024x1536 | P + L1 | 40% | 2 | `assets/sprites/hyp_backready.png`, `assets/ref/pencil/hypothesis.webp` |
| `hyp_backrun` | 1024x1536 | P + L1 | 40% | 2 | `assets/sprites/hyp_backrun.png`, `assets/ref/pencil/hypothesis.webp` |
| `hyp_cheer` | 1024x1536 | P + L2 | 50% | 2 | `assets/sprites/hyp_cheer.png`, `assets/ref/pencil/hypothesis.webp` |
| `hyp_hop` | 1024x1024 | P + L1 | 51% | 2 | `assets/sprites/hyp_hop.png`, `assets/ref/pencil/hypothesis.webp` |
| `hyp_jog` | 1024x1536 | P + L2 | 50% | 2 | `assets/sprites/hyp_jog.png`, `assets/ref/pencil/hypothesis.webp` |
| `hyp_leanin` | 1024x1024 | P + L1 | 53% | 2 | `assets/sprites/hyp_leanin.png`, `assets/ref/pencil/hypothesis.webp` |
| `hyp_lid` | 1024x1536 | P + L1 | 80% | 2 | `assets/sprites/hyp_lid.png`, `assets/ref/pencil/hypothesis.webp` |
| `hyp_peek` | 1536x1024 | P + L2 | 50% | 2 | `assets/sprites/hyp_peek.png`, `assets/ref/pencil/hypothesis.webp` |
| `hyp_point` | 1024x1536 | P + L2 | 50% | 2 | `assets/sprites/hyp_point.png`, `assets/ref/pencil/hypothesis.webp` |
| `hyp_present` | 1024x1024 | P + L1 | 64% | 2 | `assets/sprites/hyp_present.png`, `assets/ref/pencil/hypothesis.webp` |
| `hyp_raisehand` | 1024x1536 | P + L2 | 50% | 2 | `assets/sprites/hyp_raisehand.png`, `assets/ref/pencil/hypothesis.webp` |
| `hyp_stand` | 1024x1024 | P + L1 | 61% | 2 | `assets/sprites/hyp_stand.png`, `assets/ref/pencil/hypothesis.webp` |
| `hyp_tack` | 1024x1536 | P + L1 | 64% | 2 | `assets/sprites/hyp_tack.png`, `assets/ref/pencil/hypothesis.webp` |
| `hyp_tuba_a` | 1024x1536 | P + L1 | 64% | 2 | `assets/sprites/hyp_tuba_a.png`, `assets/ref/pencil/hypothesis.webp` |
| `hyp_tuba_b` | 1024x1536 | P + L1 | 69% | 2 | `assets/sprites/hyp_tuba_b.png`, `assets/ref/pencil/hypothesis.webp` |
| `pa_chal_doubt` | 1024x1536 | P + L1 | 62% | 2 | `assets/sprites/pa_chal_doubt.png`, `assets/ref/pencil/challenger.webp` |
| `pa_chal_gasp` | 1536x1024 | P + L4 | 70% | 2 | `assets/sprites/pa_chal_gasp.png`, `assets/ref/pencil/challenger.webp` |
| `pa_chal_slide` | 1024x1536 | P + L1 | 58% | 2 | `assets/sprites/pa_chal_slide.png`, `assets/ref/pencil/challenger.webp` |
| `pa_chal_think` | 1024x1536 | P + L2 | 50% | 2 | `assets/sprites/pa_chal_think.png`, `assets/ref/pencil/challenger.webp` |
| `pa_ck_gasp` | 1536x1024 | P + L4 | 70% | 2 | `assets/sprites/pa_ck_gasp.png`, `assets/ref/pencil/checklist.webp` |
| `pa_ck_think` | 1024x1536 | P + L2 | 50% | 2 | `assets/sprites/pa_ck_think.png`, `assets/ref/pencil/checklist.webp` |
| `pa_hand_stamp` | 1024x1536 | S + L3 | 80% | 2 | `assets/sprites/pa_hand_stamp.png`, `assets/ref/pencil/challenger.webp` |
| `pa_hand_stamp_y` | 1024x1536 | S + L3 | 80% | 2 | `assets/sprites/pa_hand_stamp_y.png`, `assets/ref/pencil/challenger.webp` |
| `pa_hyp_climb_a` | 1024x1536 | P + L1 | 44% | 2 | `assets/sprites/pa_hyp_climb_a.png`, `assets/ref/pencil/hypothesis.webp` |
| `pa_hyp_climb_b` | 1024x1536 | P + L1 | 40% | 2 | `assets/sprites/pa_hyp_climb_b.png`, `assets/ref/pencil/hypothesis.webp` |
| `pa_hyp_gasp` | 1536x1024 | P + L4 | 70% | 2 | `assets/sprites/pa_hyp_gasp.png`, `assets/ref/pencil/hypothesis.webp` |
| `pa_hyp_shout` | 1024x1536 | P + L2 | 50% | 2 | `assets/sprites/pa_hyp_shout.png`, `assets/ref/pencil/hypothesis.webp` |
| `pa_hyp_think` | 1024x1536 | P + L1 | 52% | 2 | `assets/sprites/pa_hyp_think.png`, `assets/ref/pencil/hypothesis.webp` |
| `pa_st_gasp` | 1536x1024 | P + L4 | 70% | 2 | `assets/sprites/pa_st_gasp.png`, `assets/ref/pencil/stewardship.webp` |
| `pa_st_shock` | 1024x1536 | P + L1 | 73% | 2 | `assets/sprites/pa_st_shock.png`, `assets/ref/pencil/stewardship.webp` |
| `pa_st_think` | 1024x1024 | P + L1 | 69% | 2 | `assets/sprites/pa_st_think.png`, `assets/ref/pencil/stewardship.webp` |
| `pa_tc_gasp` | 1536x1024 | P + L4 | 70% | 2 | `assets/sprites/pa_tc_gasp.png`, `assets/ref/pencil/testchooser.webp` |
| `pa_tc_think` | 1024x1536 | P + L1 | 67% | 2 | `assets/sprites/pa_tc_think.png`, `assets/ref/pencil/testchooser.webp` |
| `pa_tc_zip` | 1024x1536 | P + L1 | 46% | 2 | `assets/sprites/pa_tc_zip.png`, `assets/ref/pencil/testchooser.webp` |
| `patient_happy` | 1024x1536 | P + L5 | 46% | 2 | `assets/sprites/patient_happy.png`, `assets/ref/pencil/patient.webp` |
| `pb_boomerang` | 1536x1024 | S + L1 | 40% | 2 | `assets/sprites/pb_boomerang.png`, `assets/ref/pencil/challenger.webp` |
| `pb_chal_wipe` | 1024x1024 | P + L3 | 60% | 2 | `assets/sprites/pb_chal_wipe.png`, `assets/ref/pencil/challenger.webp` |
| `pb_ck_wipe` | 1024x1024 | P + L3 | 60% | 2 | `assets/sprites/pb_ck_wipe.png`, `assets/ref/pencil/checklist.webp` |
| `pb_gk_drawer` | 1024x1536 | P + L1 | 80% | 2 | `assets/sprites/pb_gk_drawer.png`, `assets/ref/pencil/gatekeeper.webp` |
| `pb_hyp_bell` | 1024x1024 | P + L1 | 60% | 2 | `assets/sprites/pb_hyp_bell.png`, `assets/ref/pencil/hypothesis.webp` |
| `pb_hyp_car` | 1536x1024 | P + L1 | 40% | 2 | `assets/sprites/pb_hyp_car.png`, `assets/ref/pencil/hypothesis.webp` |
| `pb_hyp_catch` | 1024x1536 | P + L1 | 61% | 2 | `assets/sprites/pb_hyp_catch.png`, `assets/ref/pencil/hypothesis.webp` |
| `pb_hyp_swerve` | 1536x1024 | P + L1 | 40% | 2 | `assets/sprites/pb_hyp_swerve.png`, `assets/ref/pencil/hypothesis.webp` |
| `pb_hyp_throw` | 1024x1024 | P + L1 | 51% | 2 | `assets/sprites/pb_hyp_throw.png`, `assets/ref/pencil/hypothesis.webp` |
| `pb_hyp_wipe` | 1024x1024 | P + L3 | 60% | 2 | `assets/sprites/pb_hyp_wipe.png`, `assets/ref/pencil/hypothesis.webp` |
| `pb_roadblock` | 1536x1024 | S + L1 | 40% | 2 | `assets/sprites/pb_roadblock.png`, `assets/ref/pencil/challenger.webp` |
| `pb_st_wipe` | 1536x1024 | P + L3 | 60% | 2 | `assets/sprites/pb_st_wipe.png`, `assets/ref/pencil/stewardship.webp` |
| `pb_tc_pick` | 1024x1536 | P + L1 | 80% | 2 | `assets/sprites/pb_tc_pick.png`, `assets/ref/pencil/testchooser.webp` |
| `pb_tc_think` | 1024x1536 | P + L1 | 80% | 2 | `assets/sprites/pb_tc_think.png`, `assets/ref/pencil/testchooser.webp` |
| `pb_tc_wipe` | 1024x1536 | P + L3 | 60% | 2 | `assets/sprites/pb_tc_wipe.png`, `assets/ref/pencil/testchooser.webp` |
| `pc_chal_aha` | 1024x1536 | P + L1 | 80% | 2 | `assets/sprites/pc_chal_aha.png`, `assets/ref/pencil/challenger.webp` |
| `pc_chal_pass` | 1024x1536 | P + L1 | 54% | 2 | `assets/sprites/pc_chal_pass.png`, `assets/ref/pencil/challenger.webp` |
| `pc_chal_shrug` | 1024x1536 | P + L1 | 80% | 2 | `assets/sprites/pc_chal_shrug.png`, `assets/ref/pencil/challenger.webp` |
| `pc_ck_mark` | 1024x1536 | P + L1 | 62% | 2 | `assets/sprites/pc_ck_mark.png`, `assets/ref/pencil/checklist.webp` |
| `pc_ck_pass` | 1024x1536 | P + L1 | 53% | 2 | `assets/sprites/pc_ck_pass.png`, `assets/ref/pencil/checklist.webp` |
| `pc_hyp_pass` | 1024x1536 | P + L1 | 45% | 2 | `assets/sprites/pc_hyp_pass.png`, `assets/ref/pencil/hypothesis.webp` |
| `pc_hyp_three` | 1024x1536 | P + L3 | 76% | 2 | `assets/sprites/pc_hyp_three.png`, `assets/ref/pencil/hypothesis.webp` |
| `pc_st_pass` | 1024x1536 | P + L1 | 48% | 2 | `assets/sprites/pc_st_pass.png`, `assets/ref/pencil/stewardship.webp` |
| `pc_st_think` | 1024x1536 | P + L1 | 74% | 2 | `assets/sprites/pc_st_think.png`, `assets/ref/pencil/stewardship.webp` |
| `pc_tc_pass` | 1024x1536 | P + L3 | 60% | 2 | `assets/sprites/pc_tc_pass.png`, `assets/ref/pencil/testchooser.webp` |
| `pc_tc_think` | 1024x1536 | P + L1 | 80% | 2 | `assets/sprites/pc_tc_think.png`, `assets/ref/pencil/testchooser.webp` |
| `pd_farmer_sick` | 1024x1536 | P + L6 | 60% | 2 | `assets/sprites/pd_farmer_sick.png`, `assets/ref/pencil/farmer.webp` |
| `pd_grandma_sick` | 1024x1536 | P + L5 | 40% | 2 | `assets/sprites/pd_grandma_sick.png`, `assets/ref/pencil/grandma.webp` |
| `pd_kid_hurt` | 1024x1536 | P + L5 | 40% | 2 | `assets/sprites/pd_kid_hurt.png`, `assets/ref/pencil/kid.webp` |
| `pd_mother_worried` | 1024x1536 | P + L6 | 60% | 2 | `assets/sprites/pd_mother_worried.png`, `assets/ref/pencil/mother.webp` |
| `pd_nurse_run` | 1024x1536 | P + L5 | 40% | 2 | `assets/sprites/pd_nurse_run.png`, `assets/ref/pencil/nurse.webp` |
| `pd_patient_cheer` | 1024x1536 | P + L5 | 77% | 2 | `assets/sprites/pd_patient_cheer.png`, `assets/ref/pencil/patient.webp` |
| `pd_patient_curious` | 1024x1536 | P + L6 | 80% | 2 | `assets/sprites/pd_patient_curious.png`, `assets/ref/pencil/patient.webp` |
| `pd_patient_worried` | 1024x1536 | P + L6 | 72% | 2 | `assets/sprites/pd_patient_worried.png`, `assets/ref/pencil/patient.webp` |
| `pd_wheel_worried` | 1024x1536 | P + L5 | 40% | 2 | `assets/sprites/pd_wheel_worried.png`, `assets/ref/pencil/wheel.webp` |
| `people` | 1536x1024 | S + L1 | 46% | 0 | `assets/sprites/prop_people.png`, `assets/ref/pencil/challenger.webp` |
| `pipe` | 1536x1024 | S + L1 | 47% | 2 | `assets/sprites/prop_pipe.png`, `assets/ref/pencil/challenger.webp` |
| `scales` | 1536x1024 | S + L1 | 79% | 2 | `assets/sprites/prop_scales.png`, `assets/ref/pencil/challenger.webp` |
| `st_backready` | 1024x1024 | P + L1 | 40% | 2 | `assets/sprites/st_backready.png`, `assets/ref/pencil/stewardship.webp` |
| `st_backrun` | 1024x1024 | P + L1 | 40% | 2 | `assets/sprites/st_backrun.png`, `assets/ref/pencil/stewardship.webp` |
| `st_cheer` | 1024x1536 | P + L2 | 50% | 2 | `assets/sprites/st_cheer.png`, `assets/ref/pencil/stewardship.webp` |
| `st_jog` | 1024x1536 | P + L2 | 50% | 2 | `assets/sprites/st_jog.png`, `assets/ref/pencil/stewardship.webp` |
| `st_leanin` | 1024x1536 | P + L1 | 67% | 2 | `assets/sprites/st_leanin.png`, `assets/ref/pencil/stewardship.webp` |
| `st_peek` | 1536x1024 | B + L7 | 75% | 2 | `assets/sprites/st_peek.png`, `assets/ref/pencil/stewardship.webp` |
| `st_point` | 1024x1536 | P + L2 | 50% | 2 | `assets/sprites/st_point.png`, `assets/ref/pencil/stewardship.webp` |
| `st_scales` | 1536x1024 | P + L1 | 70% | 2 | `assets/sprites/st_scales.png`, `assets/ref/pencil/stewardship.webp` |
| `st_tack` | 1024x1536 | P + L1 | 64% | 2 | `assets/sprites/st_tack.png`, `assets/ref/pencil/stewardship.webp` |
| `st_wink` | 1024x1024 | P + L1 | 71% | 2 | `assets/sprites/st_wink.png`, `assets/ref/pencil/stewardship.webp` |
| `tc_backready` | 1024x1536 | P + L1 | 40% | 2 | `assets/sprites/tc_backready.png`, `assets/ref/pencil/testchooser.webp` |
| `tc_backrun` | 1024x1536 | P + L1 | 40% | 2 | `assets/sprites/tc_backrun.png`, `assets/ref/pencil/testchooser.webp` |
| `tc_cheer` | 1024x1536 | P + L2 | 50% | 2 | `assets/sprites/tc_cheer.png`, `assets/ref/pencil/testchooser.webp` |
| `tc_fan` | 1024x1536 | P + L1 | 80% | 2 | `assets/sprites/tc_fan.png`, `assets/ref/pencil/testchooser.webp` |
| `tc_jog` | 1024x1536 | P + L2 | 50% | 2 | `assets/sprites/tc_jog.png`, `assets/ref/pencil/testchooser.webp` |
| `tc_leanin` | 1024x1536 | P + L1 | 71% | 2 | `assets/sprites/tc_leanin.png`, `assets/ref/pencil/testchooser.webp` |
| `tc_peek` | 1024x1536 | P + L4 | 70% | 2 | `assets/sprites/tc_peek.png`, `assets/ref/pencil/testchooser.webp` |
| `tc_point` | 1024x1536 | P + L2 | 50% | 2 | `assets/sprites/tc_point.png`, `assets/ref/pencil/testchooser.webp` |
| `tc_slap` | 1024x1536 | P + L1 | 80% | 2 | `assets/sprites/tc_slap.png`, `assets/ref/pencil/testchooser.webp` |
| `tc_tack` | 1024x1536 | P + L1 | 64% | 2 | `assets/sprites/tc_tack.png`, `assets/ref/pencil/testchooser.webp` |
| `tc_trumpet_a` | 1024x1536 | P + L1 | 70% | 2 | `assets/sprites/tc_trumpet_a.png`, `assets/ref/pencil/testchooser.webp` |
| `tc_trumpet_b` | 1024x1536 | P + L1 | 62% | 2 | `assets/sprites/tc_trumpet_b.png`, `assets/ref/pencil/testchooser.webp` |
| `win_cat_sill` | 1024x1024 | S + L8 | 40% | 2 | `assets/sprites/windows/win_cat_sill.png`, `assets/ref/pencil/challenger.webp` |
| `win_elder_armchair` | 1024x1024 | S + L8 | 40% | 2 | `assets/sprites/windows/win_elder_armchair.png`, `assets/ref/pencil/challenger.webp` |
| `win_nurse_bedside` | 1024x1024 | P + L9 | 60% | 2 | `assets/sprites/windows/win_nurse_bedside.png`, `assets/ref/pencil/nurse.webp` |
| `win_parent_child` | 1024x1024 | S + L8 | 40% | 2 | `assets/sprites/windows/win_parent_child.png`, `assets/ref/pencil/challenger.webp` |
| `win_person_reading_bed` | 1536x1024 | S + L10 | 60% | 2 | `assets/sprites/windows/win_person_reading_bed.png`, `assets/ref/pencil/challenger.webp` |
| `window` | 1024x1024 | S + L1 | 80% | 2 | `assets/sprites/prop_window.png`, `assets/ref/pencil/challenger.webp` |
