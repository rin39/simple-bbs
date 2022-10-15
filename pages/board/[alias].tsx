import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import AppHead from "../../components/AppHead";
import Navigation from "../../components/Navigation";
import NewThreadForm from "../../components/NewThreadForm";
import ThreadListItem from "../../components/ThreadListItem";
import { BoardDocument, getBoardByAlias } from "../../services/boardService";
import {
  getNumberOfPagesInBoard,
  getThreadsInBoard,
  ThreadDocument,
} from "../../services/threadService";
import styles from "../../styles/pages/board.module.scss";

interface BoardPageProps {
  board: BoardDocument;
  threads: ThreadDocument[];
  pages: number;
  currentPage: number;
}

const BoardPage: NextPage<BoardPageProps> = ({
  board,
  threads,
  pages,
  currentPage,
}) => {
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
      <ul className={styles.pagination}>
        {Array.from(Array(pages).keys()).map((page) => {
          page++;
          return (
            <Link key={page} href={`/board/${board.alias}?page=${page}`}>
              <a className={currentPage === page ? styles["active-page"] : ""}>
                {page}
              </a>
            </Link>
          );
        })}
      </ul>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const boardAlias = context.params?.alias as string;
  const pageQuery = context.query?.page as string;

  let page = parseInt(pageQuery);
  if (!page || page <= 0) page = 1;

  const board = await getBoardByAlias(boardAlias);
  if (!board) return { notFound: true };

  const pages = await getNumberOfPagesInBoard(board._id);
  if (page > pages) page = 1;
  const threads = await getThreadsInBoard(board._id, page);

  return {
    props: { board, threads, pages, currentPage: page },
  };
};

export default BoardPage;
