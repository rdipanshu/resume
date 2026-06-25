import React from "react";
import { motion } from "framer-motion";
import TabLayout from "./TabLayout";
import SkillsBg from "../backgrounds/SkillsBg";
import { skills } from "../../data/portfolio";

// Illustrative proficiency for the fluid bars (visual only — tweakable).
const proficiency = {
  Python: 92, JavaScript: 88, TypeScript: 82, Go: 70, Rust: 64, Java: 75, SQL: 85,
};

const SkillsTab = () => {
  return (
    <TabLayout testId="tab-skills" bg={<SkillsBg />}>
      <section className="px-6 lg:px-10 pt-32 pb-28 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <div className="section-overline text-cyan-300/80 mb-4">· 03 / Skills</div>
          <h2 className="text-5xl sm:text-6xl font-semibold tracking-tight">The tech nexus</h2>
          <p className="mt-5 text-white/60">Where field operations meet a developer&rsquo;s toolkit.</p>
        </div>

        <div className="mx-auto max-w-6xl mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {skills.map((cat, i) => (
            <motion.div
              key={cat.category}
              className="glass-card rounded-2xl p-6"
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
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

        <div className="mx-auto max-w-3xl mt-16">
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
                    transition={{ duration: 1.1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
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
