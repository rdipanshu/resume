import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { useTheme } from "./ThemeProvider";

// Pseudo-random spread of small wireframe shapes around the viewport.
// Vanilla Three.js (no JSX inside the scene) to avoid dev-mode instrumentation.
const Scene3D = () => {
  const { theme } = useTheme();
  const mountRef = useRef(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ---- Post-processing: bloom ----
    const composer = new EffectComposer(renderer);
    composer.setSize(w, h);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(w, h), 0.55, 0.6, 0.18);
    bloom.strength = 0.45;
    composer.addPass(bloom);

    // ---- Shape factory ----
    const geometries = [
      () => new THREE.IcosahedronGeometry(1, 1),
      () => new THREE.TorusGeometry(1, 0.28, 14, 50),
      () => new THREE.OctahedronGeometry(1, 0),
      () => new THREE.DodecahedronGeometry(1, 0),
      () => new THREE.TorusKnotGeometry(0.8, 0.22, 80, 14),
      () => new THREE.TetrahedronGeometry(1, 0),
      () => new THREE.SphereGeometry(0.9, 12, 8),
    ];

    // Deterministic positions across the canvas, smaller scales
    // 14 shapes, scattered, smaller, varied depths
    const defs = [];
    const seed = 9;
    const rand = (n) => {
      // tiny seeded RNG for stable layout
      let x = Math.sin(n * 12.9898 + seed) * 43758.5453;
      return x - Math.floor(x);
    };
    for (let i = 0; i < 14; i++) {
      const x = (rand(i + 1) - 0.5) * 11; // -5.5..5.5
      const y = (rand(i + 2) - 0.5) * 6;
      const z = -1 - rand(i + 3) * 4;
      const scale = 0.28 + rand(i + 4) * 0.42; // smaller
      const drift = 1.6 + rand(i + 5) * 4;
      const axis = [
        rand(i + 6) * 2 - 1,
        rand(i + 7) * 2 - 1,
        rand(i + 8) * 2 - 1,
      ];
      const speed = 0.3 + rand(i + 9) * 0.7;
      const geomIdx = Math.floor(rand(i + 10) * geometries.length);
      defs.push({ pos: [x, y, z], scale, drift, axis, speed, geomIdx });
    }

    const meshes = defs.map((d) => {
      const m = new THREE.Mesh(
        geometries[d.geomIdx](),
        new THREE.MeshBasicMaterial({
          color: 0x6aa3ff,
          wireframe: true,
          transparent: true,
          opacity: 0.35,
          depthWrite: false,
        })
      );
      m.position.set(...d.pos);
      m.scale.setScalar(d.scale);
      m.userData = {
        basePos: [...d.pos],
        axis: new THREE.Vector3(...d.axis).normalize(),
        drift: d.drift,
        speed: d.speed,
      };
      scene.add(m);
      return m;
    });

    // ---- Mouse parallax ----
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouseMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMouseMove);

    // ---- Scroll progress ----
    let scrollProgress = 0;
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // ---- Resize ----
    const onResize = () => {
      const W = mount.clientWidth;
      const H = mount.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
      composer.setSize(W, H);
      bloom.setSize(W, H);
    };
    window.addEventListener("resize", onResize);

    // ---- Link/button hover boost ----
    let boostTarget = 0;
    let boostCurrent = 0;
    let clickPulse = 0;
    const isInteractive = (el) => {
      if (!el) return false;
      const tag = el.tagName;
      if (tag === "A" || tag === "BUTTON") return true;
      const role = el.getAttribute && el.getAttribute("role");
      return role === "button" || role === "link";
    };
    const onOver = (e) => {
      let el = e.target;
      while (el && el !== document.body) {
        if (isInteractive(el)) {
          boostTarget = 1;
          return;
        }
        el = el.parentElement;
      }
    };
    const onOut = (e) => {
      let el = e.target;
      while (el && el !== document.body) {
        if (isInteractive(el)) {
          boostTarget = 0;
          return;
        }
        el = el.parentElement;
      }
    };
    const onClick = (e) => {
      let el = e.target;
      while (el && el !== document.body) {
        if (isInteractive(el)) {
          clickPulse = 1;
          return;
        }
        el = el.parentElement;
      }
    };
    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("mouseout", onOut, true);
    document.addEventListener("click", onClick, true);

    // ---- Animation loop ----
    const clock = new THREE.Clock();
    let raf;
    const tick = () => {
      const t = clock.getElapsedTime();
      const s = scrollProgress;

      // smooth mouse
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      // camera parallax based on mouse
      camera.position.x = mouse.x * 0.8;
      camera.position.y = mouse.y * 0.5;
      camera.lookAt(0, 0, 0);

      // boost ramps toward target
      boostCurrent += (boostTarget - boostCurrent) * 0.08;
      // click pulse decays
      clickPulse *= 0.93;

      const isDark = themeRef.current === "dark";
      const baseColor = isDark ? new THREE.Color(0x6aa3ff) : new THREE.Color(0x2563eb);
      const hotColor = isDark ? new THREE.Color(0x9bc3ff) : new THREE.Color(0x60a5fa);
      const mixed = baseColor.clone().lerp(hotColor, boostCurrent + clickPulse * 0.6);
      const baseOpacity = isDark ? 0.32 : 0.22;
      const hotOpacity = isDark ? 0.7 : 0.55;
      const opacity = baseOpacity + (hotOpacity - baseOpacity) * (boostCurrent + clickPulse * 0.5);

      meshes.forEach((m) => {
        const { basePos, axis, drift, speed } = m.userData;
        const rot = t * 0.06 * speed + s * Math.PI * 1.8 * speed;
        m.quaternion.setFromAxisAngle(axis, rot);
        m.position.x = basePos[0] + Math.sin(t * 0.4 * speed + basePos[1]) * 0.16 + mouse.x * 0.25;
        m.position.y = basePos[1] + Math.cos(t * 0.5 * speed) * 0.22 - s * drift + mouse.y * 0.18;
        m.position.z = basePos[2];
        m.material.color.copy(mixed);
        m.material.opacity = opacity;
      });

      // bloom intensity reacts to hover + click
      bloom.strength = 0.35 + boostCurrent * 0.9 + clickPulse * 1.4;
      bloom.radius = 0.6 + clickPulse * 0.5;

      composer.render();
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("mouseout", onOut, true);
      document.removeEventListener("click", onClick, true);
      meshes.forEach((m) => {
        m.geometry.dispose();
        m.material.dispose();
      });
      composer.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 no-print"
      style={{ opacity: 0.55 }}
      data-testid="scene-3d"
    />
  );
};

export default Scene3D;
