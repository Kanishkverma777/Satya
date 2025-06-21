"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Upload, LinkIcon, FileImage, FileVideo, FileAudio } from "lucide-react"
import { DetectionResults } from "@/components/detection-results"
import { useToast } from "@/hooks/use-toast"

export function DetectionInterface() {
  const [activeTab, setActiveTab] = useState("upload")
  const [url, setUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const { toast } = useToast()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 50MB",
          variant: "destructive",
        })
        return
      }
      setUploadedFile(file)
      analyzeFile(file)
    }
  }

  const analyzeFile = async (file: File) => {
    setIsAnalyzing(true)
    setProgress(0)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 500)

    await new Promise((resolve) => setTimeout(resolve, 5000))

    clearInterval(progressInterval)
    setProgress(100)

    const mockResult: DetectionResult = {
      confidence: Math.random() > 0.5 ? 85 : 25,
      isAIGenerated: Math.random() > 0.5,
      modelResults: [
        {
          name: "Sensity AI",
          confidence: 87,
          details: "Detected inconsistent facial features and unnatural eye movements",
        },
        {
          name: "Reality Defender",
          confidence: 82,
          details: "Found artifacts in compression patterns typical of AI generation",
        },
        {
          name: "GenConViT",
          confidence: 89,
          details: "Identified synthetic patterns in texture analysis",
        },
      ],
      metadata: {
        fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        dimensions: file.type.startsWith("image") ? "1920x1080" : undefined,
        duration: file.type.startsWith("video") ? "0:45" : file.type.startsWith("audio") ? "1:23" : undefined,
        format: file.type.split("/")[1].toUpperCase(),
      },
      analysis: {
        lipSync: file.type.startsWith("video") ? 78 : undefined,
        faceConsistency: file.type.startsWith("video") || file.type.startsWith("image") ? 85 : undefined,
        audioVisualSync: file.type.startsWith("video") ? 92 : undefined,
        spectralAnalysis: file.type.startsWith("audio") ? 76 : undefined,
      },
    }

    setResult(mockResult)
    setIsAnalyzing(false)
  }

  const analyzeURL = async () => {
    if (!url) return

    setIsAnalyzing(true)
    setProgress(0)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 15
      })
    }, 400)

    await new Promise((resolve) => setTimeout(resolve, 4000))

    clearInterval(progressInterval)
    setProgress(100)

    const mockResult: DetectionResult = {
      confidence: 92,
      isAIGenerated: true,
      modelResults: [
        {
          name: "Sensity AI",
          confidence: 94,
          details: "High probability of deepfake technology detected",
        },
        {
          name: "Reality Defender",
          confidence: 89,
          details: "Synthetic media patterns identified",
        },
      ],
      metadata: {
        fileSize: "15.3 MB",
        dimensions: "1280x720",
        duration: "2:15",
        format: "MP4",
      },
      analysis: {
        lipSync: 45,
        faceConsistency: 38,
        audioVisualSync: 52,
      },
    }

    setResult(mockResult)
    setIsAnalyzing(false)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image")) return <FileImage className="h-8 w-8" />
    if (file.type.startsWith("video")) return <FileVideo className="h-8 w-8" />
    if (file.type.startsWith("audio")) return <FileAudio className="h-8 w-8" />
    return <Upload className="h-8 w-8" />
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload File
          </TabsTrigger>
          <TabsTrigger value="url" className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4" />
            Analyze URL
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Media File</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*,video/*,audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  {uploadedFile ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center text-blue-600">{getFileIcon(uploadedFile)}</div>
                      <div>
                        <p className="font-medium">{uploadedFile.name}</p>
                        <p className="text-sm text-gray-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-lg font-medium">Click to upload your media file</p>
                        <p className="text-gray-500">Images, Videos, Audio - Max 50MB</p>
                      </div>
                    </div>
                  )}
                </label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="url" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analyze Media URL</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Paste YouTube, Twitter, TikTok, or Instagram URL..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={analyzeURL} disabled={!url || isAnalyzing}>
                  Analyze
                </Button>
              </div>
              <p className="text-sm text-gray-500">Supported platforms: YouTube, Twitter/X, TikTok, Instagram</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isAnalyzing && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Analyzing media...</span>
                <span className="text-sm text-gray-500">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-gray-500">Running ensemble AI detection models...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {result && !isAnalyzing && <DetectionResults result={result} />}
    </div>
  )
}

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
