export default function template() {
    return `
        <main class="main-layout {{classList}}">
            {{#if sidebar }}
                <div class="main-layout__sidebar">
                    {{{sidebar}}}
                </div>
            {{/if}}
            <div class="main-layout__content main-page__content">
                {{#if header }}
                    <div class="main-layout__header">
                        {{{header}}}
                    </div>
                {{/if}}
                {{{content}}}
            </div>
        </main>
    `;
}
