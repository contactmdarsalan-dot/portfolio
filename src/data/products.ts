/**
 * The products. Live software with users, as distinct from the Dribbble
 * explorations, which are design work without a backend behind them.
 *
 * Every case study here is either written from first-hand knowledge or from
 * what the product's own site states. Where a section would need knowledge
 * only the author has - the decisions taken, what changed as a result - it
 * is left out rather than filled with plausible prose, and the page says
 * the write-up is in progress. A case study that reads well and is not true
 * is worth less than no case study.
 */

export type ProductCaseStudy = {
  year: string;
  role: string;
  timeline: string;
  platform: string;
  audience: string;
  overview: string[];
  features?: string[];
  decisions?: { title: string; detail: string }[];
  /** How the code was produced: the agent workflow, and what it got wrong. */
  built?: { title: string; detail: string }[];
  qa?: { title: string; detail: string }[];
  outcomes?: string[];
  next?: string[];
  status?: string;
};

export type Product = {
  slug: string;
  name: string;
  url: string;
  tagline: string;
  category: string;
  stack: string[];
  screenshot: string | null;
  note?: string;
  featured?: boolean;
  caseStudy: ProductCaseStudy;
};

export const products: Product[] = [
  {
    slug: "fixguard",
    name: "FixGuard AI",
    url: "https://fixguardai.online/",
    tagline:
      "Pre-flight QA for AI-built websites. Opens your site in a real browser, submits your forms, and reports what actually happened rather than what the page claimed.",
    category: "QA tooling",
    stack: ["React", "Python", "Playwright", "Docker"],
    screenshot: "/products/fixguard.webp",
    note: "2nd place, Hostinger 21-Day Startup Challenge 2026",
    featured: true,
    caseStudy: {
      year: "2026",
      role: "Founder. Sole designer and engineer.",
      timeline: "21 days, September 2026",
      platform: "Web app and API on a Hostinger VPS",
      audience: "People shipping AI-built sites to paying customers, and the freelancers handing those sites to clients",
      overview: [
        "An AI site builder produces something that looks finished in minutes. Looking finished and working are different things, and the difference is invisible from the page itself: a contact form can show a green success message and send nothing at all, or send something the server rejects while still saying thanks. The person who built the site cannot see any of this, because the interface tells them it is fine.",
        "FixGuard opens the site in a real Chromium browser and does what a visitor would do. It fills the forms with clearly labelled test data and presses submit, follows every internal link, records console errors and failed files, and checks DNS, certificates, accessibility, mobile layout and performance. Every lost point on the score traces to a specific request or element.",
        "Then the part that saves money: each finding becomes a scoped prompt that names one element and one property, so the AI builder changes one rule instead of re-reading the project and regenerating a section.",
      ],
      features: [
        "Form checks that confirm a submission left the browser and the server accepted it, with the three silent-failure cases told apart",
        "Route crawl with soft-404 detection and redirect-loop detection",
        "Console error and failed-asset capture",
        "DNS, TLS expiry and split-address detection",
        "Accessibility: contrast, heading order, duplicate ids, tap targets, text size",
        "Performance: LCP, CLS, total blocking time, long tasks",
        "Health score out of 100 with evidence per deduction",
        "PDF certificate, public share link, before-and-after comparison",
        "Prompt Studio: one scoped prompt per finding, with an estimate of the builder credits it saves",
      ],
      decisions: [
        {
          title: "A real browser, not an HTML fetch.",
          detail:
            "The failures worth finding only show up when the page's JavaScript runs, a form is filled, and the network is watched. That is why the product needs a VPS rather than shared hosting: shared hosting cannot launch Chromium.",
        },
        {
          title: "Cut the most impressive feature in the spec.",
          detail:
            "The original spec promised to verify that contact-form emails arrive, with DKIM and SPF checks. A customer's mail routes through their own provider and never passes through FixGuard, so the claim was undeliverable. It was deleted. What shipped is the narrower claim the product can prove, and every report states what it cannot confirm.",
        },
        {
          title: "One region, said out loud.",
          detail:
            "The spec called for reachability from three regions. There is one machine. The report measures from one region and says so, rather than implying global coverage.",
        },
        {
          title: "Accounts, scoped per owner.",
          detail:
            "There was no login in the plan. Once the product was holding audit reports about real sites, an open dashboard stopped being acceptable. Asking for somebody else's audit returns the same not-found as asking for one that never existed, so ids cannot be walked.",
        },
        {
          title: "Deterministic engine, no per-audit model cost.",
          detail:
            "Scoring, scoping and detection run on rules. An audit is about twenty seconds of one CPU on a server already paid for monthly, so the thousandth audit costs what the first did.",
        },
        {
          title: "One container.",
          detail:
            "Redis, a job queue, a separate browser worker and an ORM all came out. One process, one semaphore capping it at one browser, plain SQLite. Chromium plus a second runtime on a small box swaps, and a QA tool that falls over is worse than none.",
        },
      ],
      built: [
        {
          title: "Spec first, in prose.",
          detail:
            "Each feature began as a written brief: what the user sees, what the server has to prove, and what the report must say when it cannot. The agent got the brief, not a vibe. A day-by-day development log tracked the plan and marked what was pulled forward; by day seven the build was about ten days ahead of it.",
        },
        {
          title: "Claude Code wrote most of the code.",
          detail:
            "The FastAPI backend, the Playwright extraction, the scoring engine and the React dashboard were produced largely by the agent from those briefs. The reviewer's job was the diff: every change read, and anything that quietly widened a claim the product could not back sent back.",
        },
        {
          title: "Deterministic first, model second.",
          detail:
            "The three in-product agents - log parser, prompt generator, summary writer - run on rules and only call a model to improve on the rule-based result. With no API key the fallback is the product, not a degraded mode, because a live demo cannot depend on a rate limit. The client is provider-agnostic: Anthropic, OpenAI, or anything speaking the chat-completions shape.",
        },
        {
          title: "The discard pile.",
          detail:
            "Inbox-delivery verification, three-region reachability, Redis, a job queue, a separate browser worker and an ORM were all specified or generated, and all removed. Knowing what to delete was most of the engineering; an agent will build anything it is asked for.",
        },
        {
          title: "What the agent got wrong, and what caught it.",
          detail:
            "A rename left two routes raising NameError on every call; both files imported cleanly, so nothing noticed until a request arrived. Three detectors reported problems on pages known to be fine. Each became a test, and a scope checker now resolves names the way Python does before anything ships.",
        },
      ],
      qa: [
        {
          title: "Pointed at its own site first.",
          detail:
            "The marketing site, generated with AI Builder, scored 76 on the first run. FixGuard found its own verification badge blocked by CORS in every visitor's browser, a tap target four pixels under the minimum, and a contrast failure. Six runs and a series of scoped prompts later it scored 99.",
        },
        {
          title: "False positives treated as the real risk.",
          detail:
            "Three false positives were found in its own checkers, each by pointing it at pages known to be fine: contrast measured mid-fade, a white background assumed behind white text, and a keyboard skip link reported as an unhittable tap target. Each was fixed and pinned with a test, because a QA tool that cries wolf is ignored within a week.",
        },
        {
          title: "A bug class that imports cleanly.",
          detail:
            "Two API routes returned 500 on every call, names left behind by a rename. Both parsed and imported, so nothing caught them until a request arrived. A checker now resolves names the way Python does, so that class fails a test instead of a user.",
        },
        {
          title: "Thirty-six unit tests and a readiness endpoint.",
          detail:
            "Tests cover the thresholds that cannot be exercised by pointing at a live site. The readiness check writes a row to prove the disk is not full, because SQLite serves reads from a full disk and a read proves very little.",
        },
      ],
      outcomes: [
        "2nd place in the Hostinger 21-Day Startup Challenge 2026. The judges wrote that they were especially impressed the creator used the product to improve its own site.",
        "Median audit time 22.6 seconds across the runs recorded.",
        "On one real site: 29 of 29 crawled links led nowhere, 36 console errors, and a contact form whose success message reads Thank you for your response while the submission never completes. Score 37. On another, 100 across 29 pages with nothing found - which matters as much, because a tool that flags everything is useless.",
      ],
      next: [
        "Connect payments and test whether the handover moment - a certificate a freelancer hands a client - is worth the subscription.",
        "Scheduled re-checks, so a site that keeps being prompted is re-audited weekly and the owner hears only when the score drops.",
        "The multi-region reachability that was cut.",
        "Close the fix loop: apply the scoped fix, re-audit, show the before and after, with the owner approving rather than copying text between tabs.",
      ],
    },
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
    caseStudy: {
      year: "2026",
      role: "UX design and QA",
      timeline: "Ongoing",
      platform: "Web application, subscription",
      audience: "Wholesale distributors and manufacturers in Nepal",
      overview: [
        "Accounting software built for how business is actually done in Nepal rather than translated into it. The fiscal year runs Shrawan to Ashadh. Dates are Bikram Sambat throughout. Rupees are grouped the way they are written, 4,58,200 rather than 458,200. Tax invoices, abbreviated invoices and normal bills are kept apart, in the forms the IRD will accept.",
        "Underneath is a real double-entry ledger. An order raises the entries; the books move themselves; the trial balance, profit and loss, balance sheet and VAT return are derived from those entries rather than assembled at month end.",
      ],
      features: [
        "Bulk orders with per-party price tiers",
        "Party ledgers with credit limits and due dates",
        "Godown stock, every godown counted separately, with transfer notes",
        "Receivables ageing that says who to call",
        "Bills of material and costed work orders",
        "Material issue against a live BOM",
        "Work-centre load and routing",
        "Finished goods valued from real cost",
        "Trial balance, P&L, balance sheet and VAT return derived from the ledger",
      ],
      status:
        "Design decisions and outcomes for this product are being written up. What is here is taken from the product itself.",
    },
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
    caseStudy: {
      year: "2026",
      role: "UX design and QA",
      timeline: "Ongoing",
      platform: "Web application, free",
      audience: "Small businesses and freelancers in Nepal who need tax-format documents without accounting software",
      overview: [
        "Make payroll simple, free for Nepal. Salary slips, VAT and PAN invoices, quotations and receipts, built on Nepal tax rules with the Nepali calendar built in and tax worked out automatically. Free, with no tier above it.",
        "Sixteen generators cover the documents a small business actually issues, from a cash bill to a bulk payroll run, each in the layout the format expects and each exportable as a PDF.",
      ],
      features: [
        "Salary slips with automatic SSF and TDS, single or bulk payroll, EPF/SSF handled",
        "VAT bills with automatic 13% VAT and multiple line items, in Nepal invoice format",
        "PAN bills for non-VAT businesses, with no tax line and a clean layout",
        "International and freelancer invoices in other currencies with exchange rates",
        "Cash bills, retail and shop bills, wholesale and service invoices, with automatic numbering",
        "Credit notes for returns and adjustments, linked to the original invoice",
        "Proforma invoices for advance payments and order confirmation",
        "Quotations and estimates with terms and validity dates, converted to an invoice in one click",
        "Receipts and payment vouchers, expense reports and purchase orders, all with Nepali dates",
      ],
      status:
        "Design decisions and outcomes for this product are being written up. What is here is taken from the product itself.",
    },
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
    caseStudy: {
      year: "2026",
      role: "UX design and QA",
      timeline: "Ongoing",
      platform: "Marketing site with enrolment",
      audience: "People in Biratnagar starting a software career, including those with no prior coding experience",
      overview: [
        "Learn, build, get placed. An IT training institute in Biratnagar, Morang, running an AI-powered full-stack development bootcamp: React, Django and AI-assisted coding, taught with live mentorship on real projects. No prior coding experience is needed to enrol.",
        "The site is the whole front door for the academy: it has to explain the course to somebody who has never coded, make the enrolment step obvious, and give employers and graduates somewhere to go afterwards.",
      ],
      features: [
        "Course overview and enrolment flow for people with no prior experience",
        "Certificate verification, so an employer can check a graduate's credential",
        "Project submission for students, and a Hire From Us channel for companies",
        "Community on Discord, support, and pricing with a stated refund policy",
      ],
      status:
        "Design decisions and outcomes for this product are being written up. What is here is taken from the product itself.",
    },
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
    caseStudy: {
      year: "2026",
      role: "UX design and QA",
      timeline: "Ongoing",
      platform: "Web application",
      audience: "People preparing for the PTE English test",
      overview: [
        "A preparation platform for the PTE English test. The site was unreachable when this page was written, so the description is limited to what the product is.",
      ],
      status:
        "The product was offline when this was written. The case study will be completed once it is reachable again.",
    },
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
