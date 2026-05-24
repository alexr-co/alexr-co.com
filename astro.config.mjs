import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://alexr-co.com',
  server: {
    host: '0.0.0.0',
    port: 4321,
  },
  vite: {
    server: {
      // Required so the dev server inside Docker picks up file changes
      // on macOS/Windows host filesystems via the bind mount.
      watch: {
        usePolling: true,
        interval: 300,
      },
      // HMR works through the published port from the host.
      hmr: {
        host: 'localhost',
        port: 4321,
      },
    },
  },
});
