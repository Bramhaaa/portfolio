"use client";

import { Carousel, Column, SmartLink, Text, Icon } from "@once-ui-system/core";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
}) => {
  return (
    <div className={styles.card}>
      {images?.length > 0 && (
        <div className={styles.imageFrame}>
          <Carousel
            aspectRatio="16 / 10"
            sizes="(max-width: 960px) 100vw, 1200px"
            items={images.map((image) => ({
              slide: image,
              alt: title,
            }))}
          />
        </div>
      )}

      <div className={styles.contentWrapper}>
        {title && <h3 className={styles.title}>{title}</h3>}

        {description?.trim() && (
          <p className={styles.description}>{description}</p>
        )}

        <div className={styles.actionRow}>
          <SmartLink href={href} className={styles.caseButton}>
            <span>Read case file</span>
            <Icon name="arrowRight" size="xs" />
          </SmartLink>

          {link && (
            <SmartLink
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.externalLink}
            >
              <span>View source</span>
              <Icon name="arrowUpRightFromSquare" size="xs" />
            </SmartLink>
          )}
        </div>
      </div>
    </div>
  );
};
