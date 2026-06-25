import React, { forwardRef, useImperativeHandle, useRef, useEffect } from "react";

// Canvas layer that draws the fire-front: glowing band, rising embers and smoke.
// Driven imperatively by the TransitionProvider via start()/render(p)/stop().
const MAX_EMBERS = 700;

const BurnLayer = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const size = useRef({ w: 0, h: 0 });
  const embers = useRef([]);
  const smoke = useRef([]);

  const resize = () => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    c.width = Math.floor(w * dpr);
    c.height = Math.floor(h * dpr);
    c.style.width = w + "px";
    c.style.height = h + "px";
    const ctx = c.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctxRef.current = ctx;
    size.current = { w, h };
  };

  // endpoints where the line x + y = C crosses the viewport box
  const frontPoints = (C, w, h) => {
    const pts = [];
    const add = (x, y) => { if (x >= -1 && x <= w + 1 && y >= -1 && y <= h + 1) pts.push([x, y]); };
    add(0, C);          // x = 0
    add(w, C - w);      // x = w
    add(C, 0);          // y = 0
    add(C - h, h);      // y = h
    return pts.slice(0, 2);
  };

  useImperativeHandle(ref, () => ({
    start() {
      resize();
      embers.current = [];
      smoke.current = [];
      const ctx = ctxRef.current;
      if (ctx) ctx.clearRect(0, 0, size.current.w, size.current.h);
    },
    render(p) {
      const ctx = ctxRef.current;
      if (!ctx) return;
      const { w, h } = size.current;
      ctx.clearRect(0, 0, w, h);

      const C = (w + h) * (1 - p);
      const pts = frontPoints(C, w, h);

      // spawn embers + smoke along the active front (taper near the end)
      if (pts.length === 2 && p < 0.98) {
        const [a, b] = pts;
        const intensity = Math.sin(Math.min(1, p * 1.2) * Math.PI) * 0.9 + 0.2;
        const spawn = Math.floor(26 * intensity);
        for (let i = 0; i < spawn; i++) {
          const r = Math.random();
          const x = a[0] + (b[0] - a[0]) * r + (Math.random() - 0.5) * 26;
          const y = a[1] + (b[1] - a[1]) * r + (Math.random() - 0.5) * 26;
          if (embers.current.length < MAX_EMBERS) {
            embers.current.push({
              x, y,
              vx: -20 - Math.random() * 60,
              vy: -40 - Math.random() * 110,
              life: 0,
              max: 0.6 + Math.random() * 0.9,
              size: 1 + Math.random() * 2.4,
              hue: 20 + Math.random() * 35,
            });
          }
          if (Math.random() < 0.12) {
            smoke.current.push({
              x, y,
              vx: -10 - Math.random() * 25,
              vy: -25 - Math.random() * 45,
              life: 0,
              max: 1.2 + Math.random() * 1.2,
              r: 18 + Math.random() * 34,
            });
          }
        }
      }

      // smoke (drawn first, behind embers)
      ctx.save();
      ctx.globalCompositeOperation = "source-over";
      for (let i = smoke.current.length - 1; i >= 0; i--) {
        const s = smoke.current[i];
        s.life += 0.016;
        s.x += s.vx * 0.016;
        s.y += s.vy * 0.016;
        s.r += 18 * 0.016;
        const k = s.life / s.max;
        if (k >= 1) { smoke.current.splice(i, 1); continue; }
        const alpha = 0.22 * (1 - k);
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r);
        g.addColorStop(0, `rgba(25,20,18,${alpha})`);
        g.addColorStop(1, "rgba(25,20,18,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // glowing front band
      if (pts.length === 2 && p < 0.99) {
        const [a, b] = pts;
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.lineCap = "round";
        ctx.strokeStyle = "rgba(255,140,30,0.55)";
        ctx.shadowColor = "rgba(255,120,20,0.9)";
        ctx.shadowBlur = 34;
        ctx.lineWidth = 14;
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
        ctx.strokeStyle = "rgba(255,235,150,0.9)";
        ctx.shadowBlur = 16;
        ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
        ctx.restore();
      }

      // embers
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let i = embers.current.length - 1; i >= 0; i--) {
        const e = embers.current[i];
        e.life += 0.016;
        e.vy += 30 * 0.016; // slight buoyancy decay -> falls a touch
        e.x += e.vx * 0.016;
        e.y += e.vy * 0.016;
        const k = e.life / e.max;
        if (k >= 1) { embers.current.splice(i, 1); continue; }
        const alpha = 1 - k;
        const sz = e.size * (1 - k * 0.5);
        ctx.fillStyle = `hsla(${e.hue}, 100%, ${60 + 20 * (1 - k)}%, ${alpha})`;
        ctx.shadowColor = `hsla(${e.hue}, 100%, 55%, ${alpha})`;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(e.x, e.y, sz, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // warm ambient flash that fades as paper disappears
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = `rgba(255,90,20,${0.05 * Math.sin(p * Math.PI)})`;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    },
    stop() {
      const ctx = ctxRef.current;
      if (ctx) ctx.clearRect(0, 0, size.current.w, size.current.h);
      embers.current = [];
      smoke.current = [];
    },
  }));

  useEffect(() => {
    const onR = () => resize();
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);

  return <canvas ref={canvasRef} className="burn-canvas" data-testid="burn-canvas" />;
});

export default BurnLayer;
