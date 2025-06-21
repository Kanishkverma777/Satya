// Real-time WebSocket notifications
import { Server as SocketIOServer } from "socket.io"
import type { Server as HTTPServer } from "http"

class WebSocketManager {
  private io: SocketIOServer | null = null

  initialize(server: HTTPServer): void {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    })

    this.io.on("connection", (socket) => {
      console.log("User connected:", socket.id)

      socket.on("authenticate", async (token: string) => {
        const user = await this.authenticateSocket(token)
        if (user) {
          socket.join(`user-${user.id}`)
          socket.emit("authenticated", { userId: user.id })
        } else {
          socket.emit("authentication_failed")
        }
      })

      socket.on("subscribe-alerts", (userId: string) => {
        socket.join(`alerts-${userId}`)
      })

      socket.on("subscribe-community", () => {
        socket.join("community-updates")
      })

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id)
      })
    })
  }

  async broadcastDetectionComplete(userId: string, result: any): Promise<void> {
    if (!this.io) return

    this.io.to(`user-${userId}`).emit("detection_complete", {
      type: "detection_complete",
      result,
      timestamp: new Date().toISOString(),
    })
  }

  async broadcastAlert(alert: SecurityAlert): Promise<void> {
    if (!this.io) return

    this.io.to("community-updates").emit("security_alert", {
      type: "security_alert",
      alert,
      timestamp: new Date().toISOString(),
    })
  }

  async notifyUser(userId: string, notification: Notification): Promise<void> {
    if (!this.io) return

    this.io.to(`user-${userId}`).emit("notification", {
      ...notification,
      timestamp: new Date().toISOString(),
    })
  }

  async broadcastCommunityUpdate(update: CommunityUpdate): Promise<void> {
    if (!this.io) return

    this.io.to("community-updates").emit("community_update", {
      type: "community_update",
      update,
      timestamp: new Date().toISOString(),
    })
  }

  private async authenticateSocket(token: string): Promise<{ id: string } | null> {
    try {
      const { authManager } = await import("./auth")
      const decoded = authManager.verifyJWT(token)
      return decoded ? { id: decoded.userId } : null
    } catch {
      return null
    }
  }
}

interface SecurityAlert {
  id: string
  type: "high_confidence_deepfake" | "viral_content" | "coordinated_campaign"
  platform: string
  contentUrl: string
  confidence: number
  description: string
}

interface Notification {
  type: string
  title: string
  message: string
  data?: any
}

interface CommunityUpdate {
  type: "new_post" | "flagged_content" | "trending_topic"
  data: any
}

export const websocketManager = new WebSocketManager()
