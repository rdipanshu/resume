import React from "react";
import { motion } from "framer-motion";
import TabLayout from "./TabLayout";
import AboutBg from "../backgrounds/AboutBg";
import { profile, about } from "../../data/portfolio";

const fadeFloat = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const AboutTab = () => {
  return (
    <TabLayout testId="tab-about" bg={<AboutBg />}>
      <section className="min-h-screen flex items-center px-6 lg:px-10 pt-28 pb-20">
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-white">
          <motion.div
            className="lg:col-span-7"
            initial="hidden"
            animate="show"
            variants={fadeFloat}
          >
            <div className="section-overline text-sky-300/80 mb-5">· 01 / About</div>
            <h1 className="font-[var(--font-heading)] text-6xl sm:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.95]">
              {profile.firstName}
              <br />
              <span className="text-white/55">{profile.lastName}</span>
            </h1>
            <p className="mt-6 text-lg text-sky-100/70 max-w-xl">{profile.tagline}</p>
            <div className="mt-4 inline-flex items-center gap-2 text-xs font-mono-accent text-emerald-300/80">
              <span className="h-2 w-2 rounded-full bg-emerald-400 timeline-dot" />
              {profile.availability}
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img src={profile.portrait} alt={profile.firstName} className="w-full h-[420px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060912] via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-28">
        <div className="mx-auto max-w-5xl text-white">
          {about.body.map((p, i) => (
            <motion.p
              key={i}
              className="text-2xl sm:text-3xl leading-relaxed text-white/80 mb-8 font-light"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              custom={i}
              variants={fadeFloat}
            >
              {p}
            </motion.p>
          ))}

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5">
            {about.stats.map((st, i) => (
              <motion.div
                key={st.label}
                className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                custom={i}
                variants={fadeFloat}
              >
                <div className="text-3xl font-semibold text-sky-300">{st.value}</div>
                <div className="mt-2 text-xs text-white/55 leading-snug">{st.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </TabLayout>
  );
};

export default AboutTab;
