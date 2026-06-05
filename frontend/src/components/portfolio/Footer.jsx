import React from "react";
import { Github, Instagram, Facebook, Twitter, Mail, Link as LinkIcon } from "lucide-react";
import { profile } from "../../data/portfolio";

const iconFor = (key) => {
  switch (key) {
    case "github": return Github;
    case "instagram": return Instagram;
    case "facebook": return Facebook;
    case "twitter": return Twitter;
    case "mail": return Mail;
    default: return LinkIcon;
  }
};

const Footer = () => (
  <footer className="no-print border-t border-border py-12">
    <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
      <div className="md:col-span-5 font-heading text-lg tracking-tight">
        {profile.firstName} {profile.lastName} · {profile.title}
      </div>
      <div className="md:col-span-4 flex flex-wrap gap-3">
        {profile.socials.map((s) => {
          const Icon = iconFor(s.icon);
          const isExternal = s.href.startsWith("http");
          return (
            <a
              key={s.label}
              href={s.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              aria-label={s.label}
              title={s.label}
              data-testid={`footer-social-${s.icon}`}
              className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-accent hover:bg-secondary transition-colors"
            >
              <Icon className="h-4 w-4" />
            </a>
          );
        })}
      </div>
      <div className="md:col-span-3 md:text-right text-xs text-muted-foreground font-mono-accent">
        © {new Date().getFullYear()} — All rights reserved
      </div>
    </div>
  </footer>
);

export default Footer;
