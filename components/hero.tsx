import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Users, Brain, Globe, Lock, TrendingUp } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Modern background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,23,42,0.03),transparent_50%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-100/20 via-transparent to-slate-100/20" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-900/5 backdrop-blur-sm border border-slate-200 mb-8">
            <Brain className="h-4 w-4 text-slate-600 mr-2" />
            <span className="text-sm font-medium text-slate-700">Powered by Advanced AI</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 sm:mb-8 leading-tight">
            Uncover the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900">
              Truth
            </span>
            <br />
            Behind Every Media
          </h1>
          
          <p className="text-xl sm:text-2xl text-slate-600 mb-8 sm:mb-12 max-w-4xl mx-auto px-4 leading-relaxed">
            Satya combines cutting-edge artificial intelligence with blockchain verification to detect AI-generated content with unprecedented accuracy. 
            <span className="text-slate-800 font-semibold"> 99.2% detection rate</span> across all media types.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16 px-4">
            <Link href="/detect">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/25 border-0">
                Start Detection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/learn">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4 border-slate-300 text-slate-700 hover:bg-slate-50 backdrop-blur-sm">
                Explore Features
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">99.2%</div>
              <div className="text-sm text-slate-600">Detection Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">50M+</div>
              <div className="text-sm text-slate-600">Files Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">10s</div>
              <div className="text-sm text-slate-600">Average Response</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">24/7</div>
              <div className="text-sm text-slate-600">Real-time Monitoring</div>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="group p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Multi-Modal Detection</h3>
              <p className="text-sm text-slate-600">
                Advanced AI models for images, videos, audio, and text analysis
              </p>
            </div>
            
            <div className="group p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Blockchain Verified</h3>
              <p className="text-sm text-slate-600">
                Immutable detection records on Polygon blockchain
              </p>
            </div>
            
            <div className="group p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Collaborative Analysis</h3>
              <p className="text-sm text-slate-600">
                Real-time multi-user detection sessions
              </p>
            </div>
            
            <div className="group p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Live Monitoring</h3>
              <p className="text-sm text-slate-600">
                Track trending media across social platforms
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
