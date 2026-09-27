import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: [
        { find: '@/lib', replacement: path.resolve(__dirname, './src/lib') },
        { find: '@/components', replacement: path.resolve(__dirname, './src/components') },
        { find: '@/src', replacement: path.resolve(__dirname, './src') },
        { find: '@', replacement: path.resolve(__dirname, './src') },
      ],
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      hmr: {
        clientPort: 443,
      },
    },
  };
});
