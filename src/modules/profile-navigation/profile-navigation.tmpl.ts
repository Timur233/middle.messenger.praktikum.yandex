export default function template() {
    return `
        <nav class="profile-page__navigation profile-navigation">
            {{#each links}}
                <a href="{{link}}" class="profile-navigation__link">
                    {{{caption}}}
                </a>
            {{/each}}
        </nav>
    `;
}
