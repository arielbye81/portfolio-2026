import { InfiniteScroll } from "./infinite-scroll"
import { PAGE_SHELL } from "@/lib/layout"

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" role="img" aria-label="Apple">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  )
}

function PwCLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" role="img" aria-label="PwC">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2zm4 8h-2v-4h2v4zm0-6h-2V9h2v2zm4 6h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
    </svg>
  )
}

function AntGroupLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" role="img" aria-label="Ant Group">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  )
}

function FigmaLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" role="img" aria-label="Figma">
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5zM12 2h3.5a3.5 3.5 0 1 1 0 7H12V2zM12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0zM5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0zM5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>
    </svg>
  )
}

export function HeroSection() {
  return (
    <section className={`flex min-h-screen flex-col ${PAGE_SHELL} pt-32 pb-16`}>
      <div className="my-auto max-w-2xl">
        <h1 className="text-xl md:text-2xl font-normal text-foreground leading-relaxed mb-6 text-balance">
          With 10+ years in UI/UX, I blend front-end skills, visual taste, and product thinking to deliver end-to-end design.
        </h1>
        <a
          href="#about"
          className="inline-block text-sm text-foreground border border-border px-4 py-2 rounded-sm hover:bg-muted transition-colors"
        >
          About me
        </a>
        
        {/* Client Logos */}
        <div className="mt-10 flex items-center gap-8">
          <div className="text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors">
            <AppleLogo />
          </div>
          <div className="text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors">
            <PwCLogo />
          </div>
          <div className="text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors">
            <AntGroupLogo />
          </div>
          <div className="text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors">
            <FigmaLogo />
          </div>
        </div>
      </div>

      <div id="work" className="pt-8">
        <InfiniteScroll />
      </div>
    </section>
  )
}
