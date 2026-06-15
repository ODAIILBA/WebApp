import build from '@hono/vite-build/cloudflare-pages'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true
  },
  build: {
    target: 'esnext'
  },
  plugins: [
    build()
  ]
})
