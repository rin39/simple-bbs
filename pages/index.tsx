import type { NextPage } from "next";
import AppHead from "../components/AppHead";
import List from "../components/List";
import Main from "../components/Main";
import { getBoards, BoardDocument } from "../services/boardService";
import styles from "../styles/pages/index.module.scss";

interface HomeProps {
  boards: BoardDocument[];
}

const Home: NextPage<HomeProps> = ({ boards }) => {
  return (
    <>
      <AppHead title="Simple BBS" />

      <Main isIndexPage>
        <section>
          <h1 className={styles["board-list-heading"]}>Boards</h1>
          <List of={boards} />
        </section>
      </Main>
    </>
  );
};

export async function getServerSideProps() {
  const boards = await getBoards();
  return {
    props: {
      boards,
    },
  };
}

export default Home;
