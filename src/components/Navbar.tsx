"use client";

import { useCallback, useEffect, useState } from "react";
import { resumeFile } from "@/data/profile";
import styles from "./Navbar.module.css";

/**
 * Floating island nav.
 *
 * The scroll-spy and hash-scroll logic below is unchanged from the previous
 * version; it was right. What changed is everything visible. The old bar was
 * a dark-theme component - grey glass, a dark logo pill, lime pills - sitting
 * on a page that is now white, with per-section tone classes that no longer
 * had anything to tone against. This one is white, uses the same marks as
 * the rest of the page (ink text, a lime dot for the active state, the ink
 * pill with a lime circle for the one primary action), and has a mobile menu,
 * which the old one did not.
 */

const navItems = [
  { label: "About", href: "#about", target: "hero" },
  { label: "Skills", href: "#skills", target: "skills" },
  { label: "Work", href: "#work", target: "work" },
  { label: "Process", href: "#process", target: "process" },
  { label: "Contact", href: "#contact", target: "contact" },
] as const;

const resumeContactProgress = 0.82;
const navIndexByTarget = {
  hero: 0,
  skills: 1,
  work: 2,
  process: 3,
  contact: 4,
} as const;

type NavTarget = keyof typeof navIndexByTarget;

const hashTargetMap: Record<string, NavTarget> = {
  "#about": "hero",
  "#skills": "skills",
  "#work": "work",
  "#process": "process",
  "#contact": "contact",
};

function getPinnedSectionTop(section: HTMLElement) {
  const pinSpacer = section.parentElement;
  const anchor = pinSpacer?.classList.contains("pin-spacer") ? pinSpacer : section;
  return Math.max(0, window.scrollY + anchor.getBoundingClientRect().top);
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const hero = document.querySelector('[data-story-root="hero"]') as HTMLElement | null;
      const work = document.querySelector("#work") as HTMLElement | null;
      const skills = document.querySelector("#skills") as HTMLElement | null;
      const process = document.querySelector("#process") as HTMLElement | null;
      const resume = document.querySelector("#resume") as HTMLElement | null;
      const anchor = window.innerHeight * 0.42;
      const isInView = (section: HTMLElement | null) => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= anchor && rect.bottom > anchor;
      };

      if (isInView(resume)) {
        setActiveChapter(navIndexByTarget.contact);
        return;
      }
      if (isInView(process)) {
        setActiveChapter(navIndexByTarget.process);
        return;
      }
      if (isInView(work)) {
        setActiveChapter(navIndexByTarget.work);
        return;
      }
      if (isInView(skills)) {
        setActiveChapter(navIndexByTarget.skills);
        return;
      }
      setActiveChapter(navIndexByTarget.hero);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const getTargetTop = useCallback((target: NavTarget) => {
    if (target === "contact") {
      // Contact lives at the foot of the resume section, which is a plain
      // section now rather than a pinned story, so its own anchor is enough.
      const contact = document.querySelector("#contact") as HTMLElement | null;
      return contact ? getPinnedSectionTop(contact) - 96 : null;
    }

    const section =
      target === "hero"
        ? (document.querySelector('[data-story-root="hero"]') as HTMLElement | null)
        : (document.querySelector(`#${target}`) as HTMLElement | null);

    return section ? getPinnedSectionTop(section) : null;
  }, []);

  const handleChapterClick = (target: NavTarget, hash: string) => {
    setOpen(false);
    const targetTop = getTargetTop(target);

    if (targetTop === null) {
      window.location.href = `/${hash}`;
      return;
    }

    window.history.replaceState(null, "", hash);
    setActiveChapter(navIndexByTarget[target]);
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  };

  useEffect(() => {
    const timers: number[] = [];

    const scrollToCurrentHash = () => {
      const target = hashTargetMap[window.location.hash];
      if (!target) return;

      const targetTop = getTargetTop(target);
      if (targetTop === null) return;

      setActiveChapter(navIndexByTarget[target]);
      window.scrollTo({ top: targetTop, behavior: "auto" });
    };

    const scheduleHashScroll = () => {
      timers.splice(0).forEach((timer) => window.clearTimeout(timer));
      window.requestAnimationFrame(scrollToCurrentHash);
      timers.push(window.setTimeout(scrollToCurrentHash, 280));
      timers.push(window.setTimeout(scrollToCurrentHash, 900));
      timers.push(window.setTimeout(scrollToCurrentHash, 1800));
      timers.push(window.setTimeout(scrollToCurrentHash, 3200));
    };

    scheduleHashScroll();
    window.addEventListener("hashchange", scheduleHashScroll);
    window.addEventListener("load", scheduleHashScroll);
    window.addEventListener("portfolio:layout-ready", scheduleHashScroll);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("hashchange", scheduleHashScroll);
      window.removeEventListener("load", scheduleHashScroll);
      window.removeEventListener("portfolio:layout-ready", scheduleHashScroll);
    };
  }, [getTargetTop]);

  // The open menu owns the viewport: the page behind it must not scroll, and
  // Escape has to close it, because a full-screen panel with no keyboard exit
  // is a trap for anyone not using a mouse.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ""} ${open ? styles.menuOpen : ""}`}
        id="navbar"
        aria-label="Primary"
      >
        <a
          href="#about"
          className={styles.wordmark}
          onClick={(event) => {
            event.preventDefault();
            handleChapterClick("hero", "#about");
          }}
        >
          <span className={styles.dot} aria-hidden="true" />
          <span>MD Arsalan</span>
        </a>

        <ul className={styles.links}>
          {navItems.map((item, index) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={activeChapter === index ? styles.linkOn : styles.link}
                aria-current={activeChapter === index ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  handleChapterClick(item.target, item.href);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.end}>
          <a
            className={`hero-cta hero-cta-primary ${styles.resume}`}
            href={resumeFile}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View resume"
          >
            <span>Resume</span>
            <span className="hero-cta-icon" aria-hidden="true">
              <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v8M4.5 7.5 8 11l3.5-3.5M3 13h10" />
              </svg>
            </span>
          </a>

          <button
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={open ? styles.sheetOpen : styles.sheet}
        aria-hidden={!open}
      >
        <ul className={styles.sheetLinks}>
          {navItems.map((item, index) => (
            <li key={item.href} style={{ transitionDelay: `${90 + index * 55}ms` }}>
              <a
                href={item.href}
                className={activeChapter === index ? styles.sheetLinkOn : undefined}
                tabIndex={open ? 0 : -1}
                onClick={(event) => {
                  event.preventDefault();
                  handleChapterClick(item.target, item.href);
                }}
              >
                <span className={styles.sheetIndex}>{String(index + 1).padStart(2, "0")}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          className={`hero-cta hero-cta-primary ${styles.sheetResume}`}
          href={resumeFile}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={open ? 0 : -1}
        >
          <span>Resume</span>
          <span className="hero-cta-icon" aria-hidden="true">
            <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3v8M4.5 7.5 8 11l3.5-3.5M3 13h10" />
            </svg>
          </span>
        </a>
      </div>
    </>
  );
}
