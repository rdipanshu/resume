import React from "react";
import { motion } from "framer-motion";
import TabLayout from "./TabLayout";
import EducationBg from "../backgrounds/EducationBg";
import { education } from "../../data/portfolio";

const EducationTab = () => {
  return (
    <TabLayout testId="tab-education" bg={<EducationBg />}>
      <section className="px-6 lg:px-10 pt-32 pb-28 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <div className="section-overline text-blue-300/80 mb-4">· 04 / Education</div>
          <h2 className="text-5xl sm:text-6xl font-semibold tracking-tight">Blueprint of the foundation</h2>
          <p className="mt-5 text-white/60">The structure beneath the operator.</p>
        </div>

        <div className="mx-auto max-w-4xl mt-16 space-y-8">
          {education.map((ed, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={ed.school + i}
                className="blueprint-card rounded-xl p-6 backdrop-blur-sm"
                initial={{ opacity: 0, x: left ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <h3 className="text-xl font-semibold text-blue-100">{ed.degree}</h3>
                  <span className="text-xs font-mono-accent text-blue-300/70">{ed.period}</span>
                </div>
                <div className="mt-1 text-blue-200/80">{ed.school}</div>
                {ed.note && <p className="mt-3 text-sm text-white/60 leading-relaxed">{ed.note}</p>}
              </motion.div>
            );
          })}
        </div>
      </section>
    </TabLayout>
  );
};

export default EducationTab;
