import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { profile } from "../../data/portfolio";
import FuturisticBg from "./FuturisticBg";

const Hero = ({ onDownload }) => {
  return (
    <section id="hero" className="relative min-h-[100svh] flex items-end pb-20 pt-32 overflow-hidden">
      <span id="top" className="absolute top-0" aria-hidden="true" />
      <FuturisticBg />

      <div className="relative mx-auto max-w-7xl w-full px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="inline-flex h-2 w-2 rounded-full bg-accent timeline-dot" />
            <span className="font-mono-accent text-muted-foreground">
              Available · {profile.availability}
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
            className="font-heading font-light tracking-tight leading-[0.95] text-5xl sm:text-6xl lg:text-[5.5rem]"
          >
            {["Hello,", "I'm", profile.firstName, profile.lastName + "."].map((w, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className="inline-block mr-3"
              >
                {w}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Button
              asChild
              className="rounded-full h-11 px-6"
              data-testid="hero-view-work-btn"
            >
              <a href="#experience">
                View experience
                <ArrowDown className="h-4 w-4 ml-2" />
              </a>
            </Button>
            <Button
              variant="outline"
              onClick={onDownload}
              className="rounded-full h-11 px-6 border-border"
              data-testid="hero-download-cv-btn"
            >
              <Download className="h-4 w-4 mr-2" />
              Download CV
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="lg:col-span-4 w-full flex flex-col gap-5"
        >
          <div className="relative grid-border rounded-md overflow-hidden bg-card/40 backdrop-blur-md">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={profile.portrait}
                alt={`${profile.firstName} ${profile.lastName}`}
                className="h-full w-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-[1200ms]"
                data-testid="hero-portrait"
              />
            </div>
            <div className="absolute left-3 top-3 px-2.5 py-1 rounded-full bg-background/70 backdrop-blur-md border border-border">
              <span className="font-mono-accent text-muted-foreground">· ON FILM</span>
            </div>
          </div>

          <div className="grid-border rounded-md bg-card/40 backdrop-blur-md p-5">
            <div className="font-mono-accent text-muted-foreground mb-4">
              · CURRENT ROLE
            </div>
            <div className="font-heading text-2xl tracking-tight leading-tight">
              {profile.title}
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground gap-2">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </div>

            <div className="mt-6 border-t border-border pt-4 grid grid-cols-3 gap-3">
              {[
                { k: "since", v: "2024" },
                { k: "companies", v: "3" },
                { k: "based in", v: "IN" },
              ].map((s) => (
                <div key={s.k}>
                  <div className="font-heading text-xl tracking-tight">{s.v}</div>
                  <div className="font-mono-accent text-muted-foreground mt-1">{s.k}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
