"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "About", href: "#about", root: "hero", chapter: 0 },
  { label: "Skills", href: "#skills", root: "skills", chapter: 0 },
  { label: "Work", href: "#work", root: "work", chapter: 0 },
  { label: "Process", href: "#process", root: "resume", chapter: 0 },
  { label: "Contact", href: "#contact", root: "resume", chapter: 1 },
];

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
        setActiveChapter(3 + Math.round(progress));
        setNavTone("resume");
        return;
      }

      if (isInView(work)) {
        setActiveChapter(2);
        setNavTone("work");
        return;
      }

      if (isInView(skills)) {
        setActiveChapter(1);
        setNavTone("skills");
        return;
      }

      if (isInView(hero)) {
        setActiveChapter(0);
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

  const handleChapterClick = (root: string, chapter: number, hash: string) => {
    const section =
      root === "work"
        ? (document.querySelector("#work") as HTMLElement | null)
        : root === "skills"
        ? (document.querySelector("#skills") as HTMLElement | null)
        : (document.querySelector(`[data-story-root="${root}"]`) as HTMLElement | null);


    if (!section) {
      window.location.href = `/${hash}`;
      return;
    }

    const storyLength = root === "resume" ? window.innerHeight * 2.6 : 0;
    const target =
      root === "resume"
        ? section.offsetTop + storyLength * (chapter / 1)
        : section.offsetTop;

    window.history.replaceState(null, "", hash);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <nav className={`navbar nav-${navTone} ${scrolled ? "scrolled" : ""}`} id="navbar">
      <a href="#about" className="nav-logo" onClick={(event) => {
        event.preventDefault();
        handleChapterClick("hero", 0, "#about");
      }}>
        <span>MD</span> ARSALAN
      </a>

      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={activeChapter === navItems.indexOf(item) ? "active" : ""}
              onClick={(event) => {
                event.preventDefault();
                handleChapterClick(item.root, item.chapter, item.href);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
