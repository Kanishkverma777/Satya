import { BlockchainVerification } from "@/components/blockchain-verification"

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Blockchain Verification
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            Verify detection results on the Polygon blockchain for complete transparency and immutability
          </p>
        </div>
        
        <BlockchainVerification />
      </div>
    </div>
  )
} 