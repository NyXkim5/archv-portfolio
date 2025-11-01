// src/components/SideProductum.jsx
import React from "react";
import { ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function SideProductum() {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  // rotating words
  const words = React.useMemo(
    () => [
      "productum",
      "προϊόν",
      "제품",
      "製品",
      "Products",
      "sản phẩm",
      "produto",
      "produkto",
      "产品",
    ],
    []
  );
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % words.length), 1700);
    return () => clearInterval(id);
  }, [words.length]);

  // lock body scroll only when open
  React.useEffect(() => {
    const el = document.documentElement;
    if (open) el.style.overflow = "hidden";
    else el.style.overflow = "";
    return () => {
      el.style.overflow = "";
    };
  }, [open]);

  // ✅ close drawer whenever the route changes
  React.useEffect(() => {
    setOpen(false);
    document.documentElement.style.overflow = "";
  }, [location.pathname]);

  return (
    <>
      {/* vertical button (hidden while open) */}
      {!open && (
        <div className="archv-orna fixed right-6 sm:right-7 lg:right-8 top-1/2 -translate-y-1/2 z-50">
          <button
            onClick={() => setOpen(true)}
            className={[
              "productum-vertical px-2 py-3 rounded-full border",
              "border-[rgba(0,0,0,.15)] bg-white/70 hover:bg-white/85 hover:border-[rgba(0,0,0,.3)]",
              "backdrop-blur-sm transition flex items-center justify-center",
            ].join(" ")}
            aria-haspopup="dialog"
            aria-expanded={open}
          >
            <span className="productum-text">{words[idx]}</span>
          </button>

          {/* orange ornaments */}
          <span className="orna-dot-top" />
          <span className="orna-arc-left" />
          <span className="orna-line-left" />
          <span className="orna-line-left-2" />
          <span className="orna-cap-left">αrchv</span>
          <span className="orna-cap-left-2">ux-unit</span>
        </div>
      )}

      {/* ✅ render overlay + aside ONLY when open */}
      {open && (
        <div
          className="fixed inset-0 z-40 pointer-events-auto"
          aria-hidden={!open}
        >
          <div className="absolute inset-0 opacity-100 bg-white/35 backdrop-blur-2xl" />
          <aside
            className="absolute right-0 top-0 h-full w-[92%] sm:w-[520px] md:w-[560px] z-50
                       bg-white/60 backdrop-blur-2xl border-l border-black/10
                       shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_12px_60px_rgba(0,0,0,0.18)]
                       transition-transform duration-300 translate-x-0"
            role="dialog"
            aria-label="Products"
          >
            <div className="px-4 py-3 border-b border-black/10 bg-white/55 backdrop-blur-xl">
              <div className="text-[11px] uppercase tracking-[0.22em] opacity-60">
                Products sheet
              </div>
            </div>

            <div className="spec-wrap">
              <div className="spec-row spec-meta">
                <div>
                  <div className="font-semibold">POINT.</div>
                  <div className="spec-sub">format: A4 / grid 8pt</div>
                </div>
                <div className="flex-1" />
                <div className="spec-barcode" aria-hidden="true">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <i key={i} style={{ height: `${6 + ((i * 7) % 16)}px` }} />
                  ))}
                </div>
              </div>

              <hr className="spec-rule" />

              {/* INK */}
              <section className="spec-section">
                <header className="spec-head">
                  <span className="spec-num">01.</span>
                  <span className="spec-title">INK</span>
                  <span className="spec-date">Release: rolling</span>
                </header>
                <div className="spec-grid">
                  <div className="spec-cell">
                    <div className="spec-label">DESCRIPTION</div>
                    <p className="spec-body">
                      Private LLM for your teams — retrieval-first, secure, and
                      simple to run.
                    </p>
                  </div>
                  <div className="spec-cell">
                    <div className="spec-label">HYPERLINK</div>
                    <a href="/ink" className="spec-link">
                      /ink <ChevronRight className="inline h-3 w-3" />
                    </a>
                  </div>
                  <div className="spec-cell">
                    <div className="spec-label">STATUS</div>
                    <div className="spec-tag spec-tag--active">ACTIVE</div>
                  </div>
                </div>
              </section>

              <hr className="spec-rule" />

              {/* MONOLITH */}
              <section className="spec-section">
                <header className="spec-head">
                  <span className="spec-num">02.</span>
                  <span className="spec-title">MONOLITH</span>
                  <span className="spec-date">ETA: TBA</span>
                </header>
                <div className="spec-grid">
                  <div className="spec-cell">
                    <div className="spec-label">DESCRIPTION</div>
                    <p className="spec-body">
                      Unified workspace engine — orchestration & knowledge
                      fabric.
                    </p>
                  </div>
                  <div className="spec-cell">
                    <div className="spec-label">HYPERLINK</div>
                    <a href="/waitlist" className="spec-link">
                      /waitlist <ChevronRight className="inline h-3 w-3" />
                    </a>
                  </div>
                  <div className="spec-cell">
                    <div className="spec-label">STATUS</div>
                    <div className="spec-tag spec-tag--soon">COMING SOON</div>
                  </div>
                </div>
              </section>

              <div className="spec-gridDots" aria-hidden="true" />
            </div>

            <div className="mt-auto px-4 py-3 border-t border-black/10 bg-white/45 backdrop-blur-xl">
              <div className="w-full flex justify-center">
                <a
                  href="/"
                  className="home-pill"
                  onClick={() => setOpen(false)}
                >
                  home
                </a>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

/* ---------------- STYLES ---------------- */
export function SideProductumStyles() {
  return (
    <style>{`
      :root{ --archv-orange:#FF6A00; }

      .productum-vertical{width:38px;min-height:132px}
      .productum-text{
        writing-mode: vertical-rl; transform: rotate(180deg);
        text-transform: uppercase; letter-spacing:.18em; font-size:11px; font-weight:600;
        color:#0e0e0e; text-shadow:0 1px 0 rgba(255,255,255,.7),0 0 8px rgba(255,255,255,.35);
        user-select:none; pointer-events:none;
      }

      /* ✅ Force all text to black */
      .spec-wrap, 
      .spec-head, 
      .spec-sub, 
      .spec-label, 
      .spec-body, 
      .spec-link, 
      .spec-num, 
      .spec-title, 
      .spec-date {
        color: #000 !important;
      }

      /* ✅ Orange ACTIVE */
      .spec-tag--active {
        border: 1px solid var(--archv-orange);
        color: var(--archv-orange);
        font-weight: 600;
        box-shadow: 0 0 8px rgba(255,106,0,0.4);
      }
      .spec-tag--soon {
        border: 1px dashed #000;
        color: #000;
      }

      /* ✅ Orange barcode */
      .spec-barcode i { background: var(--archv-orange); opacity:.7; }

      /* ✅ HOME button */
      .home-pill{
        display:inline-block;padding:.55rem 1.1rem;border-radius:9999px;
        border:1px solid rgba(0,0,0,.25);background:rgba(255,255,255,.7);
        backdrop-filter:blur(12px);text-transform:uppercase;letter-spacing:.18em;
        font-size:11px;color:#0f0f0f;text-shadow:0 1px 0 rgba(255,255,255,.65);
        transition:all .25s ease;
      }
      .home-pill:hover{
        background:rgba(255,106,0,.08);
        border-color:var(--archv-orange);
        color:var(--archv-orange);
      }

      /* Existing ornament styles */
      .archv-orna{position:fixed; overflow:visible}
      .archv-orna .orna-dot-top{
        position:absolute; left:50%; top:-18px; transform:translateX(-50%);
        width:6px; height:6px; border-radius:999px; background:var(--archv-orange);
        box-shadow:0 0 10px rgba(255,106,0,.45); opacity:.0; transition:opacity .25s ease;
      }
      .archv-orna .orna-arc-left{
        position:absolute; left:-96px; bottom:-12px; width:100px; height:36px;
        border-left:2px solid var(--archv-orange); border-top:2px solid transparent; border-radius:22px 12px 2px 2px;
        opacity:.0; transition:opacity .25s ease;
      }
      .archv-orna .orna-line-left,
      .archv-orna .orna-line-left-2{
        position:absolute; height:2px; background:var(--archv-orange);
        top:50%; transform:translateY(-50%); opacity:.0; transition:opacity .25s ease;
      }
      .archv-orna .orna-line-left{ left:-44px; width:40px }
      .archv-orna .orna-line-left-2{ left:-58px; width:54px; top:calc(50% + 16px) }
      .archv-orna .orna-cap-left,
      .archv-orna .orna-cap-left-2{
        position:absolute; font-size:10px; color:var(--archv-orange); letter-spacing:.16em; white-space:nowrap;
        text-shadow:0 0 10px rgba(255,106,0,.25); opacity:.0; transition:opacity .25s ease;
      }
      .archv-orna .orna-cap-left{ left:-84px; top:-30px; transform:rotate(-48deg) }
      .archv-orna .orna-cap-left-2{ left:-86px; bottom:-28px; transform:rotate(-12deg) }
      .archv-orna:hover .orna-dot-top,
      .archv-orna:hover .orna-arc-left,
      .archv-orna:hover .orna-line-left,
      .archv-orna:hover .orna-line-left-2,
      .archv-orna:hover .orna-cap-left,
      .archv-orna:hover .orna-cap-left-2{ opacity:1 }

      .spec-wrap{padding:16px 14px;background:linear-gradient(180deg,rgba(255,255,255,.45),rgba(255,255,255,.6));backdrop-filter:blur(24px)}
      .spec-rule{border:none;border-top:1px solid rgba(0,0,0,.08);margin:10px 0}
      .spec-row{display:flex;align-items:flex-start;gap:12px}
      .spec-sub{font-size:11px;opacity:.65}
      .spec-barcode{display:flex;gap:2px;border-left:1px solid rgba(0,0,0,.12);padding-left:8px}
      .spec-barcode i{display:inline-block;width:2px}
      .spec-section{padding:4px 0 10px}
      .spec-head{display:flex;align-items:center;gap:10px;font-size:12px;letter-spacing:.12em;text-transform:uppercase}
      .spec-num{font-size:18px}
      .spec-title{font-weight:600;font-size:13px}
      .spec-date{margin-left:auto;opacity:.6}
      .spec-grid{display:grid;grid-template-columns:1.2fr .9fr .7fr;gap:10px;margin-top:8px}
      .spec-label{font-size:10px;letter-spacing:.18em;opacity:.55}
      .spec-body{font-size:12px;line-height:1.35;margin-top:2px;opacity:.9}
      .spec-link{font-size:12px;border-bottom:1px solid rgba(0,0,0,.5)}
      .spec-tag{display:inline-block;font-size:10px;padding:2px 6px;letter-spacing:.14em}
      .spec-gridDots{position:absolute;inset:auto 10px 8px auto;width:72px;height:72px;background:radial-gradient(#111 1px, transparent 1px) 0 0/6px 6px;opacity:.08;border-radius:8px}

      @media (max-width:480px){ .spec-grid{grid-template-columns:1fr;gap:8px} .spec-date{display:none} }
    `}</style>
  );
}
