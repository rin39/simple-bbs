import { MessageDocument } from "../services/messageService";
import styles from "../styles/MessageListItem.module.scss";

interface MessageListItemProps {
  message: MessageDocument;
  idx: number;
}

export default function MessageListItem({
  message,
  idx,
}: MessageListItemProps) {
  return (
    <li>
      <div key={message._id} className={styles["message-list-item"]}>
        <div className={styles["message-header"]}>
          <span>#{idx}</span>
          <span>{message.createdAt}</span>
        </div>
        <p className={styles["message-text"]}>{message.text}</p>
      </div>
    </li>
  );
}
