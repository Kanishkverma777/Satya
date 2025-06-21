// Simplified cache implementation without external dependencies
class SimplifiedCache {
  private cache = new Map<string, { data: any; expires: number }>()

  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() > item.expires) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  async set(key: string, value: any, ttlSeconds = 3600): Promise<void> {
    const expires = Date.now() + ttlSeconds * 1000
    this.cache.set(key, { data: value, expires })
  }

  async del(key: string): Promise<void> {
    this.cache.delete(key)
  }

  generateFileHash(file: File): string {
    return `${file.name}-${file.size}-${file.lastModified}`
  }

  getCacheKey(fileHash: string, operation: string): string {
    return `detection:${operation}:${fileHash}`
  }

  // Clean up expired entries periodically
  cleanup(): void {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expires) {
        this.cache.delete(key)
      }
    }
  }
}

export const cache = new SimplifiedCache()

// Clean up cache every 5 minutes
if (typeof window !== "undefined") {
  setInterval(() => cache.cleanup(), 5 * 60 * 1000)
}
