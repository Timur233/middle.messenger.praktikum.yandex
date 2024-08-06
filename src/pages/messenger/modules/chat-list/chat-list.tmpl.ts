export default function template() {
    return `
        <div class="chats">
            <div class="chats__header">
                <div class="chats__title">
                    <span>{{title}}</span>
                    <a href="/pages/profile/index.html">
                        Профиль
                        <svg class="svg-icon" style="height: 10px; width: 5px">
                            <use xlink:href="/assets/icons.svg#arrow-right"></use>
                        </svg>
                    </a>
                </div>
                {{{searchBar}}}
            </div>
            <div class="chats__list">
                {{#each chats}}
                    {{{this}}}
                {{/each}}
            </div>
        </div>
    `;
}
