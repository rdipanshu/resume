import React from "react";
import { motion } from "framer-motion";
import TabLayout from "./TabLayout";
import ExperienceBg from "../backgrounds/ExperienceBg";
import { experience } from "../../data/portfolio";

const ExperienceTab = () => {
  return (
    <TabLayout testId="tab-experience" bg={<ExperienceBg />}>
      <section className="px-6 lg:px-10 pt-32 pb-24 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <div className="section-overline text-indigo-300/80 mb-4">· 02 / Experience</div>
          <h2 className="text-5xl sm:text-6xl font-semibold tracking-tight">
            A glowing trail of work
          </h2>
          <p className="mt-5 text-white/60">Three companies. One operating playbook — cut cost, streamline, ship.</p>
        </div>

        <div className="relative mx-auto max-w-5xl mt-20">
          <div className="exp-line-track">
            <div className="exp-line-fill" style={{ height: "100%" }} />
          </div>

          <div className="space-y-20">
            {experience.map((e, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={e.company}
                  className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="exp-node hidden lg:block absolute left-1/2 top-8 -translate-x-1/2 h-4 w-4 rounded-full bg-indigo-300" />
                  <div className={left ? "lg:pr-16 lg:text-right" : "lg:col-start-2 lg:pl-16"}>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-6 shadow-[0_20px_60px_-30px_rgba(110,168,255,0.6)]">
                      <div className="text-xs font-mono-accent text-indigo-300/80">{e.period}</div>
                      <h3 className="mt-2 text-2xl font-semibold">{e.role}</h3>
                      <div className="text-sky-200/80">{e.company} · {e.location}</div>
                      <ul className={"mt-4 space-y-2 text-sm text-white/70 " + (left ? "lg:list-none" : "")}>
                        {e.points.map((p, j) => (
                          <li key={j} className="leading-relaxed">{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </TabLayout>
  );
};

export default ExperienceTab;
