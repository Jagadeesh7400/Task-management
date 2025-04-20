import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tailwindcss()
    ],
    define: {
      'process.env': env, // Make env variables available in the client-side
    },
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
    build: {
      // Required for Firebase hosting to correctly handle single-page app routing
      rollupOptions: {
        output: {
          manualChunks: undefined, // Disable manual chunking to create a single bundle
        },
      },
    },
  }
});
