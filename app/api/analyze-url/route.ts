import { type NextRequest, NextResponse } from "next/server"

// Mock URL analysis service
async function analyzeMediaURL(url: string) {
  // Simulate URL validation and media extraction
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Mock different responses based on URL patterns
  const mockResponses = {
    youtube: {
      confidence: 92,
      isAIGenerated: true,
      modelResults: [
        {
          name: "Sensity AI",
          confidence: 94,
          details: "High probability of deepfake technology detected in facial movements",
        },
        {
          name: "Reality Defender",
          confidence: 89,
          details: "Synthetic media patterns identified in compression artifacts",
        },
        {
          name: "GenConViT",
          confidence: 93,
          details: "AI-generated content detected through texture analysis",
        },
      ],
      metadata: {
        fileSize: "15.3 MB",
        dimensions: "1280x720",
        duration: "2:15",
        format: "MP4",
        source: "YouTube",
      },
      analysis: {
        lipSync: 45,
        faceConsistency: 38,
        audioVisualSync: 52,
      },
    },
    twitter: {
      confidence: 25,
      isAIGenerated: false,
      modelResults: [
        {
          name: "Sensity AI",
          confidence: 28,
          details: "Natural facial expressions and consistent lighting detected",
        },
        {
          name: "Reality Defender",
          confidence: 22,
          details: "Compression patterns consistent with authentic media",
        },
      ],
      metadata: {
        fileSize: "8.7 MB",
        dimensions: "1080x1080",
        format: "MP4",
        source: "Twitter/X",
      },
      analysis: {
        faceConsistency: 89,
      },
    },
  }

  // Determine response based on URL
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return mockResponses.youtube
  } else if (url.includes("twitter.com") || url.includes("x.com")) {
    return mockResponses.twitter
  } else {
    // Default response for other platforms
    return {
      confidence: Math.floor(Math.random() * 80) + 20,
      isAIGenerated: Math.random() > 0.6,
      modelResults: [
        {
          name: "Sensity AI",
          confidence: Math.floor(Math.random() * 40) + 60,
          details: "Analysis completed for social media content",
        },
      ],
      metadata: {
        fileSize: "12.1 MB",
        dimensions: "1920x1080",
        format: "MP4",
        source: "Social Media",
      },
      analysis: {},
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 })
    }

    // Validate URL format
    try {
      new URL(url)
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
    }

    // Check if URL is from supported platforms
    const supportedPlatforms = ["youtube.com", "youtu.be", "twitter.com", "x.com", "tiktok.com", "instagram.com"]

    const isSupported = supportedPlatforms.some((platform) => url.includes(platform))

    if (!isSupported) {
      return NextResponse.json(
        { error: "Unsupported platform. Please use YouTube, Twitter/X, TikTok, or Instagram URLs." },
        { status: 400 },
      )
    }

    const result = await analyzeMediaURL(url)

    return NextResponse.json(result)
  } catch (error) {
    console.error("URL analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze URL" }, { status: 500 })
  }
}
