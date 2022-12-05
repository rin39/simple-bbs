import styles from "../../styles/components/ConfirmModal.module.scss";
import Button from "./Button";

interface ConfirmModalProps {
  deleteFunc: () => void;
  cancel: () => void;
}

export default function ConfirmModal({
  cancel,
  deleteFunc,
}: ConfirmModalProps) {
  return (
    <div className={styles["backdrop"]} onClick={() => cancel()}>
      <div className={styles["confirm-modal"]}>
        <h1 className={styles["heading"]}>Are you sure?</h1>
        <div className={styles["button-group"]}>
          <Button onClick={() => deleteFunc()}>Delete</Button>
          <Button onClick={() => cancel()}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}
