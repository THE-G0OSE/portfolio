import type { Metadata } from "next";
import { Bangers, Comic_Neue, Space_Mono } from "next/font/google";
import "./globals.css";

const bangers = Bangers({
  variable: "--next-font-bangers",
  subsets: ["latin"],
  weight: "400",
});

const comicNeue = Comic_Neue({
  variable: "--next-font-comic-neue",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const spaceMono = Space_Mono({
  variable: "--next-font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "THE GOOSE's portfolio",
  description: "Web fullstack developer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bangers.variable} ${comicNeue.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="flex flex-col bg-paper min-h-full font-comic text-ink">{children}</body>
    </html>
  );
}
