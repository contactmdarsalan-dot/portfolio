"use client";

import {
  Bug,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  FileSearch,
  FlaskConical,
  Layers3,
  MousePointer2,
  RefreshCw,
  Route,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import styles from "./ConversionSection.module.css";

/**
 * Process: how a screen gets from a messy moment to a shipped one, in two
 * loops - design and QA - because that pairing is the whole positioning.
 *
 * This used to sit over a frame-sequence canvas with a grey gradient wash,
 * a ghosted wordmark, and the steps stacked as five grey pills down the
 * right that clipped at the viewport edge. The canvas is gone (the
 * character belongs to the hero), the wash is gone (one ground for the whole
 * page), and the steps are laid out as what they are: a sequence, read left
 * to right along a rail, with the active one carrying the detail.
 */

type ProcessKey = "design" | "qa";

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

const processKeys: ProcessKey[] = ["design", "qa"];

const processTabs: Record<ProcessKey, ProcessTab> = {
  design: {
    label: "Design",
    eyebrow: "Design loop",
    title: "From a messy moment to a usable screen.",
    note: "Five passes, each one narrowing what the screen has to do until it does only that.",
    steps: [
      { icon: FileSearch, title: "Discover", label: "Need", point: "Find the friction" },
      { icon: Route, title: "Map", label: "Flow", point: "Shape the path" },
      { icon: Layers3, title: "Frame", label: "UI", point: "Set the hierarchy" },
      { icon: MousePointer2, title: "Prototype", label: "Click", point: "Test the motion" },
      { icon: RefreshCw, title: "Refine", label: "Ready", point: "Clean the release" },
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
  const [activeProcess, setActiveProcess] = useState<ProcessKey>("design");
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
          <a className="hero-cta hero-cta-primary" href="mailto:contactmdarsalan@gmail.com">
            <span>Start a brief</span>
            <span className="hero-cta-icon" aria-hidden="true">
              <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12 12 4M6 4h6v6" />
              </svg>
            </span>
          </a>
          <a className="hero-cta hero-cta-ghost" href="tel:+9779713159720">
            Book a call
          </a>
        </div>
      </div>
    </section>
  );
}
