import BaseAPI from '../../api/BaseAPI.ts';

export class SignupAPI extends BaseAPI {
    public signup(data: Record<string, unknown>) {
        return this.http.post('/auth/signup', {
            headers: { 'Content-type': 'application/json' },
            data,
        });
    }
}

export default new SignupAPI();
