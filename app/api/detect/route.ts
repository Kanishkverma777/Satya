import { type NextRequest, NextResponse } from "next/server"

// Mock AI detection service integrations
const mockDetectionServices = {
  sensityAI: async (fileBuffer: Buffer, fileType: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      confidence: Math.floor(Math.random() * 40) + 60, // 60-100%
      details: "Detected inconsistent facial features and unnatural eye movements",
      processingTime: 850,
    }
  },

  realityDefender: async (fileBuffer: Buffer, fileType: string) => {
    await new Promise((resolve) => setTimeout(resolve, 800))

    return {
      confidence: Math.floor(Math.random() * 35) + 65, // 65-100%
      details: "Found artifacts in compression patterns typical of AI generation",
      processingTime: 720,
    }
  },

  resembleAI: async (fileBuffer: Buffer, fileType: string) => {
    if (!fileType.startsWith("audio")) {
      return null // Only for audio files
    }

    await new Promise((resolve) => setTimeout(resolve, 1200))

    return {
      confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
      details: "Spectral analysis indicates synthetic voice generation",
      processingTime: 1100,
    }
  },

  genConViT: async (fileBuffer: Buffer, fileType: string) => {
    await new Promise((resolve) => setTimeout(resolve, 900))

    return {
      confidence: Math.floor(Math.random() * 25) + 75, // 75-100%
      details: "Identified synthetic patterns in texture analysis",
      processingTime: 820,
    }
  },
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file size (50MB limit)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: "File size exceeds 50MB limit" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "video/mp4",
      "video/avi",
      "video/mov",
      "audio/wav",
      "audio/mp3",
      "audio/m4a",
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 })
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer())

    // Run ensemble detection
    const detectionPromises = [
      mockDetectionServices.sensityAI(fileBuffer, file.type),
      mockDetectionServices.realityDefender(fileBuffer, file.type),
      mockDetectionServices.genConViT(fileBuffer, file.type),
    ]

    // Add audio-specific detection for audio files
    if (file.type.startsWith("audio")) {
      detectionPromises.push(mockDetectionServices.resembleAI(fileBuffer, file.type))
    }

    const results = await Promise.all(detectionPromises)
    const validResults = results.filter((result) => result !== null)

    // Calculate ensemble confidence
    const avgConfidence = validResults.reduce((sum, result) => sum + result.confidence, 0) / validResults.length
    const isAIGenerated = avgConfidence > 50

    // Generate detailed analysis based on file type
    const analysis: any = {}

    if (file.type.startsWith("video")) {
      analysis.lipSync = Math.floor(Math.random() * 60) + 20 // 20-80%
      analysis.faceConsistency = Math.floor(Math.random() * 50) + 30 // 30-80%
      analysis.audioVisualSync = Math.floor(Math.random() * 40) + 50 // 50-90%
    } else if (file.type.startsWith("image")) {
      analysis.faceConsistency = Math.floor(Math.random() * 50) + 40 // 40-90%
    } else if (file.type.startsWith("audio")) {
      analysis.spectralAnalysis = Math.floor(Math.random() * 40) + 40 // 40-80%
    }

    const response = {
      confidence: Math.round(avgConfidence),
      isAIGenerated,
      modelResults: [
        {
          name: "Sensity AI",
          confidence: validResults[0]?.confidence || 0,
          details: validResults[0]?.details || "Analysis completed",
        },
        {
          name: "Reality Defender",
          confidence: validResults[1]?.confidence || 0,
          details: validResults[1]?.details || "Analysis completed",
        },
        {
          name: "GenConViT",
          confidence: validResults[2]?.confidence || 0,
          details: validResults[2]?.details || "Analysis completed",
        },
      ].filter((result) => result.confidence > 0),
      metadata: {
        fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        dimensions: file.type.startsWith("image")
          ? "1920x1080"
          : file.type.startsWith("video")
            ? "1280x720"
            : undefined,
        duration: file.type.startsWith("video") ? "0:45" : file.type.startsWith("audio") ? "1:23" : undefined,
        format: file.type.split("/")[1].toUpperCase(),
      },
      analysis,
      processingTime: Math.max(...validResults.map((r) => r.processingTime)),
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Detection API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
