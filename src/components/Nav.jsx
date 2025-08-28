import React from "react";
import ScrambleText from "./ScrambleText.jsx";
import { useTheme, useTokens } from "./ThemeProvider.jsx";

/**
 * Archv Header — light theme only
 * - Brand + links left; Login + clock right
 * - Continuous bottom rule, matching page paddings
 * - Clicking brand stows/reveals ONLY the links
 * - Logo now uses archv-logo.png (black-forced)
 */

export default function Nav() {
  // Always light (provider forces it)
  const { theme } = useTheme();
  const t = useTokens(theme);

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

  // Use ONLY archv-logo.png
  let logoUrl = "/archv-logo.png";
  try {
    logoUrl = new URL("../assets/archv-logo.png", import.meta.url).href;
  } catch {}

  return (
    <>
      <style>{`
        :root { --header-h: 56px; }
        .archv-header { position: sticky; top: 0; z-index: 60; }
        /* full-bleed bottom rule */
        .archv-header::after{
          content:""; position:absolute; left:0; right:0; bottom:0; height:1px;
          background: color-mix(in oklab, currentColor 18%, transparent);
          pointer-events:none;
        }
        .archv-inner{ height:var(--header-h); display:flex; align-items:center; }

        .archv-nav-wrap {
          transition: transform .38s cubic-bezier(.22,.61,.36,1),
                      clip-path .38s cubic-bezier(.22,.61,.36,1),
                      opacity .28s ease;
        }
        .archv-nav-open { transform: translateX(0) scaleX(1); clip-path: inset(0 0 0 0); opacity:1; }
        .archv-nav-stowed { transform: translateX(-8px) scaleX(.62); clip-path: inset(0 98% 0 0); opacity:0; pointer-events:none; }
        @media (prefers-reduced-motion: reduce){
          .archv-nav-wrap { transition: none !important; }
        }
      `}</style>

      <header
        className={`archv-header w-full relative ${t.pageBg} ${t.pageText} ${t.font}`}
      >
        {/* match page paddings for seamless line */}
        <div className="archv-inner mx-0 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14">
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
                {/* Force the single logo to render BLACK */}
                <img
                  src={logoUrl}
                  alt="Archv mark"
                  className="h-[18px] w-auto object-contain"
                  style={{
                    filter: "brightness(0)", // makes any light logo appear black
                    imageRendering: "crisp-edges",
                  }}
                  draggable="false"
                />

                <ScrambleText
                  key={stowed ? "archv-out" : "archv-in"}
                  text="ARCHV"
                  duration={600}
                  scrambleSet="symbols"
                  className="text-[13px] tracking-[0.12em] uppercase"
                />
              </button>

              <div
                className={`overflow-hidden archv-nav-wrap ${
                  stowed ? "archv-nav-stowed" : "archv-nav-open"
                }`}
              >
                <nav className="flex items-center gap-4 sm:gap-5 text-[12.5px] whitespace-nowrap">
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

            {/* RIGHT: Login + clock */}
            <div className="flex items-center gap-3">
              <a
                href="/login"
                className="inline-flex items-center px-4 py-2 rounded-lg border border-current/60 hover:bg-black/5 transition text-[13px]"
              >
                Login
              </a>
              <span className="text-[12px] opacity-70 tabular-nums">
                <LiveClock />
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

/* ----------------------------- Live Clock ----------------------------- */
function LiveClock() {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const h = now.getHours();
  const H = ((h + 11) % 12) + 1;
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  return <>{`${H}:${m}:${s} ${ampm}`}</>;
}
