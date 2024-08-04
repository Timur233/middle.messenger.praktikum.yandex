export default function template() {
    return `
        <div
            class="chat-item {{#if isActive}}chat-item--active{{/if}} {{#if isHide}}chat-item--hide{{/if}}"
            data-chat-id="{{id}}"
            events="{'click': 'onClick'}"
        >
            <div class="chat-item__image">
                {{{avatar}}}
            </div>
            <div class="chat-item__preview">
                <span class="chat-item__title">{{chatName}}</span>
                <div class="chat-item__desc">{{{messagePreview}}}</div>
            </div>
            <div class="chat-item__meta {{#if unreadMessages}}chat-item__meta--has-unread{{/if}}">
                <div class="chat-item__date">{{date}}</div>
                {{#if unreadMessages}}
                    <div class="chat-item__alert">
                        <span class="badge badge--primary badge--round">
                            {{unreadMessages}}
                        </span>
                    </div>
                {{/if}}
            </div>
        </div>
    `;
}
