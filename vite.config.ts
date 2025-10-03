import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "src/pv-monitor-card.ts",
            name: "PVMonitorCard",
            formats: ["es"],
            fileName: () => "pv-monitor-card.js"
        },
        rollupOptions: {
            // Alle externen Abhängigkeiten hier ggf. ausschließen
        },
        sourcemap: true,
        outDir: "dist",
        emptyOutDir: true
    }
});