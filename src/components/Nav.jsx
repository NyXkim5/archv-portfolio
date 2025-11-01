import React from "react";
import ScrambleText from "./ScrambleText.jsx";
import { useTheme, useTokens } from "./ThemeProvider.jsx";
import LegalTrigger from "./LegalTrigger.jsx";
import archvLogo from "../assets/archv-logo.png";

/**
 * Responsive Archv Header
 * - Desktop: brand + nav left; Login + Legal + clock right
 * - Mobile: brand left; Menu button toggles vertical menu
 * - Remembers stow (desktop only)
 */

export default function Nav() {
  const { theme } = useTheme();
  const t = useTokens(theme);

  const [stowed, setStowed] = React.useState(false); // desktop stow toggle
  const [mobileOpen, setMobileOpen] = React.useState(false); // mobile menu toggle

  // restore stow state
  React.useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const last = window.sessionStorage.getItem("archv:stowed");
        if (last === "1") setStowed(true);
      }
    } catch {}
  }, []);

  // persist stow state
  React.useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("archv:stowed", stowed ? "1" : "0");
      }
    } catch {}
  }, [stowed]);

  // close mobile menu when resizing to desktop
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setMobileOpen(false);
    mq.addEventListener?.("change", onChange);
    mq.addListener?.(onChange);
    return () => {
      mq.removeEventListener?.("change", onChange);
      mq.removeListener?.(onChange);
    };
  }, []);

  // lock body scroll when menu open
  React.useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <>
      <style>{`
        :root { --header-h: 56px; }
        .archv-header { position: sticky; top: 0; z-index: 60; }
        .archv-header::after {
          content:""; position:absolute; left:0; right:0; bottom:0; height:1px;
          background: currentColor; opacity:.18; pointer-events:none;
        }
        .archv-inner { height:var(--header-h); display:flex; align-items:center; }
        .archv-nav-wrap {
          transition: transform .38s cubic-bezier(.22,.61,.36,1),
                      clip-path .38s cubic-bezier(.22,.61,.36,1),
                      opacity .28s ease;
        }
        .archv-nav-open { transform: translateX(0) scaleX(1); clip-path: inset(0 0 0 0); opacity:1; }
        .archv-nav-stowed { transform: translateX(-8px) scaleX(.62); clip-path: inset(0 98% 0 0); opacity:0; pointer-events:none; }
        @media (prefers-reduced-motion: reduce) {
          .archv-nav-wrap { transition: none !important; }
        }
      `}</style>

      <header
        className={`archv-header w-full relative ${t.pageBg} ${t.pageText} ${t.font}`}
      >
        {/* Top bar */}
        <div className="archv-inner mx-0 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14">
          <div className="flex items-center justify-between w-full gap-3">
            {/* LEFT: brand + desktop nav */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setStowed((s) => !s)}
                aria-pressed={stowed ? "true" : "false"}
                aria-expanded={!stowed ? "true" : "false"}
                className="group flex items-center gap-2 select-none focus:outline-none"
                title={stowed ? "Reveal pages" : "Hide pages"}
              >
                <img
                  src={archvLogo}
                  alt="Archv mark"
                  className="h-[18px] w-auto object-contain"
                  style={{ imageRendering: "crisp-edges" }}
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

              {/* Desktop links */}
              <div
                className={`overflow-hidden archv-nav-wrap hidden md:block ${
                  stowed ? "archv-nav-stowed" : "archv-nav-open"
                }`}
              >
                <nav
                  className="flex items-center gap-4 sm:gap-5 text-[12.5px] whitespace-nowrap"
                  role="navigation"
                  aria-label="Primary"
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

            {/* RIGHT: desktop actions */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="/login"
                className="inline-flex items-center px-4 py-2 rounded-lg border border-current/60 hover:bg-black/5 transition text-[13px]"
              >
                Login
              </a>
              <LegalTrigger />
              <span className="text-[12px] opacity-70 tabular-nums">
                <LiveClock />
              </span>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileOpen ? "true" : "false"}
                aria-controls="mobile-menu"
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 border border-current/50 active:scale-[0.98]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M3 6h18M3 12h18M3 18h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-[13px]">Menu</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        <div
          id="mobile-menu"
          className={`md:hidden ${
            mobileOpen ? "block" : "hidden"
          } px-4 sm:px-6 pb-4`}
        >
          <nav
            className="flex flex-col gap-3 text-[14px] pt-2"
            role="navigation"
            aria-label="Mobile menu"
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

            <div className="h-px bg-current/15 my-1" />

            <a
              href="/login"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-current/60 hover:bg-black/5 transition text-[13px]"
            >
              Login
            </a>

            <div className="flex items-center justify-between">
              <LegalTrigger />
              <span className="text-[12px] opacity-70 tabular-nums">
                <LiveClock compact />
              </span>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

/* ----------------------------- Live Clock ----------------------------- */
function LiveClock({ compact = false }) {
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
  return <>{compact ? `${H}:${m} ${ampm}` : `${H}:${m}:${s} ${ampm}`}</>;
}
