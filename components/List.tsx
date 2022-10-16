import Link from "next/link";
import React from "react";
import { BoardDocument } from "../services/boardService";
import { MessageDocument } from "../services/messageService";
import { ThreadDocument } from "../services/threadService";
import styles from "../styles/components/List.module.scss";
import MessageListItem from "./MessageListItem";
import ThreadListItem from "./ThreadListItem";

interface ListProps {
  of: MessageDocument[] | ThreadDocument[] | BoardDocument[];
}

/**
 * List of messages, threads or boards
 */
export default function List({ of: test }: ListProps) {
  if (test.length === 0) return null;
  if ((test[0] as BoardDocument).alias !== undefined) {
    return (
      <ul className={styles["board-list"]}>
        {(test as BoardDocument[]).map((board) => (
          <li key={board._id}>
            <Link href={`/board/${board.alias}`}>{board.name}</Link>
          </li>
        ))}
      </ul>
    );
  }
  if ((test[0] as ThreadDocument).name !== undefined) {
    return (
      <ul className={styles["thread-list"]}>
        {(test as ThreadDocument[]).map((thread) => (
          <ThreadListItem key={thread._id} thread={thread} />
        ))}
      </ul>
    );
  }
  if ((test[0] as MessageDocument).text !== undefined) {
    return (
      <ul className={styles["message-list"]}>
        {(test as MessageDocument[]).map((message, idx) => (
          <MessageListItem key={message._id} message={message} idx={idx} />
        ))}
      </ul>
    );
  }
  return null;
}
