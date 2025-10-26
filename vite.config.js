import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    "process.env": {},
  },
  server: {
    port: 8080,
    open: true,
  },
  build: {
    target: "es2015",
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
