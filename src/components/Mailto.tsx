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
      style={{
        maxWidth: "1280px",
        margin: "0 auto",
        position: "relative",
        background: "#141414",
        border: "2px solid var(--ds-border)",
        borderRadius: "0px",
        boxShadow: "6px 6px 0px #000000",
      }}
      {...flex}
    >
      <Column maxWidth="s" horizontal="center" align="center" gap="16">
        <Heading
          as="h2"
          style={{
            fontFamily: "var(--font-condensed)",
            fontSize: "clamp(36px, 5vw, 56px)",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            lineHeight: 1.0,
            color: "var(--ds-ink)",
            margin: 0,
            textAlign: "center",
          }}
        >
          Got something to build?
        </Heading>
        <Text
          wrap="balance"
          variant="body-default-m"
          style={{
            color: "var(--ds-ink-2)",
            textAlign: "center",
            maxWidth: "46ch",
            fontSize: "14px",
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
            style={{ borderRadius: "var(--ds-r-btn)" }}
          >
            Send an email
          </Button>
        </Row>
      </Column>
    </Column>
  );
};
