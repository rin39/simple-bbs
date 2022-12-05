import { MessageDocument } from "../../services/messageService";
import styles from "../../styles/components/MessageListItem.module.scss";
import Button from "./Button";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import useAdminUtils from "../../hooks/useAdminUtils";

interface MessageListItemProps {
  message: MessageDocument;
  isPreview?: boolean;
}

export default function MessageListItem({
  message,
  isPreview = false,
}: MessageListItemProps) {
  const { isAdmin } = useContext(UserContext);
  const { deleteMessage } = useAdminUtils();

  const componentClassName = isPreview
    ? styles["preview-message-list-item"]
    : styles["message-list-item"];

  return (
    <li className={componentClassName}>
      <div className={styles["message-header"]}>
        <div className={styles["message-header_left-group"]}>
          <span>#{message.number}</span>
          {!isPreview && isAdmin && message.number !== 0 && (
            <Button onClick={() => deleteMessage(message._id)}>Delete</Button>
          )}
        </div>
        <span>{message.createdAt}</span>
      </div>
      <p className={styles["message-text"]}>{message.text}</p>
    </li>
  );
}
