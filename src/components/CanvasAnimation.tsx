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
    lead: "I design calm, reliable journeys that turn rough product moments into clear, satisfying experiences.",
    markers: ["Research", "Interface", "Quality"],
    align: "left",
  },
];

const resumeChapters: StoryChapter[] = [
  {
    id: "process",
    eyebrow: "Experience / Education",
    title: "Design. Test. Improve.",
    lead: "A practical product background shaped around user journeys, release quality, and clear digital experiences.",
    steps: ["Discover", "Prototype", "Validate", "Release"],
    credentials: [
      {
        label: "Work Experience",
        title: "UI UX and QA Practice",
        period: "Current focus",
        meta: "Ncell digital products",
        bullets: [
          "Maps customer journeys and product workflows to locate friction before release.",
          "Translates usability findings into cleaner screens, flows, and validation notes.",
          "Supports release quality through interface review, functional checks, and issue follow-up.",
        ],
      },
      {
        label: "Product Background",
        title: "Workflow Analysis and Digital QA",
        period: "Past practice",
        meta: "Product operations, testing, and user flow improvement",
        bullets: [
          "Analyzed platform behavior across user paths, edge cases, and repeated service tasks.",
          "Built a habit of documenting what breaks, why it matters, and how teams can resolve it.",
        ],
      },
      {
        label: "Education",
        title: "Technology and Design Foundation",
        period: "Academic base",
        meta: "Human-centered digital systems",
        bullets: [
          "Grounded in practical technology concepts, structured problem solving, and digital product thinking.",
          "Applies learning through interface critique, QA discipline, and product communication.",
        ],
      },
    ],
    align: "left",
  },
  {
    id: "contact",
    eyebrow: "Contact",
    title: "Start a better flow.",
    lead: "Send me the screen, journey, or release risk that feels messy. I will help make it easier to use and safer to launch.",
    contact: [
      ["Email", "arsalan@ncell.com.np", "mailto:arsalan@ncell.com.np"],
      ["LinkedIn", "linkedin.com/in/md-arsalan", "https://linkedin.com/in/md-arsalan"],
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
    const context: CanvasRenderingContext2D = ctx;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const images: HTMLImageElement[] = [];
    const imageSeq = { frame: variant === "hero" ? 0 : 176 };
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const num = String(i).padStart(4, "0");
      img.src = `/frames/male${num}.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) {
          render();
          updateChapterState(0);
        }
      };
      images.push(img);
    }

    function scaleImage(img: HTMLImageElement) {
      const cvs = context.canvas;
      const hRatio = cvs.width / img.width;
      const vRatio = cvs.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const cx = (cvs.width - img.width * ratio) / 2;
      const cy = (cvs.height - img.height * ratio) / 2;
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
        const signalStack = containerRef.current?.querySelector<HTMLElement>(".hero-signal-stack") ?? null;

        words.forEach((word, index) => {
          const start = index * 0.2;
          const reveal = Math.max(0, Math.min(1, (progress - start) / 0.22));
          word.style.opacity = String(reveal);
          word.style.transform = `translate3d(0, ${(1 - reveal) * 34}px, 0) scale(${0.96 + reveal * 0.04})`;
        });

        const bodyReveal = Math.max(0, Math.min(1, (progress - 0.56) / 0.18));
        const markerReveal = Math.max(0, Math.min(1, (progress - 0.68) / 0.16));
        const signalReveal = Math.max(0, Math.min(1, (progress - 0.76) / 0.14));

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
        if (signalStack) {
          signalStack.style.opacity = String(signalReveal);
          signalStack.style.transform = `translate3d(0, ${(1 - signalReveal) * 18}px, 0)`;
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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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
    >
      <canvas ref={canvasRef} />

      <div className="hero-orbit" aria-hidden="true" />
      <div className="hero-wordmark" aria-hidden="true">
        {variant === "hero" ? "UX / QA" : "BUILD / TEST"}
      </div>

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
            <div className={variant === "resume" && chapter.id === "process" ? "resume-intro" : undefined}>
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
                  <section key={item.label} className="resume-credential">
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

            {variant === "resume" && chapter.id === "process" && (
              <div className="resume-snapshot" aria-hidden="true">
                <span>Profile snapshot</span>
                <strong>UX + QA</strong>
                <p>Journey mapping, interface review, release validation, and product communication.</p>
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
