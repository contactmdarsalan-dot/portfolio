"use client";

import { projects } from "@/data/projects";
import Image from "next/image";
import { useEffect } from "react";

export default function WorkSection() {
  useEffect(() => {
    async function initWorkMotion() {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.utils.toArray<HTMLElement>(".color-shift-heading").forEach((heading) => {
        gsap.fromTo(
          heading,
          { color: "#17131f" },
          {
            color: "#ff4d8d",
            scrollTrigger: {
              trigger: heading,
              start: "top 78%",
              end: "bottom 28%",
              scrub: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".portfolio-card").forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 80,
          rotate: index % 2 === 0 ? -2 : 2,
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

    initWorkMotion();
  }, []);

  return (
    <section className="work-showcase" id="work">
      <div className="work-heading-row">
        <p className="section-pill">Portfolio</p>
        <span className="work-count">({String(projects.length).padStart(2, "0")})</span>
      </div>

      <div className="work-title-row">
        <h2 className="color-shift-heading">Work that feels obvious.</h2>
        <p>
          A live Dribbble index of interface, mobile app, landing page, and
          visual design work. Each project opens on Dribbble for the full shot.
        </p>
      </div>

      <div className="portfolio-grid">
        {projects.map((project) => (
          <article key={project.title} className={`portfolio-card portfolio-card-${project.tone}`}>
            <div className="portfolio-visual">
              <Image
                src={project.thumbnail}
                alt={`${project.title} thumbnail`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="portfolio-card-footer">
              <div>
                <h3>{project.title}</h3>
                <p>{project.category}</p>
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on Dribbble`}
              >
                open
              </a>
            </div>
            <p className="portfolio-result">{project.result}</p>
            <strong>{project.metric}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
