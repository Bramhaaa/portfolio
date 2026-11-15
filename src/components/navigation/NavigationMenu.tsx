"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { person } from "@/resources";
import styles from "./NavigationMenu.module.scss";

export function NavigationMenu() {
  const pathname = usePathname();

  return (
    <header className={styles.navWrapper}>
      <nav className={`${styles.navBar} glass`} aria-label="Main Navigation">
        <Link href="/" className={styles.brandLink}>
          <span className={styles.brandDot} />
          <span>{person.firstName}</span>
        </Link>

        <Link
          href="/"
          className={`${styles.navLink} ${pathname === "/" ? styles.active : ""}`}
        >
          Home
        </Link>

        <Link
          href="/about"
          className={`${styles.navLink} ${pathname === "/about" ? styles.active : ""}`}
        >
          About
        </Link>

        <Link
          href="/work"
          className={`${styles.navLink} ${pathname.startsWith("/work") ? styles.active : ""}`}
        >
          Work
        </Link>

        <a
          href={`mailto:${person.email}`}
          className={styles.statusIndicator}
          title="Send email"
        >
          <span className={styles.pulseDot} />
          <span>Available</span>
        </a>
      </nav>
    </header>
  );
}
