import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import QueryWrapper from "./providers/QueryWrapper";
import { Navbar } from "@/components/Navbar";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tempture",
  description: "Monitorize your room humidity and temperature",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >

        {/* Dari Library Tanstack Query untuk mempermudah fetch API dengan lebih clean code */}
        <QueryWrapper>
          {/* Dari library shadcnui untuk ganti mode theme */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="max-w-5xl mx-auto flex flex-col py-10 pb-20">
              {children}
            </main>
          </ThemeProvider>
        </QueryWrapper>

      </body>
    </html>
  );
}
