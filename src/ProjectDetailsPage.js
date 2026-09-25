import { projectDeepDive } from "./data/portfolioData";
import "./responsive.css";

function Tag({ label, T }) {
  return (
    <span style={{
      fontFamily: "'JetBrains Mono',monospace",
      fontSize: 11,
      background: T.accentLt,
      color: T.accent,
      borderRadius: 4,
      padding: "3px 9px",
    }}>{label}</span>
  );
}

export default function ProjectDetailsPage({ project, onBackToProjects, onBackHome, onToggleTheme, themeMode, T }) {
  const deepDive = projectDeepDive[project.id];

  return (
    <div style={{ background: T.bgOff, color: T.ink, fontFamily: "'Epilogue',sans-serif", minHeight: "100vh" }}>
      <header style={{ background: T.bg, borderBottom: `1px solid ${T.border}`, padding: "22px 6%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <button onClick={onBackToProjects} style={{
              background: "transparent",
              border: `1px solid ${T.border}`,
              borderRadius: 8,
              padding: "10px 14px",
              cursor: "pointer",
              color: T.muted,
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 12,
            }}>← All Projects</button>
            <button onClick={onBackHome} style={{
              background: T.navy,
              border: `1px solid ${T.navy}`,
              borderRadius: 8,
              padding: "10px 14px",
              cursor: "pointer",
              color: T.buttonText,
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 12,
            }}>Home</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.muted }}>{project.type} · {project.year}</span>
            <button onClick={onToggleTheme} style={{
              background: T.bg,
              border: `1px solid ${T.border}`,
              borderRadius: 999,
              padding: "8px 12px",
              cursor: "pointer",
              color: T.ink,
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 11,
            }}>{themeMode === "dark" ? "Light Mode" : "Dark Mode"}</button>
          </div>
        </div>
      </header>

      <main className="section-pad" style={{ padding: "70px 6% 90px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.accent, marginBottom: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>Project deep dive</p>
          <h1 style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 900, fontSize: "clamp(34px, 6vw, 56px)", color: T.navy, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 18 }}>
            {project.title}
          </h1>
          <p style={{ fontFamily: "'Source Serif 4',serif", fontWeight: 300, fontSize: 19, color: T.muted, lineHeight: 1.75, maxWidth: 920, marginBottom: 34 }}>
            {project.summary}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16, marginBottom: 34 }}>
            {project.images.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={img.alt}
                style={{ width: "100%", height: 230, objectFit: "cover", borderRadius: 12, border: `1px solid ${T.border}` }}
              />
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 22, marginBottom: 34 }}>
            <div style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: 12, padding: 22 }}>
              <h2 style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 800, fontSize: 22, color: T.navy, marginBottom: 12 }}>Problem</h2>
              <p style={{ fontFamily: "'Source Serif 4',serif", fontWeight: 300, fontSize: 17, color: T.muted, lineHeight: 1.8 }}>{deepDive?.challenge}</p>
            </div>
            <div style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: 12, padding: 22 }}>
              <h2 style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 800, fontSize: 22, color: T.navy, marginBottom: 12 }}>How It Works</h2>
              <p style={{ fontFamily: "'Source Serif 4',serif", fontWeight: 300, fontSize: 17, color: T.muted, lineHeight: 1.8, marginBottom: 14 }}>{deepDive?.approach}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {(deepDive?.workflow ?? []).map((step, i) => (
                  <div key={step} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.accent, paddingTop: 4 }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ fontFamily: "'Source Serif 4',serif", fontWeight: 300, fontSize: 16, color: T.muted, lineHeight: 1.8 }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: 12, padding: 22 }}>
              <h2 style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 800, fontSize: 22, color: T.navy, marginBottom: 12 }}>Outcome</h2>
              <p style={{ fontFamily: "'Source Serif 4',serif", fontWeight: 300, fontSize: 17, color: T.muted, lineHeight: 1.8, marginBottom: 14 }}>{deepDive?.outcome}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {project.highlights.map((highlight) => (
                  <div key={highlight} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.success, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: T.ink }}>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
            {project.tags.map((tag) => <Tag key={tag} label={tag} T={T} />)}
          </div>

          {project.demo ? (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 12,
              color: T.accent,
              textDecoration: "none",
              border: `1px solid ${T.accent}`,
              borderRadius: 6,
              padding: "9px 16px",
              marginRight: 8,
            }}>▶ Live Demo</a>
          ) : null}

          <a href={project.github} style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 12,
              color: T.accent,
              textDecoration: "none",
              border: `1px solid ${T.accent}`,
              borderRadius: 6,
              padding: "9px 16px",
            }}>↗ View on GitHub</a>
        </div>
      </main>
    </div>
  );
}
