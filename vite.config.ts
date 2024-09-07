import { defineConfig } from 'vite';
import { resolve } from 'path';

const pageData = {
    '/index.html': {
        title: 'Проектная работа 2-й спринт',
    },
    '/pages/login/index.html': {
        title: 'Авторизация',
    },
    '/pages/sign-up/index.html': {
        title: 'Регистрация',
    },
    '/pages/messenger/index.html': {
        title: 'Чаты',
    },
    '/pages/profile/index.html': {
        title: 'Профиль',
    },
    '/pages/profile-change-data/index.html': {
        title: 'Редактировать информацию о пользователе',
    },
    '/pages/profile-change-password/index.html': {
        title: 'Изменить пароль',
    },
    '/pages/http-transport-playground/index.html': {
        title: 'HTTPTransport playground',
    },
    '/pages/error-not-found/index.html': {
        title: '404 - Вы потерялись',
    },
    '/pages/error-server/index.html': {
        title: '500 - Cервер лег, а ты иди',
    },
};

export default defineConfig({
    root:  'src',
    base:  './',
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, './src/index.html'),
                // login:     resolve(__dirname, './src/pages/login/index.html'),
                // signUp:    resolve(__dirname, './src/pages/sign-up/index.html'),
                // messenger: resolve(
                //     __dirname,
                //     './src/pages/messenger/index.html',
                // ),
                // profile:           resolve(__dirname, './src/pages/profile/index.html'),
                // profileChangeData: resolve(
                //     __dirname,
                //     './src/pages/profile-change-data/index.html',
                // ),
                // profileChangePassword: resolve(
                //     __dirname,
                //     './src/pages/profile-change-password/index.html',
                // ),
                // httpTransportPlayground: resolve(
                //     __dirname,
                //     './src/pages/http-transport-playground/index.html',
                // ),
                // errorNotFound: resolve(
                //     __dirname,
                //     './src/pages/error-not-found/index.html',
                // ),
                // errorServer: resolve(
                //     __dirname,
                //     './src/pages/error-server/index.html',
                // ),
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
