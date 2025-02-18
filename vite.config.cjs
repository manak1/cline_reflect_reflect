const {defineConfig} = require("vite");
const react = require("@vitejs/plugin-react");
const {fileURLToPath} = require("node:url");
const path = require("node:path");

module.exports = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
