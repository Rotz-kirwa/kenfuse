import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    middlewareMode: false,
    watch: {
      usePolling: true,
      interval: 100
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'react-toastify'],
    exclude: ['node_modules']
  },
  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.tsx?$/,
    exclude: []
  }
})
