import { defineConfig } from 'vite';

export default defineConfig({
    root:  'src',
    base:  './',
    build: {
        rollupOptions: {
            input: './src/index.html',
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
