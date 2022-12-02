import { BoardDocument } from "../../services/boardService";
import Link from "next/link";
import styles from "../../styles/components/List.module.scss";

interface BoardListProps {
  boards: BoardDocument[];
}

export default function BoardList({ boards }: BoardListProps) {
  if (!boards.length) return null;

  return (
    <section>
      <h1 className={styles["board-list-heading"]}>Boards</h1>
      <ul className={styles["board-list"]}>
        {boards.map((board) => (
          <li key={board._id}>
            <Link href={`/board/${board.alias}`}>{board.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
