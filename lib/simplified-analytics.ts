// Simplified analytics without external dependencies
interface AnalyticsEvent {
  event: string
  userId?: string
  properties: Record<string, any>
  timestamp?: Date
}

class SimplifiedAnalytics {
  private events: AnalyticsEvent[] = []

  async track(event: AnalyticsEvent): Promise<void> {
    const eventData = {
      ...event,
      timestamp: event.timestamp || new Date(),
      sessionId: this.getSessionId(),
      userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "server",
    }

    // Store locally for demo purposes
    this.events.push(eventData)

    // Keep only last 1000 events to prevent memory issues
    if (this.events.length > 1000) {
      this.events = this.events.slice(-1000)
    }

    // Log to console for debugging
    console.log("Analytics Event:", eventData)
  }

  async trackDetectionMetrics(result: any): Promise<void> {
    await this.track({
      event: "detection_completed",
      properties: {
        confidence: result.confidence,
        fileType: result.metadata?.format,
        processingTime: result.processingTime,
        modelsUsed: result.modelResults?.length || 0,
        isAIGenerated: result.isAIGenerated,
        fileSize: result.metadata?.fileSize,
        consensusLevel: result.consensusLevel,
        reliability: result.reliability,
      },
    })
  }

  async trackUserEngagement(userId: string, action: string, metadata?: any): Promise<void> {
    await this.track({
      event: "user_engagement",
      userId,
      properties: {
        action,
        ...metadata,
      },
    })
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events]
  }

  private getSessionId(): string {
    if (typeof window !== "undefined") {
      let sessionId = sessionStorage.getItem("analytics_session_id")
      if (!sessionId) {
        sessionId = Math.random().toString(36).substring(2, 15)
        sessionStorage.setItem("analytics_session_id", sessionId)
      }
      return sessionId
    }
    return "server-session"
  }
}

export const analytics = new SimplifiedAnalytics()
