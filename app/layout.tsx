import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getActiveCampaign, getSiteSettings } from "@/lib/queries";
import type { CSSProperties } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "RCCG Peace Assembly",
  description: "Official RCCG Peace Assembly website"
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const [settings, campaign] = await Promise.all([getSiteSettings(), getActiveCampaign()]);
  const themeStyle = {
    "--color-primary": campaign?.primaryColor,
    "--color-secondary": campaign?.secondaryColor
  } as CSSProperties;
  const colorScheme = settings?.colorScheme || "harbor";

  return (
    <html lang="en">
      <body data-color-scheme={colorScheme} style={themeStyle}>
        <Navbar settings={settings} />
        <main className="pt-20">
          {campaign?.announcement ? <div className="bg-[var(--color-secondary)] px-4 py-2 text-center text-sm font-medium text-white">{campaign.announcement}</div> : null}
          {children}
        </main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
