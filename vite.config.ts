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
                globals: {}
            }
        },
        target: 'es2020',
        minify: 'terser',
        sourcemap: false
    }
});