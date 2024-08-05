import '../../styles/main.scss';
import './style.scss';

import render from '../../utils/render.ts';
import Button from '../../components/button/button.ts';
import Form from '../../components/auth-form/auth-form.ts';
import FormGroup from '../../components/form-group/form-group.ts';

const formFields: { [key: string]: FormGroup } = {
    email: new FormGroup({
        label:       'Email',
        id:          'email',
        name:        'email',
        placeholder: 'Введите email',
        hasError:    false,
        methods:     {
            validate() {
                const input: HTMLInputElement = formFields.email.getContent('input') as HTMLInputElement;
                const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                if (regex.test(input.value) === false) {
                    formFields.email.setProps({
                        value:    input.value,
                        hasError: true,
                        prompt:   'Не валидный Email',
                    });
                } else {
                    formFields.email.setProps({
                        value:    input.value,
                        hasError: false,
                        prompt:   '',
                    });
                }
            },
        },
    }),
    login: new FormGroup({
        label:       'Логин',
        id:          'login',
        name:        'login',
        placeholder: 'Введите логин',
        prompt:      'Логин должен быть уникальным',
        methods:     {
            validate() {
                const input: HTMLInputElement = formFields.login.getContent('input') as HTMLInputElement;
                const regex: RegExp = /^(?=.*[a-zA-Z])[-\w]{3,20}$/;

                if (regex.test(input.value) === false) {
                    formFields.login.setProps({
                        value:    input.value,
                        hasError: true,
                        prompt:   `Логин должен быть написан на латинице, от 3 до 20 символов,
                            недопустимы спец символов и пробелов (допустимы дефис и нижнее подчёркивание)`,
                    });
                } else {
                    formFields.login.setProps({
                        value:    input.value,
                        hasError: false,
                        prompt:   '',
                    });
                }
            },
        },
    }),
    first_name: new FormGroup({
        label:       'Имя',
        id:          'first_name',
        name:        'first_name',
        placeholder: 'Введите имя',
        methods:     {
            validate() {
                const input: HTMLInputElement = formFields.first_name.getContent('input') as HTMLInputElement;
                const regex: RegExp = /^[A-ZА-Я][a-zA-Zа-яА-Я]*$/;

                if (regex.test(input.value) === false) {
                    formFields.first_name.setProps({
                        value:    input.value,
                        hasError: true,
                        prompt:   'Имя должно начинаться с заглавной буквы, без пробелов, цифр и спецсимволов',
                    });
                } else {
                    formFields.first_name.setProps({
                        value:    input.value,
                        hasError: false,
                        prompt:   '',
                    });
                }
            },
        },
    }),
    second_name: new FormGroup({
        label:       'Фамилия',
        id:          'second_name',
        name:        'second_name',
        placeholder: 'Введите фамилию',
        methods:     {
            validate() {
                const input: HTMLInputElement = formFields.second_name.getContent('input') as HTMLInputElement;
                const regex: RegExp = /^[A-ZА-Я][a-zA-Zа-яА-Я]*$/;

                if (regex.test(input.value) === false) {
                    formFields.second_name.setProps({
                        value:    input.value,
                        hasError: true,
                        prompt:   'Имя должно начинаться с заглавной буквы, без пробелов, цифр и спецсимволов',
                    });
                } else {
                    formFields.second_name.setProps({
                        value:    input.value,
                        hasError: false,
                        prompt:   '',
                    });
                }
            },
        },
    }),
    phone: new FormGroup({
        label:       'Телефон',
        id:          'phone',
        name:        'phone',
        placeholder: 'Введите Телефон',
        methods:     {
            validate() {
                const input: HTMLInputElement = formFields.phone.getContent('input') as HTMLInputElement;
                // eslint-disable-next-line max-len
                const regex: RegExp = /^\+?\d{1,4}[-.\s]?(\(\d{1,5}\)|\d{1,5})[-.\s]?\d{1,5}[-.\s]?\d{1,5}[-.\s]?\d{1,5}[-.\s]?\d{1,5}$/;

                if (regex.test(input.value) === false) {
                    formFields.phone.setProps({
                        value:    input.value,
                        hasError: true,
                        prompt:   'От 10 до 15 символов, состоит из цифр, может начинается с плюса.',
                    });
                } else {
                    formFields.phone.setProps({
                        value:    input.value,
                        hasError: false,
                        prompt:   '',
                    });
                }
            },
            mask() {
                const input: HTMLInputElement = formFields.phone.getContent('input') as HTMLInputElement;
                const inputValue: string = input.value.replace(/\D/g, '') || '';
                const match: string[] = inputValue.match(/(^\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/) || [];

                input.value = !match[3] ? `+${match[1]}${match[2]}` : `+${match[1]} (${match[2]}) ${
                    match[3]}${match[4] ? `-${match[4]}` : ''}${match[5] ? `-${match[5]}` : ''}`;
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
                const regex: RegExp = /^(?=.*[A-Z].*){1,}(?=.*\d.*){1,}.{8,40}$/;

                if (regex.test(input.value) === false) {
                    formFields.password.setProps({
                        value:    input.value,
                        hasError: true,
                        prompt:   `Пароль должен содержать от 8 до 40 символов,
                            включать хотя бы одну заглавную букву и одну цифру.`,
                    });
                } else {
                    formFields.password.setProps({
                        value:    input.value,
                        hasError: false,
                        prompt:   '',
                    });
                }
            },
        },
    }),
};

const signUpButton = new Button({
    classList: 'button--primary',
    text:      'Зарегестрироваться',
    type:      'submin',
});

const loginButton = new Button({
    classList: 'button--outline',
    text:      'Вход',
    type:      'button',
    methods:   {
        onClick() {
            document.location = '/pages/login/';
        },
    },
});

const form = new Form({
    title:   'Регистрация',
    fields:  formFields,
    buttons: [signUpButton, loginButton],
    methods: {
        onSubmit: (e: Event | undefined) => {
            if (e instanceof Event) e.preventDefault();

            if (form.validate() === false) {
                // eslint-disable-next-line no-console
                console.log({
                    email:       formFields.email.getValue(),
                    first_name:  formFields.first_name.getValue(),
                    second_name: formFields.second_name.getValue(),
                    phone:       formFields.phone.getValue(),
                    password:    formFields.password.getValue(),
                });
            }
        },
    },
});

render('#app', form);
