# Image prompts

These are the prompts for every image in the film's original ink style, grouped by use. The coloured-pencil versions used in the final film are in [PENCIL_PROMPTS.md](PENCIL_PROMPTS.md). Each image was made with GPT Image 2.5 and MAI Image 2.6 (`tools/genone.sh`, one image per call).

**Refs** are the reference images sent with the prompt, with paths relative to `assets/`. A few prompts used an earlier generated image as a style reference, and these are marked. The character crops in `assets/ref/` keep the characters looking the same in every pose. **Size** is the requested canvas. The background is `transparent` for sprites and `opaque` for plates.

The sprites were then trimmed to their visible edges (`tools/trim.js`). Some sprites had several candidates, and only the chosen one is in `assets/`.

## Background plates

### `paper_cream`
*3840x2160, opaque*

> A flat, evenly lit high-resolution scan of a sheet of warm cream handmade cotton watercolour paper filling the entire frame edge to edge. Subtle fibres, tiny inclusions, gentle tooth and very soft mottling. Uniform overall tone (warm ivory), no vignette, no shadows, no folds, no marks, nothing drawn on it.

### `set_cork`
*3840x2160, opaque* · refs: `(an earlier generated image) room_yellow.png`

> Straight-on view of a huge cork notice board filling the entire frame edge to edge. Warm natural cork with fine speckles and a few old tiny pin holes, a sliver of plain wooden frame visible only along the very top and bottom edges. Completely empty: no pins, no papers, no string. Hand-made 2D animation background painting with wobbly warm dark-brown ink lines, flat gouache fills with subtle paper grain, tone-on-tone patterned wallpaper, soft diagonal light shafts. Charming, slightly old-fashioned, cosy. No people, no characters, no text, no letters, no numbers, no signage anywhere.

### `set_room`
*3840x2160, opaque* · refs: `(an earlier generated image) room_yellow.png`

> Wide straight-on view of a cosy old doctors' common room. Butter-yellow and mustard palette with olive and cream accents. Damask wallpaper, a tall arched window on the far left with sunlight streaming diagonally across the wall, a standard lamp on the far right, skirting board and plain wooden floorboards. A chunky curved yellow pneumatic-tube pipe comes down from the ceiling in the upper centre and ends in an open brass mouth about one third of the way down. The middle of the room is completely EMPTY (no table, no furniture) with lots of calm wall space. Hand-made 2D animation background painting with wobbly warm dark-brown ink lines, flat gouache fills with subtle paper grain, tone-on-tone patterned wallpaper, soft diagonal light shafts. Charming, slightly old-fashioned, cosy. No people, no characters, no text, no letters, no numbers, no signage anywhere.

### `prop_table`
*2560x1440, transparent* · refs: `ref/characters.png`

> A round wooden table seen from the front at eye level, slightly elliptical top, sturdy central pedestal with three curved feet, warm honey wood. Wide and low, filling the width of the image. Hand-drawn 2D prop in the exact ink style of the reference character sheet: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients. Isolated on a fully transparent background, centered with margin. No text, no letters, no ground shadow.

### `set_tabletop`
*3840x2160, opaque* · refs: `(an earlier generated image) room_yellow.png`

> Top-down bird's-eye view looking straight down at a large round honey-wood table top that fills most of the frame, on warm mustard floorboards. The table surface is completely empty and calm, with gentle wood grain. Hand-made 2D animation background painting with wobbly warm dark-brown ink lines, flat gouache fills with subtle paper grain, tone-on-tone patterned wallpaper, soft diagonal light shafts. Charming, slightly old-fashioned, cosy. No people, no characters, no text, no letters, no numbers, no signage anywhere.

### `set_waiting`
*3840x2160, opaque* · refs: `(an earlier generated image) room_yellow.png`

> Wide straight-on view of an old-fashioned records-office waiting room in a dusty-rose and plum palette with cream accents. Left two-thirds: a long empty wooden park-style slatted bench against rose damask wallpaper. Right third: a wooden reception counter with a small serving hatch and, behind it, tall shelves of folders and box files. A brass reception bell on the counter. Calm empty wall space above the bench. Hand-made 2D animation background painting with wobbly warm dark-brown ink lines, flat gouache fills with subtle paper grain, tone-on-tone patterned wallpaper, soft diagonal light shafts. Charming, slightly old-fashioned, cosy. No people, no characters, no text, no letters, no numbers, no signage anywhere.

### `set_track_dusk`
*3840x2160, opaque* · refs: `(an earlier generated image) room_yellow.png`

> A running track seen from a low angle at one lane's start, lanes receding in perspective to the horizon, a row of white wooden hurdles getting smaller into the distance. Dusk: deep blue and indigo sky with a few early stars, last pale-peach glow at the horizon. Limited palette of blues with a touch of peach. Chalk start line across the foreground. Hand-made 2D animation background painting with wobbly warm dark-brown ink lines, flat gouache fills with subtle paper grain, tone-on-tone patterned wallpaper, soft diagonal light shafts. Charming, slightly old-fashioned, cosy. No people, no characters, no text, no letters, no numbers, no signage anywhere.

### `set_town_night`
*3840x2160, opaque* · refs: `(an earlier generated image) room_yellow.png`

> A charming small hillside town of crooked houses seen from slightly above at night, deep blue and indigo palette, crescent moon, chimneys, many small windows, every window dark. Rooftops fill the lower two-thirds, sky above. Hand-made 2D animation background painting with wobbly warm dark-brown ink lines, flat gouache fills with subtle paper grain, tone-on-tone patterned wallpaper, soft diagonal light shafts. Charming, slightly old-fashioned, cosy. No people, no characters, no text, no letters, no numbers, no signage anywhere.

### `set_door`
*2160x3840, opaque* · refs: `(an earlier generated image) room_yellow.png`

> A tall portrait image. At the bottom: a cosy room with a white-painted wooden door frame where a family measures children's heights, with one single small pencil mark near the bottom of the frame. The door frame posts magically keep rising upwards past the ceiling, through an opening in the roof, and continue up into a soft dawn sky with clouds at the top of the image. Warm cream, peach and sky-blue palette. Hand-made 2D animation background painting with wobbly warm dark-brown ink lines, flat gouache fills with subtle paper grain, tone-on-tone patterned wallpaper, soft diagonal light shafts. Charming, slightly old-fashioned, cosy. No people, no characters, no text, no letters, no numbers, no signage anywhere.

### `prop_globe`
*2048x2048, transparent* · refs: `ref/characters.png`

> A charming hand-made paper globe of the world, like a papier-mâché school globe, soft teal oceans and cream and sage continents, wobbly hand-drawn coastlines, no stand, no labels. Hand-drawn 2D prop in the exact ink style of the reference character sheet: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients. Isolated on a fully transparent background, centered with margin. No text, no letters, no ground shadow.

### `prop_people`
*3840x1280, transparent* · refs: `ref/characters.png`

> A line-up of nine different ordinary people standing separately in a row with clear gaps between them, all facing the viewer and smiling: an elderly man with a cane, a young mother holding a baby, a small girl, a teenage boy, a woman in a headscarf, a man in a wheelchair, a grandmother, a farmer in overalls, a nurse in scrubs. Same character-design language as the reference (big noses, small dot eyes, simple bodies). Full bodies. Hand-drawn 2D prop in the exact ink style of the reference character sheet: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients. Isolated on a fully transparent background, centered with margin. No text, no letters, no ground shadow.

### `prop_pipe`
*3840x1280, transparent* · refs: `ref/characters.png`

> A long chunky glossy yellow pneumatic-tube pipe running horizontally across the whole image with two playful S-bend loops in the middle, brass ring joints, and an open mouth on the right end. A cutaway section in the middle shows the inside is hollow. Hand-drawn 2D prop in the exact ink style of the reference character sheet: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients. Isolated on a fully transparent background, centered with margin. No text, no letters, no ground shadow.

### `prop_scales`
*2048x2048, transparent* · refs: `ref/characters.png`

> A large old-fashioned brass balance scale with two wide shallow pans, central pillar, perfectly level, seen straight from the front. Hand-drawn 2D prop in the exact ink style of the reference character sheet: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients. Isolated on a fully transparent background, centered with margin. No text, no letters, no ground shadow.

### `prop_bell`
*1024x1024, transparent* · refs: `ref/characters.png`

> A brass reception desk bell (the kind you slap with your palm), seen from the front, slightly from above. Hand-drawn 2D prop in the exact ink style of the reference character sheet: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients. Isolated on a fully transparent background, centered with margin. No text, no letters, no ground shadow.

### `prop_bulb`
*1024x1024, transparent* · refs: `ref/characters.png`

> A single classic glowing light bulb, warm yellow glass, little radiating lines around it. Hand-drawn 2D prop in the exact ink style of the reference character sheet: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients. Isolated on a fully transparent background, centered with margin. No text, no letters, no ground shadow.

### `prop_window`
*2560x1440, transparent* · refs: `ref/characters.png`

> A large old wooden sash window frame seen from inside, painted cream, with a sill at the bottom; all the glass panes are completely empty and transparent so we can see straight through. Only the frame is drawn. Hand-drawn 2D prop in the exact ink style of the reference character sheet: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients. Isolated on a fully transparent background, centered with margin. No text, no letters, no ground shadow.

### `hyp_lid`
*1024x1536, transparent* · refs: `ref/hypothesis.png`

> Redraw this exact character (Hypothesis: round body, big yellow curly hair, small glasses, white lab coat over green top) with the top of her head flipped open on a hinge like the lid of a cookie jar (curly hair still on the lid), the head is hollow and empty inside, she looks up delighted. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference: wobbly warm dark-brown ink outline, flat colour fills, no shading. Isolated on a fully transparent background. No text.

### `set_cork_even`
*3840x2160, opaque* · refs: `sets/set_cork.png`

> A flat, evenly lit, top-down high-resolution photo-texture of a natural cork pinboard surface filling the entire frame edge to edge, the same warm honey-orange cork colour and fine granular texture as the reference. Perfectly uniform lighting: no light shafts, no window shadows, no vignette, no gradients, no frame, no border, no wooden edge, nothing pinned, no holes, no text. Seamless-looking, even tone everywhere.

### `set_town_dawn`
*3840x2160, opaque* · refs: `sets/set_town_night.png`

> Exactly the same hillside town as the reference image, same composition, same houses and rooftops in the same places, but now at sunrise: warm peach, apricot and soft gold sky, the sun just rising, rooftops lit warm, and EVERY window glowing warm yellow. Optimistic and gentle. Hand-made 2D animation background painting with wobbly warm dark-brown ink lines, flat gouache fills with subtle paper grain. No people, no characters, no text, no letters, no numbers, no signage anywhere.

### `set_track_dawn`
*3840x2160, opaque* · refs: `sets/set_track_dusk.png`

> Exactly the same running track as the reference, same composition, same hurdles in the same places, same chalk start line, but at sunrise: soft peach, apricot and pale gold sky, the sun just rising at the horizon at the end of the track, long gentle shadows. Optimistic. Hand-made 2D animation background painting with wobbly warm dark-brown ink lines, flat gouache fills with subtle paper grain. No people, no characters, no text, no letters, no numbers, no signage anywhere.

### `set_notes`
*3840x2160, opaque*

> Straight-on close-up of a single old cream sheet of lined clinical case notes paper filling the entire frame edge to edge, covered in neat but completely ILLEGIBLE squiggly handwriting lines (pure scribbles, no real letters or words), a couple of coffee rings, a paperclip at the top. Hand-made 2D animation background painting with wobbly warm dark-brown ink lines, flat gouache fills with subtle paper grain. No people, no characters, no text, no letters, no numbers, no signage anywhere.

### `set_notes`
*3840x2160, opaque*

> Straight-on close-up of a single old cream sheet of lined notebook paper filling the entire frame edge to edge, covered in neat rows of decorative illegible squiggle doodle lines (pure wavy scribbles, no real letters or words), a coffee ring stain, a paperclip at the top edge. Hand-made 2D animation background painting style: wobbly warm dark-brown ink lines, flat gouache, subtle paper grain. No text, no letters, no numbers.

## Core cast (the five reasoning roles + the simulator)

### `hyp_stand`
*1024x1536, transparent* · refs: `ref/hypothesis.png`

> Redraw this exact character (Hypothesis: round body, big yellow curly hair, small glasses, white lab coat over green top) standing happily, fanning three small cream cards in one hand, other hand on hip, smiling. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `hyp_present`
*1024x1536, transparent* · refs: `ref/hypothesis.png`

> Redraw this exact character (Hypothesis) with both arms flung wide open and up, palms up, looking up delighted, as if juggling invisible cards above her head. Empty hands. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `hyp_hop`
*1024x1536, transparent* · refs: `ref/hypothesis.png`

> Redraw this exact character (Hypothesis) mid-hop on one leg like playing hopscotch, other knee raised, arms out for balance, joyful open-mouth grin. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `hyp_raisehand`
*1024x1536, transparent* · refs: `ref/hypothesis.png`

> Redraw this exact character (Hypothesis) eagerly raising one hand high like asking a question in class, the other hand holding a small cream card, eyebrows up, mouth open. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `hyp_peek`
*1536x1024, transparent* · refs: `ref/hypothesis.png`

> Redraw this exact character (Hypothesis). Head and shoulders only, cropped flat at chest height along the bottom edge of the image (as if popping up from behind a table), facing the viewer. Wide surprised eyes, small open smile, hands gripping an invisible edge at the bottom. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `hyp_point`
*1024x1536, transparent* · refs: `ref/hypothesis.png`

> Redraw this exact character (Hypothesis) pointing emphatically to the right of the image with her whole arm extended, looking where she points, determined. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `hyp_cheer`
*1024x1536, transparent* · refs: `ref/hypothesis.png`

> Redraw this exact character (Hypothesis) cheering with both fists in the air, jumping slightly, eyes closed with joy, big grin. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `hyp_leanin`
*1024x1536, transparent* · refs: `ref/hypothesis.png`

> Redraw this exact character (Hypothesis) leaning forward curiously, hands clasped behind her back, peering intently at something just in front of her, eyebrows raised. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `chal_lean`
*1024x1536, transparent* · refs: `ref/challenger.png`

> Redraw this exact character (Challenger: tall thin, spiky grey hair, small glasses, long nose, white lab coat over coral-red shirt, black legs) leaning forward suspiciously squinting through a magnifying glass, one hand on hip. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `chal_peek`
*1536x1024, transparent* · refs: `ref/challenger.png`

> Redraw this exact character (Challenger). Head and shoulders only, cropped flat at chest height along the bottom edge of the image (as if popping up from behind a table), facing the viewer. One eyebrow raised sceptically, magnifying glass held up beside his face. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `chal_point`
*1024x1536, transparent* · refs: `ref/challenger.png`

> Redraw this exact character (Challenger) pointing emphatically to the right of the image with his whole arm extended, looking where he points, magnifying glass in the other hand. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `chal_sneak`
*1024x1536, transparent* · refs: `ref/challenger.png`

> Redraw this exact character (Challenger) tiptoeing sneakily, crouched forward, peering through his magnifying glass at something low in front of him, guilty sly smile. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `chal_cheer`
*1024x1536, transparent* · refs: `ref/challenger.png`

> Redraw this exact character (Challenger) cheering, one fist raised high holding the magnifying glass aloft like a trophy, big grin. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `chal_jog`
*1024x1536, transparent* · refs: `ref/challenger.png`

> Redraw this exact character (Challenger) jogging energetically in side view facing right, lab coat flapping behind, elbows bent, knees high. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `chal_leanin`
*1024x1536, transparent* · refs: `ref/challenger.png`

> Redraw this exact character (Challenger) leaning forward curiously with hands behind his back, peering at something just in front of him, eyebrows raised, intrigued smile. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `tc_fan`
*1024x1536, transparent* · refs: `ref/testchooser.png`

> Redraw this exact character (Test-Chooser: thin, teal hair in a bun, small glasses, white lab coat over teal dress) holding a fan of five small cream cards in one hand and plucking one out with the other, thoughtful smile. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `tc_slap`
*1024x1536, transparent* · refs: `ref/testchooser.png`

> Redraw this exact character (Test-Chooser) decisively slapping one hand down flat in front of her at waist height, as if slamming a card onto a table, confident grin, other hand on hip. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `tc_peek`
*1536x1024, transparent* · refs: `ref/testchooser.png`

> Redraw this exact character (Test-Chooser). Head and shoulders only, cropped flat at chest height along the bottom edge of the image (as if popping up from behind a table), facing the viewer. Curious bright eyes, small smile, one hand raised holding a small cream card. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `tc_point`
*1024x1536, transparent* · refs: `ref/testchooser.png`

> Redraw this exact character (Test-Chooser) pointing emphatically to the right of the image with her whole arm extended, looking where she points. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `tc_cheer`
*1024x1536, transparent* · refs: `ref/testchooser.png`

> Redraw this exact character (Test-Chooser) cheering with both arms up in a V, joyful, a little hop. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `tc_leanin`
*1024x1536, transparent* · refs: `ref/testchooser.png`

> Redraw this exact character (Test-Chooser) leaning forward curiously with hands behind her back, peering at something just in front of her, eyebrows raised. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `st_scales`
*1024x1536, transparent* · refs: `ref/stewardship.png`

> Redraw this exact character (Stewardship: very round, green curly hair, small glasses, white lab coat over green top) holding up a small brass balance scale at arm's length, weighing carefully, one eye narrowed. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `st_wink`
*1024x1536, transparent* · refs: `ref/stewardship.png`

> Redraw this exact character (Stewardship) giving a big thumbs-up and a cheeky wink, very pleased with herself. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `st_peek`
*1536x1024, transparent* · refs: `ref/stewardship.png`

> Redraw this exact character (Stewardship). Head and shoulders only, cropped flat at chest height along the bottom edge of the image (as if popping up from behind a table), facing the viewer. Warm smile, eyebrows raised. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `st_point`
*1024x1536, transparent* · refs: `ref/stewardship.png`

> Redraw this exact character (Stewardship) pointing emphatically to the right of the image with her whole arm extended, looking where she points. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `st_cheer`
*1024x1536, transparent* · refs: `ref/stewardship.png`

> Redraw this exact character (Stewardship) cheering with both arms up, jolly, big laugh. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `st_leanin`
*1024x1536, transparent* · refs: `ref/stewardship.png`

> Redraw this exact character (Stewardship) leaning forward curiously with hands behind her back, peering at something just in front of her. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `ck_tick`
*1024x1536, transparent* · refs: `ref/checklist.png`

> Redraw this exact character (Checklist: thin, purple spiky hair, glasses, long nose, white lab coat over lilac dress with ruffled hem) wielding a huge yellow pencil with both hands like a sword, making a big tick mark in the air, concentrating, tongue out. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `ck_peek`
*1536x1024, transparent* · refs: `ref/checklist.png`

> Redraw this exact character (Checklist). Head and shoulders only, cropped flat at chest height along the bottom edge of the image (as if popping up from behind a table), facing the viewer. Prim, eyebrows raised, pencil tucked behind ear. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `ck_point`
*1024x1536, transparent* · refs: `ref/checklist.png`

> Redraw this exact character (Checklist) pointing emphatically to the right of the image with her whole arm extended holding her checklist in the other hand. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `ck_cheer`
*1024x1536, transparent* · refs: `ref/checklist.png`

> Redraw this exact character (Checklist) cheering, holding her long checklist scroll aloft, unfurling, delighted. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `ck_leanin`
*1024x1536, transparent* · refs: `ref/checklist.png`

> Redraw this exact character (Checklist) leaning forward curiously with hands behind her back, peering at something just in front of her. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `gk_stand`
*1024x1536, transparent* · refs: `ref/gatekeeper.png`

> Redraw this exact character (Gatekeeper: a friendly blue two-drawer filing cabinet with a face, thin black arms, yellow shoes) standing facing the viewer, holding a sheet of paper close to its chest protectively, polite smile. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `gk_empty`
*1024x1536, transparent* · refs: `ref/gatekeeper.png`

> Redraw this exact character (Gatekeeper filing cabinet) with its top drawer pulled fully open, the drawer is completely EMPTY, the cabinet looking down into it with a shocked, sheepish expression, hands raised. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `gk_typing`
*1024x1536, transparent* · refs: `ref/gatekeeper.png`

> Redraw this exact character (Gatekeeper filing cabinet) now wearing tiny round spectacles, typing furiously on a small cream typewriter it holds in its arms, focused, tongue out. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `gk_wink`
*1024x1536, transparent* · refs: `ref/gatekeeper.png`

> Redraw this exact character (Gatekeeper filing cabinet) with all drawers shut, giving a knowing wink and a finger-to-lips 'shh' gesture. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `gk_walk`
*1024x1536, transparent* · refs: `ref/gatekeeper.png`

> Redraw this exact character (Gatekeeper filing cabinet) walking briskly to the right, holding a sheet of paper out in front. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `hyp_tack`
*1024x1536, transparent* · refs: `ref/hypothesis.png`

> Redraw this exact character (Hypothesis) lunging toward the viewer and jabbing one hand straight at the camera, pressing a big brass thumbtack forward with their thumb, foreshortened arm, playful determined grin. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `chal_tack`
*1024x1536, transparent* · refs: `ref/challenger.png`

> Redraw this exact character (Challenger) lunging toward the viewer and jabbing one hand straight at the camera, pressing a big brass thumbtack forward with their thumb, foreshortened arm, playful determined grin. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `tc_tack`
*1024x1536, transparent* · refs: `ref/testchooser.png`

> Redraw this exact character (Test-Chooser) lunging toward the viewer and jabbing one hand straight at the camera, pressing a big brass thumbtack forward with their thumb, foreshortened arm, playful determined grin. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `st_tack`
*1024x1536, transparent* · refs: `ref/stewardship.png`

> Redraw this exact character (Stewardship) lunging toward the viewer and jabbing one hand straight at the camera, pressing a big brass thumbtack forward with their thumb, foreshortened arm, playful determined grin. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `ck_tack`
*1024x1536, transparent* · refs: `ref/checklist.png`

> Redraw this exact character (Checklist) lunging toward the viewer and jabbing one hand straight at the camera, pressing a big brass thumbtack forward with their thumb, foreshortened arm, playful determined grin. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

## Section poses: opening, verse 1 and 2

### `pa_hyp_think`
*1024x1536, transparent* · refs: `ref/hypothesis.png`

> Redraw this exact character (Hypothesis) standing, thinking hard: one hand on chin, the other hand on hip, eyes rolled up to the sky, lips pursed, head tilted. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pa_hyp_gasp`
*1024x1024, transparent* · refs: `ref/hypothesis.png`

> Redraw this exact character (Hypothesis). Head, shoulders and upper chest only, cropped flat at the bottom as if peeking up over the edge of a table; both hands raised up beside the face with fingers spread, eyes huge and round, mouth wide open in a delighted surprised 'Oh!', eyebrows high. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pa_chal_think`
*1024x1536, transparent* · refs: `ref/challenger.png`

> Redraw this exact character (Challenger) standing, thinking hard and scheming: one hand stroking chin, the other hand holding the magnifying glass down by his side, eyes narrowed and looking up, one eyebrow raised. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pa_chal_gasp`
*1024x1024, transparent* · refs: `ref/challenger.png`

> Redraw this exact character (Challenger). Head, shoulders and upper chest only, cropped flat at the bottom as if peeking up over the edge of a table; both hands raised up beside the face with fingers spread, eyes huge and round, mouth wide open in a delighted surprised 'Oh!', eyebrows high. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pa_tc_think`
*1024x1536, transparent* · refs: `ref/testchooser.png`

> Redraw this exact character (Test-Chooser) standing, thinking hard: one finger tapping her chin, the other hand holding her fan of three cards, eyes looking up, head tilted. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pa_tc_gasp`
*1024x1024, transparent* · refs: `ref/testchooser.png`

> Redraw this exact character (Test-Chooser). Head, shoulders and upper chest only, cropped flat at the bottom as if peeking up over the edge of a table; both hands raised up beside the face with fingers spread, eyes huge and round, mouth wide open in a delighted surprised 'Oh!', eyebrows high. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pa_st_think`
*1024x1536, transparent* · refs: `ref/stewardship.png`

> Redraw this exact character (Stewardship) standing, thinking hard: one hand on chin, the other hand holding the little brass scales, eyes looking up, mouth pursed. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pa_st_gasp`
*1024x1024, transparent* · refs: `ref/stewardship.png`

> Redraw this exact character (Stewardship). Head, shoulders and upper chest only, cropped flat at the bottom as if peeking up over the edge of a table; both hands raised up beside the face with fingers spread, eyes huge and round, mouth wide open in a delighted surprised 'Oh!', eyebrows high. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pa_ck_think`
*1024x1536, transparent* · refs: `ref/checklist.png`

> Redraw this exact character (Checklist) standing, thinking hard: tapping her chin with her big yellow pencil, checklist held in the other hand, eyes looking up. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pa_ck_gasp`
*1024x1024, transparent* · refs: `ref/checklist.png`

> Redraw this exact character (Checklist). Head, shoulders and upper chest only, cropped flat at the bottom as if peeking up over the edge of a table; both hands raised up beside the face with fingers spread, eyes huge and round, mouth wide open in a delighted surprised 'Oh!', eyebrows high. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pa_chal_doubt`
*1024x1536, transparent* · refs: `ref/challenger.png`

> Redraw this exact character (Challenger) standing with arms tightly crossed, magnifying glass tucked under one arm, leaning back, one eyebrow raised high, deeply sceptical frown, unconvinced. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pa_chal_magnify`
*1024x1536, transparent* · refs: `ref/challenger.png`

> Redraw this exact character (Challenger) bent forward in side view facing right, holding his magnifying glass right up to his eye so his eye looks HUGE through the lens, intense investigating face, other hand behind his back, tiptoeing. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pa_hyp_shout`
*1024x1536, transparent* · refs: `ref/hypothesis.png`

> Redraw this exact character (Hypothesis) standing on tiptoe calling out a question: both hands cupped around the open mouth, eyes wide and bright, leaning forward eagerly. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pa_hyp_climb_a`
*1024x1536, transparent* · refs: `ref/hypothesis.png`

> Redraw this exact character (Hypothesis) climbing UP an invisible vertical rope, seen from the side facing right: LEFT arm stretched high above the head gripping, right hand gripping at chest height, knees bent and feet pressed together as if gripping the rope, determined cheerful face, lab coat hanging. Do NOT draw the rope or any pole. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pa_hyp_climb_b`
*1024x1536, transparent* · refs: `ref/hypothesis.png`

> Redraw this exact character (Hypothesis) climbing UP an invisible vertical rope, seen from the side facing right: RIGHT arm stretched high above the head gripping, left hand gripping at chest height, one knee pulled up high, the other leg hanging, determined cheerful face, puffing. Do NOT draw the rope or any pole. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pa_chal_slide`
*1024x1536, transparent* · refs: `ref/challenger.png`

> Redraw this exact character (Challenger) sliding fast DOWN an invisible vertical rope like a fireman, both hands gripping above his head, legs wrapped together, hair and coat tails blown straight upward by the speed, glasses askew, mouth open whooping with excitement, magnifying glass dangling from his wrist. Do NOT draw the rope or any pole. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pa_tc_zip`
*1024x1536, transparent* · refs: `ref/testchooser.png`

> Redraw this exact character (Test-Chooser) hanging by ONE raised hand from an invisible overhead zip-line, zooming to the right: body swinging back diagonally, legs trailing behind, bun and coat flapping, the other hand holding her fan of cards out in front, huge joyful grin. Do NOT draw the line, rope or pulley. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pa_st_shock`
*1024x1536, transparent* · refs: `ref/stewardship.png`

> Redraw this exact character (Stewardship) shocked by a big bill: both hands pressed to cheeks, eyes popping wide, mouth open in an O, knees knocking together, two little sweat drops flying off the head. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pa_hand_stamp`
*1024x1536, transparent* · refs: `ref/challenger.png`

> A single cartoon hand and forearm in a white lab-coat sleeve, coming straight DOWN from the top edge, firmly gripping the round wooden knob handle of a big old-fashioned rubber stamp; below the knob a short wooden neck and a wide flat square wooden stamp block seen from the side, its bottom edge perfectly straight and horizontal, no letters or marks on it. Vertical composition, sleeve at the top, stamp block at the bottom. Drawn in the same hand-drawn cartoon style as the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pa_hand_pinch`
*1024x1536, transparent* · refs: `ref/hypothesis.png`

> A single cartoon hand and forearm of the yellow-skinned character in the reference image, in a white lab-coat sleeve with a rolled cuff, reaching straight DOWN from the top edge, seen from above, pinching something tiny between thumb and index finger at the very bottom tip, other fingers curled. Vertical composition, sleeve at the top, fingertips at the bottom centre. Drawn in the same hand-drawn cartoon style as the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pa_hand_point`
*1024x1536, transparent* · refs: `ref/hypothesis.png`

> A single cartoon hand and forearm of the yellow-skinned character in the reference image, in a white lab-coat sleeve with a rolled cuff, reaching straight DOWN from the top edge, seen from above, index finger extended pointing down and tapping, other fingers curled. Vertical composition, sleeve at the top, fingertip at the bottom centre. Drawn in the same hand-drawn cartoon style as the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pa_hand_stamp_y`
*1024x1536, transparent* · refs: `ref/hypothesis.png`

> A single cartoon hand and forearm of the yellow-skinned character in the reference image, in a white lab-coat sleeve, coming straight DOWN from the top edge, firmly gripping the round wooden knob handle of a big old-fashioned rubber stamp; below the knob a short wooden neck and a wide flat square wooden stamp block seen from the side, its bottom edge perfectly straight and horizontal, no letters or marks on it. Vertical composition, sleeve at the top, stamp block at the bottom. Drawn in the same hand-drawn cartoon style as the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

## Section poses: verse 3 (the simulator, the benchmark)

### `pb_hyp_car`
*1536x1024, transparent* · refs: `ref/hypothesis.png`

> Redraw this exact character (Hypothesis) driving a tiny cute toy-like bright red vintage open-top roadster car, strict side view facing right, both hands gripping a big steering wheel, cheerful determined grin, lab coat collar fluttering. The car is small and rounded like a bumper car: Hypothesis's head and torso stick up above it; two big round black wheels with cream hubcaps, a little chrome round headlight at the front, no number plate. The car is drawn in the same flat cartoon style, flat red with ink outline. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pb_hyp_throw`
*1024x1536, transparent* · refs: `ref/hypothesis.png`

> Redraw this exact character (Hypothesis) having just thrown a boomerang: side view facing right, throwing arm fully extended forward and up with an open empty hand, other arm swung back for balance, front knee lifted, leaning forward, gleeful confident grin, lab coat swinging. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pb_hyp_catch`
*1024x1536, transparent* · refs: `ref/hypothesis.png`

> Redraw this exact character (Hypothesis) catching something: side view facing right, both arms stretched out forward at chest height with open empty palms facing forward ready to clap shut on an incoming object, knocked slightly backwards on one heel, eyes squeezed half shut, excited surprised grin, curls bouncing. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pb_boomerang`
*1024x1024, transparent* · refs: `ref/characters.png`

> A classic wooden boomerang, wide V shape with rounded tips, warm tan wood with two red painted stripes near each tip, seen flat from above. Hand-drawn 2D prop in the exact ink style of the reference character sheet: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients. Isolated on a fully transparent background, centered with margin. No text, no letters, no ground shadow.

### `pb_gk_drawer`
*1024x1536, transparent* · refs: `ref/gatekeeper.png`

> Redraw this exact character (Gatekeeper, the blue filing cabinet with a face, arms and yellow shoes) proudly pulling open its own top drawer with one hand and lifting a blank paper index card high out of it with the other hand, eyebrows raised, pleased helpful smile, three-quarter front view. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pb_hyp_bell`
*1024x1536, transparent* · refs: `ref/hypothesis.png`

> Redraw this exact character (Hypothesis) slapping a reception desk bell: side view facing right, leaning forward eagerly, one arm extended forward and DOWN with the flat open palm facing down at waist height (the bell itself is NOT drawn), other hand on hip, eyes bright, big cheeky open-mouth grin like shouting order up. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pb_tc_think`
*1024x1536, transparent* · refs: `ref/testchooser.png`

> Redraw this exact character (Test-Chooser) pondering her choice: holding a fan of five blank playing cards in one hand at chest height, the index finger of the other hand tapping her chin, eyes looking up and sideways in thought, one eyebrow raised, lips pursed. Three-quarter view facing right. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pb_tc_pick`
*1024x1536, transparent* · refs: `ref/testchooser.png`

> Redraw this exact character (Test-Chooser) triumphantly plucking ONE blank card out of a fan of blank cards: fan held low in one hand, the other arm raised high above her head pinching a single card between two fingers, sly confident grin, eyebrows raised, leaning back a little. Three-quarter view facing right. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pb_hyp_wipe`
*1024x1024, transparent* · refs: `ref/hypothesis.png`

> Redraw this exact character (hypothesis) as a head-and-shoulders bust seen from the front, standing behind a window and pressing their face against the glass: nose squashed flat and wide, one open palm pressed flat against the glass beside the face with fingers spread, wide curious eyes peering straight out at the viewer, cheeky funny expression. Cropped at mid-chest at the bottom edge. Do not draw the glass or window frame. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pb_chal_wipe`
*1024x1024, transparent* · refs: `ref/challenger.png`

> Redraw this exact character (challenger) as a head-and-shoulders bust seen from the front, standing behind a window and pressing their face against the glass: nose squashed flat and wide, one open palm pressed flat against the glass beside the face with fingers spread, wide curious eyes peering straight out at the viewer, cheeky funny expression. Cropped at mid-chest at the bottom edge. Do not draw the glass or window frame. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pb_tc_wipe`
*1024x1024, transparent* · refs: `ref/testchooser.png`

> Redraw this exact character (testchooser) as a head-and-shoulders bust seen from the front, standing behind a window and pressing their face against the glass: nose squashed flat and wide, one open palm pressed flat against the glass beside the face with fingers spread, wide curious eyes peering straight out at the viewer, cheeky funny expression. Cropped at mid-chest at the bottom edge. Do not draw the glass or window frame. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pb_st_wipe`
*1024x1024, transparent* · refs: `ref/stewardship.png`

> Redraw this exact character (stewardship) as a head-and-shoulders bust seen from the front, standing behind a window and pressing their face against the glass: nose squashed flat and wide, one open palm pressed flat against the glass beside the face with fingers spread, wide curious eyes peering straight out at the viewer, cheeky funny expression. Cropped at mid-chest at the bottom edge. Do not draw the glass or window frame. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pb_ck_wipe`
*1024x1024, transparent* · refs: `ref/checklist.png`

> Redraw this exact character (checklist) as a head-and-shoulders bust seen from the front, standing behind a window and pressing their face against the glass: nose squashed flat and wide, one open palm pressed flat against the glass beside the face with fingers spread, wide curious eyes peering straight out at the viewer, cheeky funny expression. Cropped at mid-chest at the bottom edge. Do not draw the glass or window frame. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pb_hyp_swerve`
*1536x1024, transparent* · refs: `ref/hypothesis.png, (an earlier generated image) pb_hyp_car.png`

> Redraw this exact character (Hypothesis) in this exact same little red roadster car (second reference image: identical car design, colours and wheels), strict side view facing right, but now swerving hard: the car is tilted up on its two left-side wheels, front lifted, Hypothesis yanking the steering wheel round with both hands, eyes popping wide, mouth open in an alarmed yelp, curls and coat collar blown back. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pb_roadblock`
*1536x1024, transparent* · refs: `ref/characters.png`

> A small cartoon roadworks barrier: one horizontal plank with bold diagonal red and cream stripes on two splayed wooden A-frame legs, a round orange warning lamp on top. Side-on front view. Hand-drawn 2D prop in the exact ink style of the reference character sheet: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients. Isolated on a fully transparent background, centered with margin. No text, no letters, no ground shadow.

## Section poses: the bridge (trials, running toward the sun)

### `pc_hyp_three`
*1024x1536, transparent* · refs: `ref/hypothesis.png, sprites/hyp_point.png`

> Redraw this exact character (Hypothesis) proudly holding one hand up high showing exactly THREE raised fingers (counting to three), the other fist on his hip, chest puffed out, huge confident grin, standing, body facing right. Keep the IDENTICAL character design and hand-drawn style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same glasses, same clothes, same colours. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no numbers, no ground shadow, no floor.

### `pc_chal_aha`
*1024x1536, transparent* · refs: `ref/challenger.png, sprites/chal_point.png`

> Redraw this exact character (Challenger) with one index finger raised straight up in a sly 'aha, but wait...' gesture, one eyebrow raised high, knowing smirk, leaning back slightly, holding his magnifying glass in the other hand, body facing right. Keep the IDENTICAL character design and hand-drawn style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same glasses, same clothes, same colours. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no numbers, no ground shadow, no floor.

### `pc_chal_shrug`
*1024x1536, transparent* · refs: `ref/challenger.png, sprites/chal_point.png`

> Redraw this exact character (Challenger) doing a big theatrical shrug: both palms turned up and out at shoulder height, shoulders raised, eyebrows up, quizzical lopsided grin, magnifying glass held loosely in one upturned hand, body facing right. Keep the IDENTICAL character design and hand-drawn style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same glasses, same clothes, same colours. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no numbers, no ground shadow, no floor.

### `pc_tc_think`
*1024x1536, transparent* · refs: `ref/testchooser.png, sprites/tc_fan.png`

> Redraw this exact character (Test-Chooser) thinking hard: one finger tapping her chin, eyes rolled up to the side in thought, the other hand holding a small fan of three blank cards, weight on one leg, body facing right. Keep the IDENTICAL character design and hand-drawn style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same glasses, same clothes, same colours. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no numbers, no ground shadow, no floor.

### `pc_st_think`
*1024x1536, transparent* · refs: `ref/stewardship.png, sprites/st_point.png`

> Redraw this exact character (Stewardship) being thrifty and skeptical: squinting one eye, holding up a single small gold coin pinched between finger and thumb to inspect it closely, the other hand stroking his chin, body facing right. Keep the IDENTICAL character design and hand-drawn style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same glasses, same clothes, same colours. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no numbers, no ground shadow, no floor.

### `pc_ck_mark`
*1024x1536, transparent* · refs: `ref/checklist.png, sprites/ck_tick.png`

> Redraw this exact character (Checklist) scribbling a tick mark: holding a clipboard against her chest with one arm, the other hand pressing a giant yellow pencil down onto the clipboard, tongue poking out of the corner of her mouth in concentration, knees bent, body facing right. Keep the IDENTICAL character design and hand-drawn style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same glasses, same clothes, same colours. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no numbers, no ground shadow, no floor.

### `pc_hyp_jog2`
*1024x1536, transparent* · refs: `ref/hypothesis.png, sprites/hyp_jog.png`

> Redraw this exact character (Hypothesis) in the same energetic side-view jog facing right as the second reference image, but at the OPPOSITE point of the stride: the other leg forward with knee high, the other arm forward, lab coat flapping behind. Same size, same angle, same cheerful determined face. Keep the IDENTICAL character design and hand-drawn style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same glasses, same clothes, same colours. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no numbers, no ground shadow, no floor.

### `pc_chal_jog2`
*1024x1536, transparent* · refs: `ref/challenger.png, sprites/chal_jog.png`

> Redraw this exact character (Challenger) in the same energetic side-view jog facing right as the second reference image, but at the OPPOSITE point of the stride: the other leg forward with knee high, the other arm forward, lab coat flapping behind. Same size, same angle, same determined face. Keep the IDENTICAL character design and hand-drawn style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same glasses, same clothes, same colours. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no numbers, no ground shadow, no floor.

### `pc_tc_jog2`
*1024x1536, transparent* · refs: `ref/testchooser.png, sprites/tc_jog.png`

> Redraw this exact character (Test-Chooser) in the same energetic side-view jog facing right as the second reference image, but at the OPPOSITE point of the stride: the other leg forward with knee high, the other arm forward, lab coat flapping behind. Same size, same angle, same determined face. Keep the IDENTICAL character design and hand-drawn style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same glasses, same clothes, same colours. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no numbers, no ground shadow, no floor.

### `pc_st_jog2`
*1024x1536, transparent* · refs: `ref/stewardship.png, sprites/st_jog.png`

> Redraw this exact character (Stewardship) in the same energetic side-view jog facing right as the second reference image, but at the OPPOSITE point of the stride: the other leg forward with knee high, the other arm forward, lab coat flapping behind. Same size, same angle, same cheerful face. Keep the IDENTICAL character design and hand-drawn style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same glasses, same clothes, same colours. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no numbers, no ground shadow, no floor.

### `pc_ck_jog2`
*1024x1536, transparent* · refs: `ref/checklist.png, sprites/ck_jog.png`

> Redraw this exact character (Checklist) in the same energetic side-view jog facing right as the second reference image, but at the OPPOSITE point of the stride: the other leg forward with knee high, the other arm forward, lab coat flapping behind. Same size, same angle, same determined face. Keep the IDENTICAL character design and hand-drawn style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same glasses, same clothes, same colours. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no numbers, no ground shadow, no floor.

### `pc_hyp_pass`
*1024x1536, transparent* · refs: `ref/hypothesis.png, sprites/hyp_jog.png`

> Redraw this exact character (Hypothesis) running in side view facing right, caught at the PASSING POSITION of a cartoon run cycle (different from the stride pose in the second reference): body high and upright, the supporting leg straight and planted directly under the hips, the other leg bent sharply with the knee pointing down and that foot kicked up high behind toward the bottom, both arms swinging close to the body with fists near the chest, lab coat tails lifting behind, cheerful determined face. Keep the IDENTICAL character design and hand-drawn style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same glasses, same clothes, same colours. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no numbers, no ground shadow, no floor.

### `pc_chal_pass`
*1024x1536, transparent* · refs: `ref/challenger.png, sprites/chal_jog.png`

> Redraw this exact character (Challenger) running in side view facing right, caught at the PASSING POSITION of a cartoon run cycle (different from the stride pose in the second reference): body high and upright, the supporting leg straight and planted directly under the hips, the other leg bent sharply with the knee pointing down and that foot kicked up high behind toward the bottom, both arms swinging close to the body with fists near the chest, lab coat tails lifting behind, cheerful determined face. Keep the IDENTICAL character design and hand-drawn style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same glasses, same clothes, same colours. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no numbers, no ground shadow, no floor.

### `pc_tc_pass`
*1024x1536, transparent* · refs: `ref/testchooser.png, sprites/tc_jog.png`

> Redraw this exact character (Test-Chooser) running in side view facing right, caught at the PASSING POSITION of a cartoon run cycle (different from the stride pose in the second reference): body high and upright, the supporting leg straight and planted directly under the hips, the other leg bent sharply with the knee pointing down and that foot kicked up high behind toward the bottom, both arms swinging close to the body with fists near the chest, lab coat tails lifting behind, cheerful determined face. Keep the IDENTICAL character design and hand-drawn style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same glasses, same clothes, same colours. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no numbers, no ground shadow, no floor.

### `pc_st_pass`
*1024x1536, transparent* · refs: `ref/stewardship.png, sprites/st_jog.png`

> Redraw this exact character (Stewardship) running in side view facing right, caught at the PASSING POSITION of a cartoon run cycle (different from the stride pose in the second reference): body high and upright, the supporting leg straight and planted directly under the hips, the other leg bent sharply with the knee pointing down and that foot kicked up high behind toward the bottom, both arms swinging close to the body with fists near the chest, lab coat tails lifting behind, cheerful determined face. Keep the IDENTICAL character design and hand-drawn style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same glasses, same clothes, same colours. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no numbers, no ground shadow, no floor.

### `pc_ck_pass`
*1024x1536, transparent* · refs: `ref/checklist.png, sprites/ck_jog.png`

> Redraw this exact character (Checklist) running in side view facing right, caught at the PASSING POSITION of a cartoon run cycle (different from the stride pose in the second reference): body high and upright, the supporting leg straight and planted directly under the hips, the other leg bent sharply with the knee pointing down and that foot kicked up high behind toward the bottom, both arms swinging close to the body with fists near the chest, lab coat tails lifting behind, cheerful determined face. Keep the IDENTICAL character design and hand-drawn style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same glasses, same clothes, same colours. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no numbers, no ground shadow, no floor.

### `hyp_jog`
*1024x1536, transparent* · refs: `ref/hypothesis.png`

> Redraw this exact character (Hypothesis) jogging energetically in side view facing right, lab coat flapping behind, elbows bent, one knee high, cheerful determined face. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `tc_jog`
*1024x1536, transparent* · refs: `ref/testchooser.png`

> Redraw this exact character (Test-Chooser) jogging energetically in side view facing right, lab coat flapping behind, elbows bent, one knee high, cheerful determined face. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `st_jog`
*1024x1536, transparent* · refs: `ref/stewardship.png`

> Redraw this exact character (Stewardship) jogging energetically in side view facing right, lab coat flapping behind, elbows bent, one knee high, cheerful determined face. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `ck_jog`
*1024x1536, transparent* · refs: `ref/checklist.png`

> Redraw this exact character (Checklist) jogging energetically in side view facing right, lab coat flapping behind, elbows bent, one knee high, cheerful determined face. Full body, both feet visible. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `gk_hop`
*1024x1536, transparent* · refs: `ref/gatekeeper.png`

> Redraw this exact character (Gatekeeper filing cabinet) hopping along happily facing right, both yellow shoes off the ground, thin arms swinging, cheerful. Full body. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `gk_slide`
*1536x1024, transparent* · refs: `ref/gatekeeper.png`

> Redraw this exact character (Gatekeeper filing cabinet) leaning forward and sliding a single cream index card forward with one hand across an invisible counter toward the right, polite helpful smile. Full body. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same clothes, same colours. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `hyp_backready`
*1024x1536, transparent* · refs: `ref/hypothesis.png`

> Redraw this exact character (Hypothesis) seen from DIRECTLY BEHIND, back to the viewer, standing in a crouched ready-to-run stance at a start line, knees bent, arms bent and pumped, head turned very slightly so a tiny sliver of cheek shows, looking ahead into the distance. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours (seen from behind: back of the head and hair, back of the white lab coat). Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `hyp_backrun`
*1024x1536, transparent* · refs: `ref/hypothesis.png`

> Redraw this exact character (Hypothesis) seen from DIRECTLY BEHIND, running AWAY from the viewer into the distance, back to the viewer, one foot kicked up behind showing the sole of the shoe, arms pumping, lab coat flapping, joyful energy. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours (seen from behind: back of the head and hair, back of the white lab coat). Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `chal_backready`
*1024x1536, transparent* · refs: `ref/challenger.png`

> Redraw this exact character (Challenger) seen from DIRECTLY BEHIND, back to the viewer, standing in a crouched ready-to-run stance at a start line, knees bent, arms bent and pumped, head turned very slightly so a tiny sliver of cheek shows, looking ahead into the distance. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours (seen from behind: back of the head and hair, back of the white lab coat). Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `chal_backrun`
*1024x1536, transparent* · refs: `ref/challenger.png`

> Redraw this exact character (Challenger) seen from DIRECTLY BEHIND, running AWAY from the viewer into the distance, back to the viewer, one foot kicked up behind showing the sole of the shoe, arms pumping, lab coat flapping, joyful energy. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours (seen from behind: back of the head and hair, back of the white lab coat). Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `tc_backready`
*1024x1536, transparent* · refs: `ref/testchooser.png`

> Redraw this exact character (Test-Chooser) seen from DIRECTLY BEHIND, back to the viewer, standing in a crouched ready-to-run stance at a start line, knees bent, arms bent and pumped, head turned very slightly so a tiny sliver of cheek shows, looking ahead into the distance. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours (seen from behind: back of the head and hair, back of the white lab coat). Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `tc_backrun`
*1024x1536, transparent* · refs: `ref/testchooser.png`

> Redraw this exact character (Test-Chooser) seen from DIRECTLY BEHIND, running AWAY from the viewer into the distance, back to the viewer, one foot kicked up behind showing the sole of the shoe, arms pumping, lab coat flapping, joyful energy. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours (seen from behind: back of the head and hair, back of the white lab coat). Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `st_backready`
*1024x1536, transparent* · refs: `ref/stewardship.png`

> Redraw this exact character (Stewardship) seen from DIRECTLY BEHIND, back to the viewer, standing in a crouched ready-to-run stance at a start line, knees bent, arms bent and pumped, head turned very slightly so a tiny sliver of cheek shows, looking ahead into the distance. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours (seen from behind: back of the head and hair, back of the white lab coat). Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `st_backrun`
*1024x1536, transparent* · refs: `ref/stewardship.png`

> Redraw this exact character (Stewardship) seen from DIRECTLY BEHIND, running AWAY from the viewer into the distance, back to the viewer, one foot kicked up behind showing the sole of the shoe, arms pumping, lab coat flapping, joyful energy. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours (seen from behind: back of the head and hair, back of the white lab coat). Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `ck_backready`
*1024x1536, transparent* · refs: `ref/checklist.png`

> Redraw this exact character (Checklist) seen from DIRECTLY BEHIND, back to the viewer, standing in a crouched ready-to-run stance at a start line, knees bent, arms bent and pumped, head turned very slightly so a tiny sliver of cheek shows, looking ahead into the distance. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours (seen from behind: back of the head and hair, back of the white lab coat). Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `ck_backrun`
*1024x1536, transparent* · refs: `ref/checklist.png`

> Redraw this exact character (Checklist) seen from DIRECTLY BEHIND, running AWAY from the viewer into the distance, back to the viewer, one foot kicked up behind showing the sole of the shoe, arms pumping, lab coat flapping, joyful energy. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours (seen from behind: back of the head and hair, back of the white lab coat). Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

## Patients, helpers and the final board

### `pd_patient_worried`
*1024x1536, transparent* · refs: `(an earlier generated image) patient_sit.png`

> Redraw this exact PATIENT character (middle-aged, warm brown skin, short grey-flecked hair, mustard cardigan over a striped shirt, blue trousers) sitting on the same small round wooden stool facing the viewer, looking worried and anxious: eyebrows tilted up in the middle, small wobbly frown, both hands clutched together at the chest, shoulders hunched, knees together. Keep the IDENTICAL character design and hand-drawn cartoon style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same clothes, same colours, big simple eyes. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pd_patient_curious`
*1024x1536, transparent* · refs: `(an earlier generated image) patient_sit.png`

> Redraw this exact PATIENT character (middle-aged, warm brown skin, short grey-flecked hair, mustard cardigan over a striped shirt, blue trousers) sitting on the same small round wooden stool, leaning forward with curiosity, one hand on chin, the other on knee, eyes wide and looking up and to the right with interest, one eyebrow raised, slight hopeful smile. Keep the IDENTICAL character design and hand-drawn cartoon style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same clothes, same colours, big simple eyes. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pd_patient_cheer`
*1024x1536, transparent* · refs: `(an earlier generated image) patient_happy.png`

> Redraw this exact PATIENT character (middle-aged, warm brown skin, short grey-flecked hair, mustard cardigan over a striped shirt, blue trousers) sitting on the same small round wooden stool facing the viewer, overjoyed with relief, both arms thrown up in the air in celebration, big open-mouthed happy smile, eyes closed in joy, feet kicked up off the floor. Keep the IDENTICAL character design and hand-drawn cartoon style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same clothes, same colours, big simple eyes. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pd_walk_a`
*1024x1536, transparent* · refs: `(an earlier generated image) patient_sit.png`

> Redraw this exact PATIENT character (middle-aged, warm brown skin, short grey-flecked hair, mustard cardigan over a striped shirt, blue trousers) standing up and walking briskly in side view facing right, mid-stride with the front leg forward and back leg pushing off, arms swinging, cheerful hopeful face, carrying nothing. Keep the IDENTICAL character design and hand-drawn cartoon style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same clothes, same colours, big simple eyes. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pd_walk_b`
*1024x1536, transparent* · refs: `(an earlier generated image) patient_sit.png`

> Redraw this exact PATIENT character (middle-aged, warm brown skin, short grey-flecked hair, mustard cardigan over a striped shirt, blue trousers) standing up and walking in side view facing right, passing pose: one foot planted under the body, the other knee lifted and bent, arms close to body mid-swing, cheerful hopeful face. Keep the IDENTICAL character design and hand-drawn cartoon style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same clothes, same colours, big simple eyes. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pd_wait`
*1024x1536, transparent* · refs: `(an earlier generated image) patient_sit.png`

> Redraw this exact PATIENT character (middle-aged, warm brown skin, short grey-flecked hair, mustard cardigan over a striped shirt, blue trousers) standing, side view facing right, looking up with hopeful anticipation, hands clasped behind back, up on tiptoes, slightly leaning forward. Keep the IDENTICAL character design and hand-drawn cartoon style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same clothes, same colours, big simple eyes. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pd_jump`
*1024x1536, transparent* · refs: `(an earlier generated image) patient_happy.png`

> Redraw this exact PATIENT character (middle-aged, warm brown skin, short grey-flecked hair, mustard cardigan over a striped shirt, blue trousers) standing up and jumping for joy, both feet off the ground with knees bent, both arms raised high with fists up, huge happy smile, three-quarter view facing right. Keep the IDENTICAL character design and hand-drawn cartoon style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same clothes, same colours, big simple eyes. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pd_grandma_sick`
*1024x1536, transparent* · refs: `(an earlier generated image) help_grandma.png`

> Redraw this exact elderly grandmother character feeling unwell and worried: one hand pressed to her forehead, the other on her lower back, eyebrows tilted up, small wavy frown, slightly stooped, standing, phone tucked away. Keep the IDENTICAL character design and hand-drawn cartoon style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same clothes, same colours, big simple eyes. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pd_farmer_sick`
*1024x1536, transparent* · refs: `(an earlier generated image) help_farmer.png`

> Redraw this exact farmer character feeling unwell: coughing into his fist, eyes squeezed shut, straw hat slightly askew, other hand on his chest, slightly hunched, standing. He is not holding any card. Keep the IDENTICAL character design and hand-drawn cartoon style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same clothes, same colours, big simple eyes. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pd_mother_worried`
*1024x1536, transparent* · refs: `(an earlier generated image) help_mother.png`

> Redraw this exact mother character with the same toddler on her hip, both looking worried: the toddler has a sniffly sad face, the mother gently feels the toddler's forehead with the back of her hand, her eyebrows tilted with concern, standing. No phone. Keep the IDENTICAL character design and hand-drawn cartoon style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same clothes, same colours, big simple eyes. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pd_kid_hurt`
*1024x1536, transparent* · refs: `(an earlier generated image) help_kid.png`

> Redraw this exact kid character with a sore knee: standing on one leg, holding the bent knee with both hands, pouting lip and teary eyes, eyebrows tilted up, sad. No plaster on the knee yet, just a small red scrape. Keep the IDENTICAL character design and hand-drawn cartoon style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same clothes, same colours, big simple eyes. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pd_wheel_worried`
*1024x1536, transparent* · refs: `(an earlier generated image) help_wheel.png`

> Redraw this exact young man in the same wheelchair and hoodie looking worried and puzzled: one hand rubbing the back of his neck, the other holding the tablet low on his lap, eyebrows knitted, small uncertain frown. Keep the IDENTICAL character design and hand-drawn cartoon style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same clothes, same colours, big simple eyes. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pd_nurse_run`
*1024x1536, transparent* · refs: `(an earlier generated image) help_nurse.png`

> Redraw this exact community nurse character running fast in side view facing left, backpack bouncing, stethoscope swinging, holding the tablet out in front, determined friendly face. Keep the IDENTICAL character design and hand-drawn cartoon style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same clothes, same colours, big simple eyes. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `pd_pensive`
*1024x1536, transparent* · refs: `(an earlier generated image) patient_sit.png`

> Redraw this exact PATIENT character (middle-aged, warm brown skin, short grey-flecked hair, mustard cardigan over a striped shirt, blue trousers) standing in three-quarter view facing right, pensive and thoughtful: one hand on chin, the other arm folded gently across the body, eyebrows softly knitted, small closed-mouth thinking expression, feet planted calmly. Keep the IDENTICAL character design and hand-drawn cartoon style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same clothes, same colours, big simple eyes. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `pd_look_left`
*1024x1536, transparent* · refs: `(an earlier generated image) patient_sit.png`

> Redraw this exact PATIENT character (middle-aged, warm brown skin, short grey-flecked hair, mustard cardigan over a striped shirt, blue trousers) standing, body facing right but head turned to look left across the board with curious searching eyes, one hand shading the brow slightly, the other hand held near the chest, cautious hopeful expression. Keep the IDENTICAL character design and hand-drawn cartoon style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same clothes, same colours, big simple eyes. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `pd_look_right`
*1024x1536, transparent* · refs: `(an earlier generated image) patient_sit.png`

> Redraw this exact PATIENT character (middle-aged, warm brown skin, short grey-flecked hair, mustard cardigan over a striped shirt, blue trousers) standing, body facing left but head turned to look right across the board with curious searching eyes, one hand shading the brow slightly, the other hand held near the chest, cautious hopeful expression. Keep the IDENTICAL character design and hand-drawn cartoon style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same clothes, same colours, big simple eyes. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `pd_shrug`
*1024x1536, transparent* · refs: `(an earlier generated image) patient_sit.png`

> Redraw this exact PATIENT character (middle-aged, warm brown skin, short grey-flecked hair, mustard cardigan over a striped shirt, blue trousers) standing facing the viewer in a gentle shrug: both elbows bent, palms up at shoulder height, shoulders slightly raised, eyebrows lifted, small warm uncertain smile, calm not goofy. Keep the IDENTICAL character design and hand-drawn cartoon style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same clothes, same colours, big simple eyes. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `pd_relief`
*1024x1536, transparent* · refs: `(an earlier generated image) patient_happy.png`

> Redraw this exact PATIENT character (middle-aged, warm brown skin, short grey-flecked hair, mustard cardigan over a striped shirt, blue trousers) standing facing the viewer with quiet meaningful relief: one hand resting over the heart, the other giving a small gentle wave, soft grateful smile, relaxed shoulders, both feet on the ground. Calm and warm, not jumping or dancing. Keep the IDENTICAL character design and hand-drawn cartoon style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same clothes, same colours, big simple eyes. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `patient_sit`
*1024x1536, transparent* · refs: `(an earlier generated image) prop_people.png, ref/hypothesis.png`

> Draw a friendly everyday PATIENT, a middle-aged person with warm brown skin, short grey-flecked hair, mustard cardigan over a striped shirt, sitting upright on a small round wooden stool facing the viewer, hands resting on knees, eyebrows slightly raised, curious and a little worried, hopeful. Draw in the IDENTICAL hand-drawn cartoon style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, friendly rounded proportions, big simple eyes. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `patient_happy`
*1024x1536, transparent* · refs: `(an earlier generated image) prop_people.png, ref/hypothesis.png`

> Draw the same friendly everyday PATIENT (middle-aged, warm brown skin, short grey-flecked hair, mustard cardigan over a striped shirt) sitting on a small round wooden stool facing the viewer, beaming with relief, one hand on heart and the other giving a thumbs up. Draw in the IDENTICAL hand-drawn cartoon style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, friendly rounded proportions, big simple eyes. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `help_grandma`
*1024x1536, transparent* · refs: `(an earlier generated image) prop_people.png, ref/hypothesis.png`

> Draw an elderly East Asian grandmother in a padded jacket, holding a smartphone up and smiling with relief as she reads it, standing. Draw in the IDENTICAL hand-drawn cartoon style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, friendly rounded proportions, big simple eyes. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `help_farmer`
*1024x1536, transparent* · refs: `(an earlier generated image) prop_people.png, ref/hypothesis.png`

> Draw a West African farmer in a work shirt and straw hat, holding a small paper card with a green tick on it, grinning and waving, standing. Draw in the IDENTICAL hand-drawn cartoon style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, friendly rounded proportions, big simple eyes. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `help_mother`
*1024x1536, transparent* · refs: `(an earlier generated image) prop_people.png, ref/hypothesis.png`

> Draw a South Asian mother in a colourful sari holding a toddler on her hip, both smiling, the mother holding a phone, standing. Draw in the IDENTICAL hand-drawn cartoon style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, friendly rounded proportions, big simple eyes. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `help_kid`
*1024x1536, transparent* · refs: `(an earlier generated image) prop_people.png, ref/hypothesis.png`

> Draw a Latin American kid with a plaster on the knee, giving a big double thumbs up, jumping with joy. Draw in the IDENTICAL hand-drawn cartoon style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, friendly rounded proportions, big simple eyes. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `help_wheel`
*1024x1536, transparent* · refs: `(an earlier generated image) prop_people.png, ref/hypothesis.png`

> Draw a young Middle-Eastern man in a wheelchair wearing a hoodie, holding up a tablet and smiling, waving. Draw in the IDENTICAL hand-drawn cartoon style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, friendly rounded proportions, big simple eyes. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

### `help_nurse`
*1024x1536, transparent* · refs: `(an earlier generated image) prop_people.png, ref/hypothesis.png`

> Draw a rural community nurse with a stethoscope and a backpack, holding a tablet, cheerful, walking briskly. Draw in the IDENTICAL hand-drawn cartoon style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, friendly rounded proportions, big simple eyes. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no ground shadow, no floor.

## Brass section (chorus 2)

### `tc_trumpet_a`
*1024x1536, transparent* · refs: `ref/testchooser.png`

> Redraw this exact character (Test-Chooser) playing a shiny brass TRUMPET, side view facing right, trumpet raised and pointing up to the sky at a jaunty angle, cheeks puffed out, eyes closed in joy, one knee lifted. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. The instrument is drawn in the same flat cartoon style, flat golden-brass yellow with ink outline. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no music notes, no ground shadow, no floor.

### `tc_trumpet_b`
*1024x1536, transparent* · refs: `ref/testchooser.png`

> Redraw this exact character (Test-Chooser) playing a shiny brass TRUMPET, side view facing right, trumpet level and pointing forward, cheeks puffed, leaning back, swaying. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. The instrument is drawn in the same flat cartoon style, flat golden-brass yellow with ink outline. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no music notes, no ground shadow, no floor.

### `chal_trombone_a`
*1024x1536, transparent* · refs: `ref/challenger.png`

> Redraw this exact character (Challenger) playing a brass TROMBONE, side view facing right, slide pushed FULLY OUT far ahead, cheeks puffed, eyebrows raised, leaning forward. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. The instrument is drawn in the same flat cartoon style, flat golden-brass yellow with ink outline. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no music notes, no ground shadow, no floor.

### `chal_trombone_b`
*1024x1536, transparent* · refs: `ref/challenger.png`

> Redraw this exact character (Challenger) playing a brass TROMBONE, side view facing right, slide pulled IN close, cheeks puffed, leaning back with knees bent, groovy. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. The instrument is drawn in the same flat cartoon style, flat golden-brass yellow with ink outline. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no music notes, no ground shadow, no floor.

### `hyp_tuba_a`
*1024x1536, transparent* · refs: `ref/hypothesis.png`

> Redraw this exact character (Hypothesis) playing a big round brass TUBA held in front of the body with the huge bell pointing up over the head, cheeks hugely puffed, standing on tiptoe. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. The instrument is drawn in the same flat cartoon style, flat golden-brass yellow with ink outline. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no music notes, no ground shadow, no floor.

### `hyp_tuba_b`
*1024x1536, transparent* · refs: `ref/hypothesis.png`

> Redraw this exact character (Hypothesis) playing a big round brass TUBA held in front of the body with the huge bell pointing up over the head, cheeks puffed, squatting low with knees bent, swaying. Keep the IDENTICAL character design and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, same proportions, same hair, same clothes, same colours. The instrument is drawn in the same flat cartoon style, flat golden-brass yellow with ink outline. Full body, both feet visible. Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no music notes, no ground shadow, no floor.

## Night-town window silhouettes

### `win_person_reading_bed`
*1024x1024, transparent* · refs: `sets/set_town_night.png, ref/characters.png`

> A small transparent PNG sprite for a hand-drawn night-town window: dark warm-brown silhouette of one person propped up reading in bed, book clearly visible, pillow and blanket simplified, soft friendly paper-textured ink edges, subtle amber rim light as if seen in a lit window. Match the loose hand-drawn style of the reference town plate. Transparent background outside the silhouette, no frame, no text.

### `win_parent_child`
*1024x1024, transparent* · refs: `sets/set_town_night.png, ref/characters.png`

> A small transparent PNG sprite for a hand-drawn warm-lit window: dark friendly silhouette of a parent leaning toward a child, parent arm around child, two clear head shapes at different heights, soft paper-textured ink edges, subtle amber rim light. Match the loose hand-drawn night-town plate. Transparent background outside the silhouette, no window frame, no text.

### `win_elder_armchair`
*1024x1024, transparent* · refs: `sets/set_town_night.png, ref/characters.png`

> A small transparent PNG sprite for a hand-drawn warm-lit window: dark silhouette of an elderly person seated in a cozy armchair, rounded chair back and cane or blanket shape visible, gentle friendly pose, soft paper-textured ink edges, subtle amber rim light. Match the night-town plate style. Transparent background outside the silhouette, no frame, no text.

### `win_nurse_bedside`
*1024x1024, transparent* · refs: `sets/set_town_night.png, ref/characters.png`

> A small transparent PNG sprite for a hand-drawn warm-lit window: dark silhouette of a nurse at a bedside, nurse cap or bun readable, one hand checking on a patient in bed, caring friendly pose, simple shapes that read at small size, soft paper-textured ink edges, subtle amber rim light. Match the night-town plate style. Transparent background outside the silhouette, no frame, no text.

### `win_cat_sill`
*1024x1024, transparent* · refs: `sets/set_town_night.png, ref/characters.png`

> A small transparent PNG sprite for a hand-drawn warm-lit window: clearly recognisable dark cat sitting on a windowsill, pointy ears, bright tiny eyes, curled tail, compact body and paws, friendly soft paper-textured ink edges, subtle amber rim light. Must look unmistakably like a cat even at small size. Transparent background outside the cat and sill, no frame, no text.

## The simulator at the typewriter

### `gktw_a1`
*1024x1536, transparent* · refs: `ref/gatekeeper.png, (an earlier generated image) gk_typing.png`

> Redraw this exact character (Gatekeeper: a friendly blue two-drawer filing cabinet with a face, thin black arms, peach hands, yellow shoes), wearing tiny round spectacles, standing behind a small sturdy wooden desk and typing on a big classic manual desk typewriter that sits on the desk. Three-quarter front view: the cabinet stands slightly to the left behind the desk, the typewriter is in front of it and slightly to the right, angled three-quarter toward the viewer so its keyboard rows of round keys, body and the long horizontal paper roller (platen) with round knobs at each end along the TOP-BACK of the typewriter are all clearly visible. The roller is EMPTY: no paper loaded. The typewriter is a cream / pale mint colour with dark round keys and a small carriage-return lever on the left. Both of the character's hands rest on the keyboard with fingers pressed DOWN on the keys, focused determined expression, tongue poking out. The desk has four simple wooden legs; the character's yellow shoes visible below between the desk legs. Full figure and whole desk visible. Keep the IDENTICAL character design and hand-drawn style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same colours (blue cabinet body, white eyes, thin black arms, peach hands, yellow shoes). Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `gktw_a2`
*1024x1536, transparent* · refs: `ref/gatekeeper.png, (an earlier generated image) gk_typing.png`

> Redraw this exact character (Gatekeeper: a friendly blue two-drawer filing cabinet with a face, thin black arms, peach hands, yellow shoes), wearing tiny round spectacles, standing behind a small sturdy wooden desk and typing on a big classic manual desk typewriter that sits on the desk. Three-quarter front view: the cabinet stands slightly to the left behind the desk, the typewriter is in front of it and slightly to the right, angled three-quarter toward the viewer so its keyboard rows of round keys, body and the long horizontal paper roller (platen) with round knobs at each end along the TOP-BACK of the typewriter are all clearly visible. The roller is EMPTY: no paper loaded. The typewriter is a cream / pale mint colour with dark round keys and a small carriage-return lever on the left. Both of the character's hands rest on the keyboard with fingers pressed DOWN on the keys, focused determined expression, tongue poking out. The desk has four simple wooden legs; the character's yellow shoes visible below between the desk legs. Full figure and whole desk visible. Keep the IDENTICAL character design and hand-drawn style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same colours (blue cabinet body, white eyes, thin black arms, peach hands, yellow shoes). Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `gktw_a3`
*1024x1536, transparent* · refs: `ref/gatekeeper.png, sprites/pb_gk_drawer.png`

> Redraw this exact character (Gatekeeper: a friendly blue two-drawer filing cabinet with a face, thin black arms, peach hands, yellow shoes), wearing tiny round spectacles, standing behind a small sturdy wooden desk and typing on a big classic manual desk typewriter that sits on the desk. Three-quarter front view: the cabinet stands slightly to the left behind the desk, the typewriter is in front of it and slightly to the right, angled three-quarter toward the viewer so its keyboard rows of round keys, body and the long horizontal paper roller (platen) with round knobs at each end along the TOP-BACK of the typewriter are all clearly visible. The roller is EMPTY: no paper loaded. The typewriter is a cream / pale mint colour with dark round keys and a small carriage-return lever on the left. Both of the character's hands rest on the keyboard with fingers pressed DOWN on the keys, focused determined expression, tongue poking out. The desk has four simple wooden legs; the character's yellow shoes visible below between the desk legs. Full figure and whole desk visible. Keep the IDENTICAL character design and hand-drawn style of the reference images: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture, same proportions, same colours (blue cabinet body, white eyes, thin black arms, peach hands, yellow shoes). Centered with a generous margin. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `gktw_b1`
*1024x1536, transparent* · refs: `sprites/typing/gktw_a.png`

> Redraw this exact image as the next animation frame: the SAME character, the SAME wooden desk and the SAME cream typewriter in EXACTLY the same position, size, angle and framing on the canvas (so the two frames can be swapped for animation without anything jumping). The typewriter roller stays EMPTY, no paper. Only change: both hands are lifted about a finger-length ABOVE the keyboard, fingers curled and poised mid-keystroke, about to hammer the keys again; a few short ink motion tick lines above the hands; same focused face with tongue poking out. Keep the IDENTICAL character design, typewriter, desk and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `gktw_b2`
*1024x1536, transparent* · refs: `sprites/typing/gktw_a.png`

> Redraw this exact image as the next animation frame: the SAME character, the SAME wooden desk and the SAME cream typewriter in EXACTLY the same position, size, angle and framing on the canvas (so the two frames can be swapped for animation without anything jumping). The typewriter roller stays EMPTY, no paper. Only change: both hands are lifted about a finger-length ABOVE the keyboard, fingers curled and poised mid-keystroke, about to hammer the keys again; a few short ink motion tick lines above the hands; same focused face with tongue poking out. Keep the IDENTICAL character design, typewriter, desk and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `gktw_c1`
*1024x1536, transparent* · refs: `sprites/typing/gktw_a.png`

> Redraw this exact image as the next animation frame: the SAME character, the SAME wooden desk and the SAME cream typewriter in EXACTLY the same position, size, angle and framing on the canvas (so the two frames can be swapped for animation without anything jumping). The typewriter roller stays EMPTY, no paper. Only change: the left hand slaps the small carriage-return lever on the left of the typewriter, the roller carriage shoved over, the right hand lifted off the keys; three short ink 'ding' tick lines burst from the right end of the roller; eyes squeezed in a happy grin. Keep the IDENTICAL character design, typewriter, desk and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `gktw_c2`
*1024x1536, transparent* · refs: `sprites/typing/gktw_a.png`

> Redraw this exact image as the next animation frame: the SAME character, the SAME wooden desk and the SAME cream typewriter in EXACTLY the same position, size, angle and framing on the canvas (so the two frames can be swapped for animation without anything jumping). The typewriter roller stays EMPTY, no paper. Only change: the left hand slaps the small carriage-return lever on the left of the typewriter, the roller carriage shoved over, the right hand lifted off the keys; three short ink 'ding' tick lines burst from the right end of the roller; eyes squeezed in a happy grin. Keep the IDENTICAL character design, typewriter, desk and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `gktw_l1`
*1024x1536, transparent* · refs: `sprites/typing/gktw_a.png`

> Redraw this exact image as the next animation frame: the SAME character, the SAME wooden desk and the SAME cream typewriter with its roller in EXACTLY the same position, size, angle and framing on the canvas (so the frames can be swapped for animation without anything jumping; the typewriter and roller must not move at all). The typewriter roller stays EMPTY, no paper. Only change: the character's LEFT hand (on the viewer's left) is lifted up above the keys with curled fingers, mid-keystroke, with two short ink motion ticks above it, while the RIGHT hand stays pressed down on the keys; same focused face with tongue poking out. Keep the IDENTICAL character design, typewriter, desk and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `gktw_l2`
*1024x1536, transparent* · refs: `sprites/typing/gktw_a.png`

> Redraw this exact image as the next animation frame: the SAME character, the SAME wooden desk and the SAME cream typewriter with its roller in EXACTLY the same position, size, angle and framing on the canvas (so the frames can be swapped for animation without anything jumping; the typewriter and roller must not move at all). The typewriter roller stays EMPTY, no paper. Only change: the character's LEFT hand (on the viewer's left) is lifted up above the keys with curled fingers, mid-keystroke, with two short ink motion ticks above it, while the RIGHT hand stays pressed down on the keys; same focused face with tongue poking out. Keep the IDENTICAL character design, typewriter, desk and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `gktw_r1`
*1024x1536, transparent* · refs: `sprites/typing/gktw_a.png`

> Redraw this exact image as the next animation frame: the SAME character, the SAME wooden desk and the SAME cream typewriter with its roller in EXACTLY the same position, size, angle and framing on the canvas (so the frames can be swapped for animation without anything jumping; the typewriter and roller must not move at all). The typewriter roller stays EMPTY, no paper. Only change: the character's RIGHT hand (on the viewer's right, nearer the roller) is lifted up above the keys with curled fingers, mid-keystroke, with two short ink motion ticks above it, while the LEFT hand stays pressed down on the keys; same focused face with tongue poking out. Keep the IDENTICAL character design, typewriter, desk and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.

### `gktw_r2`
*1024x1536, transparent* · refs: `sprites/typing/gktw_a.png`

> Redraw this exact image as the next animation frame: the SAME character, the SAME wooden desk and the SAME cream typewriter with its roller in EXACTLY the same position, size, angle and framing on the canvas (so the frames can be swapped for animation without anything jumping; the typewriter and roller must not move at all). The typewriter roller stays EMPTY, no paper. Only change: the character's RIGHT hand (on the viewer's right, nearer the roller) is lifted up above the keys with curled fingers, mid-keystroke, with two short ink motion ticks above it, while the LEFT hand stays pressed down on the keys; same focused face with tongue poking out. Keep the IDENTICAL character design, typewriter, desk and hand-drawn style of the reference image: wobbly warm dark-brown ink outline of slightly varying thickness, flat colour fills, no shading, no gradients, no texture. Isolated on a fully transparent background. No text, no letters, no labels, no ground shadow, no floor.
