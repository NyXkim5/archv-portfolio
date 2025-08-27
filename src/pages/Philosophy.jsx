import React from "react";
import Nav from "../components/Nav.jsx";
import { useTheme, useTokens } from "../components/ThemeProvider.jsx";

export default function Philosophy() {
  const { theme } = useTheme();
  const t = useTokens(theme);
  const isDark = theme === "dark";
  const bx = isDark ? "border-white/20" : "border-black/20";
  const mute = isDark ? "text-white/60" : "text-black/60";
  const poster = new URL("../assets/ARCHV (4).png", import.meta.url).href;

  return (
    <div
      className={`min-h-screen ${t.pageBg} ${t.pageText} ${t.font} flex flex-col`}
    >
      <div className="flex-1 w-full mx-0 px-6 md:px-8 py-5 relative">
        <Nav />

        {/* micro-animations + helpers */}
        <style>{`
          @keyframes scan { 0% { left: 0 } 100% { left: 100% } }
          @keyframes fadeUp { 0% { opacity:.0; transform: translateY(6px)} 100% { opacity:1; transform: translateY(0)} }
          @media (prefers-reduced-motion: reduce) {
            * { animation: none !important; transition: none !important }
          }
        `}</style>

        {/* Rotated side labels — slightly higher (70%) to avoid any collisions */}
        <SideLabel side="left" text="PHILOSOPHY" offsetTop="70%" />
        <SideLabel side="right" text="ARCHV / AI" offsetTop="70%" />

        {/* Masthead */}
        <header className="mt-6 border-b border-current/20 pb-3 flex flex-wrap gap-3 items-end justify-between">
          <h1 className="text-3xl sm:text-4xl tracking-tight leading-none break-words">
            ARCHV — Philosophy
          </h1>
          <div className="min-w-[220px]">
            <ScrambleTextOnMount
              text="Simple • Quiet • True"
              className={`${mute} text-[11px] tracking-[0.22em] uppercase block`}
              durationMs={900}
            />
            <ScanUnderline />
          </div>
        </header>

        {/* Editorial grid */}
        <section className="grid grid-cols-12 gap-6 lg:gap-10 mt-6">
          {/* LEFT index */}
          <aside className="col-span-12 md:col-span-3 order-2 md:order-1">
            <div className="md:sticky md:top-6 space-y-6">
              <MiniMenu />
              <div className="border-t border-current/20 pt-4 space-y-2 text-sm leading-relaxed">
                <p className={`${mute}`}>
                  We design for calm: fewer choices, better defaults, motion
                  only when it helps.
                </p>
                <p className={`${mute}`}>
                  Our product shouldn’t shout. Your work is the headline.
                </p>
              </div>
            </div>
          </aside>

          {/* CENTER poster — smaller & crisp */}
          <figure className="col-span-12 md:col-span-6 order-1 md:order-2">
            <div
              className={`border ${bx} bg-white dark:bg-black overflow-hidden mx-auto`}
              style={{
                maxHeight: "56vh",
                maxWidth: "560px",
                width: "100%",
                display: "grid",
                placeItems: "center",
                padding: "10px",
                animation: "fadeUp .4s ease-out both",
              }}
            >
              <img
                src={poster}
                alt="Archv editorial poster"
                className="w-full h-auto object-contain select-none"
                style={{
                  imageRendering: "auto",
                  containIntrinsicSize: "900px 1200px",
                }}
                loading="eager"
                decoding="async"
                draggable="false"
              />
            </div>
            <figcaption className="flex flex-wrap items-center justify-between gap-2 text-xs mt-2">
              <span className={`${mute}`}>Poster — internal draft</span>
              <span className="tracking-[0.22em] uppercase whitespace-nowrap">
                Design iteration 2
              </span>
            </figcaption>
          </figure>

          {/* RIGHT: badge + rotating quotes + blocks */}
          <aside className="col-span-12 md:col-span-3 order-3">
            <div className="flex flex-col items-start gap-6">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <CircleBadge textTop="calm" textBottom="software" />
                <RotatingQuote
                  quotes={[
                    "We fix the messy parts so teams can think.",
                    "We remove friction so good work moves faster.",
                    "We turn noise into simple, useful answers.",
                  ]}
                  intervalMs={10000}
                />
              </div>
              <Block title="Tone">
                Plain. Considerate. Evidence-led. No fluff.
              </Block>
              <Block title="Pace">
                Small, steady releases. Real docs. Rollback &gt; heroics.
              </Block>
              <Block title="Trust">
                Clear permissions. Answers with sources. Your data stays yours.
              </Block>
            </div>
          </aside>
        </section>

        {/* Ledger */}
        <section className={`mt-10 border-y ${bx}`}>
          <LedgerRow label="Scope" value="Do less, do it well." />
          <LedgerRow label="Defaults" value="Safe, quiet, reversible." />
          <LedgerRow
            label="Failure"
            value="Make it visible, make it recoverable."
          />
          <LedgerRow label="Credit" value="Credit the team, not the tool." />
        </section>

        {/* CTA */}
        <div className="py-6 flex items-center justify-center">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-4 py-2 border border-current hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
          >
            Talk to Archv <span>↗</span>
          </a>
        </div>

        {/* Footer (page-level) */}
        <footer className={`border-t ${bx} pt-3 text-[11px] ${mute}`}>
          © Archv AI — design iteration 2
        </footer>
      </div>
    </div>
  );
}

/* ——— components ——— */

function SideLabel({ side = "left", text, offsetTop = "70%" }) {
  return (
    <div
      className="hidden xl:block pointer-events-none select-none"
      style={{
        position: "fixed",
        top: offsetTop,
        [side]: "12px",
        transform:
          side === "left"
            ? "translateY(-50%) rotate(-90deg)"
            : "translateY(-50%) rotate(90deg)",
        zIndex: 0,
        opacity: 0.6,
      }}
      aria-hidden
    >
      <span className="text-[11px] tracking-[0.32em] uppercase">{text}</span>
    </div>
  );
}

function MiniMenu() {
  const items = [
    "Simplicity",
    "Clarity",
    "Respect",
    "Quality",
    "Receipts",
    "Calm UI",
    "Good defaults",
    "Privacy-first",
  ];
  return (
    <ul className="text-[13px] leading-6 space-y-1">
      {items.map((it) => (
        <li
          key={it}
          className="flex items-center justify-between border-b border-current/10 group"
        >
          <span className="py-1 pr-3">{it}</span>
          <span className="text-[11px] opacity-40 group-hover:opacity-100 transition">
            →
          </span>
        </li>
      ))}
    </ul>
  );
}

function CircleBadge({ textTop = "quiet", textBottom = "software" }) {
  return (
    <div
      className="rounded-full border border-current w-36 h-36 flex items-center justify-center text-center leading-tight relative overflow-hidden"
      aria-hidden
    >
      <div className="text-[11px] tracking-[0.22em] uppercase">
        {textTop}
        <br />
        {textBottom}
      </div>
      <span
        className="absolute top-0 left-0 h-px w-1/2 bg-current/30"
        style={{ animation: "scan 2.6s linear infinite" }}
      />
    </div>
  );
}

function RotatingQuote({ quotes, intervalMs = 10000 }) {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [index, setIndex] = React.useState(0);
  const [fadeIn, setFadeIn] = React.useState(true);
  const [remaining, setRemaining] = React.useState(intervalMs);

  React.useEffect(() => {
    if (!quotes || quotes.length < 2 || prefersReduced) return;

    let cycleStart = Date.now();

    const countdown = setInterval(() => {
      const elapsed = Date.now() - cycleStart;
      const rem = Math.max(0, intervalMs - (elapsed % intervalMs));
      setRemaining(rem);
    }, 100);

    const step = () => {
      setFadeIn(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % quotes.length);
        cycleStart = Date.now();
        setRemaining(intervalMs);
        setFadeIn(true);
      }, 250);
    };

    const cycler = setInterval(step, intervalMs);

    return () => {
      clearInterval(cycler);
      clearInterval(countdown);
    };
  }, [quotes, intervalMs, prefersReduced]);

  const current = quotes?.[index] ?? "";
  const pct = Math.max(0, Math.min(100, (remaining / intervalMs) * 100));
  const secs = Math.ceil(remaining / 1000);

  return (
    <div className="min-w-[220px] max-w-[280px] border border-current/20 px-3 py-3">
      <blockquote
        className={`text-sm leading-relaxed transition-opacity duration-300 ${
          !prefersReduced && fadeIn
            ? "opacity-100"
            : prefersReduced
            ? "opacity-100"
            : "opacity-0"
        }`}
      >
        “{current}”
      </blockquote>
      <div className="mt-2 flex items-center gap-2">
        <div className="h-[2px] flex-1 bg-current/15 overflow-hidden">
          <div
            className="h-[2px] bg-current"
            style={{ width: `${pct}%`, transition: "width 0.1s linear" }}
          />
        </div>
        <span className="text-[10px] opacity-60 tabular-nums">{secs}s</span>
      </div>
      <div className="mt-1 text-[11px] tracking-[0.22em] uppercase opacity-60 text-right">
        — Archv
      </div>
    </div>
  );
}

function Block({ title, children }) {
  return (
    <div className="border border-current/20 px-3 py-3 w-full">
      <div className="text-[11px] tracking-[0.22em] uppercase opacity-60 mb-2">
        {title}
      </div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function LedgerRow({ label, value }) {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 md:col-span-4 border-r border-current/20 p-3 md:p-4 text-[11px] tracking-[0.22em] uppercase">
        {label}
      </div>
      <div className="col-span-12 md:col-span-8 p-3 md:p-4 text-lg md:text-xl">
        {value}
      </div>
    </div>
  );
}

function ScanUnderline() {
  return (
    <div className="relative h-[2px] mt-1 opacity-40">
      <div className="absolute inset-0 bg-current/20" />
      <div
        className="absolute top-0 h-[2px] w-10 bg-current"
        style={{ animation: "scan 1.8s linear infinite" }}
        aria-hidden
      />
    </div>
  );
}

/* short, tasteful scramble */
function ScrambleTextOnMount({
  text,
  className = "",
  style,
  durationMs = 900,
  chaos = "!<>-_\\/[]{}—=+*^?#_0123456789",
}) {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const initialScramble = React.useMemo(
    () => (prefersReduced ? text : seed(text, chaos)),
    [text, chaos, prefersReduced]
  );
  const [out, setOut] = React.useState(initialScramble);

  React.useEffect(() => {
    if (prefersReduced) return;
    const start = performance.now();
    const chars = chaos.split("");
    let raf = 0;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / durationMs);
      const reveal = Math.floor(t * text.length);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        s +=
          i < reveal
            ? text[i]
            : chars[(i + Math.floor((1 - t) * 50)) % chars.length];
      }
      setOut(s);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setOut(text);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, durationMs, chaos, prefersReduced]);

  return (
    <span className={className} style={style}>
      {out}
    </span>
  );
}

function seed(target, chaos) {
  const chars = chaos.split("");
  let s = "";
  for (let i = 0; i < target.length; i++) {
    s += target[i] === " " ? " " : chars[(i * 7) % chars.length];
  }
  return s;
}
