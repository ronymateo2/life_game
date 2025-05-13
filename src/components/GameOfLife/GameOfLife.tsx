import React, { useState, useCallback, useRef, useEffect } from "react";
import styles from "./GameOfLife.module.css";
import Cell from "../Cell/Cell";
import {
  generateEmptyGrid,
  getNeighborColors,
  getRandomNeon,
  Grid,
} from "@/lib/ComputeGrid";
import { GameService } from "@/services/GameService";

export default function GameOfLife() {
  const [numCols, numRows] = [30, 30]; // this currently is hardcoded  but can be changed to be dynamic
  const [grid, setGrid] = useState<Grid>(generateEmptyGrid(numCols, numRows));
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  const gridRef = useRef(grid);

  runningRef.current = running;

  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  // Cleanup on unmount to prevent simulation loop from running after unmount
  useEffect(() => {
    return () => {
      runningRef.current = false;
    };
  }, []);

  const runSimulation = useCallback(async () => {
    if (!runningRef.current) return;
    const newGrid = await GameService.simulateNext(gridRef.current, 1);
    setGrid(newGrid);
    setTimeout(runSimulation, 500);
  }, []);

  const handleAdvanceSteps = async (steps: number) => {
    let currentGrid = grid;
    currentGrid = await GameService.simulateNext(currentGrid, steps);
    setGrid(currentGrid);
  };

  const toggleCell = (i: number, j: number) => {
    setGrid((prev: Grid) => {
      const neighborColors = getNeighborColors(prev, i, j);
      const assignedColor =
        neighborColors.length > 0 ? neighborColors[0] : getRandomNeon();
      const newGrid = prev.map((row, ri) =>
        row.map((cell, ci) =>
          ri === i && ci === j
            ? cell.alive
              ? { alive: false, color: null }
              : { alive: true, color: assignedColor }
            : cell
        )
      );
      return newGrid;
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Conway&apos;s Game of Life</h1>

      <div
        className={styles.grid}
        style={{ gridTemplateColumns: `repeat(${numCols}, 1fr)` }}
      >
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <Cell
              key={`${i}-${j}`}
              alive={cell.alive}
              color={cell.color}
              onClick={() => toggleCell(i, j)}
            />
          ))
        )}
      </div>

      <div className={styles.controls}>
        <button
          className={styles.button}
          style={{ minWidth: "130px" }}
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            } else {
              runningRef.current = false;
            }
          }}
        >
          {running ? "Stop" : "Play Forever"}
        </button>
        <button
          className={styles.button}
          onClick={async () => {
            const newGrid = await GameService.simulateNext(grid, 1);
            setGrid(newGrid);
          }}
        >
          Next
        </button>
        <button
          className={styles.button}
          onClick={() => handleAdvanceSteps(10)}
        >
          Advance 10 Steps
        </button>
        <button
          className={styles.button}
          onClick={() => setGrid(generateEmptyGrid(numCols, numRows))}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
