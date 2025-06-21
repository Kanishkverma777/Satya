// Simplified authentication without external dependencies
interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

class SimplifiedAuth {
  private currentUser: User | null = null

  async hashPassword(password: string): Promise<string> {
    // Simple hash for demo - use proper hashing in production
    return btoa(password)
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return btoa(password) === hash
  }

  generateJWT(userId: string, email: string): string {
    // Simple token for demo - use proper JWT in production
    return btoa(JSON.stringify({ userId, email, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }))
  }

  verifyJWT(token: string): { userId: string; email: string } | null {
    try {
      const decoded = JSON.parse(atob(token))
      if (decoded.exp < Date.now()) return null
      return { userId: decoded.userId, email: decoded.email }
    } catch {
      return null
    }
  }

  async enable2FA(userId: string): Promise<{ secret: string; qrCode: string }> {
    const secret = Math.random().toString(36).substring(2, 15)
    const qrCode = "/placeholder.svg?height=200&width=200"

    // Store in localStorage for demo
    localStorage.setItem(`2fa_secret_${userId}`, secret)

    return { secret, qrCode }
  }

  async verify2FA(userId: string, token: string): Promise<boolean> {
    // Simple verification for demo - accept any 6-digit code
    return token.length === 6 && /^\d+$/.test(token)
  }

  getCurrentUser(): User | null {
    return this.currentUser
  }

  setCurrentUser(user: User | null): void {
    this.currentUser = user
  }

  async scheduleDataDeletion(userId: string, days = 30): Promise<void> {
    console.log(`Scheduled data deletion for user ${userId} in ${days} days`)
  }
}

export const authManager = new SimplifiedAuth()
