import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Stats } from "@/components/stats"
import { CTA } from "@/components/cta"
import FuturisticCard from "@/components/FuturisticCard"
import MinimalCard from "@/components/MinimalCard"

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
      <main className="max-w-2xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-8 text-futuristic-accent">
          Satya AI Media Detector
        </h1>
        <MinimalCard>
          <h2 className="text-2xl font-semibold mb-2">Analyze Media</h2>
          <p className="text-base text-white/80 mb-4">
            Paste a media URL to detect if it’s AI-generated or manipulated.
          </p>
          {/* Place your form or upload component here */}
        </MinimalCard>
      </main>
    </div>
  )
}
