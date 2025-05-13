import { simulateGameOfLife, simulateNext } from "@/lib/ComputeGrid";
import { Grid } from "@/lib/ComputeGrid";

describe("Game of Life Simulation", () => {
  const createGrid = (rows: number, cols: number): Grid =>
    Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({ alive: false, color: null }))
    );

  test("underpopulation: live cell with <2 neighbors dies", () => {
    const grid = createGrid(3, 3);
    grid[1][1] = { alive: true, color: "#ff00ff" };

    const result = simulateGameOfLife(grid);
    expect(result[1][1].alive).toBe(false);
  });

  test("overpopulation: live cell with >3 neighbors dies", () => {
    const grid = createGrid(3, 3);
    const color = "#00ffff";
    grid[1][1] = { alive: true, color };
    grid[0][0] = { alive: true, color };
    grid[0][1] = { alive: true, color };
    grid[0][2] = { alive: true, color };
    grid[1][0] = { alive: true, color };

    const result = simulateGameOfLife(grid);
    expect(result[1][1].alive).toBe(false);
  });

  test("survival: live cell with 2 or 3 neighbors survives", () => {
    const grid = createGrid(3, 3);
    const color = "#00ffff";
    grid[1][1] = { alive: true, color };
    grid[0][1] = { alive: true, color };
    grid[1][0] = { alive: true, color };

    const result = simulateGameOfLife(grid);
    expect(result[1][1].alive).toBe(true);
  });

  test("reproduction: dead cell with 3 neighbors becomes alive with majority color", () => {
    const grid = createGrid(3, 3);
    grid[0][1] = { alive: true, color: "#ff00ff" };
    grid[1][0] = { alive: true, color: "#ff00ff" };
    grid[1][2] = { alive: true, color: "#00ffff" };

    const result = simulateGameOfLife(grid);
    expect(result[1][1].alive).toBe(true);
    expect(result[1][1].color).toBe("#ff00ff"); // majority color
  });

  test("simulateNext: advances multiple steps consistently", () => {
    const grid = createGrid(3, 3);
    grid[0][1] = { alive: true, color: "#ff00ff" };
    grid[1][1] = { alive: true, color: "#ff00ff" };
    grid[2][1] = { alive: true, color: "#ff00ff" };

    const after1 = simulateNext(grid, 1);
    const after2 = simulateNext(grid, 2);

    expect(after1[1][0].alive).toBe(true);
    expect(after2[1][1].alive).toBe(true);
  });
});
