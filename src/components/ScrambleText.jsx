import React from "react";

/**
 * ScrambleText
 * - Scrambles characters and resolves to the target string.
 * - Re-runs when component key changes.
 *
 * Props:
 *  - text: string
 *  - duration: ms (default 900)
 *  - scrambleSet: "symbols" | "alnum" (default "symbols")
 *  - className: string
 */

const SETS = {
  symbols: "!<>-_\\/[]{}—=+*^?#________",
  alnum: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
};

export default function ScrambleText({
  text,
  duration = 900,
  scrambleSet = "symbols",
  className = "",
}) {
  const [display, setDisplay] = React.useState(text);
  const state = React.useRef({ frame: 0, raf: 0, queue: [] });

  React.useEffect(() => {
    const chars = SETS[scrambleSet] || SETS.symbols;
    const from = (display || "").split("");
    const to = (text || "").split("");

    const queue = [];
    const len = Math.max(from.length, to.length);
    for (let i = 0; i < len; i++) {
      const fromChar = from[i] || "";
      const toChar = to[i] || "";
      const start = Math.floor(Math.random() * 8);
      const end = start + Math.floor(8 + Math.random() * 10);
      queue.push({ from: fromChar, to: toChar, start, end });
    }
    state.current.queue = queue;
    state.current.frame = 0;

    const update = () => {
      let out = "";
      let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i];
        if (state.current.frame >= end) {
          complete++;
          out += to;
        } else if (state.current.frame >= start) {
          const rnd = chars[Math.floor(Math.random() * chars.length)];
          out += rnd;
        } else {
          out += from;
        }
      }
      setDisplay(out);
      state.current.frame++;
      if (complete === queue.length) cancelAnimationFrame(state.current.raf);
      else state.current.raf = requestAnimationFrame(update);
    };

    state.current.raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(state.current.raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, duration, scrambleSet]);

  return <span className={className}>{display}</span>;
}
