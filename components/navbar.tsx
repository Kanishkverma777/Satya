"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Shield, User, LogOut, Brain } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Mock auth state
  const pathname = usePathname()

  const navItems = [
    { href: "/detect", label: "Detect" },
  ]

  return (
    <header className="w-full flex justify-center pt-8">
      <nav className="w-full max-w-5xl mx-auto rounded-2xl bg-white/10 backdrop-blur-lg border border-[#23283a] shadow-lg flex items-center px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 mr-8">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-500">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-white tracking-wide">Catech.AI</span>
        </Link>
        {/* Nav Links */}
        <div className="flex-1 flex items-center gap-6">
          <Link href="#features" className="text-gray-200 hover:text-white transition font-medium">Feature</Link>
          <Link href="#about" className="text-gray-200 hover:text-white transition font-medium">About</Link>
          <Link href="#blog" className="text-gray-200 hover:text-white transition font-medium">Blog</Link>
        </div>
        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          <Link href="/signup" className="rounded-md px-5 py-2 bg-white/10 border border-[#23283a] text-white font-medium hover:bg-white/20 transition">Sig Up</Link>
          <Link href="/login" className="rounded-md px-5 py-2 bg-gradient-to-r from-[#7c3aed] to-[#6366f1] text-white font-semibold shadow-lg hover:from-[#6366f1] hover:to-[#7c3aed] transition">Login</Link>
        </div>
      </nav>
    </header>
  )
}
