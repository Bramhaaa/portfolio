"use client";

import { useState } from "react";
import { Button, Heading, Text, Column, Row, Flex, Icon } from "@once-ui-system/core";

export const ResumeViewer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Column
      fillWidth
      padding="xl"
      radius="l"
      marginBottom="xl"
      horizontal="center"
      align="center"
      background="surface"
      border="neutral-alpha-weak"
      style={{ maxWidth: "80rem", margin: "0 auto", position: "relative" }}
    >
      <Column maxWidth="s" horizontal="center" align="center" gap="16">
        <Row gap="12" vertical="center">
          <Icon name="document" onBackground="brand-medium" size="m" />
          <Heading as="h2" variant="display-strong-s">
            Resume / CV
          </Heading>
        </Row>
        <Text wrap="balance" variant="body-default-m" onBackground="neutral-weak" align="center">
          Interested in my experience? View my resume directly on the page or download it to keep a
          copy.
        </Text>
        <Row gap="12" wrap>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            size="m"
            variant={isOpen ? "secondary" : "primary"}
            prefixIcon={isOpen ? "eyeOff" : "eye"}
          >
            {isOpen ? "Hide Resume" : "View Resume"}
          </Button>
          <Button
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            size="m"
            variant="secondary"
            suffixIcon="arrowUpRight"
          >
            Download PDF
          </Button>
        </Row>
      </Column>

      <Flex
        fillWidth
        radius="m"
        overflow="hidden"
        border={isOpen ? "neutral-medium" : undefined}
        style={{
          position: "relative",
          zIndex: 2,
          marginTop: isOpen ? "24px" : "0",
          maxHeight: isOpen ? "1150px" : "0px",
          opacity: isOpen ? 1 : 0,
          transition:
            "max-height 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, margin-top 0.6s ease",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {isOpen && (
          <iframe
            src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
            width="100%"
            height="1150px"
            style={{ border: "none" }}
            title="Resume Preview"
          />
        )}
      </Flex>
    </Column>
  );
};
