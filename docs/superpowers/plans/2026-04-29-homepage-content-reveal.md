# Homepage Content Reveal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a homepage-wide gradual reveal animation that overlaps the final 20% of the existing black intro.

**Architecture:** Add a small client wrapper that controls homepage reveal state, marks first-screen items visible at 2400ms on normal entry, and observes below-the-fold items as they enter the viewport. Keep animation implementation in CSS with `opacity` and `transform`, and make `skipIntro=1` plus reduced-motion paths show content immediately.

**Tech Stack:** Next.js App Router, React client component, TypeScript, CSS transitions/keyframes, IntersectionObserver.

---

## File Structure

- Create `components/home-content-reveal.tsx`: client-only controller and wrapper for homepage reveal timing and viewport observation.
- Modify `app/page.tsx`: wrap homepage content in `HomeContentReveal` and pass the existing `skipIntro` state.
- Modify `components/hero-section.tsx`: add reveal data attributes and stagger variables to first-screen and work content groups.
- Modify `components/about-section.tsx`: add reveal data attributes and stagger variables to below-the-fold groups.
- Modify `components/footer.tsx`: add reveal data attributes to footer content if needed.
- Modify `app/globals.css`: add homepage content reveal CSS and reduced-motion rules.

### Task 1: Add Homepage Reveal Controller

**Files:**
- Create: `components/home-content-reveal.tsx`

- [ ] **Step 1: Create the client wrapper**

```tsx
"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface HomeContentRevealProps {
  children: ReactNode
  skipIntro?: boolean
}

const FIRST_SCREEN_REVEAL_DELAY_MS = 2400
const VIEWPORT_REVEAL_ROOT_MARGIN = "0px 0px -12% 0px"

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function revealElement(element: Element) {
  element.classList.add("is-visible")
}

export function HomeContentReveal({ children, skipIntro = false }: HomeContentRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [isArmed, setIsArmed] = useState(skipIntro)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const revealItems = Array.from(root.querySelectorAll("[data-home-reveal]"))

    if (skipIntro || prefersReducedMotion()) {
      revealItems.forEach(revealElement)
      setIsArmed(true)
      return
    }

    const firstScreenItems = revealItems.filter((item) => item.getAttribute("data-home-reveal") === "intro")
    const viewportItems = revealItems.filter((item) => item.getAttribute("data-home-reveal") === "scroll")

    const introTimer = window.setTimeout(() => {
      firstScreenItems.forEach(revealElement)
      setIsArmed(true)
    }, FIRST_SCREEN_REVEAL_DELAY_MS)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          revealElement(entry.target)
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: VIEWPORT_REVEAL_ROOT_MARGIN, threshold: 0.12 }
    )

    viewportItems.forEach((item) => observer.observe(item))

    return () => {
      window.clearTimeout(introTimer)
      observer.disconnect()
    }
  }, [skipIntro])

  return (
    <div ref={rootRef} className={isArmed ? "home-content-reveal is-armed" : "home-content-reveal"}>
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Run typecheck to catch component typing issues**

Run: `./node_modules/.bin/tsc --noEmit --incremental false --pretty false`
Expected: TypeScript succeeds or only reports unrelated pre-existing errors. If it reports new errors in `components/home-content-reveal.tsx`, fix them before continuing.

### Task 2: Wire Controller Into Homepage

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Import and wrap homepage content**

Replace the imports and JSX in `app/page.tsx` with this shape:

```tsx
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { HomeScrollReset } from "@/components/home-scroll-reset"
import { HomeIntroReveal } from "@/components/home-intro-reveal"
import { HomeContentReveal } from "@/components/home-content-reveal"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ skipIntro?: string }>
}) {
  const { skipIntro } = await searchParams
  const shouldSkipIntro = skipIntro === "1"

  return (
    <main className="bg-background">
      <HomeIntroReveal skip={shouldSkipIntro} />
      <HomeScrollReset />
      <HomeContentReveal skipIntro={shouldSkipIntro}>
        <Header />
        <HeroSection />
        <AboutSection />
        <Footer />
      </HomeContentReveal>
    </main>
  )
}
```

- [ ] **Step 2: Run typecheck**

Run: `./node_modules/.bin/tsc --noEmit --incremental false --pretty false`
Expected: PASS.

### Task 3: Mark Homepage Content Groups

**Files:**
- Modify: `components/hero-section.tsx`
- Modify: `components/about-section.tsx`
- Modify: `components/footer.tsx`

- [ ] **Step 1: Add first-screen reveal markers in `HeroSection`**

Use `data-home-reveal="intro"` on major first-screen groups and stagger them with CSS variables:

```tsx
<div className="my-auto max-w-2xl" data-home-reveal="intro" style={{ "--home-reveal-delay": "0ms" } as React.CSSProperties}>
```

```tsx
<div id="work" className="pt-8" data-home-reveal="intro" style={{ "--home-reveal-delay": "140ms" } as React.CSSProperties}>
```

Add this type import to the top of `components/hero-section.tsx`:

```tsx
import type { CSSProperties } from "react"
```

Then use `as CSSProperties` instead of `as React.CSSProperties`.

- [ ] **Step 2: Add below-the-fold reveal markers in `AboutSection`**

Use `data-home-reveal="scroll"` on the large content groups:

```tsx
<div className="order-1 lg:order-none space-y-10" data-home-reveal="scroll" style={{ "--home-reveal-delay": "0ms" } as CSSProperties}>
```

```tsx
<div className="order-2 lg:order-none" data-home-reveal="scroll" style={{ "--home-reveal-delay": "120ms" } as CSSProperties}>
```

```tsx
<div className="relative order-3 ..." data-home-reveal="scroll" style={{ "--home-reveal-delay": "160ms" } as CSSProperties}>
```

Add this type import to the top of `components/about-section.tsx`:

```tsx
import type { CSSProperties } from "react"
```

- [ ] **Step 3: Mark footer if it has visible homepage content**

Read `components/footer.tsx`. If it returns a visible wrapper, add `data-home-reveal="scroll"` and `style={{ "--home-reveal-delay": "0ms" } as CSSProperties}` to its outer content element and import `CSSProperties`.

- [ ] **Step 4: Run typecheck**

Run: `./node_modules/.bin/tsc --noEmit --incremental false --pretty false`
Expected: PASS.

### Task 4: Add Reveal CSS

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add homepage reveal styles after the intro CSS block**

```css
.home-content-reveal [data-home-reveal] {
  opacity: 0;
  transform: translate3d(0, 1.35rem, 0);
  transition:
    opacity 900ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--home-reveal-delay, 0ms);
  will-change: opacity, transform;
}

.home-content-reveal [data-home-reveal].is-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
```

- [ ] **Step 2: Add reduced-motion override inside the existing reduced-motion media query**

```css
  .home-content-reveal [data-home-reveal] {
    opacity: 1;
    transform: none;
    transition: none;
  }
```

- [ ] **Step 3: Run typecheck and build**

Run: `./node_modules/.bin/tsc --noEmit --incremental false --pretty false`
Expected: PASS.

Run: `npm run build`
Expected: build completes successfully.

### Task 5: Browser Verification

**Files:**
- No file changes expected.

- [ ] **Step 1: Start or reuse dev server**

Run: `npm run dev -- -H 127.0.0.1 -p 3000`
Expected: Next.js dev server serves `http://127.0.0.1:3000/`.

- [ ] **Step 2: Verify normal homepage load**

Open `http://127.0.0.1:3000/`.
Expected: black intro appears; around the final 20% of the intro, first-screen homepage content starts fading/lifting in underneath the retreating tiles.

- [ ] **Step 3: Verify scroll reveals**

Scroll to About and footer.
Expected: below-the-fold content fades/lifts in as it enters the viewport.

- [ ] **Step 4: Verify skipIntro return path**

Open a case study, click `Back to work`.
Expected: URL returns to homepage, black intro does not replay, and content is visible without a distracting replay.
