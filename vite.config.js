import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Development server
  server: {
    port: 3000,
    host: true,           // Allows access from WiFi / other devices
  },

  // Production preview server (Important for Render.com)
  preview: {
    port: process.env.PORT || 4173,   // Render.com uses dynamic PORT
    host: true,
    allowedHosts: [
      'madzi-watcher-web-frontend-visualisation.onrender.com',
      'localhost',
      '127.0.0.1',
      '.onrender.com'                    // This allows all Render subdomains (recommended)
    ]
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
    }
  },

  build: {
    outDir: 'dist',
    sourcemap: false,     // Set to true only if you need debugging in production
  }
})