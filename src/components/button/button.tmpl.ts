export default function template() {
    return `
        <button class="button {{classList}}" events="{ 'click': 'clickHandler' }" type="button">
            {{text}}
            <span class="icon" events="{ 'click': 'clickHandler' }">   click</span>
        </button>
    `;
}
