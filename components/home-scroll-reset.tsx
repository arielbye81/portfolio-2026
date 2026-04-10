"use client"

import { useEffect } from "react"

export function HomeScrollReset() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }

    const resetToTop = () => {
      window.scrollTo(0, 0)
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search)
      }
    }

    resetToTop()
    window.addEventListener("pageshow", resetToTop)

    return () => {
      window.removeEventListener("pageshow", resetToTop)
    }
  }, [])

  return null
}
