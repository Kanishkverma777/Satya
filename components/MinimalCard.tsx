import React from "react";

export default function MinimalCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-futuristic-accent rounded-xl shadow-futuristic p-8 mb-8 transition hover:shadow-lg">
      {children}
    </div>
  );
}