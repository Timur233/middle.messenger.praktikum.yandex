export default function template() {
    return `
        <div class="chats">
            <div class="chats__header">
                <div class="chats__title">
                    <span>{{title}}</span>
                    <a href="#" events="{'click': 'openProfilePage'}">
                        Профиль
                        <svg class="svg-icon" style="height: 10px; width: 5px">
                            <use xlink:href="/assets/icons.svg#arrow-right"></use>
                        </svg>
                    </a>
                </div>
                {{{searchBar}}}
            </div>
            <div class="chats__list chats-list">
                {{#each chats}}
                    {{{this}}}
                {{/each}}

                {{#if users}}
                    <span class="chats-list__title">Начать новый чат с:</span>
                    {{#each users}}
                        {{{this}}}
                    {{/each}}
                {{/if}}
            </div>
        </div>
    `;
}
