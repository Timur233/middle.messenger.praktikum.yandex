import BaseAPI from './BaseAPI.ts';
import {
    ChatsMessagesTokenResponseType,
    ChatsResponseType,
    ChatUsersResponseType,
    CreateChatRequestType,
    CreateChatResponseType,
} from './types.ts';
import ResourcesAPI from './ResourcesAPI.ts';
import router from '../services/router/Router.ts';

export class ChatsAPI extends BaseAPI {
    public resourcesAPI = ResourcesAPI;

    public get(data: Record<string, unknown>) {
        return this.http.get('/chats', {
            headers: { 'Content-type': 'application/json' },
            data,
        })
            .then((res) => {
                if (res.status === 401) router.go('/logout');

                return res;
            })
            .then(res => res.json() as ChatsResponseType[])
            .catch(() => {
                router.go('/error');
            });
    }

    public getChatUsers(id: number) {
        return this.http.get(`/chats/${id}/users`, {
            headers: { 'Content-type': 'application/json' },
        })
            .then((res) => {
                if (res.status === 401) router.go('/logout');

                return res;
            })
            .then(res => res.json() as ChatUsersResponseType[])
            .catch(() => {
                router.go('/error');
            });
    }

    public create(data: CreateChatRequestType) {
        return this.http.post('/chats', {
            headers: { 'Content-type': 'application/json' },
            data,
        })
            .then((res) => {
                if (res.status === 401) router.go('/logout');

                return res;
            })
            .then(res => res.json() as CreateChatResponseType)
            .catch(() => {
                router.go('/error');
            });
    }

    public delete(id: number) {
        return this.http.delete('/chats', {
            headers: { 'Content-type': 'application/json' },
            data:    {
                chatId: id,
            },
        })
            .then((res) => {
                if (res.status === 401) router.go('/logout');

                return res;
            })
            .then(res => res.json())
            .catch(() => {
                router.go('/error');
            });
    }

    public addUsers(chatId: number, users: number[]) {
        return this.http.put('/chats/users', {
            headers: { 'Content-type': 'application/json' },
            data:    { users, chatId },
        })
            .then((res) => {
                if (res.status === 401) router.go('/logout');

                return res;
            })
            .then(res => res.text())
            .catch(() => {
                router.go('/error');
            });
    }

    public removeUsers(chatId: number, users: number[]) {
        return this.http.delete('/chats/users', {
            headers: { 'Content-type': 'application/json' },
            data:    { users, chatId },
        })
            .then((res) => {
                if (res.status === 401) router.go('/logout');

                return res;
            })
            .then(res => res.text())
            .catch(() => {
                router.go('/error');
            });
    }

    public addAvatar(formData: FormData) {
        return this.http.put('/chats/avatar', {
            data:    formData,
            timeout: 20000,
        })
            .then((res) => {
                if (res.status === 401) router.go('/logout');

                return res;
            })
            .then(res => res.text())
            .catch(() => {
                router.go('/error');
            });
    }

    public getToken(id: number) {
        return this.http.post(`/chats/token/${id}`, {
            headers: { 'Content-type': 'application/json' },
        })
            .then((res) => {
                if (res.status === 401) router.go('/logout');

                return res;
            })
            .then(res => res.json() as ChatsMessagesTokenResponseType)
            .catch(() => {
                router.go('/error');
            });
    }

    public downloadAvatar(path: string) {
        return this.resourcesAPI.download(path);
    }

    public uploadImage(data: FormData) {
        return this.resourcesAPI.upload(data);
    }
}

export default new ChatsAPI();
