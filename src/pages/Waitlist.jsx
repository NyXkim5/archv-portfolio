// src/pages/Monolith.jsx
import React from "react";
import Nav from "../components/Nav.jsx";
import SideProductum, {
  SideProductumStyles,
} from "../components/SideProductum.jsx";

export default function Monolith() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <main className="flex-1 flex flex-col items-center justify-start py-12 px-6 sm:px-10 md:px-14 lg:px-20 bg-white text-black">
        <div className="max-w-3xl w-full">
          {/* HEADER */}
          <header className="mb-10">
            <div className="flex items-center gap-3">
              <h1 className="text-[28px] sm:text-[34px] md:text-[42px] leading-tight font-semibold tracking-tight">
                Monolith
              </h1>
              <span
                className="text-[11px] uppercase tracking-[0.18em] px-2 py-1 border rounded
                               border-[var(--archv-orange)] text-[var(--archv-orange)]"
              >
                Coming soon
              </span>
            </div>
            <p className="mt-2 text-[14px] sm:text-[15px] opacity-80 tracking-wide">
              Unified workspace engine. Orchestration and knowledge fabric.
            </p>
          </header>

          {/* TEASER / SPEC SHEET VIBES */}
          <section className="relative mb-10">
            <div className="grid grid-cols-3 gap-6 text-[12.5px]">
              <div>
                <div className="uppercase text-[11px] tracking-[0.22em] opacity-60">
                  Codename
                </div>
                <div className="mt-1 font-medium">M-0</div>
              </div>
              <div>
                <div className="uppercase text-[11px] tracking-[0.22em] opacity-60">
                  Release Window
                </div>
                <div className="mt-1">Redacted</div>
              </div>
              <div>
                <div className="uppercase text-[11px] tracking-[0.22em] opacity-60">
                  Status
                </div>
                <div className="mt-1 inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--archv-orange)] animate-pulse" />
                  Under wraps
                </div>
              </div>
            </div>

            {/* dotted card accent (theme-consistent) */}
            <div
              className="pointer-events-none absolute -right-4 -bottom-4 w-28 h-28 opacity-10"
              style={{
                background:
                  "radial-gradient(#000 1px, transparent 1px) 0 0/6px 6px",
                borderRadius: "8px",
              }}
            />
          </section>

          {/* MYSTERY CONTENT */}
          <div className="space-y-8 text-[15px] leading-relaxed">
            <section>
              <h2 className="uppercase text-[12px] tracking-[0.22em] mb-2 text-[var(--archv-orange)]">
                What it is
              </h2>
              <p>
                Monolith stitches people, tools, and knowledge into one quiet
                surface. Tasks, context, and automation live together. No tabs.
                No ceremony. Everything exactly where you need it, exactly when
                you need it.
              </p>
            </section>

            <section>
              <h2 className="uppercase text-[12px] tracking-[0.22em] mb-2 text-[var(--archv-orange)]">
                What it is not
              </h2>
              <p>
                Not another chat box. Not a dashboard maze. Not a “workspace”
                that needs a workspace. It is a conductor, not another
                instrument.
              </p>
            </section>

            <section>
              <h2 className="uppercase text-[12px] tracking-[0.22em] mb-2 text-[var(--archv-orange)]">
                Hints
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Graph-native memory with revision traces.</li>
                <li>Orchestrations that feel like one click.</li>
                <li>Contexts that follow you, not the other way around.</li>
                <li>Isolation and privacy first, always.</li>
              </ul>
            </section>

            <section>
              <h2 className="uppercase text-[12px] tracking-[0.22em] mb-2 text-[var(--archv-orange)]">
                Access
              </h2>
              <p>
                Closed build. Limited partners only. When it’s ready, you’ll
                know.
              </p>
            </section>
          </div>

          {/* FOOTER LINE */}
          <footer className="mt-14 border-t border-black/10 pt-6">
            <p className="text-[13px] opacity-80">
              Monolith is the quiet layer under your work. It removes friction,
              guards your data, and makes scattered systems behave like one.
            </p>
          </footer>
        </div>
      </main>

      <SideProductum />
      <SideProductumStyles />
    </div>
  );
}
