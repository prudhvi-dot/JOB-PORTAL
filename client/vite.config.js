import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Match all requests starting with /api and forward them to the backend
      "/api": {
        target: "http://localhost:8080",
      },
    },
  },
});
