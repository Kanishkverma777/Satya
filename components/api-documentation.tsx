"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Code, Key, Zap, Shield, Copy, CheckCircle, ExternalLink } from "lucide-react"

export function ApiDocumentation() {
  const [apiKey, setApiKey] = useState("sk-truthlens-...")
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const endpoints = [
    {
      method: "POST",
      path: "/api/v1/detect",
      description: "Analyze uploaded media files for AI generation",
      rateLimit: "100 requests/day (free), 1000/day (pro)",
      parameters: [
        { name: "file", type: "File", required: true, description: "Media file to analyze (max 50MB)" },
        { name: "models", type: "Array", required: false, description: "Specific models to use for detection" },
      ],
    },
    {
      method: "POST",
      path: "/api/v1/analyze-url",
      description: "Analyze media from social media URLs",
      rateLimit: "50 requests/day (free), 500/day (pro)",
      parameters: [
        { name: "url", type: "String", required: true, description: "Social media URL to analyze" },
        { name: "platform", type: "String", required: false, description: "Platform hint (youtube, twitter, etc.)" },
      ],
    },
    {
      method: "GET",
      path: "/api/v1/history",
      description: "Retrieve user detection history",
      rateLimit: "1000 requests/day",
      parameters: [
        { name: "limit", type: "Integer", required: false, description: "Number of results to return (max 100)" },
        { name: "offset", type: "Integer", required: false, description: "Pagination offset" },
      ],
    },
  ]

  const codeExamples = {
    javascript: `// JavaScript/Node.js Example
const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

const detectMedia = async (filePath) => {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));
  
  try {
    const response = await axios.post('https://api.truthlens.ai/v1/detect', form, {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        ...form.getHeaders()
      }
    });
    
    console.log('Detection Result:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};

// Usage
detectMedia('./suspicious_video.mp4');`,

    python: `# Python Example
import requests

def detect_media(file_path):
    url = "https://api.truthlens.ai/v1/detect"
    headers = {
        "Authorization": "Bearer YOUR_API_KEY"
    }
    
    with open(file_path, 'rb') as file:
        files = {'file': file}
        response = requests.post(url, headers=headers, files=files)
    
    if response.status_code == 200:
        result = response.json()
        print(f"Confidence: {result['confidence']}%")
        print(f"AI Generated: {result['isAIGenerated']}")
        return result
    else:
        print(f"Error: {response.status_code} - {response.text}")

# Usage
detect_media("suspicious_video.mp4")`,

    curl: `# cURL Example
curl -X POST https://api.truthlens.ai/v1/detect \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@suspicious_video.mp4"

# URL Analysis Example
curl -X POST https://api.truthlens.ai/v1/analyze-url \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://youtube.com/watch?v=example"}'`,
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">API Documentation</h1>
        <p className="text-lg sm:text-xl text-gray-600 px-2">
          Integrate AI media detection into your applications with our powerful REST API
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6 sm:space-y-8">
          {/* Getting Started */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">1. Get Your API Key</h3>
                <p className="text-gray-600 mb-3">
                  Sign up for a free account to get your API key with 100 free requests per day.
                </p>
                <div className="flex gap-2">
                  <Input value={apiKey} readOnly className="font-mono text-sm" />
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(apiKey)}>
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">2. Base URL</h3>
                <code className="block bg-gray-100 p-3 rounded-lg text-sm">https://api.truthlens.ai/v1</code>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">3. Authentication</h3>
                <p className="text-gray-600 mb-2">Include your API key in the Authorization header:</p>
                <code className="block bg-gray-100 p-3 rounded-lg text-sm">Authorization: Bearer YOUR_API_KEY</code>
              </div>
            </CardContent>
          </Card>

          {/* Endpoints */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                API Endpoints
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {endpoints.map((endpoint, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant={endpoint.method === "POST" ? "default" : "secondary"}>{endpoint.method}</Badge>
                    <code className="text-sm font-mono">{endpoint.path}</code>
                  </div>

                  <p className="text-gray-600 mb-3">{endpoint.description}</p>

                  <div className="mb-3">
                    <span className="text-sm font-medium">Rate Limit: </span>
                    <span className="text-sm text-gray-600">{endpoint.rateLimit}</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-2">Parameters:</h4>
                    <div className="space-y-2">
                      {endpoint.parameters.map((param, paramIndex) => (
                        <div key={paramIndex} className="text-sm">
                          <code className="bg-gray-100 px-2 py-1 rounded">{param.name}</code>
                          <span className="mx-2 text-gray-500">({param.type})</span>
                          {param.required && (
                            <Badge variant="outline" className="text-xs">
                              Required
                            </Badge>
                          )}
                          <p className="text-gray-600 mt-1 ml-4">{param.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Code Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Code Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="javascript" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                </TabsList>

                {Object.entries(codeExamples).map(([language, code]) => (
                  <TabsContent key={language} value={language}>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm">
                        <code>{code}</code>
                      </pre>
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2 p-1 sm:p-2"
                        onClick={() => copyToClipboard(code)}
                      >
                        <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* Response Format */}
          <Card>
            <CardHeader>
              <CardTitle>Response Format</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Success Response (200)</h3>
                  <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    {`{
  "confidence": 87,
  "isAIGenerated": true,
  "modelResults": [
    {
      "name": "Sensity AI",
      "confidence": 89,
      "details": "Detected facial inconsistencies"
    },
    {
      "name": "Reality Defender", 
      "confidence": 85,
      "details": "Found compression artifacts"
    }
  ],
  "metadata": {
    "fileSize": "15.3 MB",
    "dimensions": "1920x1080",
    "duration": "0:45",
    "format": "MP4"
  },
  "analysis": {
    "lipSync": 45,
    "faceConsistency": 38,
    "audioVisualSync": 52
  },
  "processingTime": 3200
}`}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Error Response (4xx/5xx)</h3>
                  <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    {`{
  "error": "File size exceeds 50MB limit",
  "code": "FILE_TOO_LARGE",
  "timestamp": "2024-01-15T10:30:00Z"
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                Quick Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-sm">
                <Key className="h-4 w-4 mr-2" />
                Get API Key
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                <Code className="h-4 w-4 mr-2" />
                Interactive Playground
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                <Shield className="h-4 w-4 mr-2" />
                Rate Limits
              </Button>
            </CardContent>
          </Card>

          {/* Pricing Tiers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">API Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="border rounded-lg p-3">
                <div className="font-semibold text-sm sm:text-base">Free Tier</div>
                <div className="text-xs sm:text-sm text-gray-600">100 requests/day</div>
                <div className="text-lg font-bold text-green-600">$0/month</div>
              </div>
              <div className="border rounded-lg p-3">
                <div className="font-semibold text-sm sm:text-base">Pro Tier</div>
                <div className="text-xs sm:text-sm text-gray-600">10,000 requests/day</div>
                <div className="text-lg font-bold text-blue-600">$29/month</div>
              </div>
              <div className="border rounded-lg p-3">
                <div className="font-semibold text-sm sm:text-base">Enterprise</div>
                <div className="text-xs sm:text-sm text-gray-600">Unlimited requests</div>
                <div className="text-lg font-bold text-purple-600">Custom</div>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-gray-600">Our support team is here to help you integrate successfully.</p>
              <Button className="w-full">Contact Support</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
