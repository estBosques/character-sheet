import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 5174,
    host: "0.0.0.0",
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
});
