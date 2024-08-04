import '../../styles/main.scss';
import './style.scss';
import render from '../../utils/render.ts';
import MainLayout from '../../layout/main/main.ts';
import ProfileNavigation from '../../modules/profile-navigation/profile-navigation.ts';
import ChangeDataForm from '../../components/change-data-form/change-data-form.ts';
import ChangeAvatar from '../../components/change-avatar/change-avatar.ts';
import FormGroup from '../../components/form-group/formGroup.ts';
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

            let hasError: Boolean = false;

            Object.keys(formFields).forEach((key: string) => {
                const field: FormGroup = formFields[key];

                field.methods?.validate();

                if (field.props?.hasError === true) {
                    hasError = field.props?.hasError;
                }
            });

            if (hasError === false) {
                // eslint-disable-next-line no-console
                console.log({
                    oldPassword:       formFields.oldPassword.getValue(),
                    newPassword:       formFields.newPassword.getValue(),
                    newPasswordRepeat: formFields.newPasswordRepeat.getValue(),
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
