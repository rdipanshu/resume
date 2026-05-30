import React from "react";

// Subtle futuristic background: grid + glowing orbs + scan line + noise
export const FuturisticBg = ({ className = "" }) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 futuristic-grid" />
      <div className="glow-orb glow-orb-1 animate-float-slow top-[-120px] left-[-60px] h-[420px] w-[420px]" />
      <div className="glow-orb glow-orb-2 animate-float-slow-2 top-[40%] right-[-100px] h-[360px] w-[360px]" />
      <div className="scan-line opacity-40" />
      <div className="noise" />
    </div>
  );
};

export default FuturisticBg;
