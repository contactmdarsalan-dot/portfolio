"use client";

import {
  Bot,
  Bug,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Eye,
  FileText,
  FlaskConical,
  Gauge,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import styles from "./ConversionSection.module.css";

/**
 * Process: how a customer problem gets to production, in two loops - the
 * build loop with agents on the keyboard, and the QA loop that checks what
 * they wrote - because that pairing is the whole positioning.
 *
 * This used to sit over a frame-sequence canvas with a grey gradient wash,
 * a ghosted wordmark, and the steps stacked as five grey pills down the
 * right that clipped at the viewport edge. The canvas is gone (the
 * character belongs to the hero), the wash is gone (one ground for the whole
 * page), and the steps are laid out as what they are: a sequence, read left
 * to right along a rail, with the active one carrying the detail.
 */

type ProcessKey = "build" | "qa";

type ProcessStep = {
  icon: LucideIcon;
  title: string;
  label: string;
  point: string;
};

type ProcessTab = {
  label: string;
  eyebrow: string;
  title: string;
  note: string;
  steps: ProcessStep[];
};

const processKeys: ProcessKey[] = ["build", "qa"];

const processTabs: Record<ProcessKey, ProcessTab> = {
  build: {
    label: "Build",
    eyebrow: "Build loop",
    title: "Problem to production, with agents typing.",
    note: "Agents write a large share of the code. The work is deciding what to ask for, what to keep, and what to throw away.",
    steps: [
      { icon: FileText, title: "Frame", label: "Problem", point: "Write the spec in plain words, limits included" },
      { icon: Bot, title: "Delegate", label: "Agents", point: "Hand agents one bounded task at a time" },
      { icon: Eye, title: "Review", label: "Diff", point: "Read every change, send back what widens a claim" },
      { icon: ShieldCheck, title: "Prove", label: "Tests", point: "Pin behaviour with tests, run it on real sites" },
      { icon: Gauge, title: "Measure", label: "Metrics", point: "Ship, then watch the numbers, not the PR count" },
    ],
  },
  qa: {
    label: "QA",
    eyebrow: "Release loop",
    title: "Catch what breaks before a user does.",
    note: "The checks that run after the design looks finished, which is exactly when most screens are not.",
    steps: [
      { icon: Compass, title: "Scope", label: "Risk", point: "Choose the focus" },
      { icon: ClipboardCheck, title: "Plan", label: "Cases", point: "Write the checks" },
      { icon: FlaskConical, title: "Test", label: "State", point: "Validate the paths" },
      { icon: Bug, title: "Report", label: "Issue", point: "Make it visible" },
      { icon: CheckCircle2, title: "Ship", label: "Ready", point: "Re-check the fixes" },
    ],
  },
};

export default function ConversionSection() {
  const [activeProcess, setActiveProcess] = useState<ProcessKey>("build");
  const [activeStep, setActiveStep] = useState(0);
  const current = processTabs[activeProcess];
  const step = current.steps[activeStep] ?? current.steps[0];

  function switchProcess(key: ProcessKey) {
    setActiveProcess(key);
    setActiveStep(0);
  }

  return (
    <section className={styles.section} id="process" data-scroll-section>
      <div className={styles.inner}>
        <header className={styles.head}>
          <div>
            <p className={styles.kicker}>Process</p>
            <h2 className={styles.title} key={activeProcess}>
              {current.title}
            </h2>
            <p className={styles.lead}>{current.note}</p>
          </div>

          <div className={styles.switch} role="tablist" aria-label="Process loops">
            {processKeys.map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                id={`${key}-tab`}
                aria-selected={activeProcess === key}
                aria-controls="process-panel"
                className={activeProcess === key ? styles.switchOn : undefined}
                onClick={() => switchProcess(key)}
              >
                {processTabs[key].label}
              </button>
            ))}
          </div>
        </header>

        <ol
          className={styles.rail}
          id="process-panel"
          role="tabpanel"
          aria-labelledby={`${activeProcess}-tab`}
        >
          {current.steps.map((item, index) => {
            const Icon = item.icon;
            const on = index === activeStep;
            return (
              <li key={item.title} className={on ? styles.stepOn : styles.step}>
                <button type="button" onClick={() => setActiveStep(index)} aria-pressed={on}>
                  <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.dot} aria-hidden="true" />
                  <Icon size={18} strokeWidth={1.4} aria-hidden="true" className={styles.icon} />
                  <span className={styles.stepTitle}>{item.title}</span>
                  <span className={styles.stepPoint}>{item.point}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className={styles.detail} aria-live="polite">
          <span className={styles.detailIndex}>{String(activeStep + 1).padStart(2, "0")}</span>
          <div>
            <p className={styles.detailEyebrow}>{current.eyebrow}</p>
            <p className={styles.detailLine}>
              <strong>{step.title}.</strong> {step.point}.
            </p>
          </div>
          <span className={styles.detailLabel}>{step.label}</span>
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
