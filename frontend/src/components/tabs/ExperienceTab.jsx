import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import TabLayout from "./TabLayout";
import ExperienceBg from "../backgrounds/ExperienceBg";
import { experience } from "../../data/portfolio";

const ExperienceTab = () => {
  const trackRef = useRef(null);
  // glowing line draws itself down the centre as you scroll through the timeline
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 65%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.5 });

  return (
    <TabLayout testId="tab-experience" bg={<ExperienceBg />}>
      <section className="px-6 lg:px-10 pt-32 pb-32 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <div className="section-overline text-indigo-300/80 mb-4">· 02 / Experience</div>
          <h2 className="text-5xl sm:text-6xl font-semibold tracking-tight">A glowing trail of work</h2>
          <p className="mt-5 text-white/60">Three companies. One operating playbook — cut cost, streamline, ship.</p>
        </div>

        <div ref={trackRef} className="relative mx-auto max-w-5xl mt-24">
          <div className="exp-line-track">
            <motion.div
              className="exp-line-fill"
              style={{ height: "100%", scaleY, transformOrigin: "top" }}
            />
          </div>

          <div className="space-y-24">
            {experience.map((e, i) => {
              const left = i % 2 === 0;
              return (
                <div key={e.company} className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* node snaps into place when it reaches the centre of the screen */}
                  <motion.span
                    className="exp-node hidden lg:block absolute left-1/2 top-8 -translate-x-1/2 h-4 w-4 rounded-full bg-indigo-300 z-10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-48% 0px -48% 0px" }}
                    transition={{ type: "spring", stiffness: 340, damping: 13 }}
                  />
                  <motion.div
                    className={left ? "lg:pr-16 lg:text-right" : "lg:col-start-2 lg:pl-16"}
                    initial={{ opacity: 0, x: left ? -60 : 60, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-30% 0px -25% 0px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="rounded-2xl border border-indigo-300/20 bg-white/[0.04] backdrop-blur-md p-6 shadow-[0_0_50px_-12px_rgba(110,168,255,0.55)]">
                      <div className="text-xs font-mono-accent text-indigo-300/80">{e.period}</div>
                      <h3 className="mt-2 text-2xl font-semibold">{e.role}</h3>
                      <div className="text-sky-200/80">{e.company} · {e.location}</div>
                      <ul className="mt-4 space-y-2 text-sm text-white/70">
                        {e.points.map((p, j) => (
                          <li key={j} className="leading-relaxed">{p}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </TabLayout>
  );
};

export default ExperienceTab;
