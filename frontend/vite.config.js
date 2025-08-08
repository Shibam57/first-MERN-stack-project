import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/v1": "https://ccp-user-data-backend.onrender.com"
    }
  },
  plugins: [tailwindcss(),react()],
})
