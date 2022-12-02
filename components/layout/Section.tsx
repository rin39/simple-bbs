import React from "react";
import styles from "../../styles/components/Section.module.scss";

export default function Section({ children }: React.PropsWithChildren) {
  return <section className={styles.section}>{children}</section>;
}
