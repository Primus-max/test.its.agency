import { defineConfig } from 'vite';
import pugPlugin from 'vite-plugin-pug';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/test.its.agency/' : '/',
  plugins: [pugPlugin()],
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  server: {
    open: true,
  },
}); 