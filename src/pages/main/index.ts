import MainLayout from '../../layout/main/main.ts';
import SiteNavigation from '../../modules/site-navigation/site-navigation.ts';
import Component from '../../services/Component.ts';
import Page from '../../services/Page.ts';
import Router from '../../services/router/Router.ts';

export default class MainPage extends Page {
    setup():Component {
        this.setPageMeta({
            title: 'Главная страница',
        });

        const siteNavigation = new SiteNavigation({
            title: 'Проектная работа 2-й спринт',
            links: [
                {
                    title: 'Авторизация',
                    link:  '/login',
                },
                {
                    title: 'Регистрация',
                    link:  '/sign-in',
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
                    title: 'HTTPTransport - игровая площадка',
                    link:  './pages/http-transport-playground/index.html',
                },
                {
                    title: 'Страница 404',
                    link:  '/404',
                },
                {
                    title: 'Страница 500',
                    link:  './pages/error-server/index.html',
                },
            ],
            methods: {
                onClick: (event: Event) => {
                    const router: Router = new Router('#app');
                    const targetLink: HTMLElement = event.target as HTMLElement;

                    event.preventDefault();

                    router.go(targetLink.dataset.link as string);
                },
            },
        });

        const layout = new MainLayout({
            content: siteNavigation,
        });

        return layout;
    }
}
