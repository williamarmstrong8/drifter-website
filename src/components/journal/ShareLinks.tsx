"use client";

import { useState } from "react";

/** Plain share links (no third-party scripts) plus copy-to-clipboard. */
export default function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    { label: "X", href: `https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { label: "Email", href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}` },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <span className="label muted">Share</span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.label === "Email" ? undefined : "_blank"}
          rel="noreferrer"
          className="label link-wipe"
        >
          {link.label}
          {link.label !== "Email" && <span className="sr-only"> (opens in a new tab)</span>}
        </a>
      ))}
      <button type="button" onClick={copy} className="label link-wipe">
        {copied ? "Link copied" : "Copy link"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
