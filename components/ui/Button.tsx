import React from "react";
import styles from "../../styles/components/Button.module.scss";

type ButtonProps = React.PropsWithChildren & {
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
};

export default function Button({
  children,
  onClick,
  disabled,
  type,
  className,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
