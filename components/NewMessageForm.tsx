import axios from "axios";
import React, { useState } from "react";
import { ThreadDocument } from "../services/threadService";
import styles from "../styles/commonForm.module.scss";
import { useRouter } from "next/router";

interface NewMessageFormProps {
  thread: ThreadDocument;
}

export default function NewMessageForm({ thread }: NewMessageFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("/api/messages", {
      thread: thread._id,
      message: message,
    });
    router.replace(router.asPath);
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
        <button className={styles["submit-btn"]}>Send</button>
      </div>
    </form>
  );
}
