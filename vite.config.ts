import path from "path"
const __dirname = import.meta.dirname
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 600,
    minify: "esbuild",
    sourcemap: false,
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react-dom/")) return "react-dom"
          if (id.includes("node_modules/react/") || id.includes("node_modules/scheduler/")) return "react-core"
          if (id.includes("node_modules/react-router")) return "react-router"
          if (id.includes("node_modules/@radix-ui")) return "radix-ui"
          if (id.includes("node_modules/lucide-react")) return "icons"
          if (id.includes("node_modules/")) return "vendor"
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  },
})
