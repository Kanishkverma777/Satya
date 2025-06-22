"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  MessageCircle, 
  Share2, 
  Eye, 
  Brain, 
  Shield, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  UserPlus,
  Mic,
  Video,
  Image as ImageIcon
} from "lucide-react"

interface Participant {
  id: string
  name: string
  avatar: string
  role: "host" | "participant" | "expert"
  isOnline: boolean
  currentAnalysis?: string
}

interface AnalysisResult {
  id: string
  model: string
  confidence: number
  isAIGenerated: boolean
  details: string
  timestamp: Date
  analyst: string
}

export function CollaborativeDetection() {
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: "1",
      name: "Alex Chen",
      avatar: "/avatars/alex.jpg",
      role: "host",
      isOnline: true,
      currentAnalysis: "Analyzing facial inconsistencies..."
    },
    {
      id: "2", 
      name: "Sarah Kim",
      avatar: "/avatars/sarah.jpg",
      role: "expert",
      isOnline: true,
      currentAnalysis: "Checking metadata patterns..."
    },
    {
      id: "3",
      name: "Marcus Rodriguez",
      avatar: "/avatars/marcus.jpg", 
      role: "participant",
      isOnline: false
    }
  ])

  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([
    {
      id: "1",
      model: "MediaTruth Ensemble",
      confidence: 94.2,
      isAIGenerated: true,
      details: "High confidence AI-generated content detected. Multiple indicators including facial artifacts, inconsistent lighting, and metadata anomalies.",
      timestamp: new Date(),
      analyst: "Alex Chen"
    },
    {
      id: "2",
      model: "DeepFake Detection v2.1",
      confidence: 87.6,
      isAIGenerated: true,
      details: "Facial landmark analysis reveals artificial patterns consistent with GAN-generated imagery.",
      timestamp: new Date(Date.now() - 30000),
      analyst: "Sarah Kim"
    }
  ])

  const [sessionCode, setSessionCode] = useState("MT-2024-ABC123")
  const [isRecording, setIsRecording] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { id: "1", user: "Alex Chen", message: "Starting collaborative analysis session", timestamp: new Date() },
    { id: "2", user: "Sarah Kim", message: "I'll focus on the metadata analysis", timestamp: new Date() }
  ])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[800px]">
      {/* Main Analysis Area */}
      <div className="lg:col-span-2 space-y-6">
        {/* Session Header */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Collaborative Analysis Session
                </CardTitle>
                <CardDescription>
                  Session Code: <Badge variant="secondary">{sessionCode}</Badge>
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Invite
                </Button>
                <Button 
                  variant={isRecording ? "destructive" : "default"} 
                  size="sm"
                  onClick={() => setIsRecording(!isRecording)}
                >
                  <Mic className="h-4 w-4 mr-2" />
                  {isRecording ? "Stop Recording" : "Start Recording"}
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Analysis Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              Real-time Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysisResults.map((result) => (
                <div key={result.id} className="p-4 border rounded-lg bg-gradient-to-r from-slate-50 to-blue-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={result.isAIGenerated ? "destructive" : "default"}>
                        {result.isAIGenerated ? "AI Generated" : "Authentic"}
                      </Badge>
                      <span className="text-sm font-medium">{result.model}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {result.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Confidence:</span>
                      <span className="text-lg font-bold text-blue-600">{result.confidence}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${result.confidence}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{result.details}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={`/avatars/${result.analyst.toLowerCase().replace(' ', '')}.jpg`} />
                      <AvatarFallback>{result.analyst.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    Analyzed by {result.analyst}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Chat */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-green-600" />
              Live Discussion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 overflow-y-auto space-y-3 mb-4">
              {chatMessages.map((message) => (
                <div key={message.id} className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`/avatars/${message.user.toLowerCase().replace(' ', '')}.jpg`} />
                    <AvatarFallback>{message.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{message.user}</span>
                      <span className="text-xs text-gray-500">{message.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <p className="text-sm text-gray-700">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input placeholder="Type your message..." className="flex-1" />
              <Button size="sm">Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Participants */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Participants ({participants.filter(p => p.isOnline).length} online)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {participants.map((participant) => (
                <div key={participant.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={participant.avatar} />
                      <AvatarFallback>{participant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                      participant.isOnline ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{participant.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {participant.role}
                      </Badge>
                    </div>
                    {participant.currentAnalysis && (
                      <p className="text-xs text-gray-600 mt-1">{participant.currentAnalysis}</p>
                    )}
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Participant
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <ImageIcon className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Video className="h-4 w-4 mr-2" />
              Upload Video
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Mic className="h-4 w-4 mr-2" />
              Upload Audio
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Run Full Scan
            </Button>
          </CardContent>
        </Card>

        {/* Session Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Session Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Duration</span>
              <span className="text-sm font-medium">23:45</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Files Analyzed</span>
              <span className="text-sm font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">AI Detected</span>
              <span className="text-sm font-medium text-red-600">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Authentic</span>
              <span className="text-sm font-medium text-green-600">4</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 