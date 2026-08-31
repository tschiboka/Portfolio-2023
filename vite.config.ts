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
            '@app': path.resolve(__dirname, 'src/app'),
            '@portfolio': path.resolve(__dirname, 'src/portfolio'),
            '@projects': path.resolve(__dirname, 'src/projects'),
            '@common-types': path.resolve(__dirname, 'common/types'),
            '@common-ux': path.resolve(__dirname, 'common/ux'),
            '@common-utils': path.resolve(__dirname, 'common/utils'),
            '@shared-styles': path.resolve(__dirname, 'src/shared/styles'),
            '@shared-queries': path.resolve(__dirname, 'src/shared/queries'),
            '@shared-assets': path.resolve(__dirname, 'src/shared/assets'),
            '@shared-components': path.resolve(__dirname, 'src/shared/components'),
            '@shared-context': path.resolve(__dirname, 'src/shared/context'),
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
