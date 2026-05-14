import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Md Arsalan - UI/UX + QA Specialist | Designs & Defends",
  description:
    "Portfolio of Md Arsalan - UI/UX Designer & QA Specialist. Crafting intuitive interfaces and ensuring bug-free experiences for telecom and digital products.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  keywords: [
    "UI/UX Designer",
    "QA Specialist",
    "Figma",
    "Ncell",
    "Portfolio",
    "Mobile App Design",
    "Quality Assurance",
  ],
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
