import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  root: './',    // Set the root directory to where your index.html is located
  plugins: [react()],
  build: {
    outDir: '../dist',  // Specify the output directory for production builds
  },
  preview: {
    port: process.env.PORT || 5000,  // Use Render's dynamic port
  },
})
