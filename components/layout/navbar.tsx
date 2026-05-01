 "use client";

import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";
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
  const navLinks: NavItem[] = settings?.navLinks?.length
    ? [{ label: "Home", href: "/" }, ...settings.navLinks.map((link) => ({ label: link.label, href: link.href }))]
    : fallbackLinks;
  const brand = settings?.logoText || "RCCG Peace Assembly";

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white">
      <nav className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-4 md:px-8">
        <Link href="/" className="text-sm font-bold uppercase tracking-[0.08em] text-[#111111] md:text-base">
          {brand}
        </Link>

        <NavigationMenu.Root className="hidden md:block">
          <NavigationMenu.List className="flex items-center gap-8">
            {navLinks.map((link) => (
              <NavigationMenu.Item key={`${link.label}-${link.href || "group"}`}>
                {link.children?.length ? (
                  <>
                    <NavigationMenu.Trigger className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1A1A1A] outline-none transition-colors hover:text-black">
                      {link.label}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="absolute right-0 top-full mt-4 min-w-[220px] rounded-none border border-black/10 bg-white p-3 shadow-sm">
                      <ul className="space-y-1">
                        {link.children.map((child) => (
                          <li key={`${child.label}-${child.href}`}>
                            <Link href={child.href} className="block px-3 py-2 text-[13px] text-[#111111] hover:bg-[#F5F5F5]">
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenu.Content>
                  </>
                ) : (
                  <Link href={link.href || "#"} className="text-[13px] font-medium text-[#1A1A1A] transition-colors hover:text-black">
                    {link.label}
                  </Link>
                )}
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
          <NavigationMenu.Viewport />
        </NavigationMenu.Root>

        <Dialog.Root>
          <Dialog.Trigger className="inline-flex items-center justify-center rounded-md p-2 text-[#111111] md:hidden" aria-label="Open menu">
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
                      <Link href={link.href} className="block text-sm font-semibold text-[#111111]">
                        {link.label}
                      </Link>
                    ) : (
                      <p className="text-sm font-semibold text-[#111111]">{link.label}</p>
                    )}
                    {link.children?.length ? (
                      <div className="space-y-2 pl-3">
                        {link.children.map((child) => (
                          <Link key={`${child.label}-${child.href}`} href={child.href} className="block text-sm text-[#333333]">
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
