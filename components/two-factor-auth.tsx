"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Shield, Smartphone, Key, CheckCircle, AlertTriangle } from "lucide-react"

export function TwoFactorAuth() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [secret, setSecret] = useState<string | null>(null)
  const [verificationCode, setVerificationCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [step, setStep] = useState<"setup" | "verify" | "complete">("setup")

  const enable2FA = async () => {
    try {
      // Mock QR code generation
      const service = "Satya"
      const mockQrCode = "/placeholder.svg?height=200&width=200"
      const mockSecret = "JBSWY3DPEHPK3PXP"

      setQrCode(mockQrCode)
      setSecret(mockSecret)
      setStep("verify")
    } catch (error) {
      console.error("Failed to enable 2FA:", error)
    }
  }

  const verify2FA = async () => {
    if (!verificationCode || verificationCode.length !== 6) return

    setIsVerifying(true)
    try {
      // Mock verification - accept any 6-digit code
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIs2FAEnabled(true)
      setStep("complete")
    } catch (error) {
      console.error("2FA verification failed:", error)
    } finally {
      setIsVerifying(false)
    }
  }

  const disable2FA = async () => {
    setIs2FAEnabled(false)
    setStep("setup")
    setQrCode(null)
    setSecret(null)
    setVerificationCode("")
  }

  if (is2FAEnabled && step === "complete") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Two-Factor Authentication
            <Badge className="bg-green-600">Enabled</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription>Two-factor authentication is active and protecting your account.</AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium">Authenticator App</div>
                  <div className="text-sm text-gray-500">Google Authenticator, Authy, etc.</div>
                </div>
              </div>
              <Badge variant="outline">Active</Badge>
            </div>

            <Button variant="outline" onClick={disable2FA} className="w-full">
              Disable Two-Factor Authentication
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Two-Factor Authentication
          <Badge variant="outline">Disabled</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === "setup" && (
          <>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Add an extra layer of security to your account by enabling two-factor authentication.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <Smartphone className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium mb-1">Step 1: Install an Authenticator App</div>
                  <div className="text-sm text-gray-600">
                    Download Google Authenticator, Authy, or another TOTP app on your phone.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <Key className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium mb-1">Step 2: Scan QR Code</div>
                  <div className="text-sm text-gray-600">
                    Use your authenticator app to scan the QR code we'll generate.
                  </div>
                </div>
              </div>

              <Button onClick={enable2FA} className="w-full">
                Enable Two-Factor Authentication
              </Button>
            </div>
          </>
        )}

        {step === "verify" && qrCode && (
          <>
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold">Scan QR Code</h3>
              <div className="flex justify-center">
                <img src={qrCode || "/placeholder.svg"} alt="2FA QR Code" className="border rounded-lg" />
              </div>

              {secret && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium mb-2">Manual Entry Key:</div>
                  <code className="text-xs break-all">{secret}</code>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Enter verification code from your authenticator app:
                </label>
                <Input
                  type="text"
                  placeholder="000000"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="text-center text-lg tracking-widest"
                  maxLength={6}
                />
              </div>

              <Button onClick={verify2FA} disabled={verificationCode.length !== 6 || isVerifying} className="w-full">
                {isVerifying ? "Verifying..." : "Verify and Enable"}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
