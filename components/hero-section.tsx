import Image from "next/image"
import { InfiniteScroll } from "./infinite-scroll"
import { PAGE_SHELL } from "@/lib/layout"

const clientLogos = [
  { name: "Apple", src: "/images/logos/apple.png", scale: 1.3 },
  { name: "PwC", src: "/images/logos/pwc.png", scale: 1.3 },
  { name: "Wallstreet", src: "/images/logos/wallstreet.png", scale: 1.3 },
  { name: "Flower", src: "/images/logos/flower.png", scale: 1.3 },
] as const

export function HeroSection() {
  return (
    <section className={`flex min-h-screen flex-col ${PAGE_SHELL} pt-32 pb-16`}>
      <div className="my-auto max-w-2xl">
        <h1 className="text-xl md:text-2xl font-normal text-foreground leading-[1.40] mb-6 text-balance">
          <span className="text-[calc(1em-2pt)]">
            With 10+ years in UI/UX, I combine front-end expertise, visual craft, and product thinking{" "}
          </span>
          <span className="font-schnyder-e2e tracking-[0.02em]">— bridging strategy and execution</span>
          <span className="text-[calc(1em-2pt)]">.</span>
        </h1>
        <a
          href="#about"
          className="inline-block text-sm text-foreground border border-border px-4 py-2 rounded-sm hover:bg-muted transition-colors"
        >
          About me
        </a>

        {/* Client Logos */}
        <div className="mt-10 flex items-center gap-8">
          {clientLogos.map((logo) => (
            <div key={logo.name} className="opacity-60 hover:opacity-80 transition-opacity">
              <Image
                src={logo.src}
                alt={logo.name}
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
                style={{ transform: `scale(${logo.scale})`, transformOrigin: "center" }}
              />
            </div>
          ))}
        </div>
      </div>

      <div id="work" className="pt-8">
        <InfiniteScroll />
      </div>
    </section>
  )
}
