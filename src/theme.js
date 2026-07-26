export const THEME_STORAGE_KEY = "portfolio-theme-mode";

export const lightTheme = {
  mode: "light",
  bg: "#ffffff",
  bgOff: "#f9fafb",
  ink: "#111827",
  muted: "#6b7280",
  border: "#e5e7eb",
  navy: "#0a1628",
  accent: "#1e6bff",
  accentLt: "#e8f0ff",
  success: "#10b981",
  warn: "#f59e0b",
  buttonText: "#ffffff",
  navBg: "rgba(255,255,255,0.94)",
  photoLabelBg: "rgba(10,22,40,0.85)",
  heroFallbackBg: "linear-gradient(145deg, #e8f0ff 0%, #dbeafe 100%)",
  projectFallbackBg: "linear-gradient(135deg, #e8f0ff, #dbeafe)",
  shadow: "0 20px 60px rgba(0,0,0,0.08)",
  scrollbarThumb: "#d1d5db",
};

export const darkTheme = {
  mode: "dark",
  bg: "#0b1220",
  bgOff: "#0f172a",
  ink: "#e5eefc",
  muted: "#94a3b8",
  border: "#243045",
  navy: "#dbeafe",
  accent: "#60a5fa",
  accentLt: "#172554",
  success: "#34d399",
  warn: "#fbbf24",
  buttonText: "#0b1220",
  navBg: "rgba(15,23,42,0.92)",
  photoLabelBg: "rgba(2,6,23,0.88)",
  heroFallbackBg: "linear-gradient(145deg, #172554 0%, #1e293b 100%)",
  projectFallbackBg: "linear-gradient(135deg, #172554, #1e293b)",
  shadow: "0 20px 60px rgba(0,0,0,0.28)",
  scrollbarThumb: "#334155",
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export function getStoredThemeMode() {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedMode = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedMode === "dark" || storedMode === "light") {
    return storedMode;
  }

  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function getTheme(mode) {
  return themes[mode] || lightTheme;
}

export function getNextThemeMode(mode) {
  return mode === "dark" ? "light" : "dark";
}