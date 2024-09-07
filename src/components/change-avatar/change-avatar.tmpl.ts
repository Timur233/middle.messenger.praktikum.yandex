export default function template() {
    return `
        <div class="user-avatar {{classList}}" events="{'click': 'onClick'}">
            <img class="user-avatar__image" src="{{image}}" alt="{{title}}">
            <span class="user-avatar__label">{{label}}</span>
        </div>
    `;
}
