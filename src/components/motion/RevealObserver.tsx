"use client";

import { useEffect } from "react";

/**
 * Marks [data-reveal] elements with data-inview once they scroll into view. The animation
 * itself is CSS (globals.css, "Motion system"), so server components can opt in with an
 * attribute and no client boundary. Mounted once in the root layout.
 */
export default function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-inview", "");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );

    const scan = (root: ParentNode) => {
      root.querySelectorAll("[data-reveal]:not([data-inview])").forEach((el) => io.observe(el));
    };
    scan(document);

    // Route changes and client-rendered sections add new candidates.
    const mo = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches("[data-reveal]:not([data-inview])")) io.observe(node);
          scan(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
