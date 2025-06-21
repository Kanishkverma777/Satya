import { RealTimeMonitoring } from "@/components/real-time-monitoring"

export default function MonitoringPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Real-Time Monitoring</h1>
          <p className="text-xl text-gray-600">
            Live detection and monitoring of AI-generated content across social media platforms
          </p>
        </div>
        <RealTimeMonitoring />
      </div>
    </div>
  )
}
