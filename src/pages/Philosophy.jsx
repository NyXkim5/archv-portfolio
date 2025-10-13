// src/pages/Philosophy.jsx
import React from "react";
import Nav from "../components/Nav.jsx";
import { useTheme, useTokens } from "../components/ThemeProvider.jsx";

/* ---------- Rotating headline next to Archv, width-stable ---------- */
function RotatingHeadlineStable({
  words = [],
  className = "",
  accentClass = "",
  intervalMs = 2100,
}) {
  const [index, setIndex] = React.useState(0);
  const [phase, setPhase] = React.useState("in");
  const wrapRef = React.useRef(null);
  const measureRef = React.useRef(null);
  const [width, setWidth] = React.useState(null);

  React.useEffect(() => {
    const measure = () => {
      if (!measureRef.current) return;
      const kids = Array.from(measureRef.current.children || []);
      const w = Math.ceil(
        kids.reduce((m, el) => Math.max(m, el.getBoundingClientRect().width), 0)
      );
      setWidth(w || null);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  React.useEffect(() => {
    if (words.length < 2) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let to = null;
    const id = window.setInterval(() => {
      setPhase("out");
      to = window.setTimeout(() => {
        setIndex((n) => (n + 1) % words.length);
        setPhase("in");
      }, 260);
    }, intervalMs);
    return () => {
      clearInterval(id);
      if (to) clearTimeout(to);
    };
  }, [words, intervalMs]);

  const w = words[index] || { text: "", lang: "en" };

  return (
    <span
      ref={wrapRef}
      style={{
        display: "inline-block",
        width: width ? `${width}px` : undefined,
      }}
      className={className}
    >
      <span
        className={phase === "in" ? "rot-in" : "rot-out"}
        lang={w.lang}
        dir="auto"
      >
        <span className={accentClass}>{w.text}</span>
      </span>

      {/* hidden measurer for width stability */}
      <span
        ref={measureRef}
        aria-hidden
        style={{
          position: "absolute",
          visibility: "hidden",
          pointerEvents: "none",
          opacity: 0,
          whiteSpace: "nowrap",
        }}
        className={className}
      >
        {words.map((m, i) => (
          <span key={i} className={accentClass} style={{ display: "block" }}>
            {m.text}
          </span>
        ))}
      </span>
    </span>
  );
}

/* ---------- primitives ---------- */
function Mono({ children, className = "" }) {
  return (
    <div className={`font-mono tracking-[0.12em] uppercase ${className}`}>
      {children}
    </div>
  );
}
function Rule() {
  return <div className="h-px w-full bg-black/10" />;
}
function BounceRule({ cursorWidth = 160 }) {
  return (
    <div className="relative h-[2px] w-full bg-black/10 overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-[#ff6a00] to-transparent opacity-80 animate-pingpong"
        style={{ width: `${cursorWidth}px`, ["--cursorW"]: `${cursorWidth}px` }}
      />
    </div>
  );
}
function Sheet({ children, className = "" }) {
  return (
    <article
      className={`bg-white border border-black/10 rounded-[12px] shadow-sm overflow-hidden ${className}`}
    >
      {children}
    </article>
  );
}
function SpecRow({ label, value }) {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-5 md:col-span-4 py-2 pr-3 border-b border-black/10 font-mono text-[11px] tracking-[0.08em] uppercase opacity-70">
        {label}
      </div>
      <div className="col-span-7 md:col-span-8 py-2 border-b border-black/10 text-sm">
        {value}
      </div>
    </div>
  );
}
function Swatch({ color, name }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-block h-4 w-4 rounded-full ring-1 ring-black/10"
        style={{ background: color }}
      />
      <span className="text-[12px] opacity-70">{name}</span>
    </div>
  );
}

/* ---------- media block ---------- */
function MediaBlock({ src, alt = "", tone = "light" }) {
  const [broken, setBroken] = React.useState(false);
  const grad =
    tone === "light"
      ? "linear-gradient(135deg, rgba(255,106,0,0.06), rgba(0,0,0,0.04))"
      : "linear-gradient(135deg, rgba(0,0,0,0.06), rgba(255,106,0,0.10))";

  return (
    <div className="relative overflow-hidden rounded-[10px] border border-black/10">
      <div className="w-full" style={{ paddingTop: "66.666%" }} />
      {!broken && (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
          onError={() => setBroken(true)}
        />
      )}
      {broken && (
        <div className="absolute inset-0" style={{ background: grad }}>
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            <circle
              cx="32"
              cy="62"
              r="18"
              fill="none"
              stroke="black"
              strokeOpacity="0.12"
            />
            <rect
              x="56"
              y="24"
              width="30"
              height="30"
              rx="4"
              fill="none"
              stroke="black"
              strokeOpacity="0.12"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

/* ---------- assets ---------- */
const imgA = new URL("../assets/ARCHV (5).png", import.meta.url).href;
const imgB = new URL("../assets/ARCHV (4).png", import.meta.url).href;

/* ---------- page ---------- */
export default function Philosophy() {
  const { theme } = useTheme();
  const t = useTokens(theme);

  const words = [
    { text: "Philosophy", lang: "en" },
    { text: "철학", lang: "ko" },
    { text: "Philosophie", lang: "fr" },
    { text: "Filosofía", lang: "es" },
    { text: "哲学", lang: "zh" },
  ];

  return (
    <div className={`min-h-screen bg-white text-black ${t.font} flex flex-col`}>
      {/* NAV — forced pure white background */}
      <div className="relative z-30 isolate">
        <div className="absolute inset-0 bg-white" aria-hidden />
        <Nav />
      </div>

      {/* masthead */}
      <header className="bg-white px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 pt-8 pb-5 border-b border-black/10 relative">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <h1 className="text-[44px] sm:text-[56px] md:text-[64px] leading-[0.92] font-semibold tracking-tight flex items-baseline gap-4">
            Archv
            <RotatingHeadlineStable
              words={words}
              className="inline-block text-[40px] sm:text-[50px] md:text-[58px] font-semibold leading-none"
              accentClass="text-[#ff6a00]"
              intervalMs={2000}
            />
            <span
              className="inline-block h-2 w-2 rounded-full bg-[#ff6a00] animate-pulse"
              aria-hidden
            />
          </h1>
          <div className="text-right">
            <Mono className="text-[11px] opacity-70">Spec Sheet</Mono>
            <div className="text-[12px] opacity-60">
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
        <div className="mt-3">
          <BounceRule cursorWidth={160} />
        </div>
        <div className="mt-2 text-sm opacity-80">
          <span className="text-[#ff6a00] font-medium">Client first</span> ·
          Evidence led · Simple integration
        </div>
      </header>

      <main className="flex-1 w-full mx-0 px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 py-8 space-y-8">
        {/* Top philosophy sheet */}
        <Sheet>
          <div className="p-5 md:p-6">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-7">
                <Mono className="text-[11px] opacity-70">Archv Philosophy</Mono>
                <Rule />
                <p className="text-sm md:text-[15px] leading-relaxed mt-3">
                  Archv is a private operating layer for firms that live on
                  evidence. Security and simple integration come first. Identity
                  and permission lead every action. Each answer includes sources
                  that a person can check and export. You choose the region and
                  the keys. We never train on client data. We ship in steady
                  steps that you can review. The goal is trust and speed at the
                  same time.
                </p>
                <p className="text-sm md:text-[15px] leading-relaxed mt-3">
                  We are setting a new standard of client care. Your comfort and
                  your security are the priority. We listen and respond clearly.
                  When you have an issue we take ownership and address it. Our
                  role is to carry the complexity so your team can focus on the
                  work that matters.
                </p>
              </div>

              <div className="col-span-12 lg:col-span-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Mono className="text-[11px] opacity-70">
                      Non Negotiables
                    </Mono>
                    <Rule />
                    <ul className="list-disc ml-5 text-sm mt-2 space-y-1">
                      <li>No training on client data</li>
                      <li>Role based access with SSO or OIDC</li>
                      <li>Region choice with clear residency</li>
                      <li>Exportable logs and audit</li>
                    </ul>

                    {/* ——— LOADING SPINNER + two extra left blocks ——— */}
                    <div className="mt-4 relative">
                      <div
                        className="loadingspinner"
                        role="img"
                        aria-label="Loading"
                      >
                        {/* NEW: static left tiles to balance the row */}
                        <div id="squareL2"></div>
                        <div id="squareL1"></div>

                        {/* original animated set */}
                        <div id="square1"></div>
                        <div id="square2"></div>
                        <div id="square3"></div>
                        <div id="square4"></div>
                        <div id="square5"></div>
                      </div>
                    </div>
                    {/* ——— /LOADING SPINNER ——— */}
                  </div>

                  <div>
                    <Mono className="text-[11px] opacity-70">Design</Mono>
                    <Rule />
                    <ul className="list-disc ml-5 text-sm mt-2 space-y-1">
                      <li>Quiet screens with visible state</li>
                      <li>Recovery that is simple and clear</li>
                      <li>Small releases you can review</li>
                      <li>Evidence first answers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Sheet>

        {/* Twin sheets */}
        <div className="grid grid-cols-12 gap-6 xl:gap-8">
          {/* Sheet A */}
          <Sheet className="col-span-12 lg:col-span-6">
            <div className="p-5 md:p-6 grid grid-rows-[auto_auto_1fr] gap-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                    Design and Typography
                  </h3>
                  <Mono className="text-[12px] opacity-70 mt-1">D100</Mono>
                </div>
                <Mono className="text-[11px] opacity-70">
                  Designer · Archv Team
                </Mono>
              </div>

              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 md:col-span-6">
                  <MediaBlock src={imgA} alt="Archv visual" tone="light" />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <p className="text-sm leading-relaxed">
                    Our design philosophy is calm and legible. We design for
                    reading first and action second. Evidence is visible in line
                    with the answer so trust does not depend on guesswork.
                    Orange marks intent and progress. It never decorates for its
                    own sake. Components feel predictable and reversible. Copy
                    is plain and respectful.
                  </p>

                  <div className="mt-4">
                    <Mono className="text-[11px] opacity-70">
                      Finishes · Signals
                    </Mono>
                    <Rule />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 mt-2">
                      <Swatch color="#ff6a00" name="Orange accent" />
                      <Swatch color="#111111" name="Black" />
                      <Swatch color="#e5e7eb" name="Light gray" />
                      <Swatch color="#9ca3af" name="Medium gray" />
                      <Swatch color="#ffffff" name="Paper white" />
                      <Swatch color="#2563eb" name="Info blue" />
                    </div>
                  </div>
                </div>
              </div>

              {/* beliefs block */}
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-6">
                  <Mono className="text-[11px] opacity-70">Principles</Mono>
                  <Rule />
                  <ul className="list-disc ml-5 text-sm mt-2 space-y-1">
                    <li>Calm surfaces that reduce decision load</li>
                    <li>Read first then act with clear next steps</li>
                    <li>Receipts in line with every important result</li>
                    <li>Defaults that respect risk and privacy</li>
                    <li>Fewer choices with better outcomes</li>
                    <li>Accessibility as a baseline not an option</li>
                  </ul>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <Mono className="text-[11px] opacity-70">
                    Beliefs · Simplicity and Brutalism
                  </Mono>
                  <Rule />
                  <SpecRow
                    label="Surface"
                    value="Plain backgrounds with high contrast"
                  />
                  <SpecRow
                    label="Structure"
                    value="Clear grid with visible rhythm"
                  />
                  <SpecRow
                    label="Action"
                    value="Primary action is obvious and reversible"
                  />
                  <SpecRow
                    label="Evidence"
                    value="Citations live next to claims"
                  />
                  <SpecRow
                    label="Material"
                    value="Few styles and honest components"
                  />
                  <SpecRow label="Voice" value="Direct terms with zero fluff" />
                </div>
              </div>
            </div>
          </Sheet>

          {/* Sheet B */}
          <Sheet className="col-span-12 lg:col-span-6">
            <div className="p-5 md:p-6 grid grid-rows-[auto_auto_1fr] gap-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                    Integration and Control
                  </h3>
                  <Mono className="text-[12px] opacity-70 mt-1">A200</Mono>
                </div>
                <Mono className="text-[11px] opacity-70">
                  Designer · Archv Team
                </Mono>
              </div>

              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 md:col-span-6 order-2 md:order-1">
                  <p className="text-sm leading-relaxed">
                    We respect the systems you use and the rules you follow. You
                    can deploy in our cloud, in your VPC, or in an air gapped
                    zone. Ownership is clear and progress is easy to review.
                  </p>

                  <div className="mt-4">
                    <Mono className="text-[11px] opacity-70">
                      Compatibility
                    </Mono>
                    <Rule />
                    <div className="text-sm mt-2 opacity-80">
                      Fits legal, banking, and health workflows. Works with
                      standard identity and network controls.
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 order-1 md:order-2">
                  <MediaBlock src={imgB} alt="Archv visual B" tone="dark" />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-6">
                  <Mono className="text-[11px] opacity-70">Specifications</Mono>
                  <Rule />
                  <SpecRow
                    label="Deploy"
                    value="Our cloud or your VPC or air gapped"
                  />
                  <SpecRow label="Egress" value="Allow list with logging" />
                  <SpecRow
                    label="Observability"
                    value="Event logs and export"
                  />
                  <SpecRow
                    label="Support"
                    value="Steady releases you can review"
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <Mono className="text-[11px] opacity-70">Controls</Mono>
                  <Rule />
                  <SpecRow
                    label="Roles"
                    value="Least privilege with clear review"
                  />
                  <SpecRow label="Keys" value="Customer managed available" />
                  <SpecRow label="Residency" value="Choice per tenant" />
                  <SpecRow
                    label="Interfaces"
                    value="APIs and tools with receipts"
                  />
                </div>
              </div>
            </div>
          </Sheet>
        </div>
      </main>

      <footer className="w-full border-t border-current/10 py-3 px-6 md:px-8 text-[11px] opacity-70 flex items-center justify-between">
        <span>© {new Date().getFullYear()} Archv</span>
        <span>design iteration 2</span>
      </footer>

      {/* motion + spinner styles */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes fadeIn { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: translateY(0) } }
          @keyframes fadeOut { from { opacity: 1; transform: translateY(0) } to { opacity: 0; transform: translateY(-6px) } }
          .rot-in { animation: fadeIn .26s ease-out both }
          .rot-out { animation: fadeOut .26s ease-in both }
          @keyframes pingpong {
            0% { transform: translateX(0) }
            100% { transform: translateX(calc(100% - var(--cursorW, 160px))) }
          }
          .animate-pingpong { animation: pingpong 2.6s linear infinite alternate }
        }

        /* ====== Loading spinner (brand orange) ====== */
        .loadingspinner {
          --square: 26px;
          --offset: 30px;
          --duration: 2.4s;
          --delay: 0.2s;
          --timing-function: ease-in-out;
          --in-duration: 0.4s;
          --in-delay: 0.1s;
          --in-timing-function: ease-out;
          width: calc( 3 * var(--offset) + var(--square));
          height: calc( 2 * var(--offset) + var(--square));
          padding: 0px;
          margin-left: auto;
          margin-right: auto;
          margin-top: 10px;
          margin-bottom: 30px;
          position: relative;
        }
        .loadingspinner div {
          display: inline-block;
          background: #ff6a00; /* Archv orange */
          border: none;
          border-radius: 2px;
          width: var(--square);
          height: var(--square);
          position: absolute;
          padding: 0px;
          margin: 0px;
          font-size: 6pt;
          color: black;
        }

        /* static left tiles to visually add two more blocks */
        .loadingspinner #squareL2 { left: calc(-2 * var(--offset)); top: calc(1 * var(--offset)); }
        .loadingspinner #squareL1 { left: calc(-1 * var(--offset));  top: calc(1 * var(--offset)); }

        .loadingspinner #square1 {
          left: calc( 0 * var(--offset) ); top: calc( 0 * var(--offset) );
          animation: square1 var(--duration) var(--delay) var(--timing-function) infinite,
                     squarefadein var(--in-duration) calc(1 * var(--in-delay)) var(--in-timing-function) both;
        }
        .loadingspinner #square2 {
          left: calc( 0 * var(--offset) ); top: calc( 1 * var(--offset) );
          animation: square2 var(--duration) var(--delay) var(--timing-function) infinite,
                     squarefadein var(--in-duration) calc(1 * var(--in-delay)) var(--in-timing-function) both;
        }
        .loadingspinner #square3 {
          left: calc( 1 * var(--offset) ); top: calc( 1 * var(--offset) );
          animation: square3 var(--duration) var(--delay) var(--timing-function) infinite,
                     squarefadein var(--in-duration) calc(2 * var(--in-delay)) var(--in-timing-function) both;
        }
        .loadingspinner #square4 {
          left: calc( 2 * var(--offset) ); top: calc( 1 * var(--offset) );
          animation: square4 var(--duration) var(--delay) var(--timing-function) infinite,
                     squarefadein var(--in-duration) calc(3 * var(--in-delay)) var(--in-timing-function) both;
        }
        .loadingspinner #square5 {
          left: calc( 3 * var(--offset) ); top: calc( 1 * var(--offset) );
          animation: square5 var(--duration) var(--delay) var(--timing-function) infinite,
                     squarefadein var(--in-duration) calc(4 * var(--in-delay)) var(--in-timing-function) both;
        }

        @keyframes square1 {
          0% { left: calc(0 * var(--offset)); top: calc(0 * var(--offset)); }
          8.333% { left: calc(0 * var(--offset)); top: calc(1 * var(--offset)); }
          100% { left: calc(0 * var(--offset)); top: calc(1 * var(--offset)); }
        }
        @keyframes square2 {
          0% { left: calc(0 * var(--offset)); top: calc(1 * var(--offset)); }
          8.333% { left: calc(0 * var(--offset)); top: calc(2 * var(--offset)); }
          16.67% { left: calc(1 * var(--offset)); top: calc(2 * var(--offset)); }
          25.00% { left: calc(1 * var(--offset)); top: calc(1 * var(--offset)); }
          83.33% { left: calc(1 * var(--offset)); top: calc(1 * var(--offset)); }
          91.67% { left: calc(1 * var(--offset)); top: calc(0 * var(--offset)); }
          100% { left: calc(0 * var(--offset)); top: calc(0 * var(--offset)); }
        }
        @keyframes square3 {
          0%,100% { left: calc(1 * var(--offset)); top: calc(1 * var(--offset)); }
          16.67% { left: calc(1 * var(--offset)); top: calc(1 * var(--offset)); }
          25.00% { left: calc(1 * var(--offset)); top: calc(0 * var(--offset)); }
          33.33% { left: calc(2 * var(--offset)); top: calc(0 * var(--offset)); }
          41.67% { left: calc(2 * var(--offset)); top: calc(1 * var(--offset)); }
          66.67% { left: calc(2 * var(--offset)); top: calc(1 * var(--offset)); }
          75.00% { left: calc(2 * var(--offset)); top: calc(2 * var(--offset)); }
          83.33% { left: calc(1 * var(--offset)); top: calc(2 * var(--offset)); }
          91.67% { left: calc(1 * var(--offset)); top: calc(1 * var(--offset)); }
        }
        @keyframes square4 {
          0% { left: calc(2 * var(--offset)); top: calc(1 * var(--offset)); }
          33.33% { left: calc(2 * var(--offset)); top: calc(1 * var(--offset)); }
          41.67% { left: calc(2 * var(--offset)); top: calc(2 * var(--offset)); }
          50.00% { left: calc(3 * var(--offset)); top: calc(2 * var(--offset)); }
          58.33% { left: calc(3 * var(--offset)); top: calc(1 * var(--offset)); }
          100% { left: calc(3 * var(--offset)); top: calc(1 * var(--offset)); }
        }
        @keyframes square5 {
          0% { left: calc(3 * var(--offset)); top: calc(1 * var(--offset)); }
          50.00% { left: calc(3 * var(--offset)); top: calc(1 * var(--offset)); }
          58.33% { left: calc(3 * var(--offset)); top: calc(0 * var(--offset)); }
          66.67% { left: calc(2 * var(--offset)); top: calc(0 * var(--offset)); }
          75.00% { left: calc(2 * var(--offset)); top: calc(1 * var(--offset)); }
          100% { left: calc(2 * var(--offset)); top: calc(1 * var(--offset)); }
        }
        @keyframes squarefadein {
          0% { transform: scale(0.75); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
