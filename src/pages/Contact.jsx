import React from "react";
import Nav from "../components/Nav.jsx";
import { useTheme, useTokens } from "../components/ThemeProvider.jsx";

/**
 * CONTACT — brutalist orange-label theme (schedule-focused + big clean logo)
 */

export default function Contact() {
  const { theme } = useTheme();
  const t = useTokens(theme);

  const ORANGE = "#ff6a00";
  const stamp = new URL("../assets/ARCHV (5).png", import.meta.url).href;

  return (
    <div
      className={`min-h-screen ${t.pageBg} ${t.pageText} ${t.font} flex flex-col`}
    >
      <div className="flex-1 w-full mx-0 px-6 md:px-8 py-5 relative">
        <Nav />

        {/* Massive headline */}
        <header className="mt-14 sm:mt-16 md:mt-20">
          <h1
            className="leading-none font-medium tracking-tight"
            style={{
              fontStretch: "100%",
              lineHeight: 0.95,
              fontSize: "clamp(56px, 12vw, 180px)",
            }}
          >
            ARCHV.CONTACT
          </h1>
        </header>

        {/* Orange label band */}
        <section
          className="mt-8 md:mt-10 rounded-sm border border-black/10 dark:border-white/10"
          style={{ background: ORANGE }}
        >
          <div className="p-3 sm:p-4 md:p-6 grid grid-cols-12 gap-4 md:gap-6 items-start">
            {/* Binary -> Decoded card (schedule focus) */}
            <div className="col-span-12 sm:col-span-5 md:col-span-4">
              <BinaryDecodeCard />
            </div>

            {/* Copy block */}
            <div className="col-span-12 sm:col-span-7 md:col-span-5 text-black text-[12px] sm:text-[13px] leading-relaxed">
              <p className="uppercase tracking-widest font-medium mb-2">
                Think more. Design less.
              </p>
              <p className="max-w-[52ch]">
                We keep contact simple: one inbox, real answers, no sales
                theatre. Share a goal, a problem, a constraint—whatever helps us
                start from truth. If we can’t help, we’ll say so and point you
                somewhere that can.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] uppercase">
                <span className="opacity-80">attachments:</span>
                <Pill>Context</Pill>
                <Pill>Constraints</Pill>
                <Pill>Timeline</Pill>
              </div>
            </div>

            {/* Right: BIG clean logo (no backdrop) + small label */}
            <div className="col-span-12 md:col-span-3 flex md:flex-col items-center md:items-end justify-between gap-3 md:gap-4">
              <img
                src={stamp}
                alt="Archv mark"
                className="h-44 sm:h-56 md:h-64 lg:h-72 w-auto select-none"
                loading="lazy"
                decoding="async"
                draggable="false"
              />
              <div className="text-black/80 dark:text-white/80 text-[11px] uppercase tracking-[.18em] md:text-right">
                ARCHV © {new Date().getFullYear()}
              </div>
            </div>

            {/* Divider row with ticks */}
            <div className="col-span-12">
              <Ticks />
            </div>
          </div>
        </section>

        {/* Secondary rows (Schedule a demo / Pricing) */}
        <section className="mt-6 md:mt-8 grid grid-cols-12 gap-4">
          <InfoCard
            className="col-span-12 md:col-span-6"
            title="Schedule a call / demo"
            body="Interested in becoming a client? We can meet on Zoom or in-person. Share a few time windows and we’ll book it."
            action={{
              label: "Schedule call / demo",
              href: "mailto:hello@archv.ai?subject=Schedule%20call%20%26%20demo%20%E2%80%94%20Archv&body=Hi%20Archv%2C%0A%0AWe%E2%80%99re%20interested%20in%20becoming%20a%20client%20and%20would%20like%20to%20schedule%20a%20call%20and%20short%20demo%20(Zoom%20or%20in-person).%0A%0ACity%2FTimezone%3A%0AIdeal%20dates%20%26%20times%3A%0ATeam%20size%3A%0AGoals%2Fcontext%3A%0A%0AThanks!",
            }}
          />
          <InfoCard
            className="col-span-12 md:col-span-6"
            title="Pricing & tiers"
            body="We keep pricing transparent. Tell us scope, team size, and timing; we’ll send clear tiers and next steps."
            action={{
              label: "Ask for pricing",
              href: "mailto:hello@archv.ai?subject=Pricing%20%26%20tiers%20%E2%80%94%20Archv&body=Hi%20Archv%2C%0A%0AWe%E2%80%99re%20interested%20in%20becoming%20a%20client.%20Could%20you%20share%20pricing%20%26%20tiers%20and%20proposed%20next%20steps%3F%0A%0ATeam%20size%3A%0AScope%2Fuse%20case%3A%0ATimeline%3A%0A%0AThanks!",
            }}
          />
        </section>

        {/* Barcode footer / availability row */}
        <footer className="mt-8 md:mt-10">
          <div className="grid grid-cols-12 items-center gap-4">
            <div className="col-span-12 md:col-span-8">
              <Barcode height={18} />
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px]">
              <span className="opacity-70">AVLB:</span>
              <span>{availabilityString()}</span>
              <span className="opacity-70">●</span>
              <LiveClock />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ——— Components ——— */

function Pill({ children }) {
  return (
    <span className="px-2 py-[2px] border border-black/40 bg-black/5 text-black rounded-sm dark:bg-white/5 dark:text-white dark:border-white/30">
      {children}
    </span>
  );
}

function BinaryDecodeCard() {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const prompt =
    "We’re interested in becoming a client. Could we schedule a call and a short demo (Zoom or in-person)? Please also share indicative pricing/tiers for a 30-day pilot. Thanks.";

  const ROWS = 8;
  const COLS = 44;
  const DURATION = 1400; // ms before reveal

  const [matrix, setMatrix] = React.useState(
    binaryLinesFromText(prompt, COLS, ROWS)
  );
  const [fade, setFade] = React.useState(1);

  React.useEffect(() => {
    if (prefersReduced) {
      setFade(0.25);
      return;
    }
    const jitter = setInterval(() => {
      setMatrix((prev) => flipRandomBits(prev, 22));
    }, 70);
    const start = setTimeout(() => setFade(0.25), DURATION);
    return () => {
      clearInterval(jitter);
      clearTimeout(start);
    };
  }, [prefersReduced]);

  return (
    <div className="rounded-md bg-white/98 text-black border border-black/20 p-3 sm:p-4 shadow-[0_1px_0_rgba(0,0,0,.35)] overflow-hidden">
      <div className="text-[10px] tracking-wider uppercase opacity-50 mb-2">
        encoded inquiry
      </div>

      <pre
        className="font-mono text-[10px] leading-[1.05rem] select-none transition-opacity duration-700"
        style={{ opacity: fade }}
      >
        {matrix.join("\n")}
      </pre>

      <div className="mt-3 border-t border-black/15 pt-2">
        <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">
          decoded
        </div>
        <div className="text-[12px] leading-snug">
          <ScrambleTextOnce text={prompt} durationMs={900} chaos="01#%*+-" />
        </div>
        <a
          href={
            "mailto:hello@archv.ai?subject=Schedule%20call%20%2B%20demo%20%2B%20pricing%20%E2%80%94%20Archv" +
            "&body=" +
            encodeURIComponent(
              "Hi Archv,\n\nWe’re interested in becoming a client. Could we schedule a call and a short demo (Zoom or in-person)?\n\nCity/Timezone:\nIdeal dates & times:\nTeam size:\nGoals/context:\n\nPlease also share indicative pricing/tiers for a 30-day pilot.\n\nThanks!"
            )
          }
          className="mt-2 inline-flex items-center gap-2 text-[12px] underline underline-offset-4 hover:no-underline"
        >
          Schedule call / demo ↗
        </a>
      </div>
    </div>
  );
}

function Ticks() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-4 w-28 rounded-sm bg-black/10 dark:bg-white/10" />
      <div className="flex-1 flex items-center gap-3">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="inline-block w-4 h-[2px] bg-black/60 dark:bg-white/70"
            style={{ opacity: i % 3 === 0 ? 1 : 0.5 }}
          />
        ))}
      </div>
      <div className="h-4 w-20 rounded-sm bg-black/10 dark:bg-white/10" />
    </div>
  );
}

function InfoCard({ title, body, action, className = "" }) {
  return (
    <div className={`border border-current/20 p-4 sm:p-5 ${className}`}>
      <div className="text-[11px] uppercase tracking-[.22em] opacity-60 mb-1">
        {title}
      </div>
      <p className="text-sm">{body}</p>
      {action && (
        <a
          href={action.href}
          className="mt-3 inline-flex items-center gap-2 text-sm underline underline-offset-4 hover:no-underline"
        >
          {action.label} <span>↗</span>
        </a>
      )}
    </div>
  );
}

function Barcode({ height = 16 }) {
  return (
    <div
      aria-hidden
      style={{
        height,
        background:
          "repeating-linear-gradient(90deg,#000 0,#000 2px,transparent 2px,transparent 5px)",
      }}
      className="w-full dark:invert-[.9]"
    />
  );
}

function LiveClock() {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{formatTime(now)}</span>;
}

/* ——— Helpers ——— */

function availabilityString() {
  const d = new Date();
  const monthStr = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const year = d.getFullYear();
  return `${monthStr}.${year} (${toRoman(year)})`;
}

function formatTime(d) {
  const h = d.getHours();
  const H = ((h + 11) % 12) + 1;
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  return `${H}:${m}:${s} ${ampm}`;
}

function toRoman(num) {
  const map = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let out = "";
  for (const [v, sym] of map) {
    while (num >= v) {
      out += sym;
      num -= v;
    }
  }
  return out;
}

function binaryLinesFromText(text, cols = 44, rows = 8) {
  const bits = Array.from(text)
    .map((ch) => ch.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("");
  const lines = [];
  let ptr = 0;
  for (let r = 0; r < rows; r++) {
    lines.push(bits.slice(ptr, ptr + cols).padEnd(cols, "0"));
    ptr += cols;
    if (ptr >= bits.length) ptr = 0;
  }
  return lines;
}

function flipRandomBits(lines, flips = 16) {
  const out = [...lines];
  const rows = out.length;
  const cols = out[0]?.length ?? 0;
  for (let i = 0; i < flips; i++) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    const row = out[r];
    if (!row) continue;
    const ch = row[c];
    const toggled = ch === "0" ? "1" : "0";
    out[r] = row.slice(0, c) + toggled + row.slice(c + 1);
  }
  return out;
}

function ScrambleTextOnce({
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

  const initial = React.useMemo(
    () => (prefersReduced || durationMs <= 0 ? text : seed(text, chaos)),
    [text, chaos, prefersReduced, durationMs]
  );
  const [out, setOut] = React.useState(initial);

  React.useEffect(() => {
    if (prefersReduced || durationMs <= 0) {
      setOut(text);
      return;
    }
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
