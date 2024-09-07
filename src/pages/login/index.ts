import '../../styles/main.scss';
import './style.scss';

import render from '../../utils/render.ts';
import Button from '../../components/button/button.ts';
import Form from '../../components/auth-form/auth-form.ts';
import FormGroup from '../../components/form-group/form-group.ts';

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
            document.location = '/pages/sign-up/';
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
                // eslint-disable-next-line no-console
                console.log({
                    login:    formFields.login.getValue(),
                    password: formFields.password.getValue(),
                });
            }
        },
    },
});

render('#app', form);
