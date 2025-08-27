import React from "react";
import ScrambleText from "./ScrambleText.jsx";
import { useTheme, useTokens } from "./ThemeProvider.jsx";

/**
 * Archv Header — fixed height, full-bleed bottom rule, consistent padding.
 * - Brand + links hug left; theme+clock on right.
 * - Logo swap (no Tailwind dark: dependency):
 *     • LIGHT: "ARCHV (1).png" forced to BLACK via CSS filter
 *     • DARK : "image (2).png" (your white night mark) no filter
 * - Clicking "ARCHV" stows/reveals ONLY the links (not the page).
 */

export default function Nav() {
  // Theme + tokens (safe fallbacks)
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
  const isDark = theme === "dark";

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

  // --- brand mark sources (night/day) ---
  let lightMark = "/ARCHV (1).png"; // base white logo -> forced black via filter in light mode
  let darkMark = "/image (2).png"; // your night white logo
  try {
    lightMark = new URL("../assets/ARCHV (1).png", import.meta.url).href;
  } catch {}
  try {
    darkMark = new URL("../assets/image (2).png", import.meta.url).href;
  } catch {}

  return (
    <>
      <style>{`
        :root { --header-h: 56px; }
        .archv-header { position: sticky; top: 0; z-index: 60; }
        /* full-bleed bottom rule (continuous line) */
        .archv-header::after{
          content:""; position:absolute; left:0; right:0; bottom:0; height:1px;
          background: color-mix(in oklab, currentColor 18%, transparent);
          pointer-events:none;
        }
        .archv-inner{ height:var(--header-h); display:flex; align-items:center; }
        .archv-nav-wrap { max-width: 1000px; }
        .archv-nav-open { transform: translateX(0) scaleX(1); clip-path: inset(0 0 0 0); }
        .archv-nav-stowed { transform: translateX(-8px) scaleX(0.62); clip-path: inset(0 98% 0 0); pointer-events:none; }
        @media (prefers-reduced-motion: reduce){
          .archv-nav-wrap, .archv-nav-wrap nav { transition: none !important; }
        }
      `}</style>

      <header
        className={`archv-header w-full relative ${pageBg} ${pageText} ${font}`}
      >
        {/* IMPORTANT: matches page paddings exactly */}
        <div className="archv-inner mx-0 px-6 md:px-8">
          <div className="flex items-center justify-between w-full gap-3">
            {/* LEFT: brand + links */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setStowed((s) => !s)}
                aria-pressed={stowed}
                aria-expanded={!stowed}
                className="group flex items-center gap-2 select-none focus:outline-none"
                title={stowed ? "Reveal pages" : "Hide pages"}
              >
                {/* Theme-conditional logo: render ONE image, updates on theme change */}
                {isDark ? (
                  <img
                    key="archv-dark"
                    src={darkMark}
                    alt="Archv mark"
                    className="h-[18px] w-auto object-contain select-none"
                    draggable="false"
                  />
                ) : (
                  <img
                    key="archv-light"
                    src={lightMark}
                    alt="Archv mark"
                    className="h-[18px] w-auto object-contain select-none"
                    draggable="false"
                    style={{
                      // force solid black in light mode from white source
                      filter: "brightness(0) saturate(100%)",
                    }}
                  />
                )}

                <ScrambleText
                  key={stowed ? "archv-out" : "archv-in"}
                  text="ARCHV"
                  duration={600}
                  scrambleSet="symbols"
                  className="text-[13px] tracking-[0.12em] uppercase"
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-400 ease-[cubic-bezier(.22,.61,.36,1)] archv-nav-wrap ${
                  stowed ? "archv-nav-stowed" : "archv-nav-open"
                }`}
              >
                <nav
                  className={`flex items-center gap-4 sm:gap-5 text-[12.5px] whitespace-nowrap transition-opacity duration-300 ${
                    stowed ? "opacity-0" : "opacity-100"
                  }`}
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

            {/* RIGHT: theme + clock (no outline) */}
            <div className="flex items-center gap-2">
              <ThemeSwitchMinimal />
              <LiveClock />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

/* ---------- Minimal theme switch (no outline/border) ---------- */
function ThemeSwitchMinimal() {
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
      className="inline-flex items-center gap-2 px-2.5 py-1.5 text-[12px] rounded-[6px] bg-transparent hover:bg-black/5 dark:hover:bg-white/10 transition focus:outline-none"
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

/* ----------------------------- Live Clock ----------------------------- */
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
