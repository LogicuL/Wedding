import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 400000, // inline fișiere până la 400KB — poza de 249KB va fi inline în JS
  }
})
