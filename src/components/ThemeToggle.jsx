import React from "react";
import { useTheme } from "./ThemeProvider.jsx";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme !== "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={isDark ? "Switch to Daylight" : "Switch to Midnight"}
      aria-label={isDark ? "Switch to Daylight" : "Switch to Midnight"}
      className="rounded-lg border border-white/10 px-3 py-1.5 text-xs tracking-wide
                 hover:bg-white/10 transition"
    >
      {isDark ? "☾ Midnight" : "☀︎ Daylight"}
    </button>
  );
}
