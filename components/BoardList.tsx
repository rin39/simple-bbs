import Link from "next/link";
import React from "react";
import { BoardDocument } from "../services/boardService";
import styles from "../styles/BoardList.module.scss";

interface BoardsListProps {
  boards: BoardDocument[];
}

export default function BoardsList({ boards }: BoardsListProps) {
  return (
    <section>
      <h1 className={styles["header"]}>Boards</h1>
      <ul className={styles["list"]}>
        {boards.map((board) => (
          <li key={board._id}>
            <Link href={`/board/${board.alias}`}>{board.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
