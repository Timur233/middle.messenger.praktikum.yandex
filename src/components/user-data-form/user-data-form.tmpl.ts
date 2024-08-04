export default function template() {
    return `
        <form class="login-page__form auth-form" events="{'submit': 'send'}">
            <div class="auth-form__title">{{ title }}</div>
            <div class="auth-form__fields">
                {{#each fields}}
                    {{{this}}}
                {{/each}}
                <div class="form-actions">
                    {{#each buttons}}
                        {{{this}}}
                    {{/each}}
                </div>
            </div>
        </form>
    `;
}
