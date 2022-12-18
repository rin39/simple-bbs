import styles from "../../styles/components/CommonModal.module.scss";
import NewBoardForm from "../form/NewBoardForm";

export interface NewBoardModalProps {
  cancel: () => void;
}

export default function NewBoardModal({ cancel }: NewBoardModalProps) {
  return (
    <div className={styles["backdrop"]} onClick={() => cancel()}>
      <div className={styles["modal"]}>
        <NewBoardForm cancel={() => cancel()} />
      </div>
    </div>
  );
}
