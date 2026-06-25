import React from "react";

// Words — "The Editorial Ink": ivory page with oversized faint serif typography as art.
const WordsBg = () => {
  return (
    <div className="tab-bg editorial-base" data-testid="bg-words">
      <div className="editorial-ghost">
        <div
          className="absolute whitespace-nowrap"
          style={{ top: "6vh", left: "-4vw", fontSize: "22vw", opacity: 0.05, lineHeight: 0.8 }}
        >
          WORDS
        </div>
        <div
          className="absolute whitespace-nowrap italic"
          style={{ bottom: "4vh", right: "-6vw", fontSize: "18vw", opacity: 0.045, lineHeight: 0.8 }}
        >
          said &amp; meant
        </div>
        <div
          className="absolute"
          style={{ top: "42%", left: "50%", transform: "translate(-50%,-50%)", fontSize: "40vw", opacity: 0.035 }}
        >
          &ldquo;
        </div>
      </div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
};

export default WordsBg;
