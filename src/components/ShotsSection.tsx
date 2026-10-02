"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { projects } from "@/data/projects";
import styles from "./ShotsSection.module.css";

/**
 * Dribbble explorations. These are design studies without a backend, so
 * they sit after the shipped products and the process, as a gallery.
 *
 * Replaced a sticky stack of eighteen full-width cards on a dark gradient
 * left over from the old palette: the stack left a viewport of empty space
 * before the resume, the labels were ink on near-ink, and a row of fake
 * steps ("01 Browse, 02 Compare...") described nothing the reader could do.
 *
 * Six show by default. The rest are one click away, which keeps the page
 * to a length a hiring manager will actually scroll.
 */

const INITIAL = 6;

export default function ShotsSection() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? projects : projects.slice(0, INITIAL);

  return (
    <section className={styles.section} id="shots" data-scroll-section>
      <div className={styles.inner}>
        <header className={styles.head}>
          <div>
            <p className={styles.kicker}>Design explorations</p>
            <h2 className={styles.title}>Interface studies, on Dribbble.</h2>
          </div>
          <p className={styles.lead}>
            Concepts and visual studies, separate from the shipped products
            above. Each opens a short write-up of the thinking behind it.
          </p>
        </header>

        <ul className={styles.grid}>
          {visible.map((p, i) => (
            <li key={p.slug} className={styles.card}>
              <Link href={`/work/${p.slug}`} className={styles.cardLink} aria-label={`${p.title} case study`}>
                <span className={styles.frame}>
                  <Image
                    src={p.thumbnail}
                    alt=""
                    width={800}
                    height={600}
                    sizes="(max-width: 48rem) 100vw, (max-width: 64rem) 50vw, 33vw"
                    className={styles.shot}
                    priority={i < 3}
                  />
                </span>
                <span className={styles.body}>
                  <span className={styles.category}>{p.category}</span>
                  <span className={styles.name}>{p.title}</span>
                  <span className={styles.more}>
                    Read the study
                    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {projects.length > INITIAL && (
          <div className={styles.footer}>
            <button
              type="button"
              className={`hero-cta ${showAll ? "hero-cta-ghost" : "hero-cta-primary"}`}
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
            >
              <span>{showAll ? "Show fewer" : `Show all ${projects.length}`}</span>
              {!showAll && (
                <span className="hero-cta-icon" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 3v10M4 9l4 4 4-4" />
                  </svg>
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
