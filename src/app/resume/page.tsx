import type { Metadata } from "next";
import Link from "next/link";
import { contactChannels, credentials } from "@/data/resume";
import { products } from "@/data/products";
import PrintButton from "./PrintButton";
import styles from "./page.module.css";

/**
 * The resume, as a page. Built from the same data as the site so the two
 * cannot drift, and laid out for A4 so "save as PDF" from the print dialog
 * is the download. The old static HTML it replaced rated design tools by
 * years of use; a hiring manager for an engineering role has nothing to do
 * with that.
 */

export const metadata: Metadata = {
  title: "Resume",
  description: "Md Arsalan: product engineer and designer. One page.",
  robots: { index: false, follow: true },
};

const summary =
  "Product engineer and designer. I take a customer problem to production with AI agents writing most of the code, then test what they wrote before a user does. Three years designing interfaces for agency clients; one shipped product of my own, placed 2nd in the Hostinger 21-Day Startup Challenge 2026.";

const stack: { label: string; items: string }[] = [
  { label: "Frontend", items: "TypeScript, React 19, Next.js, CSS, Figma" },
  { label: "Backend", items: "Python, FastAPI, REST, SQLite, Playwright" },
  { label: "Infra", items: "Docker Compose, nginx, Traefik / Coolify, DNS and TLS, GitHub" },
  { label: "Agents", items: "Claude Code daily; spec-first briefs, diff review, deterministic-first LLM features" },
  { label: "Quality", items: "Unit and acceptance tests, readiness probes, request metrics, accessibility checks" },
];

export default function ResumePage() {
  const experience = credentials.filter((c) => c.kind === "Experience");
  const education = credentials.filter((c) => c.kind === "Education");
  const fixguard = products.find((p) => p.slug === "fixguard");
  const email = contactChannels.find((c) => c.label === "Email");
  const linkedin = contactChannels.find((c) => c.label === "LinkedIn");

  return (
    <main className={styles.page}>
      <nav className={styles.bar} aria-label="Resume actions">
        <Link href="/" className={styles.back}>
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10 3 5 8l5 5" />
          </svg>
          Portfolio
        </Link>
        <PrintButton />
      </nav>

      <article className={styles.sheet}>
        <header className={styles.head}>
          <div>
            <h1 className={styles.name}>Md Arsalan</h1>
            <p className={styles.role}>Product engineer · designer by training</p>
          </div>
          <ul className={styles.contact}>
            {email && (
              <li>
                <a href={email.href}>{email.value}</a>
              </li>
            )}
            {linkedin && (
              <li>
                <a href={linkedin.href} target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/{linkedin.value}
                </a>
              </li>
            )}
            <li>
              <a href="https://arsalan.fixguardai.online/" target="_blank" rel="noopener noreferrer">
                arsalan.fixguardai.online
              </a>
            </li>
            <li>Kathmandu, Nepal · Remote</li>
          </ul>
        </header>

        <p className={styles.summary}>{summary}</p>

        <section className={styles.block}>
          <h2 className={styles.blockTitle}>Experience</h2>
          <ol className={styles.entries}>
            {experience.map((e) => (
              <li key={`${e.org}-${e.title}`} className={styles.entry}>
                <div className={styles.entryHead}>
                  <div>
                    <h3 className={styles.entryTitle}>{e.title}</h3>
                    <p className={styles.entryOrg}>
                      {e.org} · {e.meta}
                    </p>
                  </div>
                  <p className={styles.entryPeriod}>{e.period}</p>
                </div>
                <ul className={styles.bullets}>
                  {e.bullets.map((b) => (
                    <li key={b.slice(0, 40)}>{b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        {fixguard && (
          <section className={styles.block}>
            <h2 className={styles.blockTitle}>Selected project</h2>
            <div className={styles.entry}>
              <div className={styles.entryHead}>
                <div>
                  <h3 className={styles.entryTitle}>
                    {fixguard.name} ·{" "}
                    <a href={fixguard.url} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
                      {fixguard.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    </a>
                  </h3>
                  <p className={styles.entryOrg}>{fixguard.caseStudy.role}</p>
                </div>
                <p className={styles.entryPeriod}>{fixguard.caseStudy.timeline}</p>
              </div>
              <ul className={styles.bullets}>
                <li>{fixguard.tagline}</li>
                {fixguard.caseStudy.outcomes?.slice(0, 2).map((o) => (
                  <li key={o.slice(0, 40)}>{o}</li>
                ))}
                <li>
                  Case study with decisions, agent workflow and test discipline at{" "}
                  <Link href="/products/fixguard" className={styles.inlineLink}>
                    arsalan.fixguardai.online/products/fixguard
                  </Link>
                  .
                </li>
              </ul>
            </div>
          </section>
        )}

        <section className={styles.block}>
          <h2 className={styles.blockTitle}>Stack</h2>
          <dl className={styles.stack}>
            {stack.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={styles.block}>
          <h2 className={styles.blockTitle}>Education</h2>
          <ol className={styles.entries}>
            {education.map((e) => (
              <li key={e.org} className={styles.entry}>
                <div className={styles.entryHead}>
                  <div>
                    <h3 className={styles.entryTitle}>{e.title}</h3>
                    <p className={styles.entryOrg}>{e.org}</p>
                  </div>
                  <p className={styles.entryPeriod}>{e.period}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </article>
    </main>
  );
}
