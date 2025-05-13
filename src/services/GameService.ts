import { Grid } from "@/lib/ComputeGrid";

export const GameService = {
  simulateNext: async (grid: Grid, generations: number) => {
    try {
      const res = await fetch("/api/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ grid, generations }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        switch (res.status) {
          case 400:
            throw new Error(errorData.error || "Invalid input parameters");
          case 405:
            throw new Error("Invalid request method");
          default:
            throw new Error("An unexpected error occurred during simulation");
        }
      }

      const data = await res.json();
      return data.nextGrid;
    } catch (error) {
      console.error("Simulation error:", error);
      throw error; // Re-throw the error to be handled by the UI
    }
  },
};
