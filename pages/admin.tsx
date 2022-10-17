import type { NextPage } from "next";
import React from "react";
import AppHead from "../components/AppHead";
import Main from "../components/Main";
import styles from "../styles/components/CommonForm.module.scss";

const Admin: NextPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <AppHead title="Admin - Simple BBS" />

      <Main isIndexPage>
        <form onSubmit={handleSubmit}>
          <input name="password" type="text" className={styles.input} />
        </form>
      </Main>
    </>
  );
};

export default Admin;
