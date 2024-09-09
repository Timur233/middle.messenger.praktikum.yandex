export default function template() {
    return `
        <div class="user-finder chat-editor__user-finder">
            <div class="user-finder__title">
                Добавить пользователей
            </div>
            <div class="user-finder__input">
                <input
                    class="user-finder-input input"
                    placeholder="Введите имя пользователя"
                    type="text"
                    value="{{searchInputValue}}"
                    events="{'input': 'searchUsers'}"
                >
                <div class="user-finder__spiner">
                    <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
                        <path
                            fill="#0078d2"
                            d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,
                            8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                            <animateTransform
                                attributeName="transform"
                                attributeType="XML"
                                type="rotate"
                                dur="1s"
                                from="0 50 50"
                                to="360 50 50"
                                repeatCount="indefinite" />
                        </path>
                    </svg>
                </div>
            </div>
            {{#if usersResult}}
                <div class="user-finder__search-result search-users">
                    {{#each usersResult}}
                        <div
                            class="search-users__item"
                            data-user-id="{{id}}"
                            data-login="{{chatName}}"
                            events="{'click': 'selectUser'}"
                        >{{chatName}}</div>
                    {{/each}}
                </div>
            {{/if}}
            {{#if users}}
                <div class="user-finder__list users-finder-list">
                    {{#each users}}
                        <div
                            class="users-finder-list__item"
                            data-user-id="{{id}}"
                            data-login="{{login}}"
                        >
                            {{login}}
                            {{#unless isAdmin}}
                                <button
                                    class="users-finder-list__remove"
                                    data-user-id="{{id}}"
                                    events="{'click': 'removeUser'}"
                                >
                                    <svg class="svg-icon">
                                        <use xlink:href="/assets/icons.svg#close-btn"></use>
                                    </svg>
                                </button>
                            {{/unless}}
                        </div>
                    {{/each}}
                </div>
            {{/if}}
        </div>
    `;
}
