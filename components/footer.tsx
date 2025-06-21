import Link from "next/link"
import { Shield, Twitter, Github, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
              <span className="text-lg sm:text-xl font-bold">Satya</span>
            </div>
            <p className="text-sm sm:text-base text-gray-400">
              Protecting truth in the age of AI with cutting-edge detection technology.
            </p>
            <div className="flex space-x-4">
              <Twitter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Github className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/detect" className="text-sm sm:text-base text-gray-400 hover:text-white">
                  Detection Tool
                </Link>
              </li>
              <li>
                <Link href="/api-docs" className="text-sm sm:text-base text-gray-400 hover:text-white">
                  API
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm sm:text-base text-gray-400 hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/enterprise" className="text-sm sm:text-base text-gray-400 hover:text-white">
                  Enterprise
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/learn" className="text-sm sm:text-base text-gray-400 hover:text-white">
                  Learning Hub
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-sm sm:text-base text-gray-400 hover:text-white">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-sm sm:text-base text-gray-400 hover:text-white">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm sm:text-base text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-sm sm:text-base text-gray-400 hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm sm:text-base text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm sm:text-base text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm sm:text-base text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-sm sm:text-base text-gray-400">
          <p>&copy; 2024 TruthLens. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
