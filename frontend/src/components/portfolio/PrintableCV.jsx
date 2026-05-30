import React from "react";
import {
  profile,
  about,
  experience,
  education,
  skills,
  projects,
  certifications,
} from "../../data/portfolio";

// Hidden printable CV view — only visible when printing. Used by Download CV.
const PrintableCV = () => {
  return (
    <div
      id="print-cv"
      aria-hidden="true"
      style={{ position: "absolute", left: "-9999px", top: 0, width: "210mm" }}
    >
      <div style={{ fontFamily: "Manrope, Arial, sans-serif", color: "#09090b" }}>
        {/* Header */}
        <div style={{ borderBottom: "2px solid #09090b", paddingBottom: 12, marginBottom: 20 }}>
          <h1 style={{ fontSize: 30, margin: 0, fontFamily: "Outfit, Arial, sans-serif", fontWeight: 600 }}>
            {profile.firstName} {profile.lastName}
          </h1>
          <div style={{ fontSize: 14, marginTop: 4, color: "#52525B" }}>{profile.title}</div>
          <div style={{ fontSize: 11, marginTop: 8, color: "#52525B" }}>
            {profile.email} · {profile.phone} · {profile.location}
          </div>
        </div>

        {/* About */}
        <section style={{ marginBottom: 18 }}>
          <h2 style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#52525B", marginBottom: 6 }}>
            Summary
          </h2>
          {about.body.map((p, i) => (
            <p key={i} style={{ fontSize: 12, lineHeight: 1.55, margin: "0 0 6px 0" }}>{p}</p>
          ))}
        </section>

        {/* Experience */}
        <section style={{ marginBottom: 18 }}>
          <h2 style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#52525B", marginBottom: 8 }}>
            Experience
          </h2>
          {experience.map((e, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <strong>{e.role} — {e.company}</strong>
                <span style={{ color: "#52525B" }}>{e.period}</span>
              </div>
              <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 12, lineHeight: 1.5 }}>
                {e.points.map((p, idx) => <li key={idx}>{p}</li>)}
              </ul>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section style={{ marginBottom: 18 }}>
          <h2 style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#52525B", marginBottom: 6 }}>
            Skills
          </h2>
          {skills.map((g) => (
            <div key={g.category} style={{ fontSize: 12, marginBottom: 4 }}>
              <strong>{g.category}:</strong> {g.items.join(", ")}
            </div>
          ))}
        </section>

        {/* Education */}
        <section style={{ marginBottom: 18 }}>
          <h2 style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#52525B", marginBottom: 6 }}>
            Education
          </h2>
          {education.map((e, i) => (
            <div key={i} style={{ fontSize: 12, marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{e.school}</strong>
                <span style={{ color: "#52525B" }}>{e.period}</span>
              </div>
              <div>{e.degree}</div>
            </div>
          ))}
        </section>

        {/* Certifications */}
        <section style={{ marginBottom: 18 }}>
          <h2 style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#52525B", marginBottom: 6 }}>
            Certifications
          </h2>
          {certifications.map((c, i) => (
            <div key={i} style={{ fontSize: 12, marginBottom: 4, display: "flex", justifyContent: "space-between" }}>
              <span>{c.name} — {c.issuer}</span>
              <span style={{ color: "#52525B" }}>{c.year}</span>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section>
          <h2 style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#52525B", marginBottom: 6 }}>
            Selected Projects
          </h2>
          {projects.map((p, i) => (
            <div key={i} style={{ fontSize: 12, marginBottom: 8 }}>
              <strong>{p.title}</strong> — <span>{p.summary}</span>
              <div style={{ color: "#52525B", fontSize: 11, marginTop: 2 }}>Stack: {p.stack.join(", ")}</div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default PrintableCV;
