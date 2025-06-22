import { PerformanceOptimizedDetection } from "@/components/performance-optimized-detection"
import { CollaborativeDetection } from "@/components/collaborative-detection"
import { AIModelComparison } from "@/components/ai-model-comparison"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Users, BarChart3 } from "lucide-react"

export default function DetectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Advanced AI Detection
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            Choose your detection method: individual analysis, collaborative sessions, or multi-model comparison
          </p>
        </div>
        
        <Tabs defaultValue="individual" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-slate-100/50 p-1 rounded-xl">
            <TabsTrigger value="individual" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
              <Brain className="h-4 w-4" />
              Individual Analysis
            </TabsTrigger>
            <TabsTrigger value="collaborative" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
              <Users className="h-4 w-4" />
              Collaborative Session
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
              <BarChart3 className="h-4 w-4" />
              Model Comparison
            </TabsTrigger>
          </TabsList>

          <TabsContent value="individual" className="space-y-6">
            <PerformanceOptimizedDetection />
          </TabsContent>

          <TabsContent value="collaborative" className="space-y-6">
            <CollaborativeDetection />
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <AIModelComparison />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
