import React from "react";
import { useCanvasAnim } from "../../lib/useCanvasAnim";

// About — "The Dynamic Canvas": slow liquid gradient + drifting dust.
const AboutBg = () => {
  const ref = useCanvasAnim(
    (ctx, s) => {
      const n = Math.min(70, Math.floor((s.w * s.h) / 26000));
      s.store.dust = Array.from({ length: n }, () => ({
        x: Math.random() * s.w,
        y: Math.random() * s.h,
        r: 0.5 + Math.random() * 1.6,
        sp: 4 + Math.random() * 12,
        a: 0.1 + Math.random() * 0.35,
      }));
    },
    (ctx, s) => {
      ctx.clearRect(0, 0, s.w, s.h);
      const dust = s.store.dust || [];
      ctx.save();
      for (const d of dust) {
        d.y -= d.sp * s.dt;
        d.x += Math.sin((s.t + d.y) * 0.3) * 0.3;
        if (d.y < -5) { d.y = s.h + 5; d.x = Math.random() * s.w; }
        ctx.beginPath();
        ctx.fillStyle = `rgba(150,180,255,${d.a})`;
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  );

  return (
    <div className="tab-bg about-base" data-testid="bg-about">
      <div className="liquid-orb" style={{ width: "48vw", height: "48vw", left: "-8vw", top: "-6vw", background: "radial-gradient(circle, rgba(59,130,246,0.55), transparent 62%)", animation: "float-orb-a 18s ease-in-out infinite" }} />
      <div className="liquid-orb" style={{ width: "42vw", height: "42vw", right: "-6vw", top: "18vh", background: "radial-gradient(circle, rgba(168,85,247,0.45), transparent 62%)", animation: "float-orb-b 22s ease-in-out infinite" }} />
      <div className="liquid-orb" style={{ width: "40vw", height: "40vw", left: "24vw", bottom: "-12vw", background: "radial-gradient(circle, rgba(14,165,233,0.4), transparent 62%)", animation: "float-orb-a 26s ease-in-out infinite" }} />
      <canvas ref={ref} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default AboutBg;
