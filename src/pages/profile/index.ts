import '../../styles/main.scss';
import './style.scss';
import render from '../../utils/render.ts';
import MainLayout from '../../layout/main/main.ts';
import ProfileNavigation from '../../modules/profile-navigation/profile-navigation.ts';
import ProfileData from './modules/profile-data/profile-data.ts';
import ChangeAvatar from '../../components/change-avatar/change-avatar.ts';

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
const avatar = new ChangeAvatar({
    classList: 'user-profile__avatar',
    image:     'https://site.iskandarov.kz/storage/uploads/2024/07/15/timur-avatar_uid_6695699e4ab9d.jpg',
    title:     'Тимур',
    label:     'Поменять аватар',
});
const profileData = new ProfileData({
    userName:       'Тимур',
    avatar,
    userInfoFields: [
        {
            label: 'Почта',
            value: 'timur@iskandarov.kz',
        },
        {
            label: 'Логин',
            value: 'Timur233',
        },
        {
            label: 'Имя',
            value: 'Тимур',
        },
        {
            label: 'Фамилия',
            value: 'Искандаров',
        },
        {
            label: 'Имя в чате',
            value: 'Timur233',
        },
        {
            label: 'Телефон',
            value: '+7 771 461 3215',
        },
    ],
    links: [
        {
            link:      '/pages/profile-change-data/index.html',
            classList: '',
            caption:   'Изменить данные',
        },
        {
            link:      '/pages/profile-change-password/index.html',
            classList: '',
            caption:   'Изменить пароль',
        },
        {
            link:      '/logout',
            classList: 'info-item__link--logout',
            caption:   'Выйти',
        },
    ],
});

layout.setProps({
    header:  navigation,
    content: profileData,
});

render('#app', layout);
