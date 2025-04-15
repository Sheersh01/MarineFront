import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allows access from LAN (e.g., your phone)
    port: 5173, // default port, can be changed if needed
  },
})
