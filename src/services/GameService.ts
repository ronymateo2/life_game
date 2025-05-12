import { Grid } from "@/lib/ComputeGrid";

export const GameService = {
  simulateNext: async (grid: Grid, generations: number) => {
    const res = await fetch("/api/simulate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ grid, generations }),
    });

    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return data.nextGrid;
  },
};
