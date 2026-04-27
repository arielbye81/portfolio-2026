"use client"

import { useRef, useEffect, useLayoutEffect, useCallback } from "react"
import { homeProjectSummaries } from "@/lib/case-study-summaries"
import { ProjectCard } from "./project-card"

/**
 * One "set" = 4 cards. Using scrollWidth/3 is wrong: 12 flex items share 11 gaps,
 * so one period is not scrollWidth/3; use the 5th child's offset (start of 2nd copy).
 */
function getOneSetScrollWidth(container: HTMLDivElement): number {
  const fifth = container.children[4] as HTMLElement | undefined
  if (fifth) return Math.round(fifth.offsetLeft)
  return Math.round(container.scrollWidth / 3)
}

const projects = homeProjectSummaries

export function InfiniteScroll() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const startScrollLeft = useRef(0)
  const handleScroll = useCallback(() => {
    const container = scrollRef.current
    if (!container) return

    const singleSetWidth = getOneSetScrollWidth(container)
    if (singleSetWidth <= 0) return

    const scrollLeft = container.scrollLeft
    if (scrollLeft >= singleSetWidth * 2) {
      container.scrollLeft = scrollLeft - singleSetWidth
    } else if (scrollLeft < singleSetWidth) {
      container.scrollLeft = scrollLeft + singleSetWidth
    }
  }, [])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const container = scrollRef.current
    if (!container) return
    isDragging.current = true
    startX.current = e.clientX
    startScrollLeft.current = container.scrollLeft
    container.setPointerCapture(e.pointerId)
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !scrollRef.current) return
    e.preventDefault()
    const dx = e.clientX - startX.current
    scrollRef.current.scrollLeft = startScrollLeft.current - dx
  }, [])

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    isDragging.current = false
    scrollRef.current?.releasePointerCapture(e.pointerId)
  }, [])

  useLayoutEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const snapToMiddleSet = () => {
      const w = getOneSetScrollWidth(container)
      if (w > 0) container.scrollLeft = w
    }
    snapToMiddleSet()
    requestAnimationFrame(() => {
      requestAnimationFrame(snapToMiddleSet)
    })
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const onScroll = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      animationRef.current = requestAnimationFrame(handleScroll)
    }

    container.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      container.removeEventListener("scroll", onScroll)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [handleScroll])

  const tripleProjects = [...projects, ...projects, ...projects]

  return (
    <div
      className="relative"
      role="region"
      aria-label="Featured projects"
    >
      <div
        ref={scrollRef}
        data-cursor-grab
        className="flex gap-8 overflow-x-auto scrollbar-hide cursor-grab select-none active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {tripleProjects.map((project, index) => (
          <ProjectCard
            key={`${project.slug}-${index}`}
            title={project.title}
            description={project.subtitle}
            techniques={project.techniques}
            slug={project.slug}
            index={index % projects.length}
            image={project.heroImage}
          />
        ))}
      </div>

    </div>
  )
}
