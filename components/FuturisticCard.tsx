import React from 'react';

export default function FuturisticCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-futuristic-bg bg-opacity-80 rounded-xl p-6 shadow-futuristic border border-futuristic-accent relative overflow-hidden my-8">
      <div className="absolute inset-0 pointer-events-none animate-pulse"
        style={{
          boxShadow: '0 0 40px 10px #00ffe7, 0 0 80px 20px #7c3aed',
          opacity: 0.2,
        }}
      />
      <div className="relative z-10 text-futuristic-accent font-semibold text-lg">
        {children}
      </div>
    </div>
  );
}