import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@common': path.resolve(__dirname, 'common'),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/setupTests.ts'],
        include: ['src/**/*.{test,spec}.{ts,tsx}', 'common/**/*.{test,spec}.{ts,tsx}'],
        css: false,
        pool: 'forks',
    },
})
