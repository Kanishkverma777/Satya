"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Link, 
  Copy, 
  CheckCircle, 
  AlertTriangle, 
  Shield, 
  Eye, 
  Database,
  Hash,
  Clock,
  Users,
  TrendingUp,
  Lock
} from "lucide-react"

interface BlockchainRecord {
  id: string
  hash: string
  timestamp: Date
  blockNumber: number
  transactionHash: string
  confidence: number
  isAIGenerated: boolean
  model: string
  fileHash: string
  verifiedBy: number
}

interface VerificationStats {
  totalRecords: number
  verifiedToday: number
  averageConfidence: number
  blockchainUptime: number
  totalStake: number
}

export function BlockchainVerification() {
  const [searchHash, setSearchHash] = useState("")
  const [verificationResults, setVerificationResults] = useState<BlockchainRecord[]>([
    {
      id: "1",
      hash: "0x7a8b9c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1",
      timestamp: new Date(),
      blockNumber: 45218763,
      transactionHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3",
      confidence: 94.2,
      isAIGenerated: true,
      model: "MediaTruth Ensemble v2.1",
      fileHash: "sha256:abc123def456...",
      verifiedBy: 156
    },
    {
      id: "2",
      hash: "0x9b8a7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7",
      timestamp: new Date(Date.now() - 3600000),
      blockNumber: 45218760,
      transactionHash: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4",
      confidence: 87.6,
      isAIGenerated: false,
      model: "DeepFake Detection v2.1",
      fileHash: "sha256:def456abc789...",
      verifiedBy: 89
    }
  ])

  const [stats] = useState<VerificationStats>({
    totalRecords: 2456789,
    verifiedToday: 1234,
    averageConfidence: 92.4,
    blockchainUptime: 99.99,
    totalStake: 1250000
  })

  const handleVerifyHash = () => {
    // Simulate blockchain verification
    console.log("Verifying hash:", searchHash)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Records</p>
                <p className="text-2xl font-bold text-blue-900">{stats.totalRecords.toLocaleString()}</p>
              </div>
              <Database className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Verified Today</p>
                <p className="text-2xl font-bold text-green-900">{stats.verifiedToday}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Avg Confidence</p>
                <p className="text-2xl font-bold text-purple-900">{stats.averageConfidence}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Total Stake</p>
                <p className="text-2xl font-bold text-orange-900">${(stats.totalStake / 1000000).toFixed(1)}M</p>
              </div>
              <Lock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="verify" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="verify">Verify Record</TabsTrigger>
          <TabsTrigger value="recent">Recent Records</TabsTrigger>
          <TabsTrigger value="network">Network Status</TabsTrigger>
        </TabsList>

        <TabsContent value="verify" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Verify Blockchain Record
              </CardTitle>
              <CardDescription>
                Enter a transaction hash or file hash to verify its authenticity on the Polygon blockchain
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter transaction hash or file hash..."
                  value={searchHash}
                  onChange={(e) => setSearchHash(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleVerifyHash}>
                  <Eye className="h-4 w-4 mr-2" />
                  Verify
                </Button>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Example Hashes:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Transaction:</span>
                    <code className="bg-white px-2 py-1 rounded text-xs">0x7a8b9c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1</code>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard("0x7a8b9c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1")}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">File Hash:</span>
                    <code className="bg-white px-2 py-1 rounded text-xs">sha256:abc123def456789...</code>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard("sha256:abc123def456789...")}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                Recent Blockchain Records
              </CardTitle>
              <CardDescription>
                Latest detection results stored on Polygon blockchain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {verificationResults.map((record) => (
                  <div key={record.id} className="p-4 border rounded-lg bg-gradient-to-r from-slate-50 to-blue-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant={record.isAIGenerated ? "destructive" : "default"}>
                          {record.isAIGenerated ? "AI Generated" : "Authentic"}
                        </Badge>
                        <Badge variant="outline">{record.model}</Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        {record.timestamp.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Transaction Hash</p>
                        <div className="flex items-center gap-2">
                          <code className="text-xs bg-white px-2 py-1 rounded flex-1 truncate">
                            {record.transactionHash}
                          </code>
                          <Button variant="ghost" size="sm" onClick={() => copyToClipboard(record.transactionHash)}>
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Block Number</p>
                        <p className="text-sm text-gray-600">#{record.blockNumber}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Confidence</p>
                        <p className="text-lg font-bold text-blue-600">{record.confidence}%</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Verified By</p>
                        <p className="text-sm text-gray-600">{record.verifiedBy} validators</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">File Hash</p>
                        <div className="flex items-center gap-2">
                          <code className="text-xs bg-white px-2 py-1 rounded flex-1 truncate">
                            {record.fileHash}
                          </code>
                          <Button variant="ghost" size="sm" onClick={() => copyToClipboard(record.fileHash)}>
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t">
                      <Button variant="outline" size="sm" className="w-full">
                        <Link className="h-4 w-4 mr-2" />
                        View on PolygonScan
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Network Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Blockchain Uptime</span>
                  <span className="text-sm font-medium text-green-600">{stats.blockchainUptime}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Validators</span>
                  <span className="text-sm font-medium">1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Block Time</span>
                  <span className="text-sm font-medium">2.1s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Gas Price</span>
                  <span className="text-sm font-medium">15 Gwei</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Validator Network
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Validators</span>
                  <span className="text-sm font-medium">1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Stakes</span>
                  <span className="text-sm font-medium">${(stats.totalStake / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Consensus Rate</span>
                  <span className="text-sm font-medium text-green-600">99.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Reward Rate</span>
                  <span className="text-sm font-medium">5.2% APY</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 