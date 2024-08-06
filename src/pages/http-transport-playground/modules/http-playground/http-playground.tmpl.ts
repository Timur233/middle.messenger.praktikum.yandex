export default function template() {
    return `
        <div class="playground-card">
            <h1 class="playground-card__title">{{title}}</h1>
            <div class="playground-card__description">{{desc}}</div>
            <div class="playground-card__examples">
                {{#each examples}}
                    <div class="playground-example">
                        <h2 class="playground-example__title">{{title}}</h2>
                        <span class="playground-example__link">{{url}}</span>
                        {{{button}}}
                    </div>
                {{/each}}
            </div>
        </div>
    `;
}
