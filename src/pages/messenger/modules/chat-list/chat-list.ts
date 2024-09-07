import './chat-list.scss';
import template from './chat-list.tmpl.ts';
import Component from '../../../../services/Component.ts';
import ChatItem from './components/chat-item/chat-item.ts';
import Avatar from '../../components/avatar/avatar.ts';

export type ChatDataType = {
    id: number;
    isActive: Boolean;
    chatName: string;
    messagePreview: string;
    unreadMessages: number | null;
    date: string;
    userAvatar: string | null;
    avatarLink: string;
    component?: ChatItem | null;
};

export default class ChatList extends Component {
    public chatItemClickHandler: (...args: any[]) => unknown;

    public userItemClickHandler: (...args: any[]) => unknown;

    public listScrollPosition: number = 0;

    constructor(...args: any[]) {
        super(...args);

        this.chatItemClickHandler = () => {};
        this.userItemClickHandler = () => {};
    }

    componentBeforeRender(): void {
        const list = this.getContent('.chats-list');

        if (list) {
            this.listScrollPosition = list.scrollTop;
        }
    }

    componentAfterRender(): void {
        const list = this.getContent('.chats-list');

        if (list) {
            list.scrollTop = this.listScrollPosition;
        }
    }

    activateChat(chat: string | ChatItem | null = null): void {
        if (chat === null) return;

        if (chat instanceof ChatItem) {
            chat.setProps({ isActive: true });

            return;
        }

        const targetChat = this.getChild(chat);

        targetChat?.setProps({ isActive: true });
    }

    deactivateChat() {
        const chatPlaceholders: string[] = this.props?.chats as string[] || [];
        const chatsItems: ChatItem[] = chatPlaceholders.map((i: string) => this.getChild(i) as ChatItem) || [];
        const activeChat: ChatItem | undefined = chatsItems.find(item => item.props.isActive);

        if (activeChat) activeChat.setProps({ isActive: false });
    }

    loadChatList(chats: ChatDataType[], users: ChatDataType[] = []) {
        this.setProps({
            chats: chats.map((item: ChatDataType): ChatItem => new ChatItem({
                ...item,
                avatar: new Avatar({
                    title:     item.chatName,
                    image:     item.avatarLink,
                    classList: 'chat-item__user-logo',
                }),
                methods: {
                    onClick: this.chatItemClickHandler,
                },
            })),
            users: users.map((item: ChatDataType): ChatItem => new ChatItem({
                ...item,
                avatar: new Avatar({
                    title:     item.chatName,
                    image:     item.avatarLink,
                    classList: 'chat-item__user-logo',
                }),
                methods: {
                    onClick: this.userItemClickHandler,
                },
            })),
        });
    }

    render():void {
        this.compile(template(), this.props);
    }
}
