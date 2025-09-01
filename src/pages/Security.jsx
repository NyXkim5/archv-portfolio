// src/pages/Security.jsx
import React from "react";
import Nav from "../components/Nav.jsx";
import { useTheme, useTokens } from "../components/ThemeProvider.jsx";

export default function Security() {
  const { theme } = useTheme();
  const t = useTokens(theme);
  const isDark = theme === "dark";
  const bx = isDark ? "border-white/20" : "border-black/20";
  const mute = isDark ? "text-white/60" : "text-black/60";
  const logoUrl = new URL("../assets/ARCHV (1).png", import.meta.url).href;

  return (
    <div
      className={`min-h-screen ${t.pageBg} ${t.pageText} ${t.font} flex flex-col`}
    >
      {/* ✅ Nav matches Home/Platform (outside wrapper, full-bleed) */}
      <Nav />

      {/* MAIN — same horizontal padding as the other pages */}
      <main className="flex-1 w-full mx-0 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 py-5 relative">
        {/* Local keyframes */}
        <style>{`
          /* Seamless marquee: translate by the full width of one copy (-100%) */
          @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
          @keyframes scan { 0% { left:0 } 100% { left:100% } }

          /* Bounce the underline cursor between ends of the measured rail */
          @keyframes pong {
            from { transform: translateX(0); }
            to   { transform: translateX(var(--maxX)); }
          }

          @media (prefers-reduced-motion: reduce) {
            * { animation: none !important; transition: none !important; }
          }
        `}</style>

        {/* Top terminal strip */}
        <TerminalStrip />

        {/* HERO */}
        <div className={`mt-6 grid grid-cols-12 gap-0 border ${bx}`}>
          {/* Left rail */}
          <aside
            className={`col-span-12 md:col-span-3 border-r ${bx} p-3 sm:p-4`}
          >
            <Rail title="Security">
              <RailItem label="Data" hint="You own it · export · delete" />
              <RailItem label="Access" hint="SSO · roles · least-priv" />
              <RailItem label="Storage" hint="Encrypted at rest & in transit" />
              <RailItem label="Retention" hint="You set how long" />
              <RailItem
                label="Export / Delete"
                hint="Plain controls · no surprises"
              />
            </Rail>
          </aside>

          {/* Right column */}
          <section className="col-span-12 md:col-span-9 p-3 sm:p-5">
            <div className="flex flex-col lg:flex-row items-start gap-5 lg:items-center lg:justify-between">
              <div>
                <div
                  className={`${mute} text-[11px] tracking-[0.22em] uppercase`}
                >
                  Statement
                </div>

                {/* Scrambles ~2s on every mount */}
                <ScrambleTextOnMount
                  text="TRUST WITHOUT DRAMA"
                  className="leading-[0.92] font-semibold mt-2"
                  style={{
                    fontSize: "clamp(2.4rem, 7.8vw, 6rem)",
                    letterSpacing: "-0.02em",
                  }}
                  durationMs={2000}
                />

                <p className="mt-3 text-sm max-w-prose">
                  Your content stays yours. Clear controls. Predictable results.
                  <span className="block mt-1">
                    <strong>Security and privacy are the product</strong> — not
                    a feature gate.
                  </span>
                </p>
              </div>

              <div className="flex items-start gap-4">
                <AsciiSeal />
                {/* White source PNG -> black on light (invert), white on dark (no invert) */}
                <LogoStamp src={logoUrl} />
              </div>
            </div>

            {/* ARCHV • AI • TRUST kinetic line */}
            <div className="mt-4">
              <TrustKinetics />
            </div>

            {/* Stamps */}
            <div className="mt-5 grid grid-cols-12 gap-3">
              <Stamp label="Status">
                <LiveStatus />
              </Stamp>
              <Stamp label="Last Updated">
                <Today />
              </Stamp>
              <Stamp label="Priority">Privacy-first by default</Stamp>
            </div>

            {/* Ticker */}
            <div className="mt-4">
              <TickerBar />
            </div>
          </section>
        </div>

        {/* CARDS */}
        <div className={`mt-6 grid grid-cols-12 gap-0 border ${bx}`}>
          <Card title="Data" r>
            • <strong>You own your data</strong> — always. <br />• Not used to
            train models without explicit consent. <br />• One-click{" "}
            <strong>export</strong> or <strong>deletion</strong>.
          </Card>
          <Card title="Access" r>
            • <strong>SSO</strong> & clean roles. <br />•{" "}
            <strong>Least-privilege</strong> by default. <br />•{" "}
            <strong>Readable audit logs</strong> for every action.
          </Card>
          <Card title="Protection">
            • <strong>Encryption in transit & at rest</strong>. <br />•{" "}
            <strong>Backups</strong>, key rotation, scoped keys. <br />•{" "}
            <strong>Data residency</strong> by region.
          </Card>
        </div>

        {/* CONTROLS */}
        <div className={`mt-6 grid grid-cols-12 gap-0 border ${bx}`}>
          <div className="col-span-12 p-4 sm:p-5">
            <div className="text-[11px] tracking-[0.22em] uppercase mb-3">
              Controls
            </div>
            <div className="flex flex-wrap gap-2">
              <Chip>SSO</Chip>
              <Chip>RBAC</Chip>
              <Chip>Audit Log</Chip>
              <Chip>KMS / Keys</Chip>
              <Chip>Backups</Chip>
              <Chip>Data Residency</Chip>
              <Chip>Export</Chip>
              <Chip>Deletion</Chip>
              <Chip>Privacy by Default</Chip>
            </div>
          </div>
        </div>

        {/* LEDGER */}
        <div className={`mt-6 grid grid-cols-12 gap-0 border ${bx}`}>
          <LedgerRow
            a="Retention"
            b="Minimal by default. You choose durations — we adhere."
          />
          <LedgerRow
            a="Sharing"
            b="No sharing unless you say so. No hidden processors."
          />
          <LedgerRow
            a="Models"
            b="Use ours or yours. Same guardrails and privacy stance either way."
          />
          <LedgerRow
            a="Reviews"
            b="Instant exports for legal/security. Transparent, verifiable logs."
          />
        </div>

        {/* CTA */}
        <div className={`mt-6 border ${bx} p-2`}>
          <div className="bg-black text-white dark:bg-white dark:text-black p-6 sm:p-8 text-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 border border-current"
            >
              Request security brief <span>↗</span>
            </a>
            <div className="mt-2 text-xs opacity-70">
              One page. Plain language. Privacy-first.
            </div>
          </div>
        </div>

        {/* FOOTNOTE */}
        <div className={`mt-6 border-t ${bx} pt-3 text-[11px] ${mute}`}>
          © Archv AI — design iteration 2
        </div>
      </main>
    </div>
  );
}

/* =================== Local components =================== */

function TerminalStrip() {
  const { theme } = useTheme();
  const dim =
    theme === "dark" ? "text-white/80 bg-black/60" : "text-black/80 bg-black/5";
  const [time, setTime] = React.useState(() => new Date());
  React.useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const stamp = time.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return (
    <div
      className={`w-full font-mono text-[11px] ${dim} border border-current/10 px-2.5 py-2 select-none`}
      aria-hidden
    >
      <span className="opacity-70">archv@security</span>:~${" "}
      <span>status --ok</span>
      <span className="opacity-60"> # {stamp}</span>
      <span className="ml-1 animate-pulse">▋</span>
    </div>
  );
}

function Rail({ title, children }) {
  return (
    <div>
      <div className="text-[11px] tracking-[0.22em] uppercase mb-2">
        {title}
      </div>
      {children}
    </div>
  );
}

function RailItem({ label, hint }) {
  const { theme } = useTheme();
  const bx = theme === "dark" ? "border-white/20" : "border-black/20";
  const mute = theme === "dark" ? "text-white/60" : "text-black/60";
  return (
    <div
      className={`group flex items-center justify-between py-2 sm:py-2.5 border-b ${bx} cursor-default`}
      tabIndex={0}
    >
      <span className="text-sm sm:text-base">{label}</span>
      <div className="relative min-w-[160px] text-right">
        <span
          className={`${mute} text-xs block transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0`}
        >
          →
        </span>
        <span className="absolute inset-0 right-0 text-[11px] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          {hint}
        </span>
      </div>
    </div>
  );
}

function Stamp({ label, children }) {
  const { theme } = useTheme();
  const bx = theme === "dark" ? "border-white/20" : "border-black/20";
  return (
    <div className="col-span-12 sm:col-span-4">
      <div
        className={`inline-flex items-center gap-2 text-xs border ${bx} px-2.5 py-1`}
      >
        <span className="opacity-70 tracking-[0.18em] uppercase">{label}</span>
        <span>{children}</span>
      </div>
    </div>
  );
}

function Chip({ children }) {
  const { theme } = useTheme();
  const bx = theme === "dark" ? "border-white/20" : "border-black/20";
  return (
    <span className={`text-[11px] px-2.5 py-1 border ${bx} rounded-md`}>
      {children}
    </span>
  );
}

function Card({ title, children, r = false }) {
  const { theme } = useTheme();
  const bx = theme === "dark" ? "border-white/20" : "border-black/20";
  return (
    <section
      className={`col-span-12 md:col-span-4 p-4 sm:p-5 border ${bx} ${
        r ? "md:border-right md:border-r" : ""
      }`}
    >
      <h3 className="text-xl sm:text-2xl font-semibold">{title}</h3>
      <div className="mt-3 text-sm leading-relaxed">{children}</div>
    </section>
  );
}

function LedgerRow({ a, b }) {
  const { theme } = useTheme();
  const bx = theme === "dark" ? "border-white/20" : "border-black/20";
  return (
    <div className={`col-span-12 grid grid-cols-12 border-b ${bx}`}>
      <div
        className={`col-span-12 md:col-span-4 border-r ${bx} p-4 sm:p-5 text-[11px] tracking-[0.22em] uppercase`}
      >
        {a}
      </div>
      <div className="col-span-12 md:col-span-8 p-4 sm:p-5 text-lg sm:text-xl">
        {b}
      </div>
    </div>
  );
}

function AsciiSeal() {
  const { theme } = useTheme();
  const bx = theme === "dark" ? "border-white/20" : "border-black/20";
  const tone = theme === "dark" ? "text-white/70" : "text-black/70";
  const art = [
    "  .:ARCHV:.",
    " .:  AI   :.",
    ":  TRUST   :",
    "'.       .'",
    "  '-----'  ",
  ].join("\n");
  return (
    <pre
      className={`font-mono text-[10px] leading-[1.05] px-2.5 py-2 border ${bx} ${tone} select-none`}
      style={{ whiteSpace: "pre", lineHeight: 1.05 }}
      aria-hidden
    >
      {art}
    </pre>
  );
}

/** Page logo stamp: white PNG -> black on light, white on dark */
function LogoStamp({ src }) {
  return (
    <div
      className="w-16 h-16 border border-current flex items-center justify-center select-none"
      style={{ aspectRatio: "1/1" }}
      aria-hidden
    >
      <img
        src={src}
        alt=""
        draggable="false"
        className="w-10 h-10 object-contain transition invert dark:invert-0"
        style={{ imageRendering: "crisp-edges" }}
      />
    </div>
  );
}

/* ===== Scramble on mount (runs once per visit to this page) ===== */
function ScrambleTextOnMount({
  text,
  className = "",
  style,
  durationMs = 2000,
  chaos = "!<>-_\\/[]{}—=+*^?#_0123456789",
}) {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const initialScramble = React.useMemo(
    () => (prefersReduced ? text : scrambleSeed(text, chaos)),
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
            : chars[(i + Math.floor((1 - t) * 60)) % chars.length];
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

function scrambleSeed(target, chaos) {
  const chars = chaos.split("");
  let s = "";
  for (let i = 0; i < target.length; i++) {
    s += target[i] === " " ? " " : chars[(i * 7) % chars.length];
  }
  return s;
}

/* ARCHV • AI • TRUST kinetic line (pong bounce underline; perfectly stops at TRUST) */
function TrustKinetics() {
  const { theme } = useTheme();
  const tone = theme === "dark" ? "text-white/80" : "text-black/80";

  const labelRef = React.useRef(null);
  const trustRef = React.useRef(null);
  const [vars, setVars] = React.useState({ railW: 0, cursorW: 0 });

  // Measure widths on mount & on resize
  React.useEffect(() => {
    const measure = () => {
      if (!labelRef.current || !trustRef.current) return;
      const railW = Math.round(labelRef.current.getBoundingClientRect().width);
      const cursorW = Math.round(
        trustRef.current.getBoundingClientRect().width
      );
      setVars({ railW, cursorW });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (labelRef.current) ro.observe(labelRef.current);
    if (trustRef.current) ro.observe(trustRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const styleVars = {
    // px values into CSS variables
    ["--railW"]: `${vars.railW}px`,
    ["--cursorW"]: `${vars.cursorW}px`,
    ["--maxX"]: `calc(var(--railW) - var(--cursorW))`,
  };

  return (
    <div
      className={`relative inline-block font-mono ${tone} select-none`}
      style={styleVars}
    >
      {/* Text (no padding that could skew width) */}
      <div ref={labelRef} className="text-xs tracking-[0.35em]">
        ARCHV <span className="inline-block">•</span> AI{" "}
        <span className="inline-block">•</span>{" "}
        <span ref={trustRef} className="inline-block">
          TRUST
        </span>
      </div>

      {/* Underline rail exactly the width of the text line */}
      <div
        className="relative h-[2px] mt-1 opacity-40"
        style={{ width: "var(--railW)" }}
      >
        <div className="absolute inset-0 bg-current/30" />
        {/* Cursor: bounces between 0 and (railW - cursorW); no bleed past TRUST */}
        <div
          className="absolute top-0 h-[2px] bg-current will-change-transform"
          style={{
            width: "var(--cursorW)",
            transform: "translateX(0)",
            animation: "pong 2.2s linear infinite alternate",
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}

/* Ticker bar (seamless) */
function TickerBar() {
  const { theme } = useTheme();
  const dim = theme === "dark" ? "text-white/70" : "text-black/70";
  const [chunks, setChunks] = React.useState(() => makeTickerRow());

  React.useEffect(() => {
    const id = setInterval(() => setChunks(makeTickerRow()), 8000);
    return () => clearInterval(id);
  }, []);

  const content = chunks.join("    •    ");

  return (
    <div
      className={`overflow-hidden border border-current/10 font-mono text-[11px] ${dim}`}
      style={{
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        maskImage:
          "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
      }}
    >
      {/* Two identical copies (A + B). Translate by -100% for a seamless loop. */}
      <div
        className="whitespace-nowrap flex"
        style={{
          width: "max-content",
          animation: "ticker 30s linear infinite",
          willChange: "transform",
        }}
      >
        <span className="px-3">{content}</span>
        <span className="px-3" aria-hidden>
          {content}
        </span>
      </div>
    </div>
  );
}

function makeTickerRow() {
  const rnd = (n = 8) =>
    Array.from(
      { length: n },
      () => "0123456789ABCDEF"[Math.floor(Math.random() * 16)]
    ).join("");
  const items = [
    `SIG ok:${rnd(6)}`,
    `hash:${rnd(8)}${rnd(4)}`,
    `audit:pass`,
    `kdf:${rnd(4)} rounds`,
    `region:us-${Math.floor(Math.random() * 3) + 1}`,
    `key-rot:${Math.floor(Math.random() * 24)}h`,
    `rbac:clean`,
    `enc:tls1.3`,
    `vault:${rnd(5)}`,
    `privacy:first`,
  ];
  return items.sort(() => 0.5 - Math.random());
}

/* Small helpers */
function Today() {
  const [d] = React.useState(() =>
    new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    })
  );
  return <>{d}</>;
}

function LiveStatus() {
  const frames = ["-", "\\", "|", "/"];
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % frames.length), 250);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="inline-flex items-center gap-1">
      <span className="opacity-70">{frames[i]}</span>Operational
    </span>
  );
}
