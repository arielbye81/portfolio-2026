import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { HomeScrollReset } from "@/components/home-scroll-reset"
import { HomeIntroReveal } from "@/components/home-intro-reveal"
import { HomeContentReveal } from "@/components/home-content-reveal"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ skipIntro?: string }>
}) {
  const { skipIntro } = await searchParams
  const shouldSkipIntro = skipIntro === "1"

  return (
    <main className="bg-background">
      <HomeIntroReveal skip={shouldSkipIntro} />
      <HomeScrollReset />
      <HomeContentReveal skipIntro={shouldSkipIntro}>
        <Header />
        <HeroSection />
        <AboutSection />
        <Footer />
      </HomeContentReveal>
    </main>
  )
}
