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
// TODO: find a better way to do it
export default function List({ of }: ListProps) {
  if (of.length === 0) return null;
  if ((of[0] as BoardDocument).alias !== undefined) {
    return (
      <ul className={styles["board-list"]}>
        {(of as BoardDocument[]).map((board) => (
          <li key={board._id}>
            <Link href={`/board/${board.alias}`}>{board.name}</Link>
          </li>
        ))}
      </ul>
    );
  }
  if ((of[0] as ThreadDocument).name !== undefined) {
    return (
      <ul className={styles["thread-list"]}>
        {(of as ThreadDocument[]).map((thread) => (
          <ThreadListItem key={thread._id} thread={thread} />
        ))}
      </ul>
    );
  }
  if ((of[0] as MessageDocument).text !== undefined) {
    return (
      <ul className={styles["message-list"]}>
        {(of as MessageDocument[]).map((message, idx) => (
          <MessageListItem key={message._id} message={message} idx={idx} />
        ))}
      </ul>
    );
  }
  return null;
}
