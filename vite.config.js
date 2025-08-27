import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
    hmr: { protocol: "ws", host: "127.0.0.1", overlay: false },
    watch: { usePolling: true, interval: 120 }
  },
  optimizeDeps: { force: true }
});
