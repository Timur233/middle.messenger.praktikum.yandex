import config from '../../services/http/cofing.ts';
import AuthAPI from '../../api/AuthAPI.ts';
import UserAPI from '../../api/UserAPI.ts';
import { UserResponseType } from '../../api/types.ts';

import Page from '../../services/Page.ts';
import Component from '../../services/Component.ts';
import MainLayout from '../../layout/main/main.ts';
import ProfileNavigation from '../../modules/profile-navigation/profile-navigation.ts';
import ProfileData from './modules/profile-data/profile-data.ts';
import ChangeAvatar from '../../components/change-avatar/change-avatar.ts';
import PageLoader from '../../components/page-loader/page-loader.ts';
import modal from '../../components/modal/modal.ts';
import Button from '../../components/button/button.ts';
import AvatarUploader from '../../components/avatar-uploader/avatar-uploader.ts';

import store, { StoreEvents } from '../../services/store/Store.ts';
import router from '../../services/router/Router.ts';

export default class PageSettings extends Page {
    setup() {
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

                                            PageSettings.uploadAvatar(data)
                                                .finally(() => {
                                                    PageSettings.loadData();
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
        const profileDataComponent = new ProfileData({
            avatar,
            links: [
                {
                    link:      '/settings/change-data',
                    classList: '',
                    caption:   'Изменить данные',
                },
                {
                    link:      '/settings/change-password',
                    classList: '',
                    caption:   'Изменить пароль',
                },
                {
                    link:      '/logout',
                    classList: 'info-item__link--logout',
                    caption:   'Выйти',
                },
            ],
            methods: {
                onClickNav: (e: Event) => {
                    const linkElement = e.target as HTMLLinkElement;
                    const link = linkElement.dataset?.route || null;

                    if (link) {
                        e.preventDefault();

                        router.go(link);
                    }
                },
            },
        });

        layout.setProps({
            header:  navigation,
            content: profileDataComponent,
        });

        store.on(StoreEvents.Updated, () => {
            const userInfo = store.getState('userInfo') as UserResponseType;
            const avatarData = store.getState('userAvatar') as {
                avatar: string,
                title: string
            };

            avatar.setProps(avatarData);
            profileDataComponent.setProps({
                userName:       userInfo.first_name,
                userInfoFields: store.getState('userInfoFields'),
            });

            this.hideLoader();
        });

        this.showLoader();
        PageSettings.loadData();

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
                    store.setState('userInfoFields', [
                        {
                            label: 'Почта',
                            value: res.email,
                        },
                        {
                            label: 'Логин',
                            value: res.login,
                        },
                        {
                            label: 'Имя',
                            value: res.first_name || '-',
                        },
                        {
                            label: 'Фамилия',
                            value: res.second_name || '-',
                        },
                        {
                            label: 'Имя в чате',
                            value: res.display_name || '-',
                        },
                        {
                            label: 'Телефон',
                            value: res.phone || '-',
                        },
                    ]);
                    store.setState('userAvatar', {
                        image: res?.avatar ? `${config.APP_URL}/resources${res?.avatar}`
                            : '/images/avatar-placeholder.jpeg',
                        title: res.login,
                    });
                }
            });
    }

    static uploadAvatar(data: FormData) {
        return UserAPI.avatar(data);
    }
}
