import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getSiteSettings } from "@/lib/queries";
import "./globals.css";

export const metadata: Metadata = {
  title: "RCCG Peace Assembly",
  description: "Official RCCG Peace Assembly website"
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en">
      <body>
        <Navbar settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
