"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Play, CheckCircle, Trophy, Clock, Users, Target, Brain } from "lucide-react"

export function EducationalHub() {
  const [completedLessons, setCompletedLessons] = useState<string[]>(["lesson-1"])
  const [userScore, setUserScore] = useState(750)

  const lessons = [
    {
      id: "lesson-1",
      title: "Introduction to Deepfakes",
      description: "Learn the basics of AI-generated media and how deepfakes are created",
      duration: "5 min",
      difficulty: "Beginner",
      completed: true,
    },
    {
      id: "lesson-2",
      title: "Spotting Visual Artifacts",
      description: "Identify common visual indicators of AI-generated images and videos",
      duration: "8 min",
      difficulty: "Beginner",
      completed: false,
    },
    {
      id: "lesson-3",
      title: "Audio Deepfake Detection",
      description: "Recognize synthetic speech and audio manipulation techniques",
      duration: "6 min",
      difficulty: "Intermediate",
      completed: false,
    },
    {
      id: "lesson-4",
      title: "Advanced Detection Methods",
      description: "Understand technical approaches to AI media detection",
      duration: "12 min",
      difficulty: "Advanced",
      completed: false,
    },
  ]

  const quizzes = [
    {
      id: "quiz-1",
      title: "Deepfake Basics Quiz",
      questions: 10,
      timeLimit: "5 min",
      bestScore: 85,
      attempts: 2,
    },
    {
      id: "quiz-2",
      title: "Visual Detection Challenge",
      questions: 15,
      timeLimit: "8 min",
      bestScore: null,
      attempts: 0,
    },
    {
      id: "quiz-3",
      title: "Audio Analysis Test",
      questions: 12,
      timeLimit: "6 min",
      bestScore: null,
      attempts: 0,
    },
  ]

  const challenges = [
    {
      id: "challenge-1",
      title: "Spot the Deepfake",
      description: "Identify AI-generated faces in a series of images",
      participants: 1247,
      difficulty: "Medium",
      reward: 100,
    },
    {
      id: "challenge-2",
      title: "Voice Clone Detection",
      description: "Distinguish between real and synthetic speech samples",
      participants: 892,
      difficulty: "Hard",
      reward: 200,
    },
    {
      id: "challenge-3",
      title: "Video Manipulation Hunt",
      description: "Find subtle video editing and deepfake artifacts",
      participants: 634,
      difficulty: "Expert",
      reward: 300,
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-blue-100 text-blue-800"
      case "hard":
        return "bg-purple-100 text-purple-800"
      case "expert":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Learning Hub</h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-4 sm:mb-6 px-2">
          Master the art of detecting AI-generated media through interactive lessons and challenges
        </p>

        {/* User Progress */}
        <div className="max-w-sm sm:max-w-md mx-auto bg-white rounded-lg p-3 sm:p-4 shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium">Your Progress</span>
            <span className="text-xs sm:text-sm text-gray-500">
              {completedLessons.length}/{lessons.length} lessons
            </span>
          </div>
          <Progress value={(completedLessons.length / lessons.length) * 100} className="mb-2" />
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="flex items-center gap-1">
              <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
              {userScore} points
            </span>
            <Badge variant="secondary" className="text-xs">
              Level 3
            </Badge>
          </div>
        </div>
      </div>

      <Tabs defaultValue="lessons" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="lessons" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Lessons
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Quizzes
          </TabsTrigger>
          <TabsTrigger value="challenges" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Challenges
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lessons" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {lessons.map((lesson) => (
              <Card key={lesson.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1 min-w-0">
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        {lesson.completed ? (
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <Play className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                        )}
                        <span className="truncate">{lesson.title}</span>
                      </CardTitle>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{lesson.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <Badge className={getDifficultyColor(lesson.difficulty)} variant="secondary">
                      {lesson.difficulty}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1 text-xs">
                      <Clock className="h-3 w-3" />
                      {lesson.duration}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button className="w-full text-sm sm:text-base" variant={lesson.completed ? "outline" : "default"}>
                    {lesson.completed ? "Review Lesson" : "Start Lesson"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    {quiz.title}
                  </CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{quiz.questions} questions</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {quiz.timeLimit}
                      </span>
                    </div>
                    {quiz.bestScore && (
                      <div className="text-sm">
                        <span className="text-gray-600">Best Score: </span>
                        <span className="font-medium text-green-600">{quiz.bestScore}%</span>
                      </div>
                    )}
                    <div className="text-sm text-gray-500">Attempts: {quiz.attempts}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">{quiz.attempts > 0 ? "Retake Quiz" : "Start Quiz"}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-orange-600" />
                    {challenge.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{challenge.description}</p>
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Trophy className="h-3 w-3" />
                      {challenge.reward} pts
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    {challenge.participants.toLocaleString()} participants
                  </div>
                  <Button className="w-full">Join Challenge</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
