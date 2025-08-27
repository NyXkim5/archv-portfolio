import React from "react";
import Nav from "../components/Nav.jsx";
import { useTheme, useTokens } from "../components/ThemeProvider.jsx";

/**
 * Home — center logo boot/flicker + sticky footer
 * - Dark: white glow
 * - Light: faint orange glow
 * - Flickers for ~2.1s, then settles
 * - Footer pinned to bottom: © Archv (left) / design iteration 2 (right)
 * - Top paddings match every page: px-6 md:px-8
 */

export default function Home() {
  const { theme } = useTheme();
  const t = useTokens(theme);

  return (
    <div
      className={`min-h-screen ${t.pageBg} ${t.pageText} ${t.font} flex flex-col`}
    >
      {/* local keyframes */}
      <StyleFlicker />

      {/* MAIN (same horizontal pads as other pages) */}
      <div className="flex-1 w-full mx-0 px-6 md:px-8 py-5 relative">
        <Nav />

        {/* Top row: intro */}
        <header className="mt-10 md:mt-14">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6">
              <h1 className="text-[34px] sm:text-[40px] md:text-[48px] leading-[1.05] font-medium tracking-tight">
                Archv AI Platform
              </h1>
              <p className="mt-3 max-w-[56ch] text-sm sm:text-[15px] opacity-80">
                Calm software for real work—private by default, simple to run,
                and designed to make teams faster without the drama.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-6 flex items-start justify-end">
              {/* (optional right HUD / time) */}
            </div>
          </div>
        </header>

        {/* Center logo (boots in) */}
        <section className="relative mt-12 md:mt-16">
          <CenterLogoBoot />
        </section>

        {/* (your reel / other sections can follow here) */}
      </div>

      {/* STICKY FOOTER (pads match header/pages) */}
      <footer className="w-full border-t border-current/10 py-3 px-6 md:px-8">
        <div className="flex items-center justify-between text-[11px] tracking-wide opacity-70">
          <span>© {new Date().getFullYear()} Archv</span>
          <span>design iteration 2</span>
        </div>
      </footer>
    </div>
  );
}

/* ----------------- Center Logo ----------------- */

function CenterLogoBoot() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [booting, setBooting] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setBooting(false), 2100); // 2.1s
    return () => clearTimeout(t);
  }, []);

  // same logo used in header (white source PNG)
  const logoUrl = new URL("../assets/ARCHV (1).png", import.meta.url).href;

  const glow = isDark
    ? "drop-shadow(0 0 10px rgba(255,255,255,.85)) drop-shadow(0 0 22px rgba(255,255,255,.55))"
    : "drop-shadow(0 0 6px rgba(255,106,0,.35)) drop-shadow(0 0 14px rgba(255,106,0,.20))";

  return (
    <div className="w-full grid place-items-center py-10">
      <img
        src={logoUrl}
        alt="ARCHV mark"
        draggable="false"
        className={[
          "select-none",
          "h-[120px] sm:h-[160px] md:h-[200px] lg:h-[240px] xl:h-[280px]",
          booting ? "archv-boot-flicker" : "archv-boot-stable",
        ].join(" ")}
        style={{
          filter: glow,
          transition:
            "opacity 420ms ease, transform 420ms ease, filter 420ms ease",
          imageRendering: "auto",
        }}
      />
    </div>
  );
}

/* ----------------- Styles / Keyframes ----------------- */

function StyleFlicker() {
  return (
    <style>{`
      @keyframes archvFlicker {
        0%   { opacity: .08; transform: translateY(0px) scale(.98); }
        6%   { opacity: .65; transform: translateY(-1px) scale(1.00); }
        10%  { opacity: .22; transform: translateY(1px) scale(.99); }
        18%  { opacity: .9;  transform: translateY(0px) scale(1.01); }
        26%  { opacity: .35; transform: translateY(-1px) }
        34%  { opacity: .85; transform: translateY(0px) }
        42%  { opacity: .28; transform: translateY(1px) }
        50%  { opacity: .95; transform: translateY(0px) }
        62%  { opacity: .4;  transform: translateY(-1px) }
        74%  { opacity: .88; transform: translateY(0px) }
        86%  { opacity: .55; transform: translateY(1px) }
        100% { opacity: 1;   transform: translateY(0px) scale(1.0); }
      }

      .archv-boot-flicker { animation: archvFlicker 2.1s steps(24, end) both; }
      .archv-boot-stable { opacity: 1; transform: none; }
    `}</style>
  );
}
