import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    host: '0.0.0.0',
    port: 3060,
    allowedHosts: [
      'sayedbro3060.syedbipul.me',
    ],
    open: true,
  },
})
