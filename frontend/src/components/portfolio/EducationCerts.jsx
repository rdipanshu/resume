import React from "react";
import { education, certifications } from "../../data/portfolio";

const Row = ({ left, right, sub, year }) => (
  <div className="grid grid-cols-12 py-5 border-b border-border last:border-b-0 items-baseline gap-4">
    <div className="col-span-12 md:col-span-7">
      <div className="font-heading text-lg tracking-tight">{left}</div>
      {sub && (
        <div className="text-sm text-muted-foreground mt-1 leading-relaxed">{sub}</div>
      )}
    </div>
    <div className="col-span-7 md:col-span-3 text-muted-foreground text-sm">
      {right}
    </div>
    <div className="col-span-5 md:col-span-2 text-right font-mono-accent text-muted-foreground">
      {year}
    </div>
  </div>
);

const EducationCerts = () => {
  return (
    <section id="education" className="relative py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <div className="font-mono-accent text-muted-foreground mb-4">· 05 / EDUCATION</div>
          <h2 className="font-heading text-2xl lg:text-3xl tracking-tight mb-8">
            Where I learned to think in systems.
          </h2>
          <div className="border-t border-border">
            {education.map((e, i) => (
              <Row
                key={i}
                left={e.school}
                right={e.degree}
                sub={e.note}
                year={e.period}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="font-mono-accent text-muted-foreground mb-4">
            · 06 / CERTIFICATIONS
          </div>
          <h2 className="font-heading text-2xl lg:text-3xl tracking-tight mb-8">
            Continuously levelling up.
          </h2>
          <div className="border-t border-border">
            {certifications.map((c, i) => (
              <Row
                key={i}
                left={c.name}
                right={c.issuer}
                year={c.year}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationCerts;
