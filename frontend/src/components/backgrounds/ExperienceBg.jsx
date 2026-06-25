import React from "react";
import { useCanvasAnim } from "../../lib/useCanvasAnim";

// Experience — "The Glowing Constellation": starfield + faint grid + sparse shooting stars.
const ExperienceBg = () => {
  const ref = useCanvasAnim(
    (ctx, s) => {
      const n = Math.min(160, Math.floor((s.w * s.h) / 9000));
      s.store.stars = Array.from({ length: n }, () => ({
        x: Math.random() * s.w,
        y: Math.random() * s.h,
        r: Math.random() * 1.4 + 0.3,
        ph: Math.random() * Math.PI * 2,
        sp: 0.5 + Math.random() * 1.6,
      }));
      s.store.shoot = [];
      s.store.nextShoot = 1.2;
    },
    (ctx, s) => {
      ctx.clearRect(0, 0, s.w, s.h);
      const stars = s.store.stars || [];
      for (const st of stars) {
        const tw = 0.5 + 0.5 * Math.sin(s.t * st.sp + st.ph);
        ctx.beginPath();
        ctx.fillStyle = `rgba(150,185,255,${0.25 + tw * 0.6})`;
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fill();
      }
      // shooting stars
      s.store.nextShoot -= s.dt;
      if (s.store.nextShoot <= 0) {
        s.store.nextShoot = 2 + Math.random() * 3.5;
        s.store.shoot.push({ x: Math.random() * s.w, y: Math.random() * s.h * 0.5, life: 0 });
      }
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let i = s.store.shoot.length - 1; i >= 0; i--) {
        const sh = s.store.shoot[i];
        sh.life += s.dt;
        const len = 160;
        const x = sh.x + sh.life * 420;
        const y = sh.y + sh.life * 160;
        if (sh.life > 0.9) { s.store.shoot.splice(i, 1); continue; }
        const g = ctx.createLinearGradient(x - len, y - len * 0.38, x, y);
        g.addColorStop(0, "rgba(120,170,255,0)");
        g.addColorStop(1, `rgba(180,210,255,${0.8 * (1 - sh.life)})`);
        ctx.strokeStyle = g;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x - len, y - len * 0.38);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      ctx.restore();
    }
  );

  return (
    <div className="tab-bg constellation-base" data-testid="bg-experience">
      <div className="constellation-grid" />
      <canvas ref={ref} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default ExperienceBg;
