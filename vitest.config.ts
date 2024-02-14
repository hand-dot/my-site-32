import { defineConfig } from 'vitest/config';
export default defineConfig({
    test: {
        setupFiles: ['./velo-vite-test-kit/index.ts'],
    },
});