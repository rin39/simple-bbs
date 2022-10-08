import type { NextPage } from "next";
import AppHead from "../components/AppHead";
import BoardList from "../components/BoardList";
import { getBoards, BoardDocument } from "../services/boardService";
import styles from "../styles/index.module.scss";

interface HomeProps {
  boards: BoardDocument[];
}

const Home: NextPage<HomeProps> = ({ boards }) => {
  return (
    <>
      <AppHead title="Simple BBS" />

      <main className={styles.main}>
        <BoardList boards={boards} />
      </main>
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
