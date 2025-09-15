import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    minify: false,
    rollupOptions: {
      input: {
        client: './src/entry-client.jsx',
        server: './src/entry-server.jsx'
      }
    }
  },
  ssr: {
    target: 'node',
    format: 'esm',
    noExternal: ['react-router-dom']
  }
})
