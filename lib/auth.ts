// Advanced authentication with 2FA
import { authenticator } from "otplib"
import QRCode from "qrcode"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export class AuthManager {
  private jwtSecret: string

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || "your-secret-key"
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12)
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }

  generateJWT(userId: string, email: string): string {
    return jwt.sign({ userId, email }, this.jwtSecret, { expiresIn: "7d" })
  }

  verifyJWT(token: string): { userId: string; email: string } | null {
    try {
      return jwt.verify(token, this.jwtSecret) as { userId: string; email: string }
    } catch {
      return null
    }
  }

  async enable2FA(userId: string): Promise<{ secret: string; qrCode: string }> {
    const secret = authenticator.generateSecret()
    const service = "Satya"
    const account = `user-${userId}`

    const otpauth = authenticator.keyuri(account, service, secret)
    const qrCode = await QRCode.toDataURL(otpauth)

    // In production, save secret to database
    await this.save2FASecret(userId, secret)

    return { secret, qrCode }
  }

  async verify2FA(userId: string, token: string): Promise<boolean> {
    const secret = await this.get2FASecret(userId)
    if (!secret) return false

    return authenticator.verify({ token, secret })
  }

  private async save2FASecret(userId: string, secret: string): Promise<void> {
    // Implementation would save to database
    console.log("Saving 2FA secret for user:", userId)
  }

  private async get2FASecret(userId: string): Promise<string | null> {
    // Implementation would retrieve from database
    return "mock-secret"
  }

  async scheduleDataDeletion(userId: string, days = 30): Promise<void> {
    const deletionDate = new Date()
    deletionDate.setDate(deletionDate.getDate() + days)

    // Schedule deletion job
    await detectionQueue.add(
      "delete-user-data",
      {
        userId,
        scheduledFor: deletionDate.toISOString(),
      },
      {
        delay: days * 24 * 60 * 60 * 1000,
      },
    )
  }
}

export const authManager = new AuthManager()

// Import the queue from the queue module
import { detectionQueue } from "./queue"
