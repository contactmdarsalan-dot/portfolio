"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { credentials, contactChannels, type Credential } from "@/data/resume";
import { resumeFile } from "@/data/profile";
import styles from "./ResumeSection.module.css";

/**
 * Experience, education and contact.
 *
 * Opens on a career timeline: one lane per role, bars to scale from
 * September 2021 to now, so the overlaps a CV hides - studying while
 * working, a side product while employed - are visible at a glance. The
 * bars grow in when the chart scrolls into view. Below it, one card per
 * role with its duration worked out from the dates rather than typed.
 */

const NOW = "2026-10";
const RANGE_START = "2021-09";

function months(a: string, b: string) {
  const [ya, ma] = a.split("-").map(Number);
  const [yb, mb] = b.split("-").map(Number);
  return (yb - ya) * 12 + (mb - ma);
}

function duration(c: Credential) {
  const m = Math.max(1, months(c.start, c.end ?? NOW) + 1);
  const y = Math.floor(m / 12);
  const r = m % 12;
  return [y ? `${y} yr${y > 1 ? "s" : ""}` : "", r ? `${r} mo${r > 1 ? "s" : ""}` : ""].filter(Boolean).join(" ");
}

const TOTAL = months(RANGE_START, NOW);
const YEARS = [2022, 2023, 2024, 2025, 2026];

function Timeline({ run }: { run: boolean }) {
  // Lanes in chronological order of start, oldest at the top.
  const lanes = [...credentials].sort((a, b) => a.start.localeCompare(b.start));
  return (
    <div className={`${styles.chart} ${run ? styles.in : ""}`}>
      <div className={styles.axis} aria-hidden="true">
        {YEARS.map((y) => (
          <span key={y} style={{ left: `${(months(RANGE_START, `${y}-01`) / TOTAL) * 100}%` }}>
            {y}
          </span>
        ))}
        <span className={styles.now} style={{ left: "100%" }}>
          Now
        </span>
      </div>

      <ol className={styles.lanes}>
        {lanes.map((c, i) => {
          const width = Math.max(3, (months(c.start, c.end ?? NOW) / TOTAL) * 100);
          // A minimum-width bar that starts near now would run past the Now line.
          const left = Math.min((months(RANGE_START, c.start) / TOTAL) * 100, 100 - width);
          const tone = c.kind === "Education" ? styles.barEdu : c.org === "FixGuard AI" ? styles.barOwn : styles.barJob;
          // Too narrow to hold a label: always outside (tiny), or outside on phones (short).
          const size = width < 8 ? styles.barTiny : width < 22 ? styles.barShort : "";
          return (
            <li key={c.org} className={styles.lane}>
              <span
                className={`${styles.bar} ${tone} ${size} ${c.end ? "" : styles.barOpen}`}
                style={{ left: `${left}%`, width: `${width}%`, "--i": i } as CSSProperties}
              >
                <span className={styles.barLabel}>{c.short}</span>
              </span>
            </li>
          );
        })}
      </ol>

      <div className={styles.grid} aria-hidden="true">
        {YEARS.map((y) => (
          <span key={y} style={{ left: `${(months(RANGE_START, `${y}-01`) / TOTAL) * 100}%` }} />
        ))}
      </div>

      <ul className={styles.legend}>
        <li><span className={styles.barOwn} /> Own product</li>
        <li><span className={styles.barJob} /> Employed</li>
        <li><span className={styles.barEdu} /> Study</li>
      </ul>
    </div>
  );
}

export default function ResumeSection() {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const ordered = [...credentials].sort((a, b) => (b.end ?? NOW).localeCompare(a.end ?? NOW) || b.start.localeCompare(a.start));

  return (
    <section className={styles.section} id="resume" data-scroll-section>
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.kicker}>Experience</p>
          <h2 className={styles.title}>
            Three years of interfaces. <span className={styles.titleSoft}>One product of my own.</span>
          </h2>
        </header>

        <div ref={chartRef}>
          <Timeline run={run} />
        </div>

        <ol className={styles.cards}>
          {ordered.map((c) => {
            const ongoing = !c.end;
            const own = c.org === "FixGuard AI";
            return (
              <li key={c.org} className={`${styles.card} ${own ? styles.cardOwn : ""}`}>
                <div className={styles.cardSide}>
                  <span className={`${styles.badge} ${ongoing ? styles.badgeLive : ""}`}>
                    {ongoing && <span className={styles.liveDot} aria-hidden="true" />}
                    {ongoing ? "Now" : c.kind}
                  </span>
                  <p className={styles.period}>{c.period}</p>
                  <p className={styles.duration}>{duration(c)}</p>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.role}>{c.title}</h3>
                  <p className={styles.org}>
                    {c.org} <span className={styles.meta}>· {c.meta}</span>
                  </p>
                  <ul className={styles.bullets}>
                    {c.bullets.map((b) => (
                      <li key={b.slice(0, 40)}>{b}</li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>

        <footer className={styles.contact} id="contact">
          <div>
            <p className={styles.kicker}>Contact</p>
            <h3 className={styles.contactTitle}>Send a problem. You will get a plan, then a build.</h3>
          </div>

          <ul className={styles.channels}>
            {contactChannels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <span className={styles.channelLabel}>{c.label}</span>
                  <span className={styles.channelValue}>{c.value}</span>
                </a>
              </li>
            ))}
            <li>
              <a href={resumeFile} className={styles.resumeLink}>
                <span className={styles.channelLabel}>Resume</span>
                <span className={styles.channelValue}>Open, print to PDF</span>
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </section>
  );
}
