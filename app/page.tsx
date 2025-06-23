import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Stats } from "@/components/stats"
import { CTA } from "@/components/cta"
import FuturisticCard from "@/components/FuturisticCard"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Stats />
      <Features />
      <CTA />
      <FuturisticCard>
        <h2>Welcome to the Futuristic AI Media Detector!</h2>
        <p>Drop a media URL to see the magic.</p>
      </FuturisticCard>
    </div>
  )
}
