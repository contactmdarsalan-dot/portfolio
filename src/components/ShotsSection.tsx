"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import styles from "./ShotsSection.module.css";

/**
 * Dribbble explorations as a rail.
 *
 * Eighteen design studies in one horizontal, snapping row: big enough to
 * see the work, short enough that the page stays a page. Arrows and a
 * progress bar show where you are; trackpads and touch scroll it natively.
 */

export default function ShotsSection() {
  const railRef = useRef<HTMLUListElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [current, setCurrent] = useState(1);

  const measure = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    setProgress(p);
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft > max - 8);
    const first = el.querySelector<HTMLElement>("li");
    const step = first ? first.offsetWidth : el.clientWidth;
    setCurrent(Math.min(projects.length, Math.round(el.scrollLeft / step) + 1));
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  function nudge(dir: 1 | -1) {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <section className={styles.section} id="shots" data-scroll-section>
      <div className={styles.inner}>
        <header className={styles.head}>
          <div>
            <p className={styles.kicker}>Design explorations</p>
            <h2 className={styles.title}>
              Interface studies, <span className={styles.titleSoft}>on Dribbble.</span>
            </h2>
          </div>
          <div className={styles.headSide}>
            <p className={styles.lead}>
              Concepts and visual studies, separate from the shipped products. Each opens a
              short write-up of the thinking behind it.
            </p>
            <div className={styles.controls}>
              <span className={styles.counter} aria-live="polite">
                <b>{String(current).padStart(2, "0")}</b> / {String(projects.length).padStart(2, "0")}
              </span>
              <button type="button" onClick={() => nudge(-1)} disabled={atStart} aria-label="Previous studies">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M10 3 5 8l5 5" />
                </svg>
              </button>
              <button type="button" onClick={() => nudge(1)} disabled={atEnd} aria-label="Next studies">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m6 3 5 5-5 5" />
                </svg>
              </button>
            </div>
          </div>
        </header>
      </div>

      <ul ref={railRef} className={styles.rail} aria-label="Design studies">
        {projects.map((p, i) => (
          <li key={p.slug} className={styles.slide}>
            <Link href={`/work/${p.slug}`} className={styles.card}>
              <span className={styles.frame}>
                <Image
                  src={p.thumbnail}
                  alt=""
                  fill
                  sizes="(max-width: 48rem) 80vw, 26rem"
                  className={styles.shot}
                  priority={i < 3}
                />
                <span className={styles.shade} aria-hidden="true" />
                <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.cta} aria-hidden="true">
                  Read the study
                  <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12 12 4M6 4h6v6" />
                  </svg>
                </span>
              </span>
              <span className={styles.meta}>
                <span className={styles.category}>{p.category}</span>
                <span className={styles.name}>{p.title}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.inner}>
        <div className={styles.progress} aria-hidden="true">
          <span style={{ transform: `scaleX(${0.08 + progress * 0.92})` }} />
        </div>
      </div>
    </section>
  );
}
