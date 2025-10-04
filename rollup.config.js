import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/pv-monitor-card.ts',
    output: {
        file: 'dist/pv-monitor-card.js',
        format: 'es'
    },
    plugins: [typescript()]
};