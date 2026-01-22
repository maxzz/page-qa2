import { defineConfig, type ConfigEnv } from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import replace from '@rollup/plugin-replace';

const buildAt = () => {
    const d = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return `${d.toLocaleDateString('en-US', options)} at ${d.getHours()}:${d.getMinutes()}`;
};

const buildVersion = () => {
    const d = new Date();
    return `${d.getFullYear().toString().substring(3)}.${d.getMonth() + 1}${d.getDate()}`;
};

// https://vitejs.dev/config/
export default (({ command }: ConfigEnv) => defineConfig({
    base: command === 'build' ? '' : '',
    plugins: [
        react(),
        tailwindcss(),

        replace({
            values: {
                __BUILD_DATE__: buildAt(),
                __BUILD_VER__: buildVersion(),
            },
            preventAssignment: true,
        }),

        visualizer({
            filename: 'visualization.html',
            template: 'sunburst', // sunburst - d3 style (good as default as well); treemap - table (default); network - graph (slow to open).
            gzipSize: true,
            brotliSize: true,
        }),
    ],
    build: {
        rollupOptions: {
            onwarn: (warning, rollupWarn) => {
                if (warning.message.includes('"use client"')) return;
                if (warning.code === 'CIRCULAR_DEPENDENCY') return;
                rollupWarn(warning);
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: 3000,
    }
}));
