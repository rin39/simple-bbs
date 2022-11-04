import { NextPage } from "next";
import AppHead from "../../components/AppHead";
import {
  getMessagesInThread,
  MessageDocument,
} from "../../services/messageService";
import { getThreadById, ThreadDocument } from "../../services/threadService";
import styles from "../../styles/pages/thread.module.scss";
import Navigation from "../../components/Navigation";
import NewMessageForm from "../../components/NewMessageForm";
import Main from "../../components/Main";
import Section from "../../components/Section";
import List from "../../components/List";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import Button from "../../components/Button";
import useAdminUtils from "../../hooks/useAdminUtils";

interface ThreadPageProps {
  messages: MessageDocument[];
  thread: ThreadDocument;
  isLoggedIn: boolean;
}

const ThreadPage: NextPage<ThreadPageProps> = ({
  messages,
  thread,
  isLoggedIn,
}) => {
  const { deleteThread } = useAdminUtils();

  return (
    <>
      <AppHead title={`${thread.name} - Simple BBS`} />
      <Navigation
        additionalLinks={[{ href: `/board/${thread.board}`, text: "Back" }]}
      />
      <Main>
        <Section>
          <h1 className={styles["thread-name"]}>{thread.name}</h1>
          {isLoggedIn && (
            <Button
              onClick={() => deleteThread(thread._id)}
              className={styles["delete-thread-btn"]}
            >
              Delete Thread
            </Button>
          )}
          <List of={messages} />
          <NewMessageForm thread={thread} />
        </Section>
      </Main>
    </>
  );
};

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, params }) {
    const threadId = params?.id as string;
    const thread = await getThreadById(threadId);
    if (!thread) return { notFound: true };
    const messages = await getMessagesInThread(threadId);

    // Check login status
    let isLoggedIn = false;
    const user = req.session.user;
    if (user) isLoggedIn = true;

    return {
      props: { messages, thread, isLoggedIn },
    };
  },
  sessionOptions
);

export default ThreadPage;
