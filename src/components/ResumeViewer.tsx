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
      className="glass"
      style={{
        maxWidth: "1120px",
        margin: "0 auto",
        position: "relative",
        borderRadius: "24px",
        padding: "48px 32px",
      }}
    >
      <Column maxWidth="s" horizontal="center" align="center" gap="16">
        <h2
          style={{
            fontFamily: "var(--font-body), 'Geist', sans-serif",
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "var(--text)",
            margin: 0,
            textAlign: "center",
          }}
        >
          My story on paper.
        </h2>
        <Text
          wrap="balance"
          variant="body-default-m"
          style={{ color: "var(--text-soft)", textAlign: "center", fontSize: "15px", lineHeight: "1.6" }}
        >
          Interested in my experience and qualifications? View my resume directly on this page or download a copy.
        </Text>
        <Row gap="12" wrap paddingTop="8">
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
        overflow="hidden"
        style={{
          position: "relative",
          zIndex: 2,
          marginTop: isOpen ? "28px" : "0",
          maxHeight: isOpen ? "1150px" : "0px",
          opacity: isOpen ? 1 : 0,
          borderRadius: "16px",
          border: isOpen ? "1px solid var(--chip-edge)" : "none",
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
            style={{ border: "none", background: "rgba(10, 12, 18, 0.8)", borderRadius: "16px" }}
            title="Resume Preview"
          />
        )}
      </Flex>
    </Column>
  );
};
