import { credentials, contactChannels } from "@/data/resume";
import { resumeFile } from "@/data/profile";
import styles from "./ResumeSection.module.css";

/**
 * Experience, education and contact.
 *
 * This content used to live inside the scroll-driven canvas section, pinned to
 * a 3D character sequence. Two problems with that: the character belongs to the
 * hero and repeating it here diluted it, and work history is reference
 * material - people scan it for dates and titles rather than scroll through it
 * as a story. So it is laid out to be read, not performed.
 */
export default function ResumeSection() {
  const experience = credentials.filter((c) => c.kind === "Experience");
  const education = credentials.filter((c) => c.kind === "Education");

  return (
    <section className={styles.section} id="resume" data-scroll-section>
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.kicker}>Experience &amp; education</p>
          <h2 className={styles.title}>Three years of shipping work people use.</h2>
        </header>

        <Group label="Experience" items={experience} />
        <Group label="Education" items={education} />

        <footer className={styles.contact} id="contact">
          <div>
            <p className={styles.kicker}>Contact</p>
            <h3 className={styles.contactTitle}>Send a problem. You will get a plan, then a build.</h3>
          </div>

          <ul className={styles.channels}>
            {contactChannels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <span className={styles.channelLabel}>{c.label}</span>
                  <span className={styles.channelValue}>{c.value}</span>
                </a>
              </li>
            ))}
            <li>
              <a href={resumeFile} className={styles.resumeLink}>
                <span className={styles.channelLabel}>Resume</span>
                <span className={styles.channelValue}>Open, print to PDF</span>
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </section>
  );
}

function Group({
  label,
  items,
}: {
  label: string;
  items: typeof credentials;
}) {
  return (
    <div className={styles.group}>
      {/* The label sticks while its entries scroll past, so you always know
          which half of the CV you are reading without a heading repeating. */}
      <h3 className={styles.groupLabel}>{label}</h3>

      <ol className={styles.entries}>
        {items.map((item) => (
          <li key={`${item.org}-${item.title}`} className={styles.entry}>
            <p className={styles.period}>{item.period}</p>
            <div className={styles.entryBody}>
              <h4 className={styles.role}>{item.title}</h4>
              <p className={styles.org}>{item.org}</p>
              <p className={styles.meta}>{item.meta}</p>
              <ul className={styles.bullets}>
                {item.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
