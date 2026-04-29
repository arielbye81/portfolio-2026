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
    <div
      ref={rootRef}
      className={isArmed ? "home-content-reveal is-armed" : "home-content-reveal"}
      data-skip-intro={skipIntro ? "true" : undefined}
    >
      {children}
    </div>
  )
}
