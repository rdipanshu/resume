import React from "react";
import { motion } from "framer-motion";
import { Code2, Cloud, Layers, Cpu, Sparkles } from "lucide-react";
import { skills } from "../../data/portfolio";

const iconFor = (cat) => {
  switch (cat) {
    case "Languages":
      return Code2;
    case "Frontend":
      return Layers;
    case "Backend":
      return Cpu;
    case "Cloud & DevOps":
      return Cloud;
    default:
      return Sparkles;
  }
};

const Skills = () => {
  return (
    <section id="skills" className="relative py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-14">
          <div className="lg:col-span-4">
            <div className="font-mono-accent text-muted-foreground mb-4">· 03 / SKILLS</div>
            <h2 className="font-heading text-3xl lg:text-4xl tracking-tight">
              Tools I reach for.
            </h2>
          </div>
          <p className="lg:col-span-6 lg:col-start-6 text-muted-foreground leading-relaxed">
            Stack chosen pragmatically — boring where it should be boring, sharp where it matters.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-md overflow-hidden border border-border">
          {skills.map((group, i) => {
            const Icon = iconFor(group.category);
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-background p-7 hover:bg-secondary/40 transition-colors"
                data-testid={`skills-group-${i}`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-mono-accent text-muted-foreground">
                    {group.category}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((s) => (
                    <li
                      key={s}
                      className="text-sm px-3 py-1.5 rounded-full border border-border bg-card hover:border-accent hover:text-foreground transition-colors"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
