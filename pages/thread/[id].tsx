import { GetServerSideProps, NextPage } from "next";
import AppHead from "../../components/util/AppHead";
import {
  getMessagesInThread,
  MessageDocument,
} from "../../services/messageService";
import { getThreadById, ThreadDocument } from "../../services/threadService";
import styles from "../../styles/pages/thread.module.scss";
import Navigation from "../../components/ui/Navigation";
import NewMessageForm from "../../components/form/NewMessageForm";
import Main from "../../components/layout/Main";
import Section from "../../components/layout/Section";
import Button from "../../components/ui/Button";
import useAdminUtils from "../../hooks/useAdminUtils";
import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import MessageList from "../../components/ui/MessageList";
import ConfirmModal from "../../components/ui/ConfirmModal";

interface ThreadPageProps {
  messages: MessageDocument[];
  thread: ThreadDocument;
}

const ThreadPage: NextPage<ThreadPageProps> = ({ messages, thread }) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const { deleteThread } = useAdminUtils();
  const { isAdmin } = useContext(UserContext);

  return (
    <>
      <AppHead title={`${thread.name} - Simple BBS`} />
      <Navigation
        additionalLinks={[{ href: `/board/${thread.board}`, text: "Back" }]}
      />
      <Main>
        <Section>
          <h1 className={styles["thread-name"]}>{thread.name}</h1>
          {isAdmin && (
            <Button
              // onClick={() => deleteThread(thread._id)}
              onClick={() => setIsModalShown(true)}
              className={styles["delete-thread-btn"]}
            >
              Delete Thread
            </Button>
          )}
          <MessageList messages={messages} />
          <NewMessageForm thread={thread} />
        </Section>
      </Main>

      {isModalShown && (
        <ConfirmModal
          deleteFunc={() => deleteThread(thread._id)}
          cancel={() => setIsModalShown(false)}
        />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const threadId = params?.id as string;
  const thread = await getThreadById(threadId);
  if (!thread) return { notFound: true };
  const messages = await getMessagesInThread(threadId);

  return {
    props: { messages, thread },
  };
};

export default ThreadPage;
