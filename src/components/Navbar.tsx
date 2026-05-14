"use client";

import { BriefcaseBusiness, Home, Send, Sparkles, Workflow } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { label: "About", href: "#about", target: "hero", icon: Home },
  { label: "Skills", href: "#skills", target: "skills", icon: Sparkles },
  { label: "Work", href: "#work", target: "work", icon: BriefcaseBusiness },
  { label: "Process", href: "#process", target: "process", icon: Workflow },
  { label: "Contact", href: "#contact", target: "contact", icon: Send },
];

const resumeContactProgress = 0.82;
const navIndexByTarget = {
  hero: 0,
  skills: 1,
  work: 2,
  process: 3,
  contact: 4,
} as const;

type NavTarget = keyof typeof navIndexByTarget;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [navTone, setNavTone] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const hero = document.querySelector('[data-story-root="hero"]') as HTMLElement | null;
      const work = document.querySelector("#work") as HTMLElement | null;
      const skills = document.querySelector("#skills") as HTMLElement | null;
      const process = document.querySelector("#process") as HTMLElement | null;
      const resume = document.querySelector('[data-story-root="resume"]') as HTMLElement | null;
      const anchor = window.innerHeight * 0.42;
      const isInView = (section: HTMLElement | null) => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= anchor && rect.bottom > anchor;
      };

      if (isInView(resume) && resume) {
        const storyLength = window.innerHeight * 2.6;
        const progress = Math.min(1, Math.max(0, (window.scrollY - resume.offsetTop) / storyLength));
        setActiveChapter(progress >= resumeContactProgress ? navIndexByTarget.contact : -1);
        setNavTone("resume");
        return;
      }

      if (isInView(process)) {
        setActiveChapter(navIndexByTarget.process);
        setNavTone("work");
        return;
      }

      if (isInView(work)) {
        setActiveChapter(navIndexByTarget.work);
        setNavTone("work");
        return;
      }

      if (isInView(skills)) {
        setActiveChapter(navIndexByTarget.skills);
        setNavTone("skills");
        return;
      }

      if (isInView(hero)) {
        setActiveChapter(navIndexByTarget.hero);
        setNavTone("hero");
        return;
      }

      setActiveChapter(0);
      setNavTone("hero");
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const getTargetTop = (target: NavTarget) => {
    if (target === "contact") {
      const resume = document.querySelector('[data-story-root="resume"]') as HTMLElement | null;
      if (!resume) return null;
      return resume.offsetTop + window.innerHeight * 2.6 * resumeContactProgress;
    }

    const section =
      target === "hero"
        ? (document.querySelector('[data-story-root="hero"]') as HTMLElement | null)
        : (document.querySelector(`#${target}`) as HTMLElement | null);

    if (!section) {
      return null;
    }

    return section.offsetTop;
  };

  const handleChapterClick = (target: NavTarget, hash: string) => {
    const targetTop = getTargetTop(target);

    if (targetTop === null) {
      window.location.href = `/${hash}`;
      return;
    }

    window.history.replaceState(null, "", hash);
    setActiveChapter(navIndexByTarget[target]);
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  };

  return (
    <nav className={`navbar nav-${navTone} ${scrolled ? "scrolled" : ""}`} id="navbar">
      <a href="#about" className="nav-logo" onClick={(event) => {
        event.preventDefault();
        handleChapterClick("hero", "#about");
      }}>
        <span>MD</span> ARSALAN
      </a>

      <ul className="nav-links">
        {navItems.map((item, index) => {
          const Icon = item.icon;

          return (
          <li key={item.href}>
            <a
              href={item.href}
              className={activeChapter === index ? "active" : ""}
              onClick={(event) => {
                event.preventDefault();
                handleChapterClick(item.target as NavTarget, item.href);
              }}
            >
              <Icon className="nav-link-icon" size={15} aria-hidden="true" />
              {item.label}
            </a>
          </li>
          );
        })}
      </ul>
    </nav>
  );
}
