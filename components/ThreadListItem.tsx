import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/ThreadListItem.module.scss";
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
      <div className={styles["head"]}>
        <h1 className={styles["header"]}>
          <Link href={`/thread/${thread._id}`}>{thread.name}</Link>
        </h1>
        <span>{thread.createdAt}</span>
      </div>
      <p className={styles["first-message"]}>{thread.firstMessage}</p>
    </li>
  );
}
