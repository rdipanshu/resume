import React from "react";
import { useCanvasAnim } from "../../lib/useCanvasAnim";

// Skills — "The Tech Nexus": drifting particle network (nodes + proximity links).
const SkillsBg = () => {
  const ref = useCanvasAnim(
    (ctx, s) => {
      const n = Math.min(80, Math.floor((s.w * s.h) / 22000));
      s.store.nodes = Array.from({ length: n }, () => ({
        x: Math.random() * s.w,
        y: Math.random() * s.h,
        vx: (Math.random() - 0.5) * 26,
        vy: (Math.random() - 0.5) * 26,
      }));
    },
    (ctx, s) => {
      ctx.clearRect(0, 0, s.w, s.h);
      const nodes = s.store.nodes || [];
      const maxD = 150;
      for (const p of nodes) {
        p.x += p.vx * s.dt;
        p.y += p.vy * s.dt;
        if (p.x < 0 || p.x > s.w) p.vx *= -1;
        if (p.y < 0 || p.y > s.h) p.vy *= -1;
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < maxD) {
            const al = (1 - d / maxD) * 0.5;
            ctx.strokeStyle = `rgba(56,189,248,${al})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of nodes) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(125,211,252,0.9)";
        ctx.shadowColor = "rgba(56,189,248,0.8)";
        ctx.shadowBlur = 8;
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    }
  );

  return (
    <div className="tab-bg nexus-base" data-testid="bg-skills">
      <canvas ref={ref} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default SkillsBg;
