import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
    const isDev = mode === 'development';

    return {
        build: {
            lib: {
                entry: 'src/pv-monitor-card.ts',
                formats: ['es'],
                fileName: () => (isDev ? 'pv-monitor-card-dev.js' : 'pv-monitor-card.js'),
            },
            outDir: 'dist',
            rollupOptions: {
                output: {
                    entryFileNames: isDev ? 'pv-monitor-card-dev.js' : 'pv-monitor-card.js',
                    inlineDynamicImports: true,
                },
            },
            target: 'es2020',
            minify: isDev ? false : 'terser',
            sourcemap: false,
        },
        define: isDev
            ? {
                __BUILD_TIMESTAMP__: JSON.stringify(new Date().toISOString()),
                __CARD_NAME__: JSON.stringify('pv-monitor-card-dev'),
            }
            : {
                __CARD_NAME__: JSON.stringify('pv-monitor-card'),
            },
    };
});
