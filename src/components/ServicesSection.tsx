"use client";

import { portfolioServices } from "@/data/profile";
import { useEffect, useRef } from "react";

const headingWords = ["What", "I", "can", "do", "for", "your", "product."];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let context: { revert: () => void } | undefined;
    let mediaCleanup: (() => void) | undefined;

    async function initServicesMotion() {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      if (!sectionRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      context = gsap.context(() => {
        const section = sectionRef.current;
        if (!section) return;

        const cards = gsap.utils.toArray<HTMLElement>(".service-offer-card");
        const grid = section.querySelector<HTMLElement>(".service-offer-grid");
        const words = gsap.utils.toArray<HTMLElement>(".service-heading-word");
        const cardContent = gsap.utils.toArray<HTMLElement>(
          ".service-offer-card > span, .service-offer-card strong, .service-offer-card p, .service-offer-card b",
        );

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            end: "top 24%",
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        });

        timeline.fromTo(
          ".service-offer-heading .section-pill",
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, ease: "none" },
          0,
        );

        timeline.fromTo(
          words,
          { opacity: 0, y: 64 },
          { opacity: 1, y: 0, stagger: 0.035, ease: "none" },
          0.05,
        );

        timeline.fromTo(
          ".service-offer-heading > p",
          { opacity: 0, y: 42 },
          { opacity: 1, y: 0, ease: "none" },
          0.16,
        );

        timeline.fromTo(
          cardContent,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, stagger: 0.018, ease: "none" },
          0.42,
        );

        gsap.set(cards, {
          transformPerspective: 1200,
          transformOrigin: "center bottom",
          zIndex: (index) => 30 - index,
        });

        const media = gsap.matchMedia();

        media.add("(min-width: 769px)", () => {
          if (!grid) return;

          const rootFont = () => parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;

          const stackTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=88%",
              scrub: true,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          stackTimeline.fromTo(
            cards,
            {
              opacity: 1,
              x: (_index, card) => {
                const gridBounds = grid.getBoundingClientRect();
                const cardBounds = (card as HTMLElement).getBoundingClientRect();
                const cardCenter = cardBounds.left - gridBounds.left + cardBounds.width / 2;

                return gridBounds.width / 2 - cardCenter;
              },
              y: (index) => index * 14 - rootFont() * 0.8,
              z: (index) => -index * 88,
              rotateX: (index) => -7 + index * 2.5,
              rotateY: (index) => -12 + index * 8,
              rotateZ: (index) => -4 + index * 3.5,
              scale: (index) => 1 - index * 0.045,
              filter: (index) => (index === 0 ? "none" : "saturate(0.86) brightness(0.88)"),
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              z: 0,
              rotateX: 0,
              rotateY: 0,
              rotateZ: 0,
              scale: 1,
              filter: "none",
              ease: "none",
              stagger: 0.025,
            },
            0,
          );

          stackTimeline.to(
            ".service-offer-heading",
            {
              y: -34,
              opacity: 0.82,
              ease: "none",
            },
            0,
          );

          return () => stackTimeline.kill();
        });

        media.add("(max-width: 768px)", () => {
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
                  opacity: 0.86,
                  y: 56,
                  rotate: index % 2 === 0 ? -2.2 : 2.2,
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
                  scale: 0.9 + index * 0.025,
                  y: -18 - index * 8,
                  opacity: 0.7,
                  filter: "saturate(0.86) brightness(0.88)",
                  ease: "none",
                  scrollTrigger: {
                    trigger: cards[index + 1],
                    start: "top 82%",
                    end: "top 36%",
                    scrub: true,
                  },
                }),
              );
            }
          });

          return () => tweens.forEach((tween) => tween.kill());
        });

        mediaCleanup = () => media.revert();
        ScrollTrigger.refresh();
      }, sectionRef.current);
    }

    initServicesMotion();

    return () => {
      mediaCleanup?.();
      context?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="services-showcase" data-scroll-section data-section-reveal>
      <div className="service-offer-panel">
        <div className="service-offer-heading">
          <p className="section-pill">Services</p>
          <h3>
            {headingWords.map((word) => (
              <span key={word} className="service-heading-word">
                {word}
              </span>
            ))}
          </h3>
          <p>
            Clear, practical support for teams that need better screens,
            smoother flows, and safer releases.
          </p>
        </div>

        <div className="service-offer-grid" aria-label="Services offered">
          {portfolioServices.map((service, index) => (
            <article key={service.title} className="service-offer-card">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{service.title}</strong>
              <p>{service.summary}</p>
              <div>
                {service.tags.map((tag) => (
                  <b key={tag}>{tag}</b>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
