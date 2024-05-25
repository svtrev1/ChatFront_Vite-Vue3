import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const backend = "https://localhost:7115";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "^/api": {
        target: backend,
        ws: false,
        secure: false,
      },
      "^/hub": {
        target: backend,
        ws: true,
        secure: false,
      },
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
