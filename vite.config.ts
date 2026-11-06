import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

const rootDir = import.meta.dirname

// https://vitejs.dev/config/
export default defineConfig(() => {
    const isTest = Boolean(process.env.VITEST)

    return {
        plugins: isTest ? [] : [react()],
        optimizeDeps: {
            exclude: ['msw', '@mswjs/interceptors'],
        },
        resolve: {
            // WARNING! A new alias belongs in tsconfig.json and rules/aliases.ts too.
            alias: {
                '@app': path.resolve(rootDir, 'src/app'),
                '@portfolio': path.resolve(rootDir, 'src/portfolio'),
                '@projects': path.resolve(rootDir, 'src/projects'),
                '@common-types': path.resolve(rootDir, 'common/types'),
                '@common-ux': path.resolve(rootDir, 'common/ux'),
                '@common-utils': path.resolve(rootDir, 'common/utils'),
                '@common-mocks': path.resolve(rootDir, 'common/mocks'),
                '@shared-styles': path.resolve(rootDir, 'src/shared/styles'),
                '@shared-queries': path.resolve(rootDir, 'src/shared/queries'),
                '@shared-assets': path.resolve(rootDir, 'src/shared/assets'),
                '@shared-components': path.resolve(rootDir, 'src/shared/components'),
                '@shared-context': path.resolve(rootDir, 'src/shared/context'),
                '@public': path.resolve(rootDir, 'public'),
            },
        },
        test: {
            globals: true,
            reporters: ['dot'],
            css: false,
            pool: 'threads',
            execArgv: ['--no-experimental-webstorage'],
            projects: [
                // ESLint rule specs and token scripts need neither a DOM nor the app
                // harness, yet the shared setup file gives them MSW, React Router and
                // jest-dom. A separate project also keeps eslint out of every DOM worker.
                {
                    extends: true,
                    test: {
                        name: 'unit',
                        environment: 'node',
                        setupFiles: [],
                        include: ['rules/**/*.{test,spec}.ts', 'scripts/**/*.{test,spec}.ts'],
                    },
                },
                {
                    extends: true,
                    test: {
                        name: 'utils',
                        environment: 'node',
                        setupFiles: [],
                        include: ['common/utils/**/*.{test,spec}.{ts,tsx}'],
                        // These six reach for window, document or localStorage.
                        exclude: [
                            'common/utils/Browser/**',
                            'common/utils/Canvas/**',
                            'common/utils/Context/**',
                            'common/utils/Paths/**',
                            'common/utils/Storage/**',
                            'common/utils/Version/**',
                        ],
                    },
                },
                {
                    extends: true,
                    test: {
                        name: 'dom',
                        environment: 'jsdom',
                        setupFiles: ['./src/setupTests.ts'],
                        include: [
                            'src/**/*.{test,spec}.{ts,tsx}',
                            'common/ux/**/*.{test,spec}.{ts,tsx}',
                            'common/utils/{Browser,Canvas,Context,Paths,Storage,Version}/**/*.{test,spec}.{ts,tsx}',
                        ],
                    },
                },
            ],
        },
    }
})
