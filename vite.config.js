import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  ssr: {
    // Bundle these so the SSR output doesn't require them at runtime
    external: ["react-router", "react-router-dom"],
  },
})
