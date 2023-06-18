import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  // 解决打包后白屏
  base: "./",
  server: {
    port: '9899'
  },
  plugins: [vue()],
})
