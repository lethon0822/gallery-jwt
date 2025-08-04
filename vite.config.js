import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({   
  // build: {
  //   outDir: 'D:/ParkDoheum/2025/2025-04-msa/backend/gallery/src/main/resources/static',
  //   emptyOutDir: true
  // },
  // server: {
  //   proxy: {
  //     '/pic': {
  //       target: 'http://localhost:8080',
  //       changeOrigin: true
  //     },
  //     '/api': {
  //       target: 'http://localhost:8080',
  //       changeOrigin: true
  //     }
  //   }
  // },
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
