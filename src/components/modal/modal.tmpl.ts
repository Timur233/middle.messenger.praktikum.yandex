export default function template() {
    return `
        <div class="main-modal" events="{'click': 'onClickOverlay'}" style="display: {{#if isShow}}{{else}}none{{/if}}">
            <div class="main-modal__content" events="{'click': 'onClickModal'}">
                <div class="main-modal__header">
                    {{title}}
                    <button class="main-modal__close-btn" events="{'click': 'onClickOverlay'}">
                        <svg class="svg-icon" style="height: 16px; width: 16px">
                            <use xlink:href="/assets/icons.svg#close-btn"></use>
                        </svg>
                    </button>
                </div>
                <div class="main-modal__body">{{{content}}}</div>
                <div class="main-modal__footer">
                    {{#each buttons}}
                        {{{this}}}
                    {{/each}}
                </div>
            </div>
        </div>
    `;
}
