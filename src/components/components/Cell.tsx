import React from "react";
import styles from "./Cell.module.css";

type CellProps = {
  alive: boolean;
  color: string | null;
  onClick: () => void;
};

const Cell = React.memo(({ alive, color, onClick }: CellProps) => (
  <div
    onClick={onClick}
    className={styles.cell}
    style={{
      backgroundColor: alive ? color ?? "transparent" : "transparent",
      boxShadow: alive ? `0 0 6px ${color}` : "none",
    }}
  />
));
Cell.displayName = "Cell";

export default Cell;
