"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const offers = [
  {
    title: "UX Audit",
    detail: "A focused review of flows, hierarchy, friction points, and quick wins.",
    output: "Screen notes + priority fixes",
    image: "/frames/male0048.png",
    cue: "Reveal friction",
  },
  {
    title: "Product Flow Design",
    detail: "Wireframes and prototypes for journeys that need clearer decisions.",
    output: "Flow map + prototype",
    image: "/frames/male0088.png",
    cue: "Shape the path",
  },
  {
    title: "QA Readiness",
    detail: "Critical journey checks, edge states, and release risk mapping before launch.",
    output: "Test map + risk list",
    image: "/frames/male0136.png",
    cue: "Reduce release risk",
  },
];

const proof = [
  ["200+", "journey checks mapped"],
  ["6", "product areas covered"],
  ["3", "core strengths: UX, UI, QA"],
];

export default function ConversionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeOffer, setActiveOffer] = useState<number | null>(null);
  const currentOffer = offers[activeOffer ?? 0];

  useEffect(() => {
    let context: { revert: () => void } | undefined;
    let disposed = false;

    async function initConversionMotion() {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (disposed || !sectionRef.current) {
        return;
      }

      context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".reveal-step").forEach((item, index) => {
          gsap.from(item, {
            opacity: 0,
            y: 44,
            scale: 0.98,
            duration: 0.75,
            delay: index * 0.04,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });

          ScrollTrigger.create({
            trigger: item,
            start: "top 55%",
            end: "bottom 45%",
            onEnter: () => setActiveOffer(index),
            onEnterBack: () => setActiveOffer(index),
          });
        });

        gsap.from(".reveal-visual-pane", {
          opacity: 0,
          y: 56,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".conversion-reveal-stage",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });
      }, sectionRef.current);
    }

    initConversionMotion();

    return () => {
      disposed = true;
      context?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="conversion-section conversion-reveal-section" id="services">
      <div className="conversion-reveal-shell" aria-label="Work with me">
        <div className="conversion-reveal-heading">
          <p className="section-pill">Work With Me</p>
          <h2>Reveal the friction before release.</h2>
          <p>Scroll through the workflow. Each frame surfaces what gets reviewed, shaped, and validated.</p>
        </div>

        <div className="conversion-reveal-stage">
          <div className="reveal-visual-pane" aria-hidden="true">
            <div className="reveal-image-frame">
              {offers.map((offer, index) => (
                <Image
                  key={offer.title}
                  src={offer.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className={activeOffer === index || (activeOffer === null && index === 0) ? "is-active" : ""}
                />
              ))}
              <span className="reveal-scanline" />
            </div>

            <div className="reveal-floating-note">
              <span>{String((activeOffer ?? 0) + 1).padStart(2, "0")}</span>
              <div>
                <strong>{currentOffer.cue}</strong>
                <p>{currentOffer.output}</p>
              </div>
            </div>
          </div>

          <div className="reveal-info-track">
            {offers.map((offer, index) => (
              <article
                key={offer.title}
                className={`reveal-step ${activeOffer === index ? "is-active" : ""}`}
                onClick={() => setActiveOffer(index)}
                onFocus={() => setActiveOffer(index)}
                onMouseEnter={() => setActiveOffer(index)}
                tabIndex={0}
              >
                <div className="reveal-step-head">
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  <span>{offer.output}</span>
                </div>
                <h3>{offer.title}</h3>
                <p>{offer.detail}</p>
              </article>
            ))}

            <aside className="reveal-final-card">
              <span>Proof signals</span>
              <div className="proof-grid">
                {proof.map(([value, label]) => (
                  <div key={label} className="proof-stat">
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <div>
                <h3>Send the risk.</h3>
                <div className="conversion-actions">
                  <a href="mailto:arsalan@ncell.com.np">Start a conversation</a>
                  <a href="https://dribbble.com/MDArsalan" target="_blank" rel="noopener noreferrer">
                    View Dribbble
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
