# Homepage Intro Rhythm Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tune the homepage intro animation so the text remains readable for about 0.8s before the four black reveal tiles move upward.

**Architecture:** Keep the current CSS-first intro architecture. The React component continues to render and remove the overlay based on a fixed duration, while CSS owns all visual timing. No markup, routing, or navigation behavior changes are required.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4 global CSS, browser manual verification.

---

## File Structure

- Modify `components/home-intro-reveal.tsx`
  - Responsibility: controls whether the overlay is mounted and when it is removed.
  - Change: update `INTRO_DURATION_MS` from `2600` to `3000` so the CSS animation has time to complete.

- Modify `app/globals.css`
  - Responsibility: owns homepage intro visual timing and keyframes.
  - Change: adjust text animation duration, text delays, tile reveal duration, tile delays, and text keyframe hold percentages.

No new files should be created during implementation.

---

### Task 1: Update Overlay Removal Duration

**Files:**
- Modify: `components/home-intro-reveal.tsx:10`

- [ ] **Step 1: Update the overlay duration constant**

Replace:

```ts
const INTRO_DURATION_MS = 2600
```

With:

```ts
const INTRO_DURATION_MS = 3000
```

This keeps the overlay mounted long enough for the final tile to complete its reveal.

- [ ] **Step 2: Run TypeScript check after the constant change**

Run:

```bash
./node_modules/.bin/tsc --noEmit --incremental false --pretty false
```

Expected: command exits with code `0` and prints no TypeScript errors.

---

### Task 2: Tune Text And Tile Timing

**Files:**
- Modify: `app/globals.css:178-265`

- [ ] **Step 1: Update text animation duration**

In `.home-intro-reveal__line`, replace:

```css
animation: home-intro-line 980ms cubic-bezier(0.22, 1, 0.36, 1) both;
```

With:

```css
animation: home-intro-line 1400ms cubic-bezier(0.22, 1, 0.36, 1) both;
```

Rationale: with the third line delayed to `320ms`, a `1400ms` duration lets the last line become fully readable at about `656ms`, hold until about `1454ms`, then fade while tiles begin at `1600ms`.

- [ ] **Step 2: Update text line delays**

Replace the three current delays:

```css
.home-intro-reveal__line:nth-child(1) {
  animation-delay: 200ms;
}

.home-intro-reveal__line:nth-child(2) {
  animation-delay: 280ms;
}

.home-intro-reveal__line:nth-child(3) {
  animation-delay: 360ms;
}
```

With:

```css
.home-intro-reveal__line:nth-child(1) {
  animation-delay: 160ms;
}

.home-intro-reveal__line:nth-child(2) {
  animation-delay: 240ms;
}

.home-intro-reveal__line:nth-child(3) {
  animation-delay: 320ms;
}
```

This keeps the same subtle stagger while moving the complete text moment earlier enough to create the requested readable pause.

- [ ] **Step 3: Update tile animation duration and delays**

Replace:

```css
.home-intro-reveal__tile {
  background: #000;
  transform: translate3d(0, 0, 0);
  animation: home-intro-tile 860ms cubic-bezier(0.19, 1, 0.22, 1) both;
  will-change: transform;
}
```

With:

```css
.home-intro-reveal__tile {
  background: #000;
  transform: translate3d(0, 0, 0);
  animation: home-intro-tile 950ms cubic-bezier(0.19, 1, 0.22, 1) both;
  will-change: transform;
}
```

Replace the four tile delays:

```css
.home-intro-reveal__tile:nth-child(1) {
  animation-delay: 1160ms;
}

.home-intro-reveal__tile:nth-child(2) {
  animation-delay: 1280ms;
}

.home-intro-reveal__tile:nth-child(3) {
  animation-delay: 1400ms;
}

.home-intro-reveal__tile:nth-child(4) {
  animation-delay: 1520ms;
}
```

With:

```css
.home-intro-reveal__tile:nth-child(1) {
  animation-delay: 1600ms;
}

.home-intro-reveal__tile:nth-child(2) {
  animation-delay: 1720ms;
}

.home-intro-reveal__tile:nth-child(3) {
  animation-delay: 1840ms;
}

.home-intro-reveal__tile:nth-child(4) {
  animation-delay: 1960ms;
}
```

The last tile ends at about `2910ms`, leaving a small buffer before overlay removal at `3000ms`.

- [ ] **Step 4: Update text keyframe hold percentages**

Replace:

```css
@keyframes home-intro-line {
  0% {
    opacity: 0;
    transform: translate3d(0, 16px, 0);
  }
  24%,
  68% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  100% {
    opacity: 0;
    transform: translate3d(0, -10px, 0);
  }
}
```

With:

```css
@keyframes home-intro-line {
  0% {
    opacity: 0;
    transform: translate3d(0, 16px, 0);
  }
  24%,
  81% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  100% {
    opacity: 0;
    transform: translate3d(0, -10px, 0);
  }
}
```

This creates the readable hold: the final line reaches full opacity around `656ms` and stays fully visible until around `1454ms`.

- [ ] **Step 5: Run TypeScript check after CSS timing changes**

Run:

```bash
./node_modules/.bin/tsc --noEmit --incremental false --pretty false
```

Expected: command exits with code `0` and prints no TypeScript errors.

---

### Task 3: Browser Verification

**Files:**
- No source files modified in this task.

- [ ] **Step 1: Ensure the dev server is running**

Run if `http://localhost:3000/` is not already available:

```bash
npm run dev
```

Expected terminal output includes:

```text
Local:         http://localhost:3000
Ready
```

- [ ] **Step 2: Verify homepage intro timing by refresh**

Open or refresh:

```text
http://localhost:3000/
```

Expected visual result:

```text
0ms-650ms: text lines stagger in
650ms-1450ms: all three lines are readable
1450ms-1720ms: text fades out
1600ms-2910ms: four tiles move upward in sequence
~3000ms: overlay is gone and homepage is usable
```

- [ ] **Step 3: Verify skip behavior from case study back link**

Open a case study URL, for example:

```text
http://localhost:3000/work/daily-bread
```

Click `Back to work`.

Expected result:

```text
The browser returns to the homepage work section.
The intro overlay does not replay.
The URL is cleaned back to `/` or the intended homepage route without leaving `skipIntro=1` visible.
```

- [ ] **Step 4: Check reduced motion behavior**

Inspect the existing CSS block:

```css
@media (prefers-reduced-motion: reduce) {
  .home-intro-reveal {
    display: none;
  }

  .home-intro-reveal__line,
  .home-intro-reveal__tile {
    animation: none !important;
  }
}
```

Expected: no change needed. Users with reduced motion enabled should continue to skip the animation.

---

### Task 4: Final Commit

**Files:**
- Stage: `components/home-intro-reveal.tsx`
- Stage: `app/globals.css`

- [ ] **Step 1: Review the diff**

Run:

```bash
git diff -- components/home-intro-reveal.tsx app/globals.css
```

Expected: diff only changes timing constants, animation durations, animation delays, and keyframe percentages.

- [ ] **Step 2: Commit the implementation**

Run:

```bash
git add components/home-intro-reveal.tsx app/globals.css
git commit -m "feat: tune homepage intro rhythm"
```

Expected: commit succeeds with only the two implementation files staged.
