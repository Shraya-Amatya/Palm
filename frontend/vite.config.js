// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all IPs
    port: 5173,      // Default port
    optimizeDeps: {
      exclude: ['react-dom', 'react-router-dom'],
    },
  },
});
