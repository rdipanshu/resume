import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTransition } from "../../transition/TransitionProvider";

export const TABS = [
  { to: "/about", n: "01", label: "About" },
  { to: "/experience", n: "02", label: "Experience" },
  { to: "/skills", n: "03", label: "Skills" },
  { to: "/education", n: "04", label: "Education" },
  { to: "/words", n: "05", label: "Words" },
  { to: "/contact", n: "06", label: "Contacts" },
];

const isActive = (pathname, to) =>
  pathname === to || (to === "/about" && pathname === "/");

const TabBar = () => {
  const { burnNavigate } = useTransition();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, to) => {
    e.preventDefault();
    setOpen(false);
    burnNavigate(to);
  };

  return (
    <header
      className={
        "tabbar " +
        (scrolled
          ? "backdrop-blur-md bg-black/10 border-b border-white/10"
          : "bg-transparent border-b border-transparent")
      }
      data-testid="tabbar"
    >
      <div
        className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between"
        style={{ mixBlendMode: "difference", color: "#ffffff" }}
      >
        <a
          href="/about"
          onClick={(e) => go(e, "/about")}
          className="flex items-center gap-2"
          data-testid="logo-link"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-current" />
          <span className="font-semibold tracking-tight text-base" style={{ fontFamily: "var(--font-heading)" }}>
            dipanshu<span className="opacity-60">.rana</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {TABS.map((t) => (
            <a
              key={t.to}
              href={t.to}
              onClick={(e) => go(e, t.to)}
              data-testid={`nav-${t.label.toLowerCase()}-link`}
              className={"tab-link " + (isActive(location.pathname, t.to) ? "active" : "opacity-70 hover:opacity-100")}
            >
              <span className="tab-num">{t.n}</span>
              {t.label}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          data-testid="mobile-menu-btn"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-black/85 backdrop-blur-xl border-t border-white/10">
          <nav className="px-6 py-4 flex flex-col gap-4">
            {TABS.map((t) => (
              <a
                key={t.to}
                href={t.to}
                onClick={(e) => go(e, t.to)}
                data-testid={`mnav-${t.label.toLowerCase()}-link`}
                className={"tab-link text-white " + (isActive(location.pathname, t.to) ? "active" : "opacity-70")}
              >
                <span className="tab-num">{t.n}</span>
                {t.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default TabBar;
