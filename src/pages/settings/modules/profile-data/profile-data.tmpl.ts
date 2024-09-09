export default function template() {
    return `
        <div class="user-profile">
            <div class="user-profile__header">
                {{{avatar}}}
                <div class="user-profile__title">{{userName}}</div>
            </div>
            <div class="user-profile__info">
                <ul class="info-table">
                    {{#each userInfoFields}}
                        <li class="info-table__item info-item">
                            <span class="info-item__label">{{label}}</span>
                            <span class="info-item__value">{{value}}</span>
                        </li>
                    {{/each}}
                </ul>
            </div>
            <div class="user-profile__actions">
                <div class="info-table info-table--actions">
                    {{#each links}}
                        <li class="info-table__item info-item">
                            <a
                                href="#"
                                data-route="{{link}}"
                                class="info-item__link {{classList}}"
                                events="{'click': 'onClickNav'}"
                            >{{caption}}</a>
                        </li>
                    {{/each}}
                </div>
            </div>
        </div>
    `;
}
