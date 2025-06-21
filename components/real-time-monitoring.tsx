"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Eye, TrendingUp, Users, Zap } from "lucide-react"

interface SecurityAlert {
  id: string
  type: "high_confidence_deepfake" | "viral_content" | "coordinated_campaign"
  platform: string
  contentUrl: string
  confidence: number
  description: string
  timestamp: string
}

interface MonitoringStats {
  activeScans: number
  alertsToday: number
  platformsCovered: number
  avgResponseTime: number
}

export function RealTimeMonitoring() {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([])
  const [stats, setStats] = useState<MonitoringStats>({
    activeScans: 42,
    alertsToday: 8,
    platformsCovered: 5,
    avgResponseTime: 750,
  })
  const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        activeScans: Math.floor(Math.random() * 50) + 20,
        avgResponseTime: Math.floor(Math.random() * 1000) + 500,
      }))

      // Occasionally add new alerts
      if (Math.random() > 0.8) {
        const newAlert: SecurityAlert = {
          id: Math.random().toString(36).substring(7),
          type: ["high_confidence_deepfake", "viral_content", "coordinated_campaign"][
            Math.floor(Math.random() * 3)
          ] as any,
          platform: ["Twitter", "YouTube", "TikTok", "Instagram"][Math.floor(Math.random() * 4)],
          contentUrl: "https://example.com/content",
          confidence: Math.floor(Math.random() * 30) + 70,
          description: "Suspicious content detected with high AI confidence",
          timestamp: new Date().toISOString(),
        }

        setAlerts((prev) => [newAlert, ...prev.slice(0, 9)])
        setStats((prev) => ({ ...prev, alertsToday: prev.alertsToday + 1 }))
      }
    }, 5000)

    // Add some initial mock alerts
    const mockAlerts: SecurityAlert[] = [
      {
        id: "1",
        type: "high_confidence_deepfake",
        platform: "Twitter",
        contentUrl: "https://twitter.com/example",
        confidence: 94,
        description: "High-confidence deepfake video detected spreading misinformation",
        timestamp: new Date(Date.now() - 300000).toISOString(),
      },
      {
        id: "2",
        type: "viral_content",
        platform: "TikTok",
        contentUrl: "https://tiktok.com/example",
        confidence: 78,
        description: "AI-generated content going viral, potential coordinated campaign",
        timestamp: new Date(Date.now() - 600000).toISOString(),
      },
    ]
    setAlerts(mockAlerts)

    return () => clearInterval(interval)
  }, [])

  const getAlertSeverity = (type: string) => {
    switch (type) {
      case "high_confidence_deepfake":
        return "destructive"
      case "viral_content":
        return "default"
      case "coordinated_campaign":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "high_confidence_deepfake":
        return <AlertTriangle className="h-4 w-4" />
      case "viral_content":
        return <TrendingUp className="h-4 w-4" />
      case "coordinated_campaign":
        return <Users className="h-4 w-4" />
      default:
        return <Eye className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Alert className={isConnected ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
        <Zap className={`h-4 w-4 ${isConnected ? "text-green-600" : "text-red-600"}`} />
        <AlertDescription>Real-time monitoring is {isConnected ? "active" : "disconnected"}</AlertDescription>
      </Alert>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-600 truncate">Active Scans</p>
                <p className="text-lg sm:text-2xl font-bold text-blue-600">{stats.activeScans}</p>
              </div>
              <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-600 truncate">Alerts Today</p>
                <p className="text-lg sm:text-2xl font-bold text-red-600">{stats.alertsToday}</p>
              </div>
              <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-600 truncate">Platforms</p>
                <p className="text-lg sm:text-2xl font-bold text-green-600">{stats.platformsCovered}</p>
              </div>
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-600 truncate">Avg Response</p>
                <p className="text-lg sm:text-2xl font-bold text-purple-600">{stats.avgResponseTime}ms</p>
              </div>
              <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Live Security Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          {alerts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No alerts detected. System monitoring...</p>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg">
                  <div className="flex-shrink-0 mt-1">{getAlertIcon(alert.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
                      <Badge variant={getAlertSeverity(alert.type) as any} className="text-xs">
                        {alert.type.replace("_", " ").toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {alert.platform}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {alert.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{alert.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span className="text-xs text-gray-500">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-xs px-2 py-1">
                          Investigate
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs px-2 py-1">
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
