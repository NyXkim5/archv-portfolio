import React from "react";
import { Linkedin, Mail } from "lucide-react";
import { useTheme, useTokens } from "./ThemeProvider.jsx";

export default function FounderStrip() {
  const { theme } = useTheme();
  const t = useTokens(theme);
  const border = "border-current/10";

  return (
    <section className={`w-full mt-6 border-t ${border} px-4 sm:px-6 md:px-8`}>
      <div className="max-w-5xl mx-0 py-5 grid grid-cols-12 gap-4 items-start">
        {/* Left: label */}
        <div className="col-span-12 sm:col-span-3">
          <h3 className="text-xs uppercase tracking-widest opacity-70">
            Founders
          </h3>
        </div>

        {/* Right: founder card(s) */}
        <div className="col-span-12 sm:col-span-9">
          <div
            className={`flex items-start gap-4 p-3 rounded-xl border ${border}`}
          >
            {/* Avatar placeholder – swap src if you have a headshot */}
            <div
              className={`h-12 w-12 rounded-full ${t.pageBg} border ${border} grid place-items-center text-sm opacity-90 select-none`}
            >
              JK
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium">Joonhyuk “Jay” Kim</p>
                <span className="text-xs opacity-70">Founder & CEO</span>
              </div>
              <p className="text-[13px] opacity-80 mt-1 max-w-prose">
                I lead product, design, and engineering at Archv. I care about
                clear, secure tools that teams can trust every day.
              </p>

              <div className="flex items-center gap-4 mt-2 opacity-80">
                <a
                  href="https://www.linkedin.com/in/joonyhuk"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hover:opacity-100 transition"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:joonhyuk.kim.101@gmail.com"
                  aria-label="Email"
                  className="hover:opacity-100 transition"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* If you add more teammates later, duplicate the card above */}
        </div>
      </div>
    </section>
  );
}
