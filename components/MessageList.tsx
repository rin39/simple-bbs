import { MessageDocument } from "../services/messageService";
import styles from "../styles/components/List.module.scss";
import MessageListItem from "./MessageListItem";

interface MessageListProps {
  messages: MessageDocument[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <ul className={styles["message-list"]}>
      {messages.map((message, idx) => (
        <MessageListItem key={message._id} message={message} />
      ))}
    </ul>
  );
}
