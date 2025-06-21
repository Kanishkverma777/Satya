import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Users } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Detect AI-Generated Media with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Precision
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            Upload images, videos, or audio files to instantly detect AI manipulation. Our cutting-edge ensemble of AI
            models provides 95%+ accuracy with detailed analysis.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
            <Link href="/detect">
              <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3">
                Start Detection
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <Link href="/learn">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3">
                Learn More
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto px-4">
            <div className="flex flex-col items-center p-4 sm:p-6 bg-white rounded-lg shadow-sm border">
              <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-center">Advanced Detection</h3>
              <p className="text-sm sm:text-base text-gray-600 text-center">
                Multi-modal AI ensemble with 95%+ accuracy across images, videos, and audio
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border">
              <Zap className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600 text-center">Get results in under 10 seconds for files up to 10MB</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border">
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Community Verified</h3>
              <p className="text-gray-600 text-center">Crowdsourced verification and educational resources</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
