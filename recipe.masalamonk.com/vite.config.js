import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
  plugins: [
    svelte()  // Svelte plugin integration for Vite
  ],
  build: {
    outDir: 'dist',  // Output directory for build files
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html')  // Entry point for the application
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Alias for src directory
    }
  },
  server: {
    proxy: {
      '/api': {  // Proxy API requests during development
        target: process.env.VITE_API_URL,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
});
