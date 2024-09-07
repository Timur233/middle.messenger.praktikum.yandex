import escapeHTML from '../../utils/escapeHTML.ts';

import config from '../../services/http/cofing.ts';
import AuthAPI from '../../api/AuthAPI.ts';
import UserAPI from '../../api/UserAPI.ts';
import { ChangePasswordRequestType, UserResponseType } from '../../api/types.ts';

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

export default class PageChangePassword extends Page {
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

                                            PageChangePassword.uploadAvatar(data)
                                                .finally(() => {
                                                    PageChangePassword.loadData();
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
            oldPassword: new FormGroup({
                label:       'Старый пароль',
                id:          'oldPassword',
                name:        'oldPassword',
                type:        'password',
                placeholder: 'Введите старый пароль',
                hasError:    false,
                methods:     {
                    validate() {
                        const input: HTMLInputElement = formFields.oldPassword.getContent('input') as HTMLInputElement;

                        if (input.value === '') {
                            formFields.oldPassword.setProps({
                                value:    input.value,
                                hasError: true,
                                prompt:   'Укажите старый пароль',
                            });
                        } else {
                            formFields.oldPassword.setProps({
                                value:    input.value,
                                hasError: false,
                                prompt:   '',
                            });
                        }
                    },
                },
            }),
            newPassword: new FormGroup({
                label:       'Новый пароль',
                id:          'newPassword',
                name:        'newPassword',
                type:        'password',
                placeholder: 'Введите новый пароль',
                methods:     {
                    validate() {
                        const input: HTMLInputElement = formFields.newPassword.getContent('input') as HTMLInputElement;
                        const regex: RegExp = /^(?=.*[A-Z].*){1,}(?=.*\d.*){1,}.{8,40}$/;

                        if (regex.test(input.value) === false) {
                            formFields.newPassword.setProps({
                                value:    input.value,
                                hasError: true,
                                prompt:   `Пароль должен содержать от 8 до 40 символов,
                            включать хотя бы одну заглавную букву и одну цифру.`,
                            });
                        } else {
                            formFields.newPassword.setProps({
                                value:    input.value,
                                hasError: false,
                                prompt:   '',
                            });
                        }
                    },
                },
            }),
            newPasswordRepeat: new FormGroup({
                label:       'Повторите новый пароль',
                id:          'newPasswordRepeat',
                name:        'newPasswordRepeat',
                type:        'password',
                placeholder: 'Повторите новый пароль',
                methods:     {
                    validate() {
                        const inputNewPassword: HTMLInputElement = formFields
                            .newPassword.getContent('input') as HTMLInputElement;
                        const inputNewPasswordRepeat: HTMLInputElement = formFields
                            .newPasswordRepeat.getContent('input') as HTMLInputElement;

                        if (inputNewPassword.value !== inputNewPasswordRepeat.value) {
                            formFields.newPasswordRepeat.setProps({
                                value:    inputNewPasswordRepeat.value,
                                hasError: true,
                                prompt:   'Пароли не совподают',
                            });
                        } else {
                            formFields.newPasswordRepeat.setProps({
                                value:    inputNewPasswordRepeat.value,
                                hasError: false,
                                prompt:   '',
                            });
                        }
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

                        PageChangePassword.savePassword({
                            oldPassword: escapeHTML(formFields.oldPassword.getValue() as string),
                            newPassword: escapeHTML(formFields.newPassword.getValue() as string),
                        } as ChangePasswordRequestType)
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
            const avatarData = store.getState('userAvatar') as {
                avatar: string,
                title: string
            };

            avatar.setProps(avatarData);

            this.hideLoader();
        });

        this.showLoader();
        PageChangePassword.loadData();

        this.setProps({ classList: 'profile-page__wrapper' });
        this.setPageMeta({
            title:       'Смена пароля',
            description: 'Смена пароля.',
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

    static savePassword(data: ChangePasswordRequestType) {
        return UserAPI.password(data);
    }

    static uploadAvatar(data: FormData) {
        return UserAPI.avatar(data);
    }
}
