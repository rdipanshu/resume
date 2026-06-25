import React from "react";
import { motion } from "framer-motion";
import TabLayout from "./TabLayout";
import EducationBg from "../backgrounds/EducationBg";
import { education } from "../../data/portfolio";

const EducationTab = () => {
  return (
    <TabLayout testId="tab-education" bg={<EducationBg />}>
      <section className="px-6 lg:px-10 pt-32 pb-32 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <div className="section-overline text-blue-300/80 mb-4">· 04 / Education</div>
          <h2 className="text-5xl sm:text-6xl font-semibold tracking-tight">Blueprint of the foundation</h2>
          <p className="mt-5 text-white/60">Each card is drawn onto the blueprint, then solidifies.</p>
        </div>

        <div className="mx-auto max-w-4xl mt-16 space-y-10">
          {education.map((ed, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={ed.school + i}
                className="relative"
                initial={{ opacity: 0, x: left ? -90 : 90 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="blueprint-card rounded-xl p-6 backdrop-blur-sm relative overflow-hidden">
                  {/* pencil-drawn outline that traces itself, then the text solidifies */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <motion.rect
                      x="0.6" y="0.6" width="98.8" height="98.8" rx="4" fill="none"
                      stroke="rgba(130,175,255,0.85)" strokeWidth="1" vectorEffect="non-scaling-stroke"
                      initial={{ pathLength: 0, opacity: 0.9 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 1.1, ease: "easeInOut" }}
                    />
                  </svg>
                  <motion.div
                    initial={{ opacity: 0, filter: "blur(4px)", y: 8 }}
                    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55, delay: 0.55, ease: "easeOut" }}
                  >
                    <div className="flex items-baseline justify-between gap-4 flex-wrap">
                      <h3 className="text-xl font-semibold text-blue-100">{ed.degree}</h3>
                      <span className="text-xs font-mono-accent text-blue-300/70">{ed.period}</span>
                    </div>
                    <div className="mt-1 text-blue-200/80">{ed.school}</div>
                    {ed.note && <p className="mt-3 text-sm text-white/60 leading-relaxed">{ed.note}</p>}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </TabLayout>
  );
};

export default EducationTab;
