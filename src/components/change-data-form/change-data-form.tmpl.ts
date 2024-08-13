export default function template() {
    return `
        <div class="user-profile">
            <div class="user-profile__header">
                {{{avatar}}}
            </div>
            <div class="user-profile__form">
                <form action="/" class="change-data-form" events="{'submit': 'onSubmit'}">
                    {{#each fields}}
                        {{{this}}}
                    {{/each}}
                    <div class="form-actions change-data-form__actions">
                        {{{button}}}
                    </div>
                </form>
            </div>
        </div>
    `;
}
