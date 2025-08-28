// src/pages/Platform.jsx
import React from "react";
import Nav from "../components/Nav.jsx";
import { useTheme, useTokens } from "../components/ThemeProvider.jsx";

export default function Platform() {
  const { theme } = useTheme();
  const t = useTokens(theme);
  const isDark = theme === "dark";
  const mute = isDark ? "text-black/60 dark:text-white/60" : "text-black/60";
  const bx = isDark
    ? "border-black/15 dark:border-white/15"
    : "border-black/15";

  // ✅ Your actual file
  const videoUrl = new URL(
    "../assets/3196061-uhd_3840_2160_25fps.mp4",
    import.meta.url
  ).href;

  return (
    <div
      className={`min-h-screen ${t.pageBg} ${t.pageText} ${t.font} flex flex-col`}
    >
      {/* Same header everywhere */}
      <Nav />

      {/* MAIN — same horizontal paddings as other pages for seamless nav line */}
      <main className="flex-1 w-full mx-0 px-6 md:px-8 py-5 relative">
        {/* hairline to visually continue the header rule */}
        <div className="mt-2 border-b border-current/10" />

        {/* local styles (glitch) */}
        <style>{`
          @keyframes archv-glitchA {
            0% { transform: translate(0,0); clip-path: inset(0 0 75% 0) }
            25% { transform: translate(-2px,1px); clip-path: inset(10% 0 55% 0) }
            50% { transform: translate(2px,-1px); clip-path: inset(35% 0 25% 0) }
            75% { transform: translate(-1px,2px); clip-path: inset(55% 0 10% 0) }
            100% { transform: translate(0,0); clip-path: inset(0 0 0 0) }
          }
          @keyframes archv-glitchB {
            0% { transform: translate(0,0); clip-path: inset(70% 0 0 0) }
            25% { transform: translate(1px,-2px); clip-path: inset(50% 0 5% 0) }
            50% { transform: translate(-2px,2px); clip-path: inset(25% 0 30% 0) }
            75% { transform: translate(2px,-1px); clip-path: inset(5% 0 55% 0) }
            100% { transform: translate(0,0); clip-path: inset(0 0 0 0) }
          }
          .archv-g-text { position: relative; }
          .archv-g-layer { position:absolute; inset:0; pointer-events:none; opacity:.9; }
          .archv-g-a { animation: archv-glitchA 320ms steps(12,end); mix-blend-mode: screen; }
          .archv-g-b { animation: archv-glitchB 320ms steps(12,end); mix-blend-mode: screen; }
          @media (prefers-reduced-motion: reduce) {
            .archv-g-a, .archv-g-b { animation: none !important; }
          }
        `}</style>

        {/* Hero row */}
        <section className="mt-8 grid grid-cols-12 gap-6 lg:gap-10">
          {/* Left — copy */}
          <div className="col-span-12 lg:col-span-7">
            <h1 className="text-[34px] sm:text-[42px] md:text-[54px] leading-[1.02] font-medium tracking-tight">
              Archv AI Platform
            </h1>
            <p className={`mt-3 max-w-[60ch] text-sm sm:text-[15px] ${mute}`}>
              Calm software for real work—private by default, simple to run, and
              designed to make teams faster without the drama.
            </p>

            {/* key bullets */}
            <div className="mt-6 grid grid-cols-12 gap-4">
              <Feature
                title="Private by default"
                className="col-span-12 sm:col-span-6"
              />
              <Feature
                title="Fast, simple answers"
                className="col-span-12 sm:col-span-6"
              />
              <Feature
                title="Auditable sources"
                className="col-span-12 sm:col-span-6"
              />
              <Feature
                title="Fits your stack"
                className="col-span-12 sm:col-span-6"
              />
            </div>

            {/* CTA */}
            <div className="mt-6">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 border border-current hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
              >
                See a short demo <span>↗</span>
              </a>
            </div>
          </div>

          {/* Right — video (cropped nicely) + glitch phrases */}
          <div className="col-span-12 lg:col-span-5">
            <VideoPanel src={videoUrl} />
            <div className="mt-3">
              <GlitchRotator
                phrases={[
                  "Optimize the work, not the noise. — Archv",
                  "Security without slowdown. — Archv",
                  "Private by default. — Archv",
                  "Safer by design. — Archv",
                  "More efficient teams, fewer tabs. — Archv",
                ]}
                intervalMs={2600}
              />
            </div>
          </div>
        </section>

        {/* mid divider */}
        <div className={`mt-10 border-t ${bx}`} />

        {/* Simple spec row */}
        <section className="mt-6 grid grid-cols-12">
          <Spec label="Deploy" value="Cloud or your VPC" />
          <Spec label="Identity" value="SSO · simple roles" />
          <Spec label="Exports" value="Answers with sources" />
          <Spec label="Support" value="Plain language, real docs" />
        </section>
      </main>

      {/* footer */}
      <footer className="w-full border-t border-current/10 py-3 px-6 md:px-8 text-[11px] opacity-70 flex items-center justify-between">
        <span>© {new Date().getFullYear()} Archv</span>
        <span>design iteration 2</span>
      </footer>
    </div>
  );
}

/* ---------------- components ---------------- */

function Feature({ title, className = "" }) {
  return (
    <div className={`border border-current/15 px-3 py-3 ${className}`}>
      <div className="text-[11px] tracking-[0.22em] uppercase opacity-60">
        Feature
      </div>
      <div className="text-base sm:text-lg mt-1">{title}</div>
    </div>
  );
}

function Spec({ label, value }) {
  return (
    <div className="col-span-12 sm:col-span-6 lg:col-span-3 border-b border-current/10 py-3">
      <div className="text-[11px] tracking-[0.22em] uppercase opacity-60">
        {label}
      </div>
      <div className="text-lg">{value}</div>
    </div>
  );
}

/** Responsive, nicely-cropped video panel (object-cover) */
function VideoPanel({ src, poster }) {
  return (
    <div className="relative overflow-hidden border border-current/10 bg-black/5 dark:bg-white/5 h-[520px] md:h-[620px]">
      <video
        src={src}
        poster={poster}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        autoPlay
        muted
        loop
        preload="metadata"
      />
      {/* subtle top/bottom fade so the crop feels intentional */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-current/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-current/10 to-transparent" />
    </div>
  );
}

/** Glitch phrase rotator (fast, tasteful) */
function GlitchRotator({ phrases = [], intervalMs = 2600 }) {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [i, setI] = React.useState(0);
  const [glitch, setGlitch] = React.useState(false);

  React.useEffect(() => {
    if (phrases.length < 2) return;
    let timer = 0;
    const cycler = setInterval(() => {
      if (!prefersReduced) {
        setGlitch(true);
        timer = window.setTimeout(() => {
          setI((n) => (n + 1) % phrases.length);
        }, 150);
        window.setTimeout(() => setGlitch(false), 320);
      } else {
        setI((n) => (n + 1) % phrases.length);
      }
    }, intervalMs);
    return () => {
      clearInterval(cycler);
      if (timer) clearTimeout(timer);
    };
  }, [phrases, intervalMs, prefersReduced]);

  const text = phrases[i] || "";

  return (
    <div className="relative">
      <div className="archv-g-text text-sm sm:text-[15px]">
        <span>{text}</span>
        {glitch && !prefersReduced && (
          <>
            <span className="archv-g-layer archv-g-a">{text}</span>
            <span className="archv-g-layer archv-g-b">{text}</span>
          </>
        )}
      </div>
    </div>
  );
}
