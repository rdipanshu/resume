import React from "react";
import { motion } from "framer-motion";
import { experience } from "../../data/portfolio";

const Experience = () => {
  return (
    <section id="experience" className="relative py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <div className="font-mono-accent text-muted-foreground mb-4">· 02 / EXPERIENCE</div>
            <h2 className="font-heading text-3xl lg:text-4xl tracking-tight">
              Where I've shipped.
            </h2>
          </div>
          <p className="lg:col-span-6 lg:col-start-6 text-muted-foreground leading-relaxed">
            A timeline of roles, the things I built, and the teams I helped grow.
          </p>
        </div>

        <ol className="relative border-l border-border ml-2">
          {experience.map((e, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="pl-8 pb-14 relative group"
              data-testid={`experience-item-${i}`}
            >
              <span className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-background border border-border group-hover:bg-accent group-hover:border-accent transition-colors timeline-dot" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-3 font-mono-accent text-muted-foreground">
                  {e.period}
                </div>
                <div className="lg:col-span-9">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-heading text-xl lg:text-2xl tracking-tight">{e.role}</h3>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-foreground">{e.company}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-sm text-muted-foreground">{e.location}</span>
                  </div>
                  <ul className="mt-4 space-y-2 text-muted-foreground leading-relaxed">
                    {e.points.map((p, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="mt-2 h-[2px] w-4 bg-border shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
