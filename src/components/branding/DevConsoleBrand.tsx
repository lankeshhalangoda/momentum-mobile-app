"use client";

import { useEffect, useRef } from "react";

const THRESHOLD = 120;

/**
 * Portfolio credit in the console + optional playful hint when DevTools likely open.
 * Does not block inspection — branding only.
 */
export function DevConsoleBrand() {
  const warned = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const styles = {
      banner: "font-size:11px;font-family:ui-monospace,monospace;color:#64748b;line-height:1.6;",
      title: "font-size:13px;font-weight:700;font-family:ui-sans-serif,system-ui;color:#0d9488;letter-spacing:0.02em;",
      name: "font-size:12px;font-weight:600;color:#0f172a;",
      dark: "font-size:11px;color:#94a3b8;",
    };

    console.log(
      "%c\n%cMomentum%c\n%cDesigned & Developed by Lankesh Halangoda\n%cPrototype · Next.js · React · Tailwind",
      styles.banner,
      styles.title,
      styles.banner,
      styles.name,
      styles.dark,
    );

    const check = () => {
      const w = window.outerWidth - window.innerWidth;
      const h = window.outerHeight - window.innerHeight;
      if ((w > THRESHOLD || h > THRESHOLD) && !warned.current) {
        warned.current = true;
        console.log(
          "%c👋%c Hey builder — thanks for peeking under the hood. This UI was crafted with care; enjoy the source tour.",
          "font-size:12px;",
          "font-size:11px;color:#64748b;font-family:ui-monospace,monospace;",
        );
      }
    };

    const id = window.setInterval(check, 800);
    return () => window.clearInterval(id);
  }, []);

  return null;
}
