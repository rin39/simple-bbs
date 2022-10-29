import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import AppHead from "../components/AppHead";
import Main from "../components/Main";
import { getAdmin } from "../services/adminService";
import AdminLogin from "../components/AdminLogin";
import AdminCreate from "../components/AdminCreate";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";

interface AdminProps {
  isAdminExists: boolean;
  isLoggedIn: boolean;
}

const Admin: NextPage<AdminProps> = ({ isAdminExists, isLoggedIn }) => {
  // Content to be rendered inside Main component
  let mainContent;
  if (isLoggedIn) {
    mainContent = <div>Logged In</div>;
  } else {
    mainContent = isAdminExists ? <AdminLogin /> : <AdminCreate />;
  }

  return (
    <>
      <AppHead title="Admin - Simple BBS" />

      <Main isIndexPage>{mainContent}</Main>
    </>
  );
};

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    let isLoggedIn = false;
    const isAdminExists = Boolean(await getAdmin());

    const user = req.session.user;
    if (user) isLoggedIn = true;

    return {
      props: { isAdminExists, isLoggedIn },
    };
  },
  sessionOptions
);

export default Admin;
