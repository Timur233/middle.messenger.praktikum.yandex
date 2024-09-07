import BaseAPI from './BaseAPI.ts';
import { ResourceType } from './types.ts';
import router from '../services/router/Router.ts';

export class ResourcesAPI extends BaseAPI {
    public download(path: string) {
        return this.http.get(`/resources${path}`, { responseType: 'blob' });
    }

    public upload(formData: FormData) {
        return this.http.post('/resources', {
            data: formData,
        })
            .then((res) => {
                if (res.status === 401) router.go('/logout');

                return res;
            })
            .then(res => res.json() as ResourceType)
            .catch(() => {
                router.go('/error');
            });
    }
}

export default new ResourcesAPI();
