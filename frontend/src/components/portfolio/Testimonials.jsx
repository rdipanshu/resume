import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "../../data/portfolio";

const Testimonials = () => {
  const [idx, setIdx] = useState(0);
  const t = testimonials[idx];

  const next = () => setIdx((i) => (i + 1) % testimonials.length);
  const prev = () => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="relative py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-10">
          <div className="lg:col-span-4">
            <div className="font-mono-accent text-muted-foreground mb-4">· 07 / TESTIMONIALS</div>
            <h2 className="font-heading text-3xl lg:text-4xl tracking-tight">
              Words from teammates.
            </h2>
          </div>
        </div>

        <div className="relative grid-border rounded-md p-8 lg:p-14 bg-card/40 backdrop-blur-sm">
          <Quote className="h-10 w-10 text-accent/60 mb-6" />
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="font-heading text-xl lg:text-3xl leading-snug tracking-tight max-w-3xl"
              data-testid="testimonial-quote"
            >
              "{t.quote}"
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between gap-6">
            <div>
              <div className="font-heading text-base">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.role}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="h-10 w-10 rounded-full border border-border hover:bg-secondary inline-flex items-center justify-center"
                aria-label="Previous"
                data-testid="testimonial-prev"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                className="h-10 w-10 rounded-full border border-border hover:bg-secondary inline-flex items-center justify-center"
                aria-label="Next"
                data-testid="testimonial-next"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-6 flex gap-1.5">
            {testimonials.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all ${
                  i === idx ? "w-8 bg-accent" : "w-4 bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
