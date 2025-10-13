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

  // If this filename differs in your repo, update the path below.
  const logoUrl = new URL("../assets/ARCHV (1).png", import.meta.url).href;

  const ORANGE = "var(--archv-orange, #FF6A00)";

  return (
    <div
      className={`min-h-screen ${t.pageBg} ${t.pageText} ${t.font} flex flex-col`}
    >
      <Nav />

      <main className="flex-1 w-full mx-0 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 py-5 relative">
        {/* Keyframes / reduced motion guard */}
        <style>{`
          @keyframes archvTicker { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
          @keyframes pong { from { transform: translateX(0); } to { transform: translateX(var(--maxX)); } }
          @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
        `}</style>

        <TerminalStrip />

        {/* HERO */}
        <div className={`mt-6 grid grid-cols-12 gap-0 border ${bx}`}>
          {/* Left rail */}
          <aside
            className={`col-span-12 md:col-span-3 border-r ${bx} p-3 sm:p-4`}
          >
            <Rail title="Security">
              <RailItem
                label="Data"
                hint="You own it · export · delete"
                orange
              />
              <RailItem label="Access" hint="SSO · roles · least-priv" orange />
              <RailItem label="Storage" hint="Encrypted at rest & in transit" />
              <RailItem label="Retention" hint="You set how long" />
              <RailItem
                label="Export / Delete"
                hint="Plain controls · no surprises"
              />
            </Rail>
          </aside>

          {/* Right col */}
          <section className="col-span-12 md:col-span-9 p-3 sm:p-5">
            <div className="flex flex-col lg:flex-row items-start gap-5 lg:items-center lg:justify-between">
              <div>
                <div
                  className={`${mute} text-[11px] tracking-[0.22em] uppercase`}
                >
                  Statement
                </div>

                <div
                  className="mt-2 leading-[0.92] font-semibold"
                  style={{
                    fontSize: "clamp(2.4rem, 7.8vw, 6rem)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  <ScrambleTextLoop
                    text="TRUST WITHOUT DRAMA"
                    durationMs={2000}
                    gapMs={1200}
                  />
                </div>

                <div
                  className="mt-2 h-[3px] w-28 rounded-full"
                  style={{ background: ORANGE, opacity: 0.9 }}
                />

                <p className="mt-3 text-sm max-w-prose">
                  Your content stays yours. Clear controls. Predictable results.
                  <span className="block mt-1">
                    <strong>Security and privacy are the product</strong>, not a
                    feature gate.
                  </span>
                </p>
              </div>

              <div className="flex items-start gap-4">
                <AsciiSeal />
                <LogoStamp src={logoUrl} />
              </div>
            </div>

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
            <div className="mt-4 relative">
              <div
                className="absolute -top-1 left-0 right-0 h-[2px]"
                style={{ background: ORANGE, opacity: 0.1 }}
              />
              <TickerBar />
            </div>
          </section>
        </div>

        {/* CARDS */}
        <div className={`mt-6 grid grid-cols-12 gap-0 border ${bx}`}>
          <Card title="Data" r orangeBar>
            <p>
              Your environment is <strong>single-tenant</strong> and isolated.
              Compute, storage, and networking are scoped to your organization
              in a <strong>private network boundary</strong> with no co-tenancy.
              Content is <strong>encrypted at rest</strong> with{" "}
              <strong>customer-managed keys (CMK / BYOK)</strong>; rotation and
              revocation are supported. Ingest uses private paths and mutual TLS
              and <strong>egress is allow-listed</strong> and off by default.
              Nothing is used to train any model. You can pin data to a region,
              and <strong>backups inherit the same residency</strong>,
              encryption, and access controls.
            </p>
            <div
              className="mt-3 rounded-md p-3 text-[13px] border"
              style={{
                borderColor: "rgba(255,106,0,0.35)",
                background: "rgba(255,106,0,0.06)",
              }}
            >
              We practice <strong>physical and logical isolation</strong>:
              separate accounts and projects, private subnets, dedicated
              security boundaries, and no shared datasets. If you leave, you can{" "}
              <strong>export</strong> everything and we <strong>delete</strong>{" "}
              what remains on a documented schedule.
            </div>
          </Card>

          <Card title="Access" r orangeBar>
            <p>
              Identity is <strong>federated with your SSO</strong>. Roles follow{" "}
              <strong>least-privilege</strong> and can be scoped down to
              datasets and matters to prevent cross-client leakage. Any elevated
              administrative work requires <strong>just-in-time</strong>{" "}
              approval with <strong>hardware-bound MFA</strong>, is time-boxed,
              and <strong>session-recorded</strong>. Every API call and model
              run has <strong>provenance</strong>: who did it, when, from where,
              and with which context.
            </p>
            <div
              className="mt-3 rounded-md p-3 text-[13px] border"
              style={{
                borderColor: "rgba(255,106,0,0.35)",
                background: "rgba(255,106,0,0.06)",
              }}
            >
              Network policy enforces <strong>private endpoints</strong>,{" "}
              <strong>IP allow-lists</strong>, and optional{" "}
              <strong>private link</strong>. You receive{" "}
              <strong>exportable audit logs</strong> suitable for internal
              review or regulators. Break-glass paths are rare, reviewed, and
              fully logged.
            </div>
          </Card>

          <Card title="Protection" orangeBar>
            <p>
              <strong>Encryption in transit and at rest</strong> is standard.
              Key material can be hosted in your HSM or ours. Scheduled{" "}
              <strong>backups</strong> are validated and inherit your residency
              and key policy. <strong>Data residency</strong> is enforced by
              region, and we support customer-managed keys, rotation windows,
              and scoped key usage.
            </p>
          </Card>
        </div>

        {/* CTA */}
        <div className={`mt-6 border ${bx} p-2`}>
          <div className="bg-black text-white dark:bg-white dark:text-black p-6 sm:p-8 text-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 border border-current rounded-md transition hover:bg-black hover:text-white dark:hover:bg-black dark:hover:text-white hover:ring-2"
              style={{ boxShadow: "0 0 0 0 rgba(0,0,0,0)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 0 3px rgba(255,106,0,0.35)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = "0 0 0 0 rgba(0,0,0,0)")
              }
            >
              Request security brief <span>↗</span>
            </a>
            <div className="mt-2 text-xs opacity-70">
              One page. Plain language. Privacy-first.
            </div>
          </div>
        </div>

        <div className={`mt-6 border-t ${bx} pt-3 text-[11px] ${mute}`}>
          © Archv AI — design iteration 2
        </div>
      </main>
    </div>
  );
}

/* ============ Local components ============ */

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

function RailItem({ label, hint, orange = false }) {
  const { theme } = useTheme();
  const bx = theme === "dark" ? "border-white/20" : "border-black/20";
  const mute = theme === "dark" ? "text-white/60" : "text-black/60";
  const ORANGE = "var(--archv-orange, #FF6A00)";
  return (
    <div
      className={`group relative flex items-center justify-between py-2 sm:py-2.5 border-b ${bx} cursor-default`}
    >
      {orange && (
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full"
          style={{ background: ORANGE, opacity: 0.8 }}
        />
      )}
      <span className="pl-2 text-sm sm:text-base">{label}</span>
      <div className="relative min-w-[160px] text-right">
        <span
          className={`${mute} text-xs block transition-opacity duration-200 group-hover:opacity-0`}
        >
          →
        </span>
        <span className="absolute inset-0 right-0 text-[11px] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {hint}
        </span>
      </div>
    </div>
  );
}

function Stamp({ label, children }) {
  const { theme } = useTheme();
  const bx = theme === "dark" ? "border-white/20" : "border-black/20";
  const ORANGE = "var(--archv-orange, #FF6A00)";
  return (
    <div className="col-span-12 sm:col-span-4">
      <div
        className={`inline-flex items-center gap-2 text-xs border ${bx} px-2.5 py-1`}
      >
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{ background: ORANGE, opacity: 0.9 }}
        />
        <span className="opacity-70 tracking-[0.18em] uppercase">{label}</span>
        <span>{children}</span>
      </div>
    </div>
  );
}

function Card({ title, children, r = false, orangeBar = false }) {
  const { theme } = useTheme();
  const bx = theme === "dark" ? "border-white/20" : "border-black/20";
  const ORANGE = "var(--archv-orange, #FF6A00)";
  return (
    <section
      className={`relative col-span-12 md:col-span-4 p-4 sm:p-5 border ${bx} ${
        r ? "md:border-r" : ""
      }`}
    >
      {orangeBar && (
        <span
          className="absolute left-0 top-0 h-full w-[3px] rounded-sm"
          style={{ background: ORANGE, opacity: 0.7 }}
        />
      )}
      <h3 className="text-xl sm:text-2xl font-semibold">{title}</h3>
      <div className="mt-3 text-sm leading-relaxed">{children}</div>
    </section>
  );
}

/* ===== Looping scramble (with solid cleanup) ===== */
function ScrambleTextLoop({
  text,
  className = "",
  style,
  durationMs = 2000,
  gapMs = 1200,
  chaos = "!<>-_\\/[]{}—=+*^?#_0123456789",
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
    let timeout = 0;
    let start = performance.now();
    const chars = chaos.split("");
    let alive = true;

    const restart = () => {
      if (!alive) return;
      start = performance.now();
      setOut(scrambleSeed(text, chaos));
      raf = requestAnimationFrame(tick);
    };

    const tick = (now) => {
      if (!alive) return;
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

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timeout = window.setTimeout(restart, gapMs);
      }
    };

    restart();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [text, durationMs, gapMs, chaos, prefersReduced]);

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

/* ARCHV • AI • TRUST underline that bounces */
function TrustKinetics() {
  const { theme } = useTheme();
  const tone = theme === "dark" ? "text-white/80" : "text-black/80";

  const labelRef = React.useRef(null);
  const trustRef = React.useRef(null);
  const [vars, setVars] = React.useState({ railW: 0, cursorW: 0 });

  React.useEffect(() => {
    const measure = () => {
      if (!labelRef.current || !trustRef.current) return;
      const railW = Math.round(labelRef.current.getBoundingClientRect().width);
      const cursorW = Math.round(
        trustRef.current.getBoundingClientRect().width
      );
      setVars((prev) =>
        prev.railW === railW && prev.cursorW === cursorW
          ? prev
          : { railW, cursorW }
      );
    };

    measure();

    // Feature-detect ResizeObserver
    const RO =
      typeof window !== "undefined" && window.ResizeObserver
        ? window.ResizeObserver
        : null;
    let ro = null;
    if (RO && labelRef.current && trustRef.current) {
      ro = new RO(measure);
      ro.observe(labelRef.current);
      ro.observe(trustRef.current);
    } else if (typeof window !== "undefined") {
      window.addEventListener("resize", measure);
    }

    return () => {
      if (ro) ro.disconnect();
      else if (typeof window !== "undefined")
        window.removeEventListener("resize", measure);
    };
  }, []);

  const styleVars = {
    ["--railW"]: `${vars.railW}px`,
    ["--cursorW"]: `${vars.cursorW}px`,
    ["--maxX"]: `calc(var(--railW) - var(--cursorW))`,
  };

  return (
    <div
      className={`relative inline-block font-mono ${tone} select-none`}
      style={styleVars}
    >
      <div ref={labelRef} className="text-xs tracking-[0.35em]">
        ARCHV <span className="inline-block">•</span> AI{" "}
        <span className="inline-block">•</span>{" "}
        <span ref={trustRef} className="inline-block">
          TRUST
        </span>
      </div>
      <div
        className="relative h-[2px] mt-1 opacity-40"
        style={{ width: "var(--railW)" }}
      >
        <div className="absolute inset-0 bg-current/30" />
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

/* Ticker bar with renamed keyframes (archvTicker) */
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
      <div
        className="whitespace-nowrap flex"
        style={{
          width: "max-content",
          animation: "archvTicker 30s linear infinite",
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
