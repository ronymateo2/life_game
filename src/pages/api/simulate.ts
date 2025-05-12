// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Grid, simulateNext } from "@/lib/ComputeGrid";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  generations: null | number;
  nextGrid: Grid;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { grid, generations } = req.body;
    const currentGrid = simulateNext(grid, generations);
    return res.status(200).json({ generations, nextGrid: currentGrid });
  }
}
