import BaseAPI from '../../api/BaseAPI.ts';

export class SigninAPI extends BaseAPI {
    public signin(data: Record<string, unknown>) {
        return this.http.post('/auth/signin', {
            headers: { 'Content-type': 'application/json' },
            data,
        });
    }
}

export default new SigninAPI();
