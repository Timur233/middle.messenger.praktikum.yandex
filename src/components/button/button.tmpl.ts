export default function template() {
    return `
        <button class="button {{classList}}" events="{ 'click': 'clickHandler' }" type="{{type}}">
            {{text}}
        </button>
    `;
}
