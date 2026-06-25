import { useRef, useEffect } from "react";

// Shared canvas animation helper: handles DPR-capped sizing, resize,
// visibility pause and a requestAnimationFrame loop.
// setup(ctx, state) runs on init/resize (build geometry into state.store)
// draw(ctx, state) runs every frame. state = { w, h, dpr, t, dt, store }
export function useCanvasAnim(setup, draw) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const state = { w: 0, h: 0, dpr: 1, t: 0, dt: 0, store: {} };
    let raf = 0;
    let last = performance.now();
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = c.clientWidth || window.innerWidth;
      const h = c.clientHeight || window.innerHeight;
      c.width = Math.max(1, Math.floor(w * dpr));
      c.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      state.w = w;
      state.h = h;
      state.dpr = dpr;
      if (setup) setup(ctx, state);
    };
    resize();

    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      state.t += dt;
      state.dt = dt;
      if (visible) {
        try { draw(ctx, state); } catch (e) { /* no-op */ }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onResize = () => resize();
    const onVis = () => { visible = !document.hidden; };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}
