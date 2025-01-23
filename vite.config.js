import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Bind to 0.0.0.0 for Render
    port: parseInt(process.env.PORT) || 3000, // Use Render's PORT or fallback to 3000
    allowedHosts: ['arshiyashafizade-portfolio-2.onrender.com'], // Allow your Render host
  },
});
