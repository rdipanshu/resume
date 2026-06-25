import React from "react";
import { motion } from "framer-motion";
import TabLayout from "./TabLayout";
import WordsBg from "../backgrounds/WordsBg";
import { testimonials } from "../../data/portfolio";

const WordsTab = () => {
  return (
    <TabLayout testId="tab-words" bg={<WordsBg />}>
      <section className="px-6 lg:px-10 pt-32 pb-32" style={{ color: "#16130d" }}>
        <div className="mx-auto max-w-3xl">
          <div className="section-overline mb-4" style={{ color: "#9a3b2e" }}>· 05 / Words</div>
          <motion.h2
            className="np-serif text-6xl sm:text-7xl font-black tracking-tight leading-[0.95]"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.7, 0, 0.3, 1] }}
          >
            What people<br />say.
          </motion.h2>
        </div>

        <div className="mx-auto max-w-4xl mt-24 space-y-28">
          {testimonials.map((t, i) => (
            <figure key={t.name} className={i % 2 ? "lg:pl-24" : "lg:pr-24"}>
              {/* black ink spreads across to reveal the quote (reliable 20%-in-view trigger) */}
              <motion.blockquote
                className="np-serif text-3xl sm:text-4xl leading-[1.25] font-medium"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.1, ease: [0.7, 0, 0.3, 1] }}
              >
                <span style={{ color: "#9a3b2e" }}>&ldquo;</span>{t.quote}<span style={{ color: "#9a3b2e" }}>&rdquo;</span>
              </motion.blockquote>
              <motion.figcaption
                className="mt-6 flex items-center gap-3"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <span className="h-px w-10" style={{ background: "#16130d" }} />
                <span className="font-semibold">{t.name}</span>
                <span className="opacity-60">— {t.role}</span>
              </motion.figcaption>
            </figure>
          ))}
        </div>
      </section>
    </TabLayout>
  );
};

export default WordsTab;
