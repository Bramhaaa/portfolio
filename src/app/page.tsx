import Link from "next/link";
import { Schema, Meta } from "@once-ui-system/core";
import { home, about, person, baseURL } from "@/resources";
import { Mailto, CodingStats, ResumeViewer } from "@/components";
import { Projects } from "@/components/work/Projects";
import styles from "./page.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Hero Section — Decluttered, High-Impact Neo-Brutalist */}
      <section className={styles.heroWrapper}>
        {/* Giant Outlined Word behind everything (Spider-Verse street-art backdrop) */}
        <div className={styles.outlinedHeroWord}>DEVELOPER</div>

        <div className={styles.heroContent}>
          <div className={styles.nameBlock}>
            <span className={styles.greetingText}>Hello, I'm</span>
            <div className={styles.accentNameBox}>BRAMHA.</div>
          </div>

          <div className={styles.roleLine}>
            <span className={styles.roleBullet} />
            <span className={styles.roleTitle}>Software Engineer</span>
          </div>

          <p className={styles.introBio}>
            I build apps for <strong>Mac, Android, and the web</strong>, then engineer{" "}
            <strong>scalable backends and local-first AI systems</strong>. When the code is
            done, I'm usually <strong>learning new architectures or solving algorithmic problems</strong>.
          </p>

          <div className={styles.ctaRow}>
            <a href="#work" className={styles.primaryCta}>
              See the work →
            </a>
            <a href={`mailto:${person.email}`} className={styles.ghostCta}>
              Get in touch
            </a>
          </div>
        </div>

        {/* Bottom Stats Row */}
        <div className={styles.statsRow}>
          <div className={styles.statBox}>
            <span className={styles.statNum}>9.13</span>
            <span className={styles.statLabel}>CGPA @ BMS College of Engineering</span>
          </div>

          <div className={styles.statBox}>
            <span className={styles.statNum}>2+</span>
            <span className={styles.statLabel}>Internships across Samsung & AI labs</span>
          </div>

          <div className={styles.statBox}>
            <span className={styles.statNum}>2027</span>
            <span className={styles.statLabel}>Graduating Computer Science</span>
          </div>
        </div>
      </section>

      {/* On The Bench Section — Dedicated Clean Neo-Brutalist Grid */}
      <section className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>ACTIVE LABS</div>
          <h2 className={styles.sectionTitle}>On the bench right now.</h2>
          <p className={styles.sectionSubtitle}>
            Prototypes, local-first architectures, and system utilities currently in development.
          </p>
        </div>

        <div className={styles.benchGrid}>
          <div className={styles.benchCard}>
            <div className={styles.benchCardTag}>LOCAL-FIRST RAG</div>
            <h3 className={styles.benchCardTitle}>PaperMind Workspace</h3>
            <p className={styles.benchCardDesc}>
              A local-first, privacy-focused document intelligence workspace powered by hybrid RAG and pgvector.
            </p>
          </div>

          <div className={styles.benchCard}>
            <div className={styles.benchCardTag}>MACOS UTILITY</div>
            <h3 className={styles.benchCardTitle}>Hover Dock</h3>
            <p className={styles.benchCardDesc}>
              Native macOS lightweight utility bringing interactive window previews and controls to Dock icons.
            </p>
          </div>

          <div className={styles.benchCard}>
            <div className={styles.benchCardTag}>REAL-TIME AI</div>
            <h3 className={styles.benchCardTitle}>Search & Chat Engine</h3>
            <p className={styles.benchCardDesc}>
              FastAPI and WebSocket conversational search engine querying documents with low-latency streaming AI.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>PORTFOLIO</div>
          <h2 className={styles.sectionTitle}>Things I've shipped.</h2>
          <p className={styles.sectionSubtitle}>
            Native applications, developer tools, and scalable intelligent systems.
          </p>
        </div>
        <Projects />
      </section>

      {/* Coding Stats Dashboard */}
      <section id="stack" style={{ width: "100%" }}>
        <CodingStats />
      </section>

      {/* Resume Section */}
      <section style={{ width: "100%" }}>
        <ResumeViewer />
      </section>

      {/* Contact Section */}
      <section style={{ width: "100%" }}>
        <Mailto />
      </section>
    </div>
  );
}
