import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes the build work from the GitHub Pages subpath (/zhk-kompanyon-2/)
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    watch: {
      ignored: ['**/.vs/**', '**/dist/**', '**/private/**'],
    },
  },
})
