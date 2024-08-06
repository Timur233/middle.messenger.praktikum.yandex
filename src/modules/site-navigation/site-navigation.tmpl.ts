export default function template() {
    return `
        <div class="work-card">
            <h1 class="work-card__title">
                {{title}}
            </h1>

            <span>Список страниц проекта:</span>
            <nav class="work-card__links">
                <ul class="pages-list">
                    {{#each links}}
                        <li class="pages-list__item">
                            <a class="pages-list__link" href="{{link}}">
                                {{title}}
                            </a>
                        </li>
                    {{/each}}
                </ul>
            </nav>
        </div>
    `;
}
