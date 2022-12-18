import Button from "../ui/Button";
import styles from "../../styles/components/CommonForm.module.scss";
import { NewBoardModalProps as NewBoardFormProps } from "../ui/NewBoardModal";

export default function NewBoardForm({ cancel }: NewBoardFormProps) {
  return (
    <form className={styles["form-modal"]}>
      <div className={styles["vertical-group"]}>
        <label htmlFor="board-name" className={styles["label"]}>
          Board Name
        </label>
        <input type="text" id="board-name" className={styles["input"]} />
      </div>
      <div className={styles["vertical-group"]}>
        <label htmlFor="board-alias" className={styles["label"]}>
          Board Alias
        </label>
        <input type="text" id="board-alias" className={styles["input"]} />
      </div>
      <div className={styles["horizontal-group"]}>
        <Button>Create</Button>
        <Button onClick={() => cancel()}>Cancel</Button>
      </div>
    </form>
  );
}
