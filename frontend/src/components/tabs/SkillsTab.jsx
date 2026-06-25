import React, { useMemo } from "react";
import { motion } from "framer-motion";
import TabLayout from "./TabLayout";
import SkillsBg from "../backgrounds/SkillsBg";
import { skills } from "../../data/portfolio";

// Technologies this very website is built with.
const builtWith = {
  category: "Built With · This Site",
  items: ["React", "JavaScript", "Tailwind CSS", "Framer Motion", "FastAPI", "Python", "MongoDB"],
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

const SHAPES = [
  ring(12, 26).concat([{ x: 0, y: 0 }]),
  grid(4, 4, 16),
  triangle(),
  ring(6, 25).concat(ring(6, 12)),
];

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
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 130, damping: 14, delay: i * 0.022 }}
        />
      ))}
    </div>
  );
};

const SkillsTab = () => {
  const categories = [...skills, builtWith];

  return (
    <TabLayout testId="tab-skills" bg={<SkillsBg />}>
      <section className="px-6 lg:px-10 pt-32 pb-32 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <div className="section-overline text-cyan-300/80 mb-4">· 03 / Skills</div>
          <h2 className="text-5xl sm:text-6xl font-semibold tracking-tight">The tech nexus</h2>
          <p className="mt-5 text-white/60">Scroll — watch scattered particles magnetize into form.</p>
        </div>

        <div className="mx-auto max-w-5xl mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map((cat, i) => {
            const isSite = cat.category === builtWith.category;
            const accent = isSite ? "#a78bfa" : "#7dd3fc";
            return (
              <motion.div
                key={cat.category}
                className="glass-card rounded-2xl p-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <ParticleIcon points={SHAPES[i % SHAPES.length]} color={accent} />
                <h3 className="text-lg font-semibold" style={{ color: isSite ? "#c4b5fd" : "#a5f3fc" }}>
                  {cat.category}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cat.items.map((it) => (
                    <span
                      key={it}
                      className="text-xs px-3 py-1.5 rounded-full border"
                      style={
                        isSite
                          ? { borderColor: "rgba(167,139,250,0.3)", background: "rgba(167,139,250,0.06)", color: "rgba(221,214,254,0.95)" }
                          : { borderColor: "rgba(125,211,252,0.25)", background: "rgba(125,211,252,0.05)", color: "rgba(207,250,254,0.9)" }
                      }
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </TabLayout>
  );
};

export default SkillsTab;
