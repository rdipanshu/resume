import React, { useMemo } from "react";
import { motion } from "framer-motion";
import TabLayout from "./TabLayout";
import SkillsBg from "../backgrounds/SkillsBg";
import { skills } from "../../data/portfolio";

const proficiency = {
  Python: 92, JavaScript: 88, TypeScript: 82, Go: 70, Rust: 64, Java: 75, SQL: 85,
};

// shape generators (points relative to centre, ~ -32..32)
const ring = (n, r) =>
  Array.from({ length: n }, (_, i) => ({
    x: Math.cos((i / n) * Math.PI * 2) * r,
    y: Math.sin((i / n) * Math.PI * 2) * r,
  }));
const grid = (cols, rows, gap) => {
  const pts = [];
  const ox = -((cols - 1) * gap) / 2;
  const oy = -((rows - 1) * gap) / 2;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) pts.push({ x: ox + c * gap, y: oy + r * gap });
  return pts;
};
const triangle = () => {
  const A = { x: 0, y: -28 }, B = { x: -28, y: 24 }, C = { x: 28, y: 24 };
  const lerp = (p, q, t) => ({ x: p.x + (q.x - p.x) * t, y: p.y + (q.y - p.y) * t });
  const pts = [];
  for (let t = 0; t <= 1.0001; t += 0.2) {
    pts.push(lerp(A, B, t));
    pts.push(lerp(B, C, t));
    pts.push(lerp(C, A, t));
  }
  return pts;
};

const SHAPES = [ring(12, 26).concat([{ x: 0, y: 0 }]), grid(4, 4, 16), triangle()];

// scattered particles that magnetize together into a solid icon on scroll-in
const ParticleIcon = ({ points, color = "#7dd3fc" }) => {
  const scatter = useMemo(
    () => points.map(() => ({ dx: (Math.random() - 0.5) * 150, dy: (Math.random() - 0.5) * 150 })),
    [points]
  );
  return (
    <div className="relative mb-5" style={{ width: 84, height: 84 }}>
      {points.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: 42 + p.x - 2.5,
            top: 42 + p.y - 2.5,
            width: 5,
            height: 5,
            background: color,
            boxShadow: `0 0 9px ${color}`,
          }}
          initial={{ x: scatter[i].dx, y: scatter[i].dy, opacity: 0 }}
          whileInView={{ x: 0, y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 130, damping: 14, delay: i * 0.022 }}
        />
      ))}
    </div>
  );
};

const SkillsTab = () => {
  return (
    <TabLayout testId="tab-skills" bg={<SkillsBg />}>
      <section className="px-6 lg:px-10 pt-32 pb-32 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <div className="section-overline text-cyan-300/80 mb-4">· 03 / Skills</div>
          <h2 className="text-5xl sm:text-6xl font-semibold tracking-tight">The tech nexus</h2>
          <p className="mt-5 text-white/60">Scroll — watch scattered particles magnetize into form.</p>
        </div>

        <div className="mx-auto max-w-6xl mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {skills.map((cat, i) => (
            <motion.div
              key={cat.category}
              className="glass-card rounded-2xl p-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <ParticleIcon points={SHAPES[i % SHAPES.length]} />
              <h3 className="text-lg font-semibold text-cyan-200">{cat.category}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.items.map((it) => (
                  <span key={it} className="text-xs px-3 py-1.5 rounded-full border border-cyan-300/25 bg-cyan-300/5 text-cyan-100/90">
                    {it}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto max-w-3xl mt-20">
          <h3 className="text-sm font-mono-accent text-cyan-300/70 mb-6">Language proficiency</h3>
          <div className="space-y-5">
            {skills[0].items.map((lang, i) => (
              <div key={lang}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-white/85">{lang}</span>
                  <span className="text-cyan-300/80">{proficiency[lang] ?? 70}%</span>
                </div>
                <div className="skill-track">
                  <motion.div
                    className="skill-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${proficiency[lang] ?? 70}%` }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 1.1, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </TabLayout>
  );
};

export default SkillsTab;
