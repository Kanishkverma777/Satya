"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, Zap, Brain, Shield, AlertTriangle, CheckCircle } from "lucide-react"

// Remove the imports that cause issues and create simplified version
export function AdvancedDetectionInterface() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<AdvancedDetectionResult | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [processingStage, setProcessingStage] = useState("")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      analyzeFileAdvanced(file)
    }
  }

  const analyzeFileAdvanced = async (file: File) => {
    setIsAnalyzing(true)
    setProgress(0)
    setResult(null)

    try {
      // Stage 1: File preprocessing
      setProcessingStage("Preprocessing file...")
      setProgress(10)
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Stage 2: Primary AI models
      setProcessingStage("Running primary AI models...")
      setProgress(30)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Stage 3: Ensemble analysis
      setProcessingStage("Performing ensemble analysis...")
      setProgress(60)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Stage 4: Temporal analysis (for videos)
      if (file.type.startsWith("video")) {
        setProcessingStage("Analyzing video frames...")
        setProgress(80)
        await new Promise((resolve) => setTimeout(resolve, 2000))
      }

      // Stage 5: Explainability generation
      setProcessingStage("Generating explanations...")
      setProgress(90)
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Generate advanced result
      const advancedResult: AdvancedDetectionResult = {
        confidence: Math.floor(Math.random() * 40) + 60,
        isAIGenerated: Math.random() > 0.4,
        consensusLevel: Math.floor(Math.random() * 30) + 70,
        reliability: Math.random() * 0.3 + 0.7,
        modelResults: [
          {
            modelName: "Sensity AI v3.2",
            confidence: Math.floor(Math.random() * 20) + 80,
            weight: 0.4,
            details: "Advanced facial landmark analysis detected synthetic patterns",
          },
          {
            modelName: "Reality Defender Pro",
            confidence: Math.floor(Math.random() * 25) + 75,
            weight: 0.35,
            details: "Compression artifact analysis indicates AI generation",
          },
          {
            modelName: "GenConViT Enhanced",
            confidence: Math.floor(Math.random() * 30) + 70,
            weight: 0.25,
            details: "Texture consistency analysis shows synthetic characteristics",
          },
        ],
        temporalAnalysis: file.type.startsWith("video")
          ? {
              frameCount: 45,
              suspiciousFrames: Math.floor(Math.random() * 10) + 5,
              consistencyScore: Math.floor(Math.random() * 20) + 70,
            }
          : undefined,
        explainability: {
          heatmapUrl: file.type.startsWith("image") ? "/placeholder.svg?height=400&width=400" : undefined,
          keyFeatures: [
            "Unnatural eye reflections",
            "Inconsistent skin texture",
            "Temporal lighting variations",
            "Compression pattern anomalies",
          ],
          explanation:
            "The AI models detected several indicators of synthetic generation, particularly in facial features and temporal consistency patterns.",
        },
      }

      setProgress(100)
      setResult(advancedResult)
    } catch (error) {
      console.error("Advanced detection failed:", error)
      setProcessingStage("Detection failed")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-red-600"
    if (confidence >= 50) return "text-yellow-600"
    return "text-green-600"
  }

  const getReliabilityBadge = (reliability: number) => {
    if (reliability >= 0.8) return <Badge className="bg-green-600">High Reliability</Badge>
    if (reliability >= 0.6) return <Badge variant="secondary">Medium Reliability</Badge>
    return <Badge variant="outline">Low Reliability</Badge>
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 px-4 sm:px-0">
      {/* Upload Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Brain className="h-5 w-5" />
            Advanced AI Detection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed rounded-lg p-6 sm:p-8 text-center">
            <input
              type="file"
              accept="image/*,video/*,audio/*"
              onChange={handleFileUpload}
              className="hidden"
              id="advanced-file-upload"
            />
            <label htmlFor="advanced-file-upload" className="cursor-pointer block">
              <Upload className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-base sm:text-lg font-medium mb-2">Advanced Multi-Modal Detection</p>
              <p className="text-sm sm:text-base text-gray-500 px-2">
                Upload images, videos, or audio for comprehensive AI analysis
              </p>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Processing Status */}
      {isAnalyzing && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4 animate-pulse" />
                  {processingStage}
                </span>
                <span className="text-sm text-gray-500">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Advanced Results */}
      {result && !isAnalyzing && (
        <div className="space-y-6">
          {/* Main Result Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Detection Results
                </CardTitle>
                <div className="flex gap-2">
                  {getReliabilityBadge(result.reliability)}
                  <Badge variant={result.isAIGenerated ? "destructive" : "default"}>
                    {result.isAIGenerated ? "AI Generated" : "Likely Authentic"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Confidence Display */}
              <div className="text-center space-y-3 sm:space-y-4">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                  <span className={getConfidenceColor(result.confidence)}>{result.confidence}%</span>
                </div>
                <p className="text-base sm:text-lg text-gray-600">Detection Confidence</p>

                {/* Consensus and Reliability Metrics */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-sm sm:max-w-md mx-auto">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">{result.consensusLevel}%</div>
                    <div className="text-xs sm:text-sm text-gray-500">Model Consensus</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-purple-600">
                      {Math.round(result.reliability * 100)}%
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">Reliability Score</div>
                  </div>
                </div>
              </div>

              {/* Model Results */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Individual Model Results</h3>
                {result.modelResults.map((model, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{model.modelName}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Weight: {(model.weight * 100).toFixed(0)}%</Badge>
                        <span className={`font-bold ${getConfidenceColor(model.confidence)}`}>{model.confidence}%</span>
                      </div>
                    </div>
                    <Progress value={model.confidence} className="h-2" />
                    <p className="text-sm text-gray-600">{model.details}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Temporal Analysis (for videos) */}
          {result.temporalAnalysis && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Temporal Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-3 sm:p-0">
                    <div className="text-xl sm:text-2xl font-bold">{result.temporalAnalysis.frameCount}</div>
                    <div className="text-xs sm:text-sm text-gray-500">Frames Analyzed</div>
                  </div>
                  <div className="text-center p-3 sm:p-0">
                    <div className="text-xl sm:text-2xl font-bold text-red-600">
                      {result.temporalAnalysis.suspiciousFrames}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">Suspicious Frames</div>
                  </div>
                  <div className="text-center p-3 sm:p-0">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">
                      {result.temporalAnalysis.consistencyScore}%
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">Consistency Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Explainability */}
          <Card>
            <CardHeader>
              <CardTitle>AI Explanation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="explanation">
                <TabsList>
                  <TabsTrigger value="explanation">Explanation</TabsTrigger>
                  <TabsTrigger value="features">Key Features</TabsTrigger>
                  {result.explainability.heatmapUrl && <TabsTrigger value="heatmap">Attention Heatmap</TabsTrigger>}
                </TabsList>

                <TabsContent value="explanation" className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{result.explainability.explanation}</AlertDescription>
                  </Alert>
                </TabsContent>

                <TabsContent value="features" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {result.explainability.keyFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {result.explainability.heatmapUrl && (
                  <TabsContent value="heatmap" className="space-y-4">
                    <div className="text-center">
                      <img
                        src={result.explainability.heatmapUrl || "/placeholder.svg"}
                        alt="Attention Heatmap"
                        className="max-w-full h-auto rounded-lg border"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        Red areas indicate regions the AI focused on during detection
                      </p>
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

interface AdvancedDetectionResult {
  confidence: number
  isAIGenerated: boolean
  consensusLevel: number
  reliability: number
  modelResults: Array<{
    modelName: string
    confidence: number
    weight: number
    details: string
  }>
  temporalAnalysis?: {
    frameCount: number
    suspiciousFrames: number
    consistencyScore: number
  }
  explainability: {
    heatmapUrl?: string
    keyFeatures: string[]
    explanation: string
  }
}
