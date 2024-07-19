import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reviewizer",
  description: "AI tool that summarizes reviews for Steam games",
  keywords: ["steam", "reviews", "ai", "summary", "gemini"],
  authors: [
    {
      name: "Miguel Higuera",
      url: "https://miguelhiguera.dev/"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Analytics />
      <body className={`${inter.className} bg-neutral-900 text-white`}>{children}</body>
    </html>
  );
}
