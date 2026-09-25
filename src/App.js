import { useState, useEffect, useRef, Component } from "react";
import "./responsive.css";
import ProjectsArchivePage from "./ProjectsArchivePage";
import ProjectDetailsPage from "./ProjectDetailsPage";
import {
  getNextThemeMode,
  getStoredThemeMode,
  getTheme,
  THEME_STORAGE_KEY,
} from "./theme";
import {
  experience,
  featuredProjects,
  profile,
  projects,
  skillGroups,
} from "./data/portfolioData";

const navItems = ["Home", "Experience", "Projects", "Skills", "About", "Contact"];

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("App error boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "#f8fafc", color: "#0f172a" }}>
          <div style={{ textAlign: "center", maxWidth: 480 }}>
            <h1 style={{ fontSize: 24, marginBottom: 12 }}>Something went wrong</h1>
            <p style={{ lineHeight: 1.6, color: "#475569" }}>The page hit an unexpected runtime error. Please refresh and try again.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/* ── HOOKS ───────────────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVis(true);
    }, { threshold });

    if (ref.current) {
      io.observe(ref.current);
    }

    return () => io.disconnect();
  }, [threshold]);

  return [ref, vis];
}

/* ── SUB-COMPONENTS ──────────────────────────────────────────── */
function SkillRow({ skill, delay, T }) {
  const [ref, vis] = useInView(0.05);
  return (
    <div ref={ref} style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 600, fontSize: 13, color: T.ink }}>{skill.name}</span>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.muted }}>{skill.note}</span>
      </div>
      <div style={{ height: 4, background: T.border, borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: vis ? `${skill.pct}%` : "0%",
          background: T.accent, borderRadius: 2,
          transition: `width 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        }} />
      </div>
    </div>
  );
}

function Tag({ label, T }) {
  return (
    <span style={{
      fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
      background: T.accentLt, color: T.accent,
      borderRadius: 4, padding: "3px 9px",
    }}>{label}</span>
  );
}

function ProjectCard({ project, index, onOpenDetails, T }) {
  const [ref, vis] = useInView();
  const [imgErrors, setImgErrors] = useState({});

  return (
    <div ref={ref} style={{
      background: T.bg, border: `1px solid ${T.border}`, borderRadius: 16,
      overflow: "hidden",
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : "translateY(32px)",
      transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
    }}>
      {/* Two project images side by side */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: 180, background: T.bgOff }}>
        {project.images.map((img, i) => (
          <div key={i} style={{
            overflow: "hidden", position: "relative",
            borderRight: i === 0 ? `1px solid ${T.border}` : "none",
          }}>
            {imgErrors[i] ? (
              /* Fallback placeholder if image fails */
              <div style={{
                width: "100%", height: "100%",
                background: T.projectFallbackBg,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 8,
              }}>
                <span style={{ fontSize: 28 }}>{["🤖", "📊", "🎵", "💳", "📈", "🧩"][index % 6]}</span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: T.accent, textAlign: "center", padding: "0 8px" }}>{img.alt}</span>
              </div>
            ) : (
              <img
                src={img.url}
                alt={img.alt}
                onError={() => setImgErrors(p => ({ ...p, [i]: true }))}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "24px 24px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <div>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: T.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>{project.type}</span>
            <h3 style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 800, fontSize: 18, color: T.navy, marginTop: 4, lineHeight: 1.2 }}>{project.title}</h3>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.muted, flexShrink: 0, marginLeft: 12, paddingTop: 4 }}>{project.year}</span>
        </div>

        <p style={{ fontFamily: "'Source Serif 4',serif", fontWeight: 300, fontSize: 14, color: T.muted, lineHeight: 1.7, marginBottom: 16 }}>{project.summary}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 18 }}>
          {project.highlights.map(h => (
            <div key={h} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.success, flexShrink: 0 }} />
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.ink }}>{h}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
          {project.tags.map(t => <Tag key={t} label={t} T={T} />)}
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <button onClick={() => onOpenDetails(project.id)} style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "'Epilogue',sans-serif", fontWeight: 700,
            fontSize: 12, color: T.buttonText, background: T.navy,
            border: "none", borderRadius: 6, padding: "8px 14px", cursor: "pointer",
          }}>Project Details →</button>
          <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: T.accent,
            textDecoration: "none", border: `1px solid ${T.accent}`,
            borderRadius: 6, padding: "7px 16px", transition: "background 0.2s",
          }}
            onMouseEnter={e => e.target.style.background = T.accentLt}
            onMouseLeave={e => e.target.style.background = "transparent"}
          >▶ Live Demo</a>
          <a href={project.github} style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: T.accent,
            textDecoration: "none", border: `1px solid ${T.accent}`,
            borderRadius: 6, padding: "7px 16px", transition: "background 0.2s",
          }}
            onMouseEnter={e => e.target.style.background = T.accentLt}
            onMouseLeave={e => e.target.style.background = "transparent"}
          >↗ View on GitHub</a>
        </div>
      </div>
    </div>
  );
}


/* ── MAIN ────────────────────────────────────────────────────── */
export default function App() {
  return (
    <ErrorBoundary>
      <Portfolio />
    </ErrorBoundary>
  );
}

function Portfolio() {
  const [path, setPath]         = useState(window.location.pathname);
  const [scrolled, setScrolled]   = useState(false);
  const [themeMode, setThemeMode]  = useState(() => getStoredThemeMode());
  const [heroRef,  heroVis]       = useInView(0.01);
  const [skillRef, skillVis]      = useInView(0.05);
  const [expRef,   expVis]        = useInView(0.05);
  const [photoErr, setPhotoErr]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const T = getTheme(themeMode);

  const navigate = (nextPath) => {
    if (nextPath === path) return;
    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openProjectDetails = (projectId) => navigate(`/projects/${projectId}`);

  const goToSection = (sectionId) => {
    if (path !== "/") {
      window.history.pushState({}, "", `/#${sectionId}`);
      setPath("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
      return;
    }
    window.history.replaceState({}, "", `/#${sectionId}`);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (path !== "/") return;
    const hash = window.location.hash;
    if (!hash) return;
    const sectionId = hash.replace("#", "");
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }, 30);
  }, [path]);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    document.documentElement.style.colorScheme = themeMode;
    document.body.style.backgroundColor = T.bg;
    document.body.style.color = T.ink;
  }, [T.bg, T.ink, themeMode]);

  const scrollTo = id => {
    setMenuOpen(false);
    goToSection(id);
  };

  const toggleTheme = () => {
    setThemeMode((currentMode) => getNextThemeMode(currentMode));
  };

  const projectDetailMatch = path.match(/^\/projects\/([^/]+)$/);
  const selectedProjectId = projectDetailMatch?.[1];
  const selectedProject = selectedProjectId ? projects.find((p) => p.id === selectedProjectId) : null;

  if (selectedProjectId && !selectedProject) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: T.bgOff, padding: "24px" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Epilogue',sans-serif", color: T.navy, marginBottom: 12 }}>Project not found</h1>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", color: T.muted, marginBottom: 16 }}>The project id does not exist.</p>
          <button onClick={() => navigate("/projects")} style={{
            background: T.navy, color: T.buttonText, border: "none", borderRadius: 8,
            padding: "10px 14px", cursor: "pointer", fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
          }}>Back to Projects</button>
        </div>
      </div>
    );
  }

  if (selectedProject) {
    return (
      <ProjectDetailsPage
        project={selectedProject}
        onBackToProjects={() => navigate("/projects")}
        onBackHome={() => navigate("/")}
        onToggleTheme={toggleTheme}
        themeMode={themeMode}
        T={T}
      />
    );
  }

  if (path === "/projects") {
    return (
      <ProjectsArchivePage
        projects={projects}
        onBackHome={() => navigate("/")}
        onGoToSkills={() => goToSection("skills")}
        onOpenDetails={openProjectDetails}
        onToggleTheme={toggleTheme}
        themeMode={themeMode}
        T={T}
      />
    );
  }

  return (
    <div style={{ background: T.bg, color: T.ink, fontFamily: "'Epilogue',sans-serif", minHeight: "100vh" }}>
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${T.scrollbarThumb}; border-radius: 2px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes subtlePulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 60,
        background: scrolled ? T.navBg : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${T.border}` : "none",
        transition: "all 0.3s",
        display: "flex", alignItems: "center", padding: "0 6%", justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 900, fontSize: 15, letterSpacing: "0.1em", color: T.navy, textTransform: "uppercase" }}>PK</span>
        <div className="nav-right" style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <div className={`nav-links${menuOpen ? " nav-links-open" : ""}`} style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "flex-end", background: T.bg }}>
            {navItems.map(n => (
              <button key={n} onClick={() => scrollTo(n.toLowerCase())} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.muted, letterSpacing: "0.04em",
                transition: "color 0.2s", padding: 0,
              }}
                onMouseEnter={e => e.target.style.color = T.accent}
                onMouseLeave={e => e.target.style.color = T.muted}
              >{n}</button>
            ))}
          </div>
          <button onClick={toggleTheme} style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            border: `1px solid ${T.border}`, borderRadius: 999,
            padding: "8px 12px", background: T.bg, color: T.ink,
            cursor: "pointer", fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.target.style.borderColor = T.accent; e.target.style.color = T.accent; }}
            onMouseLeave={e => { e.target.style.borderColor = T.border; e.target.style.color = T.ink; }}
          >{themeMode === "dark" ? "Light Mode" : "Dark Mode"}</button>
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              border: `1px solid ${T.border}`, borderRadius: 8, background: T.bg,
              color: T.navy, fontSize: 16, width: 36, height: 36, cursor: "pointer",
            }}
          >{menuOpen ? "✕" : "☰"}</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="hero-section" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "120px 6% 80px", borderBottom: `1px solid ${T.border}`, position: "relative",
      }}>
        {/* Subtle lined background */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `repeating-linear-gradient(transparent, transparent 79px, ${T.border} 79px, ${T.border} 80px)`,
          opacity: 0.4,
        }} />

        <div ref={heroRef} style={{ position: "relative", width: "100%", maxWidth: 1100, margin: "0 auto" }}>
          <div className="hero-grid" style={{
            display: "grid", gridTemplateColumns: "1fr auto",
            gap: 80, alignItems: "center",
          }}>
            {/* Left: text */}
            <div>
              {/* Status */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                border: `1px solid ${T.border}`, borderRadius: 100,
                padding: "6px 16px", marginBottom: 40,
                animation: heroVis ? "fadeIn 0.6s ease forwards" : "none", opacity: 0,
              }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.success, animation: "subtlePulse 2s infinite" }} />
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.muted }}>Open to full-time roles</span>
              </div>

              <h1 style={{
                fontFamily: "'Epilogue',sans-serif", fontWeight: 900,
                fontSize: "clamp(48px, 7vw, 90px)", lineHeight: 0.95,
                letterSpacing: "-0.03em", color: T.navy, marginBottom: 8,
                animation: heroVis ? "fadeUp 0.7s ease 0.1s both" : "none",
              }}>
                Piyush<br />Kumar<span style={{ color: T.accent }}>.</span>
              </h1>
              <p style={{
                fontFamily: "'JetBrains Mono',monospace", fontSize: 13,
                color: T.accent, letterSpacing: "0.12em", textTransform: "uppercase",
                marginBottom: 36,
                animation: heroVis ? "fadeUp 0.7s ease 0.15s both" : "none",
              }}>Data Scientist</p>

              <div className="hero-info-grid" style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, maxWidth: 760,
                animation: heroVis ? "fadeUp 0.7s ease 0.2s both" : "none",
              }}>
                <p style={{ fontFamily: "'Source Serif 4',serif", fontStyle: "italic", fontWeight: 300, fontSize: 18, color: T.muted, lineHeight: 1.75 }}>
                  {profile.bio1}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    ["Focus",      "ML · NLP · EDA · Prompt Eng."],
                    ["Stack",      "Python · Scikit-learn · Machine Learning · Pandas · NumPy · Matplotlib · Seaborn · Plotly · Streamlit"],
                    ["Experience", "SOUL AI · KPIT Technologies"],
                    ["Education",  "B.Tech — LPU, 2024"],
                    ["Location",   "India"],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", gap: 16, alignItems: "baseline" }}>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: T.muted, width: 78, flexShrink: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>{k}</span>
                      <span style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 600, fontSize: 13, color: T.ink }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: 14, marginTop: 52, animation: heroVis ? "fadeUp 0.7s ease 0.3s both" : "none", flexWrap: "wrap" }}>
                <button onClick={() => scrollTo("projects")} style={{
                  background: T.navy, color: T.buttonText, border: "none", borderRadius: 8, padding: "13px 30px",
                  fontFamily: "'Epilogue',sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer",
                  transition: "background 0.2s",
                }}
                  onMouseEnter={e => e.target.style.background = T.accent}
                  onMouseLeave={e => e.target.style.background = T.navy}
                >View Projects →</button>
                <a href="/PiyushKumarCV_.pdf" download="PiyushKumarCV_.pdf" style={{
                  display: "inline-flex", alignItems: "center",
                  border: `1px solid ${T.border}`, borderRadius: 8, padding: "13px 26px",
                  fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: T.muted,
                  textDecoration: "none", transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.target.style.borderColor = T.navy; e.target.style.color = T.navy; }}
                  onMouseLeave={e => { e.target.style.borderColor = T.border; e.target.style.color = T.muted; }}
                >↓ Download CV</a>
              </div>
            </div>

            {/* Right: Photo */}
            <div style={{ flexShrink: 0, animation: heroVis ? "fadeIn 0.9s ease 0.2s both" : "none", opacity: 0 }}>
              <div className="hero-photo-box" style={{
                width: 220, height: 280, borderRadius: 20,
                overflow: "hidden", border: `2px solid ${T.border}`,
                position: "relative",
                boxShadow: T.shadow,
              }}>
                {/* 
                  ── PHOTO SLOT ──
                  Replace the src below with your actual photo URL or import.
                  e.g. src="/piyush.jpg"  (put file in /public)
                */}
                <img
                  src="/IMG_20260305_205743_220.webp"
                  alt="Piyush Kumar"
                  onError={() => setPhotoErr(true)}
                  style={{ display: photoErr ? "none" : "block", width: "100%", height: "100%", objectFit: "cover" }}
                />
                {/* Placeholder shown until real photo is set */}
                {photoErr ? (
                  <div style={{
                    position: "absolute", inset: 0,
                    background: T.heroFallbackBg,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: 12,
                  }}>
                    {/* Silhouette SVG */}
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="40" cy="30" r="18" fill={T.accent} fillOpacity="0.25" />
                      <ellipse cx="40" cy="72" rx="28" ry="18" fill={T.accent} fillOpacity="0.15" />
                      <circle cx="40" cy="30" r="14" fill={T.accent} fillOpacity="0.4" />
                    </svg>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: T.accent, textAlign: "center", lineHeight: 1.5 }}>Add your<br />photo here</span>
                  </div>
                ) : null}
                {/* Name label below photo */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  background: T.photoLabelBg, backdropFilter: "blur(4px)",
                  padding: "12px 14px",
                }}>
                  <div style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 700, fontSize: 13, color: T.buttonText }}>Piyush Kumar</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: themeMode === "dark" ? "rgba(226,232,240,0.75)" : "rgba(255,255,255,0.6)", marginTop: 2 }}>Data Scientist</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="section-pad" style={{ padding: "100px 6%", background: T.bgOff, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.accent, marginBottom: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>Work history</p>
          <h2 className="section-heading" style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 900, fontSize: 40, color: T.navy, letterSpacing: "-0.02em", marginBottom: 56 }}>Experience</h2>

          <div ref={expRef} style={{
            display: "flex", flexDirection: "column", gap: 0,
            opacity: expVis ? 1 : 0, transform: expVis ? "none" : "translateY(24px)",
            transition: "all 0.6s ease",
          }}>
            {experience.map((exp, i) => (
              <div key={i} className="exp-row" style={{
                display: "grid", gridTemplateColumns: "220px 1fr",
                gap: 48, padding: "36px 0",
                borderTop: `1px solid ${T.border}`,
                borderBottom: i === experience.length - 1 ? `1px solid ${T.border}` : "none",
              }}>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.accent, marginBottom: 6, letterSpacing: "0.04em" }}>{exp.period}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.muted }}>{exp.location}</div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 800, fontSize: 20, color: T.navy, marginBottom: 4 }}>{exp.role}</div>
                  <div style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 600, fontSize: 14, color: T.accent, marginBottom: 20 }}>{exp.company}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {exp.points.map((pt, j) => (
                      <div key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: T.accent, flexShrink: 0, marginTop: 7 }} />
                        <span style={{ fontFamily: "'Source Serif 4',serif", fontWeight: 300, fontSize: 15, color: T.muted, lineHeight: 1.7 }}>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section-pad" style={{ padding: "100px 6%", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.accent, marginBottom: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>Selected work</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 56, flexWrap: "wrap", gap: 12 }}>
            <h2 className="section-heading" style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 900, fontSize: 40, color: T.navy, letterSpacing: "-0.02em" }}>Projects</h2>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.muted }}>{featuredProjects.length} projects · hover to explore</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 28 }}>
            {featuredProjects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} onOpenDetails={openProjectDetails} T={T} />)}
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
            <button onClick={() => navigate("/projects")} style={{
              background: T.navy,
              color: T.buttonText,
              border: "none",
              borderRadius: 8,
              padding: "12px 24px",
              fontFamily: "'Epilogue',sans-serif",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => e.target.style.background = T.accent}
              onMouseLeave={e => e.target.style.background = T.navy}
            >See More Projects →</button>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="section-pad" style={{ padding: "100px 6%", background: T.bgOff, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.accent, marginBottom: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>Core competencies</p>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 64, flexWrap: "wrap", gap: 12 }}>
            <h2 className="section-heading" style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 900, fontSize: 40, color: T.navy, letterSpacing: "-0.02em" }}>Skills & Tools</h2>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.muted }}>
              {skillGroups.reduce((s, g) => s + g.skills.length, 0)} tools · 4 domains
            </span>
          </div>

          <div ref={skillRef} className="skills-grid" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px 80px",
            opacity: skillVis ? 1 : 0, transition: "opacity 0.5s ease",
          }}>
            {skillGroups.map((group, gi) => (
              <div key={group.category}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, paddingBottom: 14, borderBottom: `1px solid ${T.border}` }}>
                  <span style={{ fontSize: 15 }}>{group.icon}</span>
                  <span style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 700, fontSize: 13, color: T.navy, letterSpacing: "0.05em", textTransform: "uppercase" }}>{group.category}</span>
                </div>
                {group.skills.map((s, si) => <SkillRow key={s.name} skill={s} delay={gi * 0.12 + si * 0.07} T={T} />)}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 52, paddingTop: 28, borderTop: `1px solid ${T.border}`, display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.muted }}>Proficiency scale →</span>
            {[["0–60%", "Familiar", 0.35], ["61–79%", "Proficient", 0.65], ["80–100%", "Advanced", 1]].map(([range, label, op]) => (
              <div key={label} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ width: 28, height: 4, background: T.accent, borderRadius: 2, opacity: op }} />
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.muted }}>{range} · {label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section-pad" style={{ padding: "100px 6%", borderBottom: `1px solid ${T.border}` }}>
        <div className="about-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.accent, marginBottom: 16, letterSpacing: "0.1em", textTransform: "uppercase" }}>About</p>
            <h2 className="section-heading" style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 900, fontSize: 40, color: T.navy, marginBottom: 32, letterSpacing: "-0.02em", lineHeight: 1.1 }}>The person<br />behind the models</h2>
            <p style={{ fontFamily: "'Source Serif 4',serif", fontWeight: 300, fontSize: 17, color: T.muted, lineHeight: 1.8, marginBottom: 20 }}>{profile.bio1}</p>
            <p style={{ fontFamily: "'Source Serif 4',serif", fontWeight: 300, fontSize: 17, color: T.muted, lineHeight: 1.8 }}>{profile.bio2}</p>
          </div>
          <div>
            {[
              ["Education",   "B.Tech — Lovely Professional University\n2020 – 2024"],
              ["Experience",  "SOUL AI · KPIT Technologies"],
              ["Speciality",  "Fraud Detection · Recommender Systems\nSustainability Analytics"],
              ["Approach",    "Explainable ML · Business-first thinking"],
              ["Contact",     profile.email],
            ].map(([k, v], i) => (
              <div key={k} style={{
                display: "grid", gridTemplateColumns: "140px 1fr", padding: "18px 0",
                borderBottom: `1px solid ${T.border}`,
                borderTop: i === 0 ? `1px solid ${T.border}` : "none",
              }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: "0.06em", paddingTop: 2 }}>{k}</span>
                <span style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 600, fontSize: 13, color: T.ink, lineHeight: 1.6, whiteSpace: "pre-line" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section-pad" style={{ padding: "100px 6%" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.accent, marginBottom: 20, letterSpacing: "0.1em", textTransform: "uppercase" }}>Get in touch</p>
          <h2 className="contact-heading" style={{ fontFamily: "'Epilogue',sans-serif", fontWeight: 900, fontSize: 56, color: T.navy, letterSpacing: "-0.03em", lineHeight: 1.0, marginBottom: 24 }}>
            Let's talk<span style={{ color: T.accent }}>.</span>
          </h2>
          <p style={{ fontFamily: "'Source Serif 4',serif", fontStyle: "italic", fontWeight: 300, fontSize: 18, color: T.muted, lineHeight: 1.7, marginBottom: 48 }}>
            I'm actively looking for entry-level data scientist roles. Comfortable working cross-functionally and contributing from day one.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            {[
              { label: profile.email,   href: `mailto:${profile.email}`, primary: true },
              { label: "LinkedIn",      href: profile.linkedin },
              { label: "GitHub",        href: profile.github },
              { label: "CV",    href: "/PiyushKumarCV_.pdf" },
            ].map(({ label, href, primary }) => (
              <a key={label} href={href} style={{
                display: "inline-block", padding: "13px 26px",
                background: primary ? T.navy : "transparent",
                border: `1px solid ${primary ? T.navy : T.border}`,
                borderRadius: 8, color: primary ? T.buttonText : T.muted, textDecoration: "none",
                fontFamily: primary ? "'Epilogue',sans-serif" : "'JetBrains Mono',monospace",
                fontWeight: primary ? 700 : 400, fontSize: primary ? 14 : 12, transition: "all 0.2s",
              }}
                onMouseEnter={e => { if (primary) { e.target.style.background = T.accent; e.target.style.borderColor = T.accent; } else { e.target.style.borderColor = T.navy; e.target.style.color = T.navy; } }}
                onMouseLeave={e => { if (primary) { e.target.style.background = T.navy; e.target.style.borderColor = T.navy; } else { e.target.style.borderColor = T.border; e.target.style.color = T.muted; } }}
              >{label}</a>
            ))}
          </div>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.muted, marginTop: 32 }}>
            📞 {profile.phone}
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="site-footer" style={{ padding: "24px 6%", borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.muted }}>© 2026 Piyush Kumar</span>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.muted }}>Built with React</span>
      </footer>
    </div>
  );
}
