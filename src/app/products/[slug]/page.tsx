import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/data/products";
import styles from "./page.module.css";

/**
 * One case study per product.
 *
 * Sections render only when they have content. The Dribbble case pages fill
 * gaps with template prose; these do not, because the reader of a product
 * case study is deciding whether to trust the author, and a paragraph that
 * could have been written about any product tells them not to.
 */

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };
  return {
    title: `${product.name} case study`,
    description: product.tagline,
    openGraph: {
      title: `${product.name} case study`,
      description: product.tagline,
      images: product.screenshot ? [{ url: product.screenshot }] : undefined,
    },
  };
}

export default async function ProductCasePage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const cs = product.caseStudy;
  const host = product.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const index = products.findIndex((p) => p.slug === product.slug);
  const next = products[(index + 1) % products.length];

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.inner}>
          <Link href="/#work" className={styles.back}>
            <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 3 5 8l5 5" />
            </svg>
            All products
          </Link>

          <p className={styles.kicker}>
            {product.category} · {cs.year}
          </p>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.lead}>{product.tagline}</p>

          <dl className={styles.meta}>
            <div><dt>Role</dt><dd>{cs.role}</dd></div>
            <div><dt>Timeline</dt><dd>{cs.timeline}</dd></div>
            <div><dt>Platform</dt><dd>{cs.platform}</dd></div>
            <div><dt>Stack</dt><dd>{product.stack.join(", ")}</dd></div>
          </dl>

          <div className={styles.actions}>
            <a className="hero-cta hero-cta-primary" href={product.url} target="_blank" rel="noopener noreferrer">
              <span>Open {host}</span>
              <span className="hero-cta-icon" aria-hidden="true">
                <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12 12 4M6 4h6v6" />
                </svg>
              </span>
            </a>
            <Link className="hero-cta hero-cta-ghost" href="/#work">
              All products
            </Link>
          </div>
        </div>
      </header>

      <div className={styles.inner}>
        {product.screenshot ? (
          <figure className={styles.frame}>
            <span className={styles.frameInner}>
              <Image
                src={product.screenshot}
                alt={`${product.name}, first screen at 1440px`}
                width={1440}
                height={900}
                sizes="(max-width: 64rem) 100vw, 72rem"
                priority
                className={styles.shot}
              />
            </span>
            <figcaption className={styles.caption}>First screen, captured with a real browser at 1440px.</figcaption>
          </figure>
        ) : (
          <div className={styles.offline}>
            <span className={styles.offlineHost}>{host}</span>
            <span>{product.note}</span>
          </div>
        )}

        <Section label="Overview" title="What it is">
          <p className={styles.audience}>
            <span className={styles.audienceLabel}>For</span> {cs.audience}
          </p>
          {cs.overview.map((p) => (
            <p key={p.slice(0, 40)} className={styles.prose}>{p}</p>
          ))}
        </Section>

        {cs.features && cs.features.length > 0 && (
          <Section label="Scope" title="What it does">
            <ul className={styles.features}>
              {cs.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </Section>
        )}

        {cs.decisions && cs.decisions.length > 0 && (
          <Section label="Decisions" title="What was decided, and why">
            <ol className={styles.decisions}>
              {cs.decisions.map((d, i) => (
                <li key={d.title}>
                  <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{d.title}</h3>
                    <p>{d.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {cs.built && cs.built.length > 0 && (
          <Section label="Agents" title="How it was built">
            <ul className={styles.qa}>
              {cs.built.map((b) => (
                <li key={b.title}>
                  <h3>{b.title}</h3>
                  <p>{b.detail}</p>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {cs.qa && cs.qa.length > 0 && (
          <Section label="Quality" title="How it was tested">
            <ul className={styles.qa}>
              {cs.qa.map((q) => (
                <li key={q.title}>
                  <h3>{q.title}</h3>
                  <p>{q.detail}</p>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {cs.outcomes && cs.outcomes.length > 0 && (
          <Section label="Outcomes" title="What came of it">
            <ul className={styles.outcomes}>
              {cs.outcomes.map((o) => (
                <li key={o.slice(0, 40)}>{o}</li>
              ))}
            </ul>
          </Section>
        )}

        {cs.next && cs.next.length > 0 && (
          <Section label="Next" title="What comes next">
            <ul className={styles.features}>
              {cs.next.map((n) => (
                <li key={n.slice(0, 40)}>{n}</li>
              ))}
            </ul>
          </Section>
        )}

        {cs.status && <p className={styles.status}>{cs.status}</p>}

        <nav className={styles.footer} aria-label="Next case study">
          <Link href="/#work" className={styles.footerBack}>All products</Link>
          <Link href={`/products/${next.slug}`} className={styles.footerNext}>
            <span className={styles.footerLabel}>Next</span>
            <span className={styles.footerName}>{next.name}</span>
          </Link>
        </nav>
      </div>
    </main>
  );
}

function Section({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <p className={styles.sectionLabel}>{label}</p>
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}
