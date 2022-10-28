import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import AppHead from "../../components/AppHead";
import Button from "../../components/Button";
import Main from "../../components/Main";
import Navigation from "../../components/Navigation";
import NewThreadForm from "../../components/NewThreadForm";
import Section from "../../components/Section";
import List from "../../components/List";
import { BoardDocument, getBoardByAlias } from "../../services/boardService";
import {
  getNumberOfPagesInBoard,
  getThreadsInBoard,
  ThreadDocument,
} from "../../services/threadService";
import styles from "../../styles/pages/board.module.scss";
import BoardPagination from "../../components/BoardPagination";

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
  const [isNewThreadFormShown, setIsNewThreadFormShown] = useState(false);
  const toggleNewThreadForm = () => setIsNewThreadFormShown((prev) => !prev);

  return (
    <>
      <AppHead title={`${board.name} - Simple BBS`} />
      <Navigation />
      <Main>
        <Section>
          {isNewThreadFormShown ? (
            <NewThreadForm board={board} hideForm={toggleNewThreadForm} />
          ) : (
            <Button
              className={styles["create-new-thread-btn"]}
              onClick={toggleNewThreadForm}
            >
              Create New Thread
            </Button>
          )}
          <List of={threads} />
          <BoardPagination
            pages={pages}
            currentPage={currentPage}
            boardAlias={board.alias}
          />
        </Section>
      </Main>
    </>
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
