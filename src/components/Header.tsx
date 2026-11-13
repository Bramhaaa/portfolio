"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { person } from "@/resources";
import styles from "./Header.module.scss";

export const Header = () => {
  const pathname = usePathname() ?? "";

  return (
    <header className={styles.topBar}>
      <div className={styles.inner}>
        {/* Left: Accent Initial Square + Name */}
        <Link href="/" className={styles.leftGroup}>
          <div className={styles.logoSquare}>BB</div>
          <span className={styles.brandName}>{person.name}</span>
        </Link>

        {/* Right: Nav Links + Status Badge */}
        <div className={styles.rightGroup}>
          <nav className={styles.navLinks}>
            <Link
              href="/about"
              className={`${styles.navLink} ${pathname === "/about" ? styles.activeLink : ""}`}
            >
              About
            </Link>
          </nav>

          {/* Status Badge */}
          <a
            href={`mailto:${person.email}`}
            className={styles.statusBadge}
          >
            <span className={styles.greenDot} />
            <span>Open to opportunities</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
