import { MessageDocument } from "../services/messageService";
import styles from "../styles/components/MessageListItem.module.scss";

interface MessageListItemProps {
  message: MessageDocument;
  className: string;
}

export default function MessageListItem({
  message,
  className,
}: MessageListItemProps) {
  return (
    <li className={className || styles["message-list-item"]}>
      <div className={styles["message-header"]}>
        <span>#{message.number}</span>
        <span>{message.createdAt}</span>
      </div>
      <p className={styles["message-text"]}>{message.text}</p>
    </li>
  );
}
