import type { NextPage } from "next";
import React from "react";
import AppHead from "../components/util/AppHead";
import Main from "../components/layout/Main";
import { getAdmin } from "../services/adminService";
import AdminLoginForm from "../components/form/AdminLoginForm";
import AdminCreateForm from "../components/form/AdminCreateForm";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";

interface AdminProps {
  isAdminExists: boolean;
  isAdmin: boolean;
}

const Admin: NextPage<AdminProps> = ({ isAdminExists, isAdmin }) => {
  // Content to be rendered inside Main component
  let mainContent;
  if (isAdmin) {
    mainContent = <div>Logged In</div>;
  } else {
    mainContent = isAdminExists ? <AdminLoginForm /> : <AdminCreateForm />;
  }

  return (
    <>
      <AppHead title="Admin - Simple BBS" />

      <Main isCentered>{mainContent}</Main>
    </>
  );
};

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    let isAdmin = false;
    const isAdminExists = Boolean(await getAdmin());

    const user = req.session.user;
    if (user && user.admin) isAdmin = true;

    return {
      props: { isAdminExists, isAdmin },
    };
  },
  sessionOptions
);

export default Admin;
