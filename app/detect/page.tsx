import { PerformanceOptimizedDetection } from "@/components/performance-optimized-detection"

export default function DetectPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">AI Media Detection</h1>
          <p className="text-lg sm:text-xl text-gray-600 px-2">Upload media files for fast and accurate AI analysis</p>
        </div>
        <PerformanceOptimizedDetection />
      </div>
    </div>
  )
}
