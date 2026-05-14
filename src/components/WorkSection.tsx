"use client";

import { projects } from "@/data/projects";
import Image from "next/image";
import { CSSProperties, useEffect, useRef } from "react";

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let context: { revert: () => void } | undefined;

    async function initWorkMotion() {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      if (!sectionRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".color-shift-heading").forEach((heading) => {
          gsap.fromTo(
            heading,
            { color: "#fffaf2" },
            {
              color: "#c6ff36",
              scrollTrigger: {
                trigger: heading,
                start: "top 78%",
                end: "bottom 28%",
                scrub: true,
              },
            },
          );
        });

        gsap.from(".work-ia-map span", {
          opacity: 0,
          x: -18,
          stagger: 0.08,
          duration: 0.58,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".work-ia-map",
            start: "top 84%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.utils.toArray<HTMLElement>(".portfolio-stack-card").forEach((card, index) => {
          gsap.from(card, {
            opacity: 0,
            y: 110,
            rotate: index % 2 === 0 ? -1.2 : 1.2,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });

          if (index < projects.length - 1) {
            gsap.to(card, {
              scale: 0.9 + Math.min(index, 8) * 0.006,
              opacity: 0.62,
              filter: "saturate(0.72) brightness(0.8)",
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 12%",
                end: "bottom 12%",
                scrub: true,
              },
            });
          }
        });
      }, sectionRef.current);
    }

    initWorkMotion();

    return () => context?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="work-showcase"
      id="work"
      data-scroll-section
      data-section-reveal
    >
      <div className="work-heading-row" data-reveal-item>
        <p className="section-pill">Portfolio</p>
        <span className="work-count">({String(projects.length).padStart(2, "0")})</span>
      </div>

      <div className="work-title-row" data-reveal-item>
        <h2 className="color-shift-heading">Work that stacks into proof.</h2>
        <p>
          A fast path through selected Dribbble shots: browse the visual signal,
          compare the product intent, then open the full shot when something
          needs a closer look.
        </p>
      </div>

      <div className="work-ia-map" aria-label="Work information architecture" data-reveal-item>
        <span>01 Browse</span>
        <span>02 Compare</span>
        <span>03 Open Dribbble</span>
        <span>04 Start a brief</span>
      </div>

      <div className="portfolio-stack" data-reveal-item>
        {projects.map((project, index) => (
          <article
            key={project.title}
            className={`portfolio-card portfolio-stack-card portfolio-card-${project.tone}`}
            style={
              {
                "--stack-index": index,
                "--stack-top": `${5.8 + Math.min(index, 8) * 0.22}rem`,
                zIndex: 20 + index,
              } as CSSProperties
            }
          >
            <div className="portfolio-stack-index">{String(index + 1).padStart(2, "0")}</div>
            <div className="portfolio-visual" data-parallax-soft="16">
              <Image
                src={project.thumbnail}
                alt={`${project.title} thumbnail`}
                fill
                sizes="(max-width: 768px) 100vw, 46vw"
              />
            </div>
            <div className="portfolio-stack-content">
              <p className="portfolio-kicker">{project.category}</p>
              <h3>{project.title}</h3>
              <p className="portfolio-result">{project.result}</p>
              <div className="portfolio-card-footer">
                <strong>{project.metric}</strong>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} on Dribbble`}
                >
                  Open shot
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
