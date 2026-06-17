import React, { useEffect, useState } from "react";
import { Moon, Sun, Menu, X, Download } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const links = [
  { id: "about", label: "About", testId: "nav-about-link" },
  { id: "experience", label: "Experience", testId: "nav-experience-link" },
  { id: "skills", label: "Skills", testId: "nav-skills-link" },
  { id: "education", label: "Education", testId: "nav-education-link" },
  { id: "testimonials", label: "Words", testId: "nav-testimonials-link" },
  { id: "contact", label: "Contact", testId: "nav-contact-link" },
];

const Header = () => {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`no-print fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border"
          : "bg-transparent"
      }`}
      data-testid="site-header"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="flex items-center gap-2 group"
          data-testid="logo-link"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-accent timeline-dot" />
          <span className="font-heading font-semibold tracking-tight text-base">
            dipanshu<span className="text-muted-foreground">.rana</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              data-testid={l.testId}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            data-testid="theme-toggle"
            aria-label="Toggle theme"
            className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-border hover:bg-secondary transition-colors"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href="/dipanshu-rana-cv.pdf"
            download="Dipanshu-Rana-CV.pdf"
            data-testid="header-download-cv-btn"
            className="hidden sm:inline-flex items-center h-9 rounded-full px-4 text-xs font-mono-accent bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            <Download className="h-3.5 w-3.5 mr-2" />
            Download CV
          </a>

          <button
            className="md:hidden h-9 w-9 inline-flex items-center justify-center rounded-full border border-border"
            onClick={() => setOpen((s) => !s)}
            data-testid="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="text-sm py-1 text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/dipanshu-rana-cv.pdf"
              download="Dipanshu-Rana-CV.pdf"
              onClick={() => setOpen(false)}
              data-testid="mobile-download-cv-btn"
              className="mt-2 inline-flex items-center justify-center h-10 rounded-full px-4 text-xs font-mono-accent bg-foreground text-background"
            >
              <Download className="h-3.5 w-3.5 mr-2" />
              Download CV
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
