import type { NextPage } from "next";
import AppHead from "../components/util/AppHead";
import BoardList from "../components/ui/BoardList";
import Main from "../components/layout/Main";
import { getBoards, BoardDocument } from "../services/boardService";

interface HomeProps {
  boards: BoardDocument[];
}

const Home: NextPage<HomeProps> = ({ boards }) => {
  return (
    <>
      <AppHead title="Simple BBS" />

      <Main isCentered>
        <BoardList boards={boards} />
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
