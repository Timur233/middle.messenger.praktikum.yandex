import Button from '../../components/button/button.ts';
import Form from '../../components/auth-form/auth-form.ts';
import FormGroup from '../../components/form-group/form-group.ts';
import Page from '../../services/Page.ts';
import router from '../../services/router/Router.ts';
import signinAPI from './PageLogin.api.ts';

export default class PageLogin extends Page {
    setup() {
        this.setProps({ classList: 'login-page__wrapper' });
        this.setPageMeta({
            title:       'title',
            description: 'desc',
            keywords:    'keywords',
        });

        const formFields: { [key: string]: FormGroup } = {
            login: new FormGroup({
                label:       'Логин',
                id:          'login',
                name:        'login',
                placeholder: 'Введите логин',
                hasError:    false,
                methods:     {
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
                label:       'Пароль',
                id:          'password',
                name:        'password',
                type:        'password',
                placeholder: 'Введите пароль',
                methods:     {
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

        const button = new Button({
            classList: 'button--primary',
            text:      'Вход',
            type:      'submit',
        });

        const buttonOutline = new Button({
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
            buttons: [button, buttonOutline],
            methods: {
                onSubmit: (e: Event | undefined) => {
                    if (e instanceof Event) e.preventDefault();

                    if (form.validate() === false) {
                        const data = form.serialize();

                        signinAPI
                            .signin(data)
                            .then(res => console.log(res.status))
                            .then((res) => {
                                console.log(res);
                            });
                    }
                },
            },
        });

        return form;
    }
}
