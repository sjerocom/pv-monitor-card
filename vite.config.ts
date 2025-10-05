import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/pv-monitor-card.ts',
            formats: ['es'],
            fileName: () => 'pv-monitor-card.js'
        },
        outDir: 'dist',
        rollupOptions: {
            external: [],
            output: {
                globals: {},
                entryFileNames: 'pv-monitor-card.js',
                chunkFileNames: 'pv-monitor-card.js',
                assetFileNames: 'pv-monitor-card[extname]',
                inlineDynamicImports: true  // ← Wichtig: Alles in eine Datei packen
            }
        },
        target: 'es2020',
        minify: 'terser',
        sourcemap: false
    }
});