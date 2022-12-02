import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/components/CommonForm.module.scss";
import axios from "axios";
import { BoardDocument } from "../../services/boardService";
import { useRouter } from "next/router";
import Button from "../ui/Button";
import { ResponseData as ApiResponse } from "../../pages/api/threads/index";

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
  const nameRef = useRef<HTMLInputElement>(null);

  const nameLength = formData.name.trim().length;
  const messageLength = formData.message.trim().length;

  // Focus name input on mount
  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate fields
    if (!messageLength || !nameLength) {
      return setError("Thread name or message should not be empty");
    }
    if (nameLength > 100) {
      return setError("Thread name is too long (100 characters max)");
    }
    if (messageLength > 2000) {
      return setError("Message is too long (2000 characters max)");
    }

    setIsButtonDisabled(true);

    // Post data
    try {
      const res = await axios.post<ApiResponse>("/api/threads", {
        name: formData.name.trim(),
        message: formData.message.trim(),
        board: board._id,
      });
      setFormData(initialFormData);
      router.replace(`/thread/${res.data.id}`);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data.message);
      } else {
        setError("Failed to create new thread");
      }
    }
    setIsButtonDisabled(false);
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
        Close
      </Button>
      <div className={styles["vertical-group"]}>
        <div className={styles["horizontal-group"]}>
          <label htmlFor="new-thread-name" className={styles["label"]}>
            Thread Name
          </label>
          <span className={nameLength > 100 ? styles.error : ""}>
            {nameLength}/100
          </span>
        </div>
        <input
          className={styles["input"]}
          id="new-thread-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleFormDataChange}
          ref={nameRef}
        />
      </div>
      <div className={styles["vertical-group"]}>
        <div className={styles["horizontal-group"]}>
          <label htmlFor="thread-first-message" className={styles["label"]}>
            Message
          </label>
          <span className={messageLength > 2000 ? styles.error : ""}>
            {messageLength}/2000
          </span>
        </div>
        <textarea
          className={styles["message"]}
          name="message"
          id="thread-first-message"
          value={formData.message}
          onChange={handleFormDataChange}
        ></textarea>
      </div>
      <div className={styles["horizontal-group"]}>
        <Button disabled={isButtonDisabled}>Create New Thread</Button>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </form>
  );
}
