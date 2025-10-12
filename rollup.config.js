import typescript from "@rollup/plugin-typescript";

export default {
    input: "src/pv-monitor-card.ts", // nur eine Entry-Datei
    output: {
        file: "dist/pv-monitor-card.js",
        format: "es",
    },
    plugins: [
        typescript({
            tsconfig: "./tsconfig.json",
            sourceMap: false,
            declaration: false, // verhindert .d.ts-Dateien
        }),
    ],
    treeshake: true,
};