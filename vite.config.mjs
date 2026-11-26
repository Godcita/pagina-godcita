import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync, existsSync } from "node:fs";

// stats.json lo escribe el robot de métricas (GitHub Actions) en la raíz del repo.
// En desarrollo Vite ya lo sirve desde la raíz; al compilar lo copiamos a dist para publicarlo.
const statsDelRobot = () => ({
  name: "stats-del-robot",
  closeBundle() {
    if (existsSync("stats.json")) copyFileSync("stats.json", "dist/stats.json");
  },
});

export default defineConfig({
  plugins: [react(), statsDelRobot()],
  build: { chunkSizeWarningLimit: 1200 },
});
