// src/pages/Ink.jsx
import React from "react";
import Nav from "../components/Nav.jsx";
import SideProductum, {
  SideProductumStyles,
} from "../components/SideProductum.jsx";

export default function Ink() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <main className="flex-1 flex flex-col items-center justify-start py-12 px-6 sm:px-10 md:px-14 lg:px-20 bg-white text-black">
        <div className="max-w-3xl w-full">
          {/* HEADER */}
          <header className="mb-12">
            <h1 className="text-[28px] sm:text-[34px] md:text-[42px] leading-tight font-semibold tracking-tight">
              <span className="text-[var(--archv-orange)]">Ink</span>
            </h1>
            <p className="mt-2 text-[14px] sm:text-[15px] opacity-80 tracking-wide">
              Your private LLM — retrieval-first, security-focused, and built to
              work the way your team actually works.
            </p>
          </header>

          {/* CORE CONTENT */}
          <div className="space-y-10 text-[15px] leading-relaxed">
            <section>
              <h2 className="uppercase text-[12px] tracking-[0.22em] mb-2 text-[var(--archv-orange)]">
                Private by Default
              </h2>
              <p>
                Ink is a secure language model environment designed for teams
                who treat privacy as non-negotiable. Your data is never pooled
                or shared, and every workload runs in its own isolated
                environment. Nothing leaves your control.
              </p>
            </section>

            <section>
              <h2 className="uppercase text-[12px] tracking-[0.22em] mb-2 text-[var(--archv-orange)]">
                Retrieval-First
              </h2>
              <p>
                At the core of Ink is retrieval. Instead of relying on generic
                training data, Ink pulls context from your own documents,
                knowledge bases, and workflows — giving you responses that are
                relevant, grounded, and verifiable.
              </p>
            </section>

            <section>
              <h2 className="uppercase text-[12px] tracking-[0.22em] mb-2 text-[var(--archv-orange)]">
                Security-First Design
              </h2>
              <p>
                Every action inside Ink is encrypted, logged, and bound by
                strict access controls. Full audit trails are available for
                compliance, and deployment boundaries ensure your prompts and
                outputs never bleed into other tenants or external models.
              </p>
            </section>

            <section>
              <h2 className="uppercase text-[12px] tracking-[0.22em] mb-2 text-[var(--archv-orange)]">
                Team-Oriented
              </h2>
              <p>
                Ink is built for collaboration. Assign roles, set access scopes,
                and integrate seamlessly with your workflows. From case
                management to research, Ink adapts to the way your team operates
                — not the other way around.
              </p>
            </section>
          </div>

          {/* FOOTER NOTE */}
          <footer className="mt-14 border-t border-black/10 pt-6">
            <p className="text-[13px] opacity-80">
              Ink makes large language models practical, private, and secure for
              teams that can’t afford compromises on{" "}
              <span className="text-[var(--archv-orange)]">data privacy</span>{" "}
              or <span className="text-[var(--archv-orange)]">trust</span>.
            </p>
          </footer>

          {/* LOGIN CTA — Orange gradient halo button */}
          <div className="ink-login mt-10 mb-2 flex flex-col items-center">
            <a
              href="https://chat.archvai.com/chat-services"
              className="archv-bubble-btn"
              aria-label="Login to Ink"
            >
              <span className="label">Login</span>
              <span className="hoverEffect" aria-hidden="true">
                <span className="blob" />
              </span>
            </a>
            <div className="mt-3 text-xs opacity-70">
              Requires Archv account.
            </div>
          </div>
        </div>
      </main>

      <SideProductum />
      <SideProductumStyles />
      <InkBubbleButtonStyles />
    </div>
  );
}

/* Scoped styles for the orange rotating-glow hover button */
function InkBubbleButtonStyles() {
  return (
    <style>{`
/* Base button style (scoped) */
.ink-login .archv-bubble-btn {
  --archv-orange: var(--archv-orange, #FF6A00);
  --archv-orange-2: #FF9A3D;
  --archv-orange-3: #FFD27A;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 15px 30px;
  position: relative;
  overflow: hidden;
  border-radius: 10rem;
  border: 0;
  text-decoration: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  color: rgb(37, 37, 37);
  background: #fff;
  box-shadow: 0 0px 7px -5px rgba(0, 0, 0, 0.5);
  transition: background-color .2s ease, color .2s ease, transform .02s ease;
  z-index: 0;
}

/* Label text */
.ink-login .archv-bubble-btn .label {
  position: relative;
  z-index: 2;
  text-transform: uppercase;
  letter-spacing: .08em;
}

/* Big blurred rotating gradient circle */
.ink-login .archv-bubble-btn .hoverEffect {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1; /* below text, above background */
  pointer-events: none;
}
.ink-login .archv-bubble-btn .hoverEffect .blob {
  width: 10rem;
  height: 10rem;
  border-radius: 40rem;
  filter: blur(20px);
  opacity: .55;
  transition: width .4s ease, height .4s ease;
  background: linear-gradient(
    90deg,
    var(--archv-orange) 0%,
    var(--archv-orange-2) 50%,
    var(--archv-orange-3) 100%
  );
  animation: archv-blob-rotate 3s linear infinite;
}

/* Hover/active interactions */
.ink-login .archv-bubble-btn:hover {
  background: #FFF2E6; /* pale orange */
  color: #210A00;
}
.ink-login .archv-bubble-btn:active {
  transform: scale(0.97);
}
.ink-login .archv-bubble-btn:hover .hoverEffect .blob {
  width: 8rem;
  height: 8rem;
}

/* Focus ring for accessibility */
.ink-login .archv-bubble-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255,106,0,.28);
}

/* Motion preference */
@media (prefers-reduced-motion: reduce) {
  .ink-login .archv-bubble-btn .hoverEffect .blob {
    animation: none;
    transition: none;
  }
}

/* Keyframes for rotation (from your snippet) */
@keyframes archv-blob-rotate {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
    `}</style>
  );
}
