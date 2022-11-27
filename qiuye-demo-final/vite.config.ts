import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import path from 'path'

export default defineConfig({
  // 默认的配置
  plugins: [
    vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown(),
  ],
  resolve: {
    alias: {
      '@packages': path.resolve(__dirname, "./packages"),
      'packages': path.resolve(__dirname, "./packages"),
      '@qiu': path.resolve(__dirname, "./packages/"),
    }
  }
})