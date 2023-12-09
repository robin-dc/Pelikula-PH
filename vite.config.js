import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

// Load environment variables
process.env = { ...dotenv.config().parsed, ...process.env };

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 3000
  }
})
