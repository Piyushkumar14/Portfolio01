import { useEffect, useRef, useState } from "react";
import "./responsive.css";

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVis(true);
      }
    }, { threshold });

    if (ref.current) {
      io.observe(ref.current);
    }

    return () => io.disconnect();
  }, [threshold]);

  return [ref, vis];
}

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

function ArchiveProjectCard({ project, index, onOpenDetails, T }) {
  const [ref, vis] = useInView();
  const [imgErrors, setImgErrors] = useState({});

  return (
    <div ref={ref} style={{
      background: T.bg,
      border: `1px solid ${T.border}`,
      borderRadius: 16,
      overflow: "hidden",
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : "translateY(32px)",
      transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: 180, background: T.bgOff }}>
        {project.images.map((img, i) => (
          <div key={i} style={{
            overflow: "hidden",
            position: "relative",
            borderRight: i === 0 ? `1px solid ${T.border}` : "none",
          }}>
            {imgErrors[i] ? (
              <div style={{
                width: "100%",
                height: "100%",
                background: T.projectFallbackBg,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}>
                <span style={{ fontSize: 28 }}>{["🤖", "📊", "🎵", "💳", "📈", "🧩"][index % 6]}</span>
                <span style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 10,
                  color: T.accent,
                  textAlign: "center",
                  padding: "0 8px",
                }}>{img.alt}</span>
              </div>
            ) : (
              <img
                src={img.url}
                alt={img.alt}
                onError={() => setImgErrors((prev) => ({ ...prev, [i]: true }))}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            )}
          </div>
        ))}
      </div>

      <div style={{ padding: "24px 24px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <div>
            <span style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 10,
              color: T.muted,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}>{project.type}</span>
            <h3 style={{
              fontFamily: "'Epilogue',sans-serif",
              fontWeight: 800,
              fontSize: 18,
              color: T.navy,
              marginTop: 4,
              lineHeight: 1.2,
            }}>{project.title}</h3>
          </div>
          <span style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 11,
            color: T.muted,
            flexShrink: 0,
            marginLeft: 12,
            paddingTop: 4,
          }}>{project.year}</span>
        </div>

        <p style={{
          fontFamily: "'Source Serif 4',serif",
          fontWeight: 300,
          fontSize: 14,
          color: T.muted,
          lineHeight: 1.7,
          marginBottom: 16,
        }}>{project.summary}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 18 }}>
          {project.highlights.map((highlight) => (
            <div key={highlight} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.success, flexShrink: 0 }} />
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.ink }}>{highlight}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
          {project.tags.map((tag) => <Tag key={tag} label={tag} T={T} />)}
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <button onClick={() => onOpenDetails(project.id)} style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "'Epilogue',sans-serif",
            fontWeight: 700,
            fontSize: 12,
            color: T.buttonText,
            background: T.navy,
            border: "none",
            borderRadius: 6,
            padding: "8px 14px",
            cursor: "pointer",
          }}>Project Details →</button>
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
            padding: "7px 16px",
            transition: "background 0.2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = T.accentLt; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >↗ View on GitHub</a>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsArchivePage({ projects, onBackHome, onGoToSkills, onOpenDetails, onToggleTheme, themeMode, T }) {
  return (
    <div style={{ background: T.bgOff, color: T.ink, fontFamily: "'Epilogue',sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@300;400;600;700;800;900&family=Source+Serif+4:ital,wght@0,300;1,300&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      <header style={{ background: T.bg, borderBottom: `1px solid ${T.border}`, padding: "22px 6%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button onClick={onBackHome} style={{
              background: "transparent",
              border: `1px solid ${T.border}`,
              borderRadius: 8,
              padding: "10px 14px",
              cursor: "pointer",
              color: T.muted,
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 12,
            }}>← Back to Home</button>
            <button onClick={onGoToSkills} style={{
              background: T.navy,
              border: `1px solid ${T.navy}`,
              borderRadius: 8,
              padding: "10px 14px",
              cursor: "pointer",
              color: T.buttonText,
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 12,
            }}>Go to Skills</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.muted }}>{projects.length} total projects</span>
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
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.accent, marginBottom: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>Project archive</p>
          <h1 style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 900, fontSize: "clamp(40px, 7vw, 64px)", color: T.navy, letterSpacing: "-0.03em", lineHeight: 1.0, marginBottom: 20 }}>
            More Projects
          </h1>
          <p style={{ fontFamily: "'Source Serif 4',serif", fontWeight: 300, fontSize: 18, color: T.muted, lineHeight: 1.7, maxWidth: 820, marginBottom: 44 }}>
            A complete look at my data science and machine learning projects across recommendation systems, NLP, forecasting, and model interpretability.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 28 }}>
            {projects.map((project, index) => (
              <ArchiveProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpenDetails={onOpenDetails}
                T={T}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
