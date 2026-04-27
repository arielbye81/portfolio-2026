import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { HomeScrollReset } from "@/components/home-scroll-reset"
import { HomeIntroReveal } from "@/components/home-intro-reveal"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ skipIntro?: string }>
}) {
  const { skipIntro } = await searchParams

  return (
    <main className="bg-background">
      <HomeIntroReveal skip={skipIntro === "1"} />
      <HomeScrollReset />
      <Header />
      <HeroSection />
      <AboutSection />
      <Footer />
    </main>
  )
}
