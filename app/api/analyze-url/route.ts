import { NextRequest, NextResponse } from 'next/server'
import { aiDetectionService } from '@/lib/ai-detection-apis'

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.AI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is not configured on the server.' },
        { status: 500 }
      )
    }

    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    // Validate URL format
    let parsedUrl: URL
    try {
      parsedUrl = new URL(url)
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      )
    }

    // Check if URL is from allowed domains (optional security measure)
    const allowedDomains = [
      'youtube.com', 'youtu.be', 'vimeo.com', 'dailymotion.com',
      'instagram.com', 'facebook.com', 'twitter.com', 'tiktok.com',
      'imgur.com', 'flickr.com', 'unsplash.com', 'pexels.com',
      'pixabay.com', 'shutterstock.com', 'gettyimages.com'
    ]

    const domain = parsedUrl.hostname.replace('www.', '')
    if (!allowedDomains.some(allowed => domain.includes(allowed))) {
      return NextResponse.json(
        { error: 'URL domain not supported for analysis' },
        { status: 400 }
      )
    }

    // Download the media file
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to download media from URL' },
        { status: 400 }
      )
    }

    // Get content type and size
    const contentType = response.headers.get('content-type')
    const contentLength = response.headers.get('content-length')
    const fileSize = contentLength ? parseInt(contentLength) : 0

    // Validate content type
    const allowedTypes = ['image/', 'video/', 'audio/']
    if (!contentType || !allowedTypes.some(type => contentType.startsWith(type))) {
      return NextResponse.json(
        { error: 'URL does not point to a supported media file' },
        { status: 400 }
      )
    }

    // Validate file size (50MB limit)
    const maxSize = 50 * 1024 * 1024
    if (fileSize > maxSize) {
      return NextResponse.json(
        { error: 'Media file size exceeds 50MB limit' },
        { status: 400 }
      )
    }

    // Convert response to File object
    const arrayBuffer = await response.arrayBuffer()
    const blob = new Blob([arrayBuffer], { type: contentType })
    const fileName = `url-media-${Date.now()}.${contentType.split('/')[1]}`
    const file = new File([blob], fileName, { type: contentType })

    // Perform AI detection
    const result = await aiDetectionService.detectAI(file)

    // Add URL metadata to result
    const enhancedResult = {
      ...result,
      sourceUrl: url,
      domain: domain,
      originalContentType: contentType,
      downloadSize: fileSize
    }

    return NextResponse.json({
      success: true,
      result: enhancedResult,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('URL analysis error:', error)
    return NextResponse.json(
      { 
        error: 'URL analysis failed. Please check the URL and try again.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Satya URL Analysis API',
    version: '1.0.0',
    endpoints: {
      POST: '/api/analyze-url - Analyze media from URL'
    },
    supportedDomains: [
      'YouTube', 'Vimeo', 'Instagram', 'Facebook', 'Twitter', 'TikTok',
      'Imgur', 'Flickr', 'Unsplash', 'Pexels', 'Pixabay', 'Shutterstock', 'Getty Images'
    ],
    supportedFormats: ['image/*', 'video/*', 'audio/*'],
    maxFileSize: '50MB'
  })
}
