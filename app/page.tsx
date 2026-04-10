import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { HomeScrollReset } from "@/components/home-scroll-reset"

export default function Home() {
  return (
    <main className="bg-background">
      <HomeScrollReset />
      <Header />
      <HeroSection />
      <AboutSection />
      <Footer />
    </main>
  )
}
