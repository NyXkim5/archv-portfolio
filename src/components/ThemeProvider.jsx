import React from "react";

const ThemeContext = React.createContext({
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
});
export const useTheme = () => React.useContext(ThemeContext);

export function ThemeProvider({ children }) {
  // Force light theme everywhere
  React.useLayoutEffect(() => {
    try {
      document.documentElement.classList.remove("dark"); // ensure Tailwind is in light mode
      localStorage.setItem("archv:theme", "light");
    } catch {}
  }, []);

  const ctx = React.useMemo(
    () => ({
      theme: "light",
      setTheme: () => {}, // no-op
      toggleTheme: () => {}, // no-op
    }),
    []
  );

  return <ThemeContext.Provider value={ctx}>{children}</ThemeContext.Provider>;
}

/** Monochrome (black / white / silver) tokens — LIGHT ONLY */
export function useTokens(/* theme */) {
  return {
    pageBg: "bg-[#f7f7f8]",
    pageText: "text-zinc-900",
    faint: "text-zinc-600",
    card: "bg-white border border-zinc-200",
    accentText: "text-zinc-700",
    accentBorder: "border-zinc-400/60",
    ctaText: "text-zinc-800",
    ctaHover: "hover:bg-zinc-200/30",
    font: "font-sans",
  };
}
