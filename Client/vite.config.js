import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { qrcode } from 'vite-plugin-qrcode'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), qrcode(), svgr()],
  server: {
    host: true
  }
})
