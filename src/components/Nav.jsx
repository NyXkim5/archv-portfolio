import React from "react";
import ScrambleText from "./ScrambleText.jsx";
import { useTheme, useTokens } from "./ThemeProvider.jsx";

/**
 * Nav (Archv) — tight edges, auto-inverting logo, boxed theme button.
 * - Left: brand + links. Click brand to stow/reveal links (page stays visible).
 * - Right: boxed light/dark switch + live clock, tucked closer to right edge.
 * - Uses ThemeProvider tokens if present (old look), with safe fallbacks.
 */

export default function Nav() {
  // Try to use your ThemeProvider tokens for the original header look
  let themeCtx = {};
  try {
    themeCtx = useTheme?.() || {};
  } catch {}
  const theme =
    themeCtx.theme ||
    (typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
      ? "dark"
      : "light");

  let t = {};
  try {
    t = useTokens ? useTokens(theme) : {};
  } catch {}
  const pageBg = t.pageBg || (theme === "dark" ? "bg-neutral-950" : "bg-white");
  const pageText =
    t.pageText || (theme === "dark" ? "text-neutral-100" : "text-neutral-900");
  const font = t.font || "antialiased";

  const [stowed, setStowed] = React.useState(false);

  React.useEffect(() => {
    try {
      const last = sessionStorage.getItem("archv:stowed");
      if (last === "1") setStowed(true);
    } catch {}
  }, []);
  React.useEffect(() => {
    try {
      sessionStorage.setItem("archv:stowed", stowed ? "1" : "0");
    } catch {}
  }, [stowed]);

  // Logo (prefer src/assets, fallback to /public)
  let logoUrl = "/ARCHV (1).png";
  try {
    logoUrl = new URL("../assets/ARCHV (1).png", import.meta.url).href;
  } catch {}

  return (
    <>
      <StyleNavCSS />

      <header
        className={`w-full sticky top-0 z-[60] ${pageBg} ${pageText} ${font} border-b border-current/10`}
      >
        {/* tighter horizontal padding so it hugs edges more */}
        <div className="mx-0 px-3 sm:px-4 md:px-6 lg:px-7 xl:px-8 py-3.5">
          <div className="flex items-center justify-between gap-4">
            {/* LEFT: brand + pages (kept left) */}
            <div className="flex items-center gap-4 min-w-0">
              {/* Brand toggler (stows only the links) */}
              <button
                onClick={() => setStowed((s) => !s)}
                aria-pressed={stowed}
                aria-expanded={!stowed}
                className="group flex items-center gap-2 select-none focus:outline-none"
                title={stowed ? "Reveal pages" : "Hide pages"}
              >
                {/* Auto-invert logo: dark mode => white, light => dark */}
                <img
                  src={logoUrl}
                  alt="Archv mark"
                  className="h-[18px] w-auto object-contain transition dark:invert"
                  draggable="false"
                />
                <ScrambleText
                  key={stowed ? "archv-out" : "archv-in"} // retrigger on toggle
                  text="Archv"
                  duration={780}
                  scrambleSet="symbols"
                  className="text-[13px] sm:text-[14px] tracking-[0.12em] uppercase"
                />
              </button>

              {/* Page links — slide/clip into the brand when stowed */}
              <div
                className={[
                  "overflow-hidden transition-all duration-400 ease-[cubic-bezier(.22,.61,.36,1)]",
                  "archv-nav-wrap",
                  stowed ? "archv-nav-stowed" : "archv-nav-open",
                ].join(" ")}
              >
                <nav
                  className={[
                    "flex items-center gap-5 sm:gap-6 text-[12.5px] whitespace-nowrap",
                    "transition-opacity duration-300",
                    stowed ? "opacity-0" : "opacity-100",
                  ].join(" ")}
                >
                  <a className="hover:opacity-80 transition" href="/">
                    Home
                  </a>
                  <a className="hover:opacity-80 transition" href="/platform">
                    Platform
                  </a>
                  <a className="hover:opacity-80 transition" href="/security">
                    Security
                  </a>
                  <a className="hover:opacity-80 transition" href="/philosophy">
                    Philosophy
                  </a>
                  <a className="hover:opacity-80 transition" href="/contact">
                    Contact
                  </a>
                </nav>
              </div>
            </div>

            {/* RIGHT: boxed theme switch + clock (tucked to the edge) */}
            <div className="flex items-center gap-3">
              <ThemeSwitchWithContext />
              <LiveClock />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

/* ---- CSS helper for the stow animation (clips/leans into brand on the left) ---- */
function StyleNavCSS() {
  return (
    <style>{`
      .archv-nav-wrap { max-width: 1000px; }
      .archv-nav-open {
        transform: translateX(0) scaleX(1);
        clip-path: inset(0 0 0 0 round 0);
      }
      .archv-nav-stowed {
        transform: translateX(-8px) scaleX(0.62);
        clip-path: inset(0 98% 0 0 round 0);
        pointer-events: none;
      }
      @media (prefers-reduced-motion: reduce) {
        .archv-nav-wrap, .archv-nav-wrap nav { transition: none !important; }
      }
    `}</style>
  );
}

/* ---------------------------- Theme Switch (boxed) ---------------------------- */
/**
 * Uses ThemeProvider.setTheme if available for your original “mood”.
 * Always mirrors to <html class="dark"> so Tailwind dark styles apply.
 */
function ThemeSwitchWithContext() {
  let ctx = {};
  try {
    ctx = useTheme?.() || {};
  } catch {}
  const current =
    ctx.theme ||
    (typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
      ? "dark"
      : "light");
  const setTheme = ctx.setTheme;
  const isDark = current === "dark";

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    if (typeof setTheme === "function") {
      try {
        setTheme(next);
      } catch {}
    }
    try {
      document.documentElement.classList.toggle("dark", next === "dark");
      localStorage.setItem("archv:theme", next);
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      className={[
        "inline-flex items-center gap-2 px-2.5 py-1.5",
        "text-[12px] rounded-[6px]",
        // boxed outline look
        "border border-current/30 outline outline-1 outline-current/20",
        "hover:bg-black/5 dark:hover:bg-white/10 transition",
      ].join(" ")}
      title={isDark ? "Switch to light" : "Switch to dark"}
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
      <span className="opacity-70">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

/* ------------------------------ Live Clock ------------------------------ */
function LiveClock() {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="text-[12px] opacity-70 tabular-nums">
      {formatTime(now)}
    </span>
  );
}
function formatTime(d) {
  const h = d.getHours();
  const H = ((h + 11) % 12) + 1;
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  return `${H}:${m}:${s} ${ampm}`;
}
