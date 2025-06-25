'use client'

export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      color: '#fff',
      fontFamily: 'Orbitron, Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Modern Glassmorphism Navbar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 1000,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}>
        {/* Left side - Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <img src="/logo.png" alt="Satya Logo" style={{ width: 40, height: 40, borderRadius: 8, boxShadow: '0 0 20px rgba(0, 102, 255, 0.5)', background: 'rgba(0,0,0,0.2)', objectFit: 'cover' }} />
          <span style={{
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: 2,
            color: '#fff',
            fontFamily: 'Orbitron, Arial, sans-serif',
          }}>
            SATYA
          </span>
        </div>

        {/* Right side - Auth buttons */}
        <div style={{
          display: 'flex',
          gap: 16,
          alignItems: 'center',
          marginRight: 32,
        }}>
          <button style={{
            padding: '10px 24px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: 12,
            color: '#fff',
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: 1,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            fontFamily: 'Orbitron, Arial, sans-serif',
          }}>
            Sign In
          </button>
          <button style={{
            padding: '10px 24px',
            background: 'linear-gradient(135deg, #0066ff, #00ffff)',
            border: 'none',
            borderRadius: 12,
            color: '#fff',
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: 1,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: 'Orbitron, Arial, sans-serif',
          }}>
            Login
          </button>
        </div>
      </nav>

      {/* Large thin text */}
      <h1 style={{
        fontSize: 72,
        fontWeight: 200,
        letterSpacing: 16,
        margin: '32px 0 0 0',
        textAlign: 'center',
        color: '#fff',
        zIndex: 2,
      }}>
        SATYA
      </h1>
      <div style={{marginTop: 16, color: '#aaa', fontSize: 16, letterSpacing: 2, textAlign: 'center', zIndex: 2}}>
        TRUTH IN PIXELS. REALITY VERIFIED.
      </div>
      <a href="/detect" style={{
        display: 'inline-block',
        marginTop: 32,
        padding: '12px 36px',
        border: '1px solid #fff',
        borderRadius: 24,
        background: 'transparent',
        color: '#fff',
        fontSize: 18,
        letterSpacing: 2,
        cursor: 'pointer',
        transition: 'background 0.2s',
        textDecoration: 'none',
        textAlign: 'center',
        marginRight: 16,
        zIndex: 2,
      }}>
        START DETECTION
      </a>
      {/* Futuristic HUD details (optional) */}
      <div style={{position: 'absolute', left: 32, bottom: 32, color: '#444', fontSize: 12, letterSpacing: 1, zIndex: 2}}>
        ΔΣ / DATA STREAM: UNFOLDING ∆00.<br />
        SECTOR: ENERGIZED ∆17.<br />
        Θ - DATA FIELD: CONNECTED ∆2A.
      </div>
      <div style={{position: 'absolute', right: 32, bottom: 32, color: '#444', fontSize: 12, letterSpacing: 1, zIndex: 2}}>
        NODE ACTIVATION COMPLETE. ENERGY CONVERGING
      </div>
    </div>
  )
}
