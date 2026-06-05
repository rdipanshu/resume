import React from "react";
import { education } from "../../data/portfolio";

const Row = ({ left, right, sub, year }) => (
  <div className="grid grid-cols-12 py-5 border-b border-border last:border-b-0 items-baseline gap-4">
    <div className="col-span-12 md:col-span-7">
      <div className="font-heading text-lg tracking-tight">{left}</div>
      {sub && (
        <div className="text-sm text-muted-foreground mt-1 leading-relaxed">{sub}</div>
      )}
    </div>
    <div className="col-span-7 md:col-span-3 text-muted-foreground text-sm">{right}</div>
    <div className="col-span-5 md:col-span-2 text-right font-mono-accent text-muted-foreground">
      {year}
    </div>
  </div>
);

const Education = () => {
  return (
    <section id="education" className="relative py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-10">
          <div className="lg:col-span-4">
            <div className="font-mono-accent text-muted-foreground mb-4">· 04 / EDUCATION</div>
            <h2 className="font-heading text-3xl lg:text-4xl tracking-tight">
              Where I learned to think in systems.
            </h2>
          </div>
          <p className="lg:col-span-6 lg:col-start-6 text-muted-foreground leading-relaxed">
            A foundation in Information Technology — turned into a habit of building, breaking, and fixing real systems.
          </p>
        </div>

        <div className="border-t border-border">
          {education.map((e, i) => (
            <Row key={i} left={e.school} right={e.degree} sub={e.note} year={e.period} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
