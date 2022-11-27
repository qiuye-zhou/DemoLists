import baseConfig from './base.config';
import { defineConfig } from 'vite';

export default defineConfig({
  ...baseConfig,
  base: '/qiuye-demo-final',
  build: {
    outDir: 'docs',
  },
});
