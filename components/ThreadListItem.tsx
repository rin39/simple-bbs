import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/components/ThreadListItem.module.scss";
import { ThreadDocument } from "../services/threadService";

interface ThreadListItemsProps {
  thread: ThreadDocument;
}

export default function ThreadListItem({ thread }: ThreadListItemsProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/thread/${thread._id}`);
  };
  return (
    <li className={styles["thread-list-item"]} onClick={handleClick}>
      <h1 className={styles["heading"]}>
        <Link href={`/thread/${thread._id}`}>{thread.name}</Link>
      </h1>
      <div className={styles["created-at"]}>{thread.createdAt}</div>
      <p className={styles["message"]}>{thread.firstMessage}</p>
      {thread.lastMessages?.map((message) => (
        <div key={message._id}>
          <hr className={styles["message-separator"]} />
          <p className={styles["message"]}>{message.text}</p>
        </div>
      ))}
    </li>
  );
}
