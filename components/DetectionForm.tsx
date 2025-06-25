"use client"
import React, { useState } from "react"

const mediaTypes = [
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
  { value: "audio", label: "Audio" },
]

function parseDetectionResult(result: any) {
  // Try to extract AI/deepfake probability and type from result
  if (!result) return { prob: null, type: null, raw: null }
  let prob = null
  let type = null
  if (typeof result === "string") {
    try { result = JSON.parse(result) } catch {}
  }
  if (result && typeof result === "object") {
    // Try common keys
    prob = result.probability || result.prob || result.confidence || null
    type = result.type || result.label || result.category || null
    // Try nested
    if (!prob && result.scores) prob = result.scores[0]?.score
    if (!type && result.scores) type = result.scores[0]?.label
  }
  return { prob, type, raw: result }
}

export default function DetectionForm() {
  const [mediaType, setMediaType] = useState("image")
  const [file, setFile] = useState<File | null>(null)
  const [url, setUrl] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setResult(null)
    setError(null)
    setLoading(true)
    try {
      if (file) {
        const formData = new FormData()
        formData.append("file", file)
        const res = await fetch("/api/detect", {
          method: "POST",
          body: formData,
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Detection failed")
        setResult(data.result)
      } else if (url) {
        const res = await fetch("/api/analyze-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Detection failed")
        setResult(data.result)
      } else {
        setError("Please upload a file or paste a URL.")
      }
    } catch (err: any) {
      setError(err.message || "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  // Responsive card width
  const cardWidth = typeof window !== 'undefined' && window.innerWidth < 500 ? '100%' : 400

  // Parse result for dashboard
  const { prob, type, raw } = parseDetectionResult(result)
  const probPercent = prob !== null ? Math.round(Number(prob) * 100) : null
  const isAI = probPercent !== null && probPercent > 50

  return (
    <form onSubmit={handleSubmit} style={{width: '100%'}}>
      {/* Futuristic media type selector */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 16,
        marginBottom: 24,
        flexWrap: 'wrap',
      }}>
        {mediaTypes.map((typeBtn) => (
          <button
            key={typeBtn.value}
            type="button"
            onClick={() => setMediaType(typeBtn.value)}
            style={{
              padding: '10px 28px',
              borderRadius: 18,
              border: mediaType === typeBtn.value ? '2px solid #0ff' : '1px solid #333',
              background: mediaType === typeBtn.value ? 'rgba(0,255,255,0.08)' : '#181818',
              color: mediaType === typeBtn.value ? '#0ff' : '#fff',
              fontWeight: 500,
              fontSize: 16,
              letterSpacing: 2,
              cursor: 'pointer',
              outline: 'none',
              boxShadow: mediaType === typeBtn.value ? '0 0 12px #0ff4' : 'none',
              transition: 'all 0.18s',
              marginBottom: 8,
            }}
          >
            {typeBtn.label}
          </button>
        ))}
      </div>
      {/* File upload */}
      <label htmlFor="file-upload" style={{width: '100%', color: '#aaa', fontSize: 16, letterSpacing: 2, marginBottom: 8}}>Upload File</label>
      <input
        id="file-upload"
        type="file"
        accept={mediaType + "/*"}
        onChange={e => setFile(e.target.files?.[0] || null)}
        style={{
          width: '100%',
          marginBottom: 16,
          color: '#fff',
          background: '#181818',
          border: '1px solid #333',
          borderRadius: 8,
          padding: '8px 0',
        }}
      />
      <div style={{textAlign: 'center', color: '#aaa', fontSize: 14, margin: '8px 0'}}>or</div>
      {/* URL input */}
      <input
        type="text"
        placeholder="Paste media URL..."
        value={url}
        onChange={e => setUrl(e.target.value)}
        style={{
          width: '100%',
          marginBottom: 24,
          padding: '12px 16px',
          borderRadius: 8,
          border: '1px solid #333',
          background: '#181818',
          color: '#fff',
          fontSize: 16,
          outline: 'none',
        }}
      />
      <button type="submit" disabled={loading} style={{
        width: '100%',
        marginTop: 8,
        padding: '12px 36px',
        border: '1px solid #fff',
        borderRadius: 24,
        background: loading ? '#222' : 'transparent',
        color: '#fff',
        fontSize: 18,
        letterSpacing: 2,
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'background 0.2s',
      }}>
        {loading ? 'Analyzing...' : 'ANALYZE'}
      </button>
      {error && <div style={{marginTop: 16, color: '#f55', fontSize: 15, textAlign: 'center'}}>{error}</div>}
      {/* Dashboard result */}
      {result && (
        <div style={{
          marginTop: 32,
          width: '100%',
          maxWidth: 420,
          marginLeft: 'auto',
          marginRight: 'auto',
          background: 'rgba(10,20,30,0.95)',
          borderRadius: 24,
          boxShadow: '0 0 32px #0ff2',
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: isAI ? '2px solid #0ff' : '2px solid #fff',
          transition: 'border 0.2s',
        }}>
          <div style={{fontSize: 22, fontWeight: 600, letterSpacing: 4, color: isAI ? '#0ff' : '#fff', marginBottom: 8}}>
            {isAI ? 'AI/Deepfake Detected' : 'Likely Authentic'}
          </div>
          <div style={{fontSize: 16, color: '#aaa', marginBottom: 16}}>
            Media Type: <span style={{color: '#fff'}}>{mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}</span>
          </div>
          {probPercent !== null && (
            <div style={{width: '100%', maxWidth: 220, margin: '0 auto 16px auto'}}>
              {/* Futuristic bar chart */}
              <svg width="100%" height="32" viewBox="0 0 220 32">
                <rect x="0" y="8" width="220" height="16" rx="8" fill="#222" />
                <rect x="0" y="8" width={2.2 * probPercent} height="16" rx="8" fill={isAI ? '#0ff' : '#0f0'} />
                <text x="110" y="24" textAnchor="middle" fontSize="16" fill="#fff" fontFamily="Orbitron,Arial,sans-serif">
                  {probPercent}% AI
                </text>
              </svg>
            </div>
          )}
          {/* Raw result (collapsible) */}
          <details style={{marginTop: 12, width: '100%', color: '#0ff', fontSize: 13, background: '#111', borderRadius: 10, padding: 10, cursor: 'pointer'}}>
            <summary style={{color: '#fff', fontWeight: 500, fontSize: 15, marginBottom: 6}}>Raw Result</summary>
            <pre style={{overflowX: 'auto', margin: 0}}>{JSON.stringify(raw, null, 2)}</pre>
          </details>
        </div>
      )}
    </form>
  )
} 