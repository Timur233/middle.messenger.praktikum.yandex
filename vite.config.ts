import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root:  'src',
    base:  './',
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, './src/index.html'),
            },
        },
        outDir:      '../dist',
        emptyOutDir: true,
    },
    server: {
        open: '/',
        port: 3000,
    },
    publicDir: '../static',
});
