import type { Metadata, Viewport } from "next";
import InstallPwaBanner from "@/components/install-pwa-banner";
import "./globals.css";

export const metadata: Metadata = {
  title: "ND Studio | AI Reel & Short Video Creation Suite",
  description: "Create viral vertical reels and shorts with AI scripts, voiceover, and multi-track audio mixing.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "NDStudio",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased bg-[#09090d] text-slate-100 min-h-screen">
        {children}
        <InstallPwaBanner />
      </body>
    </html>
  );
}
