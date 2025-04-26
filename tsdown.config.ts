import { defineConfig, Options } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: false,
  format: ['esm'],
  target: 'esnext',
  clean: true,
  dts: true,
} as Options);
