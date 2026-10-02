export type Credential = {
  kind: "Experience" | "Education";
  title: string;
  org: string;
  period: string;
  /** "YYYY-MM". Drives the timeline; period stays the display string. */
  start: string;
  /** "YYYY-MM", or omitted while ongoing. */
  end?: string;
  /** Short label for the timeline bar. */
  short: string;
  /** Only the years are known: durations are shown in years, not months. */
  approx?: boolean;
  /** Own company or product, rather than employment. */
  own?: boolean;
  meta: string;
  bullets: string[];
};

export const credentials: Credential[] = [
  {
    kind: "Experience",
    title: "Founder",
    org: "RhinoPeak Labs Pvt Ltd",
    period: "2026 — Present",
    start: "2026-01",
    short: "RhinoPeak Labs",
    approx: true,
    own: true,
    meta: "Private limited company · Registered in Nepal",
    bullets: [
      "Founded and run the company behind RhinoKhata, HamroDocs and RhinoPeak Academy.",
    ],
  },
  {
    kind: "Experience",
    title: "Founder",
    org: "RhinoKhata",
    period: "2026 — Present",
    start: "2026-01",
    short: "RhinoKhata",
    approx: true,
    own: true,
    meta: "A RhinoPeak Labs product · rhinokhata.cloud",
    bullets: [
      "Double-entry accounting, godown stock, party ledgers and work orders for wholesale distributors and manufacturers in Nepal.",
      "Built for how business is done there: Bikram Sambat dates, a Shrawan-to-Ashadh fiscal year, and IRD-ready tax invoices.",
    ],
  },
  {
    kind: "Experience",
    title: "Founder, product engineer",
    org: "FixGuard AI",
    period: "Sep 2026 — Present",
    start: "2026-09",
    short: "FixGuard AI",
    own: true,
    meta: "Solo · Remote · fixguardai.online",
    bullets: [
      "Pre-flight QA for AI-built websites: real-browser form checks, route crawl, accessibility, performance, DNS and TLS, with one scoped fix prompt per finding.",
      "FastAPI, Playwright, React, SQLite, nginx and Docker on a single-vCPU Hostinger VPS. Built in 21 days with Claude Code writing most of the code; 36 unit checks and an acceptance suite.",
      "2nd place, Hostinger 21-Day Startup Challenge 2026.",
    ],
  },
  {
    kind: "Experience",
    title: "UI/UX Designer",
    org: "Code IT",
    period: "Apr 2024 — Jun 2026",
    start: "2024-04",
    end: "2026-06",
    short: "Code IT",
    meta: "Dharan, Nepal",
    bullets: [
      "Designed the interfaces for Code IT's web and mobile applications: user research, wireframes, prototypes and final UI.",
      "Worked directly with developers and project stakeholders from first flow to release.",
      "Also mentored UI/UX design learners.",
    ],
  },
  {
    kind: "Experience",
    title: "User Experience Designer",
    org: "Hunchha Digital Agency",
    period: "Jun 2023 — Feb 2026",
    start: "2023-06",
    end: "2026-02",
    short: "Hunchha Digital",
    meta: "Full-time · Kosi, Nepal",
    bullets: [
      "Designed digital experiences across web and mobile for agency clients, from research through to developer handoff.",
      "Built and maintained style guides so interfaces stayed consistent as teams and projects changed.",
    ],
  },
  {
    kind: "Education",
    title: "BSc Computer Software Engineering",
    org: "London Metropolitan University",
    period: "Sep 2021 — Apr 2024",
    start: "2021-09",
    end: "2024-04",
    short: "BSc, London Met",
    meta: "Bachelor's degree",
    bullets: [
      "Design thinking, style guides, and software engineering foundations.",
    ],
  },
];

export const contactChannels: {
  label: string;
  value: string;
  href: string;
  download?: string;
}[] = [
  {
    label: "Email",
    value: "contactmdarsalan@gmail.com",
    href: "mailto:contactmdarsalan@gmail.com",
  },
  {
    label: "Phone",
    value: "+977 9713159720",
    href: "tel:+9779713159720",
  },
  {
    label: "LinkedIn",
    value: "md-arsalan-a547a3279",
    href: "https://www.linkedin.com/in/md-arsalan-a547a3279/",
  },
];
