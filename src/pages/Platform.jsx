import React from "react";
import Nav from "../components/Nav.jsx";
import { useTheme, useTokens } from "../components/ThemeProvider.jsx";

export default function Platform() {
  const { theme } = useTheme();
  const t = useTokens(theme);
  const bx = theme === "dark" ? "border-white/20" : "border-black/20";
  const mute = theme === "dark" ? "text-white/60" : "text-black/60";

  const RuleLink = ({ children }) => (
    <div
      className={`flex items-center justify-between py-2 sm:py-2.5 border-b ${bx}`}
    >
      <span className="text-sm sm:text-base">{children}</span>
      <span className={`${mute} text-xs`}>→</span>
    </div>
  );

  const Chip = ({ children }) => (
    <span className={`text-[11px] px-2.5 py-1 border ${bx} rounded-md`}>
      {children}
    </span>
  );

  const Feature = ({ title, points }) => (
    <section className={`p-4 sm:p-5 border ${bx}`}>
      <h3 className="text-xl sm:text-2xl font-semibold">{title}</h3>
      <ul className="mt-3 text-sm leading-relaxed space-y-1">
        {points.map((p, i) => (
          <li key={i}>• {p}</li>
        ))}
      </ul>
    </section>
  );

  return (
    <div className={`min-h-screen ${t.pageBg} ${t.pageText} ${t.font}`}>
      <div className="w-full mx-0 px-3 sm:px-4 md:px-6 py-5">
        <Nav />

        {/* TOP STRIP: brutal rules on the left, context on the right */}
        <div className={`mt-6 grid grid-cols-12 gap-0 border ${bx}`}>
          <div
            className={`col-span-12 md:col-span-4 border-r ${bx} p-3 sm:p-4`}
          >
            <div className="text-[11px] tracking-[0.22em] uppercase mb-2">
              Platform
            </div>
            <RuleLink>Intake</RuleLink>
            <RuleLink>Documents</RuleLink>
            <RuleLink>Answers</RuleLink>
            <RuleLink>Privacy</RuleLink>
          </div>

          <div className="col-span-12 md:col-span-8 p-3 sm:p-4">
            <div className="grid grid-cols-12 gap-0">
              <div className={`col-span-12 border-b ${bx} p-3`}>
                <div
                  className={`${mute} text-[11px] tracking-[0.22em] uppercase`}
                >
                  Context
                </div>
                <p className="text-sm mt-2 max-w-prose">
                  The quiet workspace for requests, paperwork, and answers —
                  fast, clear, and credible.
                </p>
              </div>
              <div className="col-span-12 p-3">
                <div
                  className={`${mute} text-[11px] tracking-[0.22em] uppercase`}
                >
                  Today
                </div>
                <p className="text-sm mt-2">
                  Pick up where you left off. Everything leaves a simple trail.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* HUGE HEADLINE */}
        <h1
          className="mt-6 leading-[0.9] font-semibold"
          style={{
            fontSize: "clamp(2.5rem, 8.5vw, 6.5rem)",
            letterSpacing: "-0.02em",
          }}
        >
          INTAKE • DOCS • ANSWERS
        </h1>

        {/* CTA BLOCK — thick, stark */}
        <div className={`mt-4 border ${bx} p-2`}>
          <div className="bg-black text-white dark:bg-white dark:text-black p-6 sm:p-8 text-center">
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-current">
              Request Access <span>↗</span>
            </button>
            <div className="mt-2 text-xs opacity-70">
              No demos. Try it, decide.
            </div>
          </div>
        </div>

        {/* THREE FEATURES */}
        <div className={`mt-6 grid grid-cols-12 gap-0 border ${bx}`}>
          <div className={`col-span-12 md:col-span-4 border-r ${bx}`}>
            <Feature
              title="Intake"
              points={[
                "Inbox, form, or file — we tag and route.",
                "Rules by team or topic.",
                "Everything tracked.",
              ]}
            />
          </div>
          <div className={`col-span-12 md:col-span-4 border-r ${bx}`}>
            <Feature
              title="Documents"
              points={[
                "Templates with fields.",
                "Sign, stamp, export.",
                "Redact when needed.",
              ]}
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <Feature
              title="Answers"
              points={[
                "Ask in plain language.",
                "See the sources.",
                "Only what you’re allowed to see.",
              ]}
            />
          </div>
        </div>

        {/* INTEGRATION / GUARANTEES STRIP */}
        <div className={`mt-6 grid grid-cols-12 gap-0 border ${bx}`}>
          <div
            className={`col-span-12 md:col-span-8 border-r ${bx} p-4 sm:p-5`}
          >
            <div className="text-[11px] tracking-[0.22em] uppercase mb-3">
              Works With
            </div>
            <div className="flex flex-wrap gap-2">
              <Chip>Gmail</Chip>
              <Chip>Drive</Chip>
              <Chip>Calendar</Chip>
              <Chip>Slack</Chip>
              <Chip>Notion</Chip>
              <Chip>Box</Chip>
              <Chip>Dropbox</Chip>
              <Chip>OneDrive</Chip>
              <Chip>Webhooks</Chip>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 p-4 sm:p-5">
            <div className="text-[11px] tracking-[0.22em] uppercase mb-3">
              Guarantees
            </div>
            <ul className="text-sm space-y-1">
              <li>• Your data stays yours.</li>
              <li>• Encryption on / off the disk.</li>
              <li>• Clear roles, simple logs.</li>
            </ul>
          </div>
        </div>

        {/* MINI SPEC GRID */}
        <div className={`mt-6 grid grid-cols-12 gap-0 border ${bx}`}>
          <Spec title="Setup" text="Minutes, not months." r />
          <Spec title="Models" text="Ours or yours, per task." r />
          <Spec title="Export" text="PDF / DOCX / JSON." />
        </div>

        {/* FOOTNOTE */}
        <div className={`mt-6 border-t ${bx} pt-3 text-[11px] ${mute}`}>
          © Archv AI — design iteration 2
        </div>
      </div>
    </div>
  );
}

/* ——— locals ——— */

function Spec({ title, text, r = false }) {
  const { theme } = useTheme();
  const bx = theme === "dark" ? "border-white/20" : "border-black/20";
  return (
    <div className={`col-span-12 md:col-span-4 ${r ? `border-r ${bx}` : ""}`}>
      <div className="p-4 sm:p-5">
        <div className="text-[11px] tracking-[0.22em] uppercase opacity-70">
          {title}
        </div>
        <div className="text-lg sm:text-xl mt-1">{text}</div>
      </div>
    </div>
  );
}
