"use client"

import { useEffect, useRef, useState, useCallback, useMemo, type CSSProperties } from "react"
import Link from "next/link"
import { SectionRenderer } from "@/components/section-renderer"
import { PAGE_SHELL } from "@/lib/layout"
import type { CaseStudyContent as CaseStudyData, CaseStudySection } from "@/lib/case-studies"

interface SectionGroup {
  id: string
  title: string
  sections: CaseStudySection[]
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

/** Stagger index → delay for `.case-study-enter` (globals.css). */
function caseStudyEnterStyle(index: number, stepMs: number): CSSProperties {
  return { "--enter-delay": `${index * stepMs}ms` } as CSSProperties
}

type CaseStudyEntrance = "idle" | "animating" | "off"

/** Idle: invisible prep; animating: staggered keyframes; off: no motion (reduced-motion). */
function caseStudyEnterClass(entrance: CaseStudyEntrance, ...extra: string[]) {
  const motion =
    entrance === "off" ? "" : entrance === "idle" ? "case-study-enter-prep" : "case-study-enter"
  return [motion, ...extra].filter(Boolean).join(" ")
}

function caseStudyEnterMotionStyle(
  entrance: CaseStudyEntrance,
  index: number,
  stepMs: number
): CSSProperties | undefined {
  if (entrance !== "animating") return undefined
  return caseStudyEnterStyle(index, stepMs)
}

function groupSections(sections: CaseStudySection[]): {
  preamble: CaseStudySection[]
  groups: SectionGroup[]
} {
  const preamble: CaseStudySection[] = []
  const groups: SectionGroup[] = []
  let current: SectionGroup | null = null

  for (const section of sections) {
    if (section.type === "section-header") {
      if (current) groups.push(current)
      current = {
        id: slugify(section.title),
        title: section.title,
        sections: [section],
      }
    } else if (current) {
      current.sections.push(section)
    } else {
      preamble.push(section)
    }
  }
  if (current) groups.push(current)

  return { preamble, groups }
}

export function CaseStudyContent({ study }: { study: CaseStudyData }) {
  const { preamble, groups } = groupSections(study.sections)
  const [activeSection, setActiveSection] = useState<string>(groups[0]?.id ?? "")
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [entrance, setEntrance] = useState<CaseStudyEntrance>("idle")
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())
  const isClickScrolling = useRef(false)

  const setSectionRef = useCallback((id: string, el: HTMLElement | null) => {
    if (el) {
      sectionRefs.current.set(id, el)
    } else {
      sectionRefs.current.delete(id)
    }
  }, [])

  useEffect(() => {
    const elements = Array.from(sectionRefs.current.values())
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section-id")
            if (id) setActiveSection(id)
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [groups])

  useEffect(() => {
    const threshold = window.innerHeight * 1
    const onScroll = () => setShowBackToTop(window.scrollY > threshold)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /** Arm stagger animation after paint so it reliably runs on client navigation / hydration. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEntrance("off")
      return
    }
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntrance("animating"))
    })
    return () => cancelAnimationFrame(id)
  }, [])

  const handleTocClick = (id: string) => {
    const el = sectionRefs.current.get(id)
    if (!el) return

    isClickScrolling.current = true
    setActiveSection(id)
    el.scrollIntoView({ behavior: "smooth", block: "start" })

    const timer = setTimeout(() => {
      isClickScrolling.current = false
    }, 800)
    return () => clearTimeout(timer)
  }

  const meta = [
    { label: "Role", value: study.role },
    { label: "Year", value: study.year },
  ]

  const stagger = useMemo(() => {
    const STEP_MS = 80
    let n = 0
    const back = n++
    const tags = n++
    const title = n++
    const subtitle = n++
    const techniques = study.techniques && study.techniques.length > 0 ? n++ : undefined
    const toc = groups.length > 0 ? n++ : undefined
    const contentBase = n
    /** First stagger index for each section group's first block (for per-block delays). */
    const groupContentStart: number[] = []
    let cursor = contentBase + preamble.length
    for (const g of groups) {
      groupContentStart.push(cursor)
      cursor += g.sections.length
    }
    return { STEP_MS, back, tags, title, subtitle, techniques, toc, contentBase, groupContentStart }
  }, [study.techniques, groups, preamble.length])

  return (
    <div className={PAGE_SHELL}>
      <div className="mx-auto w-full max-w-[1400px] pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[0.97fr_2.5fr] lg:gap-20 xl:grid-cols-[0.95fr_2.5fr] xl:gap-24">
          {/* Left column — sticky sidebar */}
          <aside className="mb-12 lg:mb-0">
            <div className="lg:sticky lg:top-32">
              <div
                className={caseStudyEnterClass(entrance, "mb-10")}
                style={caseStudyEnterMotionStyle(entrance, stagger.back, stagger.STEP_MS)}
              >
                <Link
                  href="/?skipIntro=1"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rotate-180">
                    <path
                      d="M6 12L10 8L6 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Back to work
                </Link>
              </div>

              <div
                className={caseStudyEnterClass(entrance, "mb-8 flex flex-wrap gap-2")}
                style={caseStudyEnterMotionStyle(entrance, stagger.tags, stagger.STEP_MS)}
              >
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[2px] border border-border px-2.5 py-0.5 text-xs tracking-wider text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1
                className={caseStudyEnterClass(
                  entrance,
                  "mb-6 text-3xl leading-tight text-foreground md:text-4xl font-schnyder-title"
                )}
                style={caseStudyEnterMotionStyle(entrance, stagger.title, stagger.STEP_MS)}
              >
                {study.title}
              </h1>
              <p
                className={caseStudyEnterClass(
                  entrance,
                  "mb-10 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base"
                )}
                style={caseStudyEnterMotionStyle(entrance, stagger.subtitle, stagger.STEP_MS)}
              >
                {study.subtitle}
              </p>

              <dl className="mb-10 hidden grid-cols-2 gap-4">
                {meta.map((item) => (
                  <div key={item.label}>
                    <dt className="text-[11px] uppercase tracking-widest text-muted-foreground">
                      {item.label}
                    </dt>
                    <dd className="mt-0.5 text-sm text-foreground">{item.value}</dd>
                  </div>
                ))}
              </dl>

              {study.techniques && study.techniques.length > 0 && stagger.techniques !== undefined && (
                <div
                  className={caseStudyEnterClass(entrance, "mb-12")}
                  style={caseStudyEnterMotionStyle(entrance, stagger.techniques, stagger.STEP_MS)}
                >
                  <p className="mb-3 text-[11px] uppercase tracking-widest text-muted-foreground">
                    Techniques
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {study.techniques.map((t) => (
                      <span
                        key={t}
                        className="rounded-[2px] bg-muted px-2.5 py-1 text-xs text-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* TOC — hidden on mobile */}
              {groups.length > 0 && stagger.toc !== undefined && (
                <nav
                  className={caseStudyEnterClass(entrance, "hidden lg:block")}
                  aria-label="Table of contents"
                  style={caseStudyEnterMotionStyle(entrance, stagger.toc, stagger.STEP_MS)}
                >
                  <p className="mb-3 text-[11px] uppercase tracking-widest text-muted-foreground">
                    Contents
                  </p>
                  <ul className="space-y-2">
                    {groups.map((group) => {
                      const isActive = activeSection === group.id
                      return (
                        <li key={group.id} className="flex items-center">
                          <span
                            className={`h-px transition-all duration-200 ${
                              isActive ? "w-4 mr-2 bg-foreground" : "w-0 bg-transparent"
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => handleTocClick(group.id)}
                            className={`text-left text-sm transition-all duration-200 ${
                              isActive
                                ? "font-medium text-foreground"
                                : "font-normal text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {group.title}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </nav>
              )}
            </div>
          </aside>

          {/* Right column — main content */}
          <div className="min-w-0 pb-16 md:pb-20">
            {/* Preamble (intro, stats, etc. before first section-header) */}
            {preamble.length > 0 && (
              <div className="mb-12 md:mb-16">
                {preamble.map((section, i) => (
                  <div
                    key={i}
                    className={caseStudyEnterClass(entrance)}
                    style={caseStudyEnterMotionStyle(
                      entrance,
                      stagger.contentBase + i,
                      stagger.STEP_MS
                    )}
                  >
                    <SectionRenderer
                      section={section}
                      prevType={preamble[i - 1]?.type}
                      nextType={preamble[i + 1]?.type}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Section groups */}
            {groups.map((group, groupIndex) => (
              <section
                key={group.id}
                id={group.id}
                data-section-id={group.id}
                ref={(el) => setSectionRef(group.id, el)}
                className="mb-16 md:mb-20"
              >
                {group.sections.map((section, i) => (
                  <div
                    key={i}
                    className={caseStudyEnterClass(entrance)}
                    style={caseStudyEnterMotionStyle(
                      entrance,
                      stagger.groupContentStart[groupIndex] + i,
                      stagger.STEP_MS
                    )}
                  >
                    <SectionRenderer
                      section={section}
                      prevType={group.sections[i - 1]?.type}
                      nextType={group.sections[i + 1]?.type}
                    />
                  </div>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`group fixed bottom-8 right-8 z-40 flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2.5 backdrop-blur-sm transition-all duration-300 hover:border-foreground hover:bg-foreground ${
          showBackToTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          className="transition-colors group-hover:text-background"
        >
          <path
            d="M12 10L8 6L4 10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-xs text-foreground transition-colors group-hover:text-background">
          Back to Top
        </span>
      </button>
    </div>
  )
}
