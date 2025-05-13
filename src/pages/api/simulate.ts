// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Cell, Grid, simulateNext } from "@/lib/ComputeGrid";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  generations: null | number;
  nextGrid: Grid;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const { grid, generations } = req.body;

  if (!isValidGrid(grid)) {
    return res.status(400).json({
      error: "Invalid input: grid must be a non-empty 2D array.",
    });
  }

  if (!isValidGenerations(generations)) {
    return res.status(400).json({
      error: "Invalid input: generations must be a positive number.",
    });
  }

  const currentGrid = simulateNext(grid, generations);
  return res.status(200).json({ generations, nextGrid: currentGrid });
}

function isValidGrid(grid: Grid) {
  return (
    Array.isArray(grid) &&
    grid.length > 0 &&
    grid.every(
      (row: Cell[]) => Array.isArray(row) && row.length === grid[0].length
    )
  );
}

function isValidGenerations(generations: number) {
  return typeof generations === "number" && generations > 0;
}
