import million from "million/compiler";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// const ReactCompilerConfig = {};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // react({
    //   bable: {
    //     plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
    //   },
    // }),
    million.vite({ auto: true }),
    react(),
  ],
});
