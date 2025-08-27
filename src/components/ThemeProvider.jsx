import React from "react";

const ThemeContext = React.createContext({ theme: "dark", setTheme: () => {} });
export const useTheme = () => React.useContext(ThemeContext);

const THEME_KEY = "archv:theme";
const sanitize = (v) => (v === "light" ? "light" : "dark"); // drop any legacy values

export function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(() =>
    sanitize(localStorage.getItem(THEME_KEY) || "dark")
  );
  React.useEffect(() => {
    localStorage.setItem(THEME_KEY, sanitize(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/** Monochrome (black / white / silver) tokens */
export function useTokens(theme) {
  if (theme === "light") {
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
  // dark (Midnight)
  return {
    pageBg: "bg-[#0c0d0f]",
    pageText: "text-zinc-100",
    faint: "text-zinc-400",
    card: "bg-white/5 border border-white/10",
    accentText: "text-zinc-300",
    accentBorder: "border-zinc-500/30",
    ctaText: "text-zinc-100",
    ctaHover: "hover:bg-white/10",
    font: "font-sans",
  };
}
