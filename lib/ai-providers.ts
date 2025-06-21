// Real AI Integration with fallback system
interface AIProvider {
  name: string
  detect: (file: File) => Promise<DetectionResult>
  isAvailable: () => Promise<boolean>
}

class SensityAI implements AIProvider {
  name = "Sensity AI"
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async detect(file: File): Promise<DetectionResult> {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("https://api.sensity.ai/v1/detect", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Sensity AI failed: ${response.statusText}`)
    }

    return await response.json()
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch("https://api.sensity.ai/v1/health", {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      })
      return response.ok
    } catch {
      return false
    }
  }
}

class RealityDefender implements AIProvider {
  name = "Reality Defender"
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async detect(file: File): Promise<DetectionResult> {
    // Implementation for Reality Defender API
    const response = await fetch("https://api.realitydefender.com/v1/analyze", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        media: await this.fileToBase64(file),
      }),
    })

    if (!response.ok) {
      throw new Error(`Reality Defender failed: ${response.statusText}`)
    }

    return await response.json()
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch("https://api.realitydefender.com/v1/status")
      return response.ok
    } catch {
      return false
    }
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }
}

// Ensemble detection with fallback
export class EnsembleDetector {
  private providers: AIProvider[] = []

  constructor() {
    if (process.env.SENSITY_API_KEY) {
      this.providers.push(new SensityAI(process.env.SENSITY_API_KEY))
    }
    if (process.env.REALITY_DEFENDER_API_KEY) {
      this.providers.push(new RealityDefender(process.env.REALITY_DEFENDER_API_KEY))
    }
  }

  async detectWithFallback(file: File): Promise<EnsembleResult> {
    const results: DetectionVote[] = []
    const errors: string[] = []

    for (const provider of this.providers) {
      try {
        if (await provider.isAvailable()) {
          const result = await provider.detect(file)
          results.push({
            modelName: provider.name,
            confidence: result.confidence,
            weight: this.getModelWeight(provider.name),
            details: result.details,
          })
        }
      } catch (error) {
        errors.push(`${provider.name}: ${error.message}`)
        console.warn(`Provider ${provider.name} failed:`, error)
      }
    }

    if (results.length === 0) {
      throw new Error(`All AI providers failed: ${errors.join(", ")}`)
    }

    return this.calculateEnsembleScore(results)
  }

  private getModelWeight(modelName: string): number {
    const weights = {
      "Sensity AI": 0.4,
      "Reality Defender": 0.35,
      GenConViT: 0.25,
    }
    return weights[modelName] || 0.2
  }

  private calculateEnsembleScore(votes: DetectionVote[]): EnsembleResult {
    const weightedSum = votes.reduce((sum, vote) => sum + vote.confidence * vote.weight, 0)
    const totalWeight = votes.reduce((sum, vote) => sum + vote.weight, 0)
    const ensembleConfidence = weightedSum / totalWeight

    return {
      confidence: Math.round(ensembleConfidence),
      isAIGenerated: ensembleConfidence > 50,
      modelResults: votes,
      consensusLevel: this.calculateConsensus(votes),
      reliability: votes.length / this.providers.length,
    }
  }

  private calculateConsensus(votes: DetectionVote[]): number {
    const avgConfidence = votes.reduce((sum, vote) => sum + vote.confidence, 0) / votes.length
    const variance = votes.reduce((sum, vote) => sum + Math.pow(vote.confidence - avgConfidence, 2), 0) / votes.length
    return Math.max(0, 100 - Math.sqrt(variance))
  }
}

interface DetectionVote {
  modelName: string
  confidence: number
  weight: number
  details: string
}

interface EnsembleResult {
  confidence: number
  isAIGenerated: boolean
  modelResults: DetectionVote[]
  consensusLevel: number
  reliability: number
}

interface DetectionResult {
  confidence: number
  details: string
}
