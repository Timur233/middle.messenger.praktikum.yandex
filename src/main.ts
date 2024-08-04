import './styles/main.scss';
import './style.scss';
import render from './utils/render.ts';
import MainLayout from './layout/main/main.ts';
import SiteNavigation from './modules/site-navigation/site-navigation.ts';

const siteNavigation = new SiteNavigation({
    title: 'Проектная работа 2-й спринт',
    links: [
        {
            title: 'Авторизация',
            link:  './pages/login/index.html',
        },
        {
            title: 'Регистрация',
            link:  './pages/sign-up/index.html',
        },
        {
            title: 'Cтраница чата',
            link:  './pages/messenger/index.html',
        },
        {
            title: 'Профиль пользователя',
            link:  './pages/profile/index.html',
        },
        {
            title: 'Страница редактирования информации о пользователе',
            link:  './pages/profile-change-data/index.html',
        },
        {
            title: 'Страница смены пароля',
            link:  './pages/profile-change-password/index.html',
        },
        {
            title: 'Страница 404',
            link:  './pages/error-not-found/index.html',
        },
        {
            title: 'Страница 500',
            link:  './pages/error-server/index.html',
        },
    ],
});

const layout = new MainLayout({
    content: siteNavigation,
});

render('#app', layout);
