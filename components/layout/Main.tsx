import React from "react";
import styles from "../../styles/components/Main.module.scss";

type MainProps = React.PropsWithChildren & { isCentered?: boolean };

export default function Main({ children, isCentered }: MainProps) {
  return (
    <main className={`${styles.main} ${isCentered && styles["mh-100vh"]}`}>
      {children}
    </main>
  );
}
