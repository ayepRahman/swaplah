import { Navbar } from "@/components/Navbar";
import { NetworkNotification } from "@/components/NetworkNotification";
import { Providers } from "@/components/Providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swaplah",
  description: "Swaplah is a POC DEX for ethereum",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NetworkNotification />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
