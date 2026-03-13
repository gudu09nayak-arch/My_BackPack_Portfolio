import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Backpack Group of Travels | Explore Odisha in Style",
  description: "Discover the hidden gems of Odisha with My Backpack Group of Travels. Customized tour packages, premium stays, reliable transport, and expert local guides for unforgettable journeys.",
  keywords: ["Odisha tourism", "travel agency", "tour packages", "Bhubaneswar", "Puri", "Konark", "heritage tours", "beach vacations", "wildlife safari", "spiritual journeys"],
  authors: [{ name: "My Backpack Group of Travels" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "My Backpack Group of Travels",
    description: "Explore Odisha in Style - Your journey to relaxation and discovery begins here.",
    url: "https://mybackpacktravels.com",
    siteName: "My Backpack Group of Travels",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Backpack Group of Travels",
    description: "Explore Odisha in Style - Your journey to relaxation and discovery begins here.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
