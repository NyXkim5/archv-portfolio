import React from "react";
import LegalModalText from "./LegalModalText.jsx";

export default function LegalTrigger() {
  const [open, setOpen] = React.useState(false);
  const btnRef = React.useRef(null);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen(true)}
        className="px-3 py-1.5 rounded-lg border border-current/60 hover:bg-black/5 transition text-[13px]"
        aria-haspopup="dialog"
        aria-expanded={open ? "true" : "false"}
        aria-controls="legal-modal"
      >
        Legal
      </button>

      <LegalModalText
        open={open}
        onClose={() => setOpen(false)}
        initialFocusRef={btnRef}
      />
    </>
  );
}
