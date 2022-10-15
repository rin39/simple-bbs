import { GetServerSideProps, NextPage } from "next";
import AppHead from "../../components/AppHead";
import Navigation from "../../components/Navigation";
import NewThreadForm from "../../components/NewThreadForm";
import ThreadListItem from "../../components/ThreadListItem";
import { BoardDocument, getBoardByAlias } from "../../services/boardService";
import {
  getThreadsInBoard,
  ThreadDocument,
} from "../../services/threadService";
import styles from "../../styles/pages/board.module.scss";

interface BoardPageProps {
  board: BoardDocument;
  threads: ThreadDocument[];
}

const BoardPage: NextPage<BoardPageProps> = ({ board, threads }) => {
  return (
    <main className={styles.main}>
      <AppHead title={`${board.name} - Simple BBS`} />
      <Navigation />
      <section className={styles.section}>
        <NewThreadForm board={board} />
        <ul className={styles["thread-list"]}>
          {threads.map((thread) => (
            <ThreadListItem key={thread._id} thread={thread} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const boardId = context.params?.id as string;
  const board = await getBoardByAlias(boardId);
  if (!board) return { notFound: true };
  const threads = await getThreadsInBoard(board._id);
  return {
    props: { board, threads },
  };
};

export default BoardPage;
