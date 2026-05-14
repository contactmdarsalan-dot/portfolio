"use client";

import { useEffect } from "react";

export default function ScrollExperience() {
  useEffect(() => {
    let locomotive: { destroy: () => void; resize?: () => void } | null = null;
    let context: { revert: () => void } | undefined;
    let disposed = false;
    let refreshHandler: (() => void) | undefined;

    async function initScrollExperience() {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true });

      locomotive = new LocomotiveScroll({
        lenisOptions: {
          duration: 1.08,
          lerp: 0.08,
          smoothWheel: true,
          wheelMultiplier: 0.9,
        },
        scrollCallback: () => ScrollTrigger.update(),
      });

      refreshHandler = () => {
        locomotive?.resize?.();
        ScrollTrigger.refresh();
      };

      context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-section-reveal]").forEach((section) => {
          const revealItems = section.querySelectorAll<HTMLElement>("[data-reveal-item]");

          gsap.fromTo(
            section,
            { opacity: 0.96 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 88%",
                end: "top 35%",
                scrub: true,
              },
            },
          );

          if (!revealItems.length) return;

          gsap.from(revealItems, {
            opacity: 0,
            y: 38,
            scale: 0.985,
            stagger: 0.07,
            duration: 0.78,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 72%",
              toggleActions: "play none none reverse",
            },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax-soft]").forEach((item) => {
          const speed = Number(item.dataset.parallaxSoft || 24);
          gsap.to(item, {
            y: -speed,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      });

      window.addEventListener("load", refreshHandler);
      window.setTimeout(refreshHandler, 220);
    }

    initScrollExperience();

    return () => {
      disposed = true;
      if (refreshHandler) window.removeEventListener("load", refreshHandler);
      context?.revert();
      locomotive?.destroy();
    };
  }, []);

  return null;
}
