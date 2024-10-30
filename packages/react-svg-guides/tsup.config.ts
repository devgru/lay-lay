import { defineConfig, Options } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  splitting: false,
  sourcemap: false,
  format: ['cjs', 'esm'],
  external: ['react'],
  target: 'esnext',
  clean: true,
  dts: true,
} as Options)