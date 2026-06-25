import React from "react";
import { profile, about, experience } from "../data/portfolio";

const today = new Date().toLocaleDateString("en-GB", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const Newspaper = ({ sheetRef, burning, showClickHere, onIgnite }) => {
  return (
    <>
      <div
        ref={sheetRef}
        className={"newspaper-sheet" + (burning ? " burning" : "")}
        data-testid="newspaper-sheet"
      >
        <div className="absolute inset-0 overflow-hidden px-[4vw] py-[3vh] flex flex-col">
          {/* top line */}
          <div className="flex items-center justify-between np-type text-[10px] sm:text-xs tracking-wide">
            <span>VOL. I &middot; No. 1</span>
            <span className="hidden sm:inline">{profile.location}</span>
            <span>PRICE: ONE CLICK</span>
          </div>
          <div className="np-rule-thin mt-1" />

          {/* masthead */}
          <h1 className="np-masthead text-center text-[12vw] sm:text-[8vw] lg:text-[6.2vw] mt-2">
            The Dipanshu Times
          </h1>
          <div className="np-rule mt-1" />
          <div className="flex items-center justify-between np-type text-[9px] sm:text-[11px] py-1">
            <span>{today}</span>
            <span className="italic">“All the work that&rsquo;s fit to ship”</span>
            <span className="hidden sm:inline">TECH &middot; OPS &middot; LOGISTICS</span>
          </div>
          <div className="np-rule" />

          {/* body grid */}
          <div className="grid grid-cols-12 gap-[1.6vw] mt-3 flex-1 overflow-hidden">
            {/* left: portrait */}
            <div className="col-span-4 hidden sm:flex flex-col">
              <div className="border border-[#1a1712] p-1 bg-[#ece5d4]">
                <img
                  src={profile.portrait}
                  alt="portrait"
                  className="w-full h-[26vh] object-cover"
                  style={{ filter: "grayscale(1) contrast(1.15) brightness(1.02)", mixBlendMode: "multiply" }}
                />
              </div>
              <p className="np-type text-[10px] mt-1 leading-tight text-center">
                {profile.firstName} {profile.lastName}, photographed this week.
              </p>
              <div className="np-rule-thin my-2" />
              <p className="np-condensed text-[12px] tracking-wide">Markets</p>
              <p className="np-serif text-[12px] leading-snug mt-1">
                Costs down. Productivity up. Workflows streamlined across power,
                logistics &amp; software desks.
              </p>
            </div>

            {/* center: lead story */}
            <div className="col-span-12 sm:col-span-5 flex flex-col">
              <h2 className="np-serif font-black leading-[0.98] text-[7vw] sm:text-[3.1vw] lg:text-[2.4vw]">
                Operations Manager Pairs Field-Tested Grit With a Developer&rsquo;s Eye
              </h2>
              <p className="np-type text-[11px] mt-1 mb-2 italic">
                {profile.title} &mdash; {profile.location}
              </p>
              <div className="np-rule-thin mb-2" />
              <div className="sm:columns-2 np-col np-serif text-[12.5px] leading-[1.35] text-justify">
                <p className="np-dropcap mb-2">{about.body[0]}</p>
                <p className="mb-2">{about.body[1]}</p>
                <p className="mb-2">
                  Currently leading operations at {experience[0].company},
                  servicing Uttarakhand&rsquo;s leading power companies with
                  compliant, on-budget electrical contract solutions.
                </p>
              </div>
            </div>

            {/* right: inside today */}
            <div className="col-span-12 sm:col-span-3 flex flex-col">
              <p className="np-condensed text-center text-[13px] border-y-2 border-[#1a1712] py-1">
                Inside Today
              </p>
              <ul className="np-serif text-[12px] leading-snug mt-2 space-y-2">
                <li><b>About</b> &mdash; the man behind the metrics. <i>p.1</i></li>
                <li><b>Experience</b> &mdash; three companies, one playbook. <i>p.2</i></li>
                <li><b>Skills</b> &mdash; seven languages &amp; counting. <i>p.3</i></li>
                <li><b>Education</b> &mdash; foundations in IT. <i>p.4</i></li>
                <li><b>Words</b> &mdash; what colleagues say. <i>p.5</i></li>
                <li><b>Contacts</b> &mdash; reach the desk. <i>p.6</i></li>
              </ul>
              <div className="np-rule-thin my-2" />
              <p className="np-type text-[10px] leading-tight">
                Weather: clear skies over Rudrapur. Outlook: shipping.
              </p>
            </div>
          </div>
        </div>
      </div>

      {showClickHere && (
        <div
          className="clickhere-wrap"
          onClick={onIgnite}
          role="button"
          aria-label="Enter site"
          data-testid="ignite-cta"
        >
          <div className="ch-stamp relative w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] flex items-center justify-center">
            <span className="ch-ring" />
            <span className="ch-ring" style={{ animationDelay: "0.9s" }} />
            <div className="relative rounded-full bg-[#b21e14] text-[#f7f1e4] w-[104px] h-[104px] sm:w-[120px] sm:h-[120px] flex flex-col items-center justify-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.35)] border-2 border-[#7c130c]">
              <span className="np-condensed text-[15px] sm:text-[17px] leading-none">Click</span>
              <span className="np-condensed text-[15px] sm:text-[17px] leading-none">Here</span>
              <span className="np-type text-[9px] mt-1 opacity-90">to enter &rarr;</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Newspaper;
