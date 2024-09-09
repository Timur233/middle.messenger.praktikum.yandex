import BaseAPI from './BaseAPI.ts';
import {
    ChangePasswordRequestType, SearchUsersRequestType, UserResponseType, UserUpdateRequestType,
} from './types.ts';
import router from '../services/router/Router.ts';

export class UserAPI extends BaseAPI {
    public search(data: SearchUsersRequestType) {
        return this.http.post('/user/search', {
            headers: { 'Content-type': 'application/json' },
            data,
        })
            .then((res) => {
                if (res.status === 401) router.go('/logout');

                return res;
            })
            .then(res => res.json() as UserResponseType[])
            .catch(() => {
                router.go('/error');
            });
    }

    public avatar(data: FormData) {
        return this.http.put('/user/profile/avatar', {
            data,
        })
            .then((res) => {
                if (res.status === 401) router.go('/logout');

                return res;
            })
            .then(res => res.json() as UserResponseType)
            .catch(() => {
                router.go('/error');
            });
    }

    public update(data: UserUpdateRequestType) {
        return this.http.put('/user/profile', {
            headers: { 'Content-type': 'application/json' },
            data,
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

    public password(data: ChangePasswordRequestType) {
        return this.http.put('/user/password', {
            headers: { 'Content-type': 'application/json' },
            data,
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
}

export default new UserAPI();
