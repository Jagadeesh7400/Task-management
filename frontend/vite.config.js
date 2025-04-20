import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 5001,
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      ...(fs.existsSync(path.resolve(__dirname, './src/lib')) ? {
        '@/lib': path.resolve(__dirname, './src/lib')
      } : {}),
      ...(fs.existsSync(path.resolve(__dirname, './src/components')) ? {
        '@/components': path.resolve(__dirname, './src/components')
      } : {}),
      ...(fs.existsSync(path.resolve(__dirname, './src/pages')) ? {
        '@/pages': path.resolve(__dirname, './src/pages')
      } : {})

    },
  },
});
