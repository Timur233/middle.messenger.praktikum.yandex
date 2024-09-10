export default function template() {
    return `
        <div class="form-group">
            {{#if label}}
                <label
                    for="{{id}}"
                    class="form-group__label"
                >
                    {{label}}
                </label>
            {{/if}}

            <input
                id="{{id}}"
                name="{{name}}"
                class="form-group__input input {{#if hasError}}input--error{{/if}}"
                placeholder="{{ placeholder }}"
                autocomplete="{{#if autocomplete}}{{autocomplete}}{{else}}off{{/if}}"
                type="{{#if type}}{{type}}{{else}}text{{/if}}"
                value="{{value}}"
                events="{'blur': 'validate', 'input': 'mask'}"
            >

            {{#if prompt}}
                <div
                    class="form-group__prompt {{#if hasError}}form-group__prompt--error{{/if}}"
                >
                    {{prompt}}
                </div>
            {{/if}}
        </div>
    `;
}
