"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, Crown, Users, Target } from "lucide-react"

export function Leaderboard() {
  const [timeframe, setTimeframe] = useState("all-time")

  const topUsers = [
    {
      rank: 1,
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      score: 12450,
      badges: ["Expert Detector", "Quiz Master", "Community Helper"],
      streak: 45,
      accuracy: 96,
    },
    {
      rank: 2,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      score: 11280,
      badges: ["Deepfake Hunter", "Speed Demon"],
      streak: 32,
      accuracy: 94,
    },
    {
      rank: 3,
      name: "Mike Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      score: 10950,
      badges: ["Audio Expert", "Challenger"],
      streak: 28,
      accuracy: 92,
    },
    {
      rank: 4,
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      score: 9870,
      badges: ["Visual Detective"],
      streak: 21,
      accuracy: 91,
    },
    {
      rank: 5,
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      score: 9340,
      badges: ["Consistent Performer"],
      streak: 19,
      accuracy: 89,
    },
  ]

  const achievements = [
    {
      title: "First Detection",
      description: "Complete your first media analysis",
      icon: Target,
      rarity: "Common",
      holders: 15420,
    },
    {
      title: "Perfect Score",
      description: "Score 100% on any quiz",
      icon: Trophy,
      rarity: "Uncommon",
      holders: 3240,
    },
    {
      title: "Deepfake Hunter",
      description: "Correctly identify 100 AI-generated media",
      icon: Medal,
      rarity: "Rare",
      holders: 890,
    },
    {
      title: "Expert Detector",
      description: "Maintain 95%+ accuracy over 50 detections",
      icon: Award,
      rarity: "Epic",
      holders: 234,
    },
    {
      title: "Community Legend",
      description: "Help verify 1000+ community submissions",
      icon: Crown,
      rarity: "Legendary",
      holders: 12,
    },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case "common":
        return "bg-gray-100 text-gray-800"
      case "uncommon":
        return "bg-green-100 text-green-800"
      case "rare":
        return "bg-blue-100 text-blue-800"
      case "epic":
        return "bg-purple-100 text-purple-800"
      case "legendary":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Leaderboard</h1>
        <p className="text-xl text-gray-600">Compete with the community and showcase your AI detection skills</p>
      </div>

      <Tabs defaultValue="leaderboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="leaderboard" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Rankings
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="leaderboard" className="space-y-6">
          {/* Time Filter */}
          <div className="flex justify-center">
            <div className="flex gap-2">
              <Button
                variant={timeframe === "all-time" ? "default" : "outline"}
                onClick={() => setTimeframe("all-time")}
              >
                All Time
              </Button>
              <Button variant={timeframe === "monthly" ? "default" : "outline"} onClick={() => setTimeframe("monthly")}>
                This Month
              </Button>
              <Button variant={timeframe === "weekly" ? "default" : "outline"} onClick={() => setTimeframe("weekly")}>
                This Week
              </Button>
            </div>
          </div>

          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {topUsers.slice(0, 3).map((user, index) => (
              <Card
                key={user.rank}
                className={`text-center ${index === 0 ? "lg:order-2 ring-2 ring-yellow-400" : index === 1 ? "lg:order-1" : "lg:order-3"}`}
              >
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex justify-center mb-2">{getRankIcon(user.rank)}</div>
                  <Avatar className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-2">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-base sm:text-lg truncate px-2">{user.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600">{user.score.toLocaleString()}</div>
                  <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                    <div>
                      <div className="text-gray-500">Accuracy</div>
                      <div className="font-medium">{user.accuracy}%</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Streak</div>
                      <div className="font-medium">{user.streak} days</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {user.badges.slice(0, 2).map((badge, i) => (
                      <Badge key={i} variant="secondary" className="text-xs px-2 py-1">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Full Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle>Full Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {topUsers.map((user) => (
                  <div
                    key={user.rank}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-center w-6 sm:w-8 flex-shrink-0">
                      {getRankIcon(user.rank)}
                    </div>
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="text-xs sm:text-sm">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm sm:text-base truncate">{user.name}</div>
                      <div className="flex gap-1 sm:gap-2 mt-1 overflow-x-auto">
                        {user.badges.slice(0, 2).map((badge, i) => (
                          <Badge key={i} variant="outline" className="text-xs whitespace-nowrap">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm sm:text-lg font-bold text-blue-600">{user.score.toLocaleString()}</div>
                      <div className="text-xs sm:text-sm text-gray-500">{user.accuracy}% accuracy</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <achievement.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{achievement.title}</CardTitle>
                      <Badge className={getRarityColor(achievement.rarity)} variant="secondary">
                        {achievement.rarity}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600">{achievement.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-gray-500">
                      <Users className="h-4 w-4" />
                      {achievement.holders.toLocaleString()} holders
                    </span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
