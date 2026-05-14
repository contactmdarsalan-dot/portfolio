"use client";

import { useEffect } from "react";

const skillGroups = [
  {
    title: "Experience",
    summary: "Finding the moment users hesitate, then making the next action feel obvious.",
    items: ["Journey mapping", "Wireframes", "Usability tests"],
  },
  {
    title: "Interface",
    summary: "Designing clean screens, strong hierarchy, and systems that teams can reuse.",
    items: ["Figma", "Design systems", "Prototypes"],
  },
  {
    title: "Quality",
    summary: "Thinking like QA early so the product feels safer before it reaches users.",
    items: ["Cypress", "Postman", "JIRA"],
  },
];

export default function SkillsSection() {
  useEffect(() => {
    async function initSkillsMotion() {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.utils.toArray<HTMLElement>(".skill-system-card").forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 70,
          rotate: index === 1 ? 1.5 : -1.5,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }

    initSkillsMotion();
  }, []);

  return (
    <section className="skills-showcase" id="skills" data-scroll-section data-section-reveal>
      <div className="skills-heading" data-reveal-item>
        <p className="section-pill">Skill Stack</p>
        <h2 className="color-shift-heading">UX skills, built for release.</h2>
        <p>
          A practical mix of product thinking, interface craft, and quality checks.
          The goal is not more screens. The goal is fewer user doubts.
        </p>
      </div>

      <div className="skill-system-grid">
        {skillGroups.map((group, index) => (
          <article key={group.title} className="skill-system-card" data-reveal-item>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{group.title}</h3>
            <p>{group.summary}</p>
            <div>
              {group.items.map((item) => (
                <b key={item}>{item}</b>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
