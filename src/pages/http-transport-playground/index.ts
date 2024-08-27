/* eslint-disable no-console */
import '../../styles/main.scss';
import './style.scss';
import render from '../../utils/render.ts';
import MainLayout from '../../layout/main/main.ts';
import ProfileNavigation from '../../modules/profile-navigation/profile-navigation.ts';
import HttpPlayground from './modules/http-playground/http-playground.ts';
import Button from '../../components/button/button.ts';
import HTTPTransport from '../../services/http/HTTPtransport.ts';

const transport = new HTTPTransport();

const layout = new MainLayout();

const navigation = new ProfileNavigation({
    links: [{
        link:    '/',
        caption: `
            <svg class="svg-icon" style="width: 10px; height: 10px;">
                <use xlink:href="/assets/icons.svg#arrow-left"></use>
            </svg>
            Вернуться
        `,
    }],
});

const playgroundCard = new HttpPlayground({
    title:    'HTTPTransport playground',
    desc:     'При нажатии на кнопку будет отправлен запрос каждого типа. Результат будет выведен в консоль.',
    examples: [
        {
            title:  'GET',
            url:    'https://jsonplaceholder.typicode.com/posts',
            button: new Button({
                text:      'Отправить',
                classList: 'button--outline playground-example__button',
                methods:   {
                    onClick() {
                        transport.get('https://jsonplaceholder.typicode.com/posts')
                            .then(res => res.json())
                            .then(res => console.log(res))
                            .catch(e => console.log(e));
                    },
                },
            }),
        },
        {
            title:  'GET with params',
            url:    'https://jsonplaceholder.typicode.com/comments?postId=1',
            button: new Button({
                text:      'Отправить',
                classList: 'button--outline playground-example__button',
                methods:   {
                    onClick() {
                        transport.get('https://jsonplaceholder.typicode.com/comments', {
                            data: {
                                postId: 1,
                            },
                        })
                            .then(res => res.json())
                            .then(res => console.log(res))
                            .catch(e => console.log(e));
                    },
                },
            }),
        },
        {
            title:  'POST',
            url:    'https://jsonplaceholder.typicode.com/posts',
            button: new Button({
                text:      'Отправить',
                classList: 'button--outline playground-example__button',
                methods:   {
                    onClick() {
                        transport.post('https://jsonplaceholder.typicode.com/posts', {
                            data: {
                                postId: 1,
                                title:  'title',
                                body:   'body',
                            },
                        })
                            .then(res => res.json())
                            .then(res => console.log(res))
                            .catch(e => console.log(e));
                    },
                },
            }),
        },
        {
            title:  'PUT',
            url:    'https://jsonplaceholder.typicode.com/posts/1',
            button: new Button({
                text:      'Отправить',
                classList: 'button--outline playground-example__button',
                methods:   {
                    onClick() {
                        transport.put('https://jsonplaceholder.typicode.com/posts/1', {
                            data: {
                                postId: 1,
                            },
                        })
                            .then(res => res.json())
                            .then(res => console.log(res))
                            .catch(e => console.log(e));
                    },
                },
            }),
        },
        {
            title:  'PATCH',
            url:    'https://jsonplaceholder.typicode.com/posts/1',
            button: new Button({
                text:      'Отправить',
                classList: 'button--outline playground-example__button',
                methods:   {
                    onClick() {
                        transport.patch('https://jsonplaceholder.typicode.com/posts/1', {
                            data: {
                                postId: 1,
                            },
                        })
                            .then(res => res.json())
                            .then(res => console.log(res))
                            .catch(e => console.log(e));
                    },
                },
            }),
        },
        {
            title:  'DELETE',
            url:    'https://jsonplaceholder.typicode.com/posts/1',
            button: new Button({
                text:      'Отправить',
                classList: 'button--outline playground-example__button',
                methods:   {
                    onClick() {
                        transport.delete('https://jsonplaceholder.typicode.com/posts/1', {
                            data: {
                                postId: 1,
                            },
                        })
                            .then(res => res.json())
                            .then(res => console.log(res))
                            .catch(e => console.log(e));
                    },
                },
            }),
        },
    ],
});

layout.setProps({
    header:  navigation,
    content: playgroundCard,
});

render('#app', layout);
