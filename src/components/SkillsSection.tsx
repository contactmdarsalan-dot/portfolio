"use client";

import { useEffect, useRef } from "react";

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
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let context: { revert: () => void } | undefined;
    let mediaCleanup: (() => void) | undefined;

    async function initSkillsMotion() {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      context = gsap.context(() => {
        const grid = sectionRef.current?.querySelector<HTMLElement>(".skill-system-grid");
        const cards = gsap.utils.toArray<HTMLElement>(".skill-system-card");

        cards.forEach((card) => {
          const cardParts = card.querySelectorAll<HTMLElement>("span, h3, p, div");

          gsap.from(cardParts, {
            opacity: 0,
            y: 34,
            stagger: 0.06,
            duration: 0.72,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
        });

        const media = gsap.matchMedia();
        media.add("(min-width: 769px)", () => {
          if (!grid) return;

          const stackTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=92%",
              scrub: true,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          stackTimeline.to(
            cards,
            {
              x: (_index, card) => {
                const gridBounds = grid.getBoundingClientRect();
                const cardBounds = (card as HTMLElement).getBoundingClientRect();
                const cardCenter = cardBounds.left - gridBounds.left + cardBounds.width / 2;

                return gridBounds.width / 2 - cardCenter;
              },
              y: (index) => index * -26,
              rotate: (index) => [-4, 0, 4][index] ?? 0,
              scale: (index) => 1 - index * 0.035,
              filter: (index) => (index === 0 ? "none" : "saturate(0.9) brightness(0.94)"),
              ease: "none",
              stagger: 0.02,
            },
            0,
          );

          stackTimeline.to(
            ".skills-heading",
            {
              y: -34,
              opacity: 0.84,
              ease: "none",
            },
            0,
          );

          return () => stackTimeline.kill();
        });

        media.add("(max-width: 768px)", () => {
          if (!cards.length) return;

          const tweens: Array<{ kill: () => void }> = [];

          cards.forEach((card, index) => {
            gsap.set(card, {
              transformOrigin: "center top",
              zIndex: 10 + index,
            });

            tweens.push(
              gsap.fromTo(
                card,
                {
                  opacity: 0.84,
                  y: 46,
                  rotate: index % 2 === 0 ? -2.2 : 2.2,
                  scale: 0.97,
                },
                {
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: card,
                    start: "top 92%",
                    end: "top 54%",
                    scrub: true,
                  },
                },
              ),
            );

            if (index < cards.length - 1) {
              tweens.push(
                gsap.to(card, {
                  scale: 0.92 + index * 0.025,
                  y: -16 - index * 8,
                  opacity: 0.76,
                  filter: "saturate(0.9) brightness(0.95)",
                  ease: "none",
                  scrollTrigger: {
                    trigger: cards[index + 1],
                    start: "top 80%",
                    end: "top 36%",
                    scrub: true,
                  },
                }),
              );
            }
          });

          ScrollTrigger.refresh();

          return () => tweens.forEach((tween) => tween.kill());
        });
        mediaCleanup = () => media.revert();
      }, sectionRef.current);
    }

    initSkillsMotion();

    return () => {
      mediaCleanup?.();
      context?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="skills-showcase" id="skills" data-scroll-section data-section-reveal>
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
          <article key={group.title} className="skill-system-card">
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
