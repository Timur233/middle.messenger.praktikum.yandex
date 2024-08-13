export default function template() {
    return `
        <div class="error-message {{classList}}">
            <h1 class="error-message__title">{{title}}</h1>
            <div class="error-message__text">{{text}}</div>
            {{#if errorLink}}
                <a class="error-message__link" href="{{errorLink}}">
                    {{#if errorLinkTitle}}{{errorLinkTitle}}{{else}}Ссылка{{/if}}
                </a>
            {{/if}}
        </div>
    `;
}
