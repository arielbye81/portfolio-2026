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
