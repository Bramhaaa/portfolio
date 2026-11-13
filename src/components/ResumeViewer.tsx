"use client";

import { useState } from "react";
import { Button, Heading, Text, Column, Row, Flex } from "@once-ui-system/core";

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
      style={{
        maxWidth: "1280px",
        margin: "0 auto",
        position: "relative",
        background: "#141414",
        border: "2px solid var(--ds-border)",
        borderRadius: "0px",
        boxShadow: "6px 6px 0px #000000",
      }}
    >
      <Column maxWidth="s" horizontal="center" align="center" gap="16">
        <Heading
          as="h2"
          style={{
            fontFamily: "var(--font-condensed)",
            fontSize: "clamp(32px, 5vw, 48px)",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            lineHeight: 1.0,
            color: "var(--ds-ink)",
            margin: 0,
            textAlign: "center",
          }}
        >
          My story on paper.
        </Heading>
        <Text
          wrap="balance"
          variant="body-default-m"
          style={{ color: "var(--ds-ink-2)", textAlign: "center", fontSize: "14px" }}
        >
          Interested in my experience and qualifications? View my resume directly on this page or download a copy.
        </Text>
        <Row gap="12" wrap paddingTop="4">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            size="m"
            variant={isOpen ? "secondary" : "primary"}
            prefixIcon={isOpen ? "eyeOff" : "eye"}
            style={{ borderRadius: "var(--ds-r-btn)" }}
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
            style={{ borderRadius: "var(--ds-r-btn)" }}
          >
            Download PDF
          </Button>
        </Row>
      </Column>

      <Flex
        fillWidth
        overflow="hidden"
        style={{
          position: "relative",
          zIndex: 2,
          marginTop: isOpen ? "24px" : "0",
          maxHeight: isOpen ? "1150px" : "0px",
          opacity: isOpen ? 1 : 0,
          borderRadius: "0px",
          border: isOpen ? "2px solid var(--ds-border)" : "none",
          boxShadow: isOpen ? "4px 4px 0px #000000" : "none",
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
            style={{ border: "none", background: "var(--ds-surface-2)" }}
            title="Resume Preview"
          />
        )}
      </Flex>
    </Column>
  );
};
