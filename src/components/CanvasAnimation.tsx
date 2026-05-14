"use client";

import { useEffect, useMemo, useRef } from "react";

const FRAME_COUNT = 300;

type StoryChapter = {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  markers?: string[];
  skillGroups?: {
    title: string;
    items: string[];
  }[];
  steps?: string[];
  credentials?: {
    label: string;
    title: string;
    period: string;
    meta: string;
    bullets: string[];
  }[];
  contact?: [string, string, string][];
  align: "left" | "right";
};

const heroChapters: StoryChapter[] = [
  {
    id: "about",
    eyebrow: "Md Arsalan / UX, QA and product care",
    title: "Make users Happy.",
    lead: "I turn rough product moments into clear, satisfying user journeys.",
    markers: ["Research", "Interface", "Quality"],
    align: "left",
  },
];

const resumeChapters: StoryChapter[] = [
  {
    id: "experience",
    eyebrow: "Experience / Education",
    title: "Experience. Education.",
    lead: "Graphic design, UX design, and software engineering foundations shaped into practical product work.",
    steps: ["Graphic", "UX", "Software", "Product"],
    credentials: [
      {
        label: "Experience",
        title: "Graphic Designer",
        period: "Jan 2026 - Present · 5 mos",
        meta: "Alpha Technology · Full-time · Kathmandu District, Nepal · On-site",
        bullets: [
          "Wireframing",
        ],
      },
      {
        label: "Experience",
        title: "User Experience Designer",
        period: "Jun 2023 - Feb 2026 · 2 yrs 9 mos",
        meta: "Hunchha Digital Agency · Full-time · Kosi Zone, Nepal",
        bullets: [
          "In my 3-year journey as a UI/UX Designer, I've learned how to create digital experiences that people love and that also benefit businesses.",
          "Style Guides, User-centered Design and +10 skills",
        ],
      },
      {
        label: "Education",
        title: "London Metropolitan University",
        period: "Sep 2021 - Apr 2024",
        meta: "Bachelor's degree, Computer Software Engineering",
        bullets: [
          "Style Guides, Design Thinking and +7 skills",
        ],
      },
    ],
    align: "left",
  },
  {
    id: "contact",
    eyebrow: "Contact",
    title: "Start a better flow.",
    lead: "Send the screen, flow, or release risk. I will help make it clear and ready.",
    contact: [
      ["Email", "contactmdarsalan@gmail.com", "mailto:contactmdarsalan@gmail.com"],
      ["Phone", "+977 9713159720", "tel:+9779713159720"],
      ["LinkedIn", "linkedin.com/in/md-arsalan-a547a3279", "https://www.linkedin.com/in/md-arsalan-a547a3279/"],
    ],
    align: "right",
  },
];

type CanvasAnimationProps = {
  variant?: "hero" | "resume";
};

export default function CanvasAnimation({ variant = "hero" }: CanvasAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);
  const chapters = useMemo(() => (variant === "hero" ? heroChapters : resumeChapters), [variant]);
  const storyLength = variant === "hero" ? "190% top" : "260% top";

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const canvasElement = canvas;
    const context: CanvasRenderingContext2D = ctx;

    function sizeCanvas() {
      const bounds = canvasElement.getBoundingClientRect();
      const width = Math.max(1, Math.round(bounds.width));
      const height = Math.max(1, Math.round(bounds.height));

      if (canvasElement.width !== width || canvasElement.height !== height) {
        canvasElement.width = width;
        canvasElement.height = height;
      }
    }

    sizeCanvas();

    const images: HTMLImageElement[] = [];
    const imageSeq = { frame: variant === "hero" ? 0 : 176 };
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const num = String(i).padStart(4, "0");
      img.src = `/frames/male${num}.png`;
      img.onload = () => {
        loadedCount++;
        render();
        if (loadedCount === 1) {
          updateChapterState(0);
        }
      };
      images.push(img);
    }

    function scaleImage(img: HTMLImageElement) {
      const cvs = context.canvas;
      const hRatio = cvs.width / img.width;
      const vRatio = cvs.height / img.height;
      const isMobileHero = variant === "hero" && window.innerWidth <= 768;
      const ratio = variant === "hero"
        ? isMobileHero
          ? Math.max(hRatio, vRatio) * 0.76
          : Math.min(hRatio, vRatio)
        : Math.max(hRatio, vRatio);
      const cx = (cvs.width - img.width * ratio) / 2;
      const mobileBottomBleed = isMobileHero ? cvs.height * 0.07 : 0;
      const cy = variant === "hero"
        ? cvs.height - img.height * ratio + mobileBottomBleed
        : (cvs.height - img.height * ratio) / 2;
      context.clearRect(0, 0, cvs.width, cvs.height);
      context.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);
    }

    function render() {
      const frame = Math.min(Math.max(Math.floor(imageSeq.frame), 0), FRAME_COUNT - 1);
      if (images[frame]?.complete) scaleImage(images[frame]);
    }

    function updateChapterState(progress: number) {
      const chapterProgress = progress * Math.max(1, chapters.length - 1);
      if (progressRef.current) progressRef.current.style.width = `${Math.round(progress * 100)}%`;

      chapterRefs.current.forEach((chapter, index) => {
        if (!chapter) return;
        const distance = Math.abs(chapterProgress - index);
        const opacity = variant === "hero" ? 1 : Math.max(0, Math.min(1, 1 - distance * 1.55));
        chapter.style.opacity = String(opacity);
        chapter.style.setProperty("--chapter-y", `${(index - chapterProgress) * 22}px`);
        chapter.style.pointerEvents = opacity > 0.5 ? "auto" : "none";
      });

      if (variant === "resume") {
        const processChapter = chapterRefs.current[0];
        const credentials = processChapter?.querySelector<HTMLElement>(".resume-credentials");
        const intro = processChapter?.querySelector<HTMLElement>(".resume-intro");
        if (credentials) {
          const scrollProgress = Math.max(0, Math.min(1, progress * 1.65));
          credentials.style.setProperty("--resume-scroll", String(scrollProgress));
        }
        if (intro) {
          const introFade = 1 - Math.max(0, Math.min(1, (progress - 0.12) / 0.22));
          intro.style.opacity = String(introFade);
          intro.style.transform = `translate3d(0, ${(1 - introFade) * -26}px, 0)`;
          intro.style.pointerEvents = introFade > 0.2 ? "auto" : "none";
        }
      }

      if (variant === "hero") {
        const hero = chapterRefs.current[0];
        if (!hero) return;
        const words = hero.querySelectorAll<HTMLElement>(".hero-title-word");
        const infoPanel = hero.querySelector<HTMLElement>(".hero-info-panel");
        const body = hero.querySelector<HTMLElement>(".story-body");
        const markers = hero.querySelector<HTMLElement>(".story-markers");

        words.forEach((word, index) => {
          const start = index * 0.2;
          const reveal = Math.max(0, Math.min(1, (progress - start) / 0.22));
          word.style.opacity = String(reveal);
          word.style.transform = `translate3d(0, ${(1 - reveal) * 34}px, 0) scale(${0.96 + reveal * 0.04})`;
        });

        const isMobileHero = window.innerWidth <= 768;
        const bodyReveal = Math.max(0, Math.min(1, (progress - (isMobileHero ? 0.64 : 0.56)) / 0.18));
        const markerReveal = Math.max(0, Math.min(1, (progress - 0.68) / 0.16));

        if (infoPanel) {
          infoPanel.style.opacity = String(bodyReveal);
          infoPanel.style.transform = `translate3d(0, ${(1 - bodyReveal) * 18}px, 0)`;
          infoPanel.style.pointerEvents = bodyReveal > 0.7 ? "auto" : "none";
        }
        if (body) {
          body.style.opacity = String(bodyReveal);
          body.style.transform = `translate3d(0, ${(1 - bodyReveal) * 18}px, 0)`;
          body.style.pointerEvents = bodyReveal > 0.7 ? "auto" : "none";
        }
        if (markers) {
          markers.style.opacity = String(markerReveal);
          markers.style.transform = `translate3d(0, ${(1 - markerReveal) * 18}px, 0)`;
          markers.style.pointerEvents = markerReveal > 0.7 ? "auto" : "none";
        }
      }
    }

    let scrollTriggerCleanup: (() => void) | null = null;

    import("gsap").then(async (gsap) => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.default.registerPlugin(ScrollTrigger);

      const trigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: storyLength,
        pin: true,
        scrub: 0.16,
        onUpdate: (self) => {
          const startFrame = variant === "hero" ? 0 : 176;
          const endFrame = variant === "hero" ? 92 : FRAME_COUNT - 1;
          imageSeq.frame = startFrame + self.progress * (endFrame - startFrame);
          render();
          updateChapterState(self.progress);
        },
      });

      scrollTriggerCleanup = () => trigger.kill();
    });

    const handleResize = () => {
      sizeCanvas();
      render();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (scrollTriggerCleanup) scrollTriggerCleanup();
    };
  }, [chapters, storyLength, variant]);

  return (
    <section
      ref={containerRef}
      className={`canvas-section canvas-section-${variant}`}
      id={variant === "hero" ? "about" : "resume"}
      data-story-root={variant}
      data-scroll-section
      data-section-reveal
    >
      <canvas ref={canvasRef} />

      <div className="hero-orbit" aria-hidden="true" />
      {variant === "resume" && (
        <div className="hero-wordmark" aria-hidden="true">
          BUILD / TEST
        </div>
      )}

      <div className="chapter-stage" aria-live="polite">
        {chapters.map((chapter, chapterIndex) => (
          <article
            key={chapter.id}
            id={chapter.id}
            ref={(node) => {
              chapterRefs.current[chapterIndex] = node;
            }}
            className={`story-chapter story-chapter-${chapter.align}`}
          >
            <div className={variant === "resume" && chapter.id === "experience" ? "resume-intro" : undefined}>
              <p className="story-kicker">{chapter.eyebrow}</p>
              <h1 className="color-shift-heading">
                {variant === "hero" ? (
                  <>
                    <span className="hero-title-word">Make</span>
                    <span className="hero-title-word">users</span>
                    <span className="hero-title-word">Happy.</span>
                  </>
                ) : (
                  chapter.title
                )}
              </h1>
              {variant === "hero" ? (
                <div className="hero-info-panel">
                  {chapter.lead && <p className="story-body">{chapter.lead}</p>}

                  {chapter.markers && (
                    <div className="story-markers">
                      {chapter.markers.map((marker) => (
                        <span key={marker}>{marker}</span>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {chapter.lead && <p className="story-body">{chapter.lead}</p>}

                  {chapter.markers && (
                    <div className="story-markers">
                      {chapter.markers.map((marker) => (
                        <span key={marker}>{marker}</span>
                      ))}
                    </div>
                  )}
                </>
              )}

              {chapter.skillGroups && (
                <div className="skill-showcase">
                  {chapter.skillGroups.map((group) => (
                    <div key={group.title} className="skill-showcase-card">
                      <strong>{group.title}</strong>
                      <div>
                        {group.items.map((item) => (
                          <span key={item}>{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {chapter.steps && (
                <div className="story-steps">
                  {chapter.steps.map((step, index) => (
                    <span key={step}>
                      <b>{String(index + 1).padStart(2, "0")}</b>
                      {step}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {chapter.credentials && (
              <div className="resume-credentials">
                {chapter.credentials.map((item) => (
                  <section key={`${item.label}-${item.title}`} className="resume-credential">
                    <div className="credential-head">
                      <span>{item.label}</span>
                      <em>{item.period}</em>
                    </div>
                    <strong>{item.title}</strong>
                    <small>{item.meta}</small>
                    <ul>
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            )}

            {chapter.contact && (
              <div className="story-contact">
                {chapter.contact.map(([label, value, href]) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>

      <div className="canvas-progress">
        <div className="progress-track">
          <div ref={progressRef} className="progress-fill" />
        </div>
        <span className="progress-label">Scroll</span>
      </div>
    </section>
  );
}
