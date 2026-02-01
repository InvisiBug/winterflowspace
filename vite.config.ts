import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: path.resolve(__dirname, "src"),
        },
      ],
    },
    define: {
      VITE_API: JSON.stringify(env.VITE_API),
      VITE_SOCKET: JSON.stringify(env.VITE_SOCKET),
    },
  };
});
