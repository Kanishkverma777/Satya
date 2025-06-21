"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, CheckCircle, XCircle, Share2, Download, Eye, Volume2, Zap, BarChart3 } from "lucide-react"

interface DetectionResult {
  confidence: number
  isAIGenerated: boolean
  modelResults: {
    name: string
    confidence: number
    details: string
  }[]
  metadata: {
    fileSize: string
    dimensions?: string
    duration?: string
    format: string
  }
  analysis: {
    lipSync?: number
    faceConsistency?: number
    audioVisualSync?: number
    spectralAnalysis?: number
  }
}

interface DetectionResultsProps {
  result: DetectionResult
}

export function DetectionResults({ result }: DetectionResultsProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-red-600"
    if (confidence >= 50) return "text-yellow-600"
    return "text-green-600"
  }

  const getConfidenceBadge = (confidence: number, isAI: boolean) => {
    if (isAI && confidence >= 80) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Likely AI-Generated
        </Badge>
      )
    } else if (isAI && confidence >= 50) {
      return (
        <Badge variant="secondary" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          Possibly AI-Generated
        </Badge>
      )
    } else {
      return (
        <Badge variant="default" className="flex items-center gap-1 bg-green-600">
          <CheckCircle className="h-3 w-3" />
          Likely Authentic
        </Badge>
      )
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Result */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Detection Results
              {getConfidenceBadge(result.confidence, result.isAIGenerated)}
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Report
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold">
              <span className={getConfidenceColor(result.confidence)}>{result.confidence}%</span>
            </div>
            <p className="text-lg text-gray-600">
              {result.isAIGenerated ? "Confidence this media is AI-generated" : "Confidence this media is authentic"}
            </p>
          </div>

          <Separator />

          {/* File Metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-500">File Size</div>
              <div className="font-medium">{result.metadata.fileSize}</div>
            </div>
            {result.metadata.dimensions && (
              <div className="text-center">
                <div className="text-sm text-gray-500">Dimensions</div>
                <div className="font-medium">{result.metadata.dimensions}</div>
              </div>
            )}
            {result.metadata.duration && (
              <div className="text-center">
                <div className="text-sm text-gray-500">Duration</div>
                <div className="font-medium">{result.metadata.duration}</div>
              </div>
            )}
            <div className="text-center">
              <div className="text-sm text-gray-500">Format</div>
              <div className="font-medium">{result.metadata.format}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            AI Model Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {result.modelResults.map((model, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{model.name}</span>
                <span className={`font-bold ${getConfidenceColor(model.confidence)}`}>{model.confidence}%</span>
              </div>
              <Progress value={model.confidence} className="h-2" />
              <p className="text-sm text-gray-600">{model.details}</p>
              {index < result.modelResults.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      {Object.keys(result.analysis).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Detailed Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.analysis.faceConsistency && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Face Consistency
                  </span>
                  <span className={`font-bold ${getConfidenceColor(100 - result.analysis.faceConsistency)}`}>
                    {result.analysis.faceConsistency}%
                  </span>
                </div>
                <Progress value={result.analysis.faceConsistency} className="h-2" />
              </div>
            )}

            {result.analysis.lipSync && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    Lip Sync Quality
                  </span>
                  <span className={`font-bold ${getConfidenceColor(100 - result.analysis.lipSync)}`}>
                    {result.analysis.lipSync}%
                  </span>
                </div>
                <Progress value={result.analysis.lipSync} className="h-2" />
              </div>
            )}

            {result.analysis.audioVisualSync && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    Audio-Visual Sync
                  </span>
                  <span className={`font-bold ${getConfidenceColor(100 - result.analysis.audioVisualSync)}`}>
                    {result.analysis.audioVisualSync}%
                  </span>
                </div>
                <Progress value={result.analysis.audioVisualSync} className="h-2" />
              </div>
            )}

            {result.analysis.spectralAnalysis && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Spectral Analysis
                  </span>
                  <span className={`font-bold ${getConfidenceColor(100 - result.analysis.spectralAnalysis)}`}>
                    {result.analysis.spectralAnalysis}%
                  </span>
                </div>
                <Progress value={result.analysis.spectralAnalysis} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.isAIGenerated ? (
              <>
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-900">High AI Detection Confidence</p>
                    <p className="text-sm text-red-700">
                      This media shows strong indicators of AI generation. Exercise caution when sharing.
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>• Verify the source and context before sharing</p>
                  <p>• Look for additional verification from trusted sources</p>
                  <p>• Report if this content is being used maliciously</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900">Low AI Detection Confidence</p>
                    <p className="text-sm text-green-700">This media appears to be authentic based on our analysis.</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>• Continue to verify sources when possible</p>
                  <p>• Stay informed about evolving AI detection techniques</p>
                  <p>• Share responsibly with proper attribution</p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
