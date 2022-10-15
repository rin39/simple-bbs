import Link from "next/link";
import React from "react";
import styles from "../styles/components/Navigation.module.scss";

interface NavigationProps {
  additionalLinks?: {
    href: string;
    text: string;
  }[];
}

export default function Navigation({ additionalLinks }: NavigationProps) {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles["nav-list"]}>
          <li>
            <Link href="/">Home</Link>
          </li>
          {additionalLinks?.map((additionalLink, idx) => (
            <li key={idx}>
              <Link href={additionalLink.href}>{additionalLink.text}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
