import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/ywc-coffee-2026/',
  plugins: [react(), tailwindcss()],
})
