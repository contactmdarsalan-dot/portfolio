"use client";

import {
  ArrowUpRight,
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
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useState } from "react";

type ProcessKey = "design" | "qa";

const processTabs = {
  design: {
    label: "Design",
    eyebrow: "Design Sprint",
    title: "Make the journey feel obvious.",
    note: "A fast UX loop for finding friction, shaping the path, and polishing the release.",
    icon: Layers3,
    accent: "Journey",
    stat: "5 steps",
    signal: ["Research", "IA", "Wireframe", "Prototype", "Refine"],
    steps: [
      { icon: FileSearch, title: "Discover", text: "Needs" },
      { icon: Route, title: "Map", text: "Flow" },
      { icon: Layers3, title: "Frame", text: "Screens" },
      { icon: MousePointer2, title: "Prototype", text: "Clicks" },
      { icon: RefreshCw, title: "Refine", text: "Launch" },
    ],
  },
  qa: {
    label: "QA",
    eyebrow: "QA Flow",
    title: "Catch the risk before users do.",
    note: "Focused checks for the paths, states, and details that shape trust.",
    icon: ClipboardCheck,
    accent: "Release",
    stat: "Risk-first",
    signal: ["Scope", "Plan", "Validate", "Report", "Re-check"],
    steps: [
      { icon: Compass, title: "Scope", text: "Risk" },
      { icon: ClipboardCheck, title: "Plan", text: "Cases" },
      { icon: FlaskConical, title: "Test", text: "States" },
      { icon: Bug, title: "Report", text: "Issues" },
      { icon: CheckCircle2, title: "Ship", text: "Ready" },
    ],
  },
};

const proofSignals = ["UX", "QA", "Flow"];
const pathSignals = ["Goal", "Path", "State", "Proof"];

export default function ConversionSection() {
  const [activeProcess, setActiveProcess] = useState<ProcessKey>("design");
  const currentProcess = processTabs[activeProcess];
  const ActiveIcon = currentProcess.icon;

  return (
    <section
      className="conversion-section process-focused-section"
      id="process"
      data-scroll-section
      data-section-reveal
    >
      <div className="process-focused-shell process-lab-shell" aria-label="Design and QA process">
        <div className="process-lab-header" data-scroll data-reveal-item>
          <p className="section-pill">
            <Sparkles size={14} aria-hidden="true" />
            Process Lab
          </p>
          <h2>Explore the way work gets sharper.</h2>
          <p>Switch modes, scan the path, and see how ideas move from messy to ready.</p>
        </div>

        <div className="process-lab-grid" data-scroll data-reveal-item>
          <aside className="process-visual-panel" aria-label={`${currentProcess.label} profile`}>
            <div className="process-visual-frame" data-scroll data-scroll-speed="-0.04">
              <Image src="/frames/male0088.png" alt="Cyberfiction portrait representing product focus" fill sizes="(max-width: 900px) 92vw, 34vw" />
              <span className="process-portrait-orbit" />
              <div className="process-proof-badges">
                {proofSignals.map((signal) => (
                  <span key={signal}>{signal}</span>
                ))}
              </div>
            </div>

            <div className="process-mini-board">
              <span>{currentProcess.accent}</span>
              <strong>{currentProcess.stat}</strong>
              <p>{currentProcess.label === "Design" ? "Cleaner decisions" : "Safer releases"}</p>
            </div>
          </aside>

          <div className="process-explorer">
            <div className="process-tabs process-mode-tabs" role="tablist" aria-label="Process tabs">
              {(Object.keys(processTabs) as ProcessKey[]).map((key) => {
                const TabIcon = processTabs[key].icon;

                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    id={`${key}-process-tab`}
                    aria-selected={activeProcess === key}
                    aria-controls={`${key}-process-panel`}
                    className={activeProcess === key ? "is-active" : ""}
                    onClick={() => setActiveProcess(key)}
                  >
                    <TabIcon size={18} aria-hidden="true" />
                    {processTabs[key].label}
                  </button>
                );
              })}
            </div>

            <div
              className="process-panel process-panel-compact process-lab-panel"
              role="tabpanel"
              id={`${activeProcess}-process-panel`}
              aria-labelledby={`${activeProcess}-process-tab`}
              key={activeProcess}
            >
              <div className="process-panel-hero">
                <span className="process-panel-icon">
                  <ActiveIcon size={22} aria-hidden="true" />
                </span>
                <div>
                  <p>{currentProcess.eyebrow}</p>
                  <h3>{currentProcess.title}</h3>
                </div>
              </div>

              <div className="process-path-strip" aria-label={`${currentProcess.label} path`}>
                {pathSignals.map((signal) => (
                  <span key={signal}>{signal}</span>
                ))}
              </div>

              <div className="process-signal-row" aria-label={`${currentProcess.label} sequence`}>
                {currentProcess.signal.map((signal, index) => (
                  <span key={signal}>
                    <b>{String(index + 1).padStart(2, "0")}</b>
                    {signal}
                  </span>
                ))}
              </div>

              <div className="process-step-grid process-step-grid-compact">
                {currentProcess.steps.map((step, index) => {
                  const StepIcon = step.icon;

                  return (
                    <article
                      key={step.title}
                      className="process-step-card process-step-card-compact"
                      style={{ "--step-index": index } as CSSProperties}
                    >
                      <span className="process-step-icon">
                        <StepIcon size={20} aria-hidden="true" />
                      </span>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="process-cta-row process-lab-cta" data-scroll data-reveal-item>
          <span>Ready for a cleaner flow?</span>
          <div className="conversion-actions">
            <a href="mailto:contactmdarsalan@gmail.com">
              Start a conversation
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a href="tel:+9779713159720">
              Call +977 9713159720
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
