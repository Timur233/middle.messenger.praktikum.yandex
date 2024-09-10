export default function template() {
    return `
        <nav class="profile-page__navigation profile-navigation">
            {{#each links}}
                <a href="#" data-route="{{link}}" class="profile-navigation__link" events="{'click': 'onClick'}">
                    {{{caption}}}
                </a>
            {{/each}}
        </nav>
    `;
}
