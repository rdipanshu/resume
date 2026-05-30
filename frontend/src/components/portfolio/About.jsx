import React from "react";
import { motion } from "framer-motion";
import { about, profile } from "../../data/portfolio";

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`relative py-24 lg:py-32 ${className}`}>
    {children}
  </section>
);

const About = () => {
  return (
    <Section id="about">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="font-mono-accent text-muted-foreground mb-4">· 01 / ABOUT</div>
          <h2 className="font-heading text-3xl lg:text-4xl tracking-tight leading-tight">
            Engineer, mentor, quiet operator.
          </h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="space-y-5 text-base lg:text-lg leading-relaxed text-muted-foreground"
          >
            {about.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </motion.div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-border pt-8">
            {about.stats.map((s) => (
              <div key={s.label}>
                <div className="font-heading text-2xl lg:text-3xl tracking-tight">{s.value}</div>
                <div className="font-mono-accent text-muted-foreground mt-2">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <a href={`mailto:${profile.email}`} className="link-underline" data-testid="about-email-link">
              {profile.email}
            </a>
            <span>·</span>
            <span>{profile.location}</span>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
