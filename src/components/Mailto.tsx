"use client";

import { newsletter, person } from "@/resources";
import { Button, Heading, Text, Column, Row } from "@once-ui-system/core";

export const Mailto: React.FC<React.ComponentProps<typeof Column>> = ({ ...flex }) => {
  if (newsletter.display === false) return null;

  return (
    <Column
      overflow="hidden"
      fillWidth
      padding="xl"
      radius="l"
      marginBottom="m"
      horizontal="center"
      align="center"
      className="glass"
      style={{
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        margin: "0 auto",
        position: "relative",
        borderRadius: "24px",
        padding: "48px 32px",
        borderTop: "1px solid var(--accent-edge)",
        transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
      }}
      {...flex}
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
          Got something to build?
        </h2>
        <Text
          wrap="balance"
          variant="body-default-m"
          style={{
            color: "var(--text-soft)",
            textAlign: "center",
            maxWidth: "48ch",
            fontSize: "15px",
            lineHeight: "1.6",
          }}
        >
          Have a project, role, or question? Send me a direct email or connect through LinkedIn.
        </Text>
        <Row height="48" vertical="center" fillWidth horizontal="center" paddingTop="8">
          <Button
            href={`mailto:${person.email}`}
            size="m"
            variant="primary"
            suffixIcon="arrowUpRight"
          >
            Send an email
          </Button>
        </Row>
      </Column>
    </Column>
  );
};
