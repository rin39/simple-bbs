import React, { useState } from "react";
import styles from "../styles/components/CommonForm.module.scss";
import axios from "axios";
import { BoardDocument } from "../services/boardService";
import { useRouter } from "next/router";
import Button from "./Button";
import { ResponseData as ApiResponse } from "../pages/api/threads";

interface NewThreadFormProps {
  board: BoardDocument;
  hideForm: () => void;
}

const initialFormData = {
  name: "",
  message: "",
};

type formChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

export default function NewThreadForm({ board, hideForm }: NewThreadFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState(initialFormData);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    setError("");
    if (!formData.message.trim() || !formData.name.trim()) {
      setIsButtonDisabled(false);
      return setError("Thread name and message should not be empty");
    }
    try {
      const res = await axios.post<ApiResponse>("/api/threads", {
        name: formData.name.trim(),
        message: formData.message.trim(),
        board: board._id,
      });
      if (res.status === 200) {
        setFormData(initialFormData);
        router.replace(`/thread/${res.data.id}`);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return setError(e.response?.data.message);
      }
      setError("Failed to create new thread");
      setIsButtonDisabled(false);
    }
  };

  const handleFormDataChange = (e: formChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form className={styles["form"]} onSubmit={handleSubmit}>
      <Button
        className={styles["hide-form-btn"]}
        type="button"
        onClick={hideForm}
      >
        Hide
      </Button>
      <div className={styles["input-group"]}>
        <label htmlFor="new-thread-name" className={styles["label"]}>
          Thread Name
        </label>
        <input
          className={styles["input"]}
          id="new-thread-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleFormDataChange}
        />
      </div>
      <div className={styles["input-group"]}>
        <label htmlFor="thread-first-message" className={styles["label"]}>
          Message
        </label>
        <textarea
          className={styles["message"]}
          name="message"
          id="thread-first-message"
          value={formData.message}
          onChange={handleFormDataChange}
        ></textarea>
      </div>
      <div className={styles["btn-group"]}>
        <Button disabled={isButtonDisabled}>Create New Thread</Button>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </form>
  );
}
