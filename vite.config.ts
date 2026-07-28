import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tanstackStart(), react(), tailwindcss()], server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  }
})