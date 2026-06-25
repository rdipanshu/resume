import React from "react";
import { useCanvasAnim } from "../../lib/useCanvasAnim";

// Education — "The Architectural Blueprint": moving grid + drifting geometric measurements.
const EducationBg = () => {
  const ref = useCanvasAnim(
    (ctx, s) => {
      s.store.shapes = Array.from({ length: 5 }, (_, i) => ({
        x: Math.random() * s.w,
        y: Math.random() * s.h,
        r: 60 + Math.random() * 140,
        rot: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.15,
        sides: 0,
      }));
    },
    (ctx, s) => {
      ctx.clearRect(0, 0, s.w, s.h);
      ctx.strokeStyle = "rgba(130,175,255,0.22)";
      ctx.lineWidth = 1;
      const shapes = s.store.shapes || [];
      for (const sh of shapes) {
        sh.rot += sh.spin * s.dt;
        ctx.save();
        ctx.translate(sh.x, sh.y);
        ctx.rotate(sh.rot);
        // concentric measurement circle
        ctx.beginPath();
        ctx.arc(0, 0, sh.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, sh.r * 0.6, 0, Math.PI * 2);
        ctx.stroke();
        // crosshair ticks
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
          const x1 = Math.cos(a) * sh.r;
          const y1 = Math.sin(a) * sh.r;
          const x2 = Math.cos(a) * (sh.r + 10);
          const y2 = Math.sin(a) * (sh.r + 10);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
        ctx.restore();
      }
    }
  );

  return (
    <div className="tab-bg blueprint-base" data-testid="bg-education">
      <div className="blueprint-grid" />
      <canvas ref={ref} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default EducationBg;
