import React, { useState } from "react";
import styles from "../styles/components/CommonForm.module.scss";
import Button from "./Button";
import { useRouter } from "next/router";
import axios from "axios";
import { ResponseData as ApiResponse } from "../pages/api/login";

export default function AdminLogin() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!password) return setError("Please enter the password");
    setIsButtonDisabled(true);
    try {
      await axios.post<ApiResponse>("/api/login", {
        password,
      });
      router.replace("/");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data.message);
      } else {
        setError("Failed to create new thread");
      }
      setPassword("");
      setIsButtonDisabled(false);
    }
  };

  return (
    <div>
      <form className={styles["form-centered"]} onSubmit={handleSubmit}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button disabled={isButtonDisabled}>Login</Button>
        {error && <span className={styles.error}>{error}</span>}
      </form>
    </div>
  );
}
