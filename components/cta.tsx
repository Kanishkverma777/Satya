import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Detect AI-Generated Media?</h2>
        <p className="text-xl text-blue-100 mb-8">Join thousands of users protecting themselves from AI manipulation</p>
        <Link href="/detect">
          <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
            Start Free Detection
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
