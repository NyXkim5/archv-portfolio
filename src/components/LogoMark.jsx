import React from "react";
import { useTheme } from "./ThemeProvider.jsx";

/**
 * LogoMark
 * - Shows /src/assets/ARCHV (1).png
 * - Wordmark text is exactly "Archv"
 * - Image auto-inverts in dark mode for better contrast
 */
export default function LogoMark() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Vite-friendly URL (handles spaces/parentheses)
  const logoUrl = new URL("../assets/ARCHV (1).png", import.meta.url).href;

  return (
    <div className="flex items-center gap-2 select-none">
      <img
        src={logoUrl}
        alt="Archv logo"
        draggable="false"
        className={
          // Adjust size as you like (e.g., h-7, h-8)
          `h-6 w-auto object-contain transition duration-300 ` +
          (isDark ? "filter invert" : "filter-none")
        }
      />
      {/* Wordmark — exactly "Archv" */}
      <div className="text-[12px] tracking-wide">Archv</div>
    </div>
  );
}
