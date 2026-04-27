"use client"

import { useCallback, useEffect, useRef, useState } from "react"

/**
 * DOM-follow “fake” cursor (crisp on retina vs cursor:url bitmap).
 * Enabled only for fine pointers and when reduced-motion is off.
 * Over [data-cursor-morph-image], morphs between dot and rounded-rect (pill).
 */
export function CustomCursor() {
  const [hidden, setHidden] = useState(true)
  const [variant, setVariant] = useState<"dot" | "pill">("dot")
  const [enabled, setEnabled] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const queuedPos = useRef({ x: 0, y: 0 })
  const appliedPos = useRef({ x: Number.NaN, y: Number.NaN })

  const flushCursorPosition = useCallback(() => {
    frameRef.current = null
    const node = cursorRef.current
    if (!node) return

    const { x, y } = queuedPos.current
    if (x === appliedPos.current.x && y === appliedPos.current.y) return

    node.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
    appliedPos.current = { x, y }
  }, [])

  const queueCursorPosition = useCallback(
    (x: number, y: number) => {
      queuedPos.current = { x, y }
      if (frameRef.current !== null) return
      frameRef.current = requestAnimationFrame(flushCursorPosition)
    },
    [flushCursorPosition]
  )

  useEffect(() => {
    const mqFine = window.matchMedia("(pointer: fine)")
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => {
      const ok = mqFine.matches && !mqReduce.matches
      setEnabled(ok)
      document.documentElement.classList.toggle("has-custom-cursor", ok)
    }
    apply()
    mqFine.addEventListener("change", apply)
    mqReduce.addEventListener("change", apply)
    return () => {
      mqFine.removeEventListener("change", apply)
      mqReduce.removeEventListener("change", apply)
      document.documentElement.classList.remove("has-custom-cursor")
    }
  }, [])

  const onPointerMove = useCallback((e: PointerEvent) => {
    const x = e.clientX
    const y = e.clientY
    queueCursorPosition(x, y)
    const el = document.elementFromPoint(x, y)

    let nextHidden = true
    let nextVariant: "dot" | "pill" = "dot"

    if (el) {
      const morphImage = el.closest("[data-cursor-morph-image]")
      const inGrabStrip = el.closest("[data-cursor-grab]")
      const onProjectCard = el.closest("a.project-card-link")
      if (
        el.closest("input, textarea, select") ||
        (inGrabStrip && !onProjectCard)
      ) {
        nextHidden = true
        nextVariant = "dot"
      } else {
        nextHidden = false
        nextVariant = morphImage ? "pill" : "dot"
      }
    }

    setHidden((h) => (h === nextHidden ? h : nextHidden))
    setVariant((v) => (v === nextVariant ? v : nextVariant))
  }, [queueCursorPosition])

  useEffect(() => {
    if (!enabled) {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
      return
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
    }
  }, [enabled, onPointerMove])

  if (!enabled) return null

  const isPill = variant === "pill"
  const showLabel = isPill && !hidden
  /* Dot and pill both use rounded-full: only width/height change. Animating
   * rounded-full → rounded-xl interpolates px values oddly (“two-stage” look). */
  const shapeClass = isPill
    ? "h-7 w-[96px] rounded-full bg-black/35 backdrop-blur-sm"
    : "h-4 w-4 rounded-full bg-[#505050]"

  return (
    <div
      ref={cursorRef}
      aria-hidden
      className={`pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center overflow-hidden transition-[width,height] duration-300 ease-out ${
        hidden ? "opacity-0" : "opacity-100"
      } ${shapeClass}`}
      style={{
        willChange: "transform",
      }}
    >
      <span
        className={`select-none text-[12px] font-medium leading-none tracking-tight text-white whitespace-nowrap ${
          showLabel ? "opacity-100" : "opacity-0"
        }`}
      >
        View Project
      </span>
    </div>
  )
}
