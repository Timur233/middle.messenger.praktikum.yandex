import '../../styles/main.scss';
import './style.scss';
import render from '../../utils/render.ts';
import MainLayout from '../../layout/main/main.ts';
import ChatList from './modules/chat-list/chat-list.ts';
import Searchbar from './modules/chat-list/components/searchbar/searchbar.ts';
import ChatItem from './modules/chat-list/components/chat-item/chat-item.ts';
import Avatar from './modules/chat-list/components/avatar/avatar.ts';
import Messenger from './modules/chat-list/components/messenger/messenger.ts';

type Chat = {
    id: number,
    isActive: Boolean,
    chatName: string,
    messagePreview: string,
    unreadMessages: number | null,
    date: string,
    avatarLink: string,
    component: ChatItem | null
};

type Message = {
    id: number,
    isMessageType: boolean,
    content: string,
    side?: string,
    time?: string
}

const layout = new MainLayout();
const chats: Chat[] = [{
    id:             0,
    isActive:       false,
    chatName:       'Андрей',
    messagePreview: 'Изображение',
    unreadMessages: 2,
    date:           '10:49',
    avatarLink:     'https://site.iskandarov.kz/storage/uploads/2024/07/15/1_uid_669513da9d174.png',
    component:      null,
}, {
    id:             1,
    isActive:       false,
    chatName:       'Анастасия',
    messagePreview: '<span style="color: black;">Вы:</span> Огонь',
    unreadMessages: null,
    date:           '09:55',
    avatarLink:     'https://site.iskandarov.kz/storage/uploads/2024/07/15/2_uid_669513d93a8d7.png',
    component:      null,
}, {
    id:             2,
    isActive:       false,
    chatName:       'Илья',
    messagePreview: 'Друзья, Коля загрузил последний вебинар!...',
    unreadMessages: 4,
    date:           '08:49',
    avatarLink:     'https://site.iskandarov.kz/storage/uploads/2024/07/15/3_uid_669513da47b86.png',
    component:      null,
}, {
    id:             3,
    isActive:       false,
    chatName:       'тет-а-теты',
    messagePreview: '',
    unreadMessages: null,
    date:           '',
    avatarLink:     'https://site.iskandarov.kz/storage/uploads/2024/07/15/4_uid_669513d99d25f.png',
    component:      null,
}];
const chatsMessages: {
    chatId: number,
    messages: Message[]
}[] = [
    {
        chatId:   0,
        messages: [
            {
                id:            0,
                isMessageType: true,
                side:          'left',
                content:       `
                    Привет! Вот новая камера.
                `,
                time: '10:48',
            },
            {
                id:            1,
                isMessageType: true,
                side:          'left',
                content:       `
                    <img src="https://site.iskandarov.kz/storage/uploads/2024/07/15/message-image_uid_669513daaa702.jpg"
                    alt="Изображение от пользователя Андрей">
                `,
                time: '10:49',
            },
        ],
    },
    {
        chatId:   1,
        messages: [
            {
                id:            0,
                isMessageType: false,
                content:       '19 июня',
            },
            {
                id:            1,
                isMessageType: true,
                side:          'left',
                content:       `
                    Привет! Смотри, тут всплыл интересный кусок лунной космической истории —
                    НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для
                    полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500
                    EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности
                    Луны, так как астронавты с собой забрали только кассеты с пленкой.
                    <br><br>
                    Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так
                    и на ракету они так никогда и не попали. Всего их было произведено 25 штук,
                    одну из них недавно продали на аукционе за 45000 евро.
                `,
                time: '09:00',
            },
            {
                id:            2,
                isMessageType: true,
                side:          'left',
                content:       `
                    <img src="https://site.iskandarov.kz/storage/uploads/2024/07/15/message-image_uid_669513daaa702.jpg"
                    alt="Изображение от пользователя Андрей">
                `,
                time: '09:22',
            },
            {
                id:            3,
                isMessageType: true,
                side:          'right',
                content:       `
                    Огонь 🔥🔥
                `,
                time: '09:55',
            },
        ],
    },
    {
        chatId:   2,
        messages: [
            {
                id:            0,
                isMessageType: true,
                side:          'left',
                content:       `
                    Друзья, Коля загрузил последний вебинар!<br><br>
                    <a target="_blink" href="https://www.youtube.com/watch?v=4Zy11ceGC28">
                        https://www.youtube.com/watch?v=4Zy11ceGC28</a>
                `,
                time: '10:48',
            },
        ],
    },
];
const chatList = new ChatList({
    title:     'Чаты',
    searchBar: null,
    chats:     [],
});
const searchBar = new Searchbar({
    methods: {
        onInput() {
            const input: HTMLInputElement = searchBar.getContent('input') as HTMLInputElement;
            const inputValue: string = input.value.toLowerCase();

            chats
                .forEach((item: Chat) => {
                    const chatName = item.chatName.toLowerCase();

                    if (chatName.includes(inputValue)) {
                        item.component?.setProps({
                            isHide: false,
                        });
                    } else {
                        item.component?.setProps({
                            isHide: true,
                        });
                    }
                });
        },
    },
});
const messenger = new Messenger({
    activeChatId: null,
    methods:      {
        showDropdown(event: Event | undefined) {
            const dropdown = messenger.getContent('.source-dropdown');
            const removeHandler = (e: Event | undefined) => {
                if (e?.target instanceof Event
                    && event?.target instanceof Event
                    && e.target === event.target) return;

                dropdown.classList.remove('source-dropdown--show');
                document.removeEventListener('click', removeHandler);
            };

            if (dropdown instanceof HTMLElement) {
                dropdown.classList.add('source-dropdown--show');
                document.addEventListener('click', removeHandler);
            }
        },
        onInput() {
            if (this instanceof HTMLTextAreaElement) {
                let newHeight: number = 0;

                this.style.height = '20px';
                newHeight = Math.min(this.scrollHeight, 72);

                this.style.height = `${newHeight}px`;
            }
        },
        sendMessage(e: Event | undefined) {
            const input = messenger.getContent('textarea');

            if (e instanceof Event) e.preventDefault();

            if (input instanceof HTMLTextAreaElement) {
                if (input.value !== '') {
                    // eslint-disable-next-line no-console
                    console.log({ message: input.value.replaceAll('\n', '<br>') });
                }
            }
        },
    },
});

function setActiveChat(chat: Chat) {
    messenger.setProps({
        activeChatId: String(chat.id),
        avatar:       new Avatar({ classList: 'chat-info__user-logo', image: chat.avatarLink }),
        title:        chat.chatName,
        messages:     chatsMessages.find(i => i.chatId === chat.id)?.messages,
    });
}

chatList.setProps({
    searchBar,
    chats: chats.map((item: Chat): ChatItem => {
        const component = new ChatItem({
            ...item,
            avatar: new Avatar({
                title:     item.chatName,
                image:     item.avatarLink,
                classList: 'chat-item__user-logo',
            }),
            methods: {
                onClick() {
                    if (this instanceof HTMLElement) {
                        const chatId:number = Number(this.dataset.chatId);
                        const activeChat:Chat | undefined = Array.from(chats).find(i => i.isActive === true);
                        const activeChatComponent: ChatItem | null | undefined = activeChat?.component;
                        const targetChat:Chat | undefined = Array.from(chats).find(i => i.id === chatId);
                        const targetChatComponent: ChatItem | null | undefined = targetChat?.component;

                        if (activeChatComponent && activeChat) {
                            activeChatComponent?.setProps({
                                isActive: false,
                            });
                            activeChat.isActive = false;
                        }

                        targetChatComponent?.setProps({
                            isActive:       true,
                            unreadMessages: 0,
                        });

                        if (targetChat) {
                            targetChat.isActive = true;
                            targetChat.unreadMessages = 0;

                            setActiveChat(targetChat);
                        }
                    }
                },
            },
        });

        item.component = component;

        return component;
    }),
});

layout.setProps({
    sidebar: chatList,
    content: messenger,
});

render('#app', layout);
