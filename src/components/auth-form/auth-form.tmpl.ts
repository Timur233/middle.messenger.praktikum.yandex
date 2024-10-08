export default function template() {
    return `
        <form class="login-page__form auth-form" events="{'submit': 'onSubmit'}">
            <div class="auth-form__title">{{ title }}</div>
            <div class="auth-form__fields">
                {{#each fields}}
                    {{{this}}}
                {{/each}}
                {{#if message}}
                    <div class="auth-form__messages">
                        {{message}}
                    </div>
                {{/if}}
                <div class="form-actions">
                    {{#each buttons}}
                        {{{this}}}
                    {{/each}}
                </div>
            </div>
        </form>
    `;
}
