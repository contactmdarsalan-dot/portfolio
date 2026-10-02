/**
 * The products. Live software with users, as distinct from the Dribbble
 * explorations, which are design work without a backend behind them. They
 * were being shown together, which made the shipped products look like
 * mockups.
 *
 * Copy is taken from each site's own title and description, not invented
 * here. Where a site was unreachable when this was written, the card says so
 * rather than describing something nobody could verify.
 */

export type Product = {
  slug: string;
  name: string;
  url: string;
  repo?: string;
  tagline: string;
  category: string;
  stack: string[];
  screenshot: string | null;
  note?: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "fixguard",
    name: "FixGuard AI",
    url: "https://fixguardai.online/",
    repo: "https://github.com/rhinopeaklabs-nepal/fixgurardai",
    tagline:
      "Pre-flight QA for AI-built websites. Opens your site in a real browser, submits your forms, and reports what actually happened rather than what the page claimed.",
    category: "QA tooling",
    stack: ["React", "Python", "Playwright", "Docker"],
    screenshot: "/products/fixguard.webp",
    note: "2nd place, Hostinger 21-Day Startup Challenge 2026",
    featured: true,
  },
  {
    slug: "rhinokhata",
    name: "RhinoKhata",
    url: "https://rhinokhata.cloud/",
    tagline:
      "Double-entry accounting, godown stock, party ledgers and work orders for wholesale distributors and manufacturers in Nepal.",
    category: "Accounting SaaS",
    stack: ["Web app", "Double-entry ledger", "Inventory"],
    screenshot: "/products/rhinokhata.webp",
  },
  {
    slug: "hamrodocs",
    name: "HamroDocs",
    url: "https://hamrodocs.com/",
    tagline:
      "Free VAT and PAN invoices, salary slips, quotations and twenty more business documents in Nepal tax formats. PDF-ready, print-friendly.",
    category: "Document platform",
    stack: ["Web app", "PDF generation", "Payroll"],
    screenshot: "/products/hamrodocs.webp",
  },
  {
    slug: "rhinopeak-academy",
    name: "RhinoPeak Academy",
    url: "https://rhinopeak.academy/",
    tagline:
      "Full-stack development bootcamp in Biratnagar: React, Django and AI-assisted coding with live mentorship, no prior experience needed.",
    category: "Education",
    stack: ["Marketing site", "Enrolment flow"],
    screenshot: "/products/rhinopeak-academy.webp",
  },
  {
    slug: "rhinopte",
    name: "RhinoPTE",
    url: "https://rhinopte.online/",
    tagline: "PTE preparation platform.",
    category: "Education",
    stack: ["Web app"],
    screenshot: null,
    note: "Offline when last checked (503). Card will carry a capture once it is back.",
  },
];
