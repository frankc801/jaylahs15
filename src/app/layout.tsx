import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Great_Vibes } from "next/font/google";
import { event } from "@/config/event";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${event.quinceanera.fullName} · ${event.celebration.title}`,
  description: `${event.invitationMessage.en} ${event.date.label} · ${event.venue.name}.`,
  openGraph: {
    title: `${event.quinceanera.fullName} · ${event.celebration.title}`,
    description: `Join us ${event.date.label} at ${event.venue.name}.`,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#08402d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${greatVibes.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
