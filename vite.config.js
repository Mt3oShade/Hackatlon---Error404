import { defineConfig } from 'vite'  // Asegúrate de importar defineConfig
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    allowedHosts: [
      'nonrecuperative-verla-hierarchically.ngrok-free.dev', // Usa tu URL de ngrok aquí
    ],
  },
})