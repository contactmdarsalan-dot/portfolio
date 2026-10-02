import Image from "next/image";
import { products } from "@/data/products";
import styles from "./ProductsSection.module.css";

/**
 * Shipped products. The section a hiring manager is actually looking for,
 * and the one that did not exist: live software with users was mixed in
 * with Dribbble shots, so the real work read as mockups.
 *
 * The award-winning product is featured at full width; the rest sit in a
 * two-column grid beneath. Captures are the first screen of each site at
 * 1440px, taken with a real browser, not composed.
 */
export default function ProductsSection() {
  const featured = products.find((p) => p.featured) ?? products[0];
  const rest = products.filter((p) => p !== featured);

  return (
    <section className={styles.section} id="work" data-scroll-section>
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.kicker}>Selected work</p>
          <h2 className={styles.title}>Products that are live, with people using them.</h2>
          <p className={styles.lead}>
            Designed, tested and shipped. Each one opens in a new tab; the code
            is on GitHub where the link is shown.
          </p>
        </header>

        <Card product={featured} featured />

        <div className={styles.grid}>
          {rest.map((p) => (
            <Card key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({
  product,
  featured = false,
}: {
  product: (typeof products)[number];
  featured?: boolean;
}) {
  const host = product.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <article className={featured ? styles.cardFeatured : styles.card}>
      <a
        className={styles.frame}
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${product.name}`}
      >
        <span className={styles.frameInner}>
          {product.screenshot ? (
            <Image
              src={product.screenshot}
              alt={`${product.name}, first screen`}
              width={1440}
              height={900}
              sizes={featured ? "(max-width: 64rem) 100vw, 62vw" : "(max-width: 48rem) 100vw, 44vw"}
              className={styles.shot}
            />
          ) : (
            <span className={styles.placeholder}>
              <span className={styles.placeholderHost}>{host}</span>
              <span className={styles.placeholderNote}>{product.note}</span>
            </span>
          )}
        </span>
      </a>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.category}>{product.category}</span>
          {product.featured && product.note && (
            <span className={styles.award}>
              <span className={styles.awardDot} aria-hidden="true" />
              {product.note}
            </span>
          )}
        </div>

        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.tagline}>{product.tagline}</p>

        <ul className={styles.stack}>
          {product.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <div className={styles.links}>
          <a href={product.url} target="_blank" rel="noopener noreferrer" className={styles.live}>
            {host}
            <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12 12 4M6 4h6v6" />
            </svg>
          </a>
          {product.repo && (
            <a href={product.repo} target="_blank" rel="noopener noreferrer" className={styles.repo}>
              Source on GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
