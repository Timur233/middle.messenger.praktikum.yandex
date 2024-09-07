export default function template() {
    return `
        <div class="messenger-chat">
            {{#if activeChatId}}
                <div class="messenger-chat__header">
                    <div class="chat-info">
                        <div class="chat-info__image">
                            {{{avatar}}}
                        </div>
                        <div class="chat-info__title">
                            {{title}}
                        </div>
                        <div class="chat-info__more">
                            <button class="chat-info__more-btn" events="{'click': 'showMoreDropdown'}">
                                <svg class="svg-icon" style="height: 16px;">
                                    <use xlink:href="/assets/icons.svg#more-btn"></use>
                                </svg>
                            </button>
                            <div class="chat-info__dropdown more-dropdown">
                                <span
                                    class="more-dropdown__item more-dropdown__item--delete"
                                    events="{'click': 'deleteChat'}"
                                >
                                    Удалить чат
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="messenger-chat__history" events="{'scroll': 'onScrollHistory'}">
                    <div class="chat-history">
                        {{#each messages}}
                            {{#if isMessageType}}
                                <div
                                    class="chat-history__message user-message user-message--{{side}}"
                                    data-message-id="{{id}}"
                                >
                                    {{{content}}}
                                    <span class="user-message__time">{{time}}</span>
                                </div>
                            {{else}}
                                <div class="chat-history__date-badge">{{{content}}}</div>
                            {{/if}}
                        {{/each}}
                    </div>
                </div>
                <div class="messenger-chat__footer">
                    <form action="/" class="messenger-form">
                        <div class="messenger-form__source">
                            <div class="source-dropdown">
                                <div class="source-dropdown__item" events="{'click': 'selectFile'}">
                                    <div class="source-dropdown__item-icon">
                                        <svg class="svg-icon" style="height: 18px;">
                                            <use xlink:href="/assets/icons.svg#source-image"></use>
                                        </svg>
                                    </div>
                                    <span>Изображение</span>
                                </div>
                                <input
                                    id="file-uploader-input"
                                    type="file"
                                    accept=".jpeg,.jpg,.png,.gif,.webp"
                                    hidden
                                    events="{'change': 'onSelectFile'}"
                                >
                            </div>
                            <button class="messenger-source-btn" type="button" events="{'click': 'showDropdown'}">
                                <svg class="messenger-source-btn__icon svg-icon" style="height: 32px;">
                                    <use xlink:href="/assets/icons.svg#source-btn"></use>
                                </svg>
                            </button>
                        </div>
                        <div class="messenger-form__text">
                            <textarea
                                name="message"
                                class="messenger-text-field"
                                placeholder="Сообщение"
                                events="{'input': 'onInput', 'keydown': 'onKeydown'}"
                            ></textarea>
                        </div>
                        <div class="messenger-form__send">
                            <button
                                type="submit"
                                class="messenger-send-btn"
                                title="(enter) - отправить, (shift + enter) - сброс сроки"
                                events="{'click': 'sendMessage'}"
                            >
                                <svg class="svg-icon" style="width: 13px; height: 12px">
                                    <use xlink:href="/assets/icons.svg#send-btn"></use>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            {{else}}
                <div class="messenger-chat__unselected">
                    <span>Выберите чат чтобы отправить сообщение</span>
                </div>
            {{/if}}
        </div>
    `;
}
