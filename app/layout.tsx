import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

import SmoothScroll from "@/components/providers/SmoothScroll";
import Header from "@/components/Header";
// import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "Osmo Supply Clone",
  description: "Dev Toolkit Built to Flex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${oswald.variable} antialiased bg-osmo-carbon text-osmo-paper`}
      >
        <SmoothScroll>
          {/* <Cursor /> */}
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
