"use client";

import {
  ArrowUpRight,
  Bug,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  FileSearch,
  FlaskConical,
  Layers3,
  MousePointer2,
  RefreshCw,
  Route,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import NextImage from "next/image";
import { useEffect, useRef, useState } from "react";

const PROCESS_START_FRAME = 92;
const PROCESS_END_FRAME = 176;

type ProcessKey = "design" | "qa";

type ProcessStep = {
  icon: LucideIcon;
  title: string;
  label: string;
  point: string;
};

type ProcessTab = {
  label: string;
  eyebrow: string;
  title: string;
  note: string;
  icon: LucideIcon;
  steps: ProcessStep[];
};

const processKeys: ProcessKey[] = ["design", "qa"];

const processTabs: Record<ProcessKey, ProcessTab> = {
  design: {
    label: "Design",
    eyebrow: "Design loop",
    title: "Shape the flow.",
    note: "A clean path from messy moment to usable screen.",
    icon: Layers3,
    steps: [
      { icon: FileSearch, title: "Discover", label: "Need", point: "Find friction" },
      { icon: Route, title: "Map", label: "Flow", point: "Shape path" },
      { icon: Layers3, title: "Frame", label: "UI", point: "Set hierarchy" },
      { icon: MousePointer2, title: "Prototype", label: "Click", point: "Test motion" },
      { icon: RefreshCw, title: "Refine", label: "Ready", point: "Clean release" },
    ],
  },
  qa: {
    label: "QA",
    eyebrow: "Release loop",
    title: "Catch the risk.",
    note: "Sharper checks before the product reaches users.",
    icon: ClipboardCheck,
    steps: [
      { icon: Compass, title: "Scope", label: "Risk", point: "Choose focus" },
      { icon: ClipboardCheck, title: "Plan", label: "Cases", point: "Write checks" },
      { icon: FlaskConical, title: "Test", label: "State", point: "Validate paths" },
      { icon: Bug, title: "Report", label: "Issue", point: "Make visible" },
      { icon: CheckCircle2, title: "Ship", label: "Ready", point: "Re-check fixes" },
    ],
  },
};

export default function ConversionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const activeStepRef = useRef(0);
  const setCanvasProgressRef = useRef<((progress: number) => void) | null>(null);
  const canvasReadyRef = useRef(false);
  const [activeProcess, setActiveProcess] = useState<ProcessKey>("design");
  const [activeStep, setActiveStep] = useState(0);
  const [canvasReady, setCanvasReady] = useState(false);
  const currentProcess = processTabs[activeProcess];
  const currentStep = currentProcess.steps[activeStep] ?? currentProcess.steps[0];

  useEffect(() => {
    activeStepRef.current = activeStep;
  }, [activeStep]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;

    if (!canvas || !section) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const canvasElement = canvas;
    const sectionElement = section;
    const drawingContext: CanvasRenderingContext2D = context;
    const imageSeq = { frame: PROCESS_START_FRAME };
    const images: HTMLImageElement[] = [];
    let disposed = false;
    let scrollTriggerCleanup: (() => void) | null = null;

    function sizeCanvas() {
      const bounds = canvasElement.getBoundingClientRect();
      const width = Math.max(1, Math.round(bounds.width));
      const height = Math.max(1, Math.round(bounds.height));

      if (canvasElement.width !== width || canvasElement.height !== height) {
        canvasElement.width = width;
        canvasElement.height = height;
      }
    }

    function drawImage(img: HTMLImageElement) {
      const width = img.naturalWidth || img.width;
      const height = img.naturalHeight || img.height;
      if (!width || !height) return;

      const cvs = drawingContext.canvas;
      const hRatio = cvs.width / width;
      const vRatio = cvs.height / height;
      const isMobile = window.innerWidth <= 768;
      const ratio = Math.max(hRatio, vRatio) * (isMobile ? 0.96 : 1.02);
      const drawWidth = width * ratio;
      const drawHeight = height * ratio;
      const focusX = isMobile ? 0 : cvs.width * -0.055;
      const focusY = isMobile ? cvs.height * 0.045 : cvs.height * 0.03;
      const cx = (cvs.width - drawWidth) / 2 + focusX;
      const cy = (cvs.height - drawHeight) / 2 + focusY;

      drawingContext.clearRect(0, 0, cvs.width, cvs.height);
      drawingContext.drawImage(img, 0, 0, width, height, cx, cy, drawWidth, drawHeight);
      if (!canvasReadyRef.current) {
        canvasReadyRef.current = true;
        setCanvasReady(true);
      }
    }

    function render() {
      const frame = Math.min(Math.max(Math.round(imageSeq.frame), PROCESS_START_FRAME), PROCESS_END_FRAME);
      const img = images[frame - PROCESS_START_FRAME];
      if (img?.complete) drawImage(img);
    }

    function setProgress(progress: number) {
      const safeProgress = Math.max(0, Math.min(1, progress));
      const stepCount = processTabs.design.steps.length;
      const nextStep = Math.min(stepCount - 1, Math.floor(safeProgress * stepCount));

      imageSeq.frame = PROCESS_START_FRAME + safeProgress * (PROCESS_END_FRAME - PROCESS_START_FRAME);
      sectionElement.style.setProperty("--process-progress", safeProgress.toFixed(3));
      if (progressRef.current) progressRef.current.style.width = `${Math.round(safeProgress * 100)}%`;
      render();

      if (nextStep !== activeStepRef.current) {
        activeStepRef.current = nextStep;
        setActiveStep(nextStep);
      }
    }

    setCanvasProgressRef.current = setProgress;
    sizeCanvas();

    for (let frame = PROCESS_START_FRAME; frame <= PROCESS_END_FRAME; frame++) {
      const img = new Image();
      const number = String(frame + 1).padStart(4, "0");
      img.src = `/frames/male${number}.png`;
      img.onload = () => {
        if (!disposed) render();
      };
      images.push(img);
    }

    import("gsap").then(async (gsapModule) => {
      if (disposed) return;

      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".process-canvas-copy > *, .process-canvas-panel", {
        y: 34,
        stagger: 0.08,
        duration: 0.72,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionElement,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });

      const trigger = ScrollTrigger.create({
        trigger: sectionElement,
        start: "top top",
        end: "+=165%",
        pin: true,
        scrub: 0.16,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => setProgress(self.progress),
      });

      scrollTriggerCleanup = () => {
        trigger.kill();
        ScrollTrigger.getAll()
          .filter((item) => item.trigger === sectionElement)
          .forEach((item) => item.kill());
      };
    });

    const handleResize = () => {
      sizeCanvas();
      render();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvasElement);

    window.addEventListener("resize", handleResize);
    setProgress(0);

    return () => {
      disposed = true;
      setCanvasProgressRef.current = null;
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      scrollTriggerCleanup?.();
    };
  }, []);

  function jumpToStep(index: number) {
    activeStepRef.current = index;
    setActiveStep(index);
    setCanvasProgressRef.current?.(index / Math.max(1, processTabs.design.steps.length - 1));
  }

  return (
    <section
      ref={sectionRef}
      className={`conversion-section process-focused-section process-canvas-section ${
        canvasReady ? "is-canvas-ready" : ""
      }`}
      id="process"
      data-scroll-section
      data-section-reveal
    >
      <div className="process-canvas-shell" aria-label="Design and QA process">
        <NextImage
          className="process-character-fallback"
          src="/frames/male0093.png"
          alt=""
          fill
          sizes="100vw"
          aria-hidden="true"
          priority
          unoptimized
        />
        <canvas ref={canvasRef} className="process-character-canvas" aria-hidden="true" />

        <div className="process-canvas-wordmark" aria-hidden="true">
          Process
        </div>

        <div className="process-canvas-copy">
          <p className="section-pill">
            <Sparkles size={14} aria-hidden="true" />
            Process Lab
          </p>
          <h2>{currentProcess.title}</h2>
          <p>{currentProcess.note}</p>
        </div>

        <div className="process-canvas-panel">
          <div className="process-canvas-modes" role="tablist" aria-label="Process modes">
            {processKeys.map((key) => {
              const TabIcon = processTabs[key].icon;

              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  id={`${key}-process-tab`}
                  aria-selected={activeProcess === key}
                  aria-controls={`${key}-process-panel`}
                  className={activeProcess === key ? "is-active" : ""}
                  onClick={() => setActiveProcess(key)}
                >
                  <TabIcon size={16} aria-hidden="true" />
                  {processTabs[key].label}
                </button>
              );
            })}
          </div>

          <div
            className="process-canvas-status"
            role="tabpanel"
            id={`${activeProcess}-process-panel`}
            aria-labelledby={`${activeProcess}-process-tab`}
          >
            <span className="process-step-index">{String(activeStep + 1).padStart(2, "0")}</span>
            <div>
              <span>{currentProcess.eyebrow}</span>
              <h3>{currentStep.title}</h3>
              <p>{currentStep.point}</p>
            </div>
            <strong>{currentStep.label}</strong>
          </div>

          <div className="process-canvas-timeline" aria-label={`${currentProcess.label} timeline`}>
            {currentProcess.steps.map((step, index) => {
              const StepIcon = step.icon;

              return (
                <button
                  key={step.title}
                  type="button"
                  className={activeStep === index ? "is-active" : ""}
                  onClick={() => jumpToStep(index)}
                >
                  <StepIcon size={16} aria-hidden="true" />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step.title}</strong>
                </button>
              );
            })}
          </div>

          <div className="process-canvas-actions">
            <a href="mailto:contactmdarsalan@gmail.com">
              Start
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a href="tel:+9779713159720">
              Call
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="process-canvas-progress" aria-hidden="true">
          <div ref={progressRef} />
        </div>
      </div>
    </section>
  );
}
