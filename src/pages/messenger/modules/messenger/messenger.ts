import './messenger.scss';
import template from './messenger.tmpl.ts';
import Component from '../../../../services/Component.ts';
import { Props } from '../../../../services/types.ts';

export type MessageItemType = {
    id: number;
    isMessageType: boolean;
    content: string;
    side?: string;
    time?: string;
};

export default class Messenger extends Component {
    public historyScrollPosition: number | null = null;

    public loader: HTMLElement | null = null;

    static methods: any;

    constructor(...args: any[]) {
        super(...args);

        if (this.methods.sendMessage) {
            const sendMessageMethod = this.methods.sendMessage;

            this.methods.sendMessage = (e) => {
                this.historyScrollPosition = 0;
                sendMessageMethod(e);
            };
        }
    }

    render():void {
        this.removeScrollEvent();
        this.compile(template(), this.props);
        this.scrollHandler();
    }

    componentDidUpdate(prevProps?: Props, nextProps?: Props): void {
        if (typeof prevProps === 'object' && typeof nextProps === 'object') {
            const activeChatId = prevProps?.activeChatId || null;
            const activeChatIdNext = nextProps?.activeChatId || null;
            const messages = nextProps?.messages as MessageItemType[] || [];

            if (activeChatId !== activeChatIdNext) {
                this.historyScrollPosition = null;
            }

            this.showLoader();

            if (messages.length) this.render();
        }
    }

    componentAfterRender(): void {
        const chatHistoryElement = this.getContent('.messenger-chat__history');
        const historyList = this.getContent('.chat-history');

        this.showLoader();

        Messenger.waitForImagesLoad(chatHistoryElement)
            .then(() => {
                if (chatHistoryElement instanceof HTMLElement) {
                    if (this.historyScrollPosition !== null) {
                        chatHistoryElement.scrollTop = historyList.offsetHeight - this.historyScrollPosition;
                    } else {
                        chatHistoryElement.scrollTop = historyList.offsetHeight;
                    }
                }

                this.hideLoader();
            });
    }

    keydownHandler(textarea: HTMLTextAreaElement, event: KeyboardEvent) {
        if (event.key === 'Enter') {
            if (event.shiftKey) {
                textarea.value += '\n';
            } else {
                this.methods.sendMessage(event);
            }

            Messenger.dynamicInputSize(textarea);
            event.preventDefault();
        }
    }

    removeScrollEvent() {
        const chatHistoryElement = this.getContent('.messenger-chat__history');

        if (chatHistoryElement) {
            chatHistoryElement.removeEventListener('scroll', this.scrollHandler);
        }
    }

    scrollHandler() {
        const chatHistoryElement = this.getContent('.messenger-chat__history');
        const historyList = this.getContent('.chat-history');

        if (chatHistoryElement && historyList) {
            chatHistoryElement.addEventListener('scroll', () => {
                this.historyScrollPosition = historyList.offsetHeight;
            });
        }
    }

    showLoader() {
        if (this.loader === null) {
            const component: HTMLElement = this.getContent();
            const loader: HTMLElement = Component.createELement('div', null, 'messenger-chat__loader', `
                <div class="messenger-chat__spiner">
                    <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
                        <path
                            fill="#0078d2"
                            d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,
                            8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                            <animateTransform
                                attributeName="transform"
                                attributeType="XML"
                                type="rotate"
                                dur="1s"
                                from="0 50 50"
                                to="360 50 50"
                                repeatCount="indefinite" />
                        </path>
                    </svg>
                </div>
            `);

            this.loader = loader;
            component.appendChild(loader);
        }
    }

    hideLoader() {
        if (this.loader) {
            this.loader.remove();
            this.loader = null;
        }
    }

    static dynamicInputSize(textarea: HTMLTextAreaElement) {
        if (textarea instanceof HTMLTextAreaElement) {
            let newHeight: number = 0;

            textarea.style.height = '20px';
            newHeight = Math.min(textarea.scrollHeight, 72);

            textarea.style.height = `${newHeight}px`;
        }
    }

    static waitForImagesLoad(container: HTMLElement) {
        const images: HTMLImageElement[] = Array.from(container?.querySelectorAll('img') || []);
        const promises: Promise<unknown>[] = [];

        images.forEach((img) => {
            if (!img.complete) {
                const promise = new Promise((resolve) => {
                    img.onerror = resolve;
                    img.onload = img.onerror;
                });

                promises.push(promise);
            }
        });

        return Promise.all(promises);
    }
}
