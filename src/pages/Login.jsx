// src/pages/Login.jsx
import React from "react";
import Nav from "../components/Nav.jsx";
import { useTheme, useTokens } from "../components/ThemeProvider.jsx";

export default function Login() {
  const { theme } = useTheme();
  const t = useTokens(theme);

  // TODO: point this to your real IdP or console login
  const portalURL =
    import.meta.env.VITE_PORTAL_URL || "https://example.com/login";

  return (
    <div
      className={`min-h-screen ${t.pageBg} ${t.pageText} ${t.font} flex flex-col`}
    >
      {/* Shared header */}
      <Nav />

      {/* MAIN — identical paddings + thin hairline under header for continuity */}
      <main className="flex-1 w-full mx-0 px-6 md:px-8 py-5 relative">
        <div className="mt-2 border-b border-current/10" />

        <section className="py-16 grid place-items-center">
          {/* Sign-in card */}
          <div className="relative w-full max-w-md border border-current/20 bg-white/70 dark:bg-white/5 backdrop-blur-[1px] p-6 md:p-7">
            <h1 className="text-2xl md:text-3xl tracking-tight">Sign in</h1>
            <p className="mt-2 text-sm opacity-80">
              Use your Archv account to access the platform.
            </p>

            <div className="mt-6 grid gap-3">
              <a
                href={portalURL}
                className="inline-flex items-center justify-center w-full px-4 py-2 border border-current/30 hover:bg-black/5 dark:hover:bg-white/10 transition"
              >
                Continue to login portal ↗
              </a>
              <a
                href="mailto:hello@archv.ai?subject=Login%20help%20%E2%80%94%20Archv"
                className="inline-flex items-center justify-center w-full px-4 py-2 underline underline-offset-4 hover:no-underline"
              >
                Need access?
              </a>
            </div>

            {/* Multilingual glitch line (kept) */}
            <div className="mt-6 border-t border-current/15 pt-3">
              <RotatingGlitchLine
                phrases={[
                  "Ready to Archv with us today?",
                  "오늘 우리와 함께 Archv 하실 준비 되셨나요?",
                  "今日は一緒に Archv しませんか？",
                  "¿Listo para Archv con nosotros hoy?",
                  "Prêt à Archv avec nous aujourd’hui ?",
                  "Bereit, heute mit uns zu Archv’n?",
                  "Pronto per Archv con noi oggi?",
                  "Pronto para Archv conosco hoje?",
                  "今天准备好与我们一起 Archv 吗？",
                  "هل أنت مستعد للـ Archv معنا اليوم؟",
                ]}
                intervalMs={4200}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Shared footer */}
      <footer className="w-full border-t border-current/10 py-3 px-6 md:px-8 text-[11px] opacity-70 flex items-center justify-between">
        <span>© {new Date().getFullYear()} Archv</span>
        <span>design iteration 2</span>
      </footer>
    </div>
  );
}

/* ---------------- Glitching multilingual line ---------------- */

function RotatingGlitchLine({ phrases = [], intervalMs = 4200 }) {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [idx, setIdx] = React.useState(0);
  const [text, setText] = React.useState(phrases[0] || "");
  const [phase, setPhase] = React.useState("in"); // in -> hold -> out

  React.useEffect(() => {
    if (phrases.length <= 1 || prefersReduced) return;
    let tHold, tOut;

    const cycle = () => {
      setPhase("in");
      tHold = setTimeout(() => {
        setPhase("hold");
        tOut = setTimeout(() => {
          setPhase("out");
          setTimeout(() => {
            const next = (idx + 1) % phrases.length;
            setIdx(next);
            setText(phrases[next]);
            cycle(); // restart
          }, 240);
        }, Math.max(1200, intervalMs - 800));
      }, 400);
    };

    cycle();
    return () => {
      clearTimeout(tHold);
      clearTimeout(tOut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phrases, intervalMs, prefersReduced, idx]);

  return (
    <div className="text-[12px] sm:text-[13px] tracking-wide">
      <GlitchScramble text={text} activePhase={phase} />
    </div>
  );
}

function GlitchScramble({
  text,
  chaos = "!<>-_\\/[]{}—=+*^?#_0123456789",
  activePhase = "in",
}) {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [out, setOut] = React.useState(text);

  React.useEffect(() => {
    if (prefersReduced) {
      setOut(text);
      return;
    }
    let raf = 0;
    const durIn = 360;
    const durOut = 220;

    const animate = (duration, reverse = false) => {
      const start = performance.now();
      const chars = chaos.split("");
      const base = text;

      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const prog = reverse ? 1 - t : t;
        const reveal = Math.floor(prog * base.length);
        let s = "";
        for (let i = 0; i < base.length; i++) {
          s +=
            i < reveal
              ? base[i]
              : base[i] === " "
              ? " "
              : chars[(i + Math.floor((1 - prog) * 37)) % chars.length];
        }
        setOut(s);
        if (t < 1) raf = requestAnimationFrame(tick);
        else setOut(reverse ? base.replace(/./g, " ") : base);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    };

    if (activePhase === "in") return animate(durIn, false);
    if (activePhase === "out") return animate(durOut, true);

    setOut(text);
    return () => cancelAnimationFrame(raf);
  }, [text, activePhase, chaos, prefersReduced]);

  return (
    <span className="relative inline-block">
      {/* layered for a soft echo */}
      <span className="relative z-10">{out}</span>
      <span
        className="absolute inset-0 -z-0 opacity-25"
        style={{ transform: "translate(1px, 0)" }}
        aria-hidden
      >
        {out}
      </span>
    </span>
  );
}
