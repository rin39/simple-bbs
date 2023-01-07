import Button from "../ui/Button";
import styles from "../../styles/components/CommonForm.module.scss";
import { NewBoardModalProps as NewBoardFormProps } from "../ui/NewBoardModal";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const initialFormData = {
  name: "",
  alias: "",
};

export default function NewBoardForm({ cancel }: NewBoardFormProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/boards", {
        name: formData.name.trim(),
        alias: formData.alias.trim(),
      });
      cancel();
      router.replace(router.asPath, undefined, { scroll: false });
    } catch {
      setError("Failed to create new board");
    }
  };

  return (
    <form className={styles["form-modal"]} onSubmit={handleSubmit}>
      <div className={styles["vertical-group"]}>
        <label htmlFor="board-name" className={styles["label"]}>
          Board Name
        </label>
        <input
          type="text"
          id="board-name"
          name="name"
          className={styles["input"]}
          onChange={handleFormDataChange}
        />
      </div>
      <div className={styles["vertical-group"]}>
        <label htmlFor="board-alias" className={styles["label"]}>
          Board Alias
        </label>
        <input
          type="text"
          id="board-alias"
          name="alias"
          className={styles["input"]}
          onChange={handleFormDataChange}
        />
      </div>
      <div className={styles["horizontal-group"]}>
        <Button>Create</Button>
        <Button onClick={() => cancel()}>Cancel</Button>
      </div>
      <div className={styles["horizontal-group"]}>
        <span className={styles["error"]}>{error}</span>
      </div>
    </form>
  );
}
