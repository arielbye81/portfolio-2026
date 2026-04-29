# Homepage Content Reveal Design

Date: 2026-04-29
Project: Web_Profolio
Reference: https://pwojtaszak.com/

## Goal

Add a homepage-wide gradual reveal animation that feels connected to the existing black intro reveal. The effect should be subtle and reference-inspired: content appears as the black screen is nearly finished leaving, rather than waiting for a hard cut.

## Confirmed Behavior

- Keep the existing homepage black intro: three text lines, then four black tiles moving upward.
- First-screen homepage content should begin revealing when the intro is about 80% complete.
- With the current 3000ms intro duration, the first-screen content reveal should start at about 2400ms.
- The reveal should overlap with the final part of the black tile exit, so the page feels like it is surfacing from behind the intro.
- Below-the-fold homepage sections should reveal when they enter the viewport.
- Returning from case studies through `/?skipIntro=1` should not replay the black intro and should not force a distracting replay of the first-screen reveal.

## Motion Style

- Use opacity plus a small vertical translate for a calm fade-and-lift effect.
- Keep the movement light, not bouncy or theatrical.
- Stagger major content groups so the page breathes: hero/header first, then work/about sections as they become relevant.
- Do not add a typewriter or character-by-character effect.

## Architecture

- Add a small homepage reveal controller as a client component or hook.
- Mark homepage sections or major content groups with a shared reveal class/data attribute.
- Use CSS classes and custom properties for timing, duration, easing, and stagger values.
- Keep the current `HomeIntroReveal` component behavior intact except for exposing/aligning timing if needed.
- Preserve the existing `skipIntro` behavior in `app/page.tsx` and the case study back link.

## Accessibility And Performance

- Respect `prefers-reduced-motion: reduce` by showing content immediately with no transition.
- Avoid layout shifts by animating `opacity` and `transform` only.
- Do not introduce a new animation library.
- Avoid React re-renders during animation; prefer CSS transitions and a small observer/controller.

## Testing

- Verify normal homepage load: black intro appears, tiles move up, first-screen content starts fading in around the final 20% of the intro.
- Verify below-the-fold sections reveal on scroll.
- Verify `Back to work` from a case study returns to homepage without replaying the black intro.
- Run `./node_modules/.bin/tsc --noEmit --incremental false --pretty false`.
- Run `npm run build`.
