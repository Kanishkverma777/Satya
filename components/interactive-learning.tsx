"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Brain, 
  Trophy, 
  BookOpen, 
  Target, 
  CheckCircle, 
  XCircle,
  Star,
  Zap,
  Users,
  TrendingUp,
  Award,
  Play,
  Pause,
  RotateCcw
} from "lucide-react"

interface LearningModule {
  id: string
  title: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: number
  points: number
  completed: boolean
  progress: number
  category: "detection" | "analysis" | "verification" | "blockchain"
}

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  image?: string
}

interface UserProgress {
  level: number
  experience: number
  totalPoints: number
  modulesCompleted: number
  streak: number
  achievements: string[]
}

export function InteractiveLearning() {
  const [currentModule, setCurrentModule] = useState<string | null>(null)
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 7,
    experience: 1250,
    totalPoints: 2840,
    modulesCompleted: 12,
    streak: 5,
    achievements: ["First Detection", "Speed Demon", "Accuracy Master", "Blockchain Expert"]
  })

  const [learningModules] = useState<LearningModule[]>([
    {
      id: "1",
      title: "Understanding AI-Generated Images",
      description: "Learn to identify common patterns in AI-generated images",
      difficulty: "beginner",
      duration: 15,
      points: 100,
      completed: true,
      progress: 100,
      category: "detection"
    },
    {
      id: "2",
      title: "Facial Artifact Detection",
      description: "Master the art of spotting facial inconsistencies",
      difficulty: "intermediate",
      duration: 20,
      points: 150,
      completed: false,
      progress: 60,
      category: "analysis"
    },
    {
      id: "3",
      title: "Blockchain Verification Deep Dive",
      description: "Understand how blockchain ensures detection integrity",
      difficulty: "advanced",
      duration: 25,
      points: 200,
      completed: false,
      progress: 0,
      category: "blockchain"
    },
    {
      id: "4",
      title: "Multi-Model Analysis",
      description: "Learn to interpret results from multiple AI models",
      difficulty: "intermediate",
      duration: 18,
      points: 175,
      completed: true,
      progress: 100,
      category: "analysis"
    }
  ])

  const [quizQuestions] = useState<QuizQuestion[]>([
    {
      id: "1",
      question: "Which of the following is a common sign of AI-generated images?",
      options: [
        "Perfect symmetry in facial features",
        "Natural lighting variations",
        "Realistic skin texture",
        "Consistent background details"
      ],
      correctAnswer: 0,
      explanation: "AI-generated images often have unnaturally perfect symmetry in facial features, which is rare in real photographs."
    },
    {
      id: "2",
      question: "What does blockchain verification provide in AI detection?",
      options: [
        "Faster processing speed",
        "Immutable detection records",
        "Higher accuracy rates",
        "Lower costs"
      ],
      correctAnswer: 1,
      explanation: "Blockchain verification ensures that detection results are permanently recorded and cannot be tampered with."
    },
    {
      id: "3",
      question: "Which AI model type typically provides the highest accuracy?",
      options: [
        "Statistical models",
        "Neural networks",
        "Ensemble models",
        "Hybrid models"
      ],
      correctAnswer: 2,
      explanation: "Ensemble models combine multiple AI approaches, typically providing the highest accuracy and reliability."
    }
  ])

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)
    
    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-emerald-100 text-emerald-800"
      case "intermediate": return "bg-amber-100 text-amber-800"
      case "advanced": return "bg-rose-100 text-rose-800"
      default: return "bg-slate-100 text-slate-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "detection": return <Target className="h-4 w-4" />
      case "analysis": return <Brain className="h-4 w-4" />
      case "verification": return <CheckCircle className="h-4 w-4" />
      case "blockchain": return <TrendingUp className="h-4 w-4" />
      default: return <BookOpen className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-8">
      {/* User Progress Header */}
      <Card className="bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-xs font-bold text-white">{userProgress.level}</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Level {userProgress.level} Expert</h3>
                <p className="text-slate-600">{userProgress.totalPoints} total points • {userProgress.modulesCompleted} modules completed</p>
                <div className="flex items-center gap-2 mt-1">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <span className="text-sm text-slate-600">{userProgress.streak} day streak</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-900">{userProgress.experience}</div>
              <div className="text-sm text-slate-600">Experience Points</div>
              <Progress value={(userProgress.experience % 1000) / 10} className="w-32 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="modules" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-100/50 p-1 rounded-xl">
          <TabsTrigger value="modules" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">Learning Modules</TabsTrigger>
          <TabsTrigger value="quiz" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">Interactive Quiz</TabsTrigger>
          <TabsTrigger value="achievements" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningModules.map((module) => (
              <Card key={module.id} className="hover:shadow-lg transition-all duration-300 border-slate-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl shadow-md">
                        {getCategoryIcon(module.category)}
                      </div>
                      <div>
                        <CardTitle className="text-lg text-slate-900">{module.title}</CardTitle>
                        <CardDescription className="text-slate-600">{module.description}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getDifficultyColor(module.difficulty)}>
                      {module.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Duration:</span>
                    <span className="font-medium text-slate-900">{module.duration} minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Points:</span>
                    <span className="font-medium text-slate-900">{module.points} XP</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Progress:</span>
                      <span className="font-medium text-slate-900">{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                  </div>
                  <div className="flex gap-2">
                    {module.completed ? (
                      <Button className="w-full" disabled>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </Button>
                    ) : (
                      <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white shadow-lg">
                        <Play className="h-4 w-4 mr-2" />
                        {module.progress > 0 ? "Continue" : "Start"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <Brain className="h-5 w-5 text-slate-700" />
                AI Detection Quiz
              </CardTitle>
              <CardDescription className="text-slate-600">
                Test your knowledge about AI detection techniques
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="text-sm text-slate-600">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </div>
                <div className="text-sm font-medium text-slate-900">
                  Score: {score}/{quizQuestions.length}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-900">
                  {quizQuestions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === index ? "default" : "outline"}
                      className={`w-full justify-start h-auto p-4 ${
                        selectedAnswer === index
                          ? index === quizQuestions[currentQuestion].correctAnswer
                            ? "bg-emerald-100 border-emerald-500 text-emerald-800"
                            : "bg-rose-100 border-rose-500 text-rose-800"
                          : ""
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={selectedAnswer !== null}
                    >
                      <div className="flex items-center gap-3">
                        {selectedAnswer === index && (
                          index === quizQuestions[currentQuestion].correctAnswer ? (
                            <CheckCircle className="h-5 w-5 text-emerald-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-rose-600" />
                          )
                        )}
                        <span>{option}</span>
                      </div>
                    </Button>
                  ))}
                </div>

                {showExplanation && (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="font-medium text-slate-800 mb-2">Explanation:</h4>
                    <p className="text-sm text-slate-700">
                      {quizQuestions[currentQuestion].explanation}
                    </p>
                  </div>
                )}

                {showExplanation && currentQuestion < quizQuestions.length - 1 && (
                  <Button onClick={nextQuestion} className="w-full bg-slate-900 hover:bg-slate-800">
                    Next Question
                  </Button>
                )}

                {showExplanation && currentQuestion === quizQuestions.length - 1 && (
                  <div className="text-center space-y-4">
                    <div className="text-2xl font-bold text-emerald-600">
                      Quiz Complete!
                    </div>
                    <div className="text-lg text-slate-900">
                      Final Score: {score}/{quizQuestions.length}
                    </div>
                    <Button onClick={() => window.location.reload()} className="bg-slate-900 hover:bg-slate-800">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Retake Quiz
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userProgress.achievements.map((achievement, index) => (
              <Card key={index} className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl mx-auto mb-4 shadow-lg">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{achievement}</h3>
                  <p className="text-sm text-slate-600">Achievement unlocked!</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 