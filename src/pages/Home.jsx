import React, { useEffect, useRef, useState } from "react";
import Nav from "../components/Nav.jsx";
import { useTheme, useTokens } from "../components/ThemeProvider.jsx";
import logoSvg from "../assets/ARCHV (2).svg";
import { Linkedin } from "lucide-react";
import SideProductum, {
  SideProductumStyles,
} from "../components/SideProductum.jsx";

/* ----------------- Page ----------------- */
export default function Home() {
  const { theme } = useTheme();
  const t = useTokens(theme);
  const footerRef = useRef(null);

  // Keep a CSS var with the live footer height so the bubble can sit above it on all screens
  useEffect(() => {
    const updateFooterH = () => {
      const h = footerRef.current?.offsetHeight || 56;
      document.documentElement.style.setProperty("--footer-h", `${h}px`);
    };
    updateFooterH();
    const ro = new ResizeObserver(updateFooterH);
    if (footerRef.current) ro.observe(footerRef.current);
    window.addEventListener("resize", updateFooterH);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateFooterH);
    };
  }, []);

  return (
    <div
      className={`min-h-screen ${t.pageBg} ${t.pageText} ${t.font} flex flex-col`}
    >
      <StyleFlickerAndPulse />
      <Nav />

      <main className="flex-1 w-full mx-0 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 py-5 relative">
        <header className="mt-10 md:mt-14">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6">
              <h1 className="text-[34px] sm:text-[40px] md:text-[48px] leading-[1.05] font-medium tracking-tight">
                Archv
              </h1>
              <p className="mt-3 max-w-[56ch] text-sm sm:text-[15px] opacity-80">
                We are a security-first company and everything we build is
                designed around that principle. Every access, query, and change
                is logged in detail with full audit trails. You decide the
                retention policies, the level of granularity, and the reporting
                you require. Whether you need lightweight visibility or
                enterprise-grade compliance logs, we provide verifiable records
                of who did what, when, and from where.
              </p>
            </div>
          </div>
        </header>

        <section className="relative mt-12 md:mt-16">
          <CenterLogoBoot />
        </section>
      </main>

      {/* FOOTER (measured by ResizeObserver) */}
      <footer
        ref={footerRef}
        className="w-full border-t border-current/10 py-3 px-4 sm:px-6 md:px-8 relative"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] tracking-wide opacity-70 gap-3">
          <span>© {new Date().getFullYear()} Archv</span>
          <div className="flex items-center gap-4 opacity-80">
            <a
              href="https://www.linkedin.com/company/archvai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
          <span className="design-iteration">design iteration 9</span>
        </div>
      </footer>

      {/* About bubble sits outside footer and auto-offsets above it */}
      <AboutUsBubble />

      <SideProductum />
      <SideProductumStyles />
    </div>
  );
}

/* ----------------- Center Logo ----------------- */
function CenterLogoBoot() {
  const [booting, setBooting] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 2100);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="w-full grid place-items-center py-10">
      <img
        src={logoSvg}
        alt="ARCHV mark"
        draggable="false"
        className={[
          "select-none",
          "h-[140px] sm:h-[180px] md:h-[220px] lg:h-[260px] xl:h-[300px]",
          booting ? "archv-boot-flicker" : "archv-boot-stable",
          "archv-logo-breathe",
        ].join(" ")}
      />
    </div>
  );
}

/* ----------------- About Us Bubble ----------------- */
function AboutUsBubble() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed left-4 sm:left-6 z-40 flex items-end gap-2 pointer-events-none about-pos">
        <div className="pointer-events-auto h-10 w-10 rounded-full border border-current/15 grid place-items-center bg-black/5 dark:bg-white/5 backdrop-blur">
          <img
            src={logoSvg}
            alt="Archv logo"
            className="h-6 w-6 select-none"
            draggable="false"
          />
        </div>

        <button
          onClick={() => setOpen(true)}
          className="pointer-events-auto group inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs border border-current/15 bg-black/5 dark:bg-white/5 hover:bg-black/10 hover:dark:bg-white/10 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 opacity-80 group-hover:opacity-100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M21 12a8.5 8.5 0 0 1-8.5 8.5c-1.3 0-2.6-.3-3.7-.8L3 21l1.3-4A8.5 8.5 0 1 1 21 12Z" />
          </svg>
          <span>About us</span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[10000]">
          {/* overlay */}
          <div
            className="absolute inset-0 z-0 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
          {/* modal */}
          <div
            className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                       w-[92vw] max-w-md rounded-2xl border border-black/10 dark:border-white/10
                       bg-white dark:bg-neutral-900 shadow-xl p-5 text-black dark:text-white"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <img src={logoSvg} alt="Archv" className="h-6 w-6" />
                <h2 className="text-sm font-medium">Archv team</h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="p-1 rounded hover:bg-black/10 hover:dark:bg-white/10 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <TeamMember
                initials="JK"
                name="Joonhyuk “Jay” Kim"
                title="CEO & Co-Founder"
                link="https://www.linkedin.com/in/joonhyuknkim/"
              />
              <TeamMember
                initials="KT"
                name="Kevin Thomas"
                title="CTO & Co-Founder"
                link="https://www.linkedin.com/in/kevin-thomas-786314214/"
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        .about-pos {
          bottom: calc(var(--footer-h, 56px) + env(safe-area-inset-bottom, 0px) + 16px);
        }
        @media (max-width: 640px) {
          .about-pos {
            bottom: calc(var(--footer-h, 64px) + env(safe-area-inset-bottom, 0px) + 28px);
          }
        }
      `}</style>
    </>
  );
}

function TeamMember({ initials, name, title, link }) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-10 w-10 rounded-full border border-current/15 grid place-items-center text-xs select-none">
        {initials}
      </div>
      <div>
        <p className="text-sm">
          <span className="font-medium">{name}</span> — {title}
        </p>
        <p className="text-[13px] opacity-80 mb-1">
          3rd-year Computer Engineering
        </p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-blue-500 hover:underline"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}

/* ----------------- Visual FX ----------------- */
function StyleFlickerAndPulse() {
  return (
    <style>{`
      @keyframes archvFlicker {
        0% { opacity: .08; transform: translateY(0px) scale(.98); }
        6% { opacity: .65; transform: translateY(-1px) scale(1.00); }
        10% { opacity: .22; transform: translateY(1px) scale(.99); }
        18% { opacity: .9;  transform: translateY(0px) scale(1.01); }
        26% { opacity: .35; transform: translateY(-1px) }
        34% { opacity: .85; transform: translateY(0px) }
        42% { opacity: .28; transform: translateY(1px) }
        50% { opacity: .95; transform: translateY(0px) }
        62% { opacity: .4;  transform: translateY(-1px) }
        74% { opacity: .88; transform: translateY(0px) }
        86% { opacity: .55; transform: translateY(1px) }
        100% { opacity: 1;   transform: translateY(0px) scale(1.0); }
      }
      .archv-boot-flicker { animation: archvFlicker 2.1s steps(24, end) both; }
      .archv-boot-stable  { opacity: 1; transform: none; }

      @keyframes sherbetPulse {
        0%  { filter: drop-shadow(0 0 6px rgba(255,106,0,.22)) drop-shadow(0 0 14px rgba(255,106,213,.18)); }
        50% { filter: drop-shadow(0 0 12px rgba(255,106,0,.45)) drop-shadow(0 0 28px rgba(255,106,213,.36)); }
        100%{ filter: drop-shadow(0 0 6px rgba(255,106,0,.22)) drop-shadow(0 0 14px rgba(255,106,213,.18)); }
      }
      .archv-logo-breathe { animation: sherbetPulse 2.8s ease-in-out infinite; will-change: filter, opacity, transform; }

      .design-iteration { animation: iterationGlow 3.5s infinite ease-in-out; }
      @keyframes iterationGlow {
        0%, 100% { color: rgba(255,106,0,.6); text-shadow: 0 0 4px rgba(255,106,0,.35); }
        50% { color: rgba(255,106,0,1); text-shadow: 0 0 8px rgba(255,106,0,.6); }
      }
    `}</style>
  );
}
