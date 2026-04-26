# Homepage Intro Reveal Design

Date: 2026-04-26
Status: Approved for implementation planning
Scope: Homepage intro reveal only

## Decision
Use the T2 reference-like timing profile: about 2.4s total. The intro starts with a stable black screen, shows three text lines briefly, then reveals the page through four upward-moving black tiles. Returning from a case study via Back to work must skip the intro.

## User Feedback
The current effect is in category C3: the black screen appears, but the sequence and timing do not match the reference. The chosen timing profile is T2.

## Goals
- Match the reference-like rhythm: black hold, readable text, staggered tile reveal, clean removal.
- Prevent any stuck black screen.
- Skip the intro when navigating back from case studies.
- Keep the implementation lightweight and local to the homepage.
- Preserve current content and visual structure.

## Non-Goals
- No full route transition manager.
- No new animation dependency.
- No redesign of the homepage.
- No changes to case study content beyond the existing Back to work skip path.

## Selected Approach
Implement HomeIntroReveal as a deterministic client-side state machine.

The component owns these phases:
1. skipped: no overlay is mounted.
2. mounted: overlay is visible as a black screen.
3. text: the three lines fade/slide in and hold briefly.
4. tiles: four tile panels move upward with staggered delays.
5. done: the overlay unmounts or is hidden with a final guard.

Use CSS class states and CSS custom properties for visual styling, with a single timer schedule owned by the component. Avoid relying on animations that start before hydration can apply the active state. Avoid leaving the overlay mounted and visible after completion.

## T2 Timing
- Total duration: about 2400ms.
- Text starts around 200ms.
- Text remains readable until about 1100-1200ms.
- Tile reveal starts around 1180ms.
- Each tile staggers by about 120ms.
- Tile movement duration: about 850-950ms.
- Overlay is removed around 2400ms.

## Skip Behavior
- If `skipIntro=1` is present, HomeIntroReveal does not mount the overlay.
- After hydration, the query param is removed from the URL.
- Back to work keeps linking to `/?skipIntro=1`.
- Optional session storage may be used only if we decide the intro should play once per browser session; the default implementation should still make manual homepage refresh easy to verify during development.

## Error Handling
- A final removal timer hides or unmounts the overlay even if an animation callback does not fire.
- `prefers-reduced-motion: reduce` skips or dramatically shortens the intro.
- The overlay uses `pointer-events: none` to avoid blocking interaction if it visually fails.

## Testing
- Build: `npm run build`.
- Browser: refresh `http://localhost:3000/` and confirm the T2 sequence is visible.
- Browser: wait after the intro and confirm the homepage is usable and no black overlay remains.
- Browser: open a case study, click Back to work, and confirm no homepage intro plays.
- Browser: confirm URL is cleaned back to `/` after skip.
