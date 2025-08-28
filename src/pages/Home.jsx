// src/pages/Home.jsx
import React from "react";
import Nav from "../components/Nav.jsx";
import { useTheme, useTokens } from "../components/ThemeProvider.jsx";

// ✅ Logos
import logoSvg from "../assets/ARCHV (2).svg";

// ✅ Lucide icons for socials
import { Linkedin, Instagram, Music2 } from "lucide-react";

export default function Home() {
  const { theme } = useTheme();
  const t = useTokens(theme);

  return (
    <div
      className={`min-h-screen ${t.pageBg} ${t.pageText} ${t.font} flex flex-col`}
    >
      {/* local keyframes */}
      <StyleFlickerAndPulse />

      <Nav />

      {/* MAIN */}
      <main className="flex-1 w-full mx-0 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 py-5 relative">
        <header className="mt-10 md:mt-14">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6">
              <h1 className="text-[34px] sm:text-[40px] md:text-[48px] leading-[1.05] font-medium tracking-tight">
                Archv AI
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

        {/* Center logo */}
        <section className="relative mt-12 md:mt-16">
          <CenterLogoBoot />
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-current/10 py-3 px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] tracking-wide opacity-70 gap-3">
          <span>© {new Date().getFullYear()} Archv</span>

          {/* ✅ Social links */}
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
            <a
              href="https://www.instagram.com/archvofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://www.tiktok.com/@archvstudios?lang=en"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition"
              aria-label="TikTok"
            >
              <Music2 className="w-6 h-6" />
            </a>
          </div>

          <span>design iteration 2</span>
        </div>
      </footer>
    </div>
  );
}

/* ----------------- Center Logo ----------------- */
function CenterLogoBoot() {
  const [booting, setBooting] = React.useState(true);
  React.useEffect(() => {
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

/* ----------------- Styles ----------------- */
function StyleFlickerAndPulse() {
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
      .archv-boot-stable  { opacity: 1; transform: none; }

      @keyframes sherbetPulse {
        0% {
          filter:
            drop-shadow(0 0 6px rgba(255,106,0,.22))
            drop-shadow(0 0 10px rgba(255,218,87,.14))
            drop-shadow(0 0 14px rgba(255,106,213,.18));
        }
        50% {
          filter:
            drop-shadow(0 0 12px rgba(255,106,0,.45))
            drop-shadow(0 0 22px rgba(255,218,87,.28))
            drop-shadow(0 0 28px rgba(255,106,213,.36));
        }
        100% {
          filter:
            drop-shadow(0 0 6px rgba(255,106,0,.22))
            drop-shadow(0 0 10px rgba(255,218,87,.14))
            drop-shadow(0 0 14px rgba(255,106,213,.18));
        }
      }
      .archv-logo-breathe {
        image-rendering: auto;
        animation: sherbetPulse 2.8s ease-in-out infinite;
        will-change: filter, opacity, transform;
      }

      @media (prefers-reduced-motion: reduce) {
        * { animation: none !important; transition: none !important }
      }
    `}</style>
  );
}
