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
  },
  define: {
    'import.meta.env.VITE_FIREBASE_API_KEY': process.env.VITE_FIREBASE_API_KEY,
    'import.meta.env.VITE_API_TMDB_KEY': process.env.VITE_API_TMDB_KEY,
  },
})
