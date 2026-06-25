import React from "react";
import { useCanvasAnim } from "../../lib/useCanvasAnim";

// Contacts — "The Digital Radar": pulsing rings, rotating sweep, blips, topo contours.
const ContactBg = () => {
  const ref = useCanvasAnim(
    (ctx, s) => {
      s.store.blips = Array.from({ length: 7 }, () => ({
        a: Math.random() * Math.PI * 2,
        r: 0.2 + Math.random() * 0.75,
        seen: 0,
      }));
    },
    (ctx, s) => {
      ctx.clearRect(0, 0, s.w, s.h);
      const cx = s.w / 2;
      const cy = s.h / 2;
      const R = Math.min(s.w, s.h) * 0.46;

      // concentric pulsing rings
      ctx.strokeStyle = "rgba(45,220,150,0.18)";
      ctx.lineWidth = 1;
      for (let i = 1; i <= 5; i++) {
        const pulse = 1 + 0.012 * Math.sin(s.t * 1.4 + i);
        ctx.beginPath();
        ctx.arc(cx, cy, (R / 5) * i * pulse, 0, Math.PI * 2);
        ctx.stroke();
      }
      // crosshair
      ctx.beginPath();
      ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy);
      ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R);
      ctx.stroke();

      // expanding ping
      const ping = (s.t % 3) / 3;
      ctx.strokeStyle = `rgba(45,220,150,${0.35 * (1 - ping)})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, R * ping, 0, Math.PI * 2);
      ctx.stroke();

      // rotating sweep
      const ang = s.t * 1.1;
      const g = ctx.createConicGradient ? ctx.createConicGradient(ang, cx, cy) : null;
      ctx.save();
      if (g) {
        g.addColorStop(0, "rgba(45,220,150,0.32)");
        g.addColorStop(0.08, "rgba(45,220,150,0.05)");
        g.addColorStop(0.2, "rgba(45,220,150,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, R, ang, ang + Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.strokeStyle = "rgba(45,220,150,0.4)";
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(ang) * R, cy + Math.sin(ang) * R);
        ctx.stroke();
      }
      ctx.restore();

      // blips that light up when the sweep passes
      const blips = s.store.blips || [];
      const sweepA = ((ang % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      for (const b of blips) {
        const ba = ((b.a % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        if (Math.abs(ba - sweepA) < 0.06) b.seen = 1;
        b.seen = Math.max(0, b.seen - s.dt * 0.5);
        if (b.seen > 0.02) {
          const bx = cx + Math.cos(b.a) * b.r * R;
          const by = cy + Math.sin(b.a) * b.r * R;
          ctx.fillStyle = `rgba(120,255,190,${b.seen})`;
          ctx.shadowColor = "rgba(45,220,150,0.9)";
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(bx, by, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }
  );

  return (
    <div className="tab-bg radar-base" data-testid="bg-contact">
      <canvas ref={ref} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default ContactBg;
