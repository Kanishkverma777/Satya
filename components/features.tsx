import { Upload, LinkIcon, Brain, BookOpen, Trophy, Users, Shield, Globe, Smartphone, Code } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Upload,
      title: "Multi-Format Upload",
      description: "Support for images (JPEG/PNG), videos (MP4/AVI), and audio (WAV/MP3) up to 50MB",
    },
    {
      icon: LinkIcon,
      title: "URL Analysis",
      description: "Analyze media from YouTube, Twitter, TikTok, and Instagram URLs directly",
    },
    {
      icon: Brain,
      title: "AI Ensemble Detection",
      description: "Multiple AI models including Sensity AI, Resemble AI, and Reality Defender",
    },
    {
      icon: BookOpen,
      title: "Educational Hub",
      description: "Interactive tutorials, quizzes, and learning resources about AI detection",
    },
    {
      icon: Trophy,
      title: "Gamification",
      description: 'Leaderboards, badges, and "Spot the Deepfake" challenges',
    },
    {
      icon: Users,
      title: "Community Verification",
      description: "Crowdsourced flagging and verification system with moderation",
    },
    {
      icon: Shield,
      title: "Blockchain Transparency",
      description: "Result hashes logged on Polygon for public verification",
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Available in English, Hindi, Spanish, and Tamil",
    },
    {
      icon: Smartphone,
      title: "Real-time Monitoring",
      description: "Scan trending media on social platforms for AI-generated content",
    },
    {
      icon: Code,
      title: "Developer API",
      description: "REST API with authentication and 100 free calls per day",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive AI Detection Platform</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to identify and understand AI-generated media, backed by cutting-edge technology and
            community insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <feature.icon className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
