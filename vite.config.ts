import { defineConfig } from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import visualizer from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default (({ command }) => defineConfig({
    base: command === 'build' ? '' : '',
    plugins: [
        react(),
        visualizer({
            filename: 'visualization.html',
            template: 'sunburst', // sunburst - d3 style (good as default as well); treemap - table (default); network - graph (slow to open).
            gzipSize: true,
            brotliSize: true,
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    }
}));
