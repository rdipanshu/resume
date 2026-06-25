import React from "react";
import { motion } from "framer-motion";
import TabLayout from "./TabLayout";
import WordsBg from "../backgrounds/WordsBg";
import { testimonials } from "../../data/portfolio";

const WordsTab = () => {
  return (
    <TabLayout testId="tab-words" bg={<WordsBg />}>
      <section className="px-6 lg:px-10 pt-32 pb-28" style={{ color: "#16130d" }}>
        <div className="mx-auto max-w-3xl">
          <div className="section-overline mb-4" style={{ color: "#9a3b2e" }}>· 05 / Words</div>
          <h2 className="np-serif text-6xl sm:text-7xl font-black tracking-tight leading-[0.95]">
            What people<br />say.
          </h2>
        </div>

        <div className="mx-auto max-w-4xl mt-20 space-y-24">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={i % 2 ? "lg:pl-24" : "lg:pr-24"}
            >
              <blockquote className="np-serif text-3xl sm:text-4xl leading-[1.25] font-medium">
                <span style={{ color: "#9a3b2e" }}>&ldquo;</span>{t.quote}<span style={{ color: "#9a3b2e" }}>&rdquo;</span>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="h-px w-10" style={{ background: "#16130d" }} />
                <span className="font-semibold">{t.name}</span>
                <span className="opacity-60">— {t.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>
    </TabLayout>
  );
};

export default WordsTab;
