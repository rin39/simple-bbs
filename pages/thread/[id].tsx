import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import AppHead from "../../components/AppHead";
import {
  getMessagesInThread,
  MessageDocument,
} from "../../services/messageService";
import { getThreadById, ThreadDocument } from "../../services/threadService";
import styles from "../../styles/thread.module.scss";
import Navigation from "../../components/Navigation";
import MessageListItem from "../../components/MessageListItem";
import NewMessageForm from "../../components/NewMessageForm";

interface ThreadPageProps {
  messages: MessageDocument[];
  thread: ThreadDocument;
}

const ThreadPage: NextPage<ThreadPageProps> = ({ messages, thread }) => {
  return (
    <main className={styles.main}>
      <AppHead title={`${thread.name} - Simple BBS`} />
      <Navigation
        additionalLinks={[{ href: `/board/${thread.board}`, text: "Back" }]}
      />
      <section className={styles.section}>
        <h1 className={styles["thread-name"]}>{thread.name}</h1>
        <ul className={styles["message-list"]}>
          {messages.map((message, idx) => (
            <MessageListItem key={message._id} message={message} idx={idx} />
          ))}
        </ul>
        <NewMessageForm thread={thread} />
      </section>
    </main>
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
