'use client'
import Spline from '@splinetool/react-spline';

export default function SplineHero() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      <Spline scene="https://my.spline.design/radialglass-H40YeTYxsHCGqLpBnPLtxyCD/" style={{ width: '100vw', height: '100vh' }} />
    </div>
  );
} 