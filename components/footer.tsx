import Link from "next/link"
import { Shield, Twitter, Github, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#181c25] text-[#f3f4f6] border-t border-[#23283a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400" />
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Satya</span>
            </div>
            <p className="text-sm sm:text-base text-[#64748b]">
              Protecting truth in the age of AI with cutting-edge detection technology.
            </p>
            <div className="flex space-x-4">
              <Twitter className="h-4 w-4 sm:h-5 sm:w-5 text-[#64748b] hover:text-cyan-400 cursor-pointer" />
              <Github className="h-4 w-4 sm:h-5 sm:w-5 text-[#64748b] hover:text-cyan-400 cursor-pointer" />
              <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-[#64748b] hover:text-cyan-400 cursor-pointer" />
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#f3f4f6]">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/detect" className="text-sm sm:text-base text-[#64748b] hover:text-cyan-400">
                  Detection Tool
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm sm:text-base text-[#64748b] hover:text-cyan-400">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/enterprise" className="text-sm sm:text-base text-[#64748b] hover:text-cyan-400">
                  Enterprise
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#f3f4f6]">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/leaderboard" className="text-sm sm:text-base text-[#64748b] hover:text-cyan-400">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm sm:text-base text-[#64748b] hover:text-cyan-400">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#f3f4f6]">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-sm sm:text-base text-[#64748b] hover:text-cyan-400">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm sm:text-base text-[#64748b] hover:text-cyan-400">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm sm:text-base text-[#64748b] hover:text-cyan-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm sm:text-base text-[#64748b] hover:text-cyan-400">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#23283a] mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-sm sm:text-base text-[#64748b]">
          <p>&copy; 2024 Satya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
