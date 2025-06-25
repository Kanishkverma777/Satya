import DetectionForm from "@/components/DetectionForm"

export default function DetectPage() {
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
      {/* Minimal nav */}
      <nav style={{
        position: 'absolute',
        top: 32,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap: 32,
        fontSize: 14,
        letterSpacing: 2,
        color: '#aaa',
        zIndex: 2,
      }}>
        <span>[ ACCESS TERMINAL ]</span>
        <span>[ TRANSMISSION LOGS ]</span>
        <span>[ BIO-ARCHIVE ]</span>
        <span>[ INITIATE CONTACT ]</span>
      </nav>
      {/* Central detection card */}
      <div style={{
        width: 400,
        minHeight: 320,
        borderRadius: 32,
        background: 'rgba(30,30,30,0.95)',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 80px 10px #111',
        position: 'relative',
        zIndex: 1,
        padding: 40,
      }}>
        <h2 style={{
          fontSize: 36,
          fontWeight: 200,
          letterSpacing: 8,
          margin: '0 0 24px 0',
          textAlign: 'center',
          color: '#fff',
        }}>
          DETECT AI MEDIA
        </h2>
        <DetectionForm />
      </div>
      {/* Futuristic HUD details (optional) */}
      <div style={{position: 'absolute', left: 32, bottom: 32, color: '#444', fontSize: 12, letterSpacing: 1}}>
        ΔΣ / DATA STREAM: UNFOLDING ∆00.<br />
        SECTOR: ENERGIZED ∆17.<br />
        Θ - DATA FIELD: CONNECTED ∆2A.
      </div>
      <div style={{position: 'absolute', right: 32, bottom: 32, color: '#444', fontSize: 12, letterSpacing: 1}}>
        NODE ACTIVATION COMPLETE. ENERGY CONVERGING
      </div>
    </div>
  )
}
