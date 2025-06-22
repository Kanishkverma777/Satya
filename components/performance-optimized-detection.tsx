"use client"

import { useState, useCallback, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Upload, Zap, Brain, Shield, CheckCircle, AlertTriangle, Copy, ExternalLink } from "lucide-react"
import { aiDetectionService, DetectionResult } from "@/lib/ai-detection-apis"

export function PerformanceOptimizedDetection() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  // File validation
  const validateFile = useCallback((file: File): string | null => {
    const maxSize = 50 * 1024 * 1024 // 50MB
    const allowedTypes = ["image/", "video/", "audio/"]

    if (file.size > maxSize) {
      return "File size exceeds 50MB limit"
    }

    if (!allowedTypes.some((type) => file.type.startsWith(type))) {
      return "Unsupported file type. Please upload images, videos, or audio files."
    }

    return null
  }, [])

  // Enhanced file analysis with real AI detection
  const analyzeFile = useCallback(
    async (file: File) => {
      const validationError = validateFile(file)
      if (validationError) {
        setError(validationError)
        return
      }

      setIsAnalyzing(true)
      setProgress(0)
      setError(null)

      try {
        // Simulate progressive analysis stages
        const stages = [
          { name: "Preprocessing", duration: 800, progress: 15 },
          { name: "AI Model Analysis", duration: 2000, progress: 45 },
          { name: "Ensemble Voting", duration: 1500, progress: 75 },
          { name: "Blockchain Verification", duration: 700, progress: 100 },
        ]

        for (const stage of stages) {
          setProgress(stage.progress)
          await new Promise((resolve) => setTimeout(resolve, stage.duration))
        }

        // Use real AI detection service
        const detectionResult = await aiDetectionService.detectAI(file)
        
        setResult(detectionResult)
        
        // Track analytics
        console.log('Detection completed:', detectionResult)
        
      } catch (error) {
        console.error("Detection failed:", error)
        setError("Detection failed. Please try again with a different file.")
      } finally {
        setIsAnalyzing(false)
      }
    },
    [validateFile],
  )

  // File upload handler
  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        setUploadedFile(file)
        analyzeFile(file)
      }
    },
    [analyzeFile],
  )

  // Drag and drop handler
  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()
      const file = event.dataTransfer.files[0]
      if (file) {
        setUploadedFile(file)
        analyzeFile(file)
      }
    },
    [analyzeFile],
  )

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
  }, [])

  // Confidence color calculation
  const confidenceColor = useMemo(() => {
    if (!result) return ""
    if (result.confidence >= 80) return "text-rose-600"
    if (result.confidence >= 60) return "text-amber-600"
    return "text-emerald-600"
  }, [result])

  // Copy blockchain hash
  const copyBlockchainHash = useCallback(() => {
    if (result?.blockchainHash) {
      navigator.clipboard.writeText(result.blockchainHash)
    }
  }, [result])

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 sm:px-0">
      {/* Enhanced Upload Interface */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-slate-900">
            <Brain className="h-5 w-5 text-slate-700" />
            Advanced AI Detection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-slate-400 transition-colors bg-slate-50/50"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              accept="image/*,video/*,audio/*"
              onChange={handleFileUpload}
              className="hidden"
              id="advanced-file-upload"
              disabled={isAnalyzing}
            />
            <label
              htmlFor="advanced-file-upload"
              className={`cursor-pointer block ${isAnalyzing ? "opacity-50" : ""}`}
            >
              <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-lg font-medium mb-2 text-slate-900">
                {isAnalyzing ? "Processing..." : "Upload Media for Analysis"}
              </p>
              <p className="text-sm text-slate-600 mb-4">
                Drag and drop or click to upload images, videos, or audio files
              </p>
              {uploadedFile && (
                <div className="text-sm text-slate-500">
                  Selected: {uploadedFile.name}
                </div>
              )}
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="border-rose-200 bg-rose-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-rose-700">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Progress Indicator */}
      {isAnalyzing && (
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2 text-slate-700">
                  <Zap className="h-4 w-4 animate-pulse text-slate-600" />
                  Analyzing with multiple AI models...
                </span>
                <span className="text-sm text-slate-600">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full h-2" />
              <div className="text-xs text-slate-500">
                Using ensemble of 6+ AI detection models for maximum accuracy
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Results Display */}
      {result && !isAnalyzing && (
        <div className="space-y-6">
          {/* Main Result Card */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Shield className="h-5 w-5 text-slate-700" />
                  Detection Results
                </CardTitle>
                <Badge 
                  variant={result.isAIGenerated ? "destructive" : "default"}
                  className={result.isAIGenerated ? "bg-rose-100 text-rose-800 border-rose-200" : "bg-emerald-100 text-emerald-800 border-emerald-200"}
                >
                  {result.isAIGenerated ? "AI Generated" : "Likely Authentic"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Confidence Score */}
              <div className="text-center space-y-4">
                <div className="text-5xl sm:text-7xl font-bold">
                  <span className={confidenceColor}>{result.confidence}%</span>
                </div>
                <p className="text-lg text-slate-600">Detection Confidence</p>
              </div>

              {/* File Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-lg font-semibold text-slate-900">File Size</div>
                  <div className="text-slate-600">{result.metadata.fileSize}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-lg font-semibold text-slate-900">Format</div>
                  <div className="text-slate-600">{result.metadata.format}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-lg font-semibold text-slate-900">Processing Time</div>
                  <div className="text-slate-600">{result.processingTime}ms</div>
                </div>
              </div>

              {/* Blockchain Verification */}
              {result.blockchainHash && (
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-1">Blockchain Verification</h4>
                      <p className="text-sm text-slate-600">Result verified on Polygon blockchain</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={copyBlockchainHash}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Hash
                    </Button>
                  </div>
                  <div className="mt-2 p-2 bg-white rounded border text-xs font-mono text-slate-600 break-all">
                    {result.blockchainHash}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900">Detailed Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.modelResults.map((model, index) => (
                  <div key={index} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">{model.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {model.modelType}
                        </Badge>
                      </div>
                      <span className={`font-bold ${confidenceColor}`}>{model.confidence}%</span>
                    </div>
                    <Progress value={model.confidence} className="h-2 mb-2" />
                    <p className="text-sm text-slate-600">{model.details}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Processing time: {model.processingTime}ms
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Analysis Breakdown */}
          {result.analysis && (
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-900">Analysis Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(result.analysis).map(([key, value]) => (
                    <div key={key} className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-sm font-medium text-slate-700 mb-1">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                      <div className="text-lg font-bold text-slate-900">{value}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => {
                setResult(null)
                setUploadedFile(null)
                setError(null)
              }}
            >
              Analyze Another File
            </Button>
            <Button 
              className="flex-1 bg-slate-900 hover:bg-slate-800"
              onClick={() => {
                // Share or export functionality
                console.log('Sharing result:', result)
              }}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Share Results
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
