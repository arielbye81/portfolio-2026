"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface HomeContentRevealProps {
  children: ReactNode
  skipIntro?: boolean
}

type HomeEntrance = "idle" | "animating" | "off"

const HOME_REVEAL_ARM_DELAY_MS = 1500
const VIEWPORT_REVEAL_ROOT_MARGIN = "0px 0px -12% 0px"

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function revealElement(element: Element) {
  element.classList.add("is-visible")
}

export function HomeContentReveal({ children, skipIntro = false }: HomeContentRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [entrance, setEntrance] = useState<HomeEntrance>(skipIntro ? "off" : "idle")

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const revealItems = Array.from(root.querySelectorAll("[data-home-reveal]"))

    if (skipIntro || prefersReducedMotion()) {
      revealItems.forEach(revealElement)
      setEntrance("off")
      return
    }

    const viewportItems = revealItems.filter((item) => item.getAttribute("data-home-reveal") === "scroll")
    let firstFrame = 0
    let secondFrame = 0

    const armTimer = window.setTimeout(() => {
      firstFrame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(() => setEntrance("animating"))
      })
    }, HOME_REVEAL_ARM_DELAY_MS)

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
      window.clearTimeout(armTimer)
      cancelAnimationFrame(firstFrame)
      cancelAnimationFrame(secondFrame)
      observer.disconnect()
    }
  }, [skipIntro])

  return (
    <div
      ref={rootRef}
      className={`home-content-reveal home-content-reveal--${entrance}`}
      data-skip-intro={skipIntro ? "true" : undefined}
    >
      {children}
    </div>
  )
}
