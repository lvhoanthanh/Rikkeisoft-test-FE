import * as path from 'path';
import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import Inspect from 'vite-plugin-inspect';

const config: UserConfig = {
  root: './',
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  plugins: [react(), tsconfigPaths(), Inspect()],
  server: {
    open: true,
    port: 3000,
    host: '127.0.0.1',
  },
  // optimizeDeps: { exclude:  },
  build: {
    // sourcemap: true,
    // chunkSizeWarningLimit: 5000,
    rollupOptions: {
      external: ['@rsuite/icons'],
      // output: {
      //   manualChunks(id) {
      //     if (id.includes('node_modules')) {
      //       return id
      //         .toString()
      //         .split('node_modules/')[1]
      //         .split('/')[0]
      //         .toString();
      //     }
      //     return;
      //   },
      // },
    },
  },
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: {},
  },
};

export default defineConfig(config);
