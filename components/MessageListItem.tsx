import { MessageDocument } from "../services/messageService";
import styles from "../styles/components/MessageListItem.module.scss";
import Button from "./Button";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import useAdminUtils from "../hooks/useAdminUtils";

interface MessageListItemProps {
  message: MessageDocument;
  className: string;
}

export default function MessageListItem({
  message,
  className,
}: MessageListItemProps) {
  const isAdmin = useContext(UserContext);
  const { deleteMessage } = useAdminUtils();

  return (
    <li className={className || styles["message-list-item"]}>
      <div className={styles["message-header"]}>
        <div className={styles["message-header_left-group"]}>
          <span>#{message.number}</span>
          {isAdmin && (
            <Button onClick={() => deleteMessage(message._id)}>Delete</Button>
          )}
        </div>
        <span>{message.createdAt}</span>
      </div>
      <p className={styles["message-text"]}>{message.text}</p>
    </li>
  );
}
