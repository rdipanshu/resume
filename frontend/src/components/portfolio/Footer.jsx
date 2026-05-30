import React from "react";
import { profile } from "../../data/portfolio";

const Footer = () => (
  <footer className="no-print border-t border-border py-12">
    <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
      <div className="md:col-span-5 font-heading text-lg tracking-tight">
        {profile.firstName} {profile.lastName} · {profile.title}
      </div>
      <div className="md:col-span-4 flex flex-wrap gap-5 text-sm text-muted-foreground">
        {profile.socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="link-underline"
            data-testid={`footer-social-${s.label.toLowerCase().replace(/\W+/g, "-")}`}
          >
            {s.label}
          </a>
        ))}
      </div>
      <div className="md:col-span-3 md:text-right text-xs text-muted-foreground font-mono-accent">
        © {new Date().getFullYear()} — All rights reserved
      </div>
    </div>
  </footer>
);

export default Footer;
