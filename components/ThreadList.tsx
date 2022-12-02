import { ThreadDocument } from "../services/threadService";
import styles from "../styles/components/List.module.scss";
import ThreadListItem from "./ThreadListItem";

interface ThreadListProps {
  threads: ThreadDocument[];
}

export default function ThreadList({ threads }: ThreadListProps) {
  if (!threads) return null;

  return (
    <ul className={styles["thread-list"]}>
      {threads.map((thread) => (
        <ThreadListItem key={thread._id} thread={thread} />
      ))}
    </ul>
  );
}
