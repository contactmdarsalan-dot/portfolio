import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-two-fawn-pmb9ov7t5m.vercel.app"),
  title: {
    default: "Md Arsalan - UI/UX + QA Specialist | Designs & Defends",
    template: "%s | Md Arsalan",
  },
  description:
    "UX/UI and QA portfolio of Md Arsalan, showing case studies, product decisions, interface craft, and release-focused quality checks.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Md Arsalan - UI/UX + QA Specialist",
    description:
      "Case-study portfolio covering UX process, UI craft, QA checks, and release-ready product thinking.",
    url: "/",
    siteName: "Md Arsalan Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 900,
        alt: "Md Arsalan portfolio character render",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Arsalan - UI/UX + QA Specialist",
    description:
      "UX/UI and QA case-study portfolio with process, decisions, and quality checks.",
    images: ["/og-image.jpg"],
  },
  keywords: [
    "UI/UX Designer",
    "QA Specialist",
    "Figma",
    "UX Case Studies",
    "Portfolio",
    "Mobile App Design",
    "Quality Assurance",
    "Product Design",
    "Nepal UX Designer",
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
