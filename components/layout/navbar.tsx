"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { ChevronDown, Menu, X } from "lucide-react";
import type { SiteSettings } from "@/types/cms";

type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

const fallbackLinks: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About us",
    children: [
      { label: "Our Vision and Mission", href: "/visit" },
      { label: "Our Belief", href: "/visit" },
      { label: "Our Core Values", href: "/visit" },
      { label: "Service Time", href: "/visit" }
    ]
  },
  { label: "Ministries", href: "/visit" },
  { label: "eGiving", href: "/give" },
  {
    label: "News & Media",
    children: [
      { label: "Live Stream", href: "/watch" },
      { label: "Our Gallery", href: "/blog" },
      { label: "Worship-Praise-Concert", href: "/events" },
      { label: "Sermon & Teachings", href: "/watch" }
    ]
  },
  { label: "Contact us", href: "/visit" }
];

type NavbarProps = {
  settings: SiteSettings | null;
};

export function Navbar({ settings }: NavbarProps) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<{ key: string; pathname: string } | null>(null);
  const [mobileMenu, setMobileMenu] = useState({ open: false, pathname: "" });
  const [hasPassedHero, setHasPassedHero] = useState(false);

  const navLinks: NavItem[] = settings?.navLinks?.length
    ? [{ label: "Home", href: "/" }, ...settings.navLinks.map((link) => ({ label: link.label, href: link.href }))]
    : fallbackLinks;
  const brand = settings?.logoText || "RCCG Peace Assembly";
  const visibleDropdown = openDropdown?.pathname === pathname ? openDropdown.key : null;
  const mobileMenuOpen = mobileMenu.open && mobileMenu.pathname === pathname;
  const isOverlay = pathname === "/" && !hasPassedHero;

  const closeMenus = useCallback(() => {
    setOpenDropdown(null);
    setMobileMenu((currentMenu) => ({ ...currentMenu, open: false }));
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const hero = document.querySelector<HTMLElement>("[data-hero-section]");

    if (!hero) {
      const frame = window.requestAnimationFrame(() => {
        setHasPassedHero(true);
      });

      return () => {
        window.cancelAnimationFrame(frame);
      };
    }

    const syncNavbarState = () => {
      const heroBottom = hero.getBoundingClientRect().bottom;
      setHasPassedHero(heroBottom <= 96);
    };

    const frame = window.requestAnimationFrame(syncNavbarState);
    window.addEventListener("scroll", syncNavbarState, { passive: true });
    window.addEventListener("resize", syncNavbarState);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", syncNavbarState);
      window.removeEventListener("resize", syncNavbarState);
    };
  }, [pathname]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        isOverlay ? "border-white/15 bg-white/10 shadow-none backdrop-blur-xl" : "border-black/10 bg-white/95 shadow-sm backdrop-blur-md"
      )}
    >
      <nav className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          onClick={closeMenus}
          className={clsx("text-sm font-bold uppercase tracking-[0.08em] md:text-base", isOverlay ? "text-white" : "text-[#111111]")}
        >
          {brand}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const itemKey = `${link.label}-${link.href || "group"}`;
            const isOpen = visibleDropdown === itemKey;

            return (
              <div
                key={itemKey}
                className="relative"
                onMouseEnter={() => link.children?.length && setOpenDropdown({ key: itemKey, pathname })}
                onMouseLeave={() => setOpenDropdown(null)}
                onFocus={() => link.children?.length && setOpenDropdown({ key: itemKey, pathname })}
                onBlur={(event) => {
                  const nextFocus = event.relatedTarget as Node | null;

                  if (!nextFocus || !event.currentTarget.contains(nextFocus)) {
                    setOpenDropdown(null);
                  }
                }}
              >
                {link.children?.length ? (
                  <>
                    <button
                      type="button"
                      className={clsx(
                        "inline-flex items-center gap-1.5 text-[13px] font-medium outline-none transition-colors",
                        isOverlay ? "text-white/90 hover:text-white" : "text-[#1A1A1A] hover:text-black"
                      )}
                      aria-haspopup="menu"
                      aria-expanded={isOpen}
                      onClick={() => setOpenDropdown(isOpen ? null : { key: itemKey, pathname })}
                    >
                      {link.label}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    <div className={`absolute left-0 top-full z-50 min-w-[220px] pt-2 transition-opacity duration-150 ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
                      <div className="border border-black/10 bg-white/95 p-2 shadow-lg backdrop-blur-md">
                        {link.children.map((child) => (
                          <Link key={`${child.label}-${child.href}`} href={child.href} onClick={closeMenus} className="block px-3 py-2 text-[13px] text-[#111111] outline-none hover:bg-[#F5F5F5]">
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href || "#"}
                    onClick={closeMenus}
                    className={clsx(
                      "text-[13px] font-medium transition-colors",
                      isOverlay ? "text-white/90 hover:text-white" : "text-[#1A1A1A] hover:text-black"
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        <Dialog.Root open={mobileMenuOpen} onOpenChange={(open) => setMobileMenu({ open, pathname })}>
          <Dialog.Trigger
            className={clsx("inline-flex items-center justify-center rounded-md p-2 md:hidden", isOverlay ? "text-white" : "text-[#111111]")}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 md:hidden" />
            <Dialog.Content className="fixed right-0 top-0 z-50 h-full w-[88%] max-w-sm overflow-y-auto bg-white p-6 shadow-xl md:hidden">
              <div className="mb-8 flex items-center justify-between">
                <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#111111]">{brand}</p>
                <Dialog.Close className="inline-flex items-center justify-center rounded-md p-2 text-[#111111]" aria-label="Close menu">
                  <X className="h-5 w-5" />
                </Dialog.Close>
              </div>
              <div className="space-y-5">
                {navLinks.map((link) => (
                  <div key={`${link.label}-${link.href || "group-mobile"}`} className="space-y-3 border-b border-black/10 pb-4">
                    {link.href ? (
                      <Link href={link.href} onClick={closeMenus} className="block text-sm font-semibold text-[#111111]">
                        {link.label}
                      </Link>
                    ) : (
                      <p className="text-sm font-semibold text-[#111111]">{link.label}</p>
                    )}
                    {link.children?.length ? (
                      <div className="space-y-2 pl-3">
                        {link.children.map((child) => (
                          <Link key={`${child.label}-${child.href}`} href={child.href} onClick={closeMenus} className="block text-sm text-[#333333]">
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </nav>
    </header>
  );
}
