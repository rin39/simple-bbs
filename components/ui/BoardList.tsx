import { BoardDocument } from "../../services/boardService";
import Link from "next/link";
import styles from "../../styles/components/List.module.scss";
import Button from "./Button";
import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import NewBoardModal from "./NewBoardModal";

interface BoardListProps {
  boards: BoardDocument[];
}

export default function BoardList({ boards }: BoardListProps) {
  const { isAdmin } = useContext(UserContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!boards.length && !isAdmin) return null;

  return (
    <section>
      <h1 className={styles["board-list-heading"]}>Boards</h1>
      <ul className={styles["board-list"]}>
        {isAdmin && (
          <li>
            <Button onClick={() => setIsModalVisible(true)}>
              Create New Board
            </Button>
          </li>
        )}
        {boards.map((board) => (
          <li key={board._id}>
            <Link href={`/board/${board.alias}`}>{board.name}</Link>
          </li>
        ))}
      </ul>
      {isModalVisible && (
        <NewBoardModal cancel={() => setIsModalVisible(false)} />
      )}
    </section>
  );
}
