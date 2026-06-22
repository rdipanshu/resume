import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

// Pure Three.js (no R3F) so dev-mode JSX instrumentation can't interfere.
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
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ---- Shapes ----
    const material = new THREE.MeshBasicMaterial({
      color: 0x6aa3ff,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });

    const defs = [
      { geom: new THREE.IcosahedronGeometry(1, 1),       pos: [ 3.6,  1.2,  0  ], axis: [1, 0.6, 0.3], drift: 2.6, scale: 1.1 },
      { geom: new THREE.TorusGeometry(1, 0.32, 16, 64),  pos: [-3.8, -0.6, -1.2], axis: [0.2, 1, 0.4], drift: 3.4, scale: 1.35 },
      { geom: new THREE.OctahedronGeometry(1.1, 0),      pos: [ 0.2, -2.4, -2  ], axis: [1, 0.2, 0.8], drift: 4.5, scale: 0.9 },
      { geom: new THREE.DodecahedronGeometry(1, 0),      pos: [-2.5,  2.6, -3  ], axis: [0.3, 0.8, 0.2], drift: 5,   scale: 0.55 },
      { geom: new THREE.TorusKnotGeometry(0.8, 0.22, 100, 16), pos: [ 4.2, -2.2, -2.5], axis: [0.4, 0.7, 0.4], drift: 4, scale: 0.65 },
    ];

    const meshes = defs.map((d) => {
      const m = new THREE.Mesh(d.geom, material.clone());
      m.position.set(...d.pos);
      m.scale.setScalar(d.scale);
      m.userData = {
        basePos: [...d.pos],
        axis: new THREE.Vector3(...d.axis).normalize(),
        drift: d.drift,
      };
      scene.add(m);
      return m;
    });

    // ---- Animation ----
    let scrollProgress = 0;
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      const W = mount.clientWidth;
      const H = mount.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let raf;
    const tick = () => {
      const t = clock.getElapsedTime();
      const s = scrollProgress;

      const isDark = themeRef.current === "dark";
      const targetColor = isDark ? 0x6aa3ff : 0x2563eb;
      const targetOpacity = isDark ? 0.55 : 0.32;

      meshes.forEach((m) => {
        const { basePos, axis, drift } = m.userData;
        const rot = t * 0.08 + s * Math.PI * 2.2;
        m.quaternion.setFromAxisAngle(axis, rot);
        m.position.x = basePos[0] + Math.sin(t * 0.5 + basePos[1]) * 0.18;
        m.position.y = basePos[1] + Math.cos(t * 0.6) * 0.25 - s * drift;
        m.position.z = basePos[2];
        m.material.color.setHex(targetColor);
        m.material.opacity = targetOpacity;
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      meshes.forEach((m) => {
        m.geometry.dispose();
        m.material.dispose();
      });
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
      style={{ opacity: 0.85 }}
      data-testid="scene-3d"
    />
  );
};

export default Scene3D;
