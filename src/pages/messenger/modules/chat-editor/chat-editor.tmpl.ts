export default function template() {
    return `
        <div class="chat-editor">
            <div class="chat-editor__avatar">
                {{{avatar}}}
                <input
                    id="chat-editor-avatar-input"
                    hidden
                    type="file"
                    accept=".jpeg,.jpg,.png,.gif,.webp"
                    events="{'change': 'onChangeAvatar'}"
                >
            </div>
            <div class="chat-editor__title">
                {{{titleField}}}
            </div>
            <div class="chat-editor__users">
                {{{userFinder}}}
            </div>
        </div>
    `;
}
