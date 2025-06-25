'use client'
import { useEffect, useRef } from 'react'

export default function VantaHaloBackground() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const vantaEffect = useRef<any>(null)

  useEffect(() => {
    const initVanta = async () => {
      try {
        // Dynamically import to avoid SSR issues
        const THREE = await import('three')
        // @ts-ignore
        const HALO = (await import('vanta/dist/vanta.halo.min.js')).default

        if (!vantaEffect.current && vantaRef.current) {
          vantaEffect.current = HALO({
            el: vantaRef.current,
            THREE,
            mouseControls: true,
            touchControls: true,
            minHeight: 200.00,
            minWidth: 200.00,
            baseColor: 0x0066ff,
            backgroundColor: 0x000000,
            amplitudeFactor: 2.0,
            xOffset: 0.0,
            yOffset: 0.0,
            size: 2.218,
            gyroControls: false,
            vantaTop: 0,
            vantaBottom: 0,
            vantaLeft: 0,
            vantaRight: 0,
          })
        }
      } catch (error) {
        console.warn('Vanta HALO failed to load:', error)
        // Fallback: create a simple animated background
        if (vantaRef.current) {
          vantaRef.current.style.background = 'linear-gradient(45deg, #000000, #001122, #000000)'
          vantaRef.current.style.backgroundSize = '400% 400%'
          vantaRef.current.style.animation = 'gradientShift 8s ease infinite'
        }
      }
    }

    initVanta()

    return () => {
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy()
        } catch (error) {
          console.warn('Error destroying Vanta effect:', error)
        }
      }
    }
  }, [])

  return (
    <>
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <div
        ref={vantaRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          pointerEvents: 'none',
          overflow: 'hidden',
          opacity: 0.8,
        }}
      />
    </>
  )
} 