import dateFormatter from '../../utils/dateFormatter.ts';
import debounce from '../../utils/debounce.ts';
import escapeHTML from '../../utils/escapeHTML.ts';

import config from '../../services/http/cofing.ts';
import AuthAPI from '../../api/AuthAPI.ts';
import UserAPI from '../../api/UserAPI.ts';
import ChatsAPI from '../../api/ChatsAPI.ts';
import MessengerWS from '../../api/MessengerWS.ts';
import { ChatsResponseType, ChatMessageType, UserResponseType } from '../../api/types.ts';

import Page from '../../services/Page.ts';
import Component from '../../services/Component.ts';
import MainLayout from '../../layout/main/main.ts';
import ChatList, { ChatDataType } from './modules/chat-list/chat-list.ts';
import Searchbar from './modules/chat-list/components/searchbar/searchbar.ts';
import Messenger, { MessageItemType } from './modules/messenger/messenger.ts';
import PageLoader from '../../components/page-loader/page-loader.ts';
import Avatar from './components/avatar/avatar.ts';
import ChangeAvatar from '../../components/change-avatar/change-avatar.ts';
import ChatEditor from './modules/chat-editor/chat-editor.ts';
import FormGroup from '../../components/form-group/form-group.ts';
import UserFinder from './modules/chat-editor/components/user-finder/user-finder.ts';
import modal from '../../components/modal/modal.ts';
import Button from '../../components/button/button.ts';

import router from '../../services/router/Router.ts';
import store, { StoreEvents } from '../../services/store/Store.ts';

export default class PageMessenger extends Page {
    public WSS: MessengerWS | null = null;

    static updateListInterval: unknown;

    setup(): MainLayout {
        const searchbarComponent: Searchbar = new Searchbar({
            methods: {
                onInput: debounce(() => {
                    const searchBar = searchbarComponent.getContent();
                    const searchInput = searchbarComponent.getContent('input') as HTMLInputElement;
                    const searchQuery = escapeHTML(searchInput.value);

                    searchBar.classList.add('searchbar--loading');

                    PageMessenger.getChatList(searchQuery)
                        .then((chats: ChatDataType[]) => {
                            if (searchQuery !== '') {
                                PageMessenger.searchUsers(searchQuery)
                                    .then((users: ChatDataType[]) => {
                                        store.setState('disableChatlistUpdate', true);
                                        store.setState('userList', users);
                                    });
                            } else {
                                store.setState('disableChatlistUpdate', false);
                            }

                            store.setState('chatList', chats);

                            setTimeout(() => {
                                searchBar.classList.remove('searchbar--loading');
                                searchbarComponent.getContent('input').focus();
                            }, 200);
                        });
                }, 250),
            },
        });
        const chatListComponent: ChatList = new ChatList({
            title:        'Чаты',
            searchBar:    searchbarComponent,
            chats:        [],
            createButton: new Button({
                classList: 'button--primary chats__create-btn',
                text:      'Создать чат',
                methods:   {
                    onClick: () => {
                        PageMessenger.upsertChatModal.call(this);
                    },
                },
            }),
            methods: {
                openProfilePage: (e: Event) => {
                    e.preventDefault();

                    router.go('/settings' as string);
                },
            },
        });
        const messengerComponent: Messenger = new Messenger({
            activeChatId: null,
            methods:      {
                showDropdown(event: Event) {
                    const dropdown = messengerComponent.getContent('.source-dropdown');
                    const removeHandler = (e: Event | undefined) => {
                        if (
                            e instanceof Event
                            && event instanceof Event
                            && e.target === event.target
                        ) return;

                        dropdown.classList.remove('source-dropdown--show');
                        document.removeEventListener('click', removeHandler);
                    };

                    if (dropdown instanceof HTMLElement) {
                        dropdown.classList.add('source-dropdown--show');
                        document.addEventListener('click', removeHandler);
                    }
                },
                showMoreDropdown(event: Event) {
                    const dropdown = messengerComponent.getContent('.more-dropdown');
                    const removeHandler = (e: Event | undefined) => {
                        if (
                            e instanceof Event
                            && event instanceof Event
                            && e.target === event.target
                        ) return;

                        dropdown.classList.remove('more-dropdown--show');
                        document.removeEventListener('click', removeHandler);
                    };

                    if (dropdown instanceof HTMLElement) {
                        dropdown.classList.add('more-dropdown--show');
                        document.addEventListener('click', removeHandler);
                    }
                },
                editChat: () => {
                    const activeChatId = store.getState('activeChatId') as number;

                    PageMessenger.upsertChatModal.call(this, activeChatId);
                },
                deleteChat: () => {
                    modal.setProps({
                        title:   'Подтверждение',
                        content: `Вы уверенны что хотите удалить чат "${messengerComponent.props.title}"`,
                        buttons: [new Button({
                            text:      'Отменить',
                            classList: 'button--outline',
                            methods:   {
                                onClick() {
                                    modal.hide();
                                },
                            },
                        }),
                        new Button({
                            text:      'Продолжить',
                            classList: 'button--primary',
                            methods:   {
                                onClick: () => {
                                    const activeChatId = store.getState('activeChatId') as number | null;

                                    if (activeChatId) {
                                        this.showLoader();
                                        modal.hide();

                                        ChatsAPI.delete(activeChatId)
                                            .then(() => {
                                                this.WSS?.close();
                                                store.setState('activeChatId', null);

                                                messengerComponent.setProps({
                                                    activeChatId: null,
                                                    avatar:       null,
                                                    title:        null,
                                                    messages:     [{}],
                                                });

                                                PageMessenger.getChatList()
                                                    .then((chatsData: ChatDataType[]) => {
                                                        store.setState('chatList', chatsData);
                                                        this.hideLoader();
                                                    });
                                            });
                                    }
                                },
                            },
                        })],
                    });
                    modal.show();
                },
                onKeydown(event: KeyboardEvent) {
                    if (this instanceof HTMLTextAreaElement) messengerComponent.keydownHandler(this, event);
                },
                onInput() {
                    if (this instanceof HTMLTextAreaElement) Messenger.dynamicInputSize(this);
                },
                onScrollHistory: debounce((event: Event) => {
                    const historyElement = event.target as HTMLElement;
                    const activeMessages = store.getState('activeChatMessages');

                    if (historyElement.scrollTop < 50 && this.WSS !== null) {
                        this.WSS.send({
                            type:    'get old',
                            content: Array.isArray(activeMessages) ? activeMessages.length.toString() : '0',
                        });
                    }
                }, 250),
                sendMessage: (e: Event) => {
                    const input = messengerComponent.getContent('textarea') as HTMLTextAreaElement;

                    e.preventDefault();

                    if (input instanceof HTMLTextAreaElement) {
                        const message = escapeHTML(input.value);

                        if (message !== '' && this.WSS !== null) {
                            this.WSS.send({
                                type:    'message',
                                content: message,
                            });

                            PageMessenger.getChatList()
                                .then((chatsData: ChatDataType[]) => {
                                    store.setState('chatList', chatsData);
                                });

                            input.value = '';
                        }
                    }
                },
                selectFile: () => {
                    const input: HTMLElement = messengerComponent.getContent('#file-uploader-input');

                    if (input) input.click();
                },
                onSelectFile: (e: Event) => {
                    const input = e.target as HTMLInputElement;

                    if (input && input.files !== null) {
                        const formData = new FormData();

                        formData.append('resource', input.files[0]);
                        PageMessenger.uploadResource(formData)
                            .then((file) => {
                                if (file && file?.id && this.WSS !== null) {
                                    this.WSS.send({
                                        type:    'file',
                                        content: String(file.id),
                                    });
                                }
                            });
                    }
                },
            },
        });
        const layoutComponent: MainLayout = new MainLayout({
            sidebar: chatListComponent,
            content: messengerComponent,
        });

        this.showLoader();

        chatListComponent.chatItemClickHandler = PageMessenger
            .chatItemClickHandler
            .bind(this, chatListComponent);

        chatListComponent.userItemClickHandler = PageMessenger
            .userItemClickHandler
            .bind(this, chatListComponent);

        store.on(StoreEvents.Updated, (path) => {
            if (path === 'chatList' || path === 'userList') {
                const chatList = store.getState('chatList') as ChatDataType[] || [];
                const userList = store.getState('userList') as ChatDataType[] || [];

                chatListComponent.loadChatList(chatList, userList);
            }

            if (path === 'activeChatId') {
                const chatList = store.getState('chatList') as ChatDataType[] || [];
                const activeChatId = store.getState('activeChatId') as number;
                const activeChatToken = store.getState('activeChatToken') as string;
                const userId = store.getState('userInfo.id') as number;
                const activeChat: ChatDataType | null | undefined = activeChatId
                    ? chatList.find(i => i.id === activeChatId) : null;

                if (activeChat) {
                    messengerComponent.setProps({
                        activeChatId: String(activeChat.id),
                        avatar:       new Avatar({
                            classList: 'chat-info__user-logo',
                            image:     activeChat.avatarLink,
                        }),
                        title:    activeChat.chatName,
                        messages: [],
                    });

                    if (this.WSS !== null) {
                        store.setState('activeChatMessages', []);
                        this.WSS.close();
                    }

                    this.WSS = new MessengerWS(userId, activeChatId, activeChatToken);
                    this.WSS.onMessage((content) => {
                        PageMessenger.onMessageWSEvent.call(this, content);
                        messengerComponent.getContent('textarea').focus();
                    });
                }
            }

            if (path === 'activeChatMessages') {
                const activeChatMessages = store.getState('activeChatMessages') as ChatMessageType[] || [];

                messengerComponent.setProps({
                    messages: activeChatMessages,
                });
            }
        });

        this._loadData();

        this.setProps({ classList: 'messenger-page__wrapper' });
        this.setPageMeta({
            title:       'Чаты',
            description: 'Cтраница мессенджера.',
        });

        return layoutComponent;
    }

    loader(): Component {
        const loader = new PageLoader();

        return loader;
    }

    private _loadData() {
        PageMessenger.getUserInfo()
            .then((userInfo) => {
                store.setState('userInfo', userInfo);

                PageMessenger.getChatList()
                    .then((chatsData: ChatDataType[]) => {
                        store.setState('chatList', chatsData);

                        this.hideLoader();
                    });
            });

        PageMessenger.updateListInterval = setInterval(() => {
            let disableChatlistUpdate: boolean = store.getState('disableChatlistUpdate') as boolean || false;

            if (disableChatlistUpdate === false) {
                PageMessenger.getChatList()
                    .then((chatsData: ChatDataType[]) => {
                        disableChatlistUpdate = store.getState('disableChatlistUpdate') as boolean || false;

                        if (disableChatlistUpdate === false) {
                            store.setState('chatList', chatsData);
                        }
                    });
            }
        }, 10000);
    }

    destroyPage(): void {
        if (this.WSS) this.WSS.close();

        clearInterval(PageMessenger.updateListInterval as number);
    }

    static upsertChatModal(chatId: number | undefined | null = null, newChatTitle = '', chatUsers: {
        id: number,
        login: string,
        isAdmin: boolean
    }[] = []) {
        const chatList = store.getState('chatList') as ChatDataType[];
        const targetChat = chatList.find(i => i.id === chatId) as ChatDataType;
        let chatNewAvatar: File | null = null;
        let usersForAddList: number[] = chatUsers.map(i => Number(i.id));
        const usersForRemoveList: number[] = [];
        const chatEditor = new ChatEditor({
            methods: {
                onChangeAvatar: (e: Event) => {
                    const input = e.target as HTMLInputElement;
                    const file: File | null = input.files?.[0] || null;

                    if (file) {
                        const reader = new FileReader();

                        reader.onload = (loadEvent: ProgressEvent<FileReader>) => {
                            // eslint-disable-next-line no-use-before-define
                            changeAvatar.setProps({ image: loadEvent.target?.result });
                        };
                        reader.readAsDataURL(file);
                        chatNewAvatar = file;
                    }
                },
            },
        });
        const changeAvatar = new ChangeAvatar({
            classList: 'chat-avatar',
            label:     'Поменять аватар',
            image:     targetChat?.avatarLink || '/images/avatar-placeholder.jpeg',
            title:     targetChat?.chatName || 'Аватар чата',
            methods:   {
                onClick: () => {
                    const avatarInput = chatEditor.getContent('input') as HTMLInputElement;

                    avatarInput.click();
                },
            },
        });
        const titleField = new FormGroup({
            label:       'Заголовок чата',
            placeholder: 'Введите название чата',
            value:       newChatTitle || targetChat?.chatName,
        });
        const userFinder = new UserFinder({
            users:   chatUsers,
            methods: {
                searchUsers: debounce((e: Event) => {
                    const searchInput = e.target as HTMLInputElement;

                    if (searchInput.value) {
                        userFinder.getContent().classList.add('user-finder--loading');
                        PageMessenger.searchUsers(searchInput.value)
                            .then((users) => {
                                userFinder.setProps({ usersResult: users, searchInputValue: searchInput.value });
                                userFinder.getContent().classList.remove('user-finder--loading');

                                setTimeout(() => {
                                    const input = userFinder.getContent('.user-finder-input') as HTMLInputElement;

                                    input.focus();
                                    input.setSelectionRange(input.value.length, input.value.length);
                                }, 200);
                            });
                    } else {
                        userFinder.setProps({ usersResult: [], searchInputValue: '' });
                    }
                }, 250),
                selectUser: (e: Event) => {
                    const item = e.target as HTMLElement;
                    const selectedUsers = userFinder.props?.users as {
                        login: string,
                        id: number,
                        isAdmin?: boolean
                    }[] || [];

                    if (!selectedUsers.find(i => i.login === item.dataset?.login)) {
                        userFinder.setProps({ usersResult: [], searchInputValue: '' });
                        userFinder.setProps({
                            users: [...selectedUsers, {
                                id:      Number(item.dataset?.userId),
                                login:   item.dataset?.login || '',
                                isAdmin: false,
                            }],
                        });
                        usersForAddList.push(Number(item.dataset?.userId));
                    }
                },
                removeUser: (e: Event) => {
                    const target = e.target as HTMLElement;
                    const item = target.closest('button') as HTMLElement;
                    const selectedUsers = userFinder.props?.users as { login: string, id: number }[] || [];

                    if (item.dataset?.userId) {
                        userFinder.setProps({ users: selectedUsers.filter(i => i.id !== Number(item.dataset.userId)) });
                        usersForAddList = usersForAddList.filter(i => i !== Number(item.dataset?.userId));

                        if (!usersForAddList.find(i => i === Number(item.dataset?.userId))) {
                            usersForRemoveList.push(Number(item.dataset?.userId));
                        }
                    }
                },
            },
        });

        chatEditor.setProps({
            avatar: changeAvatar,
            titleField,
            userFinder,
        });

        if (chatId) {
            titleField.hide();

            ChatsAPI
                .getChatUsers(chatId)
                .then((res) => {
                    if (res && Array.isArray(res)) {
                        userFinder.setProps({
                            users: res.map(i => ({
                                id:      i.id,
                                login:   i.login,
                                isAdmin: i.role === 'admin',
                            })),
                        });
                    }
                });
        }

        modal.setProps({
            title:   chatId ? 'Редактировать чат' : 'Cоздать чат',
            content: chatEditor,
            buttons: [
                new Button({
                    text:      'Cохранить',
                    classList: 'button--primary',
                    methods:   {
                        onClick: async () => {
                            const chatTitle = titleField.getValue();
                            const users = userFinder?.props?.users as { login: string, id: number }[] || [];

                            if (!chatTitle) {
                                titleField.setProps({ hasError: true });

                                return;
                            }

                            this.showLoader();
                            modal.hide();

                            if (chatId) {
                                if (usersForAddList.length > 0) {
                                    await ChatsAPI.addUsers(chatId, usersForAddList);
                                }

                                if (usersForRemoveList.length > 0) {
                                    await ChatsAPI.removeUsers(chatId, usersForRemoveList);
                                }

                                if (chatNewAvatar) {
                                    const data = new FormData();

                                    data.append('avatar', chatNewAvatar);
                                    data.append('chatId', chatId.toString());

                                    await ChatsAPI.addAvatar(data);
                                }
                            } else {
                                chatId = await PageMessenger.createChat(chatTitle, users.map(i => i.id), chatNewAvatar);
                            }

                            PageMessenger.getChatList()
                                .then((chatsData: ChatDataType[]) => {
                                    store.setState('activeChatId', chatId);
                                    store.setState('chatList', chatsData);
                                    store.setState('userList', []);

                                    this.hideLoader();

                                    PageMessenger.openChat(chatId as number);
                                });
                        },
                    },
                }),
            ],
        });

        modal.show();
    }

    static openChat(chatId: number) {
        const chatList = store.getState('chatList') as ChatDataType[];
        const activeChat = chatList.find(i => i.id === chatId);

        ChatsAPI.getToken(chatId)
            .then((res) => {
                store.setState('activeChatToken', res?.token);
                store.setState('activeChatId', activeChat?.id);
                store.setState('disableChatlistUpdate', false);
            });
    }

    static chatItemClickHandler(chatListComponent: ChatList, event: Event) {
        const { target } = event;

        if (target instanceof HTMLElement) {
            const targetElement: HTMLElement | null = target.closest('.chat-item');
            const id: string | null = targetElement?.dataset?.id || null;
            const chatId: string | null = targetElement?.dataset?.chatId || null;

            if (id && typeof id === 'string' && Number(chatId) !== store.getState('activeChatId')) {
                chatListComponent.deactivateChat();
                chatListComponent.activateChat(id);
                store.setState('disableChatlistUpdate', true);

                PageMessenger.openChat(Number(chatId));
            }
        }
    }

    static userItemClickHandler(chatListComponent: Component, event: Event) {
        const { target } = event;

        if (target instanceof HTMLElement) {
            const targetElement: HTMLElement | null = target.closest('.chat-item');
            const componentId: string | null = targetElement?.dataset?.id || null;

            if (componentId && typeof componentId === 'string') {
                const targetUser =  chatListComponent.getChild(componentId);
                const userId = targetUser?.props?.id as number || null;
                const userName = targetUser?.props?.chatName as string || '';

                const users = [{
                    id:      userId,
                    login:   userName,
                    isAdmin: false,
                }] as {
                    id: number,
                    login: string,
                    isAdmin: boolean
                }[];

                PageMessenger.upsertChatModal.call(this, null, userName, users);
            }
        }
    }

    static onMessageWSEvent(res: ChatMessageType | ChatMessageType[]) {
        const userId = store.getState('userInfo.id') as number;
        const activeChatMessages = store.getState('activeChatMessages') as ChatMessageType[] || [];

        if (Array.isArray(res)) {
            const messages = res.map((item: ChatMessageType): MessageItemType => ({
                id:            item.id,
                isMessageType: true,
                content:       item.type === 'message'
                    ? item.content.replaceAll('\n', '<br>')
                    : `<img src="${config.APP_URL}/resources${item.file?.path}" alt="Изображение от пользователя">`,
                side: item.user_id === userId ? 'right' : 'left',
                time: dateFormatter(item.time),
            }));

            if (messages.length > 0) {
                store.setState('activeChatMessages', [...activeChatMessages, ...messages]);
            } else if (activeChatMessages.length === 0) {
                store.setState('activeChatMessages', [{
                    id:            0,
                    isMessageType: false,
                    content:       'Здесь пока ничего нет',
                }]);
            }
        }

        if (!Array.isArray(res)) {
            if (res.type === 'message') {
                const message: MessageItemType = {
                    id:            res.id,
                    isMessageType: true,
                    content:       res.content.replaceAll('\n', '<br>'),
                    side:          res.user_id === userId ? 'right' : 'left',
                    time:          dateFormatter(res.time),
                };

                store.setState('activeChatMessages', [message, ...activeChatMessages]);
            }

            if (res.type === 'file') {
                const message: MessageItemType = {
                    id:            res.id,
                    isMessageType: true,
                    content:       `<img src="${config.APP_URL
                        }/resources${res.file?.path}" alt="Изображение от пользователя">`,
                    side: res.user_id === userId ? 'right' : 'left',
                    time: dateFormatter(res.time),
                };

                store.setState('activeChatMessages', [message, ...activeChatMessages]);
            }
        }
    }

    static uploadResource(data: FormData) {
        return ChatsAPI.uploadImage(data);
    }

    static async createChat(title: string, users: number[] = [], avatar: File | null = null) {
        const chatId = await ChatsAPI.create({ title })
            .then((res) => {
                const id: number | undefined = res?.id;

                return id;
            });

        if (chatId && users.length > 0) {
            await ChatsAPI.addUsers(chatId, users);
        }

        if (chatId && avatar) {
            const data = new FormData();

            data.append('avatar', avatar);
            data.append('chatId', chatId.toString());

            await ChatsAPI.addAvatar(data);
        }

        return chatId;
    }

    static getChatList(searchQuery: string = '') {
        const activeChat = store.getState('activeChatId') || null;

        return ChatsAPI
            .get({ title: searchQuery, limit: 1000 })
            .then((chats): ChatsResponseType[] => PageMessenger.sortChats(chats))
            .then((chats): ChatDataType[] => {
                if (chats && Array.isArray(chats)) {
                    return chats.map((item: ChatsResponseType) => ({
                        id:             item.id,
                        isActive:       !!(activeChat && activeChat === item.id),
                        chatName:       typeof item.title === 'string' ? item.title : '',
                        messagePreview: item.last_message?.content || '',
                        unreadMessages: item.unread_count,
                        date:           item.last_message?.time ? dateFormatter(item.last_message.time) : '',
                        userAvatar:     item?.avatar || null,
                        avatarLink:     item?.avatar ? `${config.APP_URL}/resources${item?.avatar}`
                            : '/images/avatar-placeholder.jpeg',
                        component: null,
                    }));
                }

                return [];
            });
    }

    static searchUsers(searchQuery: string = '') {
        return UserAPI
            .search({ login: searchQuery })
            .then((users): ChatDataType[] => {
                if (users && Array.isArray(users)) {
                    return users.map((item: UserResponseType) => ({
                        id:             item.id,
                        isActive:       false,
                        chatName:       item.display_name || item.login,
                        messagePreview: `${item.first_name} ${item.second_name}`,
                        unreadMessages: 0,
                        date:           '',
                        userAvatar:     item?.avatar || null,
                        avatarLink:     item?.avatar ? `${config.APP_URL}/resources${item?.avatar}`
                            : '/images/avatar-placeholder.jpeg',
                        component: null,
                    }));
                }

                return [];
            });
    }

    static getUserInfo() {
        return AuthAPI.user();
    }

    static sortChats(chats: ChatsResponseType[] | unknown): ChatsResponseType[] {
        if (chats && Array.isArray(chats)) {
            const sortedChats = chats.sort((a, b) => {
                const dateA = new Date(a?.last_message?.time || null);
                const dateB = new Date(b?.last_message?.time || null);

                return Number(dateB) - Number(dateA);
            });

            return sortedChats;
        }

        return [];
    }

    // eslint-disable-next-line no-unused-vars
    // static upsertChatModal(_chatID = null, _title = '', _users = []) {
    //     throw new Error('Method not implemented.');
    // }

    static showLoader() {
        throw new Error('Method not implemented.');
    }

    static hideLoader() {
        throw new Error('Method not implemented.');
    }
}
