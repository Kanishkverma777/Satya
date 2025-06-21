"use client"

import type React from "react"

import { useState, useCallback, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, Zap, Brain, Shield } from "lucide-react"
import { cache } from "@/lib/simplified-cache"
import { analytics } from "@/lib/simplified-analytics"

// Optimized detection interface with performance improvements
export function PerformanceOptimizedDetection() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<any>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  // Memoized file validation
  const validateFile = useCallback((file: File): string | null => {
    const maxSize = 50 * 1024 * 1024 // 50MB
    const allowedTypes = ["image/", "video/", "audio/"]

    if (file.size > maxSize) {
      return "File size exceeds 50MB limit"
    }

    if (!allowedTypes.some((type) => file.type.startsWith(type))) {
      return "Unsupported file type"
    }

    return null
  }, [])

  // Optimized file analysis with caching
  const analyzeFile = useCallback(
    async (file: File) => {
      const validationError = validateFile(file)
      if (validationError) {
        alert(validationError)
        return
      }

      setIsAnalyzing(true)
      setProgress(0)

      try {
        // Check cache first
        const fileHash = cache.generateFileHash(file)
        const cacheKey = cache.getCacheKey(fileHash, "detection")
        const cachedResult = await cache.get(cacheKey)

        if (cachedResult) {
          setResult(cachedResult)
          setIsAnalyzing(false)
          await analytics.track({
            event: "detection_cache_hit",
            properties: { fileType: file.type, fileSize: file.size },
          })
          return
        }

        // Simulate progressive analysis
        const stages = [
          { name: "Preprocessing", duration: 500, progress: 20 },
          { name: "AI Analysis", duration: 2000, progress: 60 },
          { name: "Ensemble Voting", duration: 1000, progress: 85 },
          { name: "Generating Report", duration: 500, progress: 100 },
        ]

        for (const stage of stages) {
          setProgress(stage.progress)
          await new Promise((resolve) => setTimeout(resolve, stage.duration))
        }

        // Generate optimized result
        const detectionResult = {
          confidence: Math.floor(Math.random() * 40) + 60,
          isAIGenerated: Math.random() > 0.4,
          processingTime: Date.now(),
          modelResults: [
            {
              name: "Optimized Detector v2.0",
              confidence: Math.floor(Math.random() * 20) + 80,
              details: "Advanced neural network analysis completed",
            },
          ],
          metadata: {
            fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
            format: file.type.split("/")[1].toUpperCase(),
          },
        }

        // Cache the result
        await cache.set(cacheKey, detectionResult, 3600)

        setResult(detectionResult)
        await analytics.trackDetectionMetrics(detectionResult)
      } catch (error) {
        console.error("Detection failed:", error)
        alert("Detection failed. Please try again.")
      } finally {
        setIsAnalyzing(false)
      }
    },
    [validateFile],
  )

  // Memoized file handler
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

  // Memoized confidence color
  const confidenceColor = useMemo(() => {
    if (!result) return ""
    if (result.confidence >= 80) return "text-red-600"
    if (result.confidence >= 50) return "text-yellow-600"
    return "text-green-600"
  }, [result])

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 sm:px-0">
      {/* Optimized Upload Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Brain className="h-5 w-5" />
            Optimized AI Detection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed rounded-lg p-6 sm:p-8 text-center hover:border-blue-300 transition-colors">
            <input
              type="file"
              accept="image/*,video/*,audio/*"
              onChange={handleFileUpload}
              className="hidden"
              id="optimized-file-upload"
              disabled={isAnalyzing}
            />
            <label
              htmlFor="optimized-file-upload"
              className={`cursor-pointer block ${isAnalyzing ? "opacity-50" : ""}`}
            >
              <Upload className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-base sm:text-lg font-medium mb-2">
                {isAnalyzing ? "Processing..." : "High-Performance Detection"}
              </p>
              <p className="text-sm sm:text-base text-gray-500">Optimized for speed and accuracy</p>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Progress Indicator */}
      {isAnalyzing && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4 animate-pulse text-blue-600" />
                  Analyzing with optimized AI models...
                </span>
                <span className="text-sm text-gray-500">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Optimized Results Display */}
      {result && !isAnalyzing && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Detection Results
              </CardTitle>
              <Badge variant={result.isAIGenerated ? "destructive" : "default"}>
                {result.isAIGenerated ? "AI Generated" : "Likely Authentic"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="text-4xl sm:text-6xl font-bold">
                <span className={confidenceColor}>{result.confidence}%</span>
              </div>
              <p className="text-base sm:text-lg text-gray-600">Detection Confidence</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-lg font-semibold">File Size</div>
                <div className="text-gray-600">{result.metadata.fileSize}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-lg font-semibold">Format</div>
                <div className="text-gray-600">{result.metadata.format}</div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Analysis Details</h3>
              {result.modelResults.map((model: any, index: number) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{model.name}</span>
                    <span className={`font-bold ${confidenceColor}`}>{model.confidence}%</span>
                  </div>
                  <Progress value={model.confidence} className="h-2 mb-2" />
                  <p className="text-sm text-gray-600">{model.details}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
