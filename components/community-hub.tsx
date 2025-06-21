"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Flag,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
} from "lucide-react"

export function CommunityHub() {
  const [activeTab, setActiveTab] = useState("recent")

  const communityPosts = [
    {
      id: "1",
      user: {
        name: "Alex Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        reputation: 1250,
      },
      type: "detection",
      title: "Suspicious deepfake video circulating on social media",
      description: "Found this video with 92% AI confidence. The lip-sync issues are quite obvious.",
      confidence: 92,
      isAIGenerated: true,
      votes: { up: 23, down: 2 },
      comments: 8,
      timestamp: "2 hours ago",
      tags: ["deepfake", "video", "social-media"],
    },
    {
      id: "2",
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        reputation: 890,
      },
      type: "discussion",
      title: "New AI detection techniques for audio deepfakes",
      description: "Sharing some insights on spectral analysis methods that have improved my detection accuracy.",
      votes: { up: 18, down: 1 },
      comments: 12,
      timestamp: "4 hours ago",
      tags: ["audio", "techniques", "discussion"],
    },
    {
      id: "3",
      user: {
        name: "Mike Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        reputation: 650,
      },
      type: "flag",
      title: "Flagged detection result needs community review",
      description: "This result seems incorrect. The image appears authentic but was marked as 78% AI-generated.",
      confidence: 78,
      isAIGenerated: true,
      votes: { up: 15, down: 3 },
      comments: 6,
      timestamp: "6 hours ago",
      tags: ["flag", "review", "image"],
    },
  ]

  const trendingTopics = [
    { name: "Audio Deepfakes", posts: 45, growth: "+12%" },
    { name: "Face Swap Detection", posts: 38, growth: "+8%" },
    { name: "Social Media Verification", posts: 29, growth: "+15%" },
    { name: "AI Art vs Real", posts: 22, growth: "+5%" },
  ]

  const getPostIcon = (type: string) => {
    switch (type) {
      case "detection":
        return <AlertTriangle className="h-5 w-5 text-orange-600" />
      case "discussion":
        return <MessageSquare className="h-5 w-5 text-blue-600" />
      case "flag":
        return <Flag className="h-5 w-5 text-red-600" />
      default:
        return <MessageSquare className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Community Hub</h1>
        <p className="text-lg sm:text-xl text-gray-600 px-2">
          Collaborate with experts to improve AI detection accuracy and share insights
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="recent">Recent Posts</TabsTrigger>
              <TabsTrigger value="flagged">Flagged Content</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="space-y-6">
              {communityPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                          <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
                          <AvatarFallback className="text-xs sm:text-sm">
                            {post.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="font-medium text-sm sm:text-base truncate">{post.user.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {post.user.reputation} rep
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                            {getPostIcon(post.type)}
                            <span>{post.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      {post.confidence && (
                        <Badge
                          variant={post.isAIGenerated ? "destructive" : "default"}
                          className="text-xs flex-shrink-0"
                        >
                          {post.confidence}% AI
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600 line-clamp-3">{post.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t">
                      <div className="flex items-center gap-2 sm:gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-3"
                        >
                          <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4" />
                          {post.votes.up}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-3"
                        >
                          <ThumbsDown className="h-3 w-3 sm:h-4 sm:w-4" />
                          {post.votes.down}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-3"
                        >
                          <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                          {post.comments}
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="p-1 sm:p-2">
                        <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="flagged" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flag className="h-5 w-5 text-red-600" />
                    Community Moderation Queue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {communityPosts
                      .filter((post) => post.type === "flag")
                      .map((post) => (
                        <div key={post.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{post.title}</span>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Pending Review
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{post.description}</p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-green-600 border-green-600">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                              <Flag className="h-4 w-4 mr-1" />
                              Flag
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trending" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {communityPosts.slice(0, 4).map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <Badge variant="secondary">Trending</Badge>
                      </div>
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">{post.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {post.votes.up}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {post.comments}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{topic.name}</div>
                    <div className="text-xs text-gray-500">{topic.posts} posts</div>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    {topic.growth}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Community Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Community Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">15,420</div>
                <div className="text-sm text-gray-500">Active Members</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold">2,340</div>
                  <div className="text-xs text-gray-500">Posts Today</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">890</div>
                  <div className="text-xs text-gray-500">Flags Resolved</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Start Discussion
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Flag className="h-4 w-4 mr-2" />
                Report Content
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Submit Detection
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
