// src/pages/Platform.jsx
import React from "react";
import Nav from "../components/Nav.jsx";
import { useTheme, useTokens } from "../components/ThemeProvider.jsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/******************************
 * Firm-relevant comparison graph (Recharts)
 * - Our Platform = orange
 * - Other Providers = gray
 * - Only include third-party reported metrics
 ******************************/
const DEFAULT_FIRM_METRICS = [
  { metric: "Reproducible Sci-Code (2025)", Us: 51, Others: 27 },
  { metric: "MMLU Pro (2025) — accuracy", Us: 87.8, Others: 87.0 },
  { metric: "Factual precision (200 tasks)", Us: 93.2, Others: 91.4 },
];
const FIRM_METRICS =
  typeof window !== "undefined" && Array.isArray(window.__ARCHV_FIRM_METRICS__)
    ? window.__ARCHV_FIRM_METRICS__
    : DEFAULT_FIRM_METRICS;

const DISPLAY_METRICS = (FIRM_METRICS || [])
  .filter((r) => typeof r.Us === "number" && typeof r.Others === "number")
  .filter((r) => r.Us > r.Others);

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white/80 backdrop-blur-xl shadow-lg px-4 py-3 text-black">
        <div className="text-[12px] mb-1 opacity-80">{label}</div>
        {payload.map((p, i) => (
          <div className="text-sm leading-6" key={i}>
            <span className="font-semibold">{p.name || "Value"}:</span>{" "}
            {Number(p.value).toFixed(1)}%
          </div>
        ))}
      </div>
    );
  }
  return null;
}

/******************************
 * Platform Page
 ******************************/
export default function Platform() {
  const { theme } = useTheme();
  const t = useTokens(theme);
  const isDark = theme === "dark";
  const mute = isDark ? "text-black/60 dark:text-white/60" : "text-black/60";
  const bx = isDark
    ? "border-black/15 dark:border-white/15"
    : "border-black/15";
  const [showInfo, setShowInfo] = React.useState(false);

  return (
    <div
      className={`min-h-screen ${t.pageBg} ${t.pageText} ${t.font} flex flex-col`}
    >
      <StyleSvgAnim />

      <Nav />

      <main className="flex-1 w-full mx-0 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 py-5 relative">
        <div className="mt-2 border-b border-current/10" />

        {/* HERO */}
        <section className="mt-8 grid grid-cols-12 gap-6 lg:gap-10">
          {/* Left — copy */}
          <div className="col-span-12 lg:col-span-7">
            <h1 className="text-[34px] sm:text-[42px] md:text-[54px] leading-[1.02] font-medium tracking-tight">
              Archv AI Platform
            </h1>
            <p className={`mt-3 max-w-[60ch] text-sm sm:text-[15px] ${mute}`}>
              Calm software for real work. Private by default, retrieval-first,
              and simple to run. Built for teams that need proof, not promises.
            </p>

            {/* Key bullets */}
            <div className="mt-6 grid grid-cols-12 gap-4">
              <Feature
                title="Zero co-tenancy: your data, your compute, your context"
                className="col-span-12 sm:col-span-6"
              />
              <Feature
                title="Every answer cites its source (provenance & traceability)"
                className="col-span-12 sm:col-span-6"
              />
              <Feature
                title="Deploy anywhere: our cloud, your VPC, or fully air-gapped"
                className="col-span-12 sm:col-span-6"
              />
              <Feature
                title="Compliance by design: HIPAA, SOC 2, GDPR-ready"
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

          {/* Right — animated SVG (replaces video) */}
          <div className="col-span-12 lg:col-span-5">
            <SvgPanel />
          </div>
        </section>

        {/* Divider */}
        <div className={`mt-10 border-t ${bx}`} />

        {/* Spec row */}
        <section className="mt-6 grid grid-cols-12">
          <Spec
            label="Deploy"
            value="Hardened regions · Your VPC · Air-gapped"
          />
          <Spec label="Identity" value="SSO / OIDC · least-privilege roles" />
          <Spec
            label="Data"
            value="No model training · CMK/BYOK · egress allow-lists"
          />
          <Spec
            label="Assurance"
            value="Provenance, audit logs, exportable evidence"
          />
        </section>

        {/* ===== Comparison Graph (Our Platform vs Others) ===== */}
        <section className="mt-10">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              How We Compare
            </h2>
            <button
              type="button"
              aria-label="What this means"
              onClick={() => setShowInfo((v) => !v)}
              className="inline-flex items-center justify-center h-6 w-6 rounded-full border border-current/20 text-xs opacity-70 hover:opacity-100"
            >
              ⓘ
            </button>
          </div>

          {showInfo && (
            <div className="mt-2 text-xs rounded-2xl border border-black/10 bg-white/80 backdrop-blur-xl shadow-lg p-4 max-w-2xl text-black">
              <div className="font-medium mb-2">What these bars show</div>
              <ul className="list-disc ml-4 space-y-1">
                <li>
                  <span className="font-medium">Reproducible Sci-Code:</span>{" "}
                  Percent of academic code projects where the model can run the
                  code and match the paper’s reported result end-to-end without
                  human edits (higher is better).
                </li>
                <li>
                  <span className="font-medium">MMLU Pro — accuracy:</span>{" "}
                  Accuracy on professional/graduate-level questions designed to
                  reduce training-data leakage.
                </li>
                <li>
                  <span className="font-medium">
                    Factual precision (200 tasks):
                  </span>{" "}
                  Share of claims verified as correct in a fact-heavy eval set.
                </li>
              </ul>
              <div className="mt-2 opacity-80">
                We only chart metrics with third-party, reproducible values —
                and only where we outperform the comparator.
              </div>
            </div>
          )}

          <p className={`mt-1 text-sm ${mute}`}>
            Orange = us. Gray = others. Independently verified results.
          </p>

          <div className="mt-4 space-y-8">
            {DISPLAY_METRICS.length > 0 && (
              <div className="h-[360px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={DISPLAY_METRICS}
                    margin={{ top: 16, right: 24, left: 0, bottom: 8 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="currentColor"
                      opacity={0.1}
                    />
                    <XAxis
                      dataKey="metric"
                      tick={{ fontSize: 12 }}
                      interval={0}
                      height={60}
                      tickMargin={10}
                    />
                    <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                    <Tooltip content={<CustomTooltip />} cursor={false} />
                    <Bar
                      dataKey="Us"
                      name="Our Platform"
                      fill="#ff6a00"
                      barSize={22}
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="Others"
                      name="Other Providers"
                      fill="#9ca3af"
                      barSize={22}
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {DISPLAY_METRICS.length > 0 && (
              <div className="overflow-x-auto rounded-2xl border border-current/10">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left">
                      <th className="py-2 px-3 border-b border-current/10">
                        Metric
                      </th>
                      <th className="py-2 px-3 border-b border-current/10">
                        Our Platform
                      </th>
                      <th className="py-2 px-3 border-b border-current/10">
                        Other Providers
                      </th>
                      <th className="py-2 px-3 border-b border-current/10">
                        Difference
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {DISPLAY_METRICS.map((r, idx) => (
                      <tr
                        key={idx}
                        className="odd:bg-black/0 even:bg-black/[0.02] dark:even:bg-white/[0.03]"
                      >
                        <td className="py-2 px-3 border-b border-current/10">
                          {r.metric}
                        </td>
                        <td className="py-2 px-3 border-b border-current/10">
                          {Number(r.Us).toFixed(1)}%
                        </td>
                        <td className="py-2 px-3 border-b border-current/10">
                          {Number(r.Others).toFixed(1)}%
                        </td>
                        <td className="py-2 px-3 border-b border-current/10">
                          {(Number(r.Us) - Number(r.Others)).toFixed(1)} pp
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-4 rounded-2xl border border-black/10 bg-white/80 backdrop-blur-xl p-4 text-black">
            <div className="text-base sm:text-lg font-semibold">
              Bottom line
            </div>
            <ul className="mt-2 grid sm:grid-cols-3 gap-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 ring-1 ring-orange-500/30">
                  ✓
                </span>
                Higher accuracy on tough questions
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 ring-1 ring-orange-500/30">
                  ✓
                </span>
                More consistent, reproducible results
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 ring-1 ring-orange-500/30">
                  ✓
                </span>
                Fewer incorrect claims
              </li>
            </ul>
          </div>
        </section>
        {/* ===== /Comparison Graph ===== */}
      </main>

      {/* footer */}
      <footer className="w-full border-t border-current/10 py-3 px-6 md:px-8 text-[11px] opacity-70 flex items-center justify-between">
        <span>© {new Date().getFullYear()} Archv</span>
        <span>design iteration 3</span>
      </footer>
    </div>
  );
}

/* ---------------- small components ---------------- */
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

/** Animated SVG panel (replaces the old video) */
function SvgPanel() {
  return (
    <div
      className="
        relative overflow-hidden border border-current/10
        bg-black/5 dark:bg-white/5
        rounded-md
        aspect-[16/11] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[16/9]
        w-full
      "
    >
      {/* absolute fill inside aspect-ratio wrapper */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 614 390"
        className="absolute inset-0 w-full h-full"
        aria-label="We don’t sell features, we solve frustrations — animation"
        preserveAspectRatio="xMidYMid meet"
      >
        <g id="Frame">
          {/* TEXT — forced black for visibility on all themes */}
          <g id="box-figma">
            <text
              id="text"
              x="50%"
              y="45%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#000"
              style={{
                fontFamily:
                  "system-ui, -apple-system, Inter, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              We don’t sell features, we solve frustrations
            </text>
          </g>

          {/* Blue box + corner handles */}
          <g id="box">
            <rect
              id="figny9-box"
              x="28"
              y="20"
              width="559"
              height="286"
              stroke="#2563EB"
              strokeWidth="2"
              fill="#2563EB"
              fillOpacity="0.05"
              rx="2"
            />
            <rect
              id="figny9-adjust-1"
              x="23"
              y="15"
              width="10"
              height="10"
              stroke="#2563EB"
              strokeWidth="2"
              fill="white"
            />
            <rect
              id="figny9-adjust-2"
              x="582"
              y="15"
              width="10"
              height="10"
              stroke="#2563EB"
              strokeWidth="2"
              fill="white"
            />
            <rect
              id="figny9-adjust-3"
              x="23"
              y="301"
              width="10"
              height="10"
              stroke="#2563EB"
              strokeWidth="2"
              fill="white"
            />
            <rect
              id="figny9-adjust-4"
              x="582"
              y="301"
              width="10"
              height="10"
              stroke="#2563EB"
              strokeWidth="2"
              fill="white"
            />
          </g>

          {/* Cursor + label */}
          <g id="cursor">
            <path
              id="Vector 273"
              d="M453.383 343L448 317L471 331L459.745 333.5L453.383 343Z"
              fill="#2563EB"
              stroke="white"
              strokeWidth="2"
            />
            <rect
              id="Rectangle 786"
              x="469.932"
              y="343"
              width="117.068"
              height="33"
              fill="#2563EB"
            />
            <text
              x="478"
              y="364"
              fill="white"
              fontSize="12"
              style={{
                fontFamily:
                  "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
              }}
            >
              Archv Cursor
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}

/** Local CSS for the SVG animation */
function StyleSvgAnim() {
  return (
    <style>{`
      svg { display: block; }
      #cursor, #box, #text { cursor: pointer; }

      /* Cursor animation */
      #cursor {
        overflow: visible;
        transform-box: fill-box;
        transform-origin: center center;
        opacity: 0;
        transform: translate3d(300px, 0, 0) scale(1);
        animation: cursor-move 5s ease-in-out infinite alternate;
        will-change: transform, opacity;
      }
      @keyframes cursor-move {
        0% { opacity: 0; transform: translate3d(300px, 0, 0) scale(1); }
        30% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        60% { opacity: 1; transform: translate3d(-200px, -200px, 0) scale(1); }
        65% { transform: translate3d(-200px, -200px, 0) scale(0.95); }
        70% { transform: translate3d(-200px, -200px, 0) scale(1); }
        100% { opacity: 1; transform: translate3d(-300px, -50px, 0) scale(1); }
      }

      /* Box fade timing */
      #box {
        opacity: 0;
        animation: box-fade 5s ease-in-out infinite alternate;
        will-change: opacity;
      }
      @keyframes box-fade {
        0%, 60% { opacity: 0; }
        65%, 100% { opacity: 1; }
      }

      /* Text fade */
      #text {
        opacity: 0;
        animation: text-fade 5s ease-in-out infinite alternate;
        will-change: opacity, transform;
      }
      @keyframes text-fade {
        0%, 20% { opacity: 0; }
        30%, 100% { opacity: 1; }
      }

      /* Respect reduced motion */
      @media (prefers-reduced-motion: reduce) {
        #cursor, #box, #text {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `}</style>
  );
}
