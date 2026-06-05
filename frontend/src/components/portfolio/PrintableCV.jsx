import React from "react";
import { profile, about, experience, education, skills, activities } from "../../data/portfolio";

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
        <div
          style={{
            borderBottom: "2px solid #09090b",
            paddingBottom: 12,
            marginBottom: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 30,
                margin: 0,
                fontFamily: "Outfit, Arial, sans-serif",
                fontWeight: 600,
              }}
            >
              {profile.firstName} {profile.lastName}
            </h1>
            <div style={{ fontSize: 14, marginTop: 4, color: "#52525B" }}>{profile.title}</div>
            <div style={{ fontSize: 11, marginTop: 8, color: "#52525B" }}>
              {profile.email} · {profile.phone} · {profile.location}
            </div>
          </div>
          <img
            src={profile.portrait}
            alt=""
            style={{
              width: 84,
              height: 84,
              objectFit: "cover",
              borderRadius: 4,
              border: "1px solid #09090b",
              filter: "grayscale(100%)",
            }}
          />
        </div>

        {/* Summary */}
        <section style={{ marginBottom: 18 }}>
          <h2
            style={{
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#52525B",
              marginBottom: 6,
            }}
          >
            Summary
          </h2>
          {about.body.map((p, i) => (
            <p key={i} style={{ fontSize: 12, lineHeight: 1.55, margin: "0 0 6px 0" }}>
              {p}
            </p>
          ))}
        </section>

        {/* Experience */}
        <section style={{ marginBottom: 18 }}>
          <h2
            style={{
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#52525B",
              marginBottom: 8,
            }}
          >
            Experience
          </h2>
          {experience.map((e, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <strong>
                  {e.role} — {e.company}
                </strong>
                <span style={{ color: "#52525B" }}>{e.period}</span>
              </div>
              <div style={{ fontSize: 11, color: "#52525B", margin: "2px 0 4px 0" }}>{e.location}</div>
              <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 12, lineHeight: 1.5 }}>
                {e.points.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section style={{ marginBottom: 18 }}>
          <h2
            style={{
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#52525B",
              marginBottom: 6,
            }}
          >
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
          <h2
            style={{
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#52525B",
              marginBottom: 6,
            }}
          >
            Education
          </h2>
          {education.map((e, i) => (
            <div key={i} style={{ fontSize: 12, marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{e.school}</strong>
                <span style={{ color: "#52525B" }}>{e.period}</span>
              </div>
              <div>{e.degree}</div>
              {e.note && (
                <div style={{ color: "#52525B", fontSize: 11, marginTop: 2 }}>{e.note}</div>
              )}
            </div>
          ))}
        </section>

        {/* Activities */}
        {activities && activities.length > 0 && (
          <section>
            <h2
              style={{
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#52525B",
                marginBottom: 6,
              }}
            >
              Activities & Honors
            </h2>
            <div style={{ fontSize: 12 }}>{activities.join(" · ")}</div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PrintableCV;
