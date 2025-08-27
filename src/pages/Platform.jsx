import React from "react";
import Nav from "../components/Nav.jsx";
import { useTheme, useTokens } from "../components/ThemeProvider.jsx";

export default function Platform() {
  const { theme } = useTheme();
  const t = useTokens(theme);
  const isDark = theme === "dark";
  const mute = isDark ? "text-white/60" : "text-black/60";
  const bx = isDark ? "border-white/15" : "border-black/15";

  // Images for the right-side loop (add/remove as you like)
  const imgs = [
    new URL("../assets/14.png", import.meta.url).href,
    new URL("../assets/15.png", import.meta.url).href,
    new URL("../assets/ARCHV (4).png", import.meta.url).href,
    new URL("../assets/ARCHV (5).png", import.meta.url).href,
    new URL("../assets/ARCHV (1).png", import.meta.url).href,
  ];

  return (
    <div
      className={`min-h-screen ${t.pageBg} ${t.pageText} ${t.font} flex flex-col`}
    >
      {/* keep spacing identical to other pages */}
      <div className="flex-1 w-full mx-0 px-6 md:px-8 py-5 relative">
        <Nav />
        {/* thin divider so the header line sits identical across pages */}
        <div className="mt-2 border-b border-current/10" />

        {/* Local styles for the loop column */}
        <style>{`
          @keyframes archv-vert-loop {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          .archv-loop-run {
            animation: archv-vert-loop var(--archv-speed, 36s) linear infinite;
            will-change: transform;
          }
          @media (prefers-reduced-motion: reduce) {
            .archv-loop-run { animation: none !important; }
          }
        `}</style>

        {/* Hero row */}
        <section className="mt-8 grid grid-cols-12 gap-6 lg:gap-10">
          {/* Left — text */}
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

          {/* Right — vertical loop gallery */}
          <div className="col-span-12 lg:col-span-5">
            <LoopColumn images={imgs} speed="40s" />
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
      </div>

      {/* footer same pattern */}
      <footer className="w-full border-t border-current/10 py-3 px-6 md:px-8 text-[11px] opacity-70 flex items-center justify-between">
        <span>© {new Date().getFullYear()} Archv</span>
        <span>design iteration 2</span>
      </footer>
    </div>
  );
}

/* --------------- helpers/components --------------- */

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

/**
 * LoopColumn — seamless upward-scrolling column of images.
 * Duplicates the list so when it reaches halfway, it loops perfectly.
 */
function LoopColumn({
  images = [],
  speed = "36s",
  heightClass = "h-[520px] md:h-[620px]",
}) {
  // build a doubled list for a seamless loop
  const doubled = React.useMemo(() => [...images, ...images], [images]);

  return (
    <div
      className={`relative overflow-hidden ${heightClass} border border-current/10`}
    >
      {/* Scroller */}
      <div
        className="absolute inset-x-0 top-0 archv-loop-run"
        style={{ "--archv-speed": speed }}
      >
        <ColumnStack images={doubled} />
      </div>
      {/* subtle gradients top/bottom */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-current/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-current/10 to-transparent" />
    </div>
  );
}

function ColumnStack({ images }) {
  return (
    <div className="flex flex-col items-stretch gap-10 py-8">
      {images.map((src, i) => (
        <div key={`${src}-${i}`} className="mx-auto w-[78%]">
          <div className="aspect-[4/5] w-full overflow-hidden border border-current/10 bg-black/5 dark:bg-white/5">
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover select-none"
              draggable="false"
              loading={i < 6 ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
