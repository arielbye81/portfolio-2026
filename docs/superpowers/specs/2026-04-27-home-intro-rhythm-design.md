# Homepage Intro Rhythm Design

Date: 2026-04-27
Status: Approved for implementation planning
Scope: Homepage intro timing only

## Goal

Refine the homepage intro animation rhythm without changing its visual structure. The intro should feel calm and intentional, while giving visitors enough time to actually read the three text lines before the page reveal begins.

## Current Behavior

The homepage intro uses a CSS-first overlay:

- Three text lines appear over a black screen.
- Four black tiles then move upward to reveal the homepage.
- The overlay is removed by `HomeIntroReveal` after a fixed duration.
- Returning from a case study with `skipIntro=1` skips the intro and cleans the URL.

Current total duration is about `2600ms`. The text is readable, but the readable hold feels too short.

## Selected Direction

Use the existing structure and tune only timing values.

Chosen rhythm:

- Overall feel: steady, breathable, not too slow.
- Target total duration: about `2900ms`.
- Text readable hold after all three lines appear: about `800ms`.
- Text fade-out and tile reveal should lightly overlap for a smoother handoff.
- The Back to work path must continue to skip the intro.

## Timing Design

Approximate timeline:

```text
0ms      650ms          1450ms       1650ms              2900ms
| text in | readable hold | text fade | tiles reveal overlap | page fully visible
```

Recommended implementation targets:

- Text line animation duration: about `1250ms`.
- Text line stagger: keep subtle, around `80ms` between lines.
- Final line becomes fully readable by about `650ms`.
- Text remains readable until about `1450ms`.
- Tile reveal begins around `1600ms` to create a light overlap with text fade-out.
- Tile reveal duration: about `950ms`.
- Tile stagger: around `120ms` between tiles.
- Overlay removal constant: about `3000ms` to ensure the reveal has completed.

## Files Expected To Change

- `components/home-intro-reveal.tsx`
  - Update the fixed overlay removal duration constant.

- `app/globals.css`
  - Update `.home-intro-reveal__line` animation duration and keyframe percentages.
  - Update `.home-intro-reveal__tile` animation duration and tile delays.

No structural changes are planned.

## Non-Goals

- Do not redesign the intro layout.
- Do not change the three intro text lines.
- Do not add logo, sound, new imagery, or extra interaction.
- Do not change case study page animations.
- Do not trigger intro when navigating back from case studies.

## Verification

Manual browser checks:

- Refresh homepage and confirm the intro plays.
- Confirm all three text lines are readable for roughly `0.8s` after appearing.
- Confirm tile reveal overlaps lightly with text fade-out.
- Confirm page is fully usable after the overlay is removed.
- Open a case study, click Back to work, and confirm the homepage intro does not replay.

Technical checks:

- Run TypeScript check.
- If available, run production build.
