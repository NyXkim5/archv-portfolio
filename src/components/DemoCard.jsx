import React from "react";
import { useTheme, useTokens } from "./ThemeProvider.jsx";

/**
 * DemoCard (ShowReel)
 *
 * Props:
 *  - launcher: boolean → if true, renders a small "Social post" button.
 *                      Clicking toggles a bottom-right popup (no overlay).
 *  - size: "sm" | "md" | "lg" → controls popup width (default "sm")
 *
 * LinkedIn embed (choose ONE; JSON overrides direct if both present):
 *  - .env → VITE_LINKEDIN_EMBED_URL="https://www.linkedin.com/embed/feed/update/urn:li:share:..."
 *  - .env → VITE_LINKEDIN_EMBED_JSON_URL="/linkedin-embed.json" where JSON is { "embedUrl": "https://..." }
 *
 * NOTE: LinkedIn **feed** pages are NOT embeddable; use a single PUBLIC post.
 */
export default function DemoCard({ launcher = false, size = "sm" }) {
  const { theme } = useTheme();
  const t = useTokens(theme);

  const directEmbed = import.meta.env.VITE_LINKEDIN_EMBED_URL;
  const jsonUrl = import.meta.env.VITE_LINKEDIN_EMBED_JSON_URL;

  const [jsonEmbed, setJsonEmbed] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!jsonUrl) return;
    let cancelled = false;
    fetch(jsonUrl, { mode: "cors", cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled)
          setJsonEmbed(
            typeof data?.embedUrl === "string" ? data.embedUrl : null
          );
      })
      .catch((e) => !cancelled && setError(e.message || "Failed to load JSON"));
    return () => {
      cancelled = true;
    };
  }, [jsonUrl]);

  const finalEmbed = jsonEmbed || directEmbed || "";

  // Popup width presets (bottom-right)
  const widthClass =
    size === "lg"
      ? "w-[360px] sm:w-[480px] md:w-[560px] max-w-[90vw]"
      : size === "md"
      ? "w-[280px] sm:w-[360px] md:w-[420px] max-w-[90vw]"
      : "w-[220px] sm:w-[260px] md:w-[300px] max-w-[90vw]";

  // Close on ESC (optional)
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (launcher) {
    return (
      <>
        {/* Launcher button (stays bottom-right in your Home.jsx wrapper) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-white/10 px-3 py-1.5 text-xs tracking-wide hover:bg-white/10 transition flex items-center gap-2"
          title="View social post"
        >
          <span className={`h-2 w-2 rounded-[2px] ${t.accentText}`} />
          Social post
        </button>

        {/* Bottom-right popup (no backdrop, no center modal) */}
        <div
          className={
            `fixed z-50 right-4 sm:right-6 ` +
            // place the popup just above the launcher button
            `bottom-[76px] sm:bottom-[92px] ` +
            // animation
            `transition duration-200 ease-out transform ` +
            (open
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-2 scale-95 pointer-events-none")
          }
          style={{ pointerEvents: open ? "auto" : "none" }}
        >
          <div className={`${widthClass} ${t.font}`}>
            <div className={`rounded-xl border ${t.card} p-2 shadow-xl`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className={`h-2 w-2 rounded-[2px] ${t.accentText}`} />
                  <span className="tracking-wider">ShowReel</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-xs opacity-80 hover:opacity-100 px-2 py-1 rounded-md border border-white/10"
                >
                  Close
                </button>
              </div>

              {finalEmbed ? (
                <div className="aspect-video w-full rounded-md overflow-hidden border border-white/10 bg-black/30">
                  <iframe
                    src={finalEmbed}
                    title="LinkedIn Post"
                    width="100%"
                    height="100%"
                    className="h-full w-full"
                    style={{ border: 0 }}
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="aspect-video w-full rounded-md border border-white/10 overflow-hidden grid place-items-center bg-black/30 p-3 text-center">
                  <div className="text-[11px] opacity-70">
                    Add a LinkedIn post embed in{" "}
                    <code className="opacity-80">.env</code>:
                    <div className="mt-1">
                      <code className="opacity-80">
                        VITE_LINKEDIN_EMBED_URL
                      </code>
                    </div>
                    <div>
                      or{" "}
                      <code className="opacity-80">
                        VITE_LINKEDIN_EMBED_JSON_URL
                      </code>
                    </div>
                    {error && (
                      <div className="mt-2 text-[10px] opacity-60">
                        JSON error: {error}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  // Non-launcher inline version (kept for reuse elsewhere)
  return (
    <div className={widthClass}>
      <div className={`flex items-center gap-2 text-xs mb-2 ${t.font}`}>
        <span className={`h-2 w-2 rounded-[2px] ${t.accentText}`} />
        <span className="tracking-wider">ShowReel</span>
      </div>
      <div className={`relative rounded-xl border ${t.card} p-2 shadow-lg`}>
        <div
          className={`absolute -inset-1 rounded-[14px] border ${t.accentBorder} pointer-events-none`}
        />
        {finalEmbed ? (
          <div className="aspect-video w-full rounded-md overflow-hidden border border-white/10 bg-black/30">
            <iframe
              src={finalEmbed}
              title="LinkedIn Post"
              width="100%"
              height="100%"
              className="h-full w-full"
              style={{ border: 0 }}
              allowFullScreen
            />
          </div>
        ) : (
          <div className="aspect-video w-full rounded-md border border-white/10 overflow-hidden grid place-items-center bg-black/30 p-3 text-center">
            <div className="text-[11px] opacity-70">
              Add a LinkedIn post embed in{" "}
              <code className="opacity-80">.env</code>:
              <div className="mt-1">
                <code className="opacity-80">VITE_LINKEDIN_EMBED_URL</code>
              </div>
              <div>
                or{" "}
                <code className="opacity-80">VITE_LINKEDIN_EMBED_JSON_URL</code>
              </div>
              {error && (
                <div className="mt-2 text-[10px] opacity-60">
                  JSON error: {error}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
