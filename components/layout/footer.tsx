"use client";

import Link from "next/link";
import type { SiteSettings } from "@/types/cms";

type FooterProps = {
  settings: SiteSettings | null;
};

export function Footer({ settings }: FooterProps) {
  const aboutText =
    settings?.tagline ||
    "RCCG Peace Assembly is a place of worship, discipleship, and community where lives are transformed by the Word and the Spirit.";

  const quickLinks = [
    { label: "Online Church", href: "/watch" },
    { label: "Our Blog", href: "/blog" },
    { label: "Events", href: "/events" },
    { label: "Locations / Visit", href: "/visit" },
    { label: "Online Giving", href: "/give" }
  ];

  const nextSteps = [
    { label: "Watch Sermons", href: "/watch" },
    { label: "Request Prayer", href: "/visit" },
    { label: "Upcoming Programs", href: "/events" },
    { label: "Read Articles", href: "/blog" }
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Use", href: "#" },
    { label: "Cookie Policy", href: "#" }
  ];

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-8">
        <div className="mx-auto mb-12 max-w-xl space-y-4">
          <form className="flex w-full items-stretch">
            <input
              type="email"
              placeholder="Your Email"
              className="h-11 w-full border border-white/60 bg-transparent px-4 text-sm text-white placeholder:text-white/60 focus:outline-none"
            />
            <button
              type="submit"
              className="h-11 border border-l-0 border-white/60 bg-white px-5 text-xs font-semibold tracking-[0.08em] text-black"
            >
              SUBSCRIBE
            </button>
          </form>
          <p className="text-[11px] leading-relaxed text-white/70">
            By subscribing, you consent to receive recurring updates and program reminders.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-4">
          <section className="space-y-5 md:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white/90">About Us</h3>
            <p className="text-sm leading-relaxed text-white/75">{aboutText}</p>
          </section>

          <section className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white/90">Quicklinks</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={`quick-${link.label}`}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white/90">Next Steps</h3>
            <ul className="space-y-2">
              {nextSteps.map((link) => (
                <li key={`next-${link.label}`}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white/90">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={`legal-${link.label}`}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/15 pt-8 md:flex-row">
          <p className="text-base font-bold uppercase tracking-[0.08em]">RCCG Peace Assembly</p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              aria-label="Facebook"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/40 text-[10px] font-semibold text-white/80 hover:text-white"
            >
              FB
            </Link>
            <Link
              href="#"
              aria-label="Twitter"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/40 text-[10px] font-semibold text-white/80 hover:text-white"
            >
              TW
            </Link>
            <Link
              href="#"
              aria-label="YouTube"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/40 text-[10px] font-semibold text-white/80 hover:text-white"
            >
              YT
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-[#111111] py-3">
        <p className="text-center text-[11px] text-white/70">{settings?.footerText || "© 2026 RCCG Peace Assembly. All rights reserved."}</p>
      </div>
    </footer>
  );
}
