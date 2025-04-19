import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react( {
      presets: ["@babel/preset-env", "@babel/preset-react"]
    }),
    tailwindcss()
  ],
  server: {
    port: 5001,
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

/*
Troubleshooting Steps (If the "require is not defined" error persists):

1. Verify Dependencies:
   - Make sure all dependencies are installed correctly: `npm install` or `yarn install`

2. Update Dependencies:
   - Keep dependencies up-to-date: `npm update` or `yarn upgrade`

3. Clear Cache:
   - Clear Vite cache: `rm -rf node_modules/.vite`
   - Clear npm cache (if necessary): `npm cache clean --force`

4. Check for Problematic Dependencies:
   - Examine your dependencies for any libraries known to cause issues with Vite or browser environments.

5. Simplify Configuration:
   - Try a minimal Vite configuration to rule out conflicts with other plugins or settings.

6. Inspect the Build Output:
   - Examine the browser console for more detailed error messages or hints about the source of the issue.

7. Check all over code from chat gpt
*/
