import { MessageDocument } from "../../services/messageService";
import styles from "../../styles/components/MessageListItem.module.scss";
import Button from "./Button";
import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import useAdminUtils from "../../hooks/useAdminUtils";
import ConfirmModal from "./ConfirmModal";

interface MessageListItemProps {
  message: MessageDocument;
  isPreview?: boolean;
}

export default function MessageListItem({
  message,
  isPreview = false,
}: MessageListItemProps) {
  const [isModalShown, setIsModalShown] = useState(false);
  const { isAdmin } = useContext(UserContext);
  const { deleteMessage } = useAdminUtils();

  const componentClassName = isPreview
    ? styles["preview-message-list-item"]
    : styles["message-list-item"];

  return (
    <>
      <li className={componentClassName}>
        <div className={styles["message-header"]}>
          <div className={styles["message-header_left-group"]}>
            <span>#{message.number}</span>
            {!isPreview && isAdmin && message.number !== 0 && (
              <Button onClick={() => setIsModalShown(true)}>Delete</Button>
            )}
          </div>
          <span>{message.createdAt}</span>
        </div>
        <p className={styles["message-text"]}>{message.text}</p>
      </li>
      {isModalShown && (
        <ConfirmModal
          deleteFunc={() => deleteMessage(message._id)}
          cancel={() => setIsModalShown(false)}
        />
      )}
    </>
  );
}
