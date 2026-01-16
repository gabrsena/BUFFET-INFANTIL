import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',  // essencial pra Vercel
  build: {
    outDir: 'dist',  // padrão, mas explicita
  },
})
