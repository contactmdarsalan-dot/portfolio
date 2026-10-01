export type Credential = {
  kind: "Experience" | "Education";
  title: string;
  org: string;
  period: string;
  meta: string;
  bullets: string[];
};

export const credentials: Credential[] = [
  {
    kind: "Experience",
    title: "Graphic Designer",
    org: "Alpha Technology",
    period: "Jan 2026 — Present",
    meta: "Full-time · Kathmandu, Nepal · On-site",
    bullets: [
      "Wireframing and interface systems for client product work.",
    ],
  },
  {
    kind: "Experience",
    title: "User Experience Designer",
    org: "Hunchha Digital Agency",
    period: "Jun 2023 — Feb 2026",
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
