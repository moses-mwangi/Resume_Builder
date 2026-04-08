import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });
const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Resume Builder - Create Your Professional CV",
  description:
    "A unique, interactive resume builder with modern design and PDF export",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(geist.variable)}>
      <body
      // className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}
      >
        {children}
      </body>
    </html>
  );
}
