// Advanced video analysis with frame extraction
export class VideoAnalyzer {
  async analyzeVideoFrames(videoFile: File): Promise<VideoAnalysisResult> {
    const frames = await this.extractFrames(videoFile, { fps: 1 })
    const frameResults = await Promise.all(frames.map((frame, index) => this.analyzeFrame(frame, index)))

    const temporalConsistency = this.calculateTemporalConsistency(frameResults)
    const suspiciousFrames = frameResults.filter((r) => r.confidence > 80)
    const temporalAnomalies = this.detectTemporalInconsistencies(frameResults)

    return {
      overallConfidence: temporalConsistency.confidence,
      frameCount: frames.length,
      suspiciousFrames,
      temporalAnomalies,
      consistencyScore: temporalConsistency.score,
      analysis: {
        lipSyncQuality: this.analyzeLipSync(frameResults),
        faceConsistency: this.analyzeFaceConsistency(frameResults),
        lightingConsistency: this.analyzeLightingConsistency(frameResults),
        motionBlurAnalysis: this.analyzeMotionBlur(frameResults),
      },
    }
  }

  private async extractFrames(videoFile: File, options: { fps: number }): Promise<ImageData[]> {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video")
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")!
      const frames: ImageData[] = []

      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        const duration = video.duration
        const frameInterval = 1 / options.fps
        let currentTime = 0

        const extractFrame = () => {
          if (currentTime >= duration) {
            resolve(frames)
            return
          }

          video.currentTime = currentTime
          video.onseeked = () => {
            ctx.drawImage(video, 0, 0)
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            frames.push(imageData)
            currentTime += frameInterval
            extractFrame()
          }
        }

        extractFrame()
      }

      video.onerror = reject
      video.src = URL.createObjectURL(videoFile)
    })
  }

  private async analyzeFrame(frame: ImageData, frameIndex: number): Promise<FrameAnalysis> {
    // Mock frame analysis - in production, this would use actual AI models
    const confidence = Math.random() * 100

    return {
      frameIndex,
      confidence,
      features: {
        faceDetected: Math.random() > 0.3,
        eyeMovement: Math.random() * 100,
        lipMovement: Math.random() * 100,
        skinTexture: Math.random() * 100,
        lightingAngle: Math.random() * 360,
        compressionArtifacts: Math.random() * 100,
      },
      anomalies: confidence > 80 ? ["unnatural_eye_movement", "inconsistent_lighting"] : [],
    }
  }

  private calculateTemporalConsistency(frameResults: FrameAnalysis[]): { confidence: number; score: number } {
    if (frameResults.length < 2) return { confidence: 0, score: 0 }

    let consistencySum = 0
    for (let i = 1; i < frameResults.length; i++) {
      const prev = frameResults[i - 1]
      const curr = frameResults[i]

      const confidenceDiff = Math.abs(prev.confidence - curr.confidence)
      const consistency = Math.max(0, 100 - confidenceDiff)
      consistencySum += consistency
    }

    const avgConsistency = consistencySum / (frameResults.length - 1)
    const overallConfidence = frameResults.reduce((sum, frame) => sum + frame.confidence, 0) / frameResults.length

    return {
      confidence: Math.round(overallConfidence),
      score: Math.round(avgConsistency),
    }
  }

  private detectTemporalInconsistencies(frameResults: FrameAnalysis[]): TemporalAnomaly[] {
    const anomalies: TemporalAnomaly[] = []

    for (let i = 1; i < frameResults.length; i++) {
      const prev = frameResults[i - 1]
      const curr = frameResults[i]

      // Check for sudden confidence spikes
      if (Math.abs(curr.confidence - prev.confidence) > 30) {
        anomalies.push({
          type: "confidence_spike",
          frameRange: [i - 1, i],
          severity: Math.abs(curr.confidence - prev.confidence),
          description: "Sudden change in AI detection confidence between frames",
        })
      }

      // Check for lighting inconsistencies
      if (Math.abs(curr.features.lightingAngle - prev.features.lightingAngle) > 45) {
        anomalies.push({
          type: "lighting_inconsistency",
          frameRange: [i - 1, i],
          severity: Math.abs(curr.features.lightingAngle - prev.features.lightingAngle),
          description: "Inconsistent lighting direction between frames",
        })
      }
    }

    return anomalies
  }

  private analyzeLipSync(frameResults: FrameAnalysis[]): number {
    const lipMovements = frameResults.map((f) => f.features.lipMovement)
    const variance = this.calculateVariance(lipMovements)
    return Math.max(0, 100 - variance)
  }

  private analyzeFaceConsistency(frameResults: FrameAnalysis[]): number {
    const skinTextures = frameResults.map((f) => f.features.skinTexture)
    const variance = this.calculateVariance(skinTextures)
    return Math.max(0, 100 - variance)
  }

  private analyzeLightingConsistency(frameResults: FrameAnalysis[]): number {
    const lightingAngles = frameResults.map((f) => f.features.lightingAngle)
    const variance = this.calculateVariance(lightingAngles)
    return Math.max(0, 100 - variance / 3.6) // Normalize for angle variance
  }

  private analyzeMotionBlur(frameResults: FrameAnalysis[]): number {
    // Analyze motion blur patterns for authenticity
    return Math.random() * 100 // Mock implementation
  }

  private calculateVariance(values: number[]): number {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length
    return Math.sqrt(variance)
  }
}

interface VideoAnalysisResult {
  overallConfidence: number
  frameCount: number
  suspiciousFrames: FrameAnalysis[]
  temporalAnomalies: TemporalAnomaly[]
  consistencyScore: number
  analysis: {
    lipSyncQuality: number
    faceConsistency: number
    lightingConsistency: number
    motionBlurAnalysis: number
  }
}

interface FrameAnalysis {
  frameIndex: number
  confidence: number
  features: {
    faceDetected: boolean
    eyeMovement: number
    lipMovement: number
    skinTexture: number
    lightingAngle: number
    compressionArtifacts: number
  }
  anomalies: string[]
}

interface TemporalAnomaly {
  type: string
  frameRange: [number, number]
  severity: number
  description: string
}
