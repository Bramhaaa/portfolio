import React from "react";
import { about } from "@/resources";
import styles from "./AboutSection.module.scss";

export function WorkExperienceSection() {
  if (!about.work.display) return null;

  return (
    <section id="experience" className={styles.aboutContainer} style={{ paddingTop: "24px" }}>
      <div className={styles.aboutPanel}>
        <h3 className={styles.aboutHeading}>{about.work.title}</h3>
        <div className={styles.timeline}>
          {about.work.experiences.map((exp, idx) => (
            <div key={idx} className={styles.timelineItem}>
              <span className={styles.timelineMarker} />
              <h4 className={styles.company}>{exp.company}</h4>
              <span className={styles.timeframe}>{exp.timeframe}</span>
              <span className={styles.roleTitle}>{exp.role}</span>
              <ul className={styles.bulletList}>
                {exp.achievements.map((item, aIdx) => (
                  <li key={aIdx} className={styles.bulletItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TechStackSection() {
  if (!about.technical.display) return null;

  return (
    <section id="tech-stack" className={styles.aboutContainer} style={{ paddingTop: "32px", paddingBottom: "24px" }}>
      <div className={styles.aboutPanel}>
        <h3 className={styles.aboutHeading}>{about.technical.title}</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {about.technical.skills.map((skillGroup, idx) => (
            <div key={idx} className={styles.skillCategory}>
              <span className={styles.skillTitle}>{skillGroup.title}</span>
              <div className={styles.tagsRow}>
                {skillGroup.tags &&
                  skillGroup.tags.map((tag, tIdx) => (
                    <span key={tIdx} className={styles.skillChip}>
                      {tag.name}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
