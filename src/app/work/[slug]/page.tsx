import { Project, projects } from "@/data/projects";
import { caseStudyMedia } from "@/data/caseStudyMedia";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>;
};

type CaseStudy = NonNullable<Project["caseStudy"]>;

function getProject(slug: string) {
  return projects.find((item) => item.slug === slug);
}

function getCaseStudy(project: Project): CaseStudy {
  return (
    project.caseStudy ?? {
      role: "UI/UX design, interface review",
      timeline: "Portfolio concept",
      platform: project.category,
      scope: "Visual hierarchy, interaction path, conversion clarity",
      problem: project.challenge,
      research: [
        `I started by asking what someone needs to understand in the first few seconds of ${project.title}.`,
        "The content was grouped around the natural decision path instead of being treated as decoration.",
        "I marked the moments where trust, scanning, or a clear call to action would decide whether the screen worked.",
      ],
      decisions: project.approach.map((item, index) => ({
        title: item,
        detail:
          index === 0
            ? `This became the first priority because the screen had to make its purpose clear before asking the user to do anything.`
            : index === 1
              ? `I used this direction to organize the interface into smaller decisions, so the layout could be scanned without effort.`
              : `This gave the concept a repeatable rhythm, making the page feel like part of a usable product rather than a one-off visual.`,
      })),
      qa: [
        {
          title: "Interaction clarity",
          detail: "Checked whether the primary action is still obvious after the visual styling is added.",
        },
        {
          title: "Responsive scan path",
          detail: "Reviewed the order of content on smaller screens so the story does not collapse into a long poster.",
        },
        {
          title: "Handoff notes",
          detail: "Captured the assumptions that would need real content, edge states, or developer notes before build.",
        },
      ],
      outcomes: project.impact,
      nextSteps: [
        "Turn the concept into a clickable prototype.",
        "Add user-task testing for the main conversion path.",
        "Document edge states and QA checks before development.",
      ],
    }
  );
}

function getTimeline(caseStudy: CaseStudy) {
  return [
    {
      phase: "01 / Discover",
      title: "Problem and user intent",
      detail: caseStudy.research[0] ?? caseStudy.problem,
    },
    {
      phase: "02 / Structure",
      title: "Journey and content hierarchy",
      detail: caseStudy.research[1] ?? caseStudy.scope,
    },
    {
      phase: "03 / Design",
      title: caseStudy.decisions[0]?.title ?? "Interface direction",
      detail: caseStudy.decisions[0]?.detail ?? caseStudy.scope,
    },
    {
      phase: "04 / QA",
      title: caseStudy.qa[0]?.title ?? "Quality review",
      detail: caseStudy.qa[0]?.detail ?? "Reviewed the flow for clarity, edge states, and release readiness.",
    },
    {
      phase: "05 / Outcome",
      title: "Handoff and next steps",
      detail: caseStudy.nextSteps[0] ?? "Documented next steps for a stronger product iteration.",
    },
  ];
}

const processSteps = ["Discover", "Map", "Frame", "Prototype", "QA", "Refine"];

function getCaseStudyVisuals(project: Project) {
  const visuals = caseStudyMedia[project.slug] ?? [`/case-studies/${project.slug}.webp`];

  return visuals.map((src, index) => ({
    src,
    label:
      index === 0
        ? "Primary Dribbble screen"
        : index === 1
          ? "Supporting UI flow"
          : `Additional UI screen ${String(index + 1).padStart(2, "0")}`,
    note:
      index === 0
        ? "This is the main presentation image from the project detail page."
        : "This screen comes from the same Dribbble project detail, not a repeated crop.",
  }));
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Work not found | Md Arsalan",
    };
  }

  return {
    title: `${project.title} Case Study | Md Arsalan`,
    description: `${project.title} case study covering UX process, interface decisions, QA checks, and project outcomes.`,
    openGraph: {
      title: `${project.title} Case Study | Md Arsalan`,
      description: project.summary,
      images: [{ url: project.thumbnail }],
    },
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const caseStudy = getCaseStudy(project);
  const timeline = getTimeline(caseStudy);
  const caseStudyVisuals = getCaseStudyVisuals(project);
  const primaryVisual = caseStudyVisuals[0];
  const supportingVisuals = caseStudyVisuals.slice(1);

  return (
    <main className="hk-case-page">
      <header className="hk-hero">
        <div className="hk-hero-inner">
          <Link className="hk-back" href="/#work">
            Back to work
          </Link>
          <p className="hk-hero-tag">Product Design Case Study / {caseStudy.timeline}</p>
          <h1>
            {project.title} -
            <br />
            <em>{project.category}</em>
            <br />
            shaped into a story.
          </h1>
          <p className="hk-hero-sub">{project.summary}</p>

          <div className="hk-hero-meta" aria-label="Case study summary">
            <div className="hk-hero-meta-item">
              <label>Role</label>
              <span>{caseStudy.role}</span>
            </div>
            <div className="hk-hero-meta-item">
              <label>Platform</label>
              <span>{caseStudy.platform}</span>
            </div>
            <div className="hk-hero-meta-item">
              <label>Scope</label>
              <span>{caseStudy.scope}</span>
            </div>
            <div className="hk-hero-meta-item">
              <label>Proof</label>
              <span>{project.result}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="hk-container">
        <section id="overview" className="hk-section">
          <p className="hk-slabel">Project Overview</p>
          <h2>The work starts before the polished shot.</h2>
          <p>
            I treated {project.title} as a product problem first. The Dribbble
            image is the final visual layer, but the useful story sits
            underneath it: who the screen is for, where a user might pause, and
            what needs to be checked before the interface can feel ready.
          </p>

          <div className="hk-role-grid">
            <article className="hk-role-item">
              <span>Role</span>
              <strong>{caseStudy.role}</strong>
            </article>
            <article className="hk-role-item">
              <span>Timeline</span>
              <strong>{caseStudy.timeline}</strong>
            </article>
            <article className="hk-role-item">
              <span>Platform</span>
              <strong>{caseStudy.platform}</strong>
            </article>
            <article className="hk-role-item">
              <span>Project</span>
              <strong>{project.category}</strong>
            </article>
          </div>
        </section>

        <section id="problem" className="hk-section">
          <p className="hk-slabel">Problem Discovery</p>
          <h2>The real risk was hesitation.</h2>
          <p>
            {project.challenge} I focused on the moment before the click: does
            the page explain itself quickly, does the next step feel natural,
            and does the visual hierarchy support that decision?
          </p>

          <div className="hk-stat-grid">
            <article className="hk-stat-card">
              <span>01</span>
              <strong>Primary user path</strong>
              <p>{caseStudy.scope}</p>
            </article>
            <article className="hk-stat-card">
              <span>{String(caseStudy.research.length).padStart(2, "0")}</span>
              <strong>Research signals</strong>
              <p>Journey notes, content priorities, and expected user behavior.</p>
            </article>
            <article className="hk-stat-card">
              <span>{String(caseStudy.decisions.length).padStart(2, "0")}</span>
              <strong>Design decisions</strong>
              <p>Interface choices tied back to user hesitation and action clarity.</p>
            </article>
          </div>

          <blockquote className="hk-pull-quote">
            A good-looking screen is only useful when the user knows what to do
            next.
          </blockquote>

          <div className="hk-card-grid">
            {caseStudy.research.map((item, index) => (
              <article className="hk-card" key={`research-${index}-${item}`}>
                <div className="hk-card-icon">{String(index + 1).padStart(2, "0")}</div>
                <h3>{index === 0 ? "User Journey" : index === 1 ? "Content Logic" : "Decision Risk"}</h3>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="hk-section">
          <p className="hk-slabel">Design Process</p>
          <h2>From first intent to a clearer product flow.</h2>
          <p>
            I moved from intent to structure before pushing the visual style too
            hard. That kept the work grounded: every section needed a job, every
            action needed a reason, and every polished screen needed a quality
            check behind it.
          </p>

          <div className="hk-steps" aria-label="Process steps">
            {processSteps.map((step, index) => (
              <article className="hk-step" key={step}>
                <span className="hk-step-num">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step}</h3>
              </article>
            ))}
          </div>

          <div className="hk-timeline">
            {timeline.map((item) => (
              <article className="hk-timeline-item" key={item.phase}>
                <span className="hk-tl-phase">{item.phase}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="screens" className="hk-section">
          <p className="hk-slabel">Dribbble Screen Gallery</p>
          <h2>All project visuals now live inside the case study.</h2>
          <p>
            The real images from the Dribbble detail page are pulled into this
            case study, so the reader can review the actual UI screens without
            leaving the portfolio. No repeated crop placeholders here.
          </p>

          <div className="hk-gallery-showcase">
            <article className="hk-shot-stage">
              <div className="hk-screen-label">{primaryVisual.label}</div>
              <div className="hk-shot-frame hk-shot-frame-full">
                <img
                  className="hk-native-shot"
                  src={primaryVisual.src}
                  alt={`${project.title} primary Dribbble UI screen`}
                  loading="lazy"
                />
              </div>
              <p>{primaryVisual.note}</p>
            </article>

            {supportingVisuals.length > 0 ? (
              <div className="hk-detail-shots">
                {supportingVisuals.map((visual, index) => (
                  <article className="hk-gallery-card" key={visual.src}>
                    <div className="hk-screen-label">{visual.label}</div>
                    <div className="hk-shot-frame">
                      <img
                        className="hk-native-shot"
                        src={visual.src}
                        alt={`${project.title} Dribbble UI screen ${index + 2}`}
                        loading="lazy"
                      />
                    </div>
                    <h3>{index === 0 ? "Flow depth" : "Screen evidence"}</h3>
                    <p>{visual.note}</p>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <section id="decisions" className="hk-section">
          <p className="hk-slabel">UX Decisions</p>
          <h2>Why the screens were shaped this way.</h2>
          <div className="hk-card-grid">
            {caseStudy.decisions.map((item, index) => (
              <article className="hk-card hk-decision-card" key={`${item.title}-${index}`}>
                <div className="hk-card-icon">{String(index + 1).padStart(2, "0")}</div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="qa" className="hk-section">
          <p className="hk-slabel">QA Lens</p>
          <h2>I looked for the places the flow could break.</h2>
          <div className="hk-feature-list">
            {caseStudy.qa.map((item, index) => (
              <article className="hk-feature-row" key={`${item.title}-${index}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="outcome" className="hk-section">
          <p className="hk-slabel">Outcome</p>
          <h2>What the concept proves, and what it still needs.</h2>
          <div className="hk-outcome-highlight">
            <strong>{project.result}</strong>
            <p>
              This is still a portfolio case study, so I am careful not to fake
              product metrics. The value is in the clearer flow, the visible UI
              system, and the checks that would guide the next iteration.
            </p>
          </div>

          <div className="hk-principles">
            {caseStudy.outcomes.map((item, index) => (
              <article key={`${item}-${index}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>

          <div className="hk-card-grid hk-next-grid">
            {caseStudy.nextSteps.map((item, index) => (
              <article className="hk-card" key={`${item}-${index}`}>
                <div className="hk-card-icon">Next</div>
                <h3>{`Step ${index + 1}`}</h3>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="hk-final-cta">
          <p className="hk-slabel">Visual Source</p>
          <h2>Want to review the original shot?</h2>
          <p>
            This page documents the UX and QA thinking. The original visual
            presentation is still available as supporting work evidence.
          </p>
          <div className="hk-actions">
            <a href="mailto:contactmdarsalan@gmail.com">Start a brief</a>
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              Open Dribbble shot
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
