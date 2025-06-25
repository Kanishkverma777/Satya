import type React from "react"
import type { Metadata } from "next"
import VantaHaloBackground from "@/components/VantaHaloBackground"

export const metadata: Metadata = {
  title: "Satya - AI Media Detection Platform",
  description: "Detect AI-generated and manipulated media with cutting-edge technology",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{margin:0, padding:0, color:'#fff', fontFamily:'Orbitron, Arial, sans-serif', position:'relative', minHeight:'100vh', overflow:'hidden'}}>
        <VantaHaloBackground />
        {children}
      </body>
    </html>
  )
}
