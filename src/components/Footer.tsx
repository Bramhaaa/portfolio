import { Row, IconButton, Text } from "@once-ui-system/core";
import { person, social } from "@/resources";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Row
      as="footer"
      fillWidth
      padding="8"
      horizontal="center"
      s={{ direction: "column" }}
      style={{ borderTop: "2px solid var(--ds-border)", marginTop: "32px" }}
    >
      <Row
        className={styles.mobile}
        maxWidth="m"
        paddingY="12"
        paddingX="16"
        gap="16"
        horizontal="between"
        vertical="center"
        s={{
          direction: "column",
          horizontal: "center",
          align: "center",
        }}
      >
        <Text
          variant="body-default-s"
          style={{
            fontFamily: "var(--font-code)",
            fontSize: "12px",
            color: "#ffffff",
          }}
        >
          <span>© {currentYear} /</span>
          <span style={{ padding: "0 6px", color: "#ffffff" }}>{person.name}</span>
        </Text>
        <Row gap="12">
          {social.map(
            (item) =>
              item.link && (
                <IconButton
                  key={item.name}
                  href={item.link}
                  icon={item.icon}
                  tooltip={item.name}
                  size="s"
                  variant="ghost"
                  style={{ color: "#ffffff" }}
                />
              ),
          )}
        </Row>
      </Row>
      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
};
