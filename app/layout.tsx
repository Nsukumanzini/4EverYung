import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AudioPlayer from "@/components/AudioPlayer";
import BottomPillNavigation from "@/components/BottomPillNavigation";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import SiteFooter from "@/components/SiteFooter";
import TopNavigation from "@/components/TopNavigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "4Ever Yung Graphics & Art PTY LTD",
  description: "Modern art gallery website for 4Ever Yung Graphics & Art PTY LTD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingScreen />
        <div className="hidden md:block">
          <CustomCursor />
        </div>
        <TopNavigation />
        <main className="min-h-screen px-3 pb-40 pt-20 sm:px-6 sm:pb-36 sm:pt-24">{children}</main>
        <SiteFooter />
        <BottomPillNavigation />
        <AudioPlayer />
      </body>
    </html>
  );
}
