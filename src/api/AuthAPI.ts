import BaseAPI from './BaseAPI.ts';
import { SigninRequestType, SignupRequestType, UserResponseType } from './types.ts';
import router from '../services/router/Router.ts';

export class AuthAPI extends BaseAPI {
    public user() {
        return this.http.get('/auth/user', { headers: { 'Content-type': 'application/json' } })
            .then((res) => {
                if (res.status === 401) router.go('/logout');

                return res;
            })
            .then(res => res.json() as UserResponseType)
            .catch(() => {
                router.go('/error');
            });
    }

    public signup(data: SignupRequestType) {
        return this.http.post('/auth/signup', {
            headers: { 'Content-type': 'application/json' },
            data,
        });
    }

    public signin(data: SigninRequestType) {
        return this.http.post('/auth/signin', {
            headers: { 'Content-type': 'application/json' },
            data,
        });
    }

    public logout() {
        return this.http.post('/auth/logout');
    }
}

export default new AuthAPI();
