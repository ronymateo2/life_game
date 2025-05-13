import React from "react";
import styles from "./Error.module.css";

interface ErrorProps {
  message: string;
  onDismiss?: () => void;
}

export const Error: React.FC<ErrorProps> = ({ message, onDismiss }) => {
  return (
    <div className={styles.errorContainer} role="alert">
      <div className={styles.errorContent}>
        <span className={styles.errorIcon}>⚠️</span>
        <p className={styles.errorMessage}>{message}</p>
      </div>
      {onDismiss && (
        <button
          className={styles.dismissButton}
          onClick={onDismiss}
          aria-label="Dismiss error"
        >
          ×
        </button>
      )}
    </div>
  );
};
