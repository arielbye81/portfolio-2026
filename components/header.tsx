"use client"

import { useState } from "react"
import Link from "next/link"
import { PAGE_SHELL } from "@/lib/layout"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${PAGE_SHELL} py-6 flex items-center justify-between bg-background/80 backdrop-blur-sm`}>
      <div>
        <Link href="/" className="text-sm font-medium text-foreground">
          Bei Ye
        </Link>
        <p className="text-sm text-muted-foreground">UI/UX Designer</p>
      </div>

      {/* Desktop nav */}
      <nav className="hidden items-center gap-8 sm:flex" aria-label="Main navigation">
        <Link
          href="/#work"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Work
        </Link>
        <Link
          href="/#about"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          About
        </Link>
        <a
          href="mailto:406597900@qq.com"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Contact
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
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Work
          </Link>
          <Link
            href="/#about"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <a
            href="mailto:406597900@qq.com"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>
        </nav>
      )}
    </header>
  )
}
