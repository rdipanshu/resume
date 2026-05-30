import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../../data/portfolio";

const Projects = () => {
  return (
    <section id="projects" className="relative py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-14">
          <div className="lg:col-span-4">
            <div className="font-mono-accent text-muted-foreground mb-4">· 04 / PROJECTS</div>
            <h2 className="font-heading text-3xl lg:text-4xl tracking-tight">
              Selected work.
            </h2>
          </div>
          <p className="lg:col-span-6 lg:col-start-6 text-muted-foreground leading-relaxed">
            A few projects I'm proud of — platforms, infra tooling, and quiet OSS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {projects.map((p, i) => {
            const colSpan = p.size === "lg" ? "md:col-span-8" : "md:col-span-6";
            return (
              <motion.a
                key={p.title}
                href={p.href}
                data-testid={`project-link-${i}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.05 }}
                className={`group relative overflow-hidden rounded-lg border border-border bg-card ${colSpan} ${
                  i === 1 ? "md:col-start-9 md:row-start-1 md:col-span-4" : ""
                }`}
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-xl tracking-tight">{p.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {p.summary}
                      </p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors shrink-0 mt-1" />
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="font-mono-accent text-muted-foreground border border-border px-2 py-1 rounded"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
