import Link from "next/link";
import styles from "./ProofSection.module.css";

/**
 * The brief for a product-engineer role, answered line by line with the one
 * place each line was actually done. This replaced a "Skill Stack" card grid
 * (Journey mapping, Figma, Cypress) that told an engineering manager nothing
 * they could check.
 *
 * Every number here is from the FixGuard repository or its development log.
 * Nothing is rounded up.
 */

const proofs = [
  {
    ask: "Own problems, not tickets",
    did: "Idea to production in 21 days",
    detail:
      "FixGuard began as a problem statement, not a spec: AI-built sites look finished and fail silently. Twenty-one days later it was live on a VPS with accounts, public reports and a PDF certificate, and placed 2nd in the Hostinger 21-Day Startup Challenge.",
  },
  {
    ask: "Move across the stack",
    did: "Frontend, API, browser, infra",
    detail:
      "React dashboard, FastAPI API, Playwright driving Chromium, SQLite in WAL mode, nginx with rate limiting and security headers, Docker Compose on a single-vCPU VPS behind Traefik. DNS and TLS included.",
  },
  {
    ask: "Build with agents, not autocomplete",
    did: "Claude Code wrote most of it",
    detail:
      "My job was the spec, the review and the discard pile. An email-verification feature the agent would happily have built was cut because the product could not prove the claim. Reviewing, steering, and throwing output away is the actual work.",
  },
  {
    ask: "Measure whether it worked",
    did: "76 to 99 on its own site",
    detail:
      "Pointed at its own AI-built marketing page: 76 on the first run, 99 after six rounds of scoped fixes. Request metrics are bucketed per minute and route and flushed to SQLite, so latency percentiles survive a deploy. Median audit: 22.6 seconds.",
  },
  {
    ask: "Testing discipline",
    did: "36 unit checks, acceptance suite, readiness",
    detail:
      "Two routes an agent renamed shipped returning 500 on every call; both imported cleanly. The fix was a checker that resolves names the way Python does. Three false positives in its own detectors were each pinned with a test. The readiness probe writes a row, because a read from a full disk proves nothing.",
  },
  {
    ask: "Push back, explain it plainly",
    did: "Reports say what they cannot confirm",
    detail:
      "The spec asked for three-region reachability and inbox delivery proof. There was one machine and no access to the customer's mail. Both were cut and every report states the limit in words a site owner understands.",
  },
];

const stack = [
  "TypeScript",
  "React 19",
  "Next.js",
  "Python",
  "FastAPI",
  "REST",
  "Playwright",
  "SQLite",
  "Docker",
  "nginx",
  "Traefik / Coolify",
  "GitHub",
  "Claude Code",
  "Figma",
];

export default function ProofSection() {
  return (
    <section className={styles.section} id="skills" data-scroll-section>
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.kicker}>How I build</p>
          <h2 className={styles.title}>What a product engineer role asks for, and where I have done it.</h2>
          <p className={styles.lead}>
            Six lines from a typical brief. Each one answered with the place it was done,
            not a skill badge. The long version is the{" "}
            <Link href="/products/fixguard">FixGuard case study</Link>.
          </p>
        </header>

        <ol className={styles.grid}>
          {proofs.map((p, i) => (
            <li key={p.ask} className={styles.card}>
              <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
              <p className={styles.ask}>{p.ask}</p>
              <h3 className={styles.did}>{p.did}</h3>
              <p className={styles.detail}>{p.detail}</p>
            </li>
          ))}
        </ol>

        <div className={styles.stackRow}>
          <p className={styles.stackLabel}>Ships with</p>
          <ul className={styles.stack}>
            {stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
