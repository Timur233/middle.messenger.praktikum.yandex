export default function template() {
    return `
        <form class="login-page__form auth-form" events="{'submit': 'send'}">
            <div class="auth-form__title">{{ title }}</div>
            <div class="auth-form__fields">
                <div class="form-actions">
                    {{{login_button}}}
                    {{{signin_button}}}
                </div>
            </div>
        </form>
    `;
}

// <form class="login-page__form auth-form">
//             <div class="auth-form__title">{{ title }}</div>
//             <div class="auth-form__fields">
//                 {{> form-group
//                     label="Логин"
//                     id="login"
//                     name="login"
//                     placeholder="Введите логин"
//                     prompt="Не забудьте свой логин"
//                 }}
//                 {{> form-group
//                     label="Пароль"
//                     type="password"
//                     id="password"
//                     name="password"
//                     placeholder="Введите пароль"
//                     prompt="Введен не правильный пароль"
//                     hasError=true
//                 }}
//                 <div class="form-actions">
//                     {{> button caption="Вход" style="primary" type="submit"}}
//                     {{> button caption="Зарегестрироваться" style="outline" href="/pages/sign-up/index.html"}}
//                 </div>
//             </div>
//         </form>
