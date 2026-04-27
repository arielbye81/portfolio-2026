# Homepage Intro Reveal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage intro so it reliably shows a black screen, three text lines, and four upward-moving reveal tiles, while skipping the intro from case study Back to work links.

**Architecture:** `HomeIntroReveal` renders an SSR-safe overlay and lets CSS start the intro immediately, so the reveal does not depend on hydration timing. JavaScript only handles `skipIntro=1`, reduced-motion unmounting, and final cleanup after the CSS animation window.

**Tech Stack:** Next.js App Router, React client component, CSS keyframe animation, existing `skipIntro=1` query behavior.

---

### Task 1: Replace HomeIntroReveal With A CSS-First Intro Shell

**Files:**
- Modify: `components/home-intro-reveal.tsx`

- [x] **Step 1: Replace the component code**

```tsx
"use client"

import { useEffect, useState } from "react"

interface HomeIntroRevealProps {
  skip?: boolean
}

const SKIP_PARAM = "skipIntro"
const INTRO_DURATION_MS = 2600

function cleanSkipParam() {
  const url = new URL(window.location.href)
  if (url.searchParams.get(SKIP_PARAM) !== "1") return

  url.searchParams.delete(SKIP_PARAM)
  const query = url.searchParams.toString()
  const next = `${url.pathname}${query ? `?${query}` : ""}${url.hash}`
  window.history.replaceState(null, "", next)
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function HomeIntroReveal({ skip = false }: HomeIntroRevealProps) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!skip) return

    cleanSkipParam()
    setDone(true)
  }, [skip])

  useEffect(() => {
    if (skip) return

    if (prefersReducedMotion()) {
      setDone(true)
      return
    }

    const doneTimer = window.setTimeout(() => {
      setDone(true)
    }, INTRO_DURATION_MS)

    return () => {
      window.clearTimeout(doneTimer)
    }
  }, [skip])

  if (skip || done) return null

  return (
    <div aria-hidden className="home-intro-reveal">
      <div className="home-intro-reveal__text">
        <p className="home-intro-reveal__line">Bei Ye</p>
        <p className="home-intro-reveal__line">UI/UX Designer</p>
        <p className="home-intro-reveal__line">Portfolio 2026</p>
      </div>
      <div className="home-intro-reveal__tiles">
        <span className="home-intro-reveal__tile" />
        <span className="home-intro-reveal__tile" />
        <span className="home-intro-reveal__tile" />
        <span className="home-intro-reveal__tile" />
      </div>
    </div>
  )
}
```

- [x] **Step 2: Run local type feedback**

Run: `./node_modules/.bin/tsc --noEmit --incremental false --pretty false`
Expected: exits with code 0.

### Task 2: Replace Intro CSS With T2 Timing And Guard Rails

**Files:**
- Modify: `app/globals.css`

- [x] **Step 1: Replace the existing `.home-intro-reveal` CSS block**

```css
/* Homepage intro: black hold, 3 text lines, then 4 upward reveal tiles. */
.home-intro-reveal {
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events: none;
  overflow: hidden;
  visibility: visible;
  contain: layout paint;
  isolation: isolate;
}

.home-intro-reveal__text {
  position: absolute;
  left: clamp(1.5rem, 5vw, 4.5rem);
  bottom: clamp(2rem, 8vh, 5rem);
  z-index: 3;
}

.home-intro-reveal__line {
  margin: 0;
  color: #fff;
  opacity: 0;
  transform: translate3d(0, 16px, 0);
  font-size: clamp(1.05rem, 1.7vw, 1.5rem);
  line-height: 1.14;
  letter-spacing: 0.01em;
  font-weight: 500;
  animation: home-intro-line 980ms cubic-bezier(0.22, 1, 0.36, 1) both;
  will-change: opacity, transform;
}

.home-intro-reveal__line + .home-intro-reveal__line {
  margin-top: 0.18em;
}

.home-intro-reveal__line:nth-child(1) {
  animation-delay: 200ms;
}

.home-intro-reveal__line:nth-child(2) {
  animation-delay: 280ms;
}

.home-intro-reveal__line:nth-child(3) {
  animation-delay: 360ms;
}

.home-intro-reveal__tiles {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.home-intro-reveal__tile {
  background: #000;
  transform: translate3d(0, 0, 0);
  animation: home-intro-tile 860ms cubic-bezier(0.19, 1, 0.22, 1) both;
  will-change: transform;
}

.home-intro-reveal__tile:not(:last-child) {
  border-right: 1px solid rgba(255, 255, 255, 0.06);
}

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

@keyframes home-intro-tile {
  0%,
  4% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(0, -105%, 0);
  }
}

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

- [x] **Step 2: Confirm dev CSS contains the keyframes**

Run: `rg "home-intro-line|home-intro-tile" .next/dev -n --glob '*.css'`
Expected: matches in the dev CSS chunks.

### Task 3: Verify Homepage Intro And Skip Behavior

**Files:**
- Inspect: `app/page.tsx`
- Inspect: `components/case-study-content.tsx`

- [x] **Step 1: Confirm homepage still passes `skipIntro`**

Check `app/page.tsx` contains:

```tsx
<HomeIntroReveal skip={skipIntro === "1"} />
```

Expected: the homepage passes the query flag to the client component.

- [x] **Step 2: Confirm Back to work still skips the intro**

Check `components/case-study-content.tsx` contains:

```tsx
<Link
  href="/?skipIntro=1"
  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
>
```

Expected: case study Back to work returns to the homepage without playing the intro.

- [x] **Step 3: Browser visual verification**

Open: `http://localhost:3000/`
Expected: at about 700ms, the three text lines are visible on black; at about 1600ms, the four panels are moving upward; by about 3200ms, the homepage is visible and usable.

- [x] **Step 4: Skip verification**

Open: `http://localhost:3000/?skipIntro=1`
Expected: overlay count is 0, then URL is cleaned to `/` after hydration.

- [x] **Step 5: Final quality checks**

Run: `./node_modules/.bin/tsc --noEmit --incremental false --pretty false`
Expected: exits with code 0.

Run: `npm run build`
Expected in this environment: blocked by existing `next/font/google` network fetch for `Geist` in `app/layout.tsx`, not by intro code.
