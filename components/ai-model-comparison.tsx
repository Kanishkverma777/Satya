"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Brain, 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Zap,
  Target,
  BarChart3,
  Eye,
  Download,
  Share2
} from "lucide-react"

interface ModelResult {
  id: string
  name: string
  version: string
  confidence: number
  isAIGenerated: boolean
  processingTime: number
  accuracy: number
  details: string[]
  strengths: string[]
  weaknesses: string[]
  modelType: "ensemble" | "neural" | "statistical" | "hybrid"
  lastUpdated: string
}

interface ComparisonMetrics {
  agreement: number
  averageConfidence: number
  fastestModel: string
  mostConfident: string
  consensus: boolean
}

export function AIModelComparison() {
  const [selectedFile, setSelectedFile] = useState<string>("sample_image.jpg")
  const [modelResults, setModelResults] = useState<ModelResult[]>([
    {
      id: "1",
      name: "MediaTruth Ensemble",
      version: "v2.1.4",
      confidence: 94.2,
      isAIGenerated: true,
      processingTime: 2.3,
      accuracy: 99.2,
      details: [
        "Facial landmark analysis: 96.8% confidence",
        "Texture consistency: 92.1% confidence", 
        "Metadata analysis: 89.7% confidence",
        "Lighting pattern analysis: 95.4% confidence"
      ],
      strengths: ["Multi-modal analysis", "High accuracy", "Fast processing"],
      weaknesses: ["Requires high-quality input"],
      modelType: "ensemble",
      lastUpdated: "2024-01-15"
    },
    {
      id: "2",
      name: "DeepFake Detection v2.1",
      version: "v2.1.0",
      confidence: 87.6,
      isAIGenerated: true,
      processingTime: 4.1,
      accuracy: 94.8,
      details: [
        "Facial artifact detection: 89.2% confidence",
        "Eye blink analysis: 85.1% confidence",
        "Lip sync analysis: 88.3% confidence"
      ],
      strengths: ["Specialized in facial analysis", "Good with video content"],
      weaknesses: ["Slower processing", "Limited to facial features"],
      modelType: "neural",
      lastUpdated: "2024-01-10"
    },
    {
      id: "3",
      name: "Reality Defender",
      version: "v1.8.2",
      confidence: 91.3,
      isAIGenerated: true,
      processingTime: 3.2,
      accuracy: 96.1,
      details: [
        "Pixel-level analysis: 93.7% confidence",
        "Compression artifact detection: 89.8% confidence",
        "Color space analysis: 90.5% confidence"
      ],
      strengths: ["Pixel-level precision", "Good with images"],
      weaknesses: ["Computationally intensive"],
      modelType: "hybrid",
      lastUpdated: "2024-01-12"
    },
    {
      id: "4",
      name: "Sensity AI",
      version: "v3.0.1",
      confidence: 82.4,
      isAIGenerated: false,
      processingTime: 1.8,
      accuracy: 91.3,
      details: [
        "Statistical pattern analysis: 84.1% confidence",
        "Noise analysis: 80.7% confidence"
      ],
      strengths: ["Very fast", "Good baseline"],
      weaknesses: ["Lower accuracy", "Limited analysis depth"],
      modelType: "statistical",
      lastUpdated: "2024-01-08"
    }
  ])

  const [comparisonMetrics] = useState<ComparisonMetrics>({
    agreement: 75,
    averageConfidence: 88.9,
    fastestModel: "Sensity AI",
    mostConfident: "MediaTruth Ensemble",
    consensus: true
  })

  const getModelColor = (modelType: string) => {
    switch (modelType) {
      case "ensemble": return "from-purple-500 to-purple-600"
      case "neural": return "from-blue-500 to-blue-600"
      case "statistical": return "from-green-500 to-green-600"
      case "hybrid": return "from-orange-500 to-orange-600"
      default: return "from-gray-500 to-gray-600"
    }
  }

  const getModelIcon = (modelType: string) => {
    switch (modelType) {
      case "ensemble": return <Brain className="h-4 w-4" />
      case "neural": return <TrendingUp className="h-4 w-4" />
      case "statistical": return <BarChart3 className="h-4 w-4" />
      case "hybrid": return <Target className="h-4 w-4" />
      default: return <Shield className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Model Comparison</h2>
          <p className="text-gray-600">Compare detection results across multiple AI models</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share Results
          </Button>
        </div>
      </div>

      {/* Comparison Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Model Agreement</p>
                <p className="text-2xl font-bold text-blue-900">{comparisonMetrics.agreement}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Avg Confidence</p>
                <p className="text-2xl font-bold text-green-900">{comparisonMetrics.averageConfidence}%</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Fastest Model</p>
                <p className="text-lg font-bold text-purple-900">{comparisonMetrics.fastestModel}</p>
              </div>
              <Zap className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Most Confident</p>
                <p className="text-lg font-bold text-orange-900">{comparisonMetrics.mostConfident}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Model Results Grid */}
            <div className="space-y-4">
              {modelResults.map((model) => (
                <Card key={model.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${getModelColor(model.modelType)}`}>
                          {getModelIcon(model.modelType)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{model.name}</CardTitle>
                          <CardDescription>v{model.version}</CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={model.isAIGenerated ? "destructive" : "default"} className="mb-1">
                          {model.isAIGenerated ? "AI Generated" : "Authentic"}
                        </Badge>
                        <p className="text-2xl font-bold text-blue-600">{model.confidence}%</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Processing Time:</span>
                      <span className="font-medium">{model.processingTime}s</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Accuracy:</span>
                      <span className="font-medium">{model.accuracy}%</span>
                    </div>
                    <Progress value={model.confidence} className="h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Consensus Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Consensus Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">Consensus Reached</span>
                  </div>
                  <p className="text-sm text-green-700">
                    3 out of 4 models agree this content is AI-generated with high confidence.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Key Findings:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      MediaTruth Ensemble provides highest confidence (94.2%)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      Sensity AI shows lowest confidence but fastest processing
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      All models detect facial artifacts and inconsistencies
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Recommendation:</h4>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      Based on ensemble analysis, this content is <strong>highly likely to be AI-generated</strong>. 
                      Multiple detection methods confirm artificial patterns consistent with GAN-generated imagery.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {modelResults.map((model) => (
              <Card key={model.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${getModelColor(model.modelType)}`}>
                        {getModelIcon(model.modelType)}
                      </div>
                      <div>
                        <CardTitle>{model.name}</CardTitle>
                        <CardDescription>v{model.version} • {model.modelType}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={model.isAIGenerated ? "destructive" : "default"}>
                      {model.isAIGenerated ? "AI Generated" : "Authentic"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Confidence</p>
                      <p className="text-2xl font-bold text-blue-600">{model.confidence}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Processing Time</p>
                      <p className="text-2xl font-bold text-green-600">{model.processingTime}s</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Analysis Details:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {model.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <h4 className="font-medium mb-2 text-green-700">Strengths:</h4>
                      <div className="flex flex-wrap gap-1">
                        {model.strengths.map((strength, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-green-50">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-orange-700">Limitations:</h4>
                      <div className="flex flex-wrap gap-1">
                        {model.weaknesses.map((weakness, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-orange-50">
                            {weakness}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Processing Speed Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {modelResults
                    .sort((a, b) => a.processingTime - b.processingTime)
                    .map((model, index) => (
                      <div key={model.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                            {index + 1}
                          </div>
                          <span className="font-medium">{model.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                              style={{ width: `${(model.processingTime / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{model.processingTime}s</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accuracy vs Speed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {modelResults.map((model) => (
                    <div key={model.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${getModelColor(model.modelType)}`} />
                        <span className="font-medium">{model.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{model.accuracy}% accuracy</p>
                        <p className="text-xs text-gray-600">{model.processingTime}s</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 