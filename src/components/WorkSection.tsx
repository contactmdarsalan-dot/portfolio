"use client";

import { projects } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties, useEffect, useRef } from "react";

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let context: { revert: () => void } | undefined;
    let mediaCleanup: (() => void) | undefined;

    async function initWorkMotion() {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      if (!sectionRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".work-showcase .color-shift-heading").forEach((heading) => {
          gsap.fromTo(
            heading,
            { color: "#6f675d" },
            {
              color: "#14111c",
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

        const stack = sectionRef.current?.querySelector<HTMLElement>(".portfolio-stack");
        const cards = gsap.utils.toArray<HTMLElement>(".portfolio-stack-card");
        const rootFont = () => parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
        const readStackTop = (card: HTMLElement, index: number) => {
          const value = getComputedStyle(card).getPropertyValue("--stack-top").trim();

          if (value.endsWith("px")) return parseFloat(value);
          if (value.endsWith("rem")) return parseFloat(value) * rootFont();
          return (5.8 + Math.min(index, 8) * 0.22) * rootFont();
        };

        cards.forEach((card) => {
          const cardParts = card.querySelectorAll<HTMLElement>(
            ".portfolio-visual, .portfolio-stack-content, .portfolio-stack-index",
          );

          gsap.from(cardParts, {
            opacity: 0,
            y: 42,
            stagger: 0.07,
            duration: 0.74,
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
          if (!stack) return;
          const createdTriggers: Array<{ kill: () => void }> = [];

          cards.forEach((card, index) => {
            createdTriggers.push(
              ScrollTrigger.create({
                trigger: card,
                start: () => `top top+=${readStackTop(card, index)}`,
                endTrigger: stack,
                end: () => `bottom top+=${readStackTop(card, index) + card.offsetHeight}`,
                pin: true,
                pinSpacing: false,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              }),
            );

            gsap.set(card, {
              transformOrigin: "center top",
              zIndex: 20 + index,
            });

            if (index < cards.length - 1) {
              gsap.to(card, {
                scale: 0.9 + Math.min(index, 8) * 0.006,
                opacity: 0.62,
                filter: "saturate(0.72) brightness(0.8)",
                ease: "none",
                scrollTrigger: {
                  trigger: cards[index + 1],
                  start: "top 82%",
                  end: () => `top top+=${readStackTop(cards[index + 1], index + 1) + 28}`,
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              });
            }
          });

          ScrollTrigger.refresh();

          return () => createdTriggers.forEach((trigger) => trigger.kill());
        });

        media.add("(max-width: 768px)", () => {
          if (!stack || !cards.length) return;

          const tweens: Array<{ kill: () => void }> = [];

          cards.forEach((card, index) => {
            gsap.set(card, {
              transformOrigin: "center top",
              zIndex: 20 + index,
            });

            tweens.push(
              gsap.fromTo(
                card,
                {
                  opacity: 0.82,
                  y: 54,
                  rotate: index % 2 === 0 ? -1.8 : 1.8,
                  scale: 0.965,
                },
                {
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: card,
                    start: "top 94%",
                    end: "top 52%",
                    scrub: true,
                  },
                },
              ),
            );

            if (index < cards.length - 1) {
              tweens.push(
                gsap.to(card, {
                  scale: 0.9 + Math.min(index, 8) * 0.006,
                  y: -18 - Math.min(index, 8) * 5,
                  opacity: 0.64,
                  filter: "saturate(0.72) brightness(0.8)",
                  ease: "none",
                  scrollTrigger: {
                    trigger: cards[index + 1],
                    start: "top 82%",
                    end: "top 34%",
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

    initWorkMotion();

    return () => {
      mediaCleanup?.();
      context?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="work-showcase"
      id="shots"
      data-scroll-section
      data-section-reveal
    >
      <div className="work-heading-row" data-reveal-item>
        <p className="section-pill">Design explorations</p>
        <span className="work-count">({String(projects.length).padStart(2, "0")})</span>
      </div>

      <div className="work-title-row" data-reveal-item>
        <h2 className="color-shift-heading">Interface explorations, on Dribbble.</h2>
        <p>
          Design studies and concepts, separate from the shipped products
          above. Open any one for the thinking behind it.
        </p>
      </div>

      <div className="work-ia-map" aria-label="Work information architecture" data-reveal-item>
        <span>01 Browse</span>
        <span>02 Compare</span>
        <span>03 Read case study</span>
        <span>04 Start a brief</span>
      </div>

      <div className="portfolio-stack">
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
                <Link href={`/work/${project.slug}`} aria-label={`Read ${project.title} case study`}>
                  Case study
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
