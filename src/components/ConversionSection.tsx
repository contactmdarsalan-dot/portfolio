"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useState } from "react";

type IconName = "search" | "map" | "layout" | "cursor" | "refresh" | "target" | "checklist" | "test" | "issue" | "release";
type ProcessKey = "design" | "qa";

const processTabs = {
  design: {
    label: "Design",
    eyebrow: "Design Process",
    title: "Structure. Design. Validate.",
    note: "A simple system for turning unclear product moments into clean journeys.",
    signal: ["Research", "IA", "Wireframe", "Prototype", "Refine"],
    steps: [
      { icon: "search" as IconName, title: "Discover", text: "User need" },
      { icon: "map" as IconName, title: "Architecture", text: "Content paths" },
      { icon: "layout" as IconName, title: "Wireframe", text: "Screen order" },
      { icon: "cursor" as IconName, title: "Prototype", text: "Clickable path" },
      { icon: "refresh" as IconName, title: "Improve", text: "Sharper release" },
    ],
  },
  qa: {
    label: "QA",
    eyebrow: "QA Process",
    title: "Scope. Test. Report. Re-check.",
    note: "I validate the risky journeys before they reach users.",
    signal: ["Scope", "Test map", "Validate", "Report", "Re-check"],
    steps: [
      { icon: "target" as IconName, title: "Scope", text: "Risk paths" },
      { icon: "checklist" as IconName, title: "Plan", text: "Test map" },
      { icon: "test" as IconName, title: "Validate", text: "Real states" },
      { icon: "issue" as IconName, title: "Report", text: "Clear issues" },
      { icon: "release" as IconName, title: "Re-check", text: "Release ready" },
    ],
  },
};

const proofSignals = ["UX", "UI", "QA"];
const iaSignals = ["Goals", "Hierarchy", "Navigation", "States"];

function WorkIcon({ name }: { name: IconName }) {
  const paths: Record<IconName, string[]> = {
    search: ["M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z", "M16 16l4 4"],
    map: ["M4 6l5-2 6 2 5-2v14l-5 2-6-2-5 2z", "M9 4v14", "M15 6v14"],
    layout: ["M4 5h16v14H4z", "M4 10h16", "M10 10v9"],
    cursor: ["M6 4l12 8-5 1.2 3 5.2-2.4 1.4-3-5.2-3.6 3z"],
    refresh: ["M18 8a7 7 0 0 0-11.8-2.6L4 8", "M4 4v4h4", "M6 16a7 7 0 0 0 11.8 2.6L20 16", "M20 20v-4h-4"],
    target: ["M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z", "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M12 12h.01"],
    checklist: ["M8 7h12", "M8 12h12", "M8 17h12", "M4 7l1 1 2-3", "M4 12l1 1 2-3", "M4 17l1 1 2-3"],
    test: ["M9 3h6", "M10 3v5l-5 9a3 3 0 0 0 2.6 4.5h8.8A3 3 0 0 0 19 17l-5-9V3", "M8 15h8"],
    issue: ["M12 4v9", "M12 17h.01", "M10.3 3.8h3.4L21 18.5A2 2 0 0 1 19.2 21H4.8A2 2 0 0 1 3 18.5z"],
    release: ["M12 3l2.2 5.2 5.8.5-4.4 3.8 1.4 5.6-5-3-5 3 1.4-5.6L4 8.7l5.8-.5z"],
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {paths[name].map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}

export default function ConversionSection() {
  const [activeProcess, setActiveProcess] = useState<ProcessKey>("design");
  const currentProcess = processTabs[activeProcess];

  return (
    <section
      className="conversion-section process-focused-section"
      id="services"
      data-scroll-section
      data-section-reveal
    >
      <div className="process-focused-shell" aria-label="Design and QA process">
        <div className="process-focused-card" data-scroll data-reveal-item>
          <div className="process-focused-copy">
            <p className="section-pill">{currentProcess.eyebrow}</p>
            <h2>{currentProcess.title}</h2>
            <p>{currentProcess.note}</p>
          </div>

          <div className="process-portrait" data-scroll data-scroll-speed="-0.04" aria-hidden="true">
            <Image src="/frames/male0088.png" alt="" fill sizes="(max-width: 900px) 70vw, 26vw" />
            <span className="process-portrait-orbit" />
            <div className="process-proof-badges">
              {proofSignals.map((signal) => (
                <span key={signal}>{signal}</span>
              ))}
            </div>
          </div>
        </div>

        <div
          className="process-workbench process-workbench-centered"
          data-scroll
          data-scroll-class="is-inview"
          data-reveal-item
        >
          <div className="process-tabs" role="tablist" aria-label="Process tabs">
            {(Object.keys(processTabs) as ProcessKey[]).map((key) => (
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
                <WorkIcon name={key === "design" ? "layout" : "checklist"} />
                {processTabs[key].label}
              </button>
            ))}
          </div>

          <div
            className="process-panel process-panel-compact"
            role="tabpanel"
            id={`${activeProcess}-process-panel`}
            aria-labelledby={`${activeProcess}-process-tab`}
            key={activeProcess}
          >
            <div className="process-signal-row" aria-label={`${currentProcess.label} sequence`}>
              {currentProcess.signal.map((signal, index) => (
                <span key={signal}>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  {signal}
                </span>
              ))}
            </div>

            {activeProcess === "design" ? (
              <div className="process-ia-strip" aria-label="Information architecture layers">
                <strong>Information Architecture</strong>
                {iaSignals.map((signal) => (
                  <span key={signal}>{signal}</span>
                ))}
              </div>
            ) : null}

            <div className="process-step-grid process-step-grid-compact">
              {currentProcess.steps.map((step, index) => (
                <article key={step.title} className="process-step-card process-step-card-compact" style={{ "--step-index": index } as CSSProperties}>
                  <span className="process-step-icon">
                    <WorkIcon name={step.icon} />
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="process-cta-row" data-scroll data-reveal-item>
          <span>Need a cleaner flow?</span>
          <div className="conversion-actions">
            <a href="mailto:arsalan@ncell.com.np">Start a conversation</a>
            <a href="https://dribbble.com/MDArsalan" target="_blank" rel="noopener noreferrer">
              View Dribbble
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
