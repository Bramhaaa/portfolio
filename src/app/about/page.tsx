import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Meta,
  Schema,
  Row,
} from "@once-ui-system/core";
import { baseURL, about, person, social } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import React from "react";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.projects.title,
      display: about.projects.display,
      items: about.projects.projects.map((project) => project.title),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
  ];
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          s={{ hide: true }}
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <Row fillWidth s={{ direction: "column"}} horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            top="64"
            fitHeight
            position="sticky"
            s={{ position: "relative", style: { top: "auto" } }}
            xs={{ style: { top: "auto" } }}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size={20} />
            <Row gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Row>
            {person.languages && person.languages.length > 0 && (
              <Row wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag key={index} size="l">
                    {language}
                  </Tag>
                ))}
              </Row>
            )}
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>
            {social.length > 0 && (
              <Row
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded"
              >
                {social
                      .filter((item) => item.essential)
                      .map(
                  (item) =>
                    item.link && (
                      <React.Fragment key={item.name}>
                        <Row s={{ hide: true }}>
                          <Button
                            key={item.name}
                            href={item.link}
                            prefixIcon={item.icon}
                            label={item.name}
                            size="s"
                            weight="default"
                            variant="secondary"
                          />
                        </Row>
                        <Row hide s={{ hide: false }}>
                          <IconButton
                            size="l"
                            key={`${item.name}-icon`}
                            href={item.link}
                            icon={item.icon}
                            variant="secondary"
                          />
                        </Row>
                      </React.Fragment>
                    ),
                )}
              </Row>
            )}
          </Column>

          {about.intro.display && (
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
              {about.intro.description}
            </Column>
          )}

          {about.work.display && (
            <>
              <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                {about.work.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience, index) => (
                  <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth>
                    <Row fillWidth horizontal="between" vertical="end" marginBottom="4">
                      <Text id={experience.company} variant="heading-strong-l">
                        {experience.company}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {experience.timeframe}
                      </Text>
                    </Row>
                    <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                      {experience.role}
                    </Text>
                    <Column as="ul" gap="16">
                      {experience.achievements.map(
                        (achievement: React.ReactNode, index: number) => (
                          <Text
                            as="li"
                            variant="body-default-m"
                            key={`${experience.company}-${index}`}
                          >
                            {achievement}
                          </Text>
                        ),
                      )}
                    </Column>
                    {experience.images && experience.images.length > 0 && (
                      <Row fillWidth paddingTop="m" paddingLeft="40" gap="12" wrap>
                        {experience.images.map((image, index) => (
                          <Row
                            key={index}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                            />
                          </Row>
                        ))}
                      </Row>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.projects.display && (
            <>
              <Heading
                as="h2"
                id={about.projects.title}
                variant="display-strong-s"
                marginBottom="m"
              >
                {about.projects.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.projects.projects.map((project, index) => (
                  <Column key={`${project.title}-${index}`} fillWidth>
                    <Row fillWidth horizontal="between" vertical="center" marginBottom="4">
                      <Text id={project.title} variant="heading-strong-l">
                        {project.title}
                      </Text>
                      {project.link && (
                        <Button
                          href={project.link}
                          suffixIcon="arrowUpRightFromSquare"
                          label="Live demo"
                          size="s"
                          weight="default"
                          variant="secondary"
                        />
                      )}
                    </Row>
                    <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                      {project.description}
                    </Text>
                    <Column as="ul" gap="16">
                      {project.achievements.map((achievement, achievementIndex) => (
                        <Text
                          as="li"
                          variant="body-default-m"
                          key={`${project.title}-${achievementIndex}`}
                        >
                          {achievement}
                        </Text>
                      ))}
                    </Column>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.studies.display && (
            <>
              <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                {about.studies.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution, index) => (
                  <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                    <Text id={institution.name} variant="heading-strong-l">
                      {institution.name}
                    </Text>
                    <Text variant="heading-default-xs" onBackground="neutral-weak">
                      {institution.description}
                    </Text>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.technical.display && (
            <>
              <Heading
                as="h2"
                id={about.technical.title}
                variant="display-strong-s"
                marginBottom="32"
              >
                {about.technical.title}
              </Heading>
              <Row fillWidth gap="l" s={{ direction: "column" }}>
                <Column flex={1} gap="l">
                  {about.technical.skills
                    .filter((_, index) => index % 2 === 0)
                    .map((skill, index) => (
                      <Column
                        key={`${skill.title}-${index * 2}`}
                        className={styles.techCard}
                        fillWidth
                        padding="m"
                        radius="l"
                        background="surface"
                        gap="16"
                      >
                        <Text id={skill.title} variant="heading-strong-m">
                          {skill.title}
                        </Text>
                        {skill.tags && skill.tags.length > 0 && (
                          <Row wrap gap="8" fillWidth>
                            {skill.tags.map((tag, tagIndex) => (
                              <Tag
                                key={`${skill.title}-${tagIndex}`}
                                className={styles.techChip}
                                size="m"
                                prefixIcon={tag.icon}
                              >
                                {tag.name}
                              </Tag>
                            ))}
                          </Row>
                        )}
                      </Column>
                    ))}
                </Column>
                <Column flex={1} gap="l">
                  {about.technical.skills
                    .filter((_, index) => index % 2 !== 0)
                    .map((skill, index) => (
                      <Column
                        key={`${skill.title}-${index * 2 + 1}`}
                        className={styles.techCard}
                        fillWidth
                        padding="m"
                        radius="l"
                        background="surface"
                        gap="16"
                      >
                        <Text id={skill.title} variant="heading-strong-m">
                          {skill.title}
                        </Text>
                        {skill.tags && skill.tags.length > 0 && (
                          <Row wrap gap="8" fillWidth>
                            {skill.tags.map((tag, tagIndex) => (
                              <Tag
                                key={`${skill.title}-${tagIndex}`}
                                className={styles.techChip}
                                size="m"
                                prefixIcon={tag.icon}
                              >
                                {tag.name}
                              </Tag>
                            ))}
                          </Row>
                        )}
                      </Column>
                    ))}
                </Column>
              </Row>
            </>
          )}
        </Column>
      </Row>
    </Column>
  );
}
