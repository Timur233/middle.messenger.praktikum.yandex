export default function template() {
    return `
        <div class="chats__search searchbar">
            <input type="text" class="searchbar__input input" placeholder="" events="{'input': 'onInput'}">
            <div class="searchbar__placeholder search-placeholder">
                <svg class="search-placeholder__icon svg-icon" style="height: 13px;">
                    <use xlink:href="/assets/icons.svg#search-icon"></use>
                </svg>
                <span class="search-placeholder__text">
                    Поиск
                </span>
            </div>
        </div>
    `;
}
