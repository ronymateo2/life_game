export type Cell = {
  alive: boolean;
  color: string | null;
};

export type Grid = Cell[][];

export const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const NEON_COLORS = [
  "#ff00ff",
  "#00ffff",
  "#39ff14",
  "#ffff00",
  "#ff6600",
  "#00ffcc",
];

export const getRandomNeon = (): string =>
  NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];

export const getNeighborColors = (
  grid: Grid,
  i: number,
  j: number
): string[] => {
  const neighborColors = new Set<string>();
  const numRows = grid.length;
  const numCols = grid[0].length;

  operations.forEach(([x, y]) => {
    const ni = i + x;
    const nj = j + y;
    if (ni >= 0 && ni < numRows && nj >= 0 && nj < numCols) {
      const neighbor = grid[ni][nj];
      if (neighbor.alive && neighbor.color) {
        neighborColors.add(neighbor.color);
      }
    }
  });

  return [...neighborColors];
};

export const generateEmptyGrid = (numRows: number, numCols: number): Grid =>
  Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => ({ alive: false, color: null }))
  );

export const simulateGameOfLife = (grid: Grid): Grid => {
  const numRows = grid.length;
  const numCols = grid[0].length;

  return grid.map((row, i) =>
    row.map((cell, j) => {
      let neighbors = 0;
      const colorCounts: { [color: string]: number } = {};

      operations.forEach(([x, y]) => {
        const newI = i + x;
        const newJ = j + y;

        if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
          const neighbor = grid[newI][newJ];
          if (neighbor.alive) {
            neighbors++;
            if (neighbor.color) {
              colorCounts[neighbor.color] =
                (colorCounts[neighbor.color] || 0) + 1;
            }
          }
        }
      });

      // Determines the color with the highest count from the `colorCounts` object.
      const maxColor = Object.entries(colorCounts).sort(
        (a, b) => b[1] - a[1]
      )[0]?.[0];

      if (cell.alive && (neighbors < 2 || neighbors > 3)) {
        return { alive: false, color: null };
      } else if (!cell.alive && neighbors === 3) {
        return { alive: true, color: maxColor || getRandomNeon() };
      } else {
        return cell;
      }
    })
  );
};

export const simulateNext = (grid: Grid, steps: number): Grid => {
  let currentGrid = grid;
  for (let i = 0; i < steps; i++) {
    currentGrid = simulateGameOfLife(currentGrid);
  }
  return currentGrid;
};
