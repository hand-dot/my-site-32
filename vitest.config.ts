import { defineConfig } from 'vitest/config';
export default defineConfig({
    test: {
        setupFiles: ['velo-test-kit']
    },
});