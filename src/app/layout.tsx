import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GoalVerse | Live Football Scores, Fixtures and Standings",
    template: "%s | GoalVerse",
  },
  description:
    "Track live football scores, fixtures, standings, teams, players, lineups, events, and match statistics in one premium match center.",
  applicationName: "GoalVerse",
  keywords: [
    "football live scores",
    "soccer scores",
    "fixtures",
    "standings",
    "GoalVerse",
  ],
  authors: [{ name: "GoalVerse" }],
  creator: "GoalVerse",
  openGraph: {
    title: "GoalVerse | Live Football Scores",
    description:
      "A premium football match center for live scores, fixtures, standings, teams, and player profiles.",
    url: siteUrl,
    siteName: "GoalVerse",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoalVerse | Live Football Scores",
    description:
      "Live football scores, fixtures, standings, teams, players, and match statistics.",
  },
};

export const viewport: Viewport = {
  themeColor: "#05080f",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
