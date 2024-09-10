import escapeHTML from '../../utils/escapeHTML.ts';

import config from '../../services/http/cofing.ts';
import AuthAPI from '../../api/AuthAPI.ts';
import UserAPI from '../../api/UserAPI.ts';
import { UserResponseType, UserUpdateRequestType } from '../../api/types.ts';

import Page from '../../services/Page.ts';
import Component from '../../services/Component.ts';
import MainLayout from '../../layout/main/main.ts';
import ProfileNavigation from '../../modules/profile-navigation/profile-navigation.ts';
import ChangeAvatar from '../../components/change-avatar/change-avatar.ts';
import PageLoader from '../../components/page-loader/page-loader.ts';
import modal from '../../components/modal/modal.ts';
import Button from '../../components/button/button.ts';
import AvatarUploader from '../../components/avatar-uploader/avatar-uploader.ts';
import ChangeDataForm from '../../components/change-data-form/change-data-form.ts';
import FormGroup from '../../components/form-group/form-group.ts';

import store, { StoreEvents } from '../../services/store/Store.ts';
import router from '../../services/router/Router.ts';

export default class PageChangeData extends Page {
    setup() {
        const layout = new MainLayout();
        const navigation = new ProfileNavigation({
            links: [{
                link:    '/settings',
                caption: `
            <svg class="svg-icon" style="width: 10px; height: 10px;">
                <use xlink:href="/assets/icons.svg#arrow-left"></use>
            </svg>
            Вернуться
        `,
            }],
            methods: {
                onClick(e:Event) {
                    const element = e.target as HTMLElement;

                    if (element && element.dataset?.route) {
                        e.preventDefault();
                        router.go(element.dataset?.route);
                    }
                },
            },
        });
        const avatarUploader = new AvatarUploader({
            methods: {
                onChange: () => {
                    const input = avatarUploader.getContent('#avatar-uploader') as HTMLInputElement;
                    const caption = avatarUploader.getContent('.avatar-uploader__caption') as HTMLElement;
                    const file: File | null = input.files?.[0] || null;

                    if (file) {
                        caption.textContent = file.name;
                    }
                },
            },
        });
        const avatar = new ChangeAvatar({
            classList: 'user-profile__avatar',
            label:     'Поменять аватар',
            methods:   {
                onClick: () => {
                    modal.setProps({
                        title:   'Загрузите файл',
                        content: avatarUploader,
                        buttons: [
                            new Button({
                                text:      'Отправить',
                                classList: 'button--primary',
                                methods:   {
                                    onClick: () => {
                                        const input = avatarUploader.getContent('#avatar-uploader') as HTMLInputElement;
                                        const file: File | null = input.files?.[0] || null;

                                        if (file) {
                                            const data = new FormData();

                                            this.showLoader();
                                            modal.hide();

                                            data.append('avatar', file);

                                            PageChangeData.uploadAvatar(data)
                                                .finally(() => {
                                                    PageChangeData.loadData();
                                                    this.hideLoader();
                                                });
                                        }
                                    },
                                },
                            }),
                        ],
                    });

                    modal.show();
                },
            },
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
                value:       '',
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
                value:       '',
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
                value:       '',
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
                value:       '',
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
                value:       '',
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
                value:       '',
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
                        const match: string[] = inputValue
                            .match(/(^\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/) || [];

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
                        this.showLoader();

                        PageChangeData.saveData({
                            email:        escapeHTML(formFields.email.getValue() as string),
                            first_name:   escapeHTML(formFields.first_name.getValue() as string),
                            second_name:  escapeHTML(formFields.second_name.getValue() as string),
                            display_name: escapeHTML(formFields.display_name.getValue() as string),
                            phone:        escapeHTML(formFields.phone.getValue() as string),
                        } as UserUpdateRequestType)
                            .then(() => {
                                this.hideLoader();
                            });
                    }
                },
            },
        });

        layout.setProps({
            header:  navigation,
            content: changeDataForm,
        });

        store.on(StoreEvents.Updated, () => {
            const userInfo = store.getState('userInfo') as UserResponseType;
            const avatarData = store.getState('userAvatar') as {
                avatar: string,
                title: string
            };

            avatar.setProps(avatarData);
            formFields.email.setProps({ value: userInfo.email });
            formFields.login.setProps({ value: userInfo.login });
            formFields.first_name.setProps({ value: userInfo.first_name });
            formFields.second_name.setProps({ value: userInfo.second_name });
            formFields.display_name.setProps({ value: userInfo.display_name });
            formFields.phone.setProps({ value: userInfo.phone });

            this.hideLoader();
        });

        this.showLoader();
        PageChangeData.loadData();

        this.setProps({ classList: 'profile-page__wrapper' });
        this.setPageMeta({
            title:       'Профайл',
            description: 'Профиль пользователя.',
        });

        return layout;
    }

    loader(): Component {
        const loader = new PageLoader();

        return loader;
    }

    static loadData() {
        AuthAPI.user()
            .then((res: UserResponseType | void) => {
                if (res) {
                    store.setState('userInfo', {
                        ...res,
                    });
                    store.setState('userAvatar', {
                        image: res?.avatar ? `${config.APP_URL}/resources${res?.avatar}`
                            : '/images/avatar-placeholder.jpeg',
                        title: res.login,
                    });
                }
            });
    }

    static saveData(data: UserUpdateRequestType) {
        return UserAPI.update(data);
    }

    static uploadAvatar(data: FormData) {
        return UserAPI.avatar(data);
    }
}
