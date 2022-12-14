import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import AppHead from "../../components/util/AppHead";
import Button from "../../components/ui/Button";
import Main from "../../components/layout/Main";
import Section from "../../components/layout/Section";
import Navigation from "../../components/ui/Navigation";
import NewThreadForm from "../../components/form/NewThreadForm";
import { BoardDocument, getBoardByAlias } from "../../services/boardService";
import {
  getNumberOfPagesInBoard,
  getThreadsInBoard,
  ThreadDocument,
} from "../../services/threadService";
import styles from "../../styles/pages/board.module.scss";
import BoardPagination from "../../components/ui/BoardPagination";
import ThreadList from "../../components/ui/ThreadList";

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
          <ThreadList threads={threads} />
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

  // Get current page
  // if no page query param provided or query param is negative
  // consider current page to be first
  let page = parseInt(pageQuery);
  if (!page || page <= 0) page = 1;

  const board = await getBoardByAlias(boardAlias);
  if (!board) return { notFound: true };

  const pages = await getNumberOfPagesInBoard(board._id);
  // When trying to access page which does not exist
  // consider current page to be first
  if (page > pages) page = 1;
  const threads = await getThreadsInBoard(board._id, page);

  return {
    props: { board, threads, pages, currentPage: page },
  };
};

export default BoardPage;
