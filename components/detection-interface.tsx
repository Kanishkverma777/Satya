"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, Link, Brain, Shield, AlertTriangle, CheckCircle } from "lucide-react"
import { DetectionResult } from "@/lib/ai-detection-apis"

export function DetectionInterface() {
  const [activeTab, setActiveTab] = useState("upload")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [url, setUrl] = useState("")

  // File upload handler
  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsAnalyzing(true)
    setProgress(0)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/detect', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Detection failed')
      }

      const data = await response.json()
      setResult(data.result)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Detection failed')
    } finally {
      setIsAnalyzing(false)
    }
  }, [])

  // URL analysis handler
  const handleUrlAnalysis = useCallback(async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL')
      return
    }

    setIsAnalyzing(true)
    setProgress(0)
    setError(null)

    try {
      const response = await fetch('/api/analyze-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url.trim() })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'URL analysis failed')
      }

      const data = await response.json()
      setResult(data.result)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'URL analysis failed')
    } finally {
      setIsAnalyzing(false)
    }
  }, [url])

  // Confidence color calculation
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-rose-600"
    if (confidence >= 60) return "text-amber-600"
    return "text-emerald-600"
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 sm:px-0">
      {/* Main Detection Interface */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <Brain className="h-5 w-5 text-slate-700" />
            AI Media Detection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload File
              </TabsTrigger>
              <TabsTrigger value="url" className="flex items-center gap-2">
                <Link className="h-4 w-4" />
                Analyze URL
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-slate-400 transition-colors bg-slate-50/50">
                <input
                  type="file"
                  accept="image/*,video/*,audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  disabled={isAnalyzing}
                />
                <label
                  htmlFor="file-upload"
                  className={`cursor-pointer block ${isAnalyzing ? "opacity-50" : ""}`}
                >
                  <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2 text-slate-900">
                    {isAnalyzing ? "Processing..." : "Upload Media File"}
                  </p>
                  <p className="text-sm text-slate-600">
                    Drag and drop or click to upload images, videos, or audio files
                  </p>
                </label>
              </div>
            </TabsContent>

            <TabsContent value="url" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="url-input" className="block text-sm font-medium text-slate-700 mb-2">
                    Media URL
                  </label>
                  <Input
                    id="url-input"
                    type="url"
                    placeholder="https://example.com/media-file.jpg"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={isAnalyzing}
                    className="w-full"
                  />
                </div>
                <Button 
                  onClick={handleUrlAnalysis}
                  disabled={isAnalyzing || !url.trim()}
                  className="w-full bg-slate-900 hover:bg-slate-800"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze URL"}
                </Button>
                <p className="text-xs text-slate-500">
                  Supported platforms: YouTube, Instagram, Twitter, TikTok, and more
                </p>
              </div>
            </TabsContent>
          </Tabs>
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

      {/* Progress Indicator */}
      {isAnalyzing && (
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2 text-slate-700">
                  <Brain className="h-4 w-4 animate-pulse text-slate-600" />
                  Analyzing with AI models...
                </span>
                <span className="text-sm text-slate-600">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full h-2" />
              <div className="text-xs text-slate-500">
                Using ensemble of multiple AI detection models
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Display */}
      {result && !isAnalyzing && (
        <div className="space-y-6">
          {/* Main Result */}
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
                  <span className={getConfidenceColor(result.confidence)}>
                    {result.confidence}%
                  </span>
                </div>
                <p className="text-lg text-slate-600">Detection Confidence</p>
              </div>

              {/* File/URL Information */}
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

              {/* URL Source Info */}
              {(result as any).sourceUrl && (
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-1">Source URL</h4>
                      <p className="text-sm text-slate-600">{(result as any).domain}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={(result as any).sourceUrl} target="_blank" rel="noopener noreferrer">
                        View Source
                      </a>
                    </Button>
                  </div>
                  <div className="mt-2 p-2 bg-white rounded border text-xs font-mono text-slate-600 break-all">
                    {(result as any).sourceUrl}
                  </div>
                </div>
              )}

              {/* Blockchain Verification */}
              {result.blockchainHash && (
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-1">Blockchain Verification</h4>
                      <p className="text-sm text-slate-600">Result verified on Polygon blockchain</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => navigator.clipboard.writeText(result.blockchainHash!)}
                    >
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

          {/* Model Results */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900">Model Analysis</CardTitle>
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
                      <span className={`font-bold ${getConfidenceColor(model.confidence)}`}>
                        {model.confidence}%
                      </span>
                    </div>
                    <Progress value={model.confidence} className="h-2 mb-2" />
                    <p className="text-sm text-slate-600">{model.details}</p>
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
                setError(null)
                setUrl("")
              }}
            >
              Analyze Another
            </Button>
            <Button 
              className="flex-1 bg-slate-900 hover:bg-slate-800"
              onClick={() => {
                // Share functionality
                const shareData = {
                  title: 'Satya AI Detection Result',
                  text: `AI Detection Result: ${result.confidence}% confidence - ${result.isAIGenerated ? 'AI Generated' : 'Likely Authentic'}`,
                  url: window.location.href
                }
                if (navigator.share) {
                  navigator.share(shareData)
                } else {
                  navigator.clipboard.writeText(shareData.text)
                }
              }}
            >
              Share Results
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
