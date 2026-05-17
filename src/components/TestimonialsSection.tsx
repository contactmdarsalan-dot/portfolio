"use client";

import { portfolioTestimonials, socialProofSignals } from "@/data/profile";
import {
  BadgeCheck,
  Quote,
  ShieldCheck,
  Sparkles,
  Users2,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

type UiCardProps = { children: ReactNode; className?: string };
type UiBadgeProps = { children: ReactNode; tone?: "accent" | "neutral" };

const STAT_ICONS: LucideIcon[] = [Users2, ShieldCheck, Sparkles];

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function UiCard({ children, className }: UiCardProps) {
  return <div className={cx("ui-card", className)}>{children}</div>;
}

function UiBadge({ children, tone = "neutral" }: UiBadgeProps) {
  return (
    <span className={cx("ui-badge", tone === "accent" && "ui-badge-accent")}>
      {children}
    </span>
  );
}

function AvatarMark({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
  return <span className="sp-avatar">{initials}</span>;
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    async function init() {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (!sectionRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const section = sectionRef.current!;
        const cards = gsap.utils.toArray<HTMLElement>(".sp-card");

        /* ── Reveal timeline: header + stats ── */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 30%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          ".sp-eyebrow, .sp-title",
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, stagger: 0.06 },
          0,
        );
        tl.fromTo(
          ".sp-stat",
          { opacity: 0, y: 40, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.05 },
          0.2,
        );

        /* ── Counter animations ── */
        counterRefs.current.forEach((el) => {
          if (!el) return;
          const raw = el.dataset.count;
          if (!raw) return;
          const target = parseInt(raw, 10);
          if (isNaN(target)) return;

          const proxy = { value: 0 };
          gsap.to(proxy, {
            value: target,
            duration: 2.5,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = String(Math.round(proxy.value));
            },
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 50%",
              scrub: 1,
            },
          });
        });

        /* ── Card grid reveal on scroll ── */
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "top 45%",
                scrub: 0.7,
              },
            },
          );
        });

        /* ── Floating glow orbs ── */
        gsap.to(".sp-glow--1", {
          y: -30, x: 20,
          duration: 5, ease: "sine.inOut", repeat: -1, yoyo: true,
        });
        gsap.to(".sp-glow--2", {
          y: 25, x: -15,
          duration: 7, ease: "sine.inOut", repeat: -1, yoyo: true,
        });

        ScrollTrigger.refresh();
      }, sectionRef.current);
    }

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="sp-section"
      id="social-proof"
      data-scroll-section
      data-section-reveal
    >
      <div className="sp-glow sp-glow--1" />
      <div className="sp-glow sp-glow--2" />

      <div className="sp-container">
        <div className="sp-header">
          <UiBadge tone="accent">
            <Sparkles size={13} aria-hidden="true" />
            Social Proof
          </UiBadge>
          <h2 className="sp-title">Trusted by quality-focused teams</h2>
        </div>

        <div className="sp-stats">
          {socialProofSignals.map((item, i) => {
            const Icon = STAT_ICONS[i] ?? BadgeCheck;
            const count = parseInt(item.value, 10);
            const canCount = !isNaN(count);

            return (
              <UiCard key={`${item.value}-${item.label}`} className="sp-stat">
                <Icon size={18} aria-hidden="true" className="sp-stat-icon" />
                <span
                  className="sp-stat-value"
                  ref={(el) => { counterRefs.current[i] = el; }}
                  data-count={canCount ? item.value : undefined}
                >
                  {item.value}
                </span>
                <span className="sp-stat-label">{item.label}</span>
              </UiCard>
            );
          })}
        </div>

        <div className="sp-cards-grid">
          {portfolioTestimonials.map((item) => (
            <UiCard key={`${item.name}-${item.signal}`} className="sp-card">
              <Quote size={24} aria-hidden="true" className="sp-card-quote" />
              <blockquote>{item.quote}</blockquote>
              <div className="sp-card-footer">
                <AvatarMark name={item.name} />
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.signal}</span>
                </div>
              </div>
            </UiCard>
          ))}
        </div>
      </div>
    </section>
  );
}
