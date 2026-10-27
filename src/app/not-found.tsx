import type { Metadata } from "next";
import Link from "next/link";
import Wordmark from "@/components/shell/Wordmark";

export const metadata: Metadata = {
  title: "Off the map",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[100svh] flex-col justify-between pb-10 pt-[calc(var(--nav-h)+4rem)]">
      <div className="flex justify-between">
        <p className="label text-ember">Error 404</p>
        <p className="label text-right text-stone">0.0000° N, 0.0000° E</p>
      </div>

      <div>
        <h1 className="sr-only">Page not found</h1>
        <p className="font-serif text-step-4 italic">You&apos;ve drifted</p>
        <Wordmark text="OFF THE MAP" cut="condensed" className="mt-2" />
      </div>

      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <p className="max-w-md font-serif text-step-1 text-stone">
          This page doesn&apos;t exist, or it wandered somewhere we haven&apos;t written about yet.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/" className="btn btn-solid">
            Back to home
          </Link>
          <Link href="/journal" className="btn btn-ghost">
            <span>Read the journal</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
