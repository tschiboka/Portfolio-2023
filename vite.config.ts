import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        exclude: ['msw', '@mswjs/interceptors'],
    },
    resolve: {
        alias: {
            '@types': path.resolve(__dirname, 'common/types'),
            '@ux': path.resolve(__dirname, 'common/ux'),
            '@utils': path.resolve(__dirname, 'common/utils'),
            '@app': path.resolve(__dirname, 'src/app'),
            '@portfolio': path.resolve(__dirname, 'src/portfolio'),
            '@projects': path.resolve(__dirname, 'src/projects'),
            '@public': path.resolve(__dirname, 'public'),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/setupTests.ts'],
        include: ['src/**/*.{test,spec}.{ts,tsx}', 'common/**/*.{test,spec}.{ts,tsx}'],
        css: false,
        pool: 'threads',
    },
})
