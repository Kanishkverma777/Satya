// Advanced caching strategy with Redis
import { Redis } from "@upstash/redis"

class CacheManager {
  private redis: Redis

  constructor() {
    this.redis = new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    })
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const cached = await this.redis.get(key)
      return cached ? JSON.parse(cached as string) : null
    } catch (error) {
      console.warn("Cache get error:", error)
      return null
    }
  }

  async set(key: string, value: any, ttlSeconds = 3600): Promise<void> {
    try {
      await this.redis.setex(key, ttlSeconds, JSON.stringify(value))
    } catch (error) {
      console.warn("Cache set error:", error)
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.redis.del(key)
    } catch (error) {
      console.warn("Cache delete error:", error)
    }
  }

  generateFileHash(file: File): string {
    return `${file.name}-${file.size}-${file.lastModified}`
  }

  getCacheKey(fileHash: string, operation: string): string {
    return `detection:${operation}:${fileHash}`
  }
}

export const cache = new CacheManager()
