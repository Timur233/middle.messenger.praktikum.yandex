import { setCookie } from '../../utils/cookie.ts';
import AuthAPI from '../../api/AuthAPI.ts';
import Page from '../../services/Page.ts';
import router from '../../services/router/Router.ts';

export default class PageLogout extends Page {
    constructor() {
        super();

        AuthAPI.logout()
            .finally(() => {
                setCookie('isAuthorized', '');
                router.go('/');
            });
    }
}
