"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import styles from "./ProofSection.module.css";

/**
 * Six claims a product-engineer brief makes, each answered with a receipt
 * that moves: a 21-day strip that fills, a request travelling down the
 * stack, an agent diff where most of the lines get cut, a score gauge
 * climbing from 76 to 99, 36 checks turning green, and a report that says
 * what it could not confirm.
 *
 * Every number is from the FixGuard repository or its development log.
 * The text on every card is readable at rest; only the visuals animate,
 * and only once, when the card first scrolls into view. Reduced motion
 * shows each visual in its finished state.
 */

/* ------------------------------------------------------------ helpers */

const RM_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(cb: () => void) {
  const mq = window.matchMedia(RM_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(RM_QUERY).matches,
    () => false,
  );
}

function CountUp({ from = 0, to, run, ms = 1400, decimals = 0 }: { from?: number; to: number; run: boolean; ms?: number; decimals?: number }) {
  const [v, setV] = useState(from);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!run || reduced) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(from + (to - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, from, to, ms, reduced]);
  return <>{(run && reduced ? to : v).toFixed(decimals)}</>;
}

function Card({
  className,
  index,
  ask,
  title,
  children,
  visual,
  inView,
}: {
  className?: string;
  index: number;
  ask: string;
  title: ReactNode;
  children: ReactNode;
  visual: ReactNode;
  inView: boolean;
}) {
  return (
    <article
      data-index={index}
      className={`${styles.card} ${className ?? ""} ${inView ? styles.in : ""}`}
    >
      <div className={styles.cardHead}>
        <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
        <span className={styles.ask}>{ask}</span>
      </div>
      <div className={styles.visual}>{visual}</div>
      <h3 className={styles.did}>{title}</h3>
      <p className={styles.detail}>{children}</p>
    </article>
  );
}

/* ------------------------------------------------------------ visuals */

const DAYS = 21;
const MARKS: Record<number, string> = { 1: "Scaffold", 4: "Live on a VPS", 21: "2nd place" };

function DaysStrip({ run }: { run: boolean }) {
  return (
    <div className={styles.days}>
      <div className={styles.bigNum}>
        <CountUp to={21} run={run} ms={1200} />
        <span className={styles.bigUnit}>days</span>
      </div>
      <ol className={styles.dayRow} aria-label="21 days, with day 1, day 4 and day 21 marked">
        {Array.from({ length: DAYS }, (_, i) => {
          const d = i + 1;
          const mark = MARKS[d];
          return (
            <li
              key={d}
              className={`${styles.day} ${mark ? styles.dayMark : ""} ${d === DAYS ? styles.dayWin : ""}`}
              style={{ "--i": i } as CSSProperties}
            >
              {mark && (
                <span className={styles.dayLabel}>
                  <b>Day {d}</b> <span className={styles.dayText}>{mark}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

const LAYERS = [
  { name: "React dashboard", note: "SSE progress, reports" },
  { name: "nginx", note: "rate limits, security headers" },
  { name: "FastAPI", note: "accounts, scoped ids" },
  { name: "Playwright · Chromium", note: "real forms, real network" },
  { name: "SQLite · WAL", note: "metrics survive a deploy" },
];

function StackFlow() {
  return (
    <div className={styles.stackFlow}>
      <span className={styles.packet} aria-hidden="true" />
      <ol className={styles.layers}>
        {LAYERS.map((l, i) => (
          <li key={l.name} style={{ "--i": i } as CSSProperties}>
            <span className={styles.layerName}>{l.name}</span>
            <span className={styles.layerNote}>{l.note}</span>
          </li>
        ))}
      </ol>
      <p className={styles.stackFoot}>Docker Compose on a VPS, behind Traefik, TLS by Let&apos;s Encrypt</p>
    </div>
  );
}

const DIFF: { text: string; kept: boolean; why: string }[] = [
  { text: "submit forms, watch the network", kept: true, why: "kept" },
  { text: "verify inbox delivery (DKIM, SPF)", kept: false, why: "cannot prove" },
  { text: "reachability from three regions", kept: false, why: "one machine" },
  { text: "redis + job queue + worker", kept: false, why: "swaps the box" },
  { text: "one container, one browser semaphore", kept: true, why: "kept" },
];

function AgentDiff() {
  return (
    <div className={styles.term} aria-label="Agent output, with three of five lines cut">
      <div className={styles.termBar}>
        <span />
        <span />
        <span />
        <em>agent output · review</em>
      </div>
      <ol className={styles.termLines}>
        <li className={styles.termPrompt} style={{ "--i": 0 } as CSSProperties}>
          <span className={styles.caret}>›</span> brief: audit engine
        </li>
        {DIFF.map((l, i) => (
          <li
            key={l.text}
            className={l.kept ? styles.lineKept : styles.lineCut}
            style={{ "--i": i + 1 } as CSSProperties}
          >
            <span className={styles.sign}>+</span>
            <span className={styles.lineText}>{l.text}</span>
            <span className={styles.verdict}>{l.why}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Gauge({ run }: { run: boolean }) {
  // Semicircle, radius 80. Length of the arc is pi * r.
  const r = 80;
  const len = Math.PI * r;
  return (
    <div className={styles.gauge}>
      <svg viewBox="0 0 200 116" aria-hidden="true">
        <path d="M20 100 A80 80 0 0 1 180 100" className={styles.gaugeTrack} />
        <path
          d="M20 100 A80 80 0 0 1 180 100"
          className={styles.gaugeFill}
          style={{ strokeDasharray: len, "--from": len * (1 - 0.76), "--to": len * (1 - 0.99) } as CSSProperties}
        />
      </svg>
      <div className={styles.gaugeNum}>
        <CountUp from={76} to={99} run={run} ms={1800} />
      </div>
      <div className={styles.runs} aria-label="Six runs, from 76 on the first to 99 on the sixth">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} style={{ "--i": i } as CSSProperties}>
            {i === 0 ? "76" : i === 5 ? "99" : ""}
          </span>
        ))}
      </div>
      <p className={styles.gaugeFoot}>
        Run 1 to run 6 · median audit <b><CountUp to={22.6} run={run} decimals={1} ms={1600} />s</b>
      </p>
    </div>
  );
}

function Checks({ run }: { run: boolean }) {
  return (
    <div className={styles.checks}>
      <div className={styles.checkGrid} aria-hidden="true">
        {Array.from({ length: 36 }, (_, i) => (
          <span key={i} style={{ "--i": i } as CSSProperties} />
        ))}
      </div>
      <div className={styles.checkCount}>
        <span className={styles.bigNum}>
          <CountUp to={36} run={run} ms={1500} />
          <span className={styles.bigUnit}>/36 passing</span>
        </span>
        <ul className={styles.checkNotes}>
          <li>3 false positives found, each pinned</li>
          <li>2 routes returning 500, caught by a scope checker</li>
        </ul>
      </div>
    </div>
  );
}

function Report() {
  const rows = [
    { tone: "ok", label: "Contact form", value: "Submitted, server accepted" },
    { tone: "warn", label: "Inbox delivery", value: "Not verified. Mail routes through your provider." },
    { tone: "info", label: "Reachability", value: "Measured from one region." },
  ];
  return (
    <ul className={styles.report} aria-label="Sample report rows">
      {rows.map((r, i) => (
        <li key={r.label} className={styles[`r_${r.tone}`]} style={{ "--i": i } as CSSProperties}>
          <span className={styles.rDot} aria-hidden="true" />
          <span className={styles.rLabel}>{r.label}</span>
          <span className={styles.rValue}>{r.value}</span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------ section */

const STACK = [
  "TypeScript", "React 19", "Next.js", "Python", "FastAPI", "REST", "Playwright",
  "SQLite", "Docker", "nginx", "Traefik", "Coolify", "Claude Code", "Figma",
];

export default function ProofSection() {
  const [seen, setSeen] = useState<boolean[]>(() => Array(6).fill(false));
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = Number((e.target as HTMLElement).dataset.index);
          setSeen((s) => (s[i] ? s : s.map((v, k) => (k === i ? true : v))));
          io.unobserve(e.target);
        });
      },
      { threshold: 0.3 },
    );
    sectionRef.current?.querySelectorAll<HTMLElement>("[data-index]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="skills" data-scroll-section>
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.kicker}>How I build</p>
          <h2 className={styles.title}>
            Six claims. <span className={styles.titleMark}>Six receipts.</span>
          </h2>
          <p className={styles.lead}>
            What a product-engineer brief asks for, answered with what actually happened.
            Every number is from the FixGuard repo; the long version is the{" "}
            <Link href="/products/fixguard">case study</Link>.
          </p>
        </header>

        <div className={styles.bento}>
          <Card
            className={styles.a}
            index={0}
            ask="Own problems, not tickets"
            title="Idea to production in 21 days."
            inView={seen[0]}
            visual={<DaysStrip run={seen[0]} />}
          >
            Started as a problem, not a spec: AI-built sites look finished and fail silently.
            Live with accounts, public reports and a PDF certificate, then 2nd in the Hostinger
            21-Day Startup Challenge.
          </Card>

          <Card
            className={styles.b}
            index={1}
            ask="Move across the stack"
            title="Frontend to infra, one person."
            inView={seen[1]}
            visual={<StackFlow />}
          >
            Wherever the problem lived, that is where the work went, DNS and TLS included.
          </Card>

          <Card
            className={styles.c}
            index={2}
            ask="Build with agents, not autocomplete"
            title="The agent writes. I decide what survives."
            inView={seen[2]}
            visual={<AgentDiff />}
          >
            Claude Code wrote most of FixGuard. The skill is the review: three of these five
            lines were real proposals, and all three were cut.
          </Card>

          <Card
            className={styles.d}
            index={3}
            ask="Measure whether it worked"
            title="76 to 99 on its own site."
            inView={seen[3]}
            visual={<Gauge run={seen[3]} />}
          >
            Pointed at its own AI-built marketing page, then fixed one scoped prompt at a time.
            Metrics are bucketed per route and persisted, so the trend survives a deploy.
          </Card>

          <Card
            className={styles.e}
            index={4}
            ask="Testing discipline"
            title="Tests because the agent will break it again."
            inView={seen[4]}
            visual={<Checks run={seen[4]} />}
          >
            Two routes shipped returning 500 on every call and imported cleanly. Now a checker
            resolves names the way Python does, before anything ships.
          </Card>

          <Card
            className={styles.f}
            index={5}
            ask="Push back, explain it plainly"
            title="Says what it cannot confirm."
            inView={seen[5]}
            visual={<Report />}
          >
            The spec wanted inbox proof and three regions. Neither was provable, so both were
            cut, and every report says so in words a site owner understands.
          </Card>
        </div>

        <div className={styles.marquee} aria-label={`Ships with: ${STACK.join(", ")}`}>
          <p className={styles.marqueeLabel}>Ships with</p>
          <div className={styles.marqueeTrack} aria-hidden="true">
            <ul>
              {[...STACK, ...STACK].map((s, i) => (
                <li key={`${s}-${i}`}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
