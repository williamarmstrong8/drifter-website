import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Lines from "@/components/motion/Lines";
import NewsletterForm from "@/components/shell/NewsletterForm";
import Wordmark from "@/components/shell/Wordmark";
import { navItems } from "@/lib/nav";
import { youtubeChannel } from "@/data/films";

export default function SiteFooter() {
  return (
    <footer className="surface-ink relative overflow-hidden pt-section" id="newsletter">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="label mb-6 text-ember">Letters from the road</p>
          <Lines
            as="h2"
            className="display text-step-4"
            lines={[
              "One email",
              "when we've",
              <span className="accent-serif" key="a">
                been somewhere.
              </span>,
            ]}
          />
        </div>
        <div className="self-end md:col-span-5">
          <p className="mb-8 max-w-sm text-stone" data-reveal="fade">
            Field notes, new films and the places worth the detour. No schedule, no spam.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="container-x mt-section grid grid-cols-2 gap-10 border-t border-line pt-10 md:grid-cols-4">
        <nav aria-label="Footer">
          <p className="label mb-4 text-stone">Explore</p>
          <ul className="space-y-2">
            {navItems.slice(1).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-wipe">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="label mb-4 text-stone">Elsewhere</p>
          <a href={youtubeChannel} target="_blank" rel="noreferrer" className="link-wipe inline-flex items-center gap-1">
            YouTube <ArrowUpRight className="h-4 w-4" aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
        <div className="col-span-2 md:text-right">
          <p className="label text-stone">© {new Date().getFullYear()} Destination Drifters</p>
          <p className="mt-2 font-serif italic text-stone">Made for wanderers, by wanderers.</p>
        </div>
      </div>

      <div className="container-x pb-6 pt-16 text-paper/90">
        <Wordmark text="DRIFTERS" />
      </div>
    </footer>
  );
}
