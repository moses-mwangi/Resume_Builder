import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/ui/Header";
import { CardFooter } from "@/components/ui/card";
import Footer from "@/components/ui/Footer";

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
      {/* <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Open+Sans:wght@400;600;700&family=Roboto:wght@400;500;700&family=Montserrat:wght@400;600;700&family=Raleway:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head> */}
      <body
      // className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}
      >
        <div>
          <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <Header />
          </header>
          {children}
          <div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
