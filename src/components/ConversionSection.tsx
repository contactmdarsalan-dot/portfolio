"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./ConversionSection.module.css";

/**
 * Process, drawn rather than listed.
 *
 * Two loops - Build and QA - each shown as a pipeline with its feedback
 * paths made explicit, because the feedback is the part that separates a
 * process from a checklist: in Build, Review sends work back to Delegate
 * and Measure sends the next problem back to Frame; in QA, Report sends
 * the fix back to Test. The diagram is the thing you would draw on a
 * whiteboard; the panel beneath says what goes in, what comes out, what
 * the person does, and where it actually happened on FixGuard.
 *
 * The step advances on its own every few seconds until the reader touches
 * anything, so the diagram reads itself for someone who only scrolls past.
 */

type LoopKey = "build" | "qa";

type Step = {
  id: string;
  title: string;
  input: string;
  output: string;
  does: string;
  example: string;
};

type Loop = {
  label: string;
  eyebrow: string;
  title: string;
  note: string;
  steps: Step[];
  /** Feedback edges as [fromIndex, toIndex, label]. */
  feedback: [number, number, string][];
};

const loops: Record<LoopKey, Loop> = {
  build: {
    label: "Build",
    eyebrow: "Build loop",
    title: "Problem to production, with agents typing.",
    note: "Agents write a large share of the code. The work is deciding what to ask for, what to keep, and what to throw away.",
    steps: [
      {
        id: "frame",
        title: "Frame",
        input: "A customer problem",
        output: "A written brief, limits included",
        does: "Say what the user should see, what the system has to prove, and what it must admit when it cannot. Plain words; no vibe.",
        example: "Every FixGuard brief said what the report must state when a check cannot confirm something. That line shaped the product more than any feature.",
      },
      {
        id: "delegate",
        title: "Delegate",
        input: "The brief",
        output: "A diff from the agent",
        does: "Hand one bounded task to the agent at a time. Small enough to read in one sitting; never the whole feature.",
        example: "Claude Code produced most of the FastAPI backend, the Playwright extraction and the React dashboard from those briefs.",
      },
      {
        id: "review",
        title: "Review",
        input: "The diff",
        output: "Kept, or thrown away",
        does: "Read every change. Anything that quietly widens a claim the product cannot back goes back with a tighter brief.",
        example: "Inbox-delivery verification, three-region reachability, Redis and a job queue were all generated or planned, and all cut.",
      },
      {
        id: "prove",
        title: "Prove",
        input: "What was kept",
        output: "Tests, and a run on real sites",
        does: "Pin behaviour the agent could break next time. Point the build at pages known to be fine as well as pages known to be broken.",
        example: "36 unit checks. Three detector false positives, each pinned with a test. A scope checker that resolves names the way Python does.",
      },
      {
        id: "measure",
        title: "Measure",
        input: "The shipped build",
        output: "Numbers, and the next problem",
        does: "Watch what the user got, not the PR count. Keep the metrics across deploys so the trend is real.",
        example: "Own marketing page 76 then 99 after six rounds. Median audit 22.6 seconds. Latency percentiles bucketed per route and persisted.",
      },
    ],
    feedback: [
      [2, 1, "Discard, re-brief"],
      [4, 0, "Next problem"],
    ],
  },
  qa: {
    label: "QA",
    eyebrow: "Release loop",
    title: "Catch what breaks before a user does.",
    note: "The checks that run after a screen looks finished, which is exactly when most screens are not.",
    steps: [
      {
        id: "scope",
        title: "Scope",
        input: "A release candidate",
        output: "A ranked risk list",
        does: "Decide which paths hurt the user most if wrong, and test those first. Everything cannot be first.",
        example: "Forms and the route crawl came before accessibility and performance: a visitor who cannot submit does not care about contrast.",
      },
      {
        id: "plan",
        title: "Plan",
        input: "The risk list",
        output: "Cases, with expected results",
        does: "Write the check before running it, including what a pass looks like. A test with no expectation always passes.",
        example: "Thresholds a live site cannot exercise - score bands, tap-target minimums, TLS expiry windows - became unit checks.",
      },
      {
        id: "test",
        title: "Test",
        input: "The cases",
        output: "Evidence per result",
        does: "Run on real pages, including pages known to be fine, because a checker that flags everything is ignored within a week.",
        example: "Contrast was being measured mid-fade; a skip link was reported as an unhittable tap target. Both found by testing known-good pages.",
      },
      {
        id: "report",
        title: "Report",
        input: "The evidence",
        output: "A finding someone can act on",
        does: "One element, one property, one expected value. A report that cannot be acted on is noise.",
        example: "Every lost point in a FixGuard report traces to a specific request or element, and each becomes one scoped prompt.",
      },
      {
        id: "ship",
        title: "Ship",
        input: "The fixes",
        output: "A re-check, then release",
        does: "Re-run the failing cases after the fix, not the whole suite by habit. Then release, and keep the before and after.",
        example: "Six rounds of scoped fixes on its own site, each re-audited: 76 to 99, with the comparison kept in the report.",
      },
    ],
    feedback: [
      [3, 2, "Fix, re-check"],
      [4, 0, "Next release"],
    ],
  },
};

const loopKeys: LoopKey[] = ["build", "qa"];
const AUTO_MS = 4200;

/* ---------------------------------------------------------- diagram */

// Geometry for the SVG. Five nodes on one baseline, feedback arcs below.
const W = 1200;
const NODE_W = 176;
const NODE_H = 72;
const NODE_Y = 24;
const GAP = (W - 5 * NODE_W) / 4;
const ARC_Y = [150, 196]; // two feedback lanes

function nodeX(i: number) {
  return i * (NODE_W + GAP);
}

function Diagram({ loop, active, onPick }: { loop: Loop; active: number; onPick: (i: number) => void }) {
  return (
    <svg
      className={styles.diagram}
      viewBox={`0 0 ${W} 230`}
      role="img"
      aria-label={`${loop.label} loop: ${loop.steps.map((s) => s.title).join(", ")}; ${loop.feedback
        .map(([f, t, l]) => `${loop.steps[f].title} back to ${loop.steps[t].title} (${l})`)
        .join("; ")}`}
    >
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5 0 10z" fill="currentColor" />
        </marker>
        <marker id="arrowLime" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5 0 10z" fill="#c6ff36" />
        </marker>
      </defs>

      {/* forward edges */}
      {loop.steps.slice(0, -1).map((_, i) => {
        const x1 = nodeX(i) + NODE_W;
        const x2 = nodeX(i + 1);
        const y = NODE_Y + NODE_H / 2;
        const on = i === active - 1 || i === active;
        return (
          <g key={`e${i}`} className={on ? styles.edgeOn : styles.edge}>
            <line x1={x1 + 4} y1={y} x2={x2 - 6} y2={y} markerEnd="url(#arrow)" />
          </g>
        );
      })}

      {/* feedback arcs */}
      {loop.feedback.map(([from, to, label], k) => {
        const xs = nodeX(from) + NODE_W / 2;
        const xe = nodeX(to) + NODE_W / 2;
        const yTop = NODE_Y + NODE_H;
        const yArc = ARC_Y[k];
        const on = active === from || active === to;
        const d = `M${xs} ${yTop + 4} V${yArc} H${xe} V${yTop + 10}`;
        return (
          <g key={`f${k}`} className={on ? styles.feedbackOn : styles.feedback}>
            <path d={d} fill="none" markerEnd={on ? "url(#arrowLime)" : "url(#arrow)"} />
            <text x={(xs + xe) / 2} y={yArc - 8} textAnchor="middle" className={styles.feedbackLabel}>
              {label}
            </text>
          </g>
        );
      })}

      {/* nodes */}
      {loop.steps.map((s, i) => {
        const x = nodeX(i);
        const on = i === active;
        const done = i < active;
        return (
          <g
            key={s.id}
            className={on ? styles.nodeOn : done ? styles.nodeDone : styles.node}
            transform={`translate(${x} ${NODE_Y})`}
            onClick={() => onPick(i)}
            style={{ cursor: "pointer" }}
          >
            <rect width={NODE_W} height={NODE_H} rx={18} />
            <text x={20} y={28} className={styles.nodeIndex}>
              {String(i + 1).padStart(2, "0")}
            </text>
            <text x={20} y={54} className={styles.nodeTitle}>
              {s.title}
            </text>
            {on && <circle cx={NODE_W - 22} cy={22} r={5} className={styles.nodePulse} />}
          </g>
        );
      })}
    </svg>
  );
}

/* --------------------------------------------------------- section */

export default function ConversionSection() {
  const [loopKey, setLoopKey] = useState<LoopKey>("build");
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const sectionRef = useRef<HTMLElement | null>(null);
  const loop = loops[loopKey];
  const step = loop.steps[active] ?? loop.steps[0];

  // Advance on a timer only while the section is on screen and untouched.
  useEffect(() => {
    if (!auto) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = sectionRef.current;
    if (!el) return;
    let timer: number | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        window.clearInterval(timer);
        if (entry.isIntersecting) {
          timer = window.setInterval(() => setActive((i) => (i + 1) % loop.steps.length), AUTO_MS);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [auto, loop.steps.length]);

  function pick(i: number) {
    setAuto(false);
    setActive(i);
  }

  function switchLoop(key: LoopKey) {
    setAuto(false);
    setLoopKey(key);
    setActive(0);
  }

  return (
    <section ref={sectionRef} className={styles.section} id="process" data-scroll-section>
      <div className={styles.inner}>
        <header className={styles.head}>
          <div>
            <p className={styles.kicker}>Process</p>
            <h2 className={styles.title} key={loopKey}>
              {loop.title}
            </h2>
            <p className={styles.lead}>{loop.note}</p>
          </div>

          <div className={styles.switch} role="tablist" aria-label="Process loops">
            {loopKeys.map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                id={`${key}-tab`}
                aria-selected={loopKey === key}
                aria-controls="process-panel"
                className={loopKey === key ? styles.switchOn : undefined}
                onClick={() => switchLoop(key)}
              >
                {loops[key].label}
              </button>
            ))}
          </div>
        </header>

        <div id="process-panel" role="tabpanel" aria-labelledby={`${loopKey}-tab`} className={styles.panel}>
          <Diagram loop={loop} active={active} onPick={pick} />

          {/* The same five steps as controls: the SVG is a picture, this is
              the thing keyboards and phones use. */}
          <ol className={styles.stepper} aria-label={`${loop.label} steps`}>
            {loop.steps.map((s, i) => (
              <li key={s.id} className={i === active ? styles.stepOn : i < active ? styles.stepDone : styles.step}>
                <button type="button" onClick={() => pick(i)} aria-current={i === active ? "step" : undefined}>
                  <span className={styles.stepIndex}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.stepTitle}>{s.title}</span>
                  <span className={styles.stepOut}>{s.output}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className={styles.detail} aria-live="polite" key={`${loopKey}-${step.id}`}>
            <div className={styles.detailHead}>
              <span className={styles.detailIndex}>{String(active + 1).padStart(2, "0")}</span>
              <div>
                <p className={styles.detailEyebrow}>{loop.eyebrow}</p>
                <h3 className={styles.detailTitle}>{step.title}</h3>
              </div>
            </div>

            <div className={styles.cols}>
              <div className={styles.col}>
                <p className={styles.colLabel}>In, out</p>
                <dl className={styles.io}>
                  <div>
                    <dt>In</dt>
                    <dd>{step.input}</dd>
                  </div>
                  <div>
                    <dt>Out</dt>
                    <dd>{step.output}</dd>
                  </div>
                </dl>
              </div>
              <div className={styles.col}>
                <p className={styles.colLabel}>What I do</p>
                <p className={styles.colText}>{step.does}</p>
              </div>
              <div className={`${styles.col} ${styles.colExample}`}>
                <p className={styles.colLabel}>On FixGuard</p>
                <p className={styles.colText}>{step.example}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Link className="hero-cta hero-cta-primary" href="/products/fixguard">
            <span>See the loop on FixGuard</span>
            <span className="hero-cta-icon" aria-hidden="true">
              <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12 12 4M6 4h6v6" />
              </svg>
            </span>
          </Link>
          <a className="hero-cta hero-cta-ghost" href="mailto:contactmdarsalan@gmail.com">
            Email me
          </a>
        </div>
      </div>
    </section>
  );
}
