
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      // '@/' maps to src/ — allows clean absolute imports across the project
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  build: {
    // Split Three.js / R3F into its own chunk to improve caching
    // Note: Vite 8 uses Rolldown which requires manualChunks as a function
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') ||
              id.includes('@react-three/fiber') ||
              id.includes('@react-three/drei') ||
              id.includes('three-stdlib')) {
            return 'three-vendor'
          }
          if (id.includes('node_modules/react') ||
              id.includes('node_modules/react-dom')) {
            return 'react-vendor'
          }
        },
      },
    },
    // Warn only if individual chunks exceed 1 MB (Three.js is large)
    chunkSizeWarningLimit: 1200,
  },
})
