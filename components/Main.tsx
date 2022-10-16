import React from "react";
import styles from "../styles/components/Main.module.scss";

type MainProps = React.PropsWithChildren & { isIndexPage?: boolean };

export default function Main({ children, isIndexPage }: MainProps) {
  return (
    <main className={`${styles.main} ${isIndexPage && styles["mh-100vh"]}`}>
      {children}
    </main>
  );
}
