import React from "react";
import { X } from "lucide-react";
import { useTheme, useTokens } from "./ThemeProvider.jsx";
import { TOS_TEXT } from "../legal/tos.js";
import { PRIVACY_TEXT } from "../legal/privacy.js";

export default function LegalModalText({ open, onClose, initialFocusRef }) {
  const { theme } = useTheme();
  const t = useTokens(theme);
  const dialogRef = React.useRef(null);
  const firstTabRef = React.useRef(null);
  const [tab, setTab] = React.useState("tos"); // "tos" | "privacy"

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "Tab") trapTabKey(e, dialogRef.current);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  React.useEffect(() => {
    if (open) {
      const id = setTimeout(() => firstTabRef.current?.focus(), 0);
      return () => clearTimeout(id);
    } else {
      initialFocusRef?.current?.focus?.();
    }
  }, [open, initialFocusRef]);

  if (!open) return null;

  const activeText = tab === "tos" ? TOS_TEXT : PRIVACY_TEXT;

  return (
    <div
      id="legal-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-title"
      className="fixed inset-0 z-[100]"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className={[
          "absolute inset-x-0 top-[6vh] mx-auto",
          "w-[92vw] sm:w-[86vw] lg:w-[70vw] xl:w-[60vw]",
          "rounded-2xl shadow-2xl",
          t.pageBg,
          t.pageText,
          t.font,
          "border border-current/15",
          "flex flex-col max-h-[88vh]",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-current/10">
          <h2 id="legal-title" className="text-base sm:text-lg font-medium">
            Legal
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-current/10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-4 sm:px-6 pt-3">
          <div
            role="tablist"
            aria-label="Legal tabs"
            className="inline-flex rounded-xl border border-current/15 overflow-hidden"
          >
            <button
              ref={firstTabRef}
              role="tab"
              aria-selected={tab === "tos"}
              onClick={() => setTab("tos")}
              className={[
                "px-3 py-1.5 text-sm",
                tab === "tos" ? "bg-current/10" : "hover:bg-current/10",
              ].join(" ")}
            >
              Terms of Service
            </button>
            <button
              role="tab"
              aria-selected={tab === "privacy"}
              onClick={() => setTab("privacy")}
              className={[
                "px-3 py-1.5 text-sm",
                tab === "privacy" ? "bg-current/10" : "hover:bg-current/10",
              ].join(" ")}
            >
              Privacy Policy
            </button>
          </div>
        </div>

        {/* Text content */}
        <div className="px-4 sm:px-6 pb-4 pt-3 overflow-auto">
          <article className="prose max-w-none prose-invert prose-sm sm:prose-base">
            <pre className="whitespace-pre-wrap leading-relaxed tracking-wide font-sans text-[13px] sm:text-[14px]">
              {activeText}
            </pre>
          </article>
        </div>
      </div>
    </div>
  );
}

/* ----------------- Focus Trap ----------------- */
function trapTabKey(e, container) {
  if (!container) return;
  const focusable = container.querySelectorAll(
    [
      "a[href]",
      "area[href]",
      'input:not([disabled]):not([type="hidden"])',
      "select:not([disabled])",
      "textarea:not([disabled])",
      "button:not([disabled])",
      "iframe",
      "object",
      "embed",
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(",")
  );
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}
