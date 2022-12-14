import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/components/CommonForm.module.scss";
import Button from "../ui/Button";
import { ResponseData as ApiResponse } from "../../pages/api/admin";
import { useRouter } from "next/router";

const passwordPairInitialState = {
  password: "",
  confirmPassword: "",
};

export default function AdminCreateForm() {
  const router = useRouter();

  const [passwordPair, setPasswordPair] = useState(passwordPairInitialState);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [error, setError] = useState("");
  const passwordRef = useRef<HTMLInputElement>(null);

  // Focus password input on mount
  useEffect(() => {
    passwordRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate fields
    if (!passwordPair.password) {
      passwordRef.current?.focus();
      return setError("Password cannot be empty");
    }
    if (passwordPair.password !== passwordPair.confirmPassword) {
      setPasswordPair(passwordPairInitialState);
      passwordRef.current?.focus();
      return setError("Passwords do not match");
    }

    setIsButtonDisabled(true);

    // Post data
    try {
      await axios.post<ApiResponse>("/api/admin", {
        password: passwordPair.password,
      });
      router.replace(router.asPath);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data.message);
      } else {
        setError("Failed to create new thread");
      }
      setPasswordPair(passwordPairInitialState);
      setIsButtonDisabled(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordPair((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <h1 className={styles["form-heading-sm"]}>
        No admin password found. Create a new one.
      </h1>
      <form onSubmit={handleSubmit} className={styles["form-centered"]}>
        <div className={styles["vertical-group"]}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className={styles.input}
            value={passwordPair.password}
            onChange={handleChange}
            ref={passwordRef}
          />
        </div>
        <div className={styles["vertical-group"]}>
          <label className={styles.label} htmlFor="password-confirm">
            Confirm Password
          </label>
          <input
            id="password-confirm"
            name="confirmPassword"
            type="password"
            className={styles.input}
            value={passwordPair.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <Button disabled={isButtonDisabled}>Create</Button>
        {error && <span className={styles.error}>{error}</span>}
      </form>
    </div>
  );
}
