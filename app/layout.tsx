import { GeistSans } from "geist/font/sans";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  openGraph: {
    title: "Genki no kitchen",
    description:
      "Save money and reduce waste in by using up what you already have on hand.",
    url: "https://genki-no-kitchen.vercel.app/",
    siteName: "Genki no kitchen",
    images: [
      {
        url: "https://genki-no-kitchen.vercel.app/cover.png",
        width: 1200,
        height: 630,
        alt: "Genki no kitchen",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Genki no kitchen",
    description:
      "Save money and reduce waste in by using up what you already have on hand.",
    images: ["https://genki-no-kitchen.vercel.app/cover.png"],
  },
  metadataBase: new URL(defaultUrl),
  title: "Genki no kitchen",
  description:
    "Save money and reduce waste in by using up what you already have on hand.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={GeistSans.className}>
        <body className="bg-background text-foreground">
          <Navbar />
          <main className="min-h-screen flex flex-col items-center">
            {children}
          </main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
