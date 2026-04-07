import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        /* Split React runtime into its own cached chunk */
        manualChunks: {
          react: ['react', 'react-dom'],
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },

    minify: 'esbuild',
    sourcemap: false,
  },
})
