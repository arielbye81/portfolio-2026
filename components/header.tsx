"use client"

import { MouseEvent, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { PAGE_SHELL } from "@/lib/layout"

function NavRollingLabel({ label }: { label: string }) {
  return (
    <span className="relative inline-block h-[1em] overflow-hidden text-sm leading-[1em] align-middle">
      <span className="flex flex-col transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:-translate-y-[1em] group-focus-visible:-translate-y-[1em] motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-visible:translate-y-0">
        <span className="block h-[1em] leading-[1em]">{label}</span>
        <span className="block h-[1em] leading-[1em]" aria-hidden="true">
          {label}
        </span>
      </span>
    </span>
  )
}

const navLinkClassName =
  "group inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (window.location.pathname !== "/") return

    event.preventDefault()
    const target = document.getElementById(sectionId)
    if (!target) return

    target.scrollIntoView({ behavior: "smooth", block: "start" })
    window.history.replaceState(null, "", window.location.pathname + window.location.search)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${PAGE_SHELL} py-6 flex items-center justify-between bg-background/80 backdrop-blur-sm`}>
      <Link
        href="/"
        className="inline-flex items-center gap-[15px] text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
      >
        <span className="flex h-[calc(2lh*2/3)] shrink-0 translate-y-px items-center">
          <Image
            src="/logo.png"
            alt=""
            width={64}
            height={64}
            className="h-full w-auto object-contain object-left"
            priority
          />
        </span>
        <span className="flex flex-col">
          <span className="block font-medium text-foreground">Bei Ye</span>
          <span className="block text-xs text-muted-foreground">UI/UX Designer</span>
        </span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden items-center gap-8 sm:flex" aria-label="Main navigation">
        <Link href="/#work" className={navLinkClassName} onClick={(event) => handleSectionClick(event, "work")}>
          <NavRollingLabel label="Work" />
        </Link>
        <Link href="/#about" className={navLinkClassName} onClick={(event) => handleSectionClick(event, "about")}>
          <NavRollingLabel label="About" />
        </Link>
        <a href="mailto:406597900@qq.com" className={navLinkClassName}>
          <NavRollingLabel label="Contact" />
        </a>
      </nav>

      {/* Mobile menu button */}
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center sm:hidden"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          {menuOpen ? (
            <>
              <line x1="4" y1="4" x2="14" y2="14" />
              <line x1="14" y1="4" x2="4" y2="14" />
            </>
          ) : (
            <>
              <line x1="3" y1="5" x2="15" y2="5" />
              <line x1="3" y1="9" x2="15" y2="9" />
              <line x1="3" y1="13" x2="15" y2="13" />
            </>
          )}
        </svg>
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav
          className="absolute top-full left-0 right-0 border-b border-border bg-background/95 backdrop-blur-sm px-5 py-6 flex flex-col gap-5 sm:hidden"
          aria-label="Mobile navigation"
        >
          <Link
            href="/#work"
            className={navLinkClassName}
            onClick={(event) => {
              handleSectionClick(event, "work")
              setMenuOpen(false)
            }}
          >
            <NavRollingLabel label="Work" />
          </Link>
          <Link
            href="/#about"
            className={navLinkClassName}
            onClick={(event) => {
              handleSectionClick(event, "about")
              setMenuOpen(false)
            }}
          >
            <NavRollingLabel label="About" />
          </Link>
          <a
            href="mailto:406597900@qq.com"
            className={navLinkClassName}
            onClick={() => setMenuOpen(false)}
          >
            <NavRollingLabel label="Contact" />
          </a>
        </nav>
      )}
    </header>
  )
}
