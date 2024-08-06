import '../../styles/main.scss';
import './style.scss';
import render from '../../utils/render.ts';
import MainLayout from '../../layout/main/main.ts';
import ProfileNavigation from '../../modules/profile-navigation/profile-navigation.ts';
import ChangeDataForm from '../../components/change-data-form/change-data-form.ts';
import ChangeAvatar from '../../components/change-avatar/change-avatar.ts';
import FormGroup from '../../components/form-group/form-group.ts';
import Button from '../../components/button/button.ts';

const layout = new MainLayout();

const navigation = new ProfileNavigation({
    links: [{
        link:    '/pages/profile/index.html',
        caption: `
            <svg class="svg-icon" style="width: 10px; height: 10px;">
                <use xlink:href="/assets/icons.svg#arrow-left"></use>
            </svg>
            Вернуться
        `,
    }],
});

const avatar = new ChangeAvatar({
    classList: 'user-profile__avatar',
    image:     'https://site.iskandarov.kz/storage/uploads/2024/07/15/timur-avatar_uid_6695699e4ab9d.jpg',
    title:     'Тимур',
    label:     'Поменять аватар',
});

const saveButton = new Button({
    type:      'submit',
    text:      'Сохранить',
    classList: 'button--primary',
});

const formFields: { [key: string]: FormGroup } = {
    email: new FormGroup({
        label:       'Email',
        id:          'email',
        name:        'email',
        value:       'timur@iskandarov.kz',
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
        value:       'Timur233',
        placeholder: 'Введите логин',
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
        value:       'Тимур',
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
        value:       'Искандаров',
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
    display_name: new FormGroup({
        label:       'Имя в чате',
        id:          'display_name',
        name:        'display_name',
        value:       'Timur233',
        placeholder: 'Введите имя',
        methods:     {
            validate() {
                const input: HTMLInputElement = formFields.display_name.getContent('input') as HTMLInputElement;
                const regex: RegExp = /^(?=.*[a-zA-Z])[-\w]{3,20}$/;

                if (regex.test(input.value) === false) {
                    formFields.display_name.setProps({
                        value:    input.value,
                        hasError: true,
                        prompt:   `Имя должно быть написано на латинице, от 3 до 20 символов,
                            недопустимы спец символовы и пробелы (допустимы дефис и нижнее подчёркивание)`,
                    });
                } else {
                    formFields.display_name.setProps({
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
        value:       '+7 (771) 461-32-15',
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
};

const changeDataForm = new ChangeDataForm({
    avatar,
    fields:  formFields,
    button:  saveButton,
    methods: {
        onSubmit: (e: Event | undefined) => {
            if (e instanceof Event) e.preventDefault();

            if (changeDataForm.validate() === false) {
                // eslint-disable-next-line no-console
                console.log({
                    email:        formFields.email.getValue(),
                    first_name:   formFields.first_name.getValue(),
                    second_name:  formFields.second_name.getValue(),
                    display_name: formFields.display_name.getValue(),
                    phone:        formFields.phone.getValue(),
                });
            }
        },
    },
});

layout.setProps({
    header:  navigation,
    content: changeDataForm,
});

render('#app', layout);
