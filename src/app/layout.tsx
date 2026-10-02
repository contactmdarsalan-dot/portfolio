import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-two-fawn-pmb9ov7t5m.vercel.app"),
  title: {
    default: "Md Arsalan - Product engineer who builds with agents",
    template: "%s | Md Arsalan",
  },
  description:
    "Portfolio of Md Arsalan: product engineer and designer. Ships full-stack products with AI agents writing most of the code, then tests what they wrote. 2nd place, Hostinger 21-Day Startup Challenge 2026.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Md Arsalan - Product engineer who builds with agents",
    description:
      "Full-stack products shipped with AI agents on the keyboard and a QA habit behind them. FixGuard AI case study, live products, and how the work gets done.",
    url: "/",
    siteName: "Md Arsalan Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 900,
        alt: "Md Arsalan portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Arsalan - Product engineer who builds with agents",
    description:
      "Full-stack products shipped with AI agents on the keyboard and a QA habit behind them.",
    images: ["/og-image.jpg"],
  },
  keywords: [
    "Product Engineer",
    "Agentic Engineering",
    "Claude Code",
    "Full-stack",
    "React",
    "TypeScript",
    "FastAPI",
    "Playwright",
    "QA",
    "UX Design",
    "FixGuard AI",
    "Portfolio",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
