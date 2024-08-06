export default function template() {
    return `
        <button class="button {{classList}}" events="{ 'click': 'onClick' }" type="{{type}}">
            {{text}}
        </button>
    `;
}
