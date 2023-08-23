import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // ip地址
    port: 8090, // 设置服务端启动端口号
    open: true // 设置服务端启动时是否自动打开浏览器
  },
})
