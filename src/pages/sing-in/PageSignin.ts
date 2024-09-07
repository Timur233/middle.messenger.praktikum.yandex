import { setCookie } from '../../utils/cookie.ts';

import AuthAPI from '../../api/AuthAPI.ts';
import { SigninRequestType } from '../../api/types.ts';

import Component from '../../services/Component.ts';
import Page from '../../services/Page.ts';
import Button from '../../components/button/button.ts';
import Form from '../../components/auth-form/auth-form.ts';
import FormGroup from '../../components/form-group/form-group.ts';
import PageLoader from '../../components/page-loader/page-loader.ts';

import router from '../../services/router/Router.ts';

export default class PageSignin extends Page {
    setup() {
        const formFields: { [key: string]: FormGroup } = {
            login: new FormGroup({
                label:        'Логин',
                id:           'login',
                name:         'login',
                placeholder:  'Введите логин',
                hasError:     false,
                autocomplete: 'on',
                methods:      {
                    validate() {
                        const input: HTMLInputElement = formFields.login.getContent('input') as HTMLInputElement;

                        if (input.value === '') {
                            formFields.login.setProps({
                                value:    input.value,
                                prompt:   'Введите логин',
                                hasError: true,
                            });

                            return;
                        }

                        formFields.login.setProps({
                            value:    input.value,
                            prompt:   '',
                            hasError: false,
                        });
                    },
                },
            }),
            password: new FormGroup({
                label:        'Пароль',
                id:           'password',
                name:         'password',
                type:         'password',
                placeholder:  'Введите пароль',
                autocomplete: 'on',
                methods:      {
                    validate() {
                        const input: HTMLInputElement = formFields.password.getContent('input') as HTMLInputElement;

                        if (input.value === '') {
                            formFields.password.setProps({
                                value:    input.value,
                                prompt:   'Введите пароль',
                                hasError: true,
                            });

                            return;
                        }

                        formFields.password.setProps({
                            value:    input.value,
                            prompt:   '',
                            hasError: false,
                        });
                    },
                },
            }),
        };

        const loginButton = new Button({
            classList: 'button--primary',
            text:      'Вход',
            type:      'submit',
        });

        const signinButton = new Button({
            classList: 'button--outline',
            text:      'Зарегестрироваться',
            type:      'button',
            methods:   {
                onClick() {
                    router.go('/sign-up');
                },
            },
        });

        const form = new Form({
            title:   'Авторизация',
            fields:  formFields,
            buttons: [loginButton, signinButton],
            methods: {
                onSubmit: (e: Event | undefined) => {
                    if (e instanceof Event) e.preventDefault();

                    if (form.validate() === false) {
                        const data = form.serialize() as SigninRequestType;

                        this.showLoader();
                        PageSignin.loginUser(data)
                            .then((res) => {
                                if (res.status === 401) {
                                    form.setProps({ message: 'Ошибка! Не правильный логин или пароль' });

                                    return;
                                }

                                setCookie('isAuthorized', '1');
                                document.location = '/';
                            })
                            .finally(() => {
                                this.hideLoader();
                            });
                    }
                },
            },
        });

        this.setProps({ classList: 'login-page__wrapper' });
        this.setPageMeta({
            title:       'Войти',
            description: 'Cтраница авторизации.',
        });

        return form;
    }

    loader(): Component {
        const loader = new PageLoader();

        return loader;
    }

    static loginUser(loginData: SigninRequestType) {
        return AuthAPI.signin(loginData);
    }
}
