import { GetServerSideProps, NextPage } from "next";
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

interface ThreadPageProps {
  messages: MessageDocument[];
  thread: ThreadDocument;
}

const ThreadPage: NextPage<ThreadPageProps> = ({ messages, thread }) => {
  return (
    <>
      <AppHead title={`${thread.name} - Simple BBS`} />
      <Navigation
        additionalLinks={[{ href: `/board/${thread.board}`, text: "Back" }]}
      />
      <Main>
        <Section>
          <h1 className={styles["thread-name"]}>{thread.name}</h1>
          <List of={messages} />
          <NewMessageForm thread={thread} />
        </Section>
      </Main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const threadId = context.params?.id as string;
  const thread = await getThreadById(threadId);
  if (!thread) return { notFound: true };
  const messages = await getMessagesInThread(threadId);
  return {
    props: { messages, thread },
  };
};

export default ThreadPage;
