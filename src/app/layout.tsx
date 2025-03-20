import "./globals.css";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
// import Navbar from "@/components/Navbar";

const poppinsSans = Poppins({
  variable: "--font-poppins-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ['latin'],
});

const poppinsMono = Poppins({
  variable: "--font-poppins-mono",
  weight: ["400"],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Stationery Shop - Premium Stationery Products",
  description: "Discover our collection of premium stationery products for work, school, and creative projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppinsSans.variable} ${poppinsMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* <Navbar /> */}
          {children}
          <Toaster position="top-right" closeButton richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
