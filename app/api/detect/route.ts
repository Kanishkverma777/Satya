import { NextRequest, NextResponse } from 'next/server'
import { aiDetectionService } from '@/lib/ai-detection-apis'

const apiKey = process.env.AI_API_KEY

console.log('API KEY:', process.env.AI_API_KEY);

export async function POST(request: NextRequest) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is not configured on the server.' },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/', 'video/', 'audio/']
    if (!allowedTypes.some(type => file.type.startsWith(type))) {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload images, videos, or audio files.' },
        { status: 400 }
      )
    }

    // Validate file size (50MB limit)
    const maxSize = 50 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 50MB limit' },
        { status: 400 }
      )
    }

    // Perform AI detection
    const result = await aiDetectionService.detectAI(file)

    // Return the detection result
    return NextResponse.json({
      success: true,
      result,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Detection API error:', error)
    return NextResponse.json(
      { 
        error: 'Detection failed. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Satya AI Detection API',
    version: '1.0.0',
    endpoints: {
      POST: '/api/detect - Upload file for AI detection analysis'
    },
    supportedFormats: ['image/*', 'video/*', 'audio/*'],
    maxFileSize: '50MB'
  })
}
