import axios from "axios";
import React, { useState } from "react";
import { ThreadDocument } from "../services/threadService";
import styles from "../styles/components/CommonForm.module.scss";
import { useRouter } from "next/router";
import Button from "./Button";
import { ResponseData as ApiResponse } from "../pages/api/messages";

interface NewMessageFormProps {
  thread: ThreadDocument;
}

export default function NewMessageForm({ thread }: NewMessageFormProps) {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    setError("");
    if (!message.trim()) {
      setIsButtonDisabled(false);
      return setError("Message should not be empty");
    }
    try {
      const res = await axios.post<ApiResponse>("/api/messages", {
        thread: thread._id,
        message: message,
      });
      if (res.status === 200) {
        setMessage("");
        router.replace(router.asPath);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data.message);
      } else {
        setError("Failed to create new message");
      }
      setIsButtonDisabled(false);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <form className={styles["form"]} onSubmit={handleSubmit}>
      <div className={styles["input-group"]}>
        <label htmlFor="message" className={styles["label"]}>
          Message
        </label>
        <textarea
          className={styles["message"]}
          name="message"
          id="message"
          value={message}
          onChange={handleTextareaChange}
        />
      </div>
      <div className={styles["btn-group"]}>
        <Button disabled={isButtonDisabled}>Send</Button>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </form>
  );
}
