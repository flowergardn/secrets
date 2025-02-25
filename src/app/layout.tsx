import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import React from "react";
import { Toaster } from "sonner";
import { getBaseUrl } from "~/lib/utils";

export const metadata: Metadata = {
  title: "secrets",
  description: "an app to create and share temporary secrets",
  icons: [{ rel: "icon", url: "/icon.png" }],
  openGraph: {
    title: "secrets",
    description: "an app to create and share temporary secrets",
    url: getBaseUrl(),
    siteName: "secrets",
    images: [
      {
        url: `${getBaseUrl()}/icon.png`,
        width: 128,
        height: 128,
        type: "image/png",
        alt: "logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
